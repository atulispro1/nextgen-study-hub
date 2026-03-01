import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SemesterPage from "./pages/SemesterPage";
import ScrollToTop from "./components/ScrollToTop";
import ContactFaculty from "./pages/ContactFaculty";
import AdminAuth from "./pages/AdminAuth";
import StudentTools from "./pages/StudentTools";
import ContactOwner from "./pages/ContactOwner";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/semester/:id" element={<SemesterPage />} />
        <Route path="/contact-faculty" element={<ContactFaculty />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/student-tools" element={<StudentTools />} />
        <Route path="contact-owner" element={<ContactOwner />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
