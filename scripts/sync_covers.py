import json
import pathlib
import re
import urllib.request
import urllib.parse
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

root = pathlib.Path(__file__).resolve().parents[1]
manifest_path = root / "retro-covers.json"
manifest = json.loads(manifest_path.read_text())
catalog_url = "https://raw.githubusercontent.com/gastongonz82/vladyerik-retro-games/main/juegos.json"
catalog = json.load(urllib.request.urlopen(catalog_url, timeout=20))
systems = {"nes":"Nintendo - Nintendo Entertainment System","snes":"Nintendo - Super Nintendo Entertainment System","segaMD":"Sega - Mega Drive - Genesis","n64":"Nintendo - Nintendo 64","segaGG":"Sega - Game Gear"}
folder = root / "assets" / "retro-covers"
folder.mkdir(parents=True, exist_ok=True)

ALIASES = {
 "1200-in-1": ["1200-in-1", "1200 in 1"],
 "72-in-1": ["72-in-1", "72 in 1"],
 "Adventure Island Classic": ["Adventure Island", "Hudson's Adventure Island"],
 "Diddy Kong Racing": ["Diddy Kong Racing"],
 "Donkey Kong Country 2": ["Donkey Kong Country 2 - Diddy's Kong Quest"],
 "Donkey Kong Country 3": ["Donkey Kong Country 3 - Dixie Kong's Double Trouble!"],
 "Marvel Super Heroes - War of the Gems": ["Marvel Super Heroes - War of the Gems"],
 "Prince of Persia 2": ["Prince of Persia 2 - The Shadow and the Flame"],
 "Punch-Out": ["Mike Tyson's Punch-Out!!", "Punch-Out!!"],
 "Quake 64": ["Quake"],
 "Sonic & Knuckles + Sonic The Hedgehog 3": ["Sonic & Knuckles", "Sonic the Hedgehog 3"],
 "Sonic the Hedgehog 4": ["Sonic the Hedgehog 4"],
 "Spider-Man & Venom": ["Spider-Man & Venom - Maximum Carnage", "Maximum Carnage"],
 "Street Fighter EX": ["Street Fighter EX"],
 "Street Fighter II - The World Warrior": ["Street Fighter II - The World Warrior"],
 "Street Fighter II Turbo": ["Street Fighter II Turbo - Hyper Fighting"],
 "Super Mario Bros 3": ["Super Mario Bros. 3"],
 "Super Mario Bros": ["Super Mario Bros."],
 "Toy Story 2": ["Toy Story 2 - Buzz Lightyear to the Rescue!"],
 "Wave Race 64": ["Wave Race 64"],
 "X-Men vs. Street Fighter": ["X-Men vs. Street Fighter"]
}

def candidates(name):
    raw = name.removesuffix(".zip")
    without_tags = re.sub(r"\\s*\\[[^]]*\\]", "", raw).strip()
    base = re.sub(r"\\s*\\([^)]*\\)", "", without_tags).strip()
    base = re.sub(r"\\s+", " ", base)
    variants = []
    for prefix, aliases in sorted(ALIASES.items(), key=lambda item: -len(item[0])):
        if base.lower().startswith(prefix.lower()):
            variants.extend(aliases)
            break
    variants += [without_tags, base]
    for title in list(variants):
        variants.extend([title + " (USA)", title + " (Europe)", title + " (World)", title + " (Japan)"])
    return list(dict.fromkeys(v for v in variants if v))

def branded_cover(game):
    # A permanent, game-specific cover when no matching public thumbnail exists.
    canvas = Image.new("RGB", (360, 480), "#122448")
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, 359, 12), fill="#f8c83d")
    draw.rectangle((0, 467, 359, 479), fill="#2bd3e5")
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 29)
        small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
    except OSError:
        font = ImageFont.load_default()
        small = font
    title = re.sub(r"\\s*\\([^)]*\\)|\\s*\\[[^]]*\\]", "", game["name"].removesuffix(".zip")).strip()
    words = title.split()
    lines = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textbbox((0, 0), test, font=font)[2] > 315 and line:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    lines = lines[:6]
    y = max(105, 240 - len(lines) * 23)
    for line in lines:
        width = draw.textbbox((0, 0), line, font=font)[2]
        draw.text(((360-width)/2, y), line, fill="#ffffff", font=font)
        y += 45
    system = game.get("system", "RETRO").upper()
    draw.text((24, 42), "VLADYERIK RETRO", fill="#f8c83d", font=small)
    draw.text((24, 420), system, fill="#2bd3e5", font=small)
    return canvas

for index, game in enumerate(catalog["games"]):
    path = game["path"]
    if path in manifest and (root / manifest[path]).exists():
        continue
    system = systems.get(game.get("system"))
    if not system:
        continue
    image = None
    for kind in ("Named_Boxarts", "Named_Titles", "Named_Snaps"):
        if image is not None:
            break
        for title in candidates(game["name"]):
            safe = re.sub(r'[&*\\\\/:<>?|"]', "_", title)
            url = "https://thumbnails.libretro.com/" + urllib.parse.quote(system) + "/" + kind + "/" + urllib.parse.quote(safe) + ".png"
            try:
                with urllib.request.urlopen(url, timeout=6) as response:
                    image = Image.open(BytesIO(response.read()))
                    image.load()
                break
            except Exception:
                continue
    if image is None:
        print("SIN PORTADA:", game["name"], flush=True)
        continue
    filename = f"{index:04d}.webp"
    image.thumbnail((480, 640))
    image.save(folder / filename, "WEBP", quality=80)
    manifest[path] = "assets/retro-covers/" + filename
    print("GUARDADA:", game["name"], flush=True)
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
print(f"Portadas locales: {len(manifest)} / {len(catalog['games'])}", flush=True)
