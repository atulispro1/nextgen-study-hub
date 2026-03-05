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
          If you are starting web development, you will constantly hear three
          names: HTML, CSS, and JavaScript.
        </p>

        <p>
          Beginners often get confused — are they programming languages?
          Do we need all three? Which one should we learn first?
        </p>

        <div className="highlight-box">
          Think of a website like a house:
          HTML is the structure,
          CSS is the design,
          JavaScript is the behavior.
        </div>
      </div>

      {/* HTML SECTION */}
      <div className="blog-section">
        <h2>What is HTML?</h2>

        <p>
          HTML (HyperText Markup Language) is used to create the structure of a webpage.
          It defines headings, paragraphs, images, links, forms, and layout blocks.
        </p>

        <div className="info-card">
          HTML is not a programming language.
          It is a markup language.
        </div>

        <h3>What HTML Does:</h3>
        <ul>
          <li>Creates page structure</li>
          <li>Adds text and images</li>
          <li>Defines buttons and forms</li>
          <li>Organizes content using tags</li>
        </ul>

        <blockquote>
          Without HTML, there is no webpage.
        </blockquote>
      </div>

      {/* CSS SECTION */}
      <div className="blog-section">
        <h2>What is CSS?</h2>

        <p>
          CSS (Cascading Style Sheets) is used to style HTML elements.
          It controls colors, fonts, spacing, alignment, animations, and layout.
        </p>

        <div className="info-card">
          CSS makes websites beautiful and responsive.
        </div>

        <h3>What CSS Controls:</h3>
        <ul>
          <li>Colors & background</li>
          <li>Font styles</li>
          <li>Spacing & margins</li>
          <li>Responsive design</li>
          <li>Animations</li>
        </ul>

        <blockquote>
          HTML builds the skeleton. CSS adds clothes and style.
        </blockquote>
      </div>

      {/* JAVASCRIPT SECTION */}
      <div className="blog-section">
        <h2>What is JavaScript?</h2>

        <p>
          JavaScript is a programming language used to make websites interactive.
        </p>

        <p>
          It allows websites to respond to user actions such as clicks,
          form submissions, scrolling, and dynamic content updates.
        </p>

        <div className="info-card">
          JavaScript adds logic and interactivity.
        </div>

        <h3>What JavaScript Can Do:</h3>
        <ul>
          <li>Validate forms</li>
          <li>Create sliders and popups</li>
          <li>Fetch data from APIs</li>
          <li>Build full web applications</li>
        </ul>

        <blockquote>
          HTML = Structure  
          CSS = Design  
          JavaScript = Brain
        </blockquote>
      </div>

      {/* COMPARISON TABLE */}
      <div className="blog-section">
        <h2>HTML vs CSS vs JavaScript — Quick Comparison</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Feature</td>
              <td>HTML</td>
              <td>CSS</td>
              <td>JavaScript</td>
            </tr>
            <tr>
              <td>Purpose</td>
              <td>Structure</td>
              <td>Styling</td>
              <td>Functionality</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Markup</td>
              <td>Style Sheet</td>
              <td>Programming Language</td>
            </tr>
            <tr>
              <td>Difficulty</td>
              <td>Easy</td>
              <td>Easy–Medium</td>
              <td>Medium</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* LEARNING ORDER */}
      <div className="blog-section">
        <h2>Which One Should You Learn First?</h2>

        <h3>Step 1: HTML</h3>
        <p>Learn structure basics first.</p>

        <h3>Step 2: CSS</h3>
        <p>Then style your pages beautifully.</p>

        <h3>Step 3: JavaScript</h3>
        <p>Finally, add interactivity and logic.</p>

        <div className="highlight-box">
          Do not skip HTML and jump to JavaScript.
          Strong foundation matters.
        </div>
      </div>

      {/* CAREER IMPORTANCE */}
      <div className="blog-section">
        <h2>Why All Three Are Important for Developers</h2>

        <ul>
          <li>Frontend developers must know all three</li>
          <li>Full-stack developers require JavaScript</li>
          <li>Even backend developers benefit from JS basics</li>
          <li>Interviewers test HTML/CSS fundamentals</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Trying to learn frameworks without basics</li>
          <li>Ignoring CSS layout fundamentals</li>
          <li>Copy-pasting code without understanding</li>
          <li>Skipping responsive design</li>
        </ul>

        <blockquote>
          Frameworks change. Fundamentals stay forever.
        </blockquote>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is HTML enough to get a job?</h4>
          <p>
            No. You need CSS and JavaScript as well for frontend roles.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is JavaScript difficult?</h4>
          <p>
            It may feel challenging initially, but practice makes it easier.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I learn all three in 3 months?</h4>
          <p>
            Yes, with consistent daily practice.
          </p>
        </div>

        <div className="faq-box">
          <h4>Do I need frameworks like React?</h4>
          <p>
            After mastering basics, frameworks become easier to learn.
          </p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          HTML, CSS, and JavaScript work together to build modern websites.
        </p>

        <div className="highlight-box">
          Master structure.  
          Design beautifully.  
          Add functionality.  
          Build projects.  
          Practice daily.
        </div>
      </div>
    </BlogLayout>
  );
}