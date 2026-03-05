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
          One of the biggest career dilemmas students face is choosing between
          a government job and a private job.
        </p>

        <p>
          Family pressure, job security concerns, salary expectations,
          and career growth confusion make this decision even harder.
        </p>

        <div className="highlight-box">
          There is no universally “better” option.  
          The right choice depends on your goals, personality, and priorities.
        </div>
      </div>

      {/* BASIC DIFFERENCE */}
      <div className="blog-section">
        <h2>Basic Difference Between Government and Private Jobs</h2>

        <h3>Government Job</h3>
        <ul>
          <li>Job security</li>
          <li>Fixed salary structure</li>
          <li>Structured promotions</li>
          <li>Pension benefits (in some roles)</li>
        </ul>

        <h3>Private Job</h3>
        <ul>
          <li>Performance-based growth</li>
          <li>Higher salary potential</li>
          <li>Dynamic work environment</li>
          <li>Faster promotions</li>
        </ul>
      </div>

      {/* SALARY COMPARISON */}
      <div className="blog-section">
        <h2>Salary Comparison</h2>

        <h3>Government Sector</h3>
        <p>
          Salary is fixed according to pay scale. Increments are regular but limited.
        </p>

        <h3>Private Sector</h3>
        <p>
          Starting salary may vary. However, skilled professionals
          can earn significantly more in private sector.
        </p>

        <blockquote>
          Government jobs provide stable income.  
          Private jobs provide growth-based income.
        </blockquote>
      </div>

      {/* JOB SECURITY */}
      <div className="blog-section">
        <h2>Job Security</h2>

        <p>
          Government jobs offer high job security. It is difficult to lose
          your job unless there is serious misconduct.
        </p>

        <p>
          Private jobs depend on company performance and market conditions.
          Layoffs can happen.
        </p>
      </div>

      {/* WORK LIFE BALANCE */}
      <div className="blog-section">
        <h2>Work-Life Balance</h2>

        <h3>Government Job</h3>
        <ul>
          <li>Fixed working hours</li>
          <li>More holidays</li>
          <li>Less work pressure (in many roles)</li>
        </ul>

        <h3>Private Job</h3>
        <ul>
          <li>Flexible but demanding</li>
          <li>Targets & deadlines</li>
          <li>Long working hours possible</li>
        </ul>
      </div>

      {/* GROWTH OPPORTUNITIES */}
      <div className="blog-section">
        <h2>Career Growth Opportunities</h2>

        <p>
          Government promotions are time-based and exam-based.
          Growth is steady but slower.
        </p>

        <p>
          Private sector promotions depend on performance.
          Fast learners can grow quickly.
        </p>
      </div>

      {/* SKILL DEVELOPMENT */}
      <div className="blog-section">
        <h2>Skill Development</h2>

        <p>
          Private sector encourages continuous learning and skill upgrades.
        </p>

        <p>
          In government jobs, skill development depends on department and role.
        </p>
      </div>

      {/* WHO SHOULD CHOOSE WHAT */}
      <div className="blog-section">
        <h2>Who Should Choose Government Job?</h2>

        <ul>
          <li>Those who prefer stability</li>
          <li>Those who value fixed routine</li>
          <li>Those who want long-term security</li>
        </ul>

        <h2>Who Should Choose Private Job?</h2>

        <ul>
          <li>Those who want high growth</li>
          <li>Those who enjoy dynamic environment</li>
          <li>Those willing to take risks</li>
        </ul>
      </div>

      {/* REALISTIC SCENARIOS */}
      <div className="blog-section">
        <h2>Realistic Career Scenarios</h2>

        <p>
          Scenario 1: A student from middle-class family may prefer
          government job for stability.
        </p>

        <p>
          Scenario 2: A student passionate about technology
          may prefer private sector for innovation and high salary growth.
        </p>
      </div>

      {/* COMMON MYTHS */}
      <div className="blog-section">
        <h2>Common Myths</h2>

        <ul>
          <li>Government jobs have no work (False)</li>
          <li>Private jobs have no security (Partially True)</li>
          <li>Government jobs always pay less (Not always)</li>
        </ul>
      </div>

      {/* DECISION CHECKLIST */}
      <div className="blog-section">
        <h2>Decision Checklist</h2>

        <ul>
          <li>What matters more: Stability or Growth?</li>
          <li>Are you ready for competitive exams?</li>
          <li>Are you comfortable with corporate targets?</li>
          <li>What are your long-term goals?</li>
        </ul>

        <div className="highlight-box">
          Choose based on your goals, not societal pressure.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is government job more respected?</h4>
          <p>Traditionally yes, but private sector also earns respect today.</p>
        </div>

        <div className="faq-box">
          <h4>Which job has higher salary potential?</h4>
          <p>Private sector has higher growth potential.</p>
        </div>

        <div className="faq-box">
          <h4>Can I switch from private to government?</h4>
          <p>Yes, by clearing competitive exams.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Government Job = Stability + Security.  
          Private Job = Growth + High Earning Potential.  
          The best choice depends on your mindset and ambitions.
        </div>
      </div>

    </BlogLayout>
  );
}