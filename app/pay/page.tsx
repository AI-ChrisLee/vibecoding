"use client";

import { useState, useEffect } from "react";
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
  const [user, setUser] = useState({ name: "Loading...", email: "loading..." });

  // Get user data on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        // First try to get user data from localStorage (from signup)
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser({
            name: userData.full_name || userData.name,
            email: userData.email
          });
          return;
        }

        // If no stored data, try to get from URL params or use default
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        const nameParam = urlParams.get('name');
        
        if (emailParam && nameParam) {
          setUser({
            name: decodeURIComponent(nameParam),
            email: decodeURIComponent(emailParam)
          });
        } else {
          // Fallback to default
          setUser({
            name: "New User",
            email: "user@example.com"
          });
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        setUser({
          name: "New User",
          email: "user@example.com"
        });
      }
    };
    
    getUserData();
  }, []);

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
      
      // Store payment success for thanks page
      localStorage.setItem('paymentCompleted', 'true');
      
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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition"
        >
          <span className="text-xl">👤</span>
          <span className="font-semibold text-sm text-foreground">{user.name}</span>
          <span className="text-xs text-gray-500">▼</span>
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-2 z-30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
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
              <span className="text-lg">💳</span>
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