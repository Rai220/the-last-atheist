#!/usr/bin/env python3
"""
Generate art for «Последний Атеист» with OpenAI's image generator.

Requires:
  export OPENAI_API_KEY='...'

The project rule is strict: generated images must not contain visible text.
All prompts include the required no-text clause.
"""

import argparse
import base64
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


PROJECT_ROOT = Path(__file__).parent
API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"
NO_TEXT = "no text, no letters, no words, no signs, no labels, no writing on the image"

STYLE = (
    "Dark stylized 2D digital painting, semi-realistic visual novel style, "
    "dramatic cinematic lighting, expressive grotesque black humor aesthetic, "
    "Disco Elysium influence, Soviet brutalism mixed with biblical horror, "
    "surreal liminal atmosphere, high detail. "
)

CHAR_STYLE = (
    "Transparent-background visual novel character sprite, full body, "
    "semi-realistic 2D digital painting, expressive face, dramatic lighting, "
    "clean silhouette, no environment, no props with readable text. "
)

CHARACTERS = {
    "mc": {
        "dir": "assets/characters/mc",
        "base": (
            "A charismatic 38-year-old Russian man, Alexey Volkov. Short messy dark brown hair, "
            "three-day stubble, sharp clever grey eyes, thin angular face, dark navy hoodie over "
            "a black t-shirt, dark jeans, sneakers, lean build."
        ),
        "expressions": {
            "_reference": "neutral confident expression, relaxed posture, hands in hoodie pockets",
            "normal": "neutral confident expression, slight knowing look, relaxed posture",
            "shock": "shocked expression, very wide eyes, raised eyebrows, mouth open, defensive hands",
            "angry": "angry expression, furrowed brows, clenched jaw, aggressive pointing gesture",
            "despair": "despair expression, slumped shoulders, hollow eyes, defeated posture",
            "smirk": "sarcastic smirk, one eyebrow raised, cocky tilted head, arms crossed",
        },
    },
    "angel": {
        "dir": "assets/characters/angel",
        "base": (
            "A biblical angel who looks like an exhausted government security guard. Tall figure in "
            "white-gold armor, folded feathered wings, flaming sword used like a cane, square jaw, "
            "tired eyes with dark circles, short blond military haircut."
        ),
        "expressions": {
            "_reference": "stern official expression, standing at attention, bureaucratic exhaustion",
            "stern": "stern official expression, clipboard held close, tired military posture",
            "bored": "extremely bored expression, heavy eyelids, slouched wings, leaning on sword",
        },
    },
    "demon": {
        "dir": "assets/characters/demon",
        "base": (
            "A demon office bureaucrat with dark red skin, small curved horns, pointed ears, "
            "round glasses, thinning neat black hair, grey business suit and red tie."
        ),
        "expressions": {
            "_reference": "polite unsettling customer-service smile, hands clasped professionally",
            "smile": "polite customer-service smile, helpful but creepy",
            "paperwork": "holding a tall stack of blank papers and clipboard, focused expression",
            "angry": "furious expression, glowing horns, flying blank papers, fangs bared",
        },
    },
    "soul": {
        "dir": "assets/characters/soul",
        "base": (
            "A translucent ghostly human soul, middle-aged man, soft blue-white ethereal glow, "
            "casual clothes, faded washed-out colors, floating slightly above ground."
        ),
        "expressions": {
            "_reference": "quiet resigned expression, tired half-smile",
            "sad": "sad expression, downturned mouth, teary ghostly eyes, slumped shoulders",
            "resigned": "resigned calm expression, peaceful but weary",
        },
    },
    "inna": {
        "dir": "assets/characters/inna",
        "base": (
            "A beautiful 30-year-old Russian HR manager at an IT office. Long dark hair, clever dark eyes, "
            "confident smile, fitted black blazer, dark red blouse, black pencil skirt, black high heels, "
            "normal human woman, no horns, no tail."
        ),
        "expressions": {
            "_reference": "confident professional stance, one hand on hip, charming smile",
            "flirt": "flirty expression, playful half-smile, one eyebrow raised",
            "laugh": "genuine warm laugh, eyes crinkled, relaxed joyful posture",
            "serious": "serious professional expression, stern focused look, straight posture",
            "tender": "tender soft expression, gentle warm smile, vulnerable eyes",
        },
    },
    "lilith": {
        "dir": "assets/characters/lilith",
        "base": (
            "A charming dangerous demoness named Lilith, elegant black dress, small horns, subtle tail, "
            "dark flowing hair, femme fatale presence, graceful posture, infernal glamour."
        ),
        "expressions": {
            "_reference": "confident flirtatious smile, elegant dangerous stance",
            "flirt": "flirty expression, playful predatory smile",
            "laugh": "amused laugh, sharp joy, relaxed shoulders",
            "serious": "serious expression, guarded eyes, controlled posture",
            "tender": "tender vulnerable expression, softened eyes, gentle smile",
        },
    },
    "panchin": {
        "dir": "assets/characters/panchin",
        "base": (
            "A nervous Russian science popularizer in glasses, tall, thin, backpack, DNA-themed shirt "
            "without readable symbols, anxious intellectual energy."
        ),
        "expressions": {
            "_reference": "shocked anxious expression, clutching glasses",
            "shocked": "deeply shocked expression, wide eyes, glasses in hand",
        },
    },
    "viktor": {
        "dir": "assets/characters/viktor",
        "base": (
            "A geeky underworld sysadmin ghost named Viktor, thin glasses, old sweater with a simple penguin-like "
            "shape without text or logos, tired friendly face, green terminal glow on skin."
        ),
        "expressions": {
            "_reference": "friendly tired expression, slight smile",
            "friendly": "friendly expression, welcoming gesture",
            "nervous": "nervous expression, hunched shoulders, worried eyes",
            "excited": "excited geeky expression, animated hands",
            "hurt": "hurt expression, wounded pride, looking down",
        },
    },
}

SCENES = {
    "prologue/apartment.jpg": (
        "Small Moscow apartment kitchen in the morning, warm golden light through frosted window, "
        "coffee mug on table, science books, fridge magnets as abstract shapes only, cozy slight mess, "
        "a black smart speaker with a violet light ring on a shelf, no people."
    ),
    "prologue/office.jpg": (
        "Modern Moscow IT open-plan office, multiple monitors showing abstract code-like blocks with no readable text, "
        "desk lamps, city lights through windows, ergonomic chairs, coffee cups, cold bluish lighting, no people."
    ),
    "prologue/street.jpg": (
        "Moscow street at dusk, wet asphalt, grey autumn sky, small golden-domed Orthodox church in background, "
        "modern buildings, parked cars, street lamps, melancholic leaves, no people."
    ),
    "prologue/phone_screen.jpg": (
        "First-person view of a smartphone in a dim room, screen shows an abstract dark social media interface "
        "with blocks and icons only, no readable text, messy desk in background, phone glow."
    ),
    "prologue/death_street.jpg": (
        "Wet city asphalt seen from ground level after an accident, blurred shoes and emergency lights as vague shapes, "
        "rain reflections, disorientation, cinematic low angle, no readable text."
    ),
    "prologue/night_city.jpg": (
        "Moscow night city street after rain, wet road reflections, office buildings, streetlights, distant church dome, "
        "lonely urban melancholy, no people."
    ),
    "judgment/hall.jpg": (
        "Enormous heavenly hall of divine judgment, infinite white marble columns into golden clouds, polished floor, "
        "abstract religious geometry carved as non-letter symbols, endless queue silhouettes, epic scale."
    ),
    "judgment/queue.jpg": (
        "Heavenly judgment hall queue of ghostly translucent souls from different eras, marble columns, soft golden light, "
        "peaceful but tense atmosphere."
    ),
    "judgment/throne.jpg": (
        "Overwhelming divine radiance, blinding white-gold light above, tiny human silhouette before infinite presence, "
        "gold mist, absolute judgment, no visible words."
    ),
    "judgment/review.jpg": (
        "Surreal space filled with floating translucent memory screens, childhood, university, office, forum-like abstract UI "
        "with no readable text, arranged in spiral, golden mist."
    ),
    "judgment/waiting.jpg": (
        "Heavenly waiting room, marble benches, golden light, ghostly souls sitting quietly, bureaucratic calm, no signs, no text."
    ),
    "hell/gates.jpg": (
        "Massive gates of hell made of twisted black iron, red smoky sky, fire and lava glow behind gates, red ticket machine "
        "with tiny horns beside it, blank display with no text."
    ),
    "hell/office.jpg": (
        "Government bureaucratic office in hell, grey cubicles, fluorescent yellow lighting, sulfur haze, filing cabinets with "
        "small flames, blank posters and blank number displays, no readable text, no people."
    ),
    "hell/cauldrons.jpg": (
        "Hell landscape with rows of large iron cauldrons bubbling over fires, industrial medieval punishment space, rocky cavern, "
        "rivers of lava, red-orange hellfire, numbered tags represented as blank metal plates."
    ),
    "hell/debate_room.jpg": (
        "Underworld university lecture hall, dark academia, podium, blank chalkboard with no writing, old wooden seats, infernal "
        "abstract symbols, torches, projector screen, no people."
    ),
    "hell/bar.jpg": (
        "Cozy underground bar carved into hell rock, warm amber candle lighting, counter built from repurposed pitchforks and "
        "brimstone, mysterious bottles, pool table, blank handmade sign shape with no text."
    ),
    "hell/corridor.jpg": (
        "Long corridor in bureaucratic hell, grey brutalist walls, flickering fluorescent lights, doors with blank plates, "
        "boiling water cooler, eerie perspective, no people, no readable text."
    ),
    "hell/server_room.jpg": (
        "Infernal server room, rows of black racks, green and red LEDs, cables like vines, dusty desk with monitor showing "
        "abstract green blocks only, sulfur haze, no readable text."
    ),
    "transitions/menu_bg.jpg": (
        "Dark cinematic title background, silhouette of a man on a narrow bridge, golden heavenly light and clouds above, "
        "red hellfire and demonic shapes below, embers, dramatic composition, no title text."
    ),
}


def build_prompt(description, kind):
    framing = (
        "Wide panoramic 16:9 visual novel background. " if kind == "scene"
        else "Full body character sprite, centered, transparent or plain dark background. "
    )
    return f"{STYLE if kind == 'scene' else CHAR_STYLE}{description} {framing}{NO_TEXT}."


def write_image(image_b64, output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    image_bytes = base64.b64decode(image_b64)
    if output_path.suffix.lower() in {".jpg", ".jpeg"}:
        try:
            from PIL import Image
        except ImportError as exc:
            raise RuntimeError(
                "Pillow is required to write JPG scene assets. Install it with: python3 -m pip install pillow"
            ) from exc
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image.save(output_path, format="JPEG", quality=92, optimize=True)
    else:
        output_path.write_bytes(image_bytes)


def matches_only(output_path, only):
    if not only:
        return True
    rel = output_path.relative_to(PROJECT_ROOT).as_posix()
    return any(item in rel for item in only)


def generate_image(prompt, output_path, size, retries=3):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    payload = {
        "model": MODEL,
        "prompt": prompt,
        "size": size,
        "n": 1,
        "quality": "high",
    }
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        API_URL,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=180) as response:
                body = json.loads(response.read().decode("utf-8"))
            image_b64 = body["data"][0]["b64_json"]
            write_image(image_b64, output_path)
            print(f"OK {output_path}")
            return
        except urllib.error.HTTPError as exc:
            err = exc.read().decode("utf-8", errors="replace")
            print(f"ERROR {output_path} attempt {attempt}: HTTP {exc.code} {err[:300]}")
            if exc.code == 429 and attempt < retries:
                time.sleep(20 * attempt)
                continue
            raise
        except Exception as exc:
            print(f"ERROR {output_path} attempt {attempt}: {exc}")
            if attempt < retries:
                time.sleep(5 * attempt)
                continue
            raise


def generate_scenes(skip_existing=False, dry_run=False, only=None):
    for filename, description in SCENES.items():
        output = PROJECT_ROOT / "assets" / "scenes" / filename
        if not matches_only(output, only):
            continue
        if skip_existing and output.exists():
            print(f"SKIP {output}")
            continue
        prompt = build_prompt(description, "scene")
        if dry_run:
            print(f"DRY {output}\n{prompt}\n")
        else:
            generate_image(prompt, output, "1536x1024")


def generate_characters(skip_existing=False, dry_run=False, only=None):
    for char_id, data in CHARACTERS.items():
        for expression, expression_prompt in data["expressions"].items():
            filename = "_reference.png" if expression == "_reference" else f"{expression}.png"
            output = PROJECT_ROOT / data["dir"] / filename
            if not matches_only(output, only):
                continue
            if skip_existing and output.exists():
                print(f"SKIP {output}")
                continue
            description = f"{data['base']} Pose and expression: {expression_prompt}."
            prompt = build_prompt(description, "character")
            if dry_run:
                print(f"DRY {output}\n{prompt}\n")
            else:
                generate_image(prompt, output, "1024x1536")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", nargs="?", default="all", choices=["all", "scenes", "characters"])
    parser.add_argument("--skip-existing", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--only",
        action="append",
        default=[],
        help="Generate only assets whose relative path contains this substring. Can be used multiple times.",
    )
    args = parser.parse_args()

    if args.mode in ("all", "characters"):
        generate_characters(args.skip_existing, args.dry_run, args.only)
    if args.mode in ("all", "scenes"):
        generate_scenes(args.skip_existing, args.dry_run, args.only)


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
