import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessInfo } from "@/lib/BusinessInfo";

export const metadata = {
  title: "Privacy Policy",
  description: "How Sundew Pest Control collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-3xl mx-auto px-8 py-20">
        <h1 className="font-serif text-4xl font-semibold text-forest-950 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-forest-950/60 mb-10">
          Last updated: October 2026
        </p>

        <Section title="What we collect">
          When you submit an enquiry, we collect your name, phone number, area
          or address, the service you need, and any notes you add. When you
          submit a review, we collect your name, city (optional), the service
          you used and your review text.
        </Section>

        <Section title="Why we collect it">
          We use your enquiry details only to call or message you about your
          request, schedule a visit and provide the service. Approved reviews
          are shown publicly on our Reviews page with your name and city.
        </Section>

        <Section title="Who can see it">
          Your enquiry details are visible only to authorised Sundew staff. They
          are stored in a secure hosted database.{" "}
          {/* TODO: confirm with owner */}
          We do not sell your information.
        </Section>

        <Section title="How long we keep it">
          We keep enquiry records for as long as needed to provide and follow up
          on our service. {/* TODO: owner to confirm retention period */}
        </Section>

        <Section title="Your choices">
          You can ask us to correct or delete your information, or to remove a
          review you submitted, at any time by contacting us below.
        </Section>

        <Section title="Contact us">
          {businessInfo.name}
          <br />
          Phone / WhatsApp: {businessInfo.phone}
          <br />
          Email: {businessInfo.email}
        </Section>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-forest-950 mb-2.5">
        {title}
      </h2>
      <p className="text-sm text-forest-950/70 leading-relaxed">{children}</p>
    </section>
  );
}
