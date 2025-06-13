"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Section, 
  Container, 
  Heading, 
  Text, 
  Button, 
  StepBadge, 
  List, 
  Animated,
  Card
} from "@/components/ui/design-system";
import StripePaymentForm from "@/components/stripe-payment-form";
import DebugStripe from "@/components/debug-stripe";

const bonuses = [
  "🎯 4 Live Peer Learning Sessions",
  "📚 Weekly Course Drops - Fresh blueprints delivered each week",
  "📊 The $10M Clone Database - 47 pre-researched products ready to clone",
  "⚡ Ship-or-Refund Accountability - No hiding, no excuses, just results",
  "🛠 Done-For-You Tech Stack - Cursor AI, Supabase, Vercel setup"
];

function PayPageContent() {
  const [selectedPlan, setSelectedPlan] = useState("one-time");
  const [customerInfo, setCustomerInfo] = useState<{name: string, email: string} | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get customer info from URL parameters
  useEffect(() => {
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    
    if (!email || !name) {
      // If no customer info, redirect to home
      router.push('/');
      return;
    }
    
    setCustomerInfo({ name, email });
  }, [searchParams, router]);

  if (!customerInfo) {
    return (
      <Section background="white">
        <Container>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Text variant="body" color="muted">Loading...</Text>
          </div>
        </Container>
      </Section>
    );
  }

  const handlePaymentSuccess = () => {
    // Redirect to thanks page after successful payment
    window.location.href = '/thanks';
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Customer info display top right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-lg">
          <span className="text-xl">👤</span>
          <div>
            <div className="font-semibold text-sm text-gray-900">{customerInfo.name}</div>
            <div className="text-xs text-gray-500">{customerInfo.email}</div>
          </div>
        </div>
      </div>

      <Section background="white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Animated animation="fadeInUp">
                <div className="flex justify-center mb-8">
                  <StepBadge step="2/3" title="Complete Your Payment" variant="blue" />
                </div>
              </Animated>

              <Animated animation="fadeInUp" delay={0.1}>
                <Heading level="h1" color="default" className="mb-4">
                  You're One Step Away, {customerInfo.name}!
                </Heading>
              </Animated>

              <Animated animation="fadeInUp" delay={0.2}>
                <Text variant="body" color="muted" className="max-w-2xl mx-auto">
                  Complete your enrollment to join the Vibe Coding Accelerator and start building profitable clones.
                </Text>
              </Animated>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Payment Form */}
              <Animated animation="fadeInUp" delay={0.3}>
                <Card padding="lg">
                  <Heading level="h2" color="default" className="mb-6">
                    Complete Your Enrollment
                  </Heading>
                  
                  <Text variant="body" color="muted" className="mb-8">
                    Choose your preferred payment option below and secure your spot in the next cohort.
                  </Text>
                  
                  {/* Payment Plan Selection */}
                  <div className="mb-8">
                    <Text variant="small" color="default" className="font-bold mb-4">
                      Choose Your Plan:
                    </Text>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border-blue-200 bg-blue-50">
                        <input
                          type="radio"
                          name="plan"
                          value="one-time"
                          checked={selectedPlan === "one-time"}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">One-Time Payment</div>
                          <div className="text-sm text-gray-600">Pay once, lifetime access</div>
                          <div className="text-xs text-blue-600 font-medium mt-1">🔥 Most Popular</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-2xl text-gray-900">$497</div>
                          <div className="text-xs text-gray-500">Best Value</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="plan"
                          value="monthly"
                          checked={selectedPlan === "monthly"}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">3-Month Plan</div>
                          <div className="text-sm text-gray-600">$197/month for 3 months</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-2xl text-gray-900">$197</div>
                          <div className="text-xs text-gray-500">/month</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Debug Info */}
                  <DebugStripe />
                  
                  {/* Stripe Payment Form */}
                  <StripePaymentForm 
                    user={customerInfo}
                    selectedPlan={selectedPlan}
                    onSuccess={handlePaymentSuccess}
                  />
                  
                  {/* Security Note */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <Text variant="caption" color="muted" className="text-center">
                      🔒 Secure payment processing by Stripe. Your information is protected with bank-level security.
                    </Text>
                  </div>
                </Card>
              </Animated>

              {/* Right: Benefits */}
              <Animated animation="fadeInUp" delay={0.4}>
                <div className="space-y-8">
                  {/* What You Get */}
                  <Card padding="lg">
                    <Heading level="h2" color="default" className="mb-6">
                      What You Get Today
                    </Heading>
                    <List items={bonuses} variant="bullet" color="blue" className="mb-6" />
                    
                    <div className="border-t pt-6 mt-6">
                      <Text variant="small" color="muted" className="mb-2">
                        Next tier unlocks at <span className="font-bold text-gray-900">$999</span> when Founding sells out.
                      </Text>
                      <Text variant="small" color="muted">
                        Payment plans available. Results guaranteed.
                      </Text>
                    </div>
                  </Card>

                  {/* Guarantee */}
                  <Card padding="md" className="bg-green-50 border-green-200">
                    <div className="text-center">
                      <div className="text-3xl mb-3">💰</div>
                      <Heading level="h3" color="default" className="mb-3">
                        Ship-or-Refund Guarantee
                      </Heading>
                      <Text variant="body" color="muted">
                        Deploy your first profitable clone or get 100% of your money back. No questions asked.
                      </Text>
                    </div>
                  </Card>

                  {/* Urgency */}
                  <Card padding="md" className="bg-red-50 border-red-200">
                    <div className="text-center">
                      <div className="text-3xl mb-3">⏰</div>
                      <Heading level="h3" color="default" className="mb-3">
                        Limited Time Offer
                      </Heading>
                      <Text variant="body" color="muted">
                        Founding member pricing ends soon. Next cohort will be $999.
                      </Text>
                    </div>
                  </Card>
                </div>
              </Animated>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <Section background="white">
        <Container>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Text variant="body" color="muted">Loading...</Text>
          </div>
        </Container>
      </Section>
    }>
      <PayPageContent />
    </Suspense>
  );
}