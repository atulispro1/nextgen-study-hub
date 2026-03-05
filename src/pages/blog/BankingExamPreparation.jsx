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
          Preparing for UPSC Civil Services Examination is not just about
          studying hard. It is about discipline, long-term consistency,
          structured planning, and emotional strength.
        </p>

        <p>
          UPSC is one of the toughest exams in India — not because the syllabus
          is impossible — but because the competition is intense and the
          preparation is long.
        </p>

        <div className="highlight-box">
          UPSC is a 1.5–2 year disciplined journey.  
          It is not a 3-month crash course exam.
        </div>
      </div>

      {/* EXAM STRUCTURE */}
      <div className="blog-section">
        <h2>Understand the UPSC Exam Structure First</h2>

        <table className="blog-table">
          <tbody>
            <tr>
              <td>Prelims</td>
              <td>Objective (GS + CSAT)</td>
            </tr>
            <tr>
              <td>Mains</td>
              <td>Descriptive (9 Papers)</td>
            </tr>
            <tr>
              <td>Interview</td>
              <td>Personality Test</td>
            </tr>
          </tbody>
        </table>

        <div className="info-card">
          UPSC does not test memory.  
          It tests understanding, clarity, and analytical thinking.
        </div>
      </div>

      {/* REALISTIC TIMELINE */}
      <div className="blog-section">
        <h2>Realistic 18–24 Month Preparation Timeline</h2>

        <h3>Phase 1 (Months 1–6): Foundation Building</h3>
        <ul>
          <li>Complete NCERTs (6th–12th)</li>
          <li>Understand basic concepts of Polity, History, Geography, Economy</li>
          <li>Start reading newspaper daily</li>
          <li>Make short notes</li>
        </ul>

        <h3>Phase 2 (Months 7–12): Standard Books + Optional</h3>
        <ul>
          <li>Read standard reference books</li>
          <li>Select optional subject carefully</li>
          <li>Start answer writing practice</li>
          <li>Revise weekly</li>
        </ul>

        <h3>Phase 3 (Months 13–18): Test Series & Intensive Practice</h3>
        <ul>
          <li>Join prelims test series</li>
          <li>Join mains answer writing program</li>
          <li>Practice time-bound answers</li>
          <li>Revise multiple times</li>
        </ul>

        <blockquote>
          Revision is more important than reading new sources.
        </blockquote>
      </div>

      {/* SUBJECT STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise Preparation Strategy</h2>

        <div className="info-card">
          <strong>Polity:</strong> Focus on Constitution, Parliament, Supreme Court.
        </div>

        <div className="info-card">
          <strong>History:</strong> Modern History is highly important.
        </div>

        <div className="info-card">
          <strong>Geography:</strong> Understand concepts, use maps.
        </div>

        <div className="info-card">
          <strong>Economy:</strong> Focus on basic concepts + budget & current affairs.
        </div>

        <div className="info-card">
          <strong>Environment:</strong> Highly scoring in Prelims.
        </div>
      </div>

      {/* NEWSPAPER STRATEGY */}
      <div className="blog-section">
        <h2>Newspaper Reading Strategy</h2>

        <ul>
          <li>Read 1 newspaper daily (The Hindu / Indian Express)</li>
          <li>Focus on editorials</li>
          <li>Link current affairs with static syllabus</li>
          <li>Make concise notes</li>
        </ul>

        <div className="highlight-box">
          Newspaper is not optional. It is the backbone of UPSC preparation.
        </div>
      </div>

      {/* ANSWER WRITING */}
      <div className="blog-section">
        <h2>Answer Writing Strategy (Most Important)</h2>

        <ul>
          <li>Start after completing basics</li>
          <li>Follow Intro → Body → Conclusion format</li>
          <li>Use diagrams and flowcharts</li>
          <li>Stick to word limit</li>
        </ul>

        <blockquote>
          Writing practice separates serious aspirants from casual readers.
        </blockquote>
      </div>

      {/* PRELIMS STRATEGY */}
      <div className="blog-section">
        <h2>Prelims Strategy</h2>

        <ul>
          <li>Solve 10–15 years previous year questions</li>
          <li>Practice elimination technique</li>
          <li>Focus on accuracy</li>
          <li>Revise short notes frequently</li>
        </ul>
      </div>

      {/* OPTIONAL SUBJECT */}
      <div className="blog-section">
        <h2>How to Choose Optional Subject</h2>

        <ul>
          <li>Interest in subject</li>
          <li>Availability of resources</li>
          <li>Overlap with GS</li>
          <li>Past performance trends</li>
        </ul>

        <div className="info-card">
          Do not choose optional just because topper chose it.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Collecting too many books</li>
          <li>Ignoring revision</li>
          <li>Not practicing answer writing</li>
          <li>Following random strategies</li>
          <li>Burnout due to unrealistic schedule</li>
        </ul>
      </div>

      {/* MENTAL HEALTH */}
      <div className="blog-section">
        <h2>Mental Strength & Consistency</h2>

        <p>
          UPSC preparation can be emotionally draining.
          Consistency matters more than motivation.
        </p>

        <div className="highlight-box">
          6–8 quality study hours daily for 2 years
          is better than 12 hours for 3 months.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is UPSC very tough?</h4>
          <p>
            It is competitive and lengthy, but with structured preparation,
            it becomes manageable.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study daily?</h4>
          <p>
            6–8 focused hours consistently.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I prepare without coaching?</h4>
          <p>
            Yes. Many toppers cleared UPSC through self-study.
          </p>
        </div>

        <div className="faq-box">
          <h4>How many attempts are required?</h4>
          <p>
            It varies. Consistency and strategy matter more than attempt count.
          </p>
        </div>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <p>
          UPSC is not about brilliance. It is about structured preparation,
          discipline, and repeated revision.
        </p>

        <div className="highlight-box">
          Build foundation.  
          Practice writing.  
          Revise repeatedly.  
          Stay consistent.  
          Trust the process.
        </div>
      </div>
    </BlogLayout>
  );
}