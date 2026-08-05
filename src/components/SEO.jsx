import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.atulsharmas.in";
const SITE_NAME = "NextGen Study Hub";
// NOTE: The Organization (#organization) and WebSite (#website) entities are
// emitted statically in index.html with these exact @id values; the page
// schema below references them by @id to avoid duplicate entity nodes. If the
// base HTML ever stops being served (e.g. SSR removal), update both sides.
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;

function cleanSnippet(value) {
  return String(value)
    .replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("â€™", "'")
    .replaceAll("Â©", "(c)")
    .trim();
}

export default function SEO({
  title = "NextGen Study Hub – Diploma Notes, Study Materials, Student Tools & Career Resources",
  description = "NextGen Study Hub provides diploma engineering notes, semester study materials, exam preparation guides, internships, career advice and student productivity tools like CGPA calculator and study timer.",
  keywords = "",
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
  publishedTime,
  modifiedTime = "2026-04-14",
  breadcrumbs = [{ name: "Home", url: SITE_URL }],
  schemaType = "WebPage",
  noindex = false,
  extraSchema = [],
}) {
  const normalizedUrl = url || SITE_URL;
  const cleanTitle = cleanSnippet(title);
  const cleanDescription = cleanSnippet(description);
  const normalizedTitle = cleanTitle.includes(SITE_NAME)
    ? cleanTitle
    : `${cleanTitle} | ${SITE_NAME}`;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const personSchema = {
    "@type": "Person",
    name: "Atul Sharma",
    url: `${SITE_URL}/about`,
  };

  // The Organization / EducationalOrganization entity is emitted once by
  // index.html with @id "#organization". This page schema references it by
  // id, so Google never sees duplicate Organization nodes.
  // SearchAction targets the in-page GlobalSearch experience. React is a SPA,
  // so the crawler cannot execute the live dropdown — point the structured
  // search at the notes library search filter, which is the closest static
  // landing for a search query.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: cleanDescription,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/notes-library?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: normalizedTitle,
    name: normalizedTitle,
    description: cleanDescription,
    url: normalizedUrl,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    author: personSchema,
    publisher: { "@id": `${SITE_URL}/#organization` },
    dateModified: modifiedTime,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  // Extra schema is merged into one JSON-LD block; the block is deduplicated
  // so @context never repeats when extraSchema already includes it.
  const mergedBlocks = [websiteSchema, pageSchema, breadcrumbSchema, ...extraSchema];

  return (
    <Helmet>

      {/* Basic SEO */}

      <title>{normalizedTitle}</title>
      <meta name="description" content={cleanDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Atul Sharma" />

      {/* Robots */}

      <meta name="robots" content={robots} />

      {/* Canonical */}

      <link rel="canonical" href={normalizedUrl} />

      {/* Language */}

      <html lang="en" />

      {/* Theme Color */}

      <meta name="theme-color" content="#4f46e5" />

      {/* Open Graph (Facebook / LinkedIn) */}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={normalizedTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:url" content={normalizedUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={cleanTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      <meta property="article:modified_time" content={modifiedTime} />

      {/* Twitter SEO */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={normalizedTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={image} />

      {mergedBlocks.map((schema, i) => (
        <script key={`schema-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

    </Helmet>
  );
}
