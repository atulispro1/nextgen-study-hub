import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { normalizeTextInput, openSafeExternalUrl } from "../utils/security";


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
    <>
      <Helmet>
        <title>
          Contact NextGen Study Hub – Support, Feedback & Suggestions
        </title>

        <meta
          name="description"
          content="Contact NextGen Study Hub for feedback, suggestions, support or collaboration. Share your ideas, report issues or help improve the platform for engineering and diploma students."
        />

        <meta
          name="keywords"
          content="
contact nextgen study hub,
contact student study platform,
nextgen study hub contact,
student platform support,
education platform contact,
student website support,
engineering student support contact,
contact study hub owner,
website feedback form,
student platform feedback,
education website support,
student academic platform contact,
technical support nextgen study hub,
report issue study platform,
student website contact form,
contact education platform,
student website help,
engineering learning platform contact,
study hub support page,
student platform help center
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/contact-owner" />
      </Helmet>

      <div className="section">
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
            Contact NextGen Study Hub
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "auto",
              fontSize: "clamp(15px,2vw,18px)",
              opacity: "0.85",
              lineHeight: "1.8",
            }}
          >
            Have feedback, suggestions or ideas to improve the platform? Reach
            out to the creator of NextGen Study Hub and help make the learning
            experience better for students.
          </p>
        </section>

        <div
          className="glass"
          style={{
            padding: "40px",
            borderRadius: "22px",
            marginBottom: "60px",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Share Your Feedback
          </h2>

          <p style={{ opacity: "0.85", lineHeight: "1.7" }}>
            Your suggestions help improve NextGen Study Hub. If you have ideas
            for new features, tools or improvements, feel free to send a
            message. Every suggestion helps make the platform more useful for
            students.
          </p>
        </div>

        {/* FORM */}
        <div 

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

            <button

             
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
            </button>
            <button
             
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
            </button>
          </div>
        </div>
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
            padding: "40px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Need Help or Support?
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.7",
            }}
          >
            If you encounter any issues while using the platform or have
            questions regarding study tools, notes or features, feel free to
            reach out. Support requests are reviewed regularly to ensure a
            smooth experience for all users.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <p

          style={{
            textAlign: "center",
            marginTop: "50px",
            opacity: 0.6,
          }}
        >
          Your feedback directly shapes the future of NextGen Study Hub 💙
        </p>
      </div>
    </>
  );
}
