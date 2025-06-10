"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ToolStack: pill badges for tech stack
function ToolStack({ tools }: { tools: string[] }) {
  return (
    <div className="flex gap-2 mb-2 justify-center">
      {tools.map((tool, i) => (
        <motion.div
          key={tool}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, type: "spring" }}
        >
          <Badge
            className="border border-black text-black bg-white/70 backdrop-blur rounded-full px-4 py-1 text-sm transition-transform duration-200 hover:scale-105 hover:border-primary hover:text-primary cursor-pointer shadow-sm"
          >
            {tool}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}

// HeroImage: hero image/gif
function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden mx-auto mt-4 backdrop-blur"
      whileHover={{ scale: 1.015 }}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="object-cover w-full h-full"
        priority
      />
    </motion.div>
  );
}

// SSR-safe Timer with animated digits
function Timer({ targetDate }: { targetDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;
  const { days, hours, minutes, seconds } = time;
  return (
    <div className="flex flex-col items-center gap-1 mt-4">
      <span className="text-base text-black">
        Enrollment closes in
        <AnimatedDigit value={days} /> days,
        <AnimatedDigit value={hours} /> hours,
        <AnimatedDigit value={minutes} /> mins, and
        <AnimatedDigit value={seconds} /> seconds.
      </span>
    </div>
  );
}

function AnimatedDigit({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="font-bold inline-block min-w-[2ch]"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function getTimeLeft(targetDate: Date) {
  const target = targetDate.getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

// Main HeroSection
export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center text-center font-sans relative"
    >
      {/* Grouped hero content for tighter hierarchy */}
      <div className="flex flex-col items-center gap-1 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-primary font-bold text-sm tracking-wide uppercase mb-0"
        >
          The Vibe Coding Masterclass
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="text-xs text-muted-foreground mb-1"
        >
          July 11 - August 1, 2025
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-black leading-tight mb-1"
        >
          Vibe Coding Proven Winners Into Your Winning Apps in 21 Days
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="text-base text-muted-foreground mb-2"
        >
          Stop building from scratch. Start cloning success.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          className="w-full flex justify-center mb-2"
        >
          <a
            href="/signup"
            className="text-base font-bold shadow-lg px-8 py-2 font-sans transition-transform duration-200 hover:scale-105 cursor-pointer bg-primary text-white rounded-full"
          >
            Join The Clone Accelerator →
          </a>
        </motion.div>
      </div>
      {/* Hero image */}
      <HeroImage src="/assets/Hero.png" alt="Demo of the clone sprint" />
      {/* Tool badges at the bottom */}
      <div className="flex gap-2 justify-center mt-6">
        {['Cursor AI', 'Supabase', 'Vercel', 'git'].map((tool) => (
          <span
            key={tool}
            className="badge-outline-gray"
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.section>
  );
} 