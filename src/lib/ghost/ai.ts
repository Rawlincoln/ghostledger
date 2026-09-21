import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { allProjects } from "./catalog";
import { COUNTRIES } from "./country";
import type { Lang } from "./types";

export const explainProject = createServerFn({ method: "POST" })
  .validator((input: { slug: string; lang: Lang }) => input)
  .handler(async ({ data }) => {
    const project = allProjects().find((p) => p.slug === data.slug);
    if (!project) return { ok: false as const, error: "Unknown project." };

    const sql = await getSql();
    const cached = await sql<{ body: string }>`
      select body from gl_ai_cache
      where project_slug = ${data.slug} and lang = ${data.lang} and kind = 'explain'
      limit 1
    `;
    if (cached[0]?.body) return { ok: true as const, text: cached[0].body, cached: true };

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not available in this environment" };
    }

    const country = project.country ?? "ke";
    const meta = COUNTRIES[country];
    const langName = data.lang === "sw" ? "Kiswahili" : data.lang === "fr" ? "French" : "English";
    const nextOffices = meta.atiLaw;
    const prompt = `You write for a resident of ${meta.name} with mixed literacy, using ${langName} only. No English mixed in if Kiswahili or French was requested.
Project: ${project.name} (${project.ward}, ${project.county}).
FY ${project.fy}. Allocated ${meta.currency} ${project.allocatedKes}. Disbursed ${meta.currency} ${project.disbursedKes}.
On paper: ${project.paperClaim}
On the ground: ${project.groundNote}
Status: ${project.status}.
Write 3 short paragraphs:
1) What the public paid for, in everyday words.
2) What a site visit currently shows, without accusing a named person.
3) The most useful next official step (cite ${nextOffices} and the local auditor or anti-graft office).
Rules: no em dashes. No slogans. Label that the figures are a demo composite. Max 160 words.`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 350,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}` };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty explainer." };

    await sql`
      insert into gl_ai_cache (project_slug, lang, kind, body)
      values (${data.slug}, ${data.lang}, 'explain', ${text})
      on conflict (project_slug, lang, kind) do nothing
    `;
    return { ok: true as const, text, cached: false };
  });
