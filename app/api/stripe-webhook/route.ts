import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceSupabase } from '@/lib/supabase-client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Webhook event type:', event.type);

    // Handle payment intent succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      console.log('Payment succeeded:', paymentIntent.id);

      const supabase = createServiceSupabase();

      // Extract user info from metadata
      const userEmail = paymentIntent.metadata.user_email;
      const userName = paymentIntent.metadata.user_name;
      const planType = paymentIntent.metadata.plan_type;

      if (!userEmail) {
        console.error('No user email in payment metadata');
        return NextResponse.json({ error: 'No user email' }, { status: 400 });
      }

      // Save payment to database
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          email: userEmail,
          stripe_payment_intent_id: paymentIntent.id,
          stripe_session_id: paymentIntent.id, // Using payment intent ID as session ID for now
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'succeeded',
          plan_type: planType || 'one-time',
          payment_date: new Date().toISOString(),
          stripe_customer_id: paymentIntent.customer as string || null
        })
        .select()
        .single();

      if (paymentError) {
        console.error('Error saving payment to database:', paymentError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }

      console.log('Payment saved to database:', payment.id);

      // Update user's enrollment status
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .upsert({
          user_email: userEmail,
          course_name: 'Vibe Coding Masterclass',
          enrollment_date: new Date().toISOString(),
          status: 'active',
          payment_id: payment.id
        });

      if (enrollmentError) {
        console.warn('Error creating enrollment (non-critical):', enrollmentError);
      }

      // Update lead status
      const { error: leadError } = await supabase
        .from('leads')
        .update({ 
          status: 'paid',
          payment_date: new Date().toISOString()
        })
        .eq('email', userEmail);

      if (leadError) {
        console.warn('Error updating lead status (non-critical):', leadError);
      }

      console.log('✅ Payment processing complete for:', userEmail);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 