import { useState } from "react";
import { supabase } from "../supabase";

export default function UploadJobCard({ refreshJobs }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    badge: "",
    logo: "",
    apply_link: "",
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: "",
    tag6: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const { error } = await supabase.from("jobs").insert([form]);

    if (!error) {
      alert("Job uploaded successfully");
      refreshJobs();
      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        badge: "",
        logo: "",
        apply_link: "",
        tag1: "",
        tag2: "",
        tag3: "",
        tag4: "",
        tag5: "",
        tag6: "",
      });
    } else {
      console.log(error);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("company-logos")
      .upload(fileName, file);

    if (error) {
      console.log("Upload error:", error);
      return;
    }

    const { data } = supabase.storage
      .from("company-logos")
      .getPublicUrl(fileName);

    setForm((prev) => ({
      ...prev,
      logo: data.publicUrl,
    }));
  };

  const tagOptions = [
    "Content Writing",
    "Blog Writing",
    "SEO",
    "Digital Marketing",
    "Marketing",
    "Technical Writing",
    "Remote",
    "CRM",
    "Sales",
    "Lead Generation",
    "Analytics",
    "Software Development",
  ];

  return (
    <div
      className="glass"
      style={{
        padding: "40px",
        marginBottom: "60px",
        borderRadius: "26px",
        maxWidth: "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <div style={{ marginBottom: "35px", textAlign: "center" }}>
        <h2
          style={{
            marginBottom: "10px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          🚀 Post a Job Opportunity
        </h2>

        <p
          style={{
            opacity: "0.75",
            fontSize: "14px",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          Share internships and job opportunities with students. Fields marked *
          are required.
        </p>

        <div
          style={{
            height: "2px",
            width: "80px",
            margin: "18px auto 0",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6,#6366f1)",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* FORM START */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        {/* BASIC DETAILS */}

        <input
          name="title"
          placeholder="Job Title *"
          required
          value={form.title}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            background: "rgba(255,255,255,0.9)",
            transition: "0.2s",
          }}
        />

        <input
          name="company"
          placeholder="Company Name *"
          required
          value={form.company}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            background: "rgba(255,255,255,0.9)",
          }}
        />

        <input
          name="location"
          placeholder="Location (eg. Remote, India) *"
          required
          value={form.location}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            background: "rgba(255,255,255,0.9)",
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
        {form.logo && (
          <img
            src={form.logo}
            alt="logo preview"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              marginTop: "10px",
            }}
          />
        )}

        <input
          name="apply_link"
          type="url"
          placeholder="Application Link *"
          required
          value={form.apply_link}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            background: "rgba(255,255,255,0.9)",
          }}
        />

        {/* JOB TYPE */}

        <select
          name="type"
          required
          value={form.type}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          <option value="">Job Type *</option>
          <option>Internship</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Fresher</option>
        </select>

        {/* BADGE */}

        <select
          name="badge"
          value={form.badge}
          onChange={handleChange}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          <option value="">Badge (optional)</option>
          <option>Hot</option>
          <option>New</option>
        </select>

        {/* TAGS SECTION */}

        <div style={{ marginTop: "35px", gridColumn: "1 / -1" }}>
          <h4
            style={{
              marginBottom: "18px",
              fontWeight: "600",
              letterSpacing: "0.3px",
            }}
          >
            🏷 Add Tags (minimum 3 required)
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "16px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <select
                key={num}
                name={`tag${num}`}
                required={num <= 3}
                value={form[`tag${num}`]}
                onChange={handleChange}
                style={{
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "14px",
                  background: "rgba(255,255,255,0.9)",
                  cursor: "pointer",
                }}
              >
                <option value="">
                  {num <= 3 ? `Tag ${num} *` : `Tag ${num} (optional)`}
                </option>
                {tagOptions.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}

        <div
          style={{
            marginTop: "35px",
            textAlign: "center",
            gridColumn: "1 / -1",
          }}
        >
          <button
            className="btn-primary"
            style={{
              padding: "16px 40px",
              fontSize: "15px",
              borderRadius: "40px",
              letterSpacing: "0.4px",
              boxShadow: "0 10px 30px rgba(99,102,241,0.35)",
            }}
            type="submit"
          >
            🚀 Upload Job
          </button>
        </div>
      </form>
    </div>
  );
}
