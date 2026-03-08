import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
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
    <>
    <SEO
title="Student Productivity Tools – CGPA Calculator, Study Timer & Academic Tools"
url="https://www.atulsharmas.in/student-tools"
/>
      <Helmet>
        <title>
          Student Tools – GPA Calculator, AI Study Assistant & Productivity
          Tools for Students
        </title>

        <meta
          name="description"
          content="Use powerful student tools including GPA calculator, AI study assistant, study planner, productivity tools and academic utilities designed for engineering and diploma students to improve learning and academic performance."
        />

        <meta
          name="keywords"
          content="
student tools,
student productivity tools,
student academic tools,
gpa calculator,
gpa calculator for students,
online gpa calculator,
cgpa calculator,
engineering gpa calculator,
diploma gpa calculator,
ai study assistant,
ai tools for students,
study assistant ai,
student productivity apps,
student study planner,
study planner for students,
student task manager,
academic productivity tools,
education productivity tools,
study management tools,
study productivity software,
engineering student tools,
tools for diploma students,
student digital tools,
study tracking tools,
student academic calculator,
online student utilities,
student learning tools,
study helper tools,
education tools platform,
study apps for students,
student time management tools,
study organization tools,
student productivity platform,
student workflow tools,
study planning software,
student academic planner,
tools for engineering students,
tools for college students,
digital tools for students,
study productivity apps,
student learning assistant tools,
student education tools
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/student-tools" />
      </Helmet>

      <div className="section">
        <section
          style={{
            padding: "clamp(40px,6vw,80px)",
            marginBottom: "70px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem,5vw,3rem)",
              fontWeight: "900",
              marginBottom: "20px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.2",
            }}
          >
            Student Productivity Tools – GPA Calculator, AI Study Assistant &
            Learning Tools
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "auto",
              fontSize: "clamp(15px,2vw,18px)",
              opacity: "0.85",
              lineHeight: "1.8",
            }}
          >
            Use powerful academic tools designed for students including a GPA
            calculator, AI study assistant, task manager, quiz tools and
            productivity resources to help engineering and diploma students
            study smarter, track progress and improve academic performance.
          </p>
        </section>
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "80px 0",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.2rem)",
              fontWeight: "800",
              color: "var(--primary)",
              marginBottom: "10px",
            }}
          >
            Essential Student Study Tools
          </h2>

          <p
            style={{
              opacity: "0.75",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            Smart digital tools to help students organize studies, track
            academic progress and improve productivity.
          </p>
        </div>

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
        <div 

       
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
            academic journey smarter, faster, and more productive 📚✨ If you
            have an idea that could make this platform even better — don’t keep
            it to yourself! 💡 Drop your suggestion in the Contact section and
            help us build the ultimate study companion together 🚀
            <br />
            <br />
            What features should i add more??
          </p>

          <button
    
          
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
          </button>
        </div>
      </div>
    </>
  );
}
