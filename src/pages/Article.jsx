import SEO from "../components/SEO";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { allBlogs } from "../data/allBlogs";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const article = allBlogs.find((blog) => blog.slug === slug);

  <BlogLayout
    category={article.category}
    title={article.title}
    readTime={article.readTime}
    image={article.image}
  >
    {article.content}
  </BlogLayout>;

  if (!article) {
    return (
      <div className="section">
        <h2>Article Not Found</h2>
        <button onClick={() => navigate("/blog")}>Back to Blogs</button>
      </div>
    );
  }

  const currentSlug = window.location.pathname.split("/").pop();

  const relatedBlogs = allBlogs
    .filter((blog) => blog.category === category && blog.slug !== currentSlug)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        url={`https://www.atulsharmas.in/blog/${slug}`}
        type="article"
      />
      <Helmet>
        <title>
          Study Tips, Learning Guides & Student Productivity Articles | NextGen
          Study Hub
        </title>

        <meta
          name="description"
          content="Read detailed articles on study techniques, exam preparation strategies, productivity tips and learning guides designed for diploma and engineering students."
        />

        <meta
          name="keywords"
          content="
study tips article,
student study tips,
exam preparation article,
study techniques for students,
learning strategies article,
study productivity tips,
student motivation article,
how to study effectively article,
engineering student study tips,
diploma student study tips,
academic success tips article,
study improvement techniques,
learning methods for students,
exam study strategies,
study hacks article,
student productivity guide,
education tips article,
engineering learning guide,
study blog article,
academic performance tips,
student success strategies,
study techniques blog,
education learning article,
study routine tips article,
student academic guide
"
        />

        <link
          rel="canonical"
          href={`https://www.atulsharmas.in/blog/${slug}`}
        />
      </Helmet>

      <div className="section">
        {/* TITLE ABOVE IMAGE */}
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              padding: "6px 16px",
              borderRadius: "30px",
              background: "rgba(99,102,241,0.1)",
              color: "#6366f1",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            {article.category}
          </span>

          <h1
            style={{
              marginTop: "25px",
              fontSize: isMobile ? "28px" : "44px",
              fontWeight: "700",
              lineHeight: "1.3",
            }}
          >
            {article.title}
          </h1>

          <p style={{ opacity: 0.6, marginTop: "15px", fontSize: "15px" }}>
            By NextGen Study Hub • {article.readTime || "8 min read"}
          </p>
        </div>

        {/* FEATURED IMAGE */}
        <div
          style={{
            width: "100%",
            height: isMobile ? "240px" : "420px",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "70px",
          }}
        >
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* MAIN GRID */}
        <div
          className="article-layout"
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: window.innerWidth < 992 ? "1fr" : "2.2fr 1fr",
            gap: "60px",
          }}
        >
          {/* MAIN CONTENT */}
          <div
            className="article-content"
            style={{
              fontSize: "17px",
              lineHeight: "1.9",
              whiteSpace: "pre-line",
            }}
          >
            {article.content}
          </div>

          {/* SIDEBAR */}
          <div
            className="article-sidebar"
            style={{
              position: "sticky",
              top: "120px",
              height: "fit-content",
            }}
          >
            {/* Categories */}
            <div
              className="glass"
              style={{ padding: "25px", marginBottom: "30px" }}
            >
              <h4>Categories</h4>
              {[...new Set(allBlogs.map((b) => b.category))].map((cat) => (
                <p
                  key={cat}
                  style={{ opacity: 0.7, cursor: "pointer" }}
                  onClick={() => navigate("/blog")}
                >
                  {cat}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="glass" style={{ padding: "25px" }}>
              <h4>Explore More Blogs</h4>
              <p style={{ opacity: 0.7 }}>
                Discover more useful academic and exam preparation content.
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: "15px" }}
                onClick={() => navigate("/blog")}
              >
                Explore Blogs →
              </button>
            </div>
          </div>
        </div>

        {/* RELATED POSTS */}
        <div style={{ marginTop: "140px" }}>
          <h2 style={{ marginBottom: "40px" }}>
            Related {article.category} Articles
          </h2>

          <div className="grid">
            {relatedBlogs.map((blog) => (
              <div
                key={blog.slug}
                className="glass"
                style={{ padding: "25px", cursor: "pointer" }}
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <h4>{blog.title}</h4>
                <p style={{ opacity: 0.7, marginTop: "8px" }}>
                  Explore more insights about {blog.category}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
