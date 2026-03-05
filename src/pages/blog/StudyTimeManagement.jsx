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
          Engineering students often complain: "There is no time."
          But the real problem is not lack of time — it is lack of structured planning.
        </p>

        <p>
          Between assignments, practicals, coding practice, exams,
          internships, and personal life — managing time becomes difficult.
        </p>

        <div className="highlight-box">
          Time management is not about doing more things.  
          It is about doing the right things at the right time.
        </div>
      </div>

      {/* WHY STUDENTS FAIL */}
      <div className="blog-section">
        <h2>Why Engineering Students Struggle With Time</h2>

        <ul>
          <li>No fixed daily routine</li>
          <li>Overuse of mobile & social media</li>
          <li>Last-minute assignment completion</li>
          <li>No priority system</li>
          <li>Studying without planning</li>
        </ul>

        <blockquote>
          If you don't plan your day, distractions will plan it for you.
        </blockquote>
      </div>

      {/* PRIORITY SYSTEM */}
      <div className="blog-section">
        <h2>Step 1: Use the 3-Level Priority Rule</h2>

        <h3>High Priority</h3>
        <ul>
          <li>Exam preparation</li>
          <li>Major assignments</li>
          <li>Internship work</li>
        </ul>

        <h3>Medium Priority</h3>
        <ul>
          <li>Skill development</li>
          <li>Practice coding</li>
        </ul>

        <h3>Low Priority</h3>
        <ul>
          <li>Social media scrolling</li>
          <li>Unplanned outings</li>
        </ul>

        <div className="info-card">
          Complete High Priority tasks before touching Medium or Low tasks.
        </div>
      </div>

      {/* IDEAL DAILY SCHEDULE */}
      <div className="blog-section">
        <h2>Ideal Daily Study Structure</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Morning</td>
              <td>1–2 Hours Core Subject Study</td>
            </tr>
            <tr>
              <td>Afternoon</td>
              <td>Classes / Lab Work</td>
            </tr>
            <tr>
              <td>Evening</td>
              <td>1 Hour Skill Development</td>
            </tr>
            <tr>
              <td>Night</td>
              <td>Revision (30–45 mins)</td>
            </tr>
          </tbody>
        </table>

        <div className="highlight-box">
          3–4 focused hours daily are enough if done consistently.
        </div>
      </div>

      {/* TIME BLOCKING */}
      <div className="blog-section">
        <h2>Use Time Blocking Technique</h2>

        <p>
          Instead of studying randomly, divide your day into blocks.
        </p>

        <ul>
          <li>50 minutes focused work</li>
          <li>10 minutes break</li>
          <li>Repeat cycle</li>
        </ul>

        <blockquote>
          Deep focus beats long hours.
        </blockquote>
      </div>

      {/* WEEKLY SYSTEM */}
      <div className="blog-section">
        <h2>Weekly Planning Strategy</h2>

        <ul>
          <li>Plan Sunday evening for the week</li>
          <li>Set 3 major goals per week</li>
          <li>Track progress daily</li>
        </ul>

        <div className="info-card">
          Small weekly improvements create big semester results.
        </div>
      </div>

      {/* DISTRACTION CONTROL */}
      <div className="blog-section">
        <h2>How to Reduce Distractions</h2>

        <ul>
          <li>Keep phone away during study</li>
          <li>Use app blockers</li>
          <li>Study in silent environment</li>
          <li>Set clear deadlines</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Time Management Mistakes</h2>

        <ul>
          <li>Studying only before exams</li>
          <li>Trying to multitask</li>
          <li>No revision time</li>
          <li>Unrealistic schedules</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>How many hours should engineering students study daily?</h4>
          <p>3–5 focused hours are sufficient.</p>
        </div>

        <div className="faq-box">
          <h4>Is multitasking effective?</h4>
          <p>No. Focus on one task at a time.</p>
        </div>

        <div className="faq-box">
          <h4>How to stay consistent?</h4>
          <p>Follow routine daily and track progress weekly.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Plan daily.  
          Focus deeply.  
          Avoid distractions.  
          Review weekly.  
          Stay consistent.
        </div>
      </div>
    </BlogLayout>
  );
}