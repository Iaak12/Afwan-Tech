import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPhpApiUrl } from '@/lib/apiConfig';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}

function findContactsFiles() {
  const possiblePaths = [
    path.join(process.cwd(), '..', 'backend-php', 'data', 'contacts.json'),
    path.join(process.cwd(), 'backend-php', 'data', 'contacts.json'),
    path.join(process.cwd(), 'data', 'contacts.json')
  ];
  return possiblePaths;
}

function getContacts() {
  const paths = findContactsFiles();
  for (const p of paths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, 'utf8');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) return { list, targetPath: p };
      } catch (e) {
        // ignore
      }
    }
  }
  return { list: [], targetPath: paths[0] };
}

function saveContacts(contacts, targetPath) {
  try {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify(contacts, null, 2), 'utf8');

    // Also mirror to other directories
    const paths = findContactsFiles();
    for (const p of paths) {
      if (p !== targetPath) {
        try {
          const d = path.dirname(p);
          if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
          fs.writeFileSync(p, JSON.stringify(contacts, null, 2), 'utf8');
        } catch (e) {
          // ignore
        }
      }
    }
  } catch (err) {
    console.error('Failed to save contacts', err);
  }
}

export async function GET() {
  const phpApi = getPhpApiUrl();

  // 1. Primary: Fetch live submissions from Hostinger MySQL
  if (phpApi) {
    try {
      const res = await fetch(`${phpApi}/contact.php`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return NextResponse.json(
            { success: true, data: json.data, source: 'mysql' },
            { headers: corsHeaders }
          );
        }
      }
    } catch (e) {
      console.warn('MySQL contacts fetch error, attempting fallback:', e.message);
    }
  }

  // 2. Fallback: Local JSON storage
  try {
    const { list } = getContacts();
    return NextResponse.json(
      { success: true, data: list, source: 'local' },
      { headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get('id');
    const queryIds = searchParams.getAll('ids[]');

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      // ignore
    }

    const rawIds = body.ids || (body.id ? [body.id] : (queryIds.length > 0 ? queryIds : (queryId ? [queryId] : [])));
    const idsToDelete = (Array.isArray(rawIds) ? rawIds : [rawIds])
      .map(id => String(id).trim())
      .filter(Boolean);

    if (!idsToDelete || idsToDelete.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No submission ID provided to delete' },
        { status: 400, headers: corsHeaders }
      );
    }

    const phpApi = getPhpApiUrl();

    // 1. Delete from Hostinger MySQL directly
    if (phpApi) {
      try {
        const queryParams = idsToDelete.map(id => `ids[]=${encodeURIComponent(id)}`).join('&') + `&id=${encodeURIComponent(idsToDelete[0])}`;

        // Call Hostinger DELETE with query params AND body
        await fetch(`${phpApi}/contact.php?${queryParams}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ ids: idsToDelete })
        });

        // Also call POST with action=delete for fallback
        await fetch(`${phpApi}/contact.php?action=delete&${queryParams}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ action: 'delete', ids: idsToDelete })
        }).catch(() => {});
      } catch (e) {
        console.warn('MySQL delete error:', e.message);
      }
    }

    // 2. Also remove from local files
    const { list, targetPath } = getContacts();
    const idSet = new Set(idsToDelete);
    const updated = list.filter(lead => !idSet.has(String(lead.id)));
    saveContacts(updated, targetPath);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully deleted submission(s).`,
        deletedCount: idsToDelete.length
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const phpApi = getPhpApiUrl();

    // 1. Update in Hostinger MySQL
    if (phpApi) {
      try {
        await fetch(`${phpApi}/contact.php`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ id, status, notes })
        });
      } catch (e) {
        console.warn('MySQL update error:', e.message);
      }
    }

    // 2. Also update local storage
    const { list, targetPath } = getContacts();
    const idx = list.findIndex(lead => lead.id === id);

    if (idx !== -1) {
      if (status) list[idx].status = status;
      if (notes !== undefined) list[idx].notes = notes;
      list[idx].updated_at = new Date().toISOString();
      saveContacts(list, targetPath);
    }

    return NextResponse.json(
      { success: true, message: 'Submission status updated successfully!' },
      { headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
