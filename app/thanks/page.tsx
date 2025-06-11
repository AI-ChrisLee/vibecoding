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
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col items-center gap-6">
        <h1 className="text-2xl md:text-3xl font-black text-foreground text-center mb-2">Welcome to Vibe Coding! <span role='img' aria-label='party'>🎉</span></h1>
        <div className="text-lg text-muted-foreground text-center mb-4">Your account has been created successfully.</div>
        <div className="w-full text-left">
          <div className="font-bold text-base mb-2">Next Steps:</div>
          <ol className="list-decimal ml-6 space-y-3 text-base">
            <li>
              <span className="font-semibold">Check your email <span role='img' aria-label='email'>📧</span></span><br />
              We've sent a confirmation link to your inbox. Click it.
            </li>
            <li>
              <span className="font-semibold">Watch the quick start videos below <span role='img' aria-label='video'>📹</span></span><br />
              Get ready for the masterclass with these essential guides.
            </li>
          </ol>
        </div>
        <div className="text-sm text-muted-foreground text-center mt-2">
          Questions? Hit us up at <a href="mailto:me@aichrislee.com" className="underline underline-offset-2 hover:text-primary font-medium">me@aichrislee.com</a>
        </div>
      </div>
    </main>
  );
}