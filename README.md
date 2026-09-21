# GhostLedger

**Our money. Our future. Our nation.**

A citizen audit of ghost public works. Paper, ground, next step.

GhostLedger is a civic web app for the OSF information-access sprint, **Transparency & Accountability** track, with a safety path for anonymous reporting.

A ghost project is money that left the budget for a borehole, classroom, clinic, or road that cannot be found on site — or that exists only as a slab. Budget portals already publish PDFs. This product asks a different question: **is the thing the paper paid for actually there?**

Live clock of sourced, unresolved public money. Recovered funds listed only when an agency or court says they came back. Zoomable map of project GPS. Anonymous site reports. Named officials from published records. Citizen audit tours. Copyable access-to-information letters. English, Kiswahili, and French. Eight African countries in this pilot.

> We see what they hide.

## Pilot

| Region | Countries | Languages |
| --- | --- | --- |
| East | Kenya, Uganda, Tanzania | English, Kiswahili |
| West | Ghana, Senegal, Togo | English, French |
| Central | Zambia, Malawi | English |

Switching country swaps the clock, currency, offices, law, named list, projects, and default language. Same menu.

## What you can do

1. **Watch the clock.** Documented unaccounted money, still counting. Recovered funds sit under it.
2. **Zoom the map.** Touch a marker: allocated, paid, ground status.
3. **Open a project.** Official money trail on one side. Ground evidence on the other.
4. **File a report.** Status, optional GPS, short note. No account. No name, phone, or photo on the server.
5. **Read who was named.** Public scandals and missing-funds cases. A charge is not a conviction.
6. **Walk an audit tour.** Citizens become project auditors. Visit the site. Report what you find, or expose what was paid for and never built.
7. **Act.** Who to write, which law to cite, a letter you can copy, a WhatsApp share of the evidence hash.

## Trust rules

- Every figure names a **source** and a **compilation date**.
- Demo ward rows are **labelled** in the interface.
- Viral claims an auditor has dismissed stay **out of the clock**.
- Traced, frozen, or averted money is **not** recovered.
- Court rulings change legal status; they only change the money if recovery or a formal dismissal is published.
- Conservative compilation of unresolved commissions, Auditor-General queries, and court records. **Not live IFMIS.**

## Run it

Node 22.

```bash
npm install
npm run dev
```

Opens on [http://127.0.0.1:8080](http://127.0.0.1:8080). Postgres is optional. Without `DATABASE_URL` the app uses PGLite (in-browser/server SQLite-shaped Postgres) so the proof of concept runs on a laptop.

```bash
npm run build
npm run typecheck
```

Optional: set `XAI_API_KEY` on the server if you want the plain-language “explain this project” button. It is user-initiated, cached, and never invents audit totals.

## Stack

TanStack Start, React 19, Tailwind v4, Leaflet, Zustand, Zod, Postgres / PGLite.

## Submission pack

| File | What |
| --- | --- |
| [SUBMISSION.md](./SUBMISSION.md) | Written summary: track, sources, trust, AI |
| [submission/pitch.pdf](./submission/pitch.pdf) | Pitch deck |
| [submission/demo.mp4](./submission/demo.mp4) | Short product demo |
| [PRODUCT.md](./PRODUCT.md) | Product spec |
| [DESIGN.md](./DESIGN.md) | Visual system |

## License

MIT. Linked official documents remain the property of their publishers.
