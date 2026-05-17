# Fast Access — Design System

A brand & UI system for **Fast Access**, an AI-powered eCommerce fulfillment & logistics company. The Fast Access brand promises **speed, precision, and forward motion** through a tech-driven warehouse network — the visual system should feel closer to a premium SaaS or modern tech company than a traditional logistics provider.

> *"Fast Access is a tech-driven logistics company built to move businesses forward — connecting storage, fulfillment, and delivery through speed, precision, and innovation."*

The signature visual hook is a **moving package** that traverses fulfillment stages (receive → store → pick → pack → ship → deliver) as you scroll. Motion, cinematic transitions, dark/light contrast, and bold orange accents are core to the identity.

---

## Sources used to build this system

- **Figma — "Brand Guideline - Fast Access (1).fig"** (mounted as VFS at `/Brand-Identity-Guideline/Brandbook*`). 82 frames covering intro → logo → colors → typography → patterns → applications → UI examples. The official brand book is the source of truth for colors, type, logo construction, and the reference website mockup (Brandbook 51).
- **Uploads:** `uploads/drive-download-…zip` (2 archives) — extracted PDF brand book mirror of the Figma file. Used for cross-reference only.

If reattaching, the brand book is one continuous file with no codebase.

---

## Manifest — files in this design system

```
README.md                  ← you are here
colors_and_type.css        ← every CSS var (colors, type, spacing, radii, shadow, motion)
SKILL.md                   ← Claude Code skill manifest
assets/                    ← logos, brand stripe, pattern SVGs
preview/                   ← cards rendered in the Design System tab
ui_kits/website/           ← Fast Access marketing-site UI kit (JSX + index.html demo)
notes/                     ← internal extraction notes from the Figma source
```

### Quick links

- **Brand tokens →** [`colors_and_type.css`](colors_and_type.css)
- **Website UI kit →** [`ui_kits/website/index.html`](ui_kits/website/index.html)
- **Logos →** [`assets/logo-mark.svg`](assets/logo-mark.svg), [`assets/logo-lockup.svg`](assets/logo-lockup.svg)

---

## At a glance

| | |
|---|---|
| **Primary face** | Clash Grotesk (display) + Inter / Inter Display (UI + body) |
| **Liberty Blue** | `#0D1232` — primary, trust |
| **Blue Rose** | `#2D2E75` — depth, accent |
| **Orange Soda** | `#F15B41` — signature, energy, motion |
| **Paper** | `#F3F2EC` — warm cream surface used in mockups |
| **Tone** | Confident, technical, premium. Sentence-case headlines. Short lines. No emoji. |
| **Motion** | Smooth, cinematic. Cubic-out easings, 240–900ms. Package moves through the page. |

---

## CONTENT FUNDAMENTALS

Fast Access copy is **confident, plain-spoken, and operationally precise**. It reads like a technology company describing infrastructure, not a courier describing pickups.

### Voice & tone

- **Confident, not boastful.** Promises capability through specifics, not adjectives. ("Connecting storage, fulfillment, and delivery through speed, precision, and innovation" — three named capabilities, not "best-in-class.")
- **Forward-driven.** Verbs of motion: *move, deliver, ship, scale, accelerate, connect.* Avoid passive constructions.
- **Premium-technical.** Mentions of *systems, precision, intelligence, automation, network* — never *parcels, drivers, trucks.*
- **Reassuring under the surface.** "Delivering with care" eyebrow chips appear next to hard claims — the brand pairs muscle with warmth.

### Casing rules

- **Sentence case** for headlines and subheads. *"Fast Access — Your unwavering e-commerce ally"* — not Title Case.
- **Uppercase** ONLY for: button labels (`CONTACT US`, `INQUIRE NOW`, `LEARN MORE`), tracking 6–8%, and small section labels.
- **Title Case** for navigation items (`Home`, `About Us`, `Get Quote`, `E-Commerce`, `Services`).
- **Capitalize the named brand colors** in copy: *Liberty Blue, Blue Rose, Orange Soda.*

### Person & address

- Second person, conversational. *"Your unwavering e-commerce ally"* — `your`, not `our` or `we`.
- **`We` is reserved for capability statements**: *"We store your inventory," "We process your orders," "We ship your packages."* (See the three Our Process cards.) This is the rhythmic pattern across the site.

### Length & structure

- **Headlines max 6 words / 3 lines** at hero scale. Heroes typically stack 3 short lines.
- **Subheads max 2 lines.** Body copy max 3 lines per paragraph.
- **One concrete CTA per section.** Never two equal-weight buttons.
- Numbers and dates in body copy use slashes: `10/07/2025`.

### What to avoid

- **No emoji.** Use the orange-square eyebrow dot or named icon tiles instead.
- **No exclamation marks.** The brand never raises its voice.
- **No logistics clichés.** "Last-mile," "delivered with a smile," "your package, our promise" — all off-brand.
- **No corporate hedges.** "Solutions," "leverage," "best-in-class," "world-class" — cut them.

### Specific examples (lifted from the brand book)

| Use | Example |
|---|---|
| Brand promise | "Fast Access is a tech-driven logistics company built to move businesses forward — connecting storage, fulfillment, and delivery through speed, precision, and innovation." |
| Hero headline | "Fast Access — Your unwavering e-commerce ally" |
| Eyebrow chip | "Delivering with Care" |
| Announcement bar | "Fast Access Raises $80m from secua ventures & Matrix partners" |
| Process card title | "We Store Your Inventory" |
| Process card body | "Protect your cargo inventory with state-of-the-art facilities and personal warehousing solutions." |
| Trust strip lead | "Trusted by leading e-Commerce Brands" |
| Primary CTA | `CONTACT US →` |
| Secondary CTA | `LEARN MORE →` |

---

## VISUAL FOUNDATIONS

### Colors

Three brand-named colors do all the heavy lifting:

| Token | Hex | RGB | CMYK | Role |
|---|---|---|---|---|
| **Liberty Blue** | `#0D1232` | 13, 18, 50 | 96, 90, 46, 62 | Primary text on light; primary surface on dark sections |
| **Blue Rose** | `#2D2E75` | 45, 46, 117 | 100, 99, 22, 9 | The mark color; depth accent |
| **Orange Soda** | `#F15B41` | 241, 91, 65 | 0, 80, 79, 0 | Signature accent — every CTA, every status pip, every chip dot |

Secondary surfaces: **Paper** `#F3F2EC` (warm cream, used as the brandbook's own background) and pure **White** `#FFFFFF`. A neutral ramp (`--color-n-50` → `--color-n-900`) is provided in CSS.

**Rules of use:**
- Light theme is the default surface. Dark sections (Liberty Blue) appear in dedicated bands ("Our Process") for cinematic punctuation, not as a global theme.
- Orange Soda is a *highlight*, not a fill — used on CTA tiles, the eyebrow dot, status pips, hover underlines, and the small `→` arrow square that lives inside every primary button. Never tinted, never gradiented.
- Blue Rose belongs to the logo mark and a handful of brand-pattern fills. It is not a UI color.

### Typography

- **Display & headings — Clash Grotesk** (Medium 500). 110% leading, −2% tracking. Used at H3 and larger.
- **UI, subhead, body — Inter / Inter Display.** Subhead 128% leading, body 140% leading, both −2% tracking.
- **Buttons** are Inter Display 600, uppercase, +6% tracking.
- **Numerals** are tabular where possible (timeline timestamps, KPIs).

Type scale runs 12 / 14 / 16 / 18 / 20 / 24 / 32 / 44 / 56 / 72 / 88 px. The hero typically lives at 72 or 88 px.

### Spacing

4-pt grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128). Section padding is **80–128 px vertical** on desktop. Container max width is **1280 px** with **32 px gutters**. Generous whitespace is part of the premium feel — never crowd hero modules.

### Backgrounds

- **Solid first.** Paper or Liberty Blue. No gradient washes behind hero copy.
- **Brand stripes / parallelograms** (from the mark geometry, `assets/brand-stripe.svg`) appear as **low-contrast** background ornaments on hero and CTA bands — same hue, lifted lightness (~85% opacity over the surface). Never as a centerpiece.
- **Photography is full-bleed within rounded image cards** (`--radius-xl`, 24 px). Portraits are warm, true-color, candid (not corporate stock smiles); product/warehouse shots are clean & spacious with cool-to-neutral grade.
- **No noise, no grain, no glass-blur over photos.** Glassmorphism appears only on floating UI cards laid over photos (see the dispatch timeline card on the hero).

### Animation & motion

Motion is **the brand's identity**, not a decoration.

- **Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`** (cubic-out). Settles confidently. No bounces in the chrome.
- **Scene transitions:** 600–900 ms. Page-to-page passes the moving package through.
- **Microinteractions:** 140–240 ms.
- **Scroll-driven:** the package travels along an SVG path that runs through the page. Sections fade up `(opacity 0 → 1, y 24px → 0)` as they enter the viewport.
- **No spring bounces, no jelly buttons, no spinning loaders.** Use linear progress bars with a 240ms ease.
- Reduced-motion: replace package travel with cross-fades, keep the package static at each section anchor.

### Hover & press states

- **Buttons (primary, navy):** hover → background lifts to a slightly lighter navy `oklch(+5%)`, arrow tile brightens to `--color-orange-300`, 140 ms.
- **Buttons (orange tile):** hover → `--accent-hover` (`#D9462C`), press → `--accent-press` (`#B33620`). Tiles never scale.
- **Links:** orange underline grows from 0 → 100% width on hover, 240 ms.
- **Cards:** hover → translate-y −2px, shadow lifts from `--shadow-sm` to `--shadow-md`.
- **Press:** translate-y +1px, 80 ms in.

### Borders

- **Light surfaces:** `1px solid rgba(13, 18, 50, 0.08)` (`--border-soft`).
- **Dark surfaces:** `1px solid rgba(255, 255, 255, 0.10)`.
- Strong dividers (between sections) use the same colors at 0.16.
- Buttons can have a 1.5 px navy stroke for the outlined variant.

### Shadows & elevation

A flat-by-default system. Elevation lifts subtly.

- `--shadow-xs` — 1 px line for inputs at rest.
- `--shadow-sm` — default card resting state.
- `--shadow-md` — hovered card / floating timeline card.
- `--shadow-lg` — hero image card, modal.
- `--shadow-glow-orange` — reserved for the moving package and active states (live status pip, current-step indicator).

### Corner radii

- **4 px** — arrow tiles inside CTAs, micro chips.
- **8 px** — inputs, small chips.
- **12 px** — default buttons, default cards.
- **16 px** — feature cards.
- **24 px** — hero image cards, modal sheets.
- **Pill** — segmented controls, tag chips.

### Transparency & blur

Blur is **rare** and serves a single purpose: floating UI on top of photography. The dispatch-timeline card on the hero uses `backdrop-filter: blur(20px)` over a white-90% background. **Do not** apply blur to body sections or to the page background.

### Layout rules

- Fixed: the **top header** and the **announcement bar** stick to the top of the page.
- The **package indicator** floats at the right edge of the viewport on desktop (40px right, vertically centered with the active section).
- Hero is asymmetric: copy left, image card right.
- Process cards run as a 3-up grid that becomes a horizontal scroller below 900px.

### Imagery treatment

- **Warm-neutral grade**, true-color, lit naturally. Avoid heavy filters.
- People: candid, mid-action, eye-contact welcome.
- Product/warehouse: clean lines, machinery in focus, depth-of-field allowed.
- **No stock-photo cliches** (handshakes, ladders, lightbulbs).

---

## ICONOGRAPHY

Fast Access uses a **minimal, line-based icon system**. The brand book itself uses small filled-square iconography in feature cards (orange-tile background, white inline icon). For the broader UI we rely on **Lucide** as the canonical icon library — it matches the stroke weight, geometric character, and minimal feel of the brand.

- **Library:** [Lucide](https://lucide.dev) (open-source successor to Feather). 1.75 px stroke, 24 px box, rounded line caps. Loaded via CDN.
- **Substitution flag:** *Lucide is a substitution — the brand book does not ship an icon set.* The brand book's feature cards use bespoke small filled glyphs (a calculator-style "Inventory" icon, a checkmark "Process" icon, a truck "Ship" icon). We approximate these in the website kit with `boxes`, `clipboard-check`, and `truck` from Lucide; flagged for the user to confirm or replace with a custom set.
- **No emoji.** The brand never uses Unicode emoji or character ornaments. The orange-square eyebrow dot replaces decorative bullets.
- **Custom marks:** the **arrow → inside a small orange tile** at the right end of every primary CTA is a brand element, not an icon. It is rendered inline in CSS, not as an icon-font glyph.
- **Logo / brandmark:** The hexagonal arrow (`assets/logo-mark.svg`) is the core brand mark, derived from a moving package silhouette with an internal diamond cutout. The horizontal lockup (`assets/logo-lockup.svg`) is the primary mark. A light version (`assets/logo-lockup-light.svg`) is used on Liberty Blue backgrounds.
- **Brand pattern:** `assets/brand-stripe.svg` — the staggered parallelogram shape derived from the mark; used as a low-contrast hero ornament.

When introducing a new icon: pick the matching Lucide glyph, render it at 20 or 24 px, and color it with `currentColor` so it inherits the surrounding fg token.

---

## Caveats

- **Fonts** are loaded from CDN (Clash Grotesk via Fontshare, Inter via Google Fonts). The brand specifies "Inter Display" specifically — we are substituting Inter as the closest free match. **Ask the user for licensed Inter Display files** if pixel-perfect spec compliance is needed; drop them in `fonts/` and switch the `@font-face` URLs in `colors_and_type.css`.
- **Iconography** is substituted from Lucide as noted above.
- **No production codebase was provided** — the website UI kit is built from the Figma brand book reference page (Brandbook 51) and is presentational, not the real product code.

---

## SKILL

See [`SKILL.md`](SKILL.md) — this design system is also a portable Claude Code skill.
