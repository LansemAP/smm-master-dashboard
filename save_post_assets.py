"""
SMM Asset Manager — save_post_assets.py
========================================
Run this script after generating post images to:
  1. Copy PNGs from the artifact/brain directory into the correct brand/platform folder
  2. Combine them into a LinkedIn-ready PDF carousel

Usage:
    python save_post_assets.py

The script will prompt you for:
  - Brand         (suriosity / corely / lansem)
  - Platform      (linkedin / instagram / twitter / facebook)
  - Post slug     (e.g. millet_global_impact)
  - Image paths   (full paths to generated PNGs, one per line, blank to finish)

Output folder:
    <brand>/<platform>/assets/<post_slug>/
        slide_01_<name>.png
        slide_02_<name>.png
        ...
        <post_slug>_carousel.pdf   (if 2+ images)

Requires: pip install pillow
"""

import os
import sys
import shutil
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    os.system(f"{sys.executable} -m pip install pillow -q")
    from PIL import Image

def slugify(text):
    return text.strip().lower().replace(" ", "_").replace("-", "_")

def main():
    print("\n=== SMM Asset Saver ===\n")

    brand = input("Brand (suriosity / corely / lansem): ").strip().lower()
    platform = input("Platform (linkedin / instagram / twitter / facebook): ").strip().lower()
    post_slug = slugify(input("Post slug (e.g. millet_global_impact): "))

    # Build destination folder
    base_dir = Path(__file__).parent
    dest_dir = base_dir / brand.capitalize() / platform.capitalize() / "assets" / post_slug
    dest_dir.mkdir(parents=True, exist_ok=True)

    print(f"\nDestination: {dest_dir}\n")
    print("Paste full paths to PNG/JPG images (one per line). Press Enter on blank line when done:")

    image_paths = []
    while True:
        line = input(f"  Image {len(image_paths)+1}: ").strip().strip('"').strip("'")
        if not line:
            break
        p = Path(line)
        if not p.exists():
            print(f"  ⚠ File not found: {p} — skipping")
            continue
        image_paths.append(p)

    if not image_paths:
        print("No images provided. Exiting.")
        return

    # Copy PNGs with clean names
    saved_pngs = []
    for i, src in enumerate(image_paths, 1):
        name_hint = input(f"  Slide {i} short label (e.g. climate_story, or press Enter to skip): ").strip()
        label = f"_{slugify(name_hint)}" if name_hint else ""
        dest_name = f"slide_{i:02d}{label}{src.suffix}"
        dest_path = dest_dir / dest_name
        shutil.copy2(src, dest_path)
        saved_pngs.append(dest_path)
        print(f"  ✓ Saved {dest_name}")

    # Generate PDF if 2+ images
    if len(saved_pngs) >= 1:
        pdf_path = dest_dir / f"{post_slug}_carousel.pdf"
        imgs = [Image.open(p).convert("RGB") for p in saved_pngs]
        if len(imgs) == 1:
            imgs[0].save(pdf_path)
        else:
            imgs[0].save(pdf_path, save_all=True, append_images=imgs[1:])
        print(f"\n✅ PDF created: {pdf_path}")
    
    print(f"\n✅ All assets saved to:\n   {dest_dir}")
    print("\nAssets:")
    for f in sorted(dest_dir.iterdir()):
        size_kb = round(f.stat().st_size / 1024, 1)
        print(f"   {f.name}  ({size_kb} KB)")

if __name__ == "__main__":
    main()
