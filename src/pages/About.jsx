import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
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

        <link rel="canonical" href="https://www.atulsharmas.in/about" />
      </Helmet>
      <div
        style={{
          padding: "40px",
          borderRadius: "22px",
          marginTop: "80px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
          Why Semester Study Materials Are Important
        </h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            opacity: "0.85",
            lineHeight: "1.7",
          }}
        >
          Structured semester notes help students understand subjects more
          clearly and prepare efficiently for exams. Organized study materials
          allow engineering and diploma students to review important concepts
          quickly, improve retention and build a strong academic foundation.
        </p>
      </div>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <div
        style={{
          padding: "40px",
          borderRadius: "22px",
          marginBottom: "60px",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>Our Mission</h2>

        <p style={{ opacity: "0.85", lineHeight: "1.7" }}>
          Our mission is to simplify learning for students by providing
          organized study materials, productivity tools and useful resources in
          one place. The platform is built to help engineering and diploma
          students access academic content, improve learning efficiency and
          prepare effectively for exams.
        </p>
      </div>

      <section className="section">
        <div 

          className="glass"
          style={{
            maxWidth: "900px",
            margin: "auto",
            padding: "50px",
            textAlign: "left",
          }}
          >
        
          <h1
            style={{
              marginBottom: "25px",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            About NextGen Study Hub
          </h1>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            NextGen Study Hub is a student-focused learning platform created to
            help Diploma Computer Science students access study resources in a
            more organized and practical way. Many students often struggle to
            find proper notes, assignments, and useful practice material in one
            place, so this platform was built to simplify that process.
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            The website provides semester-wise study materials, practice
            quizzes, assignments, and academic tools designed specifically for
            technical diploma students. Instead of searching across multiple
            websites or random PDFs, learners can explore structured content
            based on their subjects and semester requirements.
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            NextGen Study Hub also includes modern learning utilities such as an
            AI academic assistant, automated quiz practice, and other
            productivity tools that make studying a little easier. These tools
            help students revise concepts quickly and practice topics without
            wasting time looking for resources.
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            The goal of this project is simple — create a clean and useful
            digital space where students can learn, practice, and prepare for
            exams more efficiently. In the future, additional sections like
            internships, courses, and job opportunities will also be added to
            support students in their academic and career journey.
          </p>

          <p style={{ opacity: 0.85 }}>
            This website is an independent educational project and is not
            officially affiliated with any university, college, or government
            institution. All materials are shared only for learning and
            reference purposes.
          </p>

          {/* CONTACT BUTTON */}

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link to="/contact-owner">
              <button
                className="btn-primary"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
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
            Helping Students Learn Smarter
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.7",
            }}
          >
            NextGen Study Hub is designed to support students throughout their
            academic journey by providing easy access to study materials,
            productivity tools and learning resources. By combining educational
            content with practical tools, the platform aims to create a smarter
            and more efficient learning environment for students.
          </p>
        </div>
      </section>
    </>
  );
}
