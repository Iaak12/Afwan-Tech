import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const TEAM_FILE = path.join(process.cwd(), 'src', 'data', 'teamData.json');
const BACKEND_TEAM_FILE = path.join(process.cwd(), '..', 'backend-php', 'data', 'teamData.json');

function getPhpApiUrl() {
  const url = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

const DEFAULT_TEAM = [
  {
    id: 'ayaz-khan',
    name: 'Ayaz Khan',
    role: 'Founder & CEO',
    category: 'leadership',
    bio: 'Visionary entrepreneur and digital architect leading AFWAN TECH with a singular mission — building high-performance web engineering and Page 1 organic SEO systems for ambitious businesses worldwide.',
    expertise: ['Executive Leadership', 'Growth Strategy', 'SEO Architecture', 'Business Scaling'],
    initials: 'AK',
    image: '',
    linkedin: '',
    location: 'Bengaluru, Karnataka, India',
    isCEO: true,
    order: 1
  },
  {
    id: 'aaliya-behal',
    name: 'Aaliya Behal',
    role: 'Co-Founder',
    category: 'leadership',
    bio: 'Co-founder steering operational velocity, strategic client partnerships, and cross-functional brand expansion across India, Middle East, and global markets.',
    expertise: ['Operations Strategy', 'Client Partnerships', 'Brand Scaling', 'Organizational Growth'],
    initials: 'AB',
    image: '',
    linkedin: '',
    location: 'Bengaluru, Karnataka, India',
    isCEO: false,
    order: 2
  },
  {
    id: 'shahbaz-ahmad',
    name: 'Shahbaz Ahmad',
    role: 'Lead Software Engineer & Platform Architect',
    category: 'leadership',
    bio: 'Lead software engineer and platform architect specializing in React 19, Next.js App Router, scalable cloud architectures, and high-performance web systems with sub-second response times.',
    expertise: ['React / Next.js', 'Full Stack Architecture', 'Node.js & PHP APIs', 'Performance & Caching'],
    initials: 'SA',
    image: '',
    linkedin: 'https://www.linkedin.com/in/shahbaz-ahmad-react/',
    location: 'Bengaluru, Karnataka, India',
    isCEO: false,
    order: 3
  }
];

function getStoredTeam() {
  try {
    if (fs.existsSync(TEAM_FILE)) {
      const raw = fs.readFileSync(TEAM_FILE, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading teamData.json:', err);
  }
  return DEFAULT_TEAM;
}

function persistTeam(teamList) {
  try {
    const raw = JSON.stringify(teamList, null, 2);
    const dir = path.dirname(TEAM_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(TEAM_FILE, raw, 'utf8');

    // Also persist in backend-php data folder
    try {
      const bDir = path.dirname(BACKEND_TEAM_FILE);
      if (fs.existsSync(path.dirname(bDir))) {
        if (!fs.existsSync(bDir)) fs.mkdirSync(bDir, { recursive: true });
        fs.writeFileSync(BACKEND_TEAM_FILE, raw, 'utf8');
      }
    } catch (e) {
      // ignore
    }
    return true;
  } catch (err) {
    console.error('Failed to save teamData.json:', err);
    return false;
  }
}

// GET: Fetch team list (from PHP MySQL API first, then local backup)
export async function GET(req) {
  const phpApi = getPhpApiUrl();
  if (phpApi) {
    try {
      const res = await fetch(`${phpApi}/team.php`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.team)) {
          persistTeam(json.team);
          return NextResponse.json(json);
        }
      }
    } catch (e) {
      // fallback to local store below
    }
  }

  const team = getStoredTeam();
  return NextResponse.json({ success: true, team });
}

// POST: Add, Update, or Reorder team members (syncs to MySQL via PHP API & local store)
export async function POST(req) {
  try {
    const body = await req.json();
    const phpApi = getPhpApiUrl();

    // 1. If PHP API is configured, forward to MySQL database
    if (phpApi) {
      try {
        const res = await fetch(`${phpApi}/team.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          cache: 'no-store'
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.team)) {
            persistTeam(json.team);
            return NextResponse.json(json);
          }
        }
      } catch (e) {
        // fallback to local store
      }
    }

    // 2. Direct local handling
    if (Array.isArray(body.team)) {
      persistTeam(body.team);
      return NextResponse.json({ success: true, team: body.team });
    }

    const member = body.member;
    if (!member || !member.name || !member.role) {
      return NextResponse.json({ success: false, error: 'Name and Role are required' }, { status: 400 });
    }

    const currentTeam = getStoredTeam();
    const id = member.id || member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existingIndex = currentTeam.findIndex(m => m.id === id);
    const updatedMember = {
      ...member,
      id,
      location: member.location || 'Bengaluru, Karnataka, India',
      initials: member.initials || member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      expertise: Array.isArray(member.expertise) 
        ? member.expertise 
        : (typeof member.expertise === 'string' ? member.expertise.split(',').map(s => s.trim()).filter(Boolean) : []),
      order: member.order || (existingIndex >= 0 ? currentTeam[existingIndex].order : currentTeam.length + 1)
    };

    if (existingIndex >= 0) {
      currentTeam[existingIndex] = updatedMember;
    } else {
      currentTeam.push(updatedMember);
    }

    persistTeam(currentTeam);
    return NextResponse.json({ success: true, member: updatedMember, team: currentTeam });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Remove member (syncs to MySQL via PHP API & local store)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }

    const phpApi = getPhpApiUrl();
    if (phpApi) {
      try {
        const res = await fetch(`${phpApi}/team.php?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
          cache: 'no-store'
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.team)) {
            persistTeam(json.team);
            return NextResponse.json(json);
          }
        }
      } catch (e) {
        // fallback
      }
    }

    const currentTeam = getStoredTeam();
    const filtered = currentTeam.filter(m => m.id !== id);

    persistTeam(filtered);
    return NextResponse.json({ success: true, team: filtered });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
