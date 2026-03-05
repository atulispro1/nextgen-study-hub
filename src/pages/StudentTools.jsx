import { motion } from "framer-motion";
import { Calculator, Briefcase, Bell, FileText } from "lucide-react";
import GPACalculator from "../components/GPACalculator";
import AIAssistant from "../components/AIAssistant";
import AdvancedTodo from "../components/AdvancedTodo";
import QuizSection from "../components/QuizSection";
import { useNavigate } from "react-router-dom";

export default function StudentTools() {
  const navigate = useNavigate();
  const tools = [
    {
      icon: <Calculator size={28} />,
      title: "GPA Calculator",
      desc: "Calculate semester GPA instantly with smart grading system.",
    },
    {
      icon: <Briefcase size={28} />,
      title: "Internship Section",
      desc: "Latest internship opportunities & career updates.",
    },
    {
      icon: <Bell size={28} />,
      title: "Notifications",
      desc: "Important academic announcements & updates.",
    },
    {
      icon: <FileText size={28} />,
      title: "Assignment Helper",
      desc: "Quick resources and solved assignment guidance.",
    },
  ];

  return (
    <div className="section">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "42px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Student Tools Dashboard
      </motion.h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.7,
          marginBottom: "60px",
        }}
      >
        Smart tools designed to improve academic performance and productivity.
      </p>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      {/* GPA CALCULATOR SECTION */}
      <div id="gpa">
        <AIAssistant />
      </div>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <div id="ai">
        <QuizSection />
      </div>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <div id="todo">
        <AdvancedTodo />
      </div>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <div id="quiz">
        <GPACalculator />
      </div>
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass"
        style={{
          padding: "60px",
          marginTop: "120px",
          textAlign: "center",
          maxWidth: "900px",
          marginInline: "auto",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🚀 More Powerful Features Coming Soon...
        </h2>

        <p
          style={{
            fontSize: "16px",
            opacity: 0.8,
            lineHeight: "1.8",
            maxWidth: "700px",
            margin: "auto",
            marginBottom: "35px",
          }}
        >
          We’re constantly improving the Student Tools experience to make your
          academic journey smarter, faster, and more productive 📚✨ If you have
          an idea that could make this platform even better — don’t keep it to
          yourself! 💡 Drop your suggestion in the Contact section and help us
          build the ultimate study companion together 🚀
          <br />
          <br />
          What features should i add more??
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact-owner")}
          style={{
            padding: "14px 40px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            boxShadow: "0 10px 25px rgba(99,102,241,0.3)",
          }}
        >
          💬 Send Your Suggestion
        </motion.button>
      </motion.div>
    </div>
  );
}
