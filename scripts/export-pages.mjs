import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const client = join(root, "dist/client");
const styles = readdirSync(join(client, "assets")).filter((name) => name.startsWith("styles-") && name.endsWith(".css"));
if (styles.length !== 1) {
  throw new Error(`Expected one styles-*.css, found ${styles.join(", ") || "none"}`);
}
const base = "/meridian-atlas";
let html = readFileSync(join(client, "_shell.html"), "utf8");
html = html.replace(/\/meridian-atlas\/assets\/styles-[^"]+\.css/g, `${base}/assets/${styles[0]}`);
html = html.replaceAll('href="/favicon.svg"', `href="${base}/favicon.svg"`);
html = html.replaceAll('href="/__grok/', `href="${base}/__grok/`);
html = html.replaceAll('src="/__grok/', `src="${base}/__grok/`);
writeFileSync(join(client, "index.html"), html);
writeFileSync(join(client, "404.html"), html);
writeFileSync(join(client, ".nojekyll"), "");
console.log("pages export ready", styles[0]);
