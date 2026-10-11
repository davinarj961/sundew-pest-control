import "./globals.css";
import WhatsappFab from "@/components/WhatsappFab";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const isLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export const metadata = {
  metadataBase: new URL(siteUrl),
  robots: isLive
    ? { index: true, follow: true }
    : { index: false, follow: false },
  title: {
    default:
      "Sundew Pest Control & Fumigation | Government-Accredited, Tamil Nadu",
    template: "%s | Sundew Pest Control",
  },
  description:
    "DPPQS and AFAS accredited fumigation and pest control across Tamil Nadu. Export cargo, chamber, vessel and warehouse fumigation, plus household pest control.",
  openGraph: {
    title: "Sundew Pest Control & Fumigation",
    description:
      "Government-accredited fumigation and pest control, trusted for 25 years across Tamil Nadu.",
    type: "website",
    locale: "en_IN",
    siteName: "Sundew Pest Control",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-forest-950 font-sans">
        {children}
        <WhatsappFab />
      </body>
    </html>
  );
}
