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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check customer's payment status
    const { data: customer, error } = await supabase
      .from('customers')
      .select('paid, stripe_payment_id, amount_paid, paid_at, first_name, last_name')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      hasPaid: customer.paid,
      customer: {
        name: `${customer.first_name} ${customer.last_name}`,
        email: email,
        paid: customer.paid,
        paymentInfo: customer.paid ? {
          stripe_payment_id: customer.stripe_payment_id,
          amount_paid: customer.amount_paid,
          paid_at: customer.paid_at
        } : null
      }
    });

  } catch (error) {
    console.error('Check payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 