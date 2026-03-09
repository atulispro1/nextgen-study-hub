import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import CreateUnit from "../components/CreateUnit";
import UnitFeedback from "../components/UnitFeedback";
import { useAuth } from "../context/AuthContext";
import { getProgress, toggleUnitProgress } from "../utils/progressUtils";

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

        <link rel="canonical" href="https://www.atulsharmas.in/semester" />
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
            background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
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
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <h1 style={{ marginBottom: "40px" }}>
          Semester {id} – Computer Science
        </h1>

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

            <h2 style={{ marginBottom: "30px" }}>
              {activeCategory} – Subjects
            </h2>

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
