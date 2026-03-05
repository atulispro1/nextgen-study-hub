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
          A well-planned study routine helps students stay focused,
          productive, and consistent. Many students struggle with
          procrastination, distractions, and lack of discipline.
        </p>

        <p>
          Creating a daily study routine helps build good habits
          and improves academic performance.
        </p>

        <div className="highlight-box">
          Success in studies depends more on consistency than intelligence.
        </div>
      </div>

      {/* MORNING ROUTINE */}
      <div className="blog-section">
        <h2>Morning Study Routine</h2>

        <h3>6:00 AM – Wake Up</h3>
        <p>
          Starting your day early improves productivity and focus.
        </p>

        <h3>6:30 AM – Light Exercise</h3>
        <p>
          Physical activity helps improve concentration and energy levels.
        </p>

        <h3>7:00 AM – Study Difficult Subjects</h3>
        <p>
          Morning hours are ideal for studying complex topics like mathematics
          or programming.
        </p>
      </div>

      {/* AFTERNOON ROUTINE */}
      <div className="blog-section">
        <h2>Afternoon Study Routine</h2>

        <h3>12:00 PM – Revision</h3>
        <p>
          Review topics studied earlier to strengthen memory.
        </p>

        <h3>2:00 PM – Practice Problems</h3>
        <p>
          Solve numerical problems or coding exercises.
        </p>
      </div>

      {/* EVENING ROUTINE */}
      <div className="blog-section">
        <h2>Evening Study Routine</h2>

        <h3>5:00 PM – Skill Development</h3>
        <p>
          Learn new skills such as coding, communication, or digital marketing.
        </p>

        <h3>7:00 PM – Light Revision</h3>
        <p>
          Revise important concepts studied during the day.
        </p>
      </div>

      {/* NIGHT ROUTINE */}
      <div className="blog-section">
        <h2>Night Routine</h2>

        <h3>9:00 PM – Plan Next Day</h3>
        <p>
          Make a to-do list for the next day.
        </p>

        <h3>10:30 PM – Sleep</h3>
        <p>
          Proper sleep improves memory and concentration.
        </p>
      </div>

      {/* PRODUCTIVITY TIPS */}
      <div className="blog-section">
        <h2>Productivity Tips for Students</h2>

        <ul>
          <li>Use the Pomodoro technique</li>
          <li>Avoid mobile distractions</li>
          <li>Study in a quiet environment</li>
          <li>Take short breaks</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Study Mistakes</h2>

        <ul>
          <li>Studying without a schedule</li>
          <li>Procrastination</li>
          <li>Overloading yourself with tasks</li>
          <li>Not revising regularly</li>
        </ul>
      </div>

      {/* FINAL CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Create a realistic routine.  
          Stay consistent.  
          Focus on daily progress.  
          Small improvements every day lead to big success.
        </div>
      </div>

    </BlogLayout>
  );
}