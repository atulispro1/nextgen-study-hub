import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <div className="section">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <h1
          style={{
            fontSize: "42px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Student Blogs & Guides
        </h1>

        <p style={{ opacity: 0.7, marginTop: "15px" }}>
          Smart strategies, programming guides & career advice for Diploma CS
          students 🚀
        </p>
      </motion.div>

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

      {/* BLOG GRID */}
      <div className="grid">
        {currentBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ y: -10 }}
            className="glass blog-card"
            style={{
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
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
          </motion.div>
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
      {/* BLOG FOOTER SECTION */}
      <motion.div
        className="glass"
        style={
          {
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
          academic journey smarter, faster, and more productive 📚✨ If you have
          an idea that could make this platform even better — don't keep it to
          yourself! 💡 Share your suggestion through the contact section and
          help us build the ultimate study companion together 🚀
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
      </motion.div>

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
          fundamentals, career growth insights, and government exam preparation
          plans.
        </p>

        <p style={{ opacity: 0.8, marginBottom: "20px" }}>
          Whether you are preparing for SSC, Railway, Banking, State PSC exams,
          or focusing on improving your CGPA in engineering subjects, the
          articles published here are written to provide real value. Instead of
          generic advice, we focus on actionable steps, clear roadmaps, and
          student-friendly explanations.
        </p>

        <p style={{ opacity: 0.8, marginBottom: "20px" }}>
          Our goal is to help students build strong academic foundations,
          improve technical skills, and prepare confidently for both private and
          government job opportunities. With regularly updated blogs on
          programming, exam strategies, productivity, and career planning, this
          platform acts as a complete academic growth resource.
        </p>

        <p style={{ opacity: 0.8 }}>
          Explore detailed guides, structured preparation strategies, and
          expert-written content to stay ahead in your academic and professional
          journey.
        </p>
      </div>
    </div>
  );
}
