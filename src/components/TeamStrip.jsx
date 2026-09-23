const technicians = [
  "Technician 01",
  "Technician 02",
  "Technician 03",
  "Technician 04",
  "Technician 05",
  "Technician 06",
];

export default function TeamStrip() {
  return (
    <section className="bg-cream-dim px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            Our Team
          </div>
          <h2 className="font-serif text-2xl font-semibold text-forest-950">
            15 trained technicians, one standard
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {technicians.map((name) => (
            <div
              key={name}
              className="min-w-[150px] h-[180px] rounded-xl bg-gradient-to-br from-forest-300 to-forest-700 flex items-end p-3.5 flex-shrink-0"
            >
              <span className="text-cream text-xs font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}