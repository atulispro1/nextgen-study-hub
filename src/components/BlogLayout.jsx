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
                item: "https://atulsharmas.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://atulsharmas.in/blog",
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

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How can I score 8+ CGPA in diploma engineering?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can score above 8 CGPA by studying consistently, focusing on core subjects, solving previous year question papers, revising weekly and improving answer presentation in exams.",
                },
              },

              {
                "@type": "Question",
                name: "How many hours should a student study daily?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most students can achieve strong academic results by studying 2 to 4 focused hours daily using techniques like active recall, spaced repetition and structured revision.",
                },
              },

              {
                "@type": "Question",
                name: "What are the best study techniques for engineering students?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Effective study techniques include active recall, solving previous year papers, making short revision notes, using diagrams for theory subjects and practicing numerical problems regularly.",
                },
              },

              {
                "@type": "Question",
                name: "How can students prepare for semester exams quickly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can prepare for semester exams by prioritizing high weightage topics, solving previous year question papers, revising formulas and focusing on important concepts instead of memorizing everything.",
                },
              },

              {
                "@type": "Question",
                name: "What are the best programming languages for beginners?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Popular beginner programming languages include C, C++, Python and JavaScript. These languages help students understand programming logic and build strong coding fundamentals.",
                },
              },

              {
                "@type": "Question",
                name: "How can diploma students get internships?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Diploma students can get internships by building small projects, learning programming skills, improving communication skills, creating a strong resume and applying on platforms like LinkedIn and job portals.",
                },
              },

              {
                "@type": "Question",
                name: "What are the best productivity techniques for students?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can improve productivity by using the Pomodoro technique, creating a daily study schedule, avoiding distractions, tracking progress and taking short breaks during study sessions.",
                },
              },

              {
                "@type": "Question",
                name: "How can students avoid procrastination while studying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can avoid procrastination by setting small study goals, removing distractions, studying in short focused sessions and creating a consistent study routine.",
                },
              },

              {
                "@type": "Question",
                name: "What are the best career options after diploma in computer science?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "After diploma in computer science students can pursue careers in software development, web development, data analysis, IT support, cybersecurity or continue higher studies like BTech or BCA.",
                },
              },

              {
                "@type": "Question",
                name: "How can students improve their programming skills?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can improve programming skills by practicing coding daily, solving problems on coding platforms, building projects and learning data structures and algorithms.",
                },
              },

              {
                "@type": "Question",
                name: "What are the best websites for coding practice?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Popular coding practice platforms include LeetCode, HackerRank, CodeChef, GeeksforGeeks and CodeStudio. These platforms help students improve problem solving skills.",
                },
              },

              {
                "@type": "Question",
                name: "How can students improve focus while studying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Students can improve focus by studying in a quiet environment, using the Pomodoro technique, keeping their phone away and studying in short concentrated sessions.",
                },
              },

              {
                "@type": "Question",
                name: "What is the best study routine for students?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A balanced study routine includes daily revision, solving practice questions, learning new topics and maintaining consistent study hours every day.",
                },
              },
            ],
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
            {seoPages.map((page, index) => (
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
