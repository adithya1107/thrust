import { useEffect, useState } from "react";

export const AnimatedText = ({ text, className = "", delay = 0, isActive = true }) => {
  const [visibleChars, setVisibleChars] = useState(0);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setVisibleChars(0);
      return;
    }

    const timeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setVisibleChars(current);
        if (current >= text.length) {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, isActive]);

  return (
    <span className={className} style={{ fontFamily: 'Orbitron, sans-serif' }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            opacity: index < visibleChars ? 1 : 0,
            transform: index < visibleChars ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${index * 20}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};