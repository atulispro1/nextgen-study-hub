import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  getBranchBySlug,
  getBranchSubjects,
  formatSubjectName,
} from "../data/semesterBranches";
import SEO from "../components/SEO";

const SITE_URL = "https://www.atulsharmas.in";

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { id, branchSlug, category } = useParams();
  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";

  const branch = getBranchBySlug(branchSlug);
  const subjects = getBranchSubjects(id, branchSlug);

  const subjectThemes = [
    { accent: "#818cf8", border: "rgba(99,102,241,0.34)", glow: "rgba(99,102,241,0.20)" },
    { accent: "#fb923c", border: "rgba(249,115,22,0.34)", glow: "rgba(249,115,22,0.20)" },
    { accent: "#34d399", border: "rgba(16,185,129,0.34)", glow: "rgba(16,185,129,0.20)" },
    { accent: "#fbbf24", border: "rgba(250,204,21,0.38)", glow: "rgba(250,204,21,0.22)" },
    { accent: "#f472b6", border: "rgba(236,72,153,0.34)", glow: "rgba(236,72,153,0.20)" },
  ];

  if (!branch) {
    return (
      <div className="section" style={{ textAlign: "center" }}>
        <SEO
          title="Branch Not Found"
          description="The selected branch does not exist. Choose a valid engineering branch to browse semester study materials."
          noindex
        />
        <h1>Branch not found</h1>
        <p style={{ opacity: 0.8, marginBottom: "24px" }}>
          The selected branch does not exist. Please go back and choose again.
        </p>
        <button
          className="btn-primary"
          onClick={() => navigate(`/semester/${id}/branch`)}
        >
          ← Back to Branch Selection
        </button>
      </div>
    );
  }

  const pageUrl = `${SITE_URL}/semester/${id}/branch/${branch.slug}/${encodeURIComponent(category)}`;

  return (
    <>
      <SEO
        title={`${branch.name} – ${category} – Semester ${id}`}
        description={`Select a subject for ${category} – ${branch.name} (Semester ${id}). Access branch-wise notes, assignments, practicals, syllabus and previous year papers for your chosen subject.`}
        keywords={`${branch.name} semester ${id} subjects, polytechnic ${branch.name.toLowerCase()} notes, ${category.toLowerCase()} study material`}
        url={pageUrl}
        schemaType="CollectionPage"
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: `Semester ${id}`, url: `${SITE_URL}/semester/${id}/branch` },
          { name: branch.name, url: `${SITE_URL}/semester/${id}/branch/${branch.slug}` },
          { name: category, url: pageUrl },
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
          Select Your Subject
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
          {branch.name} • Semester {id} • {category}. Pick a subject below to
          open its study materials — notes, assignments, practicals, and exam
          resources in one place.
        </p>
      </section>

      <div className="section">
        <button
          className="btn-primary"
          style={{ marginBottom: "30px" }}
          onClick={() => navigate(`/semester/${id}/branch/${branch.slug}`)}
        >
          ← Back to Resources
        </button>

        <h1 style={{ marginBottom: "40px" }}>
          {branch.name} – {category}
        </h1>

        <div className="grid">
          {subjects.map((subject, index) => {
            const theme2 = subjectThemes[index % subjectThemes.length];

            return (
              <div
                key={subject.code}
                className="glass"
                role="button"
                tabIndex={0}
                aria-label={`Select ${subject.name}`}
                style={{
                  padding: "30px",
                  textAlign: "left",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  border: `1px solid ${theme2.border}`,
                  background:
                    isLightTheme
                      ? `linear-gradient(145deg, ${theme2.accent}1a, rgba(255,255,255,0.94))`
                      : `linear-gradient(145deg, ${theme2.accent}22, rgba(15,23,42,0.3))`,
                  boxShadow: `0 18px 42px ${theme2.glow}`,
                  transition: "all 0.3s ease",
                }}
                onClick={() =>
                  navigate(
                    `/semester/${id}/branch/${branch.slug}/${encodeURIComponent(
                      category,
                    )}/${encodeURIComponent(formatSubjectName(subject))}`,
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(
                      `/semester/${id}/branch/${branch.slug}/${encodeURIComponent(
                        category,
                      )}/${encodeURIComponent(formatSubjectName(subject))}`,
                    );
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
                    width: "160px",
                    height: "160px",
                    borderRadius: "999px",
                    background:
                      isLightTheme
                        ? `radial-gradient(circle, ${theme2.accent}12, transparent 72%)`
                        : `radial-gradient(circle, ${theme2.accent}30, transparent 72%)`,
                    filter: "blur(4px)",
                  }}
                />

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 13px",
                    borderRadius: "999px",
                    background: isLightTheme
                      ? "rgba(255,255,255,0.72)"
                      : "rgba(255,255,255,0.08)",
                    color: theme2.accent,
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.05em",
                    marginBottom: "18px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{subject.icon}</span>
                  {subject.code}
                </div>

                <h3
                  style={{
                    fontWeight: "800",
                    fontSize: "22px",
                    marginBottom: "12px",
                    color: theme2.accent,
                    lineHeight: "1.5",
                    textShadow: isLightTheme
                      ? "none"
                      : `0 0 16px ${theme2.glow}`,
                  }}
                >
                  {subject.name}
                </h3>

                <p
                  style={{
                    lineHeight: "1.75",
                    opacity: "0.86",
                    marginBottom: "18px",
                    maxWidth: "330px",
                  }}
                >
                  {subject.description}
                </p>

                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    color: theme2.accent,
                    opacity: "0.92",
                  }}
                >
                  Open {category} materials →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
