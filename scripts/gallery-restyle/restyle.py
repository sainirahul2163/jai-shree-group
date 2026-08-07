#!/usr/bin/env python3
"""
Restyle raw camera photos into site-theme gallery images.

Camera shots come in bright, colour-cast and cluttered; the site is dark
(#0a0a0a cards, #e8521a brand). This renders them as square, dark, studio-lit
product images that drop straight into the gallery grid.

    python3 restyle.py disc  ../../Gallery/blank.JPG  perforated-round-blank
    python3 restyle.py scene ../../Gallery/coils.HEIC perforated-coil-stock --cy 0.48 --side 0.84

Modes
  disc   Round blank / circular screen. Finds the disc by texture, cuts it out,
         drops it on a dark backdrop with rim light and a warm brand glow.
  scene  Any other shot (sheets, coils, machines). Square crop + dark grade,
         vignette and floor burn to sink cluttered backgrounds into shadow.

Setup (once):
    python3 -m venv venv && ./venv/bin/pip install pillow numpy
Then run with ./venv/bin/python instead of python3.
HEIC input needs a JPEG first:  sips -s format jpeg in.HEIC --out out.jpg
"""
import argparse, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
from PIL import Image
from lib import (BRAND, BRAND_H, blur, clarity, coords, gamma, levels, load,
                 neutralize, radial_bg, save, saturation, scurve, screen,
                 sharpen, smoothstep, split_tone, vignette)

DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "gallery")


def find_disc(a, scale=520):
    """Locate the circular blank: perforated area = high local variance."""
    h, w = a.shape[:2]
    im = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).convert("L")
    sw, sh = scale, int(scale * h / w)
    s = np.asarray(im.resize((sw, sh), Image.LANCZOS), np.float32) / 255
    var = blur((s - blur(s, 3)) ** 2, 3)
    mask = blur((var > np.percentile(var, 52)).astype(np.float32), 5) > 0.55
    ys, xs = np.nonzero(mask)
    cy, cx = ys.mean(), xs.mean()
    for _ in range(4):
        ang = np.arctan2(ys - cy, xs - cx)
        rad = np.hypot(xs - cx, ys - cy)
        bins = ((ang + np.pi) / (2 * np.pi) * 180).astype(int) % 180
        rmax = np.array([np.percentile(rad[bins == b], 99) if np.any(bins == b) else 0
                         for b in range(180)])
        r = np.median(rmax[rmax > 0])
        keep = rad < r * 1.06
        cy, cx = ys[keep].mean(), xs[keep].mean()
    k = w / sw
    return cx * k, cy * k, r * k


def render_disc(src, out, *, cast=0.95, lo=1.0, hi=99.4, gam=1.25, expo=0.85,
                contrast=0.38, clar=0.62, sat=0.60, light_deg=132,
                canvas=1500, fill=0.84, warm=1.0, q=90):
    a = load(src)
    cx, cy, r = find_disc(a)
    H0, W0 = a.shape[:2]
    r_fit = min(cx, cy, W0 - cx, H0 - cy)
    if r > r_fit * 0.995:
        r = r_fit * 0.995          # disc runs off the frame — trim to what exists
    print(f"  disc @ ({cx:.0f},{cy:.0f}) r={r:.0f}px")

    pad = r / fill
    x0, y0, side = int(round(cx - pad)), int(round(cy - pad)), int(round(pad * 2))
    buf = np.zeros((side, side, 3), np.float32)
    sx0, sy0 = max(x0, 0), max(y0, 0)
    sx1, sy1 = min(x0 + side, W0), min(y0 + side, H0)
    buf[sy0 - y0:sy1 - y0, sx0 - x0:sx1 - x0] = a[sy0:sy1, sx0:sx1]
    a = np.asarray(Image.fromarray((np.clip(buf, 0, 1) * 255).astype(np.uint8))
                   .resize((canvas, canvas), Image.LANCZOS), np.float32) / 255
    R = r * canvas / side
    CX = CY = canvas / 2

    a = neutralize(a, cast)
    a = levels(a, lo, hi, per_channel=False) * expo
    a = gamma(a, gam)
    a = clarity(a, radius=int(canvas * 0.010), amount=clar)
    a = scurve(a, contrast, pivot=0.46)
    a = saturation(a, sat)
    a = split_tone(a, (0.42, 0.50, 0.62), (1.0, 0.97, 0.92), 0.16, 0.10)
    a = sharpen(a, 1.1, 0.55)

    h = w = canvas
    y, x = coords(h, w)
    dn = np.hypot(x - CX, y - CY) / R
    th = np.arctan2(y - CY, x - CX)
    lr = np.deg2rad(light_deg)

    key = np.clip(0.5 - (((x - CX) * np.cos(lr) + (y - CY) * np.sin(lr)) / R) * 0.5, 0, 1) ** 1.6
    a = np.clip(a * (0.86 + key * 0.30)[..., None], 0, 1)

    disc = smoothstep(1.004, 0.988, dn)[..., None]
    bg = radial_bg(h, w, "#191919", "#0b0b0b", 0.5, 0.44, 0.82)
    ring = np.exp(-((dn - 1.0) ** 2) / (2 * 0.055 ** 2))
    bg = screen(bg, blur(ring, canvas * 0.020)[..., None] * BRAND * 0.13 * warm)
    halo = blur(smoothstep(1.22, 0.99, dn) * smoothstep(0.98, 1.02, dn), canvas * 0.05)
    bg = screen(bg, halo[..., None] * BRAND * 0.06 * warm)
    sh = smoothstep(1.02, 0.86, np.hypot((x - CX) / (R * 1.02), (y - (CY + R * 0.60)) / (R * 0.20)))
    bg = np.clip(bg * (1 - blur(sh, canvas * 0.022)[..., None] * 0.85), 0, 1)

    comp = bg * (1 - disc) + a * disc
    band = np.exp(-((dn - 0.988) ** 2) / (2 * 0.011 ** 2))
    keyr = np.clip(np.cos(th - (lr + np.pi)), 0, 1) ** 1.5
    fillr = np.clip(np.cos(th - lr), 0, 1) ** 1.8
    comp = screen(comp, (band * keyr * 0.40)[..., None] * np.array([0.88, 0.93, 1.0], np.float32))
    comp = screen(comp, (band * fillr * 0.30 * warm)[..., None] * BRAND_H)
    comp = screen(comp, blur(band * fillr, canvas * 0.012)[..., None] * BRAND * 0.12 * warm)
    save(vignette(comp, 0.50, 0.80, 0.75), out, q)


def render_scene(src, out, *, cx=0.5, cy=0.5, side=1.0, canvas=1500, cast=0.85,
                 lo=0.8, hi=99.6, gam=1.24, expo=0.82, contrast=0.34, clar=0.50,
                 sat=0.48, vig=0.64, leak_deg=-58, leak=0.12, floor_burn=0.0, q=90):
    a = load(src)
    H, W = a.shape[:2]
    s = int(side * min(W, H))
    x0 = int(np.clip(cx * W - s / 2, 0, W - s))
    y0 = int(np.clip(cy * H - s / 2, 0, H - s))
    print(f"  crop {s}px @ ({x0},{y0}) from {W}x{H}")
    a = np.asarray(Image.fromarray((np.clip(a[y0:y0 + s, x0:x0 + s], 0, 1) * 255).astype(np.uint8))
                   .resize((canvas, canvas), Image.LANCZOS), np.float32) / 255

    a = neutralize(a, cast)
    a = levels(a, lo, hi, per_channel=False) * expo
    a = gamma(a, gam)
    a = clarity(a, radius=int(canvas * 0.012), amount=clar)
    a = scurve(a, contrast, pivot=0.44)
    a = saturation(a, sat)
    a = split_tone(a, (0.40, 0.48, 0.62), (1.0, 0.97, 0.93), 0.18, 0.10)
    a = sharpen(a, 1.1, 0.5)

    h = w = canvas
    y, x = coords(h, w)
    if floor_burn > 0:
        a = np.clip(a * (1 - smoothstep(0.58, 1.0, y / h)[..., None] * floor_burn), 0, 1)
    if leak_deg is not None:
        lr = np.deg2rad(leak_deg)
        p = ((x - w / 2) * np.cos(lr) + (y - h / 2) * np.sin(lr)) / (w * 0.5)
        a = screen(a, (np.clip(p, 0, 1) ** 1.7)[..., None] * BRAND * leak)
    save(vignette(a, vig, 0.74, 0.72), out, q)


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("mode", choices=["disc", "scene"])
    p.add_argument("src")
    p.add_argument("name", help="output slug, written to public/gallery/<name>.jpg")
    p.add_argument("--cx", type=float, default=0.5, help="scene: crop centre X (0-1)")
    p.add_argument("--cy", type=float, default=0.5, help="scene: crop centre Y (0-1)")
    p.add_argument("--side", type=float, default=1.0, help="scene: crop size as fraction of the short edge")
    p.add_argument("--expo", type=float, help="exposure; lower = darker steel")
    p.add_argument("--floor-burn", type=float, default=0.0, help="scene: sink the bottom into shadow (0-1)")
    p.add_argument("--fill", type=float, default=0.84, help="disc: how much of the frame the disc fills")
    a = p.parse_args()

    out = os.path.normpath(os.path.join(DEST, a.name + ".jpg"))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    kw = {} if a.expo is None else {"expo": a.expo}
    if a.mode == "disc":
        render_disc(a.src, out, fill=a.fill, **kw)
    else:
        render_scene(a.src, out, cx=a.cx, cy=a.cy, side=a.side, floor_burn=a.floor_burn, **kw)
    print(f"  -> {out}  ({os.path.getsize(out)/1024:.0f} KB)")
