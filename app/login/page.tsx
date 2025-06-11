"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignupHeader from "@/components/ui/signup-header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // TODO: Add your login logic here
    setTimeout(() => {
      setLoading(false);
      setMessage("Logged in! Redirecting...");
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Header */}
      <SignupHeader />
      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2 text-center">Login</h1>
      {/* Subheadline */}
      <p className="text-muted-foreground mb-8 text-center max-w-xl">
        Hey, welcome back! <span role="img" aria-label="wave">👋</span>
      </p>
      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow p-8 flex flex-col gap-4 border border-gray-200"
      >
        {/* Email */}
        <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
          <span className="flex items-center gap-2">
            <span role="img" aria-label="mail">✉️</span> Email address
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
        {/* Stay logged in & Forgot password */}
        <div className="flex items-center justify-between mt-2 mb-1">
          <label className="flex items-center gap-2 text-xs text-muted-foreground select-none">
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={e => setStayLoggedIn(e.target.checked)}
              className="accent-primary w-4 h-4 rounded border border-gray-300"
            />
            Stay logged in
          </label>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2">Forgot password?</a>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl text-lg shadow transition mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && <div className="text-center mt-2 text-primary font-semibold">{message}</div>}
      </form>
      {/* Register link */}
      <div className="mt-6 text-center text-muted-foreground text-sm">
        Don't have an account yet?{' '}
        <a href="/signup" className="underline underline-offset-2 hover:text-primary font-medium">Register</a>
      </div>
    </main>
  );
}
