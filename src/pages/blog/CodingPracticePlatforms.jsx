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
          Learning programming without practice is like learning driving without
          touching the steering wheel. You may understand concepts, but you won’t
          develop problem-solving skills.
        </p>

        <p>
          In 2026, competition for placements and internships is higher than ever.
          Companies test logic, data structures, and coding efficiency.
        </p>

        <div className="highlight-box">
          The right platform + consistent daily practice = Placement success.
        </div>
      </div>

      {/* WHY CODING PRACTICE IMPORTANT */}
      <div className="blog-section">
        <h2>Why Coding Practice is Important</h2>

        <ul>
          <li>Improves logical thinking</li>
          <li>Builds confidence for interviews</li>
          <li>Helps in competitive exams</li>
          <li>Strengthens Data Structures & Algorithms</li>
          <li>Improves coding speed and accuracy</li>
        </ul>

        <blockquote>
          Watching tutorials makes you comfortable.  
          Solving problems makes you capable.
        </blockquote>
      </div>

      {/* BEGINNER PLATFORMS */}
      <div className="blog-section">
        <h2>Best Platforms for Beginners</h2>

        <h3>1. HackerRank</h3>
        <p>
          Excellent for beginners. It provides structured problem categories
          like arrays, strings, loops, and basic algorithms.
        </p>
        <ul>
          <li>Beginner-friendly interface</li>
          <li>Language-wise practice</li>
          <li>Certificates available</li>
        </ul>

        <h3>2. CodeStudio (Coding Ninjas)</h3>
        <p>
          Very structured DSA roadmap for students.
        </p>

        <h3>3. GeeksforGeeks Practice</h3>
        <p>
          Good for theory + coding questions combination.
        </p>
      </div>

      {/* INTERMEDIATE PLATFORMS */}
      <div className="blog-section">
        <h2>Best Platforms for Intermediate Learners</h2>

        <h3>1. LeetCode</h3>
        <p>
          Most popular platform for placement preparation.
        </p>
        <ul>
          <li>Company-wise questions</li>
          <li>Interview patterns</li>
          <li>Huge community</li>
        </ul>

        <h3>2. CodeChef</h3>
        <p>
          Great for competitive programming and contests.
        </p>

        <h3>3. AtCoder</h3>
        <p>
          Structured contests for improving speed and logic.
        </p>
      </div>

      {/* ADVANCED PLATFORMS */}
      <div className="blog-section">
        <h2>Best Platforms for Advanced Competitive Programmers</h2>

        <h3>1. Codeforces</h3>
        <p>
          High-level competitive programming platform.
        </p>

        <h3>2. TopCoder</h3>
        <p>
          Advanced algorithm challenges and competitions.
        </p>

        <blockquote>
          Competitive programming improves thinking speed drastically.
        </blockquote>
      </div>

      {/* WHICH PLATFORM SHOULD YOU CHOOSE */}
      <div className="blog-section">
        <h2>Which Platform Should You Choose?</h2>

        <h3>If You Are Beginner</h3>
        <p>Start with HackerRank or CodeStudio.</p>

        <h3>If Preparing for Placements</h3>
        <p>Focus mainly on LeetCode + previous year questions.</p>

        <h3>If Interested in Competitive Programming</h3>
        <p>Start CodeChef and move to Codeforces.</p>
      </div>

      {/* 6 MONTH PRACTICE PLAN */}
      <div className="blog-section">
        <h2>6-Month Coding Practice Plan</h2>

        <h3>Month 1–2</h3>
        <p>Basic problems (arrays, strings, loops).</p>

        <h3>Month 3–4</h3>
        <p>Data Structures (stack, queue, linked list, recursion).</p>

        <h3>Month 5</h3>
        <p>Trees, graphs, dynamic programming basics.</p>

        <h3>Month 6</h3>
        <p>Mock interviews + company questions.</p>

        <div className="highlight-box">
          Minimum 3 problems daily = 1000+ problems in 1 year.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Coding Practice Mistakes</h2>

        <ul>
          <li>Jumping directly to hard problems</li>
          <li>Copying solutions immediately</li>
          <li>Not revising solved questions</li>
          <li>Inconsistent practice</li>
        </ul>
      </div>

      {/* PLACEMENT STRATEGY */}
      <div className="blog-section">
        <h2>Placement-Oriented Strategy</h2>

        <ul>
          <li>Solve company-tagged questions</li>
          <li>Practice mock interviews</li>
          <li>Time yourself while solving</li>
          <li>Revise common patterns</li>
        </ul>

        <blockquote>
          Patterns matter more than number of problems.
        </blockquote>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>How many problems should I solve daily?</h4>
          <p>At least 2–3 problems consistently.</p>
        </div>

        <div className="faq-box">
          <h4>Is LeetCode enough for placements?</h4>
          <p>Yes, if combined with strong fundamentals.</p>
        </div>

        <div className="faq-box">
          <h4>Is competitive programming necessary?</h4>
          <p>Not mandatory, but helpful for logic building.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Choose platform wisely.  
          Practice daily.  
          Focus on patterns.  
          Revise regularly.  
          Coding mastery is built through consistency.
        </div>
      </div>

    </BlogLayout>
  );
}