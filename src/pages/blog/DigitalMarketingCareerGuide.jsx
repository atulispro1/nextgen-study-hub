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
          Digital Marketing is one of the fastest-growing career fields in India and globally.
          Businesses are shifting online, and every company today needs digital presence.
        </p>

        <p>
          Whether you are a Diploma CS student, engineering student,
          commerce student, or even from non-technical background —
          digital marketing is open to everyone.
        </p>

        <div className="highlight-box">
          You don’t need a degree to start digital marketing.  
          You need skills, strategy, and consistent practice.
        </div>
      </div>

      {/* WHAT IS DIGITAL MARKETING */}
      <div className="blog-section">
        <h2>What is Digital Marketing?</h2>

        <p>
          Digital marketing refers to promoting products or services
          using digital channels like Google, social media,
          websites, email, and online advertisements.
        </p>

        <p>
          It combines creativity, analytics, psychology,
          content creation, and strategy.
        </p>
      </div>

      {/* MAIN FIELDS */}
      <div className="blog-section">
        <h2>Main Fields in Digital Marketing</h2>

        <h3>1. Search Engine Optimization (SEO)</h3>
        <p>
          Optimizing websites to rank on Google search results organically.
        </p>

        <h3>2. Google Ads / PPC</h3>
        <p>
          Running paid advertisements on Google.
        </p>

        <h3>3. Social Media Marketing</h3>
        <p>
          Marketing through Instagram, Facebook, LinkedIn, YouTube.
        </p>

        <h3>4. Content Marketing</h3>
        <p>
          Writing blogs, scripts, emails, and content that attracts audience.
        </p>

        <h3>5. Email Marketing</h3>
        <p>
          Sending automated email campaigns to customers.
        </p>

        <h3>6. Affiliate Marketing</h3>
        <p>
          Promoting products and earning commission.
        </p>

        <blockquote>
          Start with one skill. Master it. Then expand.
        </blockquote>
      </div>

      {/* WHY STUDENTS SHOULD CHOOSE */}
      <div className="blog-section">
        <h2>Why Students Should Consider Digital Marketing</h2>

        <ul>
          <li>No strict degree requirement</li>
          <li>Can start freelancing early</li>
          <li>Remote job opportunities</li>
          <li>High growth industry</li>
          <li>Opportunity to start own business</li>
        </ul>

        <div className="highlight-box">
          You can earn even during college if you build skills early.
        </div>
      </div>

      {/* STEP BY STEP ROADMAP */}
      <div className="blog-section">
        <h2>Step-by-Step Digital Marketing Roadmap</h2>

        <h3>Step 1: Learn Basics (1 Month)</h3>
        <ul>
          <li>Understand marketing fundamentals</li>
          <li>Learn how Google works</li>
          <li>Understand customer psychology</li>
        </ul>

        <h3>Step 2: Choose One Skill (Month 2–3)</h3>
        <p>
          Pick one: SEO, Google Ads, Social Media, or Content Writing.
        </p>

        <h3>Step 3: Practice on Real Projects</h3>
        <ul>
          <li>Create your own website</li>
          <li>Run small ad campaigns</li>
          <li>Optimize your LinkedIn profile</li>
        </ul>

        <h3>Step 4: Build Portfolio</h3>
        <p>
          Document results and create case studies.
        </p>

        <h3>Step 5: Apply for Internship / Freelance Projects</h3>
        <p>
          Start small. Gain experience.
        </p>
      </div>

      {/* SALARY SECTION */}
      <div className="blog-section">
        <h2>Digital Marketing Salary in India (Approximate)</h2>

        <ul>
          <li>Intern: ₹5,000 – ₹15,000/month</li>
          <li>Executive: ₹2 – 4 LPA</li>
          <li>Specialist: ₹4 – 8 LPA</li>
          <li>Manager: ₹8 – 15 LPA</li>
        </ul>

        <p>
          Freelancers can earn based on projects instead of fixed salary.
        </p>
      </div>

      {/* SKILLS REQUIRED */}
      <div className="blog-section">
        <h2>Skills Required in Digital Marketing</h2>

        <ul>
          <li>Communication skills</li>
          <li>Basic design sense</li>
          <li>Analytical thinking</li>
          <li>Consistency</li>
          <li>Creative mindset</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Learning everything at once</li>
          <li>Not practicing on real projects</li>
          <li>Buying expensive courses unnecessarily</li>
          <li>Ignoring analytics</li>
        </ul>
      </div>

      {/* 90 DAY PLAN */}
      <div className="blog-section">
        <h2>90-Day Beginner Plan</h2>

        <h3>Month 1</h3>
        <p>Learn fundamentals + choose one specialization.</p>

        <h3>Month 2</h3>
        <p>Work on live project or internship.</p>

        <h3>Month 3</h3>
        <p>Build portfolio + apply for jobs.</p>

        <div className="highlight-box">
          Skills + Practical Experience = Strong Career Start
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is digital marketing good career in 2026?</h4>
          <p>Yes, demand is increasing rapidly.</p>
        </div>

        <div className="faq-box">
          <h4>Do I need coding for digital marketing?</h4>
          <p>No, but basic understanding helps.</p>
        </div>

        <div className="faq-box">
          <h4>Can I earn while studying?</h4>
          <p>Yes, through freelancing and internships.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Digital marketing rewards skill, not degrees.  
          Start early.  
          Practice consistently.  
          Build results.  
          Grow step by step.
        </div>
      </div>

    </BlogLayout>
  );
}