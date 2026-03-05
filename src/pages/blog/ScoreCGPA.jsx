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
          Scoring 8+ CGPA in Diploma Computer Science is not about studying
          10–12 hours daily. It is about studying smart, understanding exam
          patterns, and building consistency over the entire semester.
        </p>
        <p>
          The difference between a 6 CGPA student and an 8.5 CGPA student is
          not intelligence — it is strategy, discipline, and execution.
        </p>

        <div className="highlight-box">
          High CGPA is not luck. It is structured effort applied consistently.
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="blog-section">
        <h2>How CGPA Actually Works</h2>

        <p>CGPA depends on:</p>

        <ul>
          <li>Grade points in each subject</li>
          <li>Credit weightage of each subject</li>
          <li>Internal + external marks</li>
        </ul>

        <div className="info-card">
          <strong>Important Insight:</strong> Core subjects like Data
          Structures, DBMS, Programming & Mathematics usually carry higher
          credit weightage. Focus more on them.
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="blog-section">
        <h2>The Biggest Mistake Students Make</h2>

        <ul>
          <li>Studying only 10 days before exams</li>
          <li>Ignoring internal assessments</li>
          <li>Reading without solving questions</li>
          <li>No structured revision system</li>
        </ul>

        <blockquote>
          Last-minute studying builds stress. Semester-long preparation builds
          results.
        </blockquote>
      </div>

      {/* SECTION 3 */}
      <div className="blog-section">
        <h2>Smart Semester Strategy</h2>

        <h3>Step 1 — Syllabus Breakdown</h3>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>High-Weightage Topics</td>
              <td>60% Study Time</td>
            </tr>
            <tr>
              <td>Conceptual Topics</td>
              <td>30% Study Time</td>
            </tr>
            <tr>
              <td>Low-Priority Topics</td>
              <td>10% Study Time</td>
            </tr>
          </tbody>
        </table>

        <h3>Step 2 — Smart Notes Strategy</h3>
        <ul>
          <li>Maintain separate formula notebook</li>
          <li>Create 2-page unit summaries</li>
          <li>Highlight repeated PYQs</li>
          <li>Use diagrams wherever possible</li>
        </ul>
      </div>

      {/* SECTION 4 */}
      <div className="blog-section">
        <h2>Daily Study System (Realistic Plan)</h2>

        <div className="routine-box">
          <p><strong>Morning (1 Hour)</strong> → Numerical / Programming Practice</p>
          <p><strong>Afternoon (30 Min)</strong> → Revision of Class Topics</p>
          <p><strong>Evening (1 Hour)</strong> → New Topic Learning</p>
        </div>

        <p>
          2.5 focused hours daily for 120 days = Massive improvement in
          performance.
        </p>
      </div>

      {/* SECTION 5 */}
      <div className="blog-section">
        <h2>30-Day Exam Master Plan</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Days 1–10</td>
              <td>Complete Full Syllabus Revision</td>
            </tr>
            <tr>
              <td>Days 11–20</td>
              <td>Solve 5-Year Previous Papers</td>
            </tr>
            <tr>
              <td>Days 21–25</td>
              <td>Focus on Weak Subjects</td>
            </tr>
            <tr>
              <td>Last 5 Days</td>
              <td>Quick Revision from Short Notes</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 6 */}
      <div className="blog-section">
        <h2>Internal Marks — Your Secret Weapon</h2>

        <ul>
          <li>Submit assignments before deadline</li>
          <li>Maintain 85%+ attendance</li>
          <li>Perform seriously in lab exams</li>
          <li>Score well in class tests</li>
        </ul>

        <div className="highlight-box">
          Even 5 extra internal marks per subject can increase CGPA by 0.5+
        </div>
      </div>

      {/* SECTION 7 */}
      <div className="blog-section">
        <h2>Previous Year Paper Strategy</h2>

        <ul>
          <li>Solve minimum 5 years papers</li>
          <li>Write answers in exam format</li>
          <li>Time yourself</li>
          <li>Analyze weak topics</li>
        </ul>
      </div>

      {/* SECTION 8 */}
      <div className="blog-section">
        <h2>Subject-Wise Performance Tips</h2>

        <div className="info-card">
          <strong>Mathematics:</strong> Practice daily. Revise formulas weekly.
        </div>

        <div className="info-card">
          <strong>Programming:</strong> Write code daily. Focus on logic
          building.
        </div>

        <div className="info-card">
          <strong>Theory Subjects:</strong> Write answers in points with
          diagrams.
        </div>
      </div>

      {/* SECTION 9 */}
      <div className="blog-section">
        <h2>Mindset Shift Required</h2>

        <blockquote>
          Consistency beats motivation. 2–3 hours daily beats 10 hours once a
          week.
        </blockquote>

        <ul>
          <li>Track your progress weekly</li>
          <li>Avoid comparison</li>
          <li>Focus on improvement</li>
        </ul>
      </div>

      {/* SECTION 10 */}
      <div className="blog-section">
        <h2>Advanced Tips for 9+ CGPA</h2>

        <ul>
          <li>Teach topics to friends</li>
          <li>Improve answer presentation</li>
          <li>Join focused study groups</li>
          <li>Track marks after every internal</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <h4>Is 8+ CGPA difficult?</h4>
        <p>No. Structured planning makes it achievable.</p>

        <h4>How many hours daily?</h4>
        <p>2–4 focused hours daily are enough.</p>

        <h4>Can average students score high?</h4>
        <p>Yes. Strategy matters more than intelligence.</p>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          Scoring 8+ CGPA is about working smarter, not harder. Prioritize,
          revise weekly, maximize internals, and practice previous papers.
        </p>

        <div className="highlight-box">
          Start today. Stay consistent. Improvement is a process.
        </div>
      </div>
    </BlogLayout>
  );
}