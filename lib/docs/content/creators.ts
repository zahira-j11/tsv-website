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
        text: 'For an ongoing brand we build a roster you have already approved, often in the range of 10 to 30 creators, so a trend can be filmed without starting casting from zero. We usually recommend one face, or two, that the audience can recognise, and more in a month if you want the feed to look broader. If you need a demographic we do not have, we go and find them. When a script needs a particular dynamic, such as a couple, two colleagues, or a parent and a grown-up child, we cast to that dynamic rather than to a single profile.',
      },
      { type: 'h2', id: 'platform', text: 'Where you review them' },
      {
        type: 'p',
        text: 'Clients review creators on a platform we have launched: you can see who is proposed for screen, review them, and leave notes. Your casting platform link is shared with you directly once you\u2019re a client. There isn\u2019t a public link. Creators who want to join the network apply separately, at the [creator portal](https://www.tsvportal.co.uk/creator).',
      },
      { type: 'h2', id: 'your-team', text: 'Your own team' },
      {
        type: 'p',
        text: 'If your staff or a founder want to be on camera, we can film with them. The network is there when they do not.',
      },
      { type: 'h2', id: 'languages', text: 'Languages' },
      {
        type: 'p',
        text: 'We work in English only.',
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
    title: 'What usage rights do you get?',
    seoTitle: 'UGC usage rights | The Social Vision',
    description:
      'Perpetual usage rights, including ads from your brand account. Creator-handle Spark Ads, whitelisting and partnership ads need the creator’s written authorisation.',
    schema: 'Article',
    related: { href: '/docs/reference/pricing', label: 'What the retainer includes' },
    blocks: [
      {
        type: 'p',
        text: 'The content we make includes perpetual usage rights. That comes with the work, and it covers paid use from your own brand account: you can put ad spend behind any of it. Creator-handle Spark Ads, whitelisting and partnership ads are different, because the ad runs under the creator’s name. Those need a separate written agreement and creator authorisation. What the fee covers is on [what’s included](/docs/reference/pricing).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What usage rights are included?',
            a: 'The content we make comes with perpetual usage rights, including paid use from your own brand account, so you can put ad spend behind any of it. Creator-handle Spark Ads, whitelisting and partnership ads run under the creator’s name, so they need a separate written agreement and creator authorisation.',
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
      'People who appear need to agree before a video is used. Consent is handled depending on the situation.',
    schema: 'Article',
    related: { href: '/street-interviews', label: 'Street interviews' },
    blocks: [
      {
        type: 'p',
        text: 'Anyone who appears in a street interview needs to agree to the video being used. Consent is handled depending on the situation. How a shoot is planned is on [how to plan a street interview](/docs/street-interview-planning).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do people need to consent to be in a street interview?',
            a: 'Yes. Consent is handled depending on the situation.',
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
      'Creator-handle Spark Ads, whitelisting and partnership ads run under the creator’s name. Ads from your own account are included; these need a separate written agreement and creator authorisation.',
    schema: 'Article',
    related: { href: '/docs/ugc-usage-rights', label: 'Usage rights' },
    blocks: [
      {
        type: 'p',
        text: 'A creator-handle Spark Ad, on TikTok, and a partnership ad, on Meta, are ways to run a video as an ad while the creator\u2019s name stays on it. Whitelisting works the same way. Because the creator’s name is on the ad, it needs a separate written agreement and creator authorisation. Running the same video as an ad from your own brand account doesn’t: that’s covered by the perpetual usage rights. The video is one we made with our creators. It is not the same as posting the file on your own brand channel, and it is not something you set up by sharing a password.',
      },
      {
        type: 'p',
        text: 'Organic posting that we do is on your brand channels, through our scheduler. That is a different job, described on [working with your team](/docs/working-with-your-team). Usage rights are on [usage rights](/docs/ugc-usage-rights).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do creators post on their own accounts?',
            a: 'No. We make the videos with our creators for your own channels. Organic posting goes on your brand channels.',
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
      'Apply through the creator application form at tsvportal.co.uk/creator. Tell us about yourself and add your content, and we\u2019ll be in touch if a brief suits you.',
    schema: 'Article',
    related: { href: 'https://www.tsvportal.co.uk/creator', label: 'Creator portal' },
    blocks: [
      {
        type: 'p',
        text: 'Apply through the creator application form at the [creator portal](https://www.tsvportal.co.uk/creator). Tell us about yourself and add your content, and we\u2019ll be in touch if a brief suits you.',
      },
      { type: 'h2', id: 'paid', text: 'When are creators paid?' },
      {
        type: 'p',
        text: 'Creators are paid on the 15th of the month.',
      },
      { type: 'h2', id: 'on-a-job', text: 'What a job looks like' },
      {
        type: 'p',
        text: 'A brief names the location, the date and time, the objective, the hooks and the dialogue or questions. Remote jobs are raw footage from your own space, with a tidy background and the light on you. We edit. You are filming for a client\u2019s channels or ads.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How do I become a UGC creator with The Social Vision?',
            a: 'Apply through the creator application form at tsvportal.co.uk/creator. Tell us about yourself and add your content, and we\u2019ll be in touch if a brief suits you.',
          },
          {
            q: 'When are creators paid?',
            a: 'Creators are paid on the 15th of the month.',
          },
        ],
      },
    ],
  },
];
