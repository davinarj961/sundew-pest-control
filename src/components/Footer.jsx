import { businessInfo } from "@/lib/BusinessInfo";
export default function Footer() {
  return (
    <footer className="bg-forest-950 text-cream/50 px-8 pt-14 pb-7">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-700 to-forest-950"></div>
            <div className="font-serif font-semibold text-lg text-cream">Sundew</div>
          </div>
          <p className="text-sm max-w-[280px]">
            Government &amp; AFAS accredited pest control and industrial
            fumigation, serving all of Tamil Nadu for 25 years.
          </p>
        </div>

        <div>
          <h5 className="text-cream text-sm font-semibold mb-3.5">Services</h5>
          <ul className="text-sm space-y-2">
            <li>Export Fumigation</li>
            <li>Chamber Fumigation</li>
            <li>Vessel Fumigation</li>
            <li>Household Pest Control</li>
          </ul>
        </div>

        <div>
          <h5 className="text-cream text-sm font-semibold mb-3.5">Company</h5>
          <ul className="text-sm space-y-2">
            <li>About Us</li>
            <li>Reviews</li>
            <li>Appointment Status</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h5 className="text-cream text-sm font-semibold mb-3.5">Reach Us</h5>
          <ul className="text-sm space-y-2">
  <li>{businessInfo.whatsapp}</li>
  <li>{businessInfo.hours}</li>
  <li>{businessInfo.location}</li>
</ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-5 text-xs flex flex-col sm:flex-row justify-between gap-2">
        <span>© 2026 {businessInfo.name}</span>
        <span>DPPQS Accredited · AFAS Accredited</span>
      </div>
    </footer>
  );
}