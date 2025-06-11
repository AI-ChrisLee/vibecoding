-- Fix payments table with proper user_id
-- Run this in Supabase SQL Editor

-- First, let's find the user_id for kk@gmail.com
-- INSERT payment with user_id from profiles table
INSERT INTO payments (
  user_id,
  email,
  stripe_payment_intent_id,
  stripe_session_id,
  amount,
  currency,
  status,
  plan_type,
  payment_date
) VALUES (
  (SELECT id FROM profiles WHERE email = 'kk@gmail.com' LIMIT 1),
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