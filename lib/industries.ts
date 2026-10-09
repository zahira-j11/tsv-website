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
  /** Where the page lives, if not /industries/{slug} (formats like street interviews). */
  path?: string;
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
  {
    slug: 'apps',
    label: 'Consumer apps',
    metaTitle: 'Short-Form Content Agency for Consumer Apps | The Social Vision',
    metaDescription:
      'London short-form content agency for consumer apps. Organic TikTok, Reels and Shorts that build an audience, plus paid creative in volume for your performance team.',
    headlineStart: 'Your app deserves',
    intro: [
      'Getting someone to download an app from a short video is a big ask. They have to stop scrolling, understand what the app does, believe it’s for them and care enough to leave TikTok. Most app content fails at the first step, because it opens on a screen recording and a logo.',
      'The apps that grow on short-form lead with the problem the app solves, put a real person on camera, and test hooks relentlessly.',
    ],
    formatsHeading: 'What works for apps on short-form',
    formats: [
      { title: 'Problem-first storytelling.', body: 'Open on the moment your user feels the problem, not on the app. The product shows up as the answer.' },
      { title: 'UGC-style creative.', body: 'Creators from our network using the app the way your users do, filmed to feel native to the feed.' },
      { title: 'Street interviews.', body: 'Real people talking about the thing your app solves, which builds an audience around the topic, not just the product.' },
      { title: 'Paid creative in volume.', body: 'Hi-fi ads, UGC-style content and scripted interactions with at least two hook variations per piece, so your performance team always has something new to test.' },
    ],
    processHeading: 'Organic and paid working together',
    processBody:
      'Organic content builds the audience and tells you which messages land. Paid creative takes the winners and scales them. We run both, so what we learn on one side feeds the other. You approve every concept before we shoot and every edit before it goes live.',
    resultsHeading: 'Results from apps',
    results: [
      { slug: 'talab', client: 'TALAB', body: 'a student concierge app that came to us at launch with no audience. Organic short-form content drove most of its growth to 6,000 users, with 1 million views in the first 5 weeks.' },
      { slug: 'uni-compare', client: 'Uni Compare', body: 'a university comparison platform. Average views per video went from under 1,000 to 83,000, and the content contributed to a significant rise in app downloads.' },
      { slug: 'plum', client: 'Plum', body: "an AI-powered money app. We're its paid social creative partner, producing hi-fi ads, UGC-style content and scripted interactions so its performance team can test new formats at speed." },
    ],
    quote: {
      text: 'The Social Vision has unlocked a new level of creative production for us. We have been able to test new creatives and styles at speed which has helped us grow our paid social channels significantly.',
      name: 'Georgie Hodgkins-Brown',
      role: 'Performance Marketing Manager, Plum',
    },
    clientsLine: "Apps we've worked with include Plum, TALAB, Uni Compare, Habito and Freetrade.",
    faqs: [
      { q: 'Can short-form content drive app downloads?', a: 'Yes. TALAB grew from launch to 6,000 users with organic short-form content driving most of that growth, and Uni Compare saw a significant rise in app downloads.' },
      { q: 'Should we focus on organic or paid creative?', a: 'They work best together: organic builds an audience and shows which messages land, and paid scales the winners. We can do either or both.' },
      { q: 'How many ad variations do you produce?', a: 'Every paid piece comes with at least two hook variations, so your team can test from day one.' },
      { q: 'Do we need to be on camera?', a: 'No. We cast creators and presenters from our network of 250+ vetted UK creators.' },
    ],
    closing: 'Your app deserves more than 300 views.',
  },
  {
    slug: 'street-interviews',
    path: '/street-interviews',
    label: 'Street interviews',
    metaTitle: 'Street Interview Content Agency in London | The Social Vision',
    metaDescription:
      "We plan, cast, film and edit street interview content for brands in London and across the UK. The format behind Habito's 25 million organic views.",
    headlineStart: 'Street interviews that get',
    intro: [
      "Street interviews look simple: a presenter, a microphone and a question. That's why so many brands try them and end up with awkward answers, the wrong locations and videos nobody finishes.",
      "The format works when every part is planned: the question, the presenter, the place and the edit. It's the format behind most of our biggest results.",
    ],
    formatsHeading: 'What goes into a street interview that works',
    formats: [
      { title: 'The question.', body: 'It has to be something people genuinely want to answer and others want to hear, connected to your brand without being about your product. We pitch the questions each month and you approve them.' },
      { title: 'The presenter.', body: 'Cast from our network to suit your audience: someone people stop for and open up to.' },
      { title: 'The place and time.', body: 'Different parts of London give very different answers. We pick locations and times to find the people your brand wants to hear from.' },
      { title: 'Consent and the edit.', body: "Everyone gives consent on camera before they're used. We interview 20 to 25 people per shoot, so only the best answers make the final cut." },
    ],
    processHeading: 'How a shoot runs',
    processBody:
      'Each month starts with a strategy call where we pitch the concepts and questions for your approval. We cast the presenter, film for around four hours with a presenter, a videographer and someone from our team, and deliver edits on a rolling basis for you to approve before we schedule and post. First content is usually live within 14 to 21 days of signing.',
    resultsHeading: 'Results from street interviews',
    results: [
      { slug: 'habito', client: 'Habito', body: 'street interviews about buying a home took this digital mortgage broker to 25 million organic views in 8 months with zero ad spend.' },
      { slug: 'uni-compare', client: 'Uni Compare', body: 'street interviews about choosing a university passed 1 million views in the first 8 weeks.' },
      { slug: 'talab', client: 'TALAB', body: 'street interviews about student life reached 1 million views in the first 5 weeks and helped the app grow to 6,000 users.' },
    ],
    quote: {
      text: 'The Social Vision played a pivotal role in helping TALAB reach 1 million views within just the first 5 weeks of our collaboration.',
      name: 'Mirkazim Seyidzade',
      role: 'CEO, TALAB',
    },
    clientsLine: "Brands we've made street interviews for include Habito, Uni Compare, TALAB and Blackbullion.",
    faqs: [
      { q: 'How long does a street interview shoot take?', a: 'Usually around four hours for one day, with the presenter, a videographer and someone from our team.' },
      { q: 'Do people need to give consent to be in a street interview?', a: "Yes. We read a consent line to every person at the start and record their answer on camera. Anyone who declines isn't used." },
      { q: 'Where in London do you film street interviews?', a: 'It depends on who you want to hear from. Commuter and office areas like the City or King’s Cross suit most brand briefs; tourist-heavy areas give fewer UK-relevant answers.' },
      { q: 'Do street interviews work for regulated brands?', a: 'Yes. Habito, a mortgage broker, reached 25 million organic views with street interviews. The brand asks the question rather than making claims.' },
    ],
    closing: 'Your brand deserves more than 300 views.',
  },
];

export function industryPath(i: Industry): string {
  return i.path ?? `/industries/${i.slug}`;
}

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}

/** Industry pages that cite a given case study, for links back from it. */
export function industriesFor(caseSlug: string): Industry[] {
  return INDUSTRIES.filter(i => i.results.some(r => r.slug === caseSlug));
}
