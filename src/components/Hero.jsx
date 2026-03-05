import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="section"
      style={{
        position: "relative",
        textAlign: "center",
        overflow: "hidden",
        paddingTop: "140px",
        paddingBottom: "140px",
      }}
    >
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          top: "-250px",
          left: "-250px",
          opacity: 0.25,
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          bottom: "-250px",
          right: "-250px",
          opacity: 0.25,
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      {/* Loop Moving Text */}
      <div className="loop-container" style={{ marginBottom: "25px" }}>
        <div className="loop-track">
          <span style={{ marginRight: "60px", fontWeight: "600" }}>
            🚀 Smart Learning Platform
          </span>
          <span style={{ marginRight: "60px", fontWeight: "600" }}>
            📚 Organized Academic Resources
          </span>
          <span style={{ marginRight: "60px", fontWeight: "600" }}>
            🎯 Track Progress Easily
          </span>
        </div>
      </div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "72px",
          fontWeight: "900",
          marginBottom: "20px",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        NextGen Study Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: "22px",
          maxWidth: "750px",
          margin: "auto",
          opacity: 0.85,
        }}
      >
        A premium academic SaaS platform designed exclusively for Diploma
        Computer Science students — organized content, intelligent tracking,
        and powerful student tools.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "50px",
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          style={{ padding: "16px 32px", fontSize: "17px" }}
          onClick={() => navigate("/semester/2")}
        >
          🚀 Get Started
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/student-tools")}
          style={{
            padding: "16px 32px",
            borderRadius: "12px",
            border: "1px solid #6366f1",
            background: "transparent",
            color: "#6366f1",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ✨ Explore AI Tools
        </motion.button>
      </motion.div>

      {/* FOUNDERS SECTION BIG HIGHLIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{ marginTop: "80px" }}
      >
        <h3 style={{ marginBottom: "20px", opacity: 0.7 }}>
          Founded By
        </h3>

        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            fontSize: "40px",
            fontWeight: "900",
            background:
              "linear-gradient(270deg,#6366f1,#8b5cf6,#22c55e,#6366f1)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          Atul Sharma & Sonal Kumar
        </motion.div>
      </motion.div>
    </section>
  );
}