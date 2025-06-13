# 🚀 Universal Payment & Email System

A Next.js application with Stripe payments and Resend email automation - designed to be reusable for any project.

## ✨ Features

- 💳 **Stripe Integration** - Secure payment processing
- 📧 **Resend Email** - Universal email automation
- 🗄️ **Supabase Database** - Customer data storage
- 🎨 **Modern UI** - Tailwind CSS + Framer Motion
- 📱 **Responsive Design** - Works on all devices
- 🔒 **Secure Webhooks** - Automated payment processing

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd vibe-site
npm install
```

### 2. Environment Setup
Create `.env.local` with:
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Email - Resend (Universal)
RESEND_API_KEY=re_your_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup
```sql
-- Simple customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  email TEXT UNIQUE NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  stripe_payment_id TEXT,
  amount_paid INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);
```

### 4. Run Development Server
```bash
npm run dev
```

## 📧 Email System

This project uses **Resend** for universal email automation:

- ✅ **Payment confirmations** - Automatic after successful payment
- ✅ **Professional templates** - Responsive HTML emails
- ✅ **Customizable** - Easy to modify for any project
- ✅ **Reliable delivery** - 99.9% uptime

See `RESEND_SETUP.md` for detailed configuration.

## 🔧 Customization

### Change Project Details
Edit `lib/resend-workflow.ts`:
```typescript
// Update project name and email
const workflow = new UniversalEmailWorkflow(
  'noreply@yourdomain.com',
  'Your Project Name'
);
```

### Modify Email Templates
Update the HTML template in `getPaymentConfirmationTemplate()` method.

### Add New Email Types
```typescript
await emailService.sendCustomEmail(
  'customer@example.com',
  'Welcome!',
  '<h1>Your custom HTML</h1>'
);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo
2. Add environment variables
3. Deploy automatically

### Other Platforms
- Add environment variables
- Set build command: `npm run build`
- Set start command: `npm start`

## 📁 Project Structure

```
├── app/
│   ├── api/webhooks/stripe/    # Payment webhooks
│   ├── pay/                    # Payment page
│   └── thanks/                 # Success page
├── lib/
│   ├── resend-workflow.ts      # Email automation
│   └── supabase-client.ts      # Database client
├── components/                 # UI components
└── docs/                      # Documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Database**: Supabase
- **Payments**: Stripe
- **Email**: Resend
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Language**: TypeScript

## 🆘 Support

- 📧 Email: me@aichrislee.com
- 📖 Docs: Check `RESEND_SETUP.md`
- 🐛 Issues: Create GitHub issue

---

**Ready to use for any project!** 🎉 Just update the project name and customize the templates.
