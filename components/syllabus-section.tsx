"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/clone-section";

const weeks = [
  {
    title: "Week 1: Vibe Code The $8M Landing Page",
    image: "/assets/week1.png",
    bullets: [
      "Clone Perspective's venture-backed hero section",
      "Hook forms to Supabase waitlist",
      "Deploy on your domain with <2s load time",
      "Ships Friday: Live landing page capturing emails",
    ],
  },
  {
    title: "Week 2: Vibe Code The Authentication Dashboard Engine",
    image: "/assets/week2.png",
    bullets: [
      "Build Supabase auth + protected dashboard",
      "Create user onboarding flow",
      "Set up payment-ready infrastructure",
      "Ships Friday: Working login system",
    ],
  },
  {
    title: "Week 3: Vibe Code The AI Money Machine",
    image: "/assets/week3.png",
    bullets: [
      "Clone Jenny.ai's core AI feature",
      "Integrate OpenAI API + Stripe payments",
      "Launch with credit-based pricing",
      "Ships Friday: Revenue-generating AI app",
    ],
  },
];

const bonuses = [
  { icon: "🎯", text: "4 Live Peer Learning Sessions" },
  { icon: "📚", text: "Weekly Course Drops - Fresh blueprints delivered each week" },
  { icon: "📊", text: "The $10M Clone Database - 47 pre-researched products ready to clone" },
  { icon: "⚡", text: "Ship-or-Refund Accountability - No hiding, no excuses, just results" },
  { icon: "🛠", text: "Done-For-You Tech Stack - Cursor AI, Supabase, Vercel setup" },
];

export default function SyllabusSection() {
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
          <span className="font-mono text-xs font-bold mr-2">03</span>
          The 21-Day Syllabus
        </span>
      </motion.div>
      {/* Week Cards */}
      <div className="flex flex-col gap-4 w-full mb-8">
        {weeks.map((week, i) => (
          <motion.div
            key={week.title}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.22 + i * 0.08 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-0 flex flex-col min-h-[340px] overflow-hidden"
          >
            <img src={week.image} alt={week.title} className="w-full h-36 object-cover" />
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="font-black text-2xl mb-2">{week.title}</div>
              <ul className="list-disc ml-5 space-y-1 text-sm text-black">
                {week.bullets.map((b, j) => (
                  <li key={j} className={b.startsWith("Ships Friday") ? "font-bold" : ""}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Each week statement */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.45 }} className="font-bold text-foreground mb-8">
        Each week = One complete, profitable vibe coded clone.
      </motion.div>
      {/* Bonuses */}
      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.5 }} className="w-full">
        <div className="font-bold text-lg mb-2">Bonus :</div>
        <ul className="space-y-2">
          {bonuses.map((bonus, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-black">
              <span className="text-xl">{bonus.icon}</span>
              <span>{bonus.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
} 