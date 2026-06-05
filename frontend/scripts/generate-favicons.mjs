import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "favicon.svg"));

function render(size, filename) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "#0c4a6e",
  });
  const png = resvg.render().asPng();
  const out = join(publicDir, filename);
  writeFileSync(out, png);
  console.log(`wrote ${filename} (${size}px)`);
}

render(32, "favicon-32x32.png");
render(16, "favicon-16x16.png");
render(180, "apple-touch-icon.png");
copyFileSync(join(publicDir, "favicon-32x32.png"), join(publicDir, "favicon.ico"));
console.log("wrote favicon.ico");
