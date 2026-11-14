import blogsData from '@/data/blogsData.json';

const categoryImages = {
  'Artificial Intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'E-Commerce': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800',
  'Engineering & Architecture': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'SEO & Search': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
};

const blogSpecificImages = {
  'ai-for-web-development': '/blog-images/ai-for-web-development.png',
  'ai-tools-for-web-development': '/blog-images/ai-tools-for-web-development.png',
  'ecommerce-app-builder': '/blog-images/ecommerce-app-builder.png',
  'ecommerce-app-maker': '/blog-images/ecommerce-app-maker.png',
  'ecommerce-website-builder': '/blog-images/ecommerce-website-builder.png',
  'enterprise-app': '/blog-images/enterprise-app.png',
  'flask-vs-django': '/blog-images/flask-vs-django.png',
  'headless-ecommerce': '/blog-images/headless-ecommerce.png',
  'magento-vs-shopify': '/blog-images/magento-vs-shopify.png',
  'python-web-development-framework': '/blog-images/python-web-development-framework.png',
  'search-engine-optimization-startup': '/blog-images/search-engine-optimization-startup.png',
  'seo-search-engine-marketing': '/blog-images/seo-search-engine-marketing.png',
  'shopify-vs-wordpress': '/blog-images/shopify-vs-wordpress.png',
};

/**
 * Get all blogs with dynamic weekly scheduling evaluation and cover images
 */
export function getAllBlogs() {
  const now = new Date();

  return blogsData.map(blog => {
    const scheduledTime = new Date(blog.scheduledDate + 'T00:00:00Z').getTime();
    const isPastOrToday = now.getTime() >= scheduledTime;
    const isLive = blog.isPublished || isPastOrToday;
    const coverImage = blog.coverImage || blogSpecificImages[blog.slug] || categoryImages[blog.category] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';

    return {
      ...blog,
      coverImage,
      status: isLive ? 'published' : 'scheduled',
      isLive
    };
  });
}

export function getPublishedBlogs() {
  const all = getAllBlogs();
  return all.filter(b => b.isLive);
}

export function getScheduledBlogs() {
  return getAllBlogs().filter(b => !b.isLive);
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find(b => b.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Get recommended blogs strictly from published blogs, excluding current blog
 */
export function getRecommendedBlogs(currentSlug, limit = 4) {
  const published = getPublishedBlogs();
  const current = published.find(b => b.slug.toLowerCase() === (currentSlug || '').toLowerCase());
  const others = published.filter(b => b.slug.toLowerCase() !== (currentSlug || '').toLowerCase());

  // Prioritize same category first among published
  const sameCategory = current ? others.filter(b => b.category === current.category) : [];
  const differentCategory = current ? others.filter(b => b.category !== current.category) : others;

  const combined = [...sameCategory, ...differentCategory];
  return combined.slice(0, limit);
}

