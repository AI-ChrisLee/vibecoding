-- Fix payments table structure and add the payment record
-- Run this in Supabase SQL Editor

-- Add email column to payments table
ALTER TABLE payments ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS amount integer;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency text DEFAULT 'usd';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS status text DEFAULT 'succeeded';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS plan_type text;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_date timestamptz DEFAULT NOW();

-- Now insert the successful payment
INSERT INTO payments (
  email,
  stripe_payment_intent_id,
  stripe_session_id,
  amount,
  currency,
  status,
  plan_type,
  payment_date
) VALUES (
  'kk@gmail.com',
  'pi_3RYwBURAsDNTTxJI0X20V01S',
  'pi_3RYwBURAsDNTTxJI0X20V01S',
  49700,
  'usd',
  'succeeded',
  'one-time',
  NOW()
);

-- Create enrollment record
INSERT INTO enrollments (
  user_email,
  course_name,
  enrollment_date,
  status,
  payment_id
) VALUES (
  'kk@gmail.com',
  'Vibe Coding Masterclass',
  NOW(),
  'active',
  (SELECT id FROM payments WHERE email = 'kk@gmail.com' AND stripe_payment_intent_id = 'pi_3RYwBURAsDNTTxJI0X20V01S' LIMIT 1)
);

-- Update lead status
UPDATE leads 
SET 
  status = 'paid',
  payment_date = NOW()
WHERE email = 'kk@gmail.com'; 