import type { Administration, CourtEvent, MoneyItem, NamedPerson, RecordSource } from "./record";

const CAG: RecordSource = {
  name: "National Audit Office of Tanzania (CAG)",
  url: "https://www.nao.go.tz/",
  published: "various",
  what: "Controller and Auditor General reports to the National Assembly.",
};

const PAC: RecordSource = {
  name: "Parliament of Tanzania — Public Accounts Committee",
  url: "https://www.parliament.go.tz/",
  published: "2014",
  what: "PAC hearings on the Tegeta escrow account and related energy contracts.",
};

const CITIZEN: RecordSource = {
  name: "The Citizen",
  url: "https://www.thecitizen.co.tz/",
  published: "various",
  what: "Published reporting on escrow, Richmond, EPA, and CAG findings. A newspaper is not a verdict.",
};

const PCCB: RecordSource = {
  name: "Prevention and Combating of Corruption Bureau",
  url: "https://www.pccb.go.tz/",
  published: "ongoing",
  what: "Investigations and court papers. A charge is not a conviction.",
};

const TRA: RecordSource = {
  name: "Tanzania Revenue Authority",
  url: "https://www.tra.go.tz/",
  published: "ongoing",
  what: "Tax administration. CAG queries on EFD receipts sit here as audit questions, not as theft findings.",
};

const MOF: RecordSource = {
  name: "Ministry of Finance",
  url: "https://www.mof.go.tz/",
  published: "ongoing",
  what: "Budget publications and public-finance papers.",
};

const PPRA: RecordSource = {
  name: "Public Procurement Regulatory Authority (Tanzania)",
  url: "https://www.ppra.go.tz/",
  published: "ongoing",
  what: "Procurement rules for physical works.",
};

const ATI: RecordSource = {
  name: "Access to Information Act, 2016 (Tanzania)",
  url: "https://www.chragg.go.tz/",
  published: "2016",
  what: "Statutory path to the contract, certificates, and GPS. CHRAGG hears appeals.",
};

export const TZ_MONEY: MoneyItem[] = [
  {
    id: "escrow-tegeta",
    title: "Tegeta Escrow (IPTL / TANESCO)",
    titleSw: "Escrow ya Tegeta (IPTL / TANESCO)",
    period: "2014",
    amountKes: 306_000_000_000,
    inClock: true,
    kind: "unaccounted",
    office: "TANESCO / Ministry of Energy",
    officeSw: "TANESCO / Wizara ya Nishati",
    summary:
      "The Controller and Auditor General's special audit found about TZS 306 billion in the Tegeta escrow account belonged to TANESCO. PAC took evidence in 2014. Unresolved public money is not the same as a conviction.",
    summarySw:
      "Ukaguzi maalum wa Mdhibiti na Mkaguzi Mkuu ulibaini takriban TSh 306 bilioni kwenye akaunti ya escrow ya Tegeta ni za TANESCO. PAC ilisikiliza ushahidi 2014. Pesa za umma zisizotatuliwa si hatia.",
    sources: [CAG, PAC, CITIZEN],
  },
  {
    id: "iptl-overcharge",
    title: "IPTL capacity overcharge, 2002–2012",
    titleSw: "Malipo ya ziada ya IPTL, 2002–2012",
    period: "2002–2012",
    amountKes: 321_000_000_000,
    inClock: false,
    kind: "audit_query",
    office: "TANESCO / Ministry of Energy",
    officeSw: "TANESCO / Wizara ya Nishati",
    summary:
      "CAG reported that IPTL overcharged TANESCO by about TZS 321 billion over a decade. The figure is kept out of the clock so it is not added on top of the TZS 306 billion escrow finding from the same trail.",
    summarySw:
      "CAG aliripoti IPTL ilitoza TANESCO ziada ya takriban TSh 321 bilioni kwa muongo. Kiasi hakiko kwenye saa ili kisiongezwe juu ya TSh 306 bilioni za escrow kutoka njia ileile.",
    sources: [CAG, PAC, CITIZEN],
  },
  {
    id: "epa-bot",
    title: "Bank of Tanzania — External Payment Arrears",
    titleSw: "Benki ya Tanzania — Malipo ya Nje Yaliyochelewa (EPA)",
    period: "2005–2006",
    amountKes: 133_000_000_000,
    inClock: true,
    kind: "scandal_paid",
    office: "Bank of Tanzania",
    officeSw: "Benki kuu ya Tanzania",
    summary:
      "Public reporting and subsequent court files put about TZS 133 billion as having left the BoT External Payment Arrears account. Recovery and verdicts vary by accused. The amount stays in the clock as paid, unresolved public money.",
    summarySw:
      "Ripoti za umma na faili za mahakama zinaweka takriban TSh 133 bilioni kama zilizotoka akaunti ya EPA ya BoT. Marejesho na hukumu zinavary kwa mtuhumiwa. Kiasi kinabaki kwenye saa kama pesa zilizolipwa, hazijatuliwa.",
    sources: [CAG, PCCB, CITIZEN],
  },
  {
    id: "richmond",
    title: "Richmond / Dowans emergency power",
    titleSw: "Richmond / Dowans — umeme wa dharura",
    period: "2006–2008",
    amountKes: 0,
    inClock: false,
    kind: "scandal_paid",
    office: "Ministry of Energy",
    officeSw: "Wizara ya Nishati",
    summary:
      "A 2006 emergency-power contract with a briefcase firm. The Prime Minister and the Energy Minister resigned in 2008 after a parliamentary select committee. Published USD figures conflict (including later ICC awards). No TZS amount is clocked.",
    summarySw:
      "Mkataba wa umeme wa dharura 2006 na kampuni ya mkoba. Waziri Mkuu na Waziri wa Nishati walijiuzulu 2008 baada ya kamati teule. Takwimu za USD zinagongana (pamoja na tuzo za ICC baadaye). Hakuna kiasi cha TSh kilichohesabiwa.",
    sources: [PAC, CITIZEN, PCCB],
  },
  {
    id: "cag-nontax-2223",
    title: "Uncollected non-tax revenue, FY 2022/23",
    titleSw: "Mapato yasiyo ya kodi yasiyokusanywa, MW 2022/23",
    period: "2022/23",
    amountKes: 61_090_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Ministry of Finance / MDAs",
    officeSw: "Wizara ya Fedha / MDA",
    summary:
      "CAG's annual general report for 2022/23 queried about TZS 61.09 billion in uncollected non-tax revenue. Uncollected is not stolen. The row stays out of the clock.",
    summarySw:
      "Ripoti kuu ya CAG ya 2022/23 iliuliza takriban TSh 61.09 bilioni za mapato yasiyo ya kodi yaliyokosa kukusanywa. Yasiyokusanywa si yaliyoibwa. Mstari uko nje ya saa.",
    sources: [CAG, MOF],
  },
  {
    id: "cag-efd",
    title: "Fraudulent EFD receipts (TRA)",
    titleSw: "Risiti bandia za EFD (TRA)",
    period: "CAG performance audit",
    amountKes: 249_400_000_000,
    inClock: false,
    kind: "audit_query",
    office: "Tanzania Revenue Authority",
    officeSw: "Mamlaka ya Mapato Tanzania",
    summary:
      "A CAG performance audit reported about TZS 249.4 billion in fraudulent electronic fiscal device receipts. That is an audit query, not a finding that the sum was stolen. Kept out of the clock.",
    summarySw:
      "Ukaguzi wa utendaji wa CAG uliripoti takriban TSh 249.4 bilioni za risiti bandia za vifaa vya kodi. Hilo ni swali la ukaguzi, si hukumu kwamba kiasi kiliibwa. Kiko nje ya saa.",
    sources: [CAG, TRA],
  },
];

export const TZ_NAMED: NamedPerson[] = [
  {
    name: "Harbinder Singh Sethi",
    role: "IPTL / Pan Africa Power (named in audit and PAC papers)",
    roleSw: "IPTL / Pan Africa Power (ametajwa katika ukaguzi na PAC)",
    matter: "Tegeta Escrow / IPTL",
    matterSw: "Escrow ya Tegeta / IPTL",
    status: "named_in_audit",
    amountKes: 306_000_000_000,
    since: "2014",
    sources: [CAG, PAC, CITIZEN],
  },
  {
    name: "James Rugemalira",
    role: "VIP Engineering (named in audit and PAC papers)",
    roleSw: "VIP Engineering (ametajwa katika ukaguzi na PAC)",
    matter: "Tegeta Escrow / IPTL",
    matterSw: "Escrow ya Tegeta / IPTL",
    status: "named_in_audit",
    amountKes: 306_000_000_000,
    since: "2014",
    sources: [CAG, PAC, CITIZEN],
  },
  {
    name: "Frederick Werema",
    role: "Former Attorney General (resigned after escrow opinion)",
    roleSw: "Aliyekuwa Mwanasheria Mkuu (alijiuzulu baada ya maoni ya escrow)",
    matter: "Tegeta Escrow / IPTL",
    matterSw: "Escrow ya Tegeta / IPTL",
    status: "named_in_audit",
    amountKes: 306_000_000_000,
    since: "2014",
    sources: [PAC, CITIZEN],
  },
  {
    name: "Edward Lowassa",
    role: "Former Prime Minister (resigned, 2008)",
    roleSw: "Aliyekuwa Waziri Mkuu (alijiuzulu, 2008)",
    matter: "Richmond / Dowans emergency power",
    matterSw: "Richmond / Dowans — umeme wa dharura",
    status: "named_suspect",
    amountKes: 0,
    since: "2008",
    sources: [PAC, CITIZEN],
  },
  {
    name: "Nazir Karamagi",
    role: "Former Minister for Energy and Minerals (resigned, 2008)",
    roleSw: "Aliyekuwa Waziri wa Nishati na Madini (alijiuzulu, 2008)",
    matter: "Richmond / Dowans emergency power",
    matterSw: "Richmond / Dowans — umeme wa dharura",
    status: "named_suspect",
    amountKes: 0,
    since: "2008",
    sources: [PAC, CITIZEN],
  },
];

export const TZ_COURT: CourtEvent[] = [
  {
    id: "richmond-2008",
    date: "2008-02",
    title: "Richmond — Prime Minister and Energy Minister resign",
    titleSw: "Richmond — Waziri Mkuu na Waziri wa Nishati wajiuzulu",
    effect:
      "Political responsibility recorded. No TZS amount enters the clock because published contract figures conflict.",
    effectSw:
      "Uwajibikaji wa kisiasa umeandikwa. Hakuna kiasi cha TSh kinachoingia kwenye saa kwa sababu takwimu za mkataba zinagongana.",
    sources: [PAC, CITIZEN],
  },
  {
    id: "escrow-2014",
    date: "2014",
    title: "PAC and CAG on the Tegeta escrow",
    titleSw: "PAC na CAG kuhusu escrow ya Tegeta",
    effect:
      "CAG: about TZS 306 billion in the escrow belonged to TANESCO. The figure enters the clock as unaccounted public money.",
    effectSw:
      "CAG: takriban TSh 306 bilioni kwenye escrow ni za TANESCO. Kiasi kinaingia kwenye saa kama pesa za umma zisizohesabiwa.",
    sources: [CAG, PAC],
  },
  {
    id: "iptl-2025",
    date: "2025",
    title: "High Court dismisses IPTL suit over a 2021 settlement",
    titleSw: "Mahakama Kuu inatupilia mbali kesi ya IPTL kuhusu makubaliano ya 2021",
    effect:
      "A later civil ruling on a settlement is recorded. It does not remove the 2014 CAG escrow finding from the clock.",
    effectSw:
      "Hukumu ya madai kuhusu makubaliano imeandikwa. Haiondoi tembeo la CAG la 2014 kwenye saa.",
    sources: [CITIZEN],
  },
];

export const TZ_ADMIN: Administration[] = [];

export const TZ_METHOD: RecordSource[] = [
  CAG,
  PCCB,
  PPRA,
  MOF,
  TRA,
  ATI,
  {
    name: "National Bureau of Statistics",
    url: "https://www.nbs.go.tz/",
    published: "ongoing",
    what: "Official statistics. Population is not used to clock theft.",
  },
  PAC,
];

export const TZ_COMPILED = "2026-09-21";
