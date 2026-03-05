import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass"
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "50px",
          textAlign: "left",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          About NextGen Study Hub
        </h1>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          NextGen Study Hub is a student-focused learning platform created to
          help Diploma Computer Science students access study resources in a
          more organized and practical way. Many students often struggle to
          find proper notes, assignments, and useful practice material in one
          place, so this platform was built to simplify that process.
        </p>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          The website provides semester-wise study materials, practice quizzes,
          assignments, and academic tools designed specifically for technical
          diploma students. Instead of searching across multiple websites or
          random PDFs, learners can explore structured content based on their
          subjects and semester requirements.
        </p>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          NextGen Study Hub also includes modern learning utilities such as an
          AI academic assistant, automated quiz practice, and other productivity
          tools that make studying a little easier. These tools help students
          revise concepts quickly and practice topics without wasting time
          looking for resources.
        </p>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          The goal of this project is simple — create a clean and useful digital
          space where students can learn, practice, and prepare for exams more
          efficiently. In the future, additional sections like internships,
          courses, and job opportunities will also be added to support students
          in their academic and career journey.
        </p>

        <p style={{ opacity: 0.85 }}>
          This website is an independent educational project and is not
          officially affiliated with any university, college, or government
          institution. All materials are shared only for learning and reference
          purposes.
        </p>

        {/* CONTACT BUTTON */}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link to="/contact-owner">
            <button
              className="btn-primary"
              style={{
                padding: "12px 28px",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}