import { useEffect, useState } from "react";

export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`scroll-up-btn${visible ? " scroll-up-btn--show" : ""}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}
