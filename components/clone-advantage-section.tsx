"use client";

export default function CloneAdvantageSection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Step badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-black text-black bg-transparent text-sm font-medium">
          <span className="font-mono text-xs font-semibold mr-2">02</span>
          <span className="font-bold">The $10M Clone Advantage</span>
        </span>
      </div>
      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
        Original ideas are overrated. Execution is everything.
      </h2>
      {/* Body paragraphs */}
      <div className="space-y-4 text-lg text-foreground/80 mb-6">
        <p>Perspective.co raised $8M with a landing page.</p>
        <p>Jenny.ai hit $2M ARR with basic AI features.</p>
        <p>Linear reached a $50M valuation with clean UI.</p>
        <p>You don&apos;t need to invent. You need to execute better.</p>
      </div>
      {/* Checkmark list */}
      <ul className="space-y-2 mb-6">
        {[
          "Proven product-market fit",
          "Validated pricing models",
          "Battle-tested user flows",
          "Known conversion rates",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-lg text-foreground">
            <span className="text-primary">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M5 10.5l3 3 7-7" stroke="#6246ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
      {/* CTA link */}
      <a href="#" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80 text-lg">
        Ready to clone? Grab your seat →
      </a>
    </section>
  );
} 