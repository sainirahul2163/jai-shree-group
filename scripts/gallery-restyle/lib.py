"""Studio-grade re-styling toolkit for Jai Shree gallery photos.
Theme: bg #0a0a0a / card #111111 / brand #e8521a / hover #ff6b35 / steel #8a8a8a
"""
from PIL import Image, ImageOps, ImageFilter
import numpy as np

BRAND   = np.array([0xE8, 0x52, 0x1A], np.float32)/255
BRAND_H = np.array([0xFF, 0x6B, 0x35], np.float32)/255

def load(path):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    return np.asarray(im, np.float32)/255.0

def save(arr, path, q=90):
    Image.fromarray((np.clip(arr,0,1)*255+0.5).astype(np.uint8)).save(path, quality=q, subsampling=0)

def _box1d(a, r, axis):
    if r < 1: return a
    a = np.swapaxes(a, 0, axis)
    pad = np.concatenate([np.repeat(a[:1], r+1, 0), a, np.repeat(a[-1:], r, 0)], 0)
    c = np.cumsum(pad, 0, dtype=np.float32)
    out = (c[2*r+1:] - c[:-(2*r+1)]) / np.float32(2*r+1)
    return np.swapaxes(out, 0, axis)

def blur(a, sigma):
    """Gaussian approximation: 3 separable box passes (works on float arrays)."""
    a = np.asarray(a, np.float32)
    if sigma <= 0: return a.copy()
    r = max(1, int(round((np.sqrt(1+4*sigma*sigma)-1)/2)))
    for _ in range(3):
        a = _box1d(a, r, 0); a = _box1d(a, r, 1)
    return a

def luma(a):
    return a[...,0]*0.2126 + a[...,1]*0.7152 + a[...,2]*0.0722

def levels(a, lo=0.4, hi=99.6, per_channel=True):
    """Percentile black/white point stretch — kills haze."""
    out = np.empty_like(a)
    if per_channel:
        for i in range(3):
            c = a[...,i]; l, h = np.percentile(c, lo), np.percentile(c, hi)
            out[...,i] = (c-l)/max(h-l,1e-4)
    else:
        g = luma(a); l, h = np.percentile(g, lo), np.percentile(g, hi)
        out = (a-l)/max(h-l,1e-4)
    return np.clip(out,0,1)

def scurve(a, amt=0.35, pivot=0.5):
    """Filmic contrast around pivot."""
    x = np.clip(a,0,1)
    s = 1/(1+np.exp(-(x-pivot)*(4+amt*14))) 
    s0 = 1/(1+np.exp(pivot*(4+amt*14))); s1 = 1/(1+np.exp(-(1-pivot)*(4+amt*14)))
    s = (s-s0)/(s1-s0)
    return np.clip(x*(1-amt) + s*amt, 0, 1)

def gamma(a, g): return np.clip(a,0,1)**g

def clarity(a, radius=14, amount=0.55):
    """Local-contrast pop on luminance only — makes perforations read."""
    l = luma(a); lb = blur(l, radius)
    det = l - lb
    boosted = np.clip(l + det*amount, 1e-4, 1)
    return np.clip(a * (boosted/np.maximum(l,1e-4))[...,None], 0, 1)

def sharpen(a, radius=1.2, amount=0.7):
    lb = blur(a, radius)
    return np.clip(a + (a-lb)*amount, 0, 1)

def saturation(a, s):
    g = luma(a)[...,None]
    return np.clip(g + (a-g)*s, 0, 1)

def split_tone(a, shadow_rgb, high_rgb, s_amt=0.10, h_amt=0.07):
    """Cool steel shadows / clean highlights."""
    l = luma(a)[...,None]
    sh = np.clip(1-l*1.9, 0, 1); hi = np.clip((l-0.55)*2.2, 0, 1)
    a = a + (np.asarray(shadow_rgb,np.float32)-0.5)*sh*s_amt*2
    a = a + (np.asarray(high_rgb,np.float32)-0.5)*hi*h_amt*2
    return np.clip(a,0,1)

def neutralize(a, strength=1.0):
    """Gray-world white balance to remove camera colour cast."""
    m = a.reshape(-1,3).mean(0); t = m.mean()
    return np.clip(a * (1 + ((t/np.maximum(m,1e-4))-1)*strength), 0, 1)

def coords(h, w):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    return y, x

def smoothstep(e0, e1, x):
    """Supports descending ranges (e0 > e1) — needed for inside-out masks."""
    d = e1 - e0
    if abs(d) < 1e-9: d = 1e-9
    t = np.clip((x-e0)/d, 0, 1)
    return t*t*(3-2*t)

def radial_bg(h, w, inner="#161616", outer="#0a0a0a", cx=0.5, cy=0.46, spread=0.78):
    def hx(c): return np.array([int(c[i:i+2],16) for i in (1,3,5)], np.float32)/255
    y, x = coords(h,w)
    d = np.sqrt(((x/w)-cx)**2 + ((y/h)-cy)**2)/spread
    t = smoothstep(0,1,np.clip(d,0,1))[...,None]
    return hx(inner)*(1-t) + hx(outer)*t

def screen(base, layer):   return 1-(1-base)*(1-layer)
def add(base, layer, k=1): return np.clip(base + layer*k, 0, 1)

def vignette(a, strength=0.55, radius=0.72, softness=0.55, cx=0.5, cy=0.5):
    h, w = a.shape[:2]; y, x = coords(h,w)
    ar = w/h
    d = np.sqrt((((x/w)-cx)*ar)**2 + ((y/h)-cy)**2) / (radius*max(ar,1))
    v = 1 - strength*smoothstep(1-softness, 1.25, d)
    return np.clip(a*v[...,None], 0, 1)
