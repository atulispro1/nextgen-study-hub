import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactOwner() {
  const whatsappNumber = "917060160754"; // 🔁 Replace with your real number
  const gmailAddress = "atul.sharmas2806@gmail.com"; // replace with your real gmail

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Feature Request",
    rating: 5,
    message: "",
  });

  const handleSubmit = () => {
    const text = `
📩 New Suggestion / Feedback

👤 Name: ${form.name}
📧 Email: ${form.email}
📌 Type: ${form.type}
⭐ Rating: ${form.rating}/5

📝 Message:
${form.message}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  const handleEmailSubmit = () => {
    const subject = "NextGen Study Hub Feedback / Suggestion";

    const body = `
Name: ${form.name}
Email: ${form.email}
Type: ${form.type}
Rating: ${form.rating}/5

Message:
${form.message}
`;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, "_blank");
  };

  return (
    <div className="section">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Contact Website Owner
        </h1>
        <p style={{ opacity: 0.7, marginTop: "15px" }}>
          Got an idea? Found a bug? Want a new feature? Let’s build this
          platform better together 🚀
        </p>
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass"
        style={{
          padding: "60px",
          maxWidth: "900px",
          margin: "auto",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <div style={{ display: "grid", gap: "20px" }}>
          <input
            placeholder="Your Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: "15px", borderRadius: "10px" }}
          />

          <input
            placeholder="Your Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ padding: "15px", borderRadius: "10px" }}
          />

          <select
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <option>Feature Request</option>
            <option>Bug Report</option>
            <option>UI Improvement</option>
            <option>New Tool Suggestion</option>
            <option>General Feedback</option>
          </select>

          <div>
            <label style={{ marginBottom: "10px", display: "block" }}>
              Rate the Platform ⭐
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              style={{ width: "100%" }}
            />
            <div style={{ textAlign: "right", opacity: 0.7 }}>
              {form.rating} / 5
            </div>
          </div>

          <textarea
            rows="5"
            placeholder="Write your suggestion or feedback here..."
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{
              padding: "15px",
              borderRadius: "12px",
              resize: "none",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            style={{
              padding: "15px",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(90deg,#16a34a,#22c55e)",
              boxShadow: "0 10px 25px rgba(34,197,94,0.3)",
            }}
          >
            💬 Send via WhatsApp
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmailSubmit}
            style={{
              padding: "15px",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(90deg,#ea4335,#db4437)",
              boxShadow: "0 10px 25px rgba(234,67,53,0.3)",
            }}
          >
            📧 Send via Gmail
          </motion.button>
        </div>
      </motion.div>

      {/* FOOTER NOTE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: "center",
          marginTop: "50px",
          opacity: 0.6,
        }}
      >
        Your feedback directly shapes the future of NextGen Study Hub 💙
      </motion.p>
    </div>
  );
}
