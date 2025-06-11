import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-client';
import type { SignupRequest, ApiResponse } from '@/lib/types/database';

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('Environment check:');
    console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    
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

    // Create user in Supabase Auth using admin API
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

    console.log('User created, creating profile...');

    // Create profile record
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name,
        onboarding_step: 1,
        email_confirmed: true,
        is_active: true
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({
        success: false,
        error: 'Failed to create profile: ' + profileError.message
      } as ApiResponse<null>, { status: 500 });
    }

    console.log('Profile created, creating lead...');

    // Create lead record
    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        email,
        full_name,
        status: 'signup',
        source: 'website',
        signed_up_at: new Date().toISOString(),
        user_id: authData.user.id
      });

    if (leadError) {
      console.warn('Lead creation failed (non-critical):', leadError);
    }

    console.log('Signup successful for:', email);

    return NextResponse.json({
      success: true,
      data: {
        user: authData.user,
        profile: profileData,
        message: 'User created! Redirecting to payment...',
        redirect: '/pay'
      }
    } as ApiResponse<{ user: unknown; profile: unknown; message: string; redirect: string }>, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    } as ApiResponse<null>, { status: 500 });
  }
} 