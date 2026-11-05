import "./globals.css";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import FloatingActions from "@/components/FloatingActions";
import TopProgressBar from "@/components/TopProgressBar";

export const metadata = {
  metadataBase: new URL('https://www.afwantech.com'),
  title: {
    default: "AFWAN TECH | Digital Marketing & Next.js Web Engineering Agency",
    template: "%s | AFWAN TECH"
  },
  description: "Next-gen web development, custom software engineering, and programmatic SEO covering 500+ cities in India & globally.",
  keywords: [
    "digital marketing company",
    "web development company",
    "next.js development agency",
    "custom software development",
    "seo services india",
    "top digital marketing companies",
    "best digital marketing agency",
    "ecommerce website development",
    "mobile app development company",
    "programmatic seo agency",
    "afwan tech",
    "mohammad afwan"
  ],
  authors: [{ name: "Ayaz Khan", url: "https://www.afwantech.com/about-us" }],
  creator: "Ayaz Khan",
  publisher: "AFWAN TECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.afwantech.com',
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
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
    images: [{ url: "/afwan.png", width: 1200, height: 630, alt: "AFWAN TECH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFWAN TECH | Digital Marketing & Web Engineering Agency",
    description: "Next-gen web development, custom software engineering, and programmatic SEO covering 500+ cities in India & globally.",
    images: ["/afwan.png"],
  ,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/afwan.png" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0f172a] antialiased selection:bg-primary selection:text-white">
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-H1Z6QJM1NH"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H1Z6QJM1NH', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <TopProgressBar />
        <AnalyticsTracker />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
