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
          Procrastination is the silent enemy of exam success.
          You know you should study — but you delay.
        </p>

        <p>
          The issue is not laziness.
          It is fear, overwhelm, and lack of structure.
        </p>

        <div className="highlight-box">
          You don’t procrastinate because you are lazy.
          You procrastinate because you don’t know where to start.
        </div>
      </div>

      {/* WHY WE PROCRASTINATE */}
      <div className="blog-section">
        <h2>Why Students Procrastinate</h2>

        <ul>
          <li>Fear of difficult subjects</li>
          <li>Overthinking syllabus size</li>
          <li>Phone addiction</li>
          <li>No clear study plan</li>
        </ul>
      </div>

      {/* 5 STEP SYSTEM */}
      <div className="blog-section">
        <h2>5-Step Anti-Procrastination System</h2>

        <h3>Step 1: Start Small</h3>
        <p>Study for just 20 minutes. Momentum builds naturally.</p>

        <h3>Step 2: Break Subjects into Micro Tasks</h3>
        <ul>
          <li>Instead of "Study Maths"</li>
          <li>Write "Solve 10 percentage problems"</li>
        </ul>

        <h3>Step 3: Use 25-Minute Rule</h3>
        <p>25 minutes focus + 5 minutes break.</p>

        <h3>Step 4: Remove Distractions</h3>
        <ul>
          <li>Keep phone away</li>
          <li>Disable notifications</li>
        </ul>

        <h3>Step 5: Track Daily Wins</h3>
        <p>Track small achievements daily.</p>

        <blockquote>
          Action reduces anxiety.
        </blockquote>
      </div>

      {/* MINDSET */}
      <div className="blog-section">
        <h2>Mindset Shift Required</h2>

        <ul>
          <li>Progress over perfection</li>
          <li>Consistency over intensity</li>
          <li>Action over overthinking</li>
        </ul>

        <div className="info-card">
          Even 1 productive hour daily beats 0 hours for 10 days.
        </div>
      </div>

      {/* EXAM WEEK STRATEGY */}
      <div className="blog-section">
        <h2>During Exam Week</h2>

        <ul>
          <li>Study high-weightage topics first</li>
          <li>Solve previous year questions</li>
          <li>Revise short notes only</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes</h2>

        <ul>
          <li>Waiting for motivation</li>
          <li>Trying to study entire syllabus at once</li>
          <li>Studying without writing practice</li>
          <li>Sleeping late continuously</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is procrastination normal?</h4>
          <p>Yes. But it must be controlled.</p>
        </div>

        <div className="faq-box">
          <h4>How to stay motivated daily?</h4>
          <p>Focus on small progress, not big goals.</p>
        </div>

        <div className="faq-box">
          <h4>Can I fix procrastination quickly?</h4>
          <p>Yes, by starting with micro tasks consistently.</p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Start small.  
          Break tasks.  
          Focus deeply.  
          Remove distractions.  
          Repeat daily.
        </div>
      </div>
    </BlogLayout>
  );
}