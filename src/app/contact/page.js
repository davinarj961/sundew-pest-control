"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessInfo } from "@/lib/BusinessInfo";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ContactPage() {
  const [tab, setTab] = useState("inspection"); // "inspection" | "booking"
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    const { error } = await supabase.from("enquiries").insert({
      name: data.get("name"),
      phone: data.get("phone"),
      location: data.get("location"),
      type: tab,
      service: tab === "booking" ? data.get("service") : null,
      bhk: tab === "booking" ? data.get("bhk") : null,
      notes: data.get("notes") || null,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setStatus(error.message?.includes("Too many") ? "toomany" : "error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-18 grid md:grid-cols-[1fr_1.2fr] gap-14">
        {/* LEFT SIDE — info */}
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            Get In Touch
          </div>
          <h1 className="font-serif text-3xl font-semibold text-forest-950 mb-3.5 leading-tight">
            Book a free inspection or a service — one form, one call back.
          </h1>
          <p className="text-forest-950/70 text-sm mb-8">
            Every enquiry gets a same-day callback by phone or WhatsApp. Free
            inspection is offered before any quote.
          </p>

          <InfoRow
            title="WhatsApp & Email"
            desc="Instant enquiry notifications, replied to same day."
          />
          <InfoRow
            title={businessInfo.hours}
            desc="Field teams operating across all of Tamil Nadu."
          />
          <InfoRow
            title="Cash · UPI · Bank Transfer"
            desc="Flexible payment on completion of service."
          />

          <div className="flex gap-2.5 mt-8">
            <div className="flex-1 bg-white border border-forest-950/10 rounded-lg px-4 py-3 font-mono text-xs text-forest-700 text-center">
              DPPQS
              <br />
              ACCREDITED
            </div>
            <div className="flex-1 bg-white border border-forest-950/10 rounded-lg px-4 py-3 font-mono text-xs text-forest-700 text-center">
              AFAS
              <br />
              ACCREDITED
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — form */}
        <div className="bg-white border border-forest-950/10 rounded-2xl p-8">
          <div className="flex bg-cream-dim rounded-full p-1 mb-7">
            <button
              type="button"
              onClick={() => setTab("inspection")}
              className={`flex-1 text-center py-3 rounded-full text-sm font-semibold ${
                tab === "inspection"
                  ? "bg-forest-950 text-cream"
                  : "text-forest-950/60"
              }`}
            >
              Free Inspection
            </button>
            <button
              type="button"
              onClick={() => setTab("booking")}
              className={`flex-1 text-center py-3 rounded-full text-sm font-semibold ${
                tab === "booking"
                  ? "bg-forest-950 text-cream"
                  : "text-forest-950/60"
              }`}
            >
              Service Booking
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <input
                  name="name"
                  type="text"
                  minlength={2}
                  placeholder="Enter your name"
                  className="input"
                  required
                />
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>Website</label>
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              </Field>
              <Field label="Phone Number">
                <input
                  name="phone"
                  minLength={10}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="input"
                  required
                />
              </Field>
              <Field label="Address / Area" full>
                <input
                  name="location"
                  type="text"
                  placeholder="e.g. Anna Nagar, Chennai"
                  className="input"
                  required
                />
              </Field>

              {tab === "booking" && (
                <>
                  <Field label="Service Required">
                    <select name="service" className="input">
                      <option>Export Cargo Fumigation</option>
                      <option>Chamber Fumigation</option>
                      <option>Vessel Fumigation</option>
                      <option>Warehouse Fumigation</option>
                      <option>Commercial Pest Management</option>
                      <option>Household Pest Control</option>
                    </select>
                  </Field>
                  <Field label="Property Size (if household)">
                    <select name="bhk" className="input">
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK+</option>
                      <option>Not applicable</option>
                    </select>
                  </Field>
                </>
              )}

              <Field label="Additional Notes" full>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Tell us more about your requirement..."
                  className="input"
                ></textarea>
              </Field>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-forest-950 text-cream font-semibold text-sm py-4 rounded-lg mt-2 disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending..."
                : tab === "inspection"
                  ? "Request Free Inspection"
                  : "Book Service"}
            </button>
            <p className="text-center text-xs text-forest-950/50 mt-2">
              By submitting, you agree to be contacted about your enquiry. See
              our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>

            {status === "success" && (
              <div className="mt-4 bg-forest-500/10 border border-forest-500/25 rounded-lg px-4 py-3 text-sm text-forest-700 font-semibold text-center">
                Thank you! We've received your enquiry and will call you back
                today.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 text-center">
                Something went wrong. Please try again, or contact us on
                WhatsApp.
              </div>
            )}
            {status === "toomany" && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 text-center">
                We've already received several enquiries from this number.
                Please wait a while, or contact us on WhatsApp.
              </div>
            )}

            <p className="text-center text-xs text-forest-950/60 mt-3.5">
              You'll receive a confirmation call or WhatsApp message the same
              day. All services include a {businessInfo.warrantyMonths}-month
              warranty.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function InfoRow({ title, desc }) {
  return (
    <div className="flex gap-3.5 mb-5">
      <div className="w-9.5 h-9.5 rounded-lg bg-forest-950 flex-shrink-0"></div>
      <div>
        <div className="font-semibold text-sm text-forest-950 mb-0.5">
          {title}
        </div>
        <div className="text-xs text-forest-950/60">{desc}</div>
      </div>
    </div>
  );
}

function Field({ label, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs font-semibold text-forest-950 block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
