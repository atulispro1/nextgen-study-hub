
import CountUp from "react-countup";

export default function StatsSection() {
  const stats = [
    { number: 6, label: "Semesters" },
    { number: 120, label: "Study Materials" },
    { number: 75, label: "Assignments" },
    { number: 24, label: "Hours Access" },
  ];

  return (
    <section className="section" style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "50px" }}>Platform Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "30px",
        }}
      >
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="glass"
            style={{ padding: "40px" }}
            >
          
            <h1 style={{ fontSize: "42px", color: "#6366f1" }}>
              <CountUp end={stat.number} duration={2} />+
            </h1>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}