
import {
  BookOpen,
  FileText,
  Star,
  BarChart,
  Search,
  Download,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "AI Students Tools",
      desc: "In the Student Tools Section there are powerful AI tools which helps student to use and explore the world of studies easily ",
    },
    {
      icon: <FileText size={32} />,
      title: "Central Notes Library",
      desc: "Access all uploaded notes in one place with smart filters for semester, subject, and category.",
    },
    {
      icon: <Search size={32} />,
      title: "Smart Search & Filters",
      desc: "Quickly find study materials using search and filters for subjects, categories, and semesters.",
    },
    {
      icon: <Download size={32} />,
      title: "Preview & Download Notes",
      desc: "Preview study materials instantly and download PDFs for offline learning anytime.",
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Comments & Student Feedback",
      desc: "Students can leave comments, share feedback, and rate study materials to help others.",
    },
    {
      icon: <BarChart size={32} />,
      title: "Progress Tracking",
      desc: "Track your academic progress and mark completed units to stay organized during the semester.",
    },
    {
      icon: <Star size={32} />,
      title: "Student Tools Section",
      desc: "Useful academic tools and upcoming productivity features designed to support student learning.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Admin Managed Resources",
      desc: "Study materials are uploaded and managed by admins to maintain structured and reliable resources.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Semester-Wise Study Materials",
      desc: "All notes, assignments, practicals, and syllabus organized clearly by semester and subject.",
    },
  ];

  return (
    <section
      className="section"
    
    >
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
        Why Use NextGen Study Hub?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {features.map((feature, index) => (
          <div 
            key={index}
            className="glass"
            style={{
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ marginBottom: "15px", color: "#4f46e5" }}>
              {feature.icon}
            </div>

            <h3 style={{ marginBottom: "10px" }}>{feature.title}</h3>

            <p style={{ opacity: 0.8 }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
