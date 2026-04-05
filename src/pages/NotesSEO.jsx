import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/SEO";

const defaultPage = {
  audience:
    "Diploma and engineering students looking for simple, exam-focused study help.",
  intro:
    "This page is designed to give students a focused starting point instead of making them search across multiple random resources.",
  details:
    "You will find clear explanations, structured revision points and practical guidance that can help with semester preparation, interview revision or self-study.",
  topics: [
    "Core concepts explained in simple language",
    "Important exam and viva-oriented areas",
    "Short revision points for faster recall",
    "Practical usage examples where useful",
    "Related study links for deeper learning",
  ],
  benefits: [
    "Saves revision time by focusing on high-value topics",
    "Helps students identify what to study first",
    "Improves clarity before exams and interviews",
  ],
  usage: [
    "Start with the overview section and identify weak areas",
    "Use the topic list to plan revision order",
    "Revise the page again before exams for quick recall",
  ],
  faqs: [
    {
      question: "Is this page useful for diploma students?",
      answer:
        "Yes. The content is written for diploma and engineering students who need practical, student-friendly explanations.",
    },
    {
      question: "Can this help with exam preparation?",
      answer:
        "Yes. The page is structured to highlight concepts and revision points that are commonly useful in exams and interviews.",
    },
    {
      question: "Should I also use full notes after reading this page?",
      answer:
        "Yes. This page works best as a focused guide and should be used together with detailed notes, question practice and revision.",
    },
  ],
};

const notesData = {
  "dbms-notes": {
    title: "DBMS Notes for Engineering & Diploma Students",
    description:
      "Complete DBMS notes covering database concepts, normalization, keys, SQL queries and transaction management for engineering and diploma students.",
    audience:
      "Students preparing DBMS for semester exams, lab viva and technical interviews.",
    intro:
      "DBMS is one of the most important computer science subjects because it connects theory with real software development and backend systems.",
    details:
      "A strong DBMS foundation helps students understand how data is stored, organized and queried in real applications.",
    topics: [
      "Database concepts and data models",
      "Keys, relationships and ER basics",
      "Normalization and schema design",
      "SQL queries and transaction concepts",
      "Important exam-oriented DBMS topics",
    ],
    benefits: [
      "Builds better understanding of backend systems",
      "Helps in semester exams and project work",
      "Improves interview readiness for fresher roles",
    ],
    usage: [
      "Study one DBMS concept at a time",
      "Practice SQL after every topic",
      "Revise normalization and keys before exams",
    ],
    faqs: [
      {
        question: "Why is DBMS important for students?",
        answer:
          "DBMS is a core subject in computer science and is also asked in technical interviews, projects and software roles.",
      },
      {
        question: "Should I practice SQL with DBMS notes?",
        answer:
          "Yes. SQL practice makes DBMS concepts much easier to understand and remember.",
      },
      {
        question: "Can these notes help in interviews?",
        answer:
          "Yes. DBMS basics like keys, normalization and SQL are very common interview topics.",
      },
    ],
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
  "dbms-mcq": {
    title: "DBMS MCQ Questions with Answers",
    description:
      "Practice DBMS MCQ questions with answers covering database design, normalization, SQL queries and transaction management.",
    audience:
      "Students who want topic-wise DBMS multiple choice practice before exams, quizzes and placements.",
    intro:
      "DBMS MCQs are useful because they help students test concepts quickly and identify weak areas without spending too much time on long theory answers.",
    details:
      "This page is meant for fast revision, self-testing and improving accuracy in objective-style questions.",
    topics: [
      "DBMS fundamentals and definitions",
      "Keys, normalization and relationships",
      "SQL basics and query understanding",
      "Transactions, concurrency and recovery",
      "Frequently asked DBMS objective patterns",
    ],
    benefits: [
      "Improves speed in objective question solving",
      "Helps with internal tests and competitive prep",
      "Makes revision more active instead of passive reading",
    ],
    usage: [
      "Attempt MCQs after reading one DBMS chapter",
      "Track wrong answers and revise those concepts",
      "Repeat short practice sets before tests and quizzes",
    ],
    faqs: [
      {
        question: "Are DBMS MCQs useful for semester exams?",
        answer:
          "Yes. They are useful for internal tests, quick revision and concept checking before semester exams.",
      },
      {
        question: "Should I memorize MCQ answers only?",
        answer:
          "No. Use MCQs to identify weak concepts, then revise the related topic properly.",
      },
      {
        question: "Can MCQ practice help in placements?",
        answer:
          "Yes. DBMS objective questions are common in aptitude-style technical screening rounds.",
      },
    ],
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
  "dbms-interview-questions": {
    title: "DBMS Interview Questions for Freshers",
    description:
      "Top DBMS interview questions and answers covering database concepts, SQL queries and normalization.",
    audience:
      "Freshers and students preparing for technical interviews, viva and internship screening rounds.",
    intro:
      "DBMS interview questions usually test whether a student understands concepts clearly instead of just remembering textbook definitions.",
    details:
      "This page is focused on high-frequency fresher questions so students can prepare more confidently for interviews and project discussions.",
    topics: [
      "Basic DBMS definitions interviewers ask often",
      "Difference between DBMS and RDBMS",
      "Primary key, foreign key and normalization",
      "SQL and transaction-related concepts",
      "Short explanation-based fresher questions",
    ],
    benefits: [
      "Improves confidence before interview rounds",
      "Helps students explain DBMS in simple words",
      "Useful for viva, placement and internship prep",
    ],
    usage: [
      "Read one question and answer it aloud",
      "Practice explaining concepts in short sentences",
      "Revise SQL and normalization before interview day",
    ],
    faqs: [
      {
        question: "Are DBMS questions asked in fresher interviews?",
        answer:
          "Yes. DBMS is a standard technical interview topic for many software, support and backend-related fresher roles.",
      },
      {
        question: "How should I prepare DBMS interview questions?",
        answer:
          "Focus on definitions, relationships, normalization, keys, SQL basics and practical examples.",
      },
      {
        question: "Is this useful for viva too?",
        answer:
          "Yes. Many DBMS viva questions overlap with fresher interview questions.",
      },
    ],
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
  "diploma-computer-science-guide": {
    title: "Diploma Computer Science Study Guide",
    description:
      "Complete study guide for diploma computer science students including notes, programming resources and exam preparation strategies.",
  },
  "how-to-study-engineering-effectively": {
    title: "How to Study Engineering Subjects Effectively",
    description:
      "Best study techniques for engineering students including revision strategies, time management and exam preparation.",
    audience:
      "Engineering and diploma students who struggle with consistency, backlog pressure or last-minute exam preparation.",
    intro:
      "Studying engineering effectively is less about long study hours and more about using the right revision system for theory, numericals and lab-based subjects.",
    details:
      "Students usually improve faster when they combine planning, active recall and previous-year practice instead of only reading notes passively.",
    topics: [
      "How to plan theory and practical subjects separately",
      "Smart revision methods for semester exams",
      "Ways to manage difficult technical subjects",
      "Daily study routine ideas for engineering students",
      "Common mistakes that reduce retention and marks",
    ],
    benefits: [
      "Makes large syllabus feel easier to manage",
      "Improves consistency across multiple subjects",
      "Reduces exam stress by creating a realistic plan",
    ],
    usage: [
      "Break subjects into weekly targets",
      "Practice one technical concept and one revision block daily",
      "Use previous papers to measure progress every week",
    ],
    faqs: [
      {
        question: "What is the best way to study engineering subjects?",
        answer:
          "Use short daily sessions, active recall, diagram-based revision and previous paper practice instead of only reading theory.",
      },
      {
        question: "How many hours should engineering students study?",
        answer:
          "Consistent focused study is more important than very long hours. Even 2 to 4 good hours daily can create strong results.",
      },
      {
        question: "How can I remember technical subjects better?",
        answer:
          "Use repeated revision, self-testing, diagrams and practical examples so concepts stay in memory longer.",
      },
    ],
  },
  "engineering-exam-preparation-guide": {
    title: "Engineering Exam Preparation Guide",
    description:
      "Smart strategies for preparing engineering exams including study plans, revision methods and productivity tips.",
    audience:
      "Students preparing for engineering semester exams who want a structured revision plan and better marks.",
    intro:
      "Engineering exam preparation becomes easier when students prioritize high-weightage topics, previous papers and revision timing instead of trying to study everything equally.",
    details:
      "A good exam strategy balances subject priority, weak-topic revision and writing practice so performance improves under real exam conditions.",
    topics: [
      "How to prioritize units before semester exams",
      "Revision strategy for theory and problem-solving papers",
      "How to use previous year papers effectively",
      "Mistakes students make in the final 7 to 15 days",
      "How to manage time during exam week",
    ],
    benefits: [
      "Helps students focus on scoring topics first",
      "Improves revision quality in limited time",
      "Creates a more realistic exam-week plan",
    ],
    usage: [
      "Sort subjects by difficulty and weightage",
      "Revise one strong topic and one weak topic each day",
      "Practice at least one timed paper before the exam",
    ],
    faqs: [
      {
        question: "How should I start engineering exam preparation?",
        answer:
          "Start by checking the syllabus, identifying high-weightage topics and planning revision subject by subject.",
      },
      {
        question: "Are previous year papers important?",
        answer:
          "Yes. They reveal repeated patterns, important questions and answer-writing expectations.",
      },
      {
        question: "Can I prepare well in limited time?",
        answer:
          "Yes. Focused planning, revision notes and question practice can improve results even in a short period.",
      },
    ],
  },
};

export default function NotesSEO() {
  const { slug } = useParams();
  const page = notesData[slug];

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  const content = { ...defaultPage, ...page };

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        url={`https://www.atulsharmas.in/${slug}`}
      />

      <div className="section" style={{ maxWidth: "900px", margin: "auto" }}>
        <h1>{content.title}</h1>

        <div style={{ marginTop: "40px" }}>
          <h2>Who This Page Is For</h2>
          <p>{content.audience}</p>
          <p>{content.intro}</p>
          <p>{content.details}</p>
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "40px" }}>
          <h2>What You Should Focus On</h2>
          <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
            {content.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "50px" }}>
          <h2>Why This Resource Helps</h2>
          {content.benefits.map((benefit) => (
            <p key={benefit}>{benefit}</p>
          ))}
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "50px" }}>
          <h2>How to Use This Page Effectively</h2>
          <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
            {content.usage.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "60px" }}>
          <h2>Frequently Asked Questions</h2>
          {content.faqs.map((faq) => (
            <div className="faq-box" key={faq.question}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="glass" style={{ padding: "30px", marginTop: "60px" }}>
          <h2>Explore More Study Resources</h2>
          <p>
            You can also explore our complete collection of notes, interview
            questions, MCQ practice sets and student productivity tools to build
            a stronger exam preparation workflow.
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
