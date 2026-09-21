import type { CountryId } from "./country";

export type ActOffice = {
  name: string;
  url: string;
  contact: string;
  en: string;
  sw: string;
  fr?: string;
};

export const ACT_OFFICES: Record<CountryId, ActOffice[]> = {
  ke: [
    {
      name: "Office of the Auditor-General",
      url: "https://www.oagkenya.go.ke/",
      contact: "info@oagkenya.go.ke",
      en: "Ask for the site to be included in the next county audit. Attach the project name, financial year, GPS, and your observation hash.",
      sw: "Omba eneo liingizwe katika ukaguzi ujao wa kaunti. Ambatanisha jina la mradi, mwaka wa fedha, GPS, na hash ya ushuhuda.",
    },
    {
      name: "Ethics and Anti-Corruption Commission",
      url: "https://eacc.go.ke/",
      contact: "report@eacc.go.ke · 1551",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw. Do not include rumours or names of private people.",
      sw: "Tumia hii pesa inapoonekana kulipwa kwa kazi ambayo haikufanyika. Shika ulichoona. Usitie uvumi wala majina ya watu binafsi.",
    },
    {
      name: "Controller of Budget",
      url: "https://cob.go.ke/",
      contact: "cob.go.ke",
      en: "Quarterly implementation reports show how far disbursement has run. Quote the vote and the quarter when you write your MCA.",
      sw: "Ripoti za utekelezaji kila robo zinaonyesha malipo yamefika wapi. Taja kura na robo unapoandika kwa MCA.",
    },
    {
      name: "Access to Information Act, 2016",
      url: "https://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/AccesstoInformationActNo31of2016.pdf",
      contact: "Accounting officer of the procuring entity",
      en: "Request the contract, bills of quantities, payment certificates, and the GPS that PPRA now requires on tenders. The clock is 21 working days.",
      sw: "Omba mkataba, bili za kiasi, vyeti vya malipo, na GPS ambayo PPRA sasa inahitaji kwenye zabuni. Saa ni siku 21 za kazi.",
    },
    {
      name: "Ward Member of County Assembly",
      url: "https://www.cog.go.ke/",
      contact: "County Assembly clerk",
      en: "Table the ledger row in the ward. Ask why disbursement ran ahead of the slab, the pump, or the classroom.",
      sw: "Wasilisha mstari wa rejesta katika wadi. Uliza kwa nini malipo yalikimbia mbele ya slab, pampu, au darasa.",
    },
    {
      name: "Public Procurement Regulatory Authority",
      url: "https://www.ppra.go.ke/",
      contact: "ppra.go.ke",
      en: "From July 2025, physical works on a tender are supposed to carry GPS. If two agencies paid for one plot, that is the file to open.",
      sw: "Kuanzia Julai 2025, kazi halisi kwenye zabuni inapaswa kubeba GPS. Ikiwa mashirika mawili yalilipia kiwanja kimoja, hilo ndilo faili la kufungua.",
    },
  ],
  tz: [
    {
      name: "National Audit Office of Tanzania (CAG)",
      url: "https://www.nao.go.tz/",
      contact: "nao.go.tz",
      en: "Ask for the site to be included in the next LGA audit. Attach the project name, financial year, GPS, and your observation hash.",
      sw: "Omba eneo liingizwe katika ukaguzi ujao wa serikali za mitaa. Ambatanisha jina la mradi, mwaka wa fedha, GPS, na hash ya ushuhuda.",
    },
    {
      name: "Prevention and Combating of Corruption Bureau",
      url: "https://www.pccb.go.tz/",
      contact: "pccb.go.tz · 113",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw. Do not include rumours or names of private people.",
      sw: "Tumia hii pesa inapoonekana kulipwa kwa kazi ambayo haikufanyika. Shika ulichoona. Usitie uvumi wala majina ya watu binafsi.",
    },
    {
      name: "Ministry of Finance",
      url: "https://www.mof.go.tz/",
      contact: "mof.go.tz",
      en: "Budget documents and implementation papers. Quote the vote when you write your councillor or the accounting officer.",
      sw: "Nyaraka za bajeti na utekelezaji. Taja kura unapoandika kwa diwani au afisa mhasibu.",
    },
    {
      name: "Access to Information Act, 2016 (Tanzania)",
      url: "https://www.chragg.go.tz/",
      contact: "Accounting officer of the LGA or ministry · CHRAGG for appeals",
      en: "Request the contract, bills of quantities, payment certificates, and GPS. The clock is 30 days. Appeal to CHRAGG if the file does not arrive.",
      sw: "Omba mkataba, bili za kiasi, vyeti vya malipo, na GPS. Saa ni siku 30. Kera CHRAGG faili lisipofika.",
    },
    {
      name: "Ward Councillor / Local Government Authority",
      url: "https://www.tamisemi.go.tz/",
      contact: "LGA director, your ward",
      en: "Table the ledger row in the ward. Ask why disbursement ran ahead of the slab, the pump, or the classroom.",
      sw: "Wasilisha mstari wa rejesta katika kata. Uliza kwa nini malipo yalikimbia mbele ya slab, pampu, au darasa.",
    },
    {
      name: "Public Procurement Regulatory Authority (Tanzania)",
      url: "https://www.ppra.go.tz/",
      contact: "ppra.go.tz",
      en: "Physical works on a tender should be traceable. If two agencies paid for one plot, that is the file to open.",
      sw: "Kazi halisi kwenye zabuni inapaswa kufuatiliwa. Ikiwa mashirika mawili yalilipia kiwanja kimoja, hilo ndilo faili la kufungua.",
    },
  ],
  ug: [
    {
      name: "Office of the Auditor General (Uganda)",
      url: "https://www.oag.go.ug/",
      contact: "oag.go.ug",
      en: "Ask for the site to be included in the next district audit. Attach the project name, financial year, GPS, and your observation hash.",
      sw: "Omba eneo liingizwe katika ukaguzi ujao wa wilaya. Ambatanisha jina la mradi, mwaka wa fedha, GPS, na hash ya ushuhuda.",
    },
    {
      name: "Inspectorate of Government",
      url: "https://www.igg.go.ug/",
      contact: "igg.go.ug",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Tumia hii pesa inapoonekana kulipwa kwa kazi ambayo haikufanyika. Shika ulichoona.",
    },
    {
      name: "Access to Information Act, 2005",
      url: "https://www.oag.go.ug/",
      contact: "Accounting officer of the district or ministry",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 21 days.",
      sw: "Omba mkataba, bili za kiasi, na vyeti vya malipo. Saa ni siku 21.",
    },
    {
      name: "District / LC5 / councillor",
      url: "https://www.gou.go.ug/",
      contact: "District headquarters",
      en: "Table the ledger row. Ask why disbursement ran ahead of the slab, the pump, or the classroom.",
      sw: "Wasilisha mstari. Uliza kwa nini malipo yalikimbia mbele ya slab, pampu, au darasa.",
    },
  ],
  gh: [
    {
      name: "Ghana Audit Service",
      url: "https://ghaudit.org/",
      contact: "ghaudit.org",
      en: "Ask the Auditor-General to include this site in the next MDA or MMDA audit. Attach the hash.",
      sw: "Ask the Auditor-General to include this site in the next audit. Attach the hash.",
    },
    {
      name: "CHRAJ / Office of the Special Prosecutor",
      url: "https://chraj.gov.gh/",
      contact: "chraj.gov.gh",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Use this when money appears to have been paid for work that was not done.",
    },
    {
      name: "Right to Information Act, 2019 (Act 989)",
      url: "https://rti.gov.gh/",
      contact: "Information officer of the procuring entity",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 14 days.",
      sw: "Request the contract, BoQ, and payment certificates. The clock is 14 days.",
    },
    {
      name: "Assembly member / MMDAs",
      url: "https://www.mlgrd.gov.gh/",
      contact: "District assembly",
      en: "Table the ledger row. Ask why payment ran ahead of the work on the ground.",
      sw: "Table the ledger row.",
    },
  ],
  sn: [
    {
      name: "Cour des comptes du Sénégal",
      url: "https://www.coursdescomptes.sn/",
      contact: "coursdescomptes.sn",
      en: "Ask the Court of Accounts to include this site in the next local audit. Attach the hash.",
      sw: "Demandez à la Cour des comptes d'inclure ce site dans le prochain contrôle. Joignez le hash.",
      fr: "Demandez à la Cour des comptes d'inclure ce site dans le prochain contrôle. Joignez le hash.",
    },
    {
      name: "OFNAC",
      url: "https://www.ofnac.sn/",
      contact: "ofnac.sn",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Utilisez ceci si l'argent public a été payé pour un ouvrage absent. Tenez-vous à ce que vous avez vu.",
      fr: "Utilisez ceci si l'argent public a été payé pour un ouvrage absent. Tenez-vous à ce que vous avez vu.",
    },
    {
      name: "Accès à l'information / agent comptable",
      url: "https://www.finances.gouv.sn/",
      contact: "Agent comptable de la collectivité ou du ministère",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 30 days.",
      sw: "Demandez le marché, le bordereau des prix, et les décomptes. Le délai est de 30 jours.",
      fr: "Demandez le marché, le bordereau des prix, et les décomptes. Le délai est de 30 jours.",
    },
    {
      name: "Conseil municipal / conseiller",
      url: "https://www.gouv.sn/",
      contact: "Mairie",
      en: "Table the ledger row. Ask why payment ran ahead of the work on the ground.",
      sw: "Déposez la ligne du registre. Demandez pourquoi le paiement a précédé l'ouvrage.",
      fr: "Déposez la ligne du registre. Demandez pourquoi le paiement a précédé l'ouvrage.",
    },
  ],
  tg: [
    {
      name: "Cour des comptes du Togo",
      url: "https://courdescomptes.tg/",
      contact: "courdescomptes.tg",
      en: "Ask the Court of Accounts to include this site in the next local audit. Attach the hash.",
      sw: "Demandez à la Cour des comptes d'inclure ce site. Joignez le hash.",
      fr: "Demandez à la Cour des comptes d'inclure ce site. Joignez le hash.",
    },
    {
      name: "HAPLUCIA",
      url: "https://haplucia.tg/",
      contact: "haplucia.tg",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Utilisez ceci si l'argent public a été payé pour un ouvrage absent.",
      fr: "Utilisez ceci si l'argent public a été payé pour un ouvrage absent.",
    },
    {
      name: "Agent comptable / ministère",
      url: "https://finances.gouv.tg/",
      contact: "Agent comptable",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 30 days.",
      sw: "Demandez le marché, le bordereau des prix, et les décomptes. Délai : 30 jours.",
      fr: "Demandez le marché, le bordereau des prix, et les décomptes. Délai : 30 jours.",
    },
    {
      name: "Mairie / conseiller",
      url: "https://www.republique.gouv.tg/",
      contact: "Mairie",
      en: "Table the ledger row. Ask why payment ran ahead of the work on the ground.",
      sw: "Déposez la ligne du registre. Demandez pourquoi le paiement a précédé l'ouvrage.",
      fr: "Déposez la ligne du registre. Demandez pourquoi le paiement a précédé l'ouvrage.",
    },
  ],
  zm: [
    {
      name: "Office of the Auditor General (Zambia)",
      url: "https://www.ago.gov.zm/",
      contact: "ago.gov.zm",
      en: "Ask the Auditor-General to include this site in the next provincial audit. Attach the hash.",
      sw: "Ask the Auditor-General to include this site in the next provincial audit. Attach the hash.",
    },
    {
      name: "Anti-Corruption Commission (Zambia)",
      url: "https://www.acc.gov.zm/",
      contact: "acc.gov.zm",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Use this when money appears to have been paid for work that was not done.",
    },
    {
      name: "Access to Information Act, 2013",
      url: "https://www.ago.gov.zm/",
      contact: "Information officer of the council or ministry",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 30 days.",
      sw: "Request the contract, BoQ, and payment certificates. The clock is 30 days.",
    },
    {
      name: "Councillor / local authority",
      url: "https://www.mlgrd.gov.zm/",
      contact: "Council clerk",
      en: "Table the ledger row. Ask why payment ran ahead of the work on the ground.",
      sw: "Table the ledger row.",
    },
  ],
  mw: [
    {
      name: "National Audit Office (Malawi)",
      url: "https://www.nao.gov.mw/",
      contact: "nao.gov.mw",
      en: "Ask the Auditor General to include this site in the next council audit. Attach the hash.",
      sw: "Ask the Auditor General to include this site in the next council audit. Attach the hash.",
    },
    {
      name: "Anti-Corruption Bureau",
      url: "https://www.acbmw.org/",
      contact: "acbmw.org",
      en: "Use this when money appears to have been paid for work that was not done. Stick to what you saw.",
      sw: "Use this when money appears to have been paid for work that was not done.",
    },
    {
      name: "Access to Information Act, 2017",
      url: "https://www.nao.gov.mw/",
      contact: "Information officer of the council or ministry",
      en: "Request the contract, bills of quantities, and payment certificates. The clock is 30 days.",
      sw: "Request the contract, BoQ, and payment certificates. The clock is 30 days.",
    },
    {
      name: "Councillor / district council",
      url: "https://www.malawi.gov.mw/",
      contact: "District commissioner",
      en: "Table the ledger row. Ask why payment ran ahead of the work on the ground.",
      sw: "Table the ledger row.",
    },
  ],
};
