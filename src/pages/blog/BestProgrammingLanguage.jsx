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
          Choosing your first programming language can feel overwhelming.
          With so many options like Python, C++, Java, JavaScript, and more,
          beginners often get confused before even writing their first line of code.
        </p>

        <p>
          The truth is — there is no single “perfect” language.
          The best language depends on your goals.
        </p>

        <div className="highlight-box">
          The right first language is the one that matches your career direction,
          not the one that is trending on social media.
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="blog-section">
        <h2>What Makes a Programming Language Beginner-Friendly?</h2>

        <ul>
          <li>Simple and readable syntax</li>
          <li>Large community support</li>
          <li>Good documentation</li>
          <li>High demand in job market</li>
          <li>Strong foundational concepts</li>
        </ul>

        <div className="info-card">
          Beginner-friendly does not mean easy forever. It means easier to start.
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="blog-section">
        <h2>Top Programming Languages for Beginners in 2026</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Python</td>
              <td>Best for Beginners & AI/ML</td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td>Best for Web Development</td>
            </tr>
            <tr>
              <td>C++</td>
              <td>Best for Strong Fundamentals</td>
            </tr>
            <tr>
              <td>Java</td>
              <td>Best for Enterprise & Android</td>
            </tr>
            <tr>
              <td>C</td>
              <td>Best for Core Understanding</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PYTHON */}
      <div className="blog-section">
        <h2>1. Python — The Easiest Starting Point</h2>

        <p>
          Python is currently the most recommended language for beginners.
          Its syntax is clean and readable.
        </p>

        <div className="info-card">
          Example:
          <br />
          print("Hello World")
        </div>

        <h4>Best For:</h4>
        <ul>
          <li>AI & Machine Learning</li>
          <li>Data Science</li>
          <li>Automation</li>
          <li>Web Development</li>
        </ul>

        <blockquote>
          If you want fast progress and quick confidence, start with Python.
        </blockquote>
      </div>

      {/* JAVASCRIPT */}
      <div className="blog-section">
        <h2>2. JavaScript — Web Development King</h2>

        <p>
          If you want to build websites or become a frontend/backend developer,
          JavaScript is essential.
        </p>

        <ul>
          <li>Runs in every browser</li>
          <li>Huge demand in job market</li>
          <li>Works with React, Node.js, Next.js</li>
        </ul>

        <div className="highlight-box">
          Want to become a web developer? JavaScript is non-negotiable.
        </div>
      </div>

      {/* C++ */}
      <div className="blog-section">
        <h2>3. C++ — Build Strong Logic & DSA</h2>

        <p>
          C++ is slightly harder but builds extremely strong programming logic.
        </p>

        <ul>
          <li>Important for competitive programming</li>
          <li>Used in game development</li>
          <li>Teaches memory management</li>
        </ul>

        <div className="info-card">
          If your goal is placements & coding interviews → C++ is powerful.
        </div>
      </div>

      {/* JAVA */}
      <div className="blog-section">
        <h2>4. Java — Enterprise Level Language</h2>

        <p>
          Java is widely used in large companies and Android development.
        </p>

        <ul>
          <li>Strong object-oriented concepts</li>
          <li>Used in banking & enterprise systems</li>
          <li>Android app development</li>
        </ul>
      </div>

      {/* C */}
      <div className="blog-section">
        <h2>5. C — The Foundation Builder</h2>

        <p>
          C is one of the oldest languages and teaches core programming concepts.
        </p>

        <ul>
          <li>Pointers & memory management</li>
          <li>Operating system basics</li>
          <li>Hardware-level understanding</li>
        </ul>
      </div>

      {/* WHICH SHOULD YOU CHOOSE */}
      <div className="blog-section">
        <h2>So… Which One Should You Choose?</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Goal: AI / Data Science</td>
              <td>Python</td>
            </tr>
            <tr>
              <td>Goal: Web Development</td>
              <td>JavaScript</td>
            </tr>
            <tr>
              <td>Goal: Placements & DSA</td>
              <td>C++</td>
            </tr>
            <tr>
              <td>Goal: Android Apps</td>
              <td>Java</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Beginner Mistakes</h2>

        <ul>
          <li>Switching languages too frequently</li>
          <li>Watching tutorials without coding</li>
          <li>Ignoring fundamentals</li>
          <li>Not building projects</li>
        </ul>

        <blockquote>
          Depth in one language is better than surface knowledge of five.
        </blockquote>
      </div>

      {/* FAQ SECTION (MORE ATTRACTIVE) */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Python enough to get a job?</h4>
          <p>
            Yes, but you must combine it with projects, DSA knowledge,
            and problem-solving practice.
          </p>
        </div>

        <div className="faq-box">
          <h4>Should I learn C before Python?</h4>
          <p>
            Not necessary. You can start with Python and later learn C
            for deeper understanding.
          </p>
        </div>

        <div className="faq-box">
          <h4>How long does it take to learn a language?</h4>
          <p>
            Basics: 1–2 months  
            Intermediate: 3–6 months  
            Mastery: Continuous learning
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I learn two languages together?</h4>
          <p>
            Not recommended for beginners. Master one first.
          </p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          The best programming language for beginners in 2026 depends on
          your long-term goal.
        </p>

        <div className="highlight-box">
          Choose one language.  
          Stay consistent for 6 months.  
          Build projects.  
          Practice daily.  
          That’s what creates real programmers.
        </div>
      </div>
    </BlogLayout>
  );
}