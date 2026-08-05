import { useContext, useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
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
import {
  BRANCHES,
  getBranchBySlug,
  isBranchSemester,
  getBranchSubjectNames,
  getAllBranchSubjectNames,
  DEFAULT_SUBJECTS_BY_SEMESTER,
} from "../data/semesterBranches";

const categoryCards = [
  {
    id: "Important MCQs",
    title: "Important MCQs",
    icon: "🧠",
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
    icon: "⚡",
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
    icon: "🎯",
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
    icon: "🗂️",
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
    icon: "🚧",
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

const lightCategoryColors = {
  "Important MCQs": {
    border: "rgba(180, 83, 9, 0.28)",
    glow: "rgba(180, 83, 9, 0.10)",
    title: "#b45309",
    tagBg: "#fef3c7",
    tagText: "#78350f",
    bg: "linear-gradient(145deg, rgba(255,251,235,0.96), rgba(255,247,237,0.84))",
  },
  "Quick Revision Notes": {
    border: "rgba(15, 118, 110, 0.28)",
    glow: "rgba(15, 118, 110, 0.10)",
    title: "#0f766e",
    tagBg: "#ccfbf1",
    tagText: "#134e4a",
    bg: "linear-gradient(145deg, rgba(240,253,250,0.96), rgba(236,253,245,0.84))",
  },
  "Most Important Questions": {
    border: "rgba(109, 40, 217, 0.24)",
    glow: "rgba(109, 40, 217, 0.09)",
    title: "#6d28d9",
    tagBg: "#ede9fe",
    tagText: "#4c1d95",
    bg: "linear-gradient(145deg, rgba(245,243,255,0.96), rgba(250,245,255,0.84))",
  },
  "Question Banks": {
    border: "rgba(37, 99, 235, 0.24)",
    glow: "rgba(37, 99, 235, 0.09)",
    title: "#2563eb",
    tagBg: "#dbeafe",
    tagText: "#1e3a8a",
    bg: "linear-gradient(145deg, rgba(239,246,255,0.96), rgba(240,249,255,0.84))",
  },
  "More Coming Soon": {
    border: "rgba(100, 116, 139, 0.22)",
    glow: "rgba(100, 116, 139, 0.08)",
    title: "#475569",
    tagBg: "#e2e8f0",
    tagText: "#334155",
    bg: "linear-gradient(145deg, rgba(248,250,252,0.96), rgba(241,245,249,0.84))",
  },
};

const semesterCards = [
  { id: 1, icon: "🌱", desc: "Programming Fundamentals & Basics" },
  { id: 2, icon: "🧩", desc: "Core Computer Science Concepts" },
  { id: 3, icon: "🔀", desc: "Branch-wise subjects (pick your branch)" },
  { id: 4, icon: "🌐", desc: "Operating Systems & Networks" },
  { id: 5, icon: "🚀", desc: "Advanced Subjects & Projects" },
  { id: 6, icon: "🎓", desc: "Final Year Specialization" },
];

const defaultSubjectsBySemester = {
  1: DEFAULT_SUBJECTS_BY_SEMESTER[1],
  2: DEFAULT_SUBJECTS_BY_SEMESTER[2],
  // Semester 3 uses the branch-flow subjects (single source of truth).
  3: getAllBranchSubjectNames("3"),
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

// Shared data fetch: returns the resolved rows (or an empty array on error),
// so the query stays in one place for both the mount effect and refresh calls.
const fetchAllMaterials = async () => {
  const { data, error } = await supabase.from("materials").select("*");
  return { data: data || [], error };
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
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const isDark = theme === "dark";

  const isAdmin = profileReady && isAdminRole(role);

  // Semester 3 is branch-based: students pick a branch before categories.
  const isSem3BranchFlow = isBranchSemester(selectedSemester);
  const needsBranch = isSem3BranchFlow && !selectedBranch;
  const activeBranch = selectedBranch
    ? getBranchBySlug(selectedBranch)
    : null;

  const resourceKey =
    selectedSemester && selectedCategory && selectedSubject
      ? `last-minute-${selectedSemester}${isSem3BranchFlow && selectedBranch ? `-${selectedBranch}` : ""}-${selectedCategory}-${selectedSubject}`
      : "last-minute";

  const fetchMaterials = async () => {
    const { data, error } = await fetchAllMaterials();
    if (!error) {
      setMaterials(data);
    }
  };

  useEffect(() => {
    // Fetch on mount. setMaterials is only invoked after the Supabase
    // promise resolves (asynchronously), so no setState runs synchronously
    // inside this effect — satisfying react-hooks/set-state-in-effect.
    let ignore = false;
    fetchAllMaterials().then(({ data, error }) => {
      if (!ignore && !error) {
        setMaterials(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const subjectOptions = useMemo(() => {
    if (!selectedSemester) return [];

    // Branch semesters: subjects come from the selected branch's list.
    if (isSem3BranchFlow) {
      const branchSubjects =
        getBranchSubjectNames(selectedSemester, selectedBranch || "cs") || [];

      const semesterSubjects = materials
        .filter(
          (item) =>
            item.semester === selectedSemester &&
            branchSubjects.includes(item.subject),
        )
        .map((item) => item.subject)
        .filter(Boolean);

      const uniqueSubjects = [...new Set(semesterSubjects)];
      if (uniqueSubjects.length > 0) {
        return uniqueSubjects.sort((a, b) => a.localeCompare(b));
      }

      return branchSubjects;
    }

    const semesterSubjects = materials
      .filter((item) => item.semester === selectedSemester)
      .map((item) => item.subject)
      .filter(Boolean);

    const uniqueSubjects = [...new Set(semesterSubjects)];
    if (uniqueSubjects.length > 0) {
      return uniqueSubjects.sort((a, b) => a.localeCompare(b));
    }

    return defaultSubjectsBySemester[Number(selectedSemester)] || [];
  }, [materials, selectedSemester, isSem3BranchFlow, selectedBranch]);

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
    isSem3BranchFlow && activeBranch ? activeBranch.name : null,
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

    if (selectedBranch) {
      setSelectedBranch(null);
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
      <SEO
        title="Last Minute Exam Resources – MCQs, Revision Notes & Question Banks"
        description="Exam-time resources for diploma and polytechnic students: important MCQs, quick revision notes, most important questions and question banks organized by semester, branch and subject."
        keywords="last minute exam preparation, important MCQs for diploma, quick revision notes, question bank diploma, exam resources polytechnic"
        url="https://www.atulsharmas.in/last-minute-resources"
        schemaType="CollectionPage"
        breadcrumbs={[
          { name: "Home", url: "https://www.atulsharmas.in" },
          { name: "Last Minute Exam Resources", url: "https://www.atulsharmas.in/last-minute-resources" },
        ]}
      />

      <section className="section" style={{ paddingTop: "18px", paddingBottom: "70px" }}>
        <button
          className="btn-primary"
          style={{ marginBottom: "28px" }}
          onClick={handleBack}
        >
          {selectedSubject || selectedCategory || selectedBranch || (selectedSemester && !semesterParam)
            ? "<- Back"
            : semesterParam
              ? "<- Back to Semester"
              : "<- Back to Home"}
        </button>

        <LastMinuteHero
          selectedSemester={selectedSemester}
          selectedBranchName={activeBranch?.name || null}
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
              {semesterCards.map((sem) => (
                <button
                  key={sem.id}
                  type="button"
                  className="glass"
                  onClick={() => {
                    setSelectedBranch(null);
                    setSelectedCategory(null);
                    setSelectedSubject(null);
                    setSelectedSemester(String(sem.id));
                  }}
                  style={{
                    padding: "30px",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(99,102,241,0.18)",
                    background: isDark
                      ? "linear-gradient(145deg, rgba(99,102,241,0.12), rgba(14,165,233,0.08))"
                      : "linear-gradient(145deg, rgba(255,255,255,0.88), rgba(239,246,255,0.78))",
                    boxShadow: isDark
                      ? "0 12px 30px rgba(30,41,59,0.12)"
                      : "0 12px 28px rgba(15,23,42,0.07)",
                    color: isDark ? "#e5eefb" : "#1f2937",
                    transition: "all 0.3s ease",
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
                      inset: "-30% auto auto 60%",
                      width: "150px",
                      height: "150px",
                      borderRadius: "999px",
                      background:
                        isDark
                          ? "radial-gradient(circle, rgba(99,102,241,0.22), transparent 72%)"
                          : "radial-gradient(circle, rgba(99,102,241,0.10), transparent 72%)",
                      filter: "blur(4px)",
                    }}
                  />

                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "26px",
                      marginBottom: "16px",
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.75)",
                      boxShadow: isDark
                        ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                        : "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.06)",
                    }}
                  >
                    {sem.icon}
                  </div>

                  <strong
                    style={{
                      display: "block",
                      fontSize: "22px",
                      marginBottom: "10px",
                      color: isDark ? "#a5b4fc" : "#4f46e5",
                    }}
                  >
                    Semester {sem.id}
                  </strong>
                  <span style={{ opacity: 0.82, lineHeight: "1.7" }}>
                    {sem.desc}.
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {needsBranch && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={`Semester ${selectedSemester} – Choose Your Branch`}
              description="From Semester 3 onwards, every branch studies its own subjects. Pick your branch to see the correct last-minute exam resources."
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "24px" }}>
              {BRANCHES.map((branch) => (
                <button
                  key={branch.slug}
                  type="button"
                  className="glass"
                  onClick={() => setSelectedBranch(branch.slug)}
                  style={{
                    padding: "30px",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid ${branch.border}`,
                    background: isDark
                      ? `linear-gradient(145deg, ${branch.accent}26, rgba(15,23,42,0.3))`
                      : `linear-gradient(145deg, ${branch.accent}1f, rgba(255,250,244,0.9))`,
                    boxShadow: `0 18px 42px ${branch.glow}`,
                    color: isDark ? "#edf2f7" : "#1f2937",
                    transition: "all 0.3s ease",
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
                      width: "56px",
                      height: "56px",
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "18px",
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.72)",
                      boxShadow: isDark
                        ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                        : "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.06)",
                    }}
                  >
                    {branch.icon}
                  </div>

                  <h3
                    style={{
                      fontWeight: "800",
                      fontSize: "22px",
                      marginBottom: "12px",
                      color: branch.accent,
                      textShadow: isDark
                        ? `0 0 18px ${branch.glow}`
                        : "none",
                    }}
                  >
                    {branch.name}
                  </h3>

                  <p
                    style={{
                      lineHeight: "1.75",
                      opacity: "0.86",
                      marginBottom: "16px",
                    }}
                  >
                    {branch.tagline}
                  </p>

                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: branch.accent,
                    }}
                  >
                    Open branch resources →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSemester && !needsBranch && !selectedCategory && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={`Last Minute Resource Sections for Semester ${selectedSemester}`}
              description="Choose the type of exam content you want to upload or study right now."
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "24px" }}>
              {categoryCards.map((card) => {
                const colors = isDark
                  ? {
                      ...card.colors,
                      tagBg: card.colors.title,
                      tagText: "#0f172a",
                    }
                  : lightCategoryColors[card.id];

                return (
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
                      opacity: card.disabled ? 0.8 : 1,
                      border: `1px solid ${colors.border}`,
                      background: colors.bg,
                      boxShadow: `0 18px 44px ${colors.glow}`,
                      color: isDark ? "#edf2f7" : "#1f2937",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (card.disabled) return;
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
                        inset: "-30% auto auto 62%",
                        width: "160px",
                        height: "160px",
                        borderRadius: "999px",
                        background:
                          isDark
                            ? "radial-gradient(circle, rgba(255,255,255,0.12), transparent 72%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.5), transparent 72%)",
                        filter: "blur(4px)",
                      }}
                    />

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
                        color: colors.tagText,
                        background: colors.tagBg,
                      }}
                    >
                      {card.tag}
                    </span>

                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        marginBottom: "18px",
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.72)",
                        boxShadow: isDark
                          ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                          : "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.06)",
                      }}
                    >
                      {card.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: "24px",
                        marginBottom: "12px",
                        color: colors.title,
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      style={{
                        lineHeight: "1.75",
                        opacity: isDark ? 0.86 : 0.94,
                        marginBottom: "18px",
                        color: isDark ? "rgba(255,255,255,0.88)" : "#334155",
                      }}
                    >
                      {card.description}
                    </p>

                    <div style={{ color: colors.title, fontWeight: "700" }}>
                      {card.disabled ? "More sections on the way" : "Open this section →"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedSemester && !needsBranch && selectedCategory && !selectedSubject && (
          <div style={{ marginTop: "36px" }}>
            <SectionTitle
              title={`Choose a Subject for ${selectedCategory}`}
              description={
                isSem3BranchFlow && activeBranch
                  ? `Semester ${selectedSemester} • ${activeBranch.name}. Pick a subject to open its last-minute exam PDFs.`
                  : "Once you choose a subject, students will see the uploaded PDFs for that exact exam section."
              }
              isDark={isDark}
            />

            <div className="grid" style={{ gap: "22px" }}>
              {subjectOptions.map((subject) => {
                const codeMatch = subject.match(/\(([^)]+)\)\s*$/);
                const subjectCode = codeMatch ? codeMatch[1] : null;
                const subjectName = codeMatch
                  ? subject.slice(0, codeMatch.index).trim()
                  : subject;

                return (
                  <button
                    key={subject}
                    type="button"
                    className="glass"
                    onClick={() => setSelectedSubject(subject)}
                    style={{
                      padding: "26px",
                      textAlign: "left",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid rgba(99,102,241,0.18)",
                      background: isDark
                        ? "linear-gradient(145deg, rgba(15,23,42,0.16), rgba(99,102,241,0.08))"
                        : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,243,255,0.72))",
                      boxShadow: isDark
                        ? "0 14px 34px rgba(15,23,42,0.18)"
                        : "0 12px 28px rgba(15,23,42,0.07)",
                      color: isDark ? "#f8fafc" : "#1f2937",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.zIndex = "2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.zIndex = "1";
                    }}
                  >
                    {subjectCode && (
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          right: "14px",
                          background: "rgba(99,102,241,0.12)",
                          color: isDark ? "#c7d2fe" : "#4338ca",
                          padding: "5px 10px",
                          fontSize: "11px",
                          fontWeight: "800",
                          letterSpacing: "0.06em",
                          borderRadius: "999px",
                        }}
                      >
                        {subjectCode}
                      </span>
                    )}

                    <strong
                      style={{
                        display: "block",
                        fontSize: "20px",
                        lineHeight: "1.5",
                        color: isDark ? "#f8fafc" : "#1e293b",
                        paddingRight: subjectCode ? "72px" : "0",
                      }}
                    >
                      {subjectName}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedSemester && !needsBranch && selectedCategory && selectedSubject && (
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
                background: isDark
                  ? "linear-gradient(145deg, rgba(139,92,246,0.10), rgba(99,102,241,0.08), rgba(15,23,42,0.18))"
                  : "linear-gradient(145deg, rgba(245,243,255,0.9), rgba(239,246,255,0.72))",
                color: isDark ? "#e5e7eb" : "#334155",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontWeight: "800",
                  color: isDark ? "#e0e7ff" : "#6d28d9",
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
  selectedBranchName,
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
        background: isDark
          ? "linear-gradient(145deg, rgba(250,204,21,0.14), rgba(249,115,22,0.10), rgba(59,130,246,0.08))"
          : "linear-gradient(145deg, rgba(255,251,235,0.88), rgba(255,247,237,0.72), rgba(239,246,255,0.58))",
        boxShadow: isDark
          ? "0 26px 68px rgba(15,23,42,0.26), 0 0 34px rgba(250,204,21,0.12)"
          : "0 22px 56px rgba(15,23,42,0.12)",
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
            isDark
              ? "radial-gradient(circle, rgba(250,204,21,0.28), transparent 68%)"
              : "radial-gradient(circle, rgba(245,158,11,0.16), transparent 68%)",
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
          background: isDark ? "rgba(250,204,21,0.16)" : "rgba(254,243,199,0.9)",
          color: isDark ? "#fde68a" : "#92400e",
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
          background: isDark
            ? "linear-gradient(90deg, #fef3c7, #facc15, #fb923c)"
            : "linear-gradient(90deg, #92400e, #ca8a04, #ea580c)",
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
        <p
          style={{
            marginTop: "18px",
            color: isDark ? "#fde68a" : "#b45309",
            fontWeight: "700",
          }}
        >
          You are browsing Semester {selectedSemester}
          {selectedBranchName ? ` • ${selectedBranchName}` : ""}.
        </p>
      )}

      {selectedSemester && selectedCategory && selectedSubject && (
        <p
          style={{
            marginTop: "18px",
            color: isDark ? "#fde68a" : "#b45309",
            fontWeight: "700",
          }}
        >
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
          <h3
            style={{
              color: isDark ? "#fde68a" : "#b45309",
              marginBottom: "10px",
            }}
          >
            {emptyTitle}
          </h3>
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
          <div
            style={{
              textAlign: "center",
              color: isDark ? "#fde68a" : "#b45309",
            }}
          >
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
              : "rgba(139,92,246,0.16)",
            color: item.note_type === "teacher"
              ? isDark ? "#fde68a" : "#b45309"
              : isDark ? "#c4b5fd" : "#6d28d9",
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
              borderRadius: "999px",
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
              background: "#6d28d9",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "999px",
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
