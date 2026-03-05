export default function TextTicker() {
  const text =
    "NextGen Study Hub • AI Tools • Smart Learning • Organized Resources • Premium Study Materials • Progress Tracking • Internship Updates • GPA Calculator • ";

  return (
    <div
      style={{
        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
        color: "white",
        padding: "12px 0",
        fontWeight: "600",
      }}
    >
      <div className="loop-container">
        <div className="loop-track loop-reverse">
          {[text, text].map((t, i) => (
            <span key={i} style={{ marginRight: "50px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}