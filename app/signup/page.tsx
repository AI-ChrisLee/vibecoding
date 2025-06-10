"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Sign up with magic link
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://www.aichrislee.com/pay",
        data: { name }
      }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Insert into leads table
    await supabase.from("leads").insert([
      { email, name, status: "pending", created_at: new Date().toISOString() }
    ]);

    setMessage("Check your email for a magic link to complete registration.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2 text-center">
        Vibe Coding Masterclass: Clone $10M AI SaaS Products in 21 Days
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-xl">
        Stop building from scratch. Start shipping clones.<br />
        3 weeks. 3 apps. Zero excuses.<br />
        <b>June 20 - July 11, 2025</b>
      </p>
      <form onSubmit={handleSignUp} className="w-full max-w-md bg-white rounded-2xl shadow p-6 flex flex-col gap-4 border">
        <input
          type="text"
          placeholder="Your name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-primary text-white rounded p-2 font-semibold"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Join The Clone Sprint"}
        </button>
        {message && <div className="text-center mt-2">{message}</div>}
      </form>
      <div className="mt-8 text-center text-muted-foreground max-w-xl">
        <b>While others reinvent wheels, we clone blueprints and ship faster.</b>
        <br />
        <br />
        <span>
          VibeCoding isn't another course. It's a 21-day clone sprint where excuses go to die and apps get shipped.
        </span>
      </div>
    </main>
  );
} 