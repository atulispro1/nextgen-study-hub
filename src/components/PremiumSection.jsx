import { motion } from "framer-motion";

export default function PremiumSection() {
  return (
    <section
      style={{
        padding: "100px 8%",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "white",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Premium Learning Resources
      </motion.h2>

      <p style={{ maxWidth: "700px", margin: "20px auto", opacity: 0.9 }}>
        Unlock advanced practice sets, case studies, PPT templates and
        project reports designed for high performance.
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "14px 28px",
          borderRadius: "10px",
          border: "none",
          background: "white",
          color: "#6366f1",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Explore Premium
      </button>
    </section>
  );
}