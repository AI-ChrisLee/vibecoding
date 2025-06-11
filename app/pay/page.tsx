"use client";

import { useState } from "react";
import Image from "next/image";
import SignupHeader from "@/components/ui/signup-header";


const bonuses = [
  { icon: "🎯", text: "4 Live Peer Learning Sessions" },
  { icon: "📚", text: "Weekly Course Drops - Fresh blueprints delivered each week" },
  { icon: "📊", text: "The $10M Clone Database - 47 pre-researched products ready to clone" },
  { icon: "⚡", text: "Ship-or-Refund Accountability - No hiding, no excuses, just results" },
  { icon: "🛠", text: "Done-For-You Tech Stack - Cursor AI, Supabase, Vercel setup" },
];

const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Korea", "Japan"];

export default function PayPage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postal, setPostal] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(false);
  // Dummy user
  const user = { name: "Chris Lee", email: "chris@vibecoding.com" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Record payment (for demo purposes)
      await fetch('/api/check-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          sessionId: 'demo_session_' + Date.now(),
          amount: 49700, // $497.00 in cents
          status: 'succeeded'
        })
      });
      
      // Redirect to success page
      window.location.href = '/thanks';
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 pt-12 md:pt-12 relative">
      {/* Profile button top right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition"
        >
          <Image src="/assets/Profile.png" alt="Profile" width={32} height={32} className="rounded-full border border-gray-200" />
          <span className="font-semibold text-sm text-foreground">{user.name}</span>
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-2 z-30">
            <div className="flex items-center gap-3 mb-2">
              <Image 
                src="/assets/profile-100-compress.png" 
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-base text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium text-destructive">Logout</button>
          </div>
        )}
      </div>
      <SignupHeader />
      {/* Responsive 2-column layout */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Card form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold mb-6">Complete Your Enrollment</h2>
          <p className="text-gray-600 mb-8">
            You&apos;re one step away from joining the Vibe Coding Masterclass. 
            Choose your preferred payment option below.
          </p>
          {/* Card number */}
          <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
            <span className="flex items-center gap-2">
              <span className="inline-block w-8">
                <Image src="/visa.svg" alt="Visa" width={20} height={20} className="h-5" />
              </span>
              Card number
            </span>
            <input
              type="text"
              required
              value={card}
              onChange={e => setCard(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </label>
          {/* Expiry, CVC, Postal (inline) */}
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-1/3"
              placeholder="MM/YY"
              maxLength={5}
            />
            <input
              type="text"
              required
              value={cvc}
              onChange={e => setCvc(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-1/3"
              placeholder="CVC"
              maxLength={4}
            />
            <input
              type="text"
              required
              value={postal}
              onChange={e => setPostal(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-1/3"
              placeholder="Postal code"
            />
          </div>
          {/* Name */}
          <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="pencil">✍️</span> Name on card
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
          {/* Country */}
          <label className="flex flex-col gap-1 font-medium text-sm text-foreground">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="flag">🌎</span> Country
            </span>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          {/* CTA */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl text-lg shadow transition mt-2"
            disabled={loading}
          >
            {loading ? "Processing..." : "Start Vibe Coding"}
          </button>
          {/* Note */}
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-xs text-center text-muted-foreground mt-2">
            You might see a $5 pre-authorization charge on your statement. Don't worry! This will be immediately refunded.
          </div>
        </form>
        {/* Right: Explanation/bonus section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground mb-2">What you get:</h3>
          <ul className="flex flex-col gap-3 mb-2">
            {bonuses.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-base text-foreground">
                <span className="text-2xl">{b.icon}</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm text-muted-foreground mt-2">Next tier unlocks at <span className="font-bold">$999</span> when Founding sells out.</div>
          <div className="text-sm text-muted-foreground">Payment plans available. Results guaranteed.</div>
        </div>
      </div>
    </main>
  );
}