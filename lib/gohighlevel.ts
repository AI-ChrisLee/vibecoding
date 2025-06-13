// GoHighLevel API Integration
interface GoHighLevelContact {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

interface GoHighLevelEmailData {
  contactId: string;
  templateId?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
}

export class GoHighLevelService {
  private apiKey: string;
  private locationId: string;
  private baseUrl = 'https://rest.gohighlevel.com/v1';

  constructor() {
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY!;
    this.locationId = process.env.GOHIGHLEVEL_LOCATION_ID!;
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`GoHighLevel API Error: ${result.message || response.statusText}`);
      }
      
      return result;
    } catch (error) {
      console.error('GoHighLevel API Error:', error);
      throw error;
    }
  }

  // Create or update contact in GoHighLevel
  async createOrUpdateContact(contactData: GoHighLevelContact) {
    try {
      console.log('📝 Creating/updating contact in GoHighLevel:', contactData.email);

      // First, try to find existing contact
      const searchResult = await this.makeRequest(
        `/contacts/search?email=${encodeURIComponent(contactData.email)}&locationId=${this.locationId}`
      );

      let contactId: string;

      if (searchResult.contacts && searchResult.contacts.length > 0) {
        // Update existing contact
        contactId = searchResult.contacts[0].id;
        console.log('📝 Updating existing contact:', contactId);
        
        await this.makeRequest(
          `/contacts/${contactId}`,
          'PUT',
          {
            ...contactData,
            locationId: this.locationId,
          }
        );
      } else {
        // Create new contact
        console.log('🆕 Creating new contact');
        const createResult = await this.makeRequest(
          '/contacts',
          'POST',
          {
            ...contactData,
            locationId: this.locationId,
          }
        );
        contactId = createResult.contact.id;
      }

      console.log('✅ Contact processed successfully:', contactId);
      return { success: true, contactId };

    } catch (error) {
      console.error('❌ GoHighLevel contact error:', error);
      return { success: false, error };
    }
  }

  // Send email through GoHighLevel
  async sendEmail(emailData: GoHighLevelEmailData) {
    try {
      console.log('📧 Sending email via GoHighLevel to contact:', emailData.contactId);

      const result = await this.makeRequest(
        '/conversations/messages',
        'POST',
        {
          type: 'Email',
          contactId: emailData.contactId,
          locationId: this.locationId,
          subject: emailData.subject,
          htmlBody: emailData.htmlBody,
          textBody: emailData.textBody || '',
        }
      );

      console.log('✅ Email sent successfully via GoHighLevel');
      return { success: true, messageId: result.id };

    } catch (error) {
      console.error('❌ GoHighLevel email error:', error);
      return { success: false, error };
    }
  }

  // Add tags to contact (useful for segmentation)
  async addTagsToContact(contactId: string, tags: string[]) {
    try {
      console.log('🏷️ Adding tags to contact:', contactId, tags);

      await this.makeRequest(
        `/contacts/${contactId}/tags`,
        'POST',
        {
          tags,
          locationId: this.locationId,
        }
      );

      console.log('✅ Tags added successfully');
      return { success: true };

    } catch (error) {
      console.error('❌ GoHighLevel tags error:', error);
      return { success: false, error };
    }
  }

  // Create opportunity (for tracking sales pipeline)
  async createOpportunity(contactId: string, amount: number, status: string = 'won') {
    try {
      console.log('💰 Creating opportunity for contact:', contactId);

      const result = await this.makeRequest(
        '/opportunities',
        'POST',
        {
          contactId,
          locationId: this.locationId,
          name: 'Vibe Coding Clone Accelerator Purchase',
          monetaryValue: amount / 100, // Convert cents to dollars
          status,
          source: 'Website',
        }
      );

      console.log('✅ Opportunity created successfully');
      return { success: true, opportunityId: result.id };

    } catch (error) {
      console.error('❌ GoHighLevel opportunity error:', error);
      return { success: false, error };
    }
  }
}

// Helper function for payment confirmation workflow
export async function processPaymentWithGoHighLevel(
  email: string,
  name: string,
  amount: number,
  paymentId: string
) {
  try {
    const ghl = new GoHighLevelService();
    
    // 1. Create/update contact
    const contactResult = await ghl.createOrUpdateContact({
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || undefined,
      email,
      tags: ['paid-customer', 'vibe-coding-accelerator'],
      customFields: {
        'stripe_payment_id': paymentId,
        'payment_amount': amount,
        'payment_date': new Date().toISOString(),
      }
    });

    if (!contactResult.success) {
      throw new Error('Failed to create/update contact');
    }

    // 2. Add customer tags
    await ghl.addTagsToContact(contactResult.contactId!, [
      'paid-customer',
      'vibe-coding-accelerator',
      'july-2025-cohort'
    ]);

    // 3. Create opportunity
    await ghl.createOpportunity(contactResult.contactId!, amount, 'won');

    // 4. Send confirmation email
    const emailTemplate = getGoHighLevelEmailTemplate(name.split(' ')[0] || name);
    await ghl.sendEmail({
      contactId: contactResult.contactId!,
      subject: emailTemplate.subject,
      htmlBody: emailTemplate.html,
      textBody: emailTemplate.text,
    });

    console.log('🎉 GoHighLevel workflow completed successfully');
    return { success: true, contactId: contactResult.contactId };

  } catch (error) {
    console.error('💥 GoHighLevel workflow error:', error);
    return { success: false, error };
  }
}

// Email template for GoHighLevel
function getGoHighLevelEmailTemplate(customerName: string) {
  return {
    subject: "🎉 Welcome to Vibe Coding Clone Accelerator!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🚀 Welcome to Vibe Coding!</h1>
          <p style="color: #bfdbfe; margin: 10px 0 0 0;">Clone Accelerator Program</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Hey ${customerName}! 🎉</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Your payment has been successfully processed! You're now officially part of the Vibe Coding Clone Accelerator program.
          </p>

          <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0;">
            <h3 style="color: #0c4a6e; margin: 0 0 10px 0;">📅 Important Update</h3>
            <p style="color: #0c4a6e; margin: 0; font-weight: 500;">
              I will let you know detail info before start 2 weeks
            </p>
          </div>

          <h3 style="color: #1f2937; margin: 30px 0 15px 0;">What happens next?</h3>
          <ul style="color: #4b5563; line-height: 1.8;">
            <li>📧 Keep an eye on your inbox - Detailed course information coming soon</li>
            <li>🎯 Live cohort starts July 11 - Mark your calendar!</li>
            <li>💰 Ship-or-Refund Guarantee - Deploy your first clone or get your money back</li>
            <li>🚀 Join the community - Connect with other builders</li>
          </ul>
        </div>
        
        <div style="background-color: #f8fafc; padding: 30px; text-align: center;">
          <p style="color: #6b7280; margin: 0;">
            Questions? Hit us up at <a href="mailto:me@aichrislee.com">me@aichrislee.com</a>
          </p>
        </div>
      </div>
    `,
    text: `
Hey ${customerName}!

Your payment has been successfully processed! You're now officially part of the Vibe Coding Clone Accelerator program.

📅 Important Update:
I will let you know detail info before start 2 weeks

What happens next?
• 📧 Keep an eye on your inbox - Detailed course information coming soon
• 🎯 Live cohort starts July 11 - Mark your calendar!
• 💰 Ship-or-Refund Guarantee - Deploy your first clone or get your money back
• 🚀 Join the community - Connect with other builders

Questions? Hit us up at me@aichrislee.com
    `
  };
} 