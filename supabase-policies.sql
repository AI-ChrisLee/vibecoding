-- Fix RLS policies for payments table
-- Run this in your Supabase SQL Editor

-- Enable RLS on payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything (for webhooks)
CREATE POLICY "Service role can do everything on payments" ON payments
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow authenticated users to read their own payments
CREATE POLICY "Users can read their own payments" ON payments
FOR SELECT USING (
  auth.uid()::text IN (
    SELECT id::text FROM auth.users WHERE email = payments.email
  )
  OR
  email = (auth.jwt() ->> 'email')
);

-- Allow anonymous users to read payments by email (for payment verification)
CREATE POLICY "Allow payment verification by email" ON payments
FOR SELECT USING (true);

-- For profiles table - make sure users can read their own profiles
CREATE POLICY "Users can read own profile" ON profiles
FOR SELECT USING (auth.uid() = id OR email = (auth.jwt() ->> 'email'));

-- For leads table - allow service role full access
CREATE POLICY "Service role can manage leads" ON leads
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- For enrollments table - allow service role full access
CREATE POLICY "Service role can manage enrollments" ON enrollments
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role'); 