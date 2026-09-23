"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppointmentPage() {
  const [status, setStatus] = useState("confirmed"); // "confirmed" | "pending"

  const checkStatus = () => {
    setStatus((prev) => (prev === "confirmed" ? "pending" : "confirmed"));
  };

  return (
    <main>
      <Navbar />

      <div className="max-w-2xl mx-auto px-8 py-20">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
          Appointment Status
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-forest-950 mb-2.5">
          Check your appointment
        </h1>
        <p className="text-forest-950/70 text-sm mb-9">
          Enter the phone number used at booking to see your current status.
        </p>

        <div className="bg-white border border-forest-950/10 rounded-2xl p-7">
          <label className="text-xs font-semibold text-forest-950 block mb-2">
            Registered Phone Number
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="flex-1 border border-forest-950/10 rounded-lg px-3.5 py-3 text-sm font-mono bg-cream"
            />
            <button
              onClick={checkStatus}
              className="bg-forest-950 text-cream font-semibold text-sm px-5.5 py-3 rounded-lg whitespace-nowrap"
            >
              Check Status
            </button>
          </div>
          <div className="text-xs text-forest-950/60 mt-3.5">
            Try clicking "Check Status" a few times — it toggles between a
            confirmed and a pending example.
          </div>

          {status === "confirmed" ? (
            <div className="mt-7 rounded-xl p-5 bg-forest-500/10 border border-forest-500/25">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full bg-forest-700 text-cream font-semibold">
                  Confirmed
                </span>
                <span className="text-sm text-forest-950/60">Appointment #SDW-2841</span>
              </div>
              <DetailRow label="Service" value="Termite Treatment (2 BHK)" />
              <DetailRow label="Date" value="2 Aug 2026, 10:00 AM" />
              <DetailRow label="Technician Team" value="Team 04" />
              <DetailRow label="Location" value="Anna Nagar, Chennai" last />
            </div>
          ) : (
            <div className="mt-7 rounded-xl p-5 bg-[#FBF3E1] border border-[#B8860B]/25">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full bg-[#B8860B] text-cream font-semibold">
                  Pending Confirmation
                </span>
                <span className="text-sm text-forest-950/60">Enquiry #SDW-2905</span>
              </div>
              <DetailRow label="Service" value="Export Cargo Fumigation" />
              <DetailRow label="Requested Date" value="Awaiting confirmation" />
              <DetailRow label="Next Step" value="Callback within 24 hours" last />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function DetailRow({ label, value, last }) {
  return (
    <div
      className={`flex justify-between py-2.5 text-sm ${
        !last ? "border-b border-black/[0.06]" : ""
      }`}
    >
      <span className="text-forest-950/60">{label}</span>
      <span className="font-semibold text-forest-950">{value}</span>
    </div>
  );
}