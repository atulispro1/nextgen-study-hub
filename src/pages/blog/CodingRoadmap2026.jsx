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
          Learning coding has become one of the most valuable skills in the
          modern digital world. Software developers build websites,
          mobile apps, AI systems, and digital products used by millions of people.
        </p>

        <p>
          However, many beginners feel confused about where to start and
          which technologies to learn.
        </p>

        <div className="highlight-box">
          A structured roadmap makes learning programming much easier.
        </div>
      </div>

      {/* WHY LEARN CODING */}
      <div className="blog-section">
        <h2>Why Learning Coding is Important</h2>

        <ul>
          <li>High demand for developers</li>
          <li>Good salary opportunities</li>
          <li>Freelancing possibilities</li>
          <li>Remote job options</li>
          <li>Ability to build your own products</li>
        </ul>

        <blockquote>
          Coding is one of the most future-proof skills you can learn today.
        </blockquote>
      </div>

      {/* STEP 1 */}
      <div className="blog-section">
        <h2>Step 1: Learn Programming Basics</h2>

        <p>
          Start with one beginner-friendly programming language.
        </p>

        <h3>Recommended Languages</h3>

        <ul>
          <li>C++</li>
          <li>Python</li>
          <li>Java</li>
        </ul>

        <p>
          Focus on learning:
        </p>

        <ul>
          <li>Variables</li>
          <li>Loops</li>
          <li>Functions</li>
          <li>Condition statements</li>
        </ul>
      </div>

      {/* STEP 2 */}
      <div className="blog-section">
        <h2>Step 2: Learn Data Structures & Algorithms</h2>

        <p>
          Data Structures and Algorithms help you write efficient programs.
        </p>

        <h3>Important Data Structures</h3>

        <ul>
          <li>Arrays</li>
          <li>Linked Lists</li>
          <li>Stacks</li>
          <li>Queues</li>
          <li>Trees</li>
          <li>Graphs</li>
        </ul>

        <blockquote>
          Strong DSA knowledge is important for coding interviews.
        </blockquote>
      </div>

      {/* STEP 3 */}
      <div className="blog-section">
        <h2>Step 3: Learn Web Development</h2>

        <p>
          Web development allows you to build websites and web applications.
        </p>

        <h3>Frontend Development</h3>

        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>

        <h3>Frontend Frameworks</h3>

        <ul>
          <li>React</li>
          <li>Next.js</li>
          <li>Vue.js</li>
        </ul>

        <h3>Backend Development</h3>

        <ul>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Databases (MongoDB, MySQL)</li>
        </ul>
      </div>

      {/* STEP 4 */}
      <div className="blog-section">
        <h2>Step 4: Build Real Projects</h2>

        <p>
          Building projects helps you apply theoretical knowledge.
        </p>

        <ul>
          <li>Portfolio website</li>
          <li>Blog website</li>
          <li>Task manager app</li>
          <li>E-commerce website</li>
        </ul>

        <div className="highlight-box">
          Projects demonstrate your skills better than certificates.
        </div>
      </div>

      {/* STEP 5 */}
      <div className="blog-section">
        <h2>Step 5: Learn Git and GitHub</h2>

        <p>
          Git helps developers manage code changes and collaborate with teams.
        </p>

        <ul>
          <li>Git basics</li>
          <li>GitHub repositories</li>
          <li>Version control</li>
        </ul>
      </div>

      {/* STEP 6 */}
      <div className="blog-section">
        <h2>Step 6: Practice Coding Problems</h2>

        <p>
          Regular coding practice improves problem-solving skills.
        </p>

        <h3>Best Coding Platforms</h3>

        <ul>
          <li>LeetCode</li>
          <li>HackerRank</li>
          <li>CodeChef</li>
          <li>GeeksforGeeks</li>
        </ul>
      </div>

      {/* STEP 7 */}
      <div className="blog-section">
        <h2>Step 7: Prepare for Interviews</h2>

        <ul>
          <li>Revise core computer science subjects</li>
          <li>Practice coding questions</li>
          <li>Build strong projects</li>
          <li>Improve communication skills</li>
        </ul>

        <blockquote>
          Preparation and practice are the keys to technical interview success.
        </blockquote>
      </div>

      {/* 6 MONTH PLAN */}
      <div className="blog-section">
        <h2>6-Month Coding Learning Plan</h2>

        <h3>Month 1–2</h3>
        <p>Programming basics and problem solving.</p>

        <h3>Month 3</h3>
        <p>Data structures and algorithms.</p>

        <h3>Month 4</h3>
        <p>Frontend development.</p>

        <h3>Month 5</h3>
        <p>Backend development and databases.</p>

        <h3>Month 6</h3>
        <p>Build projects and prepare for interviews.</p>

        <div className="highlight-box">
          Consistency matters more than speed while learning programming.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Trying to learn too many languages</li>
          <li>Skipping fundamentals</li>
          <li>Not building projects</li>
          <li>Inconsistent practice</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Which programming language should beginners start with?</h4>
          <p>
            Python or C++ are good choices for beginners.
          </p>
        </div>

        <div className="faq-box">
          <h4>How long does it take to learn coding?</h4>
          <p>
            With consistent practice, basic skills can develop in 6–12 months.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is coding difficult?</h4>
          <p>
            Coding becomes easier with regular practice and problem solving.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Learn one programming language first.  
          Practice data structures and algorithms.  
          Build real projects.  
          Stay consistent in learning.  
          Coding success comes through practice and patience.
        </div>
      </div>

    </BlogLayout>
  );
}