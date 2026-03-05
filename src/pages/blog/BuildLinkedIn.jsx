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
          LinkedIn is the world’s largest professional networking platform.
          Millions of recruiters, companies, entrepreneurs, and professionals
          actively use LinkedIn to find talent and opportunities.
        </p>

        <p>
          For students and freshers, LinkedIn can become a powerful career tool
          if used correctly. A well-optimized profile can help you get internships,
          freelance projects, and job opportunities.
        </p>

        <div className="highlight-box">
          Your LinkedIn profile is your digital resume.
        </div>
      </div>

      {/* WHY LINKEDIN IMPORTANT */}
      <div className="blog-section">
        <h2>Why LinkedIn is Important for Students</h2>

        <ul>
          <li>Connect with recruiters</li>
          <li>Discover internship opportunities</li>
          <li>Build professional network</li>
          <li>Showcase skills and projects</li>
          <li>Stay updated with industry trends</li>
        </ul>

        <blockquote>
          Many students get jobs through LinkedIn networking before graduation.
        </blockquote>
      </div>

      {/* PROFILE BASICS */}
      <div className="blog-section">
        <h2>Essential Elements of a Strong LinkedIn Profile</h2>

        <h3>1. Professional Profile Photo</h3>
        <p>
          Your profile picture should be clear, professional, and friendly.
          Avoid casual photos or selfies.
        </p>

        <h3>2. Compelling Headline</h3>
        <p>
          Your headline should explain what you do or aspire to become.
        </p>

        <ul>
          <li>Diploma CS Student | Aspiring Software Developer</li>
          <li>Digital Marketing Learner | SEO Enthusiast</li>
        </ul>

        <h3>3. Strong About Section</h3>
        <p>
          The About section should describe your background,
          interests, and career goals.
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="blog-section">
        <h2>Adding Experience and Internships</h2>

        <p>
          Even if you don’t have full-time job experience,
          you can include:
        </p>

        <ul>
          <li>Internships</li>
          <li>Freelance work</li>
          <li>College projects</li>
          <li>Volunteer work</li>
        </ul>

        <p>
          Always describe what you did and what skills you used.
        </p>
      </div>

      {/* SKILLS */}
      <div className="blog-section">
        <h2>Skills Section</h2>

        <p>
          Add relevant skills related to your career goals.
        </p>

        <ul>
          <li>Programming Languages</li>
          <li>Digital Marketing</li>
          <li>Communication Skills</li>
          <li>Problem Solving</li>
        </ul>

        <blockquote>
          Recruiters often search profiles based on skills.
        </blockquote>
      </div>

      {/* PROJECTS */}
      <div className="blog-section">
        <h2>Showcase Projects</h2>

        <p>
          Projects demonstrate your practical knowledge.
        </p>

        <ul>
          <li>Final year project</li>
          <li>Website development projects</li>
          <li>Mobile applications</li>
          <li>Data analysis projects</li>
        </ul>
      </div>

      {/* NETWORKING */}
      <div className="blog-section">
        <h2>How to Grow Your LinkedIn Network</h2>

        <ul>
          <li>Connect with classmates</li>
          <li>Follow industry professionals</li>
          <li>Send personalized connection requests</li>
          <li>Engage with posts</li>
        </ul>

        <div className="highlight-box">
          Networking creates opportunities.
        </div>
      </div>

      {/* CONTENT STRATEGY */}
      <div className="blog-section">
        <h2>Posting Content on LinkedIn</h2>

        <p>
          Sharing valuable content helps build your personal brand.
        </p>

        <ul>
          <li>Share learning experiences</li>
          <li>Post project updates</li>
          <li>Write career insights</li>
          <li>Engage in discussions</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common LinkedIn Mistakes</h2>

        <ul>
          <li>Incomplete profile</li>
          <li>Unprofessional profile photo</li>
          <li>Not updating skills</li>
          <li>Not networking actively</li>
        </ul>
      </div>

      {/* PROFILE OPTIMIZATION */}
      <div className="blog-section">
        <h2>LinkedIn Profile Optimization Tips</h2>

        <ul>
          <li>Use relevant keywords</li>
          <li>Update profile regularly</li>
          <li>Add achievements</li>
          <li>Request recommendations</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is LinkedIn useful for students?</h4>
          <p>Yes, it helps build professional network and career visibility.</p>
        </div>

        <div className="faq-box">
          <h4>How many connections should I have?</h4>
          <p>Quality connections matter more than quantity.</p>
        </div>

        <div className="faq-box">
          <h4>How often should I post?</h4>
          <p>Posting once or twice a week is enough.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Build a complete profile.  
          Showcase your skills.  
          Network actively.  
          Share your learning journey.  
          LinkedIn can open unexpected career opportunities.
        </div>
      </div>

    </BlogLayout>
  );
}