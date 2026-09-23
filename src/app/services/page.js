import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FumigationServices from "@/components/FumigationServices";
import HouseholdPricing from "@/components/HouseholdPricing";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <div className="px-8 pt-16 pb-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
          Our Services
        </div>
        <h1 className="font-serif text-4xl font-semibold text-forest-950 mb-3.5">
          Nine services. Two audiences. One standard.
        </h1>
        <p className="text-forest-950/70 text-[15px] max-w-xl">
          Fumigation is our core specialization and the reason we hold
          government and AFAS accreditation. Household pest control is
          offered with the same field team, at transparent BHK-based pricing.
        </p>
      </div>

      <FumigationServices />
      <HouseholdPricing />
      <Footer />
    </main>
  );
}