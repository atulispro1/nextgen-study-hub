import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { allBlogs } from "../data/allBlogs";

export default function Blog() {
  const navigate = useNavigate();

  const categories = [
    "All",
    "Study Tips",
    "Programming",
    "Career",
    "Government Exams",
    "Exam Preparation",
    "Productivity",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search]);

  const filteredBlogs = allBlogs
    .filter((blog) =>
      selectedCategory === "All" ? true : blog.category === selectedCategory,
    )
    .filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage,
  );

  return (
    <>
      <Helmet>
        <title>
          Student Blog – Study Tips, Exam Preparation & Learning Guides |
          NextGen Study Hub
        </title>

        <meta
          name="description"
          content="Explore expert study tips, exam preparation strategies, student productivity techniques and learning guides to help diploma and engineering students study smarter and succeed academically."
        />

        <meta
          name="keywords"
          content="
study tips for students,
study tips blog,
exam preparation tips,
how to study effectively,
how to study smarter,
study techniques for students,
learning strategies for students,
student productivity tips,
study motivation for students,
how to focus while studying,
exam study techniques,
how toppers study,
engineering student study tips,
diploma student study tips,
time management for students,
pomodoro technique for studying,
active recall study method,
spaced repetition study method,
how to remember what you study,
study routine for students,
study hacks for exams,
best study strategies,
student learning blog,
education tips for students,
academic success tips,
study improvement techniques,
exam success strategies,
study productivity blog,
engineering student learning guides,
education learning resources
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/blog" />
      </Helmet>

      <div className="section">
        {/* HEADER */}
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
            Student Blog – Study Tips, Exam Preparation & Learning Guides
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
            Explore expert study tips, exam preparation strategies, learning
            techniques and productivity methods designed for diploma and
            engineering students. Discover practical guides that help you study
            smarter, stay organized and improve academic performance.
          </p>
        </section>

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "50px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              minWidth: "250px",
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
            }}
          >
            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.2rem)",
              fontWeight: "800",
              color: "var(--primary)",
              marginBottom: "10px",
            }}
          >
            Latest Study Articles & Learning Guides
          </h2>

          <p
            style={{
              opacity: "0.75",
              maxWidth: "650px",
              margin: "auto",
            }}
          >
            Browse practical articles covering study techniques, student
            productivity, exam strategies and academic success tips.
          </p>
        </div>

        {/* BLOG GRID */}
        <div className="grid">
          {currentBlogs.map((blog) => (
            <div 
              key={blog.id}
              className="glass blog-card"
              style={{
                overflow: "hidden",
                cursor: "pointer",
              }}
              >
            
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "20px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    background: "rgba(99,102,241,0.1)",
                    color: "#6366f1",
                  }}
                >
                  {blog.category}
                </span>

                <h3 style={{ marginTop: "15px" }}>{blog.title}</h3>

                <p style={{ opacity: 0.7, marginTop: "10px" }}>
                  {blog.description}
                </p>

                <button
                  className="btn-primary"
                  style={{ marginTop: "15px" }}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* PAGINATION */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="pagination-btn"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(pageNumber)}
                className={`pagination-btn ${
                  currentPage === pageNumber ? "active-page" : ""
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="pagination-btn"
          >
            Next
          </button>
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
            padding: "40px",
            borderRadius: "22px",
            marginTop: "80px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Why Study Tips & Learning Guides Matter
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
            performance and reduce exam stress. The NextGen Study Hub blog
            provides practical advice, productivity tips and learning resources
            to support engineering and diploma students throughout their
            academic journey.
          </p>
        </div>

        {/* BLOG FOOTER SECTION */}
        <div 
          className="glass"
          style={{
            maxWidth: "800px",
            margin: "80px auto",
            padding: "50px 40px",
            textAlign: "center",
            borderRadius: "16px",
            transition: "transform 0.3s ease",
          }}
          >
        
          {/* TITLE */}

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#6366f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            🚀 More Powerful Features Coming Soon...
          </h2>

          {/* DESCRIPTION */}

          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              opacity: 0.8,
              maxWidth: "650px",
              margin: "auto",
            }}
          >
            We're continuously improving the Student Tools section to make your
            academic journey smarter, faster, and more productive 📚✨ If you
            have an idea that could make this platform even better — don't keep
            it to yourself! 💡 Share your suggestion through the contact section
            and help us build the ultimate study companion together 🚀
          </p>

          {/* QUESTION */}

          <p
            style={{
              marginTop: "25px",
              fontSize: "15px",
              opacity: 0.8,
            }}
          >
            What features would you like to see next?
          </p>

          {/* BUTTON */}

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
            💬 Send Your Suggestion
          </button>
        </div>

        {/* WEBSITE STYLE INFO SECTION */}
        {/* BLOG INFORMATION SECTION */}
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
            Why Read Blogs on NextGen Study Hub?
          </h2>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            NextGen Study Hub is designed specifically for Diploma Computer
            Science students and competitive exam aspirants who want practical,
            structured, and easy-to-understand guidance. Our blog section covers
            study strategies, semester preparation techniques, programming
            fundamentals, career growth insights, and government exam
            preparation plans.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Whether you are preparing for SSC, Railway, Banking, State PSC
            exams, or focusing on improving your CGPA in engineering subjects,
            the articles published here are written to provide real value.
            Instead of generic advice, we focus on actionable steps, clear
            roadmaps, and student-friendly explanations.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Our goal is to help students build strong academic foundations,
            improve technical skills, and prepare confidently for both private
            and government job opportunities. With regularly updated blogs on
            programming, exam strategies, productivity, and career planning,
            this platform acts as a complete academic growth resource.
          </p>

          <p style={{ opacity: 0.8 }}>
            Explore detailed guides, structured preparation strategies, and
            expert-written content to stay ahead in your academic and
            professional journey.
          </p>
        </div>
      </div>
    </>
  );
}
