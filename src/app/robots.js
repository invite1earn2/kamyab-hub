export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://kamyab-hub.vercel.app/sitemap.xml",
  };
}