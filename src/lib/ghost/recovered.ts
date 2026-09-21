import type { CountryId } from "./country";
import type { RecordSource } from "./record";

export type RecoveredKind = "recovered" | "forfeited";

export type RecoveredItem = {
  id: string;
  title: string;
  titleSw: string;
  period: string;
  amountKes: number;
  kind: RecoveredKind;
  office: string;
  officeSw: string;
  summary: string;
  summarySw: string;
  sources: RecordSource[];
};

const KE: RecoveredItem[] = [
  {
    id: "eacc-2024-25",
    title: "EACC asset recovery, FY 2024/25",
    titleSw: "Marejesho ya mali, EACC, MW 2024/25",
    period: "2024/25",
    amountKes: 3_400_000_000,
    kind: "recovered",
    office: "Ethics and Anti-Corruption Commission",
    officeSw: "Tume ya Maadili na Kupambana na Ufisadi",
    summary:
      "EACC reported KES 3.4 billion recovered in corruptly acquired assets for the year ending June 2025. KES 22.9 billion traced and KES 16.5 billion averted are not recoveries and are not listed here.",
    summarySw:
      "EACC iliripoti KSh 3.4 bilioni zilizorejeshwa kama mali zilizopatikana kwa ufisadi kwa mwaka ulioisha Juni 2025. KSh 22.9B zilizofuatiliwa na KSh 16.5B zilizozuiwa si marejesho, na haziko hapa.",
    sources: [
      {
        name: "EACC",
        url: "https://eacc.go.ke/",
        published: "2025-12-08",
        what: "FY 2024/25 activity report: KES 3.4B recovered.",
      },
      {
        name: "Capital FM",
        url: "https://capitalfm.africa/eacc-recovers-sh3-4bn-traces-sh22-9bn-averts-sh16-5bn-loss/",
        published: "2025-12-08",
        what: "KES 3.4B recovered; 22.9B traced; 16.5B averted.",
      },
    ],
  },
];

const TZ: RecoveredItem[] = [
  {
    id: "pccb-2024-25",
    title: "PCCB recoveries presented to the President, 2024/25",
    titleSw: "Marejesho ya PCCB yaliyowasilishwa kwa Rais, 2024/25",
    period: "2024/25",
    amountKes: 14_500_000_000,
    kind: "recovered",
    office: "Prevention and Combating of Corruption Bureau",
    officeSw: "Ofisi ya Kuzuia na Kupambana na Rushwa",
    summary:
      "PCCB told State House it recovered TZS 14.5 billion in 2024/25: TZS 10.1 billion cash returned to government institutions and TZS 4.4 billion in assets redirected to development work. A later TZS 101.8 billion 'saved' figure (July 2025–February 2026) is not treated as cash recovered here.",
    summarySw:
      "PCCB ilimwambia Rais ilirejesha TSh 14.5 bilioni mwaka 2024/25: TSh 10.1B taslimu kwa taasisi za serikali na TSh 4.4B mali zilizoelekezwa kwenye maendeleo. TSh 101.8B 'zilizookolewa' baadaye hazihesabiwi hapa kama taslimu iliyorejeshwa.",
    sources: [
      {
        name: "Daily News (Tanzania)",
        url: "https://dailynews.co.tz/pccb-saves-14-5bn-uncovers-147-5bn-through-intensified-anti-graft-operations/",
        published: "2026-03-30",
        what: "PCCB 2024/25 report to the President: TZS 14.5B recovered.",
      },
    ],
  },
];

const UG: RecoveredItem[] = [
  {
    id: "igg-2025-h2",
    title: "IGG recoveries, July 2025–February 2026",
    titleSw: "Marejesho ya IGG, Julai 2025–Februari 2026",
    period: "2025 H2",
    amountKes: 2_411_599_875,
    kind: "recovered",
    office: "Inspectorate of Government",
    officeSw: "Ofisi ya Mkaguzi Mkuu wa Serikali",
    summary:
      "The Inspector General of Government reported UGX 2,411,599,875 recovered in misappropriated funds over six months, plus a smaller January–February 2026 top-up. UGX 844 million paid as delayed salaries and pensions is not listed as a corruption recovery.",
    summarySw:
      "Mkaguzi Mkuu wa Serikali aliripoti USh 2,411,599,875 zilizorejeshwa kama pesa zilizotumiwa vibaya katika miezi sita. USh 844 milioni za mishahara na pensheni zilizochelewa si marejesho ya ufisadi.",
    sources: [
      {
        name: "Daily Monitor",
        url: "https://www.monitor.co.ug/uganda/news/national/igg-recovers-shs2-4b-concludes-308-corruption-cases-in-six-months-5380918",
        published: "2026-03-05",
        what: "IGG: UGX 2.41B recovered in misappropriated funds.",
      },
      {
        name: "Inspectorate of Government",
        url: "https://www.igg.go.ug/",
        published: "2026-03-05",
        what: "Official briefing figures, July 2025–February 2026.",
      },
    ],
  },
];

const GH: RecoveredItem[] = [
  {
    id: "osp-impact",
    title: "Office of the Special Prosecutor — assets recovered",
    titleSw: "Ofisi ya Mwendesha Mashtaka Maalum — mali zilizorejeshwa",
    period: "to 2025",
    amountKes: 32_810_000,
    kind: "recovered",
    office: "Office of the Special Prosecutor",
    officeSw: "Ofisi ya Mwendesha Mashtaka Maalum",
    summary:
      "OSP publishes GHS 32.81 million recovered on its impact dashboard. GHS 6.84 billion listed as 'savings' (suspended or stopped deals) is not cash recovered and is not in this list.",
    summarySw:
      "OSP inachapisha GH₵ 32.81 milioni zilizorejeshwa kwenye dashibodi yake. GH₵ 6.84 bilioni kama 'akiba' (mikataba iliyosimamishwa) si taslimu iliyorejeshwa.",
    sources: [
      {
        name: "Office of the Special Prosecutor",
        url: "https://osp.gov.gh/media_center/impact",
        published: "2025",
        what: "Impact dashboard: GHS 32.81 million recovered.",
      },
    ],
  },
];

const MW: RecoveredItem[] = [
  {
    id: "mphwiyo-house-2024",
    title: "Cashgate — Mphwiyo house forfeited",
    titleSw: "Cashgate — nyumba ya Mphwiyo ilichukuliwa",
    period: "2024-12",
    amountKes: 690_000_000,
    kind: "forfeited",
    office: "Anti-Corruption Bureau / Director of Public Prosecutions",
    officeSw: "Ofisi ya Kupambana na Ufisadi / DPP",
    summary:
      "Malawi’s Supreme Court of Appeal upheld forfeiture of a house valued at about MK 690 million that had been posted as bail by former budget director Paul Mphwiyo. A house forfeiture is recorded. It is not the Cashgate loss returned.",
    summarySw:
      "Mahakama Kuu ya Rufaa ya Malawi ilithibitisha kuchukuliwa kwa nyumba ya takriban MK 690 milioni iliyowekwa dhamana na Paul Mphwiyo. Kuchukuliwa nyumba kumeandikwa. Si hasara yote ya Cashgate iliyorejeshwa.",
    sources: [
      {
        name: "Basel Institute on Governance",
        url: "https://baselgovernance.org/news/malawi-recovers-cashgate-property-using-non-conviction-based-forfeiture",
        published: "2024-12-12",
        what: "Supreme Court upheld MK 690m house forfeiture, 6 December 2024.",
      },
    ],
  },
];

const EMPTY: RecoveredItem[] = [];

export const RECOVERED: Record<CountryId, RecoveredItem[]> = {
  ke: KE,
  tz: TZ,
  ug: UG,
  gh: GH,
  sn: EMPTY,
  tg: EMPTY,
  zm: EMPTY,
  mw: MW,
};

export function recoveredItems(country: CountryId): RecoveredItem[] {
  return RECOVERED[country] ?? EMPTY;
}

export function recoveredStock(country: CountryId): number {
  return recoveredItems(country).reduce((n, item) => n + item.amountKes, 0);
}
