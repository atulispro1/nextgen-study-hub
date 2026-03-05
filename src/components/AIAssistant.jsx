import { useState } from "react";
import { motion } from "framer-motion";

export default function AIAssistant() {
  const [subject, setSubject] = useState("Applied Chemistry");
  const [type, setType] = useState("Assignment");
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
    
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
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
          <option>Applied Chemistry</option>
          <option>Engineering Mechanics</option>
          <option>Data Structures</option>
          <option>Operating Systems</option>
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
        className="btn-primary"
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? "Generating... pls wait only for max 15 seconds" : "Generate"}
      </button>

      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "rgba(99,102,241,0.05)",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </motion.div>
      )}
    </motion.div>
  );
}
