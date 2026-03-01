import { motion } from "framer-motion";
import { BookOpen, FileText, Star, BarChart } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Organized Semester Materials",
      desc: "All notes, assignments & lab files structured semester-wise.",
    },
    {
      icon: <FileText size={32} />,
      title: "Premium Study Resources",
      desc: "Advanced practice sets, case studies & project reports.",
    },
    {
      icon: <Star size={32} />,
      title: "Interactive Learning",
      desc: "Like, comment, rate and track your academic progress.",
    },
    {
      icon: <BarChart size={32} />,
      title: "Smart Tools",
      desc: "GPA calculator, exam countdown & internship updates.",
    },
  ];

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <section className="section">
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
          Why NextGen Study Hub?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </div>
      </section>
    </motion.section>
  );
}
