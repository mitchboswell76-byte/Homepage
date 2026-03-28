# Atlas of Ideas

Atlas of Ideas is a cinematic single-scene homepage built as an interactive constellation: editorial text rests in the left negative space while a hand-placed right-side star map serves as the primary interface, with subtle motion, selective labels, and quiet detail overlays for major anchors.

## Version

- **Current version:** 1.0.1
- **Last update:** March 28, 2026 — fixed a blank-screen runtime risk by removing critical Framer Motion dependencies from scene rendering, ensuring the left text block, constellation nodes/labels/SVG links, and click-to-open detail panel always render statically first, with safe optional motion handled via CSS.

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Design intent

The design aims to feel closer to an art-directed concept frame than a product UI: restrained palette, asymmetric composition, calm atmospheric motion, and interaction that quietly reveals relationships between ideas rather than overwhelming the scene.
