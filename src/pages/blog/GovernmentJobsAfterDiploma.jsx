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
          Many Diploma in Computer Science students believe that government jobs
          are only for graduates. That is completely wrong.
        </p>

        <p>
          There are multiple government job opportunities available directly after
          completing a diploma. You just need the right exam awareness and strategy.
        </p>

        <div className="highlight-box">
          A diploma does not limit your opportunities. It only changes your path.
        </div>
      </div>

      {/* WHY GOVERNMENT JOB */}
      <div className="blog-section">
        <h2>Why Choose a Government Job?</h2>

        <ul>
          <li>Job security</li>
          <li>Stable salary</li>
          <li>Fixed working hours</li>
          <li>Pension benefits</li>
          <li>Respect in society</li>
        </ul>

        <p>
          For many students from middle-class backgrounds, government jobs
          provide financial stability and long-term security.
        </p>
      </div>

      {/* TOP JOBS SECTION */}
      <div className="blog-section">
        <h2>Top Government Jobs After Diploma in CS</h2>

        <h3>1. SSC JE (Junior Engineer)</h3>
        <p>
          If your diploma includes technical engineering subjects,
          SSC JE is a strong option.
        </p>
        <ul>
          <li>Conducted by SSC</li>
          <li>Technical + General sections</li>
          <li>Good salary and growth</li>
        </ul>

        <h3>2. Railway Jobs (RRB JE, NTPC)</h3>
        <p>
          Railway Recruitment Board conducts various technical and non-technical exams.
        </p>
        <ul>
          <li>RRB JE</li>
          <li>RRB NTPC</li>
          <li>Technical posts</li>
        </ul>

        <h3>3. State Government Technical Assistant</h3>
        <p>
          Many state departments hire diploma holders for technical support roles.
        </p>

        <h3>4. ISRO / DRDO Technician</h3>
        <p>
          Technical diploma holders can apply for technician and assistant posts.
        </p>

        <h3>5. PSU Jobs</h3>
        <p>
          Public Sector Units like BHEL, ONGC, and others recruit diploma engineers.
        </p>
      </div>

      {/* EXAM STRATEGY */}
      <div className="blog-section">
        <h2>Preparation Strategy</h2>

        <h3>Step 1: Understand Syllabus</h3>
        <p>
          Download official syllabus and analyze subjects carefully.
        </p>

        <h3>Step 2: Focus on Technical Subjects</h3>
        <p>
          Revise diploma core subjects deeply.
        </p>

        <h3>Step 3: Prepare General Sections</h3>
        <ul>
          <li>General Awareness</li>
          <li>Reasoning</li>
          <li>Quantitative Aptitude</li>
          <li>English</li>
        </ul>

        <div className="highlight-box">
          Daily 3–4 hours focused preparation is enough for 6–8 months.
        </div>
      </div>

      {/* SALARY SECTION */}
      <div className="blog-section">
        <h2>Expected Salary Range</h2>

        <ul>
          <li>RRB JE: ₹35,000 – ₹45,000/month</li>
          <li>SSC JE: ₹44,900 (Level 7)</li>
          <li>Technician Posts: ₹25,000 – ₹40,000</li>
        </ul>

        <p>
          With DA, HRA, and allowances, actual in-hand salary increases significantly.
        </p>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Not checking eligibility properly</li>
          <li>Ignoring technical revision</li>
          <li>Only focusing on one exam</li>
          <li>Procrastinating preparation</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Can diploma holders apply for UPSC?</h4>
          <p>No, graduation is required for UPSC Civil Services.</p>
        </div>

        <div className="faq-box">
          <h4>Is government job better than private job?</h4>
          <p>It depends on your goals. Government offers stability, private offers growth speed.</p>
        </div>

        <div className="faq-box">
          <h4>How long should I prepare?</h4>
          <p>Minimum 6–12 months of consistent preparation.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Choose the right exam.  
          Make a 6-month plan.  
          Stay consistent.  
          Apply regularly.  
          Government job is achievable after diploma.
        </div>
      </div>

    </BlogLayout>
  );
}