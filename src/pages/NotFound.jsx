import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div className="glass" style={{ padding: "60px", maxWidth: "650px" }}>
        
        {/* Floating animation */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "70px", marginBottom: "20px" }}
        >
          🚧
        </motion.div>

        {/* 404 Title */}
        <h1
          style={{
            fontSize: "72px",
            marginBottom: "10px",
            fontWeight: "800",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        <h2 style={{ marginBottom: "15px" }}>
          Oops! Page Not Found
        </h2>

        <p
          style={{
            opacity: 0.8,
            lineHeight: "1.6",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          The page you are trying to access doesn't exist or may have been
          moved. Don't worry — you can always return to the homepage and
          continue exploring the study resources.
        </p>

        {/* Button */}
        <button
          className="btn-primary"
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            fontSize: "15px",
            borderRadius: "30px",
          }}
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>

        {/* Floating particles */}
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            fontSize: "20px",
            marginTop: "30px",
            opacity: 0.6,
          }}
        >
          ✨ 📚 🚀
        </motion.div>

      </div>
    </div>
  );
}