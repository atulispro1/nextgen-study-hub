// Injects the FAQ data from src/data/blogFaqs.json into each blog post as a
// faq={[...]} prop on <BlogLayout ...>. Idempotent: files that already have a
// faq prop are skipped.
// Run: node scripts/inject-faq.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "src", "pages", "blog");
const manifest = JSON.parse(
  readFileSync(path.join(__dirname, "..", "src", "data", "blogFaqs.json"), "utf8"),
);

let injected = 0;
let skipped = 0;

for (const [file, faqs] of Object.entries(manifest)) {
  if (faqs.length === 0) {
    skipped++;
    continue;
  }

  const filePath = path.join(blogDir, file);
  let src = readFileSync(filePath, "utf8");

  if (src.includes("faq={")) {
    skipped++;
    continue;
  }

  // Build the prop value: faq={[{ q: "...", a: "..." }, ...]}
  const faqLiteral = `faq={[\n      ${faqs
    .map(
      (f) =>
        `{ q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} },`,
    )
    .join("\n      ")}\n    ]}`;

  // Find the <BlogLayout ...> opening tag and its closing ">" (props may
  // span multiple lines). Insert the faq prop before that closing bracket.
  const openIdx = src.indexOf("<BlogLayout");
  if (openIdx === -1) {
    console.warn("NO BlogLayout found in", file);
    continue;
  }

  const closeIdx = src.indexOf(">", openIdx);
  if (closeIdx === -1) {
    console.warn("MALFORMED BlogLayout in", file);
    continue;
  }

  // Skip self-closing <BlogLayout /> (shouldn't happen; children are passed).
  const between = src.slice(openIdx, closeIdx + 1);
  if (between.trimEnd().endsWith("/>")) {
    console.warn("SELF-CLOSING BlogLayout in", file);
    continue;
  }

  src = `${src.slice(0, closeIdx)}\n      ${faqLiteral}${src.slice(closeIdx)}`;
  writeFileSync(filePath, src);
  injected++;
  console.log("INJECTED", file, `(${faqs.length} faqs)`);
}

console.log(`\nDone: ${injected} injected, ${skipped} skipped (no faq / already has one).`);
