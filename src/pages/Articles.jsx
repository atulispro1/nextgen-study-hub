import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generatedArticles from "../data/generatedArticles.json";
import { urlFor } from "../lib/sanityImage";
import { client } from "../lib/sanityClient";

function getExcerpt(post) {
  const firstBlock = Array.isArray(post.body)
    ? post.body.find((block) => Array.isArray(block?.children))
    : null;
  const text = firstBlock?.children
    ?.map((child) => child?.text || "")
    .join(" ")
    .trim();

  return text
    ? `${text.slice(0, 120)}...`
    : "Read this detailed student article on NextGen Study Hub.";
}

function getArticleHref(post) {
  return `/articles/${post.slug.current}`;
}

export default function Articles() {
  const [posts, setPosts] = useState(generatedArticles);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      category->{title}
    }`;

    client.fetch(query).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      }
    });
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [search, category]);

  const isLoading = posts.length === 0;

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category?.title).filter(Boolean)),
  ];

  const filteredPosts = posts.filter((post) => {
    const normalizedSearch = search.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(normalizedSearch) ||
      getExcerpt(post).toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      category === "All" || post.category?.title === category;

    return matchesSearch && matchesCategory;
  });

  const latestArticles = posts.slice(0, 7);
  const featuredArticle = latestArticles[0];
  const secondaryArticle = latestArticles[1];
  const compactArticles = latestArticles.slice(2, 7);

  return (
    <>
      <Helmet>
        <title>
          Student Articles - Study Tips, Exam Preparation and Learning Guides |
          NextGen Study Hub
        </title>
        <meta
          name="description"
          content="Explore student articles on study techniques, exam preparation, productivity and learning guides for diploma and engineering students."
        />
        <link rel="canonical" href="https://www.atulsharmas.in/articles" />
      </Helmet>

      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "auto" }}>
        <section
          style={{
            padding: "clamp(40px,6vw,80px)",
            borderRadius: "24px",
            marginBottom: "70px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem,5vw,3rem)",
              fontWeight: "900",
              marginBottom: "20px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Student Articles - Study Tips, Exam Preparation and Learning Guides
          </h1>

          <p
            style={{
              maxWidth: "780px",
              margin: "auto",
              fontSize: "clamp(15px,2vw,18px)",
              opacity: "0.85",
              lineHeight: "1.8",
            }}
          >
            Explore expert-written student articles covering study techniques,
            exam preparation strategies, productivity tips and learning guides
            designed for diploma and engineering students.
          </p>

          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              opacity: "0.75",
            }}
          >
            <p>
              Find helpful articles on study techniques, exam strategies,
              productivity and learning methods to improve academic performance.
            </p>

            <div style={{ marginTop: "10px" }}>
              <a
                href="/articles/best-ai-tools-for-students-2026-study-smarter"
                style={{
                  color: "#6366f1",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                AI Study Guide
              </a>{" "}
              |{" "}
              <a
                href="/articles/how-to-prepare-for-exams-in-7-days-last-minute-plan"
                style={{
                  color: "#6366f1",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                7 Day Study Plan
              </a>{" "}
              |{" "}
              <a
                href="/articles/how-to-study-effectively-2026-best-study-techniques"
                style={{
                  color: "#6366f1",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Focus Guide
              </a>
            </div>
          </div>
        </section>

        {latestArticles.length > 0 && (
          <section
            className="glass"
            style={{
              marginBottom: "40px",
              padding: "clamp(24px,4vw,38px)",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "240px",
                borderRadius: "999px",
                right: "-80px",
                top: "-90px",
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.24), transparent 70%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "18px",
                flexWrap: "wrap",
                marginBottom: "28px",
              }}
            >
              <div style={{ maxWidth: "720px" }}>
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "10px",
                    padding: "7px 13px",
                    borderRadius: "999px",
                    background: "rgba(99,102,241,0.12)",
                    color: "#a5b4fc",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Fresh Reads
                </span>

                <h2
                  style={{
                    margin: "0 0 10px 0",
                    fontWeight: "900",
                    color: "var(--primary)",
                    fontSize: "clamp(1.9rem,4vw,2.6rem)",
                  }}
                >
                  Latest Published Articles
                </h2>

                <p
                  style={{
                    opacity: "0.82",
                    lineHeight: "1.75",
                    margin: 0,
                  }}
                >
                  Newly published articles appear here in a cleaner reading
                  layout, helping students discover the newest guides while
                  giving search engines stronger internal links to fresh URLs.
                </p>
              </div>

              <button
                className="btn-primary"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                style={{
                  padding: "13px 24px",
                  borderRadius: "999px",
                  fontWeight: "700",
                }}
              >
                Show All Articles
              </button>
            </div>

            <div className="latest-articles-layout">
              {featuredArticle && (
                <article
                  className="latest-feature-card latest-hover-card"
                  onClick={() => navigate(getArticleHref(featuredArticle))}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(15,23,42,0.86))",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 22px 50px rgba(2,6,23,0.28)",
                  }}
                >
                  {featuredArticle.mainImage && (
                    <img
                      src={urlFor(featuredArticle.mainImage).width(1100).height(620).url()}
                      alt={featuredArticle.title}
                      className="latest-feature-image"
                    />
                  )}

                  <div className="latest-feature-content">
                    <div className="latest-meta-row">
                      <span
                        className="latest-rank-pill"
                        style={{
                          background: "rgba(99,102,241,0.18)",
                          color: "#c4b5fd",
                        }}
                      >
                        Featured Article
                      </span>
                      {featuredArticle.publishedAt && (
                        <span style={{ color: "rgba(255,255,255,0.74)" }}>
                          {new Date(featuredArticle.publishedAt).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>

                    <h3 className="latest-feature-title" style={{ color: "#f8fafc" }}>
                      {featuredArticle.title}
                    </h3>

                    <p
                      className="latest-feature-excerpt"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {getExcerpt(featuredArticle)}
                    </p>

                    <div className="latest-card-footer">
                      <span style={{ color: "rgba(255,255,255,0.72)" }}>
                        {featuredArticle.category?.title || "Student Article"}
                      </span>
                      <span style={{ color: "#a5b4fc" }}>Read More {"->"}</span>
                    </div>
                  </div>
                </article>
              )}

              <div className="latest-side-column">
                {secondaryArticle && (
                  <article
                    className="latest-medium-card latest-hover-card"
                    onClick={() => navigate(getArticleHref(secondaryArticle))}
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(15,23,42,0.90))",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    {secondaryArticle.mainImage && (
                      <img
                        src={urlFor(secondaryArticle.mainImage).width(460).height(280).url()}
                        alt={secondaryArticle.title}
                        className="latest-medium-image"
                      />
                    )}

                    <div className="latest-medium-content">
                      <span
                        className="latest-rank-pill"
                        style={{
                          background: "rgba(34,197,94,0.13)",
                          color: "#86efac",
                        }}
                      >
                        #2 Latest
                      </span>

                      <h3 className="latest-medium-title" style={{ color: "#f8fafc" }}>
                        {secondaryArticle.title}
                      </h3>

                      <p
                        className="latest-medium-excerpt"
                        style={{ color: "rgba(255,255,255,0.74)" }}
                      >
                        {getExcerpt(secondaryArticle)}
                      </p>

                      <div className="latest-card-footer">
                        <span style={{ color: "rgba(255,255,255,0.72)" }}>
                          {secondaryArticle.publishedAt
                            ? new Date(secondaryArticle.publishedAt).toLocaleDateString("en-IN")
                            : "Latest"}
                        </span>
                        <span style={{ color: "#a5b4fc" }}>Read {"->"}</span>
                      </div>
                    </div>
                  </article>
                )}

                <div className="latest-compact-list">
                  {compactArticles.map((post, index) => (
                    <article
                      key={`latest-${post._id}`}
                      className="latest-compact-card latest-hover-card"
                      onClick={() => navigate(getArticleHref(post))}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(15,23,42,0.88))",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      {post.mainImage && (
                        <img
                          src={urlFor(post.mainImage).width(220).height(160).url()}
                          alt={post.title}
                          className="latest-compact-image"
                        />
                      )}

                      <div className="latest-compact-content">
                        <div className="latest-compact-meta">
                          <strong style={{ color: "#c4b5fd" }}>
                            #{index + 3} Latest
                          </strong>
                          <span style={{ color: "rgba(255,255,255,0.68)" }}>
                            {post.category?.title || "Article"}
                          </span>
                        </div>

                        <h3 className="latest-compact-title" style={{ color: "#f8fafc" }}>
                          {post.title}
                        </h3>

                        <div className="latest-compact-footer">
                          <span style={{ color: "rgba(255,255,255,0.66)" }}>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-IN")
                              : "Latest"}
                          </span>
                          <span style={{ color: "#a5b4fc" }}>Read {"->"}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              width: "260px",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {filteredPosts.length === 0 && (
            <div>
              <p style={{ opacity: 0.6 }}>
                {isLoading
                  ? "Loading articles..."
                  : "No articles match your search yet."}
              </p>

              <div style={{ marginTop: "20px", fontSize: "14px", opacity: "0.7" }}>
                Explore student articles on study tips, exam preparation,
                productivity and learning strategies designed for better
                performance.
              </div>
            </div>
          )}

          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(getArticleHref(post))}
              style={{
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                transition: "0.3s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).height(350).url()}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: "20px" }}>
                {post.publishedAt && (
                  <p
                    style={{
                      fontSize: "12px",
                      opacity: 0.6,
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-IN")}
                  </p>
                )}

                <h3
                  style={{
                    fontSize: "18px",
                    margin: "10px 0",
                  }}
                >
                  {post.title}
                </h3>

                {post.category?.title && (
                  <span
                    style={{
                      fontSize: "12px",
                      background: "#4f46e5",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {post.category.title}
                  </span>
                )}

                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.7,
                    marginTop: "10px",
                  }}
                >
                  {getExcerpt(post)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredPosts.length && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              style={{
                padding: "12px 30px",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Load More Articles {"->"}
            </button>
          </div>
        )}

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        <div style={{ marginTop: "60px" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontWeight: "800",
                color: "var(--primary)",
                marginBottom: "10px",
              }}
            >
              Explore Courses by Stream
            </h2>

            <p
              style={{
                maxWidth: "720px",
                margin: "auto",
                opacity: "0.85",
              }}
            >
              Different streams offer different career opportunities. Explore
              the best courses available for Science, Commerce and Arts students
              after completing 12th.
            </p>
          </div>

          <div className="grid">
            <div
              className="glass"
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                Courses After 12th Science
              </h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Explore engineering, medical, IT and technology courses for
                science students including B.Tech, MBBS, BCA and data science
                programs.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-science")}
              >
                Explore Science Courses {"->"}
              </button>
            </div>

            <div
              className="glass"
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                Courses After 12th Commerce
              </h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Discover business, finance and accounting career options
                including BCom, BBA, CA, CS and management related programs.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-commerce")}
              >
                Explore Commerce Courses {"->"}
              </button>
            </div>

            <div
              className="glass"
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Courses After 12th Arts</h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Explore creative and analytical career paths including
                journalism, psychology, law, design and humanities programs.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-arts")}
              >
                Explore Arts Courses {"->"}
              </button>
            </div>
          </div>
        </div>

        <div
          className="glass"
          style={{
            marginTop: "80px",
            padding: "45px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "800",
              marginBottom: "15px",
              color: "var(--primary)",
            }}
          >
            Confused About Career Options After 12th?
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            Discover the best courses after 12th for Science, Commerce and Arts
            students. Explore high salary career options, professional courses,
            diploma programs and degree courses that can help you build a
            successful career.
          </p>

          <button
            className="btn-primary"
            style={{
              padding: "14px 30px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/courses-after-12th")}
          >
            Explore Courses After 12th {"->"}
          </button>
        </div>

        <div
          className="glass"
          style={{
            marginTop: "70px",
            padding: "45px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "800",
              color: "var(--primary)",
              marginBottom: "15px",
            }}
          >
            Looking for Engineering Study Notes?
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            Access organized diploma and computer science study materials
            including DBMS notes, Data Structure notes, Operating System notes,
            Computer Network notes and programming tutorials designed for
            engineering students.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate("/notes-library")}
          >
            Explore Study Materials {"->"}
          </button>
        </div>

        <div
          className="glass"
          style={{
            marginTop: "70px",
            padding: "45px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "800",
              color: "var(--primary)",
              marginBottom: "15px",
            }}
          >
            Free Student Productivity Tools
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            Use helpful academic tools like CGPA calculators, percentage
            converters, GPA calculators and Pomodoro study timers designed to
            help students study smarter and manage their academic performance
            efficiently.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate("/student-tools")}
          >
            Explore Student Tools {"->"}
          </button>
        </div>

        <div
          className="glass"
          style={{
            marginTop: "70px",
            padding: "45px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "800",
              color: "var(--primary)",
              marginBottom: "15px",
            }}
          >
            Preparing for Government Exams?
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            Explore guides and preparation strategies for SSC, Railway, Banking
            and other government exams. Learn effective study methods, exam
            preparation strategies and career paths for government jobs in
            India.
          </p>

          <button className="btn-primary" onClick={() => navigate("/blog")}>
            Explore Exam Preparation Guides {"->"}
          </button>
        </div>

        <div
          style={{
            padding: "40px",
            borderRadius: "22px",
            marginTop: "80px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Why Study Tips and Learning Guides Matter
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.7",
            }}
          >
            Effective study strategies help students learn faster and retain
            information longer. From time-management techniques to active
            learning methods, structured study guides can improve academic
            performance and reduce exam stress. NextGen Study Hub provides
            practical advice, productivity tips and learning resources to
            support engineering and diploma students throughout their academic
            journey.
          </p>
        </div>

        <div
          className="glass"
          style={{
            maxWidth: "800px",
            margin: "80px auto",
            padding: "50px 40px",
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#6366f1",
            }}
          >
            More Useful Features Are Coming Soon
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              opacity: 0.8,
              maxWidth: "650px",
              margin: "auto",
            }}
          >
            We are continuously improving the platform to make your academic
            journey smarter, faster and more productive. Share your suggestion
            through the contact page and help shape the next useful feature.
          </p>

          <p
            style={{
              marginTop: "25px",
              fontSize: "15px",
              opacity: 0.8,
            }}
          >
            What feature would you like to see next?
          </p>

          <button
            className="btn-primary"
            style={{
              marginTop: "25px",
              padding: "14px 28px",
              fontSize: "15px",
              borderRadius: "30px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/contact-owner")}
          >
            Send Your Suggestion
          </button>
        </div>

        <div
          style={{
            height: "2px",
            width: "120px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            margin: "80px auto 40px auto",
            borderRadius: "10px",
          }}
        />

        <div
          style={{
            marginTop: "100px",
            maxWidth: "900px",
            marginInline: "auto",
            lineHeight: "1.8",
          }}
        >
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Why Read Articles on NextGen Study Hub?
          </h2>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            NextGen Study Hub is a learning platform for students who want
            educational content, practical guidance and real-world insights. The
            articles section covers study tips, exam preparation strategies,
            career guidance, programming tutorials, productivity techniques and
            educational resources for diploma, engineering and competitive exam
            students.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Whether you are preparing for government exams, improving academic
            performance in engineering subjects or exploring new career
            opportunities, these articles are designed to be clear, structured
            and actionable.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            In addition to academic content, NextGen Study Hub also features
            articles on student productivity, time management, learning
            strategies, skill development and emerging technologies.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            The goal is not just to publish content, but to create practical
            resources that students can actually apply in their studies and
            career preparation.
          </p>

          <p style={{ opacity: 0.8 }}>
            Explore the latest educational articles, study guides and
            career-focused content to strengthen your learning journey and stay
            updated with useful trends in education.
          </p>
        </div>
      </div>
    </>
  );
}
