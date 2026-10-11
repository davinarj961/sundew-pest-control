export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const isLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

  // Demo mode: tell every crawler to stay away
  if (!isLive) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
