import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollUpButton from "./components/ScrollUpButton";
import { PomodoroProvider } from "./context/PomodoroContext";
import { PageSkeleton } from "./components/Skeleton";

/* ===== LAZY LOAD PAGES ===== */

const Home = lazy(() => import("./pages/Home"));
const SemesterPage = lazy(() => import("./pages/SemesterPage"));
const BranchSelection = lazy(() => import("./pages/BranchSelection"));
const SubjectSelection = lazy(() => import("./pages/SubjectSelection"));
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
const LastMinuteResources = lazy(() => import("./pages/LastMinuteResources"));

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

function AppShell() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* MAIN LANDMARK FOR ACCESSIBILITY */}
      <main className="app-main">
        {/* SUSPENSE SKELETON while the lazy chunk loads. The keyed wrapper
            replays the .page-enter transition on every route change. */}
        <Suspense fallback={<PageSkeleton />}>
          <div key={location.pathname} className="page-enter">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Semester */}
              <Route
                path="/semester/:id/branch/:branchSlug/:category/:subject"
                element={<SemesterPage />}
              />
              <Route
                path="/semester/:id/branch/:branchSlug/:category"
                element={<SubjectSelection />}
              />
              <Route
                path="/semester/:id/branch/:branchSlug"
                element={<SemesterPage />}
              />
              <Route path="/semester/:id/branch" element={<BranchSelection />} />
              <Route path="/semester/:id" element={<SemesterPage />} />
              <Route
                path="/last-minute-resources"
                element={<LastMinuteResources />}
              />

              {/* Contact */}
              <Route path="/contact-faculty" element={<ContactFaculty />} />
              <Route path="/contact-owner" element={<ContactOwner />} />
              <Route path="/contact" element={<Navigate to="/contact-owner" replace />} />

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
              <Route
                path="/articles/how-to-stay-focused-while-studying-2026"
                element={
                  <Navigate
                    to="/articles/how-to-study-effectively-2026-best-study-techniques"
                    replace
                  />
                }
              />
              <Route
                path="/articles/how-to-start-freelancing-as-student-2026"
                element={
                  <Navigate
                    to="/articles/how-to-start-freelancing-as-a-student-2026"
                    replace
                  />
                }
              />
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

              {/* SEO pages — catch-all for single-segment slugs. NotesSEO
                  itself redirects unknown slugs to /404. In React Router v6
                  the static routes above always outrank this dynamic route,
                  so real pages (/404, /blog, ...) can never be shadowed. */}
              <Route path="/:slug" element={<NotesSEO />} />

              {/* 404 — final fallback. Keep last so nothing can shadow it. */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </main>

      <Footer />
      <ScrollUpButton />
    </>
  );
}

function App() {
  return (
    <PomodoroProvider>
      <Router>
        <AppShell />
      </Router>
    </PomodoroProvider>
  );
}

export default App;
