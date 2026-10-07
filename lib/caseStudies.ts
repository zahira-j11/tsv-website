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
    client:'Plum', format:'Hi-Fi Ads + UGC + Scripted', result:'Scaled Creative Production', sub:'Consistent creative pipeline',
    industry:'Fintech and money apps',
    headline:'Plum uses The Social Vision as its paid social creative partner, producing hi-fi ads, UGC-style content and scripted interactions so its performance team can test and scale new creative quickly.',
    body:"Plum needed a faster way to test paid social creatives. We gave them a pipeline of hi-fi ads and UGC-style content that scaled their paid channels.",
    g:`linear-gradient(135deg,${MAG},${PMAG})`, accent:MAG, thumb:'/case-studies/plum.jpg',
    overview:'Plum is an AI-powered money management app that needed a reliable creative partner to produce paid social content at volume without sacrificing quality.',
    strategy:'Hi-Fi Ad Creatives + UGC Style + Scripted Interactions',
    stats:[{icon:'bolt',val:'3× increase',label:'Creative output'},{icon:'trend',val:'Scaled',label:'Paid channels'},{icon:'bar',val:'Faster',label:'Creative turnaround'},{icon:'users',val:'Zero',label:'Creator management'}],
    modalBody:"We became Plum's dedicated creative partner for paid social, producing hi-fi ads, UGC-style content and scripted interactions that let their performance marketing team test new formats and scale winning concepts without the usual back and forth of managing creators themselves.",
  },
  {
    slug:'uni-compare', title:'How Uni Compare passed 1 million views in 6 weeks',
    client:'Uni Compare', format:'Street Interviews', result:'1M+ Views First 6 weeks', sub:'First 6 weeks',
    industry:'Edtech and student brands',
    headline:'Uni Compare passed 1 million views in its first 6 weeks of short-form content with The Social Vision, and average views per video rose from under 1,000 to 83,000.',
    body:"From under 1,000 views per video to an average of 83,000. We helped Uni Compare build a genuine organic audience among students in 8 weeks.",
    g:'linear-gradient(135deg,#027A3A,#08F683)', accent:'#027A3A', thumb:'/case-studies/unicompare.png',
    overview:'Uni Compare is a UK university comparison platform helping students find and apply for the right course. They wanted to build an organic presence on TikTok and Reels that actually reached students, without relying on paid ads.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'16M+',label:'Views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'heart',val:'200K+',label:'Likes'},{icon:'trend',val:'83K',label:'Average views per video'}],
    modalBody:'We created street interviews and scripted interactions built around the topics students actually care about when choosing a university. The content drove multiple viral moments, took their average video from under 1,000 views to 83,000, and directly contributed to a significant rise in app downloads.',
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
    modalBody:'We hit the streets from day one, creating content built around student life, culture and the kind of topics their audience genuinely cared about. TALAB grew from a brand new app with no social presence to 6,000 users, with organic short-form content playing a central role in driving that growth.',
  },
];

export type CaseStudy = typeof CASES[number];

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
