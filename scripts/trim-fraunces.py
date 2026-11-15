"""Trim Fraunces for the site (run with fontTools and brotli installed).

The site always sets Fraunces at SOFT 100 and WONK 1 and only uses weights
600 to 900, so the variable font is instanced to exactly that: wght stays
variable (600..900), SOFT and WONK are pinned. That roughly halves the bytes
on the first phone screen (latin: 60+76 KB to 32+41 KB).

Source files: the Google Fonts latin woff2 for
  Fraunces:ital,SOFT,WONK,wght@0,0..100,0..1,100..900;1,0..100,0..1,100..900
Fraunces is licensed under the SIL Open Font License 1.1 (no reserved font name).

usage: python trim-fraunces.py <normal.woff2> <italic.woff2> <outdir>
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

normal, italic, outdir = sys.argv[1:4]
for src, name in [(normal, "Fraunces-SoftWonk-600-900.woff2"), (italic, "Fraunces-SoftWonk-600-900-Italic.woff2")]:
    font = instancer.instantiateVariableFont(TTFont(src), {"wght": (600, 900), "SOFT": 100, "WONK": 1})
    font.flavor = "woff2"
    font.save(f"{outdir}/{name}")
