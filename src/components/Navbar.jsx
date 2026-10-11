"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/appointment", label: "Appointment" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-700 to-forest-950"></div>
            <div>
              <div className="font-serif font-semibold text-lg leading-tight">
                Sundew
              </div>
              <div className="text-[10px] uppercase tracking-wider text-forest-500">
                Pest Control &amp; Fumigation
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? "text-forest-700 border-b-2 border-gold pb-1"
                    : "hover:text-forest-700"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:block bg-forest-950 text-cream text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Book Free Inspection
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`w-5 h-0.5 bg-forest-950 transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-forest-950 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-forest-950 transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-forest-950/10 bg-cream px-8 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-medium border-b border-forest-950/5 ${
                  pathname === l.href ? "text-forest-700" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 bg-forest-950 text-cream text-sm font-semibold px-5 py-3 rounded-lg text-center"
            >
              Book Free Inspection
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
