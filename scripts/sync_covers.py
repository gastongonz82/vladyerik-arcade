import json
import pathlib
import re
import urllib.request
import urllib.parse
from PIL import Image
from io import BytesIO

root = pathlib.Path(__file__).resolve().parents[1]
manifest_path = root / "retro-covers.json"
manifest = json.loads(manifest_path.read_text())
catalog_url = "https://raw.githubusercontent.com/gastongonz82/vladyerik-retro-games/main/juegos.json"
catalog = json.load(urllib.request.urlopen(catalog_url, timeout=20))
systems = {"nes":"Nintendo - Nintendo Entertainment System","snes":"Nintendo - Super Nintendo Entertainment System","segaMD":"Sega - Mega Drive - Genesis","n64":"Nintendo - Nintendo 64","segaGG":"Sega - Game Gear"}
folder = root / "assets" / "retro-covers"
folder.mkdir(parents=True, exist_ok=True)

def candidates(name):
    raw = re.sub(r"\\.zip$", "", name, flags=re.I)
    without_tags = re.sub(r"\\s*\\[[^]]*\\]", "", raw).strip()
    base = re.sub(r"\\s*\\([^)]*\\)", "", without_tags).strip()
    base = re.sub(r"\\s+", " ", base)
    variants = [without_tags, base + " (USA)", base + " (Europe)", base + " (World)", base]
    region = re.search(r"\\((USA|Europe|Japan|World|U|E|J)\\)", raw, re.I)
    if region:
        region_name = {"U":"USA","E":"Europe","J":"Japan"}.get(region.group(1).upper(),region.group(1))
        variants.insert(1,base+" ("+region_name+")")
    if base.lower().endswith(", the"):
        variants += ["The "+base[:-5]+" (USA)", "The "+base[:-5]]
    return list(dict.fromkeys(v for v in variants if v))

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
