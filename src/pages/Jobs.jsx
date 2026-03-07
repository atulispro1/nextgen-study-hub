import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import JobsSources from "../components/JobsSources";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import UploadJobCard from "../components/UploadJobCard";
import Swal from "sweetalert2";

export default function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [user, setUser] = useState(null);
  const admins = ["atul.sharmas2806@gmail.com"];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const isAdmin = user && admins.includes(user.email);

  /* FETCH JOBS FROM SUPABASE */

  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setJobs(data);
    }
  };

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((job) => job !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const deleteJob = async (id) => {
    const result = await Swal.fire({
      title: "Delete Job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      borderRadius: "12px",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("jobs").delete().eq("id", id);

      if (!error) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Job has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchJobs();
      }
    }
  };

  /* RESET PAGE WHEN SEARCH OR FILTER CHANGES */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, jobType, sortBy, showBookmarks]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };

    getUser();
  }, []);

  /* FILTER JOBS */

  let filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.join(" ").toLowerCase().includes(search.toLowerCase());

    const typeMatch =
      jobType === "all" || job.type.toLowerCase().replace("-", "") === jobType;
    return searchMatch && typeMatch;
  });

  /* BOOKMARK FILTER */

  if (showBookmarks) {
    filteredJobs = filteredJobs.filter((job) => bookmarks.includes(job.id));
  }

  /* SORT */

  if (sortBy === "latest") {
    filteredJobs = [...filteredJobs].reverse();
  }

  /* PAGINATION */

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;

  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage,
  );

  return (
    <>
      <Helmet>
        <title>
          About NextGen Study Hub – Diploma Notes, Student Tools & Learning
          Platform
        </title>

        <meta
          name="description"
          content="Learn about NextGen Study Hub, a student-focused learning platform providing diploma engineering notes, semester study materials, academic tools, internships and productivity resources for students."
        />

        <meta
          name="keywords"
          content="
about nextgen study hub,
nextgen study hub platform,
student learning platform,
engineering study hub,
diploma student resources,
online study hub for students,
engineering education platform,
student academic resources,
student productivity platform,
study platform for engineering students,
diploma engineering study hub,
education resources platform,
student learning tools website,
engineering study support platform,
online learning hub for students,
student academic support platform,
engineering student study resources,
digital learning platform for students,
study resources website for diploma students,
academic productivity tools platform
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/about" />
      </Helmet>

      <section className="section">
        {/* HEADER */}

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem,4vw,2.6rem)",
              fontWeight: "800",
              marginBottom: "15px",
              color: "var(--primary)",
            }}
          >
            Student Jobs, Internships & Fresher Opportunities
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "auto",
              opacity: 0.8,
              fontSize: "15px",
              lineHeight: "1.7",
            }}
          >
            Explore verified internships, fresher jobs and part-time
            opportunities for diploma and engineering students. Discover career
            openings, build real-world experience and kick-start your
            professional journey.
          </p>
        </div>

        {!isAdmin && (
          <div
            className="glass"
            style={{ padding: "25px", textAlign: "center" }}
          >
            <p style={{ opacity: 0.7 }}>
              Only faculty and admins can post job opportunities.
            </p>
          </div>
        )}
        <br />

        {/* SEARCH + FILTERS */}

        <div
          className="glass"
          style={{
            padding: "clamp(18px,4vw,30px)",
            marginBottom: "50px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "18px",
              alignItems: "center",
            }}
          >
            {/* SEARCH */}

            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="🔍 Search jobs, companies or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "15px",
                  outline: "none",
                  transition: "0.3s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
            </div>

            {/* JOB TYPE */}

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: "14px",
                cursor: "pointer",
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <option value="all">All Jobs</option>
              <option value="internship">Internship</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="fresher">Fresher</option>
            </select>

            {/* SORT */}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: "14px",
                cursor: "pointer",
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <option value="latest">Sort: Latest</option>
              <option value="deadline">Sort: Deadline</option>
            </select>

            {/* BOOKMARK */}

            <button
              className="btn-primary"
              style={{
                height: "48px",
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
              }}
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              ⭐ My Bookmarks
            </button>
          </div>
        </div>

        {/* JOB CARDS */}
        {isAdmin && <UploadJobCard refreshJobs={fetchJobs} />}
        <h2
          style={{
            marginBottom: "30px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Latest Job & Internship Opportunities
        </h2>

        {paginatedJobs.length === 0 ? (
          <div
            className="glass"
            style={{
              padding: "50px",
              textAlign: "center",
              borderRadius: "22px",
              marginTop: "30px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>No Opportunities Yet</h3>

            <p
              style={{
                opacity: "0.75",
                fontSize: "14px",
                maxWidth: "420px",
                margin: "auto",
              }}
            >
              Looks like there are no job or internship listings available at
              the moment. Check back soon — new opportunities are added
              regularly 🚀
            </p>
          </div>
        ) : (
          <JobCard
            jobs={paginatedJobs}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            isAdmin={isAdmin}
            deleteJob={deleteJob}
          />
        )}

        {/* PAGINATION */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                className={`pagination-btn ${
                  currentPage === page ? "active-page" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "80px 0",
          }}
        />

        <JobsSources />

        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "80px 0",
          }}
        />

        {/* CTA SECTION */}

        <div
          className="glass"
          style={{
            marginTop: "100px",
            padding: "50px 30px",
            textAlign: "center",
            borderRadius: "24px",
            maxWidth: "850px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              opacity: 0.85,
              maxWidth: "680px",
              margin: "auto",
              fontWeight: "400",
            }}
          >
            We're continuously improving the <b>Student Tools</b> section to
            make your academic journey{" "}
            <span style={{ color: "#6366f1", fontWeight: "600" }}>
              smarter, faster, and more productive
            </span>{" "}
            📚✨
            <br />
            <br />
            If you have an idea that could make this platform even better —
            don't keep it to yourself! 💡 Share your suggestion through the
            contact section and help us build the{" "}
            <b>ultimate study companion</b>
            together 🚀
          </p>

          <p
            style={{
              marginTop: "30px",
              fontSize: "16px",
              fontWeight: "600",
              opacity: 0.9,
            }}
          >
            What features would you like to see next?
          </p>

          <button
            className="btn-primary"
            style={{
              marginTop: "30px",
              padding: "14px 30px",
              fontSize: "15px",
              borderRadius: "40px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
              fontWeight: "600",
              letterSpacing: "0.3px",
            }}
            onClick={() => navigate("/contact-owner")}
          >
            💬 Send Your Suggestion
          </button>
        </div>
      </section>
    </>
  );
}
