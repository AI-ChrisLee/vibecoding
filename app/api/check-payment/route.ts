import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ hasPaid: false });
    }

    // Check if user has a successful payment in the database
    const { data: payment, error } = await supabase
      .from('payments')
      .select('status')
      .eq('email', email)
      .eq('status', 'succeeded')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Payment check error:', error);
      return NextResponse.json({ hasPaid: false });
    }

    return NextResponse.json({ 
      hasPaid: !!payment,
      status: payment?.status || 'no_payment'
    });

  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json({ hasPaid: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, sessionId, amount, status } = body;

    // If this is just a payment check (no sessionId), check payment status
    if (email && !sessionId) {
      try {
        const { data: payment, error } = await supabase
          .from('payments')
          .select('status')
          .eq('email', email)
          .eq('status', 'succeeded')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Payment check error:', error);
          // Return false but don't fail completely
          return NextResponse.json({ hasPaid: false });
        }

        return NextResponse.json({ 
          hasPaid: !!payment,
          status: payment?.status || 'no_payment'
        });
      } catch (checkError) {
        console.error('Payment check failed:', checkError);
        // Fallback: assume no payment
        return NextResponse.json({ hasPaid: false });
      }
    }

    // Record new payment
    if (!email || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Record the payment
    const { data, error } = await supabase
      .from('payments')
      .insert({
        email,
        stripe_session_id: sessionId,
        amount,
        status: status || 'succeeded',
        payment_date: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Payment record error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to record payment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Payment record error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 