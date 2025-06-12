"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: string }) {
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
    <div className="flex items-center justify-center gap-4 mt-4 mb-6" role="timer" aria-label="Countdown to course start">
      <div className="text-center">
        <div className="text-2xl font-bold text-white" aria-label={`${days} days`}>{days}</div>
        <div className="text-xs text-blue-200">DAYS</div>
      </div>
      <div className="text-blue-200" aria-hidden="true">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white" aria-label={`${hours} hours`}>{hours}</div>
        <div className="text-xs text-blue-200">HRS</div>
      </div>
      <div className="text-blue-200" aria-hidden="true">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white" aria-label={`${minutes} minutes`}>{minutes}</div>
        <div className="text-xs text-blue-200">MIN</div>
      </div>
      <div className="text-blue-200" aria-hidden="true">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white" aria-label={`${seconds} seconds`}>{seconds}</div>
        <div className="text-xs text-blue-200">SEC</div>
      </div>
    </div>
  );
}

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
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

// Animated shipping boxes orbiting around a central rocket
function OrbitingElements() {
  return (
    <div className="relative w-80 h-80 mx-auto mb-8">
      {/* Central rocket */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring" }}
      >
        <div className="w-16 h-20 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-full relative shadow-lg">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-orange-500 rounded-b-md"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
          {/* Rocket flames */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-t from-red-500 to-yellow-400 clip-path-triangle"></div>
        </div>
      </motion.div>

      {/* Orbiting boxes */}
      {[
        { label: "$8M LP", delay: 0.5, angle: 0 },
        { label: "Auth Engine", delay: 0.7, angle: 120 },
        { label: "AI Machine", delay: 0.9, angle: 240 }
      ].map((box, index) => (
        <motion.div
          key={box.label}
          className="absolute w-20 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-md flex items-center justify-center"
          style={{
            top: `${50 + 35 * Math.sin((box.angle * Math.PI) / 180)}%`,
            left: `${50 + 35 * Math.cos((box.angle * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 360
          }}
          transition={{ 
            duration: 0.6, 
            delay: box.delay,
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <div className="text-center">
            <div className="text-xs font-bold text-gray-800">{box.label}</div>
            {/* Package stamp effect */}
            <div className="absolute top-1 right-1 w-3 h-3 border border-red-500 rounded-full bg-red-100 flex items-center justify-center">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Main HeroSection
export default function HeroSection() {
  return (
    <motion.section
      id="hero-section"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-4 py-16 flex flex-col items-center md:text-center text-left font-sans relative overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-800/20 pointer-events-none" aria-hidden="true" />
      
      {/* Cohort Info - moved to header position */}
      <motion.div 
        className="text-blue-200 text-sm font-medium mb-6 md:mb-8 self-start md:self-center bg-blue-800/30 px-4 py-2 rounded-md backdrop-blur-sm border border-blue-400/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        role="status"
        aria-label="Course information"
      >
        🔴 Live cohort · July 11 – August 1 2025
      </motion.div>

      {/* Main headline */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight md:text-center text-left font-sans mb-6 md:mb-8 text-white max-w-5xl self-start md:self-center drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Clone $10M Apps in 21 Days — or Your Money Back
      </motion.h1>

      {/* Subheadline */}
      <motion.h2 
        className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 md:mb-10 font-medium max-w-4xl md:text-center text-left self-start md:self-center drop-shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Cursor × Supabase × Vercel. One ruthless build sprint.
      </motion.h2>

      {/* CTA Button */}
      <motion.div 
        className="flex flex-col items-start md:items-center gap-4 md:gap-6 mb-10 md:mb-12 w-full md:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a 
          href="/signup"
          className="w-full md:w-auto bg-white hover:bg-gray-50 text-blue-700 font-bold py-4 px-6 md:py-5 md:px-10 rounded-lg text-lg md:text-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 border-white whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-center"
          role="button"
          aria-label="Join Clone Accelerator course"
        >
          🔥 Join Clone Accelerator →
        </a>
        <p className="text-blue-200 text-sm self-start md:self-center flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            ⚡ <span className="font-medium">Limited spots</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            💰 <span className="font-medium">Money-back guarantee</span>
          </span>
        </p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="w-full max-w-4xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src="/assets/Hero.png"
            alt="Clone Accelerator course dashboard showing three app clones: $8M Landing Page, Authentication Engine, and AI Money Machine"
            width={1000}
            height={700}
            className="w-full h-auto"
            priority
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-200 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
} 