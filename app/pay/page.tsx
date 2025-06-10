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
      // if (!user) {
      //   router.replace("/signup");
      //   return;
      // }
      // Check payment status in leads
      const { data: lead } = await supabase
        .from("leads")
        .select("status")
        .eq("email", user?.email)
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
    const res = await fetch("/api/checkout", { method: "POST" });
    const { url } = await res.json();
    window.location.href = url;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Secure Your Spot in the Clone Sprint</h1>
      <p className="mb-6 text-center max-w-xl">
        <b>Stop Innovating. Start Cloning.</b> <br />
        Clone $10M AI SaaS Product in 21 Days. <br />
        3 weeks. 3 apps. Zero excuses. <br />
        <b>Investment: $799</b>
      </p>
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