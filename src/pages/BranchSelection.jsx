import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { BRANCHES } from "../data/semesterBranches";
import SEO from "../components/SEO";

const SITE_URL = "https://www.atulsharmas.in";

export default function BranchSelection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";

  const pageUrl = `${SITE_URL}/semester/${id}/branch`;

  return (
    <>
      <SEO
        title={`Semester ${id} – Choose Your Engineering Branch`}
        description={`Select your engineering branch for Semester ${id} — Computer Science or Mechanical Engineering. Access branch-wise diploma notes, assignments, practicals, syllabus and exam study materials.`}
        keywords="diploma engineering branches, polytechnic branch selection, computer science diploma, mechanical engineering diploma, semester 3 subjects"
        url={pageUrl}
        schemaType="CollectionPage"
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: `Semester ${id}`, url: pageUrl },
        ]}
      />

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
            background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Branch
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
          From Semester {id} onwards, every branch studies its own subjects.
          Select your branch to unlock notes, assignments, practicals, and
          exam materials curated for your course.
        </p>
      </section>

      <div className="section">
        <button
          className="btn-primary"
          style={{ marginBottom: "30px" }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <h1 style={{ marginBottom: "40px" }}>
          Semester {id} – Select Your Branch
        </h1>

        <div className="grid">
          {BRANCHES.map((branch) => (
            <div
              key={branch.slug}
              className="glass"
              role="button"
              tabIndex={0}
              aria-label={`Select ${branch.name}`}
              style={{
                padding: "34px",
                textAlign: "left",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${branch.border}`,
                background:
                  isLightTheme
                    ? `linear-gradient(145deg, ${branch.accent}1f, rgba(255,255,255,0.94))`
                    : `linear-gradient(145deg, ${branch.accent}26, rgba(15,23,42,0.3))`,
                boxShadow: `0 18px 42px ${branch.glow}`,
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate(`/semester/${id}/branch/${branch.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/semester/${id}/branch/${branch.slug}`);
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.zIndex = "2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.zIndex = "1";
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-32% auto auto 62%",
                  width: "170px",
                  height: "170px",
                  borderRadius: "999px",
                  background:
                    isLightTheme
                      ? `radial-gradient(circle, ${branch.accent}14, transparent 72%)`
                      : `radial-gradient(circle, ${branch.accent}33, transparent 72%)`,
                  filter: "blur(4px)",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255,255,255,0.10)",
                  color: branch.accent,
                  padding: "6px 12px",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  borderRadius: "999px",
                  boxShadow: `0 0 16px ${branch.glow}`,
                  textTransform: "uppercase",
                }}
              >
                {branch.shortName}
              </span>

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  marginBottom: "18px",
                  background: isLightTheme
                    ? "rgba(255,255,255,0.72)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: isLightTheme
                    ? "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.06)"
                    : "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {branch.icon}
              </div>

              <h3
                style={{
                  fontWeight: "800",
                  fontSize: "24px",
                  marginBottom: "12px",
                  color: branch.accent,
                  textShadow: isLightTheme
                    ? "none"
                    : `0 0 18px ${branch.glow}`,
                }}
              >
                {branch.name}
              </h3>

              <p
                style={{
                  lineHeight: "1.75",
                  opacity: "0.86",
                  marginBottom: "18px",
                  maxWidth: "320px",
                }}
              >
                {branch.description}
              </p>

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  color: branch.accent,
                  opacity: "0.92",
                }}
              >
                {branch.tagline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
