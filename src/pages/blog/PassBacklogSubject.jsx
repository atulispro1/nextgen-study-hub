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
          Having a backlog subject can feel stressful, embarrassing,
          and mentally exhausting. Many students start doubting themselves.
        </p>

        <p>
          But here is the truth:
          A backlog does NOT define your intelligence.
          It only shows that your strategy was wrong — not your capability.
        </p>

        <div className="highlight-box">
          Backlog subjects are not impossible.  
          They require a different preparation strategy.
        </div>
      </div>

      {/* WHY BACKLOG HAPPENS */}
      <div className="blog-section">
        <h2>Why Students Get Backlogs</h2>

        <ul>
          <li>Weak fundamentals</li>
          <li>Last-minute preparation</li>
          <li>Ignoring internal marks</li>
          <li>Exam anxiety</li>
          <li>Poor time management</li>
        </ul>

        <blockquote>
          Backlog is usually a preparation problem, not a talent problem.
        </blockquote>
      </div>

      {/* MINDSET RESET */}
      <div className="blog-section">
        <h2>Step 1: Reset Your Mindset</h2>

        <p>
          Before starting preparation, fix your mindset.
        </p>

        <ul>
          <li>Stop comparing with classmates</li>
          <li>Accept past mistake</li>
          <li>Focus only on upcoming attempt</li>
          <li>Remove negative self-talk</li>
        </ul>

        <div className="info-card">
          Confidence improves performance more than extra study hours.
        </div>
      </div>

      {/* ANALYZE SUBJECT */}
      <div className="blog-section">
        <h2>Step 2: Analyze the Subject Properly</h2>

        <p>
          Do not start studying blindly. Analyze first.
        </p>

        <ul>
          <li>Check previous year question papers</li>
          <li>Identify frequently repeated topics</li>
          <li>Mark high-weightage units</li>
          <li>Identify your weak areas</li>
        </ul>

        <div className="highlight-box">
          40–60% questions repeat in many diploma and engineering exams.
        </div>
      </div>

      {/* SMART 30 DAY PLAN */}
      <div className="blog-section">
        <h2>30-Day Backlog Recovery Plan</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Days 1–10</td>
              <td>Understand core concepts + build basics</td>
            </tr>
            <tr>
              <td>Days 11–20</td>
              <td>Solve previous year questions</td>
            </tr>
            <tr>
              <td>Days 21–25</td>
              <td>Revise weak topics</td>
            </tr>
            <tr>
              <td>Last 5 Days</td>
              <td>Quick revision + formula practice</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          Do not try to complete entire book.
          Focus on high-weightage and repeated topics.
        </blockquote>
      </div>

      {/* SUBJECT SPECIFIC STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Specific Approach</h2>

        <h3>For Mathematics / Numerical Subjects</h3>
        <ul>
          <li>Practice daily problems</li>
          <li>Revise formulas weekly</li>
          <li>Focus on step-by-step presentation</li>
        </ul>

        <h3>For Programming Subjects</h3>
        <ul>
          <li>Write code daily</li>
          <li>Understand logic deeply</li>
          <li>Practice common programs repeatedly</li>
        </ul>

        <h3>For Theory Subjects</h3>
        <ul>
          <li>Write answers in points</li>
          <li>Use headings and diagrams</li>
          <li>Revise definitions clearly</li>
        </ul>
      </div>

      {/* INTERNAL MARKS */}
      <div className="blog-section">
        <h2>Internal Marks Strategy</h2>

        <ul>
          <li>Attend all remedial classes</li>
          <li>Submit assignments on time</li>
          <li>Score high in class tests</li>
          <li>Maintain good attendance</li>
        </ul>

        <div className="highlight-box">
          Even 5 extra internal marks can help you clear backlog easily.
        </div>
      </div>

      {/* EXAM DAY STRATEGY */}
      <div className="blog-section">
        <h2>Exam Hall Strategy</h2>

        <ul>
          <li>Attempt easy questions first</li>
          <li>Keep answers structured</li>
          <li>Underline keywords</li>
          <li>Write clean and neat</li>
        </ul>

        <blockquote>
          Presentation improves marks significantly.
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes While Preparing for Backlog</h2>

        <ul>
          <li>Studying only last 5 days</li>
          <li>Ignoring previous year papers</li>
          <li>Skipping revision</li>
          <li>Over-stressing</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Can I clear backlog in one attempt?</h4>
          <p>Yes, with structured preparation and smart revision.</p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study daily?</h4>
          <p>3–5 focused hours consistently.</p>
        </div>

        <div className="faq-box">
          <h4>Is backlog harmful for career?</h4>
          <p>Not permanently. Clear it quickly and focus forward.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Accept mistake.  
          Analyze smartly.  
          Focus on high-weightage topics.  
          Practice previous papers.  
          Stay consistent.
        </div>
      </div>
    </BlogLayout>
  );
}