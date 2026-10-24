import { NextRequest, NextResponse } from 'next/server';

/** The brief file is not an open download. Until it is gated, this URL
 *  sends people to the briefing page, where they can ask for the template. */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/docs/briefing-ugc-creators', request.url), 308);
}
