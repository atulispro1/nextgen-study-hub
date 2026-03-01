import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <h3 style={{ marginTop: "25px" }}>Information We Collect</h3>
        <p style={{ opacity: 0.85 }}>
          We may collect basic information such as email address (for
          authentication), uploaded academic materials, and user interactions
          within academic tools.
        </p>

        <h3 style={{ marginTop: "25px" }}>How We Use Information</h3>
        <p style={{ opacity: 0.85 }}>
          The collected information is used to provide platform functionality,
          improve user experience, maintain security, and respond to inquiries.
        </p>

        <h3 style={{ marginTop: "25px" }}>Cookies & Advertising</h3>
        <p style={{ opacity: 0.85 }}>
          This website may use cookies and third-party services, including
          Google AdSense, to display advertisements. Third-party vendors may
          use cookies to personalize ads and measure performance.
        </p>

        <h3 style={{ marginTop: "25px" }}>Data Security</h3>
        <p style={{ opacity: 0.85 }}>
          We use secure third-party services such as Supabase to manage and
          store data securely.
        </p>

        <h3 style={{ marginTop: "25px" }}>Consent</h3>
        <p style={{ opacity: 0.85 }}>
          By using this website, you consent to this Privacy Policy.
        </p>
      </motion.div>
    </section>
  );
}