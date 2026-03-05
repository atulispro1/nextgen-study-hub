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
          Final year project is one of the most important parts of your Diploma in Computer Science.
          It represents your practical knowledge, problem-solving skills, and technical understanding.
        </p>

        <p>
          Many students copy projects from seniors or the internet without understanding them.
          That mistake can cost you marks and confidence during viva.
        </p>

        <div className="highlight-box">
          Choose a project that you can explain confidently, improve creatively,
          and showcase proudly in interviews.
        </div>
      </div>

      {/* HOW TO CHOOSE PROJECT */}
      <div className="blog-section">
        <h2>How to Choose the Right Final Year Project</h2>

        <ul>
          <li>Choose a problem-solving based idea</li>
          <li>Select technology you already know</li>
          <li>Ensure project is practical and implementable</li>
          <li>Avoid overly complex ideas you cannot complete</li>
          <li>Pick something useful for real users</li>
        </ul>

        <blockquote>
          Simple + Well Executed project is better than Complex + Incomplete project.
        </blockquote>
      </div>

      {/* WEB BASED PROJECTS */}
      <div className="blog-section">
        <h2>Web Development Project Ideas</h2>

        <h3>1. Online Student Management System</h3>
        <p>
          A web app where admins manage student records, attendance, results, and assignments.
        </p>
        <ul>
          <li>Tech Stack: HTML, CSS, JavaScript, React, Node.js, MySQL</li>
          <li>Features: Login system, dashboard, data storage</li>
        </ul>

        <h3>2. E-Learning Platform</h3>
        <p>
          A website for uploading notes, videos, assignments, and quizzes.
        </p>

        <h3>3. Online Job Portal for Diploma Students</h3>
        <p>
          Connect students with internship and job opportunities.
        </p>

        <h3>4. Online Voting System</h3>
        <p>
          Secure digital voting platform with authentication.
        </p>
      </div>

      {/* AI & ML PROJECTS */}
      <div className="blog-section">
        <h2>AI / Machine Learning Project Ideas</h2>

        <h3>1. Face Recognition Attendance System</h3>
        <p>
          Uses OpenCV and Python to mark attendance automatically.
        </p>

        <h3>2. Fake News Detection System</h3>
        <p>
          Classifies news as real or fake using ML models.
        </p>

        <h3>3. Chatbot for College Queries</h3>
        <p>
          AI chatbot to answer student queries automatically.
        </p>

        <ul>
          <li>Tech Stack: Python, TensorFlow, Flask</li>
        </ul>

        <div className="highlight-box">
          AI projects impress examiners but require strong concept clarity.
        </div>
      </div>

      {/* ANDROID PROJECTS */}
      <div className="blog-section">
        <h2>Android App Project Ideas</h2>

        <h3>1. Expense Tracker App</h3>
        <p>
          Helps users track daily expenses and savings.
        </p>

        <h3>2. Notes Sharing App</h3>
        <p>
          Students can upload and download academic notes.
        </p>

        <h3>3. Fitness Tracker App</h3>
        <p>
          Tracks steps, calories, and workout progress.
        </p>

        <ul>
          <li>Tech Stack: Java/Kotlin + Firebase</li>
        </ul>
      </div>

      {/* CYBER SECURITY PROJECTS */}
      <div className="blog-section">
        <h2>Cyber Security Based Projects</h2>

        <h3>1. Password Strength Checker</h3>
        <p>
          Evaluates password security using algorithm rules.
        </p>

        <h3>2. Basic Encryption & Decryption Tool</h3>
        <p>
          Demonstrates cryptography fundamentals.
        </p>

        <h3>3. Phishing Detection Tool</h3>
        <p>
          Detects suspicious URLs using pattern recognition.
        </p>
      </div>

      {/* DATABASE PROJECTS */}
      <div className="blog-section">
        <h2>Database Management Project Ideas</h2>

        <ul>
          <li>Library Management System</li>
          <li>Hospital Management System</li>
          <li>Inventory Management System</li>
          <li>Payroll Management System</li>
        </ul>

        <p>
          These projects are simple but perfect for understanding CRUD operations.
        </p>
      </div>

      {/* HOW TO MAKE PROJECT STAND OUT */}
      <div className="blog-section">
        <h2>How to Make Your Project Stand Out</h2>

        <ul>
          <li>Add authentication system</li>
          <li>Use clean UI design</li>
          <li>Add real-world dataset</li>
          <li>Prepare project documentation</li>
          <li>Create short demo video</li>
        </ul>

        <blockquote>
          Presentation of project matters as much as development.
        </blockquote>
      </div>

      {/* VIVA PREPARATION FOR PROJECT */}
      <div className="blog-section">
        <h2>How to Prepare for Project Viva</h2>

        <ul>
          <li>Know complete project workflow</li>
          <li>Understand database schema</li>
          <li>Prepare future improvements</li>
          <li>Be ready to explain challenges faced</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Project Mistakes Students Make</h2>

        <ul>
          <li>Copying project from internet</li>
          <li>Not testing properly</li>
          <li>Poor documentation</li>
          <li>Ignoring UI/UX</li>
          <li>Not understanding code logic</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Should I choose AI project in diploma?</h4>
          <p>If you understand basics and have guidance, yes.</p>
        </div>

        <div className="faq-box">
          <h4>Can I build project alone?</h4>
          <p>Yes, but teamwork improves learning experience.</p>
        </div>

        <div className="faq-box">
          <h4>Is simple project enough for good marks?</h4>
          <p>Yes, if explanation and implementation are strong.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Choose wisely.  
          Understand deeply.  
          Build practically.  
          Explain confidently.  
          Your final year project can boost your career.
        </div>
      </div>

    </BlogLayout>
  );
}