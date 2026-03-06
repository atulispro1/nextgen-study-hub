import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const contentRef = useRef(null);
  const notesRef = useRef(null);
  const goToSection = (sectionId) => {
    setToolsOpen(false);

    if (location.pathname !== "/student-tools") {
      navigate("/student-tools");

      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, role, logout } = useAuth() || {};
  const [progressDropdown, setProgressDropdown] = useState(false);
  const progressRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = Boolean(user);
  const isOwner = role === "owner";

  // Safe scroll (only on homepage)
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (progressRef.current && !progressRef.current.contains(e.target)) {
        setProgressDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownButtonStyle = {
    width: "100%",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "rgba(99,102,241,0.1)",
    marginBottom: "8px",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "left",
  };
  const dropdownItemStyle = {
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
    marginBottom: "5px",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(16px)",
          padding: "18px 8%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(99,102,241,0.2)",
          width: "100%",
        }}
      >
        {/* LOGO */}
        <h2
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            color: "var(--primary)",
            fontWeight: "700",
          }}
        >
          NextGen Study Hub
        </h2>

        {/* DESKTOP NAV */}

        <div
          className="desktop-nav"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setJobsOpen((prev) => !prev)}
            >
              Jobs ▾
            </span>

            {jobsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/Jobs")}
                >
                  Explore Jobs
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/jobs?type=internship")}
                >
                  Internships
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/jobs?type=fresher")}
                >
                  Fresher Jobs
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/jobs?type=remote")}
                >
                  Remote Jobs
                </div>
              </motion.div>
            )}
          </div>
          <div ref={notesRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setNotesOpen((prev) => !prev)}
            >
              📚 Notes ▾
            </span>

            {notesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/notes-library");
                    setNotesOpen(false);
                  }}
                >
                  📚 Notes Library
                </div>
              </motion.div>
            )}
          </div>

          {/* LEGAL PAGES */}
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setLegalOpen((prev) => !prev)}
            >
              Legal ▾
            </span>

            {legalOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/about")}
                >
                  About
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/privacy-policy")}
                >
                  Privacy Policy
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => navigate("/terms")}
                >
                  Terms & Conditions
                </div>
              </motion.div>
            )}
          </div>

          <div ref={contentRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setContentOpen((prev) => !prev)}
            >
              Content ▾
            </span>

            {contentOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/blog");
                    setContentOpen(false);
                  }}
                >
                  📝 Blogs
                </div>
              </motion.div>
            )}
          </div>

          {/* STUDENT TOOLS */}
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/student-tools");
                setToolsOpen(!toolsOpen);
              }}
            >
              Student Tools ▾
            </span>

            {toolsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => goToSection("gpa")}
                >
                  📊 GPA Calculator
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => goToSection("todo")}
                >
                  ✅ Todo List
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => goToSection("quiz")}
                >
                  🎯 AI Quiz Arena
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => goToSection("ai")}
                >
                  🤖 AI Assistant
                </div>
              </motion.div>
            )}
          </div>

          {/* PROGRESS */}
          <div ref={progressRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setProgressDropdown((prev) => !prev)}
            >
              See Progress (Semester) ▾
            </span>

            {progressDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 9999,
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <div
                    key={sem}
                    onClick={() => {
                      navigate(`/semester/${sem}`);
                      setProgressDropdown(false);
                    }}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderRadius: "6px",
                    }}
                  >
                    Semester {sem}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setContactsOpen((prev) => !prev)}
            >
              Contacts ▾
            </span>

            {contactsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                  borderRadius: "12px",
                  padding: "15px",
                  minWidth: "220px",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.6)"
                      : "0 15px 40px rgba(0,0,0,0.15)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 9999,
                }}
              >
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/contact-owner");
                    setContactsOpen(false);
                  }}
                >
                  📬 Contact Owner
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/contact-faculty");
                    setContactsOpen(false);
                  }}
                >
                  👨‍🏫 Contact Faculty
                </div>
              </motion.div>
            )}
          </div>

          {/* ADMIN LOGIN */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/admin")}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: "var(--primary)",
                color: "white",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Admin Login
            </button>
          )}

          {/* AVATAR */}
          {isLoggedIn && (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {user?.email?.charAt(0)?.toUpperCase() || "A"}
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: 0,
                    background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                    borderRadius: "12px",
                    padding: "15px",
                    minWidth: "220px",
                    boxShadow:
                      theme === "dark"
                        ? "0 15px 40px rgba(0,0,0,0.6)"
                        : "0 15px 40px rgba(0,0,0,0.15)",
                    zIndex: 9999,
                  }}
                >
                  <strong>{user?.email}</strong>
                  <p style={{ fontSize: "12px", opacity: 0.7 }}>Role: {role}</p>
                  <hr style={{ margin: "10px 0", opacity: 0.2 }} />

                  {isOwner && (
                    <button
                      onClick={() => {
                        navigate("/admin?mode=create");
                        setDropdownOpen(false);
                      }}
                      style={dropdownButtonStyle}
                    >
                      + Create Faculty
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    style={{
                      ...dropdownButtonStyle,
                      background: "crimson",
                      color: "white",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleTheme}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>

        {/* HAMBURGER (OUTSIDE desktop-nav) */}
        <div
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ cursor: "pointer" }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </motion.nav>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "85%",
            height: "100vh",
            background: theme === "dark" ? "#12121a" : "#ffffff",
            padding: "25px",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "-5px 0 30px rgba(0,0,0,0.4)",
            overflowY: "auto",
          }}
        >
          {/* CLOSE BUTTON */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <X
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setMobileOpen(false)}
            />
          </div>

          {/* USER INFO SECTION */}
          {isLoggedIn ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px",
                borderRadius: "10px",
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {user?.email?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  {user?.email}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>
                  Role: {role}
                </div>
              </div>
            </div>
          ) : null}

          {/* NAVIGATION LINKS */}
          <div>
            <strong>Jobs</strong>
            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/jobs")
                  setMobileOpen(false);
                }}
              >
                Explore Jobs
              </span>

              <span
                onClick={() => {
                  navigate("/jobs?type=internship");
                  setMobileOpen(false);
                }}
              >
                Interships
              </span>

              <span
                onClick={() => {
                  navigate("/jobs?type=fresher");
                  setMobileOpen(false);
                }}
              >
                Fresher Jobs
              </span>

              <span
                onClick={() => {
                  navigate("/jobs?type=remote")
                  setMobileOpen(false);
                }}
              >
                Remote Jobs
              </span>
            </div>
          </div>
          
          <div>
            <strong>📚 Notes</strong>
            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/notes-library");
                  setMobileOpen(false);
                }}
              >
                📚 Notes Library
              </span>
            </div>
          </div>

          <div>
            <strong>📂 Content</strong>
            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/blog");
                  setMobileOpen(false);
                }}
              >
                📝 Blogs
              </span>
            </div>
          </div>

          {/* STUDENT TOOLS */}
          <div>
            <strong>🛠 Student Tools</strong>
            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <span
                onClick={() => {
                  goToSection("gpa");
                  setMobileOpen(false);
                }}
              >
                📊 GPA Calculator
              </span>

              <span
                onClick={() => {
                  goToSection("todo");
                  setMobileOpen(false);
                }}
              >
                ✅ Todo List
              </span>

              <span
                onClick={() => {
                  goToSection("quiz");
                  setMobileOpen(false);
                }}
              >
                🎯 AI Quiz Arena
              </span>

              <span
                onClick={() => {
                  goToSection("ai");
                  setMobileOpen(false);
                }}
              >
                🤖 AI Assistant
              </span>
            </div>
          </div>

          {/* PROGRESS */}
          <div>
            <strong>📈 See Progress</strong>
            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <span
                  key={sem}
                  onClick={() => {
                    navigate(`/semester/${sem}`);
                    setMobileOpen(false);
                  }}
                >
                  Semester {sem}
                </span>
              ))}
            </div>
          </div>

          <span
            onClick={() => {
              navigate("/contact-owner");
              setMobileOpen(false);
            }}
          >
            📬 Contact Owner
          </span>

          <span
            onClick={() => {
              navigate("/contact-faculty");
              setMobileOpen(false);
            }}
          >
            👨‍🏫 Contact Faculty
          </span>
          {/* LEGAL SECTION */}
          <div>
            <strong>📄 Legal</strong>

            <div
              style={{
                marginTop: "8px",
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/about");
                  setMobileOpen(false);
                }}
              >
                About
              </span>

              <span
                onClick={() => {
                  navigate("/privacy-policy");
                  setMobileOpen(false);
                }}
              >
                Privacy Policy
              </span>

              <span
                onClick={() => {
                  navigate("/terms");
                  setMobileOpen(false);
                }}
              >
                Terms & Conditions
              </span>
            </div>
          </div>

          {/* ADMIN SECTION */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                navigate("/admin");
                setMobileOpen(false);
              }}
              className="btn-primary"
            >
              Admin Login
            </button>
          )}

          {isLoggedIn && (
            <>
              {isOwner && (
                <button
                  onClick={() => {
                    navigate("/admin?mode=create");
                    setMobileOpen(false);
                  }}
                  className="btn-primary"
                >
                  + Create Faculty
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/admin");
                  setMobileOpen(false);
                }}
                className="btn-primary"
              >
                Admin Panel
              </button>

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "crimson",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}

          {/* THEME SWITCH */}
          <button
            onClick={() => toggleTheme()}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            {theme === "light" ? "🌙 Switch to Dark" : "☀ Switch to Light"}
          </button>
        </motion.div>
      )}
    </>
  );
}
