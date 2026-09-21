import type { Lang } from "./types";

/** 365.25-day year. */
export const SECONDS_PER_YEAR = 31_557_600;

/** KNBS mid-2026 population projection, shown on knbs.or.ke. */
export const KNBS_POPULATION = 54_227_015;

/**
 * Nation, 17 Nov 2025: ~87,000 ghost learners “gobble up Sh1bn annually”.
 * Used as a live residual estimate so the last digits move. Ministry
 * verification in Feb 2026 withheld further capitation for one term;
 * that is money not paid, not money returned, so historical stock is
 * not reduced.
 */
export const GHOST_LEARNER_PER_YEAR = 1_000_000_000;
export const GHOST_LEARNER_FROM = Date.UTC(2025, 6, 1);

export type RecordKind =
  | "unaccounted"
  | "scandal_paid"
  | "audit_query"
  | "disputed"
  | "dismissed"
  | "excluded";

export type PersonStatus =
  | "acquitted"
  | "freed"
  | "convicted"
  | "named_in_audit"
  | "named_suspect"
  | "deceased_before_verdict";

export type RecordSource = {
  name: string;
  url: string;
  published: string;
  what: string;
};

export type MoneyItem = {
  id: string;
  title: string;
  titleSw: string;
  period: string;
  amountKes: number;
  inClock: boolean;
  kind: RecordKind;
  office: string;
  officeSw: string;
  summary: string;
  summarySw: string;
  courtNote?: string;
  courtNoteSw?: string;
  sources: RecordSource[];
};

export type NamedPerson = {
  name: string;
  role: string;
  roleSw: string;
  matter: string;
  matterSw: string;
  status: PersonStatus;
  amountKes: number;
  since: string;
  sources: RecordSource[];
};

export type Administration = {
  name: string;
  period: string;
  years: string;
  addedKes: number;
  startKes: number;
  endKes: number;
  sources: RecordSource[];
};

export type CourtEvent = {
  id: string;
  date: string;
  title: string;
  titleSw: string;
  effect: string;
  effectSw: string;
  sources: RecordSource[];
};

const CBK_DEBT: RecordSource = {
  name: "Central Bank of Kenya — public debt",
  url: "https://www.centralbank.go.ke/public-debt/",
  published: "ongoing",
  what: "Official public-debt stock. Administration increments are CBK figures, not findings of theft.",
};

const BOSIRE: RecordSource = {
  name: "Bosire Commission of Inquiry (2005)",
  url: "https://www.theelephant.info/analysis/2019/09/05/tales-of-state-capture-goldenberg-anglo-leasing-and-eurobond/",
  published: "2005",
  what: "Up to KES 158.3B in fake gold and diamond export compensation.",
};

const NATION_SHA: RecordSource = {
  name: "Daily Nation — Auditor-General SHA audit",
  url: "https://nation.africa/kenya/news/auditor-general-exposes-sh50bn-sha-rip-off-5385554",
  published: "2026-03-10",
  what: "OAG: about Sh50 billion unaccounted at SHA/SHIF, including Sh26.8B unsupported payments.",
};

const NATION_ADANI: RecordSource = {
  name: "Daily Nation — Adani deals cancelled",
  url: "https://nation.africa/kenya/news/state-of-the-nation-ruto-cancels-adani-deals--4831464",
  published: "2024-11-21",
  what: "State of the Nation: JKIA concession proposal cancelled. A cancelled proposal is not money paid.",
};

const TREASURY: RecordSource = {
  name: "National Treasury",
  url: "https://www.treasury.go.ke/",
  published: "ongoing",
  what: "Budget and contract publications.",
};

const OAG_FUNDS_2324: RecordSource = {
  name: "Auditor-General — National Government Funds 2023/2024",
  url: "https://www.oagkenya.go.ke/wp-content/uploads/2025/02/THE-NATIONAL-GOVERNMENT-FUNDS-2023-2024-25.01.2025-SIGNED.pdf",
  published: "2025-01-25",
  what: "Audit of national government funds, FY 2023/24.",
};

const STANDARD_NYS: RecordSource = {
  name: "The Standard — NYS convictions",
  url: "https://www.standardmedia.co.ke/article/2001506057/two-ex-nys-staff-jailed-over-loss-of-sh791-million",
  published: "2024-11-08",
  what: "Milimani Anti-Corruption Court, 31 Oct 2024: Hendrick Nyongesa Pilisi (7 years) and Samuel Wachenje (5 years) for the Sh791 million NYS theft.",
};

const OAG: RecordSource = {
  name: "Office of the Auditor-General",
  url: "https://www.oagkenya.go.ke/",
  published: "various",
  what: "Constitutional audit reports to Parliament.",
};

export const MONEY: MoneyItem[] = [
  {
    id: "goldenberg",
    title: "Goldenberg",
    titleSw: "Goldenberg",
    period: "1990–1993",
    amountKes: 158_300_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "National Treasury / Office of the President (Moi era)",
    officeSw: "Hazina ya Taifa / Ofisi ya Rais (enzi ya Moi)",
    summary:
      "Bosire Commission (2005): up to KES 158.3B in fake gold and diamond export compensation. Kenya had negligible gold and no diamonds. Recovery remains unresolved.",
    summarySw:
      "Tume ya Bosire (2005): hadi KSh 158.3B fidia bandia ya mauzo ya dhahabu na almasi. Kenya haikuwa na dhahabu wala almasi. Marejesho bado hayajafanyika.",
    courtNote: "Kamlesh Pattni was freed over Goldenberg in October 2016. The money is still in the clock.",
    courtNoteSw: "Kamlesh Pattni aliachiliwa kuhusu Goldenberg Oktoba 2016. Pesa bado ziko kwenye saa.",
    sources: [
      BOSIRE,
      {
        name: "The Elephant — Wachira Maina",
        url: "https://www.theelephant.info/analysis/2019/09/05/tales-of-state-capture-goldenberg-anglo-leasing-and-eurobond/",
        published: "2019-09-05",
        what: "Bosire Commission: Sh158.3 billion transacted with 487 companies and individuals.",
      },
    ],
  },
  {
    id: "anglo-leasing",
    title: "Anglo Leasing",
    titleSw: "Anglo Leasing",
    period: "1997–2004",
    amountKes: 56_000_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "National Treasury / security contracts",
    officeSw: "Hazina ya Taifa / mikataba ya usalama",
    summary:
      "Eighteen inflated security contracts, about KES 56B, awarded to phantom companies (passports, naval vessels, forensic labs). Payments left the Treasury. Several accused were later set free.",
    summarySw:
      "Mikataba 18 ya usalama iliyopandishwa, takriban KSh 56B, kwa kampuni mzimu (pasipoti, meli, maabara). Malipo yalitoka Hazina. Baadhi ya watuhumiwa baadaye waliachiliwa.",
    courtNote:
      "Nairobi Chief Magistrate Martha Mutuku: prosecution failed to prove the case against several accused (Nation, 16 Jul 2023). Money paid is still in the clock.",
    courtNoteSw:
      "Hakimu Mkuu Martha Mutuku: mashtaka yalishindwa kudhibitisha kesi dhidi ya baadhi ya watuhumiwa (Nation, 16 Jul 2023). Pesa zilizolipwa bado ziko kwenye saa.",
    sources: [
      {
        name: "OCCRP — Pandora Papers",
        url: "https://www.occrp.org/en/project/the-pandora-papers/global-shell-game-helped-hide-companies-linked-to-huge-kenyan-scandal",
        published: "2021",
        what: "Anura Perera named by Kenyan anti-corruption investigators as a suspect in Anglo Leasing contracts.",
      },
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Accused including Deepak and Rashmi Kamani, Joseph Magari, David Onyonka and Dave Mwangi set free.",
      },
    ],
  },
  {
    id: "nys-2015",
    title: "National Youth Service (2015 special audit)",
    titleSw: "Huduma kwa Vijana (ukaguzi maalum 2015)",
    period: "2015–2016",
    amountKes: 1_863_512_256,
    inClock: true,
    kind: "scandal_paid",
    office: "National Youth Service / Devolution",
    officeSw: "Huduma kwa Vijana / Ugatuzi",
    summary:
      "Auditor-General Edward Ouko special audit: KES 1,863,512,256 lost in four fraudulent cases. This clock uses the OAG figure.",
    summarySw:
      "Ukaguzi maalum wa Mkaguzi Mkuu Edward Ouko: KSh 1,863,512,256 zilipotea katika kesi nne. Saa hii inatumia namba ya OAG.",
    courtNote:
      "Milimani Anti-Corruption Court jailed former NYS finance director Samuel Wachenje (five years) and principal supply-chain officer Hendrick Nyongesa Pilisi (seven years) on 31 Oct 2024 (The Standard). Josephine Kabura Irungu was later reported acquitted. Recovery of the full audit figure is not recorded.",
    courtNoteSw:
      "Mahakama ya Kuzuia Ufisadi Milimani iliwahukumu aliyekuwa mkurugenzi wa fedha Samuel Wachenje (miaka mitano) na ofisa ununuzi Hendrick Nyongesa Pilisi (miaka saba) 31 Okt 2024 (The Standard). Josephine Kabura Irungu aliripotiwa kuachiliwa. Marejesho kamili hayajaandikwa.",
    sources: [
      {
        name: "Citi Business News (Ouko special audit)",
        url: "https://citibusinessnews.com/2016/06/kenya-auditor-says-sh1-9bn-lost-in-nys-scam/",
        published: "2016-06",
        what: "OAG: Sh1,863,512,256 lost. Josephine Kabura Irungu named as principal beneficiary of Sh791.385 million.",
      },
      STANDARD_NYS,
      OAG,
    ],
  },
  {
    id: "arror-kimwarer",
    title: "Arror and Kimwarer dams — money paid",
    titleSw: "Mabwawa ya Arror na Kimwarer — pesa zilizolipwa",
    period: "2017–2019",
    amountKes: 7_800_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "National Treasury / Kerio Valley Development Authority",
    officeSw: "Hazina ya Taifa / Mamlaka ya Maendeleo ya Kerio Valley",
    summary:
      "Contracted about KES 63B. This clock counts the advance paid with zero construction: KES 7.8B (court record: Sh4.3B Arror + Sh3.5B Kimwarer). Kimwarer was cancelled as not viable. The 63B contract is not treated as missing cash.",
    summarySw:
      "Mkataba wa takriban KSh 63B. Saa hii inahesabu malipo ya awali bila ujenzi: KSh 7.8B (mahakama: Sh4.3B Arror + Sh3.5B Kimwarer). Kimwarer ilifutwa. KSh 63B si pesa zilizopotea.",
    courtNote:
      "Former Treasury CS Henry Rotich and eight co-accused were acquitted on 14 Dec 2023 for lack of evidence. The advances were not recovered. Rotich later sued for alleged malicious prosecution.",
    courtNoteSw:
      "Aliyekuwa CS Hazina Henry Rotich na washtakiwa wengine wanane waliachiliwa 14 Des 2023 kwa kukosa ushahidi. Malipo ya awali hayakurejeshwa.",
    sources: [
      {
        name: "Daily Nation — Rotich acquittal",
        url: "https://nation.africa/kenya/news/henry-rotich-acquittal-prosecutors-sued-for-bungling-sh63bn-arror-and-kimwarer-case-4480036",
        published: "2024-01-02",
        what: "Acquittal 14 Dec 2023. Prosecution did not lead 41 of 49 witnesses.",
      },
    ],
  },
  {
    id: "shif",
    title: "Social Health Authority (SHIF)",
    titleSw: "Mamlaka ya Afya ya Jamii (SHIF)",
    period: "2024/25",
    amountKes: 49_290_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Social Health Authority / Ministry of Health",
    officeSw: "Mamlaka ya Afya ya Jamii / Wizara ya Afya",
    summary:
      "Daily Nation, citing the Auditor-General: KES 49.3B unaccounted at SHA/SHIF, including KES 26.8B in payments unsupported by records, ghost surgeries, and KES 3.37B transferred but never received by SHA. This is an audit query, not a criminal verdict.",
    summarySw:
      "Daily Nation, ikinukuu Mkaguzi Mkuu: KSh 49.3B hazijahesabiwa kwenye SHA/SHIF, ikiwa ni pamoja na KSh 26.8B bila kumbukumbu. Hili ni swali la ukaguzi, si hukumu ya jinai.",
    sources: [NATION_SHA, OAG],
  },
  {
    id: "ecitizen",
    title: "eCitizen collections unaccounted",
    titleSw: "Makusanyo ya eCitizen yasiyohesabiwa",
    period: "2023/24",
    amountKes: 44_816_483_723,
    inClock: true,
    kind: "audit_query",
    office: "National Treasury / Interior — eCitizen",
    officeSw: "Hazina ya Taifa / Mambo ya Ndani — eCitizen",
    summary:
      "OAG 2023/24: of KES 100.84B collected, KES 44.82B could not be accounted for; KES 7.05B later cited as stuck in collection accounts without SLAs. The viral KES 1.3 trillion figure is a different claim and is not in this clock.",
    summarySw:
      "OAG 2023/24: kati ya KSh 100.84B zilizokusanywa, KSh 44.82B hazikuhesabiwa. Dai la KSh 1.3 trilioni si hili, na halimo kwenye saa.",
    sources: [
      {
        name: "Citizen Digital",
        url: "https://www.citizen.digital/news/auditor-general-uncovers-more-unauthorised-govt-spending-as-ksh16b-loan-to-kq-missing-n336377",
        published: "2024-02-08",
        what: "Auditor-General queries on unauthorised spending, including eCitizen and KQ.",
      },
      OAG,
    ],
  },
  {
    id: "ghost-schools",
    title: "Ghost schools — capitation",
    titleSw: "Shule mzimu — capitation",
    period: "2020–2024",
    amountKes: 3_700_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Ministry of Education",
    officeSw: "Wizara ya Elimu",
    summary:
      "OAG to PAC: 33 non-existent schools received KES 3.7B capitation over four years. Separate from the ghost-learner tick below.",
    summarySw:
      "OAG kwa PAC: shule 33 zisizokuwepo zilipokea KSh 3.7B kwa miaka minne. Tofauti na makadirio ya wanafunzi mzimu yanayotembea kwenye saa.",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/education/audit-reveals-loss-of-billions-in-fraud-involving-ghost-schools--5119596",
        published: "2025-07",
        what: "OAG: Sh3.7 billion capitation to ghost schools, FY 2020–2024.",
      },
      OAG,
    ],
  },
  {
    id: "ghost-workers",
    title: "County ghost workers (OAG sample)",
    titleSw: "Wafanyakazi mzimu wa kaunti (sampuli ya OAG)",
    period: "2023–2025",
    amountKes: 978_000_000,
    inClock: true,
    kind: "audit_query",
    office: "County governments (26-county sample)",
    officeSw: "Serikali za kaunti (sampuli ya kaunti 26)",
    summary:
      "OAG, Jan 2026: 596 sampled county employees failed physical verification and had been paid KES 978M. A Nation figure of KES 6.5B across 22 counties is a wider estimate and is not added on top of this sample.",
    summarySw:
      "OAG, Jan 2026: wafanyakazi 596 wa kaunti hawakuonekana katika ukaguzi wa mwili na walikuwa wamelipwa KSh 978M. KSh 6.5B ya Nation ni makadirio mapana; haijaongezwa juu ya sampuli hii.",
    sources: [
      {
        name: "Y News (OAG Jan 2026)",
        url: "https://ynews.digital/governance/audit-ghost-workers-county-payrolls-kenya/",
        published: "2026-01-28",
        what: "596 unverified staff, Sh978 million, 26 counties.",
      },
      OAG,
    ],
  },
  {
    id: "kq-loan",
    title: "Kenya Airways — Treasury loan without paperwork",
    titleSw: "Kenya Airways — mkopo wa Hazina bila nyaraka",
    period: "2022/23",
    amountKes: 16_200_000_000,
    inClock: true,
    kind: "audit_query",
    office: "National Treasury / Kenya Airways",
    officeSw: "Hazina ya Taifa / Kenya Airways",
    summary:
      "OAG: KES 16.2B extended as a loan to KQ without authorising paperwork or a designated repayment account; funds mixed with KQ assets. Later PAC reporting put a wider KQ exposure higher; this clock keeps the 16.2B query.",
    summarySw:
      "OAG: KSh 16.2B zilitolewa kama mkopo kwa KQ bila nyaraka au akaunti ya marejesho. Saa inatumia swali hili la 16.2B.",
    sources: [
      {
        name: "Citizen Digital",
        url: "https://www.citizen.digital/news/auditor-general-uncovers-more-unauthorised-govt-spending-as-ksh16b-loan-to-kq-missing-n336377",
        published: "2024-02-08",
        what: "Auditor-General: KSh 16.2 billion KQ loan could not be tracked.",
      },
      OAG,
    ],
  },
  {
    id: "kpa-sgr",
    title: "KPA — SGR freight not remitted to escrow",
    titleSw: "KPA — nauli ya SGR isiyopelekwa escrow",
    period: "Jul 2023–Dec 2024",
    amountKes: 6_000_000_000,
    inClock: true,
    kind: "audit_query",
    office: "Kenya Ports Authority",
    officeSw: "Mamlaka ya Bandari ya Kenya",
    summary:
      "OAG to Parliament: KPA collected KES 22B from SGR cargo and remitted KES 16B to the loan escrow. KES 6B remained at KPA. This is unauthorised retention, not a finding that the cash vanished.",
    summarySw:
      "OAG kwa Bunge: KPA ilikusanya KSh 22B kutoka mizigo ya SGR na kupeleka KSh 16B. KSh 6B zilibaki KPA. Hii ni kuzuia bila idhini, si kuiba.",
    sources: [
      {
        name: "Radio Generation Kenya (OAG)",
        url: "https://radiogeneration.co.ke/business/54512/audit-faults-kpa-over-withheld-sgr-revenue-that-led-to-loan-default",
        published: "2025-11-05",
        what: "Sh6 billion of Sh22 billion SGR freight retained by KPA.",
      },
      OAG,
    ],
  },
  {
    id: "eurobond",
    title: "Eurobond 2014 proceeds — disputed",
    titleSw: "Mapato ya Eurobond 2014 — yanapingwa",
    period: "2014–2019",
    amountKes: 215_000_000_000,
    inClock: false,
    kind: "disputed",
    office: "National Treasury",
    officeSw: "Hazina ya Taifa",
    summary:
      "OAG 2016 could not trace about KES 215B of the $2.75B Eurobond to specific projects. A 2019 final audit later said proceeds were received into the Consolidated Fund or paid for authorised purposes. Treasury disputes the ‘missing’ label. GhostLedger does not clock disputed money.",
    summarySw:
      "OAG 2016 haikuweza kufuatilia takriban KSh 215B. Ukaguzi wa 2019 ulisema mapato yaliingia Consolidated Fund au yalilipwa kwa madhumuni yaliyoidhinishwa. Hazina inapinga. GhostLedger haihesabu pesa zinazopingwa.",
    sources: [
      {
        name: "The Elephant — Wachira Maina",
        url: "https://www.theelephant.info/analysis/2019/09/05/tales-of-state-capture-goldenberg-anglo-leasing-and-eurobond/",
        published: "2019-09-05",
        what: "Ouko 2016: funds could not be traced to development projects.",
      },
      {
        name: "Kenya Insights (2019 close-out)",
        url: "https://kenyainsights.com/where-did-sh250-billion-eurobond-vanish-to",
        published: "2025-07-30",
        what: "Notes the 2019 final audit concluding proceeds were accounted.",
      },
      OAG,
    ],
  },
  {
    id: "ecitizen-1-3t",
    title: "Viral KES 1.3 trillion eCitizen claim",
    titleSw: "Dai la KSh 1.3 trilioni kwenye eCitizen",
    period: "Mar 2026",
    amountKes: 1_300_000_000_000,
    inClock: false,
    kind: "dismissed",
    office: "Office of the Auditor-General (denial)",
    officeSw: "Ofisi ya Mkaguzi Mkuu (ukanushaji)",
    summary:
      "A graphic claiming Auditor-General Nancy Gathungu had found KES 1.3T missing from eCitizen circulated in March 2026. OAG posted that the claim was misleading and had not come from the office. Africa Check rated it false. It is not in this clock.",
    summarySw:
      "Mchoro uliodai Mkaguzi Mkuu Nancy Gathungu alipata KSh 1.3T zimekosekana kwenye eCitizen. OAG ilisema dai ni potofu. Africa Check ilikadiria ni uwongo. Halimo kwenye saa.",
    courtNote: "Public-record correction: a rumour that never entered the stock.",
    courtNoteSw: "Marekebisho ya rekodi: uvumi ambao haukuingia kwenye jumla.",
    sources: [
      {
        name: "Africa Check",
        url: "https://africacheck.org/fact-checks/meta-programme-fact-checks/kenyas-office-auditor-general-rubbishes-rumours-ksh-13",
        published: "2026-03-23",
        what: "OAG 3 Mar 2026: KSh 1.3 trillion eCitizen claim did not emanate from the office.",
      },
      {
        name: "TUKO",
        url: "https://www.tuko.co.ke/business-economy/economy/619438-auditor-general-gathungu-denies-claims-ksh-13-trillion-lost-ecitizen/",
        published: "2026-03-04",
        what: "OAG statement dismissing the viral graphic.",
      },
    ],
  },
  {
    id: "talanta",
    title: "Talanta Sports City — contract cost",
    titleSw: "Talanta Sports City — gharama ya mkataba",
    period: "2024–",
    amountKes: 45_900_000_000,
    inClock: false,
    kind: "excluded",
    office: "Government of Kenya",
    officeSw: "Serikali ya Kenya",
    summary:
      "A live construction contract for Talanta Sports City. Contract cost is not documented missing cash, so it stays out of the clock.",
    summarySw:
      "Mkataba hai wa ujenzi wa Talanta Sports City. Gharama ya mkataba si pesa zilizopotea kwenye rekodi, kwa hiyo haiko kwenye saa.",
    sources: [TREASURY],
  },
  {
    id: "adani",
    title: "Adani JKIA proposal — cancelled",
    titleSw: "Pendekezo la Adani JKIA — lilifutwa",
    period: "2024",
    amountKes: 238_000_000_000,
    inClock: false,
    kind: "excluded",
    office: "Kenya Airports Authority",
    officeSw: "Mamlaka ya Viwanja vya Ndege Kenya",
    summary:
      "A cancelled 2024 proposal to concession JKIA, reported at about KES 230–238B. A cancelled proposal is not money that left the budget.",
    summarySw:
      "Pendekezo la 2024 la mkataba wa JKIA lililofutwa, takriban KSh 230–238B. Pendekezo lililofutwa si pesa zilizotoka bajeti.",
    sources: [NATION_ADANI],
  },
  {
    id: "nys-2018",
    title: "National Youth Service (2018)",
    titleSw: "Huduma kwa Vijana (2018)",
    period: "2018",
    amountKes: 9_000_000_000,
    inClock: false,
    kind: "scandal_paid",
    office: "National Youth Service / Devolution",
    officeSw: "Huduma kwa Vijana / Ugatuzi",
    summary:
      "The Standard: a second NYS round, about KES 9B, through fictitious companies after the 2015 special audit. Listed here as a public scandal. Not added to the clock — it is a news compilation, not a single OAG total.",
    summarySw:
      "The Standard: raundi ya pili ya NYS, takriban KSh 9B, kupitia kampuni bandia baada ya ukaguzi wa 2015. Imeorodheshwa kama kashfa ya umma. Haijaongezwa kwenye saa — ni mkusanyo wa habari, si jumla moja ya OAG.",
    sources: [STANDARD_NYS],
  },
  {
    id: "ng-cdf-bursary",
    title: "NG-CDF bursaries — poorly documented",
    titleSw: "Ufadhili wa NG-CDF — nyaraka dhaifu",
    period: "2023/24",
    amountKes: 4_100_000_000,
    inClock: false,
    kind: "audit_query",
    office: "National Government Constituencies Development Fund",
    officeSw: "Hazina ya Maendeleo ya Maeneo Bunge",
    summary:
      "Auditor-General: 125 constituencies failed to adequately document about KES 4.1B in bursary disbursements. A later query found undisbursed cheques still sitting in offices. This is an audit query, not a finding that the cash vanished.",
    summarySw:
      "Mkaguzi Mkuu: maeneo bunge 125 yalishindwa kuandika kama inavyotakiwa takriban KSh 4.1B za ufadhili. Swali la ukaguzi, si hukumu kwamba pesa zilipotea.",
    sources: [
      OAG,
      {
        name: "Citizen Digital",
        url: "https://www.citizen.digital/news/auditor-general-uncovers-more-unauthorised-govt-spending-as-ksh16b-loan-to-kq-missing-n336377",
        published: "2024",
        what: "OAG queries on undocumented constituency bursaries.",
      },
    ],
  },
  {
    id: "soe-writeoff",
    title: "SOE loan write-off applications",
    titleSw: "Maombi ya kufuta mikopo ya mashirika ya umma",
    period: "2025/26",
    amountKes: 28_550_000_000,
    inClock: false,
    kind: "audit_query",
    office: "National Treasury / state-owned enterprises",
    officeSw: "Hazina ya Taifa / mashirika ya umma",
    summary:
      "Daily Nation: 29 state-owned enterprises applied to write off KES 28.55B from a government loan book. Largest: Nairobi City County KES 14.71B. An application is not money already lost. Kept out of the clock.",
    summarySw:
      "Daily Nation: mashirika 29 ya umma yaliomba kufuta KSh 28.55B. Ombi si pesa zilizopotea. Zimeachwa nje ya saa.",
    sources: [
      {
        name: "Business Daily",
        url: "https://www.businessdailyafrica.com/bd/economy/taxpayers-face-sh28-5bn-hit-as-state-firms-seek-debt-write-offs-5470172",
        published: "2026",
        what: "29 SOEs applied for KES 28.55B in write-offs from a KES 511.44B government loan portfolio.",
      },
    ],
  },
  {
    id: "galana-kulalu",
    title: "Galana Kulalu irrigation",
    titleSw: "Umwagiliaji wa Galana Kulalu",
    period: "2013–2019",
    amountKes: 14_000_000_000,
    inClock: false,
    kind: "scandal_paid",
    office: "Ministry of Agriculture / National Irrigation Authority",
    officeSw: "Wizara ya Kilimo / Mamlaka ya Umwagiliaji",
    summary:
      "Daily Nation: Parliament questioned KES 14B spent for about 10,000 of one million planned acres. The scheme promised 20 million bags of maize and produced about 119,000. The contractor was terminated in 2019. Listed as a public scandal. Not added to the clock — spent on a failed scheme, not a single OAG theft total.",
    summarySw:
      "Daily Nation: Bunge lilihoji KSh 14B zilizotumika kwa ekari 10,000 kati ya milioni moja. Mpango uliahidi magunia milioni 20 ya mahindi; ulizalisha takriban 119,000. Mkandarasi alikatishwa 2019. Kashfa ya umma. Haijaongezwa kwenye saa.",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/news/how-crooked-profiteers-took-galana-kulalu-project-down-the-drain--4079252",
        published: "2019",
        what: "Parliament questioned Sh14 billion spent; contractor terminated.",
      },
    ],
  },
  {
    id: "nys-ghost",
    title: "NYS fictitious supplies — payment blocked",
    titleSw: "Vifaa bandia vya NYS — malipo yalizuiliwa",
    period: "2013–2016",
    amountKes: 6_160_000_000,
    inClock: false,
    kind: "scandal_paid",
    office: "National Youth Service / Devolution",
    officeSw: "Huduma kwa Vijana / Ugatuzi",
    summary:
      "EACC secured court orders in December 2025 blocking about KES 6.16B in alleged fictitious NYS contracts from FY 2013/14–2015/16. A blocked payment is not a conviction. Not added to the clock — it sits beside the 2015 OAG special audit, not on top of it.",
    summarySw:
      "EACC ilipata amri ya mahakama Desemba 2025 kuzuiya takriban KSh 6.16B za mikataba bandia ya NYS. Kuzuiya malipo si hukumu. Haijaongezwa kwenye saa.",
    sources: [
      {
        name: "Citizen Digital",
        url: "https://citizen.digital/article/eacc-secures-orders-blocking-payment-of-ksh6b-by-nys-to-several-companies-n374630",
        published: "2025-12",
        what: "EACC orders blocking about Sh6 billion in alleged fictitious NYS payments.",
      },
    ],
  },
  {
    id: "eurobond-2025",
    title: "Eurobond 2025 proceeds — diverted",
    titleSw: "Mapato ya Eurobond 2025 — yaliepushwa",
    period: "2025",
    amountKes: 30_000_000_000,
    inClock: false,
    kind: "audit_query",
    office: "National Treasury",
    officeSw: "Hazina ya Taifa",
    summary:
      "Auditor-General Nancy Gathungu: of about KES 188.35B from the 2025 $1.5B Eurobond, KES 30B was diverted on 7 April 2025 to plug Treasury-bond shortfalls — a breach of the subscription agreement. Reimbursement was not confirmed. This is an audit query, not a finding of theft.",
    summarySw:
      "Mkaguzi Mkuu Nancy Gathungu: kati ya takriban KSh 188.35B za Eurobond ya 2025, KSh 30B ziliepushwa 7 Aprili 2025 kuziba pengo la bondi za Hazina. Marejesho hayakuhakikishwa. Swali la ukaguzi, si hukumu ya wizi.",
    sources: [
      {
        name: "The Star",
        url: "https://www.the-star.co.ke/news/2026-03-22-auditor-raises-red-flag-over-rutos-sh110bn-eurobond-loan",
        published: "2026-03-22",
        what: "AG: Sh30 billion of 2025 Eurobond proceeds diverted to Treasury-bond shortfalls.",
      },
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/business/audit-sh30bn-eurobond-breach-government-defaults-security-loans-5445654",
        published: "2026-05-03",
        what: "AG could not confirm whether the diverted Sh30 billion was reimbursed.",
      },
      OAG,
    ],
  },
  {
    id: "payroll-12",
    title: "State payroll irregularities — 12 departments",
    titleSw: "Kasoro za mishahara ya serikali — idara 12",
    period: "2025/26",
    amountKes: 6_200_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Public Service / National Treasury",
    officeSw: "Utumishi wa Umma / Hazina ya Taifa",
    summary:
      "Daily Nation: a sample of 12 of 53 state departments found about KES 6.2B in suspected payroll irregularities. Cabinet ordered a DCI probe. A probe is not a charge. Kept out of the clock.",
    summarySw:
      "Daily Nation: sampuli ya idara 12 kati ya 53 ilipata takriban KSh 6.2B za kasoro za mishahara. Baraza liliamuru uchunguzi wa DCI. Uchunguzi si shitaka. Imeachwa nje ya saa.",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/news/cabinet-orders-dci-to-probe-sh6-2bn-state-payroll-heist-5514508",
        published: "2026",
        what: "Cabinet ordered a DCI probe into Sh6.2 billion suspected payroll irregularities.",
      },
    ],
  },
  {
    id: "pomsf",
    title: "Public Officers Medical Scheme Fund",
    titleSw: "Hazina ya Afya ya Watumishi wa Umma",
    period: "2024/25",
    amountKes: 5_300_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Public Officers Medical Scheme Fund / SHA",
    officeSw: "Hazina ya Afya ya Watumishi wa Umma / SHA",
    summary:
      "Auditor-General: about KES 5.3B in unexplained income variances on the civil-service medical scheme for the year ending 30 June 2025. An audit query, not a criminal verdict. Kept out of the clock.",
    summarySw:
      "Mkaguzi Mkuu: takriban KSh 5.3B za tofauti za mapato zisizoelezwa kwenye hazina ya afya ya watumishi. Swali la ukaguzi. Imeachwa nje ya saa.",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/health/sh5-3b-unaccounted-for-in-civil-servants-health-fund-5416924",
        published: "2026-04",
        what: "AG: Sh5.3 billion unexplained on POMSF, year ending 30 June 2025.",
      },
      OAG,
    ],
  },
  {
    id: "petrol-levy",
    title: "Petroleum Development Levy — irregular borrowing",
    titleSw: "Ushuru wa Maendeleo ya Mafuta — kukopa nje ya sheria",
    period: "2023/24",
    amountKes: 33_500_000_000,
    inClock: false,
    kind: "audit_query",
    office: "National Treasury / petroleum funds",
    officeSw: "Hazina ya Taifa / hazina za mafuta",
    summary:
      "OAG 2023/24: KES 33.5B borrowed from the Railway Development Levy Fund to settle oil-marketer arrears. The Petroleum Development Fund Act does not authorise borrowing between funds. Irregular movement is not the same as cash vanishing. Kept out of the clock.",
    summarySw:
      "OAG 2023/24: KSh 33.5B zilikopwa kutoka Hazina ya Ushuru wa Reli kulipa deni la wauzaji mafuta. Sheria hairuhusu kukopa kati ya hazina. Kuhamisha nje ya sheria si kuiba. Imeachwa nje ya saa.",
    sources: [OAG_FUNDS_2324, OAG],
  },
  {
    id: "nssf-audit",
    title: "NSSF — qualified audit opinion",
    titleSw: "NSSF — maoni ya ukaguzi yaliyohitimishwa kwa masharti",
    period: "2022/23",
    amountKes: 10_874_678_706,
    inClock: false,
    kind: "audit_query",
    office: "National Social Security Fund",
    officeSw: "Hazina ya Hifadhi ya Jamii",
    summary:
      "OAG qualified opinion on NSSF: about KES 9.55B in unremitted member contributions not disclosed, plus a KES 905M tax overpayment still unrecovered. A qualified opinion is not a theft verdict. Kept out of the clock.",
    summarySw:
      "OAG: takriban KSh 9.55B za michango isiyowasilishwa hazikuonyeshwa, pamoja na KSh 905M za kodi zilizolipwa zaidi. Maoni yenye masharti si hukumu ya wizi. Imeachwa nje ya saa.",
    sources: [
      {
        name: "Auditor-General — NSSF 2022/2023",
        url: "https://www.oagkenya.go.ke/wp-content/uploads/2024/07/National-Social-Security-Fund-.pdf",
        published: "2024-07",
        what: "Qualified opinion. Unremitted contributions and unrecovered tax overpayment.",
      },
      OAG,
    ],
  },
  {
    id: "uwezo",
    title: "Uwezo Fund — unrecoverable loans",
    titleSw: "Hazina ya Uwezo — mikopo isiyorejeshwa",
    period: "2023/24",
    amountKes: 5_168_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Uwezo Fund",
    officeSw: "Hazina ya Uwezo",
    summary:
      "OAG 2023/24: KES 5.17B outstanding loans with no bad-debt provision and no split between current and non-current receivables. An audit query on a revolving fund, not a finding that the cash vanished. Kept out of the clock.",
    summarySw:
      "OAG 2023/24: KSh 5.17B za mikopo hai bila akiba ya deni baya. Swali la ukaguzi. Imeachwa nje ya saa.",
    sources: [OAG_FUNDS_2324, OAG],
  },
  {
    id: "coffee-cherry",
    title: "Coffee Cherry Fund — illegal deposits",
    titleSw: "Hazina ya Tunda la Kahawa — amana nje ya sheria",
    period: "2022/23",
    amountKes: 2_181_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Coffee Cherry Advance Revolving Fund",
    officeSw: "Hazina ya Malipo ya Tunda la Kahawa",
    summary:
      "OAG: KES 2.181B invested in a commercial-bank call deposit instead of Treasury Bills, against a National Treasury circular. Mis-placed deposits are not the same as missing cash. Kept out of the clock.",
    summarySw:
      "OAG: KSh 2.181B ziliwekwa kwenye amana ya benki ya biashara badala ya hati za Hazina. Amana nje ya mwongozo si pesa zilizopotea. Imeachwa nje ya saa.",
    sources: [
      {
        name: "Auditor-General — Coffee Cherry Fund 2022/2023",
        url: "https://www.oagkenya.go.ke/wp-content/uploads/2024/07/COFFEE-CHERRY-ADVANCE-REVOLVING-FUND-.pdf",
        published: "2024-07",
        what: "KES 2.181B placed in a commercial bank call deposit contrary to Treasury circular.",
      },
      OAG,
    ],
  },
  {
    id: "wef",
    title: "Women Enterprise Fund — adverse opinion",
    titleSw: "Hazina ya Biashara ya Wanawake — maoni mabaya",
    period: "2023/24",
    amountKes: 2_510_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Women Enterprise Fund",
    officeSw: "Hazina ya Biashara ya Wanawake",
    summary:
      "OAG 2023/24 adverse opinion: KES 2.51B in receivables unsupported by aging analysis, plus non-performing loans with no provision. The worst audit rating is still not a theft verdict. Kept out of the clock.",
    summarySw:
      "OAG 2023/24 maoni mabaya: KSh 2.51B za deni bila uchambuzi wa umri. Kiwango kibaya zaidi cha ukaguzi si hukumu ya wizi. Imeachwa nje ya saa.",
    sources: [OAG_FUNDS_2324, OAG],
  },
  {
    id: "petrol-training",
    title: "Petroleum Training Levy — uncollected",
    titleSw: "Ushuru wa Mafunzo ya Mafuta — haujakusanywa",
    period: "2023/24",
    amountKes: 3_693_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Petroleum training levy fund",
    officeSw: "Hazina ya ushuru wa mafunzo ya mafuta",
    summary:
      "OAG 2023/24: KES 3.69B in receivables outstanding more than two years, some since 2011, including a dissolved company. Uncollected levy is not clocked as missing cash.",
    summarySw:
      "OAG 2023/24: KSh 3.69B za deni zilizokaa zaidi ya miaka miwili, nyingine tangu 2011. Ushuru usiokusanywa haujahesabiwa kwenye saa.",
    sources: [OAG_FUNDS_2324, OAG],
  },
  {
    id: "ng-cdf-cheques",
    title: "NG-CDF bursary cheques sitting in offices",
    titleSw: "Hundi za ufadhili wa NG-CDF ofisini",
    period: "2024/25",
    amountKes: 722_640_000,
    inClock: false,
    kind: "audit_query",
    office: "National Government Constituencies Development Fund",
    officeSw: "Hazina ya Maendeleo ya Maeneo Bunge",
    summary:
      "Auditor-General: five constituency offices held undisbursed bursary cheques worth KES 722.64 million in FY 2024/25. Cheques issued but not given out. A later, separate query from FY 2023/24 on poorly documented bursaries is listed on its own row.",
    summarySw:
      "Mkaguzi Mkuu: ofisi tano za maeneo bunge zilikaa na hundi za ufadhili KSh 722.64 milioni mwaka 2024/25. Hundi zilitolewa lakini hazikugawiwa.",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/news/audit-five-constituencies-sat-on-sh722-64-million-cheques-meant-for-needy-leaners-5404538",
        published: "2026",
        what: "Five constituencies sat on Sh722.64 million bursary cheques.",
      },
      OAG,
    ],
  },
];

export const NAMED: NamedPerson[] = [
  {
    name: "Henry Rotich",
    role: "Former Treasury Cabinet Secretary",
    roleSw: "Aliyekuwa Katibu wa Baraza la Mawaziri, Hazina",
    matter: "Arror and Kimwarer dams",
    matterSw: "Mabwawa ya Arror na Kimwarer",
    status: "acquitted",
    amountKes: 7_800_000_000,
    since: "2019",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/news/henry-rotich-acquittal-prosecutors-sued-for-bungling-sh63bn-arror-and-kimwarer-case-4480036",
        published: "2024-01-02",
        what: "Charged 2019. Acquitted 14 Dec 2023 with eight co-accused. A charge is not a conviction.",
      },
    ],
  },
  {
    name: "Kamlesh Pattni",
    role: "Businessman, Goldenberg International",
    roleSw: "Mfanyabiashara, Goldenberg International",
    matter: "Goldenberg",
    matterSw: "Goldenberg",
    status: "freed",
    amountKes: 158_300_000_000,
    since: "1994",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Freed over the Sh5.6 billion Goldenberg file in October 2016.",
      },
      BOSIRE,
    ],
  },
  {
    name: "Deepak Kamani",
    role: "Businessman, Anglo Leasing Finance",
    roleSw: "Mfanyabiashara, Anglo Leasing Finance",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "freed",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Set free after an eight-year trial; prosecution failed to prove its case.",
      },
    ],
  },
  {
    name: "Rashmi Kamani",
    role: "Businessman",
    roleSw: "Mfanyabiashara",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "freed",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Set free with co-accused, July 2023.",
      },
    ],
  },
  {
    name: "Joseph Magari",
    role: "Former Treasury official",
    roleSw: "Aliyekuwa ofisa wa Hazina",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "freed",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Named among the accused set free after the eight-year trial.",
      },
    ],
  },
  {
    name: "David Onyonka",
    role: "Former official",
    roleSw: "Aliyekuwa ofisa",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "freed",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Named among the accused set free, July 2023.",
      },
    ],
  },
  {
    name: "Dave Mwangi",
    role: "Former official",
    roleSw: "Aliyekuwa ofisa",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "freed",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Named among the accused set free, July 2023.",
      },
    ],
  },
  {
    name: "David Mwiraria",
    role: "Former Finance Minister",
    roleSw: "Aliyekuwa Waziri wa Fedha",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "deceased_before_verdict",
    amountKes: 56_000_000_000,
    since: "2015",
    sources: [
      {
        name: "OCCRP",
        url: "https://www.occrp.org/en/project/suisse-secrets/suspect-in-massive-kenyan-corruption-case-stashed-millions-in-swiss-bank-account",
        published: "2022-02-24",
        what: "Charged over Anglo Leasing; died during trial proceedings.",
      },
    ],
  },
  {
    name: "Anura Perera",
    role: "Businessman (named suspect)",
    roleSw: "Mfanyabiashara (mtuhumiwa aliyepewa jina)",
    matter: "Anglo Leasing contracts",
    matterSw: "Mikataba ya Anglo Leasing",
    status: "named_suspect",
    amountKes: 56_000_000_000,
    since: "2021",
    sources: [
      {
        name: "OCCRP — Pandora Papers",
        url: "https://www.occrp.org/en/project/the-pandora-papers/global-shell-game-helped-hide-companies-linked-to-huge-kenyan-scandal",
        published: "2021",
        what: "Named by Kenyan anti-corruption investigators as a suspect. Naming is not a conviction.",
      },
    ],
  },
  {
    name: "Josephine Kabura Irungu",
    role: "Businesswoman, NYS suppliers",
    roleSw: "Mfanyabiashara, wasambazaji wa NYS",
    matter: "NYS 2015 special audit",
    matterSw: "Ukaguzi maalum wa NYS 2015",
    status: "acquitted",
    amountKes: 791_385_000,
    since: "2016",
    sources: [
      {
        name: "Citi Business News (Ouko special audit)",
        url: "https://citibusinessnews.com/2016/06/kenya-auditor-says-sh1-9bn-lost-in-nys-scam/",
        published: "2016-06",
        what: "OAG named her principal beneficiary of Sh791.385 million via three business names.",
      },
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/ten-suspects-in-nys-scandal-charged-afresh-4832602",
        published: "2024-11",
        what: "Later reporting: acquitted for lack of evidence. A charge is not a conviction.",
      },
    ],
  },
  {
    name: "Samuel Wachenje",
    role: "Former NYS Director of Finance",
    roleSw: "Aliyekuwa Mkurugenzi wa Fedha, NYS",
    matter: "NYS 2015 — Sh791 million payments",
    matterSw: "NYS 2015 — malipo ya Sh791 milioni",
    status: "convicted",
    amountKes: 791_385_000,
    since: "2015",
    sources: [STANDARD_NYS],
  },
  {
    name: "Hendrick Nyongesa Pilisi",
    role: "Former NYS Principal Supply Chain Officer",
    roleSw: "Aliyekuwa ofisa mkuu wa ununuzi, NYS",
    matter: "NYS 2015 — Sh791 million payments",
    matterSw: "NYS 2015 — malipo ya Sh791 milioni",
    status: "convicted",
    amountKes: 791_385_000,
    since: "2015",
    sources: [STANDARD_NYS],
  },
  {
    name: "Sylvester Mwaliko",
    role: "Former Permanent Secretary, Home Affairs",
    roleSw: "Aliyekuwa Katibu Mkuu, Mambo ya Ndani",
    matter: "Anglo Leasing",
    matterSw: "Anglo Leasing",
    status: "convicted",
    amountKes: 56_000_000_000,
    since: "2006",
    sources: [
      {
        name: "Daily Nation",
        url: "https://www.thecitizen.co.tz/kenya/news/court-cases-to-nowhere-shame-of-big-scandals-but-no-convictions-4466700",
        published: "2023",
        what: "Convicted in 2012 of facilitating Anglo Leasing. Fine of Sh3 million or three years. The only Anglo Leasing conviction on this trail.",
      },
    ],
  },
  {
    name: "James Kanyotu",
    role: "Former Director, Special Branch / NSIS",
    roleSw: "Aliyekuwa Mkurugenzi, Special Branch / NSIS",
    matter: "Goldenberg",
    matterSw: "Goldenberg",
    status: "deceased_before_verdict",
    amountKes: 158_300_000_000,
    since: "1994",
    sources: [
      {
        name: "Daily Nation",
        url: "https://www.thecitizen.co.tz/kenya/news/court-cases-to-nowhere-shame-of-big-scandals-but-no-convictions-4466700",
        published: "2023",
        what: "Named as co-owner of Goldenberg International with Kamlesh Pattni. Died in 2008 before the Goldenberg file closed.",
      },
      BOSIRE,
    ],
  },
];

export function matterScandalId(matter: string): string {
  const m = matter.toLowerCase();
  if (m.includes("goldenberg")) return "goldenberg";
  if (m.includes("anglo")) return "anglo-leasing";
  if (m.includes("nys")) return "nys-2015";
  if (m.includes("arror") || m.includes("kimwarer")) return "arror-kimwarer";
  if (m.includes("galana")) return "galana-kulalu";
  return "";
}

export function peopleOnScandal(id: string): NamedPerson[] {
  return NAMED.filter((p) => {
    const key = matterScandalId(p.matter);
    if (id === "nys-2018" || id === "nys-2015" || id === "nys-ghost") return key === "nys-2015";
    return key === id;
  });
}

export function scandalItems(): MoneyItem[] {
  return MONEY.filter((m) => m.kind === "scandal_paid").sort((a, b) => b.amountKes - a.amountKes);
}

export function missingFundItems(): MoneyItem[] {
  return MONEY.filter(
    (m) => m.kind === "audit_query" || m.kind === "unaccounted" || m.kind === "disputed",
  ).sort((a, b) => b.amountKes - a.amountKes);
}

export const ADMINISTRATIONS: Administration[] = [
  {
    name: "Daniel arap Moi",
    period: "1978–2002",
    years: "24",
    startKes: 24_000_000_000,
    endKes: 630_000_000_000,
    addedKes: 606_000_000_000,
    sources: [CBK_DEBT],
  },
  {
    name: "Mwai Kibaki",
    period: "2002–2013",
    years: "11",
    startKes: 630_000_000_000,
    endKes: 1_790_000_000_000,
    addedKes: 1_160_000_000_000,
    sources: [CBK_DEBT],
  },
  {
    name: "Uhuru Kenyatta",
    period: "2013–2022",
    years: "9",
    startKes: 1_790_000_000_000,
    endKes: 8_700_000_000_000,
    addedKes: 6_910_000_000_000,
    sources: [CBK_DEBT],
  },
  {
    name: "William Ruto",
    period: "2022–present",
    years: "3.5",
    startKes: 8_700_000_000_000,
    endKes: 12_550_000_000_000,
    addedKes: 3_850_000_000_000,
    sources: [CBK_DEBT],
  },
];

export const COURT_EVENTS: CourtEvent[] = [
  {
    id: "pattni-2016",
    date: "2016-10",
    title: "Goldenberg file — Pattni freed",
    titleSw: "Faili la Goldenberg — Pattni aliachiliwa",
    effect:
      "Legal status of a named person changed. The Bosire 158.3B figure stays in the clock because recovery was not recorded.",
    effectSw:
      "Hali ya kisheria ya mtu iliyebadilika. KSh 158.3B za Bosire zinabaki kwenye saa kwa sababu marejesho hayakuandikwa.",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Pattni freed October 2016.",
      },
    ],
  },
  {
    id: "anglo-2023",
    date: "2023-07",
    title: "Anglo Leasing — accused set free",
    titleSw: "Anglo Leasing — watuhumiwa waliachiliwa",
    effect:
      "Prosecution failed to prove its case against several accused. KES 56B paid on the contracts stays in the clock.",
    effectSw: "Mashtaka yalishindwa. KSh 56B zilizolipwa zinabaki kwenye saa.",
    sources: [
      {
        name: "Daily Nation / The Citizen",
        url: "https://www.thecitizen.co.tz/kenya/news/two-decade-hunt-anglo-leasing-scandal-ghosts-became-a-circus--4304910",
        published: "2023-07-16",
        what: "Eight-year trial ended in acquittal / case not proved.",
      },
    ],
  },
  {
    id: "rotich-2023",
    date: "2023-12-14",
    title: "Arror and Kimwarer — Rotich acquitted",
    titleSw: "Arror na Kimwarer — Rotich aliachiliwa",
    effect:
      "An acquittal is recorded. The KES 7.8B advance paid with no dam built stays in the clock. The KES 63B contract is not clocked.",
    effectSw:
      "Kuachiliwa kumeandikwa. KSh 7.8B zilizolipwa bila bwawa zinabaki. KSh 63B za mkataba hazijahesabiwa.",
    sources: [
      {
        name: "Daily Nation",
        url: "https://nation.africa/kenya/news/henry-rotich-acquittal-prosecutors-sued-for-bungling-sh63bn-arror-and-kimwarer-case-4480036",
        published: "2024-01-02",
        what: "Acquittal 14 December 2023.",
      },
    ],
  },
  {
    id: "nys-2024",
    date: "2024-10-31",
    title: "NYS — Wachenje and Nyongesa convicted",
    titleSw: "NYS — Wachenje na Nyongesa walihukumiwa",
    effect:
      "A conviction is recorded. The OAG 2015 special-audit loss stays in the clock; no full recovery is published.",
    effectSw:
      "Hukumi kumeandikwa. Hasara ya ukaguzi wa 2015 inabaki; marejesho kamili hayajachapishwa.",
    sources: [STANDARD_NYS],
  },
  {
    id: "ecitizen-2026",
    date: "2026-03-03",
    title: "OAG dismisses KES 1.3T eCitizen rumour",
    titleSw: "OAG inakanusha uvumi wa KSh 1.3T eCitizen",
    effect:
      "The 1.3 trillion figure never enters the clock. Public-record correction published by OAG and confirmed by Africa Check.",
    effectSw:
      "KSh 1.3 trilioni haziingii kwenye saa. Marekebisho yalichapishwa na OAG na kuthibitishwa na Africa Check.",
    sources: [
      {
        name: "Africa Check",
        url: "https://africacheck.org/fact-checks/meta-programme-fact-checks/kenyas-office-auditor-general-rubbishes-rumours-ksh-13",
        published: "2026-03-23",
        what: "OAG 3 March 2026 denial.",
      },
    ],
  },
];

export const METHOD_LINKS: RecordSource[] = [
  OAG,
  {
    name: "Controller of Budget",
    url: "https://cob.go.ke/",
    published: "ongoing",
    what: "Implementation reports. A CoB table was misread as the 1.3T eCitizen claim.",
  },
  {
    name: "Bajeti Yetu (National Treasury)",
    url: "https://bajetiyetu.treasury.go.ke/",
    published: "ongoing",
    what: "Published budget documents.",
  },
  CBK_DEBT,
  {
    name: "Public Procurement Regulatory Authority",
    url: "https://www.ppra.go.ke/",
    published: "ongoing",
    what: "Procurement rules, including GPS on projects.",
  },
  {
    name: "KNBS",
    url: "https://www.knbs.or.ke/",
    published: "2026",
    what: "Mid-2026 population 54,227,015.",
  },
  {
    name: "Africa Check",
    url: "https://africacheck.org/fact-checks/meta-programme-fact-checks/kenyas-office-auditor-general-rubbishes-rumours-ksh-13",
    published: "2026-03-23",
    what: "Fact check of the dismissed 1.3T eCitizen rumour.",
  },
  {
    name: "Ethics and Anti-Corruption Commission",
    url: "https://eacc.go.ke/",
    published: "ongoing",
    what: "Investigations and court papers.",
  },
  {
    name: "Access to Information Act, 2016",
    url: "https://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/AccesstoInformationActNo31of2016.pdf",
    published: "2016",
    what: "Statutory path to the contract, certificates, and GPS.",
  },
];

export const PERSON_STATUS: Record<PersonStatus | "citizen_indicated", { en: string; sw: string; fr: string }> = {
  acquitted: { en: "Acquitted", sw: "Ameachiliwa na mahakama", fr: "Acquitté" },
  freed: { en: "Freed — case not proved", sw: "Ameachiliwa — kesi haikudhibitishwa", fr: "Relâché — affaire non prouvée" },
  convicted: { en: "Convicted", sw: "Amehukumiwa", fr: "Condamné" },
  named_in_audit: { en: "Named in an audit", sw: "Ametajwa katika ukaguzi", fr: "Cité dans un audit" },
  named_suspect: { en: "Named suspect — not convicted", sw: "Mtuhumiwa aliyepewa jina — si hatia", fr: "Suspect nommé — non condamné" },
  deceased_before_verdict: {
    en: "Died before a verdict",
    sw: "Alifariki kabla ya hukumu",
    fr: "Décédé avant un verdict",
  },
  citizen_indicated: {
    en: "Indicated on a citizen report",
    sw: "Ametajwa kwenye ripoti ya raia",
    fr: "Indiqué sur un constat citoyen",
  },
};

export function documentedStockKes(): number {
  return MONEY.filter((item) => item.inClock).reduce((n, item) => n + item.amountKes, 0);
}

export function ghostLearnerKes(nowMs: number): number {
  const elapsed = Math.max(0, nowMs - GHOST_LEARNER_FROM) / 1000;
  return (GHOST_LEARNER_PER_YEAR / SECONDS_PER_YEAR) * elapsed;
}

export function perSecondKes(): number {
  return GHOST_LEARNER_PER_YEAR / SECONDS_PER_YEAR;
}

export function clockValue(nowMs: number, citizenConfirmedKes: number): number {
  return documentedStockKes() + ghostLearnerKes(nowMs) + citizenConfirmedKes;
}

export function perCitizenKes(total: number): number {
  return total / KNBS_POPULATION;
}

export type OfficeRow = {
  key: string;
  office: string;
  officeSw: string;
  value: number;
};

export function officeLeaderboard(): OfficeRow[] {
  const map = new Map<string, OfficeRow>();
  for (const item of MONEY.filter((m) => m.inClock)) {
    const row = map.get(item.office);
    if (row) row.value += item.amountKes;
    else {
      map.set(item.office, {
        key: item.office,
        office: item.office,
        officeSw: item.officeSw,
        value: item.amountKes,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.value - a.value);
}

export function inClockItems(): MoneyItem[] {
  return MONEY.filter((m) => m.inClock).sort((a, b) => b.amountKes - a.amountKes);
}

export function outOfClockItems(): MoneyItem[] {
  return MONEY.filter((m) => !m.inClock).sort((a, b) => b.amountKes - a.amountKes);
}

export function personStatusLabel(
  status: PersonStatus | "citizen_indicated",
  lang: Lang,
): string {
  return PERSON_STATUS[status][lang];
}

export const COMPILED = "2026-09-16";
