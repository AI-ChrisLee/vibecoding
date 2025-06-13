import { Resend } from 'resend';

// Initialize Resend only when API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is required');
  }
  return new Resend(apiKey);
};

// Universal email confirmation workflow using Resend
export class UniversalEmailWorkflow {
  private fromEmail: string;
  private projectName: string;

  constructor(fromEmail: string = 'noreply@me.aichrislee.com', projectName: string = 'Your Project') {
    this.fromEmail = fromEmail;
    this.projectName = projectName;
  }

  // Send payment confirmation email
  async sendPaymentConfirmation(
    to: string,
    customerName: string,
    amount: number,
    paymentId: string,
    customMessage?: string
  ) {
    try {
      console.log('📧 Sending payment confirmation email to:', to);
      
      const resend = getResendClient();
      const emailTemplate = this.getPaymentConfirmationTemplate(
        customerName,
        amount,
        paymentId,
        customMessage
      );
      
      const { data, error } = await resend.emails.send({
        from: `${this.projectName} <${this.fromEmail}>`,
        to: [to],
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      if (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
      }

      console.log('✅ Email sent successfully:', data?.id);
      return { success: true, id: data?.id };
      
    } catch (error) {
      console.error('💥 Email service error:', error);
      return { success: false, error };
    }
  }

  // Generic payment confirmation template
  private getPaymentConfirmationTemplate(
    customerName: string,
    amount: number,
    paymentId: string,
    customMessage?: string
  ) {
    const amountFormatted = `$${(amount / 100).toFixed(2)}`;
    
    return {
      subject: `🎉 Payment Confirmed - Welcome to ${this.projectName}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                  🎉 Payment Confirmed!
                </h1>
                <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">
                  ${this.projectName}
                </p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
                  Hey ${customerName}! 🎉
                </h2>
                
                <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  Your payment of <strong>${amountFormatted}</strong> has been successfully processed!
                </p>

                <!-- Payment Details -->
                <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 18px;">
                    📋 Payment Details
                  </h3>
                  <p style="color: #0c4a6e; margin: 0; font-size: 14px;">
                    <strong>Amount:</strong> ${amountFormatted}<br>
                    <strong>Payment ID:</strong> ${paymentId}<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString()}
                  </p>
                </div>

                ${customMessage ? `
                <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
                    📝 Important Information
                  </h4>
                  <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                    ${customMessage}
                  </p>
                </div>
                ` : ''}

                <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 20px;">
                  What happens next?
                </h3>
                
                <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px; margin: 0 0 30px 0;">
                  <li style="margin-bottom: 8px;">📧 <strong>Keep an eye on your inbox</strong> - We'll send you updates</li>
                  <li style="margin-bottom: 8px;">📞 <strong>Check your email</strong> - Important information coming soon</li>
                  <li style="margin-bottom: 8px;">💬 <strong>Contact us</strong> - If you have any questions</li>
                </ul>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="mailto:me@aichrislee.com" 
                     style="display: inline-block; background-color: #1d4ed8; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Contact Support
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                  Questions? Hit us up at 
                  <a href="mailto:me@aichrislee.com" style="color: #1d4ed8; text-decoration: none;">
                    me@aichrislee.com
                  </a>
                </p>
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                  ${this.projectName}<br>
                  You're receiving this because you made a purchase.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Hey ${customerName}!

Your payment of ${amountFormatted} has been successfully processed!

📋 Payment Details:
Amount: ${amountFormatted}
Payment ID: ${paymentId}
Date: ${new Date().toLocaleDateString()}

${customMessage ? `📝 Important Information:\n${customMessage}\n\n` : ''}

What happens next?
• 📧 Keep an eye on your inbox - We'll send you updates
• 📞 Check your email - Important information coming soon  
• 💬 Contact us - If you have any questions

Questions? Hit us up at me@aichrislee.com

${this.projectName}
You're receiving this because you made a purchase.
      `
    };
  }

  // Send custom email
  async sendCustomEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent?: string
  ) {
    try {
      console.log('📧 Sending custom email to:', to);
      
      const resend = getResendClient();
      const { data, error } = await resend.emails.send({
        from: `${this.projectName} <${this.fromEmail}>`,
        to: [to],
        subject,
        html: htmlContent,
        text: textContent || '',
      });

      if (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
      }

      console.log('✅ Email sent successfully:', data?.id);
      return { success: true, id: data?.id };
      
    } catch (error) {
      console.error('💥 Email service error:', error);
      return { success: false, error };
    }
  }
}

// Export simple function for payment confirmations
export async function sendPaymentConfirmationEmail(
  to: string,
  customerName: string,
  amount: number,
  paymentId: string,
  options?: {
    fromEmail?: string;
    projectName?: string;
    customMessage?: string;
  }
) {
  const workflow = new UniversalEmailWorkflow(
    options?.fromEmail || 'noreply@me.aichrislee.com',
    options?.projectName || 'Your Project'
  );
  
  return await workflow.sendPaymentConfirmation(
    to,
    customerName,
    amount,
    paymentId,
    options?.customMessage
  );
}

// Export the getter function for advanced usage
export { getResendClient }; 