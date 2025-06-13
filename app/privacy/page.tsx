import { Section, Container, Heading, Text } from "@/components/ui/design-system";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect your name and email address when you sign up for our course. Payment information 
              is processed securely through Stripe and is not stored on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information is used to provide course access, send course updates, and communicate 
              important information about your enrollment. We may also send occasional promotional 
              emails about related courses or products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or share your personal information with third parties except as 
              necessary to provide our services (such as payment processing through Stripe) or as 
              required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information. All 
              payment processing is handled by Stripe using industry-standard encryption and security protocols.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your personal information. You may also 
              unsubscribe from promotional emails at any time using the unsubscribe link in our emails.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to improve your browsing experience and analyze website traffic. You can 
              disable cookies in your browser settings, though this may affect site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about this privacy policy, contact us at privacy@vibecode.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 