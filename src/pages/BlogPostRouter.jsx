import { lazy } from "react";
import { Navigate, useParams } from "react-router-dom";

const blogPages = {
  "score-8-cgpa-diploma": lazy(() => import("./blog/ScoreCGPA")),
  "prepare-semester-7-days": lazy(() => import("./blog/PrepareSemester7Days")),
  "best-programming-language-beginners": lazy(
    () => import("./blog/BestProgrammingLanguage"),
  ),
  "how-to-crack-ssc-cgl": lazy(() => import("./blog/CrackSSCCGL")),
  "how-to-crack-railway-exam": lazy(() => import("./blog/RailwayExamGuide")),
  "upsc-beginners-guide": lazy(() => import("./blog/UPSCBeginnersGuide")),
  "banking-exam-preparation": lazy(
    () => import("./blog/BankingExamPreparation"),
  ),
  "data-structure-guide": lazy(() => import("./blog/DataStructureGuide")),
  "html-css-javascript-difference": lazy(
    () => import("./blog/HTMLCSSJavaScript"),
  ),
  "resume-for-diploma-students": lazy(
    () => import("./blog/ResumeDiplomaStudents"),
  ),
  "internship-second-year": lazy(() => import("./blog/InternshipSecondYear")),
  "study-time-management": lazy(() => import("./blog/StudyTimeManagement")),
  "avoid-procrastination": lazy(() => import("./blog/AvoidProcrastination")),
  "pass-backlog-subject": lazy(() => import("./blog/PassBacklogSubject")),
  "government-jobs-after-diploma": lazy(
    () => import("./blog/GovernmentJobsAfterDiploma"),
  ),
  "gk-preparation-guide": lazy(() => import("./blog/GKPreparationGuide")),
  "communication-skills-engineers": lazy(
    () => import("./blog/CommunicationSkillsEngineers"),
  ),
  "viva-preparation-guide": lazy(() => import("./blog/VivaPreparationGuide")),
  "project-ideas-diploma": lazy(() => import("./blog/ProjectIdeasDiploma")),
  "learn-cpp-fast": lazy(() => import("./blog/LearnCPPFast")),
  "digital-marketing-career-guide": lazy(
    () => import("./blog/DigitalMarketingCareerGuide"),
  ),
  "prepare-state-psc": lazy(() => import("./blog/PrepareStatePSC")),
  "government-vs-private-job": lazy(
    () => import("./blog/GovernmentVsPrivateJob"),
  ),
  "coding-practice-platforms": lazy(
    () => import("./blog/CodingPracticePlatforms"),
  ),
  "ssc-chsl-guide": lazy(() => import("./blog/SSCCHSLGuide")),
  "railway-ntpc-guide": lazy(() => import("./blog/RailwayNTPCGuide")),
  "self-study-strategy": lazy(() => import("./blog/SelfStudyStrategy")),
  "exam-stress-management": lazy(
    () => import("./blog/ExamStressManagement"),
  ),
  "interview-questions-freshers": lazy(
    () => import("./blog/InterviewQuestionsFreshers"),
  ),
  "how-to-build-linkedin": lazy(() => import("./blog/BuildLinkedIn")),
  "applied-chemistry-guide": lazy(
    () => import("./blog/AppliedChemistryGuide"),
  ),
  "engineering-maths-guide": lazy(
    () => import("./blog/EngineeringMathsGuide"),
  ),
  "operating-system-basics": lazy(
    () => import("./blog/OperatingSystemBasics"),
  ),
  "dbms-beginners-guide": lazy(() => import("./blog/DBMSBeginnersGuide")),
  "government-job-salary-list": lazy(
    () => import("./blog/GovernmentJobSalaryList"),
  ),
  "best-books-ssc-preparation": lazy(
    () => import("./blog/BestBooksSSCPreparation"),
  ),
  "coding-roadmap-2026": lazy(() => import("./blog/CodingRoadmap2026")),
  "improve-english-speaking": lazy(
    () => import("./blog/ImproveEnglishSpeaking"),
  ),
  "top-career-options-after-diploma": lazy(
    () => import("./blog/TopCareerOptionsAfterDiploma"),
  ),
  "daily-study-routine": lazy(() => import("./blog/DailyStudyRoutine")),
};

export default function BlogPostRouter() {
  const { slug } = useParams();
  const BlogPage = blogPages[slug];

  if (!BlogPage) {
    return <Navigate to="/404" replace />;
  }

  return <BlogPage />;
}
