import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isBranchSemester } from "../data/semesterBranches";

export default function SemesterSection() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";

  const semesters = [
    { id: 1, desc: "Programming Fundamentals & Basics" },
    { id: 2, desc: "Core Computer Science Concepts" },
    { id: 3, desc: "Data Structures & DBMS" },
    { id: 4, desc: "Operating Systems & Networks" },
    { id: 5, desc: "Advanced Subjects & Projects" },
    { id: 6, desc: "Final Year Specialization" },
  ];

  const semesterCardTheme = {
    border: isLightTheme
      ? "1px solid rgba(99,102,241,0.18)"
      : "1px solid rgba(129,140,248,0.34)",
    background: isLightTheme
      ? "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(245,243,255,0.78), rgba(239,246,255,0.72))"
      : "linear-gradient(145deg, rgba(139,92,246,0.15), rgba(99,102,241,0.14), rgba(59,130,246,0.10))",
    boxShadow: isLightTheme
      ? "0 14px 32px rgba(15,23,42,0.08)"
      : "0 18px 44px rgba(99,102,241,0.20), 0 0 24px rgba(139,92,246,0.12)",
    title: isLightTheme ? "#0f172a" : "#e0e7ff",
    meta: isLightTheme ? "#4f46e5" : "#c4b5fd",
    accent: isLightTheme ? "#6d28d9" : "#a5b4fc",
  };

  return (
    <section className="section">
      <div id="semester" style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "15px",
            background: isLightTheme
              ? "linear-gradient(90deg, #4f46e5, #7c3aed, #8b5cf6)"
              : "linear-gradient(90deg, #a5b4fc, #c4b5fd, #ddd6fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: isLightTheme
              ? "none"
              : "0 0 18px rgba(103,232,249,0.16)",
          }}
        >
          Explore By Semester
        </h2>
        <p style={{ opacity: 0.76 }}>
          Access notes, assignments, practical files and premium materials
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          gap: "clamp(16px, 4vw, 30px)",
        }}
      >
        <div
          onClick={() => navigate("/last-minute-resources")}
          className="glass"
          style={{
            padding: "clamp(18px, 4vw, 36px)",
            cursor: "pointer",
            position: "relative",
            border: "1px solid rgba(251,191,36,0.45)",
            overflow: "hidden",
            background: isLightTheme
              ? "linear-gradient(145deg, rgba(255,251,235,0.96), rgba(255,247,237,0.84))"
              : "linear-gradient(145deg, rgba(250,204,21,0.18), rgba(249,115,22,0.14), rgba(99,102,241,0.14))",
            boxShadow: isLightTheme
              ? "0 14px 32px rgba(180,83,9,0.10)"
              : "0 18px 45px rgba(249,115,22,0.22), 0 0 24px rgba(250,204,21,0.18)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-35% auto auto 58%",
              width: "170px",
              height: "170px",
              borderRadius: "999px",
              background:
                isLightTheme
                  ? "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.34), transparent 70%)",
              filter: "blur(4px)",
            }}
          />

          <span
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#facc15",
              color: "#111827",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              borderRadius: "999px",
              boxShadow: "0 0 18px rgba(250,204,21,0.55)",
              textTransform: "uppercase",
            }}
          >
            Hot Pick
          </span>

          <h3
            style={{
              fontSize: "clamp(18px, 4vw, 24px)",
              marginBottom: "12px",
              paddingRight: "75px",
              color: isLightTheme ? "#92400e" : "#fef3c7",
              textShadow: isLightTheme
                ? "none"
                : "0 0 18px rgba(250,204,21,0.28)",
            }}
          >
            Last Minute Exam Boost
          </h3>

          <p style={{ opacity: 0.88, marginBottom: "20px", lineHeight: "1.7", fontSize: "14px" }}>
            Quick-revision notes, important questions, and exam-time material
            for students who need fast, high-impact preparation.
          </p>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: isLightTheme ? "#92400e" : "#fde68a",
            }}
          >
            Revision PDFs | Important Questions | Score Better Fast
          </div>
        </div>

        {semesters.map((sem) => (
          <div
            key={sem.id}
            onClick={() =>
              navigate(
                isBranchSemester(sem.id)
                  ? `/semester/${sem.id}/branch`
                  : `/semester/${sem.id}`,
              )
            }
            className="glass"
            style={{
              padding: "clamp(18px, 4vw, 36px)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              ...semesterCardTheme,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-30% auto auto 62%",
                width: "160px",
                height: "160px",
                borderRadius: "999px",
                background:
                  isLightTheme
                    ? "radial-gradient(circle, rgba(99,102,241,0.10), transparent 72%)"
                    : "radial-gradient(circle, rgba(255,255,255,0.22), transparent 72%)",
                filter: "blur(3px)",
              }}
            />

            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(99,102,241,0.14)",
                color: semesterCardTheme.accent,
                padding: "6px 12px",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "0.08em",
                borderRadius: "999px",
                boxShadow: "0 0 16px rgba(99,102,241,0.18)",
                textTransform: "uppercase",
              }}
            >
              Semester Hub
            </span>

            <h3
              style={{
                fontSize: "clamp(18px, 4vw, 24px)",
                marginBottom: "12px",
                paddingRight: "75px",
                color: semesterCardTheme.title,
                textShadow: isLightTheme
                  ? "none"
                  : "0 0 18px rgba(99,102,241,0.20)",
              }}
            >
              Semester {sem.id}
            </h3>

            <p style={{ opacity: 0.82, marginBottom: "20px", lineHeight: "1.7", fontSize: "14px" }}>
              {sem.desc}
            </p>

            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: semesterCardTheme.meta,
              }}
            >
              Notes | Assignments | Practicals | Premium
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
