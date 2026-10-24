"""Outline the Panorama wordmark lockup into standalone SVG files.

The site draws the wordmark as live text (components/ui/Logo.astro):
"PANORAMA" in Source Serif 4 at weight 600, tracking -0.02em, over
"SCHOLARLY GROUP" in Inter at weight 600, tracking 0.15em, 0.42/1.1 the
size, 0.2rem below. This script reproduces that lockup with the same
self-hosted fonts and writes it as outlined paths, so the downloadable
files on /about/logo/ match the header exactly and need no fonts.

Run from web/ after `npm ci`:  python3 scripts/brand/build-wordmark.py
Needs: pip install fonttools brotli uharfbuzz (HarfBuzz applies the same
kerning the browser does)
"""
import io
from pathlib import Path

import uharfbuzz as hb

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / 'node_modules/@fontsource-variable'
OUT = ROOT / 'public/brand/psg/wordmark'

# Colours from styles/tokens.css (SEMANTIC: LOGO). Never re-themed.
VARIANTS = {
    'panorama-wordmark': ('#244344', '#727171'),
    'panorama-wordmark-inverse': ('#F6F1E8', '#F6F1E8', 0.7),
    'panorama-wordmark-black': ('#1C1C1C', '#1C1C1C'),
}

NAME_SIZE = 110.0          # 1.1rem scaled by 100
SUB_SIZE = 42.0            # 0.42rem
SUB_GAP = 20.0             # margin-top 0.2rem


def load(path):
    font = instantiateVariableFont(TTFont(path), {'wght': 600})
    font.flavor = None
    data = io.BytesIO()
    font.save(data)
    font = TTFont(io.BytesIO(data.getvalue()))
    font.hb = hb.Font(hb.Face(data.getvalue()))
    return font


def line(font, text, size, tracking_em):
    """Return (svg path data, ink bounds) for one line of text set at x=0
    with its line box (line-height: 1) starting at y=0."""
    upm = font['head'].unitsPerEm
    scale = size / upm
    hhea = font['hhea']
    asc, desc = hhea.ascent, -hhea.descent
    baseline = (size - (asc + desc) * scale) / 2 + asc * scale
    glyphs = font.getGlyphSet()
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font.hb, buf, {'kern': True, 'liga': False})
    order = font.getGlyphOrder()
    pen = SVGPathPen(glyphs, ntos=lambda v: f'{v:.1f}'.rstrip('0').rstrip('.'))
    bounds = BoundsPen(glyphs)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        transform = (scale, 0, 0, -scale, x + pos.x_offset * scale, baseline)
        glyphs[name].draw(TransformPen(pen, transform))
        glyphs[name].draw(TransformPen(bounds, transform))
        x += pos.x_advance * scale + tracking_em * size
    return pen.getCommands(), bounds.bounds


def main():
    serif = load(FONTS / 'source-serif-4/files/source-serif-4-latin-wght-normal.woff2')
    sans = load(FONTS / 'inter/files/inter-latin-wght-normal.woff2')
    name_d, name_b = line(serif, 'PANORAMA', NAME_SIZE, -0.02)
    sub_d, sub_b = line(sans, 'SCHOLARLY GROUP', SUB_SIZE, 0.15)
    sub_top = NAME_SIZE + SUB_GAP
    sub_b = (sub_b[0], sub_b[1] + sub_top, sub_b[2], sub_b[3] + sub_top)
    x0 = min(name_b[0], sub_b[0])
    y0 = min(name_b[1], sub_b[1])
    x1 = max(name_b[2], sub_b[2])
    y1 = max(name_b[3], sub_b[3])
    width, height = x1 - x0, y1 - y0
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, colours in VARIANTS.items():
        name_fill, sub_fill = colours[0], colours[1]
        sub_opacity = f' fill-opacity="{colours[2]}"' if len(colours) > 2 else ''
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.2f} {height:.2f}" '
            f'width="{width:.0f}" height="{height:.0f}" role="img" aria-label="Panorama Scholarly Group">\n'
            f'  <title>Panorama Scholarly Group</title>\n'
            f'  <g transform="translate({-x0:.2f} {-y0:.2f})">\n'
            f'    <path fill="{name_fill}" d="{name_d}"/>\n'
            f'    <path fill="{sub_fill}"{sub_opacity} transform="translate(0 {sub_top:.2f})" d="{sub_d}"/>\n'
            f'  </g>\n'
            f'</svg>\n'
        )
        (OUT / f'{slug}.svg').write_text(svg)
        print(f'{slug}.svg  {width:.1f} x {height:.1f}')


if __name__ == '__main__':
    main()
