import type { DocPage } from '../types';

/** The 29 questions prospects ask most often, in that order. */
export const FAQ: DocPage[] = [
  {
    slug: 'faq',
    section: 'faq',
    navLabel: 'FAQ',
    title: 'Questions we get asked before a retainer',
    seoTitle: 'UGC agency FAQ | The Social Vision',
    description:
      'Answers to the questions prospects ask most: price, how the month works, timing, platforms, casting, scripts, and what is not included.',
    schema: 'Article',
    related: { href: '/docs/how-we-work', label: 'How a retainer runs' },
    blocks: [
      {
        type: 'p',
        text: 'These are the questions people ask before they book, in the order we hear them. The short answer is in the first sentence. Where a detail is not settled, the page it links to says so, and we have not filled the gap here.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How much does it cost, and what is the minimum?',
            a: 'From £2,000 a month (ex VAT). It is a monthly retainer. The initial term is 3 months, then rolling with 30 days’ notice. Organic retainers include a minimum of 16 videos a month. The paid minimum depends on the budget. A per-video rate is not published. See [pricing](/docs/reference/pricing).',
          },
          {
            q: 'How does it actually work, and who does what?',
            a: 'We do it end to end. You approve twice: the concepts, scripts and casting, then the final video. Every client has a dedicated account manager. The month is written up on [how a retainer runs](/docs/how-we-work).',
          },
          {
            q: 'Can you send a deck, pricing or a proposal?',
            a: 'Yes, after a discovery call. We send a proposal and the relevant case studies. There is no public rate card.',
          },
          {
            q: 'How soon can we start, and when is the first content live?',
            a: 'First content goes live within 14 to 21 days of signing.',
          },
          {
            q: 'How many videos do we get, and how often do you post?',
            a: 'Organic retainers include a minimum of 16 videos a month. The paid minimum depends on the budget. Organic posts go on the days you agree, and two posts on the same day are fine if they are not stacked on top of each other.',
          },
          {
            q: 'Is there a commitment, or can we trial it first?',
            a: 'The initial term is 3 months, and that is the testing period. After that it rolls monthly with 30 days’ notice. We do not treat a smaller first month as a trial.',
          },
          {
            q: 'How do you measure results?',
            a: 'A monthly analytics call covers engagement, followers and what performed on each platform. Comment-to-link automations can track clicks. If you put spend behind a post, the call can include that spend and the cost per result.',
          },
          {
            q: 'Which platforms do you cover?',
            a: 'TikTok, Instagram and YouTube.',
          },
          {
            q: 'Can you reach the US, other countries, or work in other languages?',
            a: 'We work in English only. We are based in London and work with brands across the UK.',
          },
          {
            q: 'Do you have examples or case studies?',
            a: 'Yes. Public write-ups cover [Habito](/case-studies/habito), [Plum](/case-studies/plum), [Uni Compare](/case-studies/uni-compare) and [TALAB](/case-studies/talab). Applicaa, Prep Kitchen and Blackbullion are named on the site as well.',
          },
          {
            q: 'Who posts, and can we keep posting ourselves?',
            a: 'We post on your brand channels. Your own posts can sit in the same calendar. Tell us which days you want.',
          },
          {
            q: 'Are they real people or AI?',
            a: 'Real people, from a network of 300+ creators.',
          },
          {
            q: 'Do you write the scripts?',
            a: 'Yes, end to end. Scripts are the default. Talking points are used only if the brief says so. You approve the copy before we brief anyone.',
          },
          {
            q: 'Can our own staff or founder be on camera?',
            a: 'Yes. The network is the default when your team would rather not be on camera.',
          },
          {
            q: 'Can you speed up the three-month testing period?',
            a: 'It can happen sooner. We do not promise eight weeks.',
          },
          {
            q: 'Can you work alongside our in-house team or ads agency?',
            a: 'Yes. We onboard with the team you already have. We make the creative. We do not run the ad spend.',
          },
          {
            q: 'Can you work with a regulated brand?',
            a: 'Yes. Send guardrails, banned phrases and disclaimer lines at onboarding. Nothing goes live until compliance signs off. A comment on the cut can ask for a disclaimer to change.',
          },
          {
            q: 'Do you do B2B?',
            a: 'No. We work with consumer brands. We don\u2019t do B2B.',
          },
          {
            q: 'Do you do influencer marketing?',
            a: 'No. We make UGC and short-form content, not influencer campaigns.',
          },
          {
            q: 'Do you only edit if we send footage?',
            a: 'No. We don\u2019t offer edit-only work. A retainer includes filming and editing.',
          },
          {
            q: 'Do you need us to send the product?',
            a: 'When the creator needs the real product in shot, you ship it to them at your cost, and the creator keeps it. Some videos can be made from footage or stills instead.',
          },
          {
            q: 'Can we add extra videos in a busy month, or change the mix?',
            a: 'Changing the mix, or other extra work, is quoted per project. High-production and street-interview shoots need 1 week\u2019s notice.',
          },
          {
            q: 'What usage rights are included?',
            a: 'Perpetual usage rights come with the content we make. Paid use is not included. Spark Ads, whitelisting and partnership ads need a separate written agreement and creator authorisation. See [usage rights](/docs/ugc-usage-rights).',
          },
          {
            q: 'How do street interviews get consent?',
            a: 'Consent is handled depending on the situation. See [consent](/docs/consent).',
          },
          {
            q: 'Should we put our logo on the videos?',
            a: 'It depends on the format. For a lo-fi sketch we would not recommend a logo overlay. Performance has been better without one.',
          },
          {
            q: 'Can you boost a winning organic post?',
            a: 'We do not buy the media. Some clients put a small amount of their own spend, around £5 to £15, behind a TikTok that is already working, and we report on it.',
          },
          {
            q: 'How do we plan seasonal moments while we are still testing?',
            a: 'Send the themes and we will build them into the calendar. Keep space in your own calendar for those slots. High-production and street-interview shoots need 1 week\u2019s notice.',
          },
          {
            q: 'How do you keep it on brand rather than generic?',
            a: 'Brand integrations are planned into the strategy. At onboarding we take your guidelines and, just as useful, what you do not want it to look like. The first month is when we learn the tone.',
          },
          {
            q: 'Does long-form work?',
            a: 'Short videos build brand awareness faster. Long-form takes longer to show a return.',
          },
        ],
      },
    ],
  },
];
