import BlogLayout from "../../components/BlogLayout";
import { allBlogs } from "../../data/allBlogs";
import { useParams } from "react-router-dom";

export default function BlogPage({ children }) {
  const { slug } = useParams();

  const blog = allBlogs.find((b) => b.slug === slug);

  return (
    <BlogLayout
      category={blog?.category}
      title={blog?.title}
      readTime="14 min read"
      image={blog?.image}
    >
      {/* INTRODUCTION */}
      <div className="blog-section">
        <h2>Introduction</h2>

        <p>
          Most diploma students wait until final year to start thinking about internships.
          That is a mistake.
        </p>

        <p>
          The best time to gain real-world experience is during 2nd year.
          At this stage, you have basic knowledge and enough time to improve before final placements.
        </p>

        <div className="highlight-box">
          Students who start internships in 2nd year are far ahead during final placements.
        </div>
      </div>

      {/* WHY 2ND YEAR */}
      <div className="blog-section">
        <h2>Why 2nd Year is the Perfect Time</h2>

        <ul>
          <li>You already understand core subjects</li>
          <li>You have 1–2 years to build experience</li>
          <li>You can explore different fields</li>
          <li>Companies prefer early learners</li>
        </ul>

        <blockquote>
          Early experience = Higher confidence + Better salary later.
        </blockquote>
      </div>

      {/* STEP BY STEP ROADMAP */}
      <div className="blog-section">
        <h2>Step-by-Step Internship Roadmap</h2>

        <h3>Step 1: Identify Your Field</h3>
        <ul>
          <li>Web Development</li>
          <li>App Development</li>
          <li>Data Analytics</li>
          <li>Digital Marketing</li>
          <li>Technical Support</li>
        </ul>

        <h3>Step 2: Build Basic Skills</h3>
        <ul>
          <li>Complete 1–2 online courses</li>
          <li>Practice small projects</li>
          <li>Understand fundamentals deeply</li>
        </ul>

        <div className="info-card">
          Companies hire skill-ready students, not just degree holders.
        </div>
      </div>

      {/* BUILD PROJECTS */}
      <div className="blog-section">
        <h2>Build 2–3 Strong Projects</h2>

        <p>
          Projects prove your practical knowledge.
        </p>

        <ul>
          <li>Portfolio Website</li>
          <li>Mini Management System</li>
          <li>Simple Web App</li>
          <li>Basic Data Analysis Dashboard</li>
        </ul>

        <div className="highlight-box">
          Even small but complete projects impress recruiters.
        </div>
      </div>

      {/* RESUME STRATEGY */}
      <div className="blog-section">
        <h2>Resume Strategy for Internship</h2>

        <ul>
          <li>Keep it 1 page</li>
          <li>Highlight projects clearly</li>
          <li>Add GitHub / LinkedIn</li>
          <li>Mention technical skills honestly</li>
        </ul>

        <blockquote>
          Internship resume should focus more on skills and projects than marks.
        </blockquote>
      </div>

      {/* LINKEDIN STRATEGY */}
      <div className="blog-section">
        <h2>Use LinkedIn Smartly</h2>

        <ul>
          <li>Create professional profile photo</li>
          <li>Write strong headline</li>
          <li>Post your project updates</li>
          <li>Connect with recruiters</li>
        </ul>

        <div className="info-card">
          Many internships are filled through LinkedIn networking.
        </div>
      </div>

      {/* COLD EMAIL */}
      <div className="blog-section">
        <h2>Cold Email Strategy (Underrated Method)</h2>

        <p>
          Many startups do not post internships publicly.
          You can directly email them.
        </p>

        <ul>
          <li>Keep email short</li>
          <li>Mention your skills</li>
          <li>Attach resume</li>
          <li>Provide project links</li>
        </ul>

        <div className="highlight-box">
          Send 50 quality emails → Expect 5–10 responses.
        </div>
      </div>

      {/* WHERE TO APPLY */}
      <div className="blog-section">
        <h2>Where to Apply for Internships</h2>

        <ul>
          <li>Internshala</li>
          <li>LinkedIn Jobs</li>
          <li>Indeed</li>
          <li>AngelList (Startups)</li>
          <li>Company career pages</li>
        </ul>
      </div>

      {/* INTERVIEW PREP */}
      <div className="blog-section">
        <h2>Prepare for Internship Interviews</h2>

        <ul>
          <li>Revise project details</li>
          <li>Prepare basic technical questions</li>
          <li>Practice communication skills</li>
          <li>Be confident but honest</li>
        </ul>

        <blockquote>
          Confidence + Clarity = Selection
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Waiting for college to arrange internship</li>
          <li>Not building projects</li>
          <li>Applying randomly without skills</li>
          <li>Giving up after few rejections</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is internship necessary in diploma?</h4>
          <p>
            Yes. It improves practical exposure and placement chances.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I get paid internship in 2nd year?</h4>
          <p>
            Yes, if your skills are strong and projects are impressive.
          </p>
        </div>

        <div className="faq-box">
          <h4>What if I don’t get internship?</h4>
          <p>
            Continue building projects and keep applying consistently.
          </p>
        </div>

        <div className="faq-box">
          <h4>Should I work for free?</h4>
          <p>
            If it provides real learning and experience, short-term unpaid internships can be beneficial.
          </p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          Getting an internship in 2nd year is completely possible.
          It requires planning, skill-building, and consistent application.
        </p>

        <div className="highlight-box">
          Learn skills.  
          Build projects.  
          Optimize resume.  
          Apply consistently.  
          Stay patient.
        </div>
      </div>
    </BlogLayout>
  );
}