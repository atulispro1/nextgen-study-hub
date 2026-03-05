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
          State Public Service Commission (PSC) exams are among the most
          prestigious competitive exams conducted by individual states in India.
          These exams recruit candidates for administrative and civil services
          positions within the state government.
        </p>

        <p>
          Many students dream of becoming SDM, DSP, Tehsildar, BDO, or other
          state-level officers. But without proper strategy,
          preparation can become overwhelming.
        </p>

        <div className="highlight-box">
          State PSC is not about studying everything.  
          It is about studying the right things in the right order.
        </div>
      </div>

      {/* EXAM STRUCTURE */}
      <div className="blog-section">
        <h2>Understanding State PSC Exam Structure</h2>

        <p>Most State PSC exams have three stages:</p>

        <h3>1. Preliminary Exam</h3>
        <ul>
          <li>Objective type (MCQs)</li>
          <li>General Studies</li>
          <li>CSAT (in some states)</li>
        </ul>

        <h3>2. Mains Exam</h3>
        <ul>
          <li>Descriptive papers</li>
          <li>Essay writing</li>
          <li>State-specific subjects</li>
        </ul>

        <h3>3. Interview</h3>
        <ul>
          <li>Personality test</li>
          <li>Decision-making ability</li>
          <li>Confidence and clarity</li>
        </ul>

        <blockquote>
          Clearing prelims is about accuracy.  
          Clearing mains is about depth.  
          Clearing interview is about personality.
        </blockquote>
      </div>

      {/* SYLLABUS BREAKDOWN */}
      <div className="blog-section">
        <h2>Important Subjects for State PSC</h2>

        <ul>
          <li>Indian History</li>
          <li>Indian Polity</li>
          <li>Geography (India + State)</li>
          <li>Economy</li>
          <li>General Science</li>
          <li>Current Affairs</li>
          <li>State-Specific GK</li>
        </ul>

        <p>
          State-specific knowledge is very important. Always focus on
          state history, geography, culture, and government schemes.
        </p>
      </div>

      {/* PREPARATION STRATEGY */}
      <div className="blog-section">
        <h2>Step-by-Step Preparation Strategy</h2>

        <h3>Step 1: Understand Official Syllabus</h3>
        <p>
          Download syllabus from official PSC website.
          Break it into manageable sections.
        </p>

        <h3>Step 2: Build Strong Foundation</h3>
        <p>
          Start with NCERT books (Class 6–10) for History, Geography, Polity.
        </p>

        <h3>Step 3: Focus on State GK</h3>
        <ul>
          <li>State history</li>
          <li>Important personalities</li>
          <li>State economy</li>
          <li>Government schemes</li>
        </ul>

        <h3>Step 4: Daily Current Affairs</h3>
        <p>
          Follow monthly compilations instead of reading random news.
        </p>

        <h3>Step 5: Solve Previous Year Papers</h3>
        <p>
          Analyze patterns and important topics.
        </p>

        <div className="highlight-box">
          Previous Year Questions are the most powerful preparation tool.
        </div>
      </div>

      {/* DAILY STUDY PLAN */}
      <div className="blog-section">
        <h2>Daily 6-Hour Study Plan for PSC</h2>

        <h3>2 Hours – Static Subjects</h3>
        <p>History, Polity, Geography.</p>

        <h3>1.5 Hours – State Specific Topics</h3>
        <p>State schemes, culture, economy.</p>

        <h3>1 Hour – Current Affairs</h3>
        <p>Monthly compilation revision.</p>

        <h3>1.5 Hours – MCQ Practice</h3>
        <p>Minimum 50–80 questions daily.</p>
      </div>

      {/* MAINS STRATEGY */}
      <div className="blog-section">
        <h2>Mains Exam Strategy</h2>

        <ul>
          <li>Practice answer writing daily</li>
          <li>Write structured answers (Intro–Body–Conclusion)</li>
          <li>Use examples from state context</li>
          <li>Improve handwriting and presentation</li>
        </ul>

        <blockquote>
          Writing practice separates average candidates from toppers.
        </blockquote>
      </div>

      {/* INTERVIEW STRATEGY */}
      <div className="blog-section">
        <h2>Interview Preparation Tips</h2>

        <ul>
          <li>Know your graduation subject</li>
          <li>Know your state deeply</li>
          <li>Stay updated with current issues</li>
          <li>Practice mock interviews</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Ignoring state-specific syllabus</li>
          <li>Not practicing answer writing</li>
          <li>Reading too many books</li>
          <li>Skipping revision</li>
          <li>Lack of consistency</li>
        </ul>
      </div>

      {/* 1 YEAR PLAN */}
      <div className="blog-section">
        <h2>1-Year Preparation Plan</h2>

        <h3>Months 1–4</h3>
        <p>Complete static subjects + basic state GK.</p>

        <h3>Months 5–8</h3>
        <p>Practice MCQs + start answer writing.</p>

        <h3>Months 9–12</h3>
        <p>Full revision + mock tests + interview preparation.</p>

        <div className="highlight-box">
          Consistency for 12 months can change your career permanently.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is State PSC easier than UPSC?</h4>
          <p>Competition is lower but syllabus depth is similar.</p>
        </div>

        <div className="faq-box">
          <h4>How many attempts are allowed?</h4>
          <p>Depends on state rules and age limits.</p>
        </div>

        <div className="faq-box">
          <h4>Can diploma students apply?</h4>
          <p>Generally graduation is required.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand syllabus deeply.  
          Focus on state-specific knowledge.  
          Practice answer writing.  
          Revise consistently.  
          State PSC success requires discipline, not luck.
        </div>
      </div>

    </BlogLayout>
  );
}