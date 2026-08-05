import { useState } from "react";
import SEO from "../components/SEO";
import { useLocation } from "react-router-dom";
import { normalizeTextInput, openSafeExternalUrl } from "../utils/security";
import Swal from "sweetalert2";

export default function ContactFaculty() {
  const location = useLocation();

  const facultyContacts = {
    "Applied Chemistry (DCH-101)": "919999999999",
    "Engineering Mechanics (DME-201)": "918888888888",
    "Basic Electrical Engineering (DEE-201)": "917777777777",
    "Applied Mathematics (DMA-201)": "916666666666",
    "Essential Language & Communication (DGS-201)": "915555555555",
    "Environmental Science (DCE-201)": "914444444444",
  };

  // Auto-select the subject passed via navigation state (e.g. from a semester
  // page). Read once in the initializer — the old setState-in-effect was a
  // lint violation and re-firing on every location change was unnecessary.
  const [selectedSubject, setSelectedSubject] = useState(
    () => location.state?.subject || null,
  );
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const safeStudentName = normalizeTextInput(studentName, 60);
    const safeMessage = normalizeTextInput(message, 500);

    if (!safeStudentName || !safeMessage || !selectedSubject) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete form",
        text: "Please fill all fields.",
      });
      return;
    }

    const number = facultyContacts[selectedSubject];

    if (!number) {
      Swal.fire({
        icon: "warning",
        title: "Number not found",
        text: "Faculty number not found for this subject.",
      });
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Hello Sir/Madam,

I am ${safeStudentName}.
Subject: ${selectedSubject}

Message:
${safeMessage}`,
    );

    const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;

    openSafeExternalUrl(whatsappURL);
  };

  return (
    <>
      <SEO
        title="Contact Faculty – Academic Help & Student Guidance"
        description="Contact faculty members for academic help, subject guidance and study support. Connect with teachers and mentors for diploma and engineering studies through NextGen Study Hub."
        keywords="contact faculty, student academic guidance, engineering faculty contact, academic mentor contact"
        url="https://www.atulsharmas.in/contact-faculty"
        schemaType="ContactPage"
        breadcrumbs={[
          { name: "Home", url: "https://www.atulsharmas.in" },
          { name: "Contact Faculty", url: "https://www.atulsharmas.in/contact-faculty" },
        ]}
      />

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
            Contact Faculty for Academic Guidance
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
            Connect with faculty members for academic guidance, subject
            clarifications and learning support. Students can reach out to
            mentors for help with study materials, concepts and academic
            progress.
          </p>
        </section>
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "80px 0",
          }}
        />

        <div
          style={{
            padding: "40px",
            borderRadius: "22px",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Academic Support from Faculty
          </h2>

          <p style={{ opacity: "0.85", lineHeight: "1.7" }}>
            Faculty members play an important role in helping students
            understand complex topics and improve their academic performance.
            Students can reach out to instructors for guidance on subjects,
            assignments and exam preparation.
          </p>
        </div>

        {!selectedSubject ? (
          <div className="grid">
            {Object.keys(facultyContacts).map((subject) => (
              <div
                key={subject}
                className="glass"
                style={{
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedSubject(subject)}
              >
                <h3>{subject}</h3>
                <p style={{ opacity: 0.7 }}>Click to contact faculty</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="glass"
            style={{
              maxWidth: "500px",
              margin: "auto",
              padding: "30px",
            }}
          >
            <button
              className="btn-primary"
              style={{ marginBottom: "20px" }}
              onClick={() => setSelectedSubject(null)}
            >
              ← Back
            </button>

            <h3 style={{ marginBottom: "20px" }}>
              Contact for {selectedSubject}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label>Your Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Your Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>

              <button type="submit" className="btn-primary">
                Send via WhatsApp
              </button>
            </form>
          </div>
        )}
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "80px 0",
          }}
        />
        <div
          style={{
            padding: "40px",
            borderRadius: "22px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>
            Student Mentorship & Learning Support
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: "0.85",
              lineHeight: "1.7",
            }}
          >
            Academic mentorship helps students stay motivated and focused on
            their studies. By communicating with faculty members, students can
            receive valuable insights, improve their understanding of subjects
            and build stronger academic foundations.
          </p>
        </div>
      </div>
    </>
  );
}
