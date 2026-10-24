import SiteNav from '@/app/SiteNav';
import TrackedLink from '@/app/case-studies/TrackedLink';
import { BOOK_CALL_HREF } from '@/lib/caseStudies';
import { SITE_URL } from '@/lib/blog';
import {
  SECTIONS,
  docPath,
  docsInSection,
  faqsOf,
  headings,
  howToSteps,
  neighbours,
  sectionOf,
  slugify,
} from '@/lib/docs';
import type { Block, DocPage } from '@/lib/docs/types';
import { BRIEF_TEMPLATE } from '@/lib/docs/template';
import { RichText } from './RichText';

function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').replace(/`/g, '');
}

function JsonLd({ doc }: { doc: DocPage }) {
  const url = `${SITE_URL}${docPath(doc)}`;
  const section = sectionOf(doc.section);
  const crumbs = [
    { name: 'Home', item: SITE_URL },
    { name: 'Docs', item: `${SITE_URL}/docs` },
  ];
  if (doc.slug) {
    const first = docsInSection(doc.section)[0];
    if (first && first.slug !== doc.slug) crumbs.push({ name: section.label, item: `${SITE_URL}${docPath(first)}` });
    crumbs.push({ name: doc.navLabel, item: url });
  }
  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: doc.title,
      description: doc.description,
      datePublished: '2026-10-23',
      dateModified: '2026-10-23',
      inLanguage: 'en-GB',
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'The Social Vision', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ];
  const faqs = faqsOf(doc);
  if (faqs.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
      })),
    });
  }
  if (doc.schema === 'HowTo') {
    const steps = howToSteps(doc);
    if (steps.length) {
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: doc.title,
        description: doc.description,
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: plain(s.text),
        })),
      });
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Sidebar({ current }: { current: string }) {
  return (
    <nav className="docs-side" aria-label="Documentation">
      {SECTIONS.map(section => (
        <div key={section.id}>
          <div className="docs-side-label">{section.label}</div>
          {docsInSection(section.id).map(doc => (
            <a key={doc.slug || 'home'} href={docPath(doc)} aria-current={doc.slug === current ? 'page' : undefined}>
              {doc.navLabel}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p><RichText text={block.text} /></p>;
    case 'h2':
      return <h2 id={block.id}>{block.text}</h2>;
    case 'h3':
      return <h3 id={block.id}>{block.text}</h3>;
    case 'ul':
      return <ul>{block.items.map(item => <li key={item}><RichText text={item} /></li>)}</ul>;
    case 'ol':
      return <ol>{block.items.map(item => <li key={item}><RichText text={item} /></li>)}</ol>;
    case 'steps':
      return (
        <ol className="docs-steps">
          {block.items.map((step, i) => (
            <li key={step.title}>
              <span>{i + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <RichText text={step.text} />
              </div>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="docs-table-wrap">
          <table>
            <thead>
              <tr>{block.headers.map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map(row => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td><RichText text={row[1]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'check':
      return (
        <aside className="docs-check" role="note">
          <b>For Zahira to confirm</b>
          {block.text}
        </aside>
      );
    case 'note':
      return <aside className="docs-check" role="note"><RichText text={block.text} /></aside>;
    case 'faq':
      return (
        <div className="docs-faq">
          {block.items.map(item => (
            <article key={item.q} id={slugify(item.q)}>
              <h3>{item.q}</h3>
              <p><RichText text={item.a} /></p>
            </article>
          ))}
        </div>
      );
    case 'template':
      return (
        <div className="docs-template">
          <p className="docs-template-actions">
            <TrackedLink href={BOOK_CALL_HREF} location="docs_brief_template">Ask us for the brief template and we&rsquo;ll send it over.</TrackedLink>
          </p>
          <pre>{BRIEF_TEMPLATE}</pre>
        </div>
      );
    case 'directory':
      return (
        <div className="docs-directory">
          {SECTIONS.map(section => (
            <section key={section.id}>
              <h2 id={section.id}>{section.label}</h2>
              <ul>
                {docsInSection(section.id).map(doc => (
                  <li key={doc.slug || 'home'}>
                    <a href={docPath(doc)}>{doc.navLabel}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function DocsArticle({ doc }: { doc: DocPage }) {
  const section = sectionOf(doc.section);
  const toc = headings(doc);
  const { prev, next } = neighbours(doc);
  const first = docsInSection(doc.section)[0];

  return (
    <div className="docs-root">
      <JsonLd doc={doc} />
      <SiteNav active="docs" />
      <div className="docs-frame">
        <Sidebar current={doc.slug} />
        <main className="docs-main">
          <details className="docs-mobile-nav">
            <summary>Docs menu: {doc.navLabel}</summary>
            <Sidebar current={doc.slug} />
          </details>
          <nav className="docs-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            {doc.slug ? <a href="/docs">Docs</a> : <span>Docs</span>}
            {doc.slug && first && first.slug !== doc.slug && (
              <>
                <span aria-hidden="true">/</span>
                <a href={docPath(first)}>{section.label}</a>
              </>
            )}
            {doc.slug && (
              <>
                <span aria-hidden="true">/</span>
                <span>{doc.navLabel}</span>
              </>
            )}
          </nav>
          <article className="docs-article">
            <h1>{doc.title}</h1>
            {doc.blocks.map((block, i) => <BlockView key={i} block={block} />)}
          </article>
          <nav className="docs-pager" aria-label="Previous and next">
            {prev ? (
              <a href={docPath(prev)}>
                <span>Previous</span>
                <strong>{prev.navLabel}</strong>
              </a>
            ) : <span />}
            {next ? (
              <a className="docs-next" href={docPath(next)}>
                <span>Next</span>
                <strong>{next.navLabel}</strong>
              </a>
            ) : <span />}
          </nav>
          <div className="docs-end">
            <a href={doc.related.href}>{doc.related.label}</a>
            <TrackedLink href={BOOK_CALL_HREF} location={`docs_${doc.slug || 'home'}`}>Book a call</TrackedLink>
          </div>
        </main>
        <aside className="docs-toc" aria-label="On this page">
          {toc.length > 0 && (
            <>
              <div className="docs-toc-label">On this page</div>
              {toc.map(h => (
                <a key={h.id} className={h.level === 3 ? 'docs-toc-h3' : undefined} href={`#${h.id}`}>{h.text}</a>
              ))}
            </>
          )}
        </aside>
      </div>
      </div>
  );
}
