import { useState } from "react";


export default function GPACalculator() {
  const [subjects, setSubjects] = useState([
    { credits: "", grade: "" },
  ]);
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState("");

  const gradePoints = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    F: 0,
  };

  // ✅ Add Subject
  const addSubject = () => {
    setSubjects([...subjects, { credits: "", grade: "" }]);
    setGpa(null);
    setError("");
  };

  // ✅ Remove a subject row
  const removeSubject = (index) => {
    if (subjects.length === 1) {
      setSubjects([{ credits: "", grade: "" }]);
      setGpa(null);
      return;
    }
    setSubjects(subjects.filter((_, i) => i !== index));
    setGpa(null);
  };

  // ✅ Calculate GPA
  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let filled = 0;

    subjects.forEach((sub) => {
      const credit = parseFloat(sub.credits);
      const point = gradePoints[sub.grade];

      if (!isNaN(credit) && point !== undefined) {
        totalCredits += credit;
        totalPoints += credit * point;
        filled++;
      }
    });

    if (filled === 0) {
      setError("Enter at least one credits value and select a grade.");
      return;
    }

    setError("");
    setGpa((totalPoints / totalCredits).toFixed(2));
  };

  // ✅ Reset Function (MUST BE INSIDE COMPONENT)
  const resetCalculator = () => {
    setSubjects([{ credits: "", grade: "" }]);
    setGpa(null);
    setError("");
  };

  return (
    <div 

      className="glass"
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
      }}
      >
    
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>
        GPA Calculator
      </h2>

      {subjects.map((sub, index) => (
        <div
          key={index}
          className="tool-row"
          style={{ marginBottom: "15px" }}
        >
          <input
            type="number"
            placeholder="Credits"
            value={sub.credits}
            onChange={(e) => {
              const newSubjects = [...subjects];
              newSubjects[index].credits = e.target.value;
              setSubjects(newSubjects);
            }}
            style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
          />

          <select
            value={sub.grade}
            onChange={(e) => {
              const newSubjects = [...subjects];
              newSubjects[index].grade = e.target.value;
              setSubjects(newSubjects);
            }}
            style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
          >
            <option value="">Select Grade</option>
            {Object.keys(gradePoints).map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </select>

          <button
            onClick={() => removeSubject(index)}
            aria-label="Remove subject"
            style={{
              border: "none",
              background: "rgba(239,68,68,0.12)",
              color: "#ef4444",
              borderRadius: "8px",
              padding: "0 12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            ✕
          </button>
        </div>
      ))}

      {/* BUTTON SECTION */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button className="btn-primary" onClick={addSubject}>
          Add Subject
        </button>

        <button className="btn-primary" onClick={calculateGPA}>
          Calculate GPA
        </button>

        <button
          onClick={resetCalculator}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Reset
        </button>
      </div>

      {error && (
        <p
          className="fade-in"
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "#ef4444",
            fontWeight: "600",
            background: "rgba(239,68,68,0.10)",
            padding: "10px 14px",
            borderRadius: "10px",
          }}
        >
          {error}
        </p>
      )}

      {gpa !== null && (
        <h3
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontSize: "28px",
            color: "#22c55e",
          }}
        >
          Your GPA: {gpa}
          <span
            style={{
              display: "block",
              fontSize: "14px",
              marginTop: "6px",
              color: "var(--muted)",
            }}
          >
            {parseFloat(gpa) >= 9
              ? "🏆 Outstanding!"
              : parseFloat(gpa) >= 7
                ? "💪 Great performance!"
                : parseFloat(gpa) >= 5
                  ? "👍 Good — keep improving."
                  : "📚 Keep working hard — you can improve."}
          </span>
        </h3>
      )}
    </div>
  );
}