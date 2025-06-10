"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function VibeCodingRegister() {
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

    // 1. Sign up with magic link
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/pay`,
        data: { name }
      }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // 2. Insert into leads table
    await supabase.from("leads").insert([
      { email, name, status: "pending", created_at: new Date().toISOString() }
    ]);

    setMessage("Check your email for a magic link to complete registration.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Sign Up for Vibe Sprint</h1>
      <form onSubmit={handleSignUp} className="w-full max-w-md bg-white rounded-2xl shadow p-6 flex flex-col gap-4 border">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {message && <div className="text-center mt-2">{message}</div>}
      </form>
    </main>
  );
} 