"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PayPage() {
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        router.replace("/vibecoding-register");
        return;
      }
      // Check payment status in leads
      const { data: lead } = await supabase
        .from("leads")
        .select("status")
        .eq("email", user.email)
        .single();

      if (lead?.status === "paid") {
        setPaid(true);
        router.replace("/thanks");
      } else {
        setPaid(false);
      }
      setLoading(false);
    };
    checkStatus();
  }, [router]);

  const handleStripe = async () => {
    setLoading(true);
    // Call your backend to create a Stripe Checkout session
    const res = await fetch("/api/checkout", { method: "POST" });
    const { url } = await res.json();
    window.location.href = url;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Complete Your Payment</h1>
      {!paid && (
        <button
          onClick={handleStripe}
          className="bg-primary text-white rounded p-2 font-semibold"
        >
          Pay with Stripe
        </button>
      )}
    </main>
  );
}