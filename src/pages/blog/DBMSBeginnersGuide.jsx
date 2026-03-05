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
          Data is one of the most valuable resources in the modern digital world.
          Every application — from social media platforms to banking systems —
          relies on databases to store and manage information efficiently.
        </p>

        <p>
          A Database Management System (DBMS) is software that allows users to
          create, manage, and retrieve data in an organized way.
        </p>

        <div className="highlight-box">
          DBMS ensures data is stored securely, efficiently, and can be accessed easily.
        </div>
      </div>

      {/* WHAT IS DBMS */}
      <div className="blog-section">
        <h2>What is a DBMS?</h2>

        <p>
          A Database Management System is software used to manage databases.
          It provides an interface for storing, retrieving, and manipulating data.
        </p>

        <p>
          Instead of storing data randomly, DBMS organizes information into tables,
          making it easier to search and update records.
        </p>

        <blockquote>
          DBMS makes data management structured and efficient.
        </blockquote>
      </div>

      {/* EXAMPLES */}
      <div className="blog-section">
        <h2>Examples of DBMS</h2>

        <ul>
          <li>MySQL</li>
          <li>Oracle Database</li>
          <li>Microsoft SQL Server</li>
          <li>PostgreSQL</li>
          <li>MongoDB (NoSQL database)</li>
        </ul>

        <p>
          These systems are widely used in companies and large applications.
        </p>
      </div>

      {/* COMPONENTS */}
      <div className="blog-section">
        <h2>Components of DBMS</h2>

        <h3>1. Database</h3>
        <p>
          A structured collection of data stored electronically.
        </p>

        <h3>2. Database Engine</h3>
        <p>
          Responsible for storing and retrieving data.
        </p>

        <h3>3. Query Processor</h3>
        <p>
          Interprets and executes SQL queries.
        </p>

        <h3>4. Database Schema</h3>
        <p>
          Defines how data is organized in the database.
        </p>
      </div>

      {/* KEY CONCEPTS */}
      <div className="blog-section">
        <h2>Important DBMS Concepts</h2>

        <h3>Tables</h3>
        <p>
          Data in DBMS is stored in tables consisting of rows and columns.
        </p>

        <h3>Primary Key</h3>
        <p>
          A unique identifier for each record in a table.
        </p>

        <h3>Foreign Key</h3>
        <p>
          A key used to establish relationships between tables.
        </p>

        <h3>Normalization</h3>
        <p>
          A process used to eliminate data redundancy and maintain consistency.
        </p>

        <blockquote>
          Proper database design improves performance and reliability.
        </blockquote>
      </div>

      {/* SQL SECTION */}
      <div className="blog-section">
        <h2>What is SQL?</h2>

        <p>
          SQL (Structured Query Language) is the language used to interact
          with databases.
        </p>

        <p>
          It allows users to perform operations like:
        </p>

        <ul>
          <li>Insert data</li>
          <li>Update records</li>
          <li>Delete data</li>
          <li>Retrieve information</li>
        </ul>
      </div>

      {/* ADVANTAGES */}
      <div className="blog-section">
        <h2>Advantages of DBMS</h2>

        <ul>
          <li>Reduces data redundancy</li>
          <li>Improves data security</li>
          <li>Ensures data consistency</li>
          <li>Allows multiple users to access data</li>
        </ul>
      </div>

      {/* STUDY STRATEGY */}
      <div className="blog-section">
        <h2>How to Study DBMS Effectively</h2>

        <ul>
          <li>Understand database design concepts</li>
          <li>Practice SQL queries</li>
          <li>Learn normalization rules</li>
          <li>Solve previous year questions</li>
        </ul>

        <div className="highlight-box">
          Hands-on practice with SQL improves understanding significantly.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Students Make</h2>

        <ul>
          <li>Memorizing definitions without understanding</li>
          <li>Not practicing SQL queries</li>
          <li>Ignoring database relationships</li>
          <li>Skipping normalization concepts</li>
        </ul>
      </div>

      {/* INTERVIEW QUESTIONS */}
      <div className="blog-section">
        <h2>Important Interview Questions</h2>

        <ul>
          <li>What is DBMS?</li>
          <li>Difference between DBMS and RDBMS?</li>
          <li>What is normalization?</li>
          <li>Explain primary key and foreign key.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is DBMS important for software developers?</h4>
          <p>
            Yes, database knowledge is essential for backend development.
          </p>
        </div>

        <div className="faq-box">
          <h4>Is SQL difficult to learn?</h4>
          <p>
            No, SQL is one of the easiest programming languages to learn.
          </p>
        </div>

        <div className="faq-box">
          <h4>Do companies ask DBMS questions in interviews?</h4>
          <p>
            Yes, DBMS is a core subject asked in many technical interviews.
          </p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand database concepts clearly.  
          Practice SQL regularly.  
          Learn normalization and relationships.  
          DBMS knowledge is essential for modern software development.
        </div>
      </div>

    </BlogLayout>
  );
}