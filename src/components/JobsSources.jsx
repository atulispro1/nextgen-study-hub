export default function JobsSources() {

  const platforms = [
    "LinkedIn",
    "Internshala",
    "Indeed",
    "Glassdoor",
    "AngelList",
    "Naukri",
    "Wellfound",
    "CutShort",
    "RemoteOK",
    "Foundit",
    "Hirect",
    "TimesJobs"
  ];

  return (

    <section className="section">

      {/* HEADER */}

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2>Jobs Sourced From Top Platforms</h2>
        <p style={{ opacity: 0.7 }}>
          Opportunities aggregated from trusted hiring platforms
        </p>
      </div>

      {/* LOOP */}

      <div className="loop-container">

        <div className="loop-track">

          {[...platforms, ...platforms].map((platform, index) => (

            <span
              key={index}
              style={{
                display: "inline-block",
                marginRight: "60px",
                padding: "14px 28px",
                borderRadius: "30px",
                fontWeight: "600",
                fontSize: "15px"
              }}
              className="glass"
            >
              {platform}
            </span>

          ))}

        </div>

      </div>

    </section>
  );
}