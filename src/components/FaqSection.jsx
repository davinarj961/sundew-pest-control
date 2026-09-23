"use client";

import { useState } from "react";
import { businessInfo } from "@/lib/BusinessInfo";

const questions = [
  {
    question: "Are you actually accredited, or is this just marketing language?",
    answer: "Sundew holds accreditation from India's DPPQS and the Australian Fumigation Accreditation Service. Documentation is provided with every fumigation job for audit and customs purposes.",
  },
  {
    question: "Do you offer a free inspection before quoting?",
    answer: "Yes. Every household or industrial enquiry gets a free on-site inspection before we provide a quote or ask for any commitment.",
  },
  {
    question: "Is there a warranty on your treatments?",
    answer: `Yes. All services include a ${businessInfo.warrantyMonths}-month service warranty. If pests return within that period, we re-treat at no extra cost.`,
  },
  {
    question: "Do you serve areas outside Chennai?",
    answer: "Yes, our field teams operate across all of Tamil Nadu for both household pest control and industrial fumigation.",
  },
  {
    question: "How quickly can you respond to an enquiry?",
    answer: "Every enquiry receives a confirmed callback the same day, by phone or WhatsApp.",
  },
];

export default function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <section className="px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
          Frequently Asked
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest-950 mb-10">Common questions</h2>

        <div className="flex flex-col gap-3">
          {questions.map((item, index) => {
            const isOpen = openQuestion === index;
            return (
              <div key={item.question} className="bg-white border border-forest-950/10 rounded-xl overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                  className="w-full flex justify-between items-center gap-4 text-left px-6 py-5"
                >
                  <span className="font-semibold text-sm text-forest-950">{item.question}</span>
                  <span className={`text-forest-500 text-xl leading-none flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <div className="px-6 pb-5 text-sm text-forest-950/70 leading-relaxed">{item.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}