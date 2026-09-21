# DESIGN.md

Visual world for GhostLedger. Civic forensic gazette, not a SaaS dashboard and not a crypto product.

## Atmosphere

Cool government-printer paper under fluorescent light and laterite dust. A surveyor's field book laid on a photocopied budget page. Quiet, exact, slightly severe. Energy comes from evidence photographs and the paper-versus-ground split, not from gradients.

Visitor modes: the home dashboard Operates (live missing-billions clock, analytics, bounties, tour); the project, report, record, and act pages Operate. Method is Read.

## Color

Strategy: restrained. Neutrals plus one accent. Semantic red and green are status, not brand.

| Token | Light | Dark | Role |
|---|---|---|---|
| canvas | `#EEF1F4` | `#0E141B` | page ground |
| ink | `#101820` | `#E8EDF2` | primary text |
| muted | `#4A5560` | `#9AA4B0` | secondary text |
| line | `#C5CCD4` | `#2A3440` | rules, tables |
| paper | `#F7F8FA` | `#151C24` | panels |
| accent | `#D4A017` | `#D4A017` | surveyor yellow, primary action |
| accent-ink | `#101820` | `#101820` | text on yellow |
| ghost | `#B42318` | `#E25A4A` | missing / ghost status |
| verified | `#1B6B3A` | `#3D9B63` | found on site |
| delayed | `#8A5A10` | `#D4A017` | delayed / incomplete |

No purple. No cream craft palette. No neon.

## Typography

- Body and display: Atkinson Hyperlegible (literacy and low-vision). One family, weight and size do the hierarchy.
- Numerals and hashes: IBM Plex Mono, tabular.
- Body measure: 60-70ch. Display tracking: -0.02em to 0.
- No Fraunces, Inter-as-brand, or kinetic mixed-family headlines.

## Layout

Hairline rules, not cards. Radius 0. Tables for money. Asymmetric split on the home page: claim, then a paper payment certificate against a field photograph, divided by a 6px surveyor-yellow tape. Project page is two columns on desktop: official record | ground evidence, same tape. Mobile stacks official first, then ground, then act.

Spacing scale: 4 / 8 / 12 / 16 / 24 / 40 / 64.

## Components

- Primary button: yellow fill, ink text, no rounding.
- Secondary: ink outline on canvas.
- Status is a word plus a 6px square, never a pastel pill soup.
- Focus: 2px yellow offset ring.
- Selection colour: yellow at 35%.

## Motion

Minimal. 180ms ease on hover/press. The authored moments: the paper/ground split, and the rubber stamp on a filed observation. Honor `prefers-reduced-motion`.

## Do

- Label demo data in the interface, not only in a footer.
- Keep photographs documentary. No people.
- Show source, date, and "how to check" on every figure.

## Do not

- Equal three-up feature cards.
- Glass, mesh gradients, or emoji icons.
- Party colours or the Kenyan flag as decoration.
- Accounts, KYC, or a map tile layer that burns data.
