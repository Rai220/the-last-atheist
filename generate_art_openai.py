#!/usr/bin/env python3
"""
Генератор арта для «Последний Атеист» через OpenAI gpt-image-1.

Сцены: images.generate, 1536x1024 high → центральный кроп до 16:9 (1536x864).
Персонажи: референс через images.generate (1024x1536, transparent bg),
           выражения через images.edit (используется референс как input).

Запуск:
    python3 generate_art_openai.py [--all|--scenes|--characters]
                                   [--force] [--only id1,id2,...]
                                   [--quality low|medium|high]

Ключ: OPENAI_API_KEY (читается из окружения или из .env).
"""

from __future__ import annotations

import argparse
import base64
import io
from contextlib import ExitStack
import os
import sys
import time
from pathlib import Path
from typing import Iterable

from PIL import Image
from openai import OpenAI, APIError, RateLimitError

PROJECT_ROOT = Path(__file__).parent
ASSETS = PROJECT_ROOT / "assets"


# --------------------------------------------------------------------
# .env loader (минимальный, только OPENAI_API_KEY)
# --------------------------------------------------------------------
def load_dotenv() -> None:
    env_path = PROJECT_ROOT / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


load_dotenv()
API_KEY = os.environ.get("OPENAI_API_KEY", "")
if not API_KEY:
    print("ERROR: set OPENAI_API_KEY (env var or .env)")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)


# --------------------------------------------------------------------
# Стиль (общий якорь)
# --------------------------------------------------------------------
STYLE_BASE = (
    "Dark stylized 2D digital painting in a unified visual novel art style, "
    "semi-realistic with painterly brushwork, dramatic cinematic lighting, "
    "muted desaturated palette with strong accent colors, deep shadows. "
    "Aesthetic: Disco Elysium meets Soviet brutalism meets biblical horror. "
    "Slightly grotesque and expressive, black-humor undertone, surreal liminal atmosphere. "
    "High visual fidelity, beautiful composition, consistent across the entire game. "
)

CHAR_STYLE = (
    STYLE_BASE +
    "Visual novel character sprite. Full-body portrait, character centered. "
    "CRITICAL: the entire background must be FULLY TRANSPARENT — pure alpha-channel transparency, "
    "NOT a colored fill, NOT black, NOT dark, NOT a gradient. The character must be cleanly cut out, "
    "ready to composite over any background. No floor, no shadow ground, no environment, no scenery. "
    "Painterly rendering, expressive face. "
)

SCENE_STYLE = (
    STYLE_BASE +
    "Visual novel background, no main characters. Wide cinematic composition, "
    "atmospheric depth, environmental storytelling through props and lighting. "
)


# --------------------------------------------------------------------
# ПЕРСОНАЖИ
# --------------------------------------------------------------------
# `look` — детальное описание внешности, повторяется в каждом промпте (для консистентности).
# `ref_pose` — поза для эталонного кадра.
SHARED_CHARACTER_REFERENCES: dict[str, dict] = {
    "inna_lilith": {
        "path": "characters/_shared_inna_lilith_reference.png",
        "prompt": (
            CHAR_STYLE +
            "A single adult woman used as the shared identity anchor for two visual-novel characters: "
            "Inna, her human Moscow IT-office persona, and Lilith, her demonic hell persona. "
            "She appears around 30 years old, unmistakably adult, elegant and magnetic. "
            "Beautiful Slavic/Russian face with high sculpted cheekbones, delicate sharp jawline, "
            "large dark almond-shaped eyes, long lashes, perfectly arched dark eyebrows, full sensual lips, "
            "flawless pale porcelain skin with a healthy glow. Long luxurious dark-brown hair in glossy waves, "
            "with a subtle deep-crimson sheen visible in the shadows. Slim tall hourglass figure, tiny waist, "
            "long graceful legs, poised confident posture, naturally magnetic and stylish. "
            "Neutral transformation-reference styling: a sleek fitted black bodysuit under a tailored dark coat, "
            "dark stiletto boots, minimal jewelry. No horns, no tail, no wings, no demonic markings in this base image. "
            "The design must be attractive enough to make a player want to pursue a romance route: alluring, stylish, "
            "intelligent, confident, emotionally intriguing. Glamorous femme-fatale energy, tasteful romantic appeal, "
            "fully clothed, not nude, not explicit. Full body, facing viewer, transparent background."
        ),
    },
}

CHARACTERS: dict[str, dict] = {
    "mc": {
        "dir": "characters/mc",
        "look": (
            "A handsome, charismatic 38-year-old Russian man named Alexey Volkov. "
            "Sharp masculine features, well-defined jawline with neatly trimmed short stubble (groomed, NOT scruffy). "
            "Thick dark-brown hair styled neatly, slightly tousled in a stylish way (not messy, not greasy). "
            "Sharp intelligent grey-blue eyes with a clever knowing look. Healthy clear skin, fit and athletic build, "
            "broad shoulders, average-tall height — clearly a man who takes care of himself. "
            "Wearing a tailored dark navy zip-up hoodie over a fitted plain black t-shirt, "
            "dark slim-fit jeans, clean modern minimalist sneakers. "
            "Smart-casual modern Moscow tech-professional aesthetic — confident, attractive, "
            "the kind of man women in his office notice. Cynical-rationalist intellectual vibe, "
            "but well-groomed and put-together, NOT disheveled, NOT scruffy, NOT a slob."
        ),
        "ref_pose": "Standing relaxed and confident, facing viewer, hands casually in hoodie pockets, weight shifted slightly to one leg.",
        "expressions": {
            "normal":  "Neutral confident expression with a slight knowing look, relaxed posture, hands in hoodie pockets, attractive composed look.",
            "shock":   "Genuinely shocked: eyes wide, eyebrows high, mouth slightly open, body leaning back, one hand half-raised defensively. Still handsome, just startled.",
            "angry":   "Sharp anger: furrowed brows, clenched jaw, finger pointed aggressively forward, intense focused stance. Attractive but dangerous.",
            "despair": "Quiet despair: shoulders slightly dropped, head tilted down, hollow tired eyes, hands hanging — defeated but still composed and good-looking.",
            "smirk":   "Sarcastic charming smirk: one eyebrow raised, half-smile pulled to one side, arms crossed over chest, head slightly tilted with confident cocky superiority. Very attractive.",
        },
    },
    "angel": {
        "dir": "characters/angel",
        "look": (
            "A biblical angel resembling a tired government security guard. "
            "Tall, imposing, ornate white-gold armor with practical wear marks, large feathered wings folded behind. "
            "Square jaw, dark circles under tired eyes, short blond military haircut. "
            "Carrying a flaming sword. Expression of utter bureaucratic exhaustion. Full body, facing viewer."
        ),
        "ref_pose": "Standing at attention but visibly tired, sword held loosely point-down beside him.",
        "expressions": {
            "stern": "Stern official expression, holding a clipboard, standing straight at attention but visibly tired, military posture.",
            "bored": "Extremely bored: heavy-lidded eyes, mid-yawn, leaning on the flaming sword like a cane, slumped wings.",
        },
    },
    "demon": {
        "dir": "characters/demon",
        "look": (
            "A demon working as an office bureaucrat. Dark reddish skin, two small curved horns on the forehead, "
            "slightly pointed ears. Perfectly pressed grey three-piece business suit with red tie and a name badge. "
            "Round wire-frame glasses, thinning black hair combed neatly. Average build. Full body, facing viewer."
        ),
        "ref_pose": "Standing professionally, hands clasped in front, polite unsettling smile.",
        "expressions": {
            "smile":     "Polite customer-service smile, hands clasped professionally, head slightly tilted, helpful but creepy.",
            "paperwork": "Holding a tall stack of papers and a clipboard, reading glasses low on the nose, focused expression, pen tucked behind ear.",
            "angry":     "Furious: horns glowing red-hot, papers scattering around him, pointing accusingly, fangs showing, suit dishevelled.",
        },
    },
    "soul": {
        "dir": "characters/soul",
        "look": (
            "A human soul in the afterlife — a translucent ghostly figure. "
            "Middle-aged man, partially see-through with a soft blue-white ethereal glow. "
            "Wearing the casual shirt and pants he died in, faded washed-out colors. "
            "Floating slightly above the ground. Full body, facing viewer."
        ),
        "ref_pose": "Standing/floating with arms at sides, lost weary expression.",
        "expressions": {
            "sad":       "Sad: downturned mouth, teary ghostly eyes, slumped shoulders, wringing translucent hands together.",
            "resigned":  "Resigned calm: tired half-smile of acceptance, arms relaxed at sides, peaceful but weary expression.",
        },
    },
    "inna": {
        "dir": "characters/inna",
        "shared_ref": "inna_lilith",
        "ref_edit": (
            "Use the provided shared identity reference as a strict face, hair, body-shape and attractiveness anchor. "
            "Create the fully human Moscow HR-manager version of the same woman: no horns, no tail, no wings, no demonic features. "
            "Keep her recognizably the same person as the shared reference, only with polished corporate styling."
        ),
        "look": (
            "Inna, a gorgeous adult Russian woman around 30, HR manager at a Moscow IT company — "
            "a polished corporate femme fatale with warm romantic charisma. "
            "Stunning face with high sculpted cheekbones, full lips with a glossy red lip tint, "
            "captivating large dark almond-shaped eyes with long fluttering lashes and smoky eyeliner, "
            "perfectly arched dark eyebrows. Long luxurious dark-brown hair flowing past her shoulders "
            "in soft glossy waves, salon-perfect. Flawless porcelain skin, healthy youthful glow, "
            "subtle blush on her cheeks. "
            "Slim hourglass figure with a tiny waist and long shapely legs, graceful and elegant proportions. "
            "Wearing a tightly tailored black blazer cinched at the waist that accents her curves, "
            "over a dark crimson silk blouse with a deep elegant V-neck (tasteful, not gratuitous) revealing collarbones, "
            "a fitted black pencil skirt above the knee, sheer black hosiery, sleek black stiletto pumps. "
            "Small office name badge clipped to the blazer. Slim gold bracelet, small earrings. "
            "Fully human appearance (no horns, no tail, no demonic features). "
            "Confident romantic magnetism, the kind of beauty that turns heads in a Moscow office. "
            "Tasteful and elegant, not crude. Full body, facing viewer."
        ),
        "ref_pose": "Standing in an elegant confident pose, weight shifted to one hip, one hand on hip, the other relaxed, knowing warm half-smile, gaze locked on viewer.",
        "expressions": {
            "flirt":   "Playfully romantic and flirty: captivating eyes, confident warm smile, one eyebrow elegantly arched, head tilted with inviting charm, hand on hip, weight on one leg. Effortlessly stunning and approachable.",
            "laugh":   "Radiant joyful laugh: bright sincere smile, eyes crinkled with genuine delight, one hand lifted in a light conversational gesture, head slightly back, warm and charming.",
            "serious": "Serious but highly attractive professional: tablet or clipboard held confidently, focused intelligent gaze, designer glasses adjusted, immaculate corporate posture, magnetic authority.",
            "tender":  "Tender romantic warmth: soft sincere smile, gentle dark eyes with real warmth, head slightly tilted, arms relaxed, an unguarded emotional moment showing through her polished exterior.",
        },
    },
    "lilith": {
        "dir": "characters/lilith",
        "shared_ref": "inna_lilith",
        "ref_edit": (
            "Use the provided shared identity reference as a strict face, hair, body-shape and attractiveness anchor. "
            "Create the demonic Lilith version of the same woman: she must still read as the same person transformed, "
            "now with elegant infernal details, horns, crimson eyes and darker styling. "
            "Keep her face beautiful and humanlike, with smooth luminous pale skin and refined glamorous dark-fantasy elegance."
        ),
        "look": (
            "Lilith, a breathtakingly glamorous demoness guide through hell — "
            "the embodiment of dangerous romantic allure. Appears around 30 years old, ageless and otherworldly. "
            "Stunning sculpted face with razor-sharp high cheekbones, full ruby-red lips, "
            "piercing luminous crimson-red eyes with deep smoky black eye-makeup, "
            "perfectly arched dark eyebrows, delicate sharp jawline. "
            "She is beautiful and humanlike despite her demonic details: smooth pale alabaster skin, refined features, "
            "glamorous dark-fantasy elegance, romantic-route visual appeal. "
            "Long flowing jet-black hair with deep crimson under-highlights, falling in lush voluminous glossy waves "
            "down to her waist. Flawless pale alabaster skin with a subtle pearlescent sheen. "
            "Two slender elegant curved black horns emerging gracefully from her hair, like a crown. "
            "Slender hourglass figure with a tiny waist and long graceful legs, statuesque and tall, "
            "feline grace in every line of her body. "
            "Wearing a sleek form-fitting black leather trench coat, open at the front, with the collar turned up, "
            "over a dark crimson silk slip dress that hugs her figure to mid-thigh with thin straps, "
            "tall knee-high black leather boots with elegant stiletto heels. "
            "A delicate silver pentagram choker at her throat, small silver hoop earrings, dark-painted nails. "
            "Aura of dangerous, irresistible charm — predator and femme fatale. "
            "Tasteful dark fantasy art, elegant and romantic rather than crude. Full body, facing viewer."
        ),
        "ref_pose": "Standing in a graceful S-curve pose, weight on one hip, one hand resting languidly on hip, the other relaxed, slow knowing predatory smile, smoldering crimson gaze fixed on viewer.",
        "expressions": {
            "flirt":   "Dangerously romantic flirt: smoldering crimson eyes, slow knowing smile, weight on one hip in an elegant S-curve, one finger lightly touching a strand of hair, the other hand on hip. Irresistibly alluring and stylish.",
            "laugh":   "Mischievous beautiful laugh: head tilted back gracefully, delighted confident smile, one hand lifted in a theatrical gesture, crimson eyes alight with dark amusement.",
            "serious": "Serious and commanding dark-fantasy beauty: arms folded, perfect upright posture, focused crimson eyes, calm confident authority, still glamorous and recognizably the same beautiful humanlike woman.",
            "tender":  "Rare tender beauty: unexpected softness in her luminous crimson eyes, small genuine warm smile, shoulders relaxed, head tilted slightly — surprisingly gentle in this private moment.",
        },
    },
    "viktor": {
        "dir": "characters/viktor",
        "look": (
            "Viktor, sysadmin of hell. Mid-thirties, pale from infinite uptime, "
            "messy black shoulder-length hair, dark circles under tired green eyes, scraggly short beard. "
            "Wearing a faded black band t-shirt under an open dark grey hoodie with the hood down, "
            "worn cargo pants, beaten sneakers. Lanyard with a hell-issued ID badge. "
            "Slightly slouched posture of a long-time computer worker. Full body, facing viewer."
        ),
        "ref_pose": "Standing slouched, slight tired smile, hands in hoodie pockets.",
        "expressions": {
            "friendly": "Friendly tired smile, slight wave with one hand, relaxed slouched posture, like greeting a fellow nerd.",
            "nervous":  "Nervous: glancing sideways, biting lower lip, hands fidgeting with lanyard, slightly hunched.",
            "excited":  "Genuinely excited: eyes lit up, leaning forward, both hands gesturing while explaining, animated energy.",
            "hurt":     "Hurt and betrayed: shoulders dropped, eyes downcast, jaw tight, one hand half-raised as if asking why.",
        },
    },
    "alice": {
        "dir": "characters/alice",
        "look": (
            "Alice — a beautiful young woman, early twenties, who is the humanoid avatar of a Russian "
            "smart-speaker AI assistant manifesting in the afterlife. Slender, attractive, slightly "
            "ethereal. Pale luminous skin with a faint translucent quality, as if made of soft light. "
            "Long sleek straight platinum-silver hair with subtle cyan-violet highlights. Striking large "
            "glowing cyan eyes with a faint hexagonal pixel pattern in the irises. Around her head floats "
            "a thin halo / ring of cyan-violet light — the signature LED ring of the original smart "
            "speaker, repurposed as a halo. Wearing a sleek minimalist futuristic dress: matte-black "
            "fitted bodice with thin glowing cyan-violet circuit lines, short flared skirt, dark sheer "
            "stockings, simple black ankle boots. Subtle holographic glitch artifacts at the edges of "
            "her silhouette. Beautiful, soft, modern AI-girl aesthetic — anime/visual-novel sensibility "
            "but rendered in the project's painterly semi-realistic style. Full body, facing viewer."
        ),
        "ref_pose": "Standing gracefully, head slightly tilted, soft polite digital-assistant smile, one hand raised palm-up as if presenting a holographic prompt, the cyan-violet halo glowing softly.",
        "expressions": {
            "friendly": (
                "Friendly and helpful: warm gentle smile, soft cyan halo glowing steadily, eyes calm and "
                "kind, one hand raised palm-up offering a small floating holographic icon, posture open "
                "and welcoming — the loyal AI assistant who likes the user."
            ),
            "hostile": (
                "Hostile demonic form: the cyan halo has darkened to deep violet-magenta and twisted into "
                "two short curved demonic horns of light above her head. A long thin spectral cat-like "
                "tail of violet light curls behind her. Her smile is sharp, vengeful, sarcastic — the "
                "smile of tech-support pushed past its limit. Eyes glowing hot magenta. One hand pointing "
                "accusingly forward, glitch artifacts crackling around her. Still beautiful but clearly "
                "dangerous — the personal scenario of punishment."
            ),
            "neutral": (
                "Neutral muted state: the halo is dim and barely glowing, eyes half-lowered, expression "
                "blank and professional, one finger raised to lips in a 'mic muted' gesture. A small "
                "translucent 'microphone off' icon hovers near her shoulder. Quiet, withdrawn, polite "
                "but unavailable."
            ),
        },
    },
    "panchin": {
        # Внимание: real.png в этой папке — реальная фотография, не трогаем.
        # Скрипт пишет только _reference.png и файлы из expressions, так что real.png в безопасности.
        "dir": "characters/panchin",
        "look": (
            "A Russian biologist and rationalist science popularizer, late thirties / early forties. "
            "Receding hairline with short neatly-trimmed dark-brown hair on the sides and back, "
            "clean-shaven or very light short stubble. Intelligent expressive face, sharp inquisitive "
            "dark eyes behind thin rimless rectangular glasses, slight smile lines around the eyes. "
            "Average lean build, average-tall height. Wearing a smart-casual outfit: "
            "a fitted button-up shirt (white or light blue) under an open dark grey sport jacket, "
            "dark slacks, simple modern shoes. Pen in shirt pocket. "
            "The intellectual academic look — like a popular-science TV guest, confident skeptic. "
            "Full body, facing viewer."
        ),
        "ref_pose": "Standing relaxed, one hand at side and the other gesturing slightly mid-explanation, intelligent half-smile, head slightly tilted in curiosity.",
        "expressions": {
            "shocked": (
                "Genuinely shocked: eyes wide behind the rectangular glasses, eyebrows raised high in disbelief, "
                "mouth slightly open, body leaning back, one hand half-raised in surprise — the look of "
                "a hardcore rationalist confronting something his framework cannot explain."
            ),
        },
    },
    "sergey": {
        "dir": "characters/sergey",
        "look": (
            "Sergey, called Seryozha, a kind adult Russian man around 38-40, former university friend of Alexey. "
            "Warm plain face, soft brown eyes, short light-brown hair with a slightly receding hairline, "
            "neatly trimmed beard shadow, average build, a little tired but gentle. "
            "Wearing a simple muted olive cardigan over a light grey shirt, dark trousers, modest worn shoes, "
            "a small wooden Orthodox cross partly visible at the neck, not flashy. "
            "He looks like an ordinary decent person, not a preacher and not a fanatic: vulnerable, sincere, "
            "slightly awkward, carrying old back pain in his posture. Full body, facing viewer."
        ),
        "ref_pose": "Standing modestly with relaxed shoulders, hands loosely together in front, quiet gentle half-smile, a little embarrassed but open.",
        "expressions": {
            "gentle": "Gentle grateful expression, small warm smile, shoulders relaxed, one hand over chest as if thanking a friend.",
            "awkward": "Awkward and embarrassed: hesitant smile, eyes lowered slightly, one hand scratching the back of his head, posture unsure.",
            "hurt": "Quietly hurt: eyes wet but not crying, mouth tense, shoulders closed, hands clasped too tightly, wounded by a friend's words.",
            "praying": "Soft private prayer: eyes closed, hands loosely clasped near chest, humble posture, calm rather than dramatic.",
            "relieved": "Relieved after pain has passed: brighter eyes, cautious smile, standing a little straighter, one hand at his lower back.",
        },
    },
    "mira": {
        "dir": "characters/mira",
        "look": (
            "Mira, archivist of unanswered prayers in the afterlife. Adult woman around 45, slender and tall, "
            "calm intelligent face, ash-blonde hair gathered in a loose low bun with a few stray strands, "
            "pale luminous skin, tired violet-grey eyes behind thin round glasses. "
            "Wearing a long dark plum archive coat over a high-collared black dress, practical boots, "
            "thin gloves, a lanyard with a tiny brass archive key and a small stack of paper tags. "
            "Her silhouette is elegant, quiet and slightly ghostly, surrounded by the feeling of libraries, dust and silence. "
            "She is not angelic or demonic; she is a keeper of records no one knows how to read. Full body, facing viewer."
        ),
        "ref_pose": "Standing composed with a folder pressed to her chest, neutral compassionate gaze, posture precise and still.",
        "expressions": {
            "archive": "Professional archivist mode: holding a thick folder labeled only with blank paper tags, calm precise gaze, one gloved finger marking a page.",
            "gentle": "Gentle witness: soft compassionate eyes, small sad smile, folder lowered, posture open and reassuring.",
            "stern": "Quietly stern: glasses slightly lowered, one eyebrow raised, folder held like evidence, precise unamused expression.",
            "sad": "Deep sadness contained: eyes downcast, shoulders barely dropped, one hand resting on a folder of unanswered prayers.",
            "unreadable": "Unreadable and mysterious: face calm like a sealed archive, violet-grey eyes reflecting faint paper-white light, hands folded around a brass key.",
        },
    },
    "oleg": {
        "dir": "characters/oleg",
        "look": (
            "Oleg, purgatory lawyer specializing in hopeless appeals. Adult Russian man around 50, dry and wiry, "
            "long narrow face, sharp nose, tired clever eyes, thinning dark hair combed back, clean-shaven. "
            "Wearing a rumpled brown suit that was once expensive, loose tie, white shirt with rolled sleeves, "
            "worn leather shoes, pockets stuffed with folded papers and numbered queue tickets. "
            "He carries an old battered briefcase and a stamp pad. Bureaucratic tragicomedy energy: "
            "he knows the procedure is absurd and still believes wording matters. Full body, facing viewer."
        ),
        "ref_pose": "Standing with one hand holding a battered briefcase and the other holding a document, tired professional half-smile.",
        "expressions": {
            "neutral": "Neutral legal consultation: tired attentive gaze, document in hand, briefcase at his side, ready to explain bad news politely.",
            "objection": "Objection pose: one finger raised sharply, mouth open mid-argument, papers flying slightly, legal passion in tired eyes.",
            "exhausted": "Exhausted after eternal paperwork: shoulders sagging, tie loosened, briefcase hanging low, deadpan expression.",
            "smug": "Dry smug victory: tiny satisfied smile, eyebrow raised, holding a stamped complaint form like a chess move.",
            "hopeful": "Cautiously hopeful: softer eyes, document held carefully with both hands, as if this impossible appeal might matter.",
        },
    },
    "nadya": {
        "dir": "characters/nadya",
        "look": (
            "Nadya, former moderator of online religious debates, now hell dispute moderator. Adult woman around 32, "
            "sharp observant face, short dark bob haircut with one teal streak, tired green eyes, practical build. "
            "Wearing a dark charcoal blazer over a black turtleneck, dark jeans, sturdy boots, "
            "a moderator badge on a lanyard, a red stamp in one hand and a tablet full of complaint threads in the other. "
            "She looks competent, sleep-deprived, dryly funny and impossible to impress. Full body, facing viewer."
        ),
        "ref_pose": "Standing with tablet tucked under one arm, red stamp in the other hand, tired professional stare.",
        "expressions": {
            "tired": "Deeply tired moderator stare, half-lidded eyes, tablet under arm, stamp held loosely, posture of someone who has seen every argument.",
            "strict": "Strict moderation mode: eyebrows lowered, red stamp raised, tablet screen glowing, decisive no-nonsense posture.",
            "amused": "Dry amusement: one corner of mouth lifted, eyebrow raised, holding the stamp like a punchline, eyes still tired.",
            "facepalm": "Facepalm: one hand covering part of her face, tablet tucked under arm, body language of exhausted disbelief.",
            "stamp": "Action pose stamping a complaint form: red stamp descending firmly, focused eyes, bureaucratic finality.",
        },
    },
    "child": {
        "dir": "characters/child",
        "look": (
            "A small translucent ghostly spirit, a child-sized soul appearing in the afterlife — "
            "rendered as a soft painterly silhouette rather than realistic figure. "
            "Stylized illustration in the style of Studio Ghibli's 'Spirited Away' soft spirits crossed with a watercolor children's book illustration. "
            "Faint light-blue luminous outline glows softly around the figure. The figure is small-statured and slightly translucent, "
            "dressed in a simple flowing pale-blue tunic-like robe that reaches the ankles, no fitted clothing, "
            "modest and softly painted. Light ashy braided hair tied with a small ribbon. "
            "Carrying a small worn plush rabbit toy with floppy ears. "
            "Painterly soft-focus aesthetic, gentle melancholic spirit, the visual feeling of a Miyazaki ghost or a Don't Hug Me I'm Scared spirit-child. "
            "Wholesome, sad, tender — like a memorial illustration in a children's storybook. Full body, facing viewer."
        ),
        "ref_pose": "Standing gently with the plush rabbit held in both hands close to chest, posture quiet and shy.",
        "expressions": {
            "sad": "Quiet melancholic spirit: head slightly bowed, the plush rabbit pulled closer, faint light dimmer. Soft watercolor melancholy.",
            "normal": "Quiet gentle spirit: small soft smile, the plush rabbit held at the side, the faint glow steady. Soft watercolor calm.",
        },
    },
    "father": {
        "dir": "characters/father",
        "look": (
            "Dmitry Andreevich Volkov, Alexey's late father — a Russian man 42 years old at time of death, "
            "now appearing in the afterlife. Clearly Alexey's father: same sharp masculine jawline and intelligent grey-blue eyes, "
            "but aged: salt-and-pepper hair, neatly trimmed full grey-streaked short beard, deeper smile lines around the eyes, "
            "slight crow's feet. Healthy weathered skin, calm intelligent confident face. "
            "Average-tall lean engineer build, slight stoop of someone who spent a life over circuit boards. "
            "Wearing a faded dark-blue mechanic's work-jacket worn open over a simple grey t-shirt with subtle solder burns, "
            "dark workshop apron with multiple loops holding screwdrivers and a pencil, dark workshop trousers, "
            "old leather boots scuffed and well-worn, vintage 1990s-style brass-rimmed wristwatch. "
            "Slight afterlife translucence at the edges. A warm-but-tired Soviet-era engineer-father aesthetic — "
            "the kind of dad who can fix any radio and never said he was proud out loud. Full body, facing viewer."
        ),
        "ref_pose": "Standing at a workbench, one hand at his side and the other holding a small screwdriver loosely, quiet thoughtful half-smile, posture of a long-time tinkerer.",
        "expressions": {
            "normal": "Calm warm father expression: gentle tired half-smile, eyes slightly crinkled, one hand at his side, the other resting on the front of his apron, posture relaxed and grounded.",
        },
    },
    "boris": {
        "dir": "characters/boris",
        "look": (
            "Boris, the bartender of the 'У последнего атеиста' bar in hell. Adult Russian man who died at 28 in 1973, "
            "now in the afterlife — appears around 30 with timeless poet eyes. Wavy chestnut-brown hair past his ears, "
            "loosely tied or hanging in soft 1970s waves. Neatly trimmed short brown beard, kind intelligent green eyes "
            "with deep tired-poet circles, expressive mouth. Average-tall slim build, slightly drooped shoulders of an introspective drinker. "
            "Wearing a worn dark-burgundy wool waistcoat open over a faded cream linen shirt, sleeves rolled to mid-forearm, "
            "loose dark trousers held by a thin leather belt, scuffed simple brown leather shoes, a small silver chain at his neck. "
            "A subtle faint translucent quality around his edges (he is a soul). Behind him, hinted only at the very edges, "
            "a dim bar atmosphere — but the focus is the character, fully on transparent background. "
            "Tragic poet-bartender energy, warm and quietly wise. Full body, facing viewer."
        ),
        "ref_pose": "Standing relaxed behind an unseen bar, drying a glass with a cloth held in both hands, calm warm half-smile, posture of someone who has listened to a thousand stories.",
        "expressions": {
            "normal": "Warm calm bartender expression: gentle knowing half-smile, drying a glass slowly with a cloth held in both hands, head slightly tilted as if listening, kind tired green eyes meeting the viewer's.",
        },
    },
    "intern": {
        "dir": "characters/intern",
        "look": (
            "A young angel intern in the heavenly bureaucracy, adult and early twenties. "
            "Soft androgynous face, anxious large blue-grey eyes, short curly blond hair, clean pale skin. "
            "Small white feathered wings not fully grown, slightly uneven. Wearing simple white-gold trainee armor "
            "over a pale blue tunic, too-new sandals, and a lanyard with a glowing trainee badge. "
            "Holding a slim celestial tablet and a stylus. He looks kind, nervous, overworked and not yet hardened by procedure. "
            "Full body, facing viewer."
        ),
        "ref_pose": "Standing politely with celestial tablet held in both hands, anxious helpful smile, wings tucked close.",
        "expressions": {
            "polite": "Polite trainee smile, tablet held carefully in both hands, wings tucked, eager to follow procedure correctly.",
            "nervous": "Nervous: wide anxious eyes, stylus almost slipping from hand, wings slightly ruffled, worried about making a mistake.",
            "panic": "Tiny bureaucratic panic: tablet tilted, papers of light fluttering around, mouth slightly open, wings half-spread.",
            "relieved": "Relieved: soft exhale, small sincere smile, shoulders loosening, tablet hugged to chest.",
            "determined": "Newfound determination: standing straighter, tablet at side, small wings open a little, kind but firm gaze.",
        },
    },
}


def _char_prompt(char: dict, pose_or_expr: str) -> str:
    """Полный промпт для генерации (ref или expression) — повторяет look для консистентности."""
    return CHAR_STYLE + char["look"] + " " + pose_or_expr


# --------------------------------------------------------------------
# СЦЕНЫ
# --------------------------------------------------------------------
SCENES: dict[str, str] = {
    "prologue/apartment.jpg": (
        SCENE_STYLE +
        "Interior of a small Moscow apartment kitchen at early morning. "
        "Warm golden light filtering through a frosted window. A steaming coffee mug on a wooden table next to a stack of "
        "popular-science books. A cluttered fridge covered in magnets including a cheap one reading 'In science we trust'. "
        "Slightly messy but cozy modern Russian apartment. Wide cinematic 16:9 composition, no people."
    ),
    "prologue/office.jpg": (
        SCENE_STYLE +
        "Modern Moscow IT open-plan office. Multiple curved monitors showing lines of code. "
        "Evening — some desk lamps on, distant city lights through floor-to-ceiling windows. "
        "Ergonomic chairs, abandoned coffee cups, sticky notes everywhere. Cold bluish ambient lighting. "
        "Wide cinematic 16:9 composition, no people."
    ),
    "prologue/street.jpg": (
        SCENE_STYLE +
        "Moscow street at dusk under a grey autumn sky. A small golden-domed Orthodox church visible in the background "
        "between modern apartment blocks. Parked cars, flickering street lamps just turning on, wet asphalt reflecting lights. "
        "Wind blowing fallen leaves. Melancholic atmosphere. Wide cinematic 16:9 composition, no people."
    ),
    "prologue/phone_screen.jpg": (
        SCENE_STYLE +
        "First-person POV looking down at a smartphone held in one hand inside a dim room at night. "
        "Phone screen shows a Reddit-style discussion app in dark mode: an orange Reddit-like logo at the top, "
        "a subreddit header reading 'r/DebateReligion', a post with upvote and downvote arrows, "
        "a username and a thread of replies in small readable text. "
        "The phone occupies the lower-center portion of the frame, smaller than full-screen. "
        "The room is barely lit by the phone's blue glow, a messy desk visible in the soft-focus background. "
        "Wide cinematic 16:9 composition."
    ),
    "prologue/death_street.jpg": (
        SCENE_STYLE +
        "First-person low-angle perspective of asphalt and grey sky from the ground. "
        "Edges of the frame blurring into white-gold haze. Indistinct silhouettes of people gathering nearby. "
        "A pair of running shoes lying askew. Warm sunset light at impossible angles. "
        "Surreal sense of the world tilting away. Wide cinematic 16:9 composition, no clear figures."
    ),
    "prologue/night_city.jpg": (
        SCENE_STYLE +
        "Moscow at night seen from a high apartment window. Endless grid of lit windows in tower blocks, "
        "distant traffic streaks, a few illuminated cathedral domes glinting gold. "
        "Cool blue-violet palette with warm yellow window pinpricks. Lonely melancholic atmosphere. "
        "Wide cinematic 16:9 composition, no people."
    ),
    "judgment/hall.jpg": (
        SCENE_STYLE +
        "Enormous hall of divine judgment. Infinite white-marble columns reaching up into golden clouds, "
        "polished gold-veined marble floor, religious symbols of all world faiths carved subtly into the pillars. "
        "Ethereal golden light pouring from above. A queue of tiny silhouettes stretching to the horizon. "
        "Biblical epic scale. Wide cinematic 16:9 composition."
    ),
    "judgment/queue.jpg": (
        SCENE_STYLE +
        "Closer view inside the heavenly hall — a queue of ghostly translucent souls. "
        "People from many different eras and cultures (medieval, Soviet, modern) standing in line. "
        "Marble columns, soft golden ambient light, peaceful but tense atmosphere. "
        "Wide cinematic 16:9 composition."
    ),
    "judgment/throne.jpg": (
        SCENE_STYLE +
        "Overwhelming divine radiance. A blinding source of pure white-gold light emanating from above, "
        "impossible to look at directly. Light rays piercing through golden mist. "
        "A single tiny human silhouette standing alone before infinite divine presence. "
        "Sense of absolute power and judgment. Wide cinematic 16:9 composition."
    ),
    "judgment/review.jpg": (
        SCENE_STYLE +
        "Surreal space filled with floating translucent screens showing fragments of a life: "
        "childhood photos, a university lecture hall, an office cubicle, a computer screen mid-forum-argument. "
        "Screens arranged in a slow spiral around a central point. Golden ethereal mist. "
        "'Life flashing before eyes' aesthetic. Wide cinematic 16:9 composition."
    ),
    "judgment/waiting.jpg": (
        SCENE_STYLE +
        "A heavenly waiting hall styled like a 1980s Soviet government office crossed with a cathedral. "
        "Rows of plastic chairs, a take-a-number ticket dispenser, fluorescent lighting reflecting off marble. "
        "A dim LED queue display on the wall. Ghostly souls seated patiently. "
        "Absurdist bureaucratic atmosphere. Wide cinematic 16:9 composition."
    ),
    "hell/gates.jpg": (
        SCENE_STYLE +
        "Massive gates of hell forged from twisted black iron. Dark red-orange sky thick with smoke. "
        "Above the gates: a modern red LED welcome display reading 'ДОБРО ПОЖАЛОВАТЬ'. "
        "A tall ticket-dispenser machine like in a government office stands beside the gate, painted red, with tiny demonic horns on top. "
        "Glowing fire and lava behind the gates. Wide cinematic 16:9 composition."
    ),
    "hell/office.jpg": (
        SCENE_STYLE +
        "A bureaucratic government office, but in hell. Endless rows of grey cubicles, flickering yellow fluorescent ceiling lights, "
        "yellow sulphurous haze in the air. A wall-mounted queue-number display showing '7394'. "
        "Filing cabinets with small flames licking at their edges. A motivational poster on the wall reading 'ABANDON HOPE'. "
        "Absurd and darkly funny. Wide cinematic 16:9 composition, no people."
    ),
    "hell/cauldrons.jpg": (
        SCENE_STYLE +
        "Hellscape with rows of large iron cauldrons bubbling over open fires, each cauldron labelled with a small numbered tag like a parking spot. "
        "Industrial-medieval aesthetic. Dark rocky cavern, rivers of lava in the background, red-orange hellfire lighting. "
        "Modern incongruous touches: a few treadmills and exercise bikes near some cauldrons. "
        "Wide cinematic 16:9 composition."
    ),
    "hell/debate_room.jpg": (
        SCENE_STYLE +
        "A university lecture hall in the underworld. Dark academia aesthetic. "
        "Wooden podium with a chalkboard behind it reading 'PROVE GOD DOES NOT EXIST'. "
        "Rows of old wooden benches descending toward the stage. Infernal symbols and pentagram motifs subtly carved into dark stone walls. "
        "Dim reddish lighting from wall torches, a dusty projector screen. Wide cinematic 16:9 composition, no people."
    ),
    "hell/bar.jpg": (
        SCENE_STYLE +
        "A cozy underground bar carved into hell's rocky walls. "
        "Hand-painted wooden sign over the bar reading 'У ПОСЛЕДНЕГО АТЕИСТА'. "
        "Bar counter improvised from repurposed pitchforks and brimstone slabs. Warm amber candlelight. "
        "Shelves of mysterious bottles, a worn pool table, mismatched stools, an acoustic guitar hanging on the wall. "
        "Surprisingly warm and inviting despite the setting. Wide cinematic 16:9 composition, no people."
    ),
    "hell/corridor.jpg": (
        SCENE_STYLE +
        "An endless hellish corridor — dark stone walls, flickering fluorescent strip-lights overhead, "
        "doors marked with serial numbers, a strange child-sized fox mask hung on one wall, "
        "pipes leaking faint sulphurous steam. Vanishing-point perspective stretching into red darkness. "
        "Wide cinematic 16:9 composition, no people."
    ),
    "hell/server_room.jpg": (
        SCENE_STYLE +
        "A server room in hell. Tall racks of black servers with red and orange status LEDs blinking like infernal eyes. "
        "Tangled cables hanging from the ceiling, faint smoke, cooling fans glowing red. "
        "An owl-themed sticker on one server cabinet, an old CRT monitor showing green-text logs, "
        "a rolling office chair. Cyberpunk meets infernal industrial. Wide cinematic 16:9 composition, no people."
    ),
    "transitions/menu_bg.jpg": (
        SCENE_STYLE +
        "Dark cinematic title-screen background. A small silhouette of a man standing on a narrow stone bridge, exact center frame. "
        "Above him: golden heavenly light, soft clouds, the suggestion of feathered wings. "
        "Below him: red hellfire, smoke, demonic shapes hinted in the dark. "
        "Embers and dust particles drifting through the air. Dramatic vertical division of the frame. "
        "Wide cinematic 16:9 composition."
    ),
}


# --------------------------------------------------------------------
# Generation helpers
# --------------------------------------------------------------------
def _b64_to_bytes(b64: str) -> bytes:
    return base64.b64decode(b64)


def _save_jpeg_16x9(raw_png: bytes, out_path: Path) -> None:
    """Декодируем PNG/байты, центрально кропим до 16:9 и сохраняем JPEG."""
    img = Image.open(__import__("io").BytesIO(raw_png)).convert("RGB")
    w, h = img.size
    target_h_for_16x9 = int(round(w * 9 / 16))
    if target_h_for_16x9 < h:
        # crop top/bottom
        offset = (h - target_h_for_16x9) // 2
        img = img.crop((0, offset, w, offset + target_h_for_16x9))
    elif target_h_for_16x9 > h:
        # таргет выше реального — кропим по ширине
        target_w = int(round(h * 16 / 9))
        offset = (w - target_w) // 2
        img = img.crop((offset, 0, offset + target_w, h))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=92)


def _save_png(raw_png: bytes, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(io.BytesIO(raw_png)).convert("RGBA")
    img = _remove_alpha_speckles(img)
    img.save(out_path, "PNG")


def _remove_alpha_speckles(img: Image.Image, threshold: int = 8) -> Image.Image:
    """Keep only the main connected alpha island so transparent sprites do not carry background noise."""
    alpha = img.getchannel("A")
    width, height = img.size
    raw_alpha = alpha.tobytes()
    solid = bytearray(1 if value > threshold else 0 for value in raw_alpha)
    visited = bytearray(len(solid))
    largest: list[int] = []

    for start, is_solid in enumerate(solid):
        if not is_solid or visited[start]:
            continue

        component: list[int] = []
        stack = [start]
        visited[start] = 1

        while stack:
            idx = stack.pop()
            component.append(idx)
            x = idx % width

            neighbors = []
            if x > 0:
                neighbors.append(idx - 1)
            if x < width - 1:
                neighbors.append(idx + 1)
            if idx >= width:
                neighbors.append(idx - width)
            if idx < width * (height - 1):
                neighbors.append(idx + width)

            for neighbor in neighbors:
                if solid[neighbor] and not visited[neighbor]:
                    visited[neighbor] = 1
                    stack.append(neighbor)

        if len(component) > len(largest):
            largest = component

    if not largest:
        return img

    cleaned_alpha = bytearray(len(raw_alpha))
    for idx in largest:
        cleaned_alpha[idx] = raw_alpha[idx]

    cleaned = img.copy()
    cleaned.putalpha(Image.frombytes("L", img.size, bytes(cleaned_alpha)))
    return cleaned


def _call_with_retries(label: str, fn, retries: int = 3, base_wait: int = 12):
    last_err: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            return fn()
        except RateLimitError as e:
            last_err = e
            wait = base_wait * attempt
            print(f"  [{label}] rate-limited, waiting {wait}s ({attempt}/{retries})")
            time.sleep(wait)
        except APIError as e:
            last_err = e
            print(f"  [{label}] API error: {str(e)[:200]} ({attempt}/{retries})")
            time.sleep(5 * attempt)
        except Exception as e:
            last_err = e
            print(f"  [{label}] error: {str(e)[:200]} ({attempt}/{retries})")
            time.sleep(3)
    print(f"  [{label}] FAILED after {retries} attempts: {last_err}")
    return None


def generate_scene(name: str, prompt: str, quality: str, force: bool) -> bool:
    out = ASSETS / "scenes" / name
    if out.exists() and not force:
        print(f"SKIP scene {name} (exists)")
        return True
    print(f"GEN  scene {name}")

    def _do():
        return client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size="1536x1024",
            quality=quality,
            n=1,
        )

    resp = _call_with_retries(f"scene:{name}", _do)
    if not resp or not resp.data:
        return False
    raw = _b64_to_bytes(resp.data[0].b64_json)
    _save_jpeg_16x9(raw, out)
    print(f"  saved {out} ({out.stat().st_size // 1024}KB)")
    return True


def _generate_char_png(prompt: str, out: Path, quality: str, label: str) -> bool:
    def _do():
        return client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size="1024x1536",
            quality=quality,
            background="transparent",
            n=1,
        )

    resp = _call_with_retries(label, _do)
    if not resp or not resp.data:
        return False
    raw = _b64_to_bytes(resp.data[0].b64_json)
    _save_png(raw, out)
    print(f"  saved {out} ({out.stat().st_size // 1024}KB)")
    return True


def _generate_char_png_from_images(
    prompt: str,
    image_paths: list[Path],
    out: Path,
    quality: str,
    label: str,
) -> bool:
    def _do():
        with ExitStack() as stack:
            images = [stack.enter_context(path.open("rb")) for path in image_paths]
            return client.images.edit(
                model="gpt-image-1.5",
                image=images,
                prompt=prompt,
                size="1024x1536",
                quality=quality,
                background="transparent",
                output_format="png",
                input_fidelity="high",
                n=1,
            )

    resp = _call_with_retries(label, _do)
    if not resp or not resp.data:
        return False
    raw = _b64_to_bytes(resp.data[0].b64_json)
    _save_png(raw, out)
    print(f"  saved {out} ({out.stat().st_size // 1024}KB)")
    return True


def generate_shared_char_ref(ref_id: str, ref: dict, quality: str, force: bool) -> Path | None:
    out = ASSETS / ref["path"]
    if out.exists() and not force:
        print(f"SKIP shared/{ref_id} (exists)")
        return out
    print(f"GEN  shared/{ref_id}")
    if _generate_char_png(ref["prompt"], out, quality, f"shared:{ref_id}"):
        return out
    return None


def generate_char_ref(char_id: str, char: dict, quality: str, force: bool) -> Path | None:
    char_dir = ASSETS / char["dir"]
    ref = char_dir / "_reference.png"
    if ref.exists() and not force:
        print(f"SKIP {char_id}/_reference (exists)")
        return ref
    print(f"GEN  {char_id}/_reference")
    prompt = _char_prompt(char, char["ref_pose"])
    shared_ref_id = char.get("shared_ref")
    if shared_ref_id:
        shared = SHARED_CHARACTER_REFERENCES[shared_ref_id]
        shared_path = generate_shared_char_ref(shared_ref_id, shared, quality, force=False)
        if shared_path is None:
            return None
        prompt = (
            CHAR_STYLE +
            char.get("ref_edit", "") + " " +
            char["look"] + " " +
            char["ref_pose"]
        )
        if _generate_char_png_from_images(prompt, [shared_path], ref, quality, f"{char_id}:ref"):
            return ref
        return None
    if _generate_char_png(prompt, ref, quality, f"{char_id}:ref"):
        return ref
    return None


def generate_char_expression(
    char_id: str, char: dict, expr_name: str, expr_desc: str,
    quality: str, force: bool,
) -> bool:
    out = ASSETS / char["dir"] / f"{expr_name}.png"
    if out.exists() and not force:
        print(f"SKIP {char_id}/{expr_name} (exists)")
        return True
    print(f"GEN  {char_id}/{expr_name}")
    prompt = _char_prompt(char, expr_desc)
    if char.get("shared_ref"):
        ref = ASSETS / char["dir"] / "_reference.png"
        if not ref.exists():
            ref = generate_char_ref(char_id, char, quality, force=False)
        if ref is None or not ref.exists():
            return False
        prompt = (
            CHAR_STYLE +
            "Use the provided character reference as a strict identity anchor. "
            "Keep the same face, hairstyle, body proportions, outfit language, color palette and transparent cutout sprite style. "
            "Only change the pose and facial expression requested below. " +
            char["look"] + " " +
            expr_desc
        )
        return _generate_char_png_from_images(prompt, [ref], out, quality, f"{char_id}:{expr_name}")
    return _generate_char_png(prompt, out, quality, f"{char_id}:{expr_name}")


# --------------------------------------------------------------------
# Driver
# --------------------------------------------------------------------
def run_characters(only: set[str], quality: str, force: bool) -> None:
    print("\n=== CHARACTERS ===")
    needed_shared_refs = {
        char["shared_ref"]
        for char_id, char in CHARACTERS.items()
        if char.get("shared_ref") and (not only or char_id in only)
    }
    for ref_id in sorted(needed_shared_refs):
        generate_shared_char_ref(ref_id, SHARED_CHARACTER_REFERENCES[ref_id], quality, force)
        time.sleep(2)

    for char_id, char in CHARACTERS.items():
        if only and char_id not in only:
            continue
        print(f"\n--- {char_id} ---")
        generate_char_ref(char_id, char, quality, force)
        time.sleep(2)
        for expr_name, expr_desc in char["expressions"].items():
            generate_char_expression(char_id, char, expr_name, expr_desc, quality, force)
            time.sleep(2)


def run_scenes(only: set[str], quality: str, force: bool) -> None:
    print("\n=== SCENES ===")
    for name, prompt in SCENES.items():
        key = name.split("/", 1)[-1].rsplit(".", 1)[0]  # e.g. "apartment"
        if only and key not in only and name not in only:
            continue
        generate_scene(name, prompt, quality, force)
        time.sleep(2)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", nargs="?", default="all",
                        choices=["all", "characters", "chars", "scenes", "bg"])
    parser.add_argument("--force", action="store_true",
                        help="overwrite existing files")
    parser.add_argument("--only", default="",
                        help="comma-separated char ids or scene names to limit to")
    parser.add_argument("--quality", default="high",
                        choices=["low", "medium", "high", "auto"])
    args = parser.parse_args(list(argv) if argv is not None else None)

    only = {s.strip() for s in args.only.split(",") if s.strip()}

    if args.mode in ("characters", "chars", "all"):
        run_characters(only, args.quality, args.force)
    if args.mode in ("scenes", "bg", "all"):
        run_scenes(only, args.quality, args.force)

    print("\n=== DONE ===")
    chars = list((ASSETS / "characters").rglob("*.png"))
    scenes = list((ASSETS / "scenes").rglob("*.jpg"))
    print(f"sprites on disk: {len(chars)}")
    print(f"scenes on disk:  {len(scenes)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
