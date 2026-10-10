---
icon: material/vector-triangle
---
# Architecture Diagrams & Excalidraw Vector Assets

This directory contains the official architecture diagrams and Excalidraw vector source files for technical deep-dives on **uttammahata.in**.

## Diagram Directory Index

| # | Diagram Identifier | Formats Available | Description |
|---|---|---|---|
| **1** | [`rootaccess_architecture_diagram`](rootaccess_architecture_diagram.svg) | [`.excalidraw`](rootaccess_architecture_diagram.excalidraw) • [`.svg`](rootaccess_architecture_diagram.svg) • [`.png`](../images/rootaccess_architecture_diagram.png) | Multi-cloud serverless CTF architecture leveraging Cloudflare WAF/Router, AWS Lambda Go 1.24 Gin primary compute (1M calls, 100 GB egress), GCP Cloud Functions fallback, Turso Edge SQLite, Upstash Redis atomic locking, and OCI Ampere ARM WebSocket broadcaster. |
| **2** | [`k3s_production_architecture_diagram`](k3s_production_architecture_diagram.svg) | [`.excalidraw`](k3s_production_architecture_diagram.excalidraw) • [`.svg`](k3s_production_architecture_diagram.svg) • [`.png`](../images/k3s_production_architecture_diagram.png) | Production 4-node HA K3s cluster on VPS interconnected via full-mesh WireGuard VPN (`10.0.0.0/24`) with dual HAProxy ingress gateways and functional isolation between app compute (32GB), in-memory cache (8GB), and database storage (8GB). |
| **3** | [`tailscale_exit_node_diagram`](tailscale_exit_node_diagram.svg) | [`.excalidraw`](tailscale_exit_node_diagram.excalidraw) • [`.svg`](tailscale_exit_node_diagram.svg) • [`.png`](../images/tailscale_exit_node_diagram.png) | Permanent residential exit node architecture repurposing an old Linux laptop into an unattended 24/7 WireGuard gateway via Tailscale tailnet with kernel IP forwarding and iptables NAT masquerading. |
| **4** | [`openwa_ai_architecture_diagram`](openwa_ai_architecture_diagram.svg) | [`.excalidraw`](openwa_ai_architecture_diagram.excalidraw) • [`.svg`](openwa_ai_architecture_diagram.svg) • [`.png`](../images/openwa_ai_architecture_diagram.png) | OpenWA AI WhatsApp Gateway and Cognitive Engine featuring host-native ARM64 Playwright Chromium, NestJS Gateway, Redis 7 session cache, PostgreSQL 16 pgvector, LangGraph StateGraph, FastEmbed ONNX, and Cloudflare Workers AI. |

---

## Regenerating Diagrams

To regenerate all Excalidraw JSON source files, vector SVGs, and rendered high-resolution 3200 × 1720 PNGs:

```bash
python3 scripts/generate_blog_diagrams.py
```

### Technical Specifications
* **Schema**: Valid Excalidraw v2 JSON schema (`https://excalidraw.com`).
* **Font**: Authentic Excalidraw handwriting typography via embedded **Virgil** font.
* **Canvas Resolution**: 3200 × 1720 pixels (High-DPI Retina Ready).
* **Color Palette**: Dark Slate (`#0b0f19`, `#0f172a`), Cyan (`#38bdf8`), Emerald (`#34d399`), Amber (`#fbbf24`), Purple (`#a855f7`), Coral (`#ef4444`).
* **Vector Renderer**: Direct SVG export with self-contained `@font-face` + `rsvg-convert` rasterization.
