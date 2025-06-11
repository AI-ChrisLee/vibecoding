"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SignupHeader from "@/components/ui/signup-header";
import StripePaymentForm from "@/components/stripe-payment-form";


const bonuses = [
  { icon: "🎯", text: "4 Live Peer Learning Sessions" },
  { icon: "📚", text: "Weekly Course Drops - Fresh blueprints delivered each week" },
  { icon: "📊", text: "The $10M Clone Database - 47 pre-researched products ready to clone" },
  { icon: "⚡", text: "Ship-or-Refund Accountability - No hiding, no excuses, just results" },
  { icon: "🛠", text: "Done-For-You Tech Stack - Cursor AI, Supabase, Vercel setup" },
];



export default function PayPage() {
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState({ name: "Loading...", email: "loading..." });
  const [selectedPlan, setSelectedPlan] = useState("one-time");

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

  const handlePaymentSuccess = () => {
    // Redirect to thanks page after successful payment
    window.location.href = '/thanks';
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
        {/* Left: Payment form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-6">Complete Your Enrollment</h2>
          <p className="text-gray-600 mb-8">
            You&apos;re one step away from joining the Vibe Coding Masterclass. 
            Choose your preferred payment option below.
          </p>
          
          {/* Payment Plan Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Choose Your Plan:</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="plan"
                  value="one-time"
                  checked={selectedPlan === "one-time"}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <div className="flex-1">
                  <div className="font-semibold">One-Time Payment</div>
                  <div className="text-sm text-gray-600">Pay once, lifetime access</div>
                </div>
                <div className="font-bold text-lg">$497</div>
              </label>
              
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  checked={selectedPlan === "monthly"}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <div className="flex-1">
                  <div className="font-semibold">3-Month Plan</div>
                  <div className="text-sm text-gray-600">$197/month for 3 months</div>
                </div>
                <div className="font-bold text-lg">$197<span className="text-sm font-normal">/mo</span></div>
              </label>
            </div>
          </div>
          {/* Stripe Payment Form */}
          <StripePaymentForm 
            user={user}
            selectedPlan={selectedPlan}
            onSuccess={handlePaymentSuccess}
          />
          
          {/* Note */}
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-xs text-center text-muted-foreground mt-2">
            Secure payment processing by Stripe. Your information is protected.
          </div>
        </div>
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