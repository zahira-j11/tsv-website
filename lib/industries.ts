/**
 * Industry pages (/industries/[slug]). Each one is written for in-house
 * marketing teams in that category and pairs the formats that work with the
 * case studies that prove it. Copy here has been approved by Zahira page by
 * page; don't change it without asking.
 *
 * In `results[].body`, the client name is rendered as a link to its case
 * study, so the body starts after the name.
 */

export type Industry = {
  slug: string;
  /** Short name for links, the footer and breadcrumbs. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  /** H1 is `${headlineStart} more than 300 views.` */
  headlineStart: string;
  intro: string[];
  formatsHeading: string;
  formats: { title: string; body: string }[];
  processHeading: string;
  processBody: string;
  resultsHeading: string;
  results: { slug: string; client: string; body: string }[];
  quote?: { text: string; name: string; role: string };
  clientsLine?: string;
  faqs: { q: string; a: string }[];
  closing: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'fintech',
    label: 'Fintech and financial services',
    metaTitle: 'Short-Form Content Agency for Fintech and Financial Services | The Social Vision',
    metaDescription:
      'London short-form content agency for fintech apps, mortgage brands and financial services. Organic TikTok, Reels and Shorts plus paid creative, with compliance sign-off built in.',
    headlineStart: 'Your fintech brand deserves',
    intro: [
      "Finance is one of the hardest categories to make work on social. People don't wake up wanting to watch a video about mortgages or savings accounts. Every line has to get past compliance. And most financial brands end up posting polished, careful content that nobody stops for.",
      "It doesn't have to be that way. Money is one of the things people are most curious about. They just don't want to hear about it from a logo.",
    ],
    formatsHeading: 'What works for financial brands on short-form',
    formats: [
      { title: 'Street interviews about money.', body: "Real people answering the questions everyone wonders about: how much they spend, what they earn, whether they've started saving for a house. The brand asks the question and owns the conversation, without making claims." },
      { title: 'Storytime and real-life scenarios.', body: 'Relatable money moments, told by a presenter your audience trusts, that turn an abstract product into something people recognise from their own lives.' },
      { title: 'Educational explainers.', body: "Short, plain-English answers to the questions people actually search for. This is the content that keeps getting found months after it's posted." },
      { title: 'Paid creative built to test.', body: 'Hi-fi ads, UGC-style content and scripted interactions, made in volume so your performance team can test hooks and scale what wins.' },
    ],
    processHeading: 'Built for regulated categories',
    processBody:
      "You approve every concept before we shoot and every edit before it goes live. Disclaimers are written into the brief from the start, not added at the end, and your compliance team's sign-off is part of the process. We've done this for mortgage and money brands, so we know where the lines are and how to make content that's still worth watching inside them.",
    resultsHeading: 'Results from financial brands',
    results: [
      { slug: 'habito', client: 'Habito', body: "a digital mortgage broker that hadn't posted on social for over a year. Street interviews about buying a home took it to 25 million organic views in 8 months with zero ad spend, and average views per video from about 1,000 to 156,000." },
      { slug: 'plum', client: 'Plum', body: "an AI-powered money app. We're its paid social creative partner, producing hi-fi ads, UGC-style content and scripted interactions so its performance team can test new formats at speed." },
    ],
    quote: {
      text: 'TSV have taken our organic TikTok to 25 million views in just eight months with zero ad spend.',
      name: 'Lucinda Mistretta',
      role: 'Digital Marketing Manager, Habito',
    },
    clientsLine: "Financial brands we've worked with include Habito, Plum and Freetrade.",
    faqs: [
      { q: 'Can short-form content work for regulated financial brands?', a: 'Yes. Habito, a mortgage broker, reached 25 million organic views in 8 months. The key is formats that create interest without making claims, like street interviews, with compliance sign-off built into every brief.' },
      { q: 'How do you handle compliance?', a: 'Disclaimers go into the brief from the start, you approve concepts before filming and edits before posting, and nothing goes live until your compliance team is happy.' },
      { q: 'What formats work best for fintech on TikTok?', a: 'Street interviews about money, relatable storytime scenarios and plain-English explainers tend to perform best organically. For paid, a pipeline of hi-fi ads and UGC-style creative lets you test and scale.' },
      { q: 'Can you do organic and paid together?', a: 'Yes. Habito is organic, Plum is paid creative, and many brands use us for both.' },
    ],
    closing: 'Your fintech brand deserves more than 300 views.',
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}

/** Industry pages that cite a given case study, for links back from it. */
export function industriesFor(caseSlug: string): Industry[] {
  return INDUSTRIES.filter(i => i.results.some(r => r.slug === caseSlug));
}
