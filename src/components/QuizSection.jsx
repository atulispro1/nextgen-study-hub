import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  canSubmitWithCooldown,
  friendlyAiError,
} from "../utils/security";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const LETTERS = ["A", "B", "C", "D"];

// The arena ends after this many rounds of 5 questions so the quiz stays
// finite and API usage stays predictable.
const MAX_ROUNDS = 5;

// The AI sometimes returns "b", "Option B", "option_b" — normalize to "B".
const normalizeAnswer = (ans) => {
  if (!ans) return "";
  const s = String(ans).trim().toUpperCase();
  const match = s.match(/^OPTION_?([ABCD])$/) || s.match(/^([ABCD])\.?$/);
  if (match) return match[1];
  return s.charAt(0);
};

// Strip ```json fences and safely parse the model's JSON array, then shape
// each question into { question, options[4], correct }.
const parseQuizQuestions = (output) => {
  let text = String(output || "").trim();

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) text = fenced[1];

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return [];

  try {
    const parsed = JSON.parse(text.slice(start, end + 1));
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (q) =>
          q &&
          typeof q.question === "string" &&
          q.question.trim() &&
          (q.option_a || q.option_b || q.option_c || q.option_d),
      )
      .map((q) => ({
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c, q.option_d].map((o) =>
          String(o ?? ""),
        ),
        correct: normalizeAnswer(q.correct_answer),
      }))
      .filter((q) => q.options.some(Boolean) && LETTERS.includes(q.correct));
  } catch {
    return [];
  }
};

export default function QuizSection() {
  const subjects = [
    "🧪 Applied Chemistry",
    "⚙️ Engineering Mechanics",
    "⚡ Basic Electrical Engineering",
    "📐 Mathematics",
    "🔬 Physics",
    "💻 Computer Programming",
  ];

  const [subject, setSubject] = useState(subjects[0]);
  const [difficulty, setDifficulty] = useState("Easy");

  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Tracks the pending "next question" timeout so it can be cleared on
  // unmount and when the user answers again quickly.
  const answerTimeoutRef = useRef(null);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [round, setRound] = useState(1);
  const [completedFull, setCompletedFull] = useState(false);

  // AI QUIZ GENERATOR
  const generateQuiz = async () => {
    try {
      const res = await fetchWithTimeout(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "quiz",
            subject,
            difficulty,
          }),
        },
      );

      if (!res.ok) {
        // Rate-limit and server messages are surfaced to the user instead of
        // being swallowed into a generic failure.
        const message = await friendlyAiError(res);
        throw new Error(message);
      }

      const data = await res.json();
      return parseQuizQuestions(data.output);
    } catch (err) {
      console.error("Quiz generation failed:", err);
      throw err;
    }
  };

  const startQuiz = async () => {
    if (!canSubmitWithCooldown("ai_quiz_cooldown", 8000)) {
      return;
    }

    setLoadingQuiz(true);

    let aiQuestions = [];
    let failureMessage = "";

    try {
      aiQuestions = await generateQuiz();
    } catch (err) {
      failureMessage = err?.message || "";
    }

    setLoadingQuiz(false);

    if (aiQuestions.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Quiz generation failed",
        text:
          failureMessage ||
          "The AI could not generate questions right now. Please try again in a few seconds.",
      });
      return;
    }

    setQuestions(aiQuestions);
    setCurrentIndex(0);
    setSelected(null);
    setQuizStarted(true);
    setQuizFinished(false);
    setTotalAnswered(0);
    setCorrectAnswers(0);
    setRound(1);
    setCompletedFull(false);
  };

  useEffect(() => {
    // Clear any pending "next question" timeout when the component unmounts.
    return () => {
      if (answerTimeoutRef.current) {
        window.clearTimeout(answerTimeoutRef.current);
      }
    };
  }, []);

  // Load the next round of questions when the current one runs out.
  const loadNextRound = async () => {
    // All rounds finished — complete the arena.
    if (round >= MAX_ROUNDS) {
      setCompletedFull(true);
      setQuizFinished(true);
      setQuizStarted(false);
      return;
    }

    setLoadingQuiz(true);
    let nextQuestions = [];
    try {
      nextQuestions = await generateQuiz();
    } catch {
      nextQuestions = [];
    }
    setLoadingQuiz(false);

    // End the quiz gracefully if the AI returns nothing for the next round.
    if (nextQuestions.length === 0) {
      setQuizFinished(true);
      setQuizStarted(false);
      return;
    }

    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelected(null);
    setRound((prev) => prev + 1);
  };

  const handleAnswer = (option) => {
    const currentQuestion = questions[currentIndex];

    // Ignore clicks while no question is loaded or an answer is locked in.
    if (!currentQuestion || selected !== null) {
      return;
    }

    const isCorrect = option === currentQuestion.correct;

    setSelected(option);

    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (answerTimeoutRef.current) {
      window.clearTimeout(answerTimeoutRef.current);
    }

    // Give the student a moment to see the feedback before advancing.
    answerTimeoutRef.current = window.setTimeout(() => {
      answerTimeoutRef.current = null;
      setSelected(null);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        loadNextRound();
      }
    }, 1600);
  };

  const stopQuiz = () => {
    if (answerTimeoutRef.current) {
      window.clearTimeout(answerTimeoutRef.current);
      answerTimeoutRef.current = null;
    }
    setQuizFinished(true);
    setQuizStarted(false);
  };

  const currentQuestion = questions[currentIndex];
  const showFeedback = selected !== null;

  const optionStyle = (letter) => {
    const base = {
      padding: "15px",
      borderRadius: "12px",
      border: "none",
      fontSize: "15px",
      cursor: selected === null ? "pointer" : "default",
      transition: "0.3s",
      color: "white",
    };

    if (!showFeedback) {
      return {
        ...base,
        background: "linear-gradient(90deg,#4f46e5,#6366f1)",
        boxShadow: "0 6px 18px rgba(79,70,229,0.25)",
      };
    }

    if (letter === currentQuestion.correct) {
      return { ...base, background: "linear-gradient(90deg,#16a34a,#22c55e)" };
    }
    if (letter === selected) {
      return { ...base, background: "linear-gradient(90deg,#dc2626,#ef4444)" };
    }
    return { ...base, background: "rgba(99,102,241,0.25)", opacity: 0.7 };
  };

  const scorePercent =
    totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0;

  return (
    <div style={{ marginTop: "120px", padding: "0 20px" }}>
      <div
        className="fade-in"
        style={{
          textAlign: "center",
          marginBottom: "70px",
          maxWidth: "700px",
          marginInline: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 42px)",
            fontWeight: "700",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "10px",
          }}
        >
          🤖 AI Smart Quiz Arena
        </h2>

        <p style={{ opacity: 0.7, fontSize: "15px" }}>
          Test your knowledge, challenge yourself, and track your learning
          progress.
        </p>
      </div>

      {/* QUIZ START */}

      {!quizStarted && !quizFinished && (
        <div
          className="glass tool-panel"
          style={{
            maxWidth: "650px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>Choose Subject & Difficulty</h3>

          <div className="tool-row" style={{ justifyContent: "center" }}>
            <select
              value={subject}
              style={{ padding: "10px", borderRadius: "10px" }}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </select>

            <select
              value={difficulty}
              style={{ padding: "10px", borderRadius: "10px" }}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            className="btn-primary ai-btn"
            style={{ marginTop: "40px", padding: "14px 40px" }}
            onClick={startQuiz}
            disabled={loadingQuiz}
          >
            {loadingQuiz ? (
              <>
                <span className="btn-loader"></span>
                Generating Quiz...
              </>
            ) : (
              "Start Quiz"
            )}
          </button>
        </div>
      )}

      {/* QUIZ PLAY */}

      {quizStarted && !quizFinished && questions.length > 0 && (
        <div
          className="glass tool-panel"
          style={{
            maxWidth: "800px",
            marginInline: "auto",
            marginTop: "40px",
          }}
        >
          {/* TOP BAR: counter + live score */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <p style={{ opacity: 0.7 }}>
              Question #{totalAnswered + 1}
              <span style={{ opacity: 0.5 }}>
                {" "}· Round {round}/{MAX_ROUNDS}
              </span>
            </p>

            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "700",
                background: "rgba(99,102,241,0.12)",
                color: "var(--primary)",
              }}
            >
              ✅ {correctAnswers} / {totalAnswered}
            </span>
          </div>

          {/* QUESTION */}

          {loadingQuiz ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <span className="btn-loader"></span>
              <p style={{ marginTop: "12px", opacity: 0.7 }}>
                Preparing next round...
              </p>
            </div>
          ) : (
            <>
              <h3 style={{ marginBottom: "30px", fontSize: "20px" }}>
                {currentQuestion?.question}
              </h3>

              {/* OPTIONS */}

              <div style={{ display: "grid", gap: "14px" }}>
                {LETTERS.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleAnswer(letter)}
                    disabled={selected !== null}
                    style={optionStyle(letter)}
                  >
                    <strong>{letter}.</strong>{" "}
                    {currentQuestion?.options?.[LETTERS.indexOf(letter)] ||
                      "(missing option)"}
                  </button>
                ))}
              </div>

              {/* FEEDBACK CAPTION */}
              {showFeedback && (
                <p
                  className="fade-in"
                  style={{
                    marginTop: "18px",
                    textAlign: "center",
                    fontWeight: "700",
                    color:
                      selected === currentQuestion.correct ? "#22c55e" : "#ef4444",
                  }}
                >
                  {selected === currentQuestion.correct
                    ? "✅ Correct!"
                    : `❌ Correct answer: ${currentQuestion.correct}`}
                </p>
              )}
            </>
          )}

          {/* STOP QUIZ */}

          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <button
              onClick={stopQuiz}
              style={{
                padding: "12px 28px",
                borderRadius: "10px",
                background: "linear-gradient(90deg,#dc2626,#ef4444)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Stop Quiz
            </button>
          </div>
        </div>
      )}

      {/* RESULT */}

      {quizFinished && (
        <div
          className="glass tool-panel"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            marginInline: "auto",
            marginTop: "40px",
          }}
        >
          <h2>Quiz Result</h2>

          <div style={{ marginTop: "30px", marginBottom: "20px" }}>
            <div style={{ fontSize: "50px", fontWeight: "700", color: "#6366f1" }}>
              {correctAnswers} / {totalAnswered}
            </div>

            <p style={{ opacity: 0.7 }}>Correct Answers</p>

            <div
              style={{
                marginTop: "20px",
                height: "12px",
                background: "var(--surface-2)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${scorePercent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#22c55e,#16a34a)",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>

          <h3>
            Score: {correctAnswers} / {totalAnswered}
          </h3>

          <p style={{ opacity: 0.7, marginTop: "8px", marginBottom: "24px" }}>
            {completedFull
              ? "🏁 Quiz complete — you finished all rounds!"
              : scorePercent >= 80
                ? "🏆 Excellent! Keep it up."
                : scorePercent >= 50
                  ? "💪 Good effort — review the weak topics."
                  : "📚 Keep practicing — you will get there!"}
          </p>

          <button
            onClick={() => {
              setQuizFinished(false);
              setQuizStarted(false);
            }}
            className="btn-primary"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
