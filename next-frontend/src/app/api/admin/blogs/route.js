import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import blogsInitialData from '@/data/blogsData.json';

const blogsFilePath = path.join(process.cwd(), 'src/data/blogsData.json');

export async function GET() {
  try {
    let blogs = blogsInitialData;
    if (fs.existsSync(blogsFilePath)) {
      const raw = fs.readFileSync(blogsFilePath, 'utf8');
      blogs = JSON.parse(raw);
    }
    const now = new Date();
    const evaluated = blogs.map(b => {
      const scheduledTime = new Date(b.scheduledDate + 'T00:00:00Z').getTime();
      const isPastOrToday = now.getTime() >= scheduledTime;
      const isLive = b.isPublished || isPastOrToday;
      return {
        ...b,
        isLive,
        status: isLive ? 'published' : 'scheduled'
      };
    });
    return NextResponse.json({ success: true, blogs: evaluated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { blogId, isPublished } = body;

    let blogs = blogsInitialData;
    if (fs.existsSync(blogsFilePath)) {
      const raw = fs.readFileSync(blogsFilePath, 'utf8');
      blogs = JSON.parse(raw);
    }

    let updated = false;
    blogs = blogs.map(b => {
      if (b.id === blogId || b.slug === blogId) {
        updated = true;
        const newStatus = typeof isPublished === 'boolean' ? isPublished : !b.isPublished;
        return {
          ...b,
          isPublished: newStatus
        };
      }
      return b;
    });

    if (updated) {
      fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), 'utf8');
    }

    const now = new Date();
    const evaluated = blogs.map(b => {
      const scheduledTime = new Date(b.scheduledDate + 'T00:00:00Z').getTime();
      const isPastOrToday = now.getTime() >= scheduledTime;
      const isLive = b.isPublished || isPastOrToday;
      return {
        ...b,
        isLive,
        status: isLive ? 'published' : 'scheduled'
      };
    });

    return NextResponse.json({ success: true, blogs: evaluated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
