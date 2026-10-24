/**
 * Public docs content model. Pages are data so titles, schema and prev/next
 * stay in one place.
 */

export type SectionId = 'start' | 'how' | 'guides' | 'formats' | 'creators' | 'reference' | 'faq';

export type Faq = { q: string; a: string };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; headers: [string, string]; rows: [string, string][] }
  | { type: 'check'; text: string }
  | { type: 'note'; text: string }
  | { type: 'faq'; items: Faq[] }
  | { type: 'directory' };

export type DocPage = {
  /** Path under /docs. Empty string is the hub. */
  slug: string;
  section: SectionId;
  /** Short label in the sidebar and the pager. */
  navLabel: string;
  /** Visible H1. Also the question the page answers. */
  title: string;
  seoTitle: string;
  description: string;
  /** Article, plus HowTo when the page has a steps block. FAQPage when it has a faq block. */
  schema: 'Article' | 'HowTo';
  related: { href: string; label: string };
  blocks: Block[];
};

export type DocSection = { id: SectionId; label: string };
