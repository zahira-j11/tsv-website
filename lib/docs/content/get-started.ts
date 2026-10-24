import type { DocPage } from '../types';

export const GET_STARTED: DocPage[] = [
  {
    slug: '',
    section: 'start',
    navLabel: 'Introduction',
    title: 'What is a short-form content agency?',
    seoTitle: 'What is a short-form content agency? | The Social Vision',
    description:
      'A short-form content agency plans, casts, films, edits and posts TikTok, Reels and Shorts. The Social Vision does that from London, for organic content and for paid ads.',
    schema: 'Article',
    related: { href: '/about', label: 'About The Social Vision' },
    blocks: [
      {
        type: 'p',
        text: 'A short-form content agency plans, casts, films, edits and posts videos for TikTok, Instagram Reels and YouTube Shorts. The Social Vision is that agency, based in London, for apps and consumer brands. We make organic content and paid ad creative. We are a small, founder-led company (The Social Vision Ltd, company no. 15844979), not a large network.',
      },
      {
        type: 'p',
        text: 'Zahira Jaigirdar is the founder and creative director. Creators come from a network of 300+ people across the UK, and they are real people, not AI. You approve the work twice: the concepts and the casting, then the final video. A full account of the month is on [how a retainer runs](/docs/how-we-work).',
      },
      { type: 'h2', id: 'what-we-make', text: 'What we make' },
      {
        type: 'p',
        text: 'On the site, the organic formats are street interviews, ambassador content, trend-led content, scripted interactions, UGC-style creatives and educational explainers. Ambassador content means a recurring face on your own channels, not a creator posting to their own audience. Paid work is remote creator UGC and higher-production ads (hi-fi ads and paid social productions) for TikTok, Meta and YouTube. We make UGC and short-form content with our creators. We don\u2019t run influencer marketing or influencer campaigns. The names on the latest sales conversations are not all the same as the names on the site.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether the docs should also use the newer names from sales calls (managed concept organic, creator-led organic, organic social production) or only the format names on the current site. This page uses the site names.',
      },
      { type: 'h2', id: 'where-to-go', text: 'Where to go next' },
      {
        type: 'ul',
        items: [
          '[How long until first content is live?](/docs/quickstart) 14–21 days from signing.',
          '[How much does UGC cost in the UK?](/docs/reference/pricing) From £2,000 a month (ex VAT).',
          '[How to brief UGC creators](/docs/briefing-ugc-creators), with a 14-field template.',
          '[UGC agency UK](/ugc-agency), the overview for buyers comparing agencies.',
          '[Questions we get asked](/docs/faq), in the order prospects actually ask them.',
        ],
      },
      { type: 'directory' },
    ],
  },
  {
    slug: 'quickstart',
    section: 'start',
    navLabel: 'Quickstart',
    title: 'How long until first content is live?',
    seoTitle: 'How long until first content is live? | The Social Vision',
    description:
      'First content goes live within 14–21 days of signing. After a shoot, videos start appearing on the calendar about three to five days later.',
    schema: 'HowTo',
    related: { href: '/case-studies/habito', label: 'Habito case study' },
    blocks: [
      {
        type: 'p',
        text: 'First content goes live within 14–21 days of signing. Week 1 is strategy and creator matching, week 2 is production, and week 3 is the first batch live. After filming, videos start to appear on the calendar about three to five days later, on a rolling basis, and we move into the edit on that same sort of timing.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Sign, then onboard',
            text: 'The contract and the onboarding form come first, then a call on goals and what the content should not look like. The first strategy call follows that.',
          },
          {
            title: 'Week 1 to week 3',
            text: 'Strategy and creator matching, then production, then the first batch live, inside 14–21 days of signing.',
          },
          {
            title: 'After each shoot',
            text: 'About three to five days after filming, the edits are underway and videos start landing on the calendar for you to approve.',
          },
        ],
      },
      {
        type: 'p',
        text: 'The month itself is two approvals from you, not a daily chase. That is set out on [how a retainer runs](/docs/how-we-work). The first month is also when we learn your tone and adapt the copy.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the turnaround for later paid batches, from pitch approval to delivery. This page only states 14–21 days from signing for the first content, and about three to five days after filming for videos to reach the calendar.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How soon can we start, and when is the first content live?',
            a: 'First content goes live within 14 to 21 days of signing. Week 1 is strategy and creator matching, week 2 is production, and week 3 is the first batch live.',
          },
          {
            q: 'How long after a shoot do we see the videos?',
            a: 'About three to five days after filming, videos start appearing on the calendar on a rolling basis.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-we-need',
    section: 'start',
    navLabel: 'What you need to give us',
    title: 'What do you need from us to start?',
    seoTitle: 'What to send your content agency | The Social Vision',
    description:
      'Two approvals each month: the concepts, and the final videos. At the start we also need guidelines, do-nots, and how you will measure the work.',
    schema: 'Article',
    related: { href: '/docs/briefing-ugc-creators', label: 'How to brief UGC creators' },
    blocks: [
      {
        type: 'p',
        text: 'Each month we need two things from you: approval of the strategy and concepts, and approval of the final videos. You do not have to arrive with a finished creative direction. The most useful brief is what you would not want the content to look like. We make UGC and short-form content with our creators. We don\u2019t run influencer marketing or influencer campaigns.',
      },
      { type: 'h2', id: 'onboarding', text: 'What we ask for at onboarding' },
      {
        type: 'ul',
        items: [
          'Brand guidelines, logos, and the do’s and don’ts, including phrases you cannot say.',
          'Any brands whose posting you do not want to sound like.',
          'How you will judge the work: the metrics that matter to you.',
          'Analytics logins, so reporting is not a guess.',
          'A shared channel, on Teams or Slack, whichever you already use.',
          'Which days you want posts to go out, if you also post yourselves.',
        ],
      },
      {
        type: 'p',
        text: 'If the category is regulated, send the guardrails at this point: banned phrases, statements you cannot make, and the disclaimer lines. That is covered on [regulated brands](/docs/regulated-brands). Product, if a creator needs it in shot, is covered on [shipping](/docs/shipping-products-to-creators).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm how client logins are stored and who can see them. This page says we ask for analytics access at onboarding, and does not describe a security policy.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What do you need from us each month?',
            a: 'Approval of the concepts and casting, and approval of the final videos. A full creative direction at the start is useful, and it is also fine if you mainly know what you do not want.',
          },
        ],
      },
    ],
  },
];
