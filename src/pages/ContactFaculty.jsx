import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");

  // SAFE subject auto-select
  useEffect(() => {
    if (location?.state?.subject) {
      setSelectedSubject(location.state.subject);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName || !message || !selectedSubject) {
      alert("Please fill all fields");
      return;
    }

    const number = facultyContacts[selectedSubject];

    if (!number) {
      alert("Faculty number not found");
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Hello Sir/Madam,

I am ${studentName}.
Subject: ${selectedSubject}

Message:
${message}`
    );

    const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="section">
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Contact Faculty
      </h1>

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
    </div>
  );
}