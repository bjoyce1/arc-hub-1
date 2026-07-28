#!/usr/bin/env python3
"""
Turns the raw event flyers and community photos in ../../images into responsive
WebP sets under src/assets/media, and writes a manifest the site imports.

Run it again whenever new source images land (pioneer portraits are pending):
    python3 scripts/optimize-images.py

Every entry is declared explicitly rather than globbed, because most of these
files need per-image handling — several were downloaded from social media and
carry filler bars, watermarks, or colour casts that must be corrected before
they go anywhere near the site. Sources are never upscaled: a 540px flyer only
ever emits a 540px file, so a low-res original can't be blown up into a blurry
hero by a careless `sizes` attribute later.
"""

import json
import pathlib
import subprocess
import sys

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "images"
OUT = ROOT / "src" / "assets" / "media"
TMP = pathlib.Path("/tmp/arc-img")

WIDTHS = [400, 800, 1600]
QUALITY = 80

# crop=(l, t, r, b) in source pixels. wb=True applies grey-world white balance.
FLYERS = [
    dict(slug="garden-club", src="66EB1B9B-CA65-47E5-BEFB-52240618837A.JPG"),
    dict(slug="natural-healing", src="491CEFB9-73E3-4257-A2DA-B425A206F94D.JPG"),
    # Portrait art padded into a 1536² square with blurred duplicates of itself as
    # side bars. Column gradient-energy analysis put the real panel at 368..1168.
    dict(slug="toy-drive", src="792E0AA9-B9B8-4D75-B0C8-F0811F4EBA25.JPG",
         crop=(368, 0, 1168, 1536)),
    dict(slug="peace-roundtable", src="854FB93B-AD9F-4D5C-83FA-568E01EE5CFF.JPG"),
    dict(slug="dj-workshop", src="4608B647-BD3D-4EEC-BFD6-14ECFA1A320C.JPG"),
    # Trailing "Made with PosterMyWall.com" watermark trimmed off the bottom.
    dict(slug="fifty-meals", src="ARC WORK.JPG", crop=(0, 0, 686, 858)),
    dict(slug="back-2-school", src="ARC WORK.JPG3.JPG"),
    dict(slug="bridging-the-gap", src="BRIDGING THE GAP.jpg"),
    dict(slug="the-movement", src="FB_IMG_1695890563760.jpg", crop=(0, 0, 720, 1266)),
    dict(slug="conscious-bash", src="QVZkNUtOR2ozMlFQc2d2eg.jpeg"),
    dict(slug="peace-ride", src="QVZlU2FKOEh2YmRIRDVVWQ.jpeg"),
    # Same padding problem, but with flat white bars; content bbox measured at
    # 188..892 horizontally, 8..1022 vertically.
    dict(slug="wickett-crickett-memorial", src="QVZlSjItbzlQWGRKaklveA.jpeg",
         crop=(188, 8, 892, 1028)),
]

PHOTOS = [
    dict(slug="peace-ride-leaders", src="IMG_0161.PNG"),
    dict(slug="peace-ride-families", src="IMG_0184.JPG"),
    dict(slug="sheila-jackson-lee", src="IMG_5450.JPG"),
    dict(slug="meal-packing", src="ARC 50 MEALS.jpg"),
    dict(slug="dj-set-yard", src="A05FE7D5-D711-414C-8C88-5FECD6EA04C8.JPG"),
    # Crop the foreground onlooker filming out of the left of the frame.
    dict(slug="spc-performance", src="IMG_20230930_160215_01.jpg",
         crop=(360, 0, 1440, 1080)),
    dict(slug="spc-audience", src="IMG_20230930_155311_01.jpg"),
    # Overhead lighting left every face green; grey-world balance corrects it.
    dict(slug="forum-audience", src="GAP_ARC_SHAPE.jpg", wb=True),
    dict(slug="supply-drop", src="QVZka3FsS3c3YmZTdk1lUQ.jpeg"),
    dict(slug="arc-banner", src="IMG_4194.HEIC"),
    dict(slug="noi-headquarters", src="IMG_1067.HEIC"),
]


def load(name: str) -> Image.Image:
    path = SRC / name
    if not path.exists():
        sys.exit(f"missing source: {path}")
    if path.suffix.upper() == ".HEIC":
        TMP.mkdir(parents=True, exist_ok=True)
        jpg = TMP / (path.stem + ".jpg")
        if not jpg.exists():
            subprocess.run(["sips", "-s", "format", "jpeg", str(path), "--out", str(jpg)],
                           check=True, capture_output=True)
        path = jpg
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)  # honour phone rotation metadata
    return im.convert("RGB")


def grey_world(im: Image.Image) -> Image.Image:
    """Neutralise a colour cast by equalising the per-channel means."""
    r, g, b = im.split()
    means = [ch.resize((1, 1), Image.BOX).getpixel((0, 0)) for ch in (r, g, b)]
    target = sum(means) / 3
    return Image.merge("RGB", [
        ch.point(lambda v, m=m: min(255, int(v * target / max(m, 1))))
        for ch, m in zip((r, g, b), means)
    ])


def build(entry: dict, kind: str) -> dict:
    im = load(entry["src"])
    if crop := entry.get("crop"):
        im = im.crop(crop)
    if entry.get("wb"):
        im = grey_world(im)

    OUT.mkdir(parents=True, exist_ok=True)
    native_w, native_h = im.size
    # Never exceed the largest width the layout can actually display. A 4032px
    # phone photo would otherwise emit a 1.8MB variant that no `sizes` attribute
    # will ever select.
    widths = sorted({w for w in WIDTHS if w < native_w} | {min(native_w, max(WIDTHS))})
    variants = []
    for w in widths:
        h = round(native_h * w / native_w)
        out = OUT / f"{entry['slug']}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        variants.append({"w": w, "h": h, "file": out.name, "bytes": out.stat().st_size})

    return {
        "slug": entry["slug"], "kind": kind,
        "width": native_w, "height": native_h,
        "variants": variants,
    }


def main() -> None:
    manifest = [build(e, "flyer") for e in FLYERS] + [build(e, "photo") for e in PHOTOS]
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))

    total = sum(v["bytes"] for m in manifest for v in m["variants"])
    for m in manifest:
        sizes = " ".join(f"{v['w']}({v['bytes'] // 1024}K)" for v in m["variants"])
        print(f"{m['slug']:<28} {m['kind']:<6} {m['width']}x{m['height']:<6} {sizes}")
    print(f"\n{len(manifest)} images -> {total / 1024 / 1024:.2f} MB total")


if __name__ == "__main__":
    main()
