import SEO from "./SEO";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import CommentsSection from "../components/CommentsSection";
import { confirmDelete } from "../utils/deleteConfirm";
import { useNavigate } from "react-router-dom";
import { isAdminRole, openSafeExternalUrl } from "../utils/security";

export default function NotesLibrary() {
  const navigate = useNavigate();
  const { role, profileReady } = useAuth() || {};
  const isAdmin = profileReady && isAdminRole(role);

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [visibleNotes, setVisibleNotes] = useState(9);


  const [semester, setSemester] = useState("All");
  const [category, setCategory] = useState("All");
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setVisibleNotes(9);
  }, [search, semester, category, subject]);



  const fetchNotes = async () => {
    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    setNotes(data || []);
  };

  const deleteNote = async (id) => {
    confirmDelete(async () => {
      await supabase.from("materials").delete().eq("id", id);
      fetchNotes();
    });
  };

  const handlePreview = (fileUrl) => {
    if (!openSafeExternalUrl(fileUrl)) {
      alert("This file link is not safe to open.");
    }
  };

  const handleDownload = (fileUrl) => {
    if (!openSafeExternalUrl(fileUrl, { download: true })) {
      alert("This file link is not safe to download.");
    }
  };

  const filtered = notes.filter((note) => {
    const searchMatch =
      (note.title || note.unit_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.subject?.toLowerCase().includes(search.toLowerCase());

    const semMatch = semester === "All" || note.semester === semester;

    const catMatch =
      category === "All" ||
      note.category?.toLowerCase().includes(category.toLowerCase()) ||
      note.note_type?.toLowerCase().includes(category.toLowerCase());

    const subMatch =
      subject === "All" ||
      note.subject?.toLowerCase().includes(subject.toLowerCase());

    return searchMatch && semMatch && catMatch && subMatch;
  });



  const subjects = ["All", ...new Set(notes.map((n) => n.subject))];
  <select value={subject} onChange={(e) => setSubject(e.target.value)}>
    {subjects.map((sub, index) => (
      <option key={index} value={sub}>
        {sub}
      </option>
    ))}
  </select>;
  const seoPages = [
    { slug: "dbms-notes", title: "DBMS Notes" },
    { slug: "c-programming-notes", title: "C Programming Notes" },
    { slug: "computer-network-notes", title: "Computer Network Notes" },
    { slug: "operating-system-notes", title: "Operating System Notes" },
    { slug: "data-structure-notes", title: "Data Structure Notes" },
    { slug: "java-programming-notes", title: "Java Programming Notes" },
    { slug: "python-programming-notes", title: "Python Programming Notes" },
    { slug: "software-engineering-notes", title: "Software Engineering Notes" },
    {
      slug: "computer-organization-notes",
      title: "Computer Organization Notes",
    },
    { slug: "oop-notes", title: "OOP Notes" },

    { slug: "dbms-mcq", title: "DBMS MCQ Questions" },
    { slug: "c-programming-mcq", title: "C Programming MCQ Questions" },
    { slug: "data-structure-mcq", title: "Data Structure MCQ Questions" },
    { slug: "java-mcq", title: "Java MCQ Questions" },
    { slug: "computer-network-mcq", title: "Computer Network MCQ Questions" },
    { slug: "operating-system-mcq", title: "Operating System MCQ Questions" },

    { slug: "dbms-interview-questions", title: "DBMS Interview Questions" },
    {
      slug: "c-programming-interview-questions",
      title: "C Programming Interview Questions",
    },
    { slug: "java-interview-questions", title: "Java Interview Questions" },
    {
      slug: "data-structure-interview-questions",
      title: "Data Structure Interview Questions",
    },

    { slug: "learn-c-programming", title: "Learn C Programming" },
    { slug: "learn-java-programming", title: "Learn Java Programming" },
    { slug: "learn-python-programming", title: "Learn Python Programming" },

    { slug: "diploma-computer-science-guide", title: "Diploma CS Study Guide" },
    {
      slug: "how-to-study-engineering-effectively",
      title: "Engineering Study Guide",
    },
    {
      slug: "engineering-exam-preparation-guide",
      title: "Engineering Exam Preparation Guide",
    },
  ];

  return (
    <>
      <SEO
        title="Engineering Notes Library – Diploma Study Materials & Semester Notes"
        url="https://www.atulsharmas.in/notes-library"
      />
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

        <link rel="canonical" href="https://www.atulsharmas.in/notes-library" />
      </Helmet>

      <section className="section">
        <section
          className="glass"
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
            Engineering Notes Library – Diploma Study Materials & Subject Notes
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
            Browse organized engineering study notes and diploma semester
            materials designed to help students understand subjects clearly,
            revise concepts quickly and prepare effectively for exams.
          </p>
        </section>

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "60px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, transparent, #6366f1)",
              }}
            />

            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.2rem)",
                  fontWeight: "800",
                  color: "var(--primary)",
                  marginBottom: "10px",
                }}
              >
                Explore Subject Notes
              </h2>

              <p
                style={{
                  opacity: "0.75",
                  maxWidth: "650px",
                  margin: "auto",
                }}
              >
                Access carefully organized notes covering important engineering
                subjects and semester topics.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, #6366f1, transparent)",
              }}
            />
          </div>
        </div>
        {/* SEARCH */}

        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder="Search notes, subjects or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(99,102,241,0.3)",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
            }}
          />
        </div>

        {/* FILTERS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          <select
            onChange={(e) => setSemester(e.target.value)}
            className="glass"
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option>All Semestor</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="glass"
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">All Categories</option>
            <option value="Syllabus">Syllabus</option>
            <option value="Notes">Notes</option>
            <option value="Practicals">Practical</option>
            <option value="Assignment">Assignment</option>

            {/* NEW OPTIONS 🔥 */}
            <option value="Minor Exam Papers">Minor Exam</option>
            <option value="Major Exam Papers">Major Exam</option>
          </select>

          <select
            onChange={(e) => setSubject(e.target.value)}
            className="glass"
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">All Subjects</option>
            <option value="Applied Chemistry">Applied Chemistry</option>
            <option value="Engineering Mechanics">Engineering Mechanics</option>
            <option value="Basic Electrical Engineering">
              Basic Electrical Engineering
            </option>
            <option value="Applied Mathematics">Applied Mathematics</option>
            <option value="Essential Language & Communication">
              Essential Language & Communication
            </option>
            <option value="Environmental Science">Environmental Science</option>
          </select>
        </div>
        <div
          style={{
            height: "2px",
            width: "100%",
            margin: "60px 0",
            background:
              "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #6366f1, transparent)",
            borderRadius: "10px",
          }}
        />

        <div
          className="glass"
          style={{
            padding: "20px",
            textAlign: "center",
            margin: "70px 0 40px 0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: "700",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📂 All Study Materials
          </h2>

          <p style={{ opacity: 0.7, marginTop: "6px", fontSize: "14px" }}>
            Share your thoughts about these notes and help other students.
          </p>
        </div>

        {/* NOTES GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {filtered.slice(0, visibleNotes).map((note) => (
            <div
              key={note.id}
              className="glass"
              style={{
                overflow: "hidden",
                borderRadius: "14px",
                transition: "all 0.25s ease",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* IMAGE */}

              <div
                style={{
                  height: "150px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={note.image_url}
                  alt={note.title || note.unit_name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* CONTENT */}

              <div style={{ padding: "20px", textAlign: "center" }}>
                <h4 style={{ marginBottom: "10px" }}>
                  {note.title || note.unit_name}
                </h4>

                <p style={{ fontSize: "13px", opacity: 0.7 }}>
                  Semester {note.semester} • {note.subject}
                </p>

                <p style={{ fontSize: "13px", marginTop: "5px" }}>
                  {note.category} • {note.note_type}
                </p>

                {/* BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => handlePreview(note.file_url)}
                    className="btn-primary btn-small"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => handleDownload(note.file_url)}
                    className="btn-primary btn-small"
                    style={{ textDecoration: "none" }}
                  >
                    Download
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => deleteNote(note.id)}
                      style={{
                        background: "crimson",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
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
          ))}
        </div>

        {/* PAGINATION ADDED HERE */}

        {visibleNotes < filtered.length && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              className="btn-primary"
              onClick={() => setVisibleNotes((prev) => prev + 9)}
            >
              Load More ⬇️
            </button>
          </div>
        )}


        {/* DIVIDER */}

        <div
          style={{
            height: "2px",
            width: "100%",
            margin: "60px 0",
            background:
              "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #6366f1, transparent)",
            borderRadius: "10px",
          }}
        />

        <CommentsSection />

        <div
          style={{
            height: "2px",
            width: "100%",
            margin: "60px 0",
            background:
              "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #6366f1, transparent)",
            borderRadius: "10px",
          }}
        />
        <div
          style={{
            padding: "40px",
            borderRadius: "22px",
            marginTop: "80px",
            textAlign: "center",
          }}
        >
          <div
            className="glass"
            style={{
              marginTop: "70px",
              padding: "45px",
              borderRadius: "22px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontWeight: "800",
                color: "var(--primary)",
                marginBottom: "15px",
              }}
            >
              Free Student Productivity Tools
            </h2>

            <p
              style={{
                maxWidth: "720px",
                margin: "auto",
                opacity: "0.85",
                lineHeight: "1.8",
                marginBottom: "25px",
              }}
            >
              Use helpful academic tools like CGPA calculators, percentage
              converters, GPA calculators and Pomodoro study timers designed to
              help students study smarter and manage their academic performance
              efficiently.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/student-tools")}
            >
              Explore Student Tools →
            </button>
          </div>
          <section style={{ marginTop: "100px" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem,4vw,2.5rem)",
                  fontWeight: "800",
                  color: "var(--primary)",
                  marginBottom: "15px",
                }}
              >
                Engineering Notes, MCQ Questions & Programming Study Resources
              </h2>

              <p
                style={{
                  maxWidth: "780px",
                  margin: "auto",
                  lineHeight: "1.8",
                  opacity: "0.85",
                  fontSize: "16px",
                }}
              >
                Explore a comprehensive collection of diploma and engineering
                study materials including programming notes, computer science
                subjects, MCQ practice questions, interview preparation guides
                and beginner programming tutorials. These resources are designed
                to help students understand concepts faster and prepare
                effectively for semester exams and technical interviews.
              </p>
            </div>
            <div className="grid">
              {seoPages.map((page, index) => (
                <div
                  key={index}
                  className="glass"
                  style={{ padding: "25px", textAlign: "center" }}
                >
                  <h3 style={{ marginBottom: "10px" }}>{page.title}</h3>

                  <p style={{ opacity: 0.7 }}>
                    Explore complete study materials, guides and resources
                    related to {page.title}.
                  </p>

                  <button
                    className="btn-primary"
                    style={{ marginTop: "15px" }}
                    onClick={() => navigate(`/${page.slug}`)}
                  >
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div
            style={{
              height: "2px",
              width: "100%",
              margin: "60px 0",
              background:
                "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #6366f1, transparent)",
              borderRadius: "10px",
            }}
          />

          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Why Study Notes Help Students Learn Faster
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.7",
            }}
          >
            Well-organized study notes help students revise topics quickly and
            focus on key concepts before exams. Structured notes make learning
            easier by summarizing important ideas, formulas and definitions that
            students need for academic success.
          </p>
        </div>

        <div
          className="glass"
          style={{
            maxWidth: "800px",
            margin: "80px auto",
            padding: "50px 40px",
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          {/* TITLE */}

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#6366f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            🚀 More Powerful Features Coming Soon...
          </h2>

          {/* DESCRIPTION */}

          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              opacity: 0.8,
              maxWidth: "650px",
              margin: "auto",
            }}
          >
            We're continuously improving the Student Tools section to make your
            academic journey smarter, faster, and more productive 📚✨ If you
            have an idea that could make this platform even better — don't keep
            it to yourself! 💡 Share your suggestion through the contact section
            and help us build the ultimate study companion together 🚀
          </p>

          {/* QUESTION */}

          <p
            style={{
              marginTop: "25px",
              fontSize: "15px",
              opacity: 0.8,
            }}
          >
            What features would you like to see next?
          </p>

          {/* BUTTON */}

          <button
            className="btn-primary"
            style={{
              marginTop: "25px",
              padding: "14px 28px",
              fontSize: "15px",
              borderRadius: "30px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/contact-owner")}
          >
            💬 Send Your Suggestion
          </button>
        </div>
      </section>
    </>
  );
}
