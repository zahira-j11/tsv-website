'use client';
import { track } from '@/lib/analytics';

/** A link that records a cta_click before it navigates. For server pages. */
export default function TrackedLink({ location, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { location: string }) {
  return <a {...props} onClick={() => track('cta_click', { location })} />;
}
