import type { CountryId } from "./country";
import type { Lang } from "./types";

type Flat = Record<string, string>;

function overlay(en: Flat, sw: Flat = {}, fr: Flat = {}): Record<Lang, Flat> {
  return { en, sw, fr };
}

const UG_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Uganda — Auditor General queries, IGG files, and court records — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Ugandan audit problems. Not live official totals.",
  demoShort: "Demo composite · not live IFMS",
  how1: "Pick a district, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Auditor General, IGG, your councillor, or file an Access to Information request. The page tells you what to attach.",
  whyBody:
    "Uganda already publishes budgets and Auditor General reports. The gap is not another PDF. The gap is a person in Kawempe who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Uganda sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by district, sector, or status. Every figure names a source.",
  allCounties: "All districts",
  colCounty: "District",
  search: "Search ward, project, contractor",
  actIntro:
    "Information that does not change a file is decoration. Use these offices. Cite the Access to Information Act, 2005. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from OAG and MoFPED is the next build, not a fake API.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot. Arabic and Portuguese are the next packs.",
  bountyPickCounty: "Pick a district",
  bountySearchPh: "Search title, district, poster",
  bountyCredit: "This browser starts with UGX 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (UGX)",
  bountyMin: "Minimum UGX 500.",
  bountyHow3: "Lock the reward in escrow. Minimum UGX 500. You cannot pull it while the bounty is live.",
  tourCountyPick: "Select a district",
  tourHow1: "Name the district, the projects, what you are investigating, and the budget. No account.",
  tourCounty: "District",
  tourBudget: "Tour budget (UGX)",
  tourMin: "Minimum UGX 2,000.",
  analyticsCounty: "Ghost money by district",
  aboutKicker: "Citizen audit · UG",
  aboutLead: "Exposing Uganda's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Uganda, on the same ledger as Kenya and Tanzania.",
  aboutBuiltBody:
    "Kiswahili and English. Low data. Made to open on a mid-range phone in a ward, a market, or a taxi — not as another PDF portal.",
  sourcesCredit:
    "Sources: Office of the Auditor General (Uganda), IGG, court records, and citizen visits on this ledger.",
  recordIntro:
    "Auditor General reports, IGG files, court rulings, and citizen visits on this ledger. Numbers move when a new audit lands, a court rules, or someone stamps a site as not found.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: OAG Uganda, IGG, Access to Information Act 2005, court records. Trust: every shilling is dated and linked; demo ward rows are labelled; national clock items name a source; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, permanent secretary, councillor, contractor — as on the paper",
  clockDisclaimer:
    "Conservative compilation of unresolved Auditor General queries and court records.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled. Debt and missing money are different questions.",
};

const GH_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Ghana — Audit Service reports, CHRAJ files, and published audits — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Ghanaian audit problems. Not live official totals.",
  demoShort: "Demo composite · not live GIFMIS",
  how1: "Pick a region, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Auditor-General, CHRAJ, your assembly member, or file a Right to Information request. The page tells you what to attach.",
  whyBody:
    "Ghana already publishes budgets and Audit Service reports. The gap is not another PDF. The gap is a person in Ablekuma who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Ghana sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by region, sector, or status. Every figure names a source.",
  allCounties: "All regions",
  colCounty: "Region",
  search: "Search ward, project, contractor",
  actIntro:
    "Information that does not change a file is decoration. Use these offices. Cite the Right to Information Act, 2019. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from the Audit Service is the next build, not a fake API.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot.",
  bountyPickCounty: "Pick a region",
  bountySearchPh: "Search title, region, poster",
  bountyCredit: "This browser starts with GH₵ 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (GHS)",
  bountyMin: "Minimum GH₵ 500.",
  bountyHow3: "Lock the reward in escrow. Minimum GH₵ 500. You cannot pull it while the bounty is live.",
  tourCountyPick: "Select a region",
  tourHow1: "Name the region, the projects, what you are investigating, and the budget. No account.",
  tourCounty: "Region",
  tourBudget: "Tour budget (GHS)",
  tourMin: "Minimum GH₵ 2,000.",
  analyticsCounty: "Ghost money by region",
  aboutKicker: "Citizen audit · GH",
  aboutLead: "Exposing Ghana's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Ghana, on the same ledger as the East African pilot.",
  aboutBuiltBody:
    "English. Low data. Made to open on a mid-range phone in a ward, a market, or a trotro — not as another PDF portal.",
  sourcesCredit:
    "Sources: Ghana Audit Service, CHRAJ, published audits, and citizen visits on this ledger.",
  recordIntro:
    "Audit Service reports, published audits, and citizen visits on this ledger. Numbers move when a new audit lands or someone stamps a site as not found.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: Ghana Audit Service, CHRAJ, Right to Information Act 2019. Trust: every cedi is dated and linked; demo rows are labelled; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, chief director, assembly member, contractor — as on the paper",
  clockDisclaimer: "Conservative compilation of unresolved Audit Service queries and published audits.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled. Debt and missing money are different questions.",
  dismissedTitle: "Not in this clock: GYEEDA contract envelope and SSNIT locked investments",
};

const SN_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Senegal — Cour des comptes, OFNAC files, and published investigations — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Senegalese audit problems. Not live official totals.",
  demoShort: "Demo composite · not live SIGFIP",
  how1: "Pick a region, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Cour des comptes, OFNAC, your councillor, or file an information request. The page tells you what to attach.",
  whyBody:
    "Senegal already publishes budgets and Court of Accounts reports. The gap is not another PDF. The gap is a person in Pikine who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Senegal sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by region, sector, or status. Every figure names a source.",
  allCounties: "All regions",
  colCounty: "Region",
  search: "Search ward, project, contractor",
  actIntro:
    "Information that does not change a file is decoration. Use these offices. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from the Cour des comptes is the next build, not a fake API.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot. French ships here.",
  bountyPickCounty: "Pick a region",
  bountySearchPh: "Search title, region, poster",
  bountyCredit: "This browser starts with F CFA 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (F CFA)",
  bountyMin: "Minimum F CFA 500.",
  bountyHow3: "Lock the reward in escrow. Minimum F CFA 500. You cannot pull it while the bounty is live.",
  tourCountyPick: "Select a region",
  tourHow1: "Name the region, the projects, what you are investigating, and the budget. No account.",
  tourCounty: "Region",
  tourBudget: "Tour budget (F CFA)",
  tourMin: "Minimum F CFA 2,000.",
  analyticsCounty: "Ghost money by region",
  aboutKicker: "Citizen audit · SN",
  aboutLead: "Exposing Senegal's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Senegal, on the same ledger as the East African pilot.",
  aboutBuiltBody:
    "French and English. Low data. Made to open on a mid-range phone in a ward, a market, or a car rapide — not as another PDF portal.",
  sourcesCredit: "Sources: Cour des comptes du Sénégal, OFNAC, OCCRP, and citizen visits on this ledger.",
  recordIntro:
    "Cour des comptes reports, OFNAC files, published investigations, and citizen visits on this ledger. Numbers move when a new audit lands or someone stamps a site as not found.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: Cour des comptes, OFNAC. Trust: every franc is dated and linked; demo rows are labelled; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, director, councillor, contractor — as on the paper",
  clockDisclaimer:
    "Conservative compilation. Disputed Petro-Tim figures and untraced PETROSEN gaps stay out of the clock.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled. Debt and missing money are different questions.",
  dismissedTitle: "Not in this clock: restated public-debt figures 2019–2024",
};

const SN_FR: Flat = {
  heroBody:
    "Une horloge en direct de l'argent public non justifié au Sénégal — Cour des comptes, dossiers OFNAC, enquêtes publiées — plus ce que les citoyens confirment sur ce registre. Chaque chiffre nomme une source. Une mise en cause n'est pas une condamnation.",
  demo: "Registres de démonstration, calqués sur des problèmes d'audit sénégalais publiés. Pas des totaux officiels en direct.",
  demoShort: "Composite démo · pas SIGFIP en direct",
  how1: "Choisissez une région, un quartier, un exercice. Voyez ce qui a été alloué et ce qui a été payé.",
  how4:
    "Écrivez à la Cour des comptes, à l'OFNAC, à votre conseiller, ou demandez l'accès au dossier. La page dit quoi joindre.",
  whyBody:
    "Le Sénégal publie déjà des budgets et des rapports de la Cour des comptes. Le manque n'est pas un autre PDF. Le manque, c'est une personne à Pikine qui peut prouver que le réservoir n'a jamais été soudé à la dalle.",
  footer:
    "GhostLedger est une preuve de concept civique pour le sprint OSF d'accès à l'information. Le Sénégal est sur le pilote africain de huit pays. Changez de pays. Gardez la question.",
  ledgerIntro: "Filtrez par région, secteur ou statut. Chaque chiffre nomme une source.",
  allCounties: "Toutes les régions",
  colCounty: "Région",
  search: "Chercher quartier, projet, entrepreneur",
  actIntro:
    "Une information qui ne change pas un dossier est de la décoration. Utilisez ces bureaux. Joignez le hash de votre constat.",
  methodIntro:
    "Chaque chiffre sur GhostLedger doit pouvoir être vérifié. Cette preuve de concept utilise des lignes illustratives. L'ingestion en direct de la Cour des comptes est le prochain chantier, pas une fausse API.",
  scaleBody:
    "L'unité de travail est une ligne budgétaire sourcée, un constat GPS, et une démarche officielle. Huit pays africains dans ce pilote. Le français est ici.",
  bountyPickCounty: "Choisir une région",
  bountySearchPh: "Chercher titre, région, auteur",
  bountyCredit: "Ce navigateur démarre avec 50 000 F CFA de crédit démo. Pas d'argent réel.",
  bountyReward: "Récompense (F CFA)",
  bountyMin: "Minimum 500 F CFA.",
  bountyHow3: "Verrouillez la récompense. Minimum 500 F CFA. Vous ne pouvez pas la retirer tant que la prime est ouverte.",
  tourCountyPick: "Sélectionner une région",
  tourHow1: "Nommez la région, les projets, l'enquête, et le budget. Pas de compte.",
  tourCounty: "Région",
  tourBudget: "Budget de tournée (F CFA)",
  tourMin: "Minimum 2 000 F CFA.",
  analyticsCounty: "Argent fantôme par région",
  aboutKicker: "Audit citoyen · SN",
  aboutLead: "Exposer les projets vampires du Sénégal et les fonds publics volés.",
  aboutBuilt: "Fait pour le Sénégal, sur le même registre que le pilote est-africain.",
  aboutBuiltBody:
    "Français et anglais. Faible débit. Conçu pour s'ouvrir sur un téléphone moyen dans un quartier, un marché, ou un car rapide — pas comme un autre portail PDF.",
  sourcesCredit: "Sources : Cour des comptes du Sénégal, OFNAC, OCCRP, et visites citoyennes sur ce registre.",
  recordIntro:
    "Rapports de la Cour des comptes, dossiers OFNAC, enquêtes publiées, et visites citoyennes. Les chiffres bougent quand un audit arrive ou qu'un site est tamponné introuvable.",
  judgesBody:
    "Piste : transparence et responsabilité, avec un chemin sûr pour le signalement anonyme. Sources : Cour des comptes, OFNAC. Confiance : chaque franc est daté et lié ; les lignes démo sont marquées ; les hash sont des préfixes SHA-256 calculés sur le téléphone ; les photos ne quittent pas l'appareil.",
  namedRolePh: "Ministre, directeur, conseiller, entrepreneur — comme sur le papier",
  clockDisclaimer:
    "Compilation prudente. Les chiffres Petro-Tim contestés et les écarts PETROSEN restent hors horloge.",
  adminNote:
    "Emprunté, pas volé. Les accroissements de dette publique par administration ne sont pas listés ici tant qu'une série sourcée n'est pas compilée. Dette et argent manquant sont des questions différentes.",
  dismissedTitle: "Hors horloge : dette publique retraitée 2019–2024",
  lang: "English",
  aboutSlogan1: "Notre argent.",
  aboutSlogan2: "Notre avenir.",
  aboutSlogan3: "Notre nation.",
};

const TG_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Togo — Cour des comptes and HAPLUCIA files — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Togolese audit problems. Not live official totals.",
  demoShort: "Demo composite · not live SIGFIP",
  how1: "Pick a region, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Cour des comptes, HAPLUCIA, your councillor, or file an information request. The page tells you what to attach.",
  whyBody:
    "Togo already publishes some audit papers. The gap is not another PDF. The gap is a person in Agoè who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Togo sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by region, sector, or status. Every figure names a source.",
  allCounties: "All regions",
  colCounty: "Region",
  actIntro: "Information that does not change a file is decoration. Use these offices. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. National loss totals for Togo are not yet compiled into this clock; demo projects still sit on the ledger. Live ingest is the next build.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot. French ships here.",
  bountyPickCounty: "Pick a region",
  bountySearchPh: "Search title, region, poster",
  bountyCredit: "This browser starts with F CFA 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (F CFA)",
  bountyMin: "Minimum F CFA 500.",
  tourCountyPick: "Select a region",
  tourCounty: "Region",
  tourBudget: "Tour budget (F CFA)",
  tourMin: "Minimum F CFA 2,000.",
  analyticsCounty: "Ghost money by region",
  aboutKicker: "Citizen audit · TG",
  aboutLead: "Exposing Togo's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Togo, on the same ledger as the East African pilot.",
  aboutBuiltBody:
    "French and English. Low data. Made to open on a mid-range phone in a ward or a market — not as another PDF portal.",
  sourcesCredit: "Sources: Cour des comptes du Togo, HAPLUCIA, and citizen visits on this ledger.",
  recordIntro:
    "Cour des comptes reports, HAPLUCIA files, and citizen visits on this ledger. The national clock stays conservative: a COVID fund envelope and a petty-corruption estimate are not clocked as missing cash.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: Cour des comptes, HAPLUCIA. Trust: demo rows are labelled; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, director, councillor, contractor — as on the paper",
  clockDisclaimer:
    "Conservative compilation. The COVID response fund size and HAPLUCIA petty-corruption estimates stay out of the clock.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled.",
  dismissedTitle: "Not in this clock: COVID fund envelope and HAPLUCIA estimates",
};

const TG_FR: Flat = {
  heroBody:
    "Une horloge en direct de l'argent public non justifié au Togo — Cour des comptes et HAPLUCIA — plus ce que les citoyens confirment sur ce registre. Chaque chiffre nomme une source. Une mise en cause n'est pas une condamnation.",
  demo: "Registres de démonstration, calqués sur des problèmes d'audit togolais publiés. Pas des totaux officiels en direct.",
  demoShort: "Composite démo · pas SIGFIP en direct",
  how1: "Choisissez une région, un quartier, un exercice. Voyez ce qui a été alloué et ce qui a été payé.",
  how4:
    "Écrivez à la Cour des comptes, à HAPLUCIA, à votre conseiller, ou demandez le dossier. La page dit quoi joindre.",
  whyBody:
    "Le Togo publie déjà certains papiers d'audit. Le manque n'est pas un autre PDF. Le manque, c'est une personne à Agoè qui peut prouver que le réservoir n'a jamais été soudé à la dalle.",
  footer:
    "GhostLedger est une preuve de concept civique pour le sprint OSF. Le Togo est sur le pilote africain de huit pays. Changez de pays. Gardez la question.",
  ledgerIntro: "Filtrez par région, secteur ou statut. Chaque chiffre nomme une source.",
  allCounties: "Toutes les régions",
  colCounty: "Région",
  actIntro: "Une information qui ne change pas un dossier est de la décoration. Utilisez ces bureaux. Joignez le hash.",
  methodIntro:
    "Chaque chiffre doit pouvoir être vérifié. Les totaux nationaux de perte pour le Togo ne sont pas encore compilés dans cette horloge ; les projets démo restent sur le registre.",
  bountyPickCounty: "Choisir une région",
  bountyCredit: "Ce navigateur démarre avec 50 000 F CFA de crédit démo. Pas d'argent réel.",
  bountyReward: "Récompense (F CFA)",
  tourCounty: "Région",
  tourBudget: "Budget de tournée (F CFA)",
  analyticsCounty: "Argent fantôme par région",
  aboutKicker: "Audit citoyen · TG",
  aboutLead: "Exposer les projets vampires du Togo et les fonds publics volés.",
  aboutBuilt: "Fait pour le Togo, sur le même registre que le pilote est-africain.",
  aboutBuiltBody:
    "Français et anglais. Faible débit. Conçu pour s'ouvrir sur un téléphone moyen dans un quartier ou un marché.",
  sourcesCredit: "Sources : Cour des comptes du Togo, HAPLUCIA, et visites citoyennes sur ce registre.",
  recordIntro:
    "Rapports de la Cour des comptes, dossiers HAPLUCIA, et visites citoyennes. L'horloge nationale reste prudente : l'enveloppe COVID et une estimation de petite corruption ne sont pas comptées comme de l'argent disparu.",
  clockDisclaimer:
    "Compilation prudente. L'enveloppe du fonds COVID et les estimations HAPLUCIA restent hors horloge.",
  dismissedTitle: "Hors horloge : enveloppe COVID et estimations HAPLUCIA",
  lang: "English",
  aboutSlogan1: "Notre argent.",
  aboutSlogan2: "Notre avenir.",
  aboutSlogan3: "Notre nation.",
};

const ZM_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Zambia — Auditor-General queries and ACC files — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Zambian audit problems. Not live official totals.",
  demoShort: "Demo composite · not live IFMIS",
  how1: "Pick a province, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Auditor-General, ACC, your councillor, or file an Access to Information request. The page tells you what to attach.",
  whyBody:
    "Zambia already publishes Auditor-General reports. The gap is not another PDF. The gap is a person in Kanyama who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Zambia sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by province, sector, or status. Every figure names a source.",
  allCounties: "All provinces",
  colCounty: "Province",
  search: "Search ward, project, contractor",
  actIntro:
    "Information that does not change a file is decoration. Use these offices. Cite the Access to Information Act, 2013. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from the Auditor-General is the next build, not a fake API.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot.",
  bountyPickCounty: "Pick a province",
  bountySearchPh: "Search title, province, poster",
  bountyCredit: "This browser starts with K 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (ZMW)",
  bountyMin: "Minimum K 500.",
  tourCountyPick: "Select a province",
  tourCounty: "Province",
  tourBudget: "Tour budget (ZMW)",
  tourMin: "Minimum K 2,000.",
  analyticsCounty: "Ghost money by province",
  aboutKicker: "Citizen audit · ZM",
  aboutLead: "Exposing Zambia's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Zambia, on the same ledger as the East African pilot.",
  aboutBuiltBody:
    "English. Low data. Made to open on a mid-range phone in a ward, a market, or a minibus — not as another PDF portal.",
  sourcesCredit: "Sources: Office of the Auditor General (Zambia), ACC, and citizen visits on this ledger.",
  recordIntro:
    "Auditor-General reports, ACC files, and citizen visits on this ledger. Numbers move when a new audit lands or someone stamps a site as not found.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: Auditor-General Zambia, ACC, Access to Information Act 2013. Trust: every kwacha is dated and linked; demo rows are labelled; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, permanent secretary, councillor, contractor — as on the paper",
  clockDisclaimer: "Conservative compilation of unresolved Auditor-General queries and ACC files.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled.",
};

const MW_EN: Flat = {
  heroBody:
    "A live clock of documented unaccounted public money in Malawi — National Audit Office, Cashgate forensic files, and court records — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
  demo: "Demo records, patterned on published Malawian audit problems. Not live official totals.",
  demoShort: "Demo composite · not live IFMIS",
  how1: "Pick a district, a ward, a financial year. See what was allocated and what was paid.",
  how4:
    "Write the Auditor General, ACB, your councillor, or file an Access to Information request. The page tells you what to attach.",
  whyBody:
    "Malawi already publishes audit and court papers. The gap is not another PDF. The gap is a person in Lilongwe who can prove the tank was never welded to the slab.",
  footer:
    "GhostLedger is a civic proof of concept for the OSF information-access sprint. Malawi sits on the eight-country African pilot. Swap the country. Keep the question.",
  ledgerIntro: "Filter by district, sector, or status. Every figure names a source.",
  allCounties: "All districts",
  colCounty: "District",
  search: "Search ward, project, contractor",
  actIntro:
    "Information that does not change a file is decoration. Use these offices. Cite the Access to Information Act, 2017. Attach the hash from your observation.",
  methodIntro:
    "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from NAO Malawi is the next build, not a fake API.",
  scaleBody:
    "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot.",
  bountyPickCounty: "Pick a district",
  bountySearchPh: "Search title, district, poster",
  bountyCredit: "This browser starts with MK 50,000 demo credit. Not live cash.",
  bountyReward: "Reward (MWK)",
  bountyMin: "Minimum MK 500.",
  tourCountyPick: "Select a district",
  tourCounty: "District",
  tourBudget: "Tour budget (MWK)",
  tourMin: "Minimum MK 2,000.",
  analyticsCounty: "Ghost money by district",
  aboutKicker: "Citizen audit · MW",
  aboutLead: "Exposing Malawi's vampire projects and stolen public funds.",
  aboutBuilt: "Built for Malawi, on the same ledger as the East African pilot.",
  aboutBuiltBody:
    "English. Low data. Made to open on a mid-range phone in a ward, a market, or a minibus — not as another PDF portal.",
  sourcesCredit:
    "Sources: National Audit Office (Malawi), Baker Tilly Cashgate audit, High Court, ACB, and citizen visits on this ledger.",
  recordIntro:
    "National Audit Office reports, Cashgate forensic files, court rulings, and citizen visits on this ledger. Numbers move when a new audit lands, a court rules, or someone stamps a site as not found.",
  judgesBody:
    "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: NAO Malawi, Baker Tilly, High Court, Access to Information Act 2017. Trust: every kwacha is dated and linked; demo rows are labelled; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
  namedRolePh: "Minister, principal secretary, councillor, contractor — as on the paper",
  clockDisclaimer: "Conservative compilation of unresolved forensic totals and court records. A conviction is recorded.",
  adminNote:
    "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled.",
};

export const overlays: Record<CountryId, Record<Lang, Flat>> = {
  ke: overlay(
    {
      footer:
        "GhostLedger is a civic proof of concept for the OSF information-access sprint. Kenya sits on the eight-country African pilot. Swap the country. Keep the question.",
      scaleBody:
        "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot: Kenya, Uganda, Tanzania; Ghana, Senegal, Togo; Zambia, Malawi. Arabic and Portuguese are the next packs.",
      constraintLocalB:
        "Laws, offices, regions, and currency follow the country you pick. Eight African countries share the menu. The record, the named list, and the next official step do not.",
      constraintLangB:
        "The country switcher sets the default language for that country. You can still toggle. Kiswahili, English, and French ship in this pilot. Arabic and Portuguese are next.",
    },
    {},
    {},
  ),
  tz: overlay(
    {
      heroBody:
        "A live clock of documented unaccounted public money in Tanzania — CAG queries, PAC papers, and court records — plus what citizens confirm on this ledger. Every figure names a source. A charge is not a conviction.",
      demo: "Demo records, patterned on published Tanzanian audit problems. Not live official totals.",
      demoShort: "Demo composite · not live MUSE",
      how1: "Pick a region, a ward, a financial year. See what was allocated and what was paid.",
      how4:
        "Write the Controller and Auditor General, PCCB, your councillor, or file an Access to Information request. The page tells you what to attach.",
      whyBody:
        "Tanzania already publishes budgets and CAG reports. The gap is not another PDF. The gap is a person in Kinondoni who can prove the tank was never welded to the slab.",
      footer:
        "GhostLedger is a civic proof of concept for the OSF information-access sprint. Tanzania sits on the eight-country African pilot. Swap the country. Keep the question.",
      ledgerIntro: "Filter by region, sector, or status. Every figure names a source.",
      allCounties: "All regions",
      colCounty: "Region",
      search: "Search ward, project, contractor",
      actIntro:
        "Information that does not change a file is decoration. Use these offices. Cite the Access to Information Act, 2016. Attach the hash from your observation.",
      methodIntro:
        "Every figure on GhostLedger should be checkable. This proof of concept uses illustrative rows so the product can be judged. Live ingest from NAOT, MoF, and PPRA is the next build, not a fake API.",
      scaleBody:
        "The unit of work is a sourced budget row plus a GPS observation plus a statutory next step. Eight African countries ship in this pilot.",
      bountyPickCounty: "Pick a region",
      bountySearchPh: "Search title, region, poster",
      bountyCredit: "This browser starts with TZS 50,000 demo credit. Not live cash.",
      bountyReward: "Reward (TZS)",
      bountyMin: "Minimum TZS 500.",
      bountyHow3:
        "Lock the reward in escrow. Minimum TZS 500. You cannot pull it while the bounty is live.",
      tourCountyPick: "Select a region",
      tourHow1: "Name the region, the projects, what you are investigating, and the budget. No account.",
      tourCounty: "Region",
      tourBudget: "Tour budget (TZS)",
      tourMin: "Minimum TZS 2,000.",
      analyticsCounty: "Ghost money by region",
      aboutKicker: "Citizen audit · TZ",
      aboutLead: "Exposing Tanzania's vampire projects and stolen public funds.",
      aboutBuilt: "Built for Tanzania, on the same ledger as Kenya.",
      aboutBuiltBody:
        "Kiswahili and English. Low data. Made to open on a mid-range phone in a ward, a market, or a daladala — not as another PDF portal.",
      sourcesCredit:
        "Sources: National Audit Office of Tanzania (CAG), PAC, court records, Ministry of Finance, PCCB, PPRA, and citizen visits on this ledger.",
      dismissedTitle: "Not in this clock: disputed Richmond / Dowans USD figures",
      recordIntro:
        "Controller and Auditor General reports, PAC papers, court rulings, Ministry of Finance publications, and citizen visits on this ledger. Numbers move when a new audit lands, a court rules, or someone stamps a site as not found.",
      judgesBody:
        "Track: Transparency & Accountability, with a safety path for anonymous reporting. Sources: National Audit Office of Tanzania, PAC, Ministry of Finance, PPRA, PCCB, Access to Information Act 2016, court records. Trust: every shilling is dated and linked; demo ward rows are labelled; national clock items name a source; hashes are SHA-256 prefixes computed on the phone; photographs never leave the device.",
      namedRolePh: "Minister, permanent secretary, councillor, contractor — as on the paper",
      clockDisclaimer:
        "Conservative compilation of unresolved commissions, Controller and Auditor General queries, and court records.",
      adminNote:
        "Borrowed, not stolen. Public-debt increments by administration are not listed here until a sourced series is compiled. Debt and missing money are different questions.",
    },
    {
      heroBody:
        "Saa hai ya pesa za umma zisizohesabiwa nchini Tanzania — maswali ya CAG, karatasi za PAC, na hukumu za mahakama — pamoja na kile wananchi wanathibitisha kwenye rejesta hii. Kila namba inataja chanzo. Shitaka si hatia.",
      demo: "Rekodi za majaribio, kufuata matatizo yaliyochapishwa ya ukaguzi nchini Tanzania. Sio jumla halisi za serikali.",
      demoShort: "Mfano · si MUSE hai",
      how1: "Chagua mkoa, kata, mwaka wa fedha. Ona yaliyogawiwa na yaliyolipwa.",
      how4:
        "Andika kwa Mdhibiti na Mkaguzi Mkuu, PCCB, diwani wako, au omba taarifa. Ukurasa unaeleza nini cha kuambatanisha.",
      whyBody:
        "Tanzania tayari inachapisha bajeti na ripoti za CAG. Pengo si PDF nyingine. Pengo ni mtu Kinondoni anayeweza kuthibitisha tanki halikuwahi kuunganishwa kwenye slab.",
      footer:
        "GhostLedger ni thibitisho la wazo la kiraia kwa mbio ya OSF ya ufikiaji wa taarifa. Tanzania iko kwenye rejesta ya nchi nane za Afrika. Badilisha nchi. Shika swali.",
      ledgerIntro: "Chuja kwa mkoa, sekta, au hali. Kila shilingi inataja chanzo.",
      allCounties: "Mikoa yote",
      colCounty: "Mkoa",
      actIntro:
        "Taarifa isiyobadilisha faili ni mapambo. Tumia ofisi hizi. Taja Sheria ya Upatikanaji wa Taarifa, 2016. Ambatanisha hash ya ushuhuda wako.",
      methodIntro:
        "Kila namba kwenye GhostLedger inapaswa kuweza kukaguliwa. Thibitisho hili linatumia mistari ya mfano ili bidhaa ihukumiwe. Uingizaji halisi kutoka NAOT, MoF, na PPRA ni ujenzi ujao, si API ya uongo.",
      scaleBody:
        "Kitengo cha kazi ni mstari wa bajeti wenye chanzo, ushuhuda wa GPS, na hatua ya kisheria. Nchi nane za Afrika zinatumika katika majaribio haya.",
      bountyPickCounty: "Chagua mkoa",
      bountySearchPh: "Tafuta kichwa, mkoa, mwenye kuweka",
      bountyCredit: "Kivinjari hiki kinaanza na TSh 50,000 za demo. Si pesa hai.",
      bountyReward: "Zawadi (TSh)",
      bountyMin: "Chini kabisa TSh 500.",
      bountyHow3:
        "Funga zawadi kwenye escrow. Chini kabisa TSh 500. Huwezi kuivuta wakati zawadi hai.",
      tourCountyPick: "Chagua mkoa",
      tourHow1: "Taja mkoa, miradi, unachochunguza, na bajeti. Hakuna akaunti.",
      tourCounty: "Mkoa",
      tourBudget: "Bajeti ya ziara (TSh)",
      tourMin: "Chini kabisa TSh 2,000.",
      analyticsCounty: "Pesa za mizimu kwa mkoa",
      aboutKicker: "Ukaguzi wa raia · TZ",
      aboutLead: "Kuweka wazi miradi ya vampire ya Tanzania na pesa za umma zilizoibwa.",
      aboutBuilt: "Imejengwa kwa Tanzania, kwenye rejesta ileile na Kenya.",
      aboutBuiltBody:
        "Kiswahili na Kiingereza. Data ndogo. Imetengenezwa kufunguka kwenye simu ya kawaida katika kata, soko, au daladala — si mlango mwingine wa PDF.",
      sourcesCredit:
        "Vyanzo: Ofisi ya Ukaguzi ya Taifa Tanzania (CAG), PAC, rekodi za mahakama, Wizara ya Fedha, PCCB, PPRA, na ziara za wananchi kwenye rejesta hii.",
      dismissedTitle: "Sio kwenye saa hii: takwimu zinazopingwa za Richmond / Dowans (USD)",
      recordIntro:
        "Ripoti za Mdhibiti na Mkaguzi Mkuu, karatasi za PAC, hukumu, Wizara ya Fedha, na ziara za wananchi kwenye rejesta hii. Namba zinabadilika ukaguzi mpya unapowasili, mahakama inapohukumu, au mtu anapopiga muhuri eneo kuwa halikupatikana.",
      judgesBody:
        "Njia: Uwazi na Uwajibikaji, na njia salama ya kuripoti bila jina. Vyanzo: Ofisi ya Ukaguzi ya Taifa, PAC, Wizara ya Fedha, PPRA, PCCB, Sheria ya Upatikanaji wa Taarifa 2016, rekodi za mahakama. Imani: kila shilingi ina tarehe na kiungo; mistari ya demo imewekwa alama; vitu vya saa ya taifa vina chanzo; hash ni SHA-256 kwenye simu; picha hazitoki kwenye kifaa.",
      namedRolePh: "Waziri, katibu mkuu, diwani, mkandarasi — kama kwenye karatasi",
      clockDisclaimer:
        "Mkusanyiko wa tahadhari wa tume zisizotatuliwa, maswali ya Mdhibiti na Mkaguzi Mkuu, na rekodi za mahakama.",
      adminNote:
        "Lililokopwa, si lililoibwa. Ongezeko la deni la umma kwa utawala halijaorodheshwa hapa hadi mfululizo wenye vyanzo ukusanywe. Deni na pesa zinazokosekana ni maswali tofauti.",
    },
  ),
  ug: overlay(UG_EN, {
    heroBody:
      "Saa hai ya pesa za umma zisizohesabiwa nchini Uganda — maswali ya Mkaguzi Mkuu, faili za IGG, na rekodi za mahakama — pamoja na kile wananchi wanathibitisha kwenye rejesta hii. Kila namba inataja chanzo. Shitaka si hatia.",
    demo: "Rekodi za majaribio, kufuata matatizo yaliyochapishwa ya ukaguzi nchini Uganda. Sio jumla halisi.",
    demoShort: "Mfano · si IFMS hai",
    how1: "Chagua wilaya, kata, mwaka wa fedha. Ona yaliyogawiwa na yaliyolipwa.",
    how4: "Andika kwa Mkaguzi Mkuu, IGG, diwani wako, au omba taarifa. Ukurasa unaeleza nini cha kuambatanisha.",
    allCounties: "Wilaya zote",
    colCounty: "Wilaya",
    aboutKicker: "Ukaguzi wa raia · UG",
    aboutLead: "Kuweka wazi miradi ya vampire ya Uganda na pesa za umma zilizoibwa.",
    aboutBuilt: "Imejengwa kwa Uganda, kwenye rejesta ileile na Kenya na Tanzania.",
  }),
  gh: overlay(GH_EN),
  sn: overlay(SN_EN, SN_FR, SN_FR),
  tg: overlay(TG_EN, TG_FR, TG_FR),
  zm: overlay(ZM_EN),
  mw: overlay(MW_EN),
};
