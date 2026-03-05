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
          C++ is one of the most powerful programming languages in the world.
          It is used in game engines, operating systems, competitive programming,
          high-performance applications, and coding interviews.
        </p>

        <p>
          Many beginners struggle because they try to learn C++ randomly.
          They watch tutorials without practice and jump directly into advanced topics.
        </p>

        <div className="highlight-box">
          C++ is not difficult.  
          It becomes difficult only when learned without structure.
        </div>
      </div>

      {/* WHY LEARN CPP */}
      <div className="blog-section">
        <h2>Why Learn C++ in 2026?</h2>

        <ul>
          <li>Best language for Data Structures & Algorithms</li>
          <li>Highly preferred in competitive programming</li>
          <li>Used in system-level development</li>
          <li>Strong performance and speed</li>
          <li>Great for coding interviews</li>
        </ul>

        <blockquote>
          If your goal is cracking product-based companies,
          C++ gives strong algorithmic advantage.
        </blockquote>
      </div>

      {/* 60 DAY PLAN */}
      <div className="blog-section">
        <h2>60-Day C++ Learning Plan</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Days 1–10</td>
              <td>Basics (Variables, Loops, Conditionals)</td>
            </tr>
            <tr>
              <td>Days 11–20</td>
              <td>Functions, Arrays, Strings</td>
            </tr>
            <tr>
              <td>Days 21–30</td>
              <td>Pointers & Memory Management</td>
            </tr>
            <tr>
              <td>Days 31–40</td>
              <td>OOP Concepts</td>
            </tr>
            <tr>
              <td>Days 41–50</td>
              <td>STL & Data Structures</td>
            </tr>
            <tr>
              <td>Days 51–60</td>
              <td>Practice + Problem Solving</td>
            </tr>
          </tbody>
        </table>

        <div className="info-card">
          Daily 2–3 hours focused coding is enough.
        </div>
      </div>

      {/* BASICS */}
      <div className="blog-section">
        <h2>Phase 1: Master the Fundamentals</h2>

        <ul>
          <li>Data types</li>
          <li>Input/Output</li>
          <li>Operators</li>
          <li>Loops (for, while)</li>
          <li>Conditional statements</li>
        </ul>

        <p>
          Write small programs daily.
          Do not move forward without practicing basics.
        </p>
      </div>

      {/* POINTERS */}
      <div className="blog-section">
        <h2>Phase 2: Understand Pointers Deeply</h2>

        <p>
          Pointers are what make C++ powerful.
        </p>

        <ul>
          <li>Pointer basics</li>
          <li>Dynamic memory allocation</li>
          <li>Dangling pointers</li>
          <li>Memory management</li>
        </ul>

        <blockquote>
          Do not memorize pointers. Understand memory behavior.
        </blockquote>
      </div>

      {/* OOP */}
      <div className="blog-section">
        <h2>Phase 3: Object-Oriented Programming</h2>

        <ul>
          <li>Classes & Objects</li>
          <li>Encapsulation</li>
          <li>Inheritance</li>
          <li>Polymorphism</li>
          <li>Constructors & Destructors</li>
        </ul>
      </div>

      {/* STL */}
      <div className="blog-section">
        <h2>Phase 4: Standard Template Library (STL)</h2>

        <ul>
          <li>Vector</li>
          <li>Map</li>
          <li>Set</li>
          <li>Stack</li>
          <li>Queue</li>
          <li>Algorithms (sort, binary_search)</li>
        </ul>

        <div className="highlight-box">
          Mastering STL makes coding interviews easier.
        </div>
      </div>

      {/* PRACTICE STRATEGY */}
      <div className="blog-section">
        <h2>Practice Strategy</h2>

        <ul>
          <li>Start with easy problems</li>
          <li>Move to medium gradually</li>
          <li>Solve 3–5 problems daily</li>
          <li>Revise mistakes weekly</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes</h2>

        <ul>
          <li>Skipping basics</li>
          <li>Ignoring memory concepts</li>
          <li>Not practicing daily</li>
          <li>Jumping to advanced topics too early</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is C++ difficult for beginners?</h4>
          <p>No, if learned step-by-step.</p>
        </div>

        <div className="faq-box">
          <h4>How long to become confident?</h4>
          <p>2–3 months of consistent practice.</p>
        </div>

        <div className="faq-box">
          <h4>Is C++ good for placements?</h4>
          <p>Yes, especially for product-based companies.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Learn basics deeply.  
          Practice daily.  
          Master STL.  
          Solve problems consistently.  
          Build logical thinking.
        </div>
      </div>
    </BlogLayout>
  );
}