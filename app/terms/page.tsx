import { Section, Container, Heading, Text } from "@/components/ui/design-system";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Course Access
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Upon payment, you will receive immediate access to the Vibe Code Clone Accelerator course materials. 
              This is a digital product delivered online.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Money-Back Guarantee
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We offer a 100% money-back guarantee if you complete the course requirements and do not successfully 
              deploy your first profitable clone within the program timeframe. Refund requests must be submitted 
              within 30 days of course completion with proof of completed assignments.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Course Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Students are expected to actively participate in live sessions, complete assignments, and follow 
              the provided curriculum. The guarantee is contingent upon full participation and completion of 
              all course requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All course materials, including videos, code templates, and documentation, are proprietary to 
              Vibe Code and protected by copyright. Students may use materials for personal learning but may 
              not redistribute or resell course content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vibe Code provides educational content and cannot guarantee specific business outcomes. 
              Students are responsible for their own business decisions and results.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, contact us at support@vibecode.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 