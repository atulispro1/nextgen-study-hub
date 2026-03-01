import { useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function QuizSection() {
  const { role } = useAuth();
  const isAdmin = role === "owner" || role === "faculty";

  const subjects = [
    "Applied Chemistry",
    "Engineering Mechanics",
    "Basic Electrical Engineering",
  ];

  const [subject, setSubject] = useState(subjects[0]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const [newQ, setNewQ] = useState({
    subject: subjects[0],
    difficulty: "Easy",
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
  });

  // ================= FETCH QUESTIONS =================

  const fetchQuestions = async () => {
    const { data } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("subject", subject)
      .eq("difficulty", difficulty);

    const shuffled = data?.sort(() => 0.5 - Math.random());
    setQuestions(shuffled || []);
  };

  const startQuiz = async () => {
    await fetchQuestions();
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizFinished(true);
      }
    }, 600);
  };

  const progress =
    questions.length === 0
      ? 0
      : Math.round((currentIndex / questions.length) * 100);

  const addQuestion = async () => {
    if (!newQ.question) return;
    await supabase.from("quiz_questions").insert([newQ]);
    alert("Question Added Successfully");
  };

  return (
    <div style={{ marginTop: "120px" }}>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "15px",
          }}
        >
          Smart Quiz Arena
        </h2>
        <p style={{ opacity: 0.7 }}>
          Test your knowledge. Track performance. Improve daily.
        </p>
      </motion.div>

      {/* ================= ADMIN PANEL ================= */}
      {/* ================= ADMIN PANEL ================= */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass"
          style={{
            padding: "50px",
            marginBottom: "80px",
            maxWidth: "1000px",
            marginInline: "auto",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>🛠 Quiz Management Panel</h3>

          {/* TOTAL QUESTIONS */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(99,102,241,0.08)",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>Total Questions Added</h4>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#6366f1",
              }}
            >
              {questions.length}
            </div>
          </div>

          {/* ADD QUESTION FORM */}
          <div style={{ marginBottom: "50px" }}>
            <h4 style={{ marginBottom: "20px" }}>➕ Add New Question</h4>

            <div style={{ display: "grid", gap: "15px" }}>
              <textarea
                placeholder="Enter Question"
                style={{ padding: "15px", borderRadius: "10px" }}
                onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
              />

              {["option_a", "option_b", "option_c", "option_d"].map((opt) => (
                <input
                  key={opt}
                  placeholder={opt.replace("_", " ").toUpperCase()}
                  style={{ padding: "12px", borderRadius: "8px" }}
                  onChange={(e) => setNewQ({ ...newQ, [opt]: e.target.value })}
                />
              ))}

              <select
                onChange={(e) =>
                  setNewQ({ ...newQ, correct_answer: e.target.value })
                }
              >
                <option value="A">Correct Answer: A</option>
                <option value="B">Correct Answer: B</option>
                <option value="C">Correct Answer: C</option>
                <option value="D">Correct Answer: D</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={addQuestion}
              >
                Add Question
              </motion.button>
            </div>
          </div>

          {/* QUESTION LIST */}
          <div>
            <h4 style={{ marginBottom: "20px" }}>📚 Added Questions</h4>

            <div style={{ display: "grid", gap: "20px" }}>
              {questions.map((q) => (
                <motion.div
                  key={q.id}
                  whileHover={{ scale: 1.01 }}
                  style={{
                    padding: "20px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p style={{ marginBottom: "10px" }}>
                    <strong>Q:</strong> {q.question}
                  </p>

                  <p style={{ opacity: 0.7, fontSize: "14px" }}>
                    Correct: {q.correct_answer}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      await supabase
                        .from("quiz_questions")
                        .delete()
                        .eq("id", q.id);
                      fetchQuestions();
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(90deg,#dc2626,#ef4444)",
                      color: "white",
                    }}
                  >
                    🗑 Delete
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= QUIZ START ================= */}

      {!quizStarted && !quizFinished && (
        <motion.div
          className="glass"
          style={{
            padding: "60px",
            maxWidth: "700px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>Choose Subject & Difficulty</h3>

          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <select onChange={(e) => setSubject(e.target.value)}>
              {subjects.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </select>

            <select onChange={(e) => setDifficulty(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            style={{ marginTop: "40px", padding: "14px 40px" }}
            onClick={startQuiz}
          >
            Start Quiz
          </motion.button>
        </motion.div>
      )}

      {/* ================= QUIZ PLAY ================= */}

      {quizStarted && !quizFinished && questions.length > 0 && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass"
          style={{
            padding: "60px",
            maxWidth: "800px",
            marginInline: "auto",
            marginTop: "40px",
          }}
        >
          {/* Progress */}
          <div
            style={{
              height: "10px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "25px",
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              }}
            />
          </div>

          <h3 style={{ marginBottom: "30px", fontSize: "20px" }}>
            {questions[currentIndex].question}
          </h3>

          <div style={{ display: "grid", gap: "15px" }}>
            {["A", "B", "C", "D"].map((letter) => {
              const isCorrect =
                selected === letter &&
                letter === questions[currentIndex].correct_answer;

              const isWrong =
                selected === letter &&
                letter !== questions[currentIndex].correct_answer;

              return (
                <motion.button
                  key={letter}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(letter)}
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "0.3s",
                    background: isCorrect
                      ? "linear-gradient(90deg,#16a34a,#22c55e)"
                      : isWrong
                        ? "linear-gradient(90deg,#dc2626,#ef4444)"
                        : "linear-gradient(90deg,#4f46e5,#6366f1)",
                    color: "white",
                    boxShadow:
                      isCorrect || isWrong
                        ? "0 0 20px rgba(255,255,255,0.3)"
                        : "0 5px 15px rgba(0,0,0,0.2)",
                  }}
                >
                  {questions[currentIndex][`option_${letter.toLowerCase()}`]}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ================= RESULT ================= */}

      {quizFinished && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass"
          style={{
            padding: "70px",
            maxWidth: "600px",
            marginInline: "auto",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <h2>Quiz Completed 🎉</h2>

          <div
            style={{
              fontSize: "50px",
              margin: "30px 0",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {score} / {questions.length}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => {
              setQuizStarted(false);
              setQuizFinished(false);
            }}
          >
            Retake Quiz
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
