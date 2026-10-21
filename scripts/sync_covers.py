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

# Covers generadas anteriormente: intentar reemplazarlas por imágenes del juego.
REVIEW_TITLES = (
    "1200-in-1", "72-in-1", "Donkey Kong Country 2", "Donkey Kong Country 3",
    "Prince of Persia 2", "Sonic the Hedgehog 4", "Spider-Man & Venom",
    "Street Fighter EX", "Street Fighter II", "Wave Race 64", "X-Men vs. Street Fighter"
)
WIKI_TITLES = {
    "Wave Race 64": "Wave_Race_64",
    "Donkey Kong Country 2": "Donkey_Kong_Country_2:_Diddy's_Kong_Quest",
    "Donkey Kong Country 3": "Donkey_Kong_Country_3:_Dixie_Kong's_Double_Trouble!",
    "Prince of Persia 2": "Prince_of_Persia_2:_The_Shadow_and_the_Flame",
    "Spider-Man & Venom": "Spider-Man_and_Venom:_Maximum_Carnage",
    "Street Fighter II - The World Warrior": "Street_Fighter_II",
    "Street Fighter II Turbo": "Street_Fighter_II_Turbo",
    "X-Men vs. Street Fighter": "X-Men_vs._Street_Fighter",
}
def wiki_art(name):
    for prefix, title in sorted(WIKI_TITLES.items(), key=lambda x: -len(x[0])):
        if not name.lower().startswith(prefix.lower()):
            continue
        url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title)
        try:
            req = urllib.request.Request(url, headers={"User-Agent":"VLADYERIKArcade/1.0 (game-cover-research)"})
            with urllib.request.urlopen(req, timeout=10) as response:
                page = json.load(response)
            source = (page.get("thumbnail") or {}).get("source")
            if not source or page.get("type") == "disambiguation":
                return None
            req = urllib.request.Request(source, headers={"User-Agent":"VLADYERIKArcade/1.0"})
            with urllib.request.urlopen(req, timeout=12) as response:
                image = Image.open(BytesIO(response.read()))
                image.load()
            return image
        except Exception as error:
            print("Wikipedia no disponible:", name, str(error)[:80], flush=True)
    return None

# Pantalla de selección real documentada para 72-in-1.
MULTICART_SCREENSHOTS = {
    "72-in-1": "https://www.retrogames.cz/games/1563/NES_02.gif",
}
def multicart_screenshot(name):
    for prefix, url in MULTICART_SCREENSHOTS.items():
        if name.startswith(prefix):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=12) as response:
                    data = response.read()
                image = Image.open(BytesIO(data))
                image.load()
                if image.width < 100 or image.height < 100:
                    raise ValueError("Imagen demasiado pequeña")
                return image.convert("RGB")
            except Exception as error:
                print("Captura no disponible:", name, str(error)[:100], flush=True)
    return None

for index, game in enumerate(catalog["games"]):
    path = game["path"]
    exists = path in manifest and (root / manifest[path]).exists()
    review = any(game["name"].lower().startswith(t.lower()) for t in REVIEW_TITLES)
    multicart = game["name"].startswith(("1200-in-1", "72-in-1"))
    if exists and not review and not multicart:
        continue
    system = systems.get(game.get("system"))
    if not system:
        continue
    image = multicart_screenshot(game["name"]) if multicart else None
    if image is None and review:
        image = wiki_art(game["name"])
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
    if image is None and exists:
        print("SE CONSERVA PORTADA EXISTENTE:", game["name"], flush=True)
        continue
    if image is None:
        image = branded_cover(game)
        print("PORTADA IDENTIFICADA VLADYERIK:", game["name"], flush=True)
    filename = f"{index:04d}.webp"
    image.thumbnail((480, 640))
    image.save(folder / filename, "WEBP", quality=80)
    manifest[path] = "assets/retro-covers/" + filename
    print("GUARDADA:", game["name"], flush=True)
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
print(f"Portadas locales: {len(manifest)} / {len(catalog['games'])}", flush=True)
