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
          Interviews can feel intimidating, especially for freshers.
          The fear of unknown questions, rejection, and performance pressure
          makes many students nervous.
        </p>

        <p>
          The good news is that most interview questions follow patterns.
          If you prepare strategically, you can answer confidently.
        </p>

        <div className="highlight-box">
          Interviews don’t test perfection.  
          They test clarity, confidence, and problem-solving mindset.
        </div>
      </div>

      {/* HR QUESTIONS */}
      <div className="blog-section">
        <h2>Common HR Interview Questions</h2>

        <h3>1. Tell Me About Yourself</h3>
        <p>
          Structure your answer:
        </p>
        <ul>
          <li>Educational background</li>
          <li>Key skills</li>
          <li>Internship/project experience</li>
          <li>Career goals</li>
        </ul>

        <h3>2. What Are Your Strengths?</h3>
        <p>
          Mention skills relevant to the job and give examples.
        </p>

        <h3>3. What Are Your Weaknesses?</h3>
        <p>
          Mention a real weakness and how you are improving it.
        </p>

        <h3>4. Why Should We Hire You?</h3>
        <p>
          Connect your skills to company needs.
        </p>

        <blockquote>
          Always give structured answers, not random thoughts.
        </blockquote>
      </div>

      {/* TECHNICAL QUESTIONS */}
      <div className="blog-section">
        <h2>Technical Interview Questions (For CS Students)</h2>

        <h3>Programming Basics</h3>
        <ul>
          <li>Difference between C and C++</li>
          <li>What is OOPS?</li>
          <li>Explain data structures</li>
        </ul>

        <h3>Database Questions</h3>
        <ul>
          <li>What is DBMS?</li>
          <li>Explain normalization</li>
          <li>Difference between primary key and foreign key</li>
        </ul>

        <h3>Operating System Questions</h3>
        <ul>
          <li>What is process?</li>
          <li>What is deadlock?</li>
        </ul>

        <p>
          Revise core subjects before attending interviews.
        </p>
      </div>

      {/* BEHAVIORAL QUESTIONS */}
      <div className="blog-section">
        <h2>Behavioral Interview Questions</h2>

        <h3>Tell me about a challenge you faced.</h3>
        <p>
          Use STAR method:
        </p>
        <ul>
          <li>Situation</li>
          <li>Task</li>
          <li>Action</li>
          <li>Result</li>
        </ul>

        <h3>Have you worked in a team?</h3>
        <p>
          Share real project or internship example.
        </p>
      </div>

      {/* HOW TO PREPARE */}
      <div className="blog-section">
        <h2>How to Prepare for Interviews</h2>

        <ul>
          <li>Research company background</li>
          <li>Revise technical subjects</li>
          <li>Prepare self-introduction</li>
          <li>Practice mock interviews</li>
          <li>Improve communication skills</li>
        </ul>

        <div className="highlight-box">
          Preparation reduces nervousness.
        </div>
      </div>

      {/* BODY LANGUAGE */}
      <div className="blog-section">
        <h2>Body Language Tips</h2>

        <ul>
          <li>Maintain eye contact</li>
          <li>Sit straight</li>
          <li>Smile lightly</li>
          <li>Speak clearly</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Interview Mistakes</h2>

        <ul>
          <li>Not researching company</li>
          <li>Memorizing answers</li>
          <li>Speaking too fast</li>
          <li>Negative attitude</li>
          <li>Lack of confidence</li>
        </ul>
      </div>

      {/* INTERVIEW DAY CHECKLIST */}
      <div className="blog-section">
        <h2>Interview Day Checklist</h2>

        <ul>
          <li>Carry updated resume</li>
          <li>Reach early</li>
          <li>Dress professionally</li>
          <li>Stay calm</li>
        </ul>

        <blockquote>
          First impression matters.
        </blockquote>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>How long should answers be?</h4>
          <p>Clear and concise (1–2 minutes per answer).</p>
        </div>

        <div className="faq-box">
          <h4>Is English fluency necessary?</h4>
          <p>Clarity matters more than accent.</p>
        </div>

        <div className="faq-box">
          <h4>How to reduce interview fear?</h4>
          <p>Practice mock interviews regularly.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Revise fundamentals.  
          Practice structured answers.  
          Stay confident.  
          Learn from every interview experience.  
          Success comes with preparation.
        </div>
      </div>

    </BlogLayout>
  );
}