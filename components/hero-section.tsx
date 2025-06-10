"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

// ToolStack: pill badges for tech stack
function ToolStack({ tools }: { tools: string[] }) {
  return (
    <div className="flex gap-2 mb-2 justify-center">
      {tools.map((tool) => (
        <Badge
          key={tool}
          className="border border-black text-black bg-transparent rounded-full px-4 py-1 text-sm transition-transform duration-200 hover:scale-105 hover:border-primary hover:text-primary cursor-pointer"
        >
          {tool}
        </Badge>
      ))}
    </div>
  );
}

// HeroImage: hero image/gif
function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full max-w-md aspect-[4/3] bg-gray-100 rounded-2xl shadow-md flex items-center justify-center overflow-hidden mx-auto mt-4">
      <Image
        src={src}
        alt={alt}
        width={530}
        height={352}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
}

// SSR-safe Timer
function Timer({ targetDate }: { targetDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;
  const { days, hours, minutes, seconds } = time;
  return (
    <div className="flex flex-col items-center gap-1 mt-4">
      <span className="text-base text-black">
        Enrollment closes in <span className="font-bold">{days}</span> days, <span className="font-bold">{hours}</span> hours, <span className="font-bold">{minutes}</span> mins, and <span className="font-bold">{seconds}</span> seconds.
      </span>
    </div>
  );
}

function getTimeLeft(targetDate: Date) {
  const target = targetDate.getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

// Main HeroSection
export default function HeroSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center gap-4 text-center font-sans">
      <ToolStack tools={["Cursor", "Supabase", "Vercel", "Git"]} />
      {/* Vibe Coding Masterclass label */}
      <div className="text-primary font-semibold text-base mb-1">Vibe Coding Masterclass:</div>
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black leading-tight text-center font-sans">
        Clone $10M AI SaaS Products in 21 Days.
      </h1>
      {/* Date range under title */}
      <div className="text-base text-muted-foreground mt-1 mb-2">July 11 ~ Aug 1 Fri PST 10AM </div>
      {/* Hero GIF */}
      <HeroImage src="/assets/Hero.png" alt="Demo of the clone sprint" />
      {/* Timer under hero image */}
      <Timer targetDate={new Date("2025-07-11T17:00:00Z")} />
      {/* CTA */}
      <Button size="lg" className="text-base font-bold shadow-lg px-8 py-2 mt-2 mx-auto font-sans transition-transform duration-200 hover:scale-105 cursor-pointer">
        Join The Clone Sprint
      </Button>
    </section>
  );
} 