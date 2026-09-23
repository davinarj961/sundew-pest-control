import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FumigationServices from "@/components/FumigationServices";
import HouseholdPricing from "@/components/HouseholdPricing";
import WhySundew from "@/components/WhySundex";
import TeamStrip from "@/components/TeamStrip";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FumigationServices />
      <HouseholdPricing />
      <WhySundew />
      <TeamStrip />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}