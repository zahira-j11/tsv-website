'use client';
import { useState, useEffect, useRef } from 'react';

// ─── Brand Palette ─────────────────────────────────────────
const BG   = '#FEFDF8';
const WH   = '#FFFFFF';
const P    = '#7C01FF';
const PB   = '#A200FF';
const PD   = '#21005D';
const MAG  = '#E820A4';
const PMAG = '#FF7ED3';
const GRN  = '#08F683';
const YEL  = '#FFD600';
const MU   = 'rgba(33,0,93,0.52)';
const SU   = 'rgba(33,0,93,0.28)';
const BR   = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

// ─── Floating orb helper ────────────────────────────────────
function Orbs({ orbs }: { orbs: { size:number; color:string; opacity:number; cls:string; top?:string; bottom?:string; left?:string; right?:string; blur?:number }[] }) {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {orbs.map((o, i) => (
        <div key={i} className={o.cls} style={{
          position:'absolute', width:o.size, height:o.size, borderRadius:'50%',
          background:`radial-gradient(circle, ${o.color}CC 0%, ${o.color}AA 60%, ${o.color}22 85%, transparent 100%)`,
          opacity:o.opacity, filter:`blur(${o.blur ?? 3}px)`,
          top:o.top, bottom:o.bottom, left:o.left, right:o.right,
        }} />
      ))}
    </div>
  );
}

// ─── Phone mockup data ─────────────────────────────────────
const PHONES = [
  { bg:'linear-gradient(165deg,#1a0535 0%,#5a1a9a 55%,#0d0520 100%)', tag:'Street Interview', handle:'@thesocialvision', caption:'POV: We asked Londoners about money 🎤', likes:'4.2M', comments:'89K' },
  { bg:'linear-gradient(165deg,#06051a 0%,#1e2080 55%,#0a0840 100%)', tag:'Ambassador',       handle:'@habito',          caption:'This changed my mortgage search forever 🏠', likes:'2.1M', comments:'34K' },
  { bg:'linear-gradient(165deg,#15052a 0%,#5a1888 55%,#0d0520 100%)', tag:'Trend-Led',        handle:'@plum_app',        caption:'The savings trick nobody tells you 💸', likes:'8.7M', comments:'156K' },
  { bg:'linear-gradient(165deg,#0e1525 0%,#1e3a70 55%,#060d25 100%)', tag:'UGC',              handle:'@prepkitchen',     caption:'Honest 30-day review 👀', likes:'1.8M', comments:'28K' },
  { bg:'linear-gradient(165deg,#1a0a28 0%,#6a1a98 55%,#100518 100%)', tag:'Hi-Fi Ad',         handle:'@asos_uk',         caption:'Summer drop. Just landed ✨', likes:'3.2M', comments:'67K' },
  { bg:'linear-gradient(165deg,#080e22 0%,#282a8a 55%,#050818 100%)', tag:'Scripted',         handle:'@monzo',           caption:'Wait until the end… 🤯', likes:'12.4M', comments:'220K' },
];
type PhoneData = typeof PHONES[0];

// ─── Phone component ────────────────────────────────────────
function Phone({ phone, rotate = 0, scale = 1, cls = '', videoSrc }: { phone: PhoneData; rotate?: number; scale?: number; cls?: string; videoSrc?: string }) {
  return (
    <div className={cls} style={{ width:190, height:388, borderRadius:36, background:'#000', border:'1.5px solid rgba(255,255,255,0.12)', overflow:'hidden', transform:`rotate(${rotate}deg) scale(${scale})`, position:'relative', boxShadow:'0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(124,1,255,0.18)', flexShrink:0 }}>
      {/* Full-screen video (when provided) */}
      {videoSrc && (
        <video src={videoSrc} autoPlay muted loop playsInline
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
      )}
      {/* Background (fallback when no video) */}
      {!videoSrc && <div style={{ position:'absolute', inset:0, background:phone.bg }} />}

      {/* UI chrome — only shown when no video */}
      {!videoSrc && <>
        <div style={{ position:'relative', zIndex:2, height:26, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px' }}>
          <span style={{ fontSize:8, color:'rgba(255,255,255,0.85)', fontWeight:600 }}>9:41</span>
          <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', width:34, height:8, background:'#000', borderRadius:'0 0 8px 8px', border:'1px solid rgba(255,255,255,0.15)', borderTop:'none' }} />
          <span style={{ fontSize:7, color:'rgba(255,255,255,0.7)' }}>▐▐▐</span>
        </div>
        <div style={{ position:'absolute', top:34, left:0, right:0, display:'flex', justifyContent:'center', gap:14, zIndex:2 }}>
          <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontWeight:500 }}>Following</span>
          <span style={{ fontSize:8, color:'#fff', fontWeight:700, borderBottom:'1.5px solid #fff', paddingBottom:1 }}>For You</span>
        </div>
        <div style={{ position:'absolute', top:34, right:7, zIndex:2 }}>
          <span style={{ background:'rgba(124,1,255,0.85)', color:'#fff', fontSize:6, fontWeight:700, padding:'2px 6px', borderRadius:4, letterSpacing:'.04em', textTransform:'uppercase' }}>{phone.tag}</span>
        </div>
        <div style={{ position:'absolute', right:6, bottom:52, display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2 }}>
          {[['❤️', phone.likes],['💬', phone.comments],['🔗','Share'],['♫','Sound']].map(([icon,label],j)=>(
            <div key={j} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
              <span style={{ fontSize:14 }}>{icon}</span>
              <span style={{ fontSize:6, color:'rgba(255,255,255,0.75)', fontWeight:600 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ position:'absolute', bottom:42, left:8, right:40, zIndex:2 }}>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.75)', fontWeight:600, marginBottom:3 }}>{phone.handle}</div>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.88)', lineHeight:1.4, fontWeight:400 }}>{phone.caption}</div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2, height:38, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 8px' }}>
          {['🏠','🔍','➕','📥','👤'].map((ic,j)=>(
            <span key={j} style={{ fontSize:j===2?18:13, opacity:j===2?1:0.55 }}>{ic}</span>
          ))}
        </div>
      </>}
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────
const STATS = [
  { n:200, suffix:'M+', label:'Organic views',   c:P   },
  { n:15,  suffix:'M+', label:'Likes',           c:MAG },
  { n:2,   suffix:'k+', label:'Content pieces',  c:PD  },
];

const CLIENT_LOGOS = ['4','5','6','7','8','9','10','11','12','13','14','15','16','17'];

const TICKER = ['TikTok','Instagram Reels','YouTube Shorts','Street Interviews','Ambassador Content','Trend-Led Content','Scripted Interactions','UGC Creatives','Hi-Fi Ads','Organic Growth','Zero Ad Spend','150+ Creators','200M+ Views'];

// Default hall-of-fame cards shown when backend has no data yet
const HOF_DEFAULTS = [
  { contentType:'Street Interview',    distribution:'Organic', clientName:'AIApply',      clientLogoColor:'#6B63DE', viewCount:'1M+',   videoSrc:'/videos/aiapply-street.mp4',      logoSrc:undefined },
  { contentType:'Street Interview',    distribution:'Organic', clientName:'Habito',       clientLogoColor:'#FF6B6B', viewCount:'1.5M+', videoSrc:'/videos/habito-street.mp4',       logoSrc:'/logos/habito.png' },
  { contentType:'Scripted Interaction',distribution:'Paid',    clientName:'Plum',         clientLogoColor:'#7C3AED', viewCount:'200K+', videoSrc:'/videos/plum-scripted.mp4',       logoSrc:'/logos/plum.png' },
  { contentType:'Street Interview',    distribution:'Organic', clientName:'Blackbullion', clientLogoColor:'#1A1033', viewCount:'200K+', videoSrc:'/videos/blackbullion-street.mp4', logoSrc:'/logos/blackbullion.png' },
  { contentType:'UGC Style',           distribution:'Paid',    clientName:'Prep Kitchen', clientLogoColor:'#D97706', viewCount:'800K+', videoSrc:'/videos/prepkitchen-ugc.mov',     logoSrc:'/logos/prepkitchen.png' },
  { contentType:'Podcast',             distribution:'Paid',    clientName:'Prep Kitchen', clientLogoColor:'#D97706', viewCount:'',      videoSrc:'/videos/prepkitchen-podcast.mov', logoSrc:'/logos/prepkitchen.png' },
  { contentType:'Hi-Fi Ad Creative',   distribution:'Paid',    clientName:'Plum',         clientLogoColor:'#7C3AED', viewCount:'',      videoSrc:'/videos/plum-hifi.mp4',           logoSrc:'/logos/plum.png' },
  { contentType:'Street Interview',    distribution:'Organic', clientName:'Uni Compare',  clientLogoColor:'#2563EB', viewCount:'1M+',   videoSrc:'/videos/unicompare-street.mp4',   logoSrc:'/logos/unicompare.png' },
  { contentType:'Street Interview',    distribution:'Organic', clientName:'Habito',       clientLogoColor:'#FF6B6B', viewCount:'4M+',   videoSrc:'/videos/habito-street-2.mp4',     logoSrc:'/logos/habito.png' },
];

const SERVICES = [
  {
    key:'street-interviews', tag:'Street Interviews', icon:'🎤',
    bg:'linear-gradient(165deg,#3a0088,#A200FF 55%,#21005D)', accent:P,
    thumbs:['/videos/habito-street.mp4','/videos/aiapply-street.mp4','/videos/unicompare-street.mp4'],
    desc:'Real, unscripted reactions from the public. Authentic and highly engaging social content.',
    modalDesc:'We go out onto the street and ask real people questions related to your brand, product or industry. The answers are unscripted, unfiltered and edited into short-form videos that feel completely native to TikTok and Reels. Because the content features real people rather than actors or spokespeople, it naturally builds trust and curiosity with viewers.',
    whenBest:'When you want to grow your audience and reach people who have never heard of your brand. Street interviews travel well organically and consistently pull in views from outside your existing following.',
    bestFor:'Consumer brands, fintech and lifestyle companies that want to build awareness at scale without relying on paid ads.',
  },
  {
    key:'ambassador', tag:'Ambassador Content', icon:'🤝',
    bg:'linear-gradient(165deg,#54153F,#E820A4 55%,#300825)', accent:MAG,
    thumbs:['/videos/ambassador-1.mp4','/videos/ambassador-2.mp4','/videos/ambassador-3.mp4'],
    desc:'A recurring creator representing your brand, building familiarity and trust with your audience.',
    modalDesc:'One creator becomes the consistent face of your brand on social. They appear regularly across your content, so your audience gets familiar with them over time and starts to associate them with your brand.',
    whenBest:'When your product or service needs some explanation before someone buys. Educational content, explainers and opinion-led videos all perform well in this format because a familiar face delivering information consistently builds trust faster than a rotating cast of creators.',
    bestFor:'Subscription services, DTC brands, health and wellness, and fintech companies where trust and familiarity play a big role in the buying decision.',
  },
  {
    key:'trend-led', tag:'Trend-Led Content', icon:'⚡',
    bg:'linear-gradient(165deg,#4a3000,#B07800 50%,#FFD600)', accent:YEL,
    thumbs:['/videos/trend-1.mp4','/videos/trend-2.mp4','/videos/trend-3.mp4'],
    desc:'Timely videos leveraging platform trends that feel native to social and drive engagement.',
    modalDesc:'We track what is performing across TikTok, Reels and Shorts in real time and build content around trending sounds, formats and topics before the moment passes.',
    whenBest:'When you want your brand to feel like it is part of what is happening right now rather than playing catch-up.',
    bestFor:'Fashion, beauty, food and lifestyle brands whose audience lives on short-form platforms and responds to content that feels current.',
  },
  {
    key:'scripted', tag:'Scripted Interactions', icon:'🎬',
    bg:'linear-gradient(165deg,#022E00,#06A040 50%,#08F683)', accent:GRN,
    thumbs:['/videos/scripted-1.mov','/videos/scripted-2.mov','/videos/scripted-3.mov'],
    desc:'Pre-planned, story-driven interactions that feel organic while delivering key brand messages.',
    modalDesc:'We script and film interactions between two or more people that are built around your brand message. Because it features a real back and forth between people rather than someone speaking directly to camera, it feels natural to watch and fits straight into someone\'s feed without standing out as an ad.',
    whenBest:'When you have a specific message to land but a traditional ad would not perform well on social. Scripted interactions let you be deliberate about what you say while still feeling like content someone would organically come across on TikTok or Reels.',
    bestFor:'Apps, fintech and consumer tech brands that need to explain what they do or why someone should care, in a way that actually holds attention.',
  },
  {
    key:'hi-fi-ads', tag:'Hi-Fi Ads', icon:'✨',
    bg:'linear-gradient(165deg,#21005D,#5B01FF 55%,#0d0030)', accent:'#5B01FF',
    thumbs:['/videos/hifi-ad-1.mov','/videos/hifi-ad-2.mov','/videos/hifi-ad-3.mp4'],
    desc:'High-production videos for paid social. Strong hooks, clear messaging, polished visuals.',
    modalDesc:'Higher production paid social ads built for Meta, TikTok and YouTube. These are designed to perform as paid creatives while still feeling native to the platform, so they hold attention rather than getting skipped.',
    whenBest:'When you are running paid social and need a steady supply of fresh creatives. Ad fatigue is one of the biggest reasons paid performance drops, and having new content coming in consistently keeps your campaigns working harder for longer.',
    bestFor:'E-commerce, DTC, fintech and consumer app brands that are actively spending on paid social and need creatives that convert, not just look good.',
  },
  {
    key:'ugc', tag:'UGC-Style Creatives', icon:'📱',
    bg:'linear-gradient(165deg,#3a0025,#E820A4 45%,#FF7ED3)', accent:PMAG,
    thumbs:['/videos/prepkitchen-ugc.mov','/videos/ugc-2.mov','/videos/ugc-3.mp4'],
    desc:'Creator storytelling meets product messaging. Relatable, authentic content that converts.',
    modalDesc:'Low-fi, sit-down videos of a creator talking through their experience with your product the way a real customer would. Filmed and edited to look and feel like something you would naturally come across scrolling through your feed.',
    whenBest:'When trust is the thing standing between someone and a purchase. We often use formats like stitches and reactions to show a problem and solution in a way that feels completely native to the platform rather than like an ad.',
    bestFor:'Beauty, skincare, supplements, food, fashion, any product-led brand where social proof and relatability drive purchase decisions.',
  },
  {
    key:'edu-explainers', tag:'Educational Explainers', icon:'🧠',
    bg:'linear-gradient(165deg,#003D35,#00967B 55%,#006B57)', accent:'#00967B',
    thumbs:['/videos/explainer-1.mp4','/videos/explainer-2.mp4','/videos/explainer-3.mp4'],
    desc:'High-value, expert-led content that positions your brand as the go-to resource in your niche.',
    modalDesc:'We produce expert-led educational videos that answer the questions your audience is already asking. The content positions your brand as a trusted authority in your category and keeps people coming back.',
    whenBest:'When you want to build a loyal following by giving real value before asking for anything in return. Educational content compounds over time and consistently performs well across both organic and paid.',
    bestFor:'Financial services, health, tech and professional services brands that want to be seen as the go-to resource in their niche.',
  },
];

const CHALLENGES = [
  { n:'01', accent:P,         border:P,   bg:'rgba(124,1,255,0.05)',  title:'Posting consistently',          body:'Keeping up across platforms without burning out your internal team.' },
  { n:'02', accent:MAG,       border:MAG, bg:'rgba(232,32,164,0.05)', title:'Creating content that performs', body:'Not just posting, actually driving views, engagement, and growth.' },
  { n:'03', accent:'#027A3A', border:GRN, bg:'rgba(8,246,131,0.07)',  title:'Scaling without the overhead',  body:'Growing your content output without hiring a full in-house production team.' },
];

const HOW_WE_HELP = [
  { icon:'🧩', title:'We become your content team',  body:"No more hiring, briefing, or chasing freelancers. We plug in as your dedicated social content engine, from strategy to delivery.", accent:P },
  { icon:'⚡', title:'We build for the algorithm',   body:"Every piece of content is reverse-engineered from what works. We study platform trends, hooks, and formats to maximise reach.",   accent:MAG },
  { icon:'🚀', title:'We move fast',                 body:"First content delivered within 14–21 days. We match the speed of social without sacrificing quality or brand integrity.",           accent:'#027A3A' },
  { icon:'📈', title:'We optimise relentlessly',     body:"Data drives everything. We track performance, iterate on formats, and double down on what's working to compound your growth.",    accent:'#7a5000' },
];

const STEPS = [
  { n:'01', icon:'🎯', title:'Develop high-performing social concepts',  body:'We research, strategise, and create content frameworks designed for virality.',                    accent:P,         light:'rgba(124,1,255,0.07)'  },
  { n:'02', icon:'🤝', title:'Activate creators from our network',        body:'We match the right creator to your brand from our vetted network of 150+ creators.',             accent:MAG,       light:'rgba(232,32,164,0.06)' },
  { n:'03', icon:'🎬', title:'Produce content brands can scale',          body:'Consistent, high-quality content delivered on time, every time.',                                 accent:'#027A3A', light:'rgba(8,246,131,0.09)'  },
];

const CASES = [
  {
    client:'Habito', format:'Street Interviews', result:'25 Million Views', sub:'8 months · zero ad spend',
    body:"Habito hadn't posted on social media for over a year. Within 6 months we took them from 1,000 views per video to over 156,000.",
    g:`linear-gradient(135deg,${P},${PB})`, accent:P, thumb:'/case-studies/habito.jpg',
    overview:'Habito is a UK-based digital mortgage broker on a mission to make mortgages simpler for first-time buyers. They came to us looking to build a genuine organic presence on TikTok and turn social media into a real brand awareness channel.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'25M+',label:'Views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'heart',val:'450K+',label:'Likes'},{icon:'bar',val:'156K+',label:'Average views per video'}],
    modalBody:'Over 8 months we produced street interviews built around topics that current and potential homebuyers actually care about. In one of the hardest categories to make work on social, Habito built a loyal following and became one of the most recognised mortgage brands on TikTok.',
  },
  {
    client:'Plum', format:'Hi-Fi Ads + UGC + Scripted', result:'Scaled Creative Production', sub:'Consistent creative pipeline',
    body:"Plum needed a faster way to test paid social creatives. We gave them a pipeline of hi-fi ads and UGC-style content that scaled their paid channels.",
    g:`linear-gradient(135deg,${MAG},${PMAG})`, accent:MAG, thumb:'/case-studies/plum.jpg',
    overview:'Plum is an AI-powered money management app that needed a reliable creative partner to produce paid social content at volume without sacrificing quality.',
    strategy:'Hi-Fi Ad Creatives + UGC Style + Scripted Interactions',
    stats:[{icon:'bolt',val:'3× increase',label:'Creative output'},{icon:'trend',val:'Scaled',label:'Paid channels'},{icon:'bar',val:'Faster',label:'Creative turnaround'},{icon:'users',val:'Zero',label:'Creator management'}],
    modalBody:"We became Plum's dedicated creative partner for paid social, producing hi-fi ads, UGC-style content and scripted interactions that let their performance marketing team test new formats and scale winning concepts without the usual back and forth of managing creators themselves.",
  },
  {
    client:'Uni Compare', format:'Street Interviews', result:'1M+ Views First 6 weeks', sub:'First 6 weeks',
    body:"From under 1,000 views per video to an average of 83,000. We helped Uni Compare build a genuine organic audience among students in 8 weeks.",
    g:'linear-gradient(135deg,#027A3A,#08F683)', accent:'#027A3A', thumb:'/case-studies/unicompare.png',
    overview:'Uni Compare is a UK university comparison platform helping students find and apply for the right course. They wanted to build an organic presence on TikTok and Reels that actually reached students, without relying on paid ads.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'16M+',label:'Views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'heart',val:'200K+',label:'Likes'},{icon:'trend',val:'83K',label:'Average views per video'}],
    modalBody:'We created street interviews and scripted interactions built around the topics students actually care about when choosing a university. The content drove multiple viral moments, took their average video from under 1,000 views to 83,000, and directly contributed to a significant rise in app downloads.',
  },
  {
    client:'TALAB', format:'Street Interviews', result:'6,000+ New Users', sub:'From zero audience',
    body:"From a brand new launch with no audience, TALAB grew to 6,000 users with organic short-form content driving the majority of that growth.",
    g:`linear-gradient(135deg,${PD},${P})`, accent:PD, thumb:'/case-studies/talab.webp',
    overview:'TALAB is a student concierge app that came to us right at the point of launch. With no existing audience and a brand new product, they needed content that could build awareness fast among university students and convert that attention into app downloads.',
    strategy:'Street Interviews',
    stats:[{icon:'eye',val:'1M+',label:'Views in first 5 weeks'},{icon:'eye',val:'15M+',label:'Total views'},{icon:'users',val:'10K+',label:'Followers gained'},{icon:'trend',val:'6,000',label:'App users acquired'}],
    modalBody:'We hit the streets from day one, creating content built around student life, culture and the kind of topics their audience genuinely cared about. TALAB grew from a brand new app with no social presence to 6,000 users, with organic short-form content playing a central role in driving that growth.',
  },
];

const TESTIMONIALS = [
  { quote:'TSV have taken our organic TikTok to 25 million views in just eight months with zero ad spend. They combine strategy with standout creativity and execution. TSV feel like a true extension of our team.', name:'Lucinda Mistretta',      role:'Digital Marketing Manager, Habito',           initials:'LM', g:`linear-gradient(135deg,${P},${PB})`,      logoSrc:'/logos/habito.png',    logoScale:1.4, logoBg:'#ED7470' },
  { quote:"The Social Vision has unlocked a new level of creative production for us. We have been able to test new creatives and styles at speed which has helped us grow our paid social channels significantly.",   name:'Georgie Hodgkins-Brown', role:'Performance Marketing Manager, Plum',         initials:'GH', g:`linear-gradient(135deg,${MAG},${PMAG})`,  logoSrc:'/logos/plum.png',      logoScale:1.0, logoBg:WH },
  { quote:"The Social Vision have helped us go viral multiple times without us having to lift a finger. They've helped us generate over 1 Million views amongst students.",                                          name:'Mandy Sangha',           role:'Marketing Manager, Applicaa',                 initials:'MS', g:'linear-gradient(135deg,#027A3A,#08F683)',   logoSrc:'/logos/applicaa.png',  logoScale:1.6, logoBg:'#ED7470' },
  { quote:"They have a deep understanding of audience psychology and are able to translate that insight into genuinely engaging content. Their production process is seamless and high-quality.",                     name:'Amy Young',              role:'Performance Marketing Manager, Prep Kitchen', initials:'AY', g:`linear-gradient(135deg,${PD},${P})`,      logoSrc:'/logos/prepkitchen.png', logoScale:1.0, logoBg:WH },
];

const PLANS = [
  { name:'Organic Content',  tag:null as string|null, hero:false,
    desc:'High-performing social content designed to build your audience and grow your brand organically across TikTok, Reels, and Shorts.',
    features:['Monthly content production','Platform-native formats','Content calendar & strategy','Performance reporting'], cta:'Get started' },
  { name:'Paid Social',      tag:null as string|null, hero:false,
    desc:'Scroll-stopping ad creatives built to convert. We produce, test, and iterate creative that drives real ROI across Meta, TikTok, and YouTube.',
    features:['Hook strategy','Minimum 2 hook variations per piece','Square format option','Creative iterations & testing'], cta:'Get started' },
  { name:'Combined Package', tag:'Most popular' as string|null, hero:true,
    desc:'The full engine. Organic growth and paid performance working together to build brand and drive revenue simultaneously.',
    features:['Everything in Organic','Everything in Paid','Unified content strategy','Priority production slots'], cta:'Get started' },
];

const FAQS = [
  { q:'How quickly can we get started?',                   a:"First content goes live within 14–21 days of signing. Week 1 is strategy and creator matching. Week 2 is production. Week 3 is your first batch live." },
  { q:'How do you pick the right creators for us?',       a:"We match from a diverse network of vetted UK creators based on your audience, category, and tone. Our network spans niche micro creators through to names with millions of followers. You see and approve the shortlist before any content is produced." },
  { q:"What's included in the monthly retainer?",         a:"Strategy, creator matching, briefing, production management, revisions, and performance reporting. All included. You're not paying for add-ons." },
  { q:'How does the creator network work?',               a:"We manage a diverse network of vetted UK creators across a wide range of niches, styles, and platforms, all briefed to your brand guidelines. You don't manage them. We do." },
  { q:'We already have an in-house team. Will this clash?', a:"Not at all. We slot in around your team. We can be a full-service extension or purely handle the creator and production side while your team leads strategy. We're used to both." },
  { q:"What's the minimum commitment?",                   a:"Retainers start at £2,500 per month (ex. VAT) on a 3-month initial basis." },
];

// ─── Backend reel type ─────────────────────────────────────
interface ReelData {
  _id: string;
  type: 'hall-of-fame' | 'service';
  src: string;
  poster?: string;
  contentType?: string;
  distribution?: string;
  clientName?: string;
  clientLogoColor?: string;
  viewCount?: string;
  serviceKey?: string;
  order: number;
}

// ─── Scroll reveal hook ────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    els.forEach(el => {
      const delay = el.getAttribute('data-reveal-delay') ?? '0';
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(40px)';
      h.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s,transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
    });
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const h = e.target as HTMLElement;
        h.style.opacity = '1'; h.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    }), { threshold:0.1, rootMargin:'0px 0px -50px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Stat counter ─────────────────────────────────────────
function StatCounter({ target, suffix, active, fmt }: { target:number; suffix:string; active:boolean; fmt?: (v:number)=>string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now(), dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return <>{fmt ? fmt(val) : `${val}${suffix}`}</>;
}

// ─── Portrait video card (Hall of Fame) ───────────────────
function HofCard({ card, videoSrc, poster }: {
  card: typeof HOF_DEFAULTS[0];
  videoSrc?: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const vRef = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    if (!vRef.current || !videoSrc) return;
    if (playing) { vRef.current.pause(); setPlaying(false); }
    else { vRef.current.play(); setPlaying(true); }
  };
  return (
    <div style={{ flexShrink:0, width:210, borderRadius:18, background:WH, overflow:'hidden', boxShadow:'0 4px 24px rgba(33,0,93,0.18)', cursor:videoSrc?'pointer':'default', position:'relative' }} onClick={toggle}>
      {/* Tags */}
      <div style={{ display:'flex', gap:6, padding:'12px 12px 0', flexWrap:'wrap' }}>
        <span style={{ fontSize:11, fontWeight:700, color:PD, background:'rgba(33,0,93,0.07)', padding:'3px 10px', borderRadius:20 }}>{card.contentType}</span>
        <span style={{ fontSize:11, fontWeight:700, color:card.distribution==='Paid'?WH:P, background:card.distribution==='Paid'?PD:'rgba(124,1,255,0.1)', padding:'3px 10px', borderRadius:20 }}>{card.distribution}</span>
      </div>
      {/* Video area — fills to bottom, brand pill + view count overlaid */}
      <div style={{ position:'relative', margin:'10px 12px 12px', borderRadius:12, overflow:'hidden', background:'rgba(33,0,93,0.06)', aspectRatio:'9/16' }}>
        {videoSrc ? (
          <video ref={vRef} src={videoSrc} poster={poster} playsInline loop muted={false}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        ) : (
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(33,0,93,0.06) 0%, rgba(33,0,93,0.12) 100%)' }} />
        )}
        {/* Play button */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity: playing ? 0 : 1, transition:'opacity 200ms' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize:16, marginLeft:3 }}>▶</span>
          </div>
        </div>
        {/* Brand pill — bottom-left overlay */}
        <div style={{ position:'absolute', bottom:10, left:10, display:'flex', alignItems:'center', gap:5, background:card.clientLogoColor, borderRadius:100, padding: card.logoSrc ? '4px 10px 4px 4px' : '5px 12px' }}>
          {card.logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.logoSrc} alt="" style={{ width:20, height:20, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
          )}
          <span style={{ fontSize:10, fontWeight:700, color:WH, letterSpacing:'-.01em' }}>{card.clientName.replace(/ /g,'')}</span>
        </div>
        {/* View count — top-right overlay, organic only */}
        {card.viewCount && card.distribution !== 'Paid' && (
          <div style={{ position:'absolute', top:10, right:10, display:'flex', alignItems:'center', gap:4, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)', borderRadius:20, padding:'4px 8px' }}>
            <span style={{ fontSize:10 }}>👁</span>
            <span style={{ fontSize:11, fontWeight:700, color:WH }}>{card.viewCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Service video thumbnail (3 per service card) ─────────
function ServiceThumb({ src, poster }: { src?: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  const vRef = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    if (!vRef.current || !src) return;
    if (playing) { vRef.current.pause(); setPlaying(false); }
    else { vRef.current.play(); setPlaying(true); }
  };
  return (
    <div onClick={toggle} style={{ flex:1, borderRadius:10, overflow:'hidden', background:'rgba(33,0,93,0.07)', aspectRatio:'9/16', position:'relative', cursor:src?'pointer':'default', minWidth:0 }}>
      {src && (
        <video ref={vRef} src={src} poster={poster} playsInline loop muted={false}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
      )}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity: playing ? 0 : 1, transition:'opacity 200ms' }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:10, marginLeft:2 }}>▶</span>
        </div>
      </div>
    </div>
  );
}

// ─── Service gradient card ─────────────────────────────────
function ServiceCard({ s, i, onOpen }: { s: typeof SERVICES[0]; i: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-reveal
      data-reveal-delay={String(i * 0.09)}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        background: s.bg,
        padding: '40px 36px 36px',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-8px) scale(1.015)' : 'none',
        transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease',
        boxShadow: hovered
          ? `0 32px 72px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1), 0 0 80px ${s.accent}55`
          : '0 8px 32px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Animated shimmer sweep on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 24, pointerEvents: 'none',
        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)',
        transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
        transition: 'transform 700ms ease',
      }} />
      {/* Soft radial glow from accent */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-10%', width: 260, height: 260,
        borderRadius: '50%', background: `radial-gradient(circle, ${s.accent}44 0%, transparent 65%)`,
        pointerEvents: 'none',
        transform: hovered ? 'scale(1.3)' : 'scale(1)',
        transition: 'transform 500ms ease',
      }} />
      {/* Corner dot grid */}
      <div style={{
        position: 'absolute', bottom: 20, right: 20, display: 'grid',
        gridTemplateColumns: 'repeat(4,6px)', gap: 5, pointerEvents: 'none', opacity: 0.18,
      }}>
        {Array.from({ length: 16 }).map((_,j) => (
          <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
        ))}
      </div>

      {/* Number badge */}
      <div style={{
        position: 'absolute', top: 22, right: 26,
        fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
        color: 'rgba(255,255,255,0.25)', letterSpacing: '.06em',
      }}>
        0{i + 1}
      </div>

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: 'rgba(255,255,255,0.13)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 28,
        transform: hovered ? 'scale(1.12) rotate(-4deg)' : 'scale(1) rotate(0deg)',
        transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hovered ? `0 8px 24px ${s.accent}55` : 'none',
      }}>
        {s.icon}
      </div>

      {/* Tag pill */}
      <div style={{
        display: 'inline-block', background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 20, padding: '4px 14px', marginBottom: 14,
        fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.9)',
        letterSpacing: '.05em', textTransform: 'uppercase',
        backdropFilter: 'blur(8px)',
      }}>
        {s.tag}
      </div>

      {/* Description */}
      <p style={{
        fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.8,
        fontWeight: 400, margin: '0 0 20px',
      }}>
        {s.desc}
      </p>

      {/* Thumbnail strip */}
      <div style={{ display:'flex', gap:8, marginBottom:28 }}>
        {(s.thumbs as (string|null)[]).map((src, idx) => (
          <div key={idx} style={{
            flex:1, aspectRatio:'9/16', borderRadius:10, overflow:'hidden',
            background:'rgba(0,0,0,0.25)',
            border:'1px solid rgba(255,255,255,0.12)',
            position:'relative',
          }}>
            {src ? (
              <video src={src} autoPlay muted loop playsInline style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            ) : (
              <div style={{
                width:'100%', height:'100%',
                background:`linear-gradient(${150 + idx * 25}deg, ${s.accent}33, rgba(0,0,0,0.45))`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:9, marginLeft:2, color:'rgba(255,255,255,0.7)' }}>▶</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrow CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 250ms ease',
      }}>
        Learn more
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', fontSize: 14,
          transform: hovered ? 'translateX(3px)' : 'none',
          transition: 'transform 250ms ease',
        }}>→</span>
      </div>
    </div>
  );
}

// ─── Service detail modal ──────────────────────────────────
function ServiceModal({ s, onClose }: { s: typeof SERVICES[0]; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10,0,30,0.6)', backdropFilter: 'blur(6px)',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, padding: '48px 52px 52px',
          maxWidth: 700, width: '100%', maxHeight: '88vh', overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          animation: 'mkt-hero-in 0.28s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(33,0,93,0.07)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: PD, fontWeight: 600,
          }}
        >×</button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>{s.icon}</span>
          <h2 style={{ ...DISP, fontSize: 26, fontWeight: 800, letterSpacing: '-.04em', color: PD, margin: 0 }}>{s.tag}</h2>
        </div>

        {/* Long description */}
        <p style={{ fontSize: 16, color: 'rgba(33,0,93,0.65)', lineHeight: 1.75, marginBottom: 28 }}>{s.modalDesc}</p>

        {/* Info boxes */}
        {[
          { label: 'WHEN IT WORKS BEST', body: s.whenBest },
          { label: 'BEST SUITED FOR',    body: s.bestFor  },
        ].map(({ label, body }) => (
          <div key={label} style={{
            background: 'rgba(33,0,93,0.04)', borderRadius: 14, padding: '20px 24px', marginBottom: 14,
          }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', color: PD, margin: '0 0 8px', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontSize: 15, color: 'rgba(33,0,93,0.6)', lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        ))}

        {/* Video examples */}
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', color: PD, margin: '28px 0 16px', textTransform: 'uppercase' }}>Video examples</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {(s.thumbs as (string|null)[]).map((src, idx) => (
            <div key={idx} style={{
              flex: 1, aspectRatio: '9/16', borderRadius: 12, overflow: 'hidden',
              background: 'rgba(33,0,93,0.08)', position: 'relative',
            }}>
              {src ? (
                <video src={src} controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(${150 + idx * 25}deg, ${s.accent}22, rgba(33,0,93,0.08))`,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(33,0,93,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 12, marginLeft: 2, color: 'rgba(33,0,93,0.4)' }}>▶</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services horizontal carousel ─────────────────────────
function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [openService, setOpenService] = useState<typeof SERVICES[0] | null>(null);
  const CARD_W = 380;
  const GAP    = 20;

  const scroll = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(SERVICES.length - 1, activeIdx + dir));
    setActiveIdx(next);
    trackRef.current?.scrollTo({ left: next * (CARD_W + GAP), behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Arrow buttons */}
      {[{ dir: -1 as const, side: 'left'  as const, label: '‹' },
        { dir:  1 as const, side: 'right' as const, label: '›' }].map(({ dir, side, label }) => {
        const disabled = dir === -1 ? activeIdx === 0 : activeIdx === SERVICES.length - 1;
        return (
          <button
            key={side}
            onClick={() => scroll(dir)}
            disabled={disabled}
            style={{
              position: 'absolute', top: '46%', [side]: -28,
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 56, height: 56, borderRadius: '50%',
              background: disabled ? 'rgba(33,0,93,0.08)' : PD,
              border: `2px solid ${disabled ? 'rgba(33,0,93,0.12)' : PD}`,
              boxShadow: disabled ? 'none' : '0 8px 28px rgba(33,0,93,0.35)',
              color: disabled ? 'rgba(33,0,93,0.3)' : '#fff',
              fontSize: 32, lineHeight: 1, cursor: disabled ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 200ms, background 200ms, box-shadow 200ms',
              paddingBottom: 2,
            }}
          >
            {label}
          </button>
        );
      })}

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex', gap: GAP,
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', padding: '8px 4px 28px',
        }}
      >
        {SERVICES.map((s, i) => (
          <div key={i} style={{ flex: `0 0 ${CARD_W}px`, scrollSnapAlign: 'start' }}>
            <ServiceCard s={s} i={i} onOpen={() => setOpenService(s)} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 4 }}>
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIdx(i);
              trackRef.current?.scrollTo({ left: i * (CARD_W + GAP), behavior: 'smooth' });
            }}
            style={{
              width: i === activeIdx ? 20 : 6, height: 6, borderRadius: 3,
              background: i === activeIdx ? MAG : 'rgba(33,0,93,0.22)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 250ms ease, background 250ms ease',
            }}
          />
        ))}
      </div>

      {openService && <ServiceModal s={openService} onClose={() => setOpenService(null)} />}
    </div>
  );
}

// ─── Case stat icon ────────────────────────────────────────
function StatIcon({ type }: { type: string }) {
  const s: React.CSSProperties = { width: 18, height: 18, flexShrink: 0 };
  if (type === 'eye')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  if (type === 'users') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (type === 'heart') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
  if (type === 'bar')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (type === 'bolt')  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if (type === 'trend') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
  return null;
}

// ─── Case detail modal ─────────────────────────────────────
function CaseModal({ c, onClose }: { c: typeof CASES[0]; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10,0,30,0.55)', backdropFilter: 'blur(6px)', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24, padding: '48px 52px 52px',
        maxWidth: 680, width: '100%', maxHeight: '88vh', overflowY: 'auto',
        position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
        animation: 'mkt-hero-in 0.28s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(33,0,93,0.07)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: PD, fontWeight: 600,
        }}>×</button>

        {/* Client pill */}
        <div style={{
          display: 'inline-block', background: `${c.accent}18`, color: c.accent,
          fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 20, marginBottom: 16,
        }}>{c.client}</div>

        {/* Big result */}
        <h2 style={{ ...DISP, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.04em', color: PD, margin: '0 0 28px' }}>{c.result}</h2>

        {/* Info boxes */}
        {[{ label: 'OVERVIEW', body: c.overview }, { label: 'STRATEGY', body: c.strategy }].map(({ label, body }) => (
          <div key={label} style={{ background: 'rgba(33,0,93,0.04)', borderRadius: 14, padding: '20px 24px', marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', color: PD, margin: '0 0 8px', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontSize: 15, color: 'rgba(33,0,93,0.6)', lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        ))}

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0 24px' }}>
          {c.stats.map((st, i) => (
            <div key={i} style={{ background: 'rgba(33,0,93,0.03)', border: '1.5px solid rgba(33,0,93,0.08)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <StatIcon type={st.icon} />
              <div>
                <div style={{ ...DISP, fontSize: 18, fontWeight: 800, letterSpacing: '-.03em', color: PD, lineHeight: 1.1 }}>{st.val}</div>
                <div style={{ fontSize: 12, color: MU, fontWeight: 500, marginTop: 2 }}>{st.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <p style={{ fontSize: 15, color: 'rgba(33,0,93,0.62)', lineHeight: 1.8, margin: '0 0 32px' }}>{c.modalBody}</p>

        {/* CTA */}
        <a href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: P, color: '#fff', fontSize: 15, fontWeight: 700,
          padding: '14px 28px', borderRadius: 50, textDecoration: 'none',
          boxShadow: `0 8px 28px ${P}44`,
        }}>Get similar results →</a>
      </div>
    </div>
  );
}

// ─── Cases carousel ───────────────────────────────────────
function CasesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [openCase, setOpenCase] = useState<typeof CASES[0] | null>(null);
  const PAGES = Math.ceil(CASES.length / 2);

  const go = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(PAGES - 1, page + dir));
    setPage(next);
    trackRef.current?.scrollTo({ left: next * (trackRef.current.offsetWidth), behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Arrows */}
      {[{ dir: -1 as const, side: 'left' as const, label: '‹' },
        { dir:  1 as const, side: 'right' as const, label: '›' }].map(({ dir, side, label }) => {
        const disabled = dir === -1 ? page === 0 : page === PAGES - 1;
        return (
          <button key={side} onClick={() => go(dir)} disabled={disabled} style={{
            position: 'absolute', top: '50%', [side]: -28,
            transform: 'translateY(-50%)', zIndex: 10,
            width: 56, height: 56, borderRadius: '50%',
            background: disabled ? 'rgba(33,0,93,0.06)' : PD,
            border: `2px solid ${disabled ? 'rgba(33,0,93,0.10)' : PD}`,
            boxShadow: disabled ? 'none' : '0 8px 28px rgba(33,0,93,0.28)',
            color: disabled ? 'rgba(33,0,93,0.25)' : '#fff',
            fontSize: 32, lineHeight: 1, cursor: disabled ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 200ms ease', paddingBottom: 2,
          }}>{label}</button>
        );
      })}

      {/* Track */}
      <div ref={trackRef} style={{
        display: 'flex', gap: 20, overflowX: 'auto',
        scrollSnapType: 'x mandatory', scrollbarWidth: 'none', padding: '8px 4px 28px',
      }}>
        {Array.from({ length: PAGES }).map((_, pi) => (
          <div key={pi} style={{
            flex: '0 0 100%', scrollSnapAlign: 'start',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
          }}>
            {CASES.slice(pi * 2, pi * 2 + 2).map((c, i) => (
              <div key={i} data-reveal onClick={() => setOpenCase(c)} style={{
                background: '#fff', borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(33,0,93,0.07)',
                transition: 'transform 220ms ease, box-shadow 220ms ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(33,0,93,0.13)'; }}
                onMouseLeave={e  => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(33,0,93,0.07)'; }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', height: 260, background: c.g, overflow: 'hidden' }}>
                  <img src={c.thumb} alt={c.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                  {/* Pills over image */}
                  <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.95)', color: P, ...DISP, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, backdropFilter: 'blur(8px)' }}>{c.client}</span>
                  <span style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.90)', color: PD, fontSize: 11, fontWeight: 600, padding: '5px 14px', borderRadius: 20, backdropFilter: 'blur(8px)', maxWidth: '55%', textAlign: 'right' }}>{c.format}</span>
                </div>
                {/* Text */}
                <div style={{ padding: '24px 28px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div style={{ ...DISP, fontSize: 'clamp(22px,2.2vw,32px)', fontWeight: 800, letterSpacing: '-.04em', color: PD, lineHeight: 1.1 }}>{c.result}</div>
                    <span style={{ fontSize: 20, color: MU, flexShrink: 0, marginTop: 4 }}>→</span>
                  </div>
                  <p style={{ fontSize: 14, color: MU, lineHeight: 1.8, fontWeight: 400, margin: 0 }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 4 }}>
        {Array.from({ length: PAGES }).map((_, i) => (
          <button key={i} onClick={() => {
            setPage(i);
            trackRef.current?.scrollTo({ left: i * (trackRef.current.offsetWidth), behavior: 'smooth' });
          }} style={{
            width: i === page ? 20 : 6, height: 6, borderRadius: 3,
            background: i === page ? P : 'rgba(33,0,93,0.18)',
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'width 250ms ease, background 250ms ease',
          }} />
        ))}
      </div>

      {openCase && <CaseModal c={openCase} onClose={() => setOpenCase(null)} />}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────
export default function MarketingPage() {
  const [faq,setFaq]           = useState<number|null>(null);
  const [menu,setMenu]         = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const [statsActive,setStatsActive] = useState(false);
  const [name,setName]         = useState('');
  const [email,setEmail]       = useState('');
  const [company,setCompany]   = useState('');
  const [sent,setSent]         = useState(false);
  const [reels,setReels]       = useState<ReelData[]>([]);
  const statsRef               = useRef<HTMLDivElement>(null);
  const hofRef                 = useRef<HTMLDivElement>(null);

  useReveal();

  // Fetch backend videos
  useEffect(() => {
    fetch('/api/reels')
      .then(r => r.ok ? r.json() : { reels:[] })
      .then(d => setReels(d.reels ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } }, { threshold:0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Derived: hall-of-fame reels (or fallback to defaults)
  const hofReels = reels.filter(r => r.type === 'hall-of-fame');
  const hofCards = hofReels.length > 0 ? hofReels : null;

  // Service video lookup
  const serviceVideos = (key: string) => reels.filter(r => r.type === 'service' && r.serviceKey === key).slice(0, 3);

  const scrollHof = (dir: 'left' | 'right') => {
    if (!hofRef.current) return;
    hofRef.current.scrollBy({ left: dir === 'right' ? 460 : -460, behavior:'smooth' });
  };

  const go = (id:string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); };
  const inp: React.CSSProperties = { padding:'14px 18px', borderRadius:12, border:`1.5px solid ${BR}`, background:WH, color:PD, fontSize:14, outline:'none', width:'100%', boxSizing:'border-box', fontFamily:'inherit' };
  const btnP: React.CSSProperties = { display:'inline-block', background:`linear-gradient(135deg,${P},${PB})`, color:'#fff', fontSize:15, fontWeight:700, padding:'16px 36px', borderRadius:14, textDecoration:'none', cursor:'pointer', border:'none', fontFamily:'inherit' };

  return (
    <div style={{ fontFamily:'var(--font-sans)', background:BG, color:PD, overflowX:'hidden' }}>

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav style={{ position:'fixed', top:14, left:'50%', transform:'translateX(-50%)', zIndex:100, width:'min(1200px,calc(100% - 32px))', height:54, background:'rgba(255,255,255,0.94)', backdropFilter:'blur(24px)', borderRadius:100, border:`1px solid ${BR}`, boxShadow:'0 4px 28px rgba(33,0,93,0.10), 0 1px 0 rgba(255,255,255,0.8) inset', transition:'box-shadow 320ms' }}>
        <div style={{ height:'100%', padding:'0 10px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          {/* Logo icon */}
          <a href="#" style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
            <img src="/logos/tsv-logo.jpeg" alt="The Social Vision" style={{ width:38, height:38, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
          </a>
          {/* Links */}
          <div className="mkt-hidden-mobile" style={{ display:'flex', gap:28, flex:1, justifyContent:'center' }}>
            {([['How it works','how-it-works'],['Services','services'],['Case Studies','cases'],['Pricing','pricing'],['Testimonials','testimonials']] as [string,string][]).map(([l,id])=>(
              <button key={id} onClick={()=>go(id)} style={{ background:'none', border:'none', color:MU, fontSize:13, fontWeight:600, cursor:'pointer', padding:0, transition:'color 150ms', fontFamily:'inherit' }}
                onMouseEnter={e=>(e.currentTarget.style.color=PD)} onMouseLeave={e=>(e.currentTarget.style.color=MU)}>{l}</button>
            ))}
          </div>
          {/* CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <a href="/coming-soon" className="mkt-hidden-mobile" style={{ display:'inline-block', background:'transparent', color:P, fontSize:13, fontWeight:700, padding:'9px 16px', borderRadius:100, textDecoration:'none', border:`1.5px solid ${P}`, transition:'all 160ms' }}
              onMouseEnter={e=>{e.currentTarget.style.background=P;e.currentTarget.style.color=WH}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=P}}>Client portal</a>
            <a href="/coming-soon" className="mkt-hidden-mobile" style={{ display:'inline-block', background:MAG, color:WH, fontSize:13, fontWeight:700, padding:'9px 16px', borderRadius:100, textDecoration:'none', transition:'opacity 160ms' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.82')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>Creator signup</a>
            <a href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-" target="_blank" rel="noopener noreferrer" className="mkt-hidden-mobile" style={{ display:'inline-block', background:PD, color:'#fff', fontSize:13, fontWeight:700, padding:'11px 24px', borderRadius:100, textDecoration:'none', transition:'opacity 160ms' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.82')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>Book a call</a>
            <button onClick={()=>setMenu(!menu)} className="mkt-show-mobile" style={{ background:'none', border:'none', color:PD, fontSize:20, cursor:'pointer', padding:4 }}>{menu?'✕':'☰'}</button>
          </div>
        </div>
        {menu&&(
          <div style={{ background:BG, borderTop:`1px solid ${BR}`, padding:'16px 28px 24px', borderRadius:'0 0 28px 28px' }}>
            {([['How it works','how-it-works'],['Services','services'],['Case Studies','cases'],['Pricing','pricing']] as [string,string][]).map(([l,id])=>(
              <button key={id} onClick={()=>go(id)} style={{ display:'block', width:'100%', textAlign:'left', background:'none', border:'none', color:MU, fontSize:15, fontWeight:600, cursor:'pointer', padding:'12px 0', borderBottom:`1px solid ${BR}`, fontFamily:'inherit' }}>{l}</button>
            ))}
            <a href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-" target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)} style={{ display:'block', background:PD, color:'#fff', textAlign:'center', fontWeight:700, fontSize:14, padding:14, borderRadius:100, textDecoration:'none', marginTop:16 }}>Book a call</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:64, background:BG }}>
        <Orbs orbs={[
          { size:500, color:YEL,  opacity:0.45, cls:'mkt-orb-c', top:'8%',    left:'-4%'  },
          { size:420, color:P,    opacity:0.18, cls:'mkt-orb-a', top:'-8%',   right:'-6%' },
          { size:280, color:MAG,  opacity:0.22, cls:'mkt-orb-b', bottom:'14%',right:'4%'  },
        ]} />

        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'100px 48px 240px', width:'100%', display:'flex', alignItems:'center', gap:100 }}>

          {/* Left: copy */}
          <div style={{ flex:'1 1 500px', minWidth:0 }}>
            <div className="mkt-h1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:YEL, borderRadius:24, padding:'6px 18px', marginBottom:28 }}>
              <span className="mkt-pulsedot" style={{ width:6, height:6, borderRadius:'50%', background:PD, flexShrink:0 }} />
              <span style={{ ...DISP, color:PD, fontSize:11, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' }}>Paid & organic social content agency · London</span>
            </div>

            <h1 className="mkt-h2" style={{ ...DISP, fontSize:72, fontWeight:800, lineHeight:1.08, letterSpacing:'-.05em', marginBottom:24, color:PD, whiteSpace:'nowrap' }}>
              Your brand<br />
              deserves more<br />
              than{' '}<em className="mkt-gradient-text" style={{ fontStyle:'italic' }}>300 views.</em>
            </h1>

            <p className="mkt-h3" style={{ fontSize:'clamp(16px,1.5vw,20px)', color:MU, maxWidth:520, lineHeight:1.85, marginBottom:40, fontWeight:400 }}>
              We build and run your entire short-form content engine. Strategy, production, posting. So you don't have to.
            </p>

            <div className="mkt-h4" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-" target="_blank" rel="noopener noreferrer" className="mkt-glow-cta" style={btnP}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; }}>
                Book a strategy call →
              </a>
              <button onClick={()=>go('hall-of-fame')} style={{ background:WH, color:PD, fontSize:15, fontWeight:700, padding:'16px 28px', borderRadius:14, cursor:'pointer', border:`2px solid ${BR}`, transition:'all 160ms', fontFamily:'inherit' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.borderColor=P; (e.currentTarget as HTMLButtonElement).style.color=P; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.borderColor=BR; (e.currentTarget as HTMLButtonElement).style.color=PD; }}>
                See our work ↓
              </button>
            </div>
          </div>

          {/* Right: phone stack — bigger */}
          <div className="mkt-hidden-mobile mkt-phones-in" style={{ flex:'0 0 auto', display:'flex', alignItems:'center', position:'relative' }}>
            <div style={{ position:'absolute', inset:-80, background:`radial-gradient(circle, rgba(124,1,255,0.22) 0%, transparent 68%)`, pointerEvents:'none' }} />
            <div style={{ display:'flex', alignItems:'center', gap:0, position:'relative' }}>
              <div className="mkt-float-a" style={{ marginTop:56, marginRight:-20, zIndex:1 }}>
                <Phone phone={PHONES[0]} rotate={-9} scale={1.1} videoSrc="/videos/hero1.mov" />
              </div>
              <div className="mkt-float-b" style={{ zIndex:3 }}>
                <Phone phone={PHONES[2]} rotate={0} scale={1.38} videoSrc="/videos/hero2.mov" />
              </div>
              <div className="mkt-float-c" style={{ marginTop:56, marginLeft:-20, zIndex:1 }}>
                <Phone phone={PHONES[4]} rotate={9} scale={1.1} videoSrc="/videos/hero3.mov" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip at bottom — purple panel */}
        <div ref={statsRef} style={{ position:'absolute', bottom:0, left:0, right:0, borderTop:'1px solid rgba(255,255,255,0.08)', background:PD }}>
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'22px 28px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:12 }}>
            {([
              { n:200,  suffix:'M+', label:'Organic views',  c:YEL  },
              { n:15,   suffix:'M+', label:'Likes',          c:MAG  },
              { n:150,  suffix:'+',  label:'Creators',       c:GRN  },
              { n:3000, suffix:'+',  label:'Content pieces', c:WH },
            ] as {n:number;suffix:string;label:string;c:string;fmt?:(v:number)=>string}[]).map((s,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ ...DISP, fontSize:'clamp(22px,2.4vw,34px)', fontWeight:800, color:s.c, letterSpacing:'-.05em', lineHeight:1 }}>
                  <StatCounter target={s.n} suffix={s.suffix} active={statsActive} fmt={s.fmt} />
                </div>
                <div style={{ fontSize:10, color:'rgba(255,253,237,0.45)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY BRANDS ════════════════════════════════ */}
      <div style={{ background:BG, padding:'36px 0 20px', borderBottom:`2px solid ${BR}` }}>
        <div style={{ fontSize:10, fontWeight:800, color:SU, letterSpacing:'.14em', textTransform:'uppercase', textAlign:'center', marginBottom:20 }}>Trusted by brands including:</div>
        <div style={{ overflow:'hidden' }}>
          <div className="mkt-ticker" style={{ display:'flex', whiteSpace:'nowrap', width:'max-content', alignItems:'center', gap:0 }}>
            {[...CLIENT_LOGOS,...CLIENT_LOGOS].map((logo,i)=>(
              <div key={i} style={{ display:'inline-flex', alignItems:'center', padding:'0 48px', flexShrink:0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/${logo}.png`} alt="" height={150} style={{ height:150, width:'auto', filter:'brightness(0) opacity(0.28)', objectFit:'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HALL OF FAME ══════════════════════════════════════ */}
      <section id="hall-of-fame" style={{ padding:'100px 0 120px', background:PD, position:'relative', overflow:'hidden' }}>
        {/* Big colourful gradient circles scattered behind everything */}
        {[
          { size:480, color:P,    opacity:0.28, top:'-15%', left:'5%',   cls:'mkt-orb-a' },
          { size:380, color:MAG,  opacity:0.24, top:'20%',  right:'-4%', cls:'mkt-orb-b' },
          { size:320, color:YEL,  opacity:0.26, bottom:'5%',left:'35%',  cls:'mkt-orb-c' },
        ].map((o,i)=>(
          <div key={i} className={o.cls} style={{ position:'absolute', width:o.size, height:o.size, borderRadius:'50%', background:`radial-gradient(circle, ${o.color}CC 0%, ${o.color}AA 60%, ${o.color}22 85%, transparent 100%)`, opacity:o.opacity, filter:'blur(3px)', top:o.top, bottom:(o as any).bottom, left:(o as any).left, right:(o as any).right, pointerEvents:'none' }} />
        ))}

        {/* Heading */}
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px', marginBottom:56, position:'relative', zIndex:1 }}>
          <div data-reveal>
            <span style={{ display:'inline-block', background:YEL, color:PD, ...DISP, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:20 }}>Hall of fame</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.5vw,66px)', fontWeight:800, letterSpacing:'-.055em', color:WH, marginBottom:0 }}>
              Take a look at the{' '}
              <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">work</em>
              {' '}we do best.
            </h2>
          </div>
        </div>

        {/* Auto-scrolling full-width carousel — no overflow clip on section */}
        <div style={{ overflow:'hidden', position:'relative', zIndex:1 }}>
          <div className="mkt-hof-scroll" style={{ display:'flex', gap:18, width:'max-content', padding:'8px 0 20px' }}>
            {/* render cards twice for seamless loop */}
            {[...(hofCards
              ? hofCards.map((r,i) => ({ key:`a${i}`, card:{ contentType:r.contentType||'', distribution:r.distribution||'Organic', clientName:r.clientName||'', clientLogoColor:r.clientLogoColor||P, viewCount:r.viewCount||'' }, videoSrc:r.src||undefined, poster:r.poster }))
              : HOF_DEFAULTS.map((card,i) => ({ key:`a${i}`, card, videoSrc:card.videoSrc, poster:undefined as string|undefined }))
            ), ...(hofCards
              ? hofCards.map((r,i) => ({ key:`b${i}`, card:{ contentType:r.contentType||'', distribution:r.distribution||'Organic', clientName:r.clientName||'', clientLogoColor:r.clientLogoColor||P, viewCount:r.viewCount||'' }, videoSrc:r.src||undefined, poster:r.poster }))
              : HOF_DEFAULTS.map((card,i) => ({ key:`b${i}`, card, videoSrc:card.videoSrc, poster:undefined as string|undefined }))
            )].map(({key,card,videoSrc,poster}) => (
              <div key={key} style={{ flexShrink:0 }}>
                <HofCard card={card} videoSrc={videoSrc} poster={poster} />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ══ CHALLENGES ════════════════════════════════════════ */}
      <section style={{ padding:'110px 28px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:380, color:P,   opacity:0.16, cls:'mkt-orb-a', top:'-5%',   right:'-5%' },
          { size:260, color:YEL, opacity:0.50, cls:'mkt-orb-e', top:'35%',   right:'10%' },
          { size:220, color:MAG, opacity:0.18, cls:'mkt-orb-c', bottom:'5%', left:'-3%'  },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ maxWidth:640, marginBottom:64 }}>
            <span style={{ display:'inline-block', background:YEL, color:PD, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>The challenge</span>
            <h2 style={{ ...DISP, fontSize:'clamp(30px,4vw,58px)', fontWeight:800, letterSpacing:'-.055em', color:PD, lineHeight:1.05 }}>
              Brands face <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">3 core challenges</em> when trying to grow on social.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(290px,1fr))', gap:20 }}>
            {CHALLENGES.map((c,i)=>(
              <div key={i} data-reveal data-reveal-delay={String(i*0.12)} style={{ padding:'40px 36px', background:c.bg, border:`2px solid ${c.border}`, borderRadius:22, transition:'transform 200ms ease' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-5px)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; }}>
                <div style={{ ...DISP, width:40, height:40, borderRadius:12, background:c.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#fff', fontWeight:800, marginBottom:22 }}>{c.n}</div>
                <h3 style={{ ...DISP, fontSize:21, fontWeight:800, letterSpacing:'-.04em', color:PD, marginBottom:14, lineHeight:1.2 }}>{c.title}</h3>
                <p style={{ fontSize:15, color:MU, lineHeight:1.85, fontWeight:400 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW WE HELP ══════════════════════════════════════ */}
      <section style={{ padding:'110px 28px', background:WH, borderTop:`2px solid ${BR}`, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:420, color:MAG, opacity:0.16, cls:'mkt-orb-b', top:'-10%', left:'-6%'  },
          { size:300, color:YEL, opacity:0.48, cls:'mkt-orb-a', top:'45%',  left:'3%'   },
          { size:260, color:P,   opacity:0.16, cls:'mkt-orb-d', bottom:'0%',right:'-5%' },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ textAlign:'center', marginBottom:72 }}>
            <span style={{ display:'inline-block', background:'rgba(124,1,255,0.09)', color:P, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>Why us</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:PD }}>Your unfair advantage on <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">social.</em></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:20 }}>
            {HOW_WE_HELP.map((h,i)=>(
              <div key={i} data-reveal data-reveal-delay={String(i*0.1)} style={{ padding:'40px 32px', background:BG, border:`2px solid ${BR}`, borderRadius:22, transition:'transform 220ms ease, box-shadow 220ms ease' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 20px 54px rgba(33,0,93,0.09)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
                <div style={{ fontSize:32, marginBottom:22 }}>{h.icon}</div>
                <h3 style={{ ...DISP, fontSize:20, fontWeight:800, letterSpacing:'-.04em', color:PD, marginBottom:14 }}>{h.title}</h3>
                <p style={{ fontSize:15, color:MU, lineHeight:1.85, fontWeight:400 }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding:'110px 28px', background:PD, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:360, color:GRN, opacity:0.22, cls:'mkt-orb-a', bottom:'5%', left:'-4%'  },
          { size:300, color:YEL, opacity:0.32, cls:'mkt-orb-h', bottom:'20%',right:'10%' },
          { size:280, color:P,   opacity:0.20, cls:'mkt-orb-e', top:'-8%',   right:'-4%' },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ marginBottom:72 }}>
            <span style={{ display:'inline-block', background:'rgba(8,246,131,0.22)', color:GRN, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>How it works</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:WH }}>A simple process, <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">powerful results.</em></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>
            {/* Steps */}
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {STEPS.map((s,i)=>(
                <div key={i} data-reveal data-reveal-delay={String(i*0.14)} style={{ padding:'32px 0', borderBottom: i<STEPS.length-1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontWeight:700, letterSpacing:'.1em', marginBottom:10 }}>{s.n}</div>
                  <h3 style={{ ...DISP, fontSize:22, fontWeight:800, letterSpacing:'-.045em', color:WH, marginBottom:12 }}>{s.title}</h3>
                  <p style={{ fontSize:15, color:'rgba(255,253,237,0.55)', lineHeight:1.85, fontWeight:400 }}>{s.body}</p>
                </div>
              ))}
            </div>
            {/* Creator headshot collage */}
            <div className="mkt-hidden-mobile" data-reveal data-reveal-delay="0.2" style={{ position:'relative', width:'100%', maxWidth:560, margin:'0 auto' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/creators-collage.png" alt="Creator network" style={{ width:'100%', objectFit:'contain', display:'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════ */}
      <section id="services" style={{ padding:'110px 28px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:400, color:MAG, opacity:0.16, cls:'mkt-orb-e', bottom:'5%',left:'-5%'  },
          { size:320, color:YEL, opacity:0.46, cls:'mkt-orb-b', top:'38%',  left:'1%'   },
          { size:280, color:P,   opacity:0.16, cls:'mkt-orb-c', top:'-10%', right:'-5%' },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ marginBottom:64 }}>
            <span style={{ display:'inline-block', background:'rgba(232,32,164,0.1)', color:MAG, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>Services</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:PD }}>Content formats that <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">drive results.</em></h2>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      {/* ══ CASE STUDIES ══════════════════════════════════════ */}
      <section id="cases" style={{ padding:'110px 28px', background:WH, borderTop:`2px solid ${BR}`, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:380, color:PB,  opacity:0.16, cls:'mkt-orb-d', top:'-8%',   right:'-5%' },
          { size:280, color:YEL, opacity:0.45, cls:'mkt-orb-b', top:'45%',   left:'3%'   },
          { size:220, color:MAG, opacity:0.18, cls:'mkt-orb-f', bottom:'5%', left:'-3%'  },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ marginBottom:72 }}>
            <span style={{ display:'inline-block', background:'rgba(124,1,255,0.09)', color:P, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>Case studies</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:PD }}>See what <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">we've done.</em></h2>
          </div>
          <CasesCarousel />
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════ */}
      <section id="pricing" style={{ padding:'110px 28px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:420, color:P,   opacity:0.16, cls:'mkt-orb-b', top:'-10%',  right:'-6%' },
          { size:300, color:YEL, opacity:0.50, cls:'mkt-orb-f', top:'48%',   left:'3%'   },
          { size:240, color:MAG, opacity:0.16, cls:'mkt-orb-d', bottom:'4%', left:'-5%'  },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ textAlign:'center', marginBottom:72 }}>
            <span style={{ display:'inline-block', background:YEL, color:PD, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>Pricing</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:PD, marginBottom:14 }}>Flexible packages built for <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">growth.</em></h2>
            <p style={{ fontSize:16, color:MU, fontWeight:400 }}>Choose organic, paid, or a combined package depending on your goals. Every retainer is tailored to your brand.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(290px,1fr))', gap:20, alignItems:'start' }}>
            {PLANS.map((plan,i)=>(
              <div key={i} data-reveal data-reveal-delay={String(i*0.1)} style={{ padding:'44px 40px', border:plan.hero?'none':`2px solid ${BR}`, borderRadius:26, background:plan.hero?`linear-gradient(150deg,${PD} 0%,${P} 100%)`:WH, position:'relative', boxShadow:plan.hero?'0 24px 64px rgba(33,0,93,0.35)':'none', transition:'transform 220ms ease' }}
                onMouseEnter={e=>{ if(!plan.hero)(e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; }}>
                {plan.tag&&<span style={{ position:'absolute', top:-14, left:36, background:YEL, ...DISP, color:PD, fontSize:11, fontWeight:800, padding:'4px 18px', borderRadius:20, letterSpacing:'.04em' }}>{plan.tag}</span>}
                <div style={{ ...DISP, fontSize:10, fontWeight:800, color:plan.hero?'rgba(255,253,237,0.45)':SU, marginBottom:14, letterSpacing:'.12em', textTransform:'uppercase' }}>{plan.name}</div>
                <p style={{ fontSize:14, color:plan.hero?'rgba(255,253,237,0.6)':MU, lineHeight:1.8, marginBottom:32, fontWeight:400 }}>{plan.desc}</p>
                <div style={{ borderTop:`1px solid ${plan.hero?'rgba(255,253,237,0.12)':BR}`, paddingTop:28, marginBottom:36, display:'flex', flexDirection:'column', gap:14 }}>
                  {plan.features.map((f,j)=>(
                    <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:plan.hero?'rgba(255,253,237,0.72)':MU, fontWeight:400 }}>
                      <span style={{ color:plan.hero?GRN:P, flexShrink:0, fontWeight:800, fontSize:12, marginTop:2 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href="#contact" style={{ display:'block', textAlign:'center', padding:'17px', borderRadius:14, textDecoration:'none', background:plan.hero?YEL:P, color:plan.hero?PD:'#fff', ...DISP, fontSize:14, fontWeight:800, transition:'all 160ms' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.opacity='.88'; (e.currentTarget as HTMLElement).style.transform='translateY(-1px)'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.opacity='1'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:32 }}>
            <p style={{ fontSize:14, color:MU }}>Retainers start at £2,500/mo (ex. VAT). Every retainer is tailored to your brand.</p>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
      <section id="testimonials" style={{ padding:'110px 28px', background:WH, borderTop:`2px solid ${BR}`, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:380, color:MAG,  opacity:0.16, cls:'mkt-orb-c', bottom:'5%', right:'-4%' },
          { size:280, color:YEL,  opacity:0.48, cls:'mkt-orb-e', top:'33%',   right:'4%'  },
          { size:260, color:P,    opacity:0.16, cls:'mkt-orb-g', top:'-8%',   left:'-5%'  },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ textAlign:'center', marginBottom:72 }}>
            <span style={{ display:'inline-block', background:'rgba(232,32,164,0.1)', color:MAG, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>Testimonials</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:PD }}>Don't take <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">our word</em> for it.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:20 }}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} data-reveal data-reveal-delay={String(i*0.09)} style={{ padding:'36px', background:BG, border:`2px solid ${BR}`, borderRadius:26, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', transition:'transform 220ms ease, box-shadow 220ms ease' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-7px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 24px 64px rgba(33,0,93,0.1)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:t.g }} />
                <div style={{ ...DISP, fontSize:52, lineHeight:1, marginBottom:16, marginTop:8, background:t.g, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:800 }}>"</div>
                <p style={{ fontSize:14, color:PD, lineHeight:1.9, marginBottom:24, flex:1, fontStyle:'italic', fontWeight:400 }}>{t.quote}</p>
                <div style={{ borderTop:`1.5px solid ${BR}`, paddingTop:20, display:'flex', alignItems:'center', gap:12 }}>
                  {t.logoSrc ? (
                    <div style={{ width:44, height:44, borderRadius:'50%', background:t.logoBg||WH, border:`1.5px solid ${BR}`, flexShrink:0, overflow:'hidden' }}>
                      <img src={t.logoSrc} alt="" style={{ width:'100%', height:'100%', objectFit:'contain', transform:`scale(${t.logoScale||1.8})`, transformOrigin:'center' }} />
                    </div>
                  ) : (
                    <div style={{ width:44, height:44, borderRadius:'50%', background:t.g, display:'flex', alignItems:'center', justifyContent:'center', ...DISP, fontSize:13, fontWeight:800, color:'#fff', flexShrink:0 }}>{t.initials}</div>
                  )}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ ...DISP, fontSize:13, fontWeight:800, color:PD }}>{t.name}</div>
                    <div style={{ fontSize:12, color:MU, marginTop:2, fontWeight:400 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section style={{ padding:'110px 28px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:320, color:P,   opacity:0.16, cls:'mkt-orb-c', top:'-8%',   right:'-4%' },
          { size:240, color:YEL, opacity:0.48, cls:'mkt-orb-a', top:'33%',   left:'3%'   },
        ]} />
        <div style={{ maxWidth:740, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div data-reveal style={{ textAlign:'center', marginBottom:68 }}>
            <span style={{ display:'inline-block', background:'rgba(124,1,255,0.09)', color:P, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:18 }}>FAQ</span>
            <h2 style={{ ...DISP, fontSize:'clamp(28px,3.8vw,56px)', fontWeight:800, letterSpacing:'-.055em', color:PD }}>Common questions</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {FAQS.map((f,i)=>(
              <div key={i} data-reveal data-reveal-delay={String(i*0.07)} style={{ border:`2px solid ${faq===i?P:BR}`, borderRadius:18, overflow:'hidden', background:faq===i?'rgba(124,1,255,0.04)':BG, transition:'all 200ms' }}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 28px', background:'none', border:'none', color:PD, ...DISP, fontSize:15, fontWeight:700, cursor:'pointer', textAlign:'left', gap:16, fontFamily:'inherit' }}>
                  <span>{f.q}</span>
                  <span style={{ color:P, fontSize:26, flexShrink:0, transition:'transform 220ms', transform:faq===i?'rotate(45deg)':'none', display:'inline-block', fontWeight:300, lineHeight:1 }}>+</span>
                </button>
                {faq===i&&<div className="mkt-faq-open" style={{ padding:'0 28px 24px', fontSize:15, color:MU, lineHeight:1.9, fontWeight:400 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section id="contact" style={{ padding:'110px 28px', background:`linear-gradient(150deg,${PD} 0%,${P} 100%)`, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:460, color:P,    opacity:0.22, cls:'mkt-orb-a', top:'-18%',   right:'4%'    },
          { size:340, color:MAG,  opacity:0.18, cls:'mkt-orb-b', bottom:'-16%',left:'6%'     },
          { size:220, color:YEL,  opacity:0.24, cls:'mkt-orb-d', top:'30%',    right:'16%'   },
        ]} />
        <div data-reveal style={{ maxWidth:820, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span style={{ display:'inline-block', background:YEL, color:PD, ...DISP, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:24 }}>Ready to grow?</span>
            <h2 style={{ ...DISP, fontSize:'clamp(32px,4.2vw,62px)', fontWeight:800, letterSpacing:'-.055em', color:'#fff', marginBottom:18, lineHeight:1.05 }}>
              Want to see what this could{' '}
              <em style={{ fontStyle:'italic', paddingRight:4 }} className="mkt-gradient-text">look like for your brand?</em>
            </h2>
            <p style={{ fontSize:17, color:'rgba(255,253,237,0.52)', lineHeight:1.8, fontWeight:400 }}>Book a free strategy call with our team and find out what this could look like for you.</p>
          </div>
          <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.25)' }}>
            <iframe
              src="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-?embed=true"
              title="Book a discovery call"
              style={{ width:'100%', height:700, border:'none', display:'block' }}
            />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ padding:'52px 28px', background:PD, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:200, color:P,   opacity:0.15, cls:'mkt-orb-c', top:'-20%', right:'5%'   },
          { size:100, color:MAG, opacity:0.12, cls:'mkt-orb-e', bottom:'-10%',left:'10%' },
          { size:50,  color:YEL, opacity:0.20, cls:'mkt-orb-a', top:'30%',   left:'40%'  },
        ]} />
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24, paddingBottom:36, borderBottom:`1px solid rgba(255,253,237,0.1)`, marginBottom:28 }}>
            <div>
              <div style={{ ...DISP, fontSize:20, fontWeight:800, color:WH, letterSpacing:'-.03em', marginBottom:5 }}>The Social Vision</div>
              <div style={{ fontSize:13, color:'rgba(255,253,237,0.38)', fontWeight:400 }}>Short-form content for brands that want to grow.</div>
            </div>
            <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
              {(['How it works','Services','Case Studies','Pricing','Testimonials'] as string[]).map(l=>(
                <a key={l} href="#" style={{ fontSize:13, color:'rgba(255,253,237,0.45)', textDecoration:'none', fontWeight:600, transition:'color 150ms' }}
                  onMouseEnter={e=>(e.currentTarget.style.color=YEL)} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,253,237,0.45)')}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ fontSize:12, color:'rgba(255,253,237,0.22)', fontWeight:400 }}>© 2025 The Social Vision. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
