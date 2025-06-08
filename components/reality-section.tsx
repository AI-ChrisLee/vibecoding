"use client";

export default function RealitySection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Step badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-black text-black bg-transparent text-sm font-medium">
          <span className="font-mono text-xs font-semibold mr-2">01</span>
          Reality Check
        </span>
      </div>
      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
        You've been "learning to code" for how long now?
      </h2>
      {/* Body paragraphs */}
      <div className="space-y-4 text-lg text-foreground/80">
        <p>Watching YouTube tutorials. Buying courses. Bookmarking GitHub repos.</p>
        <p><b>Meanwhile, 12-year-olds are shipping profitable apps with AI.</b></p>
        <p>The game changed. You're still playing by old rules.</p>
        <p>VibeCoding isn't another course. It's a 21-day clone sprint where excuses go to die and apps get shipped.</p>
      </div>
    </section>
  );
} 