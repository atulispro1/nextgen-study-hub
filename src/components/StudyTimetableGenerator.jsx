import { useState } from "react";

export default function StudyTimetableGenerator() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [sessionLength, setSessionLength] = useState(90);
  const [breakTime, setBreakTime] = useState(15);
  const [subjects, setSubjects] = useState([
    { name: "", priority: "medium" },
  ]);
  const [timetable, setTimetable] = useState([]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", priority: "medium" }]);
  };

  const updateSubject = (i, field, value) => {
    const updated = [...subjects];
    updated[i][field] = value;
    setSubjects(updated);
  };

  const timeToMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const getWeight = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

  const generatePlan = () => {
    const start = timeToMinutes(wakeTime);
    const end = timeToMinutes(sleepTime);

    let current = start;

    const weightedSubjects = [];
    subjects.forEach((s) => {
      if (!s.name) return;
      const w = getWeight(s.priority);
      for (let i = 0; i < w; i++) weightedSubjects.push(s.name);
    });

    if (weightedSubjects.length === 0) return;

    let index = 0;
    const plan = [];

    while (current + sessionLength <= end) {
      const next = current + sessionLength;

      const subject = weightedSubjects[index % weightedSubjects.length];

      plan.push({
        type: "study",
        subject,
        start: minutesToTime(current),
        end: minutesToTime(next),
      });

      current = next;
      index++;

      // break
      if (current + breakTime < end) {
        plan.push({
          type: "break",
          start: minutesToTime(current),
          end: minutesToTime(current + breakTime),
        });
        current += breakTime;
      }
    }

    setTimetable(plan);
  };

  return (
    <div className="glass" style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🧠 Full Day Smart Study Planner
      </h2>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "auto",
          opacity: "0.85",
          lineHeight: "1.6",
          marginBottom: "25px",
          fontSize: "15px",
        }}
      >
        Create your personalized daily study plan by setting your wake-up time, sleep time, study session duration, and subjects with priority.
        <br /><br />
        <b>How it works:</b>
        • Add all your subjects
        • Set priority (High = more focus 🔥)
        • Choose session & break time
        • Click generate to get a full-day smart schedule
      </p>

      {/* ⏰ TIME SETUP */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          ⏰ Daily Routine
        </h4>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", opacity: 0.7 }}>Wake Up</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", opacity: 0.7 }}>Sleep</label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>
        </div>
      </div>

      {/* 🧠 STUDY SETTINGS */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          🧠 Study Settings
        </h4>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", opacity: 0.7 }}>
              Session Time (min)
            </label>
            <input
              type="number"
              value={sessionLength}
              onChange={(e) => setSessionLength(Number(e.target.value))}
              placeholder="60 or 90"
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", opacity: 0.7 }}>
              Break Time (min)
            </label>
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              placeholder="10 or 15"
              style={{ width: "100%", padding: "10px" }}
            />
          </div>
        </div>
      </div>

      {/* 📚 SUBJECTS */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          📚 Subjects & Priority
        </h4>

        {subjects.map((s, i) => (
          <div
            className="subject-row"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              placeholder="Enter subject (e.g. Physics)"
              value={s.name}
              onChange={(e) => updateSubject(i, "name", e.target.value)}
              style={{ flex: 1, padding: "10px" }}
            />

            <select
              value={s.priority}
              onChange={(e) => updateSubject(i, "priority", e.target.value)}
              style={{ padding: "10px" }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High 🔥</option>
            </select>
          </div>
        ))}

        <button
          onClick={addSubject}
          style={{
            marginTop: "10px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Subject
        </button>
      </div>

      {/* 🚀 GENERATE BUTTON */}
      <button
        onClick={generatePlan}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontWeight: "700",
          fontSize: "16px",
          color: "white",
          background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
          boxShadow: "0 10px 25px rgba(99,102,241,0.4)",
          cursor: "pointer",
        }}
      >
        🚀 Generate My Smart Study Plan
      </button>

      {/* ================= OUTPUT ================= */}

      {timetable.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "15px", color: "#22c55e" }}>
            ✅ Your Full Day Plan
          </h3>

          {timetable.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "14px",
                marginBottom: "10px",
                borderRadius: "10px",
                background:
                  item.type === "study"
                    ? "linear-gradient(135deg, rgba(99,102,241,0.2), transparent)"
                    : "linear-gradient(135deg, rgba(34,197,94,0.2), transparent)",
                border:
                  item.type === "study"
                    ? "1px solid rgba(99,102,241,0.3)"
                    : "1px solid rgba(34,197,94,0.3)",
              }}
            >
              <strong>
                {item.start} - {item.end}
              </strong>{" "}
              →{" "}
              {item.type === "study"
                ? `📘 Study ${item.subject}`
                : "☕ Break / Rest"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}