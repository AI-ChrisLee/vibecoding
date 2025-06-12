import { Metadata } from 'next';
import HeroSection from "@/components/hero-section";
import PersonalSection from "@/components/personal-section";
import RealitySection from "@/components/reality-section";
import BottomBar from "@/components/bottom-bar";
import CloneSection from "@/components/clone-section";
import SyllabusSection from "@/components/syllabus-section";
import GuaranteeSection from "@/components/guarantee-section";
import CTASection from "@/components/cta-section";

export const metadata: Metadata = {
  title: 'Clone $10M Apps in 21 Days | Vibe Code Clone Accelerator',
  description: 'Learn to clone profitable apps using Cursor AI, Supabase, and Vercel. Ship 3 working clones in 21 days or get 100% refunded. Join the live cohort starting July 11, 2025.',
  keywords: 'clone apps, vibe coding, cursor ai, supabase, vercel, app development, coding bootcamp, ai development',
  authors: [{ name: 'AI Chris Lee' }],
  creator: 'AI Chris Lee',
  publisher: 'Vibe Code',
  openGraph: {
    title: 'Clone $10M Apps in 21 Days | Vibe Code Clone Accelerator',
    description: 'Ship 3 profitable app clones in 21 days using proven blueprints. 97% completion rate. Money-back guarantee.',
    url: 'https://vibecode.com',
    siteName: 'Vibe Code Clone Accelerator',
    images: [
      {
        url: '/assets/Hero.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Code Clone Accelerator - Clone $10M Apps',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clone $10M Apps in 21 Days',
    description: 'Ship 3 profitable app clones in 21 days using proven blueprints. 97% completion rate.',
    creator: '@AiChrisLee',
    images: ['/assets/Hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Vibe Code Clone Accelerator",
            "description": "Learn to clone $10M apps in 21 days using Cursor AI, Supabase, and Vercel",
            "provider": {
              "@type": "Organization",
              "name": "Vibe Code",
              "sameAs": [
                "https://youtube.com/@AIChrisLee",
                "https://x.com/AiChrisLee"
              ]
            },
            "instructor": {
              "@type": "Person",
              "name": "AI Chris Lee",
              "description": "Founder & AI Consultant who built a $600K AI Web agency"
            },
            "courseMode": "online",
            "educationalLevel": "intermediate",
            "timeRequired": "P21D",
            "offers": {
              "@type": "Offer",
              "category": "Educational",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      
      <HeroSection />
      <PersonalSection />
      <RealitySection />
      <CloneSection />
      <SyllabusSection />
      <GuaranteeSection />
      <CTASection />
      <BottomBar />
    </main>
  );
}