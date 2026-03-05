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
          Engineering Mathematics is one of the most feared subjects among
          diploma and engineering students. Many students believe that
          mathematics is difficult or that they are simply not good at it.
        </p>

        <p>
          The truth is that mathematics is not about memorization — it is about
          understanding patterns, practicing problems, and building logical
          thinking.
        </p>

        <div className="highlight-box">
          Mathematics becomes easy when you practice regularly and focus on
          concepts instead of shortcuts.
        </div>
      </div>

      {/* WHY MATHS IMPORTANT */}
      <div className="blog-section">
        <h2>Why Engineering Mathematics is Important</h2>

        <ul>
          <li>Develops logical thinking</li>
          <li>Improves analytical skills</li>
          <li>Used in programming and algorithms</li>
          <li>Essential for engineering problem solving</li>
          <li>Helps in competitive exams</li>
        </ul>

        <blockquote>
          Mathematics is the language of engineering.
        </blockquote>
      </div>

      {/* COMMON TOPICS */}
      <div className="blog-section">
        <h2>Important Topics in Engineering Mathematics</h2>

        <h3>1. Algebra</h3>
        <ul>
          <li>Matrices</li>
          <li>Determinants</li>
          <li>Linear equations</li>
        </ul>

        <h3>2. Calculus</h3>
        <ul>
          <li>Differentiation</li>
          <li>Integration</li>
          <li>Applications of derivatives</li>
        </ul>

        <h3>3. Trigonometry</h3>
        <ul>
          <li>Trigonometric identities</li>
          <li>Inverse trigonometric functions</li>
        </ul>

        <h3>4. Probability & Statistics</h3>
        <p>
          Used in data analysis, machine learning, and engineering research.
        </p>
      </div>

      {/* STUDY STRATEGY */}
      <div className="blog-section">
        <h2>Step-by-Step Strategy to Study Mathematics</h2>

        <h3>Step 1: Understand the Concept</h3>
        <p>
          Before solving problems, understand the theory and formulas.
        </p>

        <h3>Step 2: Solve Basic Problems</h3>
        <p>
          Start with easy examples to build confidence.
        </p>

        <h3>Step 3: Practice Regularly</h3>
        <p>
          Mathematics improves only through practice.
        </p>

        <h3>Step 4: Analyze Mistakes</h3>
        <p>
          Keep an error notebook to track mistakes.
        </p>

        <div className="highlight-box">
          Daily practice of even 10–15 problems can dramatically improve your
          mathematics skills.
        </div>
      </div>

      {/* DAILY PRACTICE PLAN */}
      <div className="blog-section">
        <h2>Daily Mathematics Practice Plan</h2>

        <h3>Step 1</h3>
        <p>Revise formulas for 10 minutes.</p>

        <h3>Step 2</h3>
        <p>Solve 10–15 practice problems.</p>

        <h3>Step 3</h3>
        <p>Review incorrect solutions and understand mistakes.</p>

        <blockquote>
          Consistent practice builds mathematical intuition.
        </blockquote>
      </div>

      {/* EXAM STRATEGY */}
      <div className="blog-section">
        <h2>Exam Preparation Strategy</h2>

        <ul>
          <li>Focus on important formulas</li>
          <li>Solve previous year question papers</li>
          <li>Practice numerical problems regularly</li>
          <li>Manage time during exams</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Skipping basic concepts</li>
          <li>Memorizing formulas without understanding</li>
          <li>Not practicing enough problems</li>
          <li>Ignoring revision</li>
        </ul>
      </div>

      {/* 7 DAY REVISION PLAN */}
      <div className="blog-section">
        <h2>7-Day Mathematics Revision Plan</h2>

        <h3>Day 1–2</h3>
        <p>Revise algebra topics.</p>

        <h3>Day 3–4</h3>
        <p>Practice calculus problems.</p>

        <h3>Day 5</h3>
        <p>Focus on trigonometry and identities.</p>

        <h3>Day 6</h3>
        <p>Probability and statistics revision.</p>

        <h3>Day 7</h3>
        <p>Solve previous year papers.</p>

        <div className="highlight-box">
          Revision strengthens long-term memory.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is engineering mathematics difficult?</h4>
          <p>
            It may seem difficult initially, but regular practice makes it much
            easier.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study mathematics?</h4>
          <p>
            1–2 hours of focused daily practice is usually enough.
          </p>
        </div>

        <div className="faq-box">
          <h4>Are previous year papers important?</h4>
          <p>
            Yes, they help understand exam patterns and frequently asked
            questions.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand concepts clearly.  
          Practice regularly.  
          Revise formulas frequently.  
          Solve previous year questions.  
          Mathematics success comes through consistency.
        </div>
      </div>

    </BlogLayout>
  );
}