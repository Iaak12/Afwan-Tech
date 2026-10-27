import blogsData from '@/data/blogsData.json';

const categoryImages = {
  'Artificial Intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'E-Commerce': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800',
  'Engineering & Architecture': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'SEO & Search': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
};

const blogSpecificImages = {
  'ai-for-web-development': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  'ai-tools-for-web-development': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'ecommerce-app-builder': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800',
  'ecommerce-app-maker': 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
  'ecommerce-website-builder': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'enterprise-app': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  'flask-vs-django': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
  'headless-ecommerce': 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
  'magento-vs-shopify': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
  'python-web-development-framework': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
  'search-engine-optimization-startup': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
  'seo-search-engine-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'shopify-vs-wordpress': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
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
  const live = all.filter(b => b.isLive);
  // Ensure we at least show published blogs or fallback gracefully
  return live.length > 0 ? live : all;
}

export function getScheduledBlogs() {
  return getAllBlogs().filter(b => !b.isLive);
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find(b => b.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Get recommended blogs excluding current blog, with category relevance priority
 */
export function getRecommendedBlogs(currentSlug, limit = 4) {
  const all = getAllBlogs();
  const current = all.find(b => b.slug.toLowerCase() === (currentSlug || '').toLowerCase());
  const others = all.filter(b => b.slug.toLowerCase() !== (currentSlug || '').toLowerCase());

  // Prioritize same category first
  const sameCategory = current ? others.filter(b => b.category === current.category) : [];
  const differentCategory = current ? others.filter(b => b.category !== current.category) : others;

  const combined = [...sameCategory, ...differentCategory];
  return combined.slice(0, limit);
}

