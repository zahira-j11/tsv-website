import type { DocPage } from '../types';

export const HOW_WE_WORK: DocPage[] = [
  {
    slug: 'how-we-work',
    section: 'how',
    navLabel: 'How a retainer runs',
    title: 'How does a content retainer work?',
    seoTitle: 'How a social content retainer works | The Social Vision',
    description:
      'We do the work end to end. You approve twice: concepts, scripts and casting, then the final video. Every client has a dedicated account manager.',
    schema: 'HowTo',
    related: { href: '/case-studies/plum', label: 'Plum case study' },
    blocks: [
      {
        type: 'p',
        text: 'We do the work end to end. You approve twice: first the concepts, the scripts and the casting, then the final video. Every client has a dedicated account manager. There are two calls a month, one to pitch the content and one to go through the numbers. Retainers are from £2,000 a month (ex VAT), on a 3-month initial term. We make UGC and short-form content with our creators. We don\u2019t run influencer marketing or influencer campaigns.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Contract and onboarding form',
            text: 'We put the contract in place and send an onboarding form covering do-nots, brands you do not want to sound like, and what not to say. Then we book the first strategy call.',
          },
          {
            title: 'Onboarding call',
            text: 'We meet your team, including an in-house team or another agency if you have one. We agree the metrics, what the content should look like, and the channel we will use, Teams or Slack.',
          },
          {
            title: 'Strategy call',
            text: 'Your account manager pitches the month: the strategy, the concepts and the first copy. For street interviews, that includes the questions.',
          },
          {
            title: 'You approve concepts, scripts and casting',
            text: 'Once the copy is confirmed, we write the creator brief and go into production. At the same time you approve or decline the creator options, so you know who will be on screen. That review happens on a platform we have launched for clients.',
          },
          {
            title: 'Production',
            text: 'For studio-style and street interview work, we handle location, filming and editing. For remote creator UGC, a creator in the network films from their own space and we edit in-house. Creators send raw footage.',
          },
          {
            title: 'Edit',
            text: 'Editing is in-house. We move into the edit about three to five days after filming. Paid pieces are made with two hooks per asset. The website also offers a square version when you need one.',
          },
          {
            title: 'You approve the final video',
            text: 'Organic videos go to Metricool with the caption and hashtags, and you approve, reject, or leave notes. Paid videos are approved on Frame, where comments can point at a moment in the video. We then schedule and post organic content. We do not run your ad spend.',
          },
          {
            title: 'Monthly analytics, then the next pitch',
            text: 'The analytics call covers what performed. The first three months are for testing. The next month’s concepts follow what spiked, using the 70/20/10 split written up on the blog.',
          },
        ],
      },
      {
        type: 'p',
        text: 'The first month is calibration. If the voice or the tone is off, we adapt it. Some clients give very little input after the do-nots. Others work as a close partnership. Both are normal. Seasonal themes, such as a sale period, can be built into the calendar if you send them in time for the pitch. High-production and street interview shoots need notice.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the public web address of the client casting platform. This page says clients approve creators on a platform we have launched, and does not link a URL.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm how much notice a high-production or street interview shoot needs. This page says those shoots need notice, and does not state a number of days.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether there is a backup creator if someone drops out the day before a shoot. This page does not describe one.',
      },
      {
        type: 'p',
        text: 'Revisions and reshoots are on [approvals and revisions](/docs/approvals-and-revisions). What the fee covers is on [pricing](/docs/reference/pricing). The testing split is [the 70/20/10 rule](/blog/70-20-10-content-rule).',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How does it actually work, and who does what?',
            a: 'We do it end to end: strategy, casting, filming or briefing creators, editing and, for organic, posting. You approve the concepts, scripts and casting, then you approve the final video.',
          },
          {
            q: 'Can you work alongside our in-house team or ads agency?',
            a: 'Yes. We onboard with the team you already have. You tell us which days you want to post, and your own posts can sit in the same calendar. We do not run the ad spend.',
          },
        ],
      },
    ],
  },
  {
    slug: 'approvals-and-revisions',
    section: 'how',
    navLabel: 'Approvals and revisions',
    title: 'How do revisions work?',
    seoTitle: 'Are revisions included with a UGC agency? | The Social Vision',
    description:
      'Revisions are included. You approve concepts and casting first, then the final video. A reshoot caused by a client script change is extra work.',
    schema: 'Article',
    related: { href: '/docs/reference/extra-work', label: 'What counts as extra work' },
    blocks: [
      {
        type: 'p',
        text: 'Revisions are included, so nothing goes live until you are happy with the cut. You approve twice: the concepts, scripts and casting, then the final video. A reshoot that we book because the footage is not good enough is on us. A reshoot caused by a client script change is extra work. We do not publish a price for that.',
      },
      { type: 'h2', id: 'where', text: 'Where you leave notes' },
      {
        type: 'ul',
        items: [
          'Concepts: if a concept is wrong, we can scrap it and reshape it before anyone films.',
          'Organic: the final video, caption and hashtags sit in Metricool. You approve, reject, or add notes.',
          'Paid: you comment on Frame, on a specific moment, for example to lengthen a disclaimer or cut a section. The files can be downloaded at the same quality.',
        ],
      },
      {
        type: 'p',
        text: 'We will push an idea. If it goes too far, you pull it back. That is easier at the concept stage than after a shoot. Changing the script after approval is the case that becomes extra work, which is also on [what counts as extra work](/docs/reference/extra-work).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm how many revision rounds are included before a change is treated as new work. This page says revisions are included, and it does not state a number.',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm the price of a reshoot caused by a client script change, and how a script change is defined after approval. This page says that reshoot is extra work, and does not give a price.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'What happens if we do not like a video?',
            a: 'Revisions are included. You leave notes on the final video before it goes live, or we reshape the concept before it is filmed. A reshoot caused by a client script change is extra work, and no price for that is published.',
          },
        ],
      },
    ],
  },
  {
    slug: 'regulated-brands',
    section: 'how',
    navLabel: 'Regulated brands',
    title: 'Can a regulated brand use UGC and street interviews?',
    seoTitle: 'UGC and street interviews for regulated brands | The Social Vision',
    description:
      'Yes, if you send the guardrails at onboarding: banned phrases, statements you cannot make, and the disclaimer lines.',
    schema: 'Article',
    related: { href: '/case-studies/habito', label: 'Habito case study' },
    blocks: [
      {
        type: 'p',
        text: 'Yes. Send the guardrails at onboarding: any phrase you cannot use, any statement you cannot make, and the disclaimer lines. On a paid cut, a comment can ask for a disclaimer to be longer or for a line to come out. Habito, a mortgage broker, is the public organic example: 25 million organic views in 8 months, with zero ad spend.',
      },
      { type: 'h2', id: 'what-to-send', text: 'What to send before we write' },
      {
        type: 'ul',
        items: [
          'Banned phrases and claims.',
          'The disclaimer, in the words you need on screen.',
          'What the content must not look like.',
        ],
      },
      {
        type: 'p',
        text: 'Street interviews are one way to stay inside those lines, because the film is people answering a question rather than the brand reading a claim. Habito’s street interviews are written up as a [case study](/case-studies/habito). Plum is the paid example: hi-fi ads, UGC-style content and scripted interactions, on the [Plum case study](/case-studies/plum). Finance work is also on [fintech](/industries/fintech).',
      },
      {
        type: 'check',
        text: '[CHECK] Confirm whether to publish that nothing goes live until a compliance team signs off. This page says send guardrails, banned phrases and disclaimers at onboarding, and that a disclaimer change can be requested on the cut.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Can you work with a regulated brand?',
            a: 'Yes. Send guardrails, banned phrases and disclaimer lines at onboarding. Comments on the cut can ask for a disclaimer to change.',
          },
        ],
      },
    ],
  },
  {
    slug: 'working-with-your-team',
    section: 'how',
    navLabel: 'Working with your team',
    title: 'Can you work with our team, and who posts?',
    seoTitle: 'Working with an in-house team or media agency | The Social Vision',
    description:
      'Yes. We make and post the organic content on your brand channels. Your team can keep posting too. We do not run the ad spend.',
    schema: 'Article',
    related: { href: '/paid-social-creative', label: 'Paid social creative' },
    blocks: [
      {
        type: 'p',
        text: 'Yes. We work alongside in-house teams and alongside a media agency. We post organic content on your brand channels through a scheduler, and your own posts can sit in the same calendar. The films are made by our creators for your channels and your ads, not as an influencer campaign. We do not run the ads. Ad spend is separate, and your performance team or media agency buys the media.',
      },
      { type: 'h2', id: 'calendar', text: 'One calendar, two kinds of posts' },
      {
        type: 'p',
        text: 'Tell us which days you want to post. We put our captions and hashtags up for review, then schedule them. If you already post, those posts can live in the same calendar so the feed is not only ours. Two posts on the same day is fine. We do not recommend them very close together.',
      },
      { type: 'h2', id: 'paid', text: 'Paid is a hand-over' },
      {
        type: 'p',
        text: 'You approve the paid film, then your team runs the spend against it. While that is happening, we are already in production on the next batch. That is why paid creative sits a step behind the media plan. The service page is [paid social creative](/paid-social-creative).',
      },
      { type: 'h2', id: 'on-camera', text: 'Your own people on camera' },
      {
        type: 'p',
        text: 'The creator network is the default when your team does not want to be on camera. If someone on the team, or a founder, does want to be on camera, we can film with them. Casting is still yours to approve.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Who posts, and on whose page?',
            a: 'We post on your brand channels. You can keep posting your own content in the same calendar.',
          },
          {
            q: 'Does a creative agency run the ads?',
            a: 'No. The Social Vision makes the creative. Ad spend is separate, and your team or media agency runs the campaigns.',
          },
        ],
      },
    ],
  },
];
