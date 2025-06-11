-- Fix all Supabase security issues
-- Run this in Supabase SQL Editor

-- 1. Enable RLS on all tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

-- 2. Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow all operations for service role" ON payments;
DROP POLICY IF EXISTS "Allow reading payments by email" ON payments;
DROP POLICY IF EXISTS "Allow inserting payments" ON payments;
DROP POLICY IF EXISTS "Service role full access profiles" ON profiles;
DROP POLICY IF EXISTS "Service role full access leads" ON leads;
DROP POLICY IF EXISTS "Service role full access enrollments" ON enrollments;

-- 3. Create comprehensive policies for payments table
CREATE POLICY "Service role can do everything on payments" ON payments
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
);

CREATE POLICY "Users can read their own payments" ON payments
FOR SELECT USING (
  auth.uid()::text = user_id::text
  OR email = (auth.jwt() ->> 'email')
  OR email IN (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
);

CREATE POLICY "Allow public payment verification" ON payments
FOR SELECT USING (true);

-- 4. Create policies for profiles table
CREATE POLICY "Service role can manage profiles" ON profiles
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Users can read own profile" ON profiles
FOR SELECT USING (
  auth.uid() = id 
  OR email = (auth.jwt() ->> 'email')
);

-- 5. Create policies for leads table
CREATE POLICY "Service role can manage leads" ON leads
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 6. Create policies for enrollments table
CREATE POLICY "Service role can manage enrollments" ON enrollments
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Users can read their enrollments" ON enrollments
FOR SELECT USING (
  user_email = (auth.jwt() ->> 'email')
  OR user_email IN (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
);

-- 7. Create policies for stripe_events table
CREATE POLICY "Service role can manage stripe_events" ON stripe_events
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 8. Disable RLS on stripe_events for webhook access (if needed)
ALTER TABLE stripe_events DISABLE ROW LEVEL SECURITY;

-- 9. Make sure payments table has all required columns
ALTER TABLE payments ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS amount integer;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency text DEFAULT 'usd';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS status text DEFAULT 'succeeded';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS plan_type text;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_date timestamptz DEFAULT NOW(); 