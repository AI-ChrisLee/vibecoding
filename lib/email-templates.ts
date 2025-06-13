export const getPaymentConfirmationEmail = (customerName: string) => {
  return {
    subject: "🎉 Welcome to Vibe Coding Clone Accelerator!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Vibe Coding!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                🚀 Welcome to Vibe Coding!
              </h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">
                Clone Accelerator Program
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
                Hey ${customerName}! 🎉
              </h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Your payment has been successfully processed! You're now officially part of the Vibe Coding Clone Accelerator program.
              </p>

              <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 18px;">
                  📅 Important Update
                </h3>
                <p style="color: #0c4a6e; margin: 0; font-size: 16px; font-weight: 500;">
                  I will let you know detail info before start 2 weeks
                </p>
              </div>

              <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 20px;">
                What happens next?
              </h3>
              
              <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px; margin: 0 0 30px 0;">
                <li style="margin-bottom: 8px;">📧 <strong>Keep an eye on your inbox</strong> - Detailed course information coming soon</li>
                <li style="margin-bottom: 8px;">🎯 <strong>Live cohort starts July 11</strong> - Mark your calendar!</li>
                <li style="margin-bottom: 8px;">💰 <strong>Ship-or-Refund Guarantee</strong> - Deploy your first clone or get your money back</li>
                <li style="margin-bottom: 8px;">🚀 <strong>Join the community</strong> - Connect with other builders in our private Discord</li>
              </ul>

              <div style="text-align: center; margin: 40px 0;">
                <a href="https://vibecoding-bufa93xki-ai-chrislees-projects.vercel.app/thanks" 
                   style="display: inline-block; background-color: #1d4ed8; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Access Your Dashboard
                </a>
              </div>

              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">
                  🎯 What You'll Build:
                </h4>
                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
                  • $8M Landing Page Clone<br>
                  • Authentication Engine<br>
                  • AI Money Machine<br>
                  • Full-stack apps with Cursor × Supabase × Vercel
                </p>
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
                Vibe Coding Clone Accelerator<br>
                You're receiving this because you purchased our course.
              </p>
            </div>
          </div>
        </body>
      </html>
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
• 🚀 Join the community - Connect with other builders in our private Discord

What You'll Build:
• $8M Landing Page Clone
• Authentication Engine  
• AI Money Machine
• Full-stack apps with Cursor × Supabase × Vercel

Questions? Hit us up at me@aichrislee.com

Vibe Coding Clone Accelerator
You're receiving this because you purchased our course.
    `
  };
}; 