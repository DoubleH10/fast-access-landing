# Fast Access landing page — what still needs real content

This file lists every placeholder on the live landing page after the PPT
content pass. Anything below blocks a real launch — replace before publishing.

Source: `FAST ACCESS - محتوى موقع إلكتروني.pptx` (27 slides). Translated to
English to match the existing site language.

---

## CRITICAL — real numbers (PPT slides 14, 15)

These are marked **TBD** in the code so they're easy to grep.

### `ByTheNumbers` section (slide 15)
- **Merchants growing with us** → `TBD`
- **Products received daily** → `TBD`
- **Orders delivered safely** → `TBD`
- **Positive customer ratings %** → `TBD`
- Need a fifth metric? PPT also mentions **returns / errors rate** —
  add when ready.

### `Coverage` section (slide 14)
- **Regions across Saudi Arabia** → `TBD` (PPT shows `0`)
- **Countries we deliver to** → `TBD` (PPT shows `0`)
- **Carrier partners** → `TBD` (need exact count)
- `24/7 Operations support` is real, keep.

### `Journey` 3D scene (Three.js stage cards, slides 11 + 24-25)
Stage stats inside the scrolling journey are marked `TBD`:
- **Store**: number of fulfilment centres, total capacity (sq m)
- **Pick**: pick accuracy %, average pick time
- **Pack**: damage rate
- **Ship**: number of carrier integrations, avg label savings
- **Deliver**: on-time rate

The 2-4 hour same-day window is real from the PPT and is hard-coded.

---

## CRITICAL — real customers

### `TrustedBy` (logo row above CloudStores)
Currently shows fake brand-style text logos: spotify / slack / Dropbox /
Webflow / Zoom / Coinbase. These are placeholders inherited from the original
template. **Replace with real Fast Access customer logos.** If launching
before any are live, hide the section.

### `Testimonial` section (slide 16)
The quote is now a generic same-day messaging line attributed to "Olivia
Martin, Head of Operations, Northwind Apparel" — entirely placeholder.
PPT slide 16 explicitly says "(add customer testimonials before VS after)".

**Need:**
1. Real merchant name + role + brand
2. Actual quote (1-3 sentences)
3. Before/after data point ideally ("our shipping costs fell X%", "delivery
   time dropped from Y to Z")
4. Avatar or brand mark
5. Slide 16's "before VS after" format would be richer if we have 2-3 of
   these — could rotate or stack them.

---

## CRITICAL — contact form backend (slide 27)

Footer **Contact** column and CTA buttons (`Inquire Now`, `Get a quote`,
`Get my quote`, `Talk to sales`, `Book a tour`) all link to `#contact` /
`#quote` anchors. **No form is implemented yet.**

PPT slide 27 specifies the form fields:
- First name
- Last name
- Brand name
- Email
- Mobile
- Website / store URL
- Business type (dropdown — needs the categories list)
- Monthly order volume (dropdown — needs the bands)
- Required services (multi-select against the 6 services)
- Additional notes (textarea)

After submit, where does it go? (Email? CRM? WhatsApp webhook?) — needs
decision before launch.

Also:
- `support@faccess.co` in the footer is the assumed email — confirm or
  replace.
- WhatsApp footer link — needs real number.

---

## CONTENT GAPS — not yet on the page

The PPT covers more than the home page. The following exist as slides but
aren't built as routes yet. They'll likely become sub-pages, but we may
want at least entry points on the home page or in nav/footer.

### Pages to build (each is a PPT slide)
| PPT slide | Page                                | Status                  |
|-----------|-------------------------------------|-------------------------|
| 22        | **About us**                        | nav link, page TBD      |
| 23        | **Mission & Vision**                | nav link, page TBD      |
| 13        | **Industries served**               | nav link, **list TBD**  |
| 24-25     | **Solutions detail (each service)** | landing covers, deep page TBD |
| 18, 26    | **FAQ (17 questions)**              | nav link, page TBD      |
| —         | **Blog**                            | nav link, page TBD      |
| 27        | **Contact form**                    | nav link, page TBD      |

### Industries served (slide 13)
PPT says **"(add served sectors)"** — Fashion / Beauty / Electronics /
F&B / Health & Wellness / Home goods / etc. Until we have the real list,
this section can't ship.

### FAQ answers (slide 26, 17 questions)
Questions are written. Answers are not. Examples that especially need a
real answer before launch:
- "How long is delivery in Riyadh / across KSA / across the Gulf?"
- "Do you ship worldwide?"
- "What's the warehouse size?"
- "Do you have refrigerated storage? What temperature?"
- "How is pickup handled and what's the cost?"
- "Do you have the SFDA certificate?"
- "If a carrier damages my products, what's the compensation?"

### About us (slide 22)
Contains **"founded __ years ago"** — needs the actual year.

---

## NICE-TO-HAVE — content polish

### Hero photo
`/assets/hero-bg.jpg` is a generic stock warehouse shot. Swap for a real
Fast Access fulfilment-centre photo when available.

### Mission statement (slide 23)
Currently not on the home page. Could become a short ribbon strip below
About us, or live entirely on the About page.

### "Connect your sales channel" section (slide 12)
PPT says: "Choose your preferred commerce platform and we handle the
rest. Full tech integration with major local and global sales channels."
We have `TrustedBy` doing logos but it could be reframed/extended into an
"Integrates with" strip showing real partner logos: Salla, Zid, Shopify,
WooCommerce, Magento, etc.

### Footer links
- `support@faccess.co` — confirm email
- WhatsApp link — needs real number
- Blog — needs CMS or at least one post
- Privacy / Terms — needs legal copy

---

## SUMMARY of placeholders, by severity

**Blocks launch (must fix):**
- 10 `TBD` numbers across ByTheNumbers, Coverage, Journey stage cards
- 1 fake testimonial
- 1 contact form (no backend)
- 1 industries-served list

**Should fix before serious traffic:**
- Real customer logos in TrustedBy (or hide the row)
- Real hero photo
- FAQ answers
- Year founded
- Sub-pages for About, FAQ, Industries, each Solution

**Cosmetic / can wait:**
- Blog
- Mission/Vision page
- Integration logos
