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
          An Operating System (OS) is one of the most important components of a
          computer system. Without an operating system, a computer cannot
          function properly because it manages hardware resources and allows
          software applications to run smoothly.
        </p>

        <p>
          Every computer, smartphone, and server uses an operating system.
          Popular examples include Windows, Linux, macOS, and Android.
        </p>

        <div className="highlight-box">
          The Operating System acts as a bridge between the user and the computer hardware.
        </div>
      </div>

      {/* WHAT IS OS */}
      <div className="blog-section">
        <h2>What is an Operating System?</h2>

        <p>
          An Operating System is system software that manages computer hardware
          and provides services to application programs.
        </p>

        <p>
          It controls resources like CPU, memory, storage devices, and input/output devices.
        </p>

        <blockquote>
          Without an operating system, users would need to communicate directly
          with hardware — which is extremely complex.
        </blockquote>
      </div>

      {/* FUNCTIONS */}
      <div className="blog-section">
        <h2>Main Functions of an Operating System</h2>

        <h3>1. Process Management</h3>
        <p>
          The operating system manages running programs (processes) and ensures
          that CPU time is allocated efficiently.
        </p>

        <h3>2. Memory Management</h3>
        <p>
          The OS controls how memory is allocated and used by different programs.
        </p>

        <h3>3. File System Management</h3>
        <p>
          It organizes files and directories on storage devices.
        </p>

        <h3>4. Device Management</h3>
        <p>
          The OS manages communication between hardware devices such as printers,
          keyboards, and storage drives.
        </p>

        <h3>5. Security and Access Control</h3>
        <p>
          Protects data by controlling user access and permissions.
        </p>
      </div>

      {/* TYPES OF OS */}
      <div className="blog-section">
        <h2>Types of Operating Systems</h2>

        <h3>1. Batch Operating System</h3>
        <p>
          Executes batches of jobs without user interaction.
        </p>

        <h3>2. Time-Sharing Operating System</h3>
        <p>
          Allows multiple users to share system resources simultaneously.
        </p>

        <h3>3. Distributed Operating System</h3>
        <p>
          Manages multiple computers connected in a network.
        </p>

        <h3>4. Real-Time Operating System</h3>
        <p>
          Used in systems where quick response is critical, such as medical equipment.
        </p>

        <h3>5. Mobile Operating System</h3>
        <p>
          Designed for smartphones and tablets, like Android and iOS.
        </p>
      </div>

      {/* IMPORTANT CONCEPTS */}
      <div className="blog-section">
        <h2>Important Operating System Concepts</h2>

        <h3>Process vs Thread</h3>
        <p>
          A process is a program in execution, while a thread is the smallest
          unit of execution within a process.
        </p>

        <h3>Deadlock</h3>
        <p>
          A deadlock occurs when two or more processes wait indefinitely for
          resources held by each other.
        </p>

        <h3>CPU Scheduling</h3>
        <p>
          The OS decides which process gets CPU time using scheduling algorithms.
        </p>

        <blockquote>
          Efficient scheduling improves system performance.
        </blockquote>
      </div>

      {/* REAL WORLD EXAMPLES */}
      <div className="blog-section">
        <h2>Real-World Examples of Operating Systems</h2>

        <ul>
          <li>Windows – Personal computers</li>
          <li>Linux – Servers and development environments</li>
          <li>macOS – Apple computers</li>
          <li>Android – Smartphones</li>
          <li>iOS – Apple mobile devices</li>
        </ul>
      </div>

      {/* STUDY STRATEGY */}
      <div className="blog-section">
        <h2>How to Study Operating Systems for Exams</h2>

        <ul>
          <li>Understand definitions and concepts</li>
          <li>Practice diagrams and flowcharts</li>
          <li>Revise scheduling algorithms</li>
          <li>Solve previous year questions</li>
        </ul>

        <div className="highlight-box">
          Concept clarity is more important than memorization.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Memorizing definitions without understanding</li>
          <li>Ignoring diagrams</li>
          <li>Not practicing conceptual questions</li>
          <li>Skipping revision</li>
        </ul>
      </div>

      {/* INTERVIEW QUESTIONS */}
      <div className="blog-section">
        <h2>Important Interview Questions</h2>

        <ul>
          <li>What is an operating system?</li>
          <li>Difference between process and thread?</li>
          <li>What is deadlock?</li>
          <li>Explain CPU scheduling.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Operating System important for placements?</h4>
          <p>
            Yes, OS is a core subject frequently asked in technical interviews.
          </p>
        </div>

        <div className="faq-box">
          <h4>Which OS is most popular?</h4>
          <p>
            Windows for personal computers and Linux for servers.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is OS difficult to learn?</h4>
          <p>
            It becomes easy when concepts are understood with examples.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Learn core concepts clearly.  
          Understand processes and memory management.  
          Practice diagrams and examples.  
          Operating Systems knowledge is essential for every computer science student.
        </div>
      </div>

    </BlogLayout>
  );
}