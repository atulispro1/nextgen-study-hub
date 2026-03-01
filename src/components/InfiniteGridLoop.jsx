import { motion } from "framer-motion";

export default function InfiniteGridLoop() {
  const items = [
    "Applied Chemistry",
    "Engineering Mechanics",
    "Basic Electrical Engineering",
    "Applied Mathmetics",
    "Essential Language & Communication",
    "Environmenatal Sceince",
    "Computer (IT)",
    "Workshop",
  ];

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="loop-container">
        <div className="loop-track">
          {[...items, ...items].map((item, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              style={{
                display: "inline-block",
                margin: "0 40px",
                padding: "20px 40px",
                borderRadius: "50px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "white",
                fontWeight: "600",
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}