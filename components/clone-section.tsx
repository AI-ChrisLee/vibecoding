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
    <motion.section
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
      className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-start text-left"
    >
      {/* Step badge */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="flex items-center gap-2 mb-4">
        <span className="badge-outline-gray font-semibold">
          <span className="font-mono text-xs font-bold mr-2">02</span>
          The Clone Advantage
        </span>
      </motion.div>
      {/* Headline */}
      <motion.h2 {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.18 }} className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
        Why clone instead of create?
      </motion.h2>
      {/* Advantages list */}
      <motion.ul {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.25 }} className="space-y-2 mb-4">
        <li className="flex items-start gap-2 text-base text-muted-foreground">
          <span className="text-green-500 font-bold mt-0.5">✅</span>
          <span><span className="font-semibold text-foreground">Proven product-market fit</span> (they already validated it)</span>
        </li>
        <li className="flex items-start gap-2 text-base text-muted-foreground">
          <span className="text-green-500 font-bold mt-0.5">✅</span>
          <span><span className="font-semibold text-foreground">Known pricing models</span> (they tested what converts)</span>
        </li>
        <li className="flex items-start gap-2 text-base text-muted-foreground">
          <span className="text-green-500 font-bold mt-0.5">✅</span>
          <span><span className="font-semibold text-foreground">Battle-tested user flows</span> (they optimized for years)</span>
        </li>
        <li className="flex items-start gap-2 text-base text-muted-foreground">
          <span className="text-green-500 font-bold mt-0.5">✅</span>
          <span><span className="font-semibold text-foreground">Validated demand</span> (millions already want it)</span>
        </li>
      </motion.ul>
      {/* Key statements */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.32 }} className="space-y-2 text-base max-w-xl">
        <p className="font-bold text-foreground">Your "original" idea has a 90% failure rate.</p>
        <p
          className="font-bold text-primary cursor-pointer underline underline-offset-2 hover:text-primary/80 transition-colors"
          onClick={() => router.push("/signup")}
        >
          Our clones have a 90% success rate.
        </p>
        <p className="text-muted-foreground">The math is simple. The choice is yours.</p>
      </motion.div>
    </motion.section>
  );
} 