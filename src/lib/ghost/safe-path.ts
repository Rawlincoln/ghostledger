import type { CountryId } from "./country";
import type { Lang } from "./types";

export type LawStatus = "programme" | "whistleblower" | "court_only";

export type SafeChannel = {
  name: string;
  kind: "programme" | "court" | "prosecutor" | "police_watch" | "rights" | "aid";
  url: string;
  contact: string;
  en: string;
  sw: string;
  fr: string;
};

export type SafePack = {
  lawName: string;
  lawUrl: string;
  status: LawStatus;
  lawNote: { en: string; sw: string; fr: string };
  apply: { en: string; sw: string; fr: string };
  court: { en: string; sw: string; fr: string };
  police: { en: string; sw: string; fr: string };
  ifPolice: { en: string; sw: string; fr: string };
  emergency: string;
  letterTo: string;
  channels: SafeChannel[];
};

function loc(block: { en: string; sw: string; fr: string }, lang: Lang): string {
  if (lang === "fr") return block.fr;
  if (lang === "sw") return block.sw;
  return block.en;
}

export function safeText(block: { en: string; sw: string; fr: string }, lang: Lang): string {
  return loc(block, lang);
}

export const SAFE_PATH: Record<CountryId, SafePack> = {
  ke: {
    lawName: "Witness Protection Act (Cap. 79)",
    lawUrl: "https://new.kenyalaw.org/akn/ke/act/2006/16/eng@2022-12-31",
    status: "programme",
    emergency: "999 / 112 · WPA 0711 222 441 / 0725 222 442",
    letterTo: "The Director, Witness Protection Agency",
    lawNote: {
      en: "Kenya has a statutory Witness Protection Agency. Admission is decided by the Director. You, a prosecutor, a lawyer, or a law-enforcement officer may apply in writing. A memorandum of understanding is signed if you are admitted. Relatives can be covered. This is not automatic, and the programme is small.",
      sw: "Kenya ina Wakala wa Kisheria wa Ulinzi wa Mashahidi. Mkurugenzi ndiye anaamua. Wewe, mwendesha mashitaka, wakili, au afisa wa sheria mnaweza kuomba kwa maandishi. Makubaliano yanatiwa saini ukikubaliwa. Ndugu wanaweza kufunikwa. Si moja kwa moja, na programu ni ndogo.",
      fr: "Le Kenya a une Agence statutaire de protection des témoins. L'admission est décidée par le directeur. Vous, un procureur, un avocat ou un officier de police judiciaire pouvez demander par écrit. Un protocole d'accord est signé en cas d'admission. Les proches peuvent être couverts. Ce n'est pas automatique.",
    },
    apply: {
      en: "Write the Director of the Witness Protection Agency. Liaison office: Milimani Law Courts, 4th floor, Room 413, Nairobi; also Mombasa and Kisumu law courts. State the matter, the threat, and that you are willing to give evidence. Do not copy that letter into GhostLedger. Victim Protection Act (Cap. 79A) can refer you to the same Agency.",
      sw: "Andika kwa Mkurugenzi wa Wakala wa Ulinzi wa Mashahidi. Ofisi: Mahakama ya Milimani, ghorofa ya 4, chumba 413, Nairobi; pia Mombasa na Kisumu. Taja kesi, tisho, na kuwa uko tayari kutoa ushahidi. Usiweke barua hiyo kwenye GhostLedger.",
      fr: "Écrivez au directeur de l'Agence. Bureau de liaison : tribunaux de Milimani, 4e étage, salle 413, Nairobi ; aussi Mombasa et Kisumu. Indiquez l'affaire, la menace, et que vous acceptez de témoigner. Ne collez pas cette lettre dans GhostLedger.",
    },
    court: {
      en: "A prosecutor or your advocate can ask the trial court for: evidence in camera; a screen or video link; a pseudonym; non-disclosure of your address; delayed disclosure of identity. File through the ODPP or the court registry that has the case. A charge is not a conviction — the court is for process, not for naming someone on this site.",
      sw: "Mwendesha mashitaka au wakili wako anaweza kuomba mahakama: ushahidi faraghani; skrini au video; jina bandia; kutofichua anwani; kuchelewesha kutambulisha. Pitisha ODPP au rejesta ya mahakama yenye kesi.",
      fr: "Un procureur ou votre avocat peut demander au tribunal : huis clos ; écran ou visioconférence ; pseudonyme ; non-divulgation de l'adresse ; divulgation différée de l'identité. Passez par l'ODPP ou le greffe saisi.",
    },
    police: {
      en: "Use police when a crime is happening now, or when you trust the station. DCI and the ODPP can also refer you to the Agency. Keep a dated note of the OB number if you report.",
      sw: "Tumia polisi kosa linapotokea sasa, au unapoiamini kituo. DCI na ODPP wanaweza kukuelekeza kwa Wakala. Weka namba ya OB ikiwa utaripoti.",
      fr: "Appelez la police si un crime est en cours, ou si vous faites confiance au commissariat. Le DCI et l'ODPP peuvent aussi vous orienter vers l'Agence. Notez le numéro OB.",
    },
    ifPolice: {
      en: "If the threat is a police officer, do not walk into that station. Write IPOA (Independent Policing Oversight Authority). KNCHR and the Law Society of Kenya can sit between you and the state.",
      sw: "Ikiwa tisho ni polisi, usiingie kituo hicho. Andika IPOA. KNCHR na Chama cha Sheria wanaweza kukaa kati yako na serikali.",
      fr: "Si la menace est un policier, n'entrez pas dans ce commissariat. Écrivez à l'IPOA. La KNCHR et le barreau peuvent s'interposer.",
    },
    channels: [
      {
        name: "Witness Protection Agency",
        kind: "programme",
        url: "https://new.kenyalaw.org/akn/ke/act/2006/16/eng@2022-12-31",
        contact: "info@wpa.go.ke · 0711 222 441 · Milimani Law Courts, Room 413",
        en: "The only body that can admit you to a statutory protection programme in Kenya.",
        sw: "Chombo pekee kinachoweza kukuingiza kwenye programu ya kisheria ya ulinzi nchini Kenya.",
        fr: "Le seul organe qui peut vous admettre au programme statutaire au Kenya.",
      },
      {
        name: "Office of the Director of Public Prosecutions",
        kind: "prosecutor",
        url: "https://www.odpp.go.ke/",
        contact: "odpp.go.ke",
        en: "Can apply to court for in-camera evidence and can refer you to the Agency.",
        sw: "Inaweza kuomba mahakama ushahidi faraghani na kukuelekeza kwa Wakala.",
        fr: "Peut saisir le tribunal pour un huis clos et vous orienter vers l'Agence.",
      },
      {
        name: "Independent Policing Oversight Authority",
        kind: "police_watch",
        url: "https://www.ipoa.go.ke/",
        contact: "ipoa.go.ke",
        en: "Complaints against police. Use this instead of the station if the officer is the risk.",
        sw: "Malalamiko dhidi ya polisi. Tumia hii badala ya kituo afisa akiwa tisho.",
        fr: "Plaintes contre la police. Utilisez ceci plutôt que le commissariat si l'agent est le risque.",
      },
      {
        name: "Kenya National Commission on Human Rights",
        kind: "rights",
        url: "https://www.knchr.org/",
        contact: "knchr.org",
        en: "Human-rights complaints and referrals when the state itself is the threat.",
        sw: "Malalamiko ya haki za binadamu na uelekezaji serikali yenyewe ikiwa tisho.",
        fr: "Saisine droits humains et orientation lorsque l'État lui-même est la menace.",
      },
      {
        name: "National Legal Aid Service / Law Society of Kenya",
        kind: "aid",
        url: "https://www.lsk.or.ke/",
        contact: "lsk.or.ke",
        en: "An advocate can file the court application and the WPA request without you walking into a hostile office.",
        sw: "Wakili anaweza kuwasilisha ombi la mahakama na la WPA bila wewe kuingia ofisi hatari.",
        fr: "Un avocat peut déposer la requête et la demande WPA sans que vous entriez dans un bureau hostile.",
      },
      {
        name: "EACC anonymous report line",
        kind: "rights",
        url: "https://eacc.go.ke/",
        contact: "report@eacc.go.ke · 1551",
        en: "Corruption reporting. Stick to what you saw. A report is not the same as joining the protection programme.",
        sw: "Ripoti ya ufisadi. Shika ulichoona. Ripoti si kujiunga na programu ya ulinzi.",
        fr: "Signalement de corruption. Tenez-vous à ce que vous avez vu. Un signalement n'est pas l'admission au programme.",
      },
    ],
  },
  ug: {
    lawName: "No standalone Witness Protection Act (bill pending)",
    lawUrl: "https://www.dpp.go.ug/",
    status: "court_only",
    emergency: "999 / 112",
    letterTo: "The Director of Public Prosecutions — Witness Protection Department",
    lawNote: {
      en: "Uganda has no enacted witness-protection statute. The 2015 bill stalled; the ODPP revived the call in 2025. Until Parliament passes it, protection is administrative (ODPP Witness Protection Department) and whatever a judge will order. Do not expect relocation or a new identity as of right.",
      sw: "Uganda haina sheria ya ulinzi wa mashahidi iliyopitishwa. Mswada wa 2015 ulisimama; ODPP ilirudisha mwaka 2025. Hadi Bunge lipitishe, ulinzi ni wa kiutawala (idara ya ODPP) na kile jaji atakachoamuru.",
      fr: "L'Ouganda n'a pas de loi de protection des témoins en vigueur. Le projet de 2015 a calé ; l'ODPP a relancé en 2025. En attendant le Parlement, la protection est administrative et ce qu'un juge ordonne.",
    },
    apply: {
      en: "Write the ODPP Witness Protection Department and, in parallel, a private advocate. Ask the prosecutor on the file to apply for protective measures. UHRC and the Uganda Law Society can take the letter if you cannot walk into ODPP.",
      sw: "Andika Idara ya Ulinzi wa Mashahidi ya ODPP na wakili. Omba mwendesha mashitaka aombe hatua za ulinzi. UHRC na Chama cha Sheria wanaweza kuchukua barua.",
      fr: "Écrivez au service protection des témoins de l'ODPP et à un avocat. Demandez au procureur du dossier des mesures de protection. La UHRC et le barreau peuvent porter la lettre.",
    },
    court: {
      en: "Judges have ordered pseudonyms, delayed disclosure, and testimony out of the accused's sight under the Constitution and the Evidence Act. Your advocate or the prosecutor files the application in the court seized of the case. There is no statutory right to a safe house.",
      sw: "Majaji wameamuru majina bandia, kuchelewesha kutambulisha, na ushahidi nje ya macho ya mshtakiwa chini ya Katiba na Evidence Act. Wakili au mwendesha mashitaka anawasilisha. Hakuna haki ya kisheria ya nyumba salama.",
      fr: "Des juges ont ordonné des pseudonymes, une divulgation différée et un témoignage hors de vue de l'accusé. Votre avocat ou le procureur saisit la juridiction. Il n'existe pas de droit statutaire à un abri.",
    },
    police: {
      en: "Report a crime in progress to police. For corruption, the IGG can take a complaint. Keep the SD reference.",
      sw: "Ripoti kosa linaloendelea kwa polisi. Kwa ufisadi, IGG inaweza kuchukua malalamiko. Weka rejea ya SD.",
      fr: "Signalez un crime en cours à la police. Pour la corruption, l'IGG peut recevoir la plainte. Conservez la référence SD.",
    },
    ifPolice: {
      en: "If the threat is police or security forces, do not use that station. Write the Uganda Human Rights Commission and the Uganda Law Society. Professional Standards in UPF exists on paper — treat it as a second door, not the first, when the force is the risk.",
      sw: "Ikiwa tisho ni polisi au jeshi, usitumie kituo hicho. Andika Tume ya Haki za Binadamu na Chama cha Sheria.",
      fr: "Si la menace est la police ou l'armée, n'utilisez pas ce commissariat. Écrivez à la Commission des droits de l'homme et au barreau.",
    },
    channels: [
      {
        name: "ODPP — Witness Protection Department",
        kind: "prosecutor",
        url: "https://www.dpp.go.ug/",
        contact: "dpp.go.ug",
        en: "Administrative protection and court applications. Not a statutory safe-house programme.",
        sw: "Ulinzi wa kiutawala na maombi ya mahakama. Si programu ya kisheria ya nyumba salama.",
        fr: "Protection administrative et requêtes au tribunal. Pas un programme statutaire de relogement.",
      },
      {
        name: "Inspectorate of Government",
        kind: "rights",
        url: "https://www.igg.go.ug/",
        contact: "igg.go.ug",
        en: "Corruption complaints. Stick to what you saw.",
        sw: "Malalamiko ya ufisadi. Shika ulichoona.",
        fr: "Plaintes pour corruption. Tenez-vous à ce que vous avez vu.",
      },
      {
        name: "Uganda Human Rights Commission",
        kind: "rights",
        url: "https://www.uhrc.go.ug/",
        contact: "uhrc.go.ug",
        en: "When the state is the threat. Can award compensation through its tribunal; that is not physical protection.",
        sw: "Serikali ikiwa tisho. Inaweza kutoa fidia; huo si ulinzi wa kimwili.",
        fr: "Lorsque l'État est la menace. Peut allouer une indemnité ; ce n'est pas une protection physique.",
      },
      {
        name: "Uganda Law Society",
        kind: "aid",
        url: "https://www.uls.or.ug/",
        contact: "uls.or.ug",
        en: "An advocate can file the court application without you appearing in public.",
        sw: "Wakili anaweza kuwasilisha ombi bila wewe kuonekana hadharani.",
        fr: "Un avocat peut déposer la requête sans comparution publique.",
      },
    ],
  },
  tz: {
    lawName: "Whistleblower and Witness Protection Act, Cap. 446 (2015, revised 2022)",
    lawUrl: "https://tanzlii.org/akn/tz/act/2015/20/eng@2016-07-01",
    status: "whistleblower",
    emergency: "112 / 111",
    letterTo: "The Competent Authority (copy: National Prosecutions Service and PCCB)",
    lawNote: {
      en: "Tanzania protects whistleblowers and witnesses through the 2015 Act and the 2023 Regulations — not a Kenya-style relocation agency. Disclose to a Competent Authority. They must keep your identity confidential, decide a protection application in 14 days, and if they agree, sign a protection agreement within 7 days. Appeal a refusal to the Minister within 14 days. NPS guidelines add CPA s.188 court orders (video link, non-disclosure).",
      sw: "Tanzania inalinda waashiria na mashahidi kwa Sheria ya 2015 na Kanuni za 2023 — si wakala wa kuhamisha kama Kenya. Fichua kwa Mamlaka Stahiki. Wanapaswa kuficha utambulisho, kuamua ombi la ulinzi siku 14, na kama wanakubali, kusaini makubaliano siku 7. Kera kwa Waziri siku 14.",
      fr: "La Tanzanie protège lanceurs d'alerte et témoins par la loi de 2015 et le règlement de 2023 — pas une agence de relogement. Divulguez à une autorité compétente. Décision sous 14 jours ; accord de protection sous 7 jours. Recours au ministre sous 14 jours.",
    },
    apply: {
      en: "Use PCCB (corruption) or the National Prosecutions Service. 2023 Regulations: Form No. 1 — identity, the disclosure, the danger. Fill that form offline. Oral disclosure is allowed; they must record it and give you a written acknowledgement.",
      sw: "Tumia PCCB (ufisadi) au Huduma ya Mashitaka. Kanuni 2023: Fomu Na. 1 — utambulisho, ufichuzi, hatari. Jaza nje ya tovuti hii. Unaruhusiwa kusema; wanapaswa kurekodi na kukupa risiti.",
      fr: "PCCB (corruption) ou le National Prosecutions Service. Formulaire n° 1 hors ligne. Une divulgation orale est possible ; ils doivent la consigner et vous en donner accusé de réception.",
    },
    court: {
      en: "The DPP can apply under Criminal Procedure Act s.188 for video conferencing, non-disclosure of identity, and other measures the court thinks fit. Your advocate files in the court that has the file.",
      sw: "DPP anaweza kuomba chini ya CPA k.188: video, kutofichua utambulisho, na hatua nyingine mahakama inaziona. Wakili anawasilisha mahakama yenye faili.",
      fr: "Le DPP peut saisir le tribunal au titre de l'art. 188 du CPA : visioconférence, non-divulgation de l'identité, autres mesures. Votre avocat dépose devant la juridiction saisie.",
    },
    police: {
      en: "A crime in progress: police. Corruption and abuse of office: PCCB 113. Keep the acknowledgement of disclosure — the Act requires it.",
      sw: "Kosa linaloendelea: polisi. Ufisadi: PCCB 113. Weka risiti ya ufichuzi — sheria inaitaka.",
      fr: "Crime en cours : police. Corruption : PCCB 113. Conservez l'accusé de réception — la loi l'exige.",
    },
    ifPolice: {
      en: "If the threat is police, disclose to PCCB or CHRAGG, not that station. The Act says the receiver of a disclosure must keep you confidential.",
      sw: "Ikiwa tisho ni polisi, fichua kwa PCCB au CHRAGG, si kituo hicho. Sheria inasema mpokeaji lazima akufiche.",
      fr: "Si la menace est la police, divulguez à la PCCB ou à la CHRAGG, pas à ce commissariat. La loi impose la confidentialité.",
    },
    channels: [
      {
        name: "Prevention and Combating of Corruption Bureau",
        kind: "programme",
        url: "https://www.pccb.go.tz/",
        contact: "pccb.go.tz · 113 · TAKUKURU Street, Dodoma",
        en: "Competent authority for corruption disclosures. Online complaints exist. Protection agreement is a separate Form 2.",
        sw: "Mamlaka stahiki kwa ufichuzi wa ufisadi. Malalamiko mtandaoni yapo. Makubaliano ya ulinzi ni Fomu 2.",
        fr: "Autorité compétente pour la corruption. Plaintes en ligne. L'accord de protection est le formulaire 2.",
      },
      {
        name: "National Prosecutions Service",
        kind: "prosecutor",
        url: "https://www.nps.go.tz/",
        contact: "nps.go.tz",
        en: "Witness-care guidelines and CPA s.188 applications. Can propose administrative measures (physical protection, concealment of identity, relocation) then ask the court.",
        sw: "Miongozo ya utunzaji wa mashahidi na maombi ya CPA k.188. Inaweza kupendekeza ulinzi wa kimwili, kuficha utambulisho, kuhamisha, kisha kuomba mahakama.",
        fr: "Lignes directrices et requêtes art. 188. Peut proposer protection physique, dissimulation d'identité, relogement, puis saisir le tribunal.",
      },
      {
        name: "Commission for Human Rights and Good Governance",
        kind: "rights",
        url: "https://www.chragg.go.tz/",
        contact: "chragg.go.tz",
        en: "Appeals on access to information and human-rights complaints when the state is the threat.",
        sw: "Rufaa za taarifa na malalamiko ya haki serikali ikiwa tisho.",
        fr: "Recours accès à l'information et plaintes droits humains si l'État est la menace.",
      },
    ],
  },
  gh: {
    lawName: "Witness Protection Act, 2018 (Act 975)",
    lawUrl: "https://ghalii.org/akn/gh/act/2018/975/eng@2018-08-30",
    status: "programme",
    emergency: "191 / 112",
    letterTo: "The Attorney-General (Witness Protection Programme, Act 975)",
    lawNote: {
      en: "Ghana established a Witness Protection Agency and a Programme under Act 975. The Attorney-General decides admission, even if police or your lawyer asked. You must agree. A written request gets a written answer within seven days. If refused, you may apply to the High Court for a protection order.",
      sw: "Ghana ilianzisha Wakala na Programu chini ya Sheria 975. Mwanasheria Mkuu ndiye anaamua, hata polisi au wakili wako wakiomba. Lazima ukubali. Jibu la maandishi siku saba. Ukisema hapana, unaweza kuomba High Court amri ya ulinzi.",
      fr: "Le Ghana a créé une Agence et un programme (loi 975). C'est le procureur général qui décide. Réponse écrite sous sept jours. En cas de refus, requête à la High Court pour une ordonnance de protection.",
    },
    apply: {
      en: "Write the Attorney-General. Police or another law-enforcement body may write on your behalf. Do not put your name on GhostLedger. If the seven-day answer is a refusal, your advocate files in the High Court.",
      sw: "Andika Mwanasheria Mkuu. Polisi wanaweza kuandika kwa niaba yako. Usiweke jina kwenye GhostLedger. Jibu la siku saba likiwa kanoa, wakili anapeleka High Court.",
      fr: "Écrivez au procureur général. La police peut écrire pour vous. Ne mettez pas votre nom sur GhostLedger. Si le refus arrive sous sept jours, votre avocat saisit la High Court.",
    },
    court: {
      en: "High Court protection order after a refusal (Act 975 s.29(6)). In the trial itself: in-camera evidence, screens, and non-disclosure as the court allows. OSP or the Attorney-General's prosecutor on the file should move the application.",
      sw: "Amri ya High Court baada ya kanoa (k.29(6)). Katika kesi: ushahidi faraghani, skrini, kutofichua. OSP au mwendesha mashitaka wa faili aombe.",
      fr: "Ordonnance de la High Court après refus (art. 29(6)). Au procès : huis clos, écrans, non-divulgation. L'OSP ou le procureur du dossier présente la requête.",
    },
    police: {
      en: "Crime in progress: 191. Corruption: OSP or CHRAJ. Keep the acknowledgement.",
      sw: "Kosa linaloendelea: 191. Ufisadi: OSP au CHRAJ. Weka risiti.",
      fr: "Crime en cours : 191. Corruption : OSP ou CHRAJ. Conservez l'accusé de réception.",
    },
    ifPolice: {
      en: "If the threat is police, write Police Intelligence and Professional Standards (PIPS) and CHRAJ. Do not use that station.",
      sw: "Ikiwa tisho ni polisi, andika PIPS na CHRAJ. Usitumie kituo hicho.",
      fr: "Si la menace est la police, écrivez à PIPS et à la CHRAJ. N'utilisez pas ce commissariat.",
    },
    channels: [
      {
        name: "Attorney-General / Witness Protection Agency (Act 975)",
        kind: "programme",
        url: "https://ghalii.org/akn/gh/act/2018/975/eng@2018-08-30",
        contact: "Attorney-General's Department, Accra",
        en: "Statutory decision-maker for admission. Seven-day written answer. High Court if refused.",
        sw: "Anayeamua kisheria. Jibu siku saba. High Court ukikataliwa.",
        fr: "Décideur statutaire. Réponse sous sept jours. High Court en cas de refus.",
      },
      {
        name: "Office of the Special Prosecutor",
        kind: "prosecutor",
        url: "https://osp.gov.gh/",
        contact: "osp.gov.gh",
        en: "Corruption and organised-crime prosecutions. Can request admission and court measures.",
        sw: "Mashitaka ya ufisadi. Inaweza kuomba kuingizwa na hatua za mahakama.",
        fr: "Poursuites corruption. Peut demander l'admission et des mesures judiciaires.",
      },
      {
        name: "CHRAJ",
        kind: "rights",
        url: "https://chraj.gov.gh/",
        contact: "chraj.gov.gh",
        en: "Human-rights and corruption complaints. A door when the official is the state.",
        sw: "Malalamiko ya haki na ufisadi. Mlango ofisa akiwa serikali.",
        fr: "Plaintes droits humains et corruption. Une porte lorsque l'officier est l'État.",
      },
      {
        name: "Ghana Bar Association / Legal Aid",
        kind: "aid",
        url: "https://ghanabar.org/",
        contact: "ghanabar.org",
        en: "An advocate can write the Attorney-General and file the High Court application.",
        sw: "Wakili anaweza kuandika Mwanasheria Mkuu na kupeleka High Court.",
        fr: "Un avocat peut écrire au procureur général et saisir la High Court.",
      },
    ],
  },
  sn: {
    lawName: "Code de procédure pénale — mesures de protection (no dedicated agency)",
    lawUrl: "https://www.ofnac.sn/",
    status: "court_only",
    emergency: "17",
    letterTo: "Monsieur / Madame le Procureur de la République (copie OFNAC)",
    lawNote: {
      en: "Senegal has no Kenya-style witness-protection agency. Protection is what a prosecutor and an investigating judge can order under criminal procedure: closed hearing, concealment of identity, separate waiting. OFNAC takes corruption reports. Do not expect a statutory new identity.",
      sw: "Senegal haina wakala wa ulinzi wa mashahidi kama Kenya. Ulinzi ni kile mwendesha mashitaka na jaji wa uchunguzi wanaweza kuamuru: kikao kilichofungwa, kuficha utambulisho. OFNAC inachukua ripoti za ufisadi.",
      fr: "Le Sénégal n'a pas d'agence de protection des témoins à la kényane. La protection, c'est ce que le procureur et le juge d'instruction peuvent ordonner : huis clos, dissimulation d'identité, comparution séparée. L'OFNAC reçoit les signalements de corruption. N'attendez pas une nouvelle identité statutaire.",
    },
    apply: {
      en: "Write the procureur de la République at the tribunal de grande instance that would hear the file. Copy OFNAC if the matter is corruption. A local avocat can file without you appearing. Fill identity only on the copy you send.",
      sw: "Andika procureur wa mahakama itakayosikiliza. Nakili OFNAC ikiwa ni ufisadi. Wakili wa huko anaweza kuwasilisha bila wewe kuonekana.",
      fr: "Écrivez au procureur de la République du TGI compétent. Copie OFNAC si c'est de la corruption. Un avocat peut déposer sans votre comparution.",
    },
    court: {
      en: "Ask the procureur or juge d'instruction for: huis clos; identity concealment on the record; testimony by visio; a separate entrance. These are court orders, not an agency programme.",
      sw: "Omba procureur au jaji: kikao kilichofungwa; kuficha utambulisho; ushahidi kwa video; mlango tofauti. Hizo ni amri za mahakama, si programu ya wakala.",
      fr: "Demandez huis clos, dissimulation d'identité au dossier, visio, entrée séparée. Ce sont des ordonnances, pas un programme d'agence.",
    },
    police: {
      en: "Crime in progress: 17. Corruption: OFNAC. Keep a dated dépôt number.",
      sw: "Kosa linaloendelea: 17. Ufisadi: OFNAC. Weka namba ya dépôt.",
      fr: "Crime en cours : 17. Corruption : OFNAC. Conservez le numéro de dépôt.",
    },
    ifPolice: {
      en: "If the threat is police, do not use that commissariat. Write OFNAC and the Comité sénégalais des droits de l'homme. An avocat of the barreau can carry the letter.",
      sw: "Ikiwa tisho ni polisi, usitumie kituo hicho. Andika OFNAC na kamati ya haki za binadamu. Wakili anaweza kubeba barua.",
      fr: "Si la menace est la police, n'allez pas à ce commissariat. Écrivez à l'OFNAC et au Comité sénégalais des droits de l'homme. Un avocat du barreau porte la lettre.",
    },
    channels: [
      {
        name: "OFNAC",
        kind: "rights",
        url: "https://www.ofnac.sn/",
        contact: "ofnac.sn",
        en: "Corruption reports. Not a relocation programme.",
        sw: "Ripoti za ufisadi. Si programu ya kuhamisha.",
        fr: "Signalements de corruption. Pas un programme de relogement.",
      },
      {
        name: "Procureur de la République",
        kind: "prosecutor",
        url: "https://www.justice.gouv.sn/",
        contact: "Tribunal de grande instance of your région",
        en: "The officer who can ask the judge for closed hearings and identity concealment.",
        sw: "Afisa anayeweza kuomba jaji vikao vilivyofungwa na kuficha utambulisho.",
        fr: "Le magistrat qui peut demander huis clos et dissimulation d'identité.",
      },
      {
        name: "Barreau du Sénégal / aide juridictionnelle",
        kind: "aid",
        url: "https://www.gouv.sn/",
        contact: "Ordre des avocats",
        en: "An avocat files without you walking into a hostile office.",
        sw: "Wakili anawasilisha bila wewe kuingia ofisi hatari.",
        fr: "Un avocat dépose sans que vous entriez dans un bureau hostile.",
      },
    ],
  },
  tg: {
    lawName: "Code de procédure pénale — mesures de protection (no dedicated agency)",
    lawUrl: "https://haplucia.tg/",
    status: "court_only",
    emergency: "117",
    letterTo: "Monsieur / Madame le Procureur de la République (copie HAPLUCIA)",
    lawNote: {
      en: "Togo has no dedicated witness-protection agency. HAPLUCIA takes corruption files. A procureur and an investigating judge can order closed hearings and identity measures under criminal procedure. Do not expect a statutory new identity or a safe house as of right.",
      sw: "Togo haina wakala wa ulinzi wa mashahidi. HAPLUCIA inachukua faili za ufisadi. Procureur na jaji wanaweza kuamuru vikao vilivyofungwa. Usitarajie utambulisho mpya wa kisheria.",
      fr: "Le Togo n'a pas d'agence dédiée. La HAPLUCIA reçoit les dossiers de corruption. Le procureur et le juge d'instruction peuvent ordonner huis clos et mesures d'identité. N'attendez pas une nouvelle identité statutaire.",
    },
    apply: {
      en: "Write the procureur at the tribunal de grande instance. Copy HAPLUCIA if the matter is corruption or illicit enrichment. An avocat of the barreau can file.",
      sw: "Andika procureur wa mahakama. Nakili HAPLUCIA ikiwa ni ufisadi. Wakili anaweza kuwasilisha.",
      fr: "Écrivez au procureur du TGI. Copie HAPLUCIA si corruption ou enrichissement illicite. Un avocat du barreau peut déposer.",
    },
    court: {
      en: "Ask for huis clos, identity concealment, and visio. These are court orders on a live file, not a programme you join in advance.",
      sw: "Omba kikao kilichofungwa, kuficha utambulisho, video. Hizo ni amri juu ya faili hai, si programu unayojiunga mapema.",
      fr: "Demandez huis clos, dissimulation d'identité, visio. Ce sont des ordonnances sur un dossier ouvert, pas un programme d'adhésion.",
    },
    police: {
      en: "Crime in progress: 117. Corruption: HAPLUCIA.",
      sw: "Kosa linaloendelea: 117. Ufisadi: HAPLUCIA.",
      fr: "Crime en cours : 117. Corruption : HAPLUCIA.",
    },
    ifPolice: {
      en: "If the threat is police, write HAPLUCIA and the CNDH-Togo. Do not use that commissariat.",
      sw: "Ikiwa tisho ni polisi, andika HAPLUCIA na CNDH-Togo. Usitumie kituo hicho.",
      fr: "Si la menace est la police, écrivez à la HAPLUCIA et à la CNDH-Togo. Pas ce commissariat.",
    },
    channels: [
      {
        name: "HAPLUCIA",
        kind: "rights",
        url: "https://haplucia.tg/",
        contact: "haplucia.tg",
        en: "Corruption and illicit enrichment. Not a relocation programme.",
        sw: "Ufisadi. Si programu ya kuhamisha.",
        fr: "Corruption et enrichissement illicite. Pas un programme de relogement.",
      },
      {
        name: "Procureur de la République",
        kind: "prosecutor",
        url: "https://justice.gouv.tg/",
        contact: "Tribunal de grande instance",
        en: "Can ask the judge for closed hearings and identity concealment.",
        sw: "Anaweza kuomba jaji vikao vilivyofungwa.",
        fr: "Peut demander huis clos et dissimulation d'identité.",
      },
    ],
  },
  zm: {
    lawName: "No standalone Witness Protection Act — NPA practice + Whistleblowers Act",
    lawUrl: "https://www.npa.gov.zm/",
    status: "court_only",
    emergency: "991 / 999",
    letterTo: "The Director of Public Prosecutions, National Prosecution Authority",
    lawNote: {
      en: "Zambia has no standalone witness-protection statute. The National Prosecution Authority runs a Witness Management Fund (transport, subsistence to attend court) and has obtained court orders for secluded testimony under the Constitution. The Whistleblowers Act has limits. Uganda's law reformers came to study this model in 2026 — it is practice, not a relocation agency.",
      sw: "Zambia haina sheria pekee ya ulinzi wa mashahidi. NPA ina Mfuko wa Usimamizi wa Mashahidi (usafiri, posho) na imepata amri za mahakama za ushahidi faraghani. Sheria ya waashiria ina mipaka. Si wakala wa kuhamisha.",
      fr: "La Zambie n'a pas de loi autonome. L'NPA gère un fonds de prise en charge des témoins et a obtenu des ordonnances de témoignage à l'écart. La loi sur les lanceurs d'alerte a des limites. Ce n'est pas une agence de relogement.",
    },
    apply: {
      en: "Write the DPP / NPA and copy the Anti-Corruption Commission if the file is corruption. Ask the prosecutor on the case to apply for a secluded room, non-disclosure of address, and, if needed, temporary shelter through inter-agency practice. An advocate of the Law Association of Zambia can file.",
      sw: "Andika DPP / NPA na nakili ACC ikiwa ni ufisadi. Omba mwendesha mashitaka aombe chumba faragha, kutofichua anwani, na makazi ya muda. Wakili wa LAZ anaweza kuwasilisha.",
      fr: "Écrivez au DPP / NPA, copie ACC si corruption. Demandez salle à l'écart, non-divulgation de l'adresse, abri temporaire par pratique inter-agences. Un avocat de la LAZ peut déposer.",
    },
    court: {
      en: "Prosecutors have obtained orders for a witness to testify from a secluded room so they do not face the accused. File in the court seized of the matter. There is no statutory right to a new identity.",
      sw: "Waendesha mashitaka wamepata amri za ushahidi kutoka chumba faragha ili usimkute mshtakiwa. Wasilisha mahakama yenye kesi. Hakuna haki ya utambulisho mpya.",
      fr: "Des procureurs ont obtenu qu'un témoin dépose depuis une pièce à l'écart. Saisissez la juridiction du dossier. Pas de droit statutaire à une nouvelle identité.",
    },
    police: {
      en: "Crime in progress: 991. Corruption: ACC. Keep the occurrence-book number.",
      sw: "Kosa linaloendelea: 991. Ufisadi: ACC. Weka namba ya kitabu.",
      fr: "Crime en cours : 991. Corruption : ACC. Conservez le numéro du registre.",
    },
    ifPolice: {
      en: "If the threat is police, write the Police Public Complaints Commission and the Human Rights Commission. Do not use that station.",
      sw: "Ikiwa tisho ni polisi, andika Tume ya Malalamiko ya Polisi na Tume ya Haki za Binadamu. Usitumie kituo hicho.",
      fr: "Si la menace est la police, écrivez à la Police Public Complaints Commission et à la Commission des droits de l'homme. Pas ce commissariat.",
    },
    channels: [
      {
        name: "National Prosecution Authority",
        kind: "prosecutor",
        url: "https://www.npa.gov.zm/",
        contact: "npa.gov.zm",
        en: "Witness Management Fund and court applications. Practice, not a statutory safe-house programme.",
        sw: "Mfuko wa mashahidi na maombi ya mahakama. Utendaji, si programu ya kisheria ya nyumba salama.",
        fr: "Fonds de prise en charge et requêtes. Pratique, pas un programme statutaire d'abri.",
      },
      {
        name: "Anti-Corruption Commission",
        kind: "rights",
        url: "https://www.acc.gov.zm/",
        contact: "acc.gov.zm",
        en: "Corruption complaints. Stick to what you saw.",
        sw: "Malalamiko ya ufisadi. Shika ulichoona.",
        fr: "Plaintes pour corruption. Tenez-vous à ce que vous avez vu.",
      },
      {
        name: "Law Association of Zambia",
        kind: "aid",
        url: "https://www.laz.org.zm/",
        contact: "laz.org.zm",
        en: "An advocate can file without you appearing in public.",
        sw: "Wakili anaweza kuwasilisha bila wewe kuonekana hadharani.",
        fr: "Un avocat peut déposer sans comparution publique.",
      },
    ],
  },
  mw: {
    lawName: "No comprehensive witness-protection statute (CPA s.51A; Trafficking Act ss.47–48)",
    lawUrl: "https://www.acbmw.org/",
    status: "court_only",
    emergency: "997",
    letterTo: "The Director of Public Prosecutions (copy: Anti-Corruption Bureau)",
    lawNote: {
      en: "Malawi has no full witness-protection Act. Criminal Procedure s.51A lets a court conceal a whistleblower's name and address at inquiry or trial; victimising a whistleblower is an offence. Trafficking in Persons Act ss.47–48 add protection in those cases only. ACB and the Law Commission said in 2024 they are drafting broader whistleblower legislation. Until it exists, ask a judge and the DPP. Do not expect a statutory safe house.",
      sw: "Malawi haina sheria kamili ya ulinzi wa mashahidi. CPA k.51A inaruhusu mahakama kuficha jina na anwani ya mwashiria; kumdhulumu ni kosa. Sheria ya usafirishaji wa binadamu k.47–48 ni kwa kesi hizo tu. ACB inaandaa sheria pana. Hadi ipo, omba jaji na DPP.",
      fr: "Le Malawi n'a pas de loi complète. L'art. 51A du CPA permet de cacher nom et adresse d'un lanceur d'alerte ; le victimiser est une infraction. La loi sur la traite (art. 47–48) ne couvre que ces dossiers. L'ACB prépare une loi plus large. D'ici là, juge et DPP.",
    },
    apply: {
      en: "Write the DPP and copy ACB if the file is corruption. Ask the prosecutor to move CPA s.51A concealment and, where the facts fit, Trafficking Act protection. Malawi Law Society / legal aid can file. Fill identity only on the copy you send.",
      sw: "Andika DPP na nakili ACB ikiwa ni ufisadi. Omba mwendesha mashitaka aombe kuficha jina chini ya k.51A. Chama cha Sheria kinaweza kuwasilisha.",
      fr: "Écrivez au DPP, copie ACB si corruption. Demandez l'art. 51A et, le cas échéant, la loi sur la traite. Le barreau peut déposer.",
    },
    court: {
      en: "CPA s.51A: concealment of name and address during inquiry or trial. A prosecutor or your advocate applies in the court seized of the case. That is paper concealment, not a safe house.",
      sw: "CPA k.51A: kuficha jina na anwani wakati wa uchunguzi au kesi. Mwendesha mashitaka au wakili huomba. Huo ni kuficha karatasi, si nyumba salama.",
      fr: "Art. 51A : dissimulation du nom et de l'adresse. Le procureur ou votre avocat saisit la juridiction. C'est du papier, pas un abri.",
    },
    police: {
      en: "Crime in progress: 997. Corruption: ACB. Keep the reference.",
      sw: "Kosa linaloendelea: 997. Ufisadi: ACB. Weka rejea.",
      fr: "Crime en cours : 997. Corruption : ACB. Conservez la référence.",
    },
    ifPolice: {
      en: "If the threat is police, write the Malawi Human Rights Commission and the Independent Complaints Commission. Do not use that station.",
      sw: "Ikiwa tisho ni polisi, andika Tume ya Haki za Binadamu na Tume Huru ya Malalamiko. Usitumie kituo hicho.",
      fr: "Si la menace est la police, écrivez à la Commission des droits de l'homme et à l'Independent Complaints Commission. Pas ce commissariat.",
    },
    channels: [
      {
        name: "Anti-Corruption Bureau",
        kind: "rights",
        url: "https://www.acbmw.org/",
        contact: "acbmw.org",
        en: "Corruption complaints. Drafting a broader whistleblower law — not in force yet.",
        sw: "Malalamiko ya ufisadi. Inaandaa sheria pana — bado haijatumika.",
        fr: "Plaintes pour corruption. Une loi plus large est en préparation — pas encore en vigueur.",
      },
      {
        name: "Director of Public Prosecutions",
        kind: "prosecutor",
        url: "https://www.justice.gov.mw/",
        contact: "Ministry of Justice",
        en: "Can apply for CPA s.51A concealment in a live case.",
        sw: "Anaweza kuomba kuficha jina chini ya k.51A katika kesi hai.",
        fr: "Peut demander l'art. 51A dans un dossier ouvert.",
      },
      {
        name: "Malawi Law Society",
        kind: "aid",
        url: "https://www.malawilawsociety.org/",
        contact: "malawilawsociety.org",
        en: "An advocate can file without you appearing in public.",
        sw: "Wakili anaweza kuwasilisha bila wewe kuonekana hadharani.",
        fr: "Un avocat peut déposer sans comparution publique.",
      },
    ],
  },
};

export function protectionLetter(country: CountryId, lang: Lang): string {
  const pack = SAFE_PATH[country];
  if (lang === "fr") {
    return `${pack.letterTo}

Objet : demande de mesures de protection — à remplir hors de GhostLedger

Je demande les mesures de protection prévues par ${pack.lawName}.

1. L'affaire (faits, lieu, année — pas de rumeur)
2. La nature de la menace
3. Que je consens à témoigner si un dossier est ouvert
4. Que l'identité ci-dessous ne doit pas figurer sur un site public

[Nom, téléphone, adresse — uniquement sur l'exemplaire que vous envoyez]

Je n'ai pas saisi ces éléments dans GhostLedger. Merci de répondre par écrit et d'accuser réception.

Pièce : hash de constat (si vous en avez un) ________`;
  }
  if (lang === "sw") {
    return `${pack.letterTo}

YAH: Ombi la hatua za ulinzi — jaza nje ya GhostLedger

Ninaomba hatua za ulinzi chini ya ${pack.lawName}.

1. Kesi (mambo, mahali, mwaka — si uvumi)
2. Aina ya tisho
3. Nakubali kutoa ushahidi faili ikifunguliwa
4. Utambulisho hapa chini usiwekwe kwenye tovuti ya umma

[Jina, simu, anwani — kwenye nakala unayotuma tu]

Sikuweka haya kwenye GhostLedger. Tafadhali jibu kwa maandishi na utoe risiti.

Kiambatisho: hash ya ushuhuda (kama unayo) ________`;
  }
  return `${pack.letterTo}

Re: Request for protection measures — fill this only on the copy you send

I request the protection measures available under ${pack.lawName}.

1. The matter (facts, place, year — not rumour)
2. The nature of the threat
3. That I am willing to give evidence if a file is opened
4. That the identity below must not appear on a public website

[Name, phone, address — only on the copy you send]

I have not typed those details into GhostLedger. Please answer in writing and acknowledge receipt.

Attachment: observation hash (if you have one) ________`;
}
