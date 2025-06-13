import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceSupabase } from '@/lib/supabase-client';
import { sendPaymentConfirmationEmail } from '@/lib/resend-workflow';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  console.log('🔔 Webhooks/stripe endpoint hit!');
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    console.log('📋 Webhook details:', {
      hasSignature: !!signature,
      bodyLength: body.length,
      hasWebhookSecret: !!webhookSecret,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ Webhook signature verified');
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('📨 Webhook event type:', event.type);
    console.log('📨 Event ID:', event.id);

    // Handle payment success
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      console.log('💰 Payment succeeded:', paymentIntent.id);
      console.log('📧 Payment metadata:', paymentIntent.metadata);
      
      const email = paymentIntent.metadata.email;
      const name = paymentIntent.metadata.name;
      const amount = paymentIntent.amount;
      const planType = paymentIntent.metadata.plan || 'one-time';
      
      if (!email) {
        console.error('❌ No email in payment metadata');
        console.log('Available metadata:', paymentIntent.metadata);
        return NextResponse.json({ error: 'No user email' }, { status: 400 });
      }

      console.log(`✅ Processing payment for: ${email}, amount: $${amount / 100}`);

      // 🗄️ SUPABASE: Store payment record for app functionality
      console.log('💾 Storing payment record in Supabase...');
      const supabase = createServiceSupabase();
      
      const { data: updatedCustomer, error: updateError } = await supabase
        .from('customers')
        .update({
          paid: true,
          stripe_payment_id: paymentIntent.id,
          amount_paid: amount,
          paid_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single();

      if (updateError) {
        // If customer doesn't exist, create them
        if (updateError.code === 'PGRST116') {
          console.log('🆕 Creating new customer record in Supabase...');
          const { data: newCustomer, error: insertError } = await supabase
            .from('customers')
            .insert({
              id: crypto.randomUUID(),
              first_name: name || 'Customer',
              email: email,
              paid: true,
              stripe_payment_id: paymentIntent.id,
              amount_paid: amount,
              paid_at: new Date().toISOString(),
              created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (insertError) {
            console.error('❌ Failed to create customer in Supabase:', insertError);
            // Continue anyway - email is more important
          } else {
            console.log('✅ Customer created in Supabase:', newCustomer.id);
          }
        } else {
          console.error('❌ Supabase error:', updateError);
          // Continue anyway - email is more important
        }
      } else {
        console.log('✅ Customer updated in Supabase:', updatedCustomer.id);
      }

      // 📧 RESEND: Send payment confirmation email
      try {
        console.log('📧 Sending payment confirmation email via Resend...');
        console.log(`📧 Email details: to=${email}, name=${name || 'Customer'}, amount=$${amount / 100}`);
        
        const emailResult = await sendPaymentConfirmationEmail(
          email,
          name || 'Customer',
          amount,
          paymentIntent.id,
          {
            projectName: 'Vibe Coding Clone Accelerator',
            customMessage: 'I will let you know detail info before start 2 weeks. Live cohort starts July 11, PST 10 AM.'
          }
        );

        if (emailResult.success) {
          console.log('✅ Payment confirmation email sent successfully:', emailResult.id);
        } else {
          console.error('⚠️ Email sending failed:', emailResult.error);
          // Don't fail the webhook if email fails - payment is still processed
        }
      } catch (emailError) {
        console.error('💥 Email error:', emailError);
        // Don't fail the webhook if email fails - payment is still processed
      }

      console.log(`🎉 Payment processing complete for ${email}, amount: $${amount / 100}`);
    }

    return NextResponse.json({ received: true, eventId: event.id });

  } catch (error) {
    console.error('💥 Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Add GET endpoint for testing
export async function GET() {
  return NextResponse.json({ 
    message: '✅ Stripe webhook endpoint is working!',
    timestamp: new Date().toISOString(),
    endpoint: '/api/webhooks/stripe',
    environment: process.env.NODE_ENV,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasResendKey: !!process.env.RESEND_API_KEY
  });
} 