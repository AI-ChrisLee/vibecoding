-- Manual payment insert for the successful Stripe payment
-- Run this in Supabase SQL Editor

INSERT INTO payments (
  email,
  stripe_payment_intent_id,
  stripe_session_id,
  amount,
  currency,
  status,
  plan_type,
  payment_date,
  stripe_customer_id
) VALUES (
  'kk@gmail.com',
  'pi_3RYwBURAsDNTTxJI0X20V01S',
  'pi_3RYwBURAsDNTTxJI0X20V01S',
  49700,
  'usd',
  'succeeded',
  'one-time',
  NOW(),
  NULL
);

-- Also create enrollment record
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
  (SELECT id FROM payments WHERE email = 'kk@gmail.com' AND stripe_payment_intent_id = 'pi_3RYwBURAsDNTTxJI0X20V01S')
);

-- Update lead status
UPDATE leads 
SET 
  status = 'paid',
  payment_date = NOW()
WHERE email = 'kk@gmail.com'; 