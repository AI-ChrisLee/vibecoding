# 📧 Universal Resend Email Setup

This project uses **Resend** for email automation - a simple, universal email service that works for any project.

## 🚀 Quick Setup

### 1. Get Your Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up/login
3. Create an API key
4. Add to your environment variables:

```bash
RESEND_API_KEY=re_your_api_key_here
```

### 2. Configure Your Domain (Optional)
- Add your domain in Resend dashboard
- Verify DNS records
- Or use the default `onboarding@resend.dev` for testing

## 📁 File Structure

```
lib/
├── resend-workflow.ts     # Universal email workflow
app/api/webhooks/stripe/
├── route.ts              # Payment webhook with email
```

## 🎯 Usage Examples

### Basic Payment Confirmation
```typescript
import { sendPaymentConfirmationEmail } from '@/lib/resend-workflow';

await sendPaymentConfirmationEmail(
  'customer@example.com',
  'John Doe',
  4997, // amount in cents
  'pi_1234567890',
  {
    projectName: 'Your Project Name',
    customMessage: 'Additional info here'
  }
);
```

### Advanced Usage with Custom Class
```typescript
import { UniversalEmailWorkflow } from '@/lib/resend-workflow';

const emailService = new UniversalEmailWorkflow(
  'noreply@yourdomain.com',
  'Your Project Name'
);

// Send payment confirmation
await emailService.sendPaymentConfirmation(
  'customer@example.com',
  'John Doe',
  4997,
  'pi_1234567890',
  'Custom message here'
);

// Send custom email
await emailService.sendCustomEmail(
  'customer@example.com',
  'Welcome to Our Service!',
  '<h1>Welcome!</h1><p>Thanks for joining us.</p>',
  'Welcome! Thanks for joining us.'
);
```

## 🎨 Email Template Features

✅ **Responsive Design** - Works on all devices  
✅ **Professional Styling** - Clean, modern look  
✅ **Customizable** - Easy to modify colors, content  
✅ **Payment Details** - Shows amount, ID, date  
✅ **Custom Messages** - Add project-specific info  
✅ **Contact Support** - Built-in support links  

## 🔧 Customization

### Change Email Styling
Edit the HTML template in `lib/resend-workflow.ts`:

```typescript
// Change colors
background: linear-gradient(135deg, #your-color 0%, #your-color2 100%);

// Change project info
${this.projectName}
me@aichrislee.com // Change support email
```

### Add New Email Types
```typescript
// Add to UniversalEmailWorkflow class
async sendWelcomeEmail(to: string, name: string) {
  return await this.sendCustomEmail(
    to,
    'Welcome!',
    this.getWelcomeTemplate(name)
  );
}
```

## 🚀 Why Resend?

- **Universal**: Works for any project, not tied to specific business
- **Simple**: Just one API key needed
- **Reliable**: 99.9% uptime, great deliverability
- **Affordable**: Pay per email, no monthly fees
- **Developer-friendly**: Great API, TypeScript support

## 🔄 Migration from Other Services

### From GoHighLevel
- Remove GoHighLevel API keys
- Replace workflow calls with `sendPaymentConfirmationEmail()`
- Update webhook handlers

### From SendGrid/Mailgun
- Replace API keys
- Update import statements
- Use Resend's simpler API

## 📊 Monitoring

Check email delivery in:
1. Resend Dashboard
2. Console logs (shows email IDs)
3. Webhook responses

## 🆘 Troubleshooting

### Email Not Sending
1. Check API key is correct
2. Verify domain setup (if using custom domain)
3. Check console logs for errors
4. Test with `onboarding@resend.dev` first

### Template Issues
1. Test HTML in browser first
2. Check for missing variables
3. Validate email addresses

## 🎯 Best Practices

1. **Always include text version** for accessibility
2. **Test emails thoroughly** before production
3. **Use meaningful subject lines**
4. **Include unsubscribe links** for marketing emails
5. **Monitor delivery rates** in Resend dashboard

---

**Ready to use!** 🎉 This setup works for any project - just change the project name and customize the templates. 