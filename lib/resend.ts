import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPaymentConfirmationEmail(
  to: string,
  customerName: string,
  emailTemplate: { subject: string; html: string; text: string }
) {
  try {
    console.log('📧 Sending confirmation email to:', to);
    
    const { data, error } = await resend.emails.send({
      from: 'Vibe Coding <noreply@me.aichrislee.com>', // Using your verified domain
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

export { resend }; 