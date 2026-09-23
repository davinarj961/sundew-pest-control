const reasons = [
  {
    num: "01",
    title: "Dual Accreditation",
    desc: "One of few providers in Tamil Nadu with both DPPQS and AFAS approval.",
  },
  {
    num: "02",
    title: "Same-Day Callback",
    desc: "Every enquiry gets a confirmed response the same day, by call or WhatsApp.",
  },
  {
    num: "03",
    title: "Free Inspection",
    desc: "On-site assessment before any quote or commitment is made.",
  },
  {
    num: "04",
    title: "Statewide Coverage",
    desc: "Field teams operating across all of Tamil Nadu, not just Chennai.",
  },
];

export default function WhySundew() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-13">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            Why Sundew
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest-950">
            Built on accreditation, not just experience
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.num}>
              <div className="font-serif text-3xl font-semibold text-forest-300 mb-3.5">
                {r.num}
              </div>
              <h4 className="font-semibold text-forest-950 mb-2">{r.title}</h4>
              <p className="text-sm text-forest-950/70 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}