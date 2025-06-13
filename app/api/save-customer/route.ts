import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Save customer request body:', body);
    
    const { first_name, email } = body;

    if (!first_name || !email) {
      console.log('Missing required fields:', { first_name, email });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();
    console.log('Supabase client created successfully');

    // Check if customer already exists
    console.log('Checking for existing customer with email:', email);
    const { data: existingCustomer, error: selectError } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    console.log('Existing customer check result:', { existingCustomer, selectError });

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Select error:', selectError);
      return NextResponse.json(
        { success: false, error: 'Database query failed', details: selectError.message },
        { status: 500 }
      );
    }

    if (existingCustomer) {
      console.log('Updating existing customer:', existingCustomer.id);
      // Update existing customer
      const { error } = await supabase
        .from('customers')
        .update({
          first_name
        })
        .eq('email', email);

      if (error) {
        console.error('Update error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to update customer', details: error.message },
          { status: 500 }
        );
      }
      console.log('Customer updated successfully');
    } else {
      console.log('Creating new customer');
      // Create new customer with UUID
      const newCustomer = {
        id: crypto.randomUUID(),
        first_name,
        email,
        paid: false
      };
      console.log('New customer data:', newCustomer);

      const { error } = await supabase
        .from('customers')
        .insert(newCustomer);

      if (error) {
        console.error('Insert error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to save customer', details: error.message },
          { status: 500 }
        );
      }
      console.log('Customer created successfully');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Save customer error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 