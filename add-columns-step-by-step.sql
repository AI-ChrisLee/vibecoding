-- Add missing columns to payments table step by step
-- Run each line separately in Supabase SQL Editor

-- Check current table structure first
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'payments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add email column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='email') THEN
        ALTER TABLE payments ADD COLUMN email text;
    END IF;
END $$;

-- Add amount column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='amount') THEN
        ALTER TABLE payments ADD COLUMN amount integer;
    END IF;
END $$;

-- Add currency column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='currency') THEN
        ALTER TABLE payments ADD COLUMN currency text DEFAULT 'usd';
    END IF;
END $$;

-- Add status column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='status') THEN
        ALTER TABLE payments ADD COLUMN status text DEFAULT 'succeeded';
    END IF;
END $$;

-- Add plan_type column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='plan_type') THEN
        ALTER TABLE payments ADD COLUMN plan_type text;
    END IF;
END $$;

-- Add payment_date column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='payment_date') THEN
        ALTER TABLE payments ADD COLUMN payment_date timestamptz DEFAULT NOW();
    END IF;
END $$;

-- Verify the table structure after adding columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'payments' 
AND table_schema = 'public'
ORDER BY ordinal_position; 