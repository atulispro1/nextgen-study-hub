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
          Preparing for SSC CGL while managing college studies may seem
          overwhelming. But thousands of students clear SSC CGL every year
          while still completing graduation.
        </p>

        <p>
          The real challenge is not difficulty.  
          The real challenge is time management and smart prioritization.
        </p>

        <div className="highlight-box">
          You don’t need 8–10 hours daily.  
          You need structured preparation + consistency for 12–18 months.
        </div>
      </div>

      {/* UNDERSTAND EXAM */}
      <div className="blog-section">
        <h2>Understand SSC CGL Exam Structure First</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Tier 1</td>
              <td>Objective (100 Questions)</td>
            </tr>
            <tr>
              <td>Tier 2</td>
              <td>Advanced Objective</td>
            </tr>
            <tr>
              <td>Subjects</td>
              <td>Quant, Reasoning, English, GA</td>
            </tr>
          </tbody>
        </table>

        <div className="info-card">
          SSC is not conceptually difficult. It is competitive.
          Speed + Accuracy decide rank.
        </div>
      </div>

      {/* ROADMAP */}
      <div className="blog-section">
        <h2>18-Month Realistic Preparation Roadmap</h2>

        <h3>Phase 1 (Months 1–6) — Build Foundation</h3>
        <ul>
          <li>Complete Quant basics (Arithmetic + Algebra)</li>
          <li>Master basic Reasoning concepts</li>
          <li>Improve English grammar fundamentals</li>
          <li>Start daily Current Affairs habit</li>
        </ul>

        <h3>Phase 2 (Months 7–12) — Practice & Speed</h3>
        <ul>
          <li>Start sectional mock tests</li>
          <li>Solve previous year papers topic-wise</li>
          <li>Improve calculation speed</li>
          <li>Revise weak topics weekly</li>
        </ul>

        <h3>Phase 3 (Months 13–18) — Mock Domination</h3>
        <ul>
          <li>Full-length mock tests</li>
          <li>Analyze every mistake</li>
          <li>Focus on accuracy attempts</li>
        </ul>

        <blockquote>
          SSC is a game of repetition. The more you practice, the more predictable it becomes.
        </blockquote>
      </div>

      {/* DAILY ROUTINE */}
      <div className="blog-section">
        <h2>Daily Routine While in College</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Morning</td>
              <td>1 Hour Quant Practice</td>
            </tr>
            <tr>
              <td>Afternoon</td>
              <td>30 Min Current Affairs</td>
            </tr>
            <tr>
              <td>Evening</td>
              <td>1–1.5 Hours Reasoning/English</td>
            </tr>
          </tbody>
        </table>

        <div className="highlight-box">
          2.5–3 focused hours daily for 1 year can make you exam-ready.
        </div>
      </div>

      {/* SUBJECT STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise Strategy</h2>

        <div className="info-card">
          <strong>Quantitative Aptitude:</strong>  
          Focus on Arithmetic first (Percentage, Ratio, Profit & Loss).
        </div>

        <div className="info-card">
          <strong>Reasoning:</strong>  
          Practice puzzles and seating arrangement daily.
        </div>

        <div className="info-card">
          <strong>English:</strong>  
          Improve vocabulary + grammar rules.
        </div>

        <div className="info-card">
          <strong>General Awareness:</strong>  
          Revise Static GK + 6 months Current Affairs.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Aspirants Make</h2>

        <ul>
          <li>Jumping between multiple coaching materials</li>
          <li>Ignoring mock analysis</li>
          <li>Over-studying but not practicing</li>
          <li>Neglecting college exams</li>
        </ul>

        <blockquote>
          Mock analysis is more important than mock test itself.
        </blockquote>
      </div>

      {/* MOCK STRATEGY */}
      <div className="blog-section">
        <h2>Mock Test Strategy</h2>

        <ul>
          <li>Start with 1 mock per week</li>
          <li>Increase to 3 mocks per week before exam</li>
          <li>Maintain error notebook</li>
          <li>Track improvement monthly</li>
        </ul>

        <div className="highlight-box">
          Accuracy above 85% is usually safe zone for Tier 1.
        </div>
      </div>

      {/* BALANCE COLLEGE + SSC */}
      <div className="blog-section">
        <h2>How to Balance College & SSC Preparation</h2>

        <ul>
          <li>Use early mornings for SSC</li>
          <li>Use commute time for revision</li>
          <li>Don’t ignore college internals</li>
          <li>Study consistently instead of extreme bursts</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is SSC CGL tough?</h4>
          <p>
            It is competitive, not conceptually tough.
            Speed and practice make the difference.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I crack SSC CGL without coaching?</h4>
          <p>
            Yes. With proper PYQs, mock tests, and discipline,
            self-study is enough.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many hours daily required?</h4>
          <p>
            2–4 focused hours consistently for 1–1.5 years.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is graduation mandatory?</h4>
          <p>
            Yes. Final year students can also apply.
          </p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          Cracking SSC CGL while studying in college is completely achievable.
          What matters most is disciplined execution over long period.
        </p>

        <div className="highlight-box">
          Start early.  
          Practice daily.  
          Analyze mocks seriously.  
          Stay consistent.  
          Results will follow.
        </div>
      </div>
    </BlogLayout>
  );
}