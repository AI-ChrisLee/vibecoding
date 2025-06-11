// Database types for Supabase tables
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
  stripe_customer_id?: string;
  is_active: boolean;
  email_confirmed: boolean;
  referral_source?: string;
  utm_campaign?: string;
  utm_source?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  stripe_payment_intent_id?: string;
  stripe_session_id?: string;
  stripe_subscription_id?: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  payment_method?: string;
  product_type: string;
  seats: number;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  payment_id?: string;
  tier: 'founding' | 'regular' | 'premium';
  status: 'active' | 'paused' | 'cancelled' | 'refunded';
  seats_used: number;
  seats_total: number;
  week_1_completed: boolean;
  week_2_completed: boolean;
  week_3_completed: boolean;
  completion_percentage: number;
  enrolled_at: string;
  expires_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  email: string;
  full_name?: string;
  status: 'lead' | 'signup' | 'paid' | 'churned';
  source?: string;
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_content?: string;
  signed_up_at?: string;
  paid_at?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface StripeEvent {
  id: string;
  stripe_event_id: string;
  event_type: string;
  processed: boolean;
  data: any;
  user_id?: string;
  stripe_created_at?: string;
  processed_at?: string;
  created_at: string;
}

// Compound types for frontend
export interface UserDashboard {
  id: string;
  email: string;
  full_name?: string;
  onboarding_step: number;
  stripe_customer_id?: string;
  tier?: string;
  enrollment_status?: string;
  completion_percentage?: number;
  amount_cents?: number;
  payment_status?: string;
  paid_at?: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface PaymentRequest {
  user_id: string;
  amount_cents: number;
  product_type: string;
  seats?: number;
} 