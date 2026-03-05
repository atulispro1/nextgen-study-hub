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
          Applied Chemistry is one of the fundamental subjects in engineering
          diploma programs. It helps students understand chemical principles
          that are used in industries, materials science, electronics, and
          environmental engineering.
        </p>

        <p>
          Many students find chemistry difficult because they try to memorize
          formulas instead of understanding concepts.
        </p>

        <div className="highlight-box">
          Chemistry becomes easy when you understand the logic behind reactions
          instead of memorizing blindly.
        </div>
      </div>

      {/* WHY CHEMISTRY IMPORTANT */}
      <div className="blog-section">
        <h2>Why Applied Chemistry is Important for Engineers</h2>

        <ul>
          <li>Understanding materials and their properties</li>
          <li>Knowledge of corrosion and protection methods</li>
          <li>Basics of polymers and plastics</li>
          <li>Environmental protection knowledge</li>
          <li>Industrial chemical processes</li>
        </ul>

        <blockquote>
          Chemistry helps engineers understand how materials behave in
          real-world applications.
        </blockquote>
      </div>

      {/* IMPORTANT TOPICS */}
      <div className="blog-section">
        <h2>Important Topics in Applied Chemistry</h2>

        <h3>1. Atomic Structure</h3>
        <p>
          Understanding electrons, protons, neutrons, and electronic
          configuration is the foundation of chemistry.
        </p>

        <h3>2. Chemical Bonding</h3>
        <ul>
          <li>Ionic Bond</li>
          <li>Covalent Bond</li>
          <li>Metallic Bond</li>
        </ul>

        <p>
          Bonding explains how atoms combine to form molecules.
        </p>

        <h3>3. Electrochemistry</h3>
        <p>
          This topic explains batteries, corrosion, electroplating,
          and electrochemical reactions.
        </p>

        <h3>4. Water Technology</h3>
        <ul>
          <li>Hardness of water</li>
          <li>Water purification</li>
          <li>Boiler feed water treatment</li>
        </ul>

        <h3>5. Polymers and Plastics</h3>
        <p>
          Polymers are widely used in engineering materials like plastics,
          rubber, and synthetic fibers.
        </p>
      </div>

      {/* STUDY STRATEGY */}
      <div className="blog-section">
        <h2>How to Study Applied Chemistry Effectively</h2>

        <h3>Step 1: Understand Concepts First</h3>
        <p>
          Focus on understanding reactions instead of memorizing them.
        </p>

        <h3>Step 2: Practice Numerical Problems</h3>
        <p>
          Electrochemistry and chemical calculations require practice.
        </p>

        <h3>Step 3: Create Short Notes</h3>
        <p>
          Write key formulas, reactions, and definitions in a revision notebook.
        </p>

        <div className="highlight-box">
          Visual diagrams and reaction flowcharts help remember chemistry faster.
        </div>
      </div>

      {/* EXAM STRATEGY */}
      <div className="blog-section">
        <h2>Exam Preparation Strategy</h2>

        <ul>
          <li>Study important reactions and equations</li>
          <li>Understand diagrams and processes</li>
          <li>Practice previous year question papers</li>
          <li>Focus on frequently asked theory questions</li>
        </ul>

        <blockquote>
          Previous year papers reveal exam patterns.
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Memorizing without understanding</li>
          <li>Ignoring numerical practice</li>
          <li>Skipping diagrams</li>
          <li>Not revising formulas regularly</li>
        </ul>
      </div>

      {/* REVISION PLAN */}
      <div className="blog-section">
        <h2>7-Day Chemistry Revision Plan</h2>

        <h3>Day 1–2</h3>
        <p>Atomic structure and bonding concepts.</p>

        <h3>Day 3–4</h3>
        <p>Electrochemistry and corrosion topics.</p>

        <h3>Day 5</h3>
        <p>Water technology and environmental chemistry.</p>

        <h3>Day 6</h3>
        <p>Polymers and industrial chemistry.</p>

        <h3>Day 7</h3>
        <p>Solve previous year papers.</p>

        <div className="highlight-box">
          Short revision cycles improve retention dramatically.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Applied Chemistry difficult?</h4>
          <p>
            It becomes easy if you understand reactions and practice regularly.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study chemistry?</h4>
          <p>
            1–2 focused hours daily are sufficient during exam preparation.
          </p>
        </div>

        <div className="faq-box">
          <h4>Are diagrams important in chemistry exams?</h4>
          <p>
            Yes, diagrams often fetch extra marks and show conceptual clarity.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand concepts.  
          Practice reactions.  
          Revise formulas regularly.  
          Solve previous year questions.  
          Chemistry can become one of your highest scoring subjects.
        </div>
      </div>

    </BlogLayout>
  );
}