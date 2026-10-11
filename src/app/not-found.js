import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <div className="max-w-xl mx-auto px-8 py-28 text-center">
        <div className="font-mono text-xs uppercase tracking-wider text-forest-500 mb-4">
          Error 404
        </div>
        <h1 className="font-serif text-4xl font-semibold text-forest-950 mb-3.5">
          This page doesn't exist
        </h1>
        <p className="text-forest-950/70 text-sm mb-8">
          The link may be old or mistyped. Let's get you back on track.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="bg-forest-950 text-cream font-semibold text-sm px-6 py-3 rounded-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border-[1.5px] border-forest-700 text-forest-950 font-semibold text-sm px-6 py-3 rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
