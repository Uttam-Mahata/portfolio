#!/usr/bin/env python3
"""
Blog Architecture Diagram Generator
Generates Excalidraw v2 JSON, SVG Vector (with embedded Virgil handwriting font),
and High-Resolution PNG Assets for:
1. rootaccess_architecture_diagram
2. k3s_production_architecture_diagram
3. tailscale_exit_node_diagram
4. openwa_ai_architecture_diagram
"""

import os
import sys
import json
import uuid
import base64
import subprocess
from typing import Tuple, List, Dict, Any

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(BASE_DIR, "public", "blog-posts")
DIAGRAMS_DIR = os.path.join(DOCS_DIR, "diagrams")
IMAGES_DIR = os.path.join(DOCS_DIR, "images")
FONTS_DIR = os.path.join(DOCS_DIR, "fonts")

os.makedirs(DIAGRAMS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

VIRGIL_PATH = os.path.join(FONTS_DIR, "Virgil-Regular.ttf")
if not os.path.exists(VIRGIL_PATH):
    VIRGIL_PATH = "/home/uttam/.local/share/fonts/Virgil-Regular.ttf"

VIRGIL_B64 = ""
if os.path.exists(VIRGIL_PATH):
    with open(VIRGIL_PATH, "rb") as f:
        VIRGIL_B64 = base64.b64encode(f.read()).decode("ascii")

def xml_escape(text: str) -> str:
    if not isinstance(text, str):
        text = str(text)
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
            .replace("'", "&apos;"))

# SVG Icon Catalog
ICONS = {
    "cloudflare": '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#f59e0b"/>',
    "lambda": '<path d="M6 20h3l4.5-11 3.5 11h3L14.5 4h-3L6 20z" fill="#fb923c"/>',
    "gcp": '<path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l7 3.5v7l-7 3.5-7-3.5v-7l7-3.5z" fill="#38bdf8"/>',
    "turso": '<path d="M12 3c-5 0-9 1.34-9 3v12c0 1.66 4 3 9 3s9-1.34 9-3V6c0-1.66-4-3-9-3zm0 2c4 0 7 .9 7 1.5S16 8 12 8 5 7.1 5 6.5 8 5 12 5zm0 14c-4 0-7-.9-7-1.5V16c1.6.8 4.2 1.25 7 1.25s5.4-.45 7-1.25v1.5c0 .6-3 1.5-7 1.5zm0-4.5c-4 0-7-.9-7-1.5V11.5c1.6.8 4.2 1.25 7 1.25s5.4-.45 7-1.25v1.5c0 .6-3 1.5-7 1.5z" fill="#00e5a3"/>',
    "redis": '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    "oci": '<rect x="3" y="4" width="18" height="4" rx="1" fill="#f97316"/><rect x="3" y="10" width="18" height="4" rx="1" fill="#f97316"/><rect x="3" y="16" width="18" height="4" rx="1" fill="#f97316"/><circle cx="6" cy="6" r="1" fill="#fff"/><circle cx="6" cy="12" r="1" fill="#fff"/><circle cx="6" cy="18" r="1" fill="#fff"/>',
    "wireguard": '<path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4zm0 11h7c-.5 4.1-3.3 7.8-7 8.9V13H5V7.3l7-3.1v8.8z" fill="#a855f7"/>',
    "k3s": '<circle cx="12" cy="12" r="3" fill="#3b82f6"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.1-7.1l-2.8 2.8m-8.5 8.5l-2.8 2.8m0-14.1l2.8 2.8m8.5 8.5l2.8 2.8" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>',
    "docker": '<path d="M2 14c.5-3 3-5 7-5 1 0 2 .2 3 .5V6h3v3c2.5 1 3.5 3 3.5 4.5 0 3-3 6.5-9 6.5-5 0-7.5-3.5-7.5-6.5z" fill="#38bdf8"/>',
    "tailscale": '<circle cx="6" cy="6" r="3" fill="#38bdf8"/><circle cx="18" cy="6" r="3" fill="#38bdf8"/><circle cx="12" cy="18" r="3" fill="#38bdf8"/><path d="M6 6l6 12 6-12" stroke="#38bdf8" stroke-width="1.8" fill="none"/>',
    "client": '<rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="#94a3b8" stroke-width="2"/><path d="M1 21h22" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>',
    "globe": '<circle cx="12" cy="12" r="10" stroke="#38bdf8" stroke-width="1.8" fill="none"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#38bdf8" stroke-width="1.8" fill="none"/>',
    "whatsapp": '<path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.3-1.2l-.3-.2-3.2.8.8-3.1-.2-.3C4.5 14.9 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" fill="#22c55e"/>',
    "ai": '<circle cx="6" cy="12" r="2.5" fill="#a855f7"/><circle cx="18" cy="6" r="2.5" fill="#a855f7"/><circle cx="18" cy="18" r="2.5" fill="#a855f7"/><path d="M8.5 11l7-4M8.5 13l7 4" stroke="#a855f7" stroke-width="1.8"/>',
    "server": '<rect x="3" y="4" width="18" height="6" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/><rect x="3" y="14" width="18" height="6" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/><circle cx="7" cy="7" r="1" fill="#60a5fa"/><circle cx="7" cy="17" r="1" fill="#60a5fa"/>',
    "database": '<ellipse cx="12" cy="5" rx="8" ry="3" fill="none" stroke="#10b981" stroke-width="2"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#10b981" stroke-width="2" fill="none"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#10b981" stroke-width="2" fill="none"/>',
    "lock": '<rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="#fbbf24" stroke-width="2"/><path d="M8 11V7a4 4 0 018 0v4" stroke="#fbbf24" stroke-width="2" fill="none"/>'
}

class ExcalidrawArchitect:
    def __init__(self, title: str, subtitle: str, badges: list = None, width=3200, height=1720):
        self.title = title
        self.subtitle = subtitle
        self.badges = badges or []
        self.width = width
        self.height = height
        self._seed = 5000

        self.exc_elements = []
        self.svg_defs = []
        self.svg_content = []
        self._init_svg_defs()

        # Canvas Header
        self.add_exc_rect(60, 40, self.width - 120, 130, stroke_color="#334155", bg_color="#0f172a", stroke_width=2, roundness=3)
        self.add_exc_text(96, 72, self.title, font_size=32, color="#f8fafc", font_family=1)
        self.add_exc_text(96, 120, self.subtitle, font_size=18, color="#94a3b8", font_family=1)

    def _next_seed(self):
        self._seed += 1
        return self._seed

    def _init_svg_defs(self):
        font_style = ""
        if VIRGIL_B64:
            font_style = f'''
@font-face {{
  font-family: 'Virgil';
  src: url('data:font/truetype;charset=utf-8;base64,{VIRGIL_B64}') format('truetype');
  font-weight: normal;
  font-style: normal;
}}
'''
        self.svg_defs.append(f'''
    <style>
      {font_style}
      text {{
        font-family: 'Virgil', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }}
      .font-mono {{
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
      }}
    </style>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.7" stroke-opacity="0.35"/>
      <circle cx="40" cy="40" r="1.2" fill="#334155" opacity="0.3"/>
    </pattern>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
    </marker>
    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399"/>
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24"/>
    </marker>
    <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7"/>
    </marker>
    <marker id="arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#fb7185"/>
    </marker>
    <linearGradient id="grad-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="grad-cyan-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="grad-emerald-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="grad-purple-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b0764" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="grad-amber-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350f" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
        ''')

    def add_exc_rect(self, x, y, w, h, stroke_color="#334155", bg_color="#1e293b",
                     stroke_width=2, stroke_style="solid", fill_style="solid", roundness=3):
        el_id = str(uuid.uuid4())[:8]
        el = {
            "id": el_id, "type": "rectangle", "x": x, "y": y, "width": w, "height": h,
            "angle": 0, "strokeColor": stroke_color, "backgroundColor": bg_color,
            "fillStyle": fill_style, "strokeWidth": stroke_width, "strokeStyle": stroke_style,
            "roughness": 1, "opacity": 100, "groupIds": [], "frameId": None,
            "roundness": {"type": roundness}, "seed": self._next_seed(), "version": 1,
            "versionNonce": 1, "isDeleted": False, "boundElements": None, "updated": 1,
            "link": None, "locked": False
        }
        self.exc_elements.append(el)
        return el_id

    def add_exc_text(self, x, y, text_content, font_size=20, color="#f8fafc",
                     font_family=1, text_align="left"):
        el_id = str(uuid.uuid4())[:8]
        lines = text_content.split("\n")
        line_height = font_size * 1.3
        width = max(len(line) for line in lines) * (font_size * 0.58)
        height = len(lines) * line_height
        el = {
            "id": el_id, "type": "text", "x": x, "y": y, "width": width, "height": height,
            "angle": 0, "strokeColor": color, "backgroundColor": "transparent",
            "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid",
            "roughness": 1, "opacity": 100, "groupIds": [], "frameId": None,
            "roundness": None, "seed": self._next_seed(), "version": 1, "versionNonce": 1,
            "isDeleted": False, "boundElements": None, "updated": 1, "link": None,
            "locked": False, "text": text_content, "fontSize": font_size,
            "fontFamily": font_family, "textAlign": text_align, "verticalAlign": "top",
            "containerId": None, "originalText": text_content, "lineHeight": 1.3
        }
        self.exc_elements.append(el)
        return el_id

    def add_exc_arrow(self, x1, y1, x2, y2, color="#38bdf8", stroke_width=2, stroke_style="solid"):
        el_id = str(uuid.uuid4())[:8]
        dx = x2 - x1
        dy = y2 - y1
        el = {
            "id": el_id, "type": "arrow", "x": x1, "y": y1, "width": abs(dx), "height": abs(dy),
            "angle": 0, "strokeColor": color, "backgroundColor": "transparent",
            "fillStyle": "solid", "strokeWidth": stroke_width, "strokeStyle": stroke_style,
            "roughness": 1, "opacity": 100, "groupIds": [], "frameId": None,
            "roundness": {"type": 2}, "seed": self._next_seed(), "version": 1,
            "versionNonce": 1, "isDeleted": False, "boundElements": None, "updated": 1,
            "link": None, "locked": False, "points": [[0, 0], [dx, dy]],
            "lastCommittedPoint": None, "startBinding": None, "endBinding": None,
            "startArrowhead": None, "endArrowhead": "arrow"
        }
        self.exc_elements.append(el)
        return el_id

    def add_container(self, x, y, w, h, title, subtitle="",
                      accent_color="#38bdf8", bg_fill="url(#grad-card)",
                      border_color="#0284c7", badge="", icon=""):
        filt_attr = 'filter="url(#shadow)"'
        self.svg_content.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{bg_fill}" stroke="{border_color}" stroke-width="3" {filt_attr}/>'
        )
        
        tx = x + 30
        if icon and icon in ICONS:
            self.svg_content.append(
                f'<g transform="translate({x+28}, {y+28}) scale(1.35)">{ICONS[icon]}</g>'
            )
            tx += 42

        self.svg_content.append(
            f'<text x="{tx}" y="{y+52}" fill="{accent_color}" font-size="23" font-weight="700">{xml_escape(title)}</text>'
        )
        if subtitle:
            self.svg_content.append(
                f'<text x="{x+30}" y="{y+82}" fill="#94a3b8" font-size="14">{xml_escape(subtitle)}</text>'
            )
        if badge:
            bw = len(badge) * 8.5 + 24
            bx = x + w - bw - 28
            self.svg_content.append(
                f'<rect x="{bx}" y="{y+26}" width="{bw}" height="28" rx="8" fill="#0f172a" stroke="{accent_color}" stroke-width="1.5"/>'
            )
            self.svg_content.append(
                f'<text x="{bx + bw/2}" y="{y+45}" fill="{accent_color}" font-size="13" font-weight="700" text-anchor="middle">{xml_escape(badge)}</text>'
            )

        self.add_exc_rect(x, y, w, h, stroke_color=border_color, bg_color="#0b1329", stroke_width=3, roundness=3)
        self.add_exc_text(tx, y + 30, title, font_size=20, color=accent_color)
        if subtitle:
            self.add_exc_text(x + 30, y + 68, subtitle, font_size=13, color="#94a3b8")

    def add_card(self, x, y, w, h, title, items=None, subtitle="",
                 accent_color="#38bdf8", bg_fill="url(#grad-card)",
                 border_color="#334155", badge="", badge_color="#0369a1",
                 code_block="", icon=""):
        self.svg_content.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="{bg_fill}" stroke="{border_color}" stroke-width="2" filter="url(#shadow)"/>'
        )
        self.svg_content.append(
            f'<path d="M {x+14} {y} L {x+w-14} {y}" stroke="{accent_color}" stroke-width="3" stroke-linecap="round"/>'
        )

        tx = x + 20
        if icon and icon in ICONS:
            self.svg_content.append(
                f'<g transform="translate({x+18}, {y+16}) scale(1.15)">{ICONS[icon]}</g>'
            )
            tx += 34

        self.svg_content.append(
            f'<text x="{tx}" y="{y+34}" fill="{accent_color}" font-size="19" font-weight="700">{xml_escape(title)}</text>'
        )

        if badge:
            bw = len(badge) * 7.5 + 18
            self.svg_content.append(
                f'<rect x="{x+w-bw-16}" y="{y+16}" width="{bw}" height="24" rx="6" fill="{badge_color}"/>'
            )
            self.svg_content.append(
                f'<text x="{x+w-bw/2-16}" y="{y+33}" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">{xml_escape(badge)}</text>'
            )

        ty = y + 62
        if subtitle:
            self.svg_content.append(
                f'<text x="{x+20}" y="{ty}" fill="#94a3b8" font-size="14">{xml_escape(subtitle)}</text>'
            )
            ty += 26

        if items:
            for item in items:
                self.svg_content.append(f'<circle cx="{x+22}" cy="{ty-5}" r="3" fill="{accent_color}"/>')
                self.svg_content.append(
                    f'<text x="{x+34}" y="{ty}" fill="#cbd5e1" font-size="14">{xml_escape(item)}</text>'
                )
                ty += 26

        if code_block:
            code_lines = code_block.strip().split("\n")
            cb_h = len(code_lines) * 20 + 16
            self.svg_content.append(
                f'<rect x="{x+16}" y="{ty+4}" width="{w-32}" height="{cb_h}" rx="8" fill="#090d16" stroke="#1e293b" stroke-width="1"/>'
            )
            cy = ty + 24
            for line in code_lines:
                self.svg_content.append(
                    f'<text x="{x+26}" y="{cy}" fill="{accent_color}" font-size="12" class="font-mono">{xml_escape(line)}</text>'
                )
                cy += 20

        self.add_exc_rect(x, y, w, h, stroke_color=border_color, bg_color="#131d31", stroke_width=2, roundness=3)
        self.add_exc_text(tx, y + 16, title, font_size=17, color=accent_color)
        ey = y + 42
        if subtitle:
            self.add_exc_text(x + 20, ey, subtitle, font_size=13, color="#94a3b8")
            ey += 22
        if items:
            for item in items:
                self.add_exc_text(x + 20, ey, "• " + item, font_size=13, color="#cbd5e1")
                ey += 20
        if code_block:
            self.add_exc_text(x + 20, ey + 4, code_block, font_size=11, color=accent_color, font_family=3)

    def add_arrow(self, x1, y1, x2, y2, color="#38bdf8", stroke_width=2.5,
                  dashed=False, marker="arrow-cyan", label=""):
        dash_attr = 'stroke-dasharray="6,6"' if dashed else ''
        marker_attr = f'marker-end="url(#{marker})"' if marker else ''
        self.svg_content.append(
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{stroke_width}" {dash_attr} {marker_attr}/>'
        )
        if label:
            mx = (x1 + x2) / 2
            my = (y1 + y2) / 2 - 8
            lw = len(label) * 8 + 20
            self.svg_content.append(
                f'<rect x="{mx - lw/2}" y="{my - 14}" width="{lw}" height="24" rx="6" fill="#0b0f19" stroke="{color}" stroke-width="1.5"/>'
            )
            self.svg_content.append(
                f'<text x="{mx}" y="{my + 2}" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">{xml_escape(label)}</text>'
            )

        self.add_exc_arrow(x1, y1, x2, y2, color=color, stroke_width=int(stroke_width),
                           stroke_style="dashed" if dashed else "solid")
        if label:
            mx = (x1 + x2) / 2
            my = (y1 + y2) / 2 - 18
            self.add_exc_text(mx - len(label)*3, my, label, font_size=12, color=color)

    def export_svg(self) -> str:
        svg_parts = []
        svg_parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.width}" height="{self.height}" viewBox="0 0 {self.width} {self.height}">')
        svg_parts.append('<defs>')
        svg_parts.extend(self.svg_defs)
        svg_parts.append('</defs>')
        svg_parts.append(f'<rect width="{self.width}" height="{self.height}" fill="#0b0f19"/>')
        svg_parts.append(f'<rect width="{self.width}" height="{self.height}" fill="url(#grid)"/>')

        svg_parts.append(f'<rect x="60" y="40" width="{self.width-120}" height="130" rx="14" fill="#0f172a" stroke="#334155" stroke-width="2" filter="url(#shadow)"/>')
        svg_parts.append(f'<text x="96" y="94" fill="#f8fafc" font-size="32" font-weight="800">{xml_escape(self.title)}</text>')
        svg_parts.append(f'<text x="96" y="136" fill="#94a3b8" font-size="17" font-weight="500">{xml_escape(self.subtitle)}</text>')

        cur_bx = self.width - 96
        for badge_text, bg_col, text_col, border_col in reversed(self.badges):
            pad_x = 14
            w = int(len(badge_text) * 8 + pad_x * 2)
            h = 34
            cur_bx -= w + 14
            svg_parts.append(f'<rect x="{cur_bx}" y="88" width="{w}" height="{h}" rx="8" fill="{bg_col}" stroke="{border_col}" stroke-width="1.5"/>')
            svg_parts.append(f'<text x="{cur_bx + w/2}" y="110" fill="{text_col}" font-size="13" font-weight="700" text-anchor="middle">{xml_escape(badge_text)}</text>')

        svg_parts.extend(self.svg_content)

        svg_parts.append(f'<line x1="60" y1="{self.height-45}" x2="{self.width-60}" y2="{self.height-45}" stroke="#1e293b" stroke-width="1"/>')
        svg_parts.append(f'<text x="96" y="{self.height-22}" fill="#64748b" font-size="13">Uttam Mahata Engineering Notes • Excalidraw Architecture Specification</text>')
        svg_parts.append(f'<text x="{self.width-96}" y="{self.height-22}" fill="#64748b" font-size="13" text-anchor="end">Production Vector SVG &amp; High-DPI PNG</text>')

        svg_parts.append('</svg>')
        return "\n".join(svg_parts)

    def export_excalidraw(self) -> dict:
        return {
            "type": "excalidraw",
            "version": 2,
            "source": "https://excalidraw.com",
            "elements": self.exc_elements,
            "appState": {
                "gridSize": None,
                "viewBackgroundColor": "#0b0f19"
            },
            "files": {}
        }


# ==============================================================================
# 1. ROOTACCESS MULTI-CLOUD SERVERLESS CTF ARCHITECTURE
# ==============================================================================
def build_rootaccess_diagram() -> Tuple[str, dict]:
    title = "RootAccess: Zero-Cost Multi-Cloud Serverless CTF"
    subtitle = "Autonomous Routing Across 4 Clouds: Cloudflare Edge, AWS Lambda, GCP, Turso, Upstash Redis & OCI"
    badges = [
        ("Multi-Cloud Serverless", "#0369a1", "#e0f2fe", "#38bdf8"),
        ("Cloudflare Edge", "#d97706", "#ffffff", "#f59e0b"),
        ("AWS Lambda 1M Calls", "#ea580c", "#ffffff", "#f97316"),
        ("GCP Functions Overflow", "#0284c7", "#ffffff", "#38bdf8"),
        ("Turso libSQL 500 DBs", "#059669", "#ffffff", "#10b981"),
        ("OCI Always Free ARM", "#c026d3", "#ffffff", "#e879f9")
    ]
    diag = ExcalidrawArchitect(title, subtitle, badges, width=3200, height=1720)

    # Ingress (Col 1)
    diag.add_container(60, 210, 680, 1440, "INGRESS & EDGE ROUTING",
                       "Cloudflare Anycast Network, Threat Mitigation & Proxy Routing",
                       accent_color="#f59e0b", bg_fill="url(#grad-amber-card)", border_color="#d97706",
                       badge="3M Req/Mo Free", icon="cloudflare")

    diag.add_card(90, 320, 620, 260, "Competitors & CTF Participants",
                  subtitle="Browser SPA, Terminal CLI, Automated Solvers",
                  items=[
                      "Live WebSocket Scoreboard & solves subscription",
                      "RESTful challenge submission & hint consumption",
                      "Dynamic flag validation with replay prevention"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", icon="client")

    diag.add_card(90, 620, 620, 310, "Cloudflare WAF Rate Limiter",
                  subtitle="Edge DDoS Mitigation & L7 Throttling",
                  items=[
                      "Native sliding window: 300 req / 60s per client IP",
                      "Enforces challenge bot mitigation & SYN flood defense",
                      "Zero-latency edge enforcement via Cloudflare Anycast"
                  ],
                  accent_color="#f59e0b", border_color="#d97706", badge="WAF Shield", icon="cloudflare",
                  code_block="action: challenge\nthreshold: 300 req / 60s\nstatus: HTTP 429 Too Many Requests")

    diag.add_card(90, 970, 620, 340, "API Router Worker",
                  subtitle="Smart Quota-Aware Multi-Cloud Reverse Proxy",
                  items=[
                      "Tracks monthly invocation counts in Cloudflare KV",
                      "Primary routing: AWS Lambda (0 to 950k calls)",
                      "Overflow routing: GCP Cloud Functions (950k to 3M calls)",
                      "Automatic health-check fallback on upstream 5xx"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Router Worker", icon="cloudflare",
                  code_block="if (lambda_calls < 950_000) {\n  return fetch(AWS_LAMBDA_ENDPOINT);\n}\nreturn fetch(GCP_FUNCTIONS_ENDPOINT);")

    # Compute (Col 2)
    diag.add_container(780, 210, 740, 1440, "SERVERLESS COMPUTE LAYER",
                       "Dual-Cloud Stateless Go 1.24 Gin Binaries with Zero Cold Starts",
                       accent_color="#fb923c", bg_fill="url(#grad-card)", border_color="#ea580c",
                       badge="3M Calls/Mo", icon="lambda")

    diag.add_card(810, 320, 680, 330, "AWS Lambda (Primary Compute)",
                  subtitle="High-Performance Go 1.24 Gin REST API",
                  items=[
                      "Free Tier: 1,000,000 requests/mo + 400k GB-sec",
                      "Generous 100 GB/month free internet egress bandwidth",
                      "Custom Go runtime binary (`provided.al2023`)",
                      "P99 cold start latency: < 85ms on warm instance"
                  ],
                  accent_color="#fb923c", border_color="#ea580c", badge="Primary (0 - 950k)", icon="lambda",
                  code_block="RAM: 256 MB | Architecture: arm64\nTimeout: 5s | Egress: 100 GB Free\nEngine: Go 1.24 Gin Framework")

    diag.add_card(810, 690, 680, 330, "GCP Cloud Functions (Overflow)",
                  subtitle="Seamless Secondary Elastic Fallback",
                  items=[
                      "Free Tier: 2,000,000 requests/mo + 400k GB-sec",
                      "Identical compiled Go Gin handler packaging",
                      "Instantly activates when AWS quota reaches 95% threshold",
                      "Zero manual intervention required during peak CTF traffic"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Fallback (950k - 3M)", icon="gcp",
                  code_block="RAM: 256 MB | Gen 2 Cloud Function\nTrigger: HTTP Authenticated Token\nRegion: us-central1")

    diag.add_card(810, 1060, 680, 290, "Core Business Logic & Handlers",
                  subtitle="Idempotent Flag Verification & Scoring Engine",
                  items=[
                      "Flag verification with SHA-256 constant-time comparison",
                      "First-blood bonus points calculation and audit trail",
                      "Team membership validation and dynamic penalty scoring",
                      "Stateless execution with externalized session state"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="Go Engine", icon="server")

    # State (Col 3)
    diag.add_container(1560, 210, 760, 1440, "DISTRIBUTED STATE & CACHE",
                       "Multi-Tenant Edge SQLite & Low-Latency Redis Clusters",
                       accent_color="#10b981", bg_fill="url(#grad-emerald-card)", border_color="#059669",
                       badge="Zero DB Cost", icon="turso")

    diag.add_card(1590, 320, 700, 360, "Turso Edge SQLite (libSQL)",
                  subtitle="Distributed Multi-Database Storage Engine",
                  items=[
                      "Free Tier: 500 individual databases, 500M row reads/mo",
                      "Database-per-tenant model: Isolated DB per CTF competition",
                      "Microsecond local read replication at edge locations",
                      "Zero noisy-neighbor interference between concurrent events"
                  ],
                  accent_color="#10b981", border_color="#059669", badge="Primary Persistence", icon="turso",
                  code_block="Databases: 500 Allocated\nRow Reads: 500,000,000/mo Free\nDriver: @libsql/client (Embedded Replica)")

    diag.add_card(1590, 720, 700, 360, "Upstash Redis Cluster",
                  subtitle="Ultra-Fast In-Memory Cache & Distributed Locks",
                  items=[
                      "Free Tier: 6 DB instances × 500k commands = 3M commands/mo",
                      "Distributed mutex locks (`SET key val NX EX 5`) for solve atomicity",
                      "Token bucket per-user submission rate limiting",
                      "Pre-computed live scoreboard ranking cache (`ZREVRANGE`)"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="Atomic Locking", icon="redis",
                  code_block="Commands: 3,000,000/mo Total\nDB0: Scoreboard Cache | DB1: Rate Limits\nDB2: Solve Mutex Locks | DB3: Sessions")

    diag.add_card(1590, 1120, 700, 230, "High-Availability Edge State",
                  subtitle="Sub-10ms Global Latency Across Multi-Cloud Tiers",
                  items=[
                      "Turso replicas deployed in primary player regions worldwide",
                      "Upstash auto-pipeline executes Redis commands in batches",
                      "Automatic rollback on failure ensures score integrity"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="Global State")

    # OCI (Col 4)
    diag.add_container(2360, 210, 780, 1440, "ORACLE CLOUD ALWAYS FREE",
                       "Dedicated Ampere Compute & S3 Object Storage",
                       accent_color="#c026d3", bg_fill="url(#grad-purple-card)", border_color="#9333ea",
                       badge="24/7 Always Free", icon="oci")

    diag.add_card(2390, 320, 720, 400, "OCI VM Ampere (WebSocket Broadcaster)",
                  subtitle="Persistent WebSocket & Real-Time Engine",
                  items=[
                      "Specifications: 4 ARM OCPUs, 24 GB RAM, 200 GB Storage",
                      "Bandwidth: 10 TB free monthly egress data transfer",
                      "Go WebSocket hub broadcasting live solves to thousands",
                      "Consumes solve events via Upstash Redis Pub/Sub stream",
                      "Systemd daemon with automated TLS renewal via Certbot"
                  ],
                  accent_color="#e879f9", border_color="#a855f7", badge="4 OCPUs / 24 GB", icon="oci",
                  code_block="OS: Ubuntu 24.04 LTS ARM64\nService: rootaccess-broadcaster.service\nConcurrent WSS Clients: 10,000+\nEgress: 10 TB/Month Included")

    diag.add_card(2390, 760, 720, 360, "OCI Object Storage (S3 API)",
                  subtitle="Challenge Files & Binary Distribution",
                  items=[
                      "Free Tier: 20 GB Always Free object storage allocation",
                      "S3-compatible API integration with AWS Go SDK v2",
                      "Short-lived presigned download URLs (7-day maximum expiry)",
                      "Automated checksum hashing and virus scan validation"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="20 GB S3 Store", icon="database",
                  code_block="Endpoint: compat.objectstorage.us-ashburn-1.oraclecloud.com\nBucket: rootaccess-challenge-binaries\nAuth: HMAC AWS Signature v4")

    diag.add_card(2390, 1160, 720, 190, "Zero Infrastructure Invoicing",
                  subtitle="Production Grade SLA with Zero Monthly Spend",
                  items=[
                      "Combined monthly cloud invoice: Exactly $0.00 / month",
                      "Designed for scale up to 10,000 concurrent CTF participants",
                      "Resilient to individual cloud provider regional downtime"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="$0.00 / Month")

    # Connectors
    diag.add_arrow(400, 580, 400, 620, color="#f59e0b", stroke_width=2.5, label="HTTPS")
    diag.add_arrow(400, 930, 400, 970, color="#f59e0b", stroke_width=2.5, label="WAF Clear")

    diag.add_arrow(710, 1050, 810, 480, color="#fb923c", stroke_width=2.5, marker="arrow-amber", label="Primary < 950k")
    diag.add_arrow(710, 1140, 810, 850, color="#38bdf8", stroke_width=2.5, marker="arrow-cyan", label="Overflow > 950k")

    diag.add_arrow(1490, 480, 1590, 480, color="#10b981", stroke_width=2.5, marker="arrow-emerald", label="SQL Queries")
    diag.add_arrow(1490, 850, 1590, 850, color="#ef4444", stroke_width=2.5, marker="arrow-rose", label="Redis Locks")

    diag.add_arrow(2290, 900, 2390, 520, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Pub/Sub Sync")
    diag.add_arrow(2290, 520, 2390, 940, color="#fbbf24", stroke_width=2.5, dashed=True, marker="arrow-amber", label="Presigned S3")

    return diag.export_svg(), diag.export_excalidraw()


# ==============================================================================
# 2. PRODUCTION K3S 4-NODE HA VPS CLUSTER ARCHITECTURE
# ==============================================================================
def build_k3s_diagram() -> Tuple[str, dict]:
    title = "Production K3s 4-Node HA VPS Cluster"
    subtitle = "Encrypted WireGuard Mesh (10.0.0.0/24) with HAProxy Dual-Ingress & Functional Node Isolation"
    badges = [
        ("Production K3s HA", "#0369a1", "#e0f2fe", "#38bdf8"),
        ("WireGuard Full Mesh", "#6d28d9", "#ffffff", "#8b5cf6"),
        ("Dual HAProxy Ingress", "#d97706", "#ffffff", "#f59e0b"),
        ("App Worker 32GB", "#059669", "#ffffff", "#10b981"),
        ("Isolated Storage", "#b91c1c", "#ffffff", "#ef4444")
    ]
    diag = ExcalidrawArchitect(title, subtitle, badges, width=3200, height=1720)

    # Ingress (Col 1)
    diag.add_container(60, 210, 680, 1440, "EDGE & DUAL INGRESS",
                       "Cloudflare Anycast SSL & Distributed Failover Routing",
                       accent_color="#f59e0b", bg_fill="url(#grad-amber-card)", border_color="#d97706",
                       badge="DDoS Mitigation", icon="cloudflare")

    diag.add_card(90, 320, 620, 260, "Internet Traffic & Clients",
                  subtitle="Web Browsers, Mobile Apps, REST API Calls",
                  items=[
                      "Edge SSL/TLS termination via Cloudflare Universal SSL",
                      "Automated DNS health checks and failover records",
                      "WebSockets proxying with HTTP/2 multiplexing"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", icon="globe")

    diag.add_card(90, 620, 620, 340, "Gateway Node Ingress (CP1)",
                  subtitle="Primary HAProxy & Control Plane 1",
                  items=[
                      "Node Spec: 8 GB RAM / 100 GB NVMe Storage",
                      "Public IP + Private WireGuard IP: 10.0.0.1",
                      "HAProxy layer 7 routing: `/` -> K3s Traefik Ingress",
                      "Embedded etcd quorum member 1 of 2"
                  ],
                  accent_color="#f59e0b", border_color="#d97706", badge="Primary Gateway", icon="server",
                  code_block="IP: 10.0.0.1 | Role: Ingress + Control Plane\nHAProxy: Ports 80, 443 -> Ingress Controllers\netcd Member: CP1")

    diag.add_card(90, 1000, 620, 340, "Data Node Ingress (CP2 Backup)",
                  subtitle="Secondary HAProxy & Control Plane 2",
                  items=[
                      "Node Spec: 8 GB RAM / 100 GB NVMe Storage",
                      "Public IP + Private WireGuard IP: 10.0.0.4",
                      "Backup HAProxy active on Cloudflare DNS failover",
                      "Embedded etcd quorum member 2 of 2"
                  ],
                  accent_color="#f59e0b", border_color="#d97706", badge="Backup Gateway", icon="server",
                  code_block="IP: 10.0.0.4 | Role: Backup Ingress + CP2\nFailover: DNS Health-checked 5s\netcd Member: CP2")

    # WireGuard Mesh (Col 2)
    diag.add_container(780, 210, 1100, 1440, "WIREGUARD MESH VPN (10.0.0.0/24)",
                       "Zero-Trust Kernel-Space Overlay: Direct Node-to-Node Peering",
                       accent_color="#a855f7", bg_fill="url(#grad-purple-card)", border_color="#7c3aed",
                       badge="Kernel Mesh", icon="wireguard")

    diag.add_card(810, 320, 490, 330, "Gateway Peer (10.0.0.1)",
                  subtitle="Public Ingress + CP1",
                  items=[
                      "Peered with: 10.0.0.2 (App Worker)",
                      "Peered with: 10.0.0.3 (Cache Server)",
                      "Peered with: 10.0.0.4 (Data Node)",
                      "Routes external traffic into cluster pods"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="10.0.0.1", icon="wireguard",
                  code_block="interface: wg0 | ip: 10.0.0.1/24\npeers: 3 active tunnels")

    diag.add_card(1360, 320, 490, 330, "App Node Peer (10.0.0.2)",
                  subtitle="Compute Workloads & CI/CD",
                  items=[
                      "Peered with: 10.0.0.1 (Gateway)",
                      "Peered with: 10.0.0.3 (Cache Server)",
                      "Peered with: 10.0.0.4 (Data Node)",
                      "Consumes databases exclusively over wg0"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="10.0.0.2", icon="wireguard",
                  code_block="interface: wg0 | ip: 10.0.0.2/24\npeers: 3 active tunnels")

    diag.add_card(810, 690, 490, 330, "Cache Node Peer (10.0.0.3)",
                  subtitle="In-Memory Caching",
                  items=[
                      "Peered with: 10.0.0.1 (Gateway)",
                      "Peered with: 10.0.0.2 (App Worker)",
                      "Peered with: 10.0.0.4 (Data Node)",
                      "Binds Redis strictly to `10.0.0.3:6379`"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="10.0.0.3", icon="wireguard",
                  code_block="interface: wg0 | ip: 10.0.0.3/24\npeers: 3 active tunnels")

    diag.add_card(1360, 690, 490, 330, "Data Node Peer (10.0.0.4)",
                  subtitle="Databases & Storage",
                  items=[
                      "Peered with: 10.0.0.1 (Gateway)",
                      "Peered with: 10.0.0.2 (App Worker)",
                      "Peered with: 10.0.0.3 (Cache Server)",
                      "Zero public ports open for MySQL/MongoDB"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="10.0.0.4", icon="wireguard",
                  code_block="interface: wg0 | ip: 10.0.0.4/24\npeers: 3 active tunnels")

    diag.add_card(810, 1060, 1040, 280, "Mesh Topology Guarantees",
                  subtitle="Combinatorial Full Mesh: (4 × 3) / 2 = 6 Peer Connections",
                  items=[
                      "Direct point-to-point routing: No single VPN gateway bottleneck",
                      "Sub-millisecond latency: Cryptographic ChaCha20-Poly1305 kernel overhead < 1%",
                      "Private Docker registry operates over plaintext HTTP safely inside tunnel",
                      "Automatic MTU clamping (1420 bytes) prevents packet fragmentation"
                  ],
                  accent_color="#a855f7", border_color="#7c3aed", badge="6 Tunnels Full Mesh")

    # Workloads & Storage (Col 3)
    diag.add_container(1920, 210, 1220, 1440, "DEDICATED PRODUCTION TIERS",
                       "Separation of Heavy Compute, Caching & Stateful Persistence",
                       accent_color="#10b981", bg_fill="url(#grad-emerald-card)", border_color="#059669",
                       badge="Dedicated Roles", icon="k3s")

    diag.add_card(1950, 320, 560, 370, "App Node (Compute)",
                  subtitle="32 GB RAM / 400 GB NVMe Workhorse",
                  items=[
                      "K3s Worker Agent hosting dynamic container pods",
                      "GitLab CI/CD Runner executing Docker builds",
                      "Private Docker Registry: `registry.internal:5000`",
                      "Stateless microservices auto-scaled horizontally"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="App Worker (32GB)", icon="docker",
                  code_block="CPU: 8 vCPUs | RAM: 32 GB\nStorage: 400 GB Fast NVMe\nRegistry: Local HTTP on 10.0.0.2:5000\nPods: 45+ Production Containers")

    diag.add_card(2550, 320, 560, 370, "Cache Node (In-Memory)",
                  subtitle="8 GB RAM / 100 GB Dedicated Cache",
                  items=[
                      "Redis 7 Server with dedicated CPU pinning",
                      "Sub-millisecond session & token validation",
                      "AOF persistence with daily snapshot backups",
                      "Protected from memory starvation caused by app pods"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="Cache (8GB)", icon="redis",
                  code_block="CPU: 4 vCPUs | RAM: 8 GB\nRole: In-Memory Low-Latency Cache\nMaxMemory: 6 GB / eviction: allkeys-lru\nAccess: Restricted to WireGuard Subnet")

    diag.add_card(1950, 730, 1160, 380, "Data Node (Stateful Persistence)",
                  subtitle="8 GB RAM / 100 GB NVMe Database Engine",
                  items=[
                      "MySQL 8.0: InnoDB engine with tuned buffer pools for transactional relational data",
                      "MongoDB 7.0: Document store with WiredTiger compression for schema-free analytics",
                      "NFS Shared Storage: Exports `/srv/nfs` to App Worker for persistent volume claims (PVC)",
                      "Automated local & remote offsite daily backups with cryptographic verification"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="Storage Engine", icon="database",
                  code_block="MySQL: 10.0.0.4:3306 (WireGuard Only) | MongoDB: 10.0.0.4:27017 (WireGuard Only)\nNFS Server: exports /srv/nfs/k3s-pvcs rw,sync,no_subtree_check\nZero public attack surface: UFW firewall drops all external database requests")

    diag.add_card(1950, 1150, 1160, 190, "Security & Performance Guarantees",
                  subtitle="Production Isolation Across Physical Host VPS Instances",
                  items=[
                      "Compute workloads never compromise database disk I/O or memory limits",
                      "Internal traffic strictly bounded inside WireGuard encrypted kernel tunnels",
                      "Zero cost cloud egress fees across private node mesh interconnects"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Isolation Guarantee")

    # Connectors
    diag.add_arrow(710, 480, 810, 480, color="#f59e0b", stroke_width=2.5, marker="arrow-amber", label="L7 Ingress")
    diag.add_arrow(1300, 480, 1360, 480, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Tunnel 1-2")
    diag.add_arrow(1055, 650, 1055, 690, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Tunnel 1-3")
    diag.add_arrow(1300, 855, 1360, 855, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Tunnel 3-4")
    diag.add_arrow(1605, 650, 1605, 690, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Tunnel 2-4")

    diag.add_arrow(1850, 480, 1950, 480, color="#34d399", stroke_width=2.5, marker="arrow-emerald", label="Deploy Pods")
    diag.add_arrow(1850, 855, 1950, 855, color="#fbbf24", stroke_width=2.5, marker="arrow-amber", label="Internal DB")

    return diag.export_svg(), diag.export_excalidraw()


# ==============================================================================
# 3. TAILSCALE RESIDENTIAL EXIT NODE ARCHITECTURE
# ==============================================================================
def build_tailscale_diagram() -> Tuple[str, dict]:
    title = "Tailscale Permanent Residential Exit Node"
    subtitle = "Repurposing an Old Laptop into an Unattended 24/7 Home WireGuard Gateway with Zero Port-Forwarding"
    badges = [
        ("Tailscale Architecture", "#0369a1", "#e0f2fe", "#38bdf8"),
        ("WireGuard Tunnel", "#6d28d9", "#ffffff", "#8b5cf6"),
        ("Residential Fiber", "#059669", "#ffffff", "#10b981"),
        ("Kernel IP Forwarding", "#ea580c", "#ffffff", "#f97316"),
        ("Zero Port Forwarding", "#b91c1c", "#ffffff", "#ef4444")
    ]
    diag = ExcalidrawArchitect(title, subtitle, badges, width=3200, height=1650)

    # Left: Client Device (Col 1)
    diag.add_container(60, 210, 880, 1360, "ROAMING CLIENT DEVICE",
                       "Untrusted Network (Coffee Shop Wi-Fi, Hotel, Cellular 5G)",
                       accent_color="#38bdf8", bg_fill="url(#grad-cyan-card)", border_color="#0284c7",
                       badge="Worldwide Egress", icon="client")

    diag.add_card(90, 320, 820, 340, "Client Device (Laptop / Phone)",
                  subtitle="Ubuntu Linux / macOS / iOS / Android Client",
                  items=[
                      "Connects to arbitrary untrusted public Wi-Fi access point",
                      "Tailscale client daemon active with `--exit-node=home-laptop`",
                      "All IPv4 (`0.0.0.0/0`) & IPv6 (`::/0`) default routes captured",
                      "Local DNS hijacked to route queries through MagicDNS"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Tailscale Peer", icon="client",
                  code_block="Command to engage exit node:\n$ tailscale up --exit-node=home-laptop --exit-node-allow-lan-access=false\nRouting Table:\ndefault via 100.101.102.1 dev tailscale0 proto static")

    diag.add_card(90, 700, 820, 320, "Untrusted Network Threats Defeated",
                  subtitle="Mitigated by End-to-End Cryptographic Tunnel",
                  items=[
                      "ARP Spoofing & Man-in-the-Middle packet sniffing completely thwarted",
                      "Hotel / ISP DNS logging and captive portal tracking rendered useless",
                      "Geo-fenced banking and work services accessible seamlessly",
                      "Direct WireGuard ChaCha20 encryption from device to home"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="Zero-Trust Egress", icon="lock")

    diag.add_card(90, 1060, 820, 280, "Client-Side Verification",
                  subtitle="Confirming Encrypted Route Traversal",
                  items=[
                      "Public IP check confirms home fiber WAN address",
                      "Speedtest indicates throughput bounded by home upload rate",
                      "Zero packet leakage verified with Wireshark capture"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="Status Verified",
                  code_block="$ curl ifconfig.me\n→ 103.xxx.xxx.xxx (Home Fiber ISP)\n$ tailscale status\nhome-laptop   100.x.y.z  linux  active; exit node")

    # Center: Tailnet Fabric (Col 2)
    diag.add_container(1000, 210, 960, 1360, "TAILSCALE TAILNET FABRIC",
                       "Control Plane & Encrypted Mesh Coordination Layer",
                       accent_color="#a855f7", bg_fill="url(#grad-purple-card)", border_color="#7c3aed",
                       badge="NAT Traversal", icon="tailscale")

    diag.add_card(1030, 320, 900, 380, "Tailscale Coordination Server",
                  subtitle="Key Exchange & Mesh Topography Distribution",
                  items=[
                      "Distributes public WireGuard keys without handling plaintext data",
                      "Authenticates devices via Google / GitHub SSO",
                      "Enforces ACLs & device authorization for exit node approval",
                      "Performs STUN discovery to establish direct peer-to-peer UDP punch"
                  ],
                  accent_color="#a855f7", border_color="#7c3aed", badge="Control Plane", icon="tailscale",
                  code_block="Tailnet Coordination:\n• Key Exchange: Curve25519 Ephemeral\n• Node Approval: Admin Console -> Edit Route Settings\n• MagicDNS: 100.64.0.0/10 CGNAT Subnet")

    diag.add_card(1030, 740, 900, 380, "DERP Relay Network (Fallback)",
                  subtitle="Encrypted Relay Servers Worldwide",
                  items=[
                      "Employed only if firewall NAT is strict/symmetric on both sides",
                      "Packets remain fully end-to-end encrypted; DERP cannot inspect",
                      "Zero port-forwarding or public IP required on home fiber router",
                      "Automatically upgrades to direct UDP connection once established"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="Encrypted Relay", icon="globe",
                  code_block="Relay Diagnostics:\n$ tailscale netcheck\n* UDP: false (firewalled) -> DERP-9 (Mumbai) Relay\n* Latency: 24ms direct / 32ms relayed")

    diag.add_card(1030, 1160, 900, 180, "Security & Privacy Guarantees",
                  subtitle="Zero Cloud Decryption Architecture",
                  items=[
                      "Traffic is never decrypted by Tailscale infrastructure or DERP relays",
                      "Direct Point-to-Point WireGuard encryption between client and home laptop"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="End-to-End Encrypted")

    # Right: Home Exit Node Laptop & Internet (Col 3)
    diag.add_container(2020, 210, 1120, 1360, "HOME RESIDENTIAL EXIT GATEWAY",
                       "Repurposed Laptop Running 24/7 Linux Kernel IP Forwarding",
                       accent_color="#10b981", bg_fill="url(#grad-emerald-card)", border_color="#059669",
                       badge="Home Fiber Gateway", icon="server")

    diag.add_card(2050, 320, 510, 410, "Repurposed Laptop (Exit Node)",
                  subtitle="Old Hardware Transformed into Router",
                  items=[
                      "OS: Minimal Ubuntu Server 24.04 LTS",
                      "Systemd daemon: `tailscaled` enabled across reboots",
                      "Lid close action disabled in `/etc/systemd/logind.conf`",
                      "Kernel forwarding: `net.ipv4.ip_forward = 1`",
                      "Connected via Ethernet to home fiber router"
                  ],
                  accent_color="#10b981", border_color="#059669", badge="Exit Node Server", icon="server",
                  code_block="Kernel Configuration:\necho 'net.ipv4.ip_forward = 1' | sudo tee /etc/sysctl.d/99-tailscale.conf\necho 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf\nsudo sysctl -p /etc/sysctl.d/99-tailscale.conf")

    diag.add_card(2590, 320, 520, 410, "iptables NAT Masquerade",
                  subtitle="Kernel Packet Forwarding Engine",
                  items=[
                      "Rewrites source IP from Tailscale client to home LAN IP",
                      "Enables client packets to traverse home router seamlessly",
                      "Persistent across reboots via `iptables-persistent`",
                      "Hardware offloading handles 300+ Mbps wire speed"
                  ],
                  accent_color="#ea580c", border_color="#f97316", badge="NAT Masquerade", icon="lock",
                  code_block="iptables Rules:\nsudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE\nsudo iptables -A FORWARD -i tailscale0 -o eth0 -j ACCEPT\nsudo iptables -A FORWARD -i eth0 -o tailscale0 -m state --state RELATED,ESTABLISHED -j ACCEPT")

    diag.add_card(2050, 770, 1060, 340, "Residential Internet Gateway (ISP)",
                  subtitle="Home Fiber Connection Delivering Clean IP Reputation",
                  items=[
                      "Standard home fiber ONT router (zero ports forwarded, zero public IPv4 configuration)",
                      "ISP assigns residential IP pool address (not flagged as commercial datacenter VPN)",
                      "Seamless access to geo-restricted streaming, corporate intranets, and home LAN NAS",
                      "Complete independence from commercial VPN subscription costs and logging policies"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Residential WAN", icon="globe",
                  code_block="Egress Destination: Public Internet\nEgress IP: Residential ISP Dynamic/Static Address\nResult: 100% Transparent, Secure, Zero-Cost Personal VPN Gateway")

    diag.add_card(2050, 1150, 1060, 190, "Hardware Longevity & Maintenance",
                  subtitle="Sustainable Self-Hosting Strategy",
                  items=[
                      "Battery threshold locked to 60-80% via TLP to prevent battery swelling",
                      "Automatic unattended Ubuntu security updates enabled",
                      "Idle power consumption: < 6 Watts under standard load"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="< 6W Power Draw")

    # Connectors
    diag.add_arrow(910, 490, 1030, 490, color="#38bdf8", stroke_width=2.5, marker="arrow-cyan", label="Key Exchange")
    diag.add_arrow(910, 930, 1030, 930, color="#fbbf24", stroke_width=2.5, dashed=True, marker="arrow-amber", label="Tunnel WireGuard")

    diag.add_arrow(1930, 490, 2050, 490, color="#10b981", stroke_width=2.5, marker="arrow-emerald", label="Direct UDP")
    diag.add_arrow(2560, 520, 2590, 520, color="#ea580c", stroke_width=2.5, marker="arrow-amber", label="Forward")
    diag.add_arrow(2580, 730, 2580, 770, color="#38bdf8", stroke_width=2.5, marker="arrow-cyan", label="NAT Egress")

    return diag.export_svg(), diag.export_excalidraw()


# ==============================================================================
# 4. OPENWA AI WHATSAPP GATEWAY & COGNITIVE ENGINE
# ==============================================================================
def build_openwa_diagram() -> Tuple[str, dict]:
    title = "OpenWA AI WhatsApp Gateway & Cognitive Engine"
    subtitle = "Native ARM64 Chromium, NestJS Gateway, LangGraph Stateful RAG & Cloudflare Workers AI"
    badges = [
        ("OpenWA AI Gateway", "#0369a1", "#e0f2fe", "#38bdf8"),
        ("ARM64 Playwright", "#ea580c", "#ffffff", "#f97316"),
        ("NestJS API Gateway", "#b91c1c", "#ffffff", "#ef4444"),
        ("LangGraph Cognitive", "#6d28d9", "#ffffff", "#8b5cf6"),
        ("Postgres pgvector", "#059669", "#ffffff", "#10b981"),
        ("Workers AI Models", "#d97706", "#ffffff", "#f59e0b")
    ]
    diag = ExcalidrawArchitect(title, subtitle, badges, width=3200, height=1720)

    # Left: WhatsApp Protocol & Browser (Col 1)
    diag.add_container(60, 210, 740, 1440, "WHATSAPP & BROWSER PROTOCOL",
                       "Mobile End-User to Standalone ARM64 Playwright Browser",
                       accent_color="#22c55e", bg_fill="url(#grad-card)", border_color="#16a34a",
                       badge="Zero-Crash ARM64", icon="whatsapp")

    diag.add_card(90, 320, 680, 260, "WhatsApp Mobile End-User",
                  subtitle="Consumers & Enterprise WhatsApp Clients",
                  items=[
                      "Sends and receives multimedia, text messages, and audio notes",
                      "Interacts with intelligent customer support agent",
                      "Zero special app installations required on client phone",
                      "End-to-end encrypted protocol to WhatsApp Cloud servers"
                  ],
                  accent_color="#22c55e", border_color="#16a34a", badge="Mobile Client", icon="whatsapp")

    diag.add_card(90, 610, 680, 270, "WhatsApp Cloud Infrastructure",
                  subtitle="Meta Core Messaging Infrastructure",
                  items=[
                      "Manages device multi-device registration & pairing sessions",
                      "Propagates inbound webhooks and real-time message payloads",
                      "Maintains persistent secure WebSocket connection to Web client"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Meta Protocol", icon="globe")

    diag.add_card(90, 910, 680, 430, "Playwright ARM64 Chromium",
                  subtitle="Host-Native Standalone Headless Engine",
                  items=[
                      "Bypasses Ubuntu `/usr/bin/chromium` wrapper GPU crash",
                      "Direct native binary execution on OCI Ampere ARM64 architecture",
                      "WebSocket event listener intercepting WhatsApp DOM changes",
                      "Automated QR code capture and session persistence store"
                  ],
                  accent_color="#fb923c", border_color="#ea580c", badge="Playwright ARM64", icon="docker",
                  code_block="Command: npx --yes playwright install chromium\nExecutable: ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome\nFlags: --no-sandbox --disable-setuid-sandbox\nRAM Usage: ~380 MB Stable (Zero Renderer Crashes)")

    diag.add_card(90, 1370, 680, 150, "Browser Stability Metric",
                  subtitle="Continuous Unattended Uptime",
                  items=[
                      "Zero renderer crashes observed over 6+ months production deployment",
                      "Headless memory leak mitigation via automated scheduled recycling"
                  ],
                  accent_color="#22c55e", border_color="#16a34a", badge="99.9% Uptime")

    # Center: Backend & Storage (Col 2)
    diag.add_container(840, 210, 1080, 1440, "OCI ARM AMPERE VM (1 OCPU / 6 GB)",
                       "NestJS Gateway, Session Caches & Vector Persistence",
                       accent_color="#38bdf8", bg_fill="url(#grad-cyan-card)", border_color="#0284c7",
                       badge="Host VM Tier", icon="server")

    diag.add_card(870, 320, 490, 340, "Host Nginx Reverse Proxy",
                  subtitle="SSL Termination & WebSockets",
                  items=[
                      "Terminates Let's Encrypt SSL certificates",
                      "Routes to Dashboard (Port 2886)",
                      "Routes to NestJS API Gateway (Port 2785)",
                      "WebSocket upgrade headers handling"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Port 443 / 80", icon="server",
                  code_block="server_name openwa.uttammahata.in;\nproxy_pass http://localhost:2785;\nproxy_set_header Upgrade $http_upgrade;\nproxy_set_header Connection 'upgrade';")

    diag.add_card(1390, 320, 500, 340, "NestJS API Gateway",
                  subtitle="Modular Controller & Event Bus",
                  items=[
                      "Controls Playwright browser instance lifecycle",
                      "Ingests inbound messages and dispatches AI tasks",
                      "Emits outbound formatted responses back to WhatsApp",
                      "Exposes REST endpoints for admin dashboard"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="Port 2785", icon="server",
                  code_block="Framework: NestJS 10 / TypeScript\nModules: Auth, Webhook, Chat, Agent\nQueue: BullMQ (Redis-backed)")

    diag.add_card(870, 690, 490, 350, "Redis 7 Container",
                  subtitle="Session State & BullMQ Queues",
                  items=[
                      "DB0: WhatsApp session keys & connection state",
                      "DB1: Inbound message deduplication cache",
                      "DB2: BullMQ background jobs for LLM inference",
                      "Low-latency sub-millisecond in-memory operations"
                  ],
                  accent_color="#ef4444", border_color="#dc2626", badge="Port 6379", icon="redis",
                  code_block="Docker: redis:7-alpine\nVolumes: /var/lib/docker/volumes/redis-data\nMemory Limit: 512 MB\nPersistence: Append-Only File (AOF)")

    diag.add_card(1390, 690, 500, 350, "PostgreSQL 16 + pgvector",
                  subtitle="Relational DB & 384d Vector Store",
                  items=[
                      "Stores full conversational history and user metadata",
                      "`pgvector` extension enabled for semantic similarity search",
                      "HNSW indexing for sub-5ms vector distance queries",
                      "Stores knowledge base document chunks and embeddings"
                  ],
                  accent_color="#10b981", border_color="#059669", badge="Port 5433", icon="database",
                  code_block="Extension: CREATE EXTENSION vector;\nSchema: document_embeddings (\n  id SERIAL, content TEXT, embedding vector(384)\n);\nIndex: USING hnsw (embedding vector_cosine_ops)")

    diag.add_card(870, 1070, 1020, 270, "Telemetry & Python Log Shipper Daemon",
                  subtitle="Journald Systemd Stream -> OpenObserve (Port 5081)",
                  items=[
                      "Lightweight Python daemon reading systemd journal logs directly from socket",
                      "Strips ANSI escape codes, normalizes JSON attributes, batches at 100 logs / 5s",
                      "Streams structured metrics to OpenObserve for real-time observability"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="OpenObserve Telemetry")

    diag.add_card(870, 1370, 1020, 150, "Resource Optimization Profile",
                  subtitle="Minimal Footprint Execution on OCI Free Tier",
                  items=[
                      "Total memory consumption across all 5 services: < 4.2 GB of 6 GB available RAM",
                      "CPU utilization under sustained load: < 35% on single Ampere ARM64 vOCPU"
                  ],
                  accent_color="#38bdf8", border_color="#0284c7", badge="Low Overhead")

    # Right: Cognitive AI Engine & Multi-Cloud LLMs (Col 3)
    diag.add_container(1960, 210, 1180, 1440, "COGNITIVE AI & MULTI-CLOUD INFERENCE",
                       "LangGraph StateGraph, FastEmbed ONNX & Cloudflare Workers AI",
                       accent_color="#a855f7", bg_fill="url(#grad-purple-card)", border_color="#9333ea",
                       badge="AI Engine", icon="ai")

    diag.add_card(1990, 320, 550, 400, "FastEmbed ONNX Engine",
                  subtitle="Local High-Speed Vector Embeddings",
                  items=[
                      "Model: `BAAI/bge-small-en-v1.5` / `AllMiniLML6V2`",
                      "Dimension: 384-dimensional dense vectors",
                      "Local CPU execution via ONNX Runtime (zero cloud costs)",
                      "Latency: 6ms per embedding chunk on ARM64 Ampere",
                      "Directly generates vectors for similarity query against pgvector"
                  ],
                  accent_color="#34d399", border_color="#059669", badge="Local 384d Vectors", icon="ai",
                  code_block="Runtime: ONNX CPU ARM64\nModel: AllMiniLML6V2 (384d)\nLatency: ~6ms\nCloud Cost: $0.00")

    diag.add_card(2570, 320, 540, 400, "LangGraph StateGraph",
                  subtitle="Stateful Multi-Step Agentic RAG",
                  items=[
                      "Stateful AgentState holding history, context & tool calls",
                      "Retrieval Node queries PostgreSQL pgvector for facts",
                      "Reasoning Node synthesizes answer with system prompt",
                      "Tool Node executes external API calls (e.g., booking, search)",
                      "Checkpoint persistence saves conversation threads"
                  ],
                  accent_color="#a855f7", border_color="#7c3aed", badge="Agentic StateGraph", icon="ai",
                  code_block="Graph: StateGraph(AgentState)\nNodes: retrieve -> reason -> tool_exec\nCheckpointer: MemorySaver / Postgres\nFramework: LangGraph.js")

    diag.add_card(1990, 750, 1120, 420, "Cloudflare Workers AI Proxy & LLM Models",
                  subtitle="Zero-Cost High-Performance Multi-Model Inference Tier",
                  items=[
                      "Cloudflare Workers AI acts as global edge proxy with bearer token authorization",
                      "Gemma 4 26B: High-reasoning structured agent for conversational multi-turn dialogues",
                      "Llama 3.3 70B Instruct: Flagship reasoning engine for complex synthesis and extraction",
                      "Generous daily free tier allocation of 10,000 neurons/day powers 24/7 autonomous chatbot",
                      "Fallbacks gracefully between model tiers on rate limits or timeout"
                  ],
                  accent_color="#fbbf24", border_color="#d97706", badge="Workers AI Inference", icon="cloudflare",
                  code_block="Primary Model: @cf/meta/llama-3.3-70b-instruct\nSecondary Model: @cf/google/gemma-4-26b-it\nEdge Proxy: Cloudflare Worker (wrangler)\nSecurity: HMAC Bearer Token & Rate Limiting")

    diag.add_card(1990, 1200, 1120, 190, "Conversational Quality & Accuracy",
                  subtitle="Grounding Hallucination-Free Generation",
                  items=[
                      "RAG grounding prevents factual hallucinations by injecting verified context from pgvector",
                      "Fallback models ensure continuous chat service even during global provider outages",
                      "Context compression fits up to 10 previous conversational turns into prompt window"
                  ],
                  accent_color="#a855f7", border_color="#7c3aed", badge="RAG Verified")

    # Connectors
    diag.add_arrow(430, 580, 430, 610, color="#22c55e", stroke_width=2.5, label="Protocol")
    diag.add_arrow(430, 880, 430, 910, color="#38bdf8", stroke_width=2.5, label="WebSockets")

    diag.add_arrow(770, 1125, 870, 490, color="#fb923c", stroke_width=2.5, marker="arrow-amber", label="DOM Events")
    diag.add_arrow(1360, 490, 1390, 490, color="#38bdf8", stroke_width=2.5, marker="arrow-cyan", label="Proxy")
    diag.add_arrow(1640, 660, 1640, 690, color="#ef4444", stroke_width=2.5, marker="arrow-rose", label="BullMQ")

    diag.add_arrow(1890, 490, 1990, 490, color="#a855f7", stroke_width=2.5, marker="arrow-purple", label="Trigger RAG")
    diag.add_arrow(1890, 865, 1990, 520, color="#10b981", stroke_width=2.5, marker="arrow-emerald", label="Vector Search")
    diag.add_arrow(2540, 720, 2570, 750, color="#fbbf24", stroke_width=2.5, marker="arrow-amber", label="LLM Call")

    return diag.export_svg(), diag.export_excalidraw()


# ==============================================================================
# MAIN RUNNER
# ==============================================================================
def main():
    generators = [
        ("rootaccess_architecture_diagram", build_rootaccess_diagram, 3200, 1720),
        ("k3s_production_architecture_diagram", build_k3s_diagram, 3200, 1720),
        ("tailscale_exit_node_diagram", build_tailscale_diagram, 3200, 1650),
        ("openwa_ai_architecture_diagram", build_openwa_diagram, 3200, 1720),
    ]

    print("=== Blog Architecture Diagram Generator ===")
    print(f"Diagrams Dir: {DIAGRAMS_DIR}")
    print(f"Images Dir:   {IMAGES_DIR}")
    print(f"Virgil Font:  {'Found & Embedded' if VIRGIL_B64 else 'Fallback'}")
    print()

    for name, gen_func, w, h in generators:
        print(f"[*] Generating '{name}' ({w}x{h})...")
        svg_content, exc_json = gen_func()

        # Save Excalidraw JSON
        exc_path = os.path.join(DIAGRAMS_DIR, f"{name}.excalidraw")
        with open(exc_path, "w", encoding="utf-8") as f:
            json.dump(exc_json, f, indent=2)
        print(f"    -> Excalidraw: {exc_path} ({os.path.getsize(exc_path):,} bytes, {len(exc_json['elements'])} elements)")

        # Save SVG
        svg_path = os.path.join(DIAGRAMS_DIR, f"{name}.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"    -> SVG: {svg_path} ({os.path.getsize(svg_path):,} bytes)")

        # Render High-Resolution PNG via rsvg-convert
        png_path = os.path.join(IMAGES_DIR, f"{name}.png")
        cmd = ["rsvg-convert", "-w", str(w), "-h", str(h), svg_path, "-o", png_path]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"    [!] Error running rsvg-convert for {name}: {res.stderr}")
            sys.exit(1)
        else:
            print(f"    -> PNG ({w}x{h}): {png_path} ({os.path.getsize(png_path):,} bytes)")

    print()
    print("=== All Architecture Diagrams Successfully Generated & Rendered! ===")

if __name__ == "__main__":
    main()
