
import { useNavigate } from "react-router-dom";

export default function SemesterSection() {
  const navigate = useNavigate();

  const semesters = [
    { id: 1, desc: "Programming Fundamentals & Basics" },
    { id: 2, desc: "Core Computer Science Concepts" },
    { id: 3, desc: "Data Structures & DBMS" },
    { id: 4, desc: "Operating Systems & Networks" },
    { id: 5, desc: "Advanced Subjects & Projects" },
    { id: 6, desc: "Final Year Specialization" },
  ];

  return (
    <section
      className="section"

    
    >
      <div id="semester" style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Explore By Semester
        </h2>
        <p style={{ opacity: 0.7 }}>
          Access notes, assignments, practical files & premium materials
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {semesters.map((sem, index) => (
          <div 
            key={sem.id}
            onClick={() => navigate(`/semester/${sem.id}`)}
            className="glass"
            style={{
              padding: "40px",
              cursor: "pointer",
              position: "relative",
              border: "1px solid rgba(99,102,241,0.2)",
              overflow: "hidden",
            }}
            >
          
            {/* Gradient Hover Glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(147,51,234,0.15))",
                opacity: 0,
                transition: "0.3s",
              }}
              className="hover-bg"
            />

            <h3
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "var(--primary)",
              }}
            >
              Semester {sem.id}
            </h3>

            <p style={{ opacity: 0.7, marginBottom: "20px" }}>
              {sem.desc}
            </p>

            <div
              style={{
                fontSize: "14px",
                opacity: 0.6,
              }}
            >
              Notes • Assignments • Practicals • Premium
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}