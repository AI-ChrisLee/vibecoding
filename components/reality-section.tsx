"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

export default function RealitySection() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-left">
        {/* Step badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-start mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-md border-2 border-blue-200 text-blue-700 bg-blue-50 text-sm font-semibold">
            <span className="font-mono text-xs font-bold mr-2">01</span>
            The Brutal Truth
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 md:mb-8 leading-tight"
        >
          You've been "learning to code"<br />
          <span className="text-blue-600">for months (maybe years).</span>
        </motion.h2>

        {/* Body paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl space-y-4 md:space-y-6 text-base md:text-lg text-gray-600"
        >
          <p>Watching tutorials. Buying courses. Building todo apps nobody wants.</p>
          <p>Meanwhile, smart builders are cloning $10M+ products and shipping in weeks.</p>
          <p className="font-bold text-gray-900 text-lg md:text-xl">The winners don't innovate. They execute better.</p>
          <p>You don't need original ideas. You need proven blueprints + fast execution.</p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-12 flex justify-start w-full md:w-auto"
        >
          <a 
                          href="/"
            className="w-full md:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl whitespace-nowrap text-center"
          >
            Break the cycle. Start cloning →
          </a>
        </motion.div>
      </div>
    </section>
  );
} 