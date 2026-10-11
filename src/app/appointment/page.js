"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { businessInfo } from "@/lib/BusinessInfo";

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export default function AppointmentPage() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | invalid | error
  const [results, setResults] = useState([]);

  async function checkStatus(e) {
    e.preventDefault();

    if (phone.replace(/\D/g, "").length < 10) {
      setState("invalid");
      return;
    }

    setState("loading");
    const { data, error } = await supabase.rpc("check_appointment", {
      p_phone: phone,
    });

    if (error) {
      console.error("check_appointment error:", error);
      setState("error");
      return;
    }

    setResults(data ?? []);
    setState("done");
  }

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
          Enter the phone number you used when booking to see where your enquiry
          stands.
        </p>

        <div className="bg-white border border-forest-950/10 rounded-2xl p-7">
          <form onSubmit={checkStatus}>
            <label className="text-xs font-semibold text-forest-950 block mb-2">
              Registered Phone Number
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="flex-1 border border-forest-950/10 rounded-lg px-3.5 py-3 text-sm font-mono bg-cream"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="bg-forest-950 text-cream font-semibold text-sm px-6 py-3 rounded-lg whitespace-nowrap disabled:opacity-60"
              >
                {state === "loading" ? "Checking..." : "Check Status"}
              </button>
            </div>
          </form>

          {state === "invalid" && (
            <p className="mt-4 text-sm text-red-700">
              Please enter a valid 10-digit phone number.
            </p>
          )}
          {state === "error" && (
            <p className="mt-4 text-sm text-red-700">
              Something went wrong. Please try again in a moment.
            </p>
          )}

          {state === "done" && results.length === 0 && (
            <div className="mt-7 rounded-xl p-5 bg-cream-dim text-sm text-forest-950/70">
              We couldn't find an enquiry for that number. Check the number you
              used, or contact us on WhatsApp at {businessInfo.whatsapp}.
            </div>
          )}

          {state === "done" &&
            results.map((r) => <ResultCard key={r.ref} r={r} />)}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ResultCard({ r }) {
  const confirmed = r.status === "confirmed";

  return (
    <div
      className={`mt-7 rounded-xl p-5 border ${
        confirmed
          ? "bg-forest-500/10 border-forest-500/25"
          : "bg-[#FBF3E1] border-[#B8860B]/25"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-3.5">
        <span
          className={`font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full text-cream font-semibold ${
            confirmed ? "bg-forest-700" : "bg-[#B8860B]"
          }`}
        >
          {confirmed ? "Confirmed" : "Pending Confirmation"}
        </span>
        <span className="text-sm text-forest-950/60">{r.ref}</span>
      </div>

      <DetailRow
        label="Request"
        value={r.type === "inspection" ? "Free Inspection" : "Service Booking"}
      />
      {r.service && (
        <DetailRow
          label="Service"
          value={r.bhk ? `${r.service} (${r.bhk})` : r.service}
        />
      )}
      <DetailRow label="Submitted" value={formatDateTime(r.created_at)} />
      <DetailRow
        label={confirmed ? "Scheduled visit" : "Next step"}
        value={
          confirmed
            ? r.scheduled_at
              ? formatDateTime(r.scheduled_at)
              : "Our team will call you with the visit time"
            : "Callback within the same day"
        }
        last
      />
    </div>
  );
}

function DetailRow({ label, value, last }) {
  return (
    <div
      className={`flex justify-between gap-4 py-2.5 text-sm ${
        !last ? "border-b border-black/[0.06]" : ""
      }`}
    >
      <span className="text-forest-950/60">{label}</span>
      <span className="font-semibold text-forest-950 text-right">{value}</span>
    </div>
  );
}
