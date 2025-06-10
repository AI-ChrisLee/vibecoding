import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  // For UI only, return a fixed amount (e.g., $39900 = $399.00)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 39900, // $399.00 in cents
      currency: "usd",
      metadata: {
        product_id: "prod_STDJwHpwV0uWUn",
      },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
} 