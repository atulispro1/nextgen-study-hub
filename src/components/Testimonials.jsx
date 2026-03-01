import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    "This platform completely organized my semester preparation!",
    "The progress tracking keeps me motivated.",
    "Premium materials are super helpful for exams.",
  ];

  return (
    <section className="section" style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "40px" }}>What Students Say</h2>

      <div className="grid">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="glass"
            style={{ padding: "30px" }}
          >
            <p>"{review}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}