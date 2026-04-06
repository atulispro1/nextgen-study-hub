import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const outputPath = path.join(projectRoot, "public", "sitemap-articles.xml");
const generatedDataPath = path.join(
  projectRoot,
  "src",
  "data",
  "generatedArticles.json",
);
const siteUrl = process.env.SITE_URL || "https://www.atulsharmas.in";

const client = createClient({
  projectId: "3k3t106k",
  dataset: "production",
  apiVersion: "2026-03-13",
  useCdn: false,
});

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildUrlEntry(post) {
  const lastmod = formatDate(post._updatedAt || post.publishedAt);
  const loc = `${siteUrl}/articles/${post.slug}`;

  return [
    "    <url>",
    `        <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `        <lastmod>${lastmod}</lastmod>` : null,
    "        <changefreq>weekly</changefreq>",
    "        <priority>0.9</priority>",
    "    </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildSitemap(posts) {
  const urls = posts.map(buildUrlEntry).join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urls}\n\n</urlset>\n`;
}

function buildGeneratedArticleData(posts) {
  return posts.map((post, index) => ({
    _id: post._id || `generated-${post.slug}-${index}`,
    title: post.title || "Untitled Article",
    slug: {
      current: post.slug,
    },
    mainImage: post.mainImage || null,
    publishedAt: post.publishedAt || null,
    body: Array.isArray(post.body) ? post.body : [],
    category: post.category?.title ? { title: post.category.title } : null,
  }));
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await mkdir(path.dirname(generatedDataPath), { recursive: true });

  const fallbackXml = await readFile(outputPath, "utf8").catch(() => null);
  const fallbackGeneratedData = await readFile(generatedDataPath, "utf8").catch(
    () => null,
  );

  try {
    const posts = await client.fetch(`
      *[_type == "post" && defined(slug.current)]
      | order(coalesce(publishedAt, _updatedAt) desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        _updatedAt,
        body,
        category->{title}
      }
    `);

    const validPosts = posts.filter((post) => post.slug);
    const xml = buildSitemap(validPosts);
    const generatedData = buildGeneratedArticleData(validPosts);

    await writeFile(outputPath, xml, "utf8");
    await writeFile(
      generatedDataPath,
      `${JSON.stringify(generatedData, null, 2)}\n`,
      "utf8",
    );
    console.log(
      `[sitemap] Updated article sitemap and generated article data with ${validPosts.length} Sanity articles.`,
    );
  } catch (error) {
    if (fallbackXml || fallbackGeneratedData) {
      console.warn(
        `[sitemap] Could not refresh article sitemap from Sanity. Keeping existing files. ${error.message}`,
      );
      return;
    }

    throw error;
  }
}

main().catch((error) => {
  console.error("[sitemap] Failed to generate article sitemap.", error);
  process.exitCode = 1;
});
