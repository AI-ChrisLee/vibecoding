"use client";

import Image from "next/image";

const logos = [
  {
    src: "/assets/Claude_Logo_5.webp",
    alt: "Claude Logo"
  },
  {
    src: "/assets/Cursor_Logo_5.webp",
    alt: "Cursor Logo"
  },
  {
    src: "/assets/Supabase_idZ_4AZztt_3.svg",
    alt: "Supabase Logo"
  },
  {
    src: "/assets/Vercel_Logo_5.webp",
    alt: "Vercel Logo"
  }
];

export default function TrustSection() {
  return (
    <section className="bg-black py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-4 text-center">
          <span className="text-[11px] md:text-xs tracking-widest text-white/50 font-mono uppercase">
            Trusted by <span className="text-white font-semibold">AI-first founders & teams</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 md:gap-y-6">
          {logos.map((logo, idx) => (
            <div key={logo.src} className="flex items-center justify-center h-8 md:h-10">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={36}
                className="object-contain h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 