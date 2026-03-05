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
          Technical knowledge alone is not enough to succeed as an engineer.
          Many students focus only on coding, mathematics, and core subjects,
          but ignore communication skills completely.
        </p>

        <p>
          The truth is — companies hire engineers who can explain ideas clearly,
          collaborate with teams, present solutions confidently, and communicate
          professionally with clients.
        </p>

        <div className="highlight-box">
          Your technical skills get you shortlisted.  
          Your communication skills get you hired and promoted.
        </div>
      </div>

      {/* WHY IMPORTANT */}
      <div className="blog-section">
        <h2>Why Communication Skills Are Important for Engineers</h2>

        <ul>
          <li>Explaining technical concepts to non-technical clients</li>
          <li>Working effectively in teams</li>
          <li>Clearing interviews</li>
          <li>Handling presentations</li>
          <li>Leadership and promotions</li>
        </ul>

        <p>
          Even top companies reject candidates who cannot express their thoughts clearly,
          even if their technical knowledge is strong.
        </p>
      </div>

      {/* TYPES OF COMMUNICATION */}
      <div className="blog-section">
        <h2>Types of Communication Engineers Must Master</h2>

        <h3>1. Verbal Communication</h3>
        <p>
          This includes how clearly and confidently you speak during meetings,
          interviews, and presentations.
        </p>

        <h3>2. Written Communication</h3>
        <p>
          Engineers write emails, documentation, reports, and project summaries.
          Clear writing shows professionalism.
        </p>

        <h3>3. Non-Verbal Communication</h3>
        <p>
          Body language, eye contact, posture, and facial expressions play a
          major role in interviews and workplace discussions.
        </p>

        <blockquote>
          Communication is not just speaking English.  
          It is expressing ideas with clarity and confidence.
        </blockquote>
      </div>

      {/* INTERVIEW COMMUNICATION */}
      <div className="blog-section">
        <h2>Communication Skills for Interviews</h2>

        <h3>How to Answer Confidently</h3>
        <ul>
          <li>Understand question fully before answering</li>
          <li>Structure your answer (Intro → Explanation → Example)</li>
          <li>Avoid filler words like “umm”, “like”, “basically”</li>
        </ul>

        <h3>Common Interview Mistakes</h3>
        <ul>
          <li>Speaking too fast</li>
          <li>Giving one-line answers</li>
          <li>Not maintaining eye contact</li>
          <li>Sounding unsure</li>
        </ul>

        <div className="highlight-box">
          Practice mock interviews in front of mirror or record yourself.
        </div>
      </div>

      {/* WORKPLACE COMMUNICATION */}
      <div className="blog-section">
        <h2>Workplace Communication Skills</h2>

        <h3>1. Email Writing Skills</h3>
        <p>
          Emails should be professional, clear, and concise.
        </p>
        <ul>
          <li>Clear subject line</li>
          <li>Short paragraphs</li>
          <li>Proper greetings</li>
        </ul>

        <h3>2. Team Collaboration</h3>
        <p>
          Engineers work in teams. Listening is as important as speaking.
        </p>

        <h3>3. Presentation Skills</h3>
        <p>
          You may need to present projects. Structure slides logically.
        </p>
      </div>

      {/* HOW TO IMPROVE */}
      <div className="blog-section">
        <h2>How to Improve Communication Skills (Step-by-Step Plan)</h2>

        <h3>Step 1: Improve Vocabulary Gradually</h3>
        <p>
          Learn 5 new words daily and use them in sentences.
        </p>

        <h3>Step 2: Practice Speaking Daily</h3>
        <p>
          Speak for 5–10 minutes daily on any topic.
        </p>

        <h3>Step 3: Watch English Interviews & Presentations</h3>
        <p>
          Observe how professionals structure their answers.
        </p>

        <h3>Step 4: Join Group Discussions</h3>
        <p>
          Participate in debates or discussions to build confidence.
        </p>

        <h3>Step 5: Read Technical Blogs</h3>
        <p>
          Reading improves writing automatically.
        </p>
      </div>

      {/* 30 DAY PLAN */}
      <div className="blog-section">
        <h2>30-Day Communication Improvement Plan</h2>

        <h3>Week 1</h3>
        <p>Focus on vocabulary and reading.</p>

        <h3>Week 2</h3>
        <p>Daily speaking practice and recording yourself.</p>

        <h3>Week 3</h3>
        <p>Mock interviews and group discussions.</p>

        <h3>Week 4</h3>
        <p>Presentation practice and email writing.</p>

        <div className="highlight-box">
          Consistency for 30 days can boost confidence dramatically.
        </div>
      </div>

      {/* COMMON MYTHS */}
      <div className="blog-section">
        <h2>Common Myths About Communication</h2>

        <ul>
          <li>You must have perfect English accent (False)</li>
          <li>You must speak very fast (False)</li>
          <li>Grammar must be 100% perfect (Not necessary)</li>
        </ul>

        <p>
          Clarity and confidence matter more than accent.
        </p>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is English mandatory for engineers?</h4>
          <p>For multinational companies, yes. For others, clarity matters more than fluency.</p>
        </div>

        <div className="faq-box">
          <h4>How long to improve communication?</h4>
          <p>2–3 months of daily practice shows noticeable results.</p>
        </div>

        <div className="faq-box">
          <h4>Can introverts improve communication?</h4>
          <p>Yes. Communication is a skill, not personality trait.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Technical skill + Communication skill = Complete Engineer.  
          Practice daily.  
          Speak clearly.  
          Write professionally.  
          Confidence comes from preparation.
        </div>
      </div>

    </BlogLayout>
  );
}