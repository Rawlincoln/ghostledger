import { COUNTRIES, type CountryId } from "./country";
import type { Lang } from "./types";

export function kes(n: number, lang: Lang, country: CountryId = "ke"): string {
  const formatted = kesDigits(n, country);
  const meta = COUNTRIES[country];
  return lang === "en" ? `${meta.currency} ${formatted}` : `${meta.currencySw} ${formatted}`;
}

export function kesFull(n: number, lang: Lang, country: CountryId = "ke"): string {
  return kes(n, lang, country);
}

export function kesDigits(n: number, country: CountryId = "ke"): string {
  return new Intl.NumberFormat(COUNTRIES[country].locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function kesShort(n: number, _country: CountryId = "ke"): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000_000) {
    return `${(n / 1_000_000_000_000).toFixed(abs >= 10_000_000_000_000 ? 1 : 2)}T`;
  }
  if (abs >= 1_000_000_000) {
    const b = n / 1_000_000_000;
    return `${b.toFixed(abs >= 100_000_000_000 ? 0 : 1)}B`;
  }
  if (abs >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m.toFixed(abs >= 100_000_000 ? 0 : 1)}M`;
  }
  if (abs >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(Math.round(n));
}

export function currencyCode(lang: Lang, country: CountryId = "ke"): string {
  const meta = COUNTRIES[country];
  return lang === "en" ? meta.currency : meta.currencySw;
}

export function paidRatio(allocated: number, disbursed: number): number {
  if (allocated <= 0) return 0;
  return Math.min(1, disbursed / allocated);
}

export function haversineM(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const toR = (d: number) => (d * Math.PI) / 180;
  const dLat = toR(lat2 - lat1);
  const dLng = toR(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export async function stampHash(parts: string[]): Promise<string> {
  const data = new TextEncoder().encode(parts.join("|"));
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 20);
}

export function mapsUrl(lat: number, lng: number): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
}

export function formatDate(iso: string, lang: Lang, country: CountryId = "ke"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const meta = COUNTRIES[country];
  const locale = lang === "fr" ? meta.localeFr : lang === "sw" ? meta.localeSw : meta.locale;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function gazetteDate(lang: Lang, country: CountryId = "ke"): string {
  const meta = COUNTRIES[country];
  const locale = lang === "fr" ? meta.localeFr : lang === "sw" ? meta.localeSw : meta.locale;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(new Date())
    .toUpperCase();
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function shareObservation(input: {
  name: string;
  ward: string;
  county: string;
  hash: string;
  url: string;
}): string {
  return [`GhostLedger`, input.name, `${input.ward}, ${input.county}`, `Hash: ${input.hash}`, input.url]
    .filter(Boolean)
    .join("\n");
}

export function atiLetter(
  p: {
    name: string;
    ward: string;
    county: string;
    fy: string;
    allocated: string;
    hash?: string;
  },
  lang: Lang,
  country: CountryId = "ke",
): string {
  const meta = COUNTRIES[country];
  const region = meta.regionEn;
  if (lang === "fr") {
    return `L'agent comptable
${p.county} — ${meta.regionFr}

Objet : demande d'accès à l'information — ${p.name}, ${p.ward}, exercice ${p.fy}

Au titre de ${meta.atiLaw}, je demande copie de :
1. Le marché et le bordereau des prix
2. Les décomptes jusqu'au décompte final
3. Les coordonnées GPS déposées pour cet appel d'offres

Alloué : ${p.allocated}
${p.hash ? `Hash du constat : ${p.hash}` : ""}

Merci de répondre dans ${meta.atiDays} jours.

Cette demande ne porte pas sur des données personnelles. Elle concerne des marchés publics.`;
  }
  if (lang === "sw") {
    return `Afisa Mhasibu
${p.county}

YAH: Ombi la taarifa — ${p.name}, ${p.ward}, MW ${p.fy}

Chini ya ${meta.atiLawSw}, ninaomba nakala za:
1. Mkataba na bili za kiasi
2. Vyeti vya malipo hadi cha mwisho
3. Kuratibu za GPS zilizowasilishwa kwa zabuni hii

Kiasi kilichotengwa: ${p.allocated}
${p.hash ? `Hash ya ushuhuda: ${p.hash}` : ""}

Tafadhali jibu ndani ya siku ${meta.atiDays}.

Ombi hili halihusu data binafsi. Linahusu rekodi za ununuzi wa umma.`;
  }
  return `The Accounting Officer
${p.county} ${region}

Re: Access to Information request — ${p.name}, ${p.ward}, FY ${p.fy}

Under the ${meta.atiLaw}, I request copies of:
1. The contract and bills of quantities
2. Payment certificates through final
3. The GPS coordinates submitted for this tender

Allocated: ${p.allocated}
${p.hash ? `Observation hash: ${p.hash}` : ""}

Please respond within ${meta.atiDays} days.

This request does not include personal data. It concerns public procurement records.`;
}

export function timeLeft(iso: string, lang: Lang): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) {
    if (lang === "sw") return "Imeisha";
    if (lang === "fr") return "Terminé";
    return "Ended";
  }
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  if (d > 0) {
    if (lang === "sw") return `${d}s ${h}saa`;
    if (lang === "fr") return `${d}j ${h}h restants`;
    return `${d}d ${h}h left`;
  }
  const m = Math.max(1, Math.floor((ms % 3_600_000) / 60_000));
  if (lang === "sw") return `${h}saa ${m}dk`;
  if (lang === "fr") return `${h}h ${m}min restants`;
  return `${h}h ${m}m left`;
}

export function isPast(iso: string): boolean {
  const t = new Date(iso).getTime();
  return Number.isNaN(t) || t <= Date.now();
}
