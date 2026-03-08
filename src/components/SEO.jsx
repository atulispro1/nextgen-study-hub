import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "NextGen Study Hub – Diploma Notes, Study Materials, Student Tools & Career Resources",
  description = "NextGen Study Hub provides diploma engineering notes, semester study materials, exam preparation guides, internships, career advice and student productivity tools like CGPA calculator and study timer.",
  keywords = "diploma engineering notes, engineering notes pdf, dbms notes pdf, c programming notes pdf, computer network notes pdf, operating system notes pdf, engineering study materials, diploma computer science notes, polytechnic notes, diploma engineering syllabus, engineering exam preparation, cgpa to percentage calculator, gpa calculator online, percentage calculator online, study timer online, pomodoro study timer, study tips for students, exam preparation tips, government exams after 12th, SSC exam preparation, railway exam preparation, banking exam preparation, career options after diploma, internships for students, programming interview questions, software engineering notes, data structure notes pdf, programming basics notes, engineering study material free download",
  image = "https://www.atulsharmas.in/preview.png",
  url = "https://www.atulsharmas.in",
  type = "website",
}) {
  return (
    <Helmet>

      {/* Basic SEO */}

      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Atul Sharma" />

      {/* Robots */}

      <meta name="robots" content="index, follow" />

      {/* Canonical */}

      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook / LinkedIn) */}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter SEO */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org Structured Data */}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NextGen Study Hub",
          url: "https://www.atulsharmas.in",
          description:
            "NextGen Study Hub provides diploma engineering notes, study materials, career resources, exam preparation guides and productivity tools for students.",
          author: {
            "@type": "Person",
            name: "Atul Sharma",
          },
          publisher: {
            "@type": "Organization",
            name: "NextGen Study Hub",
          },
        })}
      </script>

    </Helmet>
  );
}