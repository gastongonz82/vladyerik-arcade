import json
import pathlib
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
for index, game in enumerate(catalog["games"]):
    path = game["path"]
    if path in manifest and (root / manifest[path]).exists():
        continue
    system = systems.get(game.get("system"))
    if not system:
        continue
    name = game["name"].removesuffix(".zip")
    names = [name, name.split(" [")[0], name.split(" (")[0] + " (USA)"]
    image = None
    for title in dict.fromkeys(names):
        url = "https://thumbnails.libretro.com/" + urllib.parse.quote(system) + "/Named_Boxarts/" + urllib.parse.quote(title) + ".png"
        try:
            with urllib.request.urlopen(url, timeout=6) as response:
                image = Image.open(BytesIO(response.read()))
                image.load()
            break
        except Exception:
            pass
    if image is None:
        continue
    filename = f"{index:04d}.webp"
    image.thumbnail((480,640))
    image.save(folder / filename, "WEBP", quality=80)
    manifest[path] = "assets/retro-covers/" + filename
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
