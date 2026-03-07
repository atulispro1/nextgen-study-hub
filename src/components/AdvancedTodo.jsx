import { useState, useEffect } from "react";
import { Check, Trash2 } from "lucide-react";

export default function AdvancedTodo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Notes");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nextgen_tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("nextgen_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      category,
      priority,
      dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setText("");
    setDueDate("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks
    .filter((t) =>
      filter === "All"
        ? true
        : filter === "Completed"
          ? t.completed
          : !t.completed,
    )
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100,
        );

  return (
    <div
      className="glass"
      style={{
        padding: "40px",
        marginTop: "60px",
        maxWidth: "900px",
        marginInline: "auto",
      }}
    >
      <h2
        style={{
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        🧠 Smart Task Manager
      </h2>

      {/* INPUT SECTION */}

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginBottom: "35px",
        }}
      >
        <input
          placeholder="Enter a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: "10px",
          }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Notes</option>
            <option>Assignment</option>
            <option>Practical</option>
            <option>Personal</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button className="btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search tasks..."
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
          }}
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* PROGRESS BAR */}

      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            height: "10px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            className="fade-in"
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",

            }}
          />
        </div>

        <p
          style={{
            marginTop: "6px",
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          Progress: {progress}%
        </p>
      </div>

      {/* TASK LIST */}


        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            className="glass" style=
            {{
              padding: "16px 18px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft:
                task.priority === "High"
                  ? "4px solid #ef4444"
                  : task.priority === "Medium"
                    ? "4px solid #f59e0b"
                    : "4px solid #22c55e",
            }}
            >
            <div>
              <h4
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  marginBottom: "4px",
                }}
              >
                {task.text}
              </h4>

              <small style={{ opacity: 0.7 }}>
                {task.category} • Due: {task.dueDate || "No date"}
              </small>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <Check size={18} />
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#ef4444",
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
