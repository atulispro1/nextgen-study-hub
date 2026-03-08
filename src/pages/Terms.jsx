import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms and Conditions – NextGen Study Hub"
        url="https://www.atulsharmas.in/terms"
      />
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

      {/* HEADER */}

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
          These Terms and Conditions describe the rules and guidelines for using
          NextGen Study Hub and accessing its learning resources, study
          materials, and academic tools.
        </p>
      </section>

      {/* TERMS CONTENT */}

      <section className="section">
        <div
          className="glass"
          style={{
            maxWidth: "900px",
            margin: "auto",
            padding: "50px",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Terms & Conditions for NextGen Study Hub
          </h2>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85, lineHeight: "1.8" }}>
            By accessing or using NextGen Study Hub, you agree to follow the
            terms outlined on this page. These terms are designed to maintain a
            safe, respectful, and useful learning environment for all users who
            access the platform.
          </p>

          {/* ACCEPTABLE USE */}

          <h3 style={{ marginTop: "30px" }}>Acceptable Use</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Visitors are expected to use this website responsibly and only for
            lawful purposes. Users should not attempt to misuse the platform,
            disrupt services, upload harmful content, or attempt unauthorized
            access to any part of the website or its systems.
          </p>

          {/* CONTENT USAGE */}

          <h3 style={{ marginTop: "30px" }}>Use of Educational Content</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            All study materials, notes, tools, blog articles, and learning
            resources provided on this website are intended strictly for
            educational and reference purposes. Students may use the material to
            support their studies, but copying, redistributing, or republishing
            the content without permission is not allowed.
          </p>

          {/* INTELLECTUAL PROPERTY */}

          <h3 style={{ marginTop: "30px" }}>Intellectual Property</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            All content available on NextGen Study Hub, including text,
            graphics, layout, and tools, is the intellectual property of the
            website unless otherwise stated. Unauthorized reproduction or
            commercial use of any material may violate copyright laws.
          </p>

          {/* ACCURACY OF INFORMATION */}

          <h3 style={{ marginTop: "30px" }}>Accuracy of Information</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            While efforts are made to ensure the accuracy of the information
            presented on the platform, the website does not guarantee that all
            content is completely error-free or up to date. Educational
            materials should be used as a reference alongside official course
            materials and textbooks.
          </p>

          {/* THIRD PARTY LINKS */}

          <h3 style={{ marginTop: "30px" }}>External Links</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            The website may occasionally include links to external educational
            resources or third-party websites. These links are provided for
            convenience and informational purposes. NextGen Study Hub does not
            control or take responsibility for the content, policies, or
            practices of external websites.
          </p>

          {/* ADS AND SERVICES */}

          <h3 style={{ marginTop: "30px" }}>
            Advertising and Third-Party Services
          </h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            In the future, this website may display advertisements or integrate
            services provided by third-party platforms such as Google AdSense or
            analytics tools. These services may use cookies or tracking
            technologies to improve user experience and deliver relevant
            advertisements.
          </p>

          {/* LIMITATION OF LIABILITY */}

          <h3 style={{ marginTop: "30px" }}>Limitation of Liability</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            NextGen Study Hub provides educational content in good faith to help
            students learn and prepare for exams. However, the website cannot be
            held responsible for any decisions, outcomes, or results that may
            occur from using the information available on the platform.
          </p>

          {/* PLATFORM CHANGES */}

          <h3 style={{ marginTop: "30px" }}>
            Platform Updates and Availability
          </h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            The platform may occasionally undergo updates, improvements, or
            maintenance. Features, content, or sections of the website may be
            modified, added, or removed to improve the learning experience.
          </p>

          {/* POLICY CHANGES */}

          <h3 style={{ marginTop: "30px" }}>Changes to These Terms</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            These Terms and Conditions may be updated periodically as the
            platform evolves. Any modifications will be posted on this page so
            users can review the most current version.
          </p>

          {/* CONTACT */}

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link to="/contact-owner">
              <button
                className="btn-primary"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
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
