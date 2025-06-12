# User Journey with Simplified Database Structure

## Database Tables (Simplified)

### 1. `users` table (Main user table)
- **Purpose**: Single source of truth for all user data
- **Key fields**: email, full_name, stripe_customer_id, onboarding_step, status

### 2. `payments` table 
- **Purpose**: Track all payment transactions
- **Key fields**: user_id (FK), stripe_payment_intent_id, amount_cents, plan_type

### 3. `stripe_events` table
- **Purpose**: Debug webhook events
- **Key fields**: stripe_event_id, event_type, processed

## User Journey Flow

### Step 1: Landing Page Visit
```
User visits: https://aichrislee.com
Status: Anonymous visitor
Database: No record yet
```

### Step 2: Signup
```
User fills signup form → POST /api/auth/signup
Database Action:
  1. Create Supabase auth user
  2. INSERT INTO users (email, full_name, status='lead', onboarding_step=1)
  
Result: User record created with status='lead'
```

### Step 3: Auto-Login After Signup
```
After signup success → Auto-login → Redirect to /pay
Database: User status remains 'lead', onboarding_step=1
```

### Step 4: Payment Page
```
User sees payment form with pre-filled email/name
User enters card details → Stripe processes payment
```

### Step 5: Payment Success (Webhook)
```
Stripe sends webhook → POST /api/webhook/stripe
Database Actions:
  1. INSERT INTO payments (user_id, stripe_payment_intent_id, amount_cents, etc.)
  2. UPDATE users SET status='paid', onboarding_step=2, stripe_customer_id=X
  3. INSERT INTO stripe_events (for debugging)
  
Result: User is now 'paid' and moved to onboarding step 2
```

### Step 6: Thank You Page
```
User redirected to /thanks
Database Query: SELECT * FROM users WHERE email=X
Shows: "Payment successful! Welcome to the course."
```

### Step 7: Future Features (Course Access)
```
User visits course dashboard
Database Query: 
  SELECT u.*, p.* FROM users u 
  LEFT JOIN payments p ON u.id = p.user_id 
  WHERE u.email = X AND u.status = 'paid'
  
Result: Show course content only if status='paid'
```

## Status Progression

```
lead → paid → active → cancelled
  ↑      ↑       ↑        ↑
signup payment course   refund
       success  access
```

## Onboarding Steps

```
1: Just signed up (lead)
2: Payment completed (paid)
3: Course access granted (active)
4: Course completed
5: Advanced features unlocked
```

## Benefits of Simplified Structure

### ✅ Before (6 tables):
- user_dashboard
- payments  
- enrollments
- leads
- profiles
- stripe_events

### ✅ After (3 tables):
- users (consolidated user data)
- payments (clean payment records)
- stripe_events (debugging only)

### Advantages:
1. **Single source of truth**: All user data in one place
2. **Simpler queries**: No complex JOINs needed
3. **Easier maintenance**: Less tables to manage
4. **Better performance**: Fewer table lookups
5. **Clearer logic**: Status progression is obvious

## Example Queries

### Get user with payment info:
```sql
SELECT u.*, p.amount_cents, p.plan_type 
FROM users u 
LEFT JOIN payments p ON u.id = p.user_id 
WHERE u.email = 'user@example.com';
```

### Get all paid users:
```sql
SELECT * FROM users WHERE status = 'paid';
```

### Get user's payment history:
```sql
SELECT * FROM payments 
WHERE user_id = (SELECT id FROM users WHERE email = 'user@example.com');
```

This simplified structure makes everything much cleaner and easier to understand! 