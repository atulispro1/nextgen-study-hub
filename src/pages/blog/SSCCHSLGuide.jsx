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
          SSC CHSL (Combined Higher Secondary Level) is one of the most popular
          government exams in India for 12th-pass students.
        </p>

        <p>
          Every year lakhs of candidates apply for posts like LDC,
          JSA, DEO, and PA/SA. Competition is high,
          but with proper strategy, cracking SSC CHSL is achievable.
        </p>

        <div className="highlight-box">
          SSC CHSL rewards accuracy, speed, and smart preparation.
        </div>
      </div>

      {/* EXAM PATTERN */}
      <div className="blog-section">
        <h2>SSC CHSL Exam Pattern</h2>

        <h3>Tier 1 (Objective – Online)</h3>
        <ul>
          <li>General Intelligence</li>
          <li>General Awareness</li>
          <li>Quantitative Aptitude</li>
          <li>English Language</li>
          <li>100 Questions – 200 Marks</li>
          <li>Negative Marking: 0.50</li>
        </ul>

        <h3>Tier 2 (Descriptive / Skill Test)</h3>
        <ul>
          <li>Essay Writing</li>
          <li>Letter/Application Writing</li>
          <li>Typing Test / Skill Test</li>
        </ul>

        <blockquote>
          Tier 1 clears eligibility.  
          Tier 2 decides final selection.
        </blockquote>
      </div>

      {/* SUBJECT STRATEGY */}
      <div className="blog-section">
        <h2>Subject-Wise Preparation Strategy</h2>

        <h3>1. Quantitative Aptitude</h3>
        <ul>
          <li>Percentage</li>
          <li>Profit & Loss</li>
          <li>Time & Work</li>
          <li>Ratio & Proportion</li>
          <li>Simple & Compound Interest</li>
        </ul>

        <p>
          Practice daily calculations to improve speed.
        </p>

        <h3>2. English Language</h3>
        <ul>
          <li>Grammar rules</li>
          <li>Vocabulary</li>
          <li>Reading comprehension</li>
          <li>Error spotting</li>
        </ul>

        <h3>3. General Intelligence (Reasoning)</h3>
        <ul>
          <li>Coding-Decoding</li>
          <li>Blood Relations</li>
          <li>Analogy</li>
          <li>Series</li>
        </ul>

        <h3>4. General Awareness</h3>
        <ul>
          <li>Static GK</li>
          <li>Current Affairs</li>
          <li>History, Polity, Geography</li>
        </ul>
      </div>

      {/* DAILY PLAN */}
      <div className="blog-section">
        <h2>Daily 4–6 Hour Study Plan</h2>

        <h3>2 Hours – Quant + Reasoning</h3>
        <p>Practice 50–80 MCQs daily.</p>

        <h3>1 Hour – English</h3>
        <p>Grammar + vocabulary revision.</p>

        <h3>1 Hour – GK</h3>
        <p>Current affairs + static topics.</p>

        <h3>1 Hour – Mock Test Analysis</h3>
        <p>Analyze mistakes deeply.</p>

        <div className="highlight-box">
          Mock test analysis is more important than giving mocks.
        </div>
      </div>

      {/* TIER 2 STRATEGY */}
      <div className="blog-section">
        <h2>Tier 2 Strategy</h2>

        <h3>Essay Writing</h3>
        <p>
          Practice structured essays (Introduction–Body–Conclusion).
        </p>

        <h3>Letter/Application</h3>
        <p>
          Learn formal letter format.
        </p>

        <h3>Typing Test</h3>
        <p>
          Improve typing speed to 35–40 WPM.
        </p>
      </div>

      {/* 6 MONTH PLAN */}
      <div className="blog-section">
        <h2>6-Month SSC CHSL Preparation Plan</h2>

        <h3>Month 1–2</h3>
        <p>Complete syllabus basics.</p>

        <h3>Month 3–4</h3>
        <p>Practice topic-wise questions.</p>

        <h3>Month 5</h3>
        <p>Full-length mock tests.</p>

        <h3>Month 6</h3>
        <p>Revision + weak area improvement.</p>

        <div className="highlight-box">
          150+ mock tests can significantly improve your rank.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Ignoring English section</li>
          <li>Skipping mock tests</li>
          <li>Not revising GK</li>
          <li>Poor time management</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is SSC CHSL tough?</h4>
          <p>Moderate level, but competition is high.</p>
        </div>

        <div className="faq-box">
          <h4>How many hours should I study?</h4>
          <p>4–6 focused hours daily are enough.</p>
        </div>

        <div className="faq-box">
          <h4>Is coaching necessary?</h4>
          <p>No, self-study with mock tests is sufficient.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Focus on accuracy.  
          Practice mock tests.  
          Improve speed daily.  
          Revise consistently.  
          SSC CHSL success requires discipline and strategy.
        </div>
      </div>

    </BlogLayout>
  );
}