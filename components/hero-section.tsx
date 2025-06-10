"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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
      className="w-full max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center font-sans relative"
    >
      <ToolStack tools={["Cursor", "Supabase", "Vercel", "Git"]} />
      {/* Vibe Coding Masterclass label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-primary font-semibold text-base mb-1"
      >
        Vibe Coding Masterclass:
      </motion.div>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-black leading-tight text-center font-sans"
      >
        Clone $10M AI SaaS Products in 21 Days.
      </motion.h1>
      {/* Date range under title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-base text-muted-foreground mt-1 mb-2"
      >
        July 11 ~ Aug 1 Fri PST
      </motion.div>
      {/* Hero GIF */}
      <HeroImage src="/assets/Hero.png" alt="Demo of the clone sprint" />
      {/* Timer under hero image */}
      <Timer targetDate={new Date("2025-07-11T17:00:00Z")} />
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <a
          href="/vibecoding-register"
          className="text-base font-bold shadow-lg px-8 py-2 mt-2 mx-auto font-sans transition-transform duration-200 hover:scale-105 cursor-pointer bg-primary text-white rounded-full"
        >
          Join the Clone Sprint
        </a>
      </motion.div>
    </motion.section>
  );
} 