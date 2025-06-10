"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VibeCodingRegister() {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);
    const { error } = await supabase.from("leads").insert([
      { name, email, created_at: new Date().toISOString(), status: "pending", Payment: false },
    ]);
    setLoading(false);
    if (error) {
      setError("Failed to register. Please try again.");
    } else {
      setSuccess(true);
      window.open("https://buy.stripe.com/test_6oUbJ22epaEV5zW8r4cjS00", "_blank");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Progress Header */}
      <nav className="flex gap-8 mb-8 text-base font-medium text-muted-foreground">
        <span className="text-primary font-semibold border-b-2 border-primary pb-1">1. Enroll</span>
        <span className="opacity-60">2. Vibe Sprint</span>
      </nav>
      {/* Title & Subtitle */}
      <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2 text-center">
        Enroll in the Vibe Sprint in 30 seconds
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-xl">
        Join builders who are launching real AI SaaS products, fast.
      </p>
      {/* Form Card */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow p-6 flex flex-col gap-4 border">
        {/* First Name */}
        <label className="flex items-center gap-2 border-b border-muted pb-3">
          <span className="text-xl">👋</span>
          <input
            type="text"
            placeholder="First name"
            className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        {/* Email */}
        <label className="flex items-center gap-2 border-b border-muted pb-3">
          <span className="text-lg text-muted-foreground">✉️</span>
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        {/* Checkbox and privacy in one column */}
        <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground select-none">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="accent-primary w-4 h-4 rounded border border-muted"
              required
            />
            I agree to the <a href="#" className="underline underline-offset-2">terms &amp; conditions</a> and <a href="#" className="underline underline-offset-2">privacy policy</a>.
          </label>
        </div>
        {/* Enroll Button */}
        <button
          type="submit"
          className={`w-full mt-2 text-base font-semibold cursor-pointer transition-transform duration-200 hover:scale-105 inline-block text-center rounded-md px-4 py-2 ${checked ? 'bg-primary text-white' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
          disabled={!checked || loading}
        >
          {loading ? "Submitting..." : "Enroll in Sprint"}
        </button>
        {error && <div className="text-red-600 text-center text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-center text-sm mt-2">Registered! Redirecting to payment...</div>}
      </form>
    </main>
  );
} 