import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceSupabase } from '@/lib/supabase-client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, name, planType, amount, currency = 'usd' } = await request.json();

    if (!email || !name || !planType || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, planType, amount' },
        { status: 400 }
      );
    }

    // Create or get Stripe customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: name,
        });
      }
    } catch (customerError) {
      console.error('Customer creation error:', customerError);
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      metadata: {
        email: email,
        name: name,
        plan: planType,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update customer with Stripe customer ID (optional - for future use)
    try {
      const supabase = createServiceSupabase();
      await supabase
        .from('customers')
        .update({
          stripe_payment_id: customer.id
        })
        .eq('email', email);
    } catch (updateError) {
      console.error('Customer update error:', updateError);
      // Don't fail the payment intent creation if this fails
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 