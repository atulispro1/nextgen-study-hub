import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
          These Terms and Conditions outline the basic rules for using
          NextGen Study Hub. By accessing or using this website, you agree to
          follow these terms. If you do not agree with any part of these terms,
          you may choose not to use the platform.
        </p>

        <h3 style={{ marginTop: "25px" }}>Use of Content</h3>
        <p style={{ opacity: 0.85 }}>
          The study materials, notes, assignments, quizzes, and tools provided
          on this website are intended for educational and reference purposes.
          Students are welcome to use the content to support their learning,
          but it should not be redistributed or republished without permission.
        </p>

        <h3 style={{ marginTop: "25px" }}>User Responsibility</h3>
        <p style={{ opacity: 0.85 }}>
          Users are expected to use the platform responsibly. Any misuse of the
          platform, including uploading harmful content, attempting to disrupt
          services, or violating applicable laws, may result in restricted
          access to the website.
        </p>

        <h3 style={{ marginTop: "25px" }}>Platform Availability</h3>
        <p style={{ opacity: 0.85 }}>
          While we try to keep the platform accessible and updated, NextGen
          Study Hub may occasionally undergo updates, maintenance, or changes.
          Some features may be modified or improved over time to provide a
          better learning experience.
        </p>

        <h3 style={{ marginTop: "25px" }}>External Resources</h3>
        <p style={{ opacity: 0.85 }}>
          This website may include links to external educational resources or
          third-party platforms. We do not control those websites and cannot
          guarantee their content or privacy practices.
        </p>

        <h3 style={{ marginTop: "25px" }}>Disclaimer</h3>
        <p style={{ opacity: 0.85 }}>
          The information and materials available on this website are provided
          in good faith for learning purposes. However, NextGen Study Hub does
          not guarantee absolute accuracy or completeness of all materials, and
          the website is provided on an “as is” basis.
        </p>

        <h3 style={{ marginTop: "25px" }}>Updates to These Terms</h3>
        <p style={{ opacity: 0.85 }}>
          These Terms and Conditions may be updated occasionally as the
          platform evolves. Any updates will be reflected on this page.
        </p>

        {/* CONTACT BUTTON */}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link to="/contact">
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