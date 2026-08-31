'use client';
import { useState, useEffect } from 'react';
import { defaultSpots, spotsSentence, type SpotsInfo } from '@/lib/spots';

// ─── Brand palette (matches app/page.tsx) ──────────────────
const BG   = '#FEFDF8';
const WH   = '#FFFFFF';
const P    = '#7C01FF';
const PB   = '#A200FF';
const PD   = '#21005D';
const MAG  = '#E820A4';
const GRN  = '#08F683';
const YEL  = '#FFD600';
const MU   = 'rgba(33,0,93,0.52)';
const SU   = 'rgba(33,0,93,0.28)';
const BR   = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const INCLUDED = [
  { icon:'📊', title:'Organic social review',        body:'What your content is doing now, which formats are working and where the drop-off is.' },
  { icon:'🔍', title:'Competitor and category analysis', body:'What the brands winning attention in your category are doing that you are not.' },
  { icon:'✨', title:'Paid creative review',         body:'Your ad creative assessed for hooks, retention and fatigue.' },
  { icon:'🗺️', title:'Personalised 90-day roadmap',  body:'A prioritised plan you can act on, whether you work with us or not.' },
];

// Audit booking calendar — a SEPARATE HubSpot meeting type from the discovery
// call, so audit bookings stay out of the sales-call pipeline.
// Override per environment with NEXT_PUBLIC_AUDIT_CALENDAR_URL.
const AUDIT_CALENDAR_URL = 'https://meetings-eu1.hubspot.com/thesocialvision/social-media-audit-';

const PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'LinkedIn', 'Meta Ads', 'Not posting yet'];

const BUDGET = [
  { v:'under-1k',  l:'Under £1,000 / month' },
  { v:'1k-2.5k',   l:'£1,000 – £2,500 / month' },
  { v:'2.5k-5k',   l:'£2,500 – £5,000 / month' },
  { v:'5k-10k',    l:'£5,000 – £10,000 / month' },
  { v:'10k-plus',  l:'£10,000+ / month' },
];

const TEAM = [
  { v:'solo',     l:'Just me' },
  { v:'2-10',     l:'2 – 10 people' },
  { v:'11-50',    l:'11 – 50 people' },
  { v:'50-plus',  l:'50+ people' },
];

// Same floating orbs as the main site — the mkt-orb-* animations are global.
function Orbs({ orbs }: { orbs: { size:number; color:string; opacity:number; cls:string; top?:string; bottom?:string; left?:string; right?:string }[] }) {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {orbs.map((o,i)=>(
        <div key={i} className={o.cls} style={{
          position:'absolute', width:o.size, height:o.size, borderRadius:'50%',
          background:`radial-gradient(circle, ${o.color}CC 0%, ${o.color}AA 60%, ${o.color}22 85%, transparent 100%)`,
          opacity:o.opacity, filter:'blur(3px)',
          top:o.top, bottom:o.bottom, left:o.left, right:o.right,
        }} />
      ))}
    </div>
  );
}

type Step = 'form' | 'qualified' | 'declined';

export default function AuditPage() {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [step, setStep]         = useState<Step>('form');
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState<string|null>(null);
  const [issues, setIssues]     = useState<Record<string,string[]|undefined>>({});
  const [calendarUrl, setCalendarUrl] = useState<string|null>(null);
  const [spots, setSpots]       = useState<SpotsInfo>(defaultSpots());

  useEffect(() => {
    fetch('/api/spots').then(r => r.ok ? r.json() : null).then(d => { if (d) setSpots(d); }).catch(() => {});
  }, []);

  const togglePlatform = (p: string) =>
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIssues({});
    setSending(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), email: f.get('email'), company: f.get('company'),
          website: f.get('website'), platforms,
          budget: f.get('budget'), teamSize: f.get('teamSize'),
          challenge: f.get('challenge'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIssues(data.issues ?? {});
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setCalendarUrl(data.calendarUrl ?? null);
      setStep(data.qualified ? 'qualified' : 'declined');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Could not submit right now. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const label: React.CSSProperties = { ...DISP, display:'block', fontSize:11, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:PD, marginBottom:8 };
  const field: React.CSSProperties = { padding:'13px 16px', borderRadius:12, border:`1.5px solid ${BR}`, background:WH, color:PD, fontSize:14.5, outline:'none', width:'100%', boxSizing:'border-box', fontFamily:'inherit' };
  const issueOf = (f: string) => issues[f]?.[0];
  const fieldStyle = (f: string): React.CSSProperties =>
    issueOf(f) ? { ...field, borderColor:'#C0392B', background:'#FDF6F5' } : field;
  const FieldError = ({ f }: { f: string }) => {
    const msg = issueOf(f);
    if (!msg) return null;
    return <p style={{ fontSize:12.5, fontWeight:600, color:'#8B1E1E', margin:'7px 0 0' }}>{msg}</p>;
  };

  return (
    <div style={{ fontFamily:'var(--font-sans)', background:BG, color:PD, overflowX:'hidden', minHeight:'100vh' }}>

      {/* ══ HEADER ═══════════════════════════════════════════ */}
      <header style={{ padding:'20px 28px', borderBottom:`1px solid ${BR}`, background:'rgba(255,255,255,0.8)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:1060, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <a href="/" style={{ display:'flex', alignItems:'center', gap:11, textDecoration:'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/tsv-logo.jpeg" alt="The Social Vision" style={{ width:34, height:34, borderRadius:'50%', objectFit:'cover' }} />
            <span style={{ ...DISP, fontSize:15, fontWeight:800, letterSpacing:'-.03em', color:PD }}>The Social Vision</span>
          </a>
          <a href="/" style={{ fontSize:13, fontWeight:600, color:MU, textDecoration:'none' }}>← Back to site</a>
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section style={{ padding:'72px 28px 56px', background:`linear-gradient(150deg,${PD} 0%,${P} 100%)`, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:460, height:460, borderRadius:'50%', top:'-30%', right:'2%', background:`radial-gradient(circle, ${MAG}55 0%, transparent 68%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:320, height:320, borderRadius:'50%', bottom:'-24%', left:'4%', background:`radial-gradient(circle, ${YEL}44 0%, transparent 68%)`, pointerEvents:'none' }} />
        <div style={{ maxWidth:820, margin:'0 auto', position:'relative', zIndex:1, textAlign:'center' }}>
          <span style={{ display:'inline-block', background:YEL, color:PD, ...DISP, fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'5px 18px', borderRadius:20, marginBottom:24 }}>
            Free £750 Social Media Audit
          </span>
          <h1 style={{ ...DISP, fontSize:'clamp(32px,5.4vw,58px)', fontWeight:800, letterSpacing:'-.055em', color:'#fff', lineHeight:1.06, marginBottom:20 }}>
            Find out exactly what we&rsquo;d{' '}
            <em style={{ fontStyle:'italic' }} className="mkt-gradient-text">change</em>{' '}
            about your social.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,253,237,0.6)', lineHeight:1.8, maxWidth:700, margin:'0 auto' }}>
            We&rsquo;ll analyse your organic content, competitors and paid creative before we meet, then spend 60 minutes walking you through the biggest opportunities we see for your brand.
          </p>
        </div>
      </section>

      {/* ══ WHAT YOU GET ═════════════════════════════════════ */}
      <section style={{ padding:'64px 28px 8px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:360, color:P,   opacity:0.14, cls:'mkt-orb-a', top:'-12%',  right:'-6%' },
          { size:260, color:YEL, opacity:0.42, cls:'mkt-orb-e', top:'34%',   left:'-4%'  },
          { size:220, color:MAG, opacity:0.14, cls:'mkt-orb-c', bottom:'2%', right:'8%'  },
        ]} />
        <div style={{ maxWidth:1060, margin:'0 auto', position:'relative', zIndex:1 }}>
          <h2 style={{ ...DISP, fontSize:'clamp(24px,3vw,38px)', fontWeight:800, letterSpacing:'-.05em', color:PD, marginBottom:32, textAlign:'center' }}>What&rsquo;s included</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:18 }}>
            {INCLUDED.map(i=>(
              <div key={i.title} style={{ padding:'26px 24px', background:WH, border:`1.5px solid ${BR}`, borderRadius:20 }}>
                <span style={{ fontSize:24 }}>{i.icon}</span>
                <h3 style={{ ...DISP, fontSize:16, fontWeight:800, letterSpacing:'-.03em', color:PD, margin:'12px 0 8px' }}>{i.title}</h3>
                <p style={{ fontSize:13.5, color:MU, lineHeight:1.7, margin:0 }}>{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPLY ════════════════════════════════════════════ */}
      <section id="apply" style={{ padding:'56px 28px 100px', background:BG, position:'relative', overflow:'hidden' }}>
        <Orbs orbs={[
          { size:400, color:MAG, opacity:0.13, cls:'mkt-orb-b', top:'-6%',    left:'-8%'  },
          { size:300, color:YEL, opacity:0.40, cls:'mkt-orb-f', top:'40%',    right:'-4%' },
          { size:240, color:P,   opacity:0.14, cls:'mkt-orb-d', bottom:'-4%', left:'12%'  },
        ]} />
        <div style={{ maxWidth: step === 'qualified' ? 1040 : 680, margin:'0 auto', position:'relative', zIndex:1 }}>

          {step === 'form' && (
            <>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h2 style={{ ...DISP, fontSize:'clamp(24px,3vw,36px)', fontWeight:800, letterSpacing:'-.05em', color:PD, marginBottom:12 }}>Apply for your audit</h2>
                <p style={{ fontSize:15, color:MU, lineHeight:1.75 }}>
                  A few details so we can prepare properly before we meet. Takes about a minute.
                </p>
                <p style={{ ...DISP, fontSize:12.5, fontWeight:800, color:MAG, marginTop:14 }}>{spotsSentence(spots)}</p>
              </div>

              <form onSubmit={submit} style={{ background:WH, border:`1.5px solid ${BR}`, borderRadius:24, padding:'32px 30px', display:'flex', flexDirection:'column', gap:22 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:18 }}>
                  <div><label style={label} htmlFor="name">Your name</label><input style={fieldStyle('name')} id="name" name="name" required autoComplete="name" /><FieldError f="name" /></div>
                  <div><label style={label} htmlFor="email">Work email</label><input style={fieldStyle('email')} id="email" name="email" type="email" required autoComplete="email" /><FieldError f="email" /></div>
                  <div><label style={label} htmlFor="company">Company</label><input style={fieldStyle('company')} id="company" name="company" required autoComplete="organization" /><FieldError f="company" /></div>
                  <div><label style={label} htmlFor="website">Website or social handle</label><input style={fieldStyle('website')} id="website" name="website" required placeholder="thesocialvision.co.uk" /><FieldError f="website" /></div>
                </div>

                <div>
                  <span style={label}>Where are you active?</span>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
                    {PLATFORMS.map(pl=>{
                      const on = platforms.includes(pl);
                      return (
                        <button type="button" key={pl} onClick={()=>togglePlatform(pl)} style={{
                          fontSize:13, fontWeight:700, padding:'9px 15px', borderRadius:100, cursor:'pointer',
                          fontFamily:'inherit', transition:'all 150ms',
                          background: on ? P : 'transparent', color: on ? '#fff' : PD,
                          border: `1.5px solid ${on ? P : BR}`,
                        }}>{pl}</button>
                      );
                    })}
                  </div>
                  <FieldError f="platforms" />
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:18 }}>
                  <div>
                    <label style={label} htmlFor="budget">Monthly social budget</label>
                    <select style={fieldStyle('budget')} id="budget" name="budget" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {BUDGET.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                    <FieldError f="budget" />
                  </div>
                  <div>
                    <label style={label} htmlFor="teamSize">Team size</label>
                    <select style={fieldStyle('teamSize')} id="teamSize" name="teamSize" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {TEAM.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                    <FieldError f="teamSize" />
                  </div>
                </div>

                <div>
                  <label style={label} htmlFor="challenge">What&rsquo;s your biggest social challenge right now?</label>
                  <textarea style={{ ...fieldStyle('challenge'), minHeight:110, resize:'vertical', lineHeight:1.6 }} id="challenge" name="challenge" required />
                  <FieldError f="challenge" />
                </div>

                {error && (
                  <p style={{ fontSize:13.5, fontWeight:600, color:'#8B1E1E', background:'#F7EAEA', padding:'12px 16px', borderRadius:12, margin:0 }}>{error}</p>
                )}

                <button type="submit" disabled={sending || platforms.length === 0} style={{
                  background:`linear-gradient(135deg,${P},${PB})`, color:'#fff', ...DISP,
                  fontSize:15, fontWeight:800, padding:'17px', borderRadius:14, border:'none',
                  cursor: sending || platforms.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: sending || platforms.length === 0 ? 0.55 : 1, transition:'opacity 160ms',
                }}>
                  {sending ? 'Submitting…' : 'Apply for my free audit →'}
                </button>
              </form>
            </>
          )}

          {step === 'qualified' && (
            <div style={{ background:WH, border:`2px solid ${GRN}`, borderRadius:24, padding:'36px 20px 20px', textAlign:'center' }}>
              <span style={{ fontSize:34 }}>🎉</span>
              <h2 style={{ ...DISP, fontSize:'clamp(23px,3vw,32px)', fontWeight:800, letterSpacing:'-.045em', color:PD, margin:'14px 0 12px' }}>You&rsquo;re a great fit, pick your slot</h2>
              <p style={{ fontSize:15, color:MU, lineHeight:1.75, marginBottom:28 }}>
                Choose a time below and we&rsquo;ll have your audit prepared before we meet.
              </p>
              <div style={{ borderRadius:18, overflow:'hidden', border:`1.5px solid ${BR}` }}>
                <iframe
                  src={`${calendarUrl ?? AUDIT_CALENDAR_URL}?embed=true`}
                  title="Book your social media audit"
                  style={{ width:'100%', height:720, border:'none', display:'block' }}
                />
              </div>
            </div>
          )}

          {step === 'declined' && (
            <div style={{ background:WH, border:`1.5px solid ${BR}`, borderRadius:24, padding:'40px 34px', textAlign:'center' }}>
              <h2 style={{ ...DISP, fontSize:'clamp(22px,3vw,30px)', fontWeight:800, letterSpacing:'-.045em', color:PD, marginBottom:14 }}>Thanks for applying</h2>
              <p style={{ fontSize:15, color:MU, lineHeight:1.8, marginBottom:24 }}>
                The September audit spots are aimed at brands already investing in social at scale, so we don&rsquo;t think it&rsquo;s the right use of your time just yet. We&rsquo;ll keep your details and come back to you when we open spots that suit where you&rsquo;re at.
              </p>
              <p style={{ fontSize:15, color:MU, lineHeight:1.8, marginBottom:28 }}>
                In the meantime, our blog covers most of what we&rsquo;d put in a roadmap.
              </p>
              <a href="/blog" style={{ display:'inline-block', background:P, color:'#fff', ...DISP, fontSize:14, fontWeight:800, padding:'15px 30px', borderRadius:14, textDecoration:'none' }}>
                Read the blog →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer style={{ padding:'40px 28px', background:PD }}>
        <div style={{ maxWidth:1060, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
          <div style={{ ...DISP, fontSize:16, fontWeight:800, color:'#fff', letterSpacing:'-.03em' }}>The Social Vision</div>
          <div style={{ fontSize:12.5, color:'rgba(255,253,237,0.4)' }}>© 2025 The Social Vision. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
