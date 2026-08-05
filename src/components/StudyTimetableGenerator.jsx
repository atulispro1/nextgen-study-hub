import { useState } from "react";

export default function StudyTimetableGenerator() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [sessionLength, setSessionLength] = useState(90);
  const [breakTime, setBreakTime] = useState(15);
  const [subjects, setSubjects] = useState([{ name: "", priority: "medium" }]);
  const [timetable, setTimetable] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const addSubject = () => {
    setSubjects([...subjects, { name: "", priority: "medium" }]);
  };

  const removeSubject = (i) => {
    if (subjects.length === 1) {
      setSubjects([{ name: "", priority: "medium" }]);
      return;
    }
    setSubjects(subjects.filter((_, idx) => idx !== i));
  };

  const updateSubject = (i, field, value) => {
    const updated = [...subjects];
    updated[i][field] = value;
    setSubjects(updated);
  };

  const timeToMinutes = (t) => {
    if (!t) return NaN;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const getWeight = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

  const formatMinutes = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const generatePlan = () => {
    setError("");

    const validSubjects = subjects.filter((s) => s.name.trim());
    if (validSubjects.length === 0) {
      setError("Add at least one subject name to generate your plan.");
      return;
    }

    const start = timeToMinutes(wakeTime);
    const end = timeToMinutes(sleepTime);
    const session = Number(sessionLength);
    const brk = Number(breakTime);

    if (!Number.isFinite(session) || session <= 0) {
      setError("Enter a valid session length (in minutes).");
      return;
    }
    if (!Number.isFinite(brk) || brk < 0) {
      setError("Enter a valid break length (in minutes).");
      return;
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      setError("Wake-up time must be before sleep time.");
      return;
    }
    if (end - start < session) {
      setError(
        "Your day is shorter than one study session - reduce the session length or adjust your times.",
      );
      return;
    }

    // High-priority subjects get 3x slots, medium 2x, low 1x.
    const weighted = [];
    validSubjects.forEach((s) => {
      const w = getWeight(s.priority);
      for (let i = 0; i < w; i++) weighted.push(s.name.trim());
    });

    let current = start;
    let index = 0;
    const plan = [];
    let totalStudy = 0;

    while (current + session <= end) {
      const next = current + session;

      plan.push({
        type: "study",
        subject: weighted[index % weighted.length],
        start: minutesToTime(current),
        end: minutesToTime(next),
      });

      totalStudy += session;
      current = next;
      index++;

      // Only add a break if another full study session still fits after it,
      // and skip zero-length breaks entirely (breakTime = 0).
      if (brk > 0 && current + brk + session <= end) {
        plan.push({
          type: "break",
          start: minutesToTime(current),
          end: minutesToTime(current + brk),
        });
        current += brk;
      }
    }

    setTimetable(plan);
    setStats({
      totalStudy,
      sessions: plan.filter((i) => i.type === "study").length,
      breaks: plan.filter((i) => i.type === "break").length,
    });
  };

  return (
    <div className="glass tool-panel" style={{ maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Full Day Smart Study Planner
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
        Create your personalized daily study plan by setting your wake-up time,
        sleep time, study session duration, and subjects with priority.
        <br />
        <br />
        <b>How it works:</b> add your subjects - set priority (High = more focus)
        - choose session and break time - generate a full-day smart schedule.
      </p>

      {/* TIME SETUP */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          Daily Routine
        </h4>

        <div className="tool-row">
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

      {/* STUDY SETTINGS */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          Study Settings
        </h4>

        <div className="tool-row">
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

      {/* SUBJECTS */}
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#6366f1" }}>
          Subjects and Priority
        </h4>

        {subjects.map((s, i) => (
          <div
            key={i}
            className="subject-row"
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
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
              <option value="high">High</option>
            </select>

            <button
              onClick={() => removeSubject(i)}
              aria-label={`Remove ${s.name || "subject"}`}
              style={{
                background: "rgba(239,68,68,0.12)",
                color: "#ef4444",
                border: "none",
                padding: "0 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              X
            </button>
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

      {/* GENERATE BUTTON */}
      <button
        onClick={generatePlan}
        className="btn-primary"
        style={{ width: "100%", padding: "14px", fontSize: "16px" }}
      >
        Generate My Smart Study Plan
      </button>

      {/* ERROR */}
      {error && (
        <p
          className="fade-in"
          style={{
            marginTop: "14px",
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

      {/* OUTPUT */}

      {timetable.length > 0 && (
        <div className="fade-in" style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "15px", color: "#22c55e" }}>
            Your Full Day Plan
          </h3>

          {/* STATS */}
          {stats && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              {[
                { label: "Total Study", value: formatMinutes(stats.totalStudy) },
                { label: "Sessions", value: String(stats.sessions) },
                { label: "Breaks", value: String(stats.breaks) },
              ].map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "700",
                    background: "rgba(99,102,241,0.10)",
                    color: "var(--primary)",
                    border: "1px solid rgba(99,102,241,0.25)",
                  }}
                >
                  {chip.label}: {chip.value}
                </span>
              ))}
            </div>
          )}

          {timetable.map((item, i) => (
            <div
              key={i}
              className="fade-in"
              style={{
                padding: "14px 16px",
                marginBottom: "10px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                background:
                  item.type === "study"
                    ? "linear-gradient(135deg, rgba(99,102,241,0.14), transparent)"
                    : "linear-gradient(135deg, rgba(34,197,94,0.14), transparent)",
                border:
                  item.type === "study"
                    ? "1px solid rgba(99,102,241,0.3)"
                    : "1px solid rgba(34,197,94,0.3)",
              }}
            >
              <span
                style={{
                  minWidth: "96px",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "white",
                  background:
                    item.type === "study"
                      ? "linear-gradient(90deg,#4f46e5,#6366f1)"
                      : "linear-gradient(90deg,#16a34a,#22c55e)",
                }}
              >
                {item.start} - {item.end}
              </span>

              <span style={{ fontWeight: "600", fontSize: "15px" }}>
                {item.type === "study"
                  ? `Study ${item.subject}`
                  : "Break / Rest"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
