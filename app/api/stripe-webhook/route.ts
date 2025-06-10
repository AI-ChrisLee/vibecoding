import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const rawBody = await req.arrayBuffer();
  const buf = Buffer.from(rawBody);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id || session.metadata?.userId;
    const email = session.customer_details?.email;

    if (userId) {
      // Update by userId (id column in leads)
      const { error } = await supabase
        .from("leads")
        .update({
          status: "paid",
          stripe_id: session.id,
          paid_at: new Date().toISOString(),
          stripe_email: email,
        })
        .eq("id", userId);
      if (error) {
        console.error("Supabase update error:", error);
      }
    } else if (email) {
      // Fallback: update by email
      const { error } = await supabase
        .from("leads")
        .update({
          status: "paid",
          stripe_id: session.id,
          paid_at: new Date().toISOString(),
        })
        .eq("email", email);
      if (error) {
        console.error("Supabase update error (fallback):", error);
      }
    } else {
      console.warn("No userId or email found in session.");
    }
  }

  return NextResponse.json({ received: true });
} 