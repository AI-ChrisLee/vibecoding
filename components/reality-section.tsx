"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

export default function RealitySection() {
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
          <span className="font-mono text-xs font-bold mr-2">01</span>
          The Brutal Truth
        </span>
      </motion.div>
      {/* Headline */}
      <motion.h2 {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.18 }} className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
        You&apos;ve been "learning to code" for months (maybe years).
      </motion.h2>
      {/* Body paragraphs */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.25 }} className="space-y-3 text-base text-muted-foreground max-w-xl">
        <p>Watching tutorials. Buying courses. Building todo apps nobody wants.</p>
        <p>Meanwhile, smart builders are cloning $10M+ products and shipping in weeks.</p>
        <p className="font-bold text-foreground">The winners don&apos;t innovate. They execute better.</p>
        <p>You don&apos;t need original ideas. You need proven blueprints + fast execution.</p>
      </motion.div>
    </motion.section>
  );
} 