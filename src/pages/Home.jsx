import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import SmartFooterSection from "../components/SmartFooterSection";
import SEO from "../components/SEO";
import generatedArticles from "../data/generatedArticles.json";
import { client } from "../lib/sanityClient";
import { urlFor } from "../lib/sanityImage";
import { ThemeContext } from "../context/ThemeContext";

const TextTicker = lazy(() => import("../components/TextTicker"));
const SemesterSection = lazy(() => import("../components/SemesterSection"));
const Features = lazy(() => import("../components/Features"));
const PremiumSection = lazy(() => import("../components/PremiumSection"));
const Testimonials = lazy(() => import("../components/Testimonials"));

const heroHighlights = [
  {
    title: "Semester-wise Notes",
    description: "Structured study material for diploma and engineering students.",
  },
  {
    title: "Student Tools",
    description: "Useful calculators, planners, and AI-powered helpers in one place.",
  },
  {
    title: "Career Guidance",
    description: "Internships, articles, and roadmaps that keep students moving forward.",
  },
];

const heroQuickLinks = [
  {
    label: "Engineering Notes Library",
    description: "Semester-wise material, revision help, and academic resources.",
    href: "/notes-library",
  },
  {
    label: "Student Productivity Tools",
    description: "GPA calculator, AI assistant, planners, and study utilities.",
    href: "/student-tools",
  },
  {
    label: "Latest Study Articles",
    description: "Fresh educational content published from your Sanity workflow.",
    href: "/articles",
  },
  {
    label: "Internships and Jobs",
    description: "Career opportunities, fresher roles, and practical exposure.",
    href: "/jobs",
  },
];

const streamCards = [
  {
    title: "Courses After 12th Science",
    description:
      "Explore engineering, medical, IT and technology courses for science students including B.Tech, MBBS, BCA and data science programs.",
    cta: "Explore Science Courses ->",
    href: "/courses-after-12th-science",
  },
  {
    title: "Courses After 12th Commerce",
    description:
      "Discover business, finance and accounting career options including BCom, BBA, CA, CS and management related programs.",
    cta: "Explore Commerce Courses ->",
    href: "/courses-after-12th-commerce",
  },
  {
    title: "Courses After 12th Arts",
    description:
      "Explore creative and analytical career paths including journalism, psychology, law, design and humanities programs.",
    cta: "Explore Arts Courses ->",
    href: "/courses-after-12th-arts",
  },
];

const platformOffers = [
  "Organized semester-wise engineering study materials",
  "Smart academic tools such as GPA calculators",
  "Learning guides and study tips",
  "Internship and career opportunity listings",
  "Productivity tools to improve study efficiency",
  "A centralized hub for student resources",
];

const notesFeatureCards = [
  {
    title: "Structured Learning Content",
    description:
      "Access organized study materials and semester-wise notes designed to simplify complex engineering concepts.",
  },
  {
    title: "Academic Productivity Tools",
    description:
      "Use digital tools such as GPA calculators and learning utilities to track your academic progress.",
  },
  {
    title: "Smart Study Assistance",
    description:
      "Improve learning efficiency with structured resources and organized study guides.",
  },
  {
    title: "Career Opportunities",
    description:
      "Explore internships and job opportunities to gain practical experience during your studies.",
  },
];

const studyResources = [
  "Semester study notes",
  "Engineering subject materials",
  "Quick revision guides",
  "Concept explanations",
  "Exam preparation resources",
  "Organized academic materials",
];

const careerHighlights = [
  "Internship opportunities for engineering students",
  "Fresher job listings for diploma graduates",
  "Early career opportunities to build experience",
  "Skill-building opportunities through internships",
  "Career exposure during academic studies",
  "Opportunities to grow professionally",
];

const resourceLinks = [
  { label: "Study Tips for Students", href: "/blog" },
  { label: "CGPA Calculator for diploma students", href: "/student-tools" },
  { label: "Engineering Notes PDF download", href: "/notes-library" },
  { label: "Internships for Students students", href: "/jobs" },
];

function getArticleExcerpt(post) {
  const firstBlock = Array.isArray(post.body)
    ? post.body.find((block) => Array.isArray(block?.children))
    : null;
  const text = firstBlock?.children
    ?.map((child) => child?.text || "")
    .join(" ")
    .trim();

  return text
    ? `${text.slice(0, 95)}...`
    : "Read this latest article on NextGen Study Hub.";
}

function SurfaceIntro({ title, description, align = "left" }) {
  return (
    <div
      className="home-section-intro"
      style={{
        textAlign: align,
        marginBottom: "32px",
      }}
    >
      <h2
        style={{
          fontWeight: "800",
          color: "var(--primary)",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          style={{
            maxWidth: align === "center" ? "780px" : "720px",
            margin: align === "center" ? "0 auto" : 0,
            opacity: "0.82",
            lineHeight: "1.8",
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="home-side-panel">
      <h3 style={{ marginBottom: "15px", fontWeight: "700" }}>{title}</h3>
      <ul className="home-info-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState(generatedArticles);
  const isDark = theme === "dark";
  const latestArticles = posts.slice(0, 7);
  const featuredArticle = latestArticles[0];
  const secondaryArticle = latestArticles[1];
  const compactArticles = latestArticles.slice(2, 7);

  useEffect(() => {
    const query = `*[_type == "post" && defined(slug.current)]
      | order(coalesce(publishedAt, _updatedAt) desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        _updatedAt,
        body,
        category->{title}
      }`;

    client.fetch(query).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      }
    });
  }, []);

  const dividerStyle = {
    height: "1px",
    background: isDark
      ? "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.18), transparent)"
      : "linear-gradient(90deg, transparent, rgba(31, 59, 115, 0.18), transparent)",
    margin: "72px 0",
  };

  return (
    <>
      <Helmet>
        <title>
          NextGen Study Hub - Diploma Engineering Notes, Study Materials,
          Student Tools & Internships
        </title>

        <meta
          name="description"
          content="NextGen Study Hub helps diploma and engineering students with semester-wise notes, study materials, productivity tools, internships, academic guides and learning resources designed for academic success."
        />

        <meta
          name="keywords"
          content="
study tips,
study tips motivation,
study tips for students,
study tips for exams,
study tips for toppers,
study tips memorization,
study tips for maths,
study tips for engineering students,
study tips for diploma students,
study tips for college students,
study tips for competitive exams,
how to study effectively,
how to study smarter,
how to improve memory for studying,
best study techniques,
best study strategies,
study motivation for students,
study motivation tips,
student productivity tips,
student learning strategies,
exam preparation tips,
exam study tips,
how to focus while studying,
how to concentrate on studies,
how to remember what you study,
active recall study method,
spaced repetition study method,
pomodoro technique for students,
time management for students,
study schedule for students,
study planner tips,
study routine for toppers,
daily study routine,
how toppers study,
learning techniques for students,
learning tips for engineering students,
study hacks for students,
how to avoid procrastination while studying,
how to stay motivated to study,
how to study long hours,
how to improve academic performance,
student success tips,
academic productivity tools,
study resources for students,
engineering study materials,
diploma engineering notes,
semester notes for engineering students,
engineering study guide,
online study platform,
study hub for students,
learning platform for students,
student career resources,
student internships opportunities,
tools for students productivity,
study apps and tools,
education platform for engineering students
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/" />
      </Helmet>
      <SEO
        title="Diploma Engineering Notes, Study Materials, Student Tools & Internships"
        description="NextGen Study Hub helps Indian diploma and engineering students with semester-wise notes, DBMS and programming resources, CGPA calculators, Pomodoro timer, exam preparation guides, internships and career roadmaps."
        url="https://www.atulsharmas.in/"
        schemaType="WebPage"
        modifiedTime="2026-04-14"
      />

      <div className="home-page">
        <section className="section home-hero-section">
          <div className="home-hero-backdrop" aria-hidden="true">
            <img
              src="public/annie-spratt-J67BWDuNq0U-unsplash.jpg"
              alt=""
              className="home-hero-backdrop-image"
            />
          </div>

          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <span className="home-hero-kicker">
                Study smarter with one modern platform
              </span>

              <h1 className="home-hero-title">
                NextGen Study Hub - Diploma Engineering Notes, Study Materials,
                Student Tools & Internships
              </h1>

              <p className="home-hero-description">
                NextGen Study Hub is a student platform offering diploma
                engineering notes, semester study materials, productivity
                tools, AI study assistants, and career opportunities to help
                students learn smarter and succeed academically.
              </p>

              <div className="home-hero-actions">
                <button
                  className="btn-primary"
                  style={{
                    padding: "16px 32px",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate("/student-tools")}
                >
                  Explore Student Tools
                </button>

                <button
                  className="btn-secondary-outline"
                  onClick={() => navigate("/semester/2")}
                >
                  Start Learning
                </button>
              </div>

              <div className="home-hero-stats">
                {heroHighlights.map((item) => (
                  <div key={item.title} className="home-hero-stat">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass home-hero-visual">
              <div className="home-hero-visual-copy">
                <span className="home-hero-visual-label">Featured right now</span>
                <h2>Designed to pull students deeper into notes, tools, and articles.</h2>
                <p>
                  The homepage now opens like a modern product landing page
                  while still keeping the reading flow clean for search users
                  and ad placements.
                </p>
              </div>

              {featuredArticle && (
                <article
                  className="home-hero-feature-card"
                  onClick={() => navigate(`/articles/${featuredArticle.slug.current}`)}
                >
                  {featuredArticle.mainImage && (
                    <img
                      src={urlFor(featuredArticle.mainImage).width(900).height(520).url()}
                      alt={featuredArticle.title}
                      className="home-hero-feature-image"
                    />
                  )}
                  <div className="home-hero-feature-copy">
                    <span className="home-hero-feature-tag">Latest article</span>
                    <h3>{featuredArticle.title}</h3>
                    <p>{getArticleExcerpt(featuredArticle)}</p>
                  </div>
                </article>
              )}

              <div className="home-hero-quick-grid">
                {heroQuickLinks.slice(0, 2).map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="home-hero-quick-card"
                    onClick={() => navigate(item.href)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="home-hero-link-band">
            {heroQuickLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                className="glass home-hero-link-card"
                onClick={() => navigate(item.href)}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>

          <div className="home-scroll-invite">
            <span>Explore notes, tools, articles, and career resources in one focused scroll.</span>
            <button
              type="button"
              className="btn-secondary-outline"
              onClick={() => navigate("/articles")}
            >
              See What Students Read
            </button>
          </div>
        </section>

        <div className="home-ticker-wrap">
          <Suspense fallback={<div>Loading...</div>}>
            <TextTicker />
          </Suspense>
        </div>

        <div style={dividerStyle} />

        {latestArticles.length > 0 && (
          <>
            <section
              className="home-surface latest-section-panel"
              style={{
                position: "relative",
                padding: "clamp(32px,5vw,56px)",
                borderRadius: "28px",
                margin: "70px 0",
                overflow: "visible",
                background: isDark
                  ? "linear-gradient(145deg, rgba(10,22,36,0.95), rgba(17,24,39,0.92))"
                  : "linear-gradient(145deg, rgba(255,252,248,0.96), rgba(247,242,236,0.98))",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(31,59,115,0.10)",
                boxShadow: isDark
                  ? "0 28px 80px rgba(2,6,23,0.34)"
                  : "0 24px 70px rgba(31,59,115,0.10)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "auto auto -120px -120px",
                  width: "260px",
                  height: "260px",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle, rgba(44, 122, 123, 0.20), transparent 70%)",
                  filter: "blur(18px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "-90px -40px auto auto",
                  width: "260px",
                  height: "260px",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle, rgba(201, 123, 75, 0.20), transparent 70%)",
                  filter: "blur(22px)",
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
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "30px",
                }}
              >
                <div style={{ maxWidth: "760px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      marginBottom: "12px",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(31,59,115,0.07)",
                      color: isDark ? "#dbeafe" : "#1f3b73",
                      fontSize: "13px",
                      fontWeight: "700",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Fresh From Sanity
                  </span>

                  <h2
                    style={{
                      fontSize: "clamp(2rem,4vw,2.8rem)",
                      fontWeight: "900",
                      marginBottom: "14px",
                      color: isDark ? "#f8fafc" : "#18212b",
                    }}
                  >
                    Latest Published Articles
                  </h2>

                  <p
                    style={{
                      maxWidth: "720px",
                      color: isDark ? "rgba(255,255,255,0.82)" : "#4b5563",
                      lineHeight: "1.8",
                      margin: 0,
                    }}
                  >
                    Your newest Sanity articles appear here automatically after
                    each deploy. Only the latest 7 stay on the home page, so
                    new posts push older ones out and keep this section fresh.
                  </p>
                </div>

                <button
                  className="btn-primary"
                  style={{
                    padding: "14px 28px",
                    borderRadius: "999px",
                    fontWeight: "700",
                  }}
                  onClick={() => navigate("/articles")}
                >
                  View All Articles
                </button>
              </div>

              <div className="latest-articles-layout">
                {featuredArticle && (
                  <article
                    className="latest-feature-card latest-hover-card"
                    onClick={() =>
                      navigate(`/articles/${featuredArticle.slug.current}`)
                    }
                    style={{
                      background: isDark
                        ? "linear-gradient(180deg, rgba(31,59,115,0.24), rgba(10,22,36,0.94))"
                        : "linear-gradient(180deg, rgba(31,59,115,0.10), rgba(255,255,255,0.98))",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.10)"
                        : "1px solid rgba(15,23,42,0.08)",
                      boxShadow: isDark
                        ? "0 22px 50px rgba(2,6,23,0.32)"
                        : "0 18px 40px rgba(15,23,42,0.08)",
                    }}
                  >
                    {featuredArticle.mainImage && (
                      <img
                        src={urlFor(featuredArticle.mainImage)
                          .width(1100)
                          .height(620)
                          .url()}
                        alt={featuredArticle.title}
                        className="latest-feature-image"
                      />
                    )}

                    <div className="latest-feature-content">
                      <div className="latest-meta-row">
                        <span
                          className="latest-rank-pill"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.10)"
                              : "rgba(31,59,115,0.10)",
                            color: isDark ? "#dbeafe" : "#1f3b73",
                          }}
                        >
                          Featured Article
                        </span>

                        {featuredArticle.publishedAt && (
                          <span
                            style={{
                              color: isDark
                                ? "rgba(255,255,255,0.74)"
                                : "#6b7280",
                            }}
                          >
                            {new Date(
                              featuredArticle.publishedAt,
                            ).toLocaleDateString("en-IN")}
                          </span>
                        )}
                      </div>

                      <h3
                        className="latest-feature-title"
                        style={{ color: isDark ? "#f8fafc" : "#111827" }}
                      >
                        {featuredArticle.title}
                      </h3>

                      <p
                        className="latest-feature-excerpt"
                        style={{
                          color: isDark ? "rgba(255,255,255,0.78)" : "#4b5563",
                        }}
                      >
                        {getArticleExcerpt(featuredArticle)}
                      </p>

                      <div className="latest-card-footer">
                        <span
                          style={{
                            color: isDark
                              ? "rgba(255,255,255,0.72)"
                              : "#6b7280",
                          }}
                        >
                          {featuredArticle.category?.title || "Student Article"}
                        </span>
                        <span style={{ color: isDark ? "#dbeafe" : "#1f3b73" }}>
                          Read More {"->"}
                        </span>
                      </div>
                    </div>
                  </article>
                )}

                <div className="latest-side-column">
                  {secondaryArticle && (
                    <article
                      className="latest-medium-card latest-hover-card"
                      onClick={() =>
                        navigate(`/articles/${secondaryArticle.slug.current}`)
                      }
                      style={{
                        background: isDark
                          ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(10,22,36,0.92))"
                          : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.10)"
                          : "1px solid rgba(15,23,42,0.08)",
                      }}
                    >
                      {secondaryArticle.mainImage && (
                        <img
                          src={urlFor(secondaryArticle.mainImage)
                            .width(460)
                            .height(280)
                            .url()}
                          alt={secondaryArticle.title}
                          className="latest-medium-image"
                        />
                      )}

                      <div className="latest-medium-content">
                        <span
                          className="latest-rank-pill"
                          style={{
                            background: isDark
                              ? "rgba(44,122,123,0.16)"
                              : "rgba(44,122,123,0.10)",
                            color: isDark ? "#99f6e4" : "#115e59",
                          }}
                        >
                          #2 Latest
                        </span>

                        <h3
                          className="latest-medium-title"
                          style={{ color: isDark ? "#f8fafc" : "#111827" }}
                        >
                          {secondaryArticle.title}
                        </h3>

                        <p
                          className="latest-medium-excerpt"
                          style={{
                            color: isDark ? "rgba(255,255,255,0.74)" : "#6b7280",
                          }}
                        >
                          {getArticleExcerpt(secondaryArticle)}
                        </p>

                        <div className="latest-card-footer">
                          <span
                            style={{
                              color: isDark
                                ? "rgba(255,255,255,0.72)"
                                : "#6b7280",
                            }}
                          >
                            {secondaryArticle.publishedAt
                              ? new Date(
                                  secondaryArticle.publishedAt,
                                ).toLocaleDateString("en-IN")
                              : "Latest"}
                          </span>
                          <span style={{ color: isDark ? "#dbeafe" : "#1f3b73" }}>
                            Read {"->"}
                          </span>
                        </div>
                      </div>
                    </article>
                  )}

                  <div className="latest-compact-list">
                    {compactArticles.map((post, index) => (
                      <article
                        key={post._id}
                        className="latest-compact-card latest-hover-card"
                        onClick={() => navigate(`/articles/${post.slug.current}`)}
                        style={{
                          background: isDark
                            ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(10,22,36,0.88))"
                            : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))",
                          border: isDark
                            ? "1px solid rgba(255,255,255,0.09)"
                            : "1px solid rgba(15,23,42,0.07)",
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
                            <strong style={{ color: isDark ? "#dbeafe" : "#1f3b73" }}>
                              #{index + 3} Latest
                            </strong>
                            <span
                              style={{
                                color: isDark
                                  ? "rgba(255,255,255,0.68)"
                                  : "#6b7280",
                              }}
                            >
                              {post.category?.title || "Article"}
                            </span>
                          </div>

                          <h3
                            className="latest-compact-title"
                            style={{ color: isDark ? "#f8fafc" : "#111827" }}
                          >
                            {post.title}
                          </h3>

                          <div className="latest-compact-footer">
                            <span
                              style={{
                                color: isDark
                                  ? "rgba(255,255,255,0.66)"
                                  : "#6b7280",
                              }}
                            >
                              {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString("en-IN")
                                : "Latest"}
                            </span>
                            <span style={{ color: isDark ? "#dbeafe" : "#1f3b73" }}>
                              Read {"->"}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div style={dividerStyle} />
          </>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <SemesterSection />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <SmartFooterSection />
        </Suspense>

        <div style={dividerStyle} />

        <div className="home-section-block" style={{ marginTop: "60px" }}>
          <SurfaceIntro
            title="Explore Courses by Stream"
            description="Different streams offer different career opportunities. Explore the best courses available for Science, Commerce and Arts students after completing 12th."
            align="center"
          />

          <div className="grid">
            {streamCards.map((card) => (
              <div
                key={card.title}
                className="glass home-course-card"
                style={{ padding: "30px", textAlign: "center" }}
              >
                <h3 style={{ marginBottom: "10px" }}>{card.title}</h3>
                <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                  {card.description}
                </p>
                <button
                  className="btn-primary"
                  onClick={() => navigate(card.href)}
                >
                  {card.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={dividerStyle} />

        <section
          className="glass home-surface"
          style={{
            padding: "clamp(50px,7vw,90px)",
            borderRadius: "26px",
            margin: "90px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,2.6rem)",
                fontWeight: "900",
                marginBottom: "20px",
                color: "var(--primary)",
              }}
            >
              About NextGen Study Hub
            </h2>

            <p style={{ lineHeight: "1.8", opacity: "0.9", marginBottom: "20px" }}>
              NextGen Study Hub is a modern academic platform designed to help
              students learn more effectively and stay organized throughout
              their academic journey. The platform combines structured study
              materials, intelligent productivity tools and career resources to
              create a complete learning environment for diploma and engineering
              students.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85", marginBottom: "20px" }}>
              Instead of searching multiple websites for notes, tools and
              academic resources, students can access everything in one place.
              From semester study materials to digital learning tools, NextGen
              Study Hub aims to simplify the learning process and help students
              focus on what truly matters - understanding concepts and
              improving academic performance.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85" }}>
              The platform is continuously evolving with new features, learning
              resources and productivity tools to support students in building
              better study habits and achieving their academic goals.
            </p>

            <button
              className="btn-primary"
              style={{
                marginTop: "30px",
                padding: "14px 32px",
                fontSize: "15px",
                borderRadius: "40px",
                fontWeight: "600",
              }}
              onClick={() => navigate("/about")}
            >
              Learn More About the Platform
            </button>
          </div>

          <DetailList title="What the Platform Offers" items={platformOffers} />
        </section>

        <div style={dividerStyle} />

        <Suspense fallback={<div>Loading...</div>}>
          <Features />
        </Suspense>

        <div style={dividerStyle} />

        <section
          className="glass home-surface"
          style={{
            padding: "clamp(40px,6vw,70px)",
            borderRadius: "24px",
            margin: "90px 0",
            textAlign: "center",
          }}
        >
          <SurfaceIntro
            title="Engineering Notes Library"
            description="Explore a comprehensive collection of diploma engineering study notes designed to help students understand complex subjects more easily. The Notes Library contains organized semester-wise materials, key concepts, and exam-focused resources to support effective learning and quick revision."
            align="center"
          />

          <p
            style={{
              maxWidth: "760px",
              margin: "25px auto",
              opacity: "0.8",
              lineHeight: "1.7",
            }}
          >
            Students can access structured notes covering important topics in
            engineering subjects, making it easier to prepare for exams and
            strengthen conceptual understanding.
          </p>

          <button
            className="btn-primary"
            style={{
              marginTop: "30px",
              padding: "14px 32px",
              fontSize: "15px",
              borderRadius: "40px",
              fontWeight: "600",
            }}
            onClick={() => navigate("/notes-library")}
          >
            Explore Notes Library
          </button>
        </section>

        <div style={dividerStyle} />

        <SurfaceIntro
          title="Student Productivity Tools - GPA Calculator, AI Assistant & Study Planner"
          align="center"
        />

        <div style={dividerStyle} />

        <section
          className="glass home-surface"
          style={{
            padding: "clamp(50px,7vw,90px)",
            borderRadius: "26px",
            margin: "90px 0",
            textAlign: "center",
          }}
        >
          <SurfaceIntro
            title="Powerful Features of NextGen Study Hub"
            description="NextGen Study Hub combines multiple learning tools and academic resources into one platform. The goal is to help students organize their study materials, track their progress and improve learning efficiency without switching between different websites or tools."
            align="center"
          />

          <div className="home-feature-grid">
            {notesFeatureCards.map((card) => (
              <div
                key={card.title}
                className="glass home-feature-card"
                style={{ padding: "30px", borderRadius: "18px" }}
              >
                <h3 style={{ marginBottom: "10px" }}>{card.title}</h3>
                <p style={{ opacity: "0.85", lineHeight: "1.6" }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <button
            className="btn-primary"
            style={{
              marginTop: "50px",
              padding: "14px 32px",
              fontSize: "15px",
              borderRadius: "40px",
              fontWeight: "600",
            }}
            onClick={() => navigate("/student-tools")}
          >
            Explore Student Tools
          </button>
        </section>

        <div style={dividerStyle} />

        <section
          className="glass home-surface"
          style={{
            padding: "clamp(50px,7vw,90px)",
            borderRadius: "26px",
            margin: "90px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,2.6rem)",
                fontWeight: "900",
                marginBottom: "20px",
                color: "var(--primary)",
              }}
            >
              Engineering Learning Resources
            </h2>

            <p style={{ lineHeight: "1.8", opacity: "0.9", marginBottom: "20px" }}>
              NextGen Study Hub provides a wide range of learning resources to
              help engineering students understand subjects more clearly and
              prepare effectively for exams.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85", marginBottom: "20px" }}>
              Students can explore structured notes, study guides and academic
              materials that focus on important concepts, definitions and
              exam-relevant topics.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85" }}>
              These resources help simplify learning and allow students to
              revise topics quickly while improving conceptual understanding.
            </p>

            <button
              className="btn-primary"
              style={{
                marginTop: "30px",
                padding: "14px 32px",
                fontSize: "15px",
                borderRadius: "40px",
                fontWeight: "600",
              }}
              onClick={() => navigate("/notes-library")}
            >
              Browse Learning Resources
            </button>
          </div>

          <DetailList title="Available Study Resources" items={studyResources} />
        </section>

        <div style={dividerStyle} />

        <section
          className="glass home-surface"
          style={{
            padding: "clamp(50px,7vw,90px)",
            borderRadius: "26px",
            margin: "90px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <DetailList
            title="Career Opportunities for Students"
            items={careerHighlights}
          />

          <div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,2.6rem)",
                fontWeight: "900",
                marginBottom: "20px",
                color: "var(--primary)",
              }}
            >
              Internships and Career Opportunities for Students
            </h2>

            <p style={{ lineHeight: "1.8", opacity: "0.9", marginBottom: "20px" }}>
              NextGen Study Hub helps students discover valuable career
              opportunities while they are still studying. The platform
              connects learners with internship programs and entry-level job
              opportunities that allow them to gain practical experience and
              build professional skills.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85", marginBottom: "20px" }}>
              Through internships and early career opportunities, students can
              apply their academic knowledge in real-world situations, develop
              industry-relevant skills and improve their chances of securing
              better job opportunities after graduation.
            </p>

            <p style={{ lineHeight: "1.8", opacity: "0.85" }}>
              Whether you are looking for internships, fresher roles or career
              exposure opportunities, the platform provides a centralized place
              where students can explore and discover professional growth
              opportunities.
            </p>

            <button
              className="btn-primary"
              style={{
                marginTop: "30px",
                padding: "14px 32px",
                fontSize: "15px",
                borderRadius: "40px",
                fontWeight: "600",
              }}
              onClick={() => navigate("/jobs")}
            >
              Explore Career Opportunities
            </button>
          </div>
        </section>

        <div style={dividerStyle} />

        <Suspense fallback={<div>Loading...</div>}>
          <PremiumSection />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Testimonials />
        </Suspense>

        <section className="home-seo-links">
          <h2>Student Learning Resources and Study Materials</h2>

          <p>
            NextGen Study Hub provides a wide range of academic resources
            including diploma engineering notes, programming notes, computer
            science study materials, exam preparation guides and productivity
            tools for students.
          </p>

          <p>
            Students can explore DBMS notes, C programming notes, operating
            system notes, data structure notes, computer network notes and
            other engineering study materials designed for diploma and
            engineering students.
          </p>

          <p>
            The platform also offers useful tools such as a CGPA to percentage
            calculator, GPA calculator, study timer, Pomodoro study timer and
            other academic utilities that help students manage their study
            schedule effectively.
          </p>

          <p>
            Students preparing for competitive exams can also access guides for
            SSC exams, banking exams, railway exams, government jobs after
            diploma and career guidance resources.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            {resourceLinks.map((link) => (
              <a key={link.label} className="resource-link" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
