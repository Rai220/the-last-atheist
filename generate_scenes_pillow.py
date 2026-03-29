#!/usr/bin/env python3
"""Generate stylized scene backgrounds using Pillow (no AI API needed)."""

from PIL import Image, ImageDraw, ImageFilter, ImageChops
import random
import math
from pathlib import Path

W, H = 1920, 1080

def gradient(draw, y1, y2, c1, c2):
    for y in range(y1, y2):
        t = (y - y1) / max(1, y2 - y1)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

def vignette(img, strength=0.7):
    vig = Image.new('L', (W, H), 0)
    vd = ImageDraw.Draw(vig)
    for i in range(min(W, H) // 2, 0, -1):
        c = int(255 * (i / (min(W, H) // 2)) ** strength)
        vd.ellipse([W//2 - i, H//2 - i, W//2 + i, H//2 + i], fill=c)
    vig = vig.filter(ImageFilter.GaussianBlur(radius=60))
    return Image.composite(img, Image.new('RGB', (W, H), (0, 0, 0)), vig)

def add_glow(draw, x, y, radius, color, steps=40):
    for i in range(steps, 0, -1):
        r = radius * i // steps
        a = max(0, color[0] * i // steps // 3)
        c = (min(255, color[0] * i // steps // 2), min(255, color[1] * i // steps // 2), min(255, color[2] * i // steps // 2))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=c)

def gen_hell_gates():
    random.seed(1)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H, (40, 5, 5), (15, 0, 0))
    # Magma glow at bottom
    for y in range(H * 3 // 4, H):
        t = (y - H * 3 // 4) / (H // 4)
        draw.line([(0, y), (W, y)], fill=(int(60 + 80 * t), int(15 + 20 * t), 0))
    # Gate pillars
    for gx in [W // 2 - 250, W // 2 + 200]:
        draw.rectangle([gx, 50, gx + 50, H * 3 // 4], fill=(20, 10, 10))
        for gy in range(100, H * 3 // 4, 60):
            draw.ellipse([gx + 10, gy, gx + 40, gy + 20], fill=(40, 8, 8))
    # Gate arch
    for t in range(180):
        angle = math.radians(t)
        x = W // 2 + int(250 * math.cos(angle))
        y = H // 3 - int(200 * math.sin(angle))
        draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=(25, 8, 8))
    # Fire behind gates
    for _ in range(50):
        fx = random.randint(W // 2 - 200, W // 2 + 200)
        fy = random.randint(H // 2, H * 3 // 4)
        add_glow(draw, fx, fy, random.randint(20, 60), (180, 60, 0))
    # Ticket machine silhouette
    draw.rectangle([W // 2 + 300, H // 2 + 50, W // 2 + 360, H * 3 // 4], fill=(30, 15, 15))
    img = img.filter(ImageFilter.GaussianBlur(radius=2))
    return vignette(img, 0.6)

def gen_hell_bar():
    random.seed(2)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H, (25, 15, 8), (15, 8, 3))
    # Rocky walls
    for _ in range(200):
        rx, ry = random.randint(0, W), random.randint(0, H // 3)
        draw.ellipse([rx, ry, rx + random.randint(20, 80), ry + random.randint(10, 40)], fill=(random.randint(20, 35), random.randint(12, 22), random.randint(5, 12)))
    # Bar counter
    draw.rectangle([W // 4, H * 2 // 3 - 20, W * 3 // 4, H * 2 // 3 + 10], fill=(45, 25, 10))
    draw.rectangle([W // 4, H * 2 // 3 + 10, W * 3 // 4, H * 2 // 3 + 60], fill=(35, 18, 8))
    # Bottles on shelf
    for bx in range(W // 4 + 30, W * 3 // 4 - 30, 35):
        bh = random.randint(40, 80)
        bc = (random.randint(40, 100), random.randint(20, 60), random.randint(10, 30))
        draw.rectangle([bx, H * 2 // 3 - 20 - bh, bx + 15, H * 2 // 3 - 20], fill=bc)
    # Warm candle lights
    for cx in range(W // 4, W * 3 // 4, 120):
        add_glow(draw, cx, H * 2 // 3 - 40, 50, (200, 140, 60))
    # Stools
    for sx in range(W // 4 + 60, W * 3 // 4 - 60, 100):
        draw.rectangle([sx - 3, H * 2 // 3 + 60, sx + 3, H * 2 // 3 + 160], fill=(40, 20, 10))
        draw.ellipse([sx - 18, H * 2 // 3 + 50, sx + 18, H * 2 // 3 + 70], fill=(50, 28, 12))
    # Pool table
    draw.rectangle([W * 3 // 4 + 50, H // 2, W - 100, H * 2 // 3 + 40], fill=(15, 55, 25))
    draw.rectangle([W * 3 // 4 + 45, H // 2 - 5, W - 95, H // 2 + 5], fill=(45, 25, 10))
    # Ceiling stalactites
    for sx in range(0, W, random.randint(30, 80)):
        sh = random.randint(20, 100)
        draw.polygon([(sx, 0), (sx - 8, sh), (sx + 8, sh)], fill=(28, 16, 8))
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    return vignette(img, 0.5)

def gen_corridor():
    random.seed(3)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H, (35, 30, 25), (25, 20, 15))
    # Perspective corridor
    vanish_x, vanish_y = W // 2, H // 3
    # Floor
    draw.polygon([(0, H), (W, H), (vanish_x + 100, vanish_y), (vanish_x - 100, vanish_y)], fill=(30, 28, 25))
    # Walls
    draw.polygon([(0, 0), (0, H), (vanish_x - 100, vanish_y), (vanish_x - 100, 0)], fill=(38, 33, 28))
    draw.polygon([(W, 0), (W, H), (vanish_x + 100, vanish_y), (vanish_x + 100, 0)], fill=(32, 27, 22))
    # Doors on walls
    for i in range(6):
        t = (i + 1) / 7
        lx = int((vanish_x - 100) * t)
        ly = int(vanish_y + (H - vanish_y) * (1 - t) * 0.3)
        dw = int(60 * (1 - t * 0.7))
        dh = int(120 * (1 - t * 0.7))
        draw.rectangle([lx - dw, ly, lx, ly + dh], fill=(25, 20, 15))
        rx = W - lx
        draw.rectangle([rx, ly, rx + dw, ly + dh], fill=(22, 18, 13))
    # Flickering lights
    for i in range(5):
        t = (i + 1) / 6
        lx = int(vanish_x + (W // 2 - vanish_x) * (1 - t) * random.choice([-1, 1]) * 0.3)
        ly = int(vanish_y * t * 0.8)
        add_glow(draw, W // 2 + lx - vanish_x, ly + 30, int(40 * (1 - t * 0.5)), (120, 100, 40))
    # Water cooler at end
    draw.rectangle([vanish_x - 15, vanish_y - 30, vanish_x + 15, vanish_y], fill=(40, 50, 55))
    add_glow(draw, vanish_x, vanish_y - 15, 10, (100, 40, 30))  # boiling glow
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    return vignette(img, 0.6)

def gen_server_room():
    random.seed(4)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H, (8, 15, 20), (5, 8, 12))
    # Server racks
    for rx in range(100, W - 100, 160):
        draw.rectangle([rx, 100, rx + 80, H - 100], fill=(15, 18, 22))
        # LED lights
        for ly in range(120, H - 120, 20):
            color = random.choice([(0, 80, 0), (80, 30, 0), (80, 0, 0), (0, 0, 0)])
            draw.rectangle([rx + 10, ly, rx + 14, ly + 4], fill=color)
            draw.rectangle([rx + 60, ly, rx + 64, ly + 4], fill=random.choice([(0, 60, 0), (60, 20, 0)]))
    # Cables
    for _ in range(30):
        cx = random.randint(100, W - 100)
        draw.line([(cx, 80), (cx + random.randint(-100, 100), H - 80)], fill=(20, 25, 30), width=2)
    # Desk with monitor
    draw.rectangle([W // 2 - 100, H // 2, W // 2 + 100, H // 2 + 80], fill=(25, 28, 32))
    draw.rectangle([W // 2 - 60, H // 2 - 60, W // 2 + 60, H // 2], fill=(10, 30, 15))  # monitor
    add_glow(draw, W // 2, H // 2 - 30, 80, (20, 80, 30))
    # Energy drink cans
    for ex in [W // 2 + 70, W // 2 + 90, W // 2 - 80]:
        draw.rectangle([ex, H // 2 - 15, ex + 12, H // 2], fill=(60, 15, 15))
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    return vignette(img, 0.7)

def gen_night_city():
    random.seed(5)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H * 2 // 3, (15, 15, 30), (25, 20, 35))
    # Wet road
    for y in range(H * 2 // 3, H):
        t = (y - H * 2 // 3) / (H // 3)
        draw.line([(0, y), (W, y)], fill=(int(25 + 15 * t), int(22 + 12 * t), int(30 + 10 * t)))
    # Buildings
    for i in range(18):
        x = i * 115 - 30
        bw = random.randint(80, 140)
        bh = random.randint(200, 450)
        c = random.randint(15, 30)
        draw.rectangle([x, H * 2 // 3 - bh, x + bw, H * 2 // 3], fill=(c, c, c + 5))
        for wy in range(H * 2 // 3 - bh + 20, H * 2 // 3 - 20, 35):
            for wx in range(x + 8, x + bw - 8, 22):
                if random.random() > 0.35:
                    wc = random.choice([(70, 60, 35), (50, 45, 30), (90, 80, 45), (40, 55, 70)])
                    draw.rectangle([wx, wy, wx + 8, wy + 12], fill=wc)
    # Church dome
    cx = W * 3 // 4
    draw.polygon([(cx - 30, H * 2 // 3 - 300), (cx - 60, H * 2 // 3 - 200), (cx + 60, H * 2 // 3 - 200)], fill=(25, 25, 30))
    draw.ellipse([cx - 40, H * 2 // 3 - 350, cx + 40, H * 2 // 3 - 280], fill=(30, 28, 35))
    draw.rectangle([cx - 3, H * 2 // 3 - 380, cx + 3, H * 2 // 3 - 350], fill=(50, 45, 30))
    # Streetlights
    for lx in [200, 500, 900, 1400, 1750]:
        draw.rectangle([lx - 2, H // 4, lx + 2, H * 2 // 3], fill=(40, 40, 45))
        add_glow(draw, lx, H * 2 // 3 - 20, 60, (150, 100, 40))
        # Reflections
        for y in range(H * 2 // 3, H):
            d = y - H * 2 // 3
            i = max(0, 20 - d // 6)
            if i > 0:
                draw.line([(lx - d // 4, y), (lx + d // 4, y)], fill=(i + 15, i + 8, i))
    # Rain streaks
    for _ in range(100):
        rx = random.randint(0, W)
        ry = random.randint(0, H * 2 // 3)
        draw.line([(rx, ry), (rx - 3, ry + 15)], fill=(40, 40, 50), width=1)
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    return vignette(img, 0.6)

def gen_waiting_room():
    random.seed(6)
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    gradient(draw, 0, H, (200, 180, 140), (150, 130, 100))
    # Golden light from above
    add_glow(draw, W // 2, 0, 600, (220, 200, 150))
    # Floor
    for y in range(H * 2 // 3, H):
        t = (y - H * 2 // 3) / (H // 3)
        draw.line([(0, y), (W, y)], fill=(int(140 - 30 * t), int(120 - 25 * t), int(90 - 20 * t)))
    # Benches
    for bx in range(100, W - 100, 200):
        draw.rectangle([bx, H * 2 // 3 - 10, bx + 120, H * 2 // 3 + 15], fill=(160, 140, 110))
        draw.rectangle([bx, H * 2 // 3 + 15, bx + 5, H * 2 // 3 + 50], fill=(140, 120, 90))
        draw.rectangle([bx + 115, H * 2 // 3 + 15, bx + 120, H * 2 // 3 + 50], fill=(140, 120, 90))
    # Ghostly figures on benches
    for fx in range(150, W - 150, 200):
        fy = H * 2 // 3 - 80
        draw.ellipse([fx + 20, fy, fx + 50, fy + 70], fill=(180, 170, 150, 128))
        draw.ellipse([fx + 25, fy - 18, fx + 45, fy + 5], fill=(185, 175, 155))
    # Columns
    for cx in [50, 350, 700, 1200, 1550, 1850]:
        draw.rectangle([cx, 0, cx + 40, H * 2 // 3], fill=(170, 155, 125))
    img = img.filter(ImageFilter.GaussianBlur(radius=2))
    return vignette(img, 0.4)

# Generate all
scenes = {
    "assets/scenes/hell/gates.jpg": gen_hell_gates,
    "assets/scenes/hell/bar.jpg": gen_hell_bar,
    "assets/scenes/hell/corridor.jpg": gen_corridor,
    "assets/scenes/hell/server_room.jpg": gen_server_room,
    "assets/scenes/prologue/night_city.jpg": gen_night_city,
    "assets/scenes/judgment/waiting.jpg": gen_waiting_room,
}

for path, gen_func in scenes.items():
    print(f"  {path}...", end=" ", flush=True)
    img = gen_func()
    img.save(path, quality=90)
    print(f"OK ({Path(path).stat().st_size // 1024}KB)")

print("\nDone!")
