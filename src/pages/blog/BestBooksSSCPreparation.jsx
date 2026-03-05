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
          SSC exams such as SSC CGL, SSC CHSL, SSC MTS, and SSC GD attract
          millions of aspirants every year. One of the most common questions
          students ask is: which books are best for SSC preparation?
        </p>

        <p>
          Choosing the right books is extremely important because the quality
          of study material directly affects your preparation efficiency.
        </p>

        <div className="highlight-box">
          Limited but high-quality books are better than studying from too many sources.
        </div>
      </div>

      {/* SUBJECTS */}
      <div className="blog-section">
        <h2>Subjects in SSC Exams</h2>

        <ul>
          <li>Quantitative Aptitude</li>
          <li>General Intelligence & Reasoning</li>
          <li>English Language</li>
          <li>General Awareness</li>
        </ul>

        <blockquote>
          Preparing each subject with the right book improves your chances of success.
        </blockquote>
      </div>

      {/* MATHS BOOKS */}
      <div className="blog-section">
        <h2>Best Books for Quantitative Aptitude</h2>

        <h3>1. Fast Track Objective Arithmetic – Rajesh Verma</h3>
        <p>
          One of the most popular books for SSC mathematics preparation.
          It covers concepts and practice questions in detail.
        </p>

        <h3>2. Quantitative Aptitude – R.S. Aggarwal</h3>
        <p>
          A beginner-friendly book that explains mathematical concepts clearly.
        </p>

        <ul>
          <li>Percentage</li>
          <li>Profit and Loss</li>
          <li>Time and Work</li>
          <li>Ratio and Proportion</li>
        </ul>
      </div>

      {/* REASONING BOOKS */}
      <div className="blog-section">
        <h2>Best Books for Reasoning</h2>

        <h3>1. A Modern Approach to Verbal Reasoning – R.S. Aggarwal</h3>
        <p>
          Covers logical reasoning concepts and practice problems.
        </p>

        <h3>2. Analytical Reasoning – M.K. Pandey</h3>
        <p>
          Excellent for developing logical thinking skills.
        </p>

        <ul>
          <li>Series</li>
          <li>Analogy</li>
          <li>Coding-Decoding</li>
          <li>Blood Relations</li>
        </ul>
      </div>

      {/* ENGLISH BOOKS */}
      <div className="blog-section">
        <h2>Best Books for English</h2>

        <h3>1. Objective General English – S.P. Bakshi</h3>
        <p>
          Widely recommended for SSC English preparation.
        </p>

        <h3>2. Word Power Made Easy – Norman Lewis</h3>
        <p>
          Great for improving vocabulary.
        </p>

        <ul>
          <li>Grammar rules</li>
          <li>Vocabulary building</li>
          <li>Error detection</li>
          <li>Reading comprehension</li>
        </ul>
      </div>

      {/* GK BOOKS */}
      <div className="blog-section">
        <h2>Best Books for General Awareness</h2>

        <h3>1. Lucent’s General Knowledge</h3>
        <p>
          One of the most popular GK books for competitive exams.
        </p>

        <h3>2. NCERT Books</h3>
        <p>
          Useful for understanding basic concepts in history, geography, and science.
        </p>

        <ul>
          <li>Indian History</li>
          <li>Indian Polity</li>
          <li>Geography</li>
          <li>General Science</li>
        </ul>
      </div>

      {/* PRACTICE */}
      <div className="blog-section">
        <h2>Importance of Previous Year Papers</h2>

        <p>
          Practicing previous year question papers helps understand the
          difficulty level and exam pattern.
        </p>

        <ul>
          <li>Identify frequently asked topics</li>
          <li>Improve speed and accuracy</li>
          <li>Build exam confidence</li>
        </ul>

        <div className="highlight-box">
          Previous year papers are one of the best preparation tools.
        </div>
      </div>

      {/* STUDY STRATEGY */}
      <div className="blog-section">
        <h2>Study Strategy for SSC Preparation</h2>

        <ul>
          <li>Study 4–6 hours daily</li>
          <li>Practice mock tests weekly</li>
          <li>Revise formulas regularly</li>
          <li>Improve time management</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Using too many books</li>
          <li>Ignoring revision</li>
          <li>Not practicing mock tests</li>
          <li>Studying without a clear plan</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is one book enough for SSC preparation?</h4>
          <p>
            Yes, if the book covers concepts and practice questions thoroughly.
          </p>
        </div>

        <div className="faq-box">
          <h4>Are previous year papers important?</h4>
          <p>
            Yes, they help understand exam patterns and important topics.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many months are required for SSC preparation?</h4>
          <p>
            With consistent study, 4–6 months can be sufficient.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Choose the right books.  
          Practice consistently.  
          Revise regularly.  
          Solve previous year papers.  
          Smart preparation leads to SSC success.
        </div>
      </div>

    </BlogLayout>
  );
}