import servicesContent from '@/data/servicesContent.json';

/**
 * Generates dynamically localized content and FAQs for a given service and location
 * strictly preserving existing structure while enhancing regional relevance and search intent.
 */
export function getLocalizedServiceData(serviceSlug, location) {
  const baseData = servicesContent[serviceSlug];
  if (!baseData) return null;
  if (!location) return baseData;

  const cityName = location.name || 'Your City';
  const stateName = location.state || 'India';
  const fullLocName = `${cityName}, ${stateName}`;

  // 1. Localized Titles & Headlines
  const localizedH1 = `${baseData.h1} in ${cityName}`;
  const localizedTagline = `Top-rated ${baseData.title.toLowerCase()} engineered for growing enterprises and ambitious businesses in ${cityName}, ${stateName}. Full source code ownership, sub-second speed, and guaranteed ROI.`;
  const localizedHeroSubtitle = `Leading ${baseData.title.toLowerCase()} company in ${cityName}. Fast, high-converting Next.js architecture, Core Web Vitals optimization, and dedicated client support across ${stateName}.`;

  // 2. Localized Meta Data
  const localizedMetaTitle = `Top ${baseData.title} in ${cityName}, ${stateName} | AFWAN TECH`;
  const localizedMetaDescription = `Looking for ${baseData.title.toLowerCase()} in ${cityName}? AFWAN TECH builds custom Next.js websites, high-speed apps and ROI-driven SEO for businesses across ${cityName}, ${stateName}. Request a free proposal.`;

  // 3. Localized Keywords
  const localizedKeywords = [
    `${baseData.title.toLowerCase()} in ${cityName}`,
    `best ${baseData.title.toLowerCase()} ${cityName}`,
    `${cityName} ${baseData.title.toLowerCase()} company`,
    `${baseData.title.toLowerCase()} agency ${stateName}`,
    `${baseData.title.toLowerCase()} services ${cityName}`,
    `web development in ${cityName}`,
    `software company in ${cityName}`,
    `afwan tech ${cityName}`
  ];

  // 4. Adapt main_content blocks for the location
  const localizedMainContent = (baseData.main_content || []).map((block) => {
    if (block.type === 'p' && typeof block.text === 'string') {
      let t = block.text;
      // Tailor company references for the target city
      t = t.replace(
        /Afwan Tech is a web development company in Whitefield, Bengaluru that builds business websites/gi,
        `Afwan Tech is a premier digital engineering and ${baseData.title.toLowerCase()} agency delivering high-performance solutions for businesses in ${cityName}, ${stateName}. We build business websites`
      );
      t = t.replace(/in Whitefield, Bengaluru/gi, `for businesses across ${cityName}`);
      t = t.replace(/one team in Bengaluru/gi, `our specialized engineering team serving ${cityName}`);
      t = t.replace(/clients across India and abroad remotely/gi, `clients in ${cityName}, ${stateName}, and worldwide`);
      return { ...block, text: t };
    }

    if (block.type === 'ul' && Array.isArray(block.items)) {
      const updatedItems = block.items.map((item) => {
        if (typeof item === 'string' && (item.includes('Bengaluru') || item.includes('office'))) {
          return `Dedicated digital engineering & SEO team serving ${cityName} businesses with agile communication, weekly staging reviews, and full source code ownership`;
        }
        return item;
      });
      return { ...block, items: updatedItems };
    }

    if (block.type === 'cta') {
      return {
        ...block,
        title: `Ready to discuss your ${baseData.title} in ${cityName}?`
      };
    }

    return block;
  });

  // 5. Localized FAQs: High-intent location FAQs on top + localized base FAQs
  const citySpecificFaqs = [
    {
      question: `Why choose AFWAN TECH for ${baseData.title} in ${cityName}?`,
      answer: `AFWAN TECH brings senior full-stack developers and SEO architects directly to your project without bloated agency overhead. We build modern, high-speed Next.js systems engineered specifically to help your ${cityName} business capture market share, rank at the top of Google, and turn visitors into qualified inquiries.`
    },
    {
      question: `How do your ${baseData.title} help our ${cityName} business outrank local competitors?`,
      answer: `We implement localized Schema.org entity graphs for ${cityName}, ensure 100/100 Core Web Vitals speed scores, and structure high-intent regional keywords so your business in ${cityName}, ${stateName} dominates both organic search results and Google Map Packs.`
    },
    {
      question: `What is the estimated delivery timeline for ${baseData.title} in ${cityName}?`,
      answer: `Standard ${baseData.title.toLowerCase()} projects are delivered within 2 to 4 weeks. We work in transparent 1-week agile sprints with real-time staging previews, direct WhatsApp updates, and video walkthroughs for your ${cityName} team.`
    },
    {
      question: `How do we communicate and review progress from ${cityName}?`,
      answer: `We maintain 100% transparent communication via WhatsApp, Google Meet, and direct developer access. You receive weekly milestone reviews, staging environments to test changes, and full code ownership from day one.`
    }
  ];

  // Localize base FAQs
  const adaptedBaseFaqs = (baseData.faqs || []).map((faq) => {
    let q = faq.question || '';
    let a = faq.answer || '';
    if (q.includes('in India')) {
      q = q.replace(/in India/gi, `in ${cityName}`);
    }
    if (a.includes('Bengaluru')) {
      a = a.replace(/in Whitefield, Bengaluru/gi, `serving clients across ${cityName} and ${stateName}`);
      a = a.replace(/Bengaluru/gi, `${cityName}`);
    }
    return { question: q, answer: a };
  });

  const combinedFaqs = [...citySpecificFaqs, ...adaptedBaseFaqs];

  return {
    ...baseData,
    h1: localizedH1,
    tagline: localizedTagline,
    heroSubtitle: localizedHeroSubtitle,
    metaTitle: localizedMetaTitle,
    metaDescription: localizedMetaDescription,
    keywords: localizedKeywords,
    main_content: localizedMainContent,
    faqs: combinedFaqs,
    location
  };
}
