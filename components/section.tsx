"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionProps {
  id: string;
  title: string;
  bullets: string[];
  imagePlaceholder?: boolean;
  banner?: boolean;
  index: number;
}

export default function Section({ id, title, bullets, imagePlaceholder, banner, index }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={clsx(
        "rounded-xl p-8 my-4",
        banner
          ? "bg-headline-purple text-primary-foreground text-center"
          : "bg-background text-foreground",
        "shadow-md"
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
    >
      <h2 className={clsx(
        "text-2xl font-bold mb-6",
        banner && "text-3xl md:text-4xl"
      )}>{title}</h2>
      <div className={clsx(
        "flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-between",
        banner && "justify-center items-center"
      )}>
        <ul className={clsx(
          "space-y-4 text-base md:text-lg w-full md:w-1/2",
          banner && "mx-auto text-center"
        )}>
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              {!banner && (
                <span className="mt-1 text-primary">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#6246ff"/><path d="M6 10.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              )}
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {imagePlaceholder && (
          <div className={clsx(
            "w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0",
            banner && "hidden"
          )}>
            <div className="w-full max-w-xs h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-lg font-mono border border-dashed border-gray-300">
              Image Placeholder
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
} 