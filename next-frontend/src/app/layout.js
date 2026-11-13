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
    url: "https://www.afwantech.com",
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
  },
};

const rootSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.afwantech.com/#organization',
      name: 'AFWAN TECH',
      url: 'https://www.afwantech.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.afwantech.com/afwan.png',
        caption: 'AFWAN TECH Logo'
      },
      image: 'https://www.afwantech.com/afwan.png',
      description: 'AFWAN TECH is a digital marketing, Next.js web engineering and search visibility agency headquartered in Bengaluru, India.',
      founder: {
        '@type': 'Person',
        name: 'Ayaz Khan',
        jobTitle: 'Founder & Technical Director'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ITPL Main Rd, Pattandur Agrahara, Whitefield',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560066',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91 7979850684',
        contactType: 'customer support',
        email: 'contactafwantech@gmail.com',
        availableLanguage: ['en', 'hi']
      },
      sameAs: [
        'https://www.linkedin.com/company/afwan-tech',
        'https://youtube.com/@afwantechservices',
        'https://www.instagram.com/afwan.tech',
        'https://www.facebook.com/share/r/16Vp15WPEqC/'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.afwantech.com/#website',
      url: 'https://www.afwantech.com',
      name: 'AFWAN TECH',
      publisher: {
        '@id': 'https://www.afwantech.com/#organization'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/afwan.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
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
