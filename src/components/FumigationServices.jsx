const services = [
  {
    num: "01",
    title: "Export Cargo Fumigation",
    desc: "ISPM-15 compliant treatment for containerized export cargo, with documentation accepted at international ports.",
    tags: ["ISPM-15", "DPPQS"],
  },
  {
    num: "02",
    title: "Chamber Fumigation",
    desc: "Controlled-environment fumigation chambers for bulk goods, timber and packaging material.",
    tags: ["DPPQS"],
  },
  {
    num: "03",
    title: "Vessel Fumigation",
    desc: "AFAS-accredited fumigation for ships and marine vessels ahead of departure clearance.",
    tags: ["AFAS"],
  },
  {
    num: "04",
    title: "Warehouse Fumigation",
    desc: "Large-scale treatment for storage facilities protecting bulk inventory from infestation.",
    tags: ["DPPQS"],
  },
  {
    num: "05",
    title: "Commercial Pest Management",
    desc: "Ongoing pest control contracts for restaurants, hospitals and office campuses.",
    tags: ["CONTRACT"],
  },
  {
    num: "06",
    title: "Compliance Documentation",
    desc: "Full certification paperwork provided with every fumigation job for audit and customs purposes.",
    tags: ["DPPQS", "AFAS"],
  },
];

export default function FumigationServices() {
  return (
    <section className="bg-forest-950 px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold-soft bg-gold/15 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            Industrial &amp; Export Fumigation
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream mb-3.5">
            Our core specialization
          </h2>
          <p className="text-cream/60 text-[15px]">
            Accredited fumigation services built for exporters, logistics
            operators and warehousing businesses that need compliance-grade
            treatment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.num}
              className="bg-gradient-to-br from-white/[0.045] to-white/[0.015] border border-white/10 rounded-2xl p-7"
            >
              <div className="font-mono text-xs text-gold-soft mb-4">
                {service.num}
              </div>
              <h3 className="font-serif text-lg font-semibold text-cream mb-2.5">
                {service.title}
              </h3>
              <p className="text-cream/55 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-gold-soft bg-gold/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
