const householdServices = [
  { name: "Cockroach Control", price1BHK: "₹1,500" },
  { name: "Termite Treatment", price1BHK: "₹1,500" },
  { name: "Rodent Control", price1BHK: "₹1,500" },
  { name: "Mosquito Control", price1BHK: "₹1,500" },
  { name: "Bed Bug Control", price1BHK: "₹1,500" },
  { name: "General Pest Control", price1BHK: "₹1,500" },
];

export default function HouseholdPricing() {
  return (
    <section className="bg-cream-dim px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-9">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
              Household Services
            </div>
            <h3 className="font-serif text-2xl font-semibold text-forest-950">
              Also available — priced by BHK
            </h3>
          </div>
          <div className="font-mono text-xs uppercase tracking-wider text-forest-950/60">
            Secondary Services · Starting ₹1,500
          </div>
        </div>

        <div className="bg-white border border-forest-950/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 px-7 py-4 bg-forest-950">
            <span className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
              Service
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
              1 BHK
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
              2 BHK
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
              3 BHK+
            </span>
          </div>

          {/* Table rows */}
          {householdServices.map((service, index) => (
            <div
              key={service.name}
              className={`grid grid-cols-4 px-7 py-4 items-center ${
                index !== householdServices.length - 1
                  ? "border-b border-forest-950/10"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 font-semibold text-forest-950 text-sm">
                <div className="w-8 h-8 rounded-lg bg-forest-500/10 flex-shrink-0"></div>
                {service.name}
              </div>
              <span className="text-sm text-forest-950/70">
                <strong className="text-forest-950">{service.price1BHK}</strong>
              </span>
              <span className="text-sm text-forest-950/70">Contact us</span>
              <span className="text-sm text-forest-950/70">Contact us</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-forest-950/60 mt-4">
          * Exact pricing above 1 BHK confirmed on free inspection. Prices
          shown are starting rates.
        </p>
      </div>
    </section>
  );
}