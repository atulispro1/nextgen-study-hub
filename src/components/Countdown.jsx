import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <section className="section" style={{ textAlign: "center" }}>
        <h2>Upcoming Semester Exams</h2>
        <h3 style={{ marginTop: "20px", color: "#4f46e5" }}>{timeLeft}</h3>
      </section>
    </motion.section>
  );
}
