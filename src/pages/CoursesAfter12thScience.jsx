import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";

export default function CoursesAfter12thScience() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Best Courses After 12th Science – Career Options & High Salary Courses"
        description="Discover the best courses after 12th science including engineering, medical, IT, research and data science fields. Explore high salary career options for science students."
        url="https://www.atulsharmas.in/courses-after-12th-science"
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
              Best Courses After 12th Science
            </h1>

            <p
              style={{
                maxWidth: "800px",
                margin: "auto",
                opacity: "0.85",
                lineHeight: "1.8",
              }}
            >
              Science students have the largest number of career opportunities
              after completing 12th grade. With strong foundations in
              mathematics, physics, chemistry or biology, students can pursue
              careers in engineering, medicine, technology, research and many
              modern technology fields such as artificial intelligence and data
              science.
            </p>
          </div>
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

          {/* ENGINEERING COURSES */}

          <h2>Engineering Courses After 12th Science</h2>

          <p style={{ opacity: "0.85", marginBottom: "25px" }}>
            Engineering is one of the most popular career choices for science
            students. Engineering degrees allow students to work in technology,
            software development, infrastructure, robotics and research.
          </p>

          <div className="grid" style={{ marginBottom: "50px" }}>
            <div className="glass" style={{ padding: "25px" }}>
              <h3>B.Tech Computer Science</h3>
              <p style={{ opacity: "0.75" }}>
                One of the highest demand engineering courses focusing on
                programming, software development and artificial intelligence.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>B.Tech Mechanical Engineering</h3>
              <p style={{ opacity: "0.75" }}>
                A core engineering branch dealing with machines, manufacturing
                and mechanical systems.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>B.Tech Civil Engineering</h3>
              <p style={{ opacity: "0.75" }}>
                Focused on infrastructure projects such as bridges, buildings
                and transportation systems.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>B.Tech Artificial Intelligence</h3>
              <p style={{ opacity: "0.75" }}>
                A modern technology program focused on machine learning, AI
                systems and automation technologies.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>B.Tech Data Science</h3>
              <p style={{ opacity: "0.75" }}>
                Covers big data analysis, statistics and machine learning used
                in modern businesses.
              </p>
            </div>
          </div>

          {/* MEDICAL COURSES */}

          <h2>Medical Courses After 12th Science</h2>

          <p style={{ opacity: "0.85", marginBottom: "25px" }}>
            Students with biology can pursue careers in healthcare and medicine.
            These professions are highly respected and offer strong job
            stability.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>MBBS (Bachelor of Medicine & Surgery)</li>
            <li>BDS (Bachelor of Dental Surgery)</li>
            <li>Bachelor of Pharmacy</li>
            <li>BSc Nursing</li>
            <li>BSc Biotechnology</li>
            <li>BSc Microbiology</li>
          </ul>

          {/* IT COURSES */}

          <h2>IT and Computer Courses After 12th Science</h2>

          <p style={{ opacity: "0.85", marginBottom: "25px" }}>
            Technology careers are growing rapidly. Many students choose
            computer related degrees to build careers in software development,
            cybersecurity, cloud computing and artificial intelligence.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>BCA (Bachelor of Computer Applications)</li>
            <li>BSc Computer Science</li>
            <li>BSc Data Science</li>
            <li>BSc Artificial Intelligence</li>
            <li>BSc Cyber Security</li>
          </ul>

          {/* HIGH SALARY COURSES */}

          <h2>High Salary Courses After 12th Science</h2>

          <div
            className="glass"
            style={{ padding: "30px", marginBottom: "50px" }}
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
                  <td style={{ padding: "10px" }}>Medical (MBBS)</td>
                  <td style={{ padding: "10px" }}>₹8L – ₹40L</td>
                  <td style={{ padding: "10px" }}>Healthcare</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Data Science</td>
                  <td style={{ padding: "10px" }}>₹8L – ₹30L</td>
                  <td style={{ padding: "10px" }}>Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ */}

          <h2>Frequently Asked Questions</h2>

          <div className="faq-box">
            <h4>Which course is best after 12th science?</h4>
            <p>
              Popular options include engineering, medical courses, computer
              science, data science and biotechnology depending on the student’s
              interests.
            </p>
          </div>

          <div className="faq-box">
            <h4>Which course after 12th science has highest salary?</h4>
            <p>
              Courses like Computer Science Engineering, Artificial
              Intelligence, Data Science and MBBS offer high salary potential.
            </p>
          </div>

          <div className="faq-box">
            <h4>Can science students pursue IT careers?</h4>
            <p>
              Yes. Science students can pursue IT related courses like BCA, BSc
              Computer Science, Artificial Intelligence and software
              engineering.
            </p>
          </div>

          <div className="faq-box">
            <h4>Is engineering a good career option after 12th science?</h4>
            <p>
              Yes. Engineering continues to be one of the most popular and
              high-demand career options globally.
            </p>
          </div>

          {/* INTERNAL LINKS */}

          <div
            className="glass"
            style={{ padding: "35px", textAlign: "center", marginTop: "50px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              Explore More Student Resources
            </h3>

            <p style={{ opacity: "0.75", marginBottom: "20px" }}>
              Discover study materials, career guides and productivity tools
              designed for students.
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
                onClick={() => navigate("/courses-after-12th")}
              >
                All Courses Guide
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
