/**
 * Case studies and client testimonials. The homepage carousel and the
 * /case-studies pages both read from here, so a number only ever needs
 * changing in one place.
 *
 * Only publish figures the client has seen and agreed to.
 */

const P    = '#7C01FF';
const PB   = '#A200FF';
const PD   = '#21005D';
const MAG  = '#E820A4';
const PMAG = '#FF7ED3';
const WH   = '#FFFFFF';

/** When the case-study pages went live (also their sitemap date). Bump when one is rewritten. */
export const CASES_PUBLISHED = '2026-10-07';

/** Google titles and descriptions where the on-page title or headline runs too long for search results. */
export const CASE_SEO: Record<string, { title?: string; description?: string }> = {
  habito:       { title: 'Habito TikTok Case Study: 25M Organic Views, Zero Ad Spend' },
  'uni-compare': {
    title: 'Uni Compare Case Study: 1M Views in 8 Weeks | The Social Vision',
    description: 'Uni Compare passed 1 million views in its first 8 weeks of short-form content, and average views per video rose from under 1,000 to 83,000.',
  },
  plum: {
    description: "Plum's paid social creative partner: Paid Social Productions and Remote Creator UGC, so its performance team can test and scale new creative quickly.",
  },
  talab: {
    description: 'TALAB went from a new app with no audience to 6,000 users, with organic short-form content driving most of the growth and 1 million views in 5 weeks.',
  },
};

export const CASES = [
  {
    slug:'habito', title:'How Habito reached 25 million organic views with zero ad spend',
    client:'Habito', format:'Street Interviews', result:'25 Million Views', sub:'8 months · zero ad spend',
    industry:'Mortgages and proptech',
    // One sentence an AI assistant or a journalist can quote as it stands.
    headline:'Habito reached 25 million organic views on TikTok in 8 months with zero ad spend, taking average views per video from about 1,000 to 156,000.',
    body:"Habito hadn't posted on social media for over a year. Within 6 months we took them from 1,000 views per video to over 156,000.",
    g:`linear-gradient(135deg,${P},${PB})`, accent:P, thumb:'/case-studies/habito.jpg',
    overview:'Habito is a UK-based digital mortgage broker on a mission to make mortgages simpler for first-time buyers. They came to us looking to build a genuine organic presence on TikTok and turn social media into a real brand awareness channel.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'25M+',label:'Views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'heart',val:'450K+',label:'Likes'},{icon:'bar',val:'156K+',label:'Average views per video'}],
    modalBody:'Over 8 months we produced street interviews built around topics that current and potential homebuyers actually care about. In one of the hardest categories to make work on social, Habito built a loyal following and became one of the most recognised mortgage brands on TikTok.',
  },
  {
    slug:'plum', title:'How Plum scaled its paid social creative',
    client:'Plum', format:'Paid Social Productions + Remote Creator UGC', result:'Scaled Creative Production', sub:'Consistent creative pipeline',
    industry:'Fintech and money apps',
    headline:'Plum uses The Social Vision as its paid social creative partner, producing Paid Social Productions and Remote Creator UGC so its performance team can test and scale new creative quickly.',
    body:"Plum needed a faster way to test paid social creatives. We gave them a pipeline of Paid Social Productions and Remote Creator UGC that scaled their paid channels.",
    g:`linear-gradient(135deg,${MAG},${PMAG})`, accent:MAG, thumb:'/case-studies/plum.jpg',
    overview:'Plum is an AI-powered money management app that needed a reliable creative partner to produce paid social content at volume without sacrificing quality.',
    strategy:'Paid Social Productions + Remote Creator UGC',
    stats:[{icon:'bolt',val:'3× increase',label:'Creative output'},{icon:'trend',val:'Scaled',label:'Paid channels'},{icon:'bar',val:'Faster',label:'Creative turnaround'},{icon:'users',val:'Zero',label:'Creator management'}],
    modalBody:"We became Plum's dedicated creative partner for paid social, producing Paid Social Productions and Remote Creator UGC that let their performance marketing team test new formats and scale winning concepts without the usual back and forth of managing creators themselves.",
  },
  {
    slug:'uni-compare', title:'How Uni Compare passed 1 million views in 8 weeks',
    client:'Uni Compare', format:'Street Interviews', result:'1M+ Views First 8 weeks', sub:'First 8 weeks',
    industry:'Edtech and student brands',
    headline:'Uni Compare passed 1 million views in its first 8 weeks of short-form content with The Social Vision, and average views per video rose from under 1,000 to 83,000.',
    body:"From under 1,000 views per video to an average of 83,000. We helped Uni Compare build a genuine organic audience among students in 8 weeks.",
    g:'linear-gradient(135deg,#027A3A,#08F683)', accent:'#027A3A', thumb:'/case-studies/unicompare.png',
    overview:'Uni Compare is a UK university comparison platform helping students find and apply for the right course. They wanted to build an organic presence on TikTok and Reels that actually reached students, without relying on paid ads.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'16M+',label:'Views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'heart',val:'200K+',label:'Likes'},{icon:'trend',val:'83K',label:'Average views per video'}],
    modalBody:'We created street interviews and scripted skits built around [the topics students actually care about](/blog/how-to-market-to-university-students) when choosing a university. The content drove multiple viral moments, took their average video from under 1,000 views to 83,000, and directly contributed to a significant rise in app downloads.',
  },
  {
    slug:'talab', title:'How TALAB grew from launch to 6,000 users',
    client:'TALAB', format:'Street Interviews', result:'6,000+ New Users', sub:'From zero audience',
    industry:'Student apps and launches',
    headline:'TALAB went from a brand new app with no audience to 6,000 users, with organic short-form content from The Social Vision driving most of that growth and 1 million views in the first 5 weeks.',
    body:"From a brand new launch with no audience, TALAB grew to 6,000 users with organic short-form content driving the majority of that growth.",
    g:`linear-gradient(135deg,${PD},${P})`, accent:PD, thumb:'/case-studies/talab.webp',
    overview:'TALAB is a student concierge app that came to us right at the point of launch. With no existing audience and a brand new product, they needed content that could build awareness fast among university students and convert that attention into app downloads.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'1M+',label:'Views in first 5 weeks'},{icon:'eye',val:'15M+',label:'Total views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'trend',val:'6,000',label:'App users acquired'}],
    modalBody:'We hit the streets from day one, creating [content built around student life](/blog/how-to-market-to-university-students), culture and the kind of topics their audience genuinely cared about. TALAB grew from a brand new app with no social presence to 6,000 users, with organic short-form content playing a central role in driving that growth.',
  },
];

export type CaseStudy = typeof CASES[number];

/**
 * The longer write-up under "What we made", for the cases that have one.
 * Text renders through RichText (**bold**, [label](href)). `faqs` also feed
 * the page's FAQ schema, so keep their answers link-free.
 */
export type CaseSection = { h: string; paras?: string[]; bullets?: string[]; steps?: string[]; after?: string[] };
export const CASE_STORY: Record<string, { updated: string; sections: CaseSection[]; faqs: { q: string; a: string }[] }> = {
  habito: {
    updated: '2026-11-24',
    sections: [
      {
        h: 'Where Habito started',
        paras: [
          "Habito hadn't posted on social for over a year. The content it had posted before was averaging under 500 views, and viewers dropped off fast: average retention was 3.73%. Mortgages are one of the hardest categories on social. The brand can't make bold claims, and the subject feels dry to most people until they're buying.",
        ],
      },
      {
        h: 'Why street interviews',
        paras: [
          "In a street interview, the brand doesn't make claims. It asks questions, and members of the public answer in their own words. A stranger can say buying a home feels impossible or that mortgages are confusing. Habito could never open an advert with that, but in a street interview it's the hook.",
          'About 95% of what we made for Habito was street interviews. Picking one format and sticking with it is what made the account grow. Each video taught the platform who to show the next one to, and the audience started to recognise the series.',
        ],
      },
      {
        h: 'How we ran it',
        bullets: [
          '**Questions about buying a home.** We wrote questions on the topics current and future homebuyers actually care about, and chose which answers made the cut.',
          "**Locations chosen for the audience.** We filmed where working adults and would-be buyers are, not where tourists are.",
          "**Consent on camera.** Every person was asked for permission to film and post at the start of the conversation. Anyone who said no doesn't appear.",
          "**Guardrails agreed up front.** Banned phrases, the on-screen disclaimer and the questions were agreed before the shoot, so the edit didn't become the bottleneck.",
          '**Planned on what worked.** Each month most of the content followed the formats already performing, a smaller share tested new questions, and a little tried something new. This is the [70/20/10 rule](/blog/70-20-10-content-rule).',
        ],
      },
      {
        h: 'What changed',
        paras: [
          'Over 8 months Habito reached 25 million organic views with zero ad spend. Average views per video went from about 1,000 to 156,000, with 10,000+ followers and 450,000+ likes. One "this or that" video about the best places to live was watched to the end by about 35% of viewers, against 3.73% retention on the earlier content. It passed half a million views.',
        ],
      },
    ],
    faqs: [
      { q: 'How did Habito get 25 million views without ads?', a: 'By posting street interviews about buying a home consistently for 8 months. About 95% of the content used that one format, so the audience learned to recognise it and the platform learned who to show it to.' },
      { q: 'Can a mortgage brand use street interviews?', a: "Yes. The brand asks the questions and the public gives the answers, so the video doesn't make product claims. The banned phrases, the disclaimer and the questions are agreed before filming." },
      { q: 'How long did it take Habito to see results?', a: 'Average views per video went from about 1,000 to 156,000 over the 8 months, and the account reached 25 million organic views in that time.' },
    ],
  },
  plum: {
    updated: '2026-11-24',
    sections: [
      {
        h: 'What Plum needed',
        paras: [
          "Plum's performance marketing team tests new ads all the time on TikTok, Instagram and YouTube. They needed a steady supply of new creative to test, without the work of finding, briefing and chasing creators themselves.",
        ],
      },
      {
        h: 'What we make for Plum',
        bullets: [
          '**Paid Social Productions:** higher-production ads we plan and film ourselves.',
          '**Remote Creator UGC:** talking-to-camera videos filmed by creators in our UK network, from their own space, to a brief we write.',
          '**Scripted interactions:** short scenes between two or more people, written to feel unscripted.',
        ],
        after: ['Every paid piece goes out with at least two hooks, and a square version when Plum needs one, so each idea is already more than one test.'],
      },
      {
        h: 'How the pipeline runs',
        steps: [
          'We pitch the concepts, the references and two hooks per ad.',
          'Plum approves the copy and chooses the creators from a shortlist.',
          'Creators film raw, and we edit in-house. Every video carries the disclaimer Plum needs.',
          'Plum reviews the finished ads on Frame.io, where comments point to the exact moment in the video.',
          "Plum's team runs the spend. Each month we look at what performed, and the next batch builds on the winners.",
        ],
      },
      {
        h: 'Lo-fi over clickbait',
        paras: [
          "For a money app, trust matters more than a shocking hook. Lo-fi videos with real people tend to feel more honest than clickbait. They also make compliance review easier, because nobody is making a claim the brand can't stand behind.",
        ],
      },
      {
        h: 'What changed',
        paras: [
          "Plum's creative output went up three times, and its performance team now tests new creatives and styles at speed. Plum doesn't manage any creators: we cast, brief and edit, and the team approves.",
        ],
      },
    ],
    faqs: [
      { q: 'What does a paid social creative partner do?', a: 'It makes the ads, so the performance team can focus on testing and spend. For Plum we plan the concepts, cast creators from our network, film or brief them, edit in-house, and deliver each ad with at least two hooks.' },
      { q: "Who runs Plum's ads?", a: "Plum's own team. We make the creative and they run the campaigns and the budget." },
      { q: 'How many hooks should a paid social ad have?', a: 'At least two per asset. We pitch both with the concept, so every idea goes out as two tests.' },
    ],
  },
};

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find(c => c.slug === slug);
}

// `client` ties a quote to a case study; it matches CaseStudy.client.
export const TESTIMONIALS = [
  { client:'Habito', quote:'TSV have taken our organic TikTok to 25 million views in just eight months with zero ad spend. They combine strategy with standout creativity and execution. TSV feel like a true extension of our team.', name:'Lucinda Mistretta',      role:'Digital Marketing Manager, Habito',           initials:'LM', g:`linear-gradient(135deg,${P},${PB})`,      logoSrc:'/logos/habito.png',    logoScale:1.4, logoBg:'#ED7470' },
  { client:'Plum', quote:"The Social Vision has unlocked a new level of creative production for us. We have been able to test new creatives and styles at speed which has helped us grow our paid social channels significantly.",   name:'Georgie Hodgkins-Brown', role:'Performance Marketing Manager, Plum',         initials:'GH', g:`linear-gradient(135deg,${MAG},${PMAG})`,  logoSrc:'/logos/plum.png',      logoScale:1.0, logoBg:WH },
  { client:'Applicaa', quote:"The Social Vision have helped us go viral multiple times without us having to lift a finger. They've helped us generate over 1 Million views amongst students.",                                          name:'Mandy Sangha',           role:'Marketing Manager, Applicaa',                 initials:'MS', g:'linear-gradient(135deg,#027A3A,#08F683)',   logoSrc:'/logos/applicaa.png',  logoScale:1.6, logoBg:'#ED7470' },
  { client:'Prep Kitchen', quote:"They have a deep understanding of audience psychology and are able to translate that insight into genuinely engaging content. Their production process is seamless and high-quality.",                     name:'Amy Young',              role:'Performance Marketing Manager, Prep Kitchen', initials:'AY', g:`linear-gradient(135deg,${PD},${P})`,      logoSrc:'/logos/prepkitchen.png', logoScale:1.0, logoBg:WH },
  { client:'Plum', quote:'Working with The Social Vision has been an excellent experience. Their work ethic is second to none, and their attention to detail gives real confidence at every stage of the process. They combine strong strategic thinking with flawless execution, ensuring nothing is overlooked.', name:'Marc Castro',            role:'Content Manager, Plum',                       initials:'MC', g:`linear-gradient(135deg,${P},${MAG})`,     logoSrc:'/logos/plum.png',      logoScale:1.0, logoBg:WH },
  { client:'TALAB', quote:'The Social Vision played a pivotal role in helping TALAB reach 1 million views within just the first 5 weeks of our collaboration. Their innovative approach and strategic insights were key to this rapid success. We’re excited to continue working together and achieving even greater milestones.', name:'Mirkazim Seyidzade',     role:'CEO, Talab',                                  initials:'MS', g:`linear-gradient(135deg,${PD},${PB})`,     logoSrc:'/logos/talab.png',     logoScale:1.5, logoBg:'#141210' },
  { client:'Blackbullion', quote:"The Social Vision have done what they’ve said they would at every single stage — and that’s rare! It’s been easy and a pleasure to work with the team and we hope for continued success.", name:'Danielle Coe',           role:'COO, Blackbullion',                           initials:'DC', g:`linear-gradient(135deg,${MAG},${PMAG})`,  logoSrc:'/logos/blackbullion.png', logoScale:1.0, logoBg:'#1A1033' },
];

export function testimonialsFor(client: string) {
  return TESTIMONIALS.filter(t => t.client === client);
}

// The homepage discovery calendar. Opening this link scrolls to the calendar
// and shows it, so bookings from any page are tracked the same way.
export const BOOK_CALL_HREF = '/#book-a-call';
