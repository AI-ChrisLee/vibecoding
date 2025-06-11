import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
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

    // Try using regular Supabase client instead of admin
    console.log('Creating user with regular client...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name
        }
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({
        success: false,
        error: authError.message
      } as ApiResponse<null>, { status: 400 });
    }

    console.log('User created successfully!');

    return NextResponse.json({
      success: true,
      data: {
        user: authData.user,
        message: 'User created! Redirecting to payment...',
        redirect: '/pay'
      }
    } as ApiResponse<{ user: unknown; message: string; redirect: string }>, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    } as ApiResponse<null>, { status: 500 });
  }
} 