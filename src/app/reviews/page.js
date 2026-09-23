"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const reviews = [
  {
    name: "Ramesh K.",
    initial: "R",
    service: "Termite Treatment · Home",
    stars: 5,
    text: "Technicians arrived on time and explained the whole process. No termite activity since the treatment months ago.",
    location: "Chennai · Verified customer",
  },
  {
    name: "Priya S.",
    initial: "P",
    service: "Export Fumigation · Business",
    stars: 5,
    text: "We needed ISPM-15 documentation urgently for a shipment. Sundew turned it around same week with full paperwork.",
    location: "Coimbatore · Verified customer",
  },
  {
    name: "Arun M.",
    initial: "A",
    service: "Restaurant Pest Control",
    stars: 4,
    text: "Reliable monthly visits, good communication over WhatsApp. Would like a bit more flexibility on scheduling.",
    location: "Madurai · Verified customer",
  },
  {
    name: "Divya N.",
    initial: "D",
    service: "Cockroach Control · Home",
    stars: 5,
    text: "Free inspection was genuinely useful — they explained exactly what was needed before quoting. Fair pricing.",
    location: "Trichy · Verified customer",
  },
];

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <main>
      <Navbar />

      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            Customer Reviews
          </div>

          <div className="flex flex-wrap justify-between items-end gap-6 mb-11">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-forest-950 mb-2.5">
                What our customers say
              </h1>
              <p className="text-forest-950/70 text-sm">
                Real feedback from homes, restaurants and businesses across Tamil Nadu.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white border border-forest-950/10 rounded-2xl px-6 py-4">
              <div className="font-serif text-4xl font-semibold text-forest-950">4.8</div>
              <div>
                <div className="text-gold text-sm">★★★★★</div>
                <div className="text-xs text-forest-950/60">Based on customer submissions</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-forest-950 text-cream font-semibold text-sm px-5.5 py-3 rounded-lg mb-9"
          >
            + Add Your Review
          </button>

          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-forest-950/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-forest-300 to-forest-700 text-cream flex items-center justify-center text-sm font-semibold">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-forest-950">{r.name}</div>
                    <div className="text-xs text-forest-950/60 font-mono">{r.service}</div>
                  </div>
                </div>
                <div className="text-gold text-xs">{"★".repeat(r.stars)}</div>
                <p className="text-sm text-forest-950/70 leading-relaxed mt-2.5">{r.text}</p>
                <div className="text-xs text-forest-950/40 font-mono mt-3">{r.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-forest-950/55 flex items-center justify-center z-[200] p-5">
          <div className="bg-white rounded-2xl p-8 max-w-[440px] w-full">
            <h3 className="font-serif text-2xl text-forest-950 mb-1.5">Share your experience</h3>
            <p className="text-sm text-forest-950/60 mb-5">
              Your review helps other customers trust our service.
            </p>

            <div className="mb-4">
              <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-forest-950/10 rounded-lg px-3.5 py-2.5 text-sm bg-cream"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                Rating
              </label>
              <div className="flex gap-1.5 text-2xl">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    onClick={() => setRating(n)}
                    className={`cursor-pointer ${n <= rating ? "text-gold" : "text-forest-950/10"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                Your Review
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your experience..."
                className="w-full border border-forest-950/10 rounded-lg px-3.5 py-2.5 text-sm bg-cream"
              ></textarea>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-[1.5px] border-forest-950/10 text-forest-950/70 font-semibold text-sm py-2.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-forest-950 text-cream font-semibold text-sm py-2.5 rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}