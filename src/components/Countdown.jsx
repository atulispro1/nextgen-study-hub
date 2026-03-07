import { useEffect, useState } from "react";


export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const examDate = new Date("2026-05-01");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = examDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTimeLeft(days + " Days Remaining");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section"

 
    >
      <section className="section" style={{ textAlign: "center" }}>
        <h2>Upcoming Semester Exams</h2>
        <h3 style={{ marginTop: "20px", color: "#4f46e5" }}>{timeLeft}</h3>
      </section>
    </section>
  );
}
