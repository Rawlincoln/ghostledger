#!/usr/bin/env node
/**
 * Nitro bundles PGLite into `.output/server/_libs`, but the wasm runtime still
 * opens `pglite.data` / `pglite.wasm` next to that file. Copy them after a
 * node-server build (Render). No-op when that output directory is absent.
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const destDir = join(root, ".output/server/_libs");
if (!existsSync(destDir)) {
  console.log("[pglite] no node server output — skip");
  process.exit(0);
}

const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  const from = join(srcDir, name);
  if (!existsSync(from)) {
    console.error(`[pglite] missing ${from}`);
    process.exit(1);
  }
  copyFileSync(from, join(destDir, name));
  console.log(`[pglite] copied ${name}`);
}
