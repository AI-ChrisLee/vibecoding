import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceSupabase } from '@/lib/supabase-client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook endpoint hit!');
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    console.log('Webhook details:', {
      hasSignature: !!signature,
      bodyLength: body.length,
      hasEndpointSecret: !!endpointSecret,
      userAgent: request.headers.get('user-agent')
    });

    // Verify webhook signature
    let event: Stripe.Event;
    
    if (signature && endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        console.log('✅ Webhook signature verified');
      } catch (err: any) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Fallback: parse the body directly (for testing)
      try {
        event = JSON.parse(body);
        console.log('⚠️ Processing webhook without signature verification');
      } catch (parseError) {
        console.error('❌ Failed to parse webhook body:', parseError);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
      }
    }

    console.log('📨 Webhook event type:', event.type);

    // Log the event for debugging
    const supabase = createServiceSupabase();
    await supabase
      .from('stripe_events_new')
      .insert({
        stripe_event_id: event.id,
        event_type: event.type,
        processed: false
      })
      .select()
      .single();

    // Handle payment intent succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      console.log('💰 Payment succeeded:', paymentIntent.id);
      console.log('📧 User email:', paymentIntent.metadata.user_email);

      // Extract user info from metadata
      const userEmail = paymentIntent.metadata.user_email;
      const userName = paymentIntent.metadata.user_name;
      const planType = paymentIntent.metadata.plan_type;

      if (!userEmail) {
        console.error('❌ No user email in payment metadata');
        await supabase
          .from('stripe_events_new')
          .update({ 
            processed: true, 
            error_message: 'No user email in metadata' 
          })
          .eq('stripe_event_id', event.id);
        return NextResponse.json({ error: 'No user email' }, { status: 400 });
      }

      // Find user in simplified users table
      console.log('🔍 Looking up user:', userEmail);
      const { data: user, error: userError } = await supabase
        .from('users_new')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (userError || !user) {
        console.error('❌ User not found:', userError);
        await supabase
          .from('stripe_events_new')
          .update({ 
            processed: true, 
            error_message: `User not found: ${userError?.message}` 
          })
          .eq('stripe_event_id', event.id);
        return NextResponse.json({ 
          error: 'User not found', 
          details: userError?.message 
        }, { status: 404 });
      }

      console.log('✅ Found user:', user.id);

      // Save payment to simplified payments table
      console.log('💾 Saving payment to database...');
      const { data: payment, error: paymentError } = await supabase
        .from('payments_new')
        .insert({
          user_id: user.id,
          stripe_payment_intent_id: paymentIntent.id,
          stripe_session_id: paymentIntent.id,
          amount_cents: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'succeeded',
          plan_type: planType || 'one-time',
          payment_date: new Date().toISOString()
        })
        .select()
        .single();

      if (paymentError) {
        console.error('❌ Error saving payment:', paymentError);
        await supabase
          .from('stripe_events_new')
          .update({ 
            processed: true, 
            error_message: `Payment save failed: ${paymentError.message}` 
          })
          .eq('stripe_event_id', event.id);
        return NextResponse.json({ 
          error: 'Database error', 
          details: paymentError.message,
          code: paymentError.code 
        }, { status: 500 });
      }

      console.log('✅ Payment saved:', payment.id);

      // Update user status to 'paid' and advance onboarding
      console.log('📝 Updating user status...');
      const { error: userUpdateError } = await supabase
        .from('users_new')
        .update({
          status: 'paid',
          onboarding_step: 2,
          stripe_customer_id: paymentIntent.customer as string || paymentIntent.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (userUpdateError) {
        console.warn('⚠️ Error updating user status:', userUpdateError);
        // Don't fail the webhook for this - payment is already saved
      } else {
        console.log('✅ User status updated to paid');
      }

      // Mark event as processed
      await supabase
        .from('stripe_events_new')
        .update({ processed: true })
        .eq('stripe_event_id', event.id);

      console.log('🎉 Payment processing complete for:', userEmail);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('💥 Webhook error:', error);
    
    // Try to log the error
    try {
      const supabase = createServiceSupabase();
      await supabase
        .from('stripe_events_new')
        .update({ 
          processed: true, 
          error_message: error.message 
        })
        .eq('stripe_event_id', 'unknown');
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Simplified Stripe webhook endpoint is working!',
    timestamp: new Date().toISOString(),
    structure: 'simplified'
  });
} 