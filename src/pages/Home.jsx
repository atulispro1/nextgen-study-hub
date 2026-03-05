import Hero from "../components/Hero";
import TextTicker from "../components/TextTicker";
import StatsSection from "../components/StatsSection";
import InfiniteGridLoop from "../components/InfiniteGridLoop";
import SemesterSection from "../components/SemesterSection";
import Features from "../components/Features";
import PremiumSection from "../components/PremiumSection";
import Testimonials from "../components/Testimonials";
import Countdown from "../components/Countdown";
import Footer from "../components/Footer";
import GPACalculator from "../components/GPACalculator";
import AIAssistant from "../components/AIAssistant";
import AdvancedTodo from "../components/AdvancedTodo";
import QuizSection from "../components/QuizSection";
import NotesLibrary from "../components/NotesLibrary";

export default function Home() {
  return (
    <>
      <Hero />
      <TextTicker />
      <StatsSection />
      <InfiniteGridLoop />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <AIAssistant />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <SemesterSection />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <Features />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <NotesLibrary />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      {/* Explore Students Tools */}
      <div style={{ textAlign: "center", margin: "60px 0" }}>
        <h2
          style={{
            color: "var(--primary)",
            fontSize: "2.5rem",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          Explore Students Tools
        </h2>
      </div>

      <GPACalculator />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <AIAssistant />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <AdvancedTodo />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />
      <QuizSection />
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #6366f1, transparent)",
          margin: "80px 0",
        }}
      />

      <PremiumSection />
      <Testimonials />
      <Countdown />
    </>
  );
}
