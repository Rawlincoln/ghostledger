#!/usr/bin/env node
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = "/workspace";
const OUT = path.join(ROOT, "submission");
const STILLS = path.join(OUT, "stills");
const RAW = path.join(OUT, "raw");
const APP = "http://127.0.0.1:8080";

mkdirSync(STILLS, { recursive: true });
mkdirSync(RAW, { recursive: true });
for (const f of readdirSync(RAW)) rmSync(path.join(RAW, f), { force: true });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function resetCountry(page, country = "ke") {
  await page.evaluate((id) => {
    localStorage.setItem(
      "ghostledger-prefs",
      JSON.stringify({
        state: {
          lang: id === "sn" || id === "tg" ? "fr" : "en",
          country: id,
          lowData: false,
          largeText: false,
        },
        version: 0,
      }),
    );
  }, country);
  await page.reload({ waitUntil: "networkidle" });
  await sleep(900);
}

async function printPitchAndCards() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(OUT, "pitch.html")}`, { waitUntil: "load" });
  await page.pdf({
    path: path.join(OUT, "pitch.pdf"),
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  const slides = page.locator(".slide");
  await slides.nth(0).screenshot({ path: path.join(STILLS, "title.png") });
  await slides.nth(9).screenshot({ path: path.join(STILLS, "end.png") });
  await browser.close();
}

async function recordDemo() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    recordVideo: { dir: RAW, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  await page.goto(APP, { waitUntil: "networkidle", timeout: 60_000 });
  await resetCountry(page, "ke");

  await page.screenshot({ path: path.join(STILLS, "01-clock.png") });
  await sleep(5000);

  await page.evaluate(() => window.scrollTo({ top: 640, behavior: "smooth" }));
  await sleep(2500);
  await page.screenshot({ path: path.join(STILLS, "02-recovered.png") });
  await sleep(1800);

  await page.evaluate(() => window.scrollTo({ top: 1280, behavior: "smooth" }));
  await sleep(2800);
  await page.screenshot({ path: path.join(STILLS, "03-map.png") });
  await sleep(1800);

  await page.goto(`${APP}/about`, { waitUntil: "networkidle" });
  await sleep(1500);
  await page.screenshot({ path: path.join(STILLS, "04-about.png") });
  await sleep(2800);

  await page.goto(`${APP}/named`, { waitUntil: "networkidle" });
  await sleep(1500);
  await page.screenshot({ path: path.join(STILLS, "05-named.png") });
  await sleep(2500);

  await page.goto(`${APP}/tour`, { waitUntil: "networkidle" });
  await sleep(1500);
  await page.screenshot({ path: path.join(STILLS, "06-tour.png") });
  await sleep(2500);

  await page.goto(`${APP}/act`, { waitUntil: "networkidle" });
  await sleep(1500);
  await page.screenshot({ path: path.join(STILLS, "07-act.png") });
  await sleep(2200);

  await page.goto(APP, { waitUntil: "networkidle" });
  await sleep(800);
  await page.locator('button[aria-label="Tanzania"]').click();
  await sleep(2800);
  await page.screenshot({ path: path.join(STILLS, "08-tanzania.png") });
  await sleep(2500);

  await context.close();
  await browser.close();

  const vids = readdirSync(RAW).filter((f) => f.endsWith(".webm"));
  if (!vids.length) throw new Error("no webm recorded");
  return path.join(RAW, vids[0]);
}

function encodeDemo(webm) {
  const body = path.join(RAW, "body.mp4");
  const titleMp4 = path.join(RAW, "title.mp4");
  const endMp4 = path.join(RAW, "end.mp4");
  const list = path.join(RAW, "list.txt");
  const mp4 = path.join(OUT, "demo.mp4");

  const bodyR = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      webm,
      "-vf",
      "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "23",
      "-an",
      body,
    ],
    { stdio: "inherit" },
  );
  if (bodyR.status !== 0) throw new Error("ffmpeg body failed");

  for (const [img, out, t] of [
    [path.join(STILLS, "title.png"), titleMp4, "3"],
    [path.join(STILLS, "end.png"), endMp4, "4"],
  ]) {
    const r = spawnSync(
      "ffmpeg",
      [
        "-y",
        "-loop",
        "1",
        "-t",
        t,
        "-i",
        img,
        "-vf",
        "scale=1280:720,fps=30,format=yuv420p",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "20",
        "-an",
        out,
      ],
      { stdio: "inherit" },
    );
    if (r.status !== 0) throw new Error(`ffmpeg card failed ${out}`);
  }

  writeFileSync(
    list,
    `file '${titleMp4}'\nfile '${body}'\nfile '${endMp4}'\n`,
  );
  const cat = spawnSync(
    "ffmpeg",
    ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", "-movflags", "+faststart", mp4],
    { stdio: "inherit" },
  );
  if (cat.status !== 0) throw new Error("ffmpeg concat failed");
  return mp4;
}

await printPitchAndCards();
const webm = await recordDemo();
encodeDemo(webm);
console.log("wrote", path.join(OUT, "demo.mp4"), path.join(OUT, "pitch.pdf"));
