export const siteSettings = {
  siteName: 'AFWAN TECH',
  siteTagline: 'Next-Gen Digital Marketing & Engineering Agency',
  headerLogo: '/afwan.png',
  footerLogo: '/afwan.png',
  siteFavicon: '/favicon.png',
  contactEmail: 'contactafwantech@gmail.com',
  contactPhone: '+91 7979850684',
  contactPhone2: '+91 7979850684',
  address: 'ITPL Main Rd, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066',
  whatsapp: '917979850684',
  footerTagline: 'Expertly scaling your digital presence through data-driven strategies, cutting-edge web architecture, and programmatic growth.',
  footerCopyright: '© 2026 AFWAN TECH. All Rights Reserved.',
  socials: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  }
};

export const services = [
  {
    title: 'Website Development',
    slug: 'website-development',
    category: 'Development',
    shortDesc: 'High-end custom websites built for high conversion, lightning speed, and modern SEO architecture.',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
    features: ['Next.js / React Architecture', 'Core Web Vitals Optimized', 'Mobile-First Responsive Design', 'Enterprise Security & SSL', 'Modern UI/UX', 'SEO Structured Data']
  },
  {
    title: 'Custom Web Development',
    slug: 'custom-web-development',
    category: 'Development',
    shortDesc: 'Handcrafted, template-free full stack web solutions engineered for complex business logic and infinite scalability.',
    icon: 'Code',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800',
    features: ['Full Stack Engineering', 'Microservices & REST / GraphQL APIs', 'Database Design & Optimization', 'Cloud CI/CD Deployments', 'High-Load Resilience', 'Custom Admin Portals']
  },
  {
    title: 'E-commerce Development',
    slug: 'ecommerce-development',
    category: 'Development',
    shortDesc: 'High-converting online stores built on Shopify, WooCommerce, or headless architectures to scale GMV.',
    icon: 'ShoppingCart',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800',
    features: ['Custom Checkout Optimization', 'Multi-Currency & Regional Gateways', 'Inventory & ERP Synchronization', 'Instant Search & Filter Systems', 'High-Speed Product Pages', 'Abandoned Cart Automation']
  },
  {
    title: 'Mobile App Development',
    slug: 'app-development',
    category: 'Development',
    shortDesc: 'Native & cross-platform iOS and Android applications crafted for supreme performance and intuitive UX.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800',
    features: ['Flutter & React Native', 'iOS & Android Native Builds', 'Push Notifications & Webhooks', 'Secure Biometric Auth', 'Offline-First Data Caching', 'App Store Optimization (ASO)']
  },
  {
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo-services',
    category: 'Marketing & Growth',
    shortDesc: 'Data-backed, white-hat SEO strategies engineered to rank you #1 on Google and generate compounding inbound pipeline.',
    icon: 'Search',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20e?q=80&w=800',
    features: ['Deep Technical SEO Audits', 'Keyword Cluster Mapping', 'High-Authority Backlink Acquisition', 'Programmatic City & State SEO', 'Schema Markup Integration', 'Google Algorithm Resilience']
  },
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    category: 'Marketing & Growth',
    shortDesc: 'Viral visual storytelling and strategic community management that turn audience attention into loyal brand advocacy.',
    icon: 'Share2',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800',
    features: ['Omnichannel Content Strategy', 'Short-Form Video & Reel Production', 'Influencer Collaboration Networks', 'Community Engagement & Moderation', 'Growth & Follower Analytics', 'Brand Voice Development']
  },
  {
    title: 'Graphic Design & Branding',
    slug: 'graphic-design',
    category: 'Design & Branding',
    shortDesc: 'Distinctive brand identities, UI/UX design systems, and digital assets that captivate audiences and inspire trust.',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800',
    features: ['Brand Identity Systems', 'Logo & Typography Design', 'Figma UI/UX Prototypes', 'Marketing Collateral & Decks', 'Packaging & 3D Renders', 'Design System Architecture']
  },
  {
    title: 'Performance Marketing (PPC)',
    slug: 'ppc-paid-ads',
    category: 'Marketing & Growth',
    shortDesc: 'High-ROAS Google Search, Display, Meta, and LinkedIn ad campaigns optimized dynamically for qualified revenue.',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800',
    features: ['Google Search & Shopping Ads', 'Meta (FB/Instagram) Ads', 'Lookalike & Retargeting Funnels', 'Real-Time ROAS Tracking', 'A/B Creative & Copy Testing', 'Landing Page Conversion Rate Lift']
  }
];

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Growth Starter',
    price: '₹19,999',
    period: '/month',
    desc: 'Ideal for local businesses, clinics, and emerging startups targeting rapid market visibility.',
    popular: false,
    cta: 'Get Started',
    features: [
      '5 Targeted High-Intent Keywords',
      'Google Business Profile (GMB) Optimization',
      'Full On-Page Technical Fixes (Up to 10 Pages)',
      'Local Citation & Directory Syndication',
      'Basic Schema Markup Setup',
      'Bi-Weekly Keyword Tracking Report',
      'Dedicated Account Manager'
    ]
  },
  {
    id: 'scale',
    name: 'Enterprise Dominance',
    price: '₹39,999',
    period: '/month',
    desc: 'For ambitious brands ready to outrank national competitors and dominate multiple target regions.',
    popular: true,
    cta: 'Dominate Your Market',
    features: [
      '25 Competitive Commercial Keywords',
      'Programmatic City/State Multi-Location Pages',
      'High Domain Authority (DA 50+) Editorial Backlinks',
      'Core Web Vitals & PageSpeed Supercharging',
      'Comprehensive Competitor Content Gap Strategy',
      'Bi-Weekly Strategy Sync & Video Calls',
      'Conversion Rate Optimization (CRO) Heatmaps',
      'Custom Real-Time Analytics Dashboard'
    ]
  },
  {
    id: 'custom',
    name: 'Full Stack Tech & SEO',
    price: '₹69,999',
    period: '/month',
    desc: 'All-inclusive enterprise solution combining bespoke web engineering with aggressive organic & paid growth.',
    popular: false,
    cta: 'Custom Architecture',
    features: [
      'Custom Next.js / Web Application Development',
      'Unlimited Technical SEO & Code Maintenance',
      'Full Programmatic SEO Strategy (500+ Cities Coverage)',
      'Meta & Google Ads Campaign Management',
      'Dedicated Senior Dev + SEO Strategist',
      'Priority 24/7 Slack & WhatsApp Channel Support',
      'Complete Source Code Ownership'
    ]
  }
];

export const portfolioProjects = [
  {
    id: 1,
    title: 'E-commerce SEO Domination',
    category: 'SEO & Growth',
    result: '340% Organic Traffic Growth',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    industry: 'Retail & D2C',
    duration: '6 Months',
    stat1: { value: '340%', label: 'Traffic Growth' },
    stat2: { value: '₹2.1Cr', label: 'Revenue Added' }
  },
  {
    id: 2,
    title: 'SaaS Platform Next.js Architecture',
    category: 'Web Development',
    result: '99.9% Uptime & 0.4s FCP',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    industry: 'Enterprise Software',
    duration: '4 Months',
    stat1: { value: '99.9%', label: 'Uptime' },
    stat2: { value: '18k+', label: 'Active Users' }
  },
  {
    id: 3,
    title: 'Global Luxury Real Estate PPC',
    category: 'Paid Advertising',
    result: '6.2x Verified ROAS',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    industry: 'Real Estate',
    duration: '3 Months',
    stat1: { value: '6.2x', label: 'ROAS' },
    stat2: { value: '65%', label: 'Lower Cost Per Lead' }
  },
  {
    id: 4,
    title: 'Fintech Mobile Banking App',
    category: 'Mobile Apps',
    result: '4.9 Stars on App Store',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    industry: 'Fintech',
    duration: '5 Months',
    stat1: { value: '4.9', label: 'App Store Rating' },
    stat2: { value: '250k+', label: 'Downloads' }
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Vikram Malhotra',
    role: 'CEO & Founder',
    company: 'Apex Logistics India',
    text: 'AFWAN Tech transformed our online visibility completely. Within 5 months, we ranked on page 1 for over 80 high-ticket logistics keywords across Delhi NCR and Mumbai.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Aisha Al-Mansoor',
    role: 'Marketing Director',
    company: 'Oasis Tech MENA',
    text: 'Their Next.js web development and programmatic SEO strategy expanded our client base across Dubai and Riyadh seamlessly. Fast, communicative, and exceptionally results-driven.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Rahul Sen',
    role: 'Co-Founder',
    company: 'FinPulse Labs',
    text: 'The web analytics and conversion engineering they implemented reduced our customer acquisition cost by 48%. If you want ROI instead of empty buzzwords, choose AFWAN.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

export const faqs = [
  {
    q: 'How does your Programmatic SEO feature work across 500+ cities?',
    a: 'We generate localized, search-engine-optimized dynamic pages with city-specific metadata, localized service keywords, schema markup (LocalBusiness, Breadcrumbs, FAQ), and nearby internal linking mesh networks. This allows your business to rank locally across 500+ cities in India and globally without duplicating thin content.'
  },
  {
    q: 'How does the PHP backend integrate with the Next.js frontend?',
    a: 'All static content, layouts, animations, and pages are rendered statically and dynamically via Next.js for maximum speed and SEO. When a user fills out a contact form or requests a consultation, Next.js transmits the data to lightweight PHP endpoints (contact.php) on your server which handles email dispatch, validation, and database storage.'
  },
  {
    q: 'What is included in the Web Analytics tracking system?',
    a: 'Our built-in analytics system tracks real-time pageviews, unique visitors (using GDPR-compliant daily salt hashing), referral sources, top pages, and device categories (desktop, mobile, tablet). You can view the live data inside the built-in /analytics dashboard.'
  },
  {
    q: 'Can I host the frontend and backend on different servers?',
    a: 'Yes! Next.js can be deployed on Vercel, Node VPS, or Netlify, while the PHP backend can live on your existing cPanel, Apache, or Shared Hosting server. You simply configure NEXT_PUBLIC_PHP_API_URL to point to your PHP server domain.'
  },
  {
    q: 'How soon can we expect organic search ranking results?',
    a: 'Most clients observe initial keyword indexation within 2 to 3 weeks and measurable organic ranking lifts and traffic growth within 60 to 90 days, backed by our programmatic location indexing and technical Core Web Vitals optimizations.'
  }
];
