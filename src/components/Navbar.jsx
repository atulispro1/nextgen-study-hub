import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isAdminRole } from "../utils/security";
import { isBranchSemester } from "../data/semesterBranches";
import GlobalSearch from "./GlobalSearch";
import ErrorBoundary from "./ErrorBoundary";

// Semester ids offered on the platform. Navigation URLs are built with
// semesterPath() so branch-based semesters (e.g. Semester 3) route through
// branch selection automatically — no hardcoded "sem === 3" checks anywhere.
const SEMESTERS = [1, 2, 3, 4, 5, 6];

const semesterPath = (sem) =>
  isBranchSemester(sem) ? `/semester/${sem}/branch` : `/semester/${sem}`;

// Shared dropdown panel used by every desktop menu (styling lives in
// index.css — .dropdown-panel / .dropdown-item).
function DropdownPanel({ children }) {
  return <div className="dropdown-panel">{children}</div>;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const contentRef = useRef(null);
  const notesRef = useRef(null);
  const desktopNavRef = useRef(null);
  const stackRef = useRef(null);
  const mobileTimerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

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

  const { toggleTheme } = useContext(ThemeContext);
  const { user, role, logout, profileReady, profileMissing } = useAuth() || {};

  const [progressDropdown, setProgressDropdown] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = Boolean(user);
  const isOwner = profileReady && role === "owner";
  const adminEnabled = profileReady && isAdminRole(role);
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  // Close every menu when clicking outside the desktop nav
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target)) {
        setJobsOpen(false);
        setNotesOpen(false);
        setLegalOpen(false);
        setContentOpen(false);
        setContactsOpen(false);
        setToolsOpen(false);
        setProgressDropdown(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Elevate the navbar once the user scrolls
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Expose the real height of the fixed header (nav row + search bar) so
  // .app-main can offset its content exactly — no hardcoded pixel guess.
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return undefined;
    const update = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.offsetHeight}px`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const openMobile = () => {
    clearTimeout(mobileTimerRef.current);
    setMobileOpen(true);
    // Defer a frame so the drawer mounts off-screen first, letting the
    // slide-in transition actually play (both states in one render would
    // mount it already open and skip the animation).
    mobileTimerRef.current = setTimeout(() => setMobileVisible(true), 20);
  };

  // Animate the drawer closed before unmounting it. Any pending open
  // timer is cancelled so a quick open→close never re-shows the drawer.
  const closeMobile = () => {
    clearTimeout(mobileTimerRef.current);
    setMobileVisible(false);
    mobileTimerRef.current = setTimeout(() => setMobileOpen(false), 260);
  };

  // Clear any pending drawer timer when the navbar unmounts
  useEffect(() => () => clearTimeout(mobileTimerRef.current), []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [mobileOpen]);

  const closeAllDropdowns = () => {
    setJobsOpen(false);
    setNotesOpen(false);
    setLegalOpen(false);
    setContentOpen(false);
    setContactsOpen(false);
    setToolsOpen(false);
    setProgressDropdown(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = (isOpen, setter) => {
    closeAllDropdowns();
    setter(!isOpen);
  };

  return (
    <>
      <div className="site-navbar-stack" ref={stackRef}>
        <nav
          className={`site-navbar${isTransparent ? " site-navbar--transparent" : ""}`}
        >
        {/* LOGO */}
        <div
          className="navbar-brand"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/");
          }}
        >
          <img src="/logo.png" alt="NextGen Study Hub Logo" loading="lazy" />

          <span className="navbar-brand-text">NextGen Study Hub</span>
        </div>

        {/* DESKTOP NAV */}
        <div className="desktop-nav" ref={desktopNavRef}>
          <span className="nav-link" onClick={() => navigate("/")}>
            Home
          </span>

          {/* JOBS */}
          <div style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(jobsOpen, setJobsOpen)}
            >
              Jobs ▾
            </span>

            {jobsOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/jobs");
                    closeAllDropdowns();
                  }}
                >
                  💼 Explore Jobs
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/jobs?type=internship");
                    closeAllDropdowns();
                  }}
                >
                  🎓 Internships
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/jobs?type=fresher");
                    closeAllDropdowns();
                  }}
                >
                  👔 Fresher Jobs
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/jobs?type=remote");
                    closeAllDropdowns();
                  }}
                >
                  💻 Remote Jobs
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* NOTES */}
          <div ref={notesRef} style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(notesOpen, setNotesOpen)}
            >
              Notes ▾
            </span>

            {notesOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/notes-library");
                    setNotesOpen(false);
                  }}
                >
                  📚 Notes Library
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* CONTENT */}
          <div ref={contentRef} style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(contentOpen, setContentOpen)}
            >
              Content ▾
            </span>

            {contentOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/blog");
                    closeAllDropdowns();
                  }}
                >
                  📝 Blogs
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/articles");
                    closeAllDropdowns();
                  }}
                >
                  📝 Articles
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* LEGAL */}
          <div style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(legalOpen, setLegalOpen)}
            >
              Legal ▾
            </span>

            {legalOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/about");
                    closeAllDropdowns();
                  }}
                >
                  About
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/privacy-policy");
                    closeAllDropdowns();
                  }}
                >
                  Privacy Policy
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/terms");
                    closeAllDropdowns();
                  }}
                >
                  Terms & Conditions
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* STUDENT TOOLS */}
          <div style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(toolsOpen, setToolsOpen)}
            >
              Student Tools ▾
            </span>

            {toolsOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("ai-question");
                    closeAllDropdowns();
                  }}
                >
                  🤖 AI Question Solver
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("gpa");
                    closeAllDropdowns();
                  }}
                >
                  📊 GPA Calculator
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("todo");
                    closeAllDropdowns();
                  }}
                >
                  ✅ Todo List
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("quiz");
                    closeAllDropdowns();
                  }}
                >
                  🎯 AI Quiz Arena
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("ai");
                    closeAllDropdowns();
                  }}
                >
                  🤖 AI Assistant
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("timetable");
                    closeAllDropdowns();
                  }}
                >
                  🧠 Time Table Generator
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    goToSection("pomodoro");
                    closeAllDropdowns();
                  }}
                >
                  ⏱️ Pomodoro Timer
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* PROGRESS */}
          <div style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(progressDropdown, setProgressDropdown)}
            >
              See Progress (Semester) ▾
            </span>

            {progressDropdown && (
              <DropdownPanel>
                {SEMESTERS.map((sem) => (
                  <div
                    key={sem}
                    className="dropdown-item"
                    onClick={() => {
                      navigate(semesterPath(sem));
                      setProgressDropdown(false);
                      closeAllDropdowns();
                    }}
                  >
                    Semester {sem}
                  </div>
                ))}
              </DropdownPanel>
            )}
          </div>

          {/* CONTACTS */}
          <div style={{ position: "relative" }}>
            <span
              className="nav-caret"
              onClick={() => toggleDropdown(contactsOpen, setContactsOpen)}
            >
              Contacts ▾
            </span>

            {contactsOpen && (
              <DropdownPanel>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/contact-owner");
                    setContactsOpen(false);
                  }}
                >
                  📬 Contact Owner
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/contact-faculty");
                    setContactsOpen(false);
                  }}
                >
                  👨‍🏫 Contact Faculty
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* ADMIN LOGIN */}
          {!isLoggedIn && (
            <button className="nav-cta" onClick={() => navigate("/admin")}>
              Admin Login
            </button>
          )}

          {/* AVATAR */}
          {isLoggedIn && (
            <div style={{ position: "relative" }}>
              <div
                className="navbar-avatar"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {(user?.email || user?.user_metadata?.email)?.charAt(0)?.toUpperCase() || "A"}
              </div>

              {dropdownOpen && (
                <div className="dropdown-panel">
                  <strong>{user?.email || user?.user_metadata?.email}</strong>
                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    Role: {role || "pending"}
                  </p>
                  {isLoggedIn && !adminEnabled && profileMissing && (
                    <p style={{ fontSize: "12px", opacity: 0.7 }}>
                      Profile role setup is incomplete.
                    </p>
                  )}
                  <hr className="dropdown-divider" />

                  {isOwner && (
                    <button
                      className="dropdown-button"
                      onClick={() => {
                        navigate("/admin?mode=create");
                        setDropdownOpen(false);
                      }}
                    >
                      + Create Faculty
                    </button>
                  )}

                  <button
                    className="dropdown-button"
                    style={{ background: "crimson", color: "white" }}
                    onClick={async () => {
                      await logout();
                      setDropdownOpen(false);
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
          >
            <span className="theme-btn-knob" aria-hidden="true">
              <span className="theme-btn-icon sun">☀️</span>
              <span className="theme-btn-icon moon">🌙</span>
            </span>
          </button>
        </div>

        {/* HAMBURGER (outside desktop-nav) */}
        <div
          className="mobile-menu-btn"
          onClick={() => (mobileOpen ? closeMobile() : openMobile())}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        </nav>

        {/* GLOBAL SEARCH — slim sticky bar below the navbar on every page */}
        <div
          className={`site-navbar-searchbar${
            isTransparent ? " site-navbar-searchbar--transparent" : ""
          }`}
        >
          <ErrorBoundary>
            <GlobalSearch />
          </ErrorBoundary>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <>
          {/* Backdrop — tap to close */}
          <div
            className={`mobile-backdrop${mobileVisible ? " mobile-backdrop--show" : ""}`}
            onClick={closeMobile}
            aria-hidden="true"
          />

          <div
            className={`mobile-drawer${mobileVisible ? " mobile-drawer--open" : ""}`}
          >
          {/* HEADER */}
          <div className="mobile-header">
            <div>
              <div className="mobile-header-title">Menu</div>
              <div className="mobile-header-sub">Navigate platform</div>
            </div>

            <X
              size={26}
              className="mobile-close"
              onClick={() => closeMobile()}
            />
          </div>

          {/* QUICK NAVIGATION */}
          <div className="mobile-quick-grid">
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/");
                closeMobile();
              }}
            >
              🏠 Home
            </button>
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/notes-library");
                closeMobile();
              }}
            >
              📚 Notes
            </button>
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/jobs");
                closeMobile();
              }}
            >
              💼 Jobs
            </button>
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/blog");
                closeMobile();
              }}
            >
              📝 Blog
            </button>
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/student-tools");
                closeMobile();
              }}
            >
              🛠 Tools
            </button>
            <button
              className="btn-primary btn-small"
              onClick={() => {
                navigate("/articles");
                closeMobile();
              }}
            >
              📝 Articles
            </button>
          </div>

          {/* THEME TOGGLE */}
          <button
            className="theme-btn mobile-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
          >
            <span className="theme-btn-knob" aria-hidden="true">
              <span className="theme-btn-icon sun">☀️</span>
              <span className="theme-btn-icon moon">🌙</span>
            </span>
          </button>

          {/* JOBS */}
          <div className="mobile-section">
            <span className="mobile-section-title">💼 Jobs</span>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/jobs");
                closeMobile();
              }}
            >
              Explore Jobs
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/jobs?type=internship");
                closeMobile();
              }}
            >
              Internships
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/jobs?type=fresher");
                closeMobile();
              }}
            >
              Fresher Jobs
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/jobs?type=remote");
                closeMobile();
              }}
            >
              Remote Jobs
            </button>
          </div>

          {/* STUDENT TOOLS */}
          <div className="mobile-section">
            <span className="mobile-section-title">🛠 Student Tools</span>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("ai-question");
                closeMobile();
              }}
            >
              🤖 AI Question Solver
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("gpa");
                closeMobile();
              }}
            >
              📊 GPA Calculator
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("todo");
                closeMobile();
              }}
            >
              ✅ Todo List
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("ai");
                closeMobile();
              }}
            >
              🤖 AI Assistant
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("quiz");
                closeMobile();
              }}
            >
              🎯 AI Quiz Arena
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("timetable");
                closeMobile();
              }}
            >
              🧠 Time Table Generator
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                goToSection("pomodoro");
                closeMobile();
              }}
            >
              ⏱️ Pomodoro Timer
            </button>
          </div>

          {/* SEMESTERS */}
          <div className="mobile-section">
            <span className="mobile-section-title">📈 Semester Progress</span>
            <div className="mobile-sem-grid">
              {SEMESTERS.map((sem) => (
                <button
                  key={sem}
                  className="mobile-sem-btn"
                  onClick={() => {
                    navigate(semesterPath(sem));
                    closeMobile();
                  }}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="mobile-section">
            <span className="mobile-section-title">📞 Contact</span>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/contact-owner");
                closeMobile();
              }}
            >
              Contact Owner
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/contact-faculty");
                closeMobile();
              }}
            >
              Contact Faculty
            </button>
          </div>

          {/* LEGAL */}
          <div className="mobile-section">
            <span className="mobile-section-title">📄 Legal</span>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/about");
                closeMobile();
              }}
            >
              About
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/privacy-policy");
                closeMobile();
              }}
            >
              Privacy Policy
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                navigate("/terms");
                closeMobile();
              }}
            >
              Terms & Conditions
            </button>
          </div>

          {/* ADMIN / ACCOUNT SECTION AT BOTTOM OF DRAWER */}
          <div className="mobile-admin-wrap">
            {isLoggedIn ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                {/* Email badge */}
                <div style={{
                  fontSize: "12px",
                  opacity: 0.7,
                  textAlign: "center",
                  padding: "4px 8px",
                  wordBreak: "break-all",
                }}>
                  {user?.email || user?.user_metadata?.email || "Logged in"}
                </div>

                {/* Admin Panel shortcut — only for admins */}
                {adminEnabled && (
                  <button
                    className="nav-cta mobile-admin-cta"
                    onClick={() => {
                      navigate("/admin");
                      closeMobile();
                    }}
                  >
                    🔐 Admin Panel
                  </button>
                )}

                {/* Logout — always shown when logged in */}
                <button
                  className="btn-primary"
                  style={{ background: "#ef4444", color: "white", width: "100%", padding: "10px", borderRadius: "var(--radius-pill)" }}
                  onClick={async () => {
                    await logout();
                    closeMobile();
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Not logged in — show only Admin Login */
              <button
                className="nav-cta mobile-admin-cta"
                onClick={() => {
                  navigate("/admin");
                  closeMobile();
                }}
              >
                🔐 Admin Login
              </button>
            )}
          </div>
          </div>
        </>
      )}
    </>
  );
}
