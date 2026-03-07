import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>
          Terms and Conditions – Website Usage Terms | NextGen Study Hub
        </title>

        <meta
          name="description"
          content="Read the terms and conditions for using NextGen Study Hub. Understand the rules, user responsibilities and policies for accessing our student tools, study materials and academic resources."
        />

        <meta
          name="keywords"
          content="
terms and conditions nextgen study hub,
website terms and conditions,
education platform terms of use,
student website terms and policies,
engineering study platform terms,
user agreement website,
student platform usage rules,
education website legal terms,
student learning platform terms,
engineering education platform terms,
website usage terms and conditions,
student platform legal policy,
education website rules,
online learning platform terms,
user responsibilities website terms,
website service terms policy,
student academic platform terms,
website legal agreement,
student education website terms,
terms of service nextgen study hub
"
        />

        <link rel="canonical" href="https://www.atulsharmas.in/terms" />
      </Helmet>

      <section
        style={{
          padding: "clamp(40px,6vw,80px)",
          borderRadius: "24px",
          marginBottom: "70px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.2rem,5vw,3rem)",
            fontWeight: "900",
            marginBottom: "20px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6,#22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Terms and Conditions
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "auto",
            fontSize: "clamp(15px,2vw,18px)",
            opacity: "0.85",
            lineHeight: "1.8",
          }}
        >
          These terms and conditions explain the rules and guidelines for using
          NextGen Study Hub and accessing the platform’s study materials, tools
          and resources.
        </p>
      </section>

      <section className="section">
        <div 

          className="glass"
          style={{
            maxWidth: "900px",
            margin: "auto",
            padding: "50px",
          }}
          >
        
          <h1
            style={{
              marginBottom: "30px",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Terms & Conditions
          </h1>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            These Terms and Conditions outline the basic rules for using NextGen
            Study Hub. By accessing or using this website, you agree to follow
            these terms. If you do not agree with any part of these terms, you
            may choose not to use the platform.
          </p>

          <h3 style={{ marginTop: "25px" }}>Use of Content</h3>
          <p style={{ opacity: 0.85 }}>
            The study materials, notes, assignments, quizzes, and tools provided
            on this website are intended for educational and reference purposes.
            Students are welcome to use the content to support their learning,
            but it should not be redistributed or republished without
            permission.
          </p>

          <h3 style={{ marginTop: "25px" }}>User Responsibility</h3>
          <p style={{ opacity: 0.85 }}>
            Users are expected to use the platform responsibly. Any misuse of
            the platform, including uploading harmful content, attempting to
            disrupt services, or violating applicable laws, may result in
            restricted access to the website.
          </p>

          <h3 style={{ marginTop: "25px" }}>Platform Availability</h3>
          <p style={{ opacity: 0.85 }}>
            While we try to keep the platform accessible and updated, NextGen
            Study Hub may occasionally undergo updates, maintenance, or changes.
            Some features may be modified or improved over time to provide a
            better learning experience.
          </p>

          <h3 style={{ marginTop: "25px" }}>External Resources</h3>
          <p style={{ opacity: 0.85 }}>
            This website may include links to external educational resources or
            third-party platforms. We do not control those websites and cannot
            guarantee their content or privacy practices.
          </p>

          <h3 style={{ marginTop: "25px" }}>Disclaimer</h3>
          <p style={{ opacity: 0.85 }}>
            The information and materials available on this website are provided
            in good faith for learning purposes. However, NextGen Study Hub does
            not guarantee absolute accuracy or completeness of all materials,
            and the website is provided on an “as is” basis.
          </p>

          <h3 style={{ marginTop: "25px" }}>Updates to These Terms</h3>
          <p style={{ opacity: 0.85 }}>
            These Terms and Conditions may be updated occasionally as the
            platform evolves. Any updates will be reflected on this page.
          </p>

          {/* CONTACT BUTTON */}

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link to="/contact">
              <button
                className="btn-primary"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        
      </section>
    </>
  );
}
