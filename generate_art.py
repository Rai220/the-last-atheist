#!/usr/bin/env python3
"""
Генератор арта для «Последний Атеист» через Google Gemini / Imagen API.
Imagen 4.0 — фоны. Gemini 2.5 Flash — персонажи (с референсами).
"""

import os
import sys
import time
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image
import io

API_KEY = os.environ.get("GEMINI_API_KEY", "")
if not API_KEY:
    print("ERROR: Set GEMINI_API_KEY environment variable")
    print("  export GEMINI_API_KEY='your-key-here'")
    sys.exit(1)
PROJECT_ROOT = Path(__file__).parent

client = genai.Client(api_key=API_KEY)

STYLE = (
    "Dark stylized 2D digital painting, semi-realistic visual novel style, "
    "dramatic cinematic lighting, slightly grotesque and expressive, "
    "black humor aesthetic, Disco Elysium art style influence. "
)

CHAR_STYLE = (
    "2D digital art, visual novel character sprite, semi-realistic style, "
    "dramatic lighting, expressive features, Disco Elysium art influence. "
    "Full body portrait on plain solid dark background. "
)

# ========================
# ПЕРСОНАЖИ
# ========================
CHARACTERS = {
    "mc": {
        "dir": "assets/characters/mc",
        "ref_prompt": (
            CHAR_STYLE +
            "A charismatic 38-year-old Russian man named Alexey Volkov. "
            "Short messy dark brown hair, 3-day stubble, sharp clever grey eyes, "
            "thin face with angular jawline. Wearing a dark navy hoodie over a black t-shirt, "
            "dark jeans, sneakers. Lean build, medium height. "
            "Neutral confident expression, standing straight, hands in pockets. "
            "Full body view, facing viewer."
        ),
        "expressions": {
            "normal": "Neutral confident expression, slight knowing look, relaxed posture, hands in hoodie pockets.",
            "shock": "SHOCKED expression - eyes extremely wide, eyebrows raised high, mouth agape, body leaning back, hands out defensively. Pale face.",
            "angry": "ANGRY expression - furrowed brows, clenched jaw, pointing finger aggressively, tense aggressive stance, face slightly red.",
            "despair": "DESPAIR expression - slumped shoulders, head hanging down, arms limp at sides, hollow empty eyes, completely defeated and broken posture.",
            "smirk": "SARCASTIC SMIRK - one eyebrow raised high, corner of mouth pulled up in a smug half-smile, arms crossed, cocky tilted head.",
        }
    },
    "angel": {
        "dir": "assets/characters/angel",
        "ref_prompt": (
            CHAR_STYLE +
            "A biblical angel who looks like a tired government security guard. "
            "Tall imposing figure in ornate white-gold armor, large feathered wings folded behind. "
            "Flaming sword held loosely at side. Square jaw, tired eyes with dark circles, "
            "short blond military haircut. Expression of utter bureaucratic exhaustion. "
            "Full body view, facing viewer."
        ),
        "expressions": {
            "stern": "Stern official expression, holding clipboard, standing at attention but clearly tired. Military posture.",
            "bored": "Extremely BORED - heavy-lidded eyes, stifling a yawn, leaning on sword like a cane, slouched wings.",
        }
    },
    "demon": {
        "dir": "assets/characters/demon",
        "ref_prompt": (
            CHAR_STYLE +
            "A demon who works as an office bureaucrat. "
            "Dark reddish skin, two small curved horns on forehead, pointed ears. "
            "Wearing a perfectly pressed grey business suit with red tie and name badge. "
            "Round glasses, thinning black hair combed neatly. Average build. "
            "Polite professional smile that is subtly unsettling. "
            "Full body view, facing viewer."
        ),
        "expressions": {
            "smile": "Polite customer service SMILE - hands clasped professionally, head slightly tilted, helpful but creepy expression.",
            "paperwork": "Holding a tall stack of papers and a clipboard, reading glasses low on nose, focused expression, pen behind ear.",
            "angry": "FURIOUS - horns glowing red-hot, papers flying everywhere, pointing accusingly, fangs bared, suit disheveled.",
        }
    },
    "soul": {
        "dir": "assets/characters/soul",
        "ref_prompt": (
            CHAR_STYLE +
            "A human soul in the afterlife - a translucent ghostly figure. "
            "Middle-aged man, slightly see-through with a soft blue-white ethereal glow. "
            "Wearing the clothes he died in - casual shirt and pants. "
            "Faded, washed-out colors. Floating slightly above ground. "
            "Full body view, facing viewer."
        ),
        "expressions": {
            "sad": "SAD expression - downturned mouth, teary ghostly eyes, shoulders slumped, wringing translucent hands.",
            "resigned": "RESIGNED calm - tired half-smile of acceptance, arms at sides, peaceful but weary expression.",
        }
    },
    "inna": {
        "dir": "assets/characters/inna",
        "ref_prompt": (
            CHAR_STYLE +
            "A beautiful 30-year-old Russian woman, HR manager at an IT office. "
            "Long flowing dark hair, sharp clever dark eyes, confident charming smile. "
            "Wearing a stylish fitted black blazer over a dark red silk blouse, "
            "black pencil skirt, black high heels. Name badge on blazer. "
            "Normal human woman - NO horns, NO tail, NO demonic features. "
            "Pale smooth skin, natural human appearance. Slim tall figure. "
            "Confident professional stance, one hand on hip. "
            "She looks strikingly similar to a classic femme fatale but in a corporate setting. "
            "Full body view, facing viewer."
        ),
        "expressions": {
            "flirt": "FLIRTY expression - playful half-smile, one eyebrow raised, head slightly tilted, hand on hip, confident seductive stance. Charming and inviting.",
            "laugh": "LAUGHING expression - genuine warm laugh, eyes crinkled with amusement, hand near mouth, relaxed joyful posture. Beautiful genuine smile.",
            "serious": "SERIOUS PROFESSIONAL expression - clipboard in hand, stern focused look, glasses pushed up, straight posture. Corporate authority.",
            "tender": "TENDER SOFT expression - gentle warm smile, soft eyes, head slightly tilted, arms relaxed. Vulnerable and genuine warmth.",
        }
    },
}

# ========================
# СЦЕНЫ (Imagen 4.0)
# ========================
SCENES = {
    "prologue/apartment.jpg": (
        STYLE +
        "Interior of a small Moscow apartment kitchen at morning. "
        "Warm golden light through frosted window. Coffee mug steaming on table next to stack of science books. "
        "Fridge with magnets. Slightly messy but cozy. Modern Russian apartment. "
        "Wide panoramic 16:9 composition, visual novel background, no people."
    ),
    "prologue/office.jpg": (
        STYLE +
        "Modern IT open-plan office in Moscow. Multiple monitors showing code. "
        "Evening - some desk lamps on, city lights through floor-to-ceiling windows. "
        "Ergonomic chairs, coffee cups, sticky notes. Cold bluish lighting. "
        "Wide panoramic 16:9 composition, visual novel background, no people."
    ),
    "prologue/street.jpg": (
        STYLE +
        "Moscow street at dusk, grey autumn sky. Small golden-domed Orthodox church in background. "
        "Modern buildings, parked cars, street lamps flickering on. Wet asphalt reflecting lights. "
        "Melancholic atmosphere, leaves blowing. "
        "Wide panoramic 16:9 composition, visual novel background, no people."
    ),
    "prologue/phone_screen.jpg": (
        STYLE +
        "Extreme close-up of smartphone screen showing an internet forum in dark mode. "
        "Thread title about proving God exists. Reddit-like interface. "
        "Username 'GodIsReal777' visible. Reply box at bottom with blinking cursor. "
        "Notification badges. Moody dark blue light. "
        "Wide 16:9 composition, visual novel background."
    ),
    "judgment/hall.jpg": (
        STYLE +
        "Enormous heavenly hall of divine judgment. Infinite white marble columns reaching into golden clouds above. "
        "Floor of polished gold-veined marble. Symbols of all world religions carved into pillars. "
        "Ethereal golden light pouring from above. Tiny silhouettes in an endless queue stretching to horizon. "
        "Biblical epic scale. Wide panoramic 16:9 composition, visual novel background."
    ),
    "judgment/queue.jpg": (
        STYLE +
        "Closer view inside heavenly hall - a queue of ghostly translucent souls. "
        "People from different eras and cultures standing in line. "
        "Marble columns, soft golden ambient light, peaceful but tense atmosphere. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "judgment/throne.jpg": (
        STYLE +
        "Overwhelming divine radiance. A blinding source of pure white-gold light emanating from above. "
        "Impossible to look at directly. Light rays piercing through golden mist. "
        "A tiny human silhouette standing alone before infinite divine presence. "
        "Sense of absolute power and judgment. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "judgment/review.jpg": (
        STYLE +
        "Surreal space filled with floating translucent screens showing fragments of a life. "
        "Childhood photos, university lecture, office cubicle, computer screen with forum arguments. "
        "Screens arranged in a spiral around a central point. Golden ethereal mist. "
        "Life flashing before eyes scene. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "hell/gates.jpg": (
        STYLE +
        "Massive gates of hell made of twisted black iron. Dark red sky with smoke. "
        "Above the gates a modern LED display reads 'ДОБРО ПОЖАЛОВАТЬ' (Welcome) in Russian. "
        "A ticket machine like in a government office stands next to the gate, colored red with tiny horns. "
        "Fire and lava glow behind the gates. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "hell/office.jpg": (
        STYLE +
        "A government bureaucratic office, but in hell. Grey cubicles, fluorescent yellow lighting. "
        "Yellow sulfurous haze in the air. Queue number display showing '7394' on wall. "
        "Filing cabinets with small flames licking their edges. Motivational poster: 'Abandon hope'. "
        "Absurd and darkly funny. "
        "Wide panoramic 16:9 composition, visual novel background, no people."
    ),
    "hell/cauldrons.jpg": (
        STYLE +
        "Hell landscape with rows of large iron cauldrons bubbling over fires. "
        "Each cauldron has a numbered tag like a parking spot. Industrial aesthetic mixed with medieval. "
        "Dark rocky cavern with rivers of lava. Red-orange hellfire lighting. "
        "Some treadmills and exercise bikes visible nearby - modern twist on eternal punishment. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "hell/debate_room.jpg": (
        STYLE +
        "University lecture hall but in the underworld. Dark academia aesthetic. "
        "Podium with a chalkboard showing 'PROVE GOD DOESN'T EXIST'. "
        "Rows of old wooden seats. Infernal symbols and pentagram decorations on dark stone walls. "
        "Dim reddish lighting from torches. A projector screen. "
        "Wide panoramic 16:9 composition, visual novel background, no people."
    ),
    "hell/bar.jpg": (
        STYLE +
        "A cozy underground bar carved into hell's rocky walls. "
        "Hand-painted sign: 'У Последнего Атеиста' (The Last Atheist's Bar) in Russian. "
        "Bar counter built from repurposed pitchforks and brimstone. Warm amber lighting from candles. "
        "Shelves of mysterious bottles, pool table, mismatched stools. Surprisingly warm and inviting. "
        "Wide panoramic 16:9 composition, visual novel background."
    ),
    "transitions/menu_bg.jpg": (
        STYLE +
        "Dark cinematic title screen. Silhouette of a man standing on a narrow bridge. "
        "Above - golden heavenly light with clouds and angel wings. "
        "Below - red hellfire, smoke, and demonic shapes. "
        "The man is in the exact center, caught between heaven and hell. "
        "Embers and particles floating. Dramatic vertical composition. Wide 16:9."
    ),
}


def generate_with_imagen(prompt, output_path, aspect_ratio="16:9", retries=3):
    """Generate image with Imagen 4.0."""
    for attempt in range(retries):
        try:
            print(f"  [Imagen] {output_path.name} (attempt {attempt+1})...")
            response = client.models.generate_images(
                model="imagen-4.0-generate-001",
                prompt=prompt,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio=aspect_ratio,
                )
            )
            if response.generated_images:
                img_bytes = response.generated_images[0].image.image_bytes
                output_path.parent.mkdir(parents=True, exist_ok=True)
                with open(output_path, "wb") as f:
                    f.write(img_bytes)
                print(f"  OK: {output_path} ({len(img_bytes)//1024}KB)")
                return True
            print(f"  No image returned")
        except Exception as e:
            err = str(e)
            print(f"  ERROR: {err[:150]}")
            if "RATE_LIMIT" in err.upper() or "429" in err:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
            elif attempt < retries - 1:
                time.sleep(5)
    return False


def generate_with_gemini(prompt, output_path, reference_image=None, retries=3):
    """Generate image with Gemini 2.5 Flash (supports reference images)."""
    for attempt in range(retries):
        try:
            print(f"  [Gemini] {output_path.name} (attempt {attempt+1})...")

            contents = []
            if reference_image and reference_image.exists():
                # Upload reference image for consistency
                img_data = reference_image.read_bytes()
                contents.append(types.Part.from_bytes(data=img_data, mime_type="image/png"))
                contents.append(
                    "Using the character in this reference image, generate a new image: " + prompt
                )
            else:
                contents.append("Generate an image: " + prompt)

            response = client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                )
            )

            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    img_bytes = part.inline_data.data
                    output_path.parent.mkdir(parents=True, exist_ok=True)
                    with open(output_path, "wb") as f:
                        f.write(img_bytes)
                    print(f"  OK: {output_path} ({len(img_bytes)//1024}KB)")
                    return True

            print(f"  No image in response")
        except Exception as e:
            err = str(e)
            print(f"  ERROR: {err[:150]}")
            if "RATE_LIMIT" in err.upper() or "429" in err:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
            elif attempt < retries - 1:
                time.sleep(5)
    return False


def generate_characters():
    """Generate character sprites: reference first, then expressions."""
    print("\n" + "="*50)
    print("ГЕНЕРАЦИЯ ПЕРСОНАЖЕЙ")
    print("="*50)

    for char_id, char_data in CHARACTERS.items():
        char_dir = PROJECT_ROOT / char_data["dir"]
        char_dir.mkdir(parents=True, exist_ok=True)
        ref_path = char_dir / "_reference.png"

        print(f"\n--- Персонаж: {char_id} ---")

        # 1. Generate reference image
        if not ref_path.exists():
            print(f"  Создаю референс...")
            if not generate_with_gemini(char_data["ref_prompt"], ref_path):
                print(f"  ! Не удалось создать референс, пропускаю персонажа")
                continue
            time.sleep(4)
        else:
            print(f"  Референс уже есть: {ref_path}")

        # 2. Generate each expression using reference
        for expr_name, expr_desc in char_data["expressions"].items():
            output = char_dir / f"{expr_name}.png"
            if output.exists():
                print(f"  SKIP: {expr_name}.png (exists)")
                continue

            full_prompt = (
                CHAR_STYLE +
                f"Same exact character as in the reference image. Same face, hair, clothing, body type. "
                f"Only change the expression and pose: {expr_desc} "
                f"Full body portrait on solid dark background."
            )

            generate_with_gemini(full_prompt, output, reference_image=ref_path)
            time.sleep(4)


def generate_scenes():
    """Generate scene backgrounds with Imagen 4.0."""
    print("\n" + "="*50)
    print("ГЕНЕРАЦИЯ СЦЕН")
    print("="*50)

    for filename, prompt in SCENES.items():
        output = PROJECT_ROOT / "assets" / "scenes" / filename
        if output.exists():
            print(f"\nSKIP: {filename} (exists)")
            continue

        print(f"\n--- {filename} ---")
        generate_with_imagen(prompt, output, aspect_ratio="16:9")
        time.sleep(4)


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"

    if mode in ("characters", "chars", "all"):
        generate_characters()
    if mode in ("scenes", "bg", "all"):
        generate_scenes()

    print("\n" + "="*50)
    print("ГЕНЕРАЦИЯ ЗАВЕРШЕНА")
    print("="*50)

    # Report
    chars = list((PROJECT_ROOT / "assets" / "characters").rglob("*.png"))
    scenes = list((PROJECT_ROOT / "assets" / "scenes").rglob("*.jpg"))
    print(f"Спрайтов: {len(chars)}")
    print(f"Фонов: {len(scenes)}")
