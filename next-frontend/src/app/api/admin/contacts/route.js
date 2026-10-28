import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
  try {
    const { list } = getContacts();
    return NextResponse.json({
      success: true,
      data: list
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get('id');

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      // ignore
    }

    const { list, targetPath } = getContacts();

    if (body.action === 'clear_all') {
      saveContacts([], targetPath);
      return NextResponse.json({ success: true, message: 'All contact submissions have been cleared.' });
    }

    const idsToDelete = new Set(
      body.ids || (body.id ? [body.id] : (queryId ? [queryId] : []))
    );

    if (idsToDelete.size === 0) {
      return NextResponse.json({ success: false, message: 'No submission ID provided to delete' }, { status: 400 });
    }

    const updated = list.filter(lead => !idsToDelete.has(lead.id));
    const deletedCount = list.length - updated.length;

    saveContacts(updated, targetPath);

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedCount} submission(s).`,
      deletedCount
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Submission ID is required' }, { status: 400 });
    }

    const { list, targetPath } = getContacts();
    const idx = list.findIndex(lead => lead.id === id);

    if (idx === -1) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    if (status) {
      list[idx].status = status;
    }

    if (notes !== undefined) {
      list[idx].notes = notes;
    }

    list[idx].updated_at = new Date().toISOString();

    saveContacts(list, targetPath);

    return NextResponse.json({
      success: true,
      message: 'Submission status updated successfully!',
      lead: list[idx]
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

