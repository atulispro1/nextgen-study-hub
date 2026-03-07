
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <footer

      style={{
        marginTop: "120px",
        padding: "80px 8%",
        borderTop: "1px solid rgba(99,102,241,0.2)",
        background:
          theme === "light"
            ? "linear-gradient(to right, #f9fafb, #eef2ff)"
            : "linear-gradient(to right, #0f172a, #1e293b)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "50px",
        }}
      >
        <div>
          <h3
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "800",
              marginBottom: "15px",
            }}
          >
            NextGen Study Hub
          </h3>

          <p style={{ opacity: 0.7 }}>
            Empowering Diploma Computer Science students with organized academic
            resources and intelligent digital tools.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "15px" }}>Quick Access</h4>
          <p
            style={{ opacity: 0.7, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Semesters
          </p>

          <p
            style={{ opacity: 0.7, cursor: "pointer" }}
            onClick={() => navigate("/semester/1")}
          >
            Notes
          </p>

          <p
            style={{ opacity: 0.7, cursor: "pointer" }}
            onClick={() => navigate("/semester/1")}
          >
            Assignments
          </p>

          <p
            style={{ opacity: 0.7, cursor: "pointer" }}
            onClick={() => navigate("/student-tools")}
          >
            Student Tools
          </p>
          <p onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
            About
          </p>
          <p
            onClick={() => navigate("/privacy-policy")}
            style={{ cursor: "pointer" }}
          >
            Privacy Policy
          </p>
          <p onClick={() => navigate("/terms")} style={{ cursor: "pointer" }}>
            Terms & Conditions
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "15px" }}>Contact</h4>
          <p style={{ opacity: 0.7 }}>atul.sharmas2806@gmail.com</p>
          <p style={{ opacity: 0.7 }}>Academic SaaS Platform</p>
        </div>

        {/* FOUNDERS PREMIUM CARD */}
        <div className="fade-in"
          style={{
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(20px)",
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.6)",
            border: "1px solid rgba(99,102,241,0.3)",
            textAlign: "center",
          }}
          >
        
          <h4 style={{ marginBottom: "20px" }}>Founders</h4>

          <div className="fade-in"
            style={{
              fontSize: "28px",
              fontWeight: "900",
              background:
                "linear-gradient(270deg,#6366f1,#8b5cf6,#22c55e,#6366f1)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            >
          
            Atul Sharma
          </div>

          <div className="fade-in"
            style={{
              fontSize: "28px",
              fontWeight: "900",
              marginTop: "10px",
              background:
                "linear-gradient(270deg,#22c55e,#8b5cf6,#6366f1,#22c55e)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            >
          
            Sonal Kumar
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "60px",
          textAlign: "center",
          opacity: 0.6,
          fontSize: "14px",
        }}
      >
        © 2026 NextGen Study Hub — Built with Vision & Innovation.
      </div>
    </footer>
  );
}
