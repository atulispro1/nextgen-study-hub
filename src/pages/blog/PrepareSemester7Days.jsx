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
          Preparing for semester exams in just 7 days may sound impossible —
          but it is absolutely doable if you follow a smart and focused
          strategy.
        </p>

        <p>
          Most students waste the first few days worrying or trying to study
          everything at once. That creates panic, not progress.
        </p>

        <div className="highlight-box">
          The secret to 7-day preparation is prioritization, structured
          time blocks, previous year paper focus, and active revision.
        </div>
      </div>

      {/* DAY 0 */}
      <div className="blog-section">
        <h2>Day 0: Before You Start</h2>

        <ul>
          <li>Collect complete syllabus</li>
          <li>Arrange previous 5-year question papers</li>
          <li>Gather short notes / class notes</li>
          <li>List subjects based on difficulty</li>
        </ul>

        <div className="info-card">
          <strong>Rank Subjects:</strong> Hard → Medium → Easy.
          Time allocation becomes smarter when difficulty is clear.
        </div>
      </div>

      {/* MASTER PLAN */}
      <div className="blog-section">
        <h2>The 7-Day Master Plan</h2>

        <h3>Day 1–2: High-Weightage Topics</h3>

        <ul>
          <li>Frequently asked chapters</li>
          <li>Important numericals</li>
          <li>Repeated theory questions</li>
        </ul>

        <div className="routine-box">
          Use the 50–10 Rule:
          <br />
          Study 50 minutes → Break 10 minutes.
        </div>

        <blockquote>
          Do not try to complete the entire book. Focus on what gives maximum
          marks.
        </blockquote>

        <h3>Day 3–4: Remaining Syllabus (Smartly)</h3>

        <ul>
          <li>Medium-weightage topics</li>
          <li>Important definitions</li>
          <li>Diagrams & formulas</li>
        </ul>

        <div className="info-card">
          For technical subjects: Solve problems step-by-step.  
          For theory subjects: Write answers in structured bullet format.
        </div>
      </div>

      {/* DAY 5 */}
      <div className="blog-section">
        <h2>Day 5: Previous Year Question Paper Day</h2>

        <p>This is the most important day.</p>

        <ul>
          <li>Solve 2 full previous year papers per subject</li>
          <li>Time yourself strictly</li>
          <li>Analyze repeated questions</li>
          <li>Revise weak topics immediately</li>
        </ul>

        <div className="highlight-box">
          Students who skip PYQs usually score average.
        </div>
      </div>

      {/* DAY 6 */}
      <div className="blog-section">
        <h2>Day 6: Revision + Weak Area Fix</h2>

        <ul>
          <li>Revise formulas</li>
          <li>Revise definitions</li>
          <li>Revise diagrams</li>
          <li>Strengthen weak chapters</li>
        </ul>

        <blockquote>
          Confidence is built through revision, not new learning.
        </blockquote>
      </div>

      {/* DAY 7 */}
      <div className="blog-section">
        <h2>Day 7: Final Revision Strategy</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Revise short notes</td>
              <td>2–3 hours</td>
            </tr>
            <tr>
              <td>Formula revision (3 times)</td>
              <td>Repeat cycles</td>
            </tr>
            <tr>
              <td>Practice key answers</td>
              <td>Once</td>
            </tr>
            <tr>
              <td>Sleep</td>
              <td>Minimum 6 hours</td>
            </tr>
          </tbody>
        </table>

        <div className="info-card">
          Never study overnight before exam. Sleep improves memory recall.
        </div>
      </div>

      {/* SUBJECT STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise Quick Strategy</h2>

        <div className="info-card">
          <strong>Mathematics:</strong> Practice 20–30 problems daily. Revise
          shortcuts.
        </div>

        <div className="info-card">
          <strong>Theory Subjects:</strong> Write answers in bullet points.
          Underline keywords.
        </div>

        <div className="info-card">
          <strong>Lab Subjects:</strong> Revise syntax and logic clearly.
        </div>
      </div>

      {/* PRESENTATION */}
      <div className="blog-section">
        <h2>How to Write Answers for More Marks</h2>

        <ul>
          <li>Start with short introduction</li>
          <li>Use headings</li>
          <li>Write in points</li>
          <li>Underline keywords</li>
          <li>Draw diagrams if possible</li>
        </ul>

        <div className="highlight-box">
          Presentation can increase your marks even if your content is average.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes in 7-Day Preparation</h2>

        <ul>
          <li>Trying to complete entire book</li>
          <li>Ignoring previous year papers</li>
          <li>No writing practice</li>
          <li>Sleeping too less</li>
          <li>Panicking</li>
        </ul>

        <blockquote>
          Panic wastes energy. Planning saves energy.
        </blockquote>
      </div>

      {/* DAILY TIME TABLE */}
      <div className="blog-section">
        <h2>Realistic Daily Time Distribution</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Morning</td>
              <td>3 Hours (New Topics)</td>
            </tr>
            <tr>
              <td>Afternoon</td>
              <td>2 Hours (Practice)</td>
            </tr>
            <tr>
              <td>Evening</td>
              <td>3 Hours (Revision)</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total: 8 focused hours.  
          Remember: Quality &gt; Quantity.
        </p>
      </div>

      {/* MENTAL STRATEGY */}
      <div className="blog-section">
        <h2>Mental Strategy for Last Week</h2>

        <ul>
          <li>Avoid negative comparison</li>
          <li>Limit social media</li>
          <li>Focus on execution</li>
          <li>Stay calm</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <h4>Is 7 days enough?</h4>
        <p>Yes, if you focus on high-weightage and PYQs.</p>

        <h4>Should I skip difficult chapters?</h4>
        <p>Skip low-weightage topics, not important ones.</p>

        <h4>How many hours daily?</h4>
        <p>7–9 focused hours with structured breaks.</p>

        <h4>Are previous year papers important?</h4>
        <p>Extremely important. They reveal exam patterns.</p>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          Preparing in 7 days is not about covering everything — it is about
          covering the right things.
        </p>

        <div className="highlight-box">
          7 days is short.  
          But smart strategy makes it powerful.
        </div>
      </div>
    </BlogLayout>
  );
}