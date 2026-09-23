import "./globals.css";

export const metadata = {
  title: "Sundew Pest Control & Fumigation",
  description: "Government-accredited fumigation and pest control across Tamil Nadu.",
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
      <body className="bg-cream text-forest-950 font-sans">{children}</body>
    </html>
  );
}