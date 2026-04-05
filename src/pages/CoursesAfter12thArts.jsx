import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";

export default function CoursesAfter12thArts() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Best Courses After 12th Arts – Career Options & High Salary Careers"
        description="Discover the best courses after 12th arts including BA, journalism, law, psychology, design and media careers. Explore high salary career options for arts students."
        url="https://atulsharmas.in/courses-after-12th-arts"
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
              Best Courses After 12th Arts – Career Guide
            </h1>

            <p
              style={{
                maxWidth: "800px",
                margin: "auto",
                opacity: "0.85",
                lineHeight: "1.8",
              }}
            >
              Students from the arts stream have a wide range of career
              opportunities in fields such as media, education, psychology, law,
              design, social sciences and creative industries. Many modern
              career paths in digital media, content creation and design are
              also popular among arts students.
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

          {/* POPULAR COURSES */}

          <h2 style={{ marginBottom: "15px" }}>
            Popular Courses After 12th Arts
          </h2>

          <p style={{ opacity: "0.85", marginBottom: "30px" }}>
            Several degree programs allow arts students to build careers in
            teaching, media, politics, administration and research. These
            courses focus on developing analytical thinking, communication
            skills and creativity.
          </p>

          <div className="grid" style={{ marginBottom: "50px" }}>
            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA (Bachelor of Arts)</h3>
              <p style={{ opacity: "0.75" }}>
                One of the most popular courses after 12th arts. Students can
                specialize in subjects like history, political science,
                sociology or economics.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA Journalism & Mass Communication</h3>
              <p style={{ opacity: "0.75" }}>
                Ideal for students interested in media, journalism, digital
                content, public relations and broadcasting careers.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA Psychology</h3>
              <p style={{ opacity: "0.75" }}>
                A growing field focused on understanding human behaviour. Career
                options include counseling, therapy and research.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA Political Science</h3>
              <p style={{ opacity: "0.75" }}>
                Useful for careers in civil services, public administration,
                politics and international relations.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA English Literature</h3>
              <p style={{ opacity: "0.75" }}>
                Great option for students interested in writing, teaching,
                publishing and media careers.
              </p>
            </div>
          </div>

          {/* CREATIVE CAREERS */}

          <h2 style={{ marginTop: "40px" }}>Creative Career Courses</h2>

          <p style={{ opacity: "0.85", marginBottom: "30px" }}>
            Arts students often choose creative fields where they can apply
            imagination, storytelling and design skills. Many of these careers
            are growing rapidly in the digital economy.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>Bachelor of Fine Arts (BFA)</li>
            <li>Fashion Design Courses</li>
            <li>Graphic Design</li>
            <li>Animation & Multimedia</li>
            <li>Interior Design</li>
            <li>Film Making</li>
          </ul>

          {/* HIGH SALARY CAREERS */}

          <h2 style={{ marginTop: "40px" }}>
            High Salary Careers for Arts Students
          </h2>

          <p style={{ opacity: "0.85", marginBottom: "20px" }}>
            Many arts graduates build successful careers in law, media, digital
            marketing and government services. The table below shows some common
            career paths and estimated salary ranges in India.
          </p>

          <div
            className="glass"
            style={{ padding: "30px", marginBottom: "50px" }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Career</th>
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
                  <td style={{ padding: "10px" }}>Lawyer</td>
                  <td style={{ padding: "10px" }}>₹5L – ₹20L</td>
                  <td style={{ padding: "10px" }}>Legal</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Journalist</td>
                  <td style={{ padding: "10px" }}>₹4L – ₹12L</td>
                  <td style={{ padding: "10px" }}>Media</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Digital Marketer</td>
                  <td style={{ padding: "10px" }}>₹6L – ₹18L</td>
                  <td style={{ padding: "10px" }}>Marketing</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Psychologist</td>
                  <td style={{ padding: "10px" }}>₹5L – ₹15L</td>
                  <td style={{ padding: "10px" }}>Healthcare</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Graphic Designer</td>
                  <td style={{ padding: "10px" }}>₹4L – ₹10L</td>
                  <td style={{ padding: "10px" }}>Design</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* GOVERNMENT EXAMS */}

          <h2>Government Exams for Arts Students</h2>

          <p style={{ opacity: "0.85", marginBottom: "20px" }}>
            Arts students often prepare for competitive exams and government
            jobs because subjects like history, geography and political science
            are closely related to exam syllabi.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>UPSC Civil Services</li>
            <li>SSC Exams</li>
            <li>State Public Service Commission</li>
            <li>Banking Exams</li>
            <li>Railway Exams</li>
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
              Explore study materials, student productivity tools and career
              guides designed to help students succeed academically.
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
