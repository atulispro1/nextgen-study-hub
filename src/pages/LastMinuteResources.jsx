import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, Download, FileText, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import CreateUnit from "../components/CreateUnit";
import UnitFeedback from "../components/UnitFeedback";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { supabase } from "../supabase";
import { isAdminRole, openSafeExternalUrl } from "../utils/security";
import { confirmDelete } from "../utils/deleteConfirm";
import { getProgress, toggleUnitProgress } from "../utils/progressUtils";

const categoryCards = [
  {
    id: "Important MCQs",
    title: "Important MCQs",
    description:
      "Rapid-fire objective questions for quick practice before the exam.",
    tag: "Fast Practice",
    colors: {
      border: "rgba(250, 204, 21, 0.34)",
      glow: "rgba(250, 204, 21, 0.18)",
      title: "#fde68a",
      bg: "linear-gradient(145deg, rgba(250,204,21,0.16), rgba(245,158,11,0.12), rgba(59,130,246,0.08))",
    },
  },
  {
    id: "Quick Revision Notes",
    title: "Quick Revision Notes",
    description:
      "Short, score-focused revision PDFs to revise faster on exam days.",
    tag: "Quick Revision",
    colors: {
      border: "rgba(45, 212, 191, 0.34)",
      glow: "rgba(45, 212, 191, 0.18)",
      title: "#99f6e4",
      bg: "linear-gradient(145deg, rgba(45,212,191,0.16), rgba(14,165,233,0.12), rgba(59,130,246,0.08))",
    },
  },
  {
    id: "Most Important Questions",
    title: "Most Important Questions",
    description:
      "High-priority long questions and repeated exam patterns to focus on.",
    tag: "Exam Priority",
    colors: {
      border: "rgba(196, 181, 253, 0.34)",
      glow: "rgba(196, 181, 253, 0.18)",
      title: "#ddd6fe",
      bg: "linear-gradient(145deg, rgba(139,92,246,0.18), rgba(168,85,247,0.12), rgba(59,130,246,0.08))",
    },
  },
  {
    id: "Question Banks",
    title: "Question Banks",
    description:
      "Collected question bank PDFs for deeper practice and broader exam coverage.",
    tag: "Practice Vault",
    colors: {
      border: "rgba(96, 165, 250, 0.34)",
      glow: "rgba(96, 165, 250, 0.18)",
      title: "#bfdbfe",
      bg: "linear-gradient(145deg, rgba(96,165,250,0.16), rgba(59,130,246,0.12), rgba(14,165,233,0.08))",
    },
  },
  {
    id: "More Coming Soon",
    title: "More Coming Soon",
    description:
      "One-night prep kits, repeated topics, mini cheat sheets, and more are on the way.",
    tag: "Soon",
    disabled: true,
    colors: {
      border: "rgba(148, 163, 184, 0.26)",
      glow: "rgba(148, 163, 184, 0.12)",
      title: "#e2e8f0",
      bg: "linear-gradient(145deg, rgba(148,163,184,0.12), rgba(71,85,105,0.08), rgba(15,23,42,0.05))",
    },
  },
];

const defaultSubjectsBySemester = {
  1: [
    "Applied Chemistry (DCH-101)",
    "Engineering Mechanics (DME-201)",
    "Basic Electrical Engineering (DEE-201)",
    "Applied Mathematics (DMA-201)",
    "Essential Language & Communication (DGS-201)",
    "Environmental Science (DCE-201)",
  ],
  2: [
    "Programming in C",
    "Digital Electronics",
    "Applied Mathematics II",
    "Workshop Practice",
    "Engineering Drawing",
    "Computer Fundamentals",
  ],
  3: [
    "Data Structures",
    "Database Management System",
    "Object Oriented Programming",
    "Computer Organization",
    "Discrete Mathematics",
    "Web Technology Basics",
  ],
  4: [
    "Operating System",
    "Computer Networks",
    "Java Programming",
    "Software Engineering",
    "Microprocessor",
    "Python Programming",
  ],
  5: [
    "Advanced Java",
    "Computer Security",
    "Mobile Application Development",
    "Cloud Computing",
    "Machine Learning Basics",
    "Project Work",
  ],
  6: [
    "Industrial Training",
    "Major Project",
    "Entrepreneurship",
    "Emerging Technologies",
    "Interview Preparation",
    "Revision and Viva",
  ],
};

export default function LastMinuteResources() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const semesterParam = searchParams.get("semester");
  const { role, profileReady, profileMissing, user } = useAuth();
  const { theme } = useContext(ThemeContext);

  const initialSemester = semesterParam && !Number.isNaN(Number(semesterParam))
    ? String(Number(semesterParam))
    : null;

  const [selectedSemester, setSelectedSemester] = useState(initialSemester);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const isDark = theme === "dark";

  const isAdmin = profileReady && isAdminRole(role);
  const resourceKey = selectedSemester && selectedCategory && selectedSubject
    ? `last-minute-${selectedSemester}-${selectedCategory}-${selectedSubject}`
    : "last-minute";

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from("materials").select("*");
    if (!error) {
      setMaterials(data || []);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const subjectOptions = useMemo(() => {
    if (!selectedSemester) return [];

    const semesterSubjects = materials
      .filter((item) => item.semester === selectedSemester)
      .map((item) => item.subject)
      .filter(Boolean);

    const uniqueSubjects = [...new Set(semesterSubjects)];
    if (uniqueSubjects.length > 0) {
      return uniqueSubjects.sort((a, b) => a.localeCompare(b));
    }

    return defaultSubjectsBySemester[Number(selectedSemester)] || [];
  }, [materials, selectedSemester]);

  const selectedResources = useMemo(
    () =>
      materials.filter(
        (item) =>
          item.semester === selectedSemester &&
          item.category === selectedCategory &&
          item.subject === selectedSubject,
      ),
    [materials, selectedSemester, selectedCategory, selectedSubject],
  );

  const primaryResources = selectedResources.filter(
    (item) => item.note_type === "teacher",
  );
  const extraResources = selectedResources.filter(
    (item) => item.note_type === "extra",
  );

  const breadcrumb = [
    selectedSemester ? `Semester ${selectedSemester}` : null,
    selectedCategory,
    selectedSubject,
  ].filter(Boolean);

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
      return;
    }

    if (selectedCategory) {
      setSelectedCategory(null);
      return;
    }

    if (selectedSemester && !semesterParam) {
      setSelectedSemester(null);
      return;
    }

    navigate(semesterParam ? `/semester/${selectedSemester}` : "/");
  };

  return (
    <>
      <Helmet>
        <title>Last Minute Exam Resources | NextGen Study Hub</title>
        <meta
          name="description"
          content="Important MCQs, quick revision notes, and most important questions for exam-time preparation on NextGen Study Hub."
        />
      </Helmet>

      <section className="section" style={{ paddingTop: "18px", paddingBottom: "70px" }}>
        <button
          className="btn-primary"
          style={{ marginBottom: "28px" }}
          onClick={handleBack}
        >
          {selectedSubject || selectedCategory || (selectedSemester && !semesterParam)
            ? "<- Back"
            : semesterParam
              ? "<- Back to Semester"
              : "<- Back to Home"}
        </button>

        <LastMinuteHero
          selectedSemester={selectedSemester}
          selectedCategory={selectedCategory}
          selectedSubject={selectedSubject}
          breadcrumb={breadcrumb}
          isDark={isDark}
        />

        {!selectedSemester && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title="Choose Your Semester First"
              description="Select the semester so students only see exam-time resources that matter for that level."
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "24px" }}>
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  className="glass"
                  onClick={() => setSelectedSemester(String(sem))}
                  style={{
                    padding: "28px",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "1px solid rgba(99,102,241,0.18)",
                    background:
                      "linear-gradient(145deg, rgba(99,102,241,0.12), rgba(14,165,233,0.08))",
                    boxShadow: "0 12px 30px rgba(30,41,59,0.12)",
                    color: isDark ? "#e5eefb" : "#1f2937",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "22px",
                      marginBottom: "10px",
                      color: "#dbeafe",
                    }}
                  >
                    Semester {sem}
                  </strong>
                  <span style={{ opacity: 0.82, lineHeight: "1.7" }}>
                    Open last-minute exam PDFs, important MCQs, and quick revision
                    material for Semester {sem}.
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSemester && !selectedCategory && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={`Last Minute Resource Sections for Semester ${selectedSemester}`}
              description="Choose the type of exam content you want to upload or study right now."
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "24px" }}>
              {categoryCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  disabled={card.disabled}
                  className="glass"
                  onClick={() => !card.disabled && setSelectedCategory(card.id)}
                  style={{
                    padding: "30px",
                    textAlign: "left",
                    cursor: card.disabled ? "not-allowed" : "pointer",
                    position: "relative",
                    overflow: "hidden",
                    opacity: card.disabled ? 0.82 : 1,
                    border: `1px solid ${card.colors.border}`,
                    background: card.colors.bg,
                    boxShadow: `0 18px 44px ${card.colors.glow}`,
                    color: isDark ? "#edf2f7" : "#1f2937",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#0f172a",
                      background: card.colors.title,
                    }}
                  >
                    {card.tag}
                  </span>

                  <h3
                    style={{
                      fontSize: "24px",
                      marginBottom: "12px",
                      color: card.colors.title,
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      lineHeight: "1.75",
                      opacity: isDark ? 0.86 : 0.92,
                      marginBottom: "18px",
                      color: isDark ? "rgba(255,255,255,0.88)" : "#334155",
                    }}
                  >
                    {card.description}
                  </p>

                  <div style={{ color: card.colors.title, fontWeight: "700" }}>
                    {card.disabled ? "More sections on the way" : "Open this section"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSemester && selectedCategory && !selectedSubject && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={`Choose a Subject for ${selectedCategory}`}
              description="Once you choose a subject, students will see the uploaded PDFs for that exact exam section."
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "22px" }}>
              {subjectOptions.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  className="glass"
                  onClick={() => setSelectedSubject(subject)}
                  style={{
                    padding: "26px",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background:
                      "linear-gradient(145deg, rgba(15,23,42,0.16), rgba(99,102,241,0.08))",
                    boxShadow: "0 14px 34px rgba(15,23,42,0.18)",
                    color: isDark ? "#f8fafc" : "#1f2937",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "20px",
                      lineHeight: "1.5",
                      color: isDark ? "#f8fafc" : "#1e293b",
                    }}
                  >
                    {subject}
                  </strong>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSemester && selectedCategory && selectedSubject && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={selectedSubject}
              description={`Exam-time PDFs for ${selectedCategory}. Upload, open, download, and track what you have already revised.`}
              isDark={isDark}
            />

            <div
              className="glass"
              style={{
                padding: "24px",
                borderRadius: "22px",
                marginBottom: "28px",
                border: "1px solid rgba(250,204,21,0.14)",
                background:
                  "linear-gradient(145deg, rgba(250,204,21,0.08), rgba(245,158,11,0.06), rgba(15,23,42,0.18))",
                color: isDark ? "#f8fafc" : "#1f2937",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                }}
              >
                <StatChip label="Semester" value={`Sem ${selectedSemester}`} isDark={isDark} />
                <StatChip label="Section" value={selectedCategory} isDark={isDark} />
                <StatChip label="Primary PDFs" value={String(primaryResources.length)} isDark={isDark} />
                <StatChip label="Extra PDFs" value={String(extraResources.length)} isDark={isDark} />
              </div>
            </div>

            {isAdmin && (
              <CreateUnit
                semester={selectedSemester}
                subject={selectedSubject}
                category={selectedCategory}
                onSuccess={fetchMaterials}
                title="Upload Last Minute Exam PDF"
                typeLabel="Resource Group"
                noteTypeOptions={[
                  { value: "teacher", label: "Main Resource" },
                  { value: "extra", label: "Extra Resource" },
                ]}
                unitLabel="PDF Title"
                unitPlaceholder="Enter the PDF title students will see"
                pdfLabel="Upload PDF File"
                imageLabel="Upload Thumbnail (Optional)"
                submitLabel="Publish Exam Resource"
              />
            )}

            {!isAdmin && (
              <div
                className="glass"
                style={{
                  padding: "24px",
                  marginBottom: "32px",
                  textAlign: "center",
                  borderRadius: "18px",
                  color: isDark ? "#e5e7eb" : "#334155",
                }}
              >
                <p style={{ opacity: 0.78 }}>
                  Only admins and faculty can upload last-minute exam PDFs here.
                </p>
                {user && profileMissing && (
                  <p style={{ opacity: 0.68, fontSize: "13px", marginTop: "10px" }}>
                    Your admin profile setup is incomplete in Supabase.
                  </p>
                )}
              </div>
            )}

            <ResourceSection
              title="Main Exam Resources"
              description="Keep the strongest, most exam-relevant PDFs in this section."
              items={primaryResources}
              emptyTitle="No main resources uploaded yet"
              emptyText="Upload the core PDF notes, top MCQs, or most important questions here first."
              progressKey={resourceKey}
              isAdmin={isAdmin}
              refresh={fetchMaterials}
              subject={selectedSubject}
              isDark={isDark}
            />

            <ResourceSection
              title="Extra Exam Support"
              description="Use this for bonus practice PDFs, backup sheets, and extra revision help."
              items={extraResources}
              emptyTitle="No extra resources uploaded yet"
              emptyText="You can add extra support PDFs here for students who want one more practice layer."
              progressKey={resourceKey}
              isAdmin={isAdmin}
              refresh={fetchMaterials}
              subject={selectedSubject}
              isDark={isDark}
            />

            <div
              className="glass"
              style={{
                marginTop: "42px",
                padding: "30px",
                borderRadius: "22px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(145deg, rgba(45,212,191,0.08), rgba(14,165,233,0.06), rgba(15,23,42,0.18))",
                color: isDark ? "#e5e7eb" : "#334155",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontWeight: "800",
                  color: "#ccfbf1",
                }}
              >
                Add only the most score-improving PDFs here
              </h3>

              <p
                style={{
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.8",
                  opacity: 0.84,
                }}
              >
                This section should stay short, sharp, and exam-focused. Think
                quick revision notes, handpicked MCQs, expected questions, and
                last-night preparation PDFs that students can actually finish.
              </p>
            </div>

            <UnitFeedback unitId={resourceKey} isAdmin={isAdmin} />
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
                marginTop: "40px",
                padding: "30px",
                borderRadius: "18px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontWeight: "700",
                  color: "var(--primary)",
                }}
              >
                Need a Clearer Explanation?
              </h3>

              <p
                style={{
                  maxWidth: "650px",
                  margin: "auto",
                  opacity: "0.85",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                  fontSize: "15px",
                }}
              >
                Some engineering topics can be difficult to understand from
                notes alone. If you need a simpler explanation, examples, or
                step-by-step guidance, try our AI Study Assistant. It can help
                explain concepts, solve doubts, and guide you through complex
                topics in a more interactive way.
              </p>

              <button
                className="btn-primary"
                style={{
                  padding: "12px 24px",
                  borderRadius: "40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
                }}
                onClick={() => navigate("/student-tools")}
              >
                🤖 Use AI Assistant
              </button>
            </div>
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
                clearly and prepare efficiently for exams. Organized study
                materials allow engineering and diploma students to review
                important concepts quickly, improve retention and build a strong
                academic foundation.
              </p>
            </div>

            <div
              className="glass"
              style={{
                padding: "60px",
                marginTop: "120px",
                textAlign: "center",
                maxWidth: "900px",
                marginInline: "auto",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "20px",
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                🚀 More Powerful Features Coming Soon...
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.8,
                  lineHeight: "1.8",
                  maxWidth: "700px",
                  margin: "auto",
                  marginBottom: "35px",
                }}
              >
                We’re constantly improving the Student Tools experience to make
                your academic journey smarter, faster, and more productive 📚✨
                If you have an idea that could make this platform even better —
                don’t keep it to yourself! 💡 Drop your suggestion in the
                Contact section and help us build the ultimate study companion
                together 🚀
                <br />
                <br />
                What features should i add more??
              </p>
              <button
                onClick={() => navigate("/contact-owner")}
                style={{
                  padding: "14px 40px",
                  borderRadius: "30px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 10px 25px rgba(99,102,241,0.3)",
                }}
              >
                💬 Send Your Suggestion
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function LastMinuteHero({
  selectedSemester,
  selectedCategory,
  selectedSubject,
  breadcrumb,
  isDark,
}) {
  return (
    <div
      className="glass"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(30px, 6vw, 62px)",
        borderRadius: "30px",
        border: "1px solid rgba(250, 204, 21, 0.24)",
        background:
          "linear-gradient(145deg, rgba(250,204,21,0.14), rgba(249,115,22,0.10), rgba(59,130,246,0.08))",
        boxShadow:
          "0 26px 68px rgba(15,23,42,0.26), 0 0 34px rgba(250,204,21,0.12)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-60px",
          right: "-20px",
          width: "240px",
          height: "240px",
          borderRadius: "999px",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.28), transparent 68%)",
          filter: "blur(12px)",
        }}
      />

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "18px",
          padding: "8px 16px",
          borderRadius: "999px",
          background: "rgba(250,204,21,0.16)",
          color: "#fde68a",
          fontWeight: "800",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <Sparkles size={16} />
        Exam Mode
      </span>

      <h1
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          marginBottom: "14px",
          fontWeight: "900",
          background: "linear-gradient(90deg, #fef3c7, #facc15, #fb923c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Last Minute Exam Resources
      </h1>

      <p
        style={{
          maxWidth: "820px",
          lineHeight: "1.85",
          opacity: isDark ? 0.88 : 0.95,
          fontSize: "16px",
          marginBottom: breadcrumb.length > 0 ? "18px" : 0,
          color: isDark ? "rgba(255,255,255,0.9)" : "#334155",
        }}
      >
        A focused space for high-impact PDFs only: important MCQs, quick revision
        notes, and most important questions students can use right before exams.
      </p>

      {breadcrumb.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "18px",
          }}
        >
          {breadcrumb.map((item) => (
            <span
              key={item}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                color: isDark ? "#fff7ed" : "#1f2937",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {selectedSemester && !selectedCategory && (
        <p style={{ marginTop: "18px", color: "#fde68a", fontWeight: "700" }}>
          You are browsing Semester {selectedSemester}.
        </p>
      )}

      {selectedSemester && selectedCategory && selectedSubject && (
        <p style={{ marginTop: "18px", color: "#fde68a", fontWeight: "700" }}>
          Upload and manage PDFs for this exact exam section.
        </p>
      )}
    </div>
  );
}

function SectionTitle({ title, description, isDark }) {
  return (
    <div style={{ marginBottom: "26px" }}>
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: "900",
          color: isDark ? "#f8fafc" : "#0f172a",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          maxWidth: "760px",
          opacity: isDark ? 0.8 : 0.95,
          lineHeight: "1.8",
          color: isDark ? "rgba(255,255,255,0.84)" : "#334155",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function StatChip({ label, value, isDark }) {
  return (
    <div
      className="glass"
      style={{
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        color: isDark ? "#f8fafc" : "#1f2937",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          opacity: isDark ? 0.68 : 0.82,
          color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "18px", fontWeight: "800", marginTop: "6px" }}>
        {value}
      </div>
    </div>
  );
}

function ResourceSection({
  title,
  description,
  items,
  emptyTitle,
  emptyText,
  progressKey,
  isAdmin,
  refresh,
  subject,
  isDark,
}) {
  return (
    <div style={{ marginTop: "38px" }}>
      <div style={{ marginBottom: "18px" }}>
        <h3
          style={{
            fontSize: "26px",
            fontWeight: "800",
            marginBottom: "8px",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            opacity: isDark ? 0.78 : 0.94,
            lineHeight: "1.7",
            color: isDark ? "rgba(255,255,255,0.82)" : "#334155",
          }}
        >
          {description}
        </p>
      </div>

      {items.length === 0 ? (
        <div
          className="glass"
          style={{
            padding: "44px",
            textAlign: "center",
            borderRadius: "20px",
            border: "1px dashed rgba(250,204,21,0.24)",
            color: isDark ? "#e5e7eb" : "#334155",
          }}
        >
          <h3 style={{ color: "#fde68a", marginBottom: "10px" }}>{emptyTitle}</h3>
          <p style={{ opacity: 0.8, maxWidth: "620px", margin: "0 auto", lineHeight: "1.7" }}>
            {emptyText}
          </p>
        </div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <LastMinuteContentCard
              key={item.id}
              item={item}
              progressKey={progressKey}
              isAdmin={isAdmin}
              refresh={refresh}
              subject={subject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LastMinuteContentCard({
  item,
  progressKey,
  isAdmin,
  refresh,
  subject,
}) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const progress = getProgress(progressKey);
  const isCompleted = progress[item.id] === true;
  const isDark = theme === "dark";

  const handleDelete = async () => {
    confirmDelete(async () => {
      await supabase.from("materials").delete().eq("id", item.id);
      refresh();
    });
  };

  const handlePreview = () => {
    if (!openSafeExternalUrl(item.file_url)) {
      Swal.fire({
        icon: "error",
        title: "Invalid file link",
        text: "This file link is not safe to open.",
      });
    }
  };

  const handleDownload = () => {
    if (!openSafeExternalUrl(item.file_url, { download: true })) {
      Swal.fire({
        icon: "error",
        title: "Invalid download link",
        text: "This file link is not safe to download.",
      });
    }
  };

  return (
    <div
      className="glass"
      style={{
        overflow: "hidden",
        borderRadius: "20px",
        border: isCompleted
          ? "2px solid #22c55e"
          : "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(15,23,42,0.16))",
        color: isDark ? "#f8fafc" : "#1f2937",
      }}
    >
      <div
        style={{
          height: "170px",
          position: "relative",
          overflow: "hidden",
          background: item.image_url
            ? "transparent"
            : "linear-gradient(145deg, rgba(250,204,21,0.18), rgba(249,115,22,0.10), rgba(15,23,42,0.18))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.unit_name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isCompleted ? 0.88 : 1,
            }}
          />
        ) : (
          <div style={{ textAlign: "center", color: "#fde68a" }}>
            <FileText size={38} />
            <div style={{ marginTop: "10px", fontWeight: "700" }}>Exam PDF</div>
          </div>
        )}

        {isCompleted && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "#22c55e",
              borderRadius: "999px",
              padding: "8px",
              display: "flex",
            }}
          >
            <Check size={16} color="white" />
          </div>
        )}
      </div>

      <div style={{ padding: "22px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "999px",
            background: item.note_type === "teacher"
              ? "rgba(250,204,21,0.14)"
              : "rgba(45,212,191,0.14)",
            color: item.note_type === "teacher" ? "#fde68a" : "#99f6e4",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          {item.note_type === "teacher" ? "Main Resource" : "Extra Resource"}
        </div>

        <h4
          style={{
            marginBottom: "10px",
            fontSize: "20px",
            lineHeight: "1.5",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}
        >
          {item.unit_name}
        </h4>

        <p
          style={{
            opacity: isDark ? 0.78 : 0.95,
            lineHeight: "1.7",
            marginBottom: "18px",
            color: isDark ? "rgba(255,255,255,0.82)" : "#334155",
          }}
        >
          PDF resource for fast exam preparation. Open it online, download it, or
          mark it after revision.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <button onClick={handlePreview} className="btn-primary btn-small">
            Preview
          </button>

          <button
            onClick={handleDownload}
            className="btn-primary btn-small"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Download size={14} />
            Download
          </button>

          <button
            onClick={() => {
              toggleUnitProgress(progressKey, item.id);
              refresh();
            }}
            style={{
              background: isCompleted ? "#22c55e" : "#facc15",
              color: isCompleted ? "white" : "#111827",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            {isCompleted ? "Revised" : "Mark Revised"}
          </button>

          <button
            onClick={() => navigate("/contact-faculty", { state: { subject } })}
            style={{
              background: "#0f766e",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Contact Faculty
          </button>

          {isAdmin && (
            <button
              onClick={handleDelete}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
