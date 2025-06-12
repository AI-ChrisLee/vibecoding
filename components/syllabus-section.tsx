"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/components/clone-section";

const weeks = [
  {
    title: "Week 1: Vibe Code The $8M Landing Page",
    image: "/assets/week1.png",
    description: "You'll clone Perspective's venture-backed hero section, hook forms to Supabase waitlist, and deploy on your domain with <2s load time.",
    highlight: "Ships Friday: Live landing page capturing emails.",
  },
  {
    title: "Week 2: Vibe Code The Authentication Dashboard Engine", 
    image: "/assets/week2.png",
    description: "Build Supabase auth + protected dashboard, create user onboarding flow, and set up payment-ready infrastructure.",
    highlight: "Ships Friday: Working login system.",
  },
  {
    title: "Week 3: Vibe Code The AI Money Machine",
    image: "/assets/week3.png", 
    description: "Clone Jenny.ai's core AI feature, integrate OpenAI API + Stripe payments, and launch with credit-based pricing.",
    highlight: "Ships Friday: Revenue-generating AI app.",
  },
];

const bonuses = [
  "4 Live Peer Learning Sessions",
  "Weekly Course Drops - Fresh blueprints delivered each week", 
  "The $10M Clone Database - 47 pre-researched products ready to clone",
  "Ship-or-Refund Accountability - No hiding, no excuses, just results",
  "Done-For-You Tech Stack - Cursor AI, Supabase, Vercel setup",
];

export default function SyllabusSection() {
  return (
    <section className="w-full py-16 px-4 bg-white" aria-labelledby="syllabus-heading">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-left mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-md border-2 border-blue-200 text-blue-700 bg-blue-50 text-sm font-semibold mb-4 md:mb-6">
            <span className="font-mono text-xs font-bold mr-2">03</span>
            The 21-Day Syllabus
          </div>
          <h2 id="syllabus-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
            One complete, profitable clone.<br />
            <span className="text-blue-600">Every single week.</span>
          </h2>
        </motion.div>

        {/* Week content - Single column for all screen sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-12 md:space-y-16 mb-12 md:mb-16"
        >
          {weeks.map((week, i) => (
            <motion.div 
              key={week.title} 
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Single column layout for all screen sizes */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {week.title}
              </h3>
              <div className="w-full max-w-2xl rounded-lg overflow-hidden bg-gray-100 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={week.image}
                  alt={`${week.title} - Course preview showing the app interface and features`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  quality={90}
                  loading={i === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                {week.description}
              </p>
              <p className="text-base md:text-lg font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-md">
                {week.highlight}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Simplified bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-3xl bg-gray-50 rounded-lg p-6 md:p-8 border border-gray-200"
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            Plus These Bonuses:
          </h3>
          
          <ul className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed" role="list">
            {bonuses.map((bonus, i) => (
              <li key={i} className="flex items-start gap-3" role="listitem">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="font-medium">{bonus}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
} 