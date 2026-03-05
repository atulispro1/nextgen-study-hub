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
          Railway exams (RRB NTPC, Group D, JE, ALP) are among the most
          competitive government exams in India. Every year, lakhs of candidates
          compete for limited vacancies.
        </p>

        <p>
          The good news? Railway exams are predictable and pattern-based.
          With the right preparation strategy, beginners can clear them.
        </p>

        <div className="highlight-box">
          Railway exams reward consistency and practice — not extreme intelligence.
        </div>
      </div>

      {/* EXAM STRUCTURE */}
      <div className="blog-section">
        <h2>Understand the Railway Exam Pattern</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Subjects</td>
              <td>Maths, Reasoning, General Awareness</td>
            </tr>
            <tr>
              <td>Mode</td>
              <td>Computer-Based Test (CBT)</td>
            </tr>
            <tr>
              <td>Negative Marking</td>
              <td>Yes (Usually 1/3 per wrong answer)</td>
            </tr>
          </tbody>
        </table>

        <div className="info-card">
          Speed + Accuracy + Time Management = Selection
        </div>
      </div>

      {/* FOUNDATION STRATEGY */}
      <div className="blog-section">
        <h2>Step 1: Build Strong Fundamentals</h2>

        <h3>Mathematics</h3>
        <ul>
          <li>Percentage</li>
          <li>Ratio & Proportion</li>
          <li>Profit & Loss</li>
          <li>Time & Work</li>
          <li>Simplification</li>
        </ul>

        <h3>Reasoning</h3>
        <ul>
          <li>Analogy</li>
          <li>Coding-Decoding</li>
          <li>Series</li>
          <li>Puzzles</li>
        </ul>

        <h3>General Awareness</h3>
        <ul>
          <li>Static GK</li>
          <li>Current Affairs (Last 6 months)</li>
          <li>Science basics</li>
        </ul>

        <blockquote>
          Do not rush to mocks before completing basics.
        </blockquote>
      </div>

      {/* 6-MONTH ROADMAP */}
      <div className="blog-section">
        <h2>6-Month Beginner Roadmap</h2>

        <h3>Month 1–2: Concept Building</h3>
        <ul>
          <li>Complete full Maths syllabus once</li>
          <li>Learn core reasoning topics</li>
          <li>Start daily current affairs</li>
        </ul>

        <h3>Month 3–4: Practice Mode</h3>
        <ul>
          <li>Topic-wise practice sets</li>
          <li>Start sectional tests</li>
          <li>Revise weak areas weekly</li>
        </ul>

        <h3>Month 5–6: Mock & Speed Training</h3>
        <ul>
          <li>Full-length mock tests</li>
          <li>Time-bound practice</li>
          <li>Analyze mistakes</li>
        </ul>

        <div className="highlight-box">
          Repetition is the key. Railway exams repeat patterns.
        </div>
      </div>

      {/* DAILY ROUTINE */}
      <div className="blog-section">
        <h2>Ideal Daily Study Routine</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Morning</td>
              <td>1.5 Hours Maths Practice</td>
            </tr>
            <tr>
              <td>Afternoon</td>
              <td>1 Hour Reasoning</td>
            </tr>
            <tr>
              <td>Evening</td>
              <td>1 Hour GK + Revision</td>
            </tr>
          </tbody>
        </table>

        <p>
          3–4 focused hours daily are enough if done consistently for 6 months.
        </p>
      </div>

      {/* MOCK STRATEGY */}
      <div className="blog-section">
        <h2>Mock Test Strategy</h2>

        <ul>
          <li>Start mocks after syllabus completion</li>
          <li>Attempt 2–3 mocks weekly</li>
          <li>Track accuracy percentage</li>
          <li>Maintain error notebook</li>
        </ul>

        <div className="info-card">
          Attempt only questions you are confident about due to negative marking.
        </div>
      </div>

      {/* TIME MANAGEMENT */}
      <div className="blog-section">
        <h2>Time Management in Exam</h2>

        <ul>
          <li>First 20 mins → Easy questions</li>
          <li>Next 30 mins → Moderate questions</li>
          <li>Last 10 mins → Review marked questions</li>
        </ul>

        <blockquote>
          Do not get stuck on one difficult question.
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Ignoring current affairs</li>
          <li>Attempting too many risky questions</li>
          <li>Not analyzing mocks</li>
          <li>Studying randomly without plan</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Railway exam tough?</h4>
          <p>
            It is moderate in difficulty but highly competitive.
            Consistent practice makes it manageable.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study daily?</h4>
          <p>3–5 focused hours daily for 6 months.</p>
        </div>

        <div className="faq-box">
          <h4>Are previous year papers important?</h4>
          <p>
            Extremely important. Railway exams follow repeated patterns.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can beginners crack it in first attempt?</h4>
          <p>
            Yes, with structured preparation and serious mock practice.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          Railway exams are not about brilliance.
          They are about discipline, speed, and smart practice.
        </p>

        <div className="highlight-box">
          Complete syllabus → Practice daily → Attempt mocks →
          Analyze mistakes → Revise repeatedly.
        </div>
      </div>
    </BlogLayout>
  );
}