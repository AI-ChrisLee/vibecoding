"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignupHeader from "@/components/ui/signup-header";
import JoinCloneAccessBtn from "@/components/ui/join-clone-access-btn";

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
      id="hero-section"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center text-center font-sans relative"
    >
      {/* Header: Logo + Title (smaller, like date line) */}
      <SignupHeader />
      {/* Date */}
      <div className="text-base text-muted-foreground mb-6">July 11 - August 1, 2025</div>
      {/* Main headline */}
      <h1 className="text-4xl md:text-5xl font-black leading-tight text-center font-sans mb-4">Proven Winners Into Your Winning Apps in 21 Days</h1>
      {/* Subheadline */}
      <div className="text-lg text-muted-foreground mb-8">Stop building from scratch. Start cloning success.</div>
      {/* CTA */}
      <div className="w-full flex justify-center mb-10">
        <JoinCloneAccessBtn onClick={() => window.location.href = "/signup"} />
      </div>
      {/* Hero image */}
      <div className="w-full flex justify-center mb-6">
        <HeroImage src="/assets/Hero.png" alt="Demo of the clone sprint" />
      </div>
      {/* Tool badges at the bottom */}
      <div className="flex gap-3 justify-center mt-2 mb-2">
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