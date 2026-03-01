import { motion } from "framer-motion";

export default function Terms() {
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
            marginBottom: "30px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Terms & Conditions
        </h1>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          By accessing and using NextGen Study Hub, you agree to comply with
          the following terms:
        </p>

        <ul style={{ opacity: 0.85, lineHeight: "1.8" }}>
          <li>All materials are provided for academic purposes only.</li>
          <li>
            Users are responsible for the content they upload to the platform.
          </li>
          <li>
            Unauthorized copying, redistribution, or misuse of materials is
            prohibited.
          </li>
          <li>
            The platform reserves the right to modify or remove content when
            necessary.
          </li>
        </ul>

        <p style={{ marginTop: "20px", opacity: 0.85 }}>
          The website is provided “as is” without warranties of any kind.
        </p>
      </motion.div>
    </section>
  );
}