import type { DocPage } from '../types';

export const REFERENCE: DocPage[] = [
  {
    slug: 'reference/pricing',
    section: 'reference',
    navLabel: 'Pricing',
    title: 'How much does UGC cost in the UK?',
    seoTitle: 'How much does UGC cost in the UK? | The Social Vision',
    description:
      'Retainers are from £2,000 a month (ex VAT). The fee covers strategy, creators, editing, revisions, posting and reporting. Ad spend is not included.',
    schema: 'Article',
    related: { href: '/case-studies', label: 'Case studies' },
    blocks: [
      {
        type: 'p',
        text: 'From £2,000 a month (ex VAT). We work on a monthly retainer, as one flat fee tied to the deliverables, not as a day rate. The initial term is 3 months. After that it rolls monthly, with 30 days’ notice. Ad spend is not included.',
      },
      { type: 'h2', id: 'included', text: 'What the fee covers' },
      {
        type: 'ul',
        items: [
          'A dedicated account manager.',
          'The monthly strategy call and the monthly analytics call.',
          'Pre-production, creator sourcing and casting.',
          'Editing in-house, captions and hashtags.',
          'Revisions are included. The number of rounds is agreed in each brief.',
          'Scheduling and organic posting, and monthly performance reporting.',
          'The creator fees. You are not billed extra for the people on camera. Creator costs being inside the fee is deliberate.',
          'Perpetual usage rights on the content we make. Paid use is not included.',
        ],
      },
      { type: 'h2', id: 'not-included', text: 'What is not included' },
      {
        type: 'ul',
        items: [
          'Ad spend. Your team or your media agency runs the campaigns.',
          'Paid use. Spark Ads, whitelisting and partnership ads need a separate written agreement and creator authorisation.',
          'Edit-only work. We don\u2019t offer editing without filming.',
          'Influencer marketing and influencer campaigns. We don\u2019t run them.',
        ],
      },
      { type: 'h2', id: 'volume', text: 'How many videos' },
      {
        type: 'p',
        text: 'Organic retainers include a minimum of 16 videos a month. The paid minimum depends on the budget. Less volume is not something we recommend as a way to try it, because a format needs enough posts to learn anything. The testing period is the 3-month term, not a cheaper first month. If our footage is not good enough, we reshoot at our own cost. A reshoot after a client script change is quoted case by case. Changing the mix, or other extra work, is quoted per project. High-production and street-interview shoots need 1 week\u2019s notice.',
      },
      {
        type: 'p',
        text: 'After a discovery call we send a proposal and the relevant case studies. Public results live on [case studies](/case-studies). Book a call from the link at the bottom of this page. We do not publish a rate card.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How much does it cost, and what is the minimum?',
            a: 'From £2,000 a month (ex VAT), as a monthly retainer. The initial term is 3 months, then rolling with 30 days’ notice. A per-video rate is not published.',
          },
          {
            q: 'Is there a commitment, or can we trial it first?',
            a: 'The initial term is 3 months, which is also the testing period. After that it rolls monthly with 30 days’ notice. We do not offer a shorter trial as a cheaper test.',
          },
        ],
      },
    ],
  },
  {
    slug: 'reference/extra-work',
    section: 'reference',
    navLabel: 'Extra work',
    title: 'Are reshoots included?',
    seoTitle: 'Are UGC reshoots included? | The Social Vision',
    description:
      'Revisions are included, and the number of rounds is agreed in each brief. If our footage is not good enough, we reshoot at our own cost. A reshoot after a client script change is quoted case by case. Extra work is quoted per project.',
    schema: 'Article',
    related: { href: '/docs/approvals-and-revisions', label: 'Approvals and revisions' },
    blocks: [
      {
        type: 'p',
        text: 'Revisions are included. The number of rounds is agreed in each brief. If our footage is not good enough, we reshoot at our own cost. A reshoot after a client script change is quoted case by case. Changing the mix, or other extra work, is quoted per project.',
      },
      { type: 'h2', id: 'on-us', text: 'On us' },
      {
        type: 'ul',
        items: [
          'Notes on a cut you have not approved yet. Revisions are included, and the number of rounds is agreed in each brief.',
          'A reshoot at our own cost when our footage is not good enough.',
          'Reshaping a concept before it is filmed, if the idea is wrong.',
        ],
      },
      { type: 'h2', id: 'extra', text: 'Extra' },
      {
        type: 'ul',
        items: [
          'A reshoot after a client script change. That is quoted case by case.',
          'Changing the mix, or other extra work. That is quoted per project.',
          'Ad spend.',
          'Paid use. Spark Ads, whitelisting and partnership ads need a separate written agreement and creator authorisation.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Are reshoots included?',
            a: 'Revisions are included, and the number of rounds is agreed in each brief. If our footage is not good enough, we reshoot at our own cost. A reshoot after a client script change is quoted case by case. Extra work is quoted per project.',
          },
        ],
      },
    ],
  },
  {
    slug: 'reference/glossary',
    section: 'reference',
    navLabel: 'Glossary',
    title: 'Short-form and UGC glossary',
    seoTitle: 'UGC glossary: hook, B-roll, vox pop | The Social Vision',
    description:
      'Plain definitions of hook, UGC, vox pop, hi-fi, retainer and the other words used in these docs, each linking to the page that uses it.',
    schema: 'Article',
    related: { href: '/docs', label: 'Docs home' },
    blocks: [
      {
        type: 'p',
        text: 'Short definitions for the words these docs use. Each one points at the page that goes into it. Nothing here adds a price, a usage term, or a turnaround that is not already on that page.',
      },
      {
        type: 'table',
        headers: ['Word', 'What we mean'],
        rows: [
          ['UGC', 'Lower-fi creator video that feels like a person, not a brand advert. See [UGC](/docs/formats/ugc).'],
          ['Influencer content', 'A creator posting about a brand to their own audience. We don\u2019t do that. UGC is a film our creators make for the client\u2019s own channels or ads. See [UGC](/docs/formats/ugc).'],
          ['Remote creator UGC', 'A creator films from their own space. We brief and we edit. See [UGC](/docs/formats/ugc).'],
          ['Hook', 'The opening that decides if someone stops. We write two per paid asset. See [hooks](/docs/ugc-hooks).'],
          ['B-roll', 'Extra footage of the product, hands or place, cut around the main shot. A required clip count is not published.'],
          ['Vox pop', 'Another name for a [street interview](/docs/formats/street-interviews).'],
          ['Hi-fi ad', 'A higher-production paid film we plan and shoot. See [hi-fi ads](/docs/formats/hi-fi-ads).'],
          ['Scripted interaction', 'A planned scene with dialogue you approve. See [scripted interactions](/docs/formats/scripted-interactions).'],
          ['Retainer', 'A monthly fee. From £2,000 a month (ex VAT). See [pricing](/docs/reference/pricing).'],
          ['Revisions', 'Included. The number of rounds is agreed in each brief. See [approvals](/docs/approvals-and-revisions).'],
          ['Usage', 'Perpetual usage rights on the content we make. Paid use is not included. See [usage rights](/docs/ugc-usage-rights).'],
          ['Spark Ad / partnership ad', 'Paid use of a film we made, with the creator\u2019s name still on it. It is not included in the usage rights. It needs a separate written agreement and creator authorisation. See [partnership ads](/docs/partnership-ads).'],
          ['70/20/10', 'Mostly what is already working, some iteration, a little that is new. See the [blog post](/blog/70-20-10-content-rule).'],
        ],
      },
    ],
  },
];
