import type { DocPage } from '../types';

export const REFERENCE: DocPage[] = [
  {
    slug: 'reference/specs',
    section: 'reference',
    navLabel: 'Deliverable specs',
    title: 'What format should UGC videos be?',
    seoTitle: 'UGC video specs for TikTok, Reels and Shorts | The Social Vision',
    description:
      'Organic films go to Instagram, TikTok and YouTube Shorts, and some clients also use Facebook Reels. Paid films can be vertical, square or horizontal. File specs are not published here.',
    schema: 'Article',
    related: { href: '/docs/formats/ugc', label: 'UGC-style and remote UGC' },
    blocks: [
      {
        type: 'p',
        text: 'For organic, we post on Instagram, TikTok and YouTube Shorts, and some clients also use Facebook Reels. Paid films are made for Meta, TikTok and YouTube, vertical or horizontal, with a square version when you need one. Creators send raw footage and we edit in-house. A resolution, codec or frame-rate spec is not published on this page.',
      },
      { type: 'h2', id: 'what-you-receive', text: 'What you actually receive' },
      {
        type: 'ul',
        items: [
          'Organic: the finished film, plus the caption and hashtags, in the scheduler for you to approve.',
          'Paid: the finished film on Frame, where a comment can point at a moment in the cut, and the file can be downloaded.',
          'Two hooks on a paid asset, so the opening is not a single take you are stuck with.',
        ],
      },
      {
        type: 'p',
        text: 'Pinterest, LinkedIn and Reddit are not platforms we describe as part of the standard offer. If you need one of them, ask, and we will say whether it is in scope.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the technical spec to publish: resolution, codec, frame rate, aspect ratios, safe zones, burned-in captions versus a caption file, and whether raw footage or project files are handed over. This page does not state them.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether Pinterest, LinkedIn or Reddit are in scope. This page says the standard organic set is Instagram, TikTok and YouTube Shorts, plus Facebook Reels for some clients.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Which platforms do you post on?',
            a: 'Instagram, TikTok and YouTube Shorts as standard, and Facebook Reels for some clients. Paid creative is made for Meta, TikTok and YouTube.',
          },
        ],
      },
    ],
  },
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
          'Revisions are included.',
          'Scheduling and organic posting, and monthly performance reporting.',
          'The creator fees. You are not billed extra for the people on camera.',
        ],
      },
      {
        type: 'p',
        text: 'Creator costs being inside the fee is deliberate. A lot of retainers leave talent as a surprise invoice. Ours does not. There are pricing incentives for a longer commitment, such as six months. The amounts are not published.',
      },
      { type: 'h2', id: 'not-included', text: 'What is not included' },
      {
        type: 'ul',
        items: [
          'Ad spend. Your team or your media agency runs the campaigns.',
          'A reshoot caused by a client script change. That is extra work, and no price is published.',
          'Influencer marketing and influencer campaigns. We don\u2019t run them.',
        ],
      },
      { type: 'h2', id: 'volume', text: 'How many videos' },
      {
        type: 'p',
        text: 'The number of films in a month is part of how the retainer is scoped. We are not publishing a minimum count on this page. Less volume is not something we recommend as a way to “try it”, because a format needs enough posts to learn anything. The testing period is the 3-month term, not a cheaper first month.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether to publish how many videos a month are included, for organic and for paid. This page does not state a number.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the amounts of any longer-commitment incentive. This page says incentives exist for a longer term, and does not state a figure.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether edit-only work is still offered. This page does not describe an edit-only retainer.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm add-on prices for changing the mix in a busy month. This page does not publish any add-on fee. Give notice when a month needs a shoot.',
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
      'Revisions are included. If our footage is not good enough, we book the reshoot. A reshoot caused by a client script change is extra work, and no price is published.',
    schema: 'Article',
    related: { href: '/docs/approvals-and-revisions', label: 'Approvals and revisions' },
    blocks: [
      {
        type: 'p',
        text: 'Revisions are included. If the footage is not good enough to finish, we book a reshoot rather than send you a film we would not stand behind. A reshoot caused by a client script change is extra work. No price for that reshoot, and no price for add-ons, is published here. We make UGC and short-form content with our creators. We don\u2019t run influencer marketing or influencer campaigns.',
      },
      { type: 'h2', id: 'on-us', text: 'On us' },
      {
        type: 'ul',
        items: [
          'Notes on a cut you have not approved yet. Revisions are included.',
          'A reshoot when the footage itself cannot be saved.',
          'Reshaping a concept before it is filmed, if the idea is wrong.',
        ],
      },
      { type: 'h2', id: 'extra', text: 'Extra' },
      {
        type: 'ul',
        items: [
          'A reshoot because the script or the creative direction changed after approval.',
          'Ad spend.',
        ],
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the public wording for a reshoot we book because the footage failed, versus a reshoot after a client script change. This page says the first is on us and the second is extra work, and it does not give a price.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm add-on prices. This page says a busy month can need notice for a shoot, and does not publish a bolt-on fee.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Are reshoots included?',
            a: 'Revisions are included. A reshoot we book because the footage is not good enough is on us. A reshoot caused by a client script change is extra work, and no price is published.',
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
          ['Revisions', 'Included. See [approvals](/docs/approvals-and-revisions).'],
          ['Usage', 'Agreed in the retainer. The licence terms are not published. See [usage rights](/docs/ugc-usage-rights).'],
          ['Spark Ad / partnership ad', 'A way to run a film we made as an ad, with the creator’s name still on it. It is for the client’s ads, not an influencer campaign. Our booking rules are not published. See [partnership ads](/docs/partnership-ads).'],
          ['70/20/10', 'Mostly what is already working, some iteration, a little that is new. See the [blog post](/blog/70-20-10-content-rule).'],
        ],
      },
    ],
  },
];
