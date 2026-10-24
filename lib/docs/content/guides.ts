import type { DocPage } from '../types';

export const GUIDES: DocPage[] = [
  {
    slug: 'briefing-ugc-creators',
    section: 'guides',
    navLabel: 'How to brief UGC creators',
    title: 'How to brief UGC creators',
    seoTitle: 'How to brief UGC creators | The Social Vision',
    description:
      'We write the creator brief after you approve the copy. It covers the objective, at least two hooks, the dialogue, the references, and who is on camera.',
    schema: 'HowTo',
    related: { href: '/case-studies/plum', label: 'Plum case study' },
    blocks: [
      {
        type: 'p',
        text: 'We write the scripts, end to end. You approve the copy first. We then write the creator brief: where and when, who is on camera, the objective, the hooks in their own section, and the dialogue. Paid assets are pitched with two hooks. Creators send raw footage, and we edit it in-house.',
      },
      {
        type: 'p',
        text: 'The template further down has the 14 fields we use as a worksheet. Copy it or [download it](/docs/brief-template). There is no form. Where a field is not a settled house rule, the template says so.',
      },
      { type: 'h2', id: 'order', text: 'The order of work' },
      {
        type: 'steps',
        items: [
          {
            title: 'Pitch the asset',
            text: 'Each asset is pitched with the concept, the creative direction, a reference video, early casting thoughts, and the hook. We typically write two hooks per asset.',
          },
          {
            title: 'You approve the copy',
            text: 'Once the copy is confirmed, we write the creator brief. We do not brief a creator against copy you have not seen.',
          },
          {
            title: 'The brief itself',
            text: 'It names the location, the date and time, the creator, the main objective, the hooks in a separate section, and the dialogue. It should be short enough to read on a phone between setups.',
          },
          {
            title: 'References lead',
            text: 'Reference videos are the standard to follow. The performance and the edit should emulate them, not vaguely resemble them.',
          },
          {
            title: 'They film raw, we edit',
            text: 'On a remote brief, the creator stands somewhere with a tidy background and the light on their face. They send raw footage. Any on-screen text is added in our edit, and the brief tells them what that text will be so they leave room for it.',
          },
        ],
      },
      { type: 'h2', id: 'two-kinds', text: 'In person and remote' },
      {
        type: 'p',
        text: 'There are two brief types: in person, and remote. Street interviews are questions we write, and we pick the best answers afterwards. Trend-led UGC goes out as a trending brief. A fully scripted film carries the dialogue and the hooks in the brief. There is no single published rule for when that dialogue is word for word and when it is talking points.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm when creators get a word-for-word script and when they get talking points. This page describes scripted dialogue, street-interview questions and trending briefs, and does not state one rule for all of them.',
      },
      { type: 'h2', id: 'hooks', text: 'Hooks' },
      {
        type: 'p',
        text: 'The hook is the part that has to work. On a paid film the shape is hook, problem, bias, then the call to action, and the opening has to earn the stop in about two and a half seconds. On organic, the shape is hook, the meat of the video, micro-pacing, then the call to action. A podcast-style film or a street interview usually wants a softer call to action than a hard offer. Write the hooks out in full on [hooks](/docs/ugc-hooks).',
      },
      { type: 'h2', id: 'on-brand', text: 'Keeping it on brand' },
      {
        type: 'p',
        text: 'Brand integrations are planned into the strategy, not stuck on at the end. If a film could be a television advert that happens to be on a phone, it usually will not work. For a lo-fi sketch, we would not recommend a logo sitting on the picture. Performance has been better without a logo overlay. Whether a logo belongs depends on the format.',
      },
      { type: 'h2', id: 'rights-shipping', text: 'Usage, shipping, revisions' },
      {
        type: 'p',
        text: 'The content we make includes perpetual usage rights. The detail is on [usage rights](/docs/ugc-usage-rights). Shipping is agreed per product, on [shipping products to creators](/docs/shipping-products-to-creators). Revisions are included, and a reshoot caused by a client script change is extra work, with no price published. That sits on [approvals and revisions](/docs/approvals-and-revisions).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether to publish a default number of takes. This page does not state one.',
      },
      { type: 'h2', id: 'template', text: 'Brief template' },
      { type: 'template' },
      {
        type: 'check',
        text: '[CHECK] Confirm whether this brief template stays an open download or should be gated. It is open on this page, with no form.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do you write the scripts?',
            a: 'Yes. We write them end to end. You approve the copy, and then we write the creator brief.',
          },
          {
            q: 'What should a UGC brief include?',
            a: 'The location, date and time, who is on camera, the objective, at least two hooks in their own section, the dialogue or questions, and the reference videos to follow. Creators send raw footage and we edit.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ugc-hooks',
    section: 'guides',
    navLabel: 'Hooks for UGC ads',
    title: 'How many hooks should a UGC ad have?',
    seoTitle: 'How many hooks should a UGC ad have? | The Social Vision',
    description:
      'Two per asset. We pitch two hooks with the concept, and each paid piece is built so the opening can be tested.',
    schema: 'Article',
    related: { href: '/paid-social-creative', label: 'Paid social creative' },
    blocks: [
      {
        type: 'p',
        text: 'Two. We typically write two hooks per asset, and we pitch them with the concept, the direction and the reference. The hook is the most important part of the film. On a paid ad it has to earn the stop in about two and a half seconds.',
      },
      { type: 'h2', id: 'shape', text: 'What a hook sits inside' },
      {
        type: 'ul',
        items: [
          'Paid: hook, then the problem, then the bias, then the call to action.',
          'Organic: hook, then the meat of the video, then micro-pacing, then the call to action.',
          'A hook can be the words, or it can be visual, such as text on screen versus a call-in.',
          'Podcast-style and street interview formats usually suit a softer call to action. A direct offer can carry a harder one.',
        ],
      },
      { type: 'h2', id: 'framing', text: 'Ways to frame the opening' },
      {
        type: 'ul',
        items: [
          'Seasonal, tied to a moment the viewer is already in.',
          'First person, such as someone saying what they are trying to do.',
          'Third person, a social comparison rather than a confession.',
        ],
      },
      {
        type: 'p',
        text: 'The website’s paid offer is a minimum of two hook variations per piece, plus a square version when you need one. How those variations get read after they run is on [testing paid creative](/docs/testing-paid-creative).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How many hooks should a UGC ad have?',
            a: 'Two per asset. The Social Vision pitches two hooks with the concept, and paid pieces ship with at least two hook variations.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ugc-scripts-vs-talking-points',
    section: 'guides',
    navLabel: 'Scripts vs talking points',
    title: 'Should UGC creators follow a script?',
    seoTitle: 'Should UGC creators follow a script? | The Social Vision',
    description:
      'We write the words. Scripted films carry dialogue and hooks. Street interviews carry questions. There is no single rule for word-for-word versus talking points.',
    schema: 'Article',
    related: { href: '/docs/briefing-ugc-creators', label: 'How to brief UGC creators' },
    blocks: [
      {
        type: 'p',
        text: 'We write the words, and you approve them before a creator is briefed. A scripted film carries the dialogue and the hooks in the brief. A street interview carries the questions, and we choose the best answers afterwards. Trend-led UGC goes out as a trending brief. There is no published rule that says which of those must be word for word and which can be talking points.',
      },
      { type: 'h2', id: 'what-is-settled', text: 'What is settled' },
      {
        type: 'ul',
        items: [
          'You see the copy before we write the creator brief.',
          'Hooks are written out, not left as “say something punchy”.',
          'Reference videos are there to be followed closely.',
          'For a US audience, the script says dollars, not pounds, and we can cast US accents.',
        ],
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the rule for word-for-word scripts versus talking points. This page does not state one.',
      },
      {
        type: 'p',
        text: 'Regulated lines still need your guardrails in the brief. That is on [regulated brands](/docs/regulated-brands).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Should UGC creators follow a script?',
            a: 'We write the copy and you approve it. Scripted work includes the dialogue and the hooks. Street interviews use questions we write. A single rule for word-for-word scripts versus talking points is not published.',
          },
        ],
      },
    ],
  },
  {
    slug: 'street-interview-planning',
    section: 'guides',
    navLabel: 'Plan a street interview',
    title: 'How do you plan a street interview?',
    seoTitle: 'How to plan a street interview shoot | The Social Vision',
    description:
      'We write the questions, cast a presenter you can approve, and choose the location for the people you want to hear from. We speak to more people than we use.',
    schema: 'HowTo',
    related: { href: '/case-studies/uni-compare', label: 'Uni Compare case study' },
    blocks: [
      {
        type: 'p',
        text: 'We write the questions, you approve them with the rest of the concepts, and we cast a presenter you can approve before the shoot. The location is chosen for who you want to hear from: students near a university, office workers in the city, pet owners at a dog park. We speak to more people than the film will use, transcribe the answers, and hand-pick the best one for each question.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Questions in the monthly pitch', text: 'Street interview questions are part of the strategy call, not a separate brainstorm on the day.' },
          { title: 'A presenter from the network', text: 'You approve who is on camera, the same as any other cast. The network is the default if your own team will not be on camera.' },
          { title: 'A place that matches the audience', text: 'Footfall on its own is not the brief. The street has to be full of the people the question is for.' },
          { title: 'More conversations than cuts', text: 'We talk to a surplus of people so the edit is a choice, not whatever happened to be said first.' },
        ],
      },
      {
        type: 'p',
        text: 'The format page is [street interviews](/docs/formats/street-interviews), and the service page is [street interviews in London](/street-interviews). A shoot of this kind needs notice, which is noted on [how a retainer runs](/docs/how-we-work). Uni Compare’s first 8 weeks are the [public write-up](/case-studies/uni-compare).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether the docs should repeat the shoot length and the number of people spoken to. Those figures are not stated on this page.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the public consent steps for a street interview. This page does not describe them.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How do you film street interviews?',
            a: 'We write the questions for your approval, cast a presenter you can approve, pick a location for the audience you want, speak to more people than we use, and cut the best answers.',
          },
        ],
      },
    ],
  },
  {
    slug: 'testing-paid-creative',
    section: 'guides',
    navLabel: 'Test paid creative',
    title: 'How do you test paid social creative?',
    seoTitle: 'How to test UGC ads and avoid fatigue | The Social Vision',
    description:
      'The first three months are for testing. Each paid asset has two hooks. We judge a format after it has run, not after one post, and we do not promise results in eight weeks.',
    schema: 'Article',
    related: { href: '/case-studies/plum', label: 'Plum case study' },
    blocks: [
      {
        type: 'p',
        text: 'The first three months are for testing. We can say that with confidence over 12 weeks. We would not promise it in eight. Each paid asset is made with two hooks, so one idea is already more than one test. A format needs to be posted at least six to 12 times before you decide it does not work.',
      },
      { type: 'h2', id: 'what-changes', text: 'What we change' },
      {
        type: 'p',
        text: 'When something spikes, most of the next batch stays with that, a smaller share iterates on it, and a little is pure testing. The variables are on-screen copy, design, fonts, colours, the format, the talent, and the time of posting. On paid, we also test a harder call to action against a softer one. The written version of the split is [the 70/20/10 rule](/blog/70-20-10-content-rule).',
      },
      { type: 'h2', id: 'who-runs-it', text: 'Who runs the spend' },
      {
        type: 'p',
        text: 'We do not run the ads. Some clients put a small amount of their own spend, in the region of £5 to £15, behind a TikTok that is already doing well, because the cost to reach someone can be low on a film people are already watching. If you do that, the monthly analytics call can include the spend, the cost per result, and which film did the work. Plum’s pipeline is the [case study](/case-studies/plum): hi-fi ads, UGC-style content and scripted interactions, and three times the creative output.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether to publish a recommended number of videos to test in a month. This page says two hooks per asset, and six to 12 posts of a format before you judge it, and does not state a monthly video count.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Can you speed up the three-month testing period?',
            a: 'It can happen sooner, and we do not promise eight weeks. Twelve weeks is the period we will stand behind.',
          },
          {
            q: 'How many UGC videos should we test?',
            a: 'We do not publish a monthly test quota. Each paid asset has two hooks, and a format should run at least six to 12 times before you drop it.',
          },
        ],
      },
    ],
  },
  {
    slug: 'shipping-products-to-creators',
    section: 'guides',
    navLabel: 'Ship products to creators',
    title: 'Do you need us to send the product?',
    seoTitle: 'How to ship products to UGC creators | The Social Vision',
    description:
      'Some clients send the product. Some send footage or stills of it. Which one is realistic depends on the product, and the shipping logistics are agreed per client.',
    schema: 'Article',
    related: { href: '/docs/briefing-ugc-creators', label: 'How to brief UGC creators' },
    blocks: [
      {
        type: 'p',
        text: 'Sometimes. Some clients send the product itself, and some send footage or stills of it, whichever is easier and realistic. A product a creator cannot sensibly use on camera is a reason to send the assets instead. What is feasible is agreed for that product, not assumed from a standard parcel rule.',
      },
      { type: 'h2', id: 'brief', text: 'What still belongs in the brief' },
      {
        type: 'ul',
        items: [
          'Whether the creator is holding the real product or working from assets you supplied.',
          'How it should appear, if it is in shot.',
          'The reference video, so the handling matches the example.',
        ],
      },
      {
        type: 'check',
        text: '[CHECK] Confirm who pays for shipping, whether the parcel goes to us or straight to the creator, the lead time, whether the creator keeps the product, and how returns work. This page does not state that process.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do you need us to send the product?',
            a: 'Only when the creator needs the real product in shot. Some clients send the product and some send footage or stills. Shipping logistics are agreed per client and are not published as a standard process.',
          },
        ],
      },
    ],
  },
];
