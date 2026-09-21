"use client";

import { useState } from "react";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import { whatsappUrl } from "@/lib/ghost/format";

export function CopyShare({
  hash,
  shareText,
}: {
  hash: string;
  shareText: string;
}) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={copy}
        className="border border-ink bg-paper px-4 py-2.5 text-sm font-bold hover:bg-ink hover:text-canvas"
      >
        {copied ? c.copied : c.copyHash}
      </button>
      <a
        href={whatsappUrl(shareText)}
        target="_blank"
        rel="noreferrer"
        className="bg-accent px-4 py-2.5 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
      >
        {c.shareWa}
      </a>
    </div>
  );
}

export function CopyLetter({ text }: { text: string }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4">
      <pre className="max-w-[70ch] overflow-x-auto whitespace-pre-wrap border border-line bg-paper p-4 font-sans text-sm leading-relaxed">
        {text}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3 border border-ink px-4 py-2.5 text-sm font-bold hover:bg-ink hover:text-canvas"
      >
        {copied ? c.copied : c.letterCopy}
      </button>
    </div>
  );
}
