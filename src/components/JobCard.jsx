import { openSafeExternalUrl } from "../utils/security";

export default function JobCard({
  jobs,
  bookmarks,
  toggleBookmark,
  isAdmin,
  deleteJob,
}) {
  return (
    <div className="grid">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="glass"
          style={{
            padding: "25px",
            position: "relative",
          }}
        >
          {/* BADGE */}

          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: job.badge === "Hot" ? "#fca5a5" : "#86efac",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {job.badge}
          </div>

          {/* HEADER */}

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "10px",
                background: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontSize: "12px", opacity: 0.6 }}>Logo</span>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: "18px" }}>{job.title}</h3>
              <p style={{ opacity: 0.7 }}>{job.company}</p>
            </div>
          </div>

          {/* LOCATION */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span>📍</span> {job.location}
            </span>

            <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span>⏱</span> {job.time}
            </span>
          </div>

          {/* TYPE */}

          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                background: "#fde68a",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {job.type}
            </span>
          </div>

          {/* TAGS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "15px",
            }}
          >
            {[job.tag1, job.tag2, job.tag3, job.tag4, job.tag5, job.tag6]
              .filter(Boolean)
              .map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    color: "#6366f1",
                    fontSize: "12px",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-primary btn-small"
                onClick={() => {
                  if (job.apply_link) {
                    openSafeExternalUrl(job.apply_link);
                  }
                }}
              >
                View Details
              </button>

              <button
                className="btn-primary btn-small"
                onClick={() => {
                  if (job.apply_link) {
                    openSafeExternalUrl(job.apply_link);
                  }
                }}
              >
                Apply Now →
              </button>
            </div>

            <span
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: bookmarks.includes(job.id) ? "#facc15" : "#9ca3af",
              }}
              onClick={() => toggleBookmark(job.id)}
            >
              ⭐
            </span>
            {isAdmin && (
              <button
                onClick={() => deleteJob(job.id)}
                style={{
                  marginLeft: "10px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "#ef4444",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
