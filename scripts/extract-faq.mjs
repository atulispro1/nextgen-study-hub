// Extracts the visible FAQ question/answer pairs from every blog post
// (src/pages/blog/*.jsx) so BlogLayout can emit accurate FAQPage schema.
// Run: node scripts/extract-faq.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "src", "pages", "blog");

// Pulls the plain text out of JSX like <h4>Is Data Structure hard?</h4>,
// handling {expr}, entity chars and whitespace collapse.
function jsxText(raw) {
  return (raw || "")
    .replace(/<\/?[a-zA-Z][^>]*>/g, "") // strip tags
    .replace(/\{[^}]*\}/g, " ") // drop JSX expressions
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFile(file) {
  const src = readFileSync(file, "utf8");
  const faqs = [];

  // Pattern 1: <div className="faq-box"><h4>Q</h4><p>A</p></div>
  const boxRe = /<div\s+className="faq-box"[^>]*>([\s\S]*?)<\/div>/g;
  let m;
  while ((m = boxRe.exec(src)) !== null) {
    const inner = m[1];
    const qMatch = inner.match(/<(h4|h3|strong|b)\b[^>]*>([\s\S]*?)<\/(?:h4|h3|strong|b)>/);
    const aMatch = inner.match(/<p\b[^>]*>([\s\S]*?)<\/p>/);
    if (qMatch && aMatch) {
      const q = jsxText(qMatch[2]);
      const a = jsxText(aMatch[1]);
      if (q && a) faqs.push({ q, a });
    }
  }

  // Pattern 2: bare <h4>Q</h4><p>A</p> pairs in the FAQ section
  // (used by ScoreCGPA + PrepareSemester7Days). Slice from the heading to
  // the next JSX comment (or component end) so unrelated h4/p pairs
  // elsewhere in the article are never picked up.
  if (faqs.length === 0) {
    const headingIdx = src.indexOf("Frequently Asked Questions");
    if (headingIdx !== -1) {
      const afterHeading = src.slice(headingIdx);
      const nextComment = afterHeading.search(/\/\*\s*[A-Z]/);
      const region =
        nextComment > 0 ? afterHeading.slice(0, nextComment) : afterHeading;

      const pairRe = /<(h4|h3|strong|b)\b[^>]*>([\s\S]*?)<\/(?:h4|h3|strong|b)>\s*<p\b[^>]*>([\s\S]*?)<\/p>/g;
      let pm;
      while ((pm = pairRe.exec(region)) !== null) {
        const q = jsxText(pm[2]);
        const a = jsxText(pm[3]);
        if (q && a) faqs.push({ q, a });
      }
    }
  }

  return faqs;
}

const manifest = {};
for (const file of readdirSync(blogDir).filter((f) => f.endsWith(".jsx"))) {
  manifest[file] = extractFile(path.join(blogDir, file));
}

const out = path.join(__dirname, "..", "src", "data", "blogFaqs.json");
writeFileSync(out, JSON.stringify(manifest, null, 2));
console.log("WROTE", out);
for (const [file, faqs] of Object.entries(manifest)) {
  console.log(file.padEnd(34), faqs.length, "faqs");
}
