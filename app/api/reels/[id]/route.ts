import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Reel from '@/models/Reel';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const reel = await Reel.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!reel) return NextResponse.json({ error: 'Reel not found' }, { status: 404 });
    return NextResponse.json({ reel });
  } catch (err) {
    console.error('[PATCH /api/reels/:id]', err);
    return NextResponse.json({ error: 'Failed to update reel' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Reel.findByIdAndDelete(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /api/reels/:id]', err);
    return NextResponse.json({ error: 'Failed to delete reel' }, { status: 500 });
  }
}
