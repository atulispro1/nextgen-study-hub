import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allBlogs } from "../data/allBlogs";
export default function BlogLayout({
  category,
  title,
  readTime,
  image,
  children,
  faq = [],
}) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const scrollPercent = (scrollPosition / totalHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const relatedBlogs = allBlogs
    .filter(
      (blog) =>
        blog.category === category &&
        blog.slug !== window.location.pathname.split("/").pop(),
    )
    .slice(0, 3);

  const seoPages = [
    { slug: "dbms-notes", title: "DBMS Notes" },
    { slug: "c-programming-notes", title: "C Programming Notes" },
    { slug: "computer-network-notes", title: "Computer Network Notes" },
    { slug: "operating-system-notes", title: "Operating System Notes" },
    { slug: "data-structure-notes", title: "Data Structure Notes" },
    { slug: "java-programming-notes", title: "Java Programming Notes" },
    { slug: "python-programming-notes", title: "Python Programming Notes" },
    { slug: "software-engineering-notes", title: "Software Engineering Notes" },
    {
      slug: "computer-organization-notes",
      title: "Computer Organization Notes",
    },
    { slug: "oop-notes", title: "OOP Notes" },

    { slug: "dbms-mcq", title: "DBMS MCQ Questions" },
    { slug: "c-programming-mcq", title: "C Programming MCQ Questions" },
    { slug: "data-structure-mcq", title: "Data Structure MCQ Questions" },
    { slug: "java-mcq", title: "Java MCQ Questions" },
    { slug: "computer-network-mcq", title: "Computer Network MCQ Questions" },
    { slug: "operating-system-mcq", title: "Operating System MCQ Questions" },

    { slug: "dbms-interview-questions", title: "DBMS Interview Questions" },
    {
      slug: "c-programming-interview-questions",
      title: "C Programming Interview Questions",
    },
    { slug: "java-interview-questions", title: "Java Interview Questions" },
    {
      slug: "data-structure-interview-questions",
      title: "Data Structure Interview Questions",
    },

    { slug: "learn-c-programming", title: "Learn C Programming" },
    { slug: "learn-java-programming", title: "Learn Java Programming" },
    { slug: "learn-python-programming", title: "Learn Python Programming" },

    { slug: "diploma-computer-science-guide", title: "Diploma CS Study Guide" },
    {
      slug: "how-to-study-engineering-effectively",
      title: "Engineering Study Guide",
    },
    {
      slug: "engineering-exam-preparation-guide",
      title: "Engineering Exam Preparation Guide",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title} | NextGen Study Hub</title>

        <meta
          name="description"
          content={`Read the complete guide about ${title}. Learn study strategies, exam preparation tips, and productivity techniques for students.`}
        />

        <link
          rel="canonical"
          href={`https://www.atulsharmas.in/blog/${slug}`}
        />

        {/* BlogPosting Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            image: image || "https://www.atulsharmas.in/preview.png",
            author: {
              "@type": "Person",
              name: "Atul Sharma",
            },
            publisher: {
              "@type": "Organization",
              name: "NextGen Study Hub",
              logo: {
                "@type": "ImageObject",
                url: "https://www.atulsharmas.in/favicon.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.atulsharmas.in/blog/${slug}`,
            },
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.atulsharmas.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.atulsharmas.in/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `https://www.atulsharmas.in/blog/${slug}`,
              },
            ],
          })}
        </script>

        {/* FAQ Schema — only when the post actually defines FAQ questions
            (faq prop). Each entry must match the visible FAQ section on the
            page, per Google's structured-data guidelines. */}
        {faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            })}
          </script>
        )}
      </Helmet>

      <div className="section">
        {/* Reading Progress Bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "4px",
            width: `${progress}%`,
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            zIndex: 9999,
          }}
        />

        {/* HERO HEADER */}
        <div className="blog-hero">
          <span className="blog-category">{category}</span>
          <h1>{title}</h1>
          <p className="blog-meta">By NextGen Study Hub • {readTime}</p>
        </div>

        {/* Featured Image */}
        <div className="blog-image-wrapper">
          <img src={image || "/notes.jpg"} alt={title} loading="lazy" />
        </div>

        {/* CONTENT AREA */}
        <div className="blog-container">
          <div className="blog-content">{children}</div>

          {/* Sticky Sidebar */}
          <div className="blog-sidebar">
            <div className="glass">
              <h4>Quick Navigation</h4>
              <p style={{ opacity: 0.7 }}>
                Scroll through structured sections and actionable strategies.
              </p>
            </div>

            <div className="glass" style={{ marginTop: "20px" }}>
              <h4>Explore More</h4>
              <button className="btn-primary" onClick={() => navigate("/blog")}>
                Explore Blogs →
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        <div className="related-section">
          <h2>Related Articles</h2>

          {relatedBlogs.length > 0 ? (
            <div className="related-grid">
              {relatedBlogs.map((item) => (
                <div
                  key={item.slug}
                  className="related-card"
                  onClick={() => navigate(`/blog/${item.slug}`)}
                >
                  <div className="related-image">
                    <img
                      src={item.image || "/notes.jpg"}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="related-content">
                    <span className="related-category">{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ opacity: 0.6 }}>
              More articles coming soon in this category.
            </p>
          )}
        </div>
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        <section style={{ marginTop: "100px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,2.5rem)",
                fontWeight: "800",
                color: "var(--primary)",
                marginBottom: "15px",
              }}
            >
              Engineering Notes, MCQ Questions & Programming Study Resources
            </h2>

            <p
              style={{
                maxWidth: "780px",
                margin: "auto",
                lineHeight: "1.8",
                opacity: "0.85",
                fontSize: "16px",
              }}
            >
              Explore a comprehensive collection of diploma and engineering
              study materials including programming notes, computer science
              subjects, MCQ practice questions, interview preparation guides and
              beginner programming tutorials. These resources are designed to
              help students understand concepts faster and prepare effectively
              for semester exams and technical interviews.
            </p>
          </div>
          <div className="grid">
            {seoPages.map((page) => (
              <div
                key={page.slug}
                className="glass"
                style={{ padding: "25px", textAlign: "center" }}
              >
                <h3 style={{ marginBottom: "10px" }}>{page.title}</h3>

                <p style={{ opacity: 0.7 }}>
                  Explore complete study materials, guides and resources related
                  to {page.title}.
                </p>

                <button
                  className="btn-primary"
                  style={{ marginTop: "15px" }}
                  onClick={() => navigate(`/${page.slug}`)}
                >
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </section>
        <div className="glass" style={{ padding: "25px", marginTop: "40px" }}>
          <h3>Explore More Study Resources</h3>
          <p>
            Browse our engineering notes library and student productivity tools
            to improve your academic performance.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate("/notes-library")}
          >
            Explore Notes Library
          </button>
        </div>
        {/* AUTHOR BOX */}
        <div className="author-box">
          <h3>About NextGen Study Hub</h3>
          <p>
            We provide structured academic strategies, coding roadmaps, and
            government exam guidance to help students build strong careers.
          </p>
        </div>
      </div>
    </>
  );
}
