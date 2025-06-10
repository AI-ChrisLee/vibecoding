"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

const perfectIf = [
  "Have basic coding knowledge but struggle to ship",
  "Want to build profitable apps, not portfolio projects",
  "Prefer proven blueprints over risky experiments",
  "Can commit 2-3 hours daily for 21 days",
  "Learn better by solving real problems with peers",
];

const skipIf = [
  "Think cloning is 'cheating' (it's not, it's smart)",
  "Want to build the 'next big thing' from scratch",
  "Can't handle direct feedback and accountability",
  "Prefer passive learning over active building",
];

export default function CompareSection() {
  return (
    <motion.section
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
      className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-start text-left"
    >
      {/* Step badge */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="flex items-center gap-2 mb-4">
        <span className="badge-outline-gray font-semibold">
          <span className="font-mono text-xs font-bold mr-2">05</span>
          Who This Is For
        </span>
      </motion.div>
      {/* Headline */}
      <motion.h2 {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.18 }} className="text-2xl md:text-3xl font-black text-foreground mb-6 leading-tight">
        Who This Is For
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Perfect if */}
        <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.22 }} className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xl">✅</span>
            <span className="font-bold text-lg text-green-700">Perfect if you:</span>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-base text-black">
            {perfectIf.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
        {/* Skip this if */}
        <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.28 }} className="flex-1 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500 text-xl">❌</span>
            <span className="font-bold text-lg text-red-700">Skip this if you:</span>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-base text-black">
            {skipIf.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
} 