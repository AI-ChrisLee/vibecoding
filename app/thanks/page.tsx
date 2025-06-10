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

      // if (!lead?.status || lead.status !== "paid") {
      //   router.replace("/pay");
      // }
      setLoading(false);
    };
    checkStatus();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">You're In!</h1>
      <p className="text-lg text-center max-w-xl">
        Welcome to the Vibe Coding Masterclass.<br />
        3 weeks. 3 apps. Zero excuses.<br />
        <b>Check your email for next steps and join the community!</b>
      </p>
    </main>
  );
}