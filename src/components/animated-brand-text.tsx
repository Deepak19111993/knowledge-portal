"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedBrandTextProps {
  className?: string;
}

export default function AnimatedBrandText({ className = "" }: AnimatedBrandTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const word1 = "Knowledge";
  const word2 = "Portal";
  const totalLetters = word1.length + word2.length; // 15

  useEffect(() => {
    let current = 0;

    const animateLetters = () => {
      current = 0;
      setVisibleCount(0);

      const showNext = () => {
        current++;
        setVisibleCount(current);
        if (current < totalLetters) {
          timeoutRef.current = setTimeout(showNext, 80);
        }
      };

      // Small initial delay before first letter
      timeoutRef.current = setTimeout(showNext, 100);
    };

    // Run immediately on mount
    animateLetters();

    // Then repeat every 5 seconds
    const interval = setInterval(animateLetters, 10000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [totalLetters]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {/* "Knowledge" in primary style */}
      <span className="text-2xl font-black font-serif text-primary tracking-tight inline-flex">
        {word1.split("").map((char, i) => (
          <span
            key={`k-${i}`}
            className={`brand-letter-v2 ${i < visibleCount ? "brand-letter-v2--visible" : ""}`}
          >
            {char}
          </span>
        ))}
      </span>
      {/* "Portal" in secondary style */}
      <span className="text-2xl font-sans font-bold text-secondary inline-flex">
        {word2.split("").map((char, i) => {
          const globalIndex = word1.length + i;
          return (
            <span
              key={`p-${i}`}
              className={`brand-letter-v2 ${globalIndex < visibleCount ? "brand-letter-v2--visible" : ""}`}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
