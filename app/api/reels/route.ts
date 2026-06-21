import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Reel from '@/models/Reel';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const showAll = req.nextUrl.searchParams.get('all') === '1';
    const filter = showAll ? {} : { active: true };
    const reels = await Reel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ reels });
  } catch (err) {
    console.error('[GET /api/reels]', err);
    return NextResponse.json({ error: 'Failed to fetch reels' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const reel = await Reel.create(body);
    return NextResponse.json({ reel }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/reels]', err);
    return NextResponse.json({ error: 'Failed to create reel' }, { status: 500 });
  }
}
