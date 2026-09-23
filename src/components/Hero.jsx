import Link from "next/link";
import { businessInfo } from "@/lib/BusinessInfo";

export default function Hero() {
  return (
    <div className="relative px-8 py-24 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE — headline */}
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-6 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            ISPM-15 Certified Fumigation Authority
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-forest-950 mb-6">
            Government-accredited fumigation,{" "}
            <span className="text-forest-500">trusted for 25 years</span> across Tamil Nadu.
          </h1>

          <p className="text-forest-950/70 max-w-md mb-8 leading-relaxed">
            Sundew is one of the few pest control providers in Tamil Nadu with
            dual accreditation for export cargo, chamber, vessel and warehouse
            fumigation — backed by a 15-technician field team.
          </p>

          <div className="flex gap-3.5 mb-11">
            <Link
              href="/contact"
              className="bg-forest-950 text-cream font-semibold text-sm px-6 py-3.5 rounded-lg"
            >
              Request Fumigation Quote
            </Link>
            <Link
              href="/services"
              className="border-[1.5px] border-forest-700 text-forest-950 font-semibold text-sm px-6 py-3.5 rounded-lg"
            >
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-9 pt-7 border-t border-forest-950/10">
            <div>
            <div className="font-serif text-2xl font-semibold text-forest-950">
              {businessInfo.yearsInService}+
           </div>            
             <div className="text-xs text-forest-950/60 mt-1">Years of Service</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-forest-950">{businessInfo.technicianCount}</div>
              <div className="text-xs text-forest-950/60 mt-1">Trained Technicians</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-forest-950">{businessInfo.serviceCount}</div>
              <div className="text-xs text-forest-950/60 mt-1">Specialized Services</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — accreditation panel */}
        <div className="bg-forest-950 rounded-2xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-gold-soft bg-gold/15 px-3 py-1.5 rounded-full">
              Accreditation Record
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-gold-soft flex items-center justify-center">
              <div className="w-11 h-11 rounded-full border border-gold-soft flex items-center justify-center font-mono text-[8px] text-gold-soft text-center leading-tight">
                ISPM<br />15
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
  {businessInfo.accreditations.map((a) => (
    <div
      key={a.code}
      className="flex gap-3.5 p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl"
    >
      <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0"></div>
      <div>
        <div className="text-cream font-semibold text-sm mb-1">{a.title}</div>
        <div className="text-cream/55 text-xs leading-relaxed">{a.desc}</div>
        <div className="font-mono text-[10px] text-gold-soft mt-1.5">{a.code}</div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}