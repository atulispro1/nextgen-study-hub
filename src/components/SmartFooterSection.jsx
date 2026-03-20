import { useNavigate } from "react-router-dom";

export default function SmartFooterSection() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: "100px",
        padding: "50px 25px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,197,94,0.08))",
        textAlign: "center"
      }}
    >

      {/* HEADING */}
      <h2 style={{
        fontSize: "clamp(1.8rem,4vw,2.4rem)",
        fontWeight: "800",
        marginBottom: "15px"
      }}>
        Explore Study Resources, Articles & Learning Tools
      </h2>

      {/* DESCRIPTION */}
      <p style={{
        maxWidth: "800px",
        margin: "auto",
        lineHeight: "1.8",
        opacity: "0.85",
        marginBottom: "40px"
      }}>
        Discover high-quality educational resources including study tips,
        exam preparation strategies, programming tutorials, engineering notes,
        diploma study materials, productivity tools and career guidance.
        NextGen Study Hub helps students improve academic performance,
        build technical skills and prepare effectively for exams and jobs.
      </p>

      {/* GRID LINKS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
        gap: "20px"
      }}>

        {/* ARTICLES */}
        <div
          className="glass"
          style={{ padding: "25px", cursor: "pointer" }}
          onClick={() => navigate("/articles")}
        >
          <h3>📚 Student Articles</h3>
          <p style={{ opacity: 0.7 }}>
            Read study tips, exam preparation guides, productivity strategies
            and learning techniques for students.
          </p>
        </div>

        {/* NOTES */}
        <div
          className="glass"
          style={{ padding: "25px", cursor: "pointer" }}
          onClick={() => navigate("/notes-library")}
        >
          <h3>📘 Engineering Notes</h3>
          <p style={{ opacity: 0.7 }}>
            Access structured diploma and computer science notes including
            DBMS, OS, CN, Data Structures and programming subjects.
          </p>
        </div>

        {/* TOOLS */}
        <div
          className="glass"
          style={{ padding: "25px", cursor: "pointer" }}
          onClick={() => navigate("/student-tools")}
        >
          <h3>🧠 Student Tools</h3>
          <p style={{ opacity: 0.7 }}>
            Use CGPA calculators, percentage converters and productivity
            tools to manage your academic performance.
          </p>
        </div>

        {/* COURSES */}
        <div
          className="glass"
          style={{ padding: "25px", cursor: "pointer" }}
          onClick={() => navigate("/courses-after-12th")}
        >
          <h3>🎓 Courses & Career Guide</h3>
          <p style={{ opacity: 0.7 }}>
            Explore best courses after 12th, career options, degree programs
            and job-oriented educational paths.
          </p>
        </div>

      </div>

      {/* EXTRA SEO TEXT */}
      <div style={{ marginTop: "50px" }}>
        <p style={{
          maxWidth: "850px",
          margin: "auto",
          lineHeight: "1.8",
          opacity: "0.75",
          fontSize: "14px"
        }}>
          NextGen Study Hub is a complete student platform offering educational
          articles, engineering study materials, exam preparation resources,
          programming tutorials, career guidance and productivity tools for
          diploma and engineering students in India.
        </p>
      </div>

    </div>
  );
}