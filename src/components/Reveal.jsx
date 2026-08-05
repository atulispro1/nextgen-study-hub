import { useEffect, useRef, useState } from "react";

/**
 * Reveal — lightweight IntersectionObserver-based scroll-reveal wrapper.
 * Zero dependencies: content starts slightly faded/offset and animates in
 * once, the first time it enters the viewport. It only reveals once, never
 * hides content for users who prefer reduced motion, and falls back to
 * always-visible on browsers without IntersectionObserver.
 *
 * Usage:
 *   <Reveal>...section...</Reveal>
 *   <Reveal delay={120}>...staggered card...</Reveal>
 */
export default function Reveal({ children, delay = 0, className = "", ...rest }) {
  const ref = useRef(null);

  // Reveal instantly when reduced motion is preferred or when the
  // IntersectionObserver API is unavailable — never leave content hidden.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (!("IntersectionObserver" in window)) return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " reveal--visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
