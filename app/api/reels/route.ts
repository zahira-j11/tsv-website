import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Reel from '@/models/Reel';
import { isAdmin } from '@/lib/adminSession';
import { pickWritable } from '@/lib/reelFields';

/**
 * Reels power the homepage "Hall of fame" and service videos, so anything
 * that changes them is admin-only. Reading the active reels stays public
 * because the homepage fetches them.
 */

export async function GET(req: NextRequest) {
  const showAll = req.nextUrl.searchParams.get('all') === '1';
  if (showAll && !isAdmin(req)) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }
  try {
    await connectDB();
    const filter = showAll ? {} : { active: true };
    const reels = await Reel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ reels });
  } catch (err) {
    console.error('[GET /api/reels]', err);
    return NextResponse.json({ error: 'Failed to fetch reels' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }
  try {
    await connectDB();
    const reel = await Reel.create(pickWritable(await req.json()));
    return NextResponse.json({ reel }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/reels]', err);
    return NextResponse.json({ error: 'Failed to create reel' }, { status: 500 });
  }
}
