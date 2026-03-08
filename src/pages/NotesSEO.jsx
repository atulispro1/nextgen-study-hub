import { useParams } from "react-router-dom";
import SEO from "../components/SEO";

const notesData = {
  "dbms-notes": {
    title: "DBMS Notes PDF – Database Management System Study Material",
    description:
      "Download DBMS notes PDF for diploma and engineering students. Learn database concepts, SQL, normalization, transactions and exam preparation topics.",
  },
  "c-programming-notes": {
    title: "C Programming Notes PDF – Complete Guide for Students",
    description:
      "C programming notes for beginners and engineering students covering syntax, loops, functions, pointers and exam preparation topics.",
  },
  "computer-network-notes": {
    title: "Computer Network Notes PDF – Networking Study Material",
    description:
      "Computer network notes covering OSI model, TCP/IP, protocols, routing and networking fundamentals for diploma and engineering students.",
  },
  "operating-system-notes": {
    title: "Operating System Notes PDF – OS Concepts and Study Material",
    description:
      "Operating system notes covering process management, memory management, scheduling and file systems for engineering students.",
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
