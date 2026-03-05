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
          General Knowledge (GK) is one of the most scoring yet unpredictable
          sections in almost every government exam including SSC, Railway,
          Banking, State PSC, Defence, and other competitive exams.
        </p>

        <p>
          Many students struggle in GK because they study randomly without
          strategy. They read too many sources and remember nothing.
        </p>

        <div className="highlight-box">
          GK is not about reading everything.  
          It is about revising the right things repeatedly.
        </div>
      </div>

      {/* TYPES OF GK */}
      <div className="blog-section">
        <h2>Types of GK in Government Exams</h2>

        <h3>1. Static GK</h3>
        <ul>
          <li>History</li>
          <li>Geography</li>
          <li>Polity</li>
          <li>Economics</li>
          <li>Science</li>
        </ul>

        <h3>2. Current Affairs</h3>
        <ul>
          <li>National news</li>
          <li>International events</li>
          <li>Government schemes</li>
          <li>Sports</li>
          <li>Awards & Appointments</li>
        </ul>

        <blockquote>
          Static GK builds foundation. Current Affairs keeps you updated.
        </blockquote>
      </div>

      {/* DAILY STRATEGY */}
      <div className="blog-section">
        <h2>Daily 2-Hour GK Study Plan</h2>

        <h3>First 45 Minutes – Static GK</h3>
        <p>
          Study one subject at a time. For example, complete Modern History in 10 days.
        </p>

        <h3>Next 30 Minutes – Current Affairs</h3>
        <p>
          Read monthly current affairs from trusted source. Focus on revision.
        </p>

        <h3>Next 30 Minutes – MCQ Practice</h3>
        <p>
          Solve at least 50 GK questions daily.
        </p>

        <h3>Last 15 Minutes – Revision</h3>
        <p>
          Revise short notes or flashcards.
        </p>

        <div className="highlight-box">
          Consistency beats intensity in GK preparation.
        </div>
      </div>

      {/* SUBJECT WISE STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise GK Preparation Strategy</h2>

        <h3>History</h3>
        <ul>
          <li>Focus on Modern History first</li>
          <li>Important dates and movements</li>
          <li>Freedom struggle leaders</li>
        </ul>

        <h3>Geography</h3>
        <ul>
          <li>Indian rivers</li>
          <li>Soil types</li>
          <li>Important national parks</li>
        </ul>

        <h3>Polity</h3>
        <ul>
          <li>Fundamental Rights</li>
          <li>President & Prime Minister powers</li>
          <li>Parliament structure</li>
        </ul>

        <h3>Science</h3>
        <ul>
          <li>Basic Physics concepts</li>
          <li>Human body systems</li>
          <li>Chemistry reactions</li>
        </ul>
      </div>

      {/* BEST SOURCES */}
      <div className="blog-section">
        <h2>Best Sources for GK Preparation</h2>

        <ul>
          <li>NCERT Books (Class 6–10)</li>
          <li>Lucent GK Book</li>
          <li>Monthly Current Affairs PDF</li>
          <li>Previous Year Question Papers</li>
        </ul>

        <p>
          Avoid reading 10 different books. Stick to 1–2 trusted sources.
        </p>
      </div>

      {/* REVISION TECHNIQUES */}
      <div className="blog-section">
        <h2>Revision Techniques That Actually Work</h2>

        <ul>
          <li>Create short notes</li>
          <li>Use flashcards</li>
          <li>Weekly mock tests</li>
          <li>Monthly full revision</li>
        </ul>

        <blockquote>
          GK fades quickly without revision. Revise weekly.
        </blockquote>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common GK Preparation Mistakes</h2>

        <ul>
          <li>Ignoring previous year questions</li>
          <li>Studying without notes</li>
          <li>Skipping revision</li>
          <li>Over-consuming news without focus</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>How many months required to master GK?</h4>
          <p>6–8 months of consistent study is enough.</p>
        </div>

        <div className="faq-box">
          <h4>Is newspaper necessary?</h4>
          <p>Helpful, but monthly PDFs are sufficient for most exams.</p>
        </div>

        <div className="faq-box">
          <h4>How to remember GK for long time?</h4>
          <p>Regular revision + solving MCQs is key.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Study limited sources.  
          Revise weekly.  
          Practice daily MCQs.  
          Stay updated with current affairs.  
          GK can become your highest scoring section.
        </div>
      </div>

    </BlogLayout>
  );
}