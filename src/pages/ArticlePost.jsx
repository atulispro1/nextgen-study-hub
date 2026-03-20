import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { urlFor } from "../lib/sanityImage";
import { PortableText } from "@portabletext/react";
import Loader from "../components/Loader";

export default function ArticlePost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const cardStyle = {
    display: "block",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#fff",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.background = "#334155";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.background = "#1e293b";
  };

  useEffect(() => {
    const query = `*[_type == "post"]{
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt
    }`;

    client.fetch(query).then((data) => {
      const current = data.find((p) => p.slug?.current === slug);

      setPost(current);

      // related posts (excluding current)
      const others = data.filter((p) => p.slug?.current !== slug).slice(0, 4);

      setRelated(others);
    });
  }, [slug]);

  if (!post) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  // 📖 Reading time (simple)
  const wordCount =
    post.body?.reduce((acc, block) => {
      return acc + (block.children?.[0]?.text?.split(" ").length || 0);
    }, 0) || 0;

  const readingTime = Math.ceil(wordCount / 200);

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
        <title>
          {post.title} | Study Tips & Learning Guide | NextGen Study Hub
        </title>

        <meta
          name="description"
          content={
            post.body?.[0]?.children?.[0]?.text?.slice(0, 150) ||
            "Read detailed study tips, exam preparation strategies and student learning guides."
          }
        />

        <meta
          name="keywords"
          content={`
${post.title.toLowerCase()},
study tips,
exam preparation,
student productivity,
learning strategies,
engineering study guide,
diploma study tips
`}
        />

        <link
          rel="canonical"
          href={`https://www.atulsharmas.in/articles/${post.slug.current}`}
        />
      </Helmet>
      <div
        style={{
          padding: "60px 20px",
          maxWidth: "820px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            lineHeight: "1.3",
            marginBottom: "15px",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            marginBottom: "25px",
            opacity: 0.85,
            lineHeight: "1.7",
          }}
        >
          This article covers {post.title.toLowerCase()} along with practical
          study strategies, productivity techniques and learning methods to help
          students improve performance.
        </p>

        {/* META INFO */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          <span>
            📅{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          <span>•</span>

          <span>⏱ {readingTime} min read</span>
        </div>

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        {/* IMAGE */}
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: "16px",
              marginBottom: "35px",
            }}
          />
        )}

        {/* CONTENT */}
        <div
          style={{
            lineHeight: "1.9",
            fontSize: "17px",
          }}
        >
          <PortableText
            value={post.body}
            components={{
              block: {
                h1: ({ children }) => (
                  <h2
                    style={{
                      fontSize: "26px",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                  >
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3
                    style={{
                      fontSize: "22px",
                      marginTop: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    {children}
                  </h3>
                ),
                normal: ({ children }) => (
                  <p style={{ marginBottom: "18px" }}>{children}</p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                    {children}
                  </ul>
                ),
              },
            }}
          />
        </div>

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "100px 0",
          }}
        />

        {/* 🔥 EXPLORE SECTION (SEO BOOST) */}
        <div
          style={{
            marginTop: "80px",
            padding: "40px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            Explore More Student Articles
          </h2>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Discover more study tips, exam preparation strategies, productivity
            hacks and learning guides designed for diploma and engineering
            students.
          </p>

          <button
            onClick={() => navigate("/articles")}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
            }}
          >
            View All Articles →
          </button>
        </div>

        {/* 🔥 RELATED ARTICLES */}
        <div style={{ marginTop: "80px" }}>
          <h2 style={{ marginBottom: "20px" }}>Related Articles</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            {related.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/articles/${item.slug.current}`)}
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  padding: "15px",
                }}
              >
                {item.mainImage && (
                  <img
                    src={urlFor(item.mainImage).width(400).url()}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  />
                )}

                <h4 style={{ fontSize: "15px" }}>{item.title}</h4>
              </div>
            ))}
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

        <section
          style={{
            marginTop: "80px",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            borderRadius: "16px",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            📚 Explore More Useful Articles
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#cbd5f5",
              marginBottom: "30px",
            }}
          >
            Boost your knowledge with these hand-picked guides
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Card 1 */}
            <a
              href="/articles/best-ai-tools-for-students-2026-study-smarter"
              style={cardStyle}
            >
              <h3>🤖 Best AI Tools for Students</h3>
              <p>
                Discover powerful AI tools to study smarter and save time in
                2026.
              </p>
            </a>

            {/* Card 2 */}
            <a
              href="/articles/how-to-study-effectively-2026-best-study-techniques"
              style={cardStyle}
            >
              <h3>📖 Study Techniques That Work</h3>
              <p>
                Learn proven methods to improve focus, memory, and exam
                performance.
              </p>
            </a>

            {/* Card 3 */}
            <a
              href="/articles/perfect-study-time-table-2026-for-students"
              style={cardStyle}
            >
              <h3>⏰ Perfect Study Time Table</h3>
              <p>
                Create a realistic timetable you can actually follow every day.
              </p>
            </a>

            {/* Card 4 */}
            <a
              href="/articles/how-to-prepare-for-exams-in-7-days-last-minute-plan"
              style={cardStyle}
            >
              <h3>📝 7-Day Exam Strategy</h3>
              <p>Last-minute preparation plan to boost your scores quickly.</p>
            </a>

            {/* Card 5 */}
            <a
              href="/articles/top-high-income-skills-2026-no-degree-required"
              style={cardStyle}
            >
              <h3>💸 High Income Skills</h3>
              <p>
                Learn skills that can help you earn online without a degree.
              </p>
            </a>

            {/* Card 6 */}
            <a
              href="/articles/how-to-start-freelancing-as-a-student-2026"
              style={cardStyle}
            >
              <h3>💻 Freelancing Guide</h3>
              <p>
                Step-by-step guide to start freelancing and earn as a student.
              </p>
            </a>
          </div>
        </section>

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
              beginner programming tutorials.
            </p>
          </div>

          {/* GRID */}
          <div className="grid">
            {seoPages.slice(0, visibleCount).map((page, index) => (
              <div
                key={index}
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

          {/* LOAD MORE */}
          {visibleCount < seoPages.length && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                className="btn-primary"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                Load More →
              </button>
            </div>
          )}
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
