"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Reusable animation variant
export const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function CloneSection() {
  const router = useRouter();
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
            <span className="font-mono text-xs font-bold mr-2">02</span>
            The Clone Advantage
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 leading-tight"
        >
          Why clone instead of create?
        </motion.h2>

        {/* Blog-like content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mb-8"
        >
          <p>
            Most beginners waste months stuck on technical roadblocks, tweaking buttons, and second-guessing themselves.
          </p>
          
          <p>
            The founders that make money <span className="font-bold text-white">focus on building and shipping.</span>
          </p>
          
          <p>
            When you clone a proven product, you get:
          </p>
          
          <ul className="space-y-3 pl-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">Proven product-market fit</span> — they already validated it for millions of users</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">Known pricing models</span> — they tested what converts and optimized for revenue</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">Battle-tested user flows</span> — they spent years optimizing the experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><span className="font-semibold text-white">Validated demand</span> — millions of people already want this solution</span>
            </li>
          </ul>
          
          <p className="font-bold text-white text-lg md:text-xl pt-4">
            Your "original" idea has a 90% failure rate.
          </p>
          
          <p className="font-bold text-blue-400 text-lg md:text-xl">
            Our clones have a 90% success rate.
          </p>
          
          <p className="text-gray-300">
            The math is simple. The choice is yours.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-start w-full md:w-auto"
        >
          <button
            onClick={() => router.push("/")}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl whitespace-nowrap text-center"
          >
            Start cloning winners →
          </button>
        </motion.div>
      </div>
    </section>
  );
} 