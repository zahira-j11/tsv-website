'use client';
/** TEMPORARY lab: card visual options. Delete once chosen. */
const WH='#FFFFFF', P='#7C01FF', PD='#21005D', MAG='#E820A4', BG='#FEFDF8';
const MU='rgba(33,0,93,0.52)', SU='rgba(33,0,93,0.28)', BR='#E4DCFF';
const PAPER='#FDFBF7', INK='#2B1A3D';
const PINK='#FBE4EE', MINT='#DFF3EA', LILAC='#EDE6FF', BUTTER='#FCF1D4';
const D: React.CSSProperties = { fontFamily:'var(--font-display)' };
const C='https://res.cloudinary.com/dbjelnbfj/video/upload/q_auto,f_auto/';
const f=(p:string)=>(C+p).replace(/\.(mp4|mov|webm)$/,'.jpg').replace('f_auto,','');
const V={habito:'v1782048070/tsv-website/habito-street.mp4',habito2:'v1782048063/tsv-website/habito-street-2.mp4',
 uni:'v1782048505/tsv-website/unicompare-street.mp4',prep:'v1782048333/tsv-website/prepkitchen-ugc.mp4',
 plum:'v1782048297/tsv-website/plum-scripted.mp4',ai:'v1782047854/tsv-website/aiapply-street.mp4',
 bb:'v1782047906/tsv-website/blackbullion-street.mp4',amb1:'v1782047871/tsv-website/ambassador-1.mp4',
 amb2:'v1782047876/tsv-website/ambassador-2.mp4',tr1:'v1782048398/tsv-website/trend-1.mp4',
 tr2:'v1782048410/tsv-website/trend-2.mp4',ex1:'v1782048782/tsv-website/explainer-1.mp4'};

const SHEET_H = 286;   // every option renders at exactly this height
const Sheet=({children}:{children:React.ReactNode})=>(
  <div style={{background:PAPER,borderRadius:14,border:'1px solid rgba(43,26,61,0.09)',
    boxShadow:'0 10px 26px rgba(43,26,61,0.10)',overflow:'hidden',
    height:SHEET_H,display:'flex',flexDirection:'column'}}>{children}</div>);
const Head=({t,s}:{t:string;s:string})=>(
  <div style={{background:INK,padding:'12px 14px'}}>
    <div style={{...D,fontSize:11,fontWeight:800,color:'#fff'}}>{t}</div>
    <div style={{fontSize:8,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,255,255,0.5)',marginTop:2}}>{s}</div></div>);
const Img=({v,h=64,r=7}:{v:string;h?:number;r?:number})=>(
  <div style={{height:h,borderRadius:r,overflow:'hidden',background:'rgba(43,26,61,0.06)'}}>
    <img src={f(v)} alt="" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/></div>);

/* ===== AUDIT ===== */
const A1=()=>(<Sheet><Head t="SOCIAL MEDIA AUDIT" s="YOUR BRAND"/>
  {[['CONTENT ANALYSIS','Your hooks are too slow to stop the scroll.',V.habito,'hook too slow',PINK],
    ['COMPETITOR GAP','They own this format. You are not in it.',V.uni,'opportunity',MINT],
    ['CONTENT OPPORTUNITY','Test first-person stories in this angle.',V.prep,'test this',LILAC]].map(([t,b,v,tag,bg]:any)=>(
    <div key={t} style={{display:'flex',gap:11,padding:'8px 13px',borderBottom:'1px solid rgba(43,26,61,0.07)'}}>
      <div style={{flex:1}}><div style={{...D,fontSize:9,fontWeight:800,letterSpacing:'.07em',color:INK}}>{t}</div>
        <p style={{fontSize:9.5,color:'rgba(43,26,61,0.6)',lineHeight:1.5,margin:'4px 0 0'}}>{b}</p></div>
      <div style={{position:'relative',flexShrink:0,width:40}}><Img v={v} h={50}/>
        <span style={{position:'absolute',top:12,left:-15,background:bg,fontSize:7,fontWeight:800,padding:'3px 5px',borderRadius:4,whiteSpace:'nowrap',color:INK}}>{tag}</span></div>
    </div>))}
  <div style={{padding:'11px 13px'}}><div style={{...D,fontSize:9,fontWeight:800,letterSpacing:'.07em',color:INK,marginBottom:8}}>90-DAY ROADMAP</div>
    <div style={{display:'flex'}}>{[['30','Foundation'],['60','Test'],['90','Scale']].map(([d,l],i)=>(
      <div key={d} style={{flex:1,display:'flex',alignItems:'center'}}>
        <div style={{textAlign:'center'}}><span style={{display:'block',width:8,height:8,borderRadius:'50%',background:P,margin:'0 auto 4px'}}/>
        <div style={{...D,fontSize:8,fontWeight:800,color:INK}}>{d} DAYS</div><div style={{fontSize:7,color:'rgba(43,26,61,0.5)'}}>{l}</div></div>
        {i<2&&<div style={{flex:1,height:1.5,background:'rgba(124,1,255,0.25)',margin:'0 5px 20px'}}/>}
      </div>))}</div></div></Sheet>);

const A2=()=>(<Sheet><Head t="AUDIT SCORECARD" s="WHERE YOU STAND TODAY"/>
  <div style={{padding:'13px',flex:1,minHeight:0}}>{[['Hooks','C',MAG,'Too slow — 4s before the point'],
    ['Retention','B−',P,'Drops at the payoff'],['Competitor share','D',MAG,'Absent from the winning format'],
    ['Paid creative','B','#0CB876','Strong, fatiguing fast']].map(([l,g,c,n]:any,i)=>(
    <div key={l} style={{display:'flex',alignItems:'center',gap:11,padding:'9px 0',borderBottom:i<3?'1px solid rgba(43,26,61,0.07)':'none'}}>
      <span style={{...D,width:30,height:30,borderRadius:8,background:c,color:'#fff',fontSize:12,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{g}</span>
      <div><div style={{...D,fontSize:11,fontWeight:800,color:INK}}>{l}</div>
      <div style={{fontSize:9.5,color:'rgba(43,26,61,0.55)',marginTop:1}}>{n}</div></div>
    </div>))}
  <div style={{marginTop:11,background:LILAC,borderRadius:9,padding:'9px 11px',...D,fontSize:9.5,fontWeight:800,color:INK}}>→ 90-day roadmap to fix all four</div>
  </div></Sheet>);

const A3=()=>(<Sheet><Head t="WHAT WE'D CHANGE" s="A WORKED EXAMPLE"/>
  <div style={{padding:'13px',display:'flex',gap:10,alignItems:'stretch'}}>
    {[['YOUR VERSION',V.prep,PINK,'Hook at 0:04'],['OUR VERSION',V.habito,MINT,'Hook at 0:00']].map(([l,v,bg,n]:any,i)=>(
      <div key={l} style={{flex:1}}>
        <div style={{...D,fontSize:8,fontWeight:800,letterSpacing:'.08em',color:'rgba(43,26,61,0.5)',marginBottom:6}}>{l}</div>
        <Img v={v} h={112}/>
        <div style={{background:bg,borderRadius:6,padding:'5px 7px',marginTop:6,fontSize:8.5,fontWeight:700,color:INK,textAlign:'center'}}>{n}</div>
        {i===0&&<div style={{position:'absolute'}}/>}
      </div>))}
  </div>
  <div style={{padding:'0 13px 13px'}}>{['Stronger hook in the first 2 seconds','Cut 3s of setup','Add the payoff to frame one'].map(t=>(
    <div key={t} style={{display:'flex',gap:7,fontSize:9.5,color:'rgba(43,26,61,0.62)',padding:'3px 0'}}>
      <span style={{color:P,fontWeight:800}}>✓</span>{t}</div>))}</div></Sheet>);

const A4=()=>(<Sheet><Head t="YOUR 90-DAY ROADMAP" s="WHAT YOU WALK AWAY WITH"/>
  <div style={{padding:'13px',flex:1,minHeight:0}}>{[['DAYS 1–30','Foundation',P,['Rebuild hooks','Fix posting cadence']],
    ['DAYS 31–60','Test & optimise',MAG,['3 new formats','Cut what underperforms']],
    ['DAYS 61–90','Scale winners','#0CB876',['Double down','Feed paid with winners']]].map(([d,t,c,items]:any,i)=>(
    <div key={d} style={{display:'flex',gap:10,paddingBottom:i<2?12:0,marginBottom:i<2?12:0,borderBottom:i<2?'1px solid rgba(43,26,61,0.07)':'none'}}>
      <div style={{width:3,borderRadius:9,background:c,flexShrink:0}}/>
      <div style={{flex:1}}><div style={{...D,fontSize:8.5,fontWeight:800,letterSpacing:'.08em',color:c}}>{d}</div>
      <div style={{...D,fontSize:11,fontWeight:800,color:INK,margin:'2px 0 5px'}}>{t}</div>
      {items.map((x:string)=><div key={x} style={{fontSize:9.5,color:'rgba(43,26,61,0.58)',lineHeight:1.5}}>• {x}</div>)}</div>
    </div>))}</div></Sheet>);

/* ===== DISCOVERY ===== */
const B1=()=>(<Sheet><Head t="CONTENT CALENDAR" s="PLANNED, FILMED, POSTED BY US"/>
  <div style={{padding:'12px 13px 13px',flex:1,minHeight:0}}>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5,marginBottom:7}}>
      {['WEEK 1','WEEK 2','WEEK 3','WEEK 4'].map(w=><div key={w} style={{...D,fontSize:7.5,fontWeight:800,color:'rgba(43,26,61,0.45)',textAlign:'center'}}>{w}</div>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5}}>
      {[['UGC',PINK],['Street',MINT],['How-To',LILAC],['BTS',BUTTER],['Listicle',LILAC],['POV',PINK],['Myth',MINT],['React',BUTTER]].map(([l,bg]:any,i)=>(
        <div key={i} style={{background:bg,borderRadius:6,padding:'9px 4px',fontSize:8,fontWeight:700,color:INK,textAlign:'center'}}>{l}</div>))}</div>
  </div></Sheet>);

const B2=()=>(<Sheet><Head t="THIS WEEK'S BATCH" s="READY FOR YOUR APPROVAL"/>
  <div style={{padding:'13px',flex:1,minHeight:0}}>
    <div style={{display:'flex',gap:6,marginBottom:11}}>{[V.habito,V.plum,V.tr1,V.amb1].map(v=><div key={v} style={{flex:1}}><Img v={v} h={72} r={6}/></div>)}</div>
    {[['Street interview · Habito','Ready'],['UGC · Prep Kitchen','Ready'],['Trend-led · Plum','Ready']].map(([t,s],i)=>(
      <div key={t} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 0',borderBottom:i<2?'1px solid rgba(43,26,61,0.07)':'none'}}>
        <span style={{width:14,height:14,borderRadius:4,background:'#0CB876',color:'#fff',fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>✓</span>
        <span style={{fontSize:10,color:INK,flex:1}}>{t}</span>
        <span style={{fontSize:8,fontWeight:800,color:'#0CB876'}}>{s}</span></div>))}
    <div style={{display:'flex',gap:6,marginTop:11}}>
      <div style={{flex:1,background:P,color:'#fff',...D,fontSize:9.5,fontWeight:800,textAlign:'center',padding:'8px 0',borderRadius:7}}>Approve all</div>
      <div style={{flex:1,border:'1.5px solid rgba(43,26,61,0.15)',...D,fontSize:9.5,fontWeight:800,color:INK,textAlign:'center',padding:'8px 0',borderRadius:7}}>Request changes</div></div>
  </div></Sheet>);

const B3=()=>(<Sheet><Head t="ONE MONTH OF OUTPUT" s="WHAT YOU ACTUALLY GET"/>
  <div style={{padding:'13px',flex:1,minHeight:0}}>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5}}>
      {[V.habito,V.plum,V.uni,V.prep,V.ai,V.bb,V.tr1,V.tr2,V.amb1,V.amb2,V.ex1,V.habito2].map((v,i)=><Img key={i} v={v} h={54} r={5}/>)}</div>
    <div style={{...D,fontSize:9,fontWeight:800,letterSpacing:'.06em',color:'rgba(43,26,61,0.45)',textAlign:'center',marginTop:11}}>12 VIDEOS · SCRIPTED, FILMED, EDITED, POSTED</div>
  </div></Sheet>);

const B4=()=>(<Sheet><Head t="WE CAST, YOU APPROVE" s="150+ VETTED UK CREATORS"/>
  <div style={{padding:'13px',flex:1,minHeight:0}}>
    <div style={{borderRadius:9,overflow:'hidden',background:'rgba(43,26,61,0.05)',height:118}}>
      <img src="/creators-collage.png" alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',display:'block'}}/></div>
    <div style={{display:'flex',gap:5,marginTop:9}}>{['Street','UGC','Ambassador','Expert'].map((t,i)=>(
      <div key={t} style={{flex:1,background:[PINK,MINT,LILAC,BUTTER][i],borderRadius:6,padding:'6px 3px',fontSize:8,fontWeight:700,color:INK,textAlign:'center'}}>{t}</div>))}</div>
  </div></Sheet>);

const SETS=[
 {k:'AUDIT — A',n:'Audit sheet (current)',o:'Findings + frames + annotations, closing on the roadmap. Closest to your reference.',c:<A1/>},
 {k:'AUDIT — B',n:'Scorecard with grades',o:'Grades each area you are paying to have assessed. Most obviously “an audit” — a diagnosis with a verdict.',c:<A2/>},
 {k:'AUDIT — C',n:'Your version vs ours',o:'The single most concrete thing the audit produces: this frame, changed, and why.',c:<A3/>},
 {k:'AUDIT — D',n:'The 90-day roadmap',o:'Skips the diagnosis and shows the thing they walk away with, in full.',c:<A4/>},
 {k:'HIRE — A',n:'Content calendar (current)',o:'A month planned out in content types.',c:<B1/>},
 {k:'HIRE — B',n:'This week’s batch, ready to approve',o:'Shows the actual experience of the offer: content arrives finished, you approve it. Matches “you approve, we handle the rest”.',c:<B2/>},
 {k:'HIRE — C',n:'One month of output',o:'Twelve real videos. No abstraction at all — this is literally what you get.',c:<B3/>},
 {k:'HIRE — D',n:'We cast, you approve',o:'Leads on the creator network, which is the part clients cannot replicate themselves.',c:<B4/>},
];

export default function VizLab(){
  return (<div style={{fontFamily:'var(--font-sans)',background:BG,color:PD,minHeight:'100vh'}}>
    <div style={{maxWidth:1100,margin:'0 auto',padding:'34px 26px 90px'}}>
      <h1 style={{...D,fontSize:25,letterSpacing:'-.04em',margin:'0 0 6px'}}>Card visuals — pick one per card</h1>
      <p style={{fontSize:13,color:MU,lineHeight:1.6,margin:'0 0 30px',maxWidth:820}}>
        Each tied to a specific part of the offer, shown at the real 490px card width, on warm paper rather than the site’s cold white.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(470px,1fr))',gap:22}}>
        {SETS.map(s=>(<div key={s.k}>
          <div style={{...D,fontSize:10,fontWeight:800,letterSpacing:'.1em',color:P,marginBottom:4}}>{s.k}</div>
          <h2 style={{...D,fontSize:15.5,fontWeight:800,letterSpacing:'-.02em',margin:'0 0 5px'}}>{s.n}</h2>
          <p style={{fontSize:12,color:MU,lineHeight:1.55,margin:'0 0 13px'}}>{s.o}</p>
          <div style={{width:490,maxWidth:'100%',background:WH,border:`2px solid ${BR}`,borderRadius:24,padding:'24px 22px'}}>{s.c}</div>
        </div>))}
      </div>
    </div></div>);
}
