import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { urlFor } from "../lib/sanityImage";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const [posts, setPosts] = useState([]);
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

    client.fetch(query).then((data) => setPosts(data));
  }, []);

  useEffect(() => {
  setVisibleCount(6);
}, [search, category]);


  // 🎯 Unique categories
  const categories = [
    "All",
    ...new Set(posts.map((p) => p.category?.title).filter(Boolean)),
  ];

  // 🎯 Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body?.[0]?.children?.[0]?.text
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category?.title === category;

    return matchesSearch && matchesCategory;
  });


  return (
    <>
      <Helmet>
        <title>
          Student Articles – Study Tips, Exam Preparation & Learning Guides |
          NextGen Study Hub
        </title>

        <meta
          name="description"
          content="Explore the latest student articles including study tips, exam preparation strategies, productivity techniques and learning guides for diploma and engineering students."
        />

        <meta
          name="keywords"
          content="
study tips for students,
exam preparation tips,
student productivity tips,
how to study effectively,
engineering study tips,
diploma student guide,
learning strategies for students,
study routine for students,
how toppers study,
student blog articles,
education tips for students,
exam success strategies,
study hacks for exams,
student learning resources
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/articles" />
      </Helmet>
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "auto" }}>
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
            Student Articles – Study Tips, Exam Preparation & Learning Guides
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
            designed for diploma and engineering students to improve academic
            performance.
          </p>
        </section>

        {/* 🔍 SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

          {/* FILTER */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
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

        {/* 🧠 GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {filteredPosts.length === 0 && (
            <p style={{ opacity: 0.6 }}>No articles found.</p>
          )}

          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/articles/${post.slug.current}`)}
              style={{
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                transition: "0.3s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* IMAGE */}
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
                {/* DATE */}
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

                {/* TITLE */}
                <h3
                  style={{
                    fontSize: "18px",
                    margin: "10px 0",
                  }}
                >
                  {post.title}
                </h3>

                {/* CATEGORY */}
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

                {/* EXCERPT */}
                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.7,
                    marginTop: "10px",
                  }}
                >
                  {post.body?.[0]?.children?.[0]?.text?.slice(0, 80)}...
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 🔢 PAGINATION */}
        {visibleCount < filteredPosts.length && (
  <div style={{
    textAlign: "center",
    marginTop: "40px"
  }}>
    <button
      className="btn-primary"
      onClick={() => setVisibleCount(prev => prev + 6)}
      style={{
        padding: "12px 30px",
        borderRadius: "10px",
        fontWeight: "600",
        cursor: "pointer"
      }}
    >
      Load More Articles →
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
              Different streams offer different career opportunities. Explore
              the best courses available for Science, Commerce and Arts students
              after completing 12th.
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
                Discover business, finance and accounting career options
                including BCom, BBA, CA, CS and management related programs.
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
                Explore creative and analytical career paths including
                journalism, psychology, law, design and humanities programs.
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
            Explore Courses After 12th →
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
            Explore Study Materials →
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
            Explore Student Tools →
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
            Explore Exam Preparation Guides →
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
            Why Read Articles on NextGen Study Hub?
          </h2>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            NextGen Study Hub is a comprehensive learning platform designed for
            students, learners, and aspirants who want high-quality educational
            content, practical guidance, and real-world insights. Our articles
            section covers a wide range of topics including study tips, exam
            preparation strategies, career guidance, programming tutorials,
            productivity techniques, and educational resources for diploma,
            engineering, and competitive exam students.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Whether you are preparing for government exams like SSC, Railway,
            Banking, or State PSC, improving your academic performance in
            engineering subjects, or exploring new career opportunities, our
            articles provide structured, easy-to-understand, and actionable
            knowledge. We focus on delivering content that helps students learn
            effectively, build strong concepts, and stay ahead in today’s
            competitive academic environment.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            In addition to academic content, NextGen Study Hub also features
            articles on student productivity, time management, learning
            strategies, skill development, and emerging technologies. From
            programming and technical skills to career planning and personal
            growth, our platform supports students in building a successful
            future with the right knowledge and mindset.
          </p>

          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Our articles are written with a focus on clarity, relevance, and
            real-world application. Instead of theoretical explanations, we
            provide practical solutions, step-by-step guidance, and proven
            techniques that students can directly apply in their studies and
            career preparation.
          </p>

          <p style={{ opacity: 0.8 }}>
            Explore a wide collection of educational articles, study guides,
            exam preparation tips, and career-focused content to enhance your
            learning journey. Stay updated with the latest trends in education,
            improve your academic performance, and move closer to your career
            goals with NextGen Study Hub.
          </p>
        </div>
      </div>
    </>
  );
}
