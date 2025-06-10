"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.id) {
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      alert("Stripe error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <button
      className="w-full bg-green-500 text-white font-bold py-3 rounded-xl mt-4 hover:bg-green-600 transition"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Join Starter Story"}
    </button>
  );
} 