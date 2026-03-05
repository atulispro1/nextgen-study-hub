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
          English communication skills are extremely important in today’s
          professional world. Whether you are attending an interview,
          presenting ideas, or working in a corporate environment,
          speaking English confidently can open many opportunities.
        </p>

        <p>
          Many students understand English but struggle to speak fluently.
          The good news is that speaking skills can be improved with
          regular practice and the right approach.
        </p>

        <div className="highlight-box">
          Fluency in English is not about perfection — it is about confidence
          and practice.
        </div>
      </div>

      {/* WHY ENGLISH IMPORTANT */}
      <div className="blog-section">
        <h2>Why English Speaking Skills Are Important</h2>

        <ul>
          <li>Helps in job interviews</li>
          <li>Improves confidence in communication</li>
          <li>Useful for presentations and meetings</li>
          <li>Required in many professional environments</li>
          <li>Helps build global connections</li>
        </ul>

        <blockquote>
          Communication skills are often as important as technical skills.
        </blockquote>
      </div>

      {/* STEP 1 */}
      <div className="blog-section">
        <h2>Step 1: Start Thinking in English</h2>

        <p>
          Many learners first think in their native language and then
          translate sentences into English. This slows down communication.
        </p>

        <p>
          Try to think directly in English while forming sentences.
        </p>
      </div>

      {/* STEP 2 */}
      <div className="blog-section">
        <h2>Step 2: Practice Speaking Every Day</h2>

        <p>
          Regular speaking practice is essential for fluency.
        </p>

        <ul>
          <li>Talk with friends in English</li>
          <li>Practice speaking in front of a mirror</li>
          <li>Join English conversation groups</li>
          <li>Record your voice and listen</li>
        </ul>

        <div className="highlight-box">
          Even 15–20 minutes of daily practice can significantly improve fluency.
        </div>
      </div>

      {/* STEP 3 */}
      <div className="blog-section">
        <h2>Step 3: Improve Vocabulary</h2>

        <p>
          Learning new words helps you express ideas clearly.
        </p>

        <ul>
          <li>Learn 5–10 new words daily</li>
          <li>Use words in sentences</li>
          <li>Maintain a vocabulary notebook</li>
        </ul>
      </div>

      {/* STEP 4 */}
      <div className="blog-section">
        <h2>Step 4: Listen to English Content</h2>

        <p>
          Listening helps you understand pronunciation and sentence structure.
        </p>

        <ul>
          <li>Watch English movies</li>
          <li>Listen to podcasts</li>
          <li>Watch educational YouTube channels</li>
          <li>Follow English news channels</li>
        </ul>

        <blockquote>
          Listening improves pronunciation naturally.
        </blockquote>
      </div>

      {/* STEP 5 */}
      <div className="blog-section">
        <h2>Step 5: Read English Regularly</h2>

        <p>
          Reading helps improve vocabulary and sentence structure.
        </p>

        <ul>
          <li>Read newspapers</li>
          <li>Read blogs and articles</li>
          <li>Read books and short stories</li>
        </ul>
      </div>

      {/* DAILY PLAN */}
      <div className="blog-section">
        <h2>Daily 30-Minute English Practice Plan</h2>

        <h3>10 Minutes</h3>
        <p>Read English articles or news.</p>

        <h3>10 Minutes</h3>
        <p>Learn new vocabulary words.</p>

        <h3>10 Minutes</h3>
        <p>Practice speaking or conversation.</p>

        <div className="highlight-box">
          Consistency is the key to language improvement.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Fear of making mistakes</li>
          <li>Not practicing regularly</li>
          <li>Memorizing sentences without understanding</li>
          <li>Ignoring pronunciation practice</li>
        </ul>
      </div>

      {/* INTERVIEW BENEFITS */}
      <div className="blog-section">
        <h2>How English Helps in Job Interviews</h2>

        <ul>
          <li>Clear communication with recruiters</li>
          <li>Better presentation of ideas</li>
          <li>Confidence during interviews</li>
        </ul>

        <blockquote>
          Strong communication skills increase employability.
        </blockquote>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>How long does it take to improve English speaking?</h4>
          <p>
            With daily practice, noticeable improvement can happen within
            2–3 months.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is grammar necessary for speaking?</h4>
          <p>
            Basic grammar helps, but confidence and practice matter more.
          </p>
        </div>

        <div className="faq-box">
          <h4>Can I improve English without coaching?</h4>
          <p>
            Yes, self-practice and online resources can be very effective.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Practice speaking daily.  
          Improve vocabulary gradually.  
          Listen and read regularly.  
          Stay confident while communicating.  
          English fluency develops with consistent effort.
        </div>
      </div>

    </BlogLayout>
  );
}