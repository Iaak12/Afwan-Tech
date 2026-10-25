// Deterministic Regional & Market Intelligence for 595+ Locations

const hubArchetypes = {
  mumbai: {
    archetype: 'Financial & Media Capital of India',
    primaryFocus: 'FinTech, Enterprise B2B, Media & High-Volume E-Commerce',
    keyChallenge: 'Intense digital competition where generic WordPress websites suffer from high customer acquisition costs and slow load times.',
    strategy: 'Engineering sub-second Next.js web applications paired with high-intent search ranking to dominate commercial buying terms in Mumbai & MMR.',
    sectors: ['BFSI & Wealth Management', 'Commercial Real Estate', 'Direct-to-Consumer Brands', 'Entertainment & Media Agencies'],
    clientQuote: 'AFWAN TECH rebuilt our corporate portal on Next.js. Our organic leads from Mumbai and Navi Mumbai surged 340% within four months.',
    clientPerson: 'Aditya S., Senior VP of Growth, Mumbai'
  },
  bengaluru: {
    archetype: 'Silicon Valley of India',
    primaryFocus: 'SaaS Platforms, DeepTech, Venture-Backed Startups & Web3',
    keyChallenge: 'Tech-savvy buyers demand flawless Core Web Vitals, modern design aesthetics, and rock-solid technical documentation.',
    strategy: 'Deploying high-velocity headless architecture, programmatic developer landing pages, and technical SEO designed for international scalability.',
    sectors: ['B2B Enterprise SaaS', 'AI & Machine Learning Ventures', 'FinTech & Neobanks', 'Global Capability Centers (GCC)'],
    clientQuote: 'They understand code and growth marketing equally well. Our product pages hit 100/100 Core Web Vitals and international demo signups doubled.',
    clientPerson: 'Kavita N., Product Lead, Bengaluru'
  },
  'delhi-ncr': {
    archetype: 'National Capital Region Commerce Hub',
    primaryFocus: 'Government & Corporate Services, Retail Chains, D2C & Export',
    keyChallenge: 'Vast regional geographic spread requiring multi-city local map pack dominance and hyper-targeted paid acquisition.',
    strategy: 'Deploying programmatic location clusters spanning Delhi, Noida, Gurugram, and Faridabad with localized schema markup.',
    sectors: ['Corporate Legal & Consulting', 'Healthcare & Super-Specialty Hospitals', 'Manufacturing & Export Houses', 'Luxury Real Estate'],
    clientQuote: 'AFWAN TECH delivered Page 1 rankings for over 45 high-value commercial keywords across Delhi NCR in under 90 days.',
    clientPerson: 'Vikram M., Managing Director, Delhi'
  },
  hyderabad: {
    archetype: 'Cyberabad & Biotech Valley',
    primaryFocus: 'Pharma & Biotech, IT Services, Real Estate & HealthTech',
    keyChallenge: 'Scaling enterprise authority against legacy incumbents while modernizing legacy digital presence.',
    strategy: 'Enterprise-grade headless systems and local search optimization targeting HITEC City, Gachibowli, and Madhapur.',
    sectors: ['Biopharma & Medical Tech', 'IT Infrastructure & Cloud', 'Commercial Real Estate', 'Educational Institutions'],
    clientQuote: 'The speed improvement was night and day. Inbound patient consultation inquiries from Telangana rose by 280%.',
    clientPerson: 'Dr. Srinivas R., Founder, Hyderabad'
  },
  pune: {
    archetype: 'Oxford of the East & Auto Hub',
    primaryFocus: 'Automotive Engineering, Higher EdTech, IT Parks & Precision Manufacturing',
    keyChallenge: 'Industrial and educational businesses needing lead conversion engines rather than static brochure sites.',
    strategy: 'Bespoke web applications with automated quotation workflows and programmatic search targeting Hinjawadi and Magarpatta.',
    sectors: ['Automotive & EV Component Makers', 'EdTech & University Portals', 'Manufacturing Automation', 'Software Product Studios'],
    clientQuote: 'Our RFP generation engine now runs on autopilot thanks to AFWAN TECH’s programmatic landing architecture.',
    clientPerson: 'Rajesh K., COO, Pune'
  },
  dubai: {
    archetype: 'Middle East Global Trade & Finance Hub',
    primaryFocus: 'Luxury Real Estate, Cross-Border Trade, Family Offices & Tourism',
    keyChallenge: 'Ultra-competitive international market where only world-class luxury visual presentation and multi-currency capabilities succeed.',
    strategy: 'Bilingual (Arabic/English) edge-rendered Next.js portals with high-converting WhatsApp lead funnels and Google GCC targeting.',
    sectors: ['Prime & Ultra-Luxury Real Estate', 'Commodity Trading & Logistics', 'Wealth Advisory & Golden Visa', 'Luxury Hospitality'],
    clientQuote: 'AFWAN TECH built our luxury property portal. It is blindingly fast, visually breathtaking, and drives continuous GCC buyer inquiries.',
    clientPerson: 'Farhan A., Principal Broker, Dubai'
  }
};

export function getLocationIntelligence(location) {
  const slug = location.slug.toLowerCase();
  const name = location.name;
  const state = location.state || 'India';

  // Check direct hub match
  if (hubArchetypes[slug]) {
    return {
      ...hubArchetypes[slug],
      name,
      state
    };
  }

  // Generate deterministic dynamic profile based on state and tier
  const tier = location.tier || 'Tier 2';
  
  let archetype = `Key Commercial & Industrial Center in ${state}`;
  let primaryFocus = `Local Service Enterprises, Retail Growth, Regional Manufacturing & E-Commerce`;
  let sectors = [
    `Healthcare & Specialist Clinics in ${name}`,
    `Regional Manufacturing & Distribution`,
    `Retail & Consumer Goods in ${state}`,
    `Professional & Legal Services`
  ];
  let keyChallenge = `Businesses in ${name} frequently lose high-intent local customers to national competitors because of outdated, slow websites and zero local SEO rankings.`;
  let strategy = `Implementing localized Google Search and Map Pack optimization, sub-second Next.js web architecture, and targeted lead funnels specifically engineered to dominate ${name}.`;
  let clientQuote = `Switching to AFWAN TECH was our best business decision this year. We went from being invisible on Google in ${name} to receiving daily qualified quote requests.`;
  let clientPerson = `Local Business Director, ${name}`;

  if (state === 'Maharashtra') {
    archetype = `Fast-Growing Maharashtra Commercial District`;
    primaryFocus = `Agro-Processing, Supply Chain Logistics, Retail & Industrial SME`;
    sectors = [`Manufacturing & Engineering in ${name}`, `Agro-Trading & Logistics`, `Healthcare Portals`, `Consumer Services`];
  } else if (state === 'Gujarat') {
    archetype = `Vibrant Trade & Manufacturing Hub of Gujarat`;
    primaryFocus = `Chemicals, Textiles, Engineering, Diamond & Mercantile Trade`;
    sectors = [`Textiles & Apparel in ${name}`, `B2B Industrial Machinery`, `Export & Import Enterprises`, `Financial Services`];
  } else if (state === 'Karnataka') {
    archetype = `Strategic Karnataka Regional Growth Node`;
    primaryFocus = `Precision Engineering, Agro-Tech, Education & Tier-2 IT Services`;
    sectors = [`Higher Education & Academies in ${name}`, `Hardware & Electronics`, `Healthcare Facilities`, `Retail Chains`];
  } else if (state === 'Tamil Nadu') {
    archetype = `Tamil Nadu Manufacturing & Industrial Hub`;
    primaryFocus = `Automotive Components, Heavy Engineering, Spinning Mills & IT`;
    sectors = [`Automotive Suppliers in ${name}`, `Textile Machinery & Exports`, `Healthcare & Specialty Hospitals`, `Software Studios`];
  } else if (state === 'Uttar Pradesh' || state === 'Delhi NCR') {
    archetype = `Prominent Northern India Growth Corridor`;
    primaryFocus = `Corporate Operations, Consumer Goods, Real Estate & Educational Hubs`;
    sectors = [`Real Estate & Builders in ${name}`, `Consumer Retail Distribution`, `Hospitals & Diagnostic Centers`, `Private Universities`];
  } else if (state === 'Rajasthan') {
    archetype = `Dynamic Rajasthan Heritage & Commercial Center`;
    primaryFocus = `Tourism & Hospitality, Handicrafts, Mineral Processing & Modern Retail`;
    sectors = [`Hospitality & Heritage Resorts in ${name}`, `Artisanal Handicrafts & Export`, `Marble & Mineral Processing`, `Healthcare Centers`];
  }

  return {
    archetype,
    primaryFocus,
    keyChallenge,
    strategy,
    sectors,
    clientQuote,
    clientPerson,
    name,
    state
  };
}
