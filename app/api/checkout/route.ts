import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { priceId } = await req.json(); // sent from client
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.nextUrl.origin}/thank-you`,
      cancel_url: `${req.nextUrl.origin}/vibe-sprint`,
    });
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
} 