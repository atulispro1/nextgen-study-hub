import { useParams } from "react-router-dom";
import SEO from "../components/SEO";

const notesData = {

  /* ================= NOTES PAGES ================= */

  "dbms-notes": {
    title: "DBMS Notes for Engineering & Diploma Students",
    description:
      "Complete DBMS notes covering database concepts, normalization, keys, SQL queries and transaction management for engineering and diploma students.",
  },

  "c-programming-notes": {
    title: "C Programming Notes for Beginners",
    description:
      "Learn C programming with structured notes covering variables, loops, functions, pointers, arrays and important exam concepts.",
  },

  "computer-network-notes": {
    title: "Computer Network Notes for Engineering Students",
    description:
      "Computer network notes covering OSI model, TCP/IP, network protocols, routing, switching and important exam topics.",
  },

  "operating-system-notes": {
    title: "Operating System Notes for Diploma & Engineering",
    description:
      "Operating system notes covering process management, memory management, scheduling algorithms, file systems and OS concepts.",
  },

  "data-structure-notes": {
    title: "Data Structure Notes for Engineering Students",
    description:
      "Complete data structure notes covering arrays, linked lists, stacks, queues, trees, graphs and algorithms for students.",
  },

  "java-programming-notes": {
    title: "Java Programming Notes for Beginners",
    description:
      "Java programming notes covering OOP concepts, classes, inheritance, polymorphism, interfaces and exception handling.",
  },

  "python-programming-notes": {
    title: "Python Programming Notes for Beginners",
    description:
      "Learn Python programming with notes covering syntax, loops, functions, OOP concepts, data structures and beginner projects.",
  },

  "software-engineering-notes": {
    title: "Software Engineering Notes for Computer Science Students",
    description:
      "Software engineering notes covering SDLC models, agile methodology, requirement analysis, software design and testing.",
  },

  "computer-organization-notes": {
    title: "Computer Organization Notes for Engineering Students",
    description:
      "Computer organization notes covering CPU architecture, memory hierarchy, instruction cycles and computer system fundamentals.",
  },

  "oop-notes": {
    title: "Object Oriented Programming Notes",
    description:
      "Object oriented programming notes explaining classes, objects, inheritance, polymorphism, encapsulation and abstraction.",
  },

  /* ================= MCQ PAGES ================= */

  "dbms-mcq": {
    title: "DBMS MCQ Questions with Answers",
    description:
      "Practice DBMS MCQ questions with answers covering database design, normalization, SQL queries and transaction management.",
  },

  "c-programming-mcq": {
    title: "C Programming MCQ Questions with Answers",
    description:
      "C programming MCQ questions for students preparing for exams and interviews including pointers, arrays and functions.",
  },

  "data-structure-mcq": {
    title: "Data Structure MCQ Questions for Practice",
    description:
      "Data structure MCQ questions covering stacks, queues, trees, graphs, searching and sorting algorithms.",
  },

  "java-mcq": {
    title: "Java Programming MCQ Questions",
    description:
      "Java programming MCQ questions covering OOP concepts, inheritance, polymorphism, exception handling and collections.",
  },

  "computer-network-mcq": {
    title: "Computer Network MCQ Questions",
    description:
      "Computer network MCQ questions covering OSI model, TCP/IP protocols, routing and networking fundamentals.",
  },

  "operating-system-mcq": {
    title: "Operating System MCQ Questions",
    description:
      "Operating system MCQ questions covering process scheduling, memory management, deadlocks and file systems.",
  },

  /* ================= INTERVIEW PAGES ================= */

  "dbms-interview-questions": {
    title: "DBMS Interview Questions for Freshers",
    description:
      "Top DBMS interview questions and answers covering database concepts, SQL queries and normalization.",
  },

  "c-programming-interview-questions": {
    title: "C Programming Interview Questions",
    description:
      "Important C programming interview questions covering pointers, memory allocation, arrays and functions.",
  },

  "java-interview-questions": {
    title: "Java Interview Questions for Beginners",
    description:
      "Top Java interview questions covering OOP concepts, multithreading, collections and exception handling.",
  },

  "data-structure-interview-questions": {
    title: "Data Structure Interview Questions",
    description:
      "Most asked data structure interview questions covering trees, graphs, stacks, queues and algorithms.",
  },

  /* ================= PROGRAMMING GUIDES ================= */

  "learn-c-programming": {
    title: "Learn C Programming Step by Step",
    description:
      "Beginner friendly guide to learn C programming including syntax, loops, arrays, pointers and practical examples.",
  },

  "learn-java-programming": {
    title: "Learn Java Programming for Beginners",
    description:
      "Step by step Java programming tutorial covering classes, objects, inheritance and real programming examples.",
  },

  "learn-python-programming": {
    title: "Learn Python Programming for Beginners",
    description:
      "Complete Python programming guide covering variables, loops, functions, libraries and beginner projects.",
  },

  /* ================= STUDENT GUIDES ================= */

  "diploma-computer-science-guide": {
    title: "Diploma Computer Science Study Guide",
    description:
      "Complete study guide for diploma computer science students including notes, programming resources and exam preparation strategies.",
  },

  "how-to-study-engineering-effectively": {
    title: "How to Study Engineering Subjects Effectively",
    description:
      "Best study techniques for engineering students including revision strategies, time management and exam preparation.",
  },

  "engineering-exam-preparation-guide": {
    title: "Engineering Exam Preparation Guide",
    description:
      "Smart strategies for preparing engineering exams including study plans, revision methods and productivity tips.",
  },

};

export default function NotesSEO() {
  const { slug } = useParams();
  const page = notesData[slug];

  if (!page) {
    return <h2 style={{ padding: "100px" }}>Notes not found</h2>;
  }

  return (
    <>
      <SEO
        title={page.title}
        description={page.description}
        url={`https://www.atulsharmas.in/${slug}`}
      />

      <div className="section" style={{ maxWidth: "900px", margin: "auto" }}>
        <h1>{page.title}</h1>
        <div style={{ marginTop: "40px" }}>
          <h2>Complete Study Material for Engineering and Diploma Students</h2>

          <p>
            These study notes are designed for diploma and engineering students
            who want clear explanations of important concepts. The material
            covers theory, examples, diagrams and exam-focused topics that help
            students prepare efficiently for semester exams.
          </p>

          <p>
            Our study resources simplify complex subjects like database
            management, programming, computer networks and operating systems so
            students can understand concepts faster and revise quickly before
            exams.
          </p>
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "40px" }}>
          <h2>Topics Covered in These Study Notes</h2>

          <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
            <li>Concept explanations with examples</li>
            <li>Important exam questions and answers</li>
            <li>Short notes for quick revision</li>
            <li>Diagrams and structured explanations</li>
            <li>Programming examples for practice</li>
          </ul>
        </div>

        <div style={{ marginTop: "50px" }}>
          <h2>Why These Engineering Notes Are Helpful</h2>

          <p>
            Students often struggle to find simple and structured study material
            online. These notes are written in an easy-to-understand format that
            helps learners grasp concepts quickly and focus on the most
            important topics for exams.
          </p>

          <p>
            Whether you are preparing for diploma semester exams or revising
            computer science subjects, these notes provide a structured approach
            to learning technical concepts.
          </p>
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "50px" }}>
          <h2>How to Use These Study Notes Effectively</h2>

          <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
            <li>Read the concept explanation carefully</li>
            <li>Understand examples and diagrams</li>
            <li>Revise key points before exams</li>
            <li>Practice related programming questions</li>
            <li>Use the notes for quick revision during exams</li>
          </ul>
        </div>

        <div style={{ marginTop: "60px" }}>
          <h2>Frequently Asked Questions</h2>

          <div className="faq-box">
            <h4>Are these notes useful for diploma students?</h4>

            <p>
              Yes. These notes are specifically designed for diploma computer
              science and engineering students preparing for semester exams.
            </p>
          </div>

          <div className="faq-box">
            <h4>Can engineering students use these notes?</h4>

            <p>
              Yes. The concepts covered in these notes are useful for both
              diploma and engineering students studying computer science
              subjects.
            </p>
          </div>

          <div className="faq-box">
            <h4>Are these notes good for exam preparation?</h4>

            <p>
              Yes. The material focuses on important exam topics, concept
              clarity and quick revision techniques.
            </p>
          </div>
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "60px" }}>
          <h2>Explore More Study Resources</h2>

          <p>
            You can also explore our complete collection of engineering notes,
            study tips and student productivity tools designed to improve
            learning efficiency and exam performance.
          </p>

          <a
            href="/notes-library"
            className="btn-primary"
            style={{ marginTop: "20px", display: "inline-block" }}
          >
            Explore Notes Library
          </a>
        </div>
      </div>
    </>
  );
}
