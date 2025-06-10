import HeroSection from "@/components/hero-section";
import RealitySection from "@/components/reality-section";
import BottomBar from "@/components/bottom-bar";
import CloneSection from "@/components/clone-section";
import SyllabusSection from "@/components/syllabus-section";
import GuaranteeSection from "@/components/guarantee-section";
import CompareSection from "@/components/compare-section";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RealitySection />
      <CloneSection />
      <SyllabusSection />
      <GuaranteeSection />
      <CompareSection />
      <CTASection />
      <BottomBar />
    </>
  );
}