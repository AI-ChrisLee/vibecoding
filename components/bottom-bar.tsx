"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BottomBar() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center gap-3 text-center border-t mt-12 bg-white/80 backdrop-blur rounded-t-2xl shadow-lg"
    >
      {/* Profile image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-16 h-16 rounded-full overflow-hidden border border-muted mb-2 shadow"
      >
        <Image
          src="/assets/profile-100.png"
          alt="AI Chris Lee"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </motion.div>
      {/* Business name */}
      <div className="font-bold text-lg text-foreground">AI Chris Lee</div>
      {/* Email */}
      <div className="text-sm text-muted-foreground">
        Email :
        <a
          href="mailto:me@aichrislee.com"
          className="underline underline-offset-2 transition-all duration-200 hover:text-primary hover:underline decoration-2"
        >
          me@aichrislee.com
        </a>
      </div>
      {/* Socials */}
      <div className="flex gap-4 mt-2">
        <motion.a
          href="https://www.youtube.com/@AIChrisLee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          whileHover={{ scale: 1.15 }}
          className="transition-transform"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#fff"/>
            <path d="M21.5 10.5C21.5 9.11929 20.3807 8 19 8H9C7.61929 8 6.5 9.11929 6.5 10.5V17.5C6.5 18.8807 7.61929 20 9 20H19C20.3807 20 21.5 18.8807 21.5 17.5V10.5Z" fill="#FF0000"/>
            <path d="M12 16V12L16 14L12 16Z" fill="white"/>
          </svg>
        </motion.a>
        <motion.a
          href="https://x.com/AiChrisLee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          whileHover={{ scale: 1.15 }}
          className="transition-transform"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#fff"/>
            <path d="M9 9L19 19M19 9L9 19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.a>
      </div>
    </motion.footer>
  );
} 