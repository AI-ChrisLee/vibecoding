"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import SignupHeader from "@/components/ui/signup-header";
import JoinCloneAccessBtn from "@/components/ui/join-clone-access-btn";

function getTimeLeft(targetDate: Date) {
  const target = targetDate.getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24)));
  diff -= Number(days) * 1000 * 60 * 60 * 24;
  const hours = String(Math.floor(diff / (1000 * 60 * 60)));
  diff -= Number(hours) * 1000 * 60 * 60;
  const minutes = String(Math.floor(diff / (1000 * 60)));
  diff -= Number(minutes) * 1000 * 60;
  const seconds = String(Math.floor(diff / 1000));
  return { days, hours, minutes, seconds };
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<{days: string, hours: string, minutes: string, seconds: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(new Date("2025-07-11T17:00:00Z")));
    const interval = setInterval(() => setTime(getTimeLeft(new Date("2025-07-11T17:00:00Z"))), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setMessage("You must agree to the terms & conditions and privacy policies.");
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Account created! Check your email to verify.");
        // Redirect to thanks page after 2 seconds
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      } else {
        setMessage(result.error || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Header */}
      <SignupHeader />
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-6 mb-8 text-base font-medium text-muted-foreground select-none">
        <span className="text-primary font-bold">1. Register</span>
        <span>|</span>
        <span>2. Confirm</span>
        <span>|</span>
        <span>3. Clone 3 apps</span>
      </div>
      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2 text-center">
        Enroll your pre account
      </h1>
      {/* Subheadline */}
      <p className="text-muted-foreground mb-8 text-center max-w-xl">
        Join thousands of vibe coders shipping profitable clones daily.
      </p>
      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow p-8 flex flex-col gap-4 border border-gray-200"
      >
        {/* Name */}
        <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
          <span className="flex items-center gap-2">
            <span role="img" aria-label="wave">👋</span> First and last name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Your name"
          />
        </label>
        {/* Email */}
        <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
          <span className="flex items-center gap-2">
            <span role="img" aria-label="mail">✉️</span> Business email address
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Email address"
          />
        </label>
        {/* Password */}
        <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
          <span className="flex items-center gap-2">
            <span role="img" aria-label="lock">🔒</span> Password
            <button
              type="button"
              tabIndex={-1}
              className="ml-2 text-gray-400 hover:text-primary focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span role="img" aria-label="eye">{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Password"
          />
        </label>
        {/* Terms - single line */}
        <label className="flex items-center gap-2 text-xs text-muted-foreground select-none flex-wrap">
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            className="accent-primary w-4 h-4 rounded border border-gray-300"
            required
          />
          <span>
            By creating an account you accept our
            <a href="#" className="underline underline-offset-2 hover:text-primary mx-1">terms & conditions</a>
            and our
            <a href="#" className="underline underline-offset-2 hover:text-primary mx-1">privacy policies</a>.
          </span>
        </label>
        {/* Submit */}
        <JoinCloneAccessBtn type="submit">Next step</JoinCloneAccessBtn>
        {message && <div className="text-center mt-2 text-primary font-semibold">{message}</div>}
      </form>
      {/* Login link */}
      <div className="mt-6 text-center text-muted-foreground text-sm">
        Already have an account?{' '}
        <a href="/login" className="underline underline-offset-2 hover:text-primary font-medium">Login</a>
      </div>
      <motion.div
        className="mt-6 text-center text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Enrollment closes in
        {mounted && time && (
          <>
            <span className="mx-2 font-bold">{time.days} days</span>,
            <span className="mx-2 font-bold">{time.hours} hours</span>,
            <span className="mx-2 font-bold">{time.minutes} mins</span>, and
            <span className="mx-2 font-bold">{time.seconds} seconds</span>.
          </>
        )}
      </motion.div>
    </main>
  );
} 