import { motion } from "framer-motion";

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
          NextGen Study Hub is a structured academic platform built to support
          Diploma Computer Science students with organized learning resources
          and intelligent academic tools.
        </p>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          The platform provides semester-wise notes, assignments, practical
          files, quizzes, and digital academic tools such as GPA calculator,
          task manager, and AI-powered assistance to simplify student workflow.
        </p>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          Our mission is to create a streamlined digital academic environment
          that enhances productivity, improves clarity, and supports structured
          preparation.
        </p>

        <p style={{ opacity: 0.85 }}>
          This website operates independently and is not officially affiliated
          with any educational institution.
        </p>
      </motion.div>
    </section>
  );
}