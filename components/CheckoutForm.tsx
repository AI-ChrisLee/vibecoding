"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutFormInner() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", { method: "POST" })
      .then(res => res.json());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // No real payment confirmation yet, just UI
    setTimeout(() => {
      setLoading(false);
      setError("(Demo) Payment not processed. This is just UI.");
    }, 1200);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Promo/offer banners */}
      <div className="rounded-lg bg-muted px-4 py-2 text-sm text-center font-medium text-muted-foreground">
        Your <span className="font-bold">$39 promo code</span> has been applied.
      </div>
      <div className="rounded-lg bg-red-100 px-4 py-2 text-sm text-center font-medium text-red-800">
        This offer expires in <span className="font-bold">1 day.</span>
      </div>
      <div className="rounded-lg bg-red-100 px-4 py-2 text-sm text-center font-medium text-red-800">
        There are just <span className="font-bold">2 spots left</span> for this promo.
      </div>
      {/* Name/email fields */}
      <label className="text-sm font-semibold">Name
        <input
          className="mt-1 w-full rounded-md border px-3 py-2 text-base outline-none focus:ring-2 focus:ring-primary"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label className="text-sm font-semibold">Email
        <input
          className="mt-1 w-full rounded-md border px-3 py-2 text-base outline-none focus:ring-2 focus:ring-primary"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      {/* Card details */}
      <label className="text-sm font-semibold">Card Details
        <div className="mt-1 rounded-md border px-3 py-2 bg-gray-50">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </label>
      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-3 rounded-xl mt-2 hover:bg-green-600 transition"
        disabled={loading || !stripe || !elements}
      >
        {loading ? "Processing..." : "Join Starter Story"}
      </button>
      {/* Terms and Stripe badge */}
      <div className="text-xs text-center text-muted-foreground mt-2">
        By signing up, you agree to our <a href="#" className="underline">terms</a>.
      </div>
      <div className="flex flex-col items-center mt-2">
        <Image src="/stripe-badges.png" alt="Stripe secure checkout" className="h-6" width={120} height={24} />
      </div>
      {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
    </form>
  );
}

export function CheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  );
} 