'use client';
/** TEMPORARY lab for card explainer graphics. Delete once chosen. */
const WH='#FFFFFF', P='#7C01FF', PD='#21005D', MAG='#E820A4', GRN='#08F683', YEL='#FFD600';
const MU='rgba(33,0,93,0.52)', SU='rgba(33,0,93,0.28)', BR='#E4DCFF', BG='#FEFDF8';
const D: React.CSSProperties = { fontFamily:'var(--font-display)' };

const Step=({e,l,s}:{e:string;l:string;s:string})=>(
  <div style={{flex:1,textAlign:'center',minWidth:0}}>
    <div style={{fontSize:22,lineHeight:1}}>{e}</div>
    <div style={{...D,fontSize:9,fontWeight:800,letterSpacing:'.08em',color:P,margin:'7px 0 3px'}}>{l}</div>
    <div style={{fontSize:10,color:MU,lineHeight:1.4}}>{s}</div>
  </div>);
const Arrow=()=><div style={{color:BR,fontSize:13,alignSelf:'flex-start',marginTop:8,flexShrink:0}}>→</div>;
const Frame=({children,cap}:{children:React.ReactNode;cap?:string})=>(
  <div style={{background:'rgba(124,1,255,0.035)',border:`1px solid ${BR}`,borderRadius:16,padding:'18px 14px 14px'}}>
    {children}
    {cap && <div style={{...D,fontSize:9.5,fontWeight:800,letterSpacing:'.06em',color:SU,textAlign:'center',marginTop:14,paddingTop:12,borderTop:`1px dashed ${BR}`}}>{cap}</div>}
  </div>);

/* ---------- DISCOVERY ---------- */
const D1=()=>(
  <Frame cap="END-TO-END SOCIAL CONTENT PRODUCTION">
    <div style={{display:'flex',alignItems:'flex-start',gap:4}}>
      <Step e="✅" l="YOU" s="Approve the plan"/><Arrow/>
      <Step e="💡" l="STRATEGY" s="We plan what performs"/><Arrow/>
      <Step e="🎬" l="PRODUCE" s="Cast, shoot, edit"/><Arrow/>
      <Step e="📲" l="POST" s="We post and optimise"/>
    </div>
  </Frame>);

const D2=()=>(
  <Frame>
    {[['💡','Strategy','We plan what will actually perform'],
      ['🎬','Production','We cast, shoot and edit it'],
      ['📲','Posting','We publish and optimise weekly']].map(([e,t,s],i)=>(
      <div key={t} style={{display:'flex',gap:12,alignItems:'flex-start',paddingBottom:i<2?14:0,marginBottom:i<2?14:0,borderBottom:i<2?`1px solid ${BR}`:'none'}}>
        <span style={{fontSize:19,lineHeight:1}}>{e}</span>
        <div><div style={{...D,fontSize:12.5,fontWeight:800,color:PD}}>{t}</div>
        <div style={{fontSize:11.5,color:MU,lineHeight:1.5,marginTop:2}}>{s}</div></div>
        <span style={{marginLeft:'auto',...D,fontSize:10,fontWeight:800,color:SU}}>0{i+1}</span>
      </div>))}
  </Frame>);

const D3=()=>(
  <Frame cap="ALL OFF YOUR PLATE">
    <div style={{...D,fontSize:10,fontWeight:800,letterSpacing:'.1em',color:SU,marginBottom:12}}>YOUR TO-DO LIST</div>
    {['Plan next month’s content','Find and brief creators','Book the shoot','Edit 12 videos','Write captions and post'].map(t=>(
      <div key={t} style={{display:'flex',alignItems:'center',gap:9,padding:'7px 0'}}>
        <span style={{width:15,height:15,borderRadius:4,background:P,color:'#fff',fontSize:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>✓</span>
        <span style={{fontSize:12,color:SU,textDecoration:'line-through'}}>{t}</span>
      </div>))}
  </Frame>);

const D4=()=>(
  <Frame>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      {[['Without us',['Posting when you remember','Chasing freelancers','Guessing what works'],SU,'rgba(33,0,93,0.04)'],
        ['With us',['A month planned ahead','One team, one contact','Formats proven to perform'],P,'rgba(124,1,255,0.06)']].map(([t,items,c,bg]:any)=>(
        <div key={t} style={{background:bg,borderRadius:12,padding:'13px 12px'}}>
          <div style={{...D,fontSize:10,fontWeight:800,letterSpacing:'.08em',color:c,marginBottom:9}}>{t.toUpperCase()}</div>
          {items.map((i:string)=><div key={i} style={{fontSize:11,color:MU,lineHeight:1.45,marginBottom:6}}>{i}</div>)}
        </div>))}
    </div>
  </Frame>);

/* ---------- AUDIT ---------- */
const A1=()=>(
  <Frame cap="BEFORE YOU EVEN ARRIVE">
    <div style={{display:'flex',alignItems:'flex-start',gap:6}}>
      <Step e="🔍" l="WE ANALYSE" s="Content, competitors, ads"/><Arrow/>
      <Step e="🗣️" l="WE MEET" s="60 minutes, findings live"/><Arrow/>
      <Step e="🗺️" l="YOU GET" s="A 90-day roadmap"/>
    </div>
  </Frame>);

const A2=()=>(
  <Frame cap="YOUR 90-DAY ROADMAP">
    {[['Days 1–30','Fix the hooks',P,'92%'],['Days 31–60','Test new formats',MAG,'64%'],['Days 61–90','Scale what wins','#0CB876','38%']].map(([d,t,c,w]:any)=>(
      <div key={d} style={{marginBottom:11}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
          <span style={{...D,fontSize:10,fontWeight:800,letterSpacing:'.06em',color:c}}>{d}</span>
          <span style={{fontSize:11,color:MU}}>{t}</span></div>
        <div style={{height:6,borderRadius:99,background:'rgba(33,0,93,0.06)'}}>
          <div style={{width:w,height:'100%',borderRadius:99,background:c}}/></div>
      </div>))}
  </Frame>);

const A3=()=>(
  <Frame cap="WHAT WE SCORE">
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
      {[['📊','Organic',P],['🔍','Competitors',MAG],['✨','Paid creative','#0CB876'],['🗺️','Roadmap','#B07800']].map(([e,t,c]:any)=>(
        <div key={t} style={{background:WH,border:`1px solid ${BR}`,borderRadius:11,padding:'12px 11px',display:'flex',alignItems:'center',gap:9}}>
          <span style={{fontSize:16}}>{e}</span>
          <span style={{...D,fontSize:11.5,fontWeight:800,color:PD}}>{t}</span>
          <span style={{marginLeft:'auto',width:7,height:7,borderRadius:'50%',background:c}}/>
        </div>))}
    </div>
  </Frame>);

const A4=()=>(
  <Frame cap="A WORKED EXAMPLE">
    {[['Hook','Buried at 0:04',P],['Retention','62% drop at the payoff',MAG],['CTA','No next step at all','#0CB876']].map(([l,s,c]:any)=>(
      <div key={l} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'8px 0',borderBottom:l!=='CTA'?`1px solid ${BR}`:'none'}}>
        <span style={{width:6,height:6,borderRadius:'50%',background:c,marginTop:5,flexShrink:0}}/>
        <div><span style={{...D,fontSize:10,fontWeight:800,letterSpacing:'.08em',color:c}}>{l.toUpperCase()}</span>
        <div style={{fontSize:11.5,color:MU,marginTop:2}}>{s}</div></div>
      </div>))}
  </Frame>);

const SETS=[
  {t:'Discovery — Option 1',n:'Four-step flow (closest to your reference)',
   note:'Your reference trimmed from six steps to four so it fits a half-width card. Same emoji-plus-label-plus-sub structure and the caption underneath.',c:<D1/>},
  {t:'Discovery — Option 2',n:'Vertical three-step',note:'Same idea turned vertical. Each step gets room to breathe and read properly, with numbering down the right.',c:<D2/>},
  {t:'Discovery — Option 3',n:'Struck-through to-do list',note:'Literally illustrates the heading: the jobs you currently do, all crossed off. My pick — it makes the promise visual rather than describing a process.',c:<D3/>},
  {t:'Discovery — Option 4',n:'Without us / With us',note:'Two columns contrasting the current state with the handed-over state. Persuasive, but the most words.',c:<D4/>},
  {t:'Audit — Option 1',n:'Three-step flow',note:'Mirrors the discovery flow, so both cards share a visual language. We analyse, we meet, you get the roadmap.',c:<A1/>},
  {t:'Audit — Option 2',n:'90-day roadmap timeline',note:'Shows the deliverable rather than the process — three 30-day blocks with what happens in each. My pick for this card.',c:<A2/>},
  {t:'Audit — Option 3',n:'Four scored areas',note:'The four things the audit covers, as a compact grid. Quiet and quick to scan.',c:<A3/>},
  {t:'Audit — Option 4',n:'A worked example',note:'Real findings from a real audit — hook, retention, CTA. Most concrete, but overlaps with the bullets above it.',c:<A4/>},
];

export default function ExplainerLab(){
  return (
    <div style={{fontFamily:'var(--font-sans)',background:BG,color:PD,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'36px 28px 90px'}}>
        <h1 style={{...D,fontSize:25,letterSpacing:'-.04em',margin:'0 0 6px'}}>Card explainers — options</h1>
        <p style={{fontSize:13,color:MU,lineHeight:1.6,margin:'0 0 32px',maxWidth:800}}>
          Each shown at the real card width (490px) inside a card shell, so you are judging it at the size it will actually appear.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(470px,1fr))',gap:22}}>
          {SETS.map(s=>(
            <div key={s.t}>
              <div style={{...D,fontSize:10.5,fontWeight:800,letterSpacing:'.1em',color:P,marginBottom:4}}>{s.t.toUpperCase()}</div>
              <h2 style={{...D,fontSize:16,fontWeight:800,letterSpacing:'-.02em',margin:'0 0 5px'}}>{s.n}</h2>
              <p style={{fontSize:12,color:MU,lineHeight:1.55,margin:'0 0 14px'}}>{s.note}</p>
              <div style={{width:490,maxWidth:'100%',background:WH,border:`2px solid ${BR}`,borderRadius:24,padding:'26px 24px'}}>{s.c}</div>
            </div>))}
        </div>
      </div>
    </div>);
}
