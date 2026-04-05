import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";

export default function CoursesAfter12thCommerce() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Best Courses After 12th Commerce – Career Options & High Salary Courses"
        description="Explore the best courses after 12th commerce including BCom, BBA, CA, CS, finance and management programs. Discover high salary career options for commerce students."
        url="https://atulsharmas.in/courses-after-12th-commerce"
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
              Best Courses After 12th Commerce
            </h1>

            <p
              style={{
                maxWidth: "800px",
                margin: "auto",
                opacity: "0.85",
                lineHeight: "1.8",
              }}
            >
              Commerce students have excellent career opportunities in finance,
              business management, accounting, banking and entrepreneurship.
              Many professional courses in commerce offer strong salary
              potential and long-term career growth in corporate industries.
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

          {/* DEGREE COURSES */}

          <h2>Popular Degree Courses After 12th Commerce</h2>

          <p style={{ opacity: "0.85", marginBottom: "25px" }}>
            Many students pursue degree programs that build strong foundations
            in business, finance and economics.
          </p>

          <div className="grid" style={{ marginBottom: "50px" }}>
            <div className="glass" style={{ padding: "25px" }}>
              <h3>Bachelor of Commerce (BCom)</h3>
              <p style={{ opacity: "0.75" }}>
                One of the most popular commerce degrees focused on accounting,
                finance and taxation.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>Bachelor of Business Administration (BBA)</h3>
              <p style={{ opacity: "0.75" }}>
                A management focused course that prepares students for
                leadership roles in business and corporate industries.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>BA Economics</h3>
              <p style={{ opacity: "0.75" }}>
                Ideal for students interested in economic research, finance and
                policy making.
              </p>
            </div>

            <div className="glass" style={{ padding: "25px" }}>
              <h3>Bachelor of Management Studies</h3>
              <p style={{ opacity: "0.75" }}>
                Focused on management, marketing, human resources and business
                strategy.
              </p>
            </div>
          </div>

          {/* PROFESSIONAL COURSES */}

          <h2>Professional Courses After 12th Commerce</h2>

          <p style={{ opacity: "0.85", marginBottom: "25px" }}>
            Professional certifications offer excellent salary potential and
            career opportunities in finance and accounting industries.
          </p>

          <ul style={{ marginBottom: "40px" }}>
            <li>Chartered Accountant (CA)</li>
            <li>Company Secretary (CS)</li>
            <li>Cost and Management Accounting (CMA)</li>
            <li>Certified Financial Planner (CFP)</li>
            <li>Investment Banking Courses</li>
          </ul>

          {/* HIGH SALARY CAREERS */}

          <h2>High Salary Career Options for Commerce Students</h2>

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
                  <td style={{ padding: "10px" }}>Chartered Accountant</td>
                  <td style={{ padding: "10px" }}>₹7L – ₹30L</td>
                  <td style={{ padding: "10px" }}>Finance</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Investment Banker</td>
                  <td style={{ padding: "10px" }}>₹10L – ₹40L</td>
                  <td style={{ padding: "10px" }}>Banking</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Financial Analyst</td>
                  <td style={{ padding: "10px" }}>₹6L – ₹18L</td>
                  <td style={{ padding: "10px" }}>Finance</td>
                </tr>

                <tr>
                  <td style={{ padding: "10px" }}>Business Manager</td>
                  <td style={{ padding: "10px" }}>₹6L – ₹20L</td>
                  <td style={{ padding: "10px" }}>Corporate</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ SECTION */}

          <h2 style={{ marginTop: "40px" }}>Frequently Asked Questions</h2>

          <div className="faq-box">
            <h4>Which course is best after 12th commerce?</h4>
            <p>
              Popular courses include BCom, BBA, Chartered Accountancy (CA),
              Company Secretary (CS) and finance related programs.
            </p>
          </div>

          <div className="faq-box">
            <h4>Which course after 12th commerce has highest salary?</h4>
            <p>
              Chartered Accountancy, Investment Banking and Financial Analysis
              are among the highest paying careers for commerce students.
            </p>
          </div>

          <div className="faq-box">
            <h4>Can commerce students work in business management?</h4>
            <p>
              Yes. Courses like BBA and MBA are designed specifically for
              students interested in management and entrepreneurship.
            </p>
          </div>

          <div className="faq-box">
            <h4>What government exams can commerce students prepare for?</h4>
            <p>
              Commerce students can prepare for SSC, Banking exams, UPSC civil
              services and other government job examinations.
            </p>
          </div>

          {/* INTERNAL LINKS */}

          <div
            className="glass"
            style={{ padding: "35px", textAlign: "center", marginTop: "50px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              Explore More Career Resources
            </h3>

            <p style={{ opacity: "0.75", marginBottom: "20px" }}>
              Discover more career guides, study materials and student tools.
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
