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
  related = [],
}) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { slug } = useParams();

  const currentBlog = allBlogs.find((blog) => blog.slug === slug);

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
