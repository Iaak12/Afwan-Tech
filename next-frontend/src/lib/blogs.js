import blogsData from '@/data/blogsData.json';

/**
 * Get all blogs with dynamic weekly scheduling evaluation
 * Today is Week 1 (Oct 26, 2026). Each subsequent blog is released automatically per week.
 */
export function getAllBlogs() {
  const now = new Date();

  return blogsData.map(blog => {
    const scheduledTime = new Date(blog.scheduledDate + 'T00:00:00Z').getTime();
    const isPastOrToday = now.getTime() >= scheduledTime;
    const isLive = blog.isPublished || isPastOrToday;

    return {
      ...blog,
      status: isLive ? 'published' : 'scheduled',
      isLive
    };
  });
}

export function getPublishedBlogs() {
  return getAllBlogs().filter(b => b.isLive);
}

export function getScheduledBlogs() {
  return getAllBlogs().filter(b => !b.isLive);
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find(b => b.slug.toLowerCase() === slug.toLowerCase()) || null;
}
