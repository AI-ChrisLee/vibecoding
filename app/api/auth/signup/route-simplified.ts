import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-client';
import type { SignupRequest, ApiResponse } from '@/lib/types/database';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Simplified signup process started');
    
    const body: SignupRequest = await request.json();
    const { email, password, full_name } = body;

    console.log('Signup attempt for:', email);

    if (!email || !password || !full_name) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      } as ApiResponse<null>, { status: 400 });
    }

    const supabase = createServiceSupabase();

    // Step 1: Create user in Supabase Auth
    console.log('Creating user with admin API...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for better UX
      user_metadata: {
        full_name: full_name
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({
        success: false,
        error: authError.message
      } as ApiResponse<null>, { status: 400 });
    }

    console.log('✅ Auth user created:', authData.user.id);

    // Step 2: Create user record in simplified users table
    console.log('Creating user record in simplified structure...');
    const { data: userData, error: userError } = await supabase
      .from('users_new')
      .insert({
        id: authData.user.id, // Use same ID as auth user
        email,
        full_name,
        status: 'lead', // Start as lead
        onboarding_step: 1, // First step
        signup_source: 'website',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (userError) {
      console.error('User creation error:', userError);
      // Clean up auth user if user record creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({
        success: false,
        error: 'Failed to create user record: ' + userError.message
      } as ApiResponse<null>, { status: 500 });
    }

    console.log('✅ User record created in simplified structure');

    // Step 3: Log the signup event for debugging
    await supabase
      .from('stripe_events_new')
      .insert({
        stripe_event_id: `signup_${authData.user.id}`,
        event_type: 'user.signup',
        processed: true
      });

    console.log('🎉 Simplified signup successful for:', email);

    return NextResponse.json({
      success: true,
      data: {
        user: authData.user,
        userData: userData,
        message: 'User created! Redirecting to payment...',
        redirect: '/pay'
      }
    } as ApiResponse<{ 
      user: unknown; 
      userData: unknown; 
      message: string; 
      redirect: string 
    }>, { status: 201 });

  } catch (error) {
    console.error('💥 Simplified signup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    } as ApiResponse<null>, { status: 500 });
  }
} 