"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ThanksPage() {
  const [loading, setLoading] = useState(true);
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

      if (!lead?.status || lead.status !== "paid") {
        router.replace("/pay");
      }
      setLoading(false);
    };
    checkStatus();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your payment is confirmed. Welcome to the Vibe Sprint!</p>
    </main>
  );
}