import { useState } from "react";
import { canSubmitWithCooldown, normalizeTextInput } from "../utils/security";

export default function AIQuestionSolver() {
  const [subject, setSubject] = useState("Mathematics");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState("Detailed Explanation");
  const [loading, setLoading] = useState(false);

  const subjects = [
    "Applied Chemistry",
    "Engineering Mechanics",
    "Electrical Engineering",
    "Mathematics",
    "Physics",
    "Computer Programming",
    "Data Structures",
    "Operating Systems",
  ];

  const generateAnswer = async () => {
    const safeQuestion = normalizeTextInput(question, 500);
    if (!safeQuestion) return;
    if (!canSubmitWithCooldown("ai_question_cooldown", 8000)) {
      setAnswer("Please wait a few seconds before asking another question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(
        "https://lryyihefzqpjiedtrdeg.supabase.co/functions/v1/ai-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            type: "question-answer",
            topic: `${mode}: ${safeQuestion}`,
          }),
        }
      );

      const data = await res.json();
      setAnswer(data.output || "No answer generated.");
    } catch (err) {
      console.error(err);
      setAnswer("Error generating answer.");
    }

    setLoading(false);
  };

  const simplifyAnswer = async () => {
    const safeAnswer = normalizeTextInput(answer, 1200);
    if (!safeAnswer) return;
    if (!canSubmitWithCooldown("ai_simplify_cooldown", 8000)) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://lryyihefzqpjiedtrdeg.supabase.co/functions/v1/ai-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            type: "simplify",
            topic: safeAnswer,
          }),
        }
      );

      const data = await res.json();
      setAnswer(data.output || answer);
    } catch (err) {
      console.error(err);
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
        🤖 AI Question Solver
      </h2>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          {subjects.map((sub, i) => (
            <option key={i}>{sub}</option>
          ))}
        </select>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option>Short Answer</option>
          <option>Detailed Explanation</option>
          <option>Step-by-Step Solution</option>
        </select>
      </div>

      {/* INPUT */}
      <textarea
        placeholder="Enter your question (e.g., What is Ohm’s Law?)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "20px",
          minHeight: "120px",
        }}
      />

      {/* BUTTON */}
      <button
        className="btn-primary ai-btn"
        onClick={generateAnswer}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? (
          <>
            <span className="btn-loader"></span>
            Thinking...
          </>
        ) : (
          "Get Answer"
        )}
      </button>

      {/* RESPONSE */}
      {answer && (
        <div
          className="fade-in"
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            background: "rgba(99,102,241,0.05)",
            whiteSpace: "pre-wrap",
          }}
        >
          {answer}

          {/* ACTION BUTTONS */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              className="btn-primary btn-small"
              onClick={simplifyAnswer}
            >
              Explain Simpler
            </button>

            <button
              className="btn-small"
              onClick={() => navigator.clipboard.writeText(answer)}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
