import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">NextGen Study Hub</div>

          <p style={{ opacity: 0.75, maxWidth: "320px" }}>
            Empowering Diploma Computer Science students with organized academic
            resources and intelligent digital tools.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Quick Access</h4>
          <span className="footer-link" onClick={() => navigate("/")}>
            Semesters
          </span>
          <span className="footer-link" onClick={() => navigate("/semester/1")}>
            Notes
          </span>
          <span className="footer-link" onClick={() => navigate("/semester/1")}>
            Assignments
          </span>
          <span
            className="footer-link"
            onClick={() => navigate("/student-tools")}
          >
            Student Tools
          </span>
          <span className="footer-link" onClick={() => navigate("/about")}>
            About
          </span>
          <span
            className="footer-link"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </span>
          <span className="footer-link" onClick={() => navigate("/terms")}>
            Terms & Conditions
          </span>
        </div>

        <div>
          <h4 className="footer-heading">Contact</h4>
          <p style={{ opacity: 0.75 }}>atul.sharmas2806@gmail.com</p>
          <p style={{ opacity: 0.75 }}>Academic SaaS Platform</p>
        </div>

        {/* FOUNDERS PREMIUM CARD */}
        <div className="footer-founders">
          <h4 className="footer-heading">Founders</h4>

          <div className="footer-name">Atul Sharma</div>

          <div className="footer-name">Sonal Kumar</div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 NextGen Study Hub — Built with Vision &amp; Innovation.
      </div>
    </footer>
  );
}
