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
          Viva exams are different from written exams. In written exams,
          you get time to think and write answers. In viva,
          you must answer instantly, clearly, and confidently.
        </p>

        <p>
          Many students fear viva because they are afraid of:
          forgetting answers, getting nervous, or facing strict external examiners.
        </p>

        <div className="highlight-box">
          Viva is not about knowing everything.  
          It is about explaining what you know confidently.
        </div>
      </div>

      {/* WHY VIVA IS IMPORTANT */}
      <div className="blog-section">
        <h2>Why Viva Exams Are Important</h2>

        <ul>
          <li>Tests conceptual clarity</li>
          <li>Checks practical knowledge</li>
          <li>Improves communication skills</li>
          <li>Prepares you for interviews</li>
        </ul>

        <p>
          In technical courses like Diploma CS, viva is used to check
          whether you really understand your project or just memorized theory.
        </p>
      </div>

      {/* TYPES OF VIVA QUESTIONS */}
      <div className="blog-section">
        <h2>Types of Questions Asked in Viva</h2>

        <h3>1. Basic Concept Questions</h3>
        <p>Example:</p>
        <ul>
          <li>What is a data structure?</li>
          <li>What is normalization in DBMS?</li>
          <li>Explain OOPS principles.</li>
        </ul>

        <h3>2. Project-Based Questions</h3>
        <ul>
          <li>Why did you choose this project?</li>
          <li>What technologies did you use?</li>
          <li>What challenges did you face?</li>
        </ul>

        <h3>3. Application-Based Questions</h3>
        <ul>
          <li>Where is stack used in real life?</li>
          <li>Difference between array and linked list?</li>
        </ul>

        <blockquote>
          Examiners test understanding, not memorization.
        </blockquote>
      </div>

      {/* HOW TO PREPARE */}
      <div className="blog-section">
        <h2>Step-by-Step Viva Preparation Strategy</h2>

        <h3>Step 1: Revise Core Concepts</h3>
        <p>
          Go through your syllabus and prepare short explanations
          for each major topic.
        </p>

        <h3>Step 2: Prepare Your Project Thoroughly</h3>
        <ul>
          <li>Know project objective</li>
          <li>Understand code logic</li>
          <li>Be ready to explain flow</li>
          <li>Prepare future improvements</li>
        </ul>

        <h3>Step 3: Practice Speaking Answers</h3>
        <p>
          Don’t just read silently. Speak answers loudly.
        </p>

        <h3>Step 4: Prepare Definitions + Examples</h3>
        <p>
          Every concept should include definition + example.
        </p>

        <div className="highlight-box">
          Structure your answer as:  
          Definition → Explanation → Example → Application
        </div>
      </div>

      {/* BODY LANGUAGE */}
      <div className="blog-section">
        <h2>Body Language During Viva</h2>

        <ul>
          <li>Maintain eye contact</li>
          <li>Speak clearly and slowly</li>
          <li>Don’t argue aggressively</li>
          <li>Smile lightly and stay calm</li>
          <li>Don’t say “I don’t know” immediately — try partial answer</li>
        </ul>

        <p>
          Confidence in body language can increase your marks significantly.
        </p>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Viva Mistakes Students Make</h2>

        <ul>
          <li>Memorizing answers word by word</li>
          <li>Speaking too fast due to nervousness</li>
          <li>Giving one-line answers</li>
          <li>Not preparing project explanation</li>
          <li>Panic when asked unexpected question</li>
        </ul>
      </div>

      {/* SAMPLE ANSWER STRUCTURE */}
      <div className="blog-section">
        <h2>Sample Answer Structure Example</h2>

        <h3>Question: What is DBMS?</h3>

        <p>
          A Database Management System (DBMS) is software used to store,
          manage, and retrieve data efficiently.
        </p>

        <p>
          It ensures data security, reduces redundancy,
          and allows multiple users to access data.
        </p>

        <p>
          Example: MySQL, Oracle, SQL Server.
        </p>

        <blockquote>
          Short, structured answers impress examiners.
        </blockquote>
      </div>

      {/* 7 DAY PLAN */}
      <div className="blog-section">
        <h2>7-Day Viva Preparation Plan</h2>

        <h3>Day 1–2</h3>
        <p>Revise all theory subjects.</p>

        <h3>Day 3–4</h3>
        <p>Prepare project explanation and demo.</p>

        <h3>Day 5</h3>
        <p>Practice answering 50 possible viva questions.</p>

        <h3>Day 6</h3>
        <p>Mock viva with friend or teacher.</p>

        <h3>Day 7</h3>
        <p>Quick revision + confidence building.</p>

        <div className="highlight-box">
          Practice reduces fear. Preparation builds confidence.
        </div>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>What if I don’t know the answer?</h4>
          <p>Politely say you are not sure but try to explain related concept.</p>
        </div>

        <div className="faq-box">
          <h4>Is fluency in English necessary?</h4>
          <p>No. Clarity matters more than accent.</p>
        </div>

        <div className="faq-box">
          <h4>How to reduce viva fear?</h4>
          <p>Practice speaking answers daily and do mock viva.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand concepts deeply.  
          Practice speaking confidently.  
          Prepare project thoroughly.  
          Stay calm and positive.  
          Viva can boost your overall grade.
        </div>
      </div>

    </BlogLayout>
  );
}