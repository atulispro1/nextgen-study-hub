import { Helmet } from "react-helmet-async";
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import CreateUnit from "../components/CreateUnit";
import UnitFeedback from "../components/UnitFeedback";
import { useAuth } from "../context/AuthContext";
import {
  buildScopeKey,
  countCompleted,
  GENERAL_BRANCH,
  isUnitCompleted,
  toggleUnitProgress,
  useProgressVersion,
} from "../utils/progressUtils";

import { Check } from "lucide-react";
import SearchFilterBar from "../components/SearchFilterBar";
import { confirmDelete } from "../utils/deleteConfirm";
import Swal from "sweetalert2";
import { isAdminRole, openSafeExternalUrl } from "../utils/security";
import { ThemeContext } from "../context/ThemeContext";
import {
  getBranchBySlug,
  getBranchSubjectNames,
  isBranchSemester,
  DEFAULT_SUBJECTS_BY_SEMESTER,
} from "../data/semesterBranches";

export default function SemesterPage() {
  const {
    id,
    branchSlug,
    category: categoryParam,
    subject: subjectParam,
  } = useParams();
  const navigate = useNavigate();
  const { role, profileReady, profileMissing, user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";

  const isBranchFlow = Boolean(branchSlug);
  const branch = isBranchFlow ? getBranchBySlug(branchSlug) : null;

  const isAdmin = profileReady && isAdminRole(role);

  // Reactively re-render whenever unit progress changes (no DB refetch needed).
  const progressVersion = useProgressVersion();

  // Progress is stored per scope: course :: branch :: semester :: category :: subject.
  // Non-branch semesters use the "general" branch key so the branch flow and
  // non-branch flow can never share completion state.
  const branchKey = isBranchFlow && branchSlug ? branchSlug : GENERAL_BRANCH;

  const [semesterProgress, setSemesterProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState(categoryParam || null);
  const [activeSubject, setActiveSubject] = useState(subjectParam || null);
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  const categories = [
  "Notes",
  "Assignments",
  "Practicals",
  "Syllabus",
  "Minor Exam Papers",
  "Major Exam Papers",
];

  const categoryCards = [...categories, "Last Minute Revision Kit"];

  const categoryDetails = {
    Notes: {
      label: "Core Learning",
      icon: "📘",
      accent: "#93c5fd",
      border: "rgba(59,130,246,0.34)",
      glow: "rgba(59,130,246,0.20)",
      background:
        "linear-gradient(145deg, rgba(59,130,246,0.16), rgba(14,165,233,0.10), rgba(15,23,42,0.10))",
      description:
        "Topic-wise notes and clean study material to build strong concepts quickly.",
      footer: "Lecture notes | Concepts | Revision",
    },
    Assignments: {
      label: "Smart Practice",
      icon: "📝",
      accent: "#d8b4fe",
      border: "rgba(139,92,246,0.34)",
      glow: "rgba(139,92,246,0.20)",
      background:
        "linear-gradient(145deg, rgba(139,92,246,0.16), rgba(168,85,247,0.10), rgba(15,23,42,0.10))",
      description:
        "Assignment PDFs to practice answers, improve speed, and stay ready for checks.",
      footer: "Tasks | Submission help | Practice",
    },
    Practicals: {
      label: "Lab Ready",
      icon: "🧪",
      accent: "#86efac",
      border: "rgba(34,197,94,0.34)",
      glow: "rgba(34,197,94,0.20)",
      background:
        "linear-gradient(145deg, rgba(34,197,94,0.16), rgba(16,185,129,0.10), rgba(15,23,42,0.10))",
      description:
        "Practical files and lab resources to help you prepare records and viva work faster.",
      footer: "Experiments | Files | Viva support",
    },
    Syllabus: {
      label: "Exam Map",
      icon: "📚",
      accent: "#e2e8f0",
      border: "rgba(148,163,184,0.32)",
      glow: "rgba(148,163,184,0.16)",
      background:
        "linear-gradient(145deg, rgba(148,163,184,0.16), rgba(100,116,139,0.10), rgba(15,23,42,0.10))",
      description:
        "The full syllabus layout so students know what to cover and what to prioritize.",
      footer: "Units | Coverage | Planning",
    },
    "Minor Exam Papers": {
      label: "Exam Focus",
      icon: "📝",
      accent: "#fde68a",
      border: "rgba(250,204,21,0.38)",
      glow: "rgba(250,204,21,0.22)",
      background:
        "linear-gradient(145deg, rgba(250,204,21,0.18), rgba(245,158,11,0.10), rgba(15,23,42,0.10))",
      description:
        "Previous and important minor exam papers to sharpen your test pattern awareness.",
      footer: "Pattern | Practice | Important",
    },
    "Major Exam Papers": {
      label: "High Priority",
      icon: "🔥",
      accent: "#fde68a",
      border: "rgba(250,204,21,0.42)",
      glow: "rgba(250,204,21,0.26)",
      background:
        "linear-gradient(145deg, rgba(250,204,21,0.20), rgba(251,146,60,0.12), rgba(15,23,42,0.10))",
      description:
        "Major exam paper resources designed for serious final preparation and scoring better.",
      footer: "Final prep | Repeated papers | Score boost",
    },
    "Last Minute Revision Kit": {
      label: "Flash Prep",
      icon: "⚡",
      accent: "#fde68a",
      border: "rgba(245,158,11,0.42)",
      glow: "rgba(249,115,22,0.24)",
      background:
        "linear-gradient(145deg, rgba(245,158,11,0.18), rgba(249,115,22,0.12), rgba(99,102,241,0.10))",
      description:
        "Quick links to last-minute revision content, important questions, and exam rescue PDFs.",
      footer: "MCQs | Quick notes | Most important",
    },
  };

  // Non-branch flow intentionally uses the shared S1 list for ALL non-branch
  // semesters (1, 2, 4, 5, 6) — this preserves the legacy behavior that used a
  // single defaultSubjects list everywhere. Do NOT switch to `[id]` here.
  const subjects = useMemo(
    () =>
      isBranchFlow
        ? getBranchSubjectNames(id, branchSlug)
        : DEFAULT_SUBJECTS_BY_SEMESTER[1],
    [id, isBranchFlow, branchSlug],
  );

  // Branch flow: redirect branch-based semesters (e.g. Semester 3) to branch selection
  useEffect(() => {
    if (isBranchSemester(id) && !branchSlug) {
      navigate(`/semester/${id}/branch`, { replace: true });
      return;
    }

    // Guard against invalid branch slugs in the URL
    if (isBranchFlow && !branch) {
      navigate(`/semester/${id}/branch`, { replace: true });
    }
  }, [id, branchSlug, isBranchFlow, branch, navigate]);

  // Branch flow: drive active category/subject from the URL
  useEffect(() => {
    if (!isBranchFlow) return;
    setActiveCategory(categoryParam || null);
    setActiveSubject(subjectParam || null);
  }, [isBranchFlow, categoryParam, subjectParam]);

  // Fetch materials
  const fetchData = async () => {
    const { data, error } = await supabase.from("materials").select("*");
    if (!error) setMaterials(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, activeCategory, activeSubject]);

  useEffect(() => {
    const allRelevantUnits = materials.filter(
      (item) =>
        item.semester === id &&
        ["Notes", "Assignments", "Practicals"].includes(item.category) &&
        (!isBranchFlow || subjects.includes(item.subject)),
    );

    const total = allRelevantUnits.length;

    if (total === 0) {
      setSemesterProgress(0);
      return;
    }

    let completedCount = 0;

    allRelevantUnits.forEach((unit) => {
      if (
        isUnitCompleted(unit.id, {
          scopeKey: buildScopeKey({
            branch: branchKey,
            semester: id,
            category: unit.category,
            subject: unit.subject,
          }),
          subject: unit.subject,
        })
      ) {
        completedCount++;
      }
    });

    const percent = Math.round((completedCount / total) * 100);
    setSemesterProgress(percent);
  }, [materials, id, subjects, isBranchFlow, branchKey, progressVersion]);

  return (
    <>
      <Helmet>
        <title>
          Diploma Engineering Semester Notes – Study Materials & Subject Notes
        </title>

        <meta
          name="description"
          content="Browse semester-wise diploma engineering notes and study materials including electrical engineering, physics, environmental science and other core subjects. Download free study resources for engineering students."
        />

        <meta
          name="keywords"
          content="
diploma engineering notes,
engineering semester notes,
semester wise engineering notes,
diploma semester study materials,
engineering subject notes,
engineering study materials,
electrical engineering notes,
environmental science engineering notes,
engineering physics notes,
diploma subject notes,
engineering academic notes,
engineering course notes,
semester study resources,
engineering study guide,
engineering exam preparation notes,
engineering revision notes,
engineering syllabus notes,
technical subject notes,
engineering learning materials,
engineering education resources,
engineering lecture notes,
engineering notes pdf,
engineering notes download,
study materials for engineering students,
engineering subject study resources,
diploma engineering study guide,
engineering notes website,
engineering study platform,
semester wise subject notes
"
        />

        <link
          rel="canonical"
          href={
            isBranchFlow
              ? `https://www.atulsharmas.in/semester/${id}/branch/${branchSlug}${categoryParam ? `/${encodeURIComponent(categoryParam)}` : ""}${subjectParam ? `/${encodeURIComponent(subjectParam)}` : ""}`
              : `https://www.atulsharmas.in/semester/${id}`
          }
        />
      </Helmet>

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
          Diploma Engineering Semester Notes & Study Materials
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
          Access organized semester-wise diploma engineering notes, study
          materials and subject resources designed to help students understand
          concepts faster and prepare effectively for exams.
        </p>
      </section>

      <div className="section">
        <button
          className="btn-primary"
          style={{ marginBottom: "30px" }}
          onClick={() =>
            isBranchFlow
              ? navigate(`/semester/${id}/branch`)
              : navigate("/")
          }
        >
          {isBranchFlow ? "← Back to Branch Selection" : "← Back to Home"}
        </button>

        <h1 style={{ marginBottom: "40px" }}>
          Semester {id} –
          {isBranchFlow && branch ? branch.name : "Computer Science"}
        </h1>

        {/* SEMESTER OVERALL PROGRESS */}
        <div id="smester-progress" style={{ marginBottom: "40px" }}>
          <h3 style={{ marginBottom: "10px" }}>Semester Overall Progress</h3>

          <div
            style={{
              height: "14px",
              width: "100%",
              background: isLightTheme
                ? "rgba(15,23,42,0.10)"
                : "rgba(255,255,255,0.12)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              className="fade-in"
              style={{
                height: "100%",
                width: `${semesterProgress}%`,
                background:
                  semesterProgress === 100
                    ? "linear-gradient(90deg,#22c55e,#16a34a)"
                    : "linear-gradient(90deg,#0ea5e9,#6366f1)",
                borderRadius: "20px",
                transition: "width 0.7s",
              }}
            ></div>
          </div>

          <p style={{ marginTop: "8px", fontSize: "14px" }}>
            Overall Completion: {semesterProgress}%
          </p>
        </div>

        {/* CATEGORY LEVEL */}
        {!activeCategory && (
          <>
          <div
            className="glass"
            style={{
              padding: "28px",
              borderRadius: "24px",
              marginBottom: "26px",
              background:
                isLightTheme
                  ? "linear-gradient(145deg, rgba(255,255,255,0.84), rgba(226,232,240,0.62))"
                  : "linear-gradient(145deg, rgba(99,102,241,0.10), rgba(14,165,233,0.06), rgba(15,23,42,0.08))",
              border: isLightTheme
                ? "1px solid rgba(99,102,241,0.16)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: "900",
                marginBottom: "10px",
                color: isLightTheme ? "var(--text-light)" : "#f8fafc",
              }}
            >
              Explore Semester {id} Resources
            </h2>
            <p style={{ maxWidth: "780px", lineHeight: "1.8", opacity: "0.82" }}>
              Choose the section you want to study from. Notes, assignments,
              practicals, and syllabus now have a cleaner exam-ready layout so
              students can move faster and stay focused.
            </p>
          </div>
          <div className="grid">
            {categoryCards.map((cat) => {
  const details = categoryDetails[cat];
  const isLastMinuteCard = cat === "Last Minute Revision Kit";
  const isImportant =
    cat === "Minor Exam Papers" || cat === "Major Exam Papers";

  // 🎨 COLOR THEMES FOR NORMAL SECTIONS
  const getStyle = () => {
    if (isLastMinuteCard)
      return {
        border: isLightTheme ? "1px solid rgba(180,83,9,0.42)" : "2px solid #f59e0b",
        background:
          isLightTheme
            ? "linear-gradient(135deg, rgba(255,247,237,0.98), rgba(254,243,199,0.78))"
            : "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(249,115,22,0.12), rgba(99,102,241,0.1))",
        boxShadow:
          isLightTheme
            ? "0 12px 28px rgba(180,83,9,0.10)"
            : "0 14px 34px rgba(249,115,22,0.24), 0 0 22px rgba(250,204,21,0.16)",
        color: isLightTheme ? "#92400e" : "#fde68a",
      };

    if (cat === "Notes")
      return {
        border: isLightTheme ? "1px solid rgba(37,99,235,0.28)" : "2px solid #3b82f6",
        background: isLightTheme
          ? "linear-gradient(135deg, rgba(239,246,255,0.98), rgba(255,255,255,0.82))"
          : "linear-gradient(135deg, rgba(59,130,246,0.15), transparent)",
        boxShadow: isLightTheme ? "0 12px 28px rgba(37,99,235,0.08)" : "0 8px 25px rgba(59,130,246,0.25)",
        color: isLightTheme ? "#1d4ed8" : "#bfdbfe",
      };

    if (cat === "Assignments")
      return {
        border: isLightTheme ? "1px solid rgba(109,40,217,0.25)" : "2px solid #8b5cf6",
        background: isLightTheme
          ? "linear-gradient(135deg, rgba(245,243,255,0.98), rgba(255,255,255,0.82))"
          : "linear-gradient(135deg, rgba(139,92,246,0.15), transparent)",
        boxShadow: isLightTheme ? "0 12px 28px rgba(109,40,217,0.08)" : "0 8px 25px rgba(139,92,246,0.25)",
        color: isLightTheme ? "#6d28d9" : "#ddd6fe",
      };

    if (cat === "Practicals")
      return {
        border: isLightTheme ? "1px solid rgba(21,128,61,0.25)" : "2px solid #22c55e",
        background: isLightTheme
          ? "linear-gradient(135deg, rgba(240,253,244,0.98), rgba(255,255,255,0.82))"
          : "linear-gradient(135deg, rgba(34,197,94,0.15), transparent)",
        boxShadow: isLightTheme ? "0 12px 28px rgba(21,128,61,0.08)" : "0 8px 25px rgba(34,197,94,0.25)",
        color: isLightTheme ? "#15803d" : "#bbf7d0",
      };

    if (cat === "Syllabus")
      return {
        border: isLightTheme ? "1px solid rgba(71,85,105,0.22)" : "2px solid #9ca3af",
        background: isLightTheme
          ? "linear-gradient(135deg, rgba(248,250,252,0.98), rgba(255,255,255,0.82))"
          : "linear-gradient(135deg, rgba(156,163,175,0.15), transparent)",
        boxShadow: isLightTheme ? "0 12px 28px rgba(71,85,105,0.07)" : "0 8px 25px rgba(156,163,175,0.25)",
        color: isLightTheme ? "#334155" : "#e5e7eb",
      };

    return {};
  };

  const normalStyle = getStyle();
  const cardAccentColor =
    normalStyle.color || (isLightTheme && isImportant ? "#92400e" : details.accent);

  return (
    <div
      key={cat}
      className="glass"
      style={{
        padding: "30px",
        textAlign: "left",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${details.border}`,
        background: details.background,
        boxShadow: `0 18px 42px ${details.glow}`,

        // ⭐ EXAM STYLE (already important)
        ...(isImportant && {
          border: "2px solid #facc15",
          background:
            isLightTheme
              ? "linear-gradient(135deg, rgba(254,252,232,0.98), rgba(255,251,235,0.84))"
              : "linear-gradient(135deg, rgba(250,204,21,0.15), rgba(251,191,36,0.1))",
          boxShadow: isLightTheme
            ? "0 12px 28px rgba(161,98,7,0.10)"
            : "0 10px 30px rgba(250,204,21,0.3)",
        }),

        // 🎨 NORMAL SECTION STYLING
        ...(!isImportant && normalStyle),

        transition: "all 0.3s ease",
      }}
      onClick={() => {
        if (isLastMinuteCard) {
          navigate(`/last-minute-resources?semester=${id}`);
          return;
        }

        if (isBranchFlow) {
          navigate(
            `/semester/${id}/branch/${branchSlug}/${encodeURIComponent(cat)}`,
          );
          return;
        }

        setActiveCategory(cat);
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
      {/* 🔥 IMPORTANT TAG ONLY FOR EXAMS */}
      {isImportant && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#facc15",
            color: "black",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: "700",
            borderRadius: "20px",
          }}
        >
          IMPORTANT
        </span>
      )}

      {isLastMinuteCard && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#f59e0b",
            color: "#111827",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: "700",
            borderRadius: "20px",
            boxShadow: "0 0 18px rgba(245,158,11,0.4)",
          }}
        >
          LAST MINUTE
        </span>
      )}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-28% auto auto 64%",
          width: "170px",
          height: "170px",
          borderRadius: "999px",
          background:
            isLightTheme
              ? "radial-gradient(circle, rgba(37,99,235,0.08), transparent 72%)"
              : "radial-gradient(circle, rgba(255,255,255,0.22), transparent 72%)",
          filter: "blur(4px)",
        }}
      />

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
          background: isLightTheme ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.08)",
          boxShadow: isLightTheme
            ? "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.06)"
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {details.icon}
      </div>

      <h3
        style={{
          fontWeight: "800",
          fontSize: "24px",
          marginBottom: "12px",
          color: cardAccentColor,
          textShadow: isLightTheme
            ? "none"
            : isLastMinuteCard
            ? "0 0 18px rgba(245,158,11,0.22)"
            : isImportant
              ? "0 0 18px rgba(250,204,21,0.22)"
              : "0 0 14px rgba(255,255,255,0.08)",
        }}
      >
        {/* ICONS */}
        {cat === "Notes" && "📘 "}
        {cat === "Assignments" && "📄 "}
        {cat === "Practicals" && "🧪 "}
        {cat === "Syllabus" && "📚 "}
        {cat === "Minor Exam Papers" && "📝 "}
        {cat === "Major Exam Papers" && "🔥 "}

        {isLastMinuteCard && "Flash "}
        {cat}
      </h3>

      <p
        style={{
          lineHeight: "1.75",
          opacity: "0.86",
          marginBottom: "18px",
          maxWidth: "320px",
        }}
      >
        {details.description}
      </p>

      <div
        style={{
          fontSize: "13px",
          fontWeight: "700",
          letterSpacing: "0.02em",
          color: cardAccentColor,
          opacity: "0.92",
        }}
      >
        {details.footer}
      </div>
    </div>
  );
})}
          </div>
          </>
        )}

        {/* SUBJECT LEVEL */}
        {activeCategory && !activeSubject && (
          <>
            <button
              className="btn-primary"
              style={{ marginBottom: "20px" }}
              onClick={() => setActiveCategory(null)}
            >
              ← Back
            </button>

            <h2 style={{ marginBottom: "30px" }}>
              {activeCategory} – Subjects
            </h2>

            <div
              className="glass"
              style={{
                padding: "24px",
                borderRadius: "22px",
                marginBottom: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  isLightTheme
                    ? "linear-gradient(145deg, rgba(255,255,255,0.84), rgba(226,232,240,0.62))"
                    : "linear-gradient(145deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06), rgba(15,23,42,0.10))",
              }}
            >
              <p style={{ lineHeight: "1.8", opacity: "0.82", maxWidth: "760px" }}>
                Select the subject you want to open for <strong>{activeCategory}</strong>.
                This layout keeps every subject easier to scan and quicker to open.
              </p>
            </div>

            <div className="grid">
              <div className="grid">
  {subjects.map((sub) => {
    // 🎨 CATEGORY BASED STYLING
    const getSubjectStyle = () => {
      if (activeCategory === "Notes")
        return {
          border: "1px solid rgba(59,130,246,0.34)",
          background:
            "linear-gradient(145deg, rgba(59,130,246,0.16), rgba(14,165,233,0.10), rgba(15,23,42,0.10))",
          boxShadow: "0 16px 34px rgba(59,130,246,0.18)",
          color: isLightTheme ? "#1d4ed8" : "#bfdbfe",
          badge: "Study Notes",
          icon: "📘",
        };

      if (activeCategory === "Assignments")
        return {
          border: "1px solid rgba(139,92,246,0.34)",
          background:
            "linear-gradient(145deg, rgba(139,92,246,0.16), rgba(168,85,247,0.10), rgba(15,23,42,0.10))",
          boxShadow: "0 16px 34px rgba(139,92,246,0.18)",
          color: isLightTheme ? "#6d28d9" : "#ddd6fe",
          badge: "Assignment Work",
          icon: "📝",
        };

      if (activeCategory === "Practicals")
        return {
          border: "1px solid rgba(34,197,94,0.34)",
          background:
            "linear-gradient(145deg, rgba(34,197,94,0.16), rgba(16,185,129,0.10), rgba(15,23,42,0.10))",
          boxShadow: "0 16px 34px rgba(34,197,94,0.18)",
          color: isLightTheme ? "#15803d" : "#bbf7d0",
          badge: "Lab Ready",
          icon: "🧪",
        };

      if (activeCategory === "Syllabus")
        return {
          border: "1px solid rgba(148,163,184,0.34)",
          background:
            "linear-gradient(145deg, rgba(148,163,184,0.16), rgba(100,116,139,0.10), rgba(15,23,42,0.10))",
          boxShadow: "0 16px 34px rgba(148,163,184,0.16)",
          color: isLightTheme ? "#334155" : "#e5e7eb",
          badge: "Course Map",
          icon: "📚",
        };

      if (
        activeCategory === "Minor Exam Papers" ||
        activeCategory === "Major Exam Papers"
      )
        return {
          border: "1px solid rgba(250,204,21,0.38)",
          background:
            "linear-gradient(145deg, rgba(250,204,21,0.18), rgba(245,158,11,0.10), rgba(15,23,42,0.10))",
          boxShadow: "0 18px 38px rgba(250,204,21,0.20)",
          color: isLightTheme ? "#92400e" : "#fde68a",
          badge: "Exam Priority",
          icon: activeCategory === "Major Exam Papers" ? "🔥" : "📝",
        };

      return {};
    };

    const style = getSubjectStyle();

    // 📊 Per-subject completion within this category — computed from the
    // correctly scoped progress so every branch / subject stays independent.
    const subjectUnits = materials.filter(
      (item) =>
        item.semester === id &&
        item.category === activeCategory &&
        item.subject === sub,
    );
    const subjectDone = countCompleted(subjectUnits, {
      scopeKey: buildScopeKey({
        branch: branchKey,
        semester: id,
        category: activeCategory,
        subject: sub,
      }),
      subject: sub,
    });
    const subjectPercent =
      subjectUnits.length > 0
        ? Math.round((subjectDone / subjectUnits.length) * 100)
        : 0;

    return (
      <div
        key={sub}
        className="glass"
        style={{
          padding: "28px",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          ...style,
        }}
        onClick={() => setActiveSubject(sub)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
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
            inset: "-32% auto auto 68%",
            width: "150px",
            height: "150px",
            borderRadius: "999px",
            background:
              isLightTheme
                ? "radial-gradient(circle, rgba(37,99,235,0.08), transparent 72%)"
                : "radial-gradient(circle, rgba(255,255,255,0.18), transparent 72%)",
            filter: "blur(4px)",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: isLightTheme ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.08)",
            color: style.color || "white",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          <span style={{ fontSize: "18px" }}>{style.icon}</span>
          {style.badge}
        </div>

        <h3
          style={{
            fontWeight: "800",
            fontSize: "22px",
            color: style.color || "white",
            lineHeight: "1.55",
            marginBottom: "14px",
          }}
        >
          {sub}
        </h3>

        <p style={{ opacity: "0.82", lineHeight: "1.75", maxWidth: "330px" }}>
          Open {activeCategory.toLowerCase()} resources for this subject and
          continue directly to the uploaded material.
        </p>

        {subjectUnits.length > 0 && (
          <div style={{ marginTop: "18px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "800",
                marginBottom: "6px",
                color: style.color || "white",
                opacity: 0.92,
              }}
            >
              <span>
                ✅ {subjectDone}/{subjectUnits.length}{" "}
                {activeCategory.toLowerCase()} done
              </span>
              <span>{subjectPercent}%</span>
            </div>
            <div
              style={{
                height: "8px",
                width: "100%",
                borderRadius: "999px",
                background: isLightTheme
                  ? "rgba(15,23,42,0.10)"
                  : "rgba(255,255,255,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${subjectPercent}%`,
                  background:
                    subjectPercent === 100
                      ? "linear-gradient(90deg,#22c55e,#16a34a)"
                      : "linear-gradient(90deg,#0ea5e9,#6366f1)",
                  borderRadius: "999px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>
            </div>
          </>
        )}

        {/* CONTENT LEVEL */}
        {activeSubject && (
          <>
            <button
              className="btn-primary"
              style={{ marginBottom: "20px" }}
              onClick={() => {
                if (isBranchFlow) {
                  navigate(
                    `/semester/${id}/branch/${branchSlug}/${encodeURIComponent(
                      activeCategory,
                    )}`,
                  );
                } else {
                  setActiveSubject(null);
                }
              }}
            >
              ← Back to Subjects
            </button>

            <h2 style={{ marginBottom: "20px" }}>{activeSubject}</h2>

            {/* 📊 SUBJECT PROGRESS */}
            {(() => {
              const subjectUnits = materials.filter(
                (item) =>
                  item.semester === id &&
                  item.category === activeCategory &&
                  item.subject === activeSubject,
              );
              const done = countCompleted(subjectUnits, {
                scopeKey: buildScopeKey({
                  branch: branchKey,
                  semester: id,
                  category: activeCategory,
                  subject: activeSubject,
                }),
                subject: activeSubject,
              });
              const pct =
                subjectUnits.length > 0
                  ? Math.round((done / subjectUnits.length) * 100)
                  : 0;

              if (subjectUnits.length === 0) return null;

              return (
                <div
                  className="glass"
                  style={{
                    padding: "16px 22px",
                    borderRadius: "16px",
                    marginBottom: "22px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "14px",
                    border:
                      pct === 100
                        ? "1px solid rgba(34,197,94,0.4)"
                        : undefined,
                  }}
                >
                  <div
                    style={{
                      fontWeight: "800",
                      fontSize: "15px",
                      color: pct === 100 ? "#22c55e" : "inherit",
                    }}
                  >
                    {pct === 100 ? "🎉 " : ""}
                    {done}/{subjectUnits.length} {activeCategory} completed
                  </div>
                  <div
                    style={{
                      flex: "1 1 160px",
                      height: "10px",
                      borderRadius: "999px",
                      background: isLightTheme
                        ? "rgba(15,23,42,0.10)"
                        : "rgba(255,255,255,0.12)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background:
                          pct === 100
                            ? "linear-gradient(90deg,#22c55e,#16a34a)"
                            : "linear-gradient(90deg,#0ea5e9,#6366f1)",
                        borderRadius: "999px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: "800",
                      fontSize: "15px",
                      color: "var(--primary)",
                    }}
                  >
                    {pct}%
                  </div>
                </div>
              );
            })()}

            {/* 🔍 SEARCH + FILTER BAR (ADD HERE) */}
            <SearchFilterBar
              search={search}
              setSearch={setSearch}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <div
              className="scroll-hint"
              style={{
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  opacity: "0.7",
                  marginBottom: "6px",
                }}
              >
                Scroll down to view all notes
              </p>

              <button
                onClick={() =>
                  window.scrollBy({ top: 400, behavior: "smooth" })
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "var(--primary)",
                }}
              >
                ↓
              </button>
            </div>

            {/* ADMIN CREATE UNIT */}
            {isAdmin && (
              <CreateUnit
                semester={id}
                subject={activeSubject}
                category={activeCategory}
                onSuccess={fetchData}
              />
            )}
            {!isAdmin && (
              <div
                className="glass"
                style={{ padding: "25px", textAlign: "center" }}
              >
                <p style={{ opacity: 0.7 }}>
                  Only faculty and admins can post Notes and Assignments.
                </p>
                {user && profileMissing && (
                  <p style={{ opacity: 0.7, marginTop: "10px", fontSize: "13px" }}>
                    Admin profile setup is incomplete. Add your role in Supabase
                    `profiles` to enable uploads.
                  </p>
                )}
              </div>
            )}

            {/* ================= TEACHER NOTES ================= */}

            <h3 style={{ marginTop: "30px" }}>📘 Teacher Notes</h3>
            <br />

            {(() => {
              const teacherNotes = materials
                .filter((item) => item.semester === id)
                .filter((item) => item.subject === activeSubject)
                .filter((item) => item.category === activeCategory)
                .filter((item) => item.note_type === "teacher")
                .filter((item) =>
                  item.unit_name.toLowerCase().includes(search.toLowerCase()),
                );

              if (teacherNotes.length === 0) {
                return (
                  <div
                    className="glass"
                    style={{
                      padding: "60px",
                      textAlign: "center",
                      marginTop: "20px",
                      border: "1px dashed rgba(99,102,241,0.3)",
                    }}
                  >
                    <h3 style={{ color: "#6366f1", marginBottom: "10px" }}>
                      📂 No Teacher Notes Available
                    </h3>

                    <p style={{ opacity: 0.8 }}>
                      Teacher notes for this subject haven't been uploaded yet.
                      Once they are available, they will appear here
                      automatically.
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid">
                  {teacherNotes.map((item) => (
                    <ContentCard
                      key={item.id}
                      id={item.id}
                      title={item.unit_name}
                      image={item.image_url}
                      file={item.file_url}
                      subject={item.subject}
                      category={item.category}
                      semester={id}
                      branchKey={branchKey}
                      isAdmin={isAdmin}
                      refresh={fetchData}
                    />
                  ))}
                </div>
              );
            })()}
            <div
              style={{
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent, #6366f1, transparent)",
                margin: "80px 0",
              }}
            />

            {/* ================= EXTRA NOTES ================= */}

            <h3 style={{ marginTop: "40px" }}>📗 Extra Notes</h3>
            <br />

            {(() => {
              const extraNotes = materials
                .filter((item) => item.semester === id)
                .filter((item) => item.subject === activeSubject)
                .filter((item) => item.category === activeCategory)
                .filter((item) => item.note_type === "extra")
                .filter((item) =>
                  item.unit_name.toLowerCase().includes(search.toLowerCase()),
                );

              if (extraNotes.length === 0) {
                return (
                  <div
                    className="glass"
                    style={{
                      padding: "60px",
                      textAlign: "center",
                      marginTop: "20px",
                      border: "1px dashed rgba(99,102,241,0.3)",
                    }}
                  >
                    <h3 style={{ color: "#6366f1", marginBottom: "10px" }}>
                      📂 No Extra Notes Available
                    </h3>

                    <p style={{ opacity: 0.8 }}>
                      Additional study materials haven't been uploaded yet.
                      Please check back later for new resources.
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid">
                  {extraNotes.map((item) => (
                    <ContentCard
                      key={item.id}
                      id={item.id}
                      title={item.unit_name}
                      image={item.image_url}
                      file={item.file_url}
                      subject={item.subject}
                      category={item.category}
                      semester={id}
                      branchKey={branchKey}
                      isAdmin={isAdmin}
                      refresh={fetchData}
                    />
                  ))}
                </div>
              );
            })()}
            <div
              className="glass"
              style={{
                marginTop: "50px",
                padding: "35px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "var(--primary)",
                }}
              >
                Explore More Study Notes
              </h3>

              <p
                style={{
                  maxWidth: "650px",
                  margin: "auto",
                  opacity: "0.85",
                  lineHeight: "1.7",
                  marginBottom: "22px",
                  fontSize: "15px",
                }}
              >
                Looking for notes from other subjects or semesters? Visit our
                complete Notes Library where you can find organized study
                materials, engineering notes, important topics, and resources
                designed to help students prepare better for exams and
                assignments.
              </p>

              <button
                className="btn-primary"
                style={{
                  padding: "12px 26px",
                  borderRadius: "40px",
                  fontSize: "15px",
                  fontWeight: "600",
                  boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
                }}
                onClick={() => navigate("/notes-library")}
              >
                📚 Explore All Notes
              </button>
            </div>

            <div
              style={{
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent, #6366f1, transparent)",
                margin: "80px 0",
              }}
            />
            <UnitFeedback unitId={id} isAdmin={isAdmin} />
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
          </>
        )}
      </div>
    </>
  );
}

/* ================= CONTENT CARD ================= */

function ContentCard({
  id,
  title,
  image,
  file,
  subject,
  category,
  semester,
  branchKey,
  isAdmin,
  refresh,
}) {
  const navigate = useNavigate();

  // Re-render this card the moment progress changes anywhere (same or other tab).
  useProgressVersion();

  const scopeKey = buildScopeKey({
    branch: branchKey,
    semester,
    category,
    subject,
  });
  const isCompleted = isUnitCompleted(id, { scopeKey, subject });

  const handleDelete = async () => {
    confirmDelete(async () => {
      await supabase.from("materials").delete().eq("id", id);
      refresh();
    });
  };

  const handleContact = () => {
    navigate("/contact-faculty", { state: { subject } });
  };

  const handlePreview = () => {
    if (!openSafeExternalUrl(file)) {
      Swal.fire({
        icon: "error",
        title: "Invalid file link",
        text: "This file link is not safe to open.",
      });
    }
  };

  const handleDownload = () => {
    if (!openSafeExternalUrl(file, { download: true })) {
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
        border: isCompleted
          ? "2px solid #22c55e"
          : "1px solid rgba(99,102,241,0.16)",
        transition: "all 0.3s ease",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: "140px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isCompleted ? 0.85 : 1,
          }}
        />

        {isCompleted && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#22c55e",
              borderRadius: "50%",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={16} color="white" />
          </div>
        )}
      </div>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h4 style={{ marginBottom: "15px" }}>{title}</h4>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handlePreview}
            className="btn-primary btn-small"
          >
            Preview
          </button>

          <button
            onClick={handleDownload}
            className="btn-primary btn-small"
            style={{ textDecoration: "none" }}
          >
            Download
          </button>

          <button
            onClick={() => {
              toggleUnitProgress(id, scopeKey, { subject });
            }}
            style={{
              background: isCompleted ? "#22c55e" : "#facc15",
              color: isCompleted ? "white" : "black",
              border: "none",
              padding: "8px 14px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {isCompleted ? "Completed ✓" : "Mark as Completed"}
          </button>

          <button
            onClick={handleContact}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "999px",
              cursor: "pointer",
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
                borderRadius: "999px",
                cursor: "pointer",
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
