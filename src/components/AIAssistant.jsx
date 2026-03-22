import { useState } from "react";

export default function AIAssistant() {
  const [subject, setSubject] = useState("Applied Chemistry");
  const [type, setType] = useState("Assignment");
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const subjects = [
    "Applied Chemistry",
    "Engineering Mechanics",
    "Electrical Engineering",
    "Mathematics",
    "Physics",
    "Computer Programming",
    "Data Structures",
    "Operating Systems"
  ];

  const generateContent = async () => {
    if (!topic) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://lryyihefzqpjiedtrdeg.supabase.co/functions/v1/ai-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject, type, topic }),
        },
      );

      const data = await res.json();
      setResponse(data.output || "No response generated.");
    } catch (err) {
      console.error(err);
      setResponse("Error generating content.");
    }

    setLoading(false);
  };

  return (

    <div

      className="glass"
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        NextGen AI Academic Assistant
      </h2>

      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          {subjects.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option>Assignment</option>
          <option>Viva Questions</option>
          <option>Short Notes</option>
          <option>Explanation</option>
        </select>
      </div>

      <textarea
        placeholder="Enter Topic (e.g., Normalization in DBMS)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          minHeight: "100px",
        }}
      />

      <button
        className="btn-primary ai-btn"
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="btn-loader"></span>
            Generating... please wait
          </>
        ) : (
          "Generate"
        )}
      </button>

      {response && (
        <div className="fade-in"

          style={{
            marginTop: "40px",
            padding: "20px",
            background: "rgba(99,102,241,0.05)",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >

          {response}
        </div>
      )}
    </div>
  );
}
