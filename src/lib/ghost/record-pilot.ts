import type { CountryId } from "./country";
import type { MoneyItem, NamedPerson, RecordSource } from "./record";

const UG_OAG: RecordSource = {
  name: "Office of the Auditor General (Uganda)",
  url: "https://www.oag.go.ug/",
  published: "various",
  what: "Auditor General reports to Parliament.",
};
const MONITOR: RecordSource = {
  name: "Daily Monitor",
  url: "https://www.monitor.co.ug/",
  published: "various",
  what: "Published reporting on CHOGM, OPM, and iron sheets. A newspaper is not a verdict.",
};
const AP_UG: RecordSource = {
  name: "Associated Press",
  url: "https://apnews.com/article/uganda-corruption-scandal-ministers-charged-16cd8b6d0f433381fdd34b6dadfa30d5",
  published: "2023-04-17",
  what: "Mary Goretti Kitutu and Amos Lugoloobi charged over diverted Karamoja iron sheets. A charge is not a conviction.",
};
const GH_AUDIT: RecordSource = {
  name: "Ghana Audit Service",
  url: "https://ghaudit.org/",
  published: "various",
  what: "Auditor-General reports on MDAs, boards, and statutory bodies.",
};
const GRAPHIC: RecordSource = {
  name: "Graphic Online",
  url: "https://www.graphic.com.gh/features/opinion/10-shocking-revelations-from-the-national-cathedral-audit-report.html",
  published: "2025-07-19",
  what: "Deloitte audit: about $97 million (GH¢339 million) spent on the National Cathedral with no significant structure.",
};
const PRESIDENCY_GH: RecordSource = {
  name: "The Presidency, Republic of Ghana",
  url: "https://presidency.gov.gh/consultancy-fees-contract-overlaps-unaccounted-funds-plague-national-cathedral-project-audit-reveals/",
  published: "2025-07-18",
  what: "Government statement on the Deloitte audit of the National Cathedral.",
};
const OCCRP_SN: RecordSource = {
  name: "OCCRP",
  url: "https://www.occrp.org/en/investigation/senegals-offshore-oil-reserves-a-pricey-pawn-in-covert-deal",
  published: "2019-07-19",
  what: "Petro-Tim / Timis oil licences. Ousmane Sonko told OFNAC the tax prejudice was about XOF 90 billion. An allegation is not a verdict.",
};
const OFNAC: RecordSource = {
  name: "OFNAC",
  url: "https://www.ofnac.sn/",
  published: "2016",
  what: "Report 07/2016 on the Petro-Tim file.",
};
const CDC_SN: RecordSource = {
  name: "Cour des comptes du Sénégal",
  url: "https://www.coursdescomptes.sn/",
  published: "2025-02-12",
  what: "Audit of public finances 2019–March 2024. Anomalies in debt and deficit figures are not the same as a theft total.",
};
const CDC_TG: RecordSource = {
  name: "Cour des comptes du Togo",
  url: "https://courdescomptes.tg/",
  published: "2023",
  what: "COVID-19 response fund irregularities. The fund size is not a finding that the cash vanished.",
};
const HAPLUCIA: RecordSource = {
  name: "HAPLUCIA",
  url: "https://haplucia.tg/",
  published: "2020",
  what: "INSEED/HAPLUCIA survey: petty corruption estimated at about XOF 10 billion a year. An estimate is not a clocked stock.",
};
const AGO_ZM: RecordSource = {
  name: "Office of the Auditor General (Zambia)",
  url: "https://www.ago.gov.zm/",
  published: "various",
  what: "Auditor-General reports, including the 2021 COVID special report.",
};
const AJ_ZM: RecordSource = {
  name: "Al Jazeera",
  url: "https://www.aljazeera.com/opinions/2018/6/23/corruption-in-zambia-42-fire-trucks-for-42m",
  published: "2018-06-23",
  what: "Public controversy over 42 fire trucks reported at USD 42 million. ACC reopened inquiries. A controversy is not a conviction.",
};
const ACC_ZM: RecordSource = {
  name: "Anti-Corruption Commission (Zambia)",
  url: "https://www.acc.gov.zm/",
  published: "2017-12-01",
  what: "ACC said it reopened inquiries into whether the 42 fire trucks cost USD 42 million.",
};
const BAKER: RecordSource = {
  name: "Baker Tilly forensic audit (Cashgate)",
  url: "https://en.wikipedia.org/wiki/Capital_Hill_Cashgate_Scandal",
  published: "2014-02",
  what: "MK 13,671,396,751 misappropriated in six months of 2013; up to MK 6,096,490,705 classified as theft of government funds.",
};
const MW_COURT: RecordSource = {
  name: "High Court of Malawi — R v Lutepo",
  url: "https://sheriahub.com/cases/mw/caselaw/r-v-lutepo-criminal-case-2-of-2014-2015-mwhc-491-04-september-2015.pdf",
  published: "2015-09-04",
  what: "Oswald Lutepo pleaded guilty. Court record: MK 4,206,337,562 in fraudulent receipts. Sentenced to 11 years.",
};

export const PILOT_COMPILED = "2026-09-21";

export const UG_MONEY: MoneyItem[] = [
  {
    id: "opm-prdp",
    title: "OPM — Peace, Recovery and Development Plan",
    titleSw: "OPM — Mpango wa Amani, Marejesho na Maendeleo",
    period: "2011–2012",
    amountKes: 38_300_000_000,
    inClock: true,
    kind: "unaccounted",
    office: "Office of the Prime Minister",
    officeSw: "Ofisi ya Waziri Mkuu",
    summary:
      "A special audit put about UGX 38.3 billion of PRDP money as diverted without proper authorisation. Donor capitals also reported about USD 12.7 million embezzled from OPM. Recovery of the full audit figure is not recorded. A later conviction of a principal accountant is not the same as full recovery.",
    summarySw:
      "Ukaguzi maalum uliweka takriban USh 38.3 bilioni za PRDP kama zilizogeuzwa bila idhini. Marejesho kamili hayajaandikwa.",
    sources: [UG_OAG, MONITOR],
  },
  {
    id: "chogm-2007",
    title: "CHOGM 2007 — extra spend",
    titleSw: "CHOGM 2007 — matumizi ya ziada",
    period: "2007",
    amountKes: 100_000_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Office of the President / Cabinet subcommittee",
    officeSw: "Ofisi ya Rais / kamati ndogo ya Baraza",
    summary:
      "Auditor General: Parliament allocated UGX 270 billion; about UGX 370 billion was spent. PAC grilling later cited UGX 500 billion. This clock uses the UGX 100 billion extra against the allocation. The 500 billion figure is not added on top. Gilbert Bukenya was later acquitted on a related vehicle file.",
    summarySw:
      "Mkaguzi Mkuu: Bunge liligawa USh 270B; takriban USh 370B zilitumika. Saa hii inahesabu USh 100B za ziada. KSh 500B za PAC hazijaongezwa juu.",
    courtNote: "An acquittal is recorded. Extra spend stays in the clock until recovery is published.",
    courtNoteSw: "Kuachiliwa kumeandikwa. Matumizi ya ziada yanabaki kwenye saa.",
    sources: [UG_OAG, MONITOR],
  },
  {
    id: "iron-sheets",
    title: "Karamoja iron sheets",
    titleSw: "Mabati ya Karamoja",
    period: "2022–2023",
    amountKes: 2_430_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "Office of the Prime Minister / Karamoja Affairs",
    officeSw: "Ofisi ya Waziri Mkuu / Karamoja",
    summary:
      "Auditor General: UGX 2.43 billion for 35,164 iron sheets in 2022/23. Ministers were charged over diversion of sheets meant for Karamoja. A charge is not a conviction. Wider press totals (including goats) are not added on top of this AG procurement figure.",
    summarySw:
      "Mkaguzi Mkuu: USh 2.43B kwa mabati 35,164. Mawaziri walishtakiwa. Shitaka si hatia.",
    sources: [UG_OAG, AP_UG, MONITOR],
  },
  {
    id: "ug-payroll",
    title: "Ghost names on the payroll",
    titleSw: "Majina mzimu kwenye orodha ya mishahara",
    period: "2022–2023",
    amountKes: 23_620_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Ministry of Public Service",
    officeSw: "Wizara ya Utumishi",
    summary:
      "Daily Monitor, citing the Auditor General: 3,824 dead or retired people remained on the payroll and were paid about UGX 23.62 billion. This is an audit query, not a criminal verdict.",
    summarySw:
      "Daily Monitor, ikinukuu Mkaguzi Mkuu: watu 3,824 waliokufa au kustaafu walibaki kwenye orodha na walilipwa takriban USh 23.62B. Swali la ukaguzi, si hukumu.",
    sources: [UG_OAG, MONITOR],
  },
];

export const UG_NAMED: NamedPerson[] = [
  {
    name: "Geoffrey Kazinda",
    role: "Former Principal Accountant, Office of the Prime Minister",
    roleSw: "Aliyekuwa Mhasibu Mkuu, Ofisi ya Waziri Mkuu",
    matter: "OPM PRDP / illicit wealth",
    matterSw: "OPM PRDP / mali isiyo halali",
    status: "convicted",
    amountKes: 38_300_000_000,
    since: "2012",
    sources: [
      {
        name: "Daily Monitor",
        url: "https://www.monitor.co.ug/uganda/news/national/opm-fraud-kazinda-to-spend-five-years-in-prison-1545982",
        published: "2013-06-26",
        what: "Convicted on 29 counts including forgery and abuse of office. Later illicit-wealth file: more than UGX 4.6 billion. The amount here is the OPM PRDP public-money figure, not a personal theft total.",
      },
      UG_OAG,
    ],
  },
  {
    name: "Mary Goretti Kitutu",
    role: "Former Minister for Karamoja Affairs",
    roleSw: "Aliyekuwa Waziri wa Karamoja",
    matter: "Karamoja iron sheets",
    matterSw: "Mabati ya Karamoja",
    status: "named_suspect",
    amountKes: 2_430_000_000,
    since: "2023",
    sources: [AP_UG, UG_OAG],
  },
  {
    name: "Gilbert Bukenya",
    role: "Former Vice-President",
    roleSw: "Aliyekuwa Makamu wa Rais",
    matter: "CHOGM 2007 vehicle procurement",
    matterSw: "Ununuzi wa magari ya CHOGM 2007",
    status: "acquitted",
    amountKes: 19_000_000_000,
    since: "2007",
    sources: [
      {
        name: "Daily Monitor",
        url: "https://www.monitor.co.ug/",
        published: "2011",
        what: "Accused of influence-peddling in the CHOGM car deal; later acquitted. A charge is not a conviction.",
      },
    ],
  },
];

export const GH_MONEY: MoneyItem[] = [
  {
    id: "national-cathedral",
    title: "National Cathedral — money spent, no cathedral",
    titleSw: "National Cathedral — money spent, no cathedral",
    period: "2018–2023",
    amountKes: 339_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "Office of the President / National Cathedral Secretariat",
    officeSw: "Office of the President / National Cathedral Secretariat",
    summary:
      "Deloitte audit, reported by Graphic Online and the Presidency in July 2025: about GH¢339 million (USD 97 million) spent, with no significant structure on site. Payments before contracts, unexplained variances, and unapproved extras. The GH¢339 million is money paid. It is not a finding of theft against a named person.",
    summarySw:
      "Deloitte audit, July 2025: about GH¢339 million spent, no significant structure. Money paid, not a conviction.",
    sources: [GRAPHIC, PRESIDENCY_GH],
  },
  {
    id: "gyeeda",
    title: "GYEEDA service-provider contracts",
    titleSw: "GYEEDA service-provider contracts",
    period: "2011–2013",
    amountKes: 429_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Ministry of Youth and Sports / GYEEDA",
    officeSw: "Ministry of Youth and Sports / GYEEDA",
    summary:
      "Auditor-General / PAC: contracts with 16 service providers valued at GH¢429 million without enough evidence of capacity. This is an audit query, not a clocked theft total. Later court files against individuals used smaller amounts.",
    summarySw:
      "Auditor-General / PAC: GH¢429 million in contracts without enough evidence of capacity. Audit query, not a theft verdict.",
    sources: [
      GH_AUDIT,
      {
        name: "GhanaWeb (PAC)",
        url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/PAC-probes-GHc-429m-GYEEDA-scandal-423909",
        published: "2016-03-16",
        what: "PAC probing GH¢429 million GYEEDA contracts cited by the Auditor-General.",
      },
    ],
  },
  {
    id: "ssnit-locked",
    title: "SSNIT — cash locked in non-performing investments",
    titleSw: "SSNIT — cash locked in non-performing investments",
    period: "2020",
    amountKes: 442_730_877,
    inClock: false,
    kind: "audit_query",
    office: "Social Security and National Insurance Trust",
    officeSw: "Social Security and National Insurance Trust",
    summary:
      "Auditor-General on public boards for the year ended 31 Dec 2020: GH¢442.73 million of SSNIT cash locked in non-performing investments, inside a wider cash-irregularity figure. Locked-up investment is not the same as stolen cash. Kept out of the clock.",
    summarySw:
      "Auditor-General 2020: GH¢442.73 million locked in non-performing SSNIT investments. Not clocked as stolen cash.",
    sources: [GH_AUDIT],
  },
];

export const GH_NAMED: NamedPerson[] = [];

export const SN_MONEY: MoneyItem[] = [
  {
    id: "petrotim",
    title: "Petro-Tim oil licences — alleged tax prejudice",
    titleSw: "Licences Petro-Tim — préjudice fiscal allégué",
    period: "2012–2017",
    amountKes: 90_000_000_000,
    inClock: false,
    kind: "disputed",
    office: "PETROSEN / Ministry of Petroleum",
    officeSw: "PETROSEN / Ministère du Pétrole",
    summary:
      "OCCRP and OFNAC file 07/2016: Petro-Tim / Timis licences on Saint-Louis and Cayar blocks. Ousmane Sonko told OFNAC the corporate-tax prejudice was about XOF 90 billion. GhostLedger does not clock disputed money. Naming in an OFNAC file is not a conviction.",
    summarySw:
      "OCCRP et OFNAC 07/2016 : licences Petro-Tim. Préjudice fiscal allégué d'environ 90 milliards F CFA. Non inscrit à l'horloge. Une nomination n'est pas une condamnation.",
    sources: [OCCRP_SN, OFNAC],
  },
  {
    id: "petrosen-loan-gap",
    title: "PETROSEN — untraced loan gap",
    titleSw: "PETROSEN — écart de prêt non retracé",
    period: "2021–2022",
    amountKes: 117_240_000_000,
    inClock: false,
    kind: "audit_query",
    office: "PETROSEN / Ministry of Finance",
    officeSw: "PETROSEN / Ministère des Finances",
    summary:
      "Cour des comptes, cited in 2024 reporting: about XOF 117.24 billion gap between the state loan to PETROSEN (XOF 155.52 billion) and the amount reported in 2022 (XOF 20.74 billion). Traceability failed. An untraced gap is not a finding of theft. Kept out of the clock.",
    summarySw:
      "Cour des comptes : écart d'environ 117,24 milliards F CFA entre le prêt de l'État à PETROSEN et le montant reporté. Écart non retracé, pas un vol jugé. Hors horloge.",
    sources: [CDC_SN],
  },
  {
    id: "sn-debt-audit",
    title: "Public-finance audit 2019–2024 — debt and deficit restated",
    titleSw: "Audit des finances 2019–2024 — dette et déficit retraités",
    period: "2019–2024",
    amountKes: 0,
    inClock: false,
    kind: "dismissed",
    office: "Ministry of Finance",
    officeSw: "Ministère des Finances",
    summary:
      "Cour des comptes (12 Feb 2025): central-government debt about XOF 18,558.91 billion at 31 Dec 2023, and a restated 2023 deficit of 12.3% against 4.9% announced. Debt restatement is not missing cash. It stays out of this clock.",
    summarySw:
      "Cour des comptes (12 fév. 2025) : dette et déficit retraités. Un retraitement de dette n'est pas de l'argent disparu. Hors horloge.",
    sources: [CDC_SN],
  },
];

export const SN_NAMED: NamedPerson[] = [
  {
    name: "Aliou Sall",
    role: "Named in OFNAC / OCCRP reporting (brother of a former president)",
    roleSw: "Cité dans OFNAC / OCCRP (frère d'un ancien président)",
    matter: "Petro-Tim",
    matterSw: "Petro-Tim",
    status: "named_suspect",
    amountKes: 90_000_000_000,
    since: "2016",
    sources: [OCCRP_SN, OFNAC],
  },
];

export const TG_MONEY: MoneyItem[] = [
  {
    id: "tg-covid-fund",
    title: "COVID-19 response fund — irregularities, not a loss total",
    titleSw: "Fonds COVID-19 — irrégularités, pas un total de perte",
    period: "2020–2023",
    amountKes: 400_000_000_000,
    inClock: false,
    kind: "excluded",
    office: "Ministry of Finance / FRSC",
    officeSw: "Ministère des Finances / FRSC",
    summary:
      "The 2020 revised budget put about XOF 400 billion in the COVID response fund (health, resilience, recovery). Cour des comptes later flagged irregularities in how ministries managed COVID money. The 400 billion is the fund size, not a finding that the cash vanished. GhostLedger does not clock a budget envelope as missing.",
    summarySw:
      "Environ 400 milliards F CFA au fonds COVID. La Cour des comptes a signalé des irrégularités. L'enveloppe n'est pas un vol. Hors horloge.",
    sources: [CDC_TG],
  },
  {
    id: "tg-petty-estimate",
    title: "HAPLUCIA petty-corruption estimate",
    titleSw: "Estimation HAPLUCIA de la petite corruption",
    period: "2020",
    amountKes: 10_000_000_000,
    inClock: false,
    kind: "excluded",
    office: "HAPLUCIA",
    officeSw: "HAPLUCIA",
    summary:
      "HAPLUCIA / INSEED survey: petty corruption estimated at about XOF 10 billion a year. An estimate from a perception survey is not a sourced, unresolved stock. Kept out of the clock.",
    summarySw:
      "Enquête HAPLUCIA / INSEED : environ 10 milliards F CFA par an. Une estimation n'est pas un stock sourcé. Hors horloge.",
    sources: [HAPLUCIA],
  },
];

export const TG_NAMED: NamedPerson[] = [];

export const ZM_MONEY: MoneyItem[] = [
  {
    id: "fire-trucks",
    title: "42 fire trucks — reported USD 42 million",
    titleSw: "42 fire trucks — reported USD 42 million",
    period: "2016–2018",
    amountKes: 400_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Ministry of Local Government",
    officeSw: "Ministry of Local Government",
    summary:
      "Public reporting and ACC statements put 42 fire trucks at about USD 42 million (this clock uses ZMW 400 million as a 2017-order local figure). ACC said it reopened inquiries into whether the delivered trucks matched the contract. A reopened inquiry is not a conviction. The amount is the reported contract, not a finding of theft.",
    summarySw:
      "42 fire trucks reported at about USD 42 million. ACC reopened inquiries. An inquiry is not a conviction.",
    sources: [AJ_ZM, ACC_ZM, AGO_ZM],
  },
  {
    id: "zm-covid-masks",
    title: "DMMU — face masks without competition",
    titleSw: "DMMU — face masks without competition",
    period: "2020–2021",
    amountKes: 50_456_850,
    inClock: true,
    kind: "audit_query",
    office: "Disaster Management and Mitigation Unit",
    officeSw: "Disaster Management and Mitigation Unit",
    summary:
      "Auditor-General COVID special report: DMMU engaged suppliers of reusable face masks costing ZMW 50,456,850 without competition. This is an audit query on procurement, not a finding that the masks were never delivered.",
    summarySw:
      "Auditor-General COVID report: ZMW 50,456,850 of reusable masks without competition. Audit query, not a theft verdict.",
    sources: [
      {
        name: "Auditor-General — COVID special report 2021",
        url: "https://www.ago.gov.zm/wp-content/uploads/2025/03/Special-Report-COVID-REPORT-2021.pdf",
        published: "2021",
        what: "DMMU reusable face masks K50,456,850 without competition.",
      },
    ],
  },
];

export const ZM_NAMED: NamedPerson[] = [];

export const MW_MONEY: MoneyItem[] = [
  {
    id: "cashgate",
    title: "Cashgate — Baker Tilly six-month window",
    titleSw: "Cashgate — Baker Tilly six-month window",
    period: "Apr–Sep 2013",
    amountKes: 13_671_396_751,
    inClock: true,
    kind: "scandal_paid",
    office: "Accountant General / several votes",
    officeSw: "Accountant General / several votes",
    summary:
      "Baker Tilly forensic audit: MK 13,671,396,751 misappropriated in six months of 2013 (including MK 6.09 billion classified as theft, undocumented payments, and inflated procurement). A wider MK 24 billion 'at risk' figure is not added on top. Recovery remains unresolved.",
    summarySw:
      "Baker Tilly: MK 13.67 billion misappropriated in six months of 2013. Wider MK 24 billion 'at risk' is not added. Recovery unresolved.",
    sources: [BAKER, MW_COURT],
  },
];

export const MW_NAMED: NamedPerson[] = [
  {
    name: "Oswald Lutepo",
    role: "Businessman; former People's Party official",
    roleSw: "Businessman; former People's Party official",
    matter: "Cashgate",
    matterSw: "Cashgate",
    status: "convicted",
    amountKes: 4_206_337_562,
    since: "2013",
    sources: [MW_COURT, BAKER],
  },
];

export type PilotBundle = {
  money: MoneyItem[];
  named: NamedPerson[];
  matterId: (matter: string) => string;
};

export const PILOT_RECORD: Record<Exclude<CountryId, "ke" | "tz">, PilotBundle> = {
  ug: {
    money: UG_MONEY,
    named: UG_NAMED,
    matterId: (matter) => {
      const m = matter.toLowerCase();
      if (m.includes("opm") || m.includes("prdp") || m.includes("kazinda")) return "opm-prdp";
      if (m.includes("iron") || m.includes("karamoja") || m.includes("kitutu")) return "iron-sheets";
      if (m.includes("chogm") || m.includes("bukenya")) return "chogm-2007";
      return "";
    },
  },
  gh: {
    money: GH_MONEY,
    named: GH_NAMED,
    matterId: (matter) => {
      const m = matter.toLowerCase();
      if (m.includes("cathedral")) return "national-cathedral";
      if (m.includes("gyeeda")) return "gyeeda";
      if (m.includes("ssnit")) return "ssnit-locked";
      return "";
    },
  },
  sn: {
    money: SN_MONEY,
    named: SN_NAMED,
    matterId: (matter) => {
      const m = matter.toLowerCase();
      if (m.includes("petro") || m.includes("timis") || m.includes("sall")) return "petrotim";
      if (m.includes("petrosen")) return "petrosen-loan-gap";
      return "";
    },
  },
  tg: {
    money: TG_MONEY,
    named: TG_NAMED,
    matterId: () => "",
  },
  zm: {
    money: ZM_MONEY,
    named: ZM_NAMED,
    matterId: (matter) => {
      const m = matter.toLowerCase();
      if (m.includes("fire")) return "fire-trucks";
      if (m.includes("mask") || m.includes("covid") || m.includes("dmmu")) return "zm-covid-masks";
      return "";
    },
  },
  mw: {
    money: MW_MONEY,
    named: MW_NAMED,
    matterId: (matter) => {
      const m = matter.toLowerCase();
      if (m.includes("cashgate") || m.includes("lutepo")) return "cashgate";
      return "";
    },
  },
};
