import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function AdminAuth() {
  const { login, createFaculty, user, OWNER_EMAIL } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(
    new URLSearchParams(location.search).get("mode") === "create",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSignup) {
    const error = await createFaculty(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Faculty account created successfully!");
      setEmail("");
      setPassword("");
      navigate("/"); // redirect to home
    }
  } else {
    const error = await login(email, password);

    if (error) {
      alert(error.message);
    } else {
      navigate("/"); // redirect after login
    }
  }
};

  return (
    <div
      className="section"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="glass"
        style={{
          padding: "40px",
          borderRadius: "16px",
          width: "380px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          {isSignup ? "Create Faculty Account" : "Admin Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          <button
            className="btn-primary"
            style={{ width: "100%", padding: "10px" }}
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        {user?.email === OWNER_EMAIL && (
          <p
            onClick={() => setIsSignup(!isSignup)}
            style={{
              marginTop: "18px",
              textAlign: "center",
              cursor: "pointer",
              color: "var(--primary)",
            }}
          >
            {isSignup ? "Back to Login" : "Create Faculty Account"}
          </p>
        )}
      </motion.div>
    </div>
  );
}
