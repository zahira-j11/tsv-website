import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Free Social Media Audit — application endpoint.
 *
 * Two-step gate: this validates the application, decides whether the applicant
 * qualifies, and (when configured) notifies the team. The client only reveals
 * the booking calendar when `qualified` comes back true, so the rules live here
 * rather than in the browser where they could be bypassed.
 */

const Application = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(1).max(120),
  website: z.string().trim().min(3).max(200),
  platforms: z.array(z.string()).min(1),
  budget: z.enum(['none', 'under-1k', '1k-2.5k', '2.5k-5k', '5k-10k', '10k-plus']),
  teamSize: z.enum(['solo', '2-10', '11-50', '50-plus']),
  challenge: z.string().trim().min(10).max(1200),
});

export type AuditApplication = z.infer<typeof Application>;

/**
 * QUALIFYING RULE — edit this to change who gets offered a slot.
 *
 * Monthly social budget is the only gate: anything under £1,000/month is
 * declined, since retainers start at £2,500 + VAT and an audit would not lead
 * anywhere useful for either side. Team size is captured for context but does
 * not affect the decision.
 */
const BUDGET_QUALIFIES: AuditApplication['budget'][] = ['1k-2.5k', '2.5k-5k', '5k-10k', '10k-plus'];

function qualify(a: AuditApplication): boolean {
  return BUDGET_QUALIFIES.includes(a.budget);
}

async function notifyTeam(a: AuditApplication, qualified: boolean) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.AUDIT_NOTIFY_EMAIL;
  // Not configured yet — log so nothing is silently lost in the meantime.
  if (!key || !to) {
    console.log('[audit application]', { qualified, ...a });
    return;
  }
  const { Resend } = await import('resend');
  const resend = new Resend(key);
  await resend.emails.send({
    from: process.env.AUDIT_FROM_EMAIL ?? 'audit@thesocialvision.co.uk',
    to,
    subject: `${qualified ? 'Audit application' : 'Audit application (below threshold)'} — ${a.company}`,
    text: [
      `Qualified: ${qualified ? 'yes' : 'no'}`,
      `Name: ${a.name}`,
      `Email: ${a.email}`,
      `Company: ${a.company}`,
      `Website: ${a.website}`,
      `Platforms: ${a.platforms.join(', ')}`,
      `Monthly social budget: ${a.budget}`,
      `Team size: ${a.teamSize}`,
      '',
      'Biggest challenge:',
      a.challenge,
    ].join('\n'),
  });
}

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = Application.safeParse(await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const application = parsed.data;
  const qualified = qualify(application);

  // Every application is captured, qualified or not — the ones we decline are
  // still worth nurturing.
  try {
    await notifyTeam(application, qualified);
  } catch (err) {
    console.error('[POST /api/audit] notify failed', err);
  }

  return NextResponse.json({
    qualified,
    // Set AUDIT_CALENDAR_URL to the HubSpot meeting link for the audit (a
    // separate meeting type from the discovery call) and the calendar embeds
    // itself on the success step.
    calendarUrl: qualified ? (process.env.NEXT_PUBLIC_AUDIT_CALENDAR_URL ?? null) : null,
  });
}
