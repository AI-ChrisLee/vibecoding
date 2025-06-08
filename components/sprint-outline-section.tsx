"use client";

const weeks = [
  {
    emoji: "📢",
    title: "Week 1: One-Page Magnet",
    subtitle: "Clone Perspective's venture-backable hero",
    imgAlt: "Week 1 dummy",
    imgSrc: "/assets/week1-dummy.png",
    ships: "Public landing page + working waitlist",
    todos: [
      "Clone Perspective hero — tweak headline",
      "Hook form to Supabase waitlist table",
      "Deploy to Vercel on your domain",
    ],
    success: "TTFB < 2s on mobile",
  },
  {
    emoji: "🗄️",
    title: "Week 2: One-Table Backend",
    subtitle: "Reproduce production-grade infrastructure",
    imgAlt: "Week 2 dummy",
    imgSrc: "/assets/week2-dummy.png",
    ships: "Supabase auth + basic dashboard",
    todos: [
      "Turn on magic-link auth",
      "Protect /dashboard route (Next.js middleware)",
      "Show 'Hi {Name}, you're in!'—that's it",
    ],
    success: "First protected login works on any device",
  },
  {
    emoji: "🤖",
    title: "Week 3: One-Click AI Trick",
    subtitle: "Ship Jenny.ai's cash-generating MVP",
    imgAlt: "Week 3 dummy",
    imgSrc: "/assets/week3-dummy.png",
    ships: "Jenny-style AI endpoint + Stripe paywall",
    todos: [
      "Build /api/ask → forwards prompt to OpenAI",
      "Wrap $5 credit pack in Stripe Checkout",
      "Textarea — 'Ask' button — answer + decrement credits",
    ],
    success: "First real Stripe payment + AI response recorded",
  },
];

function WeekCard({
  emoji,
  title,
  subtitle,
  imgAlt,
  imgSrc,
  ships,
  todos,
  success,
}: typeof weeks[number]) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{emoji}</span>
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="text-muted-foreground mb-2">{subtitle}</div>
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400">
        {/* Replace with real image if available */}
        <span>{imgAlt}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">What Ships Friday:</span> {ships}
      </div>
      <div className="mb-2">
        <span className="font-bold">Tiny To-Do List:</span>
        <ul className="mt-1 space-y-1">
          {todos.map((todo) => (
            <li key={todo} className="flex items-center gap-2 text-base">
              <span className="text-primary">✅</span>
              <span>{todo}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-muted-foreground font-semibold">
        Success: {success}
      </div>
    </div>
  );
}

export default function SprintOutlineSection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Step badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-black text-black bg-transparent text-sm font-medium">
          <span className="font-mono text-xs font-semibold mr-2">03</span>
          The Stupid-Simple Sprint
        </span>
      </div>
      {/* Headline */}
      <h2 className="text-2xl md:text-3xl font-black text-foreground mb-8">
        One must-ship app each week. Nothing else matters.
      </h2>
      {/* Week cards */}
      {weeks.map((week) => (
        <WeekCard key={week.title} {...week} />
      ))}
      {/* CTA link */}
      <a href="#" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80 text-lg">
        Ready to clone? Grab your seat →
      </a>
    </section>
  );
} 