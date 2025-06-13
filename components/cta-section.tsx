"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

function getTimeLeft(targetDate: Date) {
  const now = Date.now();
  const target = targetDate.getTime();
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

function JoinCloneAccessBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-auto bg-white hover:bg-gray-50 text-blue-700 font-bold py-4 px-6 md:py-5 md:px-10 rounded-lg text-lg md:text-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 border-white whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:scale-95 text-center"
      aria-label="Join Clone Accelerator course"
    >
      🔥 Join Clone Accelerator →
    </button>
  );
}

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(getTimeLeft(new Date("2025-07-11T17:00:00Z")));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(new Date("2025-07-11T17:00:00Z"))), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="w-full py-16 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-800/20 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-4xl mx-auto text-left relative z-10">
        {/* Headline */}
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-white leading-tight drop-shadow-lg"
        >
          Ready to start cloning?
        </motion.h2>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-xl text-blue-100 mb-6 md:mb-8"
        >
          The Vibe Coding Masterclass starts on <span className="font-bold text-white bg-blue-800/30 px-2 py-1 rounded-md">July 11, PST 10 AM</span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-10"
        >
          <div className="text-blue-200 text-base md:text-lg mb-3 md:mb-4 font-medium">Enrollment closes in</div>
          <div 
            className="flex items-center justify-start gap-2 md:gap-4 bg-blue-800/30 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-blue-400/20"
            role="timer"
            aria-label="Countdown to enrollment deadline"
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white" aria-label={`${time.days} days`}>{time.days}</div>
              <div className="text-xs text-blue-200 font-medium">DAYS</div>
            </div>
            <div className="text-blue-200 text-lg md:text-2xl font-bold" aria-hidden="true">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white" aria-label={`${time.hours} hours`}>{time.hours}</div>
              <div className="text-xs text-blue-200 font-medium">HRS</div>
            </div>
            <div className="text-blue-200 text-lg md:text-2xl font-bold" aria-hidden="true">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white" aria-label={`${time.minutes} minutes`}>{time.minutes}</div>
              <div className="text-xs text-blue-200 font-medium">MIN</div>
            </div>
            <div className="text-blue-200 text-lg md:text-2xl font-bold" aria-hidden="true">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white" aria-label={`${time.seconds} seconds`}>{time.seconds}</div>
              <div className="text-xs text-blue-200 font-medium">SEC</div>
            </div>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-4 md:gap-6"
        >
                          <JoinCloneAccessBtn onClick={() => window.location.href = "/"} />
          <div className="flex items-center gap-4 text-blue-200 text-sm">
            <span className="inline-flex items-center gap-1">
              ⚡ <span className="font-medium">Limited spots</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              💰 <span className="font-medium">Money-back guarantee</span>
            </span>
            
          </div>
        </motion.div>

        {submitted && (
          <motion.div 
            className="mt-6 text-green-400 font-semibold text-lg bg-green-900/20 border border-green-400/30 rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ✅ Thank you! We'll be in touch soon.
          </motion.div>
        )}
      </div>
    </section>
  );
} 