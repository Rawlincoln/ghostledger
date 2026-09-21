# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: TanStack Start, React 19, Tailwind v4, Postgres/PGLite. Chosen to match the App Builder runtime so the proof of concept is runnable in-browser, including offline-leaning pages and a shared civic ledger.

## Users

Primary: Residents of the eight-country African pilot — Kenya, Uganda, Tanzania (East); Ghana, Senegal, Togo (West); Zambia, Malawi (Central) — community monitors, journalists, and civic groups who suspect a budgeted public work is missing, stalled, or completed, and need a way to check the paper record against the ground without creating an account.

Secondary: Councillors, county, district, or LGA officers, and auditors who need a public, dated trail of citizen observations.

## Product Purpose

GhostLedger makes ghost public works visible. A ghost project is money that left the budget for a borehole, classroom, clinic, or road that cannot be found on site, or that exists only as a shell. The product joins three things most portals keep apart: the official money trail, a GPS-tagged citizen observation, and a clear next step (who to write to, which law to cite, what to attach).

Success: a person in a ward can pick their country, open one project, see what was allocated, see whether anyone has been to the site, and leave with a concrete action, in English, Kiswahili, or French, on a basic phone browser.

## Positioning

Other budget portals publish PDFs. GhostLedger asks a different question: is the thing the paper paid for actually there? The mechanism is a public, anonymous, hash-stamped site observation tied to a sourced budget row, not a new dashboard of the same Treasury tables.

## Operating Context

Used in matatus, daladalas, trotros, market stalls, and community halls, often on a mid-range Android with patchy data. Users may be reporting near a politically sensitive site. They already use WhatsApp. They do not have time for accounts, KYC, or 40MB GIS maps.

Pilot: East (Kenya, Uganda, Tanzania), West (Ghana, Senegal, Togo), Central (Zambia, Malawi).

Kenya sources: Auditor-General, Controller of Budget, Treasury Bajeti Yetu, PPRA, EACC, Access to Information Act 2016.

Uganda sources: Office of the Auditor General, IGG, Access to Information Act 2005.

Tanzania sources: National Audit Office (CAG), PAC, Ministry of Finance, PPRA Tanzania, PCCB, Access to Information Act 2016, CHRAGG for appeals.

Ghana sources: Ghana Audit Service, CHRAJ, Right to Information Act 2019.

Senegal sources: Cour des comptes, OFNAC.

Togo sources: Cour des comptes, HAPLUCIA.

Zambia sources: Auditor-General, ACC, Access to Information Act 2013.

Malawi sources: National Audit Office, ACB, Access to Information Act 2017, Baker Tilly Cashgate forensic audit, High Court.

## Capabilities and Constraints

- Country switcher: eight-country pilot, grouped East / West / Central. Switching sets that country's default language (English, Kiswahili, or French) and swaps the record, named list, projects, offices, currency, and next steps. Same menu.
- Operating constraints (OSF): trust and verification (sources + compilation date), low bandwidth (low-data mode), accessibility (Atkinson, large text, skip link), privacy (anonymous reports), multilingual (EN/SW/FR now; Arabic, Portuguese next), local relevance (country-scoped law and offices), clear next steps (Act page).
- About page: manifesto — vampire projects, stolen public funds, citizen audit, named politicians, tracked projects, immutable evidence. Slogan: Our Money. Our Future. Our Nation. This is the first page.
- Browse illustrative project records by county / region / district / province, sector, and status.
- Dashboard (`/`): an alarming live clock of documented unaccounted public money is the first thing on the landing page; recovered/forfeited funds sit under it (published recoveries only); a zoomable map shows GPS project sites with allocated, paid, and ground status.
- Open a project: money trail, sources, last update, citizen observations, responsible offices, next steps.
- File an anonymous on-site report (GPS + status + short note). Optionally indicate who is responsible; that name ranks on the named list. No account. No name, phone, or photo stored on the server.
- Named officials (no account): public scandals and missing-funds cases with who was named as responsible, plus a people leaderboard. Amount and since-when are shown. The list grows when a report names a person. A charge is not a conviction.
- Claim a demo bounty by filing a GPS-tagged report.
- Post a bounty (no account): lock demo credit in escrow, review proof, release funds.
- Plan an audit tour (no account): citizens become project auditors — visit the site, report what they find, or expose what was paid for and never built. Log the ground visits.
- No sign-in. The ledger, reports, bounties, and audit tours stay open.
- Copy an Access to Information letter and send the observation hash on WhatsApp.
- Plain-language explanation and next-step draft via xAI, user-initiated, English, Kiswahili, or French.
- Low-data mode (text first, no photographs). Large-text mode.
- Demo figures on ward rows are labelled. National clock items are sourced. People appear with a published legal status or as a citizen indication on a filed report. Viral claims an auditor has dismissed, and disputed USD figures without a reliable local-currency amount, stay out of the clock.

Undecided: live ingest from Bajeti Yetu / OAG / NAOT APIs; USSD/SMS channel; Arabic and Portuguese packs.

## Brand Commitments

Name: GhostLedger. Existing promise from the prior build: photograph, GPS, evidence that cannot quietly disappear. This rework keeps that promise and adds the official money trail and an action path. Voice: direct civic English, Kiswahili, and French. No NGO haze, no crypto jargon, no party colours.

## Evidence on Hand

Documentary photographs of empty or unfinished sites (generated stand-ins for field photos). Real institutional URLs for audit, procurement, and anti-corruption offices in the eight pilot countries. No live payroll or IFMIS/MUSE dump is in this proof of concept. Do not fabricate named officials, real contractors, or specific audit paragraph citations as if they were pulled from a live system.

## Product Principles

1. Paper and ground must sit on the same page.
2. Every shilling shown names a source and a date.
3. Anonymity is the default because reporting can be unsafe.
4. Finding out is not enough; the next official step is part of the product.
5. If it cannot load on a slow connection, it is not done.
6. Laws, offices, currency, and language follow the country the user picks.

## Accessibility & Inclusion

Designed for mixed literacy, small screens, and low vision: Atkinson Hyperlegible, large tap targets, a large-text switch, English, Kiswahili, and French, a low-data mode, no account wall. Portuguese and Arabic are planned for other OSF regions; the information architecture is language-agnostic.
