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
  whatsappNumber: '917979850684',
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
    q: "What does a digital marketing company do?",
    a: "A digital marketing company helps businesses get found and chosen online. It plans and runs SEO, paid ads, social media and content, and improves the website or app those channels lead to, then measures which activity brings enquiries and sales."
  },
  {
    q: "Is Afwan Tech a digital marketing company or a software company?",
    a: "Both. We are a digital marketing company with in-house developers, so we build websites, web apps, online stores and mobile apps, and we also run the SEO, ads and social media that bring people to them."
  },
  {
    q: "What is included in your digital marketing services?",
    a: "Our digital marketing services include SEO, local SEO, Google and Meta ads, social media management, content and conversion improvements. We also offer website, e-commerce, custom software and mobile app development, and branding and UI/UX design."
  },
  {
    q: "Is Afwan Tech the no 1 marketing company in India?",
    a: "No, and we would be wary of anyone who says they are. No independent body ranks a single no 1 marketing company in India; what matters is whether a provider fits your goals, shows real work and reports honestly."
  },
  {
    q: "Do you work as a full service marketing agency?",
    a: "Yes, for digital channels. We cover strategy, websites and apps, SEO, paid ads, social media and design. We do not handle offline media such as TV, radio, print or outdoor advertising."
  },
  {
    q: "Do you offer digital marketing services for small business owners?",
    a: "Yes. For small businesses we usually start with a fast mobile website, a complete Google Business Profile and local SEO, then add ads once the basics turn visitors into calls and messages."
  },
  {
    q: "Are you a good digital marketing agency for startups?",
    a: "We work well with startups that want to test and learn before they scale. We can build your landing page, app or web product, set up analytics and run small, controlled campaigns to find what brings paying users."
  },
  {
    q: "Can you work as a digital marketing consultant in India instead of a full agency?",
    a: "Yes. If you have your own team, we offer audits, strategy sessions and training while your staff carry out the work."
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes, remotely. We are one Bengaluru team, not a global marketing agency with offices abroad, and we work with overseas clients through video calls and shared project tools."
  },
  {
    q: "How long does SEO take to show results?",
    a: "SEO is gradual and usually takes months rather than weeks. The time depends on your site's condition, competition and how much content we can publish; we give you a realistic estimate after the audit."
  },
  {
    q: "Do you guarantee first-page rankings on Google?",
    a: "No. Google itself says no one can guarantee a #1 ranking. We commit to clear work, honest reporting and following Google's guidelines."
  },
  {
    q: "How much do your services cost?",
    a: "The total depends on scope, your starting point, competition and any ad spend paid to platforms. Our team shares the exact total after reviewing your requirements."
  },
  {
    q: "Will I own my website, ad accounts and data?",
    a: "Yes. Your domain, website code, ad accounts, analytics and content belong to you, and we hand everything over if we stop working together."
  },
  {
    q: "Do you help with AI search such as Google AI Overviews?",
    a: "Yes. Google says normal SEO best practices apply to its AI features, so we focus on clear, well-structured pages, accurate business details, fast loading and content that answers real questions."
  },
  {
    q: "Do you have offices in other cities?",
    a: "No. We have one office in Whitefield, Bengaluru, and we serve clients in other cities and countries remotely."
  },
  {
    q: "How do I start working with your team?",
    a: "Call or WhatsApp +91 79798 50684, email contactafwantech@gmail.com or request a free audit through our contact page. We will review your site and reply with first recommendations."
  }
];
