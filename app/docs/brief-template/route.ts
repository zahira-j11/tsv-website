import { BRIEF_TEMPLATE } from '@/lib/docs/template';

export function GET() {
  return new Response(`${BRIEF_TEMPLATE}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="tsv-ugc-brief-template.txt"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
