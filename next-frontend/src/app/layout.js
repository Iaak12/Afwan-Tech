import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata = {
  title: "AFWAN TECH | Digital Marketing & Next.js Web Engineering Agency",
  description: "Next-gen web development, custom software engineering, and programmatic SEO covering 500+ cities in India & globally.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/afwan.png",
  },
  openGraph: {
    title: "AFWAN TECH | Digital Marketing & Web Engineering Agency",
    description: "Next-gen web development, custom software engineering, and programmatic SEO covering 500+ cities in India & globally.",
    url: "https://afwantech.com",
    siteName: "Afwan Tech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0f172a] antialiased selection:bg-primary selection:text-white">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
