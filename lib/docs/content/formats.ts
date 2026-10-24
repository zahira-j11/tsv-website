import type { DocPage } from '../types';

export const FORMATS: DocPage[] = [
  {
    slug: 'formats/ugc',
    section: 'formats',
    navLabel: 'UGC-style and remote UGC',
    title: 'What is UGC?',
    seoTitle: 'What is UGC? | The Social Vision',
    description:
      'UGC here means lower-fi creator video for your own channels or ads. We make UGC and short-form content. We don\u2019t run influencer marketing or influencer campaigns.',
    schema: 'Article',
    related: { href: '/ugc-agency', label: 'UGC agency UK' },
    blocks: [
      {
        type: 'p',
        text: 'UGC, user-generated content, is the name we use for lower-fi video that is not polished like an advert. Remote creator UGC is the paid version: we write the strategy and the briefs, creators in our network film, we edit in-house, and you approve the cut. The video is for your channels or your ads.',
      },
      { type: 'h2', id: 'vs-influencer', text: 'UGC and influencer marketing' },
      {
        type: 'p',
        text: 'We make UGC and short-form content with our creators. We don\u2019t run influencer marketing or influencer campaigns. With UGC you are buying the video and the edit, made by one of our creators, for your own channels or your ads. An influencer campaign would mean a creator posting to their own audience. That is not what we do. The people on camera are real. We do not use AI presenters.',
      },
      { type: 'h2', id: 'how-it-is-made', text: 'How a remote UGC video is made' },
      {
        type: 'ul',
        items: [
          'We pitch the concept, the references and two hooks.',
          'You approve the copy and the creator.',
          'The creator films raw, with a tidy background and the light on them.',
          'We edit, and you approve the video before it is used.',
        ],
      },
      {
        type: 'p',
        text: 'Creator-led organic is the cousin of this on the organic side: it should feel like someone made it at home. The site still lists that work as UGC-style creatives. Plum’s paid mix, including UGC-style videos, is the [case study](/case-studies/plum). The buyer overview is [UGC agency UK](/ugc-agency).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What is a UGC agency?',
            a: 'A UGC agency makes creator video that feels like a person rather than a brand advert. The Social Vision writes the briefs, casts from a UK network, and edits in-house.',
          },
          {
            q: 'Do you do influencer marketing?',
            a: 'No. We make UGC and short-form content, not influencer campaigns.',
          },
        ],
      },
    ],
  },
  {
    slug: 'formats/street-interviews',
    section: 'formats',
    navLabel: 'Street interviews',
    title: 'What is a street interview video?',
    seoTitle: 'What is a street interview video? | The Social Vision',
    description:
      'A presenter asks people a question we have written, in a place chosen for that audience. We keep more answers than we use, and cut the best.',
    schema: 'Article',
    related: { href: '/case-studies/habito', label: 'Habito case study' },
    blocks: [
      {
        type: 'p',
        text: 'A street interview is a presenter asking people a question, cut into a short video. We write the questions and the strategy, the presenters come from our network, and you can approve who is on camera. We talk to more people than the edit needs, then hand-pick the answers. It is one of the organic types we make, next to UGC creators on your channels and creator-led video.',
      },
      {
        type: 'p',
        text: 'Habito used street interviews to reach 25 million organic views in 8 months with zero ad spend. Uni Compare passed 1 million views in the first 8 weeks. TALAB reached 1 million views in the first 5 weeks and grew to 6,000 users. Those write-ups are on [case studies](/case-studies). Planning steps are on [how to plan a street interview](/docs/street-interview-planning). The service page is [street interviews](/street-interviews).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What is a street interview video?',
            a: 'A short video of a presenter asking people a question on the street. The Social Vision writes the questions, casts the presenter, and cuts the best answers.',
          },
        ],
      },
    ],
  },
  {
    slug: 'formats/scripted-interactions',
    section: 'formats',
    navLabel: 'Scripted interactions',
    title: 'What is a scripted interaction?',
    seoTitle: 'What are scripted interactions? | The Social Vision',
    description:
      'A scripted interaction is a planned scene, with dialogue we write and you approve, that still has to feel like something you would watch in a feed.',
    schema: 'Article',
    related: { href: '/case-studies/plum', label: 'Plum case study' },
    blocks: [
      {
        type: 'p',
        text: 'A scripted interaction is a planned scene with dialogue we write and you approve before anyone is briefed. It can be a sketch, a two-person exchange, or a more produced idea. It still has to feel like a social video. If it feels like a television advert, it usually will not hold on TikTok, Reels or Shorts.',
      },
      {
        type: 'p',
        text: 'On the site this sits with scripted interactions and with hi-fi paid ads. Plum’s paid work includes scripted interactions alongside UGC-style videos and hi-fi ads, written up in the [Plum case study](/case-studies/plum). The words are covered on [scripts vs talking points](/docs/ugc-scripts-vs-talking-points).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What are scripted interactions?',
            a: 'Planned scenes with dialogue The Social Vision writes and the client approves, made to feel native to a short-form feed rather than like a television advert.',
          },
        ],
      },
    ],
  },
  {
    slug: 'formats/hi-fi-ads',
    section: 'formats',
    navLabel: 'Hi-fi ads',
    title: 'What is a hi-fi ad?',
    seoTitle: 'What is a hi-fi ad? | The Social Vision',
    description:
      'A hi-fi ad is a higher-production paid video: we handle the location, the crew and the edit, and we still build it with two hooks so it can be tested.',
    schema: 'Article',
    related: { href: '/paid-social-creative', label: 'Paid social creative' },
    blocks: [
      {
        type: 'p',
        text: 'A hi-fi ad is a higher-production paid video. We handle the location, the filming and the edit, rather than asking a creator to shoot it at home. Paid work is there to be tested in more than one shape, so a campaign can hold a debate, a street interview and a UGC video at the same time, not one format on repeat. Each asset is still pitched with two hooks.',
      },
      {
        type: 'p',
        text: 'On the site this is hi-fi ads and paid social productions, for TikTok, Instagram and YouTube. A square version is available when you need one. The single paid video should still look and feel like an organic post, because a video that looks like a traditional advert is easy to skip. See [paid social creative](/paid-social-creative).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What is a hi-fi ad?',
            a: 'A higher-production paid video that The Social Vision plans, films and edits, built with two hooks so it can be tested, and still cut to feel at home in a social feed.',
          },
        ],
      },
    ],
  },
  {
    slug: 'formats/other',
    section: 'formats',
    navLabel: 'UGC on your channels, trends, explainers',
    title: 'What other short-form formats do you make?',
    seoTitle: 'UGC creators on your channels, trend-led and explainer videos | The Social Vision',
    description:
      'Besides street interviews and UGC, the formats are UGC creators on your channels, trend-led videos, scripted interactions and educational explainers.',
    schema: 'Article',
    related: { href: '/blog/70-20-10-content-rule', label: 'The 70/20/10 rule' },
    blocks: [
      {
        type: 'p',
        text: 'Besides street interviews and UGC-style video, the formats on the site are UGC creators on your channels, trend-led content, scripted interactions and educational explainers. UGC creators on your channels means a recurring person on your own channels, so the audience can recognise them. Trend-led videos follow a format that is already moving, sent to a creator as a trending brief. Explainers answer a question the audience is already asking, in a voice you have approved.',
      },
      {
        type: 'p',
        text: 'We can rebuild most formats you see in a feed, either as an organic video or as an ad. Organic work tends to stay with a format once it is working, which is the point of the [70/20/10 rule](/blog/70-20-10-content-rule). Paid work does the opposite on purpose: more than one format in the same month, so there is something new to test. Long-form is slower for brand awareness. Short videos are what we make.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Does long-form work?',
            a: 'Short videos build brand awareness faster. Long-form takes longer to show a return, and it is not what we are set up to lead with.',
          },
        ],
      },
    ],
  },
];
