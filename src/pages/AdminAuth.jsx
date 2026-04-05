import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
  const { login, createFaculty, user, role, profileReady, profileMissing, loading } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isOwner = profileReady && role === "owner";
  const wantsCreateMode =
    new URLSearchParams(location.search).get("mode") === "create";

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsSignup(Boolean(wantsCreateMode && isOwner));
  }, [isOwner, wantsCreateMode]);

  useEffect(() => {
    if (!loading && user && !(wantsCreateMode && isOwner)) {
      navigate("/", { replace: true });
    }
  }, [isOwner, loading, navigate, user, wantsCreateMode]);

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
      const { error } = await login(email, password);

      if (error) {
        alert(error.message);
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin Login – NextGen Study Hub Admin Panel</title>

        <meta
          name="description"
          content="Secure admin login page for managing jobs, study materials, and platform content on NextGen Study Hub."
        />

        <meta
          name="keywords"
          content="
admin login,
admin authentication,
admin dashboard login,
website admin panel login,
secure admin access,
admin login page,
website management login,
admin portal access,
admin control panel login,
admin authentication system
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/admin-auth" />
      </Helmet>

      <div
        className="section"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div 

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

          {user && profileMissing && (
            <p
              style={{
                marginTop: "18px",
                textAlign: "center",
                color: "var(--primary)",
                opacity: 0.85,
                fontSize: "13px",
              }}
            >
              Your account is logged in, but the Supabase `profiles` role is not
              set yet.
            </p>
          )}

          {isOwner && (
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
        </div>
      </div>
    </>
  );
}
