"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [requestedPath, setRequestedPath] = useState(null);
  const isNavigating = requestedPath !== null && requestedPath !== pathname;

  function startNavigation(destination) {
    setRequestedPath(destination);
  }

  function navLinkClass(destination) {
    return `pb-1 transition-colors hover:text-forest-700 ${
      pathname === destination
        ? "text-forest-700 border-b-2 border-gold"
        : "text-forest-950"
    }`;
  }

  return (
    <>
      {/* Top trust bar */}
      <div className="bg-forest-950 text-cream-dim text-xs py-2">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="hidden md:flex gap-5 items-center">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Govt. of India Accredited (DPPQS)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              AFAS Accredited — Australia
            </span>
          </div>
          <div className="font-mono tracking-wide">SERVING ALL TAMIL NADU</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-forest-950/10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-700 to-forest-950"></div>
            <div>
              <div className="font-serif font-semibold text-lg leading-tight">Sundew</div>
              <div className="text-[10px] uppercase tracking-wider text-forest-500">
                Pest Control &amp; Fumigation
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" onClick={() => startNavigation("/")} className={navLinkClass("/")}>Home</Link>
            <Link href="/services" onClick={() => startNavigation("/services")} className={navLinkClass("/services")}>Services</Link>
            <Link href="/reviews" onClick={() => startNavigation("/reviews")} className={navLinkClass("/reviews")}>Reviews</Link>
            <Link href="/appointment" onClick={() => startNavigation("/appointment")} className={navLinkClass("/appointment")}>Appointment</Link>
            <Link href="/contact" onClick={() => startNavigation("/contact")} className={navLinkClass("/contact")}>Contact</Link>
          </div>

          <Link
            href="/contact"
            onClick={() => startNavigation("/contact")}
            className="bg-forest-950 text-cream text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Book Free Inspection
          </Link>
        </div>
        <div
          aria-hidden="true"
          className={`h-0.5 bg-gold transition-all duration-300 ${
            isNavigating ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </nav>
    </>
  );
}