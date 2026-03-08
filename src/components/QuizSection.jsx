import { useState } from "react";

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

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // AI QUIZ GENERATOR
  const generateQuiz = async () => {
    const res = await fetch(
      "https://lryyihefzqpjiedtrdeg.supabase.co/functions/v1/ai-assistant",
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

    const data = await res.json();

    const aiQuestions = JSON.parse(data.output || "[]");

    setQuestions(aiQuestions);
    setCurrentIndex(0);
  };

  const startQuiz = async () => {
    setLoadingQuiz(true);

    await generateQuiz();

    setQuizStarted(true);
    setQuizFinished(false);
    setTotalAnswered(0);
    setCorrectAnswers(0);

    setLoadingQuiz(false);
  };

  const handleAnswer = async (option) => {
    const isCorrect = option === questions[currentIndex].correct_answer;

    setSelected(option);

    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(async () => {
      setSelected(null);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        await generateQuiz();
      }
    }, 500);
  };

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
            fontSize: "42px",
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
          className="glass"
          style={{
            padding: "60px",
            maxWidth: "650px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>Choose Subject & Difficulty</h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <select
              style={{ padding: "10px", borderRadius: "10px" }}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </select>

            <select
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
          className="glass"
          style={{
            padding: "60px",
            maxWidth: "800px",
            marginInline: "auto",
            marginTop: "40px",
          }}
        >
          {/* QUESTION COUNTER */}

          <p style={{ opacity: 0.7, marginBottom: "10px" }}>
            Question #{totalAnswered + 1}
          </p>

          {/* QUESTION */}

          <h3 style={{ marginBottom: "30px", fontSize: "20px" }}>
            {questions[currentIndex].question}
          </h3>

          {/* OPTIONS */}

          <div style={{ display: "grid", gap: "14px" }}>
            {["A", "B", "C", "D"].map((letter) => {
              const isCorrect =
                selected === letter &&
                letter === questions[currentIndex].correct_answer;

              const isWrong =
                selected === letter &&
                letter !== questions[currentIndex].correct_answer;

              return (
                <button
                  key={letter}
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
                  }}
                >
                  {questions[currentIndex][`option_${letter.toLowerCase()}`]}
                </button>
              );
            })}
          </div>

          {/* STOP QUIZ */}

          <button
            onClick={() => {
              setQuizFinished(true);
              setQuizStarted(false);
            }}
            style={{
              marginTop: "25px",
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
      )}

      {/* RESULT */}

      {quizFinished && (
        <div
          className="glass"
          style={{
            padding: "60px",
            textAlign: "center",
            maxWidth: "600px",
            marginInline: "auto",
            marginTop: "40px",
          }}
        >
          <h2>Quiz Result</h2>

          <div
            style={{
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                fontWeight: "700",
                color: "#6366f1",
              }}
            >
              {correctAnswers} / {totalAnswered}
            </div>

            <p style={{ opacity: 0.7 }}>Correct Answers</p>

            <div
              style={{
                marginTop: "20px",
                height: "12px",
                background: "#e5e7eb",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(correctAnswers / totalAnswered) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#22c55e,#16a34a)",
                }}
              />
            </div>
          </div>

          <h3>
            Score: {correctAnswers} / {totalAnswered}
          </h3>

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
