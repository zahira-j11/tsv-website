'use client';

import { useState } from 'react';

const BG   = '#FEFDF8';
const WH   = '#FFFFFF';
const P    = '#7C01FF';
const PD   = '#21005D';
const MAG  = '#E820A4';
const GRN  = '#08F683';
const MU   = 'rgba(33,0,93,0.52)';
const BR   = '#E4DCFF';
const DISP = { fontFamily: 'var(--font-display)' } as const;

type Application = {
  id: string;
  createdAt: string;
  qualified: boolean;
  month: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  website: string;
  platforms: string[];
  budget: string;
  teamSize: string;
  challenge: string;
};

/** The form values, spelled the way you'd say them rather than the stored keys. */
const BUDGET_LABEL: Record<string, string> = {
  'under-2k':  '£0 – £1,999',
  '2k-3.5k':   '£2,000 – £3,499',
  '3.5k-5k':   '£3,500 – £4,999',
  '5k-10k':    '£5,000 – £9,999',
  '10k-plus':  '£10,000+',
  // Brackets used before the gate moved to £2,000 — kept so applications
  // submitted under the old form still read as money rather than a slug.
  'under-1k':  'Under £1,000',
  '1k-2.5k':   '£1,000 – £2,500',
  '2.5k-5k':   '£2,500 – £5,000',
};
const TEAM_LABEL: Record<string, string> = {
  'solo':      'Just me',
  '2-10':      '2 – 10',
  '11-50':     '11 – 50',
  '51-200':    '51 – 200',
  '201-1000':  '201 – 999',
  '1000-plus': '1,000+',
  // Retired when the upper bands were split out.
  '50-plus':   '50+',
};

type Filter = 'declined' | 'qualified' | 'all';

export default function ApplicationsPage() {
  const [password, setPassword]   = useState('');
  const [apps, setApps]           = useState<Application[] | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [filter, setFilter]       = useState<Filter>('declined');
  const [open, setOpen]           = useState<string | null>(null);

  const load = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/audit/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not sign in.'); return; }
      setApps(data.applications);
      setPassword('');
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  };

  const shown = (apps ?? []).filter(a =>
    filter === 'all' ? true : filter === 'declined' ? !a.qualified : a.qualified);

  const counts = {
    all: apps?.length ?? 0,
    declined: (apps ?? []).filter(a => !a.qualified).length,
    qualified: (apps ?? []).filter(a => a.qualified).length,
  };

  /** Everything on screen, as a spreadsheet. */
  const downloadCsv = () => {
    const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['Date','Outcome','Month','Name','Job title','Email','Company','Website','Platforms','Budget','Team size','Biggest challenge'];
    const body = shown.map(a => [
      new Date(a.createdAt).toLocaleString('en-GB'),
      a.qualified ? 'Qualified' : 'Declined',
      a.month, a.name, a.jobTitle, a.email, a.company, a.website,
      a.platforms.join(' / '),
      BUDGET_LABEL[a.budget] ?? a.budget,
      TEAM_LABEL[a.teamSize] ?? a.teamSize,
      a.challenge,
    ].map(cell).join(','));
    const blob = new Blob([[head.map(cell).join(','), ...body].join('\n')], { type:'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-applications-${filter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** For clearing out test entries and the occasional bit of spam. */
  const remove = async (id: string, company: string) => {
    if (!confirm(`Remove the application from ${company}? This cannot be undone.`)) return;
    const res = await fetch('/api/audit/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setApps(prev => (prev ?? []).filter(a => a.id !== id));
    else setError('Could not remove that application.');
  };

  const tab = (key: Filter, label: string): React.CSSProperties => ({
    ...DISP, fontSize:12, fontWeight:800, letterSpacing:'.04em', textTransform:'uppercase',
    padding:'9px 16px', borderRadius:11, cursor:'pointer', fontFamily:'inherit',
    border:`1.5px solid ${filter===key ? P : BR}`,
    background: filter===key ? P : WH,
    color: filter===key ? '#fff' : MU,
  });

  return (
    <div style={{ fontFamily:'var(--font-sans)', background:BG, color:PD, minHeight:'100vh', padding:'44px 24px' }}>
      <div style={{ maxWidth: apps ? 1080 : 460, margin:'0 auto' }}>

        <h1 style={{ ...DISP, fontSize:'clamp(26px,3.4vw,38px)', fontWeight:800, letterSpacing:'-.045em', marginBottom:6 }}>
          Audit applications
        </h1>
        <p style={{ fontSize:14, color:MU, marginBottom:30 }}>
          Everyone who applied, including the ones the budget gate turned away.
        </p>

        {/* ── Sign in ─────────────────────────────────────────── */}
        {!apps && (
          <form onSubmit={load} style={{ background:WH, border:`2px solid ${BR}`, borderRadius:20, padding:28 }}>
            <label style={{ ...DISP, display:'block', fontSize:11, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus
              style={{ padding:'14px 16px', borderRadius:12, border:`1.5px solid ${error?MAG:BR}`, background:BG,
                       color:PD, fontSize:14, outline:'none', width:'100%', boxSizing:'border-box', fontFamily:'inherit' }} />
            {error && <div style={{ color:MAG, fontSize:13, marginTop:10 }}>{error}</div>}
            <button type="submit" disabled={loading || !password}
              style={{ ...DISP, marginTop:18, width:'100%', padding:'14px 22px', borderRadius:12, border:'none',
                       background:P, color:'#fff', fontSize:14, fontWeight:800, cursor:'pointer',
                       opacity: loading || !password ? 0.55 : 1, fontFamily:'inherit' }}>
              {loading ? 'Checking…' : 'View applications'}
            </button>
          </form>
        )}

        {/* ── Results ─────────────────────────────────────────── */}
        {apps && (
          <>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', marginBottom:22 }}>
              <button onClick={()=>setFilter('declined')}  style={tab('declined','')}>Declined ({counts.declined})</button>
              <button onClick={()=>setFilter('qualified')} style={tab('qualified','')}>Qualified ({counts.qualified})</button>
              <button onClick={()=>setFilter('all')}       style={tab('all','')}>All ({counts.all})</button>
              <div style={{ flex:1 }} />
              <button onClick={downloadCsv} disabled={!shown.length}
                style={{ ...DISP, fontSize:12, fontWeight:800, padding:'9px 16px', borderRadius:11,
                         border:`1.5px solid ${BR}`, background:WH, color:PD, cursor:'pointer',
                         opacity: shown.length ? 1 : 0.5, fontFamily:'inherit' }}>
                Download CSV
              </button>
            </div>

            {!shown.length && (
              <div style={{ background:WH, border:`2px solid ${BR}`, borderRadius:18, padding:'44px 28px', textAlign:'center', color:MU, fontSize:14 }}>
                Nothing here yet.
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {shown.map(a => (
                <div key={a.id} onClick={()=>setOpen(open===a.id?null:a.id)}
                  style={{ background:WH, border:`2px solid ${BR}`, borderRadius:18, padding:'18px 20px', cursor:'pointer' }}>

                  <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                    <span style={{ ...DISP, fontSize:10, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase',
                                   padding:'4px 10px', borderRadius:20, flexShrink:0,
                                   background: a.qualified ? 'rgba(8,246,131,0.16)' : 'rgba(232,32,164,0.12)',
                                   color: a.qualified ? '#047A41' : MAG }}>
                      {a.qualified ? 'Qualified' : 'Declined'}
                    </span>
                    <span style={{ ...DISP, fontSize:15, fontWeight:800 }}>{a.company}</span>
                    <span style={{ fontSize:13, color:MU }}>{a.name}{a.jobTitle ? `, ${a.jobTitle}` : ''}</span>
                    <div style={{ flex:1 }} />
                    <span style={{ ...DISP, fontSize:13, fontWeight:800, color: a.qualified ? PD : MAG }}>
                      {BUDGET_LABEL[a.budget] ?? a.budget}
                    </span>
                    <span style={{ fontSize:12, color:MU, flexShrink:0 }}>
                      {new Date(a.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}
                    </span>
                  </div>

                  {open === a.id && (
                    <div style={{ borderTop:`1.5px solid ${BR}`, marginTop:16, paddingTop:16, display:'grid',
                                  gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'14px 24px', fontSize:13 }}>
                      <Field label="Email"><a href={`mailto:${a.email}`} style={{ color:P }}>{a.email}</a></Field>
                      <Field label="Website">
                        <a href={a.website.startsWith('http') ? a.website : `https://${a.website}`}
                           target="_blank" rel="noopener noreferrer" style={{ color:P }}>{a.website}</a>
                      </Field>
                      <Field label="Team size">{TEAM_LABEL[a.teamSize] ?? a.teamSize}</Field>
                      <Field label="Active on">{a.platforms.join(', ') || '—'}</Field>
                      <Field label="Applied">{new Date(a.createdAt).toLocaleString('en-GB')}</Field>
                      <Field label="Month">{a.month}</Field>
                      <div style={{ gridColumn:'1/-1' }}>
                        <Field label="Biggest challenge">{a.challenge}</Field>
                      </div>
                      <div style={{ gridColumn:'1/-1' }}>
                        <button onClick={e=>{ e.stopPropagation(); remove(a.id, a.company); }}
                          style={{ ...DISP, fontSize:11, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase',
                                   padding:'8px 14px', borderRadius:10, border:`1.5px solid ${BR}`,
                                   background:WH, color:MAG, cursor:'pointer', fontFamily:'inherit' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ ...DISP, fontSize:10, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:MU, marginBottom:4 }}>{label}</div>
      <div style={{ lineHeight:1.7 }}>{children}</div>
    </div>
  );
}
