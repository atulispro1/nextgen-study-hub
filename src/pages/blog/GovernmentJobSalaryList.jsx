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
          Government jobs are one of the most desired career options in India.
          Millions of students prepare for various government exams every year
          because of job security, stable salary, and long-term benefits.
        </p>

        <p>
          Apart from stability, government jobs also provide allowances,
          pension benefits, and career growth opportunities.
        </p>

        <div className="highlight-box">
          Government jobs combine financial stability with long-term career security.
        </div>
      </div>

      {/* WHY GOVT JOBS POPULAR */}
      <div className="blog-section">
        <h2>Why Government Jobs Are Popular</h2>

        <ul>
          <li>High job security</li>
          <li>Regular salary increments</li>
          <li>Retirement benefits</li>
          <li>Work-life balance</li>
          <li>Social respect</li>
        </ul>

        <blockquote>
          Government jobs provide stability that many private sector roles cannot guarantee.
        </blockquote>
      </div>

      {/* SSC SALARY */}
      <div className="blog-section">
        <h2>SSC Job Salary</h2>

        <h3>SSC CGL</h3>
        <p>Average salary range: ₹44,000 – ₹1,42,000 per month.</p>

        <h3>SSC CHSL</h3>
        <p>Average salary range: ₹25,000 – ₹81,000 per month.</p>

        <h3>SSC MTS</h3>
        <p>Average salary range: ₹18,000 – ₹56,000 per month.</p>
      </div>

      {/* BANKING SALARY */}
      <div className="blog-section">
        <h2>Banking Job Salary</h2>

        <h3>SBI PO</h3>
        <p>Starting salary: ₹52,000+ per month.</p>

        <h3>IBPS PO</h3>
        <p>Starting salary: ₹50,000+ per month.</p>

        <h3>Bank Clerk</h3>
        <p>Starting salary: ₹30,000+ per month.</p>
      </div>

      {/* RAILWAY SALARY */}
      <div className="blog-section">
        <h2>Railway Job Salary</h2>

        <h3>RRB NTPC</h3>
        <p>Salary range: ₹29,000 – ₹1,00,000 per month depending on the post.</p>

        <h3>Railway Group D</h3>
        <p>Starting salary: ₹22,000 – ₹35,000 per month.</p>
      </div>

      {/* UPSC SALARY */}
      <div className="blog-section">
        <h2>UPSC Civil Services Salary</h2>

        <h3>IAS Officer</h3>
        <p>Starting salary: ₹56,100 + allowances.</p>

        <h3>IPS Officer</h3>
        <p>Starting salary: ₹56,100 + allowances.</p>

        <h3>IFS Officer</h3>
        <p>Starting salary: ₹60,000+ per month.</p>

        <blockquote>
          Civil services offer some of the most prestigious careers in India.
        </blockquote>
      </div>

      {/* DEFENCE SALARY */}
      <div className="blog-section">
        <h2>Defence Job Salary</h2>

        <h3>Indian Army Officer</h3>
        <p>Starting salary: ₹56,000 – ₹1,77,000 per month.</p>

        <h3>Indian Navy Officer</h3>
        <p>Starting salary: ₹56,000+ per month.</p>

        <h3>Indian Air Force Officer</h3>
        <p>Starting salary: ₹60,000+ per month.</p>
      </div>

      {/* ADDITIONAL BENEFITS */}
      <div className="blog-section">
        <h2>Additional Benefits of Government Jobs</h2>

        <ul>
          <li>House Rent Allowance (HRA)</li>
          <li>Travel Allowance (TA)</li>
          <li>Medical facilities</li>
          <li>Pension benefits</li>
          <li>Paid leaves</li>
        </ul>

        <div className="highlight-box">
          Allowances often increase the total salary significantly.
        </div>
      </div>

      {/* HOW TO GET GOVT JOB */}
      <div className="blog-section">
        <h2>How to Get a Government Job</h2>

        <ul>
          <li>Understand exam syllabus</li>
          <li>Prepare consistently</li>
          <li>Solve previous year papers</li>
          <li>Practice mock tests</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Aspirants Make</h2>

        <ul>
          <li>Lack of consistent preparation</li>
          <li>Ignoring mock tests</li>
          <li>Studying without strategy</li>
          <li>Not revising regularly</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Which government job has the highest salary?</h4>
          <p>
            Civil services like IAS and IPS offer some of the highest salaries.
          </p>
        </div>

        <div className="faq-box">
          <h4>Are government salaries increasing?</h4>
          <p>
            Yes, salaries increase through pay commissions and promotions.
          </p>
        </div>

        <div className="faq-box">
          <h4>Do government jobs include allowances?</h4>
          <p>
            Yes, allowances like HRA and TA significantly increase total salary.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Government jobs offer stability, respectable salary,
          and long-term security.  
          With consistent preparation and dedication,
          achieving a government job is completely possible.
        </div>
      </div>

    </BlogLayout>
  );
}