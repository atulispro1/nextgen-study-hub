import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy – NextGen Study Hub"
        url="https://atulsharmas.in/privacy-policy"
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
          href="https://atulsharmas.in/privacy-policy"
        />
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
          This Privacy Policy explains how information may be collected, used
          and protected when visitors access NextGen Study Hub and its learning
          resources.
        </p>
      </section>

      {/* POLICY CONTENT */}

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
            Privacy Policy for NextGen Study Hub
          </h2>

          <p style={{ marginBottom: "20px", opacity: 0.85 }}>
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <p style={{ marginBottom: "20px", opacity: 0.85, lineHeight: "1.8" }}>
            At NextGen Study Hub, protecting visitor privacy is important. This
            Privacy Policy describes what types of information may be collected
            when users interact with the website and how that information may be
            used to improve the experience. The goal of this platform is to
            provide educational resources while maintaining transparency and
            respect for user privacy.
          </p>

          {/* INFORMATION COLLECTION */}

          <h3 style={{ marginTop: "30px" }}>Information We May Collect</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            When visitors use this website, certain non-personal information may
            be collected automatically. This may include browser type, device
            information, pages visited, and time spent on the website. This data
            is collected to understand how the platform is being used and to
            improve the overall learning experience.
          </p>

          <p style={{ opacity: 0.85, lineHeight: "1.8", marginTop: "10px" }}>
            If users interact with features such as tools, quizzes, or login
            systems, limited information like email address or account data may
            be stored securely for authentication and functionality purposes.
          </p>

          {/* HOW INFORMATION IS USED */}

          <h3 style={{ marginTop: "30px" }}>How Information Is Used</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Information collected through the platform is used to maintain and
            improve the website. This may include improving content, enhancing
            tools, analyzing visitor behavior and ensuring the security of the
            platform.
          </p>

          <p style={{ opacity: 0.85, lineHeight: "1.8", marginTop: "10px" }}>
            Data is never sold or shared with third parties for unrelated
            purposes. Any information collected is used only to support the
            operation and improvement of the website.
          </p>

          {/* COOKIES */}

          <h3 style={{ marginTop: "30px" }}>Cookies</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Like many websites, NextGen Study Hub may use cookies to store basic
            visitor preferences and to optimize the user experience. Cookies
            help the website understand how visitors interact with different
            sections so the platform can be improved over time.
          </p>

          {/* GOOGLE ANALYTICS */}

          <h3 style={{ marginTop: "30px" }}>Google Analytics</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            This website may use Google Analytics to understand how visitors use
            the site. Google Analytics collects anonymous information such as
            page visits, device type and general usage patterns. This data helps
            improve content quality and overall user experience.
          </p>

          {/* GOOGLE ADSENSE */}

          <h3 style={{ marginTop: "30px" }}>Google AdSense and Advertising</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            In the future, this website may display advertisements through
            Google AdSense or other advertising networks. Google may use cookies
            or web beacons to display ads based on user visits to this and other
            websites. Users may choose to disable cookies through their browser
            settings if they prefer not to receive personalized advertisements.
          </p>

          {/* DATA SECURITY */}

          <h3 style={{ marginTop: "30px" }}>Data Security</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Reasonable security measures are used to protect user information.
            Secure third-party services such as Supabase may be used to manage
            authentication and database systems to ensure that stored data is
            handled responsibly.
          </p>

          {/* EXTERNAL LINKS */}

          <h3 style={{ marginTop: "30px" }}>External Links</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            NextGen Study Hub may contain links to external educational
            resources or third-party websites. Please note that we do not
            control the privacy policies of external websites. Users are
            encouraged to review the privacy policies of those websites
            separately.
          </p>

          {/* CHILDREN INFORMATION */}

          <h3 style={{ marginTop: "30px" }}>Children's Information</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            Protecting children's privacy online is important. This website does
            not knowingly collect personal information from children under the
            age of 13. If a parent or guardian believes that a child has
            provided personal information through the platform, they may contact
            us to have that information removed.
          </p>

          {/* USER CONSENT */}

          <h3 style={{ marginTop: "30px" }}>User Consent</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            By using this website, visitors consent to this Privacy Policy and
            the way information may be collected and used as described above.
          </p>

          {/* POLICY UPDATES */}

          <h3 style={{ marginTop: "30px" }}>Policy Updates</h3>

          <p style={{ opacity: 0.85, lineHeight: "1.8" }}>
            This Privacy Policy may be updated occasionally to reflect changes
            in the website or legal requirements. Any updates will be published
            on this page so visitors can stay informed about how information is
            handled.
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
