import { createFileRoute, Link } from "@tanstack/react-router";
import { CopyLetter } from "@/components/ghost/copy-share";
import { ACT_OFFICES } from "@/lib/ghost/act-offices";
import { COUNTRIES } from "@/lib/ghost/country";
import { atiLetter, kes } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { projectsFor } from "@/lib/ghost/catalog";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/act")({ component: ActPage });

function ActPage() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const meta = COUNTRIES[country];
  const sampleProject = projectsFor(country)[0];
  const sample = atiLetter(
    {
      name: sampleProject
        ? lang !== "en"
          ? sampleProject.nameSw
          : sampleProject.name
        : "—",
      ward: sampleProject?.ward ?? "",
      county: sampleProject?.county ?? "",
      fy: sampleProject?.fy ?? "",
      allocated: sampleProject ? kes(sampleProject.allocatedKes, lang, country) : "",
      hash: "paste-your-hash-here",
    },
    lang,
    country,
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.actPageTitle}</h1>
      <p className="mt-4 max-w-[62ch] text-muted">{c.actIntro}</p>
      <p className="mt-3 max-w-[62ch] text-sm text-muted">{c.constraintNextB}</p>
      <ol className="mt-10 space-y-8">
        {ACT_OFFICES[country].map((o, i) => (
          <li key={o.name} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line pt-6">
            <span className="font-mono text-sm text-muted">{i + 1}</span>
            <div>
              <h2 className="text-lg font-bold">
                <a href={o.url} target="_blank" rel="noreferrer">
                  {o.name}
                </a>
              </h2>
              <p className="mt-2 max-w-[54ch] text-muted">
                {lang === "fr" ? (o.fr ?? o.en) : lang === "sw" ? o.sw : o.en}
              </p>
              <p className="mt-2 font-mono text-xs">{o.contact}</p>
            </div>
          </li>
        ))}
      </ol>
      <h2 className="mt-12 text-xl font-bold">{c.letterTitle}</h2>
      <p className="mt-2 max-w-[62ch] text-sm text-muted">
        {lang === "fr"
          ? `Remplacez le hash après avoir tamponné un constat. Le délai légal est de ${meta.atiDays} jours.`
          : lang === "sw"
          ? `Badilisha hash baada ya kupiga muhuri ushuhuda. Saa ya kisheria ni siku ${meta.atiDays}.`
          : `Replace the hash after you stamp an observation. The statutory clock is ${meta.atiDays} days.`}
      </p>
      <CopyLetter text={sample} />
      <p className="mt-10 text-sm">
        <Link to="/report">{c.ctaReport}</Link>
      </p>
    </main>
  );
}
