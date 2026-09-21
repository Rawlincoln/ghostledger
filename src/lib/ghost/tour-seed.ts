import { SEED_TOUR_LOGGER, SEED_TOUR_PLANNER } from "./tour-types";
import type { CountryId } from "./types";

type SeedVisit = {
  logger: string;
  name: string;
  projectSlug: string | null;
  findings: string;
  videoUrl: string;
  status: "pending" | "accepted" | "rejected";
};

export type SeedTour = {
  slug: string;
  plannerName: string;
  title: string;
  titleSw: string;
  investigation: string;
  county: string;
  country?: CountryId;
  projectSlugs: string[];
  budgetKes: number;
  status: "open" | "paid" | "closed";
  days: number;
  visits: SeedVisit[];
};

export const SEED_TOURS: SeedTour[] = [
  {
    slug: "western-water-audit",
    plannerName: "Civic desk · Kakamega",
    title: "Western water audit: Lurambi grade-stop and Kitui scrape",
    titleSw: "Ukaguzi wa maji magharibi: paisho Lurambi na kina Kitui",
    investigation:
      "Paper says gravel and an earth dam were paid in full. Walk both sites. Film where the grade ends and whether the dam has a spillway. This is a public alignment, not a private compound.",
    county: "Kakamega",
    projectSlugs: ["lurambi-feeder-road", "kitui-earth-dam"],
    budgetKes: 25_000,
    status: "open",
    days: 14,
    visits: [
      {
        logger: SEED_TOUR_LOGGER,
        name: "Monitor 04",
        projectSlug: "lurambi-feeder-road",
        findings:
          "Grade ends at 700 m. Culvert rings in the grass. Public footpath after the first drift. Video from the market junction.",
        videoUrl: "https://www.youtube.com/watch?v=ghostledger-demo-01",
        status: "pending",
      },
    ],
  },
  {
    slug: "nairobi-after-dark",
    plannerName: "Market lane committee",
    title: "Nairobi after dark: Kayole lamps and Lang'ata borehole pad",
    titleSw: "Nairobi baada ya giza: taa Kayole na slab ya kisima Lang'ata",
    investigation:
      "Count standing poles on Kayole Lot B after dark. Then the Lang'ata Phase II pad: pump and tank, or slab only. Film both. No faces.",
    county: "Nairobi",
    projectSlugs: ["kayole-lighting-b", "langata-borehole-ii"],
    budgetKes: 18_000,
    status: "open",
    days: 10,
    visits: [],
  },
  {
    slug: "turkana-empty-plot",
    plannerName: "Health watch · Turkana",
    title: "Kakuma staff houses: empty plot or foundations",
    titleSw: "Nyumba za Kakuma: kiwanja tupu au misingi",
    investigation:
      "Four units certified complete. Neighbours say the contractor never camped. Need GPS at the plot beside the clinic and a walk-around video.",
    county: "Turkana",
    projectSlugs: ["kakuma-staff-houses"],
    budgetKes: 15_000,
    status: "open",
    days: 12,
    visits: [],
  },
  {
    slug: "coast-sanitation-run",
    plannerName: "Coast education desk",
    title: "Coast sanitation run: Malindi block and Likoni ECD tank",
    titleSw: "Ziara ya usafi pwani: kizuizi Malindi na tanki ECD Likoni",
    investigation:
      "Are the Malindi doors on? Is the Likoni tank still on the slab? Two stops, one public trail. Film roofs, doors, tank. No children's faces.",
    county: "Kilifi",
    projectSlugs: ["malindi-sanitation-block", "likoni-ecd-classrooms"],
    budgetKes: 12_000,
    status: "paid",
    days: -18,
    visits: [
      {
        logger: "seed-hunter-e",
        name: "Monitor 02",
        projectSlug: "malindi-sanitation-block",
        findings:
          "Doors off. Roof sheets partly on. Pit unlined. Likoni tank still on the slab; building in the timetable. Video of both stops.",
        videoUrl: "https://www.youtube.com/watch?v=ghostledger-demo-01",
        status: "accepted",
      },
    ],
  },
  {
    slug: "dar-water-and-drain",
    plannerName: "Civic desk · Kinondoni",
    title: "Dar audit: Kinondoni pad and Ilala open trench",
    titleSw: "Ukaguzi Dar: slab Kinondoni na mtaro Ilala",
    investigation:
      "Paper says a borehole and a covered drain were paid in full. Walk both sites. Film the pad and the market lane. Public alignment only. No faces.",
    county: "Dar es Salaam",
    country: "tz",
    projectSlugs: ["kinondoni-borehole-ii", "ilala-drainage-lot-c"],
    budgetKes: 22_000,
    status: "open",
    days: 14,
    visits: [],
  },
  {
    slug: "arusha-after-dark",
    plannerName: "Market lane committee · Sekei",
    title: "Arusha after dark: Lot B lamps",
    titleSw: "Arusha baada ya giza: taa za Kundi B",
    investigation:
      "Count standing poles after dusk. Film the market lane. No faces.",
    county: "Arusha",
    country: "tz",
    projectSlugs: ["arusha-street-lighting"],
    budgetKes: 14_000,
    status: "open",
    days: 10,
    visits: [],
  },
  {
    slug: "kampala-water-audit",
    plannerName: "Civic desk · Kawempe",
    title: "Kampala audit: Kawempe pad",
    titleSw: "Ukaguzi Kampala: slab Kawempe",
    investigation:
      "Paper says a borehole was paid in full. Walk the site. Film the pad. Public alignment only. No faces.",
    county: "Kampala",
    country: "ug",
    projectSlugs: ["kawempe-borehole-ii"],
    budgetKes: 18_000,
    status: "open",
    days: 12,
    visits: [],
  },
  {
    slug: "accra-water-audit",
    plannerName: "Civic desk · Ablekuma",
    title: "Accra audit: Ablekuma borehole pad",
    titleSw: "Accra audit: Ablekuma borehole pad",
    investigation: "Walk the plot. Film the pad. Public alignment only. No faces.",
    county: "Greater Accra",
    country: "gh",
    projectSlugs: ["ablekuma-borehole"],
    budgetKes: 12_000,
    status: "open",
    days: 12,
    visits: [],
  },
  {
    slug: "dakar-forage-audit",
    plannerName: "Bureau civique · Pikine",
    title: "Audit Dakar : forage de Pikine",
    titleSw: "Audit Dakar : forage de Pikine",
    investigation: "Le papier dit terminé. Filmer la dalle. Alignement public seulement. Pas de visages.",
    county: "Dakar",
    country: "sn",
    projectSlugs: ["pikine-forage"],
    budgetKes: 400_000,
    status: "open",
    days: 12,
    visits: [],
  },
  {
    slug: "lome-forage-audit",
    plannerName: "Bureau civique · Agoè",
    title: "Audit Lomé : forage d'Agoè",
    titleSw: "Audit Lomé : forage d'Agoè",
    investigation: "Filmer la dalle. Alignement public. Pas de visages.",
    county: "Maritime",
    country: "tg",
    projectSlugs: ["agoe-forage"],
    budgetKes: 300_000,
    status: "open",
    days: 10,
    visits: [],
  },
  {
    slug: "lusaka-water-audit",
    plannerName: "Civic desk · Kanyama",
    title: "Lusaka audit: Kanyama borehole",
    titleSw: "Lusaka audit: Kanyama borehole",
    investigation: "Walk the plot. Film the pad. Public alignment only. No faces.",
    county: "Lusaka",
    country: "zm",
    projectSlugs: ["kanyama-borehole"],
    budgetKes: 8_000,
    status: "open",
    days: 12,
    visits: [],
  },
  {
    slug: "lilongwe-water-audit",
    plannerName: "Civic desk · Lilongwe",
    title: "Lilongwe audit: borehole pad",
    titleSw: "Lilongwe audit: borehole pad",
    investigation: "Walk the plot. Film the pad. Public alignment only. No faces.",
    county: "Lilongwe",
    country: "mw",
    projectSlugs: ["lilongwe-borehole"],
    budgetKes: 400_000,
    status: "open",
    days: 12,
    visits: [],
  },
];

export { SEED_TOUR_PLANNER };
