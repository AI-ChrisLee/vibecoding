-- Fix webhook access to payments table
-- Run this in Supabase SQL Editor

-- Drop existing policies that might be blocking webhook
DROP POLICY IF EXISTS "Service role can do everything on payments" ON payments;
DROP POLICY IF EXISTS "Users can read their own payments" ON payments;
DROP POLICY IF EXISTS "Allow payment verification by email" ON payments;

-- Create simple policies for webhook access
CREATE POLICY "Allow all operations for service role" ON payments
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
  OR auth.role() = 'service_role'
);

-- Allow reading payments by email (for verification)
CREATE POLICY "Allow reading payments by email" ON payments
FOR SELECT USING (true);

-- Allow inserting payments (for webhook)
CREATE POLICY "Allow inserting payments" ON payments
FOR INSERT WITH CHECK (true);

-- Make sure RLS is enabled
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Also fix other tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Allow service role full access to all tables
CREATE POLICY "Service role full access profiles" ON profiles
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access leads" ON leads
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access enrollments" ON enrollments
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role'); 