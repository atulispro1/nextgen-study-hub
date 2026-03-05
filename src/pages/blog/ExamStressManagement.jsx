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
          Exam stress is common among students. Whether it is semester exams,
          competitive exams, viva, or placements — pressure builds up naturally.
        </p>

        <p>
          A little stress is normal and even helpful. But excessive stress
          can reduce performance, concentration, and confidence.
        </p>

        <div className="highlight-box">
          Stress is not the enemy.  
          Poor stress management is.
        </div>
      </div>

      {/* WHY EXAM STRESS HAPPENS */}
      <div className="blog-section">
        <h2>Why Exam Stress Happens</h2>

        <ul>
          <li>Fear of failure</li>
          <li>Lack of preparation</li>
          <li>Parental expectations</li>
          <li>Comparison with friends</li>
          <li>Poor time management</li>
        </ul>

        <p>
          Understanding the root cause of stress helps in controlling it.
        </p>
      </div>

      {/* SYMPTOMS */}
      <div className="blog-section">
        <h2>Common Symptoms of Exam Stress</h2>

        <ul>
          <li>Difficulty sleeping</li>
          <li>Loss of concentration</li>
          <li>Anxiety or panic</li>
          <li>Headache or fatigue</li>
          <li>Negative thinking</li>
        </ul>
      </div>

      {/* PRACTICAL SOLUTIONS */}
      <div className="blog-section">
        <h2>Practical Ways to Handle Exam Stress</h2>

        <h3>1. Make a Realistic Study Plan</h3>
        <p>
          Break syllabus into small achievable goals.
        </p>

        <h3>2. Use Pomodoro Technique</h3>
        <p>
          Study 25 minutes, take 5-minute break.
        </p>

        <h3>3. Avoid Last-Minute Cramming</h3>
        <p>
          Continuous revision reduces stress.
        </p>

        <h3>4. Practice Mock Tests</h3>
        <p>
          Familiarity with exam pattern builds confidence.
        </p>

        <h3>5. Sleep Properly</h3>
        <p>
          6–8 hours of sleep improves memory retention.
        </p>

        <div className="highlight-box">
          Preparation reduces pressure.
        </div>
      </div>

      {/* MENTAL HEALTH */}
      <div className="blog-section">
        <h2>Mental Techniques to Stay Calm</h2>

        <ul>
          <li>Deep breathing exercises</li>
          <li>Short meditation sessions</li>
          <li>Positive self-talk</li>
          <li>Visualization of success</li>
        </ul>

        <blockquote>
          Your mindset controls your performance.
        </blockquote>
      </div>

      {/* BEFORE EXAM DAY */}
      <div className="blog-section">
        <h2>What to Do One Day Before Exam</h2>

        <ul>
          <li>Quick revision only</li>
          <li>Avoid new topics</li>
          <li>Prepare documents</li>
          <li>Sleep early</li>
        </ul>
      </div>

      {/* DURING EXAM */}
      <div className="blog-section">
        <h2>How to Stay Calm During Exam</h2>

        <ul>
          <li>Read question paper calmly</li>
          <li>Start with easy questions</li>
          <li>Manage time properly</li>
          <li>Don’t panic if one question is tough</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Stress Management Mistakes</h2>

        <ul>
          <li>Overthinking results</li>
          <li>Studying without breaks</li>
          <li>Comparing with others</li>
          <li>Ignoring health</li>
        </ul>
      </div>

      {/* LONG TERM STRATEGY */}
      <div className="blog-section">
        <h2>Long-Term Stress Reduction Strategy</h2>

        <ul>
          <li>Exercise regularly</li>
          <li>Maintain healthy diet</li>
          <li>Keep hobbies alive</li>
          <li>Stay connected with positive people</li>
        </ul>

        <div className="highlight-box">
          A healthy body supports a calm mind.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is exam stress normal?</h4>
          <p>Yes, moderate stress improves performance.</p>
        </div>

        <div className="faq-box">
          <h4>How to calm down quickly?</h4>
          <p>Deep breathing for 2–3 minutes helps immediately.</p>
        </div>

        <div className="faq-box">
          <h4>Does stress reduce marks?</h4>
          <p>Excessive stress can affect concentration and memory.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Plan properly.  
          Revise consistently.  
          Sleep well.  
          Stay positive.  
          You are more capable than you think.
        </div>
      </div>

    </BlogLayout>
  );
}