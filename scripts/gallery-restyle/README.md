# Gallery image restyling

Turns raw camera photos into square, dark, site-theme gallery images.

Shop photos arrive bright, colour-cast and cluttered; the gallery grid renders
`aspect-square` cards on `#0A0A0A`. This pipeline matches them to that: neutral
white balance, steel grade, dark backdrop, brand-orange accent light, 1500×1500 out.

## Setup (once)

```bash
cd scripts/gallery-restyle
python3 -m venv venv && ./venv/bin/pip install pillow numpy
```

## Use

Drop the originals in `Gallery/` at the repo root (gitignored), then:

```bash
./venv/bin/python restyle.py disc ../../Gallery/blank.JPG perforated-round-blank
```

Two modes:

- **`disc`** — round blanks and circular screens. Finds the disc by its texture,
  cuts it out and drops it on a dark backdrop with rim light and a warm glow.
  Tune framing with `--fill` (higher = disc fills more of the frame).
- **`scene`** — everything else: sheets, coils, machines. Square crop plus dark
  grade and vignette. Aim the crop with `--cx/--cy/--side` (fractions, 0–1) and
  use `--floor-burn 0.3` to sink a cluttered floor into shadow.

`--expo` controls brightness on both; lower is darker steel.

Output lands in `public/gallery/<name>.jpg`.

HEIC input needs converting first: `sips -s format jpeg in.HEIC --out out.jpg`

## The four current images

```bash
./venv/bin/python restyle.py disc  ../../Gallery/227349f4-….JPG perforated-round-blank
./venv/bin/python restyle.py disc  ../../Gallery/431392a3-….JPG perforated-fine-blank  --expo 0.80
./venv/bin/python restyle.py scene ../../Gallery/6C4EF2E6-….JPG perforated-sheet-detail --cy 0.44 --expo 0.74
./venv/bin/python restyle.py scene /tmp/coils.jpg perforated-coil-stock --cx 0.515 --cy 0.48 --side 0.84 --floor-burn 0.30
```

## Publishing

The gallery reads from the Supabase `gallery_items` table, so a processed file
in `public/gallery/` is not live until a row points at it — set `image_url` to
the local path (e.g. `/gallery/perforated-round-blank.jpg`), with `title`,
`product_category`, `sort_order` and `is_published = true`.
