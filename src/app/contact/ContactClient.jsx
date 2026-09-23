"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactClient() {
  const [tab, setTab] = useState("inspection");

  return (
    <main>
      <Navbar />
      <div className="max-w-5xl mx-auto px-8 py-18 grid md:grid-cols-[1fr_1.2fr] gap-14">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
            Get In Touch
          </div>
          <h1 className="font-serif text-3xl font-semibold text-forest-950 mb-3.5 leading-tight">
            Book a free inspection or a service - one form, one call back.
          </h1>
          <p className="text-forest-950/70 text-sm mb-8">
            Every enquiry gets a same-day callback by phone or WhatsApp. Free inspection is offered before any quote.
          </p>
          <InfoRow title="WhatsApp & Email" description="Instant enquiry notifications, replied to same day." />
          <InfoRow title="9 AM - 6 PM, All Days" description="Field teams operating across all of Tamil Nadu." />
          <InfoRow title="Cash - UPI - Bank Transfer" description="Flexible payment on completion of service." />
        </div>

        <div className="bg-white border border-forest-950/10 rounded-2xl p-8">
          <div className="flex bg-cream-dim rounded-full p-1 mb-7">
            <TabButton active={tab === "inspection"} onClick={() => setTab("inspection")}>Free Inspection</TabButton>
            <TabButton active={tab === "booking"} onClick={() => setTab("booking")}>Service Booking</TabButton>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name"><input type="text" placeholder="Enter your name" className="input" /></Field>
              <Field label="Phone Number"><input type="tel" placeholder="+91 98765 43210" className="input" /></Field>
              <Field label="Address / Area" full><input type="text" placeholder="e.g. Anna Nagar, Chennai" className="input" /></Field>
              {tab === "booking" && <BookingFields />}
              <Field label="Additional Notes" full><textarea rows={3} placeholder="Tell us more about your requirement..." className="input" /></Field>
            </div>
            <button type="submit" className="w-full bg-forest-950 text-cream font-semibold text-sm py-4 rounded-lg mt-2">
              {tab === "inspection" ? "Request Free Inspection" : "Book Service"}
            </button>
            <p className="text-center text-xs text-forest-950/60 mt-3.5">You&apos;ll receive a confirmation call or WhatsApp message the same day.</p>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function InfoRow({ title, description }) {
  return <div className="mb-5"><div className="font-semibold text-sm text-forest-950 mb-0.5">{title}</div><div className="text-xs text-forest-950/60">{description}</div></div>;
}

function TabButton({ active, children, onClick }) {
  return <button type="button" onClick={onClick} className={`flex-1 text-center py-3 rounded-full text-sm font-semibold ${active ? "bg-forest-950 text-cream" : "text-forest-950/60"}`}>{children}</button>;
}

function Field({ label, full, children }) {
  return <div className={full ? "sm:col-span-2" : ""}><label className="text-xs font-semibold text-forest-950 block mb-1.5">{label}</label>{children}</div>;
}

function BookingFields() {
  return <><Field label="Service Required"><select className="input"><option>Export Cargo Fumigation</option><option>Chamber Fumigation</option><option>Vessel Fumigation</option><option>Warehouse Fumigation</option><option>Commercial Pest Management</option><option>Household Pest Control</option></select></Field><Field label="Property Size (if household)"><select className="input"><option>1 BHK</option><option>2 BHK</option><option>3 BHK+</option><option>Not applicable</option></select></Field></>;
}