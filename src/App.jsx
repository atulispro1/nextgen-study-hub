import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import SemesterPage from "./pages/SemesterPage";
import ContactFaculty from "./pages/ContactFaculty";
import AdminAuth from "./pages/AdminAuth";
import StudentTools from "./pages/StudentTools";
import ContactOwner from "./pages/ContactOwner";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import Blog from "./pages/Blog";

/* ================= BLOG IMPORTS ================= */

import ScoreCGPA from "./pages/blog/ScoreCGPA";
import PrepareSemester7Days from "./pages/blog/PrepareSemester7Days";
import BestProgrammingLanguage from "./pages/blog/BestProgrammingLanguage";
import CrackSSCCGL from "./pages/blog/CrackSSCCGL";
import RailwayExamGuide from "./pages/blog/RailwayExamGuide";
import UPSCBeginnersGuide from "./pages/blog/UPSCBeginnersGuide";
import BankingExamPreparation from "./pages/blog/BankingExamPreparation";
import DataStructureGuide from "./pages/blog/DataStructureGuide";
import HTMLCSSJavaScript from "./pages/blog/HTMLCSSJavaScript";
import ResumeDiplomaStudents from "./pages/blog/ResumeDiplomaStudents";
import InternshipSecondYear from "./pages/blog/InternshipSecondYear";
import StudyTimeManagement from "./pages/blog/StudyTimeManagement";
import AvoidProcrastination from "./pages/blog/AvoidProcrastination";
import PassBacklogSubject from "./pages/blog/PassBacklogSubject";
import GovernmentJobsAfterDiploma from "./pages/blog/GovernmentJobsAfterDiploma";
import GKPreparationGuide from "./pages/blog/GKPreparationGuide";
import CommunicationSkillsEngineers from "./pages/blog/CommunicationSkillsEngineers";
import VivaPreparationGuide from "./pages/blog/VivaPreparationGuide";
import ProjectIdeasDiploma from "./pages/blog/ProjectIdeasDiploma";
import LearnCPPFast from "./pages/blog/LearnCPPFast";
import DigitalMarketingCareerGuide from "./pages/blog/DigitalMarketingCareerGuide";
import PrepareStatePSC from "./pages/blog/PrepareStatePSC";
import GovernmentVsPrivateJob from "./pages/blog/GovernmentVsPrivateJob";
import CodingPracticePlatforms from "./pages/blog/CodingPracticePlatforms";
import SSCCHSLGuide from "./pages/blog/SSCCHSLGuide";
import RailwayNTPCGuide from "./pages/blog/RailwayNTPCGuide";
import SelfStudyStrategy from "./pages/blog/SelfStudyStrategy";
import ExamStressManagement from "./pages/blog/ExamStressManagement";
import InterviewQuestionsFreshers from "./pages/blog/InterviewQuestionsFreshers";
import BuildLinkedIn from "./pages/blog/BuildLinkedIn";
import AppliedChemistryGuide from "./pages/blog/AppliedChemistryGuide";
import EngineeringMathsGuide from "./pages/blog/EngineeringMathsGuide";
import OperatingSystemBasics from "./pages/blog/OperatingSystemBasics";
import DBMSBeginnersGuide from "./pages/blog/DBMSBeginnersGuide";
import GovernmentJobSalaryList from "./pages/blog/GovernmentJobSalaryList";
import BestBooksSSCPreparation from "./pages/blog/BestBooksSSCPreparation";
import CodingRoadmap2026 from "./pages/blog/CodingRoadmap2026";
import ImproveEnglishSpeaking from "./pages/blog/ImproveEnglishSpeaking";
import TopCareerOptionsAfterDiploma from "./pages/blog/TopCareerOptionsAfterDiploma";
import DailyStudyRoutine from "./pages/blog/DailyStudyRoutine";
import NotesLibrary from "./components/NotesLibrary";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import NotesSEO from "./pages/NotesSEO";
import CoursesAfter12th from "./pages/CoursesAfter12th";
import CoursesAfter12thScience from "./pages/CoursesAfter12thScience";
import CoursesAfter12thCommerce from "./pages/CoursesAfter12thCommerce";
import CoursesAfter12thArts from "./pages/CoursesAfter12thArts";

/* ================================================= */

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        

        {/* Semester */}
        <Route path="/semester/:id" element={<SemesterPage />} />

        {/* Contact & Admin */}
        <Route path="/contact-faculty" element={<ContactFaculty />} />
        <Route path="/contact-owner" element={<ContactOwner />} />
        <Route path="/admin" element={<AdminAuth />} />

        {/* Tools */}
        <Route path="/student-tools" element={<StudentTools />} />

        {/* Informational Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Blog Main Page */}
        <Route path="/blog" element={<Blog />} />

        {/* ================= BLOG ROUTES ================= */}

        <Route path="/blog/:slug" element={<ScoreCGPA />} />
        <Route path="/notes-library" element={<NotesLibrary />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/:slug" element={<NotesSEO />} />
        <Route path="/courses-after-12th" element={<CoursesAfter12th />} />
        <Route path="/courses-after-12th-science" element={<CoursesAfter12thScience />} />
<Route path="/courses-after-12th-commerce" element={<CoursesAfter12thCommerce />} />
<Route path="/courses-after-12th-arts" element={<CoursesAfter12thArts />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;