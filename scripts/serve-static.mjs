#!/usr/bin/env node
/**
 * Tiny static server for Render's free instance.
 * The full Nitro server spends the cold start parsing a huge bundle.
 * This process binds the port immediately and serves the built files.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), ".output/public");
const port = Number(process.env.PORT || 10000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] || "/");
  const cleaned = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const full = join(root, cleaned);
  if (!full.startsWith(root)) return null;
  return full;
}

const server = createServer(async (req, res) => {
  try {
    const path = safePath(req.url || "/");
    if (!path) {
      res.writeHead(400);
      res.end("bad path");
      return;
    }
    let file = path;
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      file = join(file, "index.html");
      info = await stat(file).catch(() => null);
    }
    if (!info?.isFile()) {
      file = join(root, "index.html");
      info = await stat(file).catch(() => null);
    }
    if (!info?.isFile()) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("not found");
      return;
    }
    const body = await readFile(file);
    const ext = extname(file);
    const cache =
      ext === ".html" || ext === ".txt" ? "no-cache" : "public, max-age=31536000, immutable";
    res.writeHead(200, {
      "content-type": types[ext] || "application/octet-stream",
      "cache-control": cache,
    });
    res.end(body);
  } catch {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`[static] listening on ${port}`);
});
