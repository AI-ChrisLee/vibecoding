"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

export default function ThanksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Section background="blue">
        <Container>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <Text variant="body" color="white">Loading...</Text>
          </div>
        </Container>
      </Section>
    );
  }

  const nextSteps = [
    "📧 Check your email - We've sent a confirmation link to your inbox. Click it.",
    "📺 Watch the quick start videos below 📹 - Get ready for the masterclass with these essential guides.",
    "🚀 Join the community - Connect with other builders in our private Discord.",
    "📅 Mark your calendar - Live cohort starts July 11, PST 10 AM."
  ];

  return (
    <main className="min-h-screen bg-white">
      <Section background="blue">
        <Container>
          <div className="max-w-3xl mx-auto text-center py-20">
            {/* Success Badge */}
            <Animated animation="fadeInUp">
              <div className="flex justify-center mb-8">
                <StepBadge step="✅" title="Payment Successful" variant="dark" />
              </div>
            </Animated>

            {/* Main Heading */}
            <Animated animation="fadeInUp" delay={0.1}>
              <Heading level="hero" color="white" className="mb-6">
                Welcome to Vibe Coding! 🎉
              </Heading>
            </Animated>

            {/* Personalized Message */}
            <Animated animation="fadeInUp" delay={0.2}>
              <Text variant="body" color="white" className="mb-4 text-xl">
                Hey there! Your payment has been processed successfully.
              </Text>
            </Animated>

            <Animated animation="fadeInUp" delay={0.3}>
              <Text variant="body" color="white" className="mb-12 opacity-90">
                You're now part of an exclusive group of builders who clone profitable apps and cash their first Stripe payments.
              </Text>
            </Animated>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Next Steps */}
            <Animated animation="fadeInUp" delay={0.4}>
              <div className="text-center mb-12">
                <Heading level="h1" color="default" className="mb-6">
                  What Happens Next?
                </Heading>
                <Text variant="body" color="muted" className="max-w-2xl mx-auto">
                  Follow these steps to get the most out of your Vibe Coding experience.
                </Text>
              </div>
            </Animated>

            <Animated animation="fadeInUp" delay={0.5}>
              <Card padding="lg" className="mb-12">
                <Heading level="h2" color="default" className="mb-6 text-center">
                  Your Next Steps
                </Heading>
                <List items={nextSteps} variant="bullet" color="blue" />
              </Card>
            </Animated>

            {/* What You Get Reminder */}
            <Animated animation="fadeInUp" delay={0.6}>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card padding="md" hover>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <Heading level="h3" color="default" className="mb-3">
                      Live Cohort Access
                    </Heading>
                    <Text variant="body" color="muted">
                      Join live sessions starting July 11. Build alongside other founders and get real-time feedback.
                    </Text>
                  </div>
                </Card>

                <Card padding="md" hover>
                  <div className="text-center">
                    <div className="text-4xl mb-4">💰</div>
                    <Heading level="h3" color="default" className="mb-3">
                      Ship-or-Refund Guarantee
                    </Heading>
                    <Text variant="body" color="muted">
                      Deploy your first clone or get your money back. No excuses, just results.
                    </Text>
                  </div>
                </Card>
              </div>
            </Animated>

            {/* CTA Section */}
            <Animated animation="fadeInUp" delay={0.7}>
              <div className="text-center bg-gray-50 rounded-lg p-8">
                <Heading level="h2" color="default" className="mb-4">
                  Ready to Start Building?
                </Heading>
                <Text variant="body" color="muted" className="mb-6">
                  Access your course materials and join the community.
                </Text>
                <Button 
                  variant="primary" 
                  size="lg" 
                  href="/"
                  ariaLabel="Get started with Vibe Coding"
                >
                  Get Started
                </Button>
              </div>
            </Animated>
          </div>
        </Container>
      </Section>
    </main>
  );
}