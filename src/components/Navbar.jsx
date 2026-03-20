import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

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
  const closeAllDropdowns = () => {
    setJobsOpen(false);
    setNotesOpen(false);
    setLegalOpen(false);
    setContentOpen(false);
    setContactsOpen(false);
    setToolsOpen(false);
    setProgressDropdown(false);
  };

  return (
    <>
      <nav
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
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src="/logo.png"
            alt="NextGen Study Hub Logo"
            loading="lazy"
            style={{
              width: "110px",
              height: "90px",
              borderRadius: "8px",
            }}
          />

          <span
            style={{
              color: "var(--primary)",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            NextGen Study Hub
          </span>
        </div>

        {/* DESKTOP NAV */}

        <div
          className="desktop-nav"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </span>
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = jobsOpen;
                closeAllDropdowns();
                setJobsOpen(!wasOpen);
              }}
            >
              Jobs ▾
            </span>

            {jobsOpen && (
              <div
                className="fade-in"
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
                  onClick={() => {
                    navigate("/jobs");
                    closeAllDropdowns();
                  }}
                >
                  💼 Explore Jobs
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/jobs?type=internship");
                    closeAllDropdowns();
                  }}
                >
                  🎓 Internships
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/jobs?type=fresher");
                    closeAllDropdowns();
                  }}
                >
                  👔 Fresher Jobs
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/jobs?type=remote");
                    closeAllDropdowns();
                  }}
                >
                  💻 Remote Jobs
                </div>
              </div>
            )}
          </div>
          <div ref={notesRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = notesOpen;
                closeAllDropdowns();
                setNotesOpen(!wasOpen);
              }}
            >
              Notes ▾
            </span>

            {notesOpen && (
              <div
                className="fade-in"
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
              </div>
            )}
          </div>

          {/* LEGAL PAGES */}
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = legalOpen;
                closeAllDropdowns();
                setLegalOpen(!wasOpen);
              }}
            >
              Legal ▾
            </span>

            {legalOpen && (
              <div
                className="fade-in"
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
                  onClick={() => {
                    navigate("/about");
                    closeAllDropdowns();
                  }}
                >
                  About
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/privacy-policy");
                    closeAllDropdowns();
                  }}
                >
                  Privacy Policy
                </div>

                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/terms");
                    closeAllDropdowns();
                  }}
                >
                  Terms & Conditions
                </div>
              </div>
            )}
          </div>

          <div ref={contentRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = contentOpen;
                closeAllDropdowns();
                setContentOpen(!wasOpen);
              }}
            >
              Content ▾
            </span>

            {contentOpen && (
              <div
                className="fade-in"
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
                    closeAllDropdowns();
                  }}
                >
                  📝 Blogs
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate("/articles");
                    closeAllDropdowns();
                  }}
                >
                  📝 Articles
                </div>
              </div>
            )}
          </div>

          {/* STUDENT TOOLS */}
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = toolsOpen;
                closeAllDropdowns();
                setToolsOpen(!wasOpen);
              }}
            >
              Student Tools ▾
            </span>

            {toolsOpen && (
              <div
                className="fade-in"
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
                    goToSection("gpa");
                    closeAllDropdowns();
                  }}
                >
                  📊 GPA Calculator
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    goToSection("todo");
                    closeAllDropdowns();
                  }}
                >
                  ✅ Todo List
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    goToSection("quiz");
                    closeAllDropdowns();
                  }}
                >
                  🎯 AI Quiz Arena
                </div>
                <div
                  style={dropdownItemStyle}
                  onClick={() => {
                    goToSection("ai");
                    closeAllDropdowns();
                  }}
                >
                  🤖 AI Assistant
                </div>
              </div>
            )}
          </div>

          {/* PROGRESS */}
          <div ref={progressRef} style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = progressDropdown;
                closeAllDropdowns();
                setProgressDropdown(!wasOpen);
              }}
            >
              See Progress (Semester) ▾
            </span>

            {progressDropdown && (
              <div
                className="fade-in"
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
                      closeAllDropdowns();
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
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                const wasOpen = contactsOpen;
                closeAllDropdowns();
                setContactsOpen(!wasOpen);
              }}
            >
              Contacts ▾
            </span>

            {contactsOpen && (
              <div
                className="fade-in"
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
              </div>
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

          <div className="theme-toggle">
            <input
              type="checkbox"
              id="themeSwitch"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            <label htmlFor="themeSwitch">
              <div className="toggle-circle">
                <svg className="sun" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                </svg>

                <svg className="moon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a9 9 0 100 18 7 7 0 110-14z" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* HAMBURGER (OUTSIDE desktop-nav) */}
        <div
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ cursor: "pointer" }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* mobile view */}

      {mobileOpen && (
        <div
          className="fade-in"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "88%",
            height: "100vh",
            background: theme === "dark" ? "#0f172a" : "#ffffff",
            padding: "22px",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
            overflowY: "auto",
          }}
        >
          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
              paddingBottom: "10px",
            }}
          >
            <div>
              <div style={{ fontWeight: "700", fontSize: "18px" }}>Menu</div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>
                Navigate platform
              </div>
            </div>

            <X
              size={28}
              onClick={() => setMobileOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* QUICK NAVIGATION */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
            >
              🏠 Home
            </button>

            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/notes-library");
                setMobileOpen(false);
              }}
            >
              📚 Notes
            </button>

            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/jobs");
                setMobileOpen(false);
              }}
            >
              💼 Jobs
            </button>

            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/blog");
                setMobileOpen(false);
              }}
            >
              📝 Blog
            </button>

            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/student-tools");
                setMobileOpen(false);
              }}
            >
              🛠 Tools
            </button>
          </div>

          {/* JOB SECTION */}

          <div className="glass" style={{ padding: "16px" }}>
            <strong>💼 Jobs</strong>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/jobs");
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
                Internships
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
                  navigate("/jobs?type=remote");
                  setMobileOpen(false);
                }}
              >
                Remote Jobs
              </span>
            </div>
          </div>

          {/* STUDENT TOOLS */}

          <div className="glass" style={{ padding: "16px" }}>
            <strong>🛠 Student Tools</strong>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
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

          {/* SEMESTERS */}

          <div className="glass" style={{ padding: "16px" }}>
            <strong>📈 Semester Progress</strong>

            <div
              style={{
                marginTop: "12px",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "8px",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: "rgba(99,102,241,0.15)",
                  }}
                  onClick={() => {
                    navigate(`/semester/${sem}`);
                    setMobileOpen(false);
                  }}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}

          <div className="glass" style={{ padding: "16px" }}>
            <strong>📞 Contact</strong>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                onClick={() => {
                  navigate("/contact-owner");
                  setMobileOpen(false);
                }}
              >
                Contact Owner
              </span>

              <span
                onClick={() => {
                  navigate("/contact-faculty");
                  setMobileOpen(false);
                }}
              >
                Contact Faculty
              </span>
            </div>
          </div>

          {/* LEGAL */}

          <div className="glass" style={{ padding: "16px" }}>
            <strong>📄 Legal</strong>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
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

          {/* ADMIN */}

          {!isLoggedIn && (
            <button
              className="btn-primary"
              onClick={() => {
                navigate("/admin");
                setMobileOpen(false);
              }}
            >
              Admin Login
            </button>
          )}

          {/* THEME TOGGLE */}

          <div style={{ marginTop: "10px" }}>
            <div className="theme-toggle">
              <input
                type="checkbox"
                id="themeSwitch"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />

              <label htmlFor="themeSwitch">
                <div className="toggle-circle"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
