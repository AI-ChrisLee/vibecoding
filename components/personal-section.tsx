"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PersonalSection() {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="personal-heading">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="personal-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
            Hear directly from Chris,<br />
            who you'll be working with.
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            I help solo founders build and ship products using vibe coding.<br />
            <strong>I built a $600K AI Web agency, grew a 39K YouTube channel,</strong> then walked away to master AI-powered development in Canada. 
          </p>
        </motion.div>

        {/* Profile Card: maintain horizontal structure on all screen sizes */}
        <motion.div
          className="flex flex-col items-start justify-start mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-row items-start gap-4 md:gap-6 bg-white rounded-lg p-2 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-blue-100">
              <Image
                src="/assets/Profile.png"
                alt="AI Chris Lee - Founder and AI Consultant"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                quality={90}
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-0.5">AI Chris Lee</h3>
              <p className="text-gray-600 text-sm mb-2">Founder & AI Consultant</p>
              <div className="flex items-center gap-3 text-sm" role="list" aria-label="Social media links">
                <a 
                  href="https://www.youtube.com/@AIChrisLee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 rounded px-1"
                  aria-label="Visit AI Chris Lee's YouTube channel"
                  role="listitem"
                >
                  YT
                </a>
                <span className="text-gray-400" aria-hidden="true">|</span>
                <a 
                  href="https://x.com/AiChrisLee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 rounded px-1"
                  aria-label="Visit AI Chris Lee's X (Twitter) profile"
                  role="listitem"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loom Video Embed: left-aligned */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-100 ring-1 ring-gray-200">
            <iframe
              src="https://www.loom.com/embed/9ae47f9ef3bd4455958bc8eecbe11596?sid=0d3a2cd7-7770-4303-8754-38ad41aff1d3"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              title="Introduction video from AI Chris Lee about the Clone Accelerator course"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            📹 Personal introduction from Chris (2 minutes)
          </p>
        </motion.div>
      </div>
    </section>
  );
} 