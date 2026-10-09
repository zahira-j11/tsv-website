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
  {
    slug: 'education',
    label: 'Education and student brands',
    metaTitle: 'Short-Form Content Agency for Education and Student Brands | The Social Vision',
    metaDescription:
      'London short-form content agency for education and student brands. TikTok, Reels and Shorts that students actually watch and share, from street interviews to results-day content.',
    headlineStart: 'Your student brand deserves',
    intro: [
      'Students are the hardest audience to fake it with. They spot an ad in under a second, they live on TikTok, and they trust each other far more than any brand. Most education and student brands post content that looks like a prospectus, and it gets scrolled straight past.',
      'The brands that win with students make content students would make themselves, about the things they actually talk about.',
    ],
    formatsHeading: 'What works for reaching students on short-form',
    formats: [
      { title: 'Street interviews with students.', body: 'Real students answering questions about uni life, money, choosing a course and everything in between. The answers are relatable, the comments fill up, and the brand owns the conversation.' },
      { title: 'Useful content they send to friends.', body: 'Lists and guides that solve a real problem. For one edtech client, a results-day list of every place giving away free food reached nearly a million views and 28,000 shares.' },
      { title: 'Moments in the student calendar.', body: 'Results day, clearing, freshers and exam season are when students are searching and sharing most. We plan around them.' },
      { title: 'Presenters students relate to.', body: 'People from our network who look and sound like your audience, so the content feels like it came from a peer, not a brand.' },
    ],
    processHeading: 'Built around the student year',
    processBody:
      'We plan each month around what students are going through, cast presenters your audience will relate to, and turn round content fast enough to catch the big moments. You approve every concept before we shoot and every edit before it goes live.',
    resultsHeading: 'Results from student brands',
    results: [
      { slug: 'uni-compare', client: 'Uni Compare', body: 'a UK university comparison platform. Street interviews and scripted interactions about choosing a university passed 1 million views in the first 8 weeks, took average views per video from under 1,000 to 83,000, and contributed to a significant rise in app downloads.' },
      { slug: 'talab', client: 'TALAB', body: 'a student concierge app that came to us at launch with no audience. Street interviews about student life reached 1 million views in the first 5 weeks and helped it grow to 6,000 users.' },
    ],
    quote: {
      text: "The Social Vision have helped us go viral multiple times without us having to lift a finger. They've helped us generate over 1 Million views amongst students.",
      name: 'Mandy Sangha',
      role: 'Marketing Manager, Applicaa',
    },
    clientsLine: "Education and student brands we've worked with include Uni Compare, Applicaa, Blackbullion, TALAB and The Student Room.",
    faqs: [
      { q: 'What content works best for reaching students on TikTok?', a: 'Street interviews with students, useful lists and guides they want to share with friends, and content timed to moments like results day, clearing and freshers.' },
      { q: 'How do you make content students trust?', a: 'Students trust people more than brands, so we put relatable presenters on camera and talk about what students actually talk about, with the brand as the context rather than the message.' },
      { q: 'What results have you had with student brands?', a: 'Uni Compare passed 1 million views in its first 8 weeks, and TALAB went from launch with no audience to 6,000 users.' },
      { q: 'Can you work alongside our in-house marketing team?', a: 'Yes. We can run everything, or handle creators and production while your team leads strategy.' },
    ],
    closing: 'Your student brand deserves more than 300 views.',
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}

/** Industry pages that cite a given case study, for links back from it. */
export function industriesFor(caseSlug: string): Industry[] {
  return INDUSTRIES.filter(i => i.results.some(r => r.slug === caseSlug));
}
