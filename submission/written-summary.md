# Written summary — GhostLedger

OSF information-access sprint · Transparency & Accountability track  
Safety path: anonymous reporting

GhostLedger is a citizen audit system. It joins three things most public-finance portals keep apart: the official money trail, a GPS-tagged observation from the plot, and the next official step — who to write, which law to cite, what to attach.

The slogan is **Our money. Our future. Our nation.** The claim is simpler: we see what they hide. Corruption here is treated as measurable. Named politicians. Tracked projects. Immutable evidence. Built by Kenyans, for Kenya, then opened to an eight-country African pilot so the same question can travel.

## Track

**Transparency & Accountability**, with a safety path.

Transparency: sourced public money, compilation dates, conservative clocks, recovered-versus-still-missing contrast, a method page that shows how to verify.

Accountability: named officials from published records; citizen reports that can indicate a responsible person; audit tours where residents become project auditors; Access to Information letters and WhatsApp hashes that leave the app and enter a real office.

Safety: no account wall. Reports store status, optional GPS, a short note, and a hash. They do not store a name, a phone number, or a photograph. GPS is optional. Photographs stay on the phone in low-data and default flows. That is the path for someone standing on a politically sensitive site.

## Information sources

Nothing in the national clocks is scraped from a rumour thread. Each money line cites a publisher, a URL, a date, and what the document actually says.

| Country | Clock and named-list sources |
| --- | --- |
| Kenya | Office of the Auditor-General, Controller of Budget, National Treasury / Bajeti Yetu, PPRA, EACC, Bosire Commission, Daily Nation, OCCRP, Central Bank (debt context only), High Court / published rulings |
| Uganda | Office of the Auditor General, Inspectorate of Government (IGG), Access to Information Act 2005 |
| Tanzania | National Audit Office (CAG), PAC, Ministry of Finance, PPRA Tanzania, PCCB, Access to Information Act 2016 |
| Ghana | Ghana Audit Service, CHRAJ, OSP, Right to Information Act 2019 |
| Senegal | Cour des comptes, OFNAC |
| Togo | Cour des comptes, HAPLUCIA |
| Zambia | Auditor-General, Anti-Corruption Commission, Access to Information Act 2013 |
| Malawi | National Audit Office, ACB, Access to Information Act 2017, Baker Tilly Cashgate forensic audit, High Court |

Recovered funds use the same rule, tighter: only cash or assets an agency says it recovered, or a court forfeited. EACC’s KES 3.4 billion recovered (FY 2024/25) is in. Traced and averted sums are not. PCCB’s TZS 14.5 billion recovered is in; a later “saved” figure is not.

Ward-level project rows are **illustrative composites** patterned on published audit problems. They are labelled “demo” in the interface. Contractor names on those rows are demo names. No live IFMIS, MUSE, or payroll dump is in this proof of concept.

The viral KES 1.3 trillion eCitizen claim is not in the Kenya clock. The Auditor-General dismissed it in March 2026. GhostLedger follows that dismissal.

## Trust and accuracy

Trust is a method, not a slogan.

1. **Source on the figure.** Every clock item, recovery, and named person carries publisher, URL, date, and a one-line “what this document says.”
2. **Compilation date in the masthead.** Users can see when the country file was last compiled. When facts change, the date moves.
3. **Legal status is not money.** A charge is not a conviction. A court ruling changes the named-list status. It only changes the clock if recovery or a formal dismissal is published.
4. **Conservatism over virality.** Unresolved commissions, Auditor-General queries, and court records. Disputed USD totals without a clean local-currency amount stay out. “Traced” is not “recovered.”
5. **Demo is labelled.** Ward photographs are documentary stand-ins. National numbers are sourced.
6. **Verify yourself.** Method and Act pages send people to the underlying PDF, the office, and the statute. The product is a bridge, not a substitute for the Gazette.

Last-updated is visible on every country. Low-data mode drops photographs and map tiles. Large-text mode and Atkinson Hyperlegible cover mixed literacy and low vision. Language follows the country (English, Kiswahili, French now; Arabic and Portuguese are the next OSF packs).

Clear next steps are part of the information, not an afterthought: Auditor-General / CAG / IGG / CHRAJ / OFNAC / ACC / ACB, the local representative, and a copyable ATI letter with the statutory deadline for that country.

## How we used AI tools

Grok (xAI) was the pair-programmer for this sprint: product structure, interface, country packs, and tests. That is disclosed, not hidden.

AI is **not** the source of the numbers. Audit totals, recoveries, and named persons were compiled by hand from the publishers above. The model was instructed not to invent officials, contractors, or paragraph citations as if they came from a live financial system.

Inside the app, an optional “explain this project” button can call the xAI API. It is:

- user-initiated (never on page load)
- cached per project and language
- a plain-language restatement of fields already on the page
- disabled if no server key is present

We did not use a language model to inflate recoveries, to decide who is guilty, or to write letters that pretend to be from a court. The hash on a citizen report is cryptographic, not generative.

## Approach to the operating constraints

| Constraint | What shipped |
| --- | --- |
| Trust and verification | Sources, dates, method page, conservative clock |
| Low bandwidth | Text-first pages, low-data (photos off, map tiles off), no account wall |
| Accessibility | Atkinson Hyperlegible, large-text, skip-to-content, 44px taps, mobile 390px |
| Privacy | Anonymous reports; no name, phone, or photo on the server |
| Multilingual | EN / SW / FR; country picker sets the default |
| Local relevance | Currency, offices, ATI law, region word, named list per country |
| Clear next steps | Act page, copyable letter, WhatsApp hash |

## Potential impact

A person in a ward can pick their country on a mid-range Android, see whether the money is still missing, stand on the GPS, stamp an observation that cannot quietly vanish, and leave with a letter. Journalists get a sourced clock instead of a screenshot of a viral total. Oversight offices get a public, dated trail of ground visits.

The unit of work — sourced row + GPS observation + statutory step — is what scales. The eight-country pilot is that unit, eight times, not a dashboard of the same Treasury tables.

Next: live ingest from published audit APIs where they exist; USSD/SMS for feature phones; Arabic and Portuguese packs; replacing demo ward rows with civil-society field partners country by country.

GhostLedger does not accuse. It puts paper and ground on the same page, and it tells you what to do on Monday morning.
