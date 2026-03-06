import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import CreateUnit from "../components/CreateUnit";
import UnitFeedback from "../components/UnitFeedback";
import { useAuth } from "../context/AuthContext";
import { getProgress, toggleUnitProgress } from "../utils/progressUtils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SearchFilterBar from "../components/SearchFilterBar";
import { confirmDelete } from "../utils/deleteConfirm";
import Swal from "sweetalert2";

export default function SemesterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const isAdmin = role === "owner" || role === "faculty";

  const [semesterProgress, setSemesterProgress] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  const categories = ["Notes", "Assignments", "Practicals", "Syllabus"];

  const subjects = [
    "Applied Chemistry (DCH-101)",
    "Engineering Mechanics (DME-201)",
    "Basic Electrical Engineering (DEE-201)",
    "Applied Mathematics (DMA-201)",
    "Essential Language & Communication (DGS-201)",
    "Environmental Science (DCE-201)",
  ];

  // Fetch materials
  const fetchData = async () => {
    const { data, error } = await supabase.from("materials").select("*");
    if (!error) setMaterials(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // PROGRESS CALCULATION
  useEffect(() => {
    if (!activeSubject) return;

    const subjectProgress = getProgress(activeSubject);

    const relevantUnits = materials.filter(
      (item) =>
        item.semester === id &&
        item.subject === activeSubject &&
        ["Notes", "Assignments", "Practicals"].includes(item.category),
    );

    const total = relevantUnits.length;

    if (total === 0) {
      setProgressPercent(0);
      return;
    }

    const completed = relevantUnits.filter(
      (item) => subjectProgress[item.id] === true,
    ).length;

    const percent = Math.round((completed / total) * 100);
    setProgressPercent(percent);
  }, [materials, activeSubject, id]);

  useEffect(() => {
    const allRelevantUnits = materials.filter(
      (item) =>
        item.semester === id &&
        ["Notes", "Assignments", "Practicals"].includes(item.category),
    );

    const total = allRelevantUnits.length;

    if (total === 0) {
      setSemesterProgress(0);
      return;
    }

    let completedCount = 0;

    subjects.forEach((sub) => {
      const subjectProgress = getProgress(sub);

      allRelevantUnits
        .filter((unit) => unit.subject === sub)
        .forEach((unit) => {
          if (subjectProgress[unit.id]) completedCount++;
        });
    });

    const percent = Math.round((completedCount / total) * 100);
    setSemesterProgress(percent);
  }, [materials, id]);

  return (
    <div className="section">
      <button
        className="btn-primary"
        style={{ marginBottom: "30px" }}
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <h1 style={{ marginBottom: "40px" }}>Semester {id} – Computer Science</h1>

      {/* SEMESTER OVERALL PROGRESS */}
      <div id="smester-progress" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px" }}>Semester Overall Progress</h3>

        <div
          style={{
            height: "14px",
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <motion.div
            key={semesterProgress}
            initial={{ width: 0 }}
            animate={{ width: `${semesterProgress}%` }}
            transition={{ duration: 0.7 }}
            style={{
              height: "100%",
              background:
                semesterProgress === 100
                  ? "linear-gradient(90deg,#22c55e,#16a34a)"
                  : "linear-gradient(90deg,#0ea5e9,#6366f1)",
              borderRadius: "20px",
            }}
          />
        </div>

        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          Overall Completion: {semesterProgress}%
        </p>
      </div>

      {/* CATEGORY LEVEL */}
      {!activeCategory && (
        <div className="grid">
          {categories.map((cat) => (
            <div
              key={cat}
              className="glass"
              style={{
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setActiveCategory(cat)}
            >
              <h3>{cat}</h3>
            </div>
          ))}
        </div>
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

          <h2 style={{ marginBottom: "30px" }}>{activeCategory} – Subjects</h2>

          <div className="grid">
            {subjects.map((sub) => (
              <div
                key={sub}
                className="glass"
                style={{
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => setActiveSubject(sub)}
              >
                <h3>{sub}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {/* CONTENT LEVEL */}
      {activeSubject && (
        <>
          <button
            className="btn-primary"
            style={{ marginBottom: "20px" }}
            onClick={() => setActiveSubject(null)}
          >
            ← Back to Subjects
          </button>

          <h2 style={{ marginBottom: "20px" }}>{activeSubject}</h2>

          {/* 🔍 SEARCH + FILTER BAR (ADD HERE) */}
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

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
                    Additional study materials haven't been uploaded yet. Please
                    check back later for new resources.
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
          <UnitFeedback unitId={id} isAdmin={isAdmin} />
          <div
            style={{
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
              margin: "80px 0",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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
              your academic journey smarter, faster, and more productive 📚✨ If
              you have an idea that could make this platform even better — don’t
              keep it to yourself! 💡 Drop your suggestion in the Contact
              section and help us build the ultimate study companion together 🚀
              <br />
              <br />
              What features should i add more??
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
}

/* ================= CONTENT CARD ================= */

function ContentCard({ id, title, image, file, subject, isAdmin, refresh }) {
  const navigate = useNavigate();
  const subjectProgress = getProgress(subject);
  const isCompleted = subjectProgress[id] === true;

  const handleDelete = async () => {
    confirmDelete(async () => {
      await supabase.from("materials").delete().eq("id", id);
      refresh();
    });
  };

  const handleContact = () => {
    navigate("/contact-faculty", { state: { subject } });
  };

  const handleDownload = async () => {
    await supabase
      .from("materials")
      .update({ downloads: (item.downloads || 0) + 1 })
      .eq("id", id);

    window.open(file, "_blank");
  };

  return (
    <div
      className="glass"
      style={{
        overflow: "hidden",
        border: isCompleted
          ? "2px solid #22c55e"
          : "1px solid rgba(255,255,255,0.1)",
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
            onClick={() => window.open(file, "_blank")}
            className="btn-primary btn-small"
          >
            Preview
          </button>

          <a
            href={file}
            download
            className="btn-primary btn-small"
            style={{ textDecoration: "none" }}
          >
            Download
          </a>

          <button
            onClick={() => {
              toggleUnitProgress(subject, id);
              refresh();
            }}
            style={{
              background: isCompleted ? "#22c55e" : "#facc15",
              color: isCompleted ? "white" : "black",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
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
              borderRadius: "6px",
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
                borderRadius: "6px",
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
