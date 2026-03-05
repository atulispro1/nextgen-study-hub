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
          Railway NTPC (Non-Technical Popular Categories) is conducted by RRB
          to recruit candidates for posts like Clerk, Traffic Assistant,
          Station Master, and Commercial Apprentice.
        </p>

        <p>
          It is one of the most applied government exams in India.
          Lakhs of students compete for limited vacancies.
        </p>

        <div className="highlight-box">
          Railway NTPC rewards speed, accuracy, and smart revision.
        </div>
      </div>

      {/* EXAM PATTERN */}
      <div className="blog-section">
        <h2>Railway NTPC Exam Pattern</h2>

        <h3>CBT 1</h3>
        <ul>
          <li>General Awareness – 40 Questions</li>
          <li>Mathematics – 30 Questions</li>
          <li>General Intelligence & Reasoning – 30 Questions</li>
          <li>Total: 100 Questions</li>
          <li>Negative Marking: 1/3</li>
        </ul>

        <h3>CBT 2</h3>
        <ul>
          <li>Same subjects but higher difficulty</li>
          <li>Total: 120 Questions</li>
        </ul>

        <h3>Typing Skill Test / CBAT (for some posts)</h3>

        <blockquote>
          CBT 1 filters candidates.  
          CBT 2 decides serious competition.
        </blockquote>
      </div>

      {/* SUBJECT STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise Preparation Strategy</h2>

        <h3>1. Mathematics</h3>
        <ul>
          <li>Percentage</li>
          <li>Ratio & Proportion</li>
          <li>Time & Work</li>
          <li>Profit & Loss</li>
          <li>Simplification</li>
          <li>Number System</li>
        </ul>

        <p>
          Practice calculation speed daily.
        </p>

        <h3>2. General Awareness</h3>
        <ul>
          <li>Current Affairs (6–12 months)</li>
          <li>Indian History</li>
          <li>Geography</li>
          <li>Polity</li>
          <li>Science Basics</li>
        </ul>

        <h3>3. Reasoning</h3>
        <ul>
          <li>Series</li>
          <li>Coding-Decoding</li>
          <li>Puzzles</li>
          <li>Blood Relations</li>
          <li>Seating Arrangement</li>
        </ul>
      </div>

      {/* DAILY STUDY PLAN */}
      <div className="blog-section">
        <h2>Daily 5-Hour Study Plan</h2>

        <h3>2 Hours – Mathematics + Reasoning</h3>
        <p>Practice 60+ questions daily.</p>

        <h3>1.5 Hours – General Awareness</h3>
        <p>Revise static GK + current affairs.</p>

        <h3>1.5 Hours – Mock Test & Analysis</h3>
        <p>Analyze mistakes and weak areas.</p>

        <div className="highlight-box">
          Mock test analysis improves rank significantly.
        </div>
      </div>

      {/* 4 MONTH PLAN */}
      <div className="blog-section">
        <h2>4-Month Preparation Plan</h2>

        <h3>Month 1</h3>
        <p>Complete basic syllabus of all subjects.</p>

        <h3>Month 2</h3>
        <p>Topic-wise practice + sectional tests.</p>

        <h3>Month 3</h3>
        <p>Full-length mock tests.</p>

        <h3>Month 4</h3>
        <p>Revision + speed improvement.</p>

        <blockquote>
          Revision is more important than new learning.
        </blockquote>
      </div>

      {/* TYPING TEST */}
      <div className="blog-section">
        <h2>Typing Skill Test Preparation</h2>

        <ul>
          <li>Practice daily typing for 20–30 minutes</li>
          <li>Target 35–40 WPM speed</li>
          <li>Maintain accuracy above 90%</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Ignoring current affairs</li>
          <li>Not practicing full mocks</li>
          <li>Focusing only on maths</li>
          <li>Skipping revision</li>
        </ul>
      </div>

      {/* CUT-OFF FACTOR */}
      <div className="blog-section">
        <h2>Understanding Cut-Off</h2>

        <p>
          Cut-off depends on:
        </p>

        <ul>
          <li>Number of vacancies</li>
          <li>Difficulty level</li>
          <li>Number of applicants</li>
        </ul>

        <div className="highlight-box">
          Aim for 85%+ accuracy to stay safe.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Railway NTPC tough?</h4>
          <p>Moderate level, but competition is high.</p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study?</h4>
          <p>4–6 focused hours daily are sufficient.</p>
        </div>

        <div className="faq-box">
          <h4>Is coaching necessary?</h4>
          <p>No, self-study + mock tests can be enough.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Focus on speed and accuracy.  
          Practice mock tests regularly.  
          Revise GK consistently.  
          Stay disciplined.  
          Railway NTPC is achievable with structured preparation.
        </div>
      </div>

    </BlogLayout>
  );
}