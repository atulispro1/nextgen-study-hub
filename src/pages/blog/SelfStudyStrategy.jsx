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
          Many students believe that clearing competitive exams or scoring high
          marks is only possible through expensive coaching institutes.
        </p>

        <p>
          The reality is different. Thousands of toppers every year succeed
          through disciplined self-study.
        </p>

        <div className="highlight-box">
          Coaching provides direction.  
          Self-study builds strength.
        </div>
      </div>

      {/* WHY SELF STUDY WORKS */}
      <div className="blog-section">
        <h2>Why Self-Study Can Be Powerful</h2>

        <ul>
          <li>Flexible schedule</li>
          <li>Cost-effective</li>
          <li>Personalized pace</li>
          <li>Better focus and independence</li>
        </ul>

        <blockquote>
          Discipline matters more than classroom attendance.
        </blockquote>
      </div>

      {/* STEP BY STEP STRATEGY */}
      <div className="blog-section">
        <h2>Step-by-Step Self-Study Strategy</h2>

        <h3>Step 1: Understand the Syllabus Clearly</h3>
        <p>
          Download official syllabus and break it into smaller topics.
        </p>

        <h3>Step 2: Choose Limited Study Material</h3>
        <ul>
          <li>1–2 trusted books</li>
          <li>Previous year papers</li>
          <li>Monthly current affairs (if required)</li>
        </ul>

        <h3>Step 3: Create a Realistic Timetable</h3>
        <p>
          Avoid unrealistic 12-hour plans. Start with 4–6 focused hours.
        </p>

        <h3>Step 4: Daily Practice</h3>
        <p>
          Practice MCQs, coding problems, or writing answers daily.
        </p>

        <div className="highlight-box">
          Consistency beats intensity.
        </div>
      </div>

      {/* DAILY STUDY STRUCTURE */}
      <div className="blog-section">
        <h2>Ideal Daily Study Structure</h2>

        <h3>Morning (2 Hours)</h3>
        <p>Learn new concepts.</p>

        <h3>Afternoon (2 Hours)</h3>
        <p>Practice problems or MCQs.</p>

        <h3>Evening (1–2 Hours)</h3>
        <p>Revision and mock tests.</p>
      </div>

      {/* HOW TO AVOID DISTRACTIONS */}
      <div className="blog-section">
        <h2>How to Avoid Distractions During Self-Study</h2>

        <ul>
          <li>Keep phone away while studying</li>
          <li>Use Pomodoro technique (25-5 method)</li>
          <li>Study in fixed place</li>
          <li>Limit social media usage</li>
        </ul>
      </div>

      {/* RESOURCES */}
      <div className="blog-section">
        <h2>Best Free Resources for Self-Study</h2>

        <ul>
          <li>YouTube structured playlists</li>
          <li>NCERT books (for GK exams)</li>
          <li>Online coding platforms</li>
          <li>Previous year question papers</li>
        </ul>
      </div>

      {/* REVISION STRATEGY */}
      <div className="blog-section">
        <h2>Revision Strategy</h2>

        <ul>
          <li>Weekly revision day</li>
          <li>Short notes preparation</li>
          <li>Monthly mock tests</li>
          <li>Error notebook maintenance</li>
        </ul>

        <blockquote>
          Without revision, self-study fails.
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Self-Study Mistakes</h2>

        <ul>
          <li>Studying without clear plan</li>
          <li>Watching too many videos without practice</li>
          <li>Skipping mock tests</li>
          <li>Comparing with others constantly</li>
        </ul>
      </div>

      {/* 90 DAY PLAN */}
      <div className="blog-section">
        <h2>90-Day Self-Study Plan</h2>

        <h3>Month 1</h3>
        <p>Complete basic concepts.</p>

        <h3>Month 2</h3>
        <p>Practice and solve questions daily.</p>

        <h3>Month 3</h3>
        <p>Full revision + mock tests.</p>

        <div className="highlight-box">
          90 days of disciplined study can transform your performance.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is coaching necessary to crack exams?</h4>
          <p>No, many students succeed through self-study.</p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study?</h4>
          <p>4–6 focused hours are enough if consistent.</p>
        </div>

        <div className="faq-box">
          <h4>How to stay motivated?</h4>
          <p>Set small goals and track daily progress.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Self-study builds independence.  
          Discipline creates results.  
          Focus daily.  
          Revise weekly.  
          Success without coaching is absolutely possible.
        </div>
      </div>

    </BlogLayout>
  );
}