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
          Data Structures form the backbone of Computer Science.
          Whether you are preparing for semester exams, coding interviews,
          competitive programming, or product-based company placements —
          Data Structures are unavoidable.
        </p>

        <p>
          Many students jump directly into solving problems
          without understanding fundamentals. That creates confusion.
          This guide will help you build a deep, structured foundation.
        </p>

        <div className="highlight-box">
          If you master Data Structures properly,
          you automatically become 10x stronger in problem solving.
        </div>
      </div>

      {/* WHAT IS DATA STRUCTURE */}
      <div className="blog-section">
        <h2>What is a Data Structure?</h2>

        <p>
          A Data Structure is a way of organizing and storing data
          so that it can be accessed and modified efficiently.
        </p>

        <p>
          Think of it like organizing books in a library.
          The way books are arranged determines how quickly
          you can find one.
        </p>

        <blockquote>
          Good data structure choice = Faster program execution.
        </blockquote>
      </div>

      {/* WHY IMPORTANT */}
      <div className="blog-section">
        <h2>Why Data Structures Are Important</h2>

        <ul>
          <li>Improve program efficiency</li>
          <li>Optimize memory usage</li>
          <li>Crucial for coding interviews</li>
          <li>Used in real-world systems</li>
        </ul>

        <p>
          Companies like Google, Amazon, Microsoft test
          Data Structure knowledge in interviews.
        </p>
      </div>

      {/* TYPES */}
      <div className="blog-section">
        <h2>Types of Data Structures</h2>

        <h3>1. Linear Data Structures</h3>
        <ul>
          <li>Array</li>
          <li>Linked List</li>
          <li>Stack</li>
          <li>Queue</li>
        </ul>

        <h3>2. Non-Linear Data Structures</h3>
        <ul>
          <li>Tree</li>
          <li>Graph</li>
        </ul>

        <h3>3. Hash-Based Structures</h3>
        <ul>
          <li>Hash Table</li>
          <li>Map</li>
        </ul>
      </div>

      {/* ARRAYS */}
      <div className="blog-section">
        <h2>Array (Foundation Structure)</h2>

        <p>
          Arrays store elements in contiguous memory locations.
          They allow fast access using index.
        </p>

        <p>
          Time Complexity:
        </p>

        <ul>
          <li>Access: O(1)</li>
          <li>Search: O(n)</li>
          <li>Insertion (middle): O(n)</li>
        </ul>

        <p>
          Arrays are best when size is fixed and fast access is needed.
        </p>
      </div>

      {/* LINKED LIST */}
      <div className="blog-section">
        <h2>Linked List</h2>

        <p>
          Linked Lists consist of nodes.
          Each node contains data and pointer to next node.
        </p>

        <p>
          Types:
        </p>

        <ul>
          <li>Singly Linked List</li>
          <li>Doubly Linked List</li>
          <li>Circular Linked List</li>
        </ul>

        <blockquote>
          Linked List is useful when dynamic memory allocation is required.
        </blockquote>
      </div>

      {/* STACK */}
      <div className="blog-section">
        <h2>Stack (LIFO Structure)</h2>

        <p>
          Stack follows Last In First Out principle.
        </p>

        <ul>
          <li>Push</li>
          <li>Pop</li>
          <li>Peek</li>
        </ul>

        <p>
          Used in:
        </p>

        <ul>
          <li>Undo operations</li>
          <li>Function calls (Call Stack)</li>
          <li>Expression evaluation</li>
        </ul>
      </div>

      {/* QUEUE */}
      <div className="blog-section">
        <h2>Queue (FIFO Structure)</h2>

        <p>
          Queue follows First In First Out principle.
        </p>

        <ul>
          <li>Enqueue</li>
          <li>Dequeue</li>
        </ul>

        <p>
          Used in:
        </p>

        <ul>
          <li>CPU scheduling</li>
          <li>Printer management</li>
        </ul>
      </div>

      {/* TREE */}
      <div className="blog-section">
        <h2>Tree Data Structure</h2>

        <p>
          Tree is hierarchical data structure.
          It consists of root node and child nodes.
        </p>

        <p>
          Important Types:
        </p>

        <ul>
          <li>Binary Tree</li>
          <li>Binary Search Tree</li>
          <li>AVL Tree</li>
          <li>Heap</li>
        </ul>

        <p>
          Trees are widely used in database indexing and file systems.
        </p>
      </div>

      {/* GRAPH */}
      <div className="blog-section">
        <h2>Graph Data Structure</h2>

        <p>
          Graph consists of vertices and edges.
          Used to represent networks.
        </p>

        <p>
          Applications:
        </p>

        <ul>
          <li>Social networks</li>
          <li>Google Maps</li>
          <li>Routing systems</li>
        </ul>
      </div>

      {/* COMPLEXITY */}
      <div className="blog-section">
        <h2>Time and Space Complexity</h2>

        <p>
          Big-O notation is used to measure efficiency.
        </p>

        <ul>
          <li>O(1) – Constant</li>
          <li>O(log n) – Logarithmic</li>
          <li>O(n) – Linear</li>
          <li>O(n²) – Quadratic</li>
        </ul>

        <blockquote>
          Always choose data structure that minimizes complexity.
        </blockquote>
      </div>

      {/* PRACTICE PLAN */}
      <div className="blog-section">
        <h2>90-Day Data Structure Master Plan</h2>

        <h3>Month 1</h3>
        <p>Arrays, Strings, Linked List</p>

        <h3>Month 2</h3>
        <p>Stack, Queue, Recursion, Trees</p>

        <h3>Month 3</h3>
        <p>Graphs, Hashing, Advanced problems</p>

        <div className="highlight-box">
          Solve 3–5 problems daily.
        </div>
      </div>

      {/* COMMON MISTAKES */}
      <div className="blog-section">
        <h2>Common Mistakes Beginners Make</h2>

        <ul>
          <li>Skipping fundamentals</li>
          <li>Not practicing daily</li>
          <li>Memorizing solutions</li>
          <li>Ignoring time complexity</li>
        </ul>
      </div>

      {/* INTERVIEW SECTION */}
      <div className="blog-section">
        <h2>Important Interview Questions</h2>

        <ul>
          <li>Difference between Array and Linked List?</li>
          <li>Explain stack using array.</li>
          <li>What is binary search tree?</li>
          <li>Explain time complexity of merge sort.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="blog-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>Is Data Structure hard?</h4>
          <p>No, with consistent practice it becomes logical and enjoyable.</p>
        </div>

        <div className="faq-box">
          <h4>How long to master it?</h4>
          <p>3–6 months with daily practice.</p>
        </div>

        <div className="faq-box">
          <h4>Which language is best for DSA?</h4>
          <p>C++, Java, or Python — choose one and stick to it.</p>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="blog-section">
        <h2>Final Conclusion</h2>

        <div className="highlight-box">
          Understand fundamentals.  
          Practice consistently.  
          Focus on complexity.  
          Solve problems daily.
        </div>
      </div>
    </BlogLayout>
  );
}