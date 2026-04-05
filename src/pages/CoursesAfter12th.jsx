import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";

export default function CoursesAfter12th() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Best Courses After 12th – Science, Commerce & Arts Career Options"
        description="Explore the best courses after 12th for science, commerce and arts students. Discover high salary courses, professional degrees, diploma programs and career opportunities."
        url="https://www.atulsharmas.in/courses-after-12th"
      />

      <section className="section">
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          {/* HERO */}

          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h1
              style={{
                fontWeight: "900",
                marginBottom: "20px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Best Courses After 12th – Complete Career Guide
            </h1>

            <p
              style={{
                maxWidth: "800px",
                margin: "auto",
                opacity: "0.85",
                lineHeight: "1.8",
              }}
            >
              Choosing the right course after completing 12th is one of the most
              important decisions in a student's academic journey. The course
              you choose will influence your career path, job opportunities and
              long-term earning potential. Students from science, commerce and
              arts streams have many options available across engineering,
              business, design, medicine and technology.
            </p>
          </div>

          {/* STREAM CARDS */}

          <div className="grid" style={{ marginBottom: "70px" }}>
            <div
              className="glass"
              style={{ padding: "30px", textAlign: "center" }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                Courses After 12th Science
              </h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Engineering, medical and technology based career options for
                science students.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-science")}
              >
                Explore Science Courses →
              </button>
            </div>

            <div
              className="glass"
              style={{ padding: "30px", textAlign: "center" }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                Courses After 12th Commerce
              </h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Business, finance, accounting and management related courses.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-commerce")}
              >
                Explore Commerce Courses →
              </button>
            </div>

            <div
              className="glass"
              style={{ padding: "30px", textAlign: "center" }}
            >
              <h3 style={{ marginBottom: "10px" }}>Courses After 12th Arts</h3>

              <p style={{ opacity: "0.75", marginBottom: "20px" }}>
                Creative and humanities based career options including
                journalism and law.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/courses-after-12th-arts")}
              >
                Explore Arts Courses →
              </button>
            </div>
          </div>

          {/* HIGH SALARY COURSES */}

          <h2 style={{ marginTop: "40px" }}>High Salary Courses After 12th</h2>

          <p style={{ opacity: "0.85", marginBottom: "20px" }}>
            Some professional courses provide strong salary potential and career
            growth opportunities. These courses are popular among students who
            want high-paying jobs in technology, healthcare and finance.
          </p>

          <div
            className="glass"
            style={{ padding: "30px", marginBottom: "40px" }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Course</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>
                    Average Salary
                  </th>
                  <th style={{ textAlign: "left", padding: "10px" }}>
                    Industry
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Computer Science Engineering
                  </td>
                  <td style={{ padding: "10px" }}>₹6L – ₹20L</td>
                  <td style={{ padding: "10px" }}>Technology</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Artificial Intelligence</td>
                  <td style={{ padding: "10px" }}>₹8L – ₹25L</td>
                  <td style={{ padding: "10px" }}>AI & Data Science</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Chartered Accountant</td>
                  <td style={{ padding: "10px" }}>₹7L – ₹30L</td>
                  <td style={{ padding: "10px" }}>Finance</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Medical (MBBS)</td>
                  <td style={{ padding: "10px" }}>₹8L – ₹40L</td>
                  <td style={{ padding: "10px" }}>Healthcare</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Commercial Pilot</td>
                  <td style={{ padding: "10px" }}>₹12L – ₹50L</td>
                  <td style={{ padding: "10px" }}>Aviation</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DIPLOMA COURSES */}

          <h2 style={{ marginTop: "40px" }}>Diploma Courses After 12th</h2>

          <p style={{ opacity: "0.85", marginBottom: "20px" }}>
            Diploma programs are shorter professional courses designed to
            provide industry skills quickly. Many diploma courses help students
            start their career faster compared to traditional degrees.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>Diploma in Computer Engineering</li>
            <li>Diploma in Mechanical Engineering</li>
            <li>Diploma in Civil Engineering</li>
            <li>Diploma in Graphic Design</li>
            <li>Diploma in Digital Marketing</li>
          </ul>

          {/* CAREER DECISION */}

          <h2 style={{ marginTop: "40px" }}>How to Choose the Right Course</h2>

          <p style={{ opacity: "0.85", marginBottom: "20px" }}>
            When selecting a course after 12th, students should evaluate their
            interests, academic strengths and future career goals. Choosing the
            right field can significantly impact career growth and job
            satisfaction.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>Identify subjects you enjoy studying</li>
            <li>Research career opportunities in that field</li>
            <li>Understand job demand in the industry</li>
            <li>Compare course duration and salary potential</li>
          </ul>

          {/* INTERNAL LINKS */}

          <div
            className="glass"
            style={{ padding: "35px", textAlign: "center" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              Explore More Student Resources
            </h3>

            <p style={{ opacity: "0.75", marginBottom: "20px" }}>
              Discover engineering study materials, programming guides and
              productivity tools designed for students.
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate("/notes-library")}
              >
                Engineering Notes
              </button>

              <button
                className="btn-primary"
                onClick={() => navigate("/student-tools")}
              >
                Student Tools
              </button>

              <button className="btn-primary" onClick={() => navigate("/blog")}>
                Study Guides
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
