-- Database Migration: Simplify Structure
-- Run this in Supabase SQL Editor

-- Step 1: Create the new simplified users table
CREATE TABLE IF NOT EXISTS users_new (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  stripe_customer_id text,
  onboarding_step int DEFAULT 1,
  status text DEFAULT 'lead' CHECK (status IN ('lead', 'paid', 'active', 'cancelled')),
  -- Additional useful fields
  phone text,
  signup_source text DEFAULT 'website',
  last_login timestamptz
);

-- Step 2: Create simplified payments table
CREATE TABLE IF NOT EXISTS payments_new (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users_new(id) ON DELETE CASCADE,
  stripe_payment_intent_id text UNIQUE NOT NULL,
  stripe_session_id text,
  amount_cents int NOT NULL,
  currency text DEFAULT 'usd',
  status text DEFAULT 'succeeded',
  plan_type text NOT NULL,
  payment_date timestamptz DEFAULT NOW(),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Step 3: Keep stripe_events for debugging (simplified)
CREATE TABLE IF NOT EXISTS stripe_events_new (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id text UNIQUE NOT NULL,
  event_type text NOT NULL,
  processed boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT NOW()
);

-- Step 4: Migrate existing data from multiple tables into users_new
INSERT INTO users_new (email, full_name, stripe_customer_id, onboarding_step, status, created_at)
SELECT DISTINCT
  COALESCE(ud.email, p.email, l.email) as email,
  COALESCE(ud.full_name, l.full_name, p.email) as full_name,
  ud.stripe_customer_id,
  COALESCE(ud.onboarding_step, 1) as onboarding_step,
  CASE 
    WHEN p.id IS NOT NULL THEN 'paid'
    WHEN l.status = 'paid' THEN 'paid'
    ELSE 'lead'
  END as status,
  COALESCE(l.created_at, p.created_at, NOW()) as created_at
FROM user_dashboard ud
FULL OUTER JOIN leads l ON ud.email = l.email
FULL OUTER JOIN payments p ON COALESCE(ud.email, l.email) = p.email
WHERE COALESCE(ud.email, p.email, l.email) IS NOT NULL
ON CONFLICT (email) DO UPDATE SET
  full_name = COALESCE(EXCLUDED.full_name, users_new.full_name),
  stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, users_new.stripe_customer_id),
  onboarding_step = GREATEST(EXCLUDED.onboarding_step, users_new.onboarding_step),
  status = CASE 
    WHEN EXCLUDED.status = 'paid' THEN 'paid'
    ELSE users_new.status
  END;

-- Step 5: Migrate payments data
INSERT INTO payments_new (user_id, stripe_payment_intent_id, stripe_session_id, amount_cents, currency, status, plan_type, payment_date)
SELECT 
  u.id as user_id,
  p.stripe_payment_intent_id,
  COALESCE(p.stripe_session_id, p.stripe_payment_intent_id) as stripe_session_id,
  COALESCE(p.amount_cents, p.amount, 0) as amount_cents,
  COALESCE(p.currency, 'usd') as currency,
  COALESCE(p.status, 'succeeded') as status,
  COALESCE(p.plan_type, p.product_type, 'one-time') as plan_type,
  COALESCE(p.payment_date, NOW()) as payment_date
FROM payments p
JOIN users_new u ON u.email = p.email
WHERE p.stripe_payment_intent_id IS NOT NULL
ON CONFLICT (stripe_payment_intent_id) DO NOTHING;

-- Step 6: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users_new(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users_new(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments_new(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments_new(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_stripe_events_event_id ON stripe_events_new(stripe_event_id);

-- Step 7: Set up Row Level Security (RLS)
ALTER TABLE users_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events_new ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users_new
CREATE POLICY "Users can view own profile" ON users_new
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update own profile" ON users_new
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- RLS Policies for payments_new
CREATE POLICY "Users can view own payments" ON payments_new
  FOR SELECT USING (
    user_id IN (SELECT id FROM users_new WHERE email = auth.jwt() ->> 'email')
  );

-- Service role policies (for webhooks)
CREATE POLICY "Service role full access users" ON users_new
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access payments" ON payments_new
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access stripe_events" ON stripe_events_new
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Step 8: Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users_new
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments_new
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Rename tables (uncomment when ready to switch)
-- DROP TABLE IF EXISTS user_dashboard CASCADE;
-- DROP TABLE IF EXISTS payments CASCADE;
-- DROP TABLE IF EXISTS leads CASCADE;
-- DROP TABLE IF EXISTS enrollments CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;
-- ALTER TABLE users_new RENAME TO users;
-- ALTER TABLE payments_new RENAME TO payments;
-- ALTER TABLE stripe_events_new RENAME TO stripe_events;

COMMIT; 