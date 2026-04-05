import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { PomodoroProvider } from "./context/PomodoroContext";

/* ===== LAZY LOAD PAGES ===== */

const Home = lazy(() => import("./pages/Home"));
const SemesterPage = lazy(() => import("./pages/SemesterPage"));
const ContactFaculty = lazy(() => import("./pages/ContactFaculty"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const StudentTools = lazy(() => import("./pages/StudentTools"));
const ContactOwner = lazy(() => import("./pages/ContactOwner"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const NotesLibrary = lazy(() => import("./components/NotesLibrary"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Jobs = lazy(() => import("./pages/Jobs"));
const NotesSEO = lazy(() => import("./pages/NotesSEO"));
import Loader from "./components/Loader";

/* ===== COURSE PAGES ===== */

const CoursesAfter12th = lazy(() => import("./pages/CoursesAfter12th"));
const CoursesAfter12thScience = lazy(
  () => import("./pages/CoursesAfter12thScience"),
);
const CoursesAfter12thCommerce = lazy(
  () => import("./pages/CoursesAfter12thCommerce"),
);
const CoursesAfter12thArts = lazy(() => import("./pages/CoursesAfter12thArts"));

/* ===== BLOG PAGES (LAZY) ===== */

const BlogPostRouter = lazy(() => import("./pages/BlogPostRouter"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticlePost = lazy(() => import("./pages/ArticlePost"));

/* ================================= */

function App() {
  return (
    <PomodoroProvider>
      <Router>
        <ScrollToTop />
        <Navbar />

        {/* MAIN LANDMARK FOR ACCESSIBILITY */}
        <main>
          {/* SUSPENSE LOADER */}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Semester */}
              <Route path="/semester/:id" element={<SemesterPage />} />

              {/* Contact */}
              <Route path="/contact-faculty" element={<ContactFaculty />} />
              <Route path="/contact-owner" element={<ContactOwner />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminAuth />} />

              {/* Tools */}
              <Route path="/student-tools" element={<StudentTools />} />

              {/* Info Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostRouter />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticlePost />} />

              {/* Notes */}
              <Route path="/notes-library" element={<NotesLibrary />} />

              {/* Jobs */}
              <Route path="/jobs" element={<Jobs />} />

              {/* Courses */}
              <Route path="/courses-after-12th" element={<CoursesAfter12th />} />
              <Route
                path="/courses-after-12th-science"
                element={<CoursesAfter12thScience />}
              />
              <Route
                path="/courses-after-12th-commerce"
                element={<CoursesAfter12thCommerce />}
              />
              <Route
                path="/courses-after-12th-arts"
                element={<CoursesAfter12thArts />}
              />

              {/* SEO pages */}
              <Route path="/:slug" element={<NotesSEO />} />

              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </Router>
    </PomodoroProvider>
  );
}

export default App;
