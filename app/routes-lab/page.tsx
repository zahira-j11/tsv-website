'use client';
/**
 * TEMPORARY design lab for the two-route picker. Delete once a direction is
 * chosen — nothing links to it.
 */
import { useState } from 'react';

const BG='#FEFDF8', WH='#FFFFFF', P='#7C01FF', PB='#A200FF', PD='#21005D';
const MAG='#E820A4', GRN='#08F683', YEL='#FFD600';
const MU='rgba(33,0,93,0.52)', SU='rgba(33,0,93,0.28)', BR='#E4DCFF';
const DISP: React.CSSProperties = { fontFamily:'var(--font-display)' };

const CLD='https://res.cloudinary.com/dbjelnbfj/video/upload/q_auto,f_auto/';
const poster=(p:string)=>(CLD+p).replace(/\.(mp4|mov|webm)$/,'.jpg').replace('f_auto,','');
const HABITO='v1782048070/tsv-website/habito-street.mp4';
const PLUM='v1782048297/tsv-website/plum-scripted.mp4';
const UNI='v1782048505/tsv-website/unicompare-street.mp4';
const PREP='v1782048333/tsv-website/prepkitchen-ugc.mp4';
const LOGOS=['/logos/habito.png','/logos/plum.png','/logos/unicompare.png','/logos/applicaa.png','/logos/blackbullion.png','/logos/prepkitchen.png'];

const HIRE={ eyebrow:'Ready to work together?', title:'I want to work with The Social Vision',
  body:'Already looking for a social content partner? Let’s talk through what you’re looking to achieve and see what working together could look like.',
  meta:'30–45 minute discovery call', cta:'Book a Discovery Call',
  bullets:['Your goals and current social setup','The content and service we’d recommend','Relevant examples and results','Scope, pricing and timelines'],
  foot:'Monthly partnerships from £2,500 + VAT' };
const AUDIT={ eyebrow:'Want to improve your social?', title:'Get a FREE Social Media Audit',
  body:'We’ll analyse your content, competitors and paid ads before we meet, then show you exactly what we’d change.',
  meta:'60-minute personalised audit', cta:'Secure Your Free Audit',
  bullets:['Organic social review','Competitor and category analysis','Paid creative review','Personalised 90-day roadmap'],
  foot:'Only 7 spots available for September' };

/* ---------- image options ---------- */
const ImgThreeUp=()=>(
  <div style={{display:'flex',gap:8}}>{[HABITO,PLUM,UNI].map(v=>(
    <div key={v} style={{flex:1,aspectRatio:'9/16',borderRadius:10,overflow:'hidden',background:'rgba(33,0,93,0.06)'}}>
      <img src={poster(v)} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/></div>))}</div>);
const ImgOneWide=({v}:{v:string})=>(
  <div style={{aspectRatio:'16/10',borderRadius:12,overflow:'hidden',background:'rgba(33,0,93,0.06)'}}>
    <img src={poster(v)} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/></div>);
const ImgLogos=()=>(
  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,padding:'16px 12px',background:'rgba(33,0,93,0.03)',borderRadius:12}}>
    {LOGOS.map(l=><div key={l} style={{height:26,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img src={l} alt="" style={{maxHeight:'100%',maxWidth:'100%',objectFit:'contain',filter:'grayscale(1)',opacity:.55}}/></div>)}</div>);
const ImgStat=()=>(
  <div style={{display:'flex',gap:8}}>{[['200M+','views'],['150+','creators'],['8mo','to 25M']].map(([n,l])=>(
    <div key={l} style={{flex:1,textAlign:'center',padding:'16px 8px',background:'rgba(33,0,93,0.03)',borderRadius:12}}>
      <div style={{...DISP,fontSize:20,fontWeight:800,color:PD,lineHeight:1}}>{n}</div>
      <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:SU,marginTop:5}}>{l}</div></div>))}</div>);
const ImgNone=()=>null;

/* ---------- card renderer ---------- */
type Tone='light'|'dark';
function Card({d,tone,accent,img,ctaFilled,badge}:{d:typeof HIRE;tone:Tone;accent:string;img:React.ReactNode;ctaFilled:boolean;badge?:string}){
  const dark = tone==='dark';
  const ink = dark ? '#fff' : PD;
  const soft = dark ? 'rgba(255,253,237,0.6)' : MU;
  const line = dark ? 'rgba(255,255,255,0.14)' : BR;
  return (
    <div style={{position:'relative',display:'flex',flexDirection:'column',padding:'34px 30px 30px',borderRadius:24,
      background: dark?PD:WH, border:`1.5px solid ${dark?'rgba(255,255,255,0.12)':BR}`,
      boxShadow: dark?'0 20px 56px rgba(0,0,0,0.3)':'0 14px 44px rgba(33,0,93,0.12)'}}>
      {badge && <span style={{position:'absolute',top:-12,right:26,background:YEL,color:PD,...DISP,fontSize:10.5,fontWeight:800,padding:'5px 14px',borderRadius:20}}>{badge}</span>}
      <div style={{...DISP,fontSize:10,fontWeight:800,letterSpacing:'.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>{d.eyebrow}</div>
      <h3 style={{...DISP,fontSize:21,fontWeight:800,letterSpacing:'-.04em',color:ink,lineHeight:1.24,marginBottom:11}}>{d.title}</h3>
      <p style={{fontSize:14.5,color:soft,lineHeight:1.75,marginBottom:16}}>{d.body}</p>
      <div style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:12,fontWeight:700,color:accent,marginBottom:18}}>
        <span style={{width:5,height:5,borderRadius:'50%',background:accent}}/>{d.meta}</div>
      {img && <div style={{marginBottom:20}}>{img}</div>}
      <div style={{borderTop:`1px solid ${line}`,paddingTop:18,marginBottom:20,display:'flex',flexDirection:'column',gap:10}}>
        {d.bullets.map(b=><div key={b} style={{display:'flex',gap:9,fontSize:13.5,color:soft,lineHeight:1.55}}>
          <span style={{color:accent,fontWeight:800,fontSize:11,marginTop:2}}>✓</span>{b}</div>)}
      </div>
      <div style={{marginTop:'auto'}}>
        <p style={{fontSize:12,fontWeight:700,color:dark?'rgba(255,253,237,0.5)':SU,marginBottom:14}}>{d.foot}</p>
        <div style={{display:'block',textAlign:'center',padding:'15px',borderRadius:13,...DISP,fontSize:13.5,fontWeight:800,
          background: ctaFilled?accent:'transparent', color: ctaFilled?'#fff':ink,
          border: ctaFilled?'none':`2px solid ${dark?'rgba(255,255,255,0.28)':BR}`}}>{d.cta}</div>
      </div>
    </div>);
}

const TREATMENTS = [
  { n:'A', name:'Twin neutral — one accent',
    note:'Identical framing, one purple accent on both. Nothing signals that either route is preferred; the eyebrow does all the steering. Three-up client frames on the left, one wide frame on the right.',
    left:<Card d={HIRE} tone="light" accent={P} img={<ImgThreeUp/>} ctaFilled/>,
    right:<Card d={AUDIT} tone="light" accent={P} img={<ImgOneWide v={PREP}/>} ctaFilled badge="Worth £750"/> },
  { n:'B', name:'Split tone — light vs dark',
    note:'Equal weight through contrast rather than hierarchy. Neither is louder, they are simply different. Logos as proof on the left, real content on the right.',
    left:<Card d={HIRE} tone="light" accent={P} img={<ImgLogos/>} ctaFilled/>,
    right:<Card d={AUDIT} tone="dark" accent={YEL} img={<ImgOneWide v={PREP}/>} ctaFilled badge="Worth £750"/> },
  { n:'C', name:'Both dark',
    route:true,
    note:'Both cards navy on the purple section. Feels the most premium and stops the white cards fighting the background. Accents differentiate: yellow for hire, green for audit.',
    left:<Card d={HIRE} tone="dark" accent={YEL} img={<ImgThreeUp/>} ctaFilled/>,
    right:<Card d={AUDIT} tone="dark" accent={GRN} img={<ImgOneWide v={PREP}/>} ctaFilled badge="Worth £750"/> },
  { n:'D', name:'No images — type only',
    note:'Strips the visuals entirely. Fastest to read, impossible to look cluttered, and both routes are unarguably equal. Results stats stand in for the imagery on the left.',
    left:<Card d={HIRE} tone="light" accent={P} img={<ImgNone/>} ctaFilled/>,
    right:<Card d={AUDIT} tone="light" accent={P} img={<ImgNone/>} ctaFilled badge="Worth £750"/> },
  { n:'E', name:'Proof vs product',
    note:'Each card shows the thing that actually persuades its audience: results for people ready to buy, real content for people who want a read on theirs.',
    left:<Card d={HIRE} tone="light" accent={P} img={<ImgStat/>} ctaFilled/>,
    right:<Card d={AUDIT} tone="light" accent={MAG} img={<ImgOneWide v={HABITO}/>} ctaFilled badge="Worth £750"/> },
];

const COPY = {
  'Card 1 — eyebrow':['Ready to work together?','Hire us','For brands ready to commit','Option 1 · Partnership','You know what you need'],
  'Card 1 — heading':['I want to work with The Social Vision','Let’s talk about working together','Ready to hire a content partner','Become a client','Let’s build your content engine'],
  'Card 1 — CTA':['Book a Discovery Call','Talk to us','Start the conversation','See if we’re a fit'],
  'Card 2 — eyebrow':['Want to improve your social?','Not sure yet?','For brands exploring','Option 2 · Free audit','Start with the diagnosis'],
  'Card 2 — heading':['Get a FREE Social Media Audit','See what we’d change about your social','Get your free 90-day roadmap','Find out what’s holding your social back','A free read on your social'],
  'Card 2 — CTA':['Secure Your Free Audit','Claim my free audit','Get my roadmap','Apply for an audit'],
};

export default function RoutesLab(){
  const [dark,setDark]=useState(true);
  return (
    <div style={{fontFamily:'var(--font-sans)',color:PD,background:BG,minHeight:'100vh'}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'36px 28px 90px'}}>
        <h1 style={{...DISP,fontSize:26,letterSpacing:'-.04em',margin:'0 0 6px'}}>Route cards — options</h1>
        <p style={{fontSize:13.5,color:MU,lineHeight:1.6,margin:'0 0 18px',maxWidth:820}}>
          Five treatments, all equally weighted so neither route is pushed. Real fonts, real client frames. Copy alternatives at the bottom.
        </p>
        <button onClick={()=>setDark(!dark)} style={{fontSize:12,fontWeight:700,padding:'8px 14px',borderRadius:100,border:`1.5px solid ${BR}`,background:WH,color:PD,cursor:'pointer',fontFamily:'inherit',marginBottom:30}}>
          Background: {dark?'purple section':'plain'} — click to toggle
        </button>

        {TREATMENTS.map(t=>(
          <div key={t.n} style={{marginBottom:44}}>
            <div style={{...DISP,fontSize:11,fontWeight:800,letterSpacing:'.12em',color:P,marginBottom:5}}>OPTION {t.n}</div>
            <h2 style={{...DISP,fontSize:18,fontWeight:800,letterSpacing:'-.02em',margin:'0 0 5px'}}>{t.name}</h2>
            <p style={{fontSize:12.5,color:MU,lineHeight:1.6,margin:'0 0 16px',maxWidth:880}}>{t.note}</p>
            <div style={{padding:dark?'34px 28px':'0',borderRadius:20,
              background:dark?`linear-gradient(150deg,${PD} 0%,${P} 100%)`:'transparent'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))',gap:18,alignItems:'stretch'}}>
                {t.left}{t.right}
              </div>
            </div>
          </div>
        ))}

        <h2 style={{...DISP,fontSize:20,fontWeight:800,letterSpacing:'-.03em',margin:'56px 0 14px'}}>Copy options</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16}}>
          {Object.entries(COPY).map(([k,v])=>(
            <div key={k} style={{background:WH,border:`1.5px solid ${BR}`,borderRadius:16,padding:'18px 20px'}}>
              <div style={{...DISP,fontSize:10,fontWeight:800,letterSpacing:'.1em',textTransform:'uppercase',color:SU,marginBottom:10}}>{k}</div>
              <ol style={{margin:0,paddingLeft:18,display:'flex',flexDirection:'column',gap:7}}>
                {v.map(o=><li key={o} style={{fontSize:13.5,color:PD,lineHeight:1.5}}>{o}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
