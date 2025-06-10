"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BottomBar() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-muted-foreground bg-transparent border-t mt-12">
      {/* Left: Brand */}
      <div className="font-bold text-foreground">Vibe coding by AI Chris Lee</div>
      {/* Right: Socials */}
      <div className="flex gap-4 items-center">
        <a
          href="https://www.youtube.com/@AIChrisLee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-primary transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="currentColor" fillOpacity="0.08"/>
            <path d="M21.5 10.5C21.5 9.11929 20.3807 8 19 8H9C7.61929 8 6.5 9.11929 6.5 10.5V17.5C6.5 18.8807 7.61929 20 9 20H19C20.3807 20 21.5 18.8807 21.5 17.5V10.5Z" fill="#22d3ee"/>
            <path d="M12 16V12L16 14L12 16Z" fill="white"/>
          </svg>
        </a>
        <a
          href="https://x.com/AiChrisLee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="hover:text-primary transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="currentColor" fillOpacity="0.08"/>
            <path d="M9 9L19 19M19 9L9 19" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </footer>
  );
} 