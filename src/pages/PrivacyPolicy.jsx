import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
    <SEO
title="Privacy Policy – NextGen Study Hub"
url="https://www.atulsharmas.in/privacy-policy"
/>
      <Helmet>
        <title>
          Privacy Policy – Data Protection & User Privacy | NextGen Study Hub
        </title>

        <meta
          name="description"
          content="Read the privacy policy of NextGen Study Hub to understand how user data is collected, used and protected. Learn about cookies, data security and user privacy on our student learning platform."
        />

        <meta
          name="keywords"
          content="
privacy policy nextgen study hub,
website privacy policy,
student platform privacy policy,
education website privacy policy,
user data protection policy,
website data privacy policy,
student website privacy information,
engineering study platform privacy policy,
education platform privacy rules,
user privacy protection website,
data collection policy website,
cookie policy website,
online platform privacy policy,
student learning platform privacy policy,
education website data protection,
user information protection policy,
website security policy,
privacy policy for education platform,
student academic platform privacy policy,
website legal privacy terms
"
        />

        <link
          rel="canonical"
          href="https://www.atulsharmas.in/privacy-policy"
        />
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
          Privacy Policy
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
          This privacy policy explains how NextGen Study Hub collects, uses and
          protects user information when accessing the platform, tools and
          learning resources.
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
            Privacy Policy
          </h1>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            At NextGen Study Hub, we value the privacy of our visitors. This
            Privacy Policy document explains what information may be collected
            when you use the website and how that information is used. The goal
            is to keep the platform simple, transparent, and respectful of user
            privacy.
          </p>

          <h3 style={{ marginTop: "25px" }}>Information We May Collect</h3>
          <p style={{ opacity: 0.85 }}>
            While using this website, certain basic information may be collected
            to help the platform function properly. This may include information
            such as an email address (for login or authentication), basic usage
            activity within study tools, and interactions with features like
            quizzes or academic utilities.
          </p>

          <h3 style={{ marginTop: "25px" }}>How This Information Is Used</h3>
          <p style={{ opacity: 0.85 }}>
            The information collected is used only for improving the platform
            and providing its features. This includes maintaining account
            access, improving study tools, ensuring security, and understanding
            how users interact with the platform so the experience can be
            improved over time.
          </p>

          <h3 style={{ marginTop: "25px" }}>
            Cookies and Third-Party Services
          </h3>
          <p style={{ opacity: 0.85 }}>
            Like many websites, NextGen Study Hub may use cookies to improve
            user experience and analyze general site activity. In the future,
            the site may also display advertisements through services such as
            Google AdSense. Third-party vendors, including Google, may use
            cookies to show ads based on a user's visit to this and other
            websites.
          </p>

          <h3 style={{ marginTop: "25px" }}>Data Security</h3>
          <p style={{ opacity: 0.85 }}>
            The platform uses secure third-party services, such as Supabase, to
            manage authentication and data storage. Reasonable measures are
            taken to protect user information and keep the platform secure.
          </p>

          <h3 style={{ marginTop: "25px" }}>External Links</h3>
          <p style={{ opacity: 0.85 }}>
            This website may occasionally contain links to external websites,
            learning resources, or tools. Please note that we do not have
            control over the privacy practices of those external sites.
          </p>

          <h3 style={{ marginTop: "25px" }}>User Consent</h3>
          <p style={{ opacity: 0.85 }}>
            By using this website, you agree to this Privacy Policy and the way
            information may be used as described above.
          </p>

          <h3 style={{ marginTop: "25px" }}>Updates to This Policy</h3>
          <p style={{ opacity: 0.85 }}>
            This Privacy Policy may be updated occasionally to reflect platform
            improvements or policy changes. Any updates will be posted on this
            page.
          </p>

          {/* CONTACT BUTTON */}

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link to="/contact-owner">
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
