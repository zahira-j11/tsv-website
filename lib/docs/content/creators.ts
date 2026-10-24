import type { DocPage } from '../types';

export const CREATORS: DocPage[] = [
  {
    slug: 'creators',
    section: 'creators',
    navLabel: 'Casting and the network',
    title: 'How do you find and cast UGC creators?',
    seoTitle: 'How we cast UGC creators in the UK | The Social Vision',
    description:
      'We cast from a network of 300+ real people across the UK. You approve who is on screen, from a surplus of options, before we film.',
    schema: 'Article',
    related: { href: '/case-studies/talab', label: 'TALAB case study' },
    blocks: [
      {
        type: 'p',
        text: 'We cast from a network of 300+ creators across the UK. They are real people, not AI, across ages, accents and backgrounds. You approve who is on screen before we film. We put forward more options than you need, including profiles and a self-tape, so the choice is yours rather than a single name.',
      },
      { type: 'h2', id: 'roster', text: 'A roster, not a one-off search' },
      {
        type: 'p',
        text: 'For an ongoing brand we build a roster you have already approved, often in the range of 10 to 30 creators, so a trend can be filmed without starting casting from zero. We usually recommend one face, or two, that the audience can recognise, and more in a month if you want the feed to look broader. If you need a demographic we do not have, we go and find them.',
      },
      { type: 'h2', id: 'platform', text: 'Where you review them' },
      {
        type: 'p',
        text: 'Clients review creators on a platform we have launched: you can see who is proposed for screen, review them, and leave notes. Your casting platform link is shared with you directly once you\u2019re a client. There isn\u2019t a public link. Creators who want to join the network apply separately, at the [creator portal](https://www.tsvportal.co.uk/creator).',
      },
      { type: 'h2', id: 'your-team', text: 'Your own team, or another country' },
      {
        type: 'p',
        text: 'If your staff or a founder want to be on camera, we can film with them. The network is there when they do not. For a US audience we have US accents in the network, and the script uses dollars rather than pounds. Other languages are not a published offer.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether we produce in languages other than English. This page does not say that we do.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Are the creators real people or AI?',
            a: 'They are real people, cast from The Social Vision’s network.',
          },
          {
            q: 'Can our own staff or founder be on camera?',
            a: 'Yes. The network is the default when your team would rather not be on camera, and we can film with your team when they want to.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ugc-usage-rights',
    section: 'creators',
    navLabel: 'Usage rights',
    title: 'Who owns UGC, and what usage do you get?',
    seoTitle: 'UGC usage rights | The Social Vision',
    description:
      'The content we make includes perpetual usage rights.',
    schema: 'Article',
    related: { href: '/docs/reference/pricing', label: 'Pricing and what’s included' },
    blocks: [
      {
        type: 'p',
        text: 'The content we make includes perpetual usage rights. That comes with the work. Pricing of the retainer is on [pricing](/docs/reference/pricing).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What usage rights are included?',
            a: 'Perpetual usage rights. They come with the content we make.',
          },
        ],
      },
    ],
  },
  {
    slug: 'consent',
    section: 'creators',
    navLabel: 'Consent and releases',
    title: 'How do street interviews get consent?',
    seoTitle: 'Street interview consent | The Social Vision',
    description:
      'People who appear need to agree before a film is used. The exact consent steps are not published on this page.',
    schema: 'Article',
    related: { href: '/street-interviews', label: 'Street interviews' },
    blocks: [
      {
        type: 'p',
        text: 'Anyone who appears in a street interview needs to agree to the film being used. The steps for that agreement are not published here. We are not describing a script, a form, or the order of filming and asking, because that process is not settled for the docs.',
      },
      {
        type: 'p',
        text: 'Creator releases, for the people we cast, are also not set out here. How a shoot is planned, apart from consent, is on [how to plan a street interview](/docs/street-interview-planning).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the consent process that can be published for street interviews, and whether creators sign a written release. This page does not describe either process.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm what to say about scripted street-style ads and whether they are presented as real vox pops. This page does not take a position.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do people need to consent to be in a street interview?',
            a: 'Yes. Their agreement is required before a film is used. The exact steps are not published on this page.',
          },
        ],
      },
    ],
  },
  {
    slug: 'partnership-ads',
    section: 'creators',
    navLabel: 'Partnership ads',
    title: 'What are Spark Ads and partnership ads?',
    seoTitle: 'TikTok Spark Ads and Meta partnership ads | The Social Vision',
    description:
      'A Spark Ad or partnership ad can run a film we made as an ad, with the creator’s name still on it. The film is for the client’s ads, not an influencer campaign. Our booking rules are not published.',
    schema: 'Article',
    related: { href: '/docs/ugc-usage-rights', label: 'Usage rights' },
    blocks: [
      {
        type: 'p',
        text: 'A Spark Ad, on TikTok, and a partnership ad, on Meta, are ways to run a film as an ad while the creator’s name stays on it. They need the creator’s permission through the platform. The film is one we made with our creators, for the client’s own ads. That is not an influencer campaign, and we don’t run those. They are not the same as posting the file on your own brand channel, and they are not something you set up by sharing a password.',
      },
      {
        type: 'p',
        text: 'The content includes perpetual usage rights. Whether The Social Vision books Spark Ads or partnership ads, for how long, and on which platforms, is not published here. Organic posting that we do is on your brand channels, through our scheduler. That is a different job, described on [working with your team](/docs/working-with-your-team).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the public rule for Spark Ads, partnership ads and whitelisting: whether we book them, the platform, the duration, and that passwords are not shared. This page defines the ad types and does not state our booking rule.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do creators post on their own accounts?',
            a: 'We make the films with our creators for your own channels and ads. Organic posting goes on your brand channels. We don’t run influencer campaigns, where a creator posts to their own audience. Whether a finished film is also run as a partnership ad is not published on this page.',
          },
        ],
      },
    ],
  },
  {
    slug: 'for-creators',
    section: 'creators',
    navLabel: 'For creators',
    title: 'How do I join as a creator?',
    seoTitle: 'Become a UGC creator with The Social Vision',
    description:
      'Creators apply at the TSV creator portal. Creators are paid on the 15th of the month. The invoice email is not published here.',
    schema: 'Article',
    related: { href: 'https://www.tsvportal.co.uk/creator', label: 'Creator portal' },
    blocks: [
      {
        type: 'p',
        text: 'Apply through the [creator portal](https://www.tsvportal.co.uk/creator). Creators are paid on the 15th of the month. The portal has its own privacy notice, separate from this website. We cast from the network for client work, and you would be briefed per job rather than employed on a salary.',
      },
      { type: 'h2', id: 'on-a-job', text: 'What a job looks like' },
      {
        type: 'p',
        text: 'A brief names the location, the date and time, the objective, the hooks and the dialogue or questions. Remote jobs are raw footage from your own space, with a tidy background and the light on you. We edit. You are filming for a client’s channels or ads. We don’t ask you to post it as an influencer campaign on your own account.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the invoice email, whether any freelancers are paid on the last day of the month as well as the 15th, and whether fee bands can be published. This page says creators are paid on the 15th, and does not give an address or a rate.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How do I become a UGC creator with The Social Vision?',
            a: 'Apply at tsvportal.co.uk/creator. Creators are paid on the 15th of the month.',
          },
        ],
      },
    ],
  },
];
