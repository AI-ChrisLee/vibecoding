"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

export default function GuaranteeSection() {
  return (
    <section className="w-full py-16 px-4 bg-black">
      <div className="max-w-4xl mx-auto text-left">
        {/* Step badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-start mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-md border-2 border-blue-400 text-blue-400 bg-blue-900/20 text-sm font-semibold">
            <span className="font-mono text-xs font-bold mr-2">04</span>
            The Guarantee
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 leading-tight"
        >
          Ship all 3 clones or get<br />
          <span className="text-blue-400">100% refunded.</span>
        </motion.h2>

        {/* Blog-like content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl"
        >
          <p className="text-lg md:text-xl font-bold text-white">
            No excuses. No extensions. No participation trophies.
          </p>
          
          <p>
            You either ship 3 working apps in 21 days, or you pay nothing.
          </p>
          
          <p>
            This isn't just marketing speak. We can make this guarantee because:
          </p>
          
          <ul className="space-y-3 pl-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">Our system works</span> — 97% completion rate across all cohorts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">We give you exact blueprints</span> — no guesswork, just follow the steps</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">You're cloning proven winners</span> — not building something from scratch</span>
            </li>
          </ul>
          
          <p className="font-bold text-blue-400 text-lg md:text-xl pt-4">
            The only way you fail is if you don't show up.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 