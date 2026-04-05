import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <SEO
        title="About NextGen Study Hub – Student Learning Platform"
        url="https://atulsharmas.in/about"
      />
      <Helmet>
        <title>
          About NextGen Study Hub – Diploma Notes, Student Tools & Learning
          Platform
        </title>

        <meta
          name="description"
          content="Learn about NextGen Study Hub, a student-focused learning platform providing diploma engineering notes, semester study materials, academic tools, internships and productivity resources for students."
        />

        <meta
          name="keywords"
          content="
about nextgen study hub,
nextgen study hub platform,
student learning platform,
engineering study hub,
diploma student resources,
online study hub for students,
engineering education platform,
student academic resources,
student productivity platform,
study platform for engineering students,
diploma engineering study hub,
education resources platform,
student learning tools website,
engineering study support platform,
online learning hub for students,
student academic support platform,
engineering student study resources,
digital learning platform for students,
study resources website for diploma students,
academic productivity tools platform
"
        />

        <link rel="canonical" href="https://atulsharmas.in/about" />
      </Helmet>

      {/* INTRO SECTION */}

      <section className="section">
        <div
          className="glass"
          style={{
            maxWidth: "950px",
            margin: "auto",
            padding: "50px",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
              textAlign: "center",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            About NextGen Study Hub
          </h1>

          <p style={{ marginBottom: "20px", opacity: 0.85, lineHeight: "1.8" }}>
            NextGen Study Hub is an educational platform created to make
            learning easier and more organized for students, especially those
            studying Diploma and Computer Science related subjects. Many
            students spend a large amount of time searching for notes, study
            materials, exam preparation resources and programming guides across
            multiple websites. This platform was created to bring those
            resources together in one simple and structured place.
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85, lineHeight: "1.8" }}>
            The goal of NextGen Study Hub is to help students access clear,
            organized and practical learning materials without unnecessary
            distractions. Instead of jumping between multiple websites, learners
            can explore semester-wise notes, programming resources, study guides
            and academic tools in a single platform designed specifically for
            students.
          </p>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Whether someone is preparing for semester exams, revising
            programming concepts or searching for career guidance, NextGen Study
            Hub aims to provide useful resources that support students
            throughout their academic journey.
          </p>
        </div>
      </section>

      {/* WHY THIS PLATFORM EXISTS */}

      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <div
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "22px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
          Why This Platform Was Created
        </h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            opacity: "0.85",
            lineHeight: "1.8",
          }}
        >
          Many students struggle to find reliable study materials and practical
          learning resources in one place. Notes are often scattered across
          different websites, making it difficult to prepare efficiently for
          exams. NextGen Study Hub was created to solve that problem by
          providing organized academic resources designed specifically for
          students who want a cleaner and simpler learning experience.
        </p>
      </div>

      {/* STUDY MATERIAL IMPORTANCE */}

      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <div
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "22px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
          Why Structured Study Materials Matter
        </h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            opacity: "0.85",
            lineHeight: "1.8",
          }}
        >
          Organized study materials help students understand subjects more
          clearly and prepare for exams more efficiently. When learning
          resources are structured properly, students can focus on understanding
          concepts rather than wasting time searching for information.
          Structured notes also make revision faster, improve retention and help
          learners build a stronger academic foundation.
        </p>
      </div>

      {/* WHAT YOU CAN FIND */}

      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <div
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "22px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "20px" }}>
          What You Can Explore on NextGen Study Hub
        </h2>

        <ul
          style={{
            maxWidth: "700px",
            margin: "auto",
            textAlign: "left",
            lineHeight: "1.9",
            opacity: "0.85",
          }}
        >
          <li>📚 Semester-wise engineering and diploma study materials</li>
          <li>💻 Programming notes for C, Java, Python and data structures</li>
          <li>📝 MCQ practice questions for exam preparation</li>
          <li>🎯 Interview preparation resources for technical students</li>
          <li>🧠 Study productivity tools and academic utilities</li>
          <li>📈 Career guidance and internship information</li>
        </ul>
      </div>

      {/* MISSION */}

      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <div
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "22px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>Our Mission</h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            opacity: "0.85",
            lineHeight: "1.8",
          }}
        >
          Our mission is to simplify learning by creating a platform where
          students can access useful study materials, tools and academic
          guidance without unnecessary complexity. By combining educational
          resources with modern learning tools, NextGen Study Hub aims to
          support students in learning more efficiently and preparing
          confidently for exams and future careers.
        </p>
      </div>

      {/* DISCLAIMER */}

      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <div
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "22px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
          Educational Purpose
        </h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            opacity: "0.85",
            lineHeight: "1.8",
          }}
        >
          NextGen Study Hub is an independent educational project created for
          learning and informational purposes. The platform is not officially
          affiliated with any university, college or government institution. All
          study materials and resources shared on this website are intended to
          support students in their academic preparation.
        </p>

        <div style={{ marginTop: "40px" }}>
          <Link to="/contact-owner">
            <button className="btn-primary">Contact Us</button>
          </Link>
        </div>
      </div>
    </>
  );
}
