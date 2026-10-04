// Regenerates the CV assets from cv/cv.html using headless Microsoft Edge
// (or Chrome). Run from the repo root:  node cv/build-cv.mjs
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  process.env.BROWSER,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("No Edge/Chrome found — set BROWSER=/path/to/browser");

const src = pathToFileURL(resolve("cv/cv.html")).href;
const common = ["--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=8000"];

execFileSync(browser, [
  ...common,
  "--no-pdf-header-footer",
  `--print-to-pdf=${resolve("public/Mohamed-Romana-CV.pdf")}`,
  src,
]);

// First page preview (A4 @ 96dpi = 794 x 1123, rendered at 2x).
execFileSync(browser, [
  ...common,
  "--hide-scrollbars",
  "--force-device-scale-factor=2",
  "--window-size=794,1123",
  `--screenshot=${resolve("public/cv-preview.png")}`,
  `${src}#preview`,
]);

console.log("CV PDF + preview generated in /public");
