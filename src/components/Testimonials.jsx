import { motion } from "framer-motion";
import {
  Search,
  Download,
  Eye,
  MessageSquare,
  BookOpen,
  BarChart,
} from "lucide-react";

export default function PlatformActions() {
  const actions = [
    {
      icon: <Search size={26} />,
      title: "Find Study Materials",
      desc: "Search and filter notes easily by semester, subject, and category.",
    },
    {
      icon: <Eye size={26} />,
      title: "Preview Notes Instantly",
      desc: "Open study materials directly in the browser before downloading.",
    },
    {
      icon: <Download size={26} />,
      title: "Download Resources",
      desc: "Save notes and study materials for offline learning anytime.",
    },
    {
      icon: <MessageSquare size={26} />,
      title: "Share Feedback",
      desc: "Comment on study materials and help improve resources for others.",
    },
    {
      icon: <BookOpen size={26} />,
      title: "Explore Notes Library",
      desc: "Browse all available study materials from different semesters.",
    },
    {
      icon: <BarChart size={26} />,
      title: "Track Your Progress",
      desc: "Mark completed units and monitor your semester progress.",
    },
  ];

  return (
    <section className="section">

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        What You Can Do Here
      </h2>

      <p
        style={{
          textAlign: "center",
          maxWidth: "650px",
          margin: "auto",
          opacity: 0.8,
          marginBottom: "50px",
        }}
      >
        NextGen Study Hub provides a simple and organized way for students to
        access study materials, track their progress, and interact with helpful
        academic resources.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {actions.map((item, index) => (
          <motion.div
            key={index}
            className="glass"
            whileHover={{ scale: 1.04 }}
            style={{
              padding: "25px",
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ color: "#6366f1" }}>{item.icon}</div>

            <div>
              <h4 style={{ marginBottom: "6px" }}>{item.title}</h4>
              <p style={{ opacity: 0.8, fontSize: "14px" }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}