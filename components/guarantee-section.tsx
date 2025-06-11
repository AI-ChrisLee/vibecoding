"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

export default function GuaranteeSection() {
  return (
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      initial={fadeInUp.initial}
      viewport={{ once: true, amount: 0.3 }}
      transition={fadeInUp.transition}
      className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-start text-left"
    >
      {/* Step badge */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="flex items-center gap-2 mb-4">
        <span className="badge-outline-gray font-semibold">
          <span className="font-mono text-xs font-bold mr-2">04</span>
          The Guarantee
        </span>
      </motion.div>
      {/* Headline */}
      <motion.h2 {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.18 }} className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
        Ship all 3 clones or get 100% refunded.
      </motion.h2>
      {/* Guarantee Card */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.22 }} className="bg-primary/5 border border-primary/20 rounded-2xl shadow p-6 mb-6 w-full">
        <div className="text-lg font-semibold text-primary mb-2">No excuses. No extensions. No participation trophies.</div>
        <div className="text-base text-black mb-1">You either ship 3 working apps in 21 days, or you pay nothing.</div>
      </motion.div>
      {/* Why we can guarantee this */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.28 }} className="mb-6 w-full">
        <div className="font-bold text-base mb-2">Why we can guarantee this:</div>
        <ul className="list-disc ml-6 space-y-1 text-base text-black">
          <li>Our system works (97% completion rate)</li>
          <li>We give you the exact blueprints</li>
          <li>You're cloning proven winners, not guessing</li>
        </ul>
      </motion.div>
    </motion.section>
  );
} 