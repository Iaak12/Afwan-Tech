import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { locationsData } from '@/data/locationsData';

const CUSTOM_LOCATIONS_FILE = path.join(process.cwd(), 'src', 'data', 'customLocations.json');
const BACKEND_CUSTOM_FILE = path.join(process.cwd(), '..', 'backend-php', 'data', 'customLocations.json');

function getPhpApiUrl() {
  const url = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

function getCustomConfig() {
  try {
    if (fs.existsSync(CUSTOM_LOCATIONS_FILE)) {
      const raw = fs.readFileSync(CUSTOM_LOCATIONS_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
  return { added: [], deletedSlugs: [], updated: {} };
}

function saveCustomConfig(config) {
  try {
    const raw = JSON.stringify(config, null, 2);
    fs.writeFileSync(CUSTOM_LOCATIONS_FILE, raw, 'utf8');

    // Also persist in backend-php data folder if present
    try {
      const dir = path.dirname(BACKEND_CUSTOM_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(BACKEND_CUSTOM_FILE, raw, 'utf8');
    } catch (e) {
      // ignore
    }
  } catch (err) {
    console.error('Failed to save customLocations.json', err);
  }
}

function getEffectiveLocations(config) {
  const deleted = new Set(config.deletedSlugs || []);
  let list = locationsData.filter(loc => !deleted.has(loc.slug));

  if (config.updated && Object.keys(config.updated).length > 0) {
    list = list.map(loc => config.updated[loc.slug] ? { ...loc, ...config.updated[loc.slug] } : loc);
  }

  if (config.added && config.added.length > 0) {
    const validAdded = config.added.filter(loc => !deleted.has(loc.slug));
    list = [...validAdded, ...list];
  }

  return list;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phpApi = getPhpApiUrl();

    // 1. Try fetching live locations directly from MySQL via PHP API
    if (phpApi) {
      try {
        const target = `${phpApi}/locations.php?${searchParams.toString()}`;
        const res = await fetch(target, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            return NextResponse.json(json);
          }
        }
      } catch (e) {
        // fallback to local below
      }
    }

    // 2. Fallback to local store
    const query = (searchParams.get('q') || '').toLowerCase().trim();
    const stateFilter = searchParams.get('state') || '';
    const typeFilter = searchParams.get('type') || '';

    const config = getCustomConfig();
    const effective = getEffectiveLocations(config);

    let filtered = effective;

    if (query) {
      filtered = filtered.filter(l => 
        l.name.toLowerCase().includes(query) ||
        l.slug.toLowerCase().includes(query) ||
        (l.state && l.state.toLowerCase().includes(query))
      );
    }

    if (stateFilter) {
      filtered = filtered.filter(l => l.state === stateFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(l => l.type === typeFilter);
    }

    const uniqueStates = [...new Set(effective.map(l => l.state).filter(Boolean))].sort();

    return NextResponse.json({
      success: true,
      data: {
        locations: filtered,
        stats: {
          total: effective.length,
          cities: effective.filter(l => l.type === 'city').length,
          states: effective.filter(l => l.type === 'state').length,
          customAdded: (config.added || []).length,
          deletedCount: (config.deletedSlugs || []).length
        },
        states: uniqueStates,
        deletedSlugs: config.deletedSlugs || []
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, state, country, type } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: 'City name is required' }, { status: 400 });
    }

    const cityName = name.trim();
    let slug = (body.slug || cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

    const phpApi = getPhpApiUrl();

    // 1. Try inserting directly into MySQL via PHP
    if (phpApi) {
      try {
        const target = `${phpApi}/locations.php`;
        const res = await fetch(target, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...body, slug, name: cityName })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            // Also mirror locally
            const config = getCustomConfig();
            config.added = config.added || [];
            config.added.unshift({ ...body, slug, name: cityName, isCustom: true });
            saveCustomConfig(config);
            return NextResponse.json(json);
          }
        }
      } catch (e) {
        // fallback to local
      }
    }

    // 2. Local fallback
    const config = getCustomConfig();
    const effective = getEffectiveLocations(config);
    if (effective.some(l => l.slug === slug)) {
      return NextResponse.json({ success: false, message: `Location slug "${slug}" already exists!` }, { status: 400 });
    }

    const newLocation = {
      slug,
      name: cityName,
      type: type || 'city',
      state: state || 'Pan-India',
      country: country || 'India',
      title: body.title || `Best Web Development & SEO Agency in ${cityName}, ${state || 'India'} | Afwan Tech`,
      metaDescription: body.metaDescription || `Accelerate your revenue with award-winning Web Development, SEO, App Development, and PPC Services across ${cityName}. Partner with top-rated tech experts.`,
      h1: body.h1 || `Web Development & Digital Growth Agency in ${cityName}`,
      avgGrowth: body.avgGrowth || '280% Organic Growth',
      businessesScaled: body.businessesScaled || '50+',
      rating: '4.9/5',
      reviewsCount: Math.floor(Math.random() * 80) + 120,
      isCustom: true,
      created_at: new Date().toISOString()
    };

    config.deletedSlugs = (config.deletedSlugs || []).filter(s => s !== slug);
    config.added = config.added || [];
    config.added.unshift(newLocation);

    saveCustomConfig(config);

    return NextResponse.json({
      success: true,
      message: `City "${cityName}" (${slug}) successfully added!`,
      location: newLocation
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    let slug = searchParams.get('slug');

    if (!slug) {
      const body = await request.json().catch(() => ({}));
      slug = body.slug;
    }

    if (!slug) {
      return NextResponse.json({ success: false, message: 'Slug is required to delete location' }, { status: 400 });
    }

    const phpApi = getPhpApiUrl();

    // 1. Delete from MySQL via PHP
    if (phpApi) {
      try {
        const target = `${phpApi}/locations.php?slug=${encodeURIComponent(slug)}`;
        await fetch(target, { method: 'DELETE' });
      } catch (e) {
        // fallback
      }
    }

    // 2. Delete locally
    const config = getCustomConfig();
    config.deletedSlugs = config.deletedSlugs || [];
    if (!config.deletedSlugs.includes(slug)) {
      config.deletedSlugs.push(slug);
    }
    if (config.added) {
      config.added = config.added.filter(l => l.slug !== slug);
    }
    saveCustomConfig(config);

    return NextResponse.json({
      success: true,
      message: `Location "${slug}" deleted successfully!`
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { slug, action } = body;

    if (!slug) {
      return NextResponse.json({ success: false, message: 'Slug is required' }, { status: 400 });
    }

    const phpApi = getPhpApiUrl();
    if (phpApi) {
      try {
        const target = `${phpApi}/locations.php`;
        await fetch(target, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } catch (e) {}
    }

    const config = getCustomConfig();
    if (action === 'restore') {
      config.deletedSlugs = (config.deletedSlugs || []).filter(s => s !== slug);
      saveCustomConfig(config);
      return NextResponse.json({
        success: true,
        message: `Location "${slug}" has been restored!`
      });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
