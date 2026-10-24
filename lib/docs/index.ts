import { BRIEF_TEMPLATE } from './template';
import { CREATORS } from './content/creators';
import { FAQ } from './content/faq';
import { FORMATS } from './content/formats';
import { GET_STARTED } from './content/get-started';
import { GUIDES } from './content/guides';
import { HOW_WE_WORK } from './content/how-we-work';
import { REFERENCE } from './content/reference';
import type { Block, DocPage, DocSection, Faq, SectionId } from './types';

export const SECTIONS: DocSection[] = [
  { id: 'start', label: 'Get started' },
  { id: 'how', label: 'How we work' },
  { id: 'guides', label: 'Guides' },
  { id: 'formats', label: 'Formats' },
  { id: 'creators', label: 'Creators and rights' },
  { id: 'reference', label: 'Reference' },
  { id: 'faq', label: 'FAQ' },
];

export const DOCS: DocPage[] = [
  ...GET_STARTED,
  ...HOW_WE_WORK,
  ...GUIDES,
  ...FORMATS,
  ...CREATORS,
  ...REFERENCE,
  ...FAQ,
];

const slugs = new Set<string>();
for (const doc of DOCS) {
  if (slugs.has(doc.slug)) throw new Error(`Duplicate doc slug: ${doc.slug}`);
  slugs.add(doc.slug);
  const ids = new Set<string>();
  for (const block of doc.blocks) {
    if (block.type !== 'h2' && block.type !== 'h3') continue;
    if (ids.has(block.id)) throw new Error(`Duplicate heading ${doc.slug}#${block.id}`);
    ids.add(block.id);
  }
}

export function docPath(doc: DocPage): string {
  return doc.slug ? `/docs/${doc.slug}` : '/docs';
}

export function getDoc(slug: string): DocPage | undefined {
  return DOCS.find(d => d.slug === slug);
}

export function sectionOf(id: SectionId): DocSection {
  return SECTIONS.find(s => s.id === id)!;
}

export function docsInSection(id: SectionId): DocPage[] {
  return DOCS.filter(d => d.section === id);
}

export function neighbours(doc: DocPage): { prev?: DocPage; next?: DocPage } {
  const i = DOCS.indexOf(doc);
  return { prev: DOCS[i - 1], next: DOCS[i + 1] };
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 72);
}

export function headings(doc: DocPage): { id: string; text: string; level: 2 | 3 }[] {
  return doc.blocks.flatMap(block => {
    if (block.type === 'h2' || block.type === 'h3') {
      return [{ id: block.id, text: block.text, level: block.type === 'h2' ? 2 as const : 3 as const }];
    }
    if (block.type === 'faq') {
      return block.items.map(item => ({ id: slugify(item.q), text: item.q, level: 3 as const }));
    }
    return [];
  });
}

export function faqsOf(doc: DocPage): Faq[] {
  return doc.blocks.flatMap(block => (block.type === 'faq' ? block.items : []));
}

export function howToSteps(doc: DocPage): { title: string; text: string }[] {
  const steps = doc.blocks.find((block): block is Extract<Block, { type: 'steps' }> => block.type === 'steps');
  return steps?.items ?? [];
}

export type CheckItem = { path: string; text: string };

export function allChecks(): CheckItem[] {
  const items: CheckItem[] = [];
  for (const doc of DOCS) {
    for (const block of doc.blocks) {
      if (block.type === 'check') items.push({ path: docPath(doc), text: block.text });
    }
  }
  for (const line of BRIEF_TEMPLATE.split('\n')) {
    const text = line.trim();
    if (text.startsWith('[CHECK]')) items.push({ path: '/docs/briefing-ugc-creators', text });
  }
  return items;
}
