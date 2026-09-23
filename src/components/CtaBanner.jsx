import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="px-8 pb-24">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-forest-950 to-forest-700 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-cream max-w-md leading-snug">
            Need export cargo or warehouse fumigation certified to international standard?
          </h2>
          <p className="text-cream/60 text-sm mt-3">
            Free inspection · Same-day callback · Documentation provided
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-gold text-forest-950 font-semibold text-sm px-6 py-3.5 rounded-lg whitespace-nowrap"
        >
          Book Free Inspection
        </Link>
      </div>
    </section>
  );
}