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
          Completing a Diploma in Computer Science opens multiple career paths.
          But many students feel confused after finishing diploma.
          They don’t know whether to pursue a job, higher studies, freelancing,
          government exams, or start learning advanced skills.
        </p>

        <p>
          The truth is — Diploma in CS is powerful if used strategically.
          Your next step decides your long-term career growth.
        </p>

        <div className="highlight-box">
          Your diploma is a foundation.
          Your skills and decisions determine your future.
        </div>
      </div>

      {/* OPTION 1 */}
      <div className="blog-section">
        <h2>Option 1: Private Sector Jobs</h2>

        <p>
          Many companies hire diploma students for entry-level roles.
          Some common job roles include:
        </p>

        <ul>
          <li>Junior Software Developer</li>
          <li>Technical Support Executive</li>
          <li>Web Developer</li>
          <li>Data Entry / Backend Executive</li>
          <li>IT Support Engineer</li>
        </ul>

        <p>
          Initial salary may range between ₹2–4 LPA.
          However, growth depends completely on skill development.
        </p>

        <blockquote>
          Skill improvement directly impacts salary growth in private sector.
        </blockquote>
      </div>

      {/* OPTION 2 */}
      <div className="blog-section">
        <h2>Option 2: Higher Studies (B.Tech / B.E)</h2>

        <p>
          Many diploma students choose lateral entry into B.Tech.
          This allows them to enter directly into 2nd year.
        </p>

        <p>
          Advantages:
        </p>

        <ul>
          <li>Better placement opportunities</li>
          <li>Access to campus recruitment</li>
          <li>Higher salary ceiling</li>
        </ul>

        <p>
          However, choose college wisely.
          Degree from average institute without skill improvement won’t help much.
        </p>
      </div>

      {/* OPTION 3 */}
      <div className="blog-section">
        <h2>Option 3: Government Jobs</h2>

        <p>
          Diploma holders can apply for:
        </p>

        <ul>
          <li>SSC JE</li>
          <li>Railway JE</li>
          <li>State Government Technical Posts</li>
          <li>PSU Technical Jobs</li>
        </ul>

        <p>
          Government jobs provide stability and long-term security.
          But preparation requires consistent effort for 1–2 years.
        </p>
      </div>

      {/* OPTION 4 */}
      <div className="blog-section">
        <h2>Option 4: Freelancing & Remote Work</h2>

        <p>
          Freelancing is growing rapidly.
          Skills like web development, graphic design, SEO,
          and social media management are in demand.
        </p>

        <p>
          Platforms include:
        </p>

        <ul>
          <li>Upwork</li>
          <li>Fiverr</li>
          <li>Freelancer</li>
          <li>LinkedIn</li>
        </ul>

        <div className="highlight-box">
          Freelancing requires patience.
          First 3–6 months may be slow.
        </div>
      </div>

      {/* OPTION 5 */}
      <div className="blog-section">
        <h2>Option 5: Skill-Based Career (Modern Fields)</h2>

        <ul>
          <li>Full Stack Development</li>
          <li>Cybersecurity</li>
          <li>Data Analytics</li>
          <li>Cloud Computing</li>
          <li>AI & Machine Learning</li>
        </ul>

        <p>
          These fields require additional learning,
          but salary potential is significantly higher.
        </p>
      </div>

      {/* DECISION FRAMEWORK */}
      <div className="blog-section">
        <h2>How to Decide the Right Path</h2>

        <p>
          Ask yourself:
        </p>

        <ul>
          <li>Do I prefer stability or fast growth?</li>
          <li>Am I ready to study 2–3 more years?</li>
          <li>Do I want financial independence quickly?</li>
        </ul>

        <blockquote>
          There is no single best option.
          There is only the option that fits you.
        </blockquote>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Can diploma students get high salary?</h4>
          <p>Yes, if they develop strong technical skills.</p>
        </div>

        <div className="faq-box">
          <h4>Is B.Tech compulsory after diploma?</h4>
          <p>No. Skill-based growth can also lead to success.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Upgrade skills continuously.  
          Make informed decisions.  
          Avoid random choices.  
          Focus on long-term growth.
        </div>
      </div>
    </BlogLayout>
  );
}