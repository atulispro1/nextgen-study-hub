import { lazy, Suspense, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import SmartFooterSection from "../components/SmartFooterSection";
import generatedArticles from "../data/generatedArticles.json";
import { urlFor } from "../lib/sanityImage";
import { ThemeContext } from "../context/ThemeContext";
const TextTicker = lazy(() => import("../components/TextTicker"));
const StatsSection = lazy(() => import("../components/StatsSection"));
const SemesterSection = lazy(() => import("../components/SemesterSection"));
const Features = lazy(() => import("../components/Features"));
const PremiumSection = lazy(() => import("../components/PremiumSection"));
const Testimonials = lazy(() => import("../components/Testimonials"));

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

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const latestArticles = generatedArticles.slice(0, 7);
  const isDark = theme === "dark";
  const dividerStyle = {
    height: "3px",
    background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
    margin: "80px 0",
  };
  const heroSectionStyle = {
    position: "relative",
    textAlign: "center",
    overflow: "hidden",
    paddingTop: "120px",
    paddingBottom: "120px",
  };

  return (
    <>
      <Helmet>
        <title>
          NextGen Study Hub – Study Tips, Diploma Notes, Study Materials,
          Internships & Student Tools
        </title>

        <meta
          name="description"
          content="NextGen Study Hub helps students succeed with study tips, motivation strategies, diploma engineering notes, learning resources, internships and productivity tools designed for academic success."
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

      <section className="section" style={heroSectionStyle}>
        {/* Background Gradient Blobs */}

        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            top: "-200px",
            left: "-200px",
            opacity: 0.25,
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            bottom: "-200px",
            right: "-200px",
            opacity: 0.25,
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        {/* SEO Heading */}

        <h1
          style={{
            fontSize: "clamp(2.5rem,6vw,3.6rem)",
            fontWeight: "900",
            marginBottom: "25px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          NextGen Study Hub – Diploma Engineering Notes, Study Materials,
          Student Tools & Internships
        </h1>

        {/* SEO Description */}

        <p
          style={{
            fontSize: "clamp(16px,2vw,20px)",
            maxWidth: "820px",
            margin: "auto",
            opacity: 0.85,
            lineHeight: "1.8",
          }}
        >
          NextGen Study Hub is a student platform offering diploma engineering
          notes, semester study materials, productivity tools, AI study
          assistants, and career opportunities to help students learn smarter
          and succeed academically.
        </p>

        {/* CTA Buttons */}

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "22px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary"
            style={{
              padding: "16px 32px",
              fontSize: "16px",
            }}
            onClick={() => navigate("/student-tools")}
          >
            ✨ Explore Student AI Tools{" "}
          </button>

          <button
            onClick={() => navigate("/semester/2")}
            style={{
              padding: "16px 40px",
              borderRadius: "12px",
              border: "1px solid #6366f1",
              background: "transparent",
              color: "#6366f1",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🚀 Start Learning{" "}
          </button>
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <TextTicker />
      </Suspense>

      <div style={dividerStyle} />

      {latestArticles.length > 0 && (
        <>
          <section
            style={{
              position: "relative",
              padding: "clamp(32px,5vw,56px)",
              borderRadius: "28px",
              margin: "70px 0",
              overflow: "hidden",
              background: isDark
                ? "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,41,59,0.92))"
                : "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(238,242,255,0.96))",
              border: isDark
                ? "1px solid rgba(99,102,241,0.16)"
                : "1px solid rgba(99,102,241,0.12)",
              boxShadow: isDark
                ? "0 28px 80px rgba(15,23,42,0.35)"
                : "0 24px 70px rgba(99,102,241,0.12)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "auto auto -120px -120px",
                width: "260px",
                height: "260px",
                borderRadius: "999px",
                background: "radial-gradient(circle, rgba(34,197,94,0.28), transparent 70%)",
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
                background: "radial-gradient(circle, rgba(99,102,241,0.30), transparent 70%)",
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
                      ? "rgba(99,102,241,0.12)"
                      : "rgba(79,70,229,0.08)",
                    color: isDark ? "#a5b4fc" : "#4338ca",
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
                    color: isDark ? "#f8fafc" : "#111827",
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
                  each deploy. Only the latest 7 stay on the home page, so new
                  posts push older ones out and keep this section fresh.
                </p>
              </div>

              <button
                className="btn-primary"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: "700",
                  boxShadow: "0 10px 25px rgba(99,102,241,0.32)",
                }}
                onClick={() => navigate("/articles")}
              >
                View All Articles
              </button>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {latestArticles.map((post, index) => (
                <article
                  key={post._id}
                  onClick={() => navigate(`/articles/${post.slug.current}`)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "22px",
                    overflow: "hidden",
                    background: isDark
                      ? index === 0
                        ? "linear-gradient(180deg, rgba(99,102,241,0.24), rgba(15,23,42,0.92))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.90))"
                      : index === 0
                        ? "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(255,255,255,0.98))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "1px solid rgba(15,23,42,0.08)",
                    boxShadow: isDark
                      ? "0 18px 40px rgba(2,6,23,0.28)"
                      : "0 14px 30px rgba(15,23,42,0.08)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-8px)";
                    event.currentTarget.style.boxShadow =
                      isDark
                        ? "0 26px 44px rgba(2,6,23,0.38)"
                        : "0 20px 38px rgba(79,70,229,0.16)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      isDark
                        ? "0 18px 40px rgba(2,6,23,0.28)"
                        : "0 14px 30px rgba(15,23,42,0.08)";
                  }}
                >
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage).width(700).height(420).url()}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: isDark ? "#c4b5fd" : "#4f46e5",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        #{index + 1} Latest
                      </span>

                      {post.publishedAt && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: isDark ? "rgba(255,255,255,0.76)" : "#6b7280",
                          }}
                        >
                          {new Date(post.publishedAt).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: "18px",
                        lineHeight: "1.5",
                        marginBottom: "12px",
                        color: isDark ? "#f8fafc" : "#111827",
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.7",
                        color: isDark ? "rgba(255,255,255,0.76)" : "#6b7280",
                        marginBottom: "16px",
                      }}
                    >
                      {getArticleExcerpt(post)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      {post.category?.title ? (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            background: isDark
                              ? "rgba(34,197,94,0.14)"
                              : "rgba(34,197,94,0.10)",
                            color: isDark ? "#86efac" : "#15803d",
                          }}
                        >
                          {post.category.title}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "12px",
                            color: isDark ? "rgba(255,255,255,0.72)" : "#6b7280",
                          }}
                        >
                          Student Article
                        </span>
                      )}

                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: isDark ? "#a5b4fc" : "#4338ca",
                        }}
                      >
                        Read Article {"->"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
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
      <div
        style={{
          marginTop: "60px",
        }}
      >
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
            Different streams offer different career opportunities. Explore the
            best courses available for Science, Commerce and Arts students after
            completing 12th.
          </p>
        </div>

        <div className="grid">
          {/* SCIENCE */}

          <div
            className="glass"
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Courses After 12th Science</h3>

            <p style={{ opacity: "0.75", marginBottom: "20px" }}>
              Explore engineering, medical, IT and technology courses for
              science students including B.Tech, MBBS, BCA and data science
              programs.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/courses-after-12th-science")}
            >
              Explore Science Courses →
            </button>
          </div>

          {/* COMMERCE */}

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
              Discover business, finance and accounting career options including
              BCom, BBA, CA, CS and management related programs.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/courses-after-12th-commerce")}
            >
              Explore Commerce Courses →
            </button>
          </div>

          {/* ARTS */}

          <div
            className="glass"
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Courses After 12th Arts</h3>

            <p style={{ opacity: "0.75", marginBottom: "20px" }}>
              Explore creative and analytical career paths including journalism,
              psychology, law, design and humanities programs.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/courses-after-12th-arts")}
            >
              Explore Arts Courses →
            </button>
          </div>
        </div>
      </div>

      <div style={dividerStyle} />
      <section
        className="glass"
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
        {/* LEFT SIDE TEXT CONTENT */}

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

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.9",
              marginBottom: "20px",
            }}
          >
            NextGen Study Hub is a modern academic platform designed to help
            students learn more effectively and stay organized throughout their
            academic journey. The platform combines structured study materials,
            intelligent productivity tools and career resources to create a
            complete learning environment for diploma and engineering students.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
              marginBottom: "20px",
            }}
          >
            Instead of searching multiple websites for notes, tools and academic
            resources, students can access everything in one place. From
            semester study materials to digital learning tools, NextGen Study
            Hub aims to simplify the learning process and help students focus on
            what truly matters — understanding concepts and improving academic
            performance.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
            }}
          >
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
              boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
            }}
            onClick={() => navigate("/about")}
          >
            Learn More About the Platform{" "}
          </button>
        </div>

        {/* RIGHT SIDE VISUAL CARD */}

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
            borderRadius: "22px",
            padding: "35px",
          }}
        >
          <h3 style={{ marginBottom: "15px", fontWeight: "700" }}>
            What the Platform Offers
          </h3>

          <ul style={{ lineHeight: "1.9", opacity: "0.9" }}>
            <li>📚 Organized semester-wise engineering study materials</li>
            <li>🧠 Smart academic tools such as GPA calculators</li>
            <li>📖 Learning guides and study tips</li>
            <li>💼 Internship and career opportunity listings</li>
            <li>⚡ Productivity tools to improve study efficiency</li>
            <li>🎯 A centralized hub for student resources</li>
          </ul>
        </div>
      </section>
      <div style={dividerStyle} />

      <Suspense fallback={<div>Loading...</div>}>
        <Features />
      </Suspense>

      <div style={dividerStyle} />
      <section
        className="glass"
        style={{
          padding: "clamp(40px,6vw,70px)",
          borderRadius: "24px",
          margin: "90px 0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem,4vw,2.5rem)",
            fontWeight: "800",
            marginBottom: "18px",
            color: "var(--primary)",
          }}
        >
          Engineering Notes Library
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
          Explore a comprehensive collection of diploma engineering study notes
          designed to help students understand complex subjects more easily. The
          Notes Library contains organized semester-wise materials, key
          concepts, and exam-focused resources to support effective learning and
          quick revision.
        </p>

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
            boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
          }}
            onClick={() => navigate("/notes-library")}
        >
          📚 Explore Notes Library{" "}
        </button>
      </section>

      <div style={dividerStyle} />

      {/* Explore Students Tools */}
      <div style={{ textAlign: "center", margin: "60px 0" }}>
        <h2
          style={{
            color: "var(--primary)",
            fontSize: "2.5rem",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          Student Productivity Tools – GPA Calculator, AI Assistant & Study
          Planner
        </h2>
      </div>

      <div style={dividerStyle} />
      <section
        className="glass"
        style={{
          padding: "clamp(50px,7vw,90px)",
          borderRadius: "26px",
          margin: "90px 0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem,4vw,2.6rem)",
            fontWeight: "900",
            marginBottom: "18px",
            color: "var(--primary)",
          }}
        >
          Powerful Features of NextGen Study Hub
        </h2>

        <p
          style={{
            maxWidth: "820px",
            margin: "auto",
            lineHeight: "1.8",
            opacity: "0.9",
            marginBottom: "60px",
          }}
        >
          NextGen Study Hub combines multiple learning tools and academic
          resources into one platform. The goal is to help students organize
          their study materials, track their progress and improve learning
          efficiency without switching between different websites or tools.
        </p>

        {/* FEATURES GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "30px",
          }}
        >
          <div
            className="glass"
            style={{ padding: "30px", borderRadius: "18px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              📚 Structured Learning Content
            </h3>
            <p style={{ opacity: "0.85", lineHeight: "1.6" }}>
              Access organized study materials and semester-wise notes designed
              to simplify complex engineering concepts.
            </p>
          </div>

          <div
            className="glass"
            style={{ padding: "30px", borderRadius: "18px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              ⚡ Academic Productivity Tools
            </h3>
            <p style={{ opacity: "0.85", lineHeight: "1.6" }}>
              Use digital tools such as GPA calculators and learning utilities
              to track your academic progress.
            </p>
          </div>

          <div
            className="glass"
            style={{ padding: "30px", borderRadius: "18px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>🧠 Smart Study Assistance</h3>
            <p style={{ opacity: "0.85", lineHeight: "1.6" }}>
              Improve learning efficiency with structured resources and
              organized study guides.
            </p>
          </div>

          <div
            className="glass"
            style={{ padding: "30px", borderRadius: "18px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>💼 Career Opportunities</h3>
            <p style={{ opacity: "0.85", lineHeight: "1.6" }}>
              Explore internships and job opportunities to gain practical
              experience during your studies.
            </p>
          </div>
        </div>
        <button
          className="btn-primary"
          style={{
            marginTop: "50px",
            padding: "14px 32px",
            fontSize: "15px",
            borderRadius: "40px",
            fontWeight: "600",
            boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
          }}
          onClick={() => navigate("/student-tools")}
        >
          Explore Student Tools{" "}
        </button>
      </section>
      <div style={dividerStyle} />
      <section
        className="glass"
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
        {/* LEFT CONTENT */}

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

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.9",
              marginBottom: "20px",
            }}
          >
            NextGen Study Hub provides a wide range of learning resources to
            help engineering students understand subjects more clearly and
            prepare effectively for exams.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
              marginBottom: "20px",
            }}
          >
            Students can explore structured notes, study guides and academic
            materials that focus on important concepts, definitions and
            exam-relevant topics.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
            }}
          >
            These resources help simplify learning and allow students to revise
            topics quickly while improving conceptual understanding.
          </p>

          <button
            className="btn-primary"
            style={{
              marginTop: "30px",
              padding: "14px 32px",
              fontSize: "15px",
              borderRadius: "40px",
              fontWeight: "600",
              boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
            }}
            onClick={() => navigate("/notes-library")}
          >
            Browse Learning Resources{" "}
          </button>
        </div>

        {/* RIGHT VISUAL LIST */}

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
            borderRadius: "22px",
            padding: "35px",
          }}
        >
          <h3 style={{ marginBottom: "15px", fontWeight: "700" }}>
            Available Study Resources
          </h3>

          <ul style={{ lineHeight: "1.9", opacity: "0.9" }}>
            <li>📘 Semester study notes</li>
            <li>📚 Engineering subject materials</li>
            <li>📝 Quick revision guides</li>
            <li>📖 Concept explanations</li>
            <li>🎓 Exam preparation resources</li>
            <li>📂 Organized academic materials</li>
          </ul>
        </div>
      </section>
      <div style={dividerStyle} />
      <section
        className="glass"
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
        {/* LEFT SIDE VISUAL CARD */}

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
            borderRadius: "22px",
            padding: "35px",
          }}
        >
          <h3 style={{ marginBottom: "15px", fontWeight: "700" }}>
            Career Opportunities for Students
          </h3>

          <ul style={{ lineHeight: "1.9", opacity: "0.9" }}>
            <li>💼 Internship opportunities for engineering students</li>
            <li>🚀 Fresher job listings for diploma graduates</li>
            <li>📈 Early career opportunities to build experience</li>
            <li>🎯 Skill-building opportunities through internships</li>
            <li>📊 Career exposure during academic studies</li>
            <li>🌱 Opportunities to grow professionally</li>
          </ul>
        </div>

        {/* RIGHT SIDE CONTENT */}

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

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.9",
              marginBottom: "20px",
            }}
          >
            NextGen Study Hub helps students discover valuable career
            opportunities while they are still studying. The platform connects
            learners with internship programs and entry-level job opportunities
            that allow them to gain practical experience and build professional
            skills.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
              marginBottom: "20px",
            }}
          >
            Through internships and early career opportunities, students can
            apply their academic knowledge in real-world situations, develop
            industry-relevant skills and improve their chances of securing
            better job opportunities after graduation.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              opacity: "0.85",
            }}
          >
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
              boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
            }}
            onClick={() => navigate("/jobs")}
          >
            Explore Career Opportunities{" "}
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
      <section
        style={{
          maxWidth: "900px",
          margin: "120px auto",
          opacity: "0.9",
          lineHeight: "1.8",
        }}
      >
        <h2>Student Learning Resources and Study Materials</h2>

        <p>
          NextGen Study Hub provides a wide range of academic resources
          including diploma engineering notes, programming notes, computer
          science study materials, exam preparation guides and productivity
          tools for students.
        </p>

        <p>
          Students can explore DBMS notes, C programming notes, operating system
          notes, data structure notes, computer network notes and other
          engineering study materials designed for diploma and engineering
          students.
        </p>

        <p>
          The platform also offers useful tools such as a CGPA to percentage
          calculator, GPA calculator, study timer, Pomodoro study timer and
          other academic utilities that help students manage their study
          schedule effectively.
        </p>

        <p>
          Students preparing for competitive exams can also access guides for
          SSC exams, banking exams, railway exams, government jobs after diploma
          and career guidance resources.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <a className="resource-link" href="/blog">
            Study Tips for Students
          </a>

          <a className="resource-link" href="/student-tools">
            CGPA Calculator for diploma students
          </a>

          <a className="resource-link" href="/notes-library">
            Engineering Notes PDF download
          </a>

          <a className="resource-link" href="/jobs">
            Internships for Students students
          </a>
        </div>
      </section>
    </>
  );
}
