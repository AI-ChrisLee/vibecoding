"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

function getTimeLeft(targetDate: Date) {
  const target = targetDate.getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  diff -= Number(days) * 1000 * 60 * 60 * 24;
  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  diff -= Number(hours) * 1000 * 60 * 60;
  const minutes = String(Math.floor(diff / (1000 * 60))).padStart(2, "0");
  diff -= Number(minutes) * 1000 * 60;
  const seconds = String(Math.floor(diff / 1000)).padStart(2, "0");
  return { days, hours, minutes, seconds };
}

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(getTimeLeft(new Date("2025-07-11T17:00:00Z")));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(new Date("2025-07-11T17:00:00Z"))), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: handle actual email submission
  };

  return (
    <motion.section
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
      className="w-full max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center"
    >
      {/* Headline */}
      <motion.h2
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.1 }}
        className="text-3xl md:text-5xl font-black mb-2 leading-tight relative text-foreground"
      >
        Are you ready to clone to building?
      </motion.h2>
      {/* Subheadline (below title) */}
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.13 }}
        className="text-lg md:text-xl text-muted-foreground mb-5"
      >
        The Vibe Coding Masterclass starts on <b>July 11, PST 10 AM</b>
      </motion.div>
      {/* Countdown */}
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.22 }}
        className="text-lg md:text-xl mb-6 text-foreground"
      >
        Enrollment closes in
        <span className="mx-2 font-bold">{time.days} days</span>,
        <span className="mx-2 font-bold">{time.hours} hours</span>,
        <span className="mx-2 font-bold">{time.minutes} mins</span>, and
        <span className="mx-2 font-bold">{time.seconds} seconds</span>.
      </motion.div>
      {/* CTA button only, no email */}
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.28 }}
        className="w-full flex justify-center mb-6"
      >
        <a
          href="/signup"
          className="text-base font-bold shadow-lg px-8 py-4 font-sans transition-transform duration-200 hover:scale-105 cursor-pointer bg-primary text-white rounded-full w-full max-w-xl text-center"
        >
          Join The Clone Accelerator →
        </a>
      </motion.div>
      {submitted && (
        <div className="mt-2 text-green-500 font-semibold">Thank you! We'll be in touch soon.</div>
      )}
    </motion.section>
  );
} 