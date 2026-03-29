#!/usr/bin/env python3
"""Generate all music tracks for The Last Atheist using Google Lyria 3 Pro."""

import os, sys, time
from pathlib import Path
from google import genai
from google.genai import types

API_KEY = os.environ.get("GEMINI_API_KEY", "")
if not API_KEY:
    print("Set GEMINI_API_KEY"); sys.exit(1)

client = genai.Client(api_key=API_KEY)
PROJECT = Path(__file__).parent

TRACKS = {
    "menu/menu_theme.mp3": (
        "Dark ambient orchestral, slow piano melody over deep drone bass, "
        "distant wordless female vocal humming, cinematic and mysterious, "
        "minor key, atmospheric reverb, like standing between heaven and hell, "
        "loopable, 90 BPM"
    ),
    "prologue/morning_ambient.mp3": (
        "Soft lo-fi ambient, gentle acoustic guitar fingerpicking, "
        "warm analog synth pad, subtle rain texture in background, "
        "cozy morning atmosphere, slightly melancholic, peaceful, "
        "minimal and sparse, loopable, 75 BPM"
    ),
    "prologue/internet_lo_fi.mp3": (
        "Lo-fi hip hop beat, slightly distorted bass, crisp hi-hats, "
        "moody synth chords, late night internet scrolling vibe, "
        "focused and slightly tense, loopable, 85 BPM"
    ),
    "prologue/death_heartbeat.mp3": (
        "Dark experimental ambient, deep heartbeat pulsing rhythm slowing down "
        "gradually, distorted low frequency rumble, muffled distant sounds "
        "fading away, dissonant strings, growing silence, unsettling and final, "
        "no drums, 60 BPM slowing to 0"
    ),
    "judgment/choir_ethereal.mp3": (
        "Ethereal sacred choir, wordless angelic vocalization, "
        "no lyrics only vowel sounds, instrumental, vocalise only, "
        "slow majestic harmonies in major-minor shifts, "
        "massive cathedral reverb, deep organ drone underneath, "
        "transcendent and overwhelming, loopable, 50 BPM"
    ),
    "judgment/judgment_tension.mp3": (
        "Intense orchestral tension, wordless choir building in layers, "
        "deep brass drones, timpani heartbeat rhythm, "
        "dissonant strings swelling and receding, "
        "angelic soprano vocalization without words over dark orchestra, "
        "divine judgment atmosphere, powerful and terrifying, "
        "instrumental, no lyrics, crescendo waves, loopable, 55 BPM"
    ),
    "hell/hell_drone.mp3": (
        "Dark industrial drone ambient, heavy distorted bass rumble, "
        "metallic scraping textures, distant screams processed as reverb, "
        "factory-like rhythmic clanking, oppressive heat atmosphere, "
        "no melody just crushing weight of sound, hellish and suffocating, "
        "loopable, atonal"
    ),
    "hell/hell_bureaucracy.mp3": (
        "Quirky dark muzak, cheesy elevator music but in minor key, "
        "slightly detuned synthesizer melody, bland corporate hold music "
        "but with subtle demonic undertones, occasional dissonant notes, "
        "ironic and absurd, bureaucratic hell waiting room music, "
        "loopable, 100 BPM"
    ),
    "hell/hell_debate.mp3": (
        "Tense minimalist piano and strings, repetitive looping pattern "
        "that feels like going in circles, academic and cerebral, "
        "clock-ticking percussion, building frustration, "
        "Philip Glass inspired repetitive arpeggios with dark undertones, "
        "intellectual battle music, loopable, 110 BPM"
    ),
    "hell/hell_bar_jazz.mp3": (
        "Warm smoky jazz trio, upright bass walking line, "
        "brushed drums soft and intimate, muted trumpet melody, "
        "late night bar atmosphere, slightly melancholic but comforting, "
        "like finding peace in the worst place, analog warmth, "
        "loopable, 95 BPM"
    ),
}

def generate_track(prompt, output_path, retries=2):
    for attempt in range(retries):
        try:
            print(f"  [{attempt+1}] {output_path.name}...", end=" ", flush=True)
            response = client.models.generate_content(
                model="lyria-3-pro-preview",
                contents=prompt,
                config=types.GenerateContentConfig(response_modalities=["AUDIO"])
            )
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    output_path.parent.mkdir(parents=True, exist_ok=True)
                    with open(output_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"OK ({len(part.inline_data.data)//1024}KB)")
                    return True
            print("no audio")
        except Exception as e:
            print(f"ERROR: {str(e)[:100]}")
            if attempt < retries - 1:
                time.sleep(10)
    return False

if __name__ == "__main__":
    print(f"Generating {len(TRACKS)} tracks...\n")
    ok, fail = 0, 0
    for filename, prompt in TRACKS.items():
        output = PROJECT / "assets" / "music" / filename
        if output.exists():
            print(f"  SKIP: {filename}")
            ok += 1
            continue
        if generate_track(prompt, output):
            ok += 1
        else:
            fail += 1
        time.sleep(5)
    print(f"\nDone: {ok}/{len(TRACKS)} OK, {fail} failed")
