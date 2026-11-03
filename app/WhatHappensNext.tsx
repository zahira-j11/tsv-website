'use client';

// Contact: what happens after the call, as the six-stage campaign pipeline
// from the client portal. Stage names, owners and lines are the portal's own
// (its lib/campaignStages.ts), and the look follows its campaign timeline.
// The stages tick over one by one while the panel is on screen; only colours,
// opacity and transforms change, so nothing shifts the layout. Reduced motion
// shows the pipeline part-way through, without the ticking.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STAGES = [
  { label:'Concept pitch',      you:false, text:'We develop and pitch video concepts for your campaign.' },
  { label:'Script approval',    you:true,  text:'You review and sign off on scripts and creative direction.' },
  { label:'Casting shortlist',  you:false, text:'We curate a shortlist of talent for your campaign.' },
  { label:'Casting approval',   you:true,  text:'You approve the final cast from our shortlist.' },
  { label:'Production',         you:false, text:'We manage filming and editing end-to-end.' },
  { label:'Delivery of assets', you:false, text:'Live-ready content delivered and ready to post.' },
];
// The portal's stage icons, in the same order.
const ICONS = [
  'M12 3a6 6 0 0 1 4.24 10.24C15.13 14.36 14.5 15.5 14.5 17h-5c0-1.5-.63-2.64-1.74-3.76A6 6 0 0 1 12 3z M9.5 17h5M10.5 20h3',
  'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6 M8.5 14.5l2 2 4-4',
  'M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M6 21c0-3.31 2.69-6 6-6s6 2.69 6 6',
  'M14 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M2 20c0-3.31 2.69-6 6-6h4 M15.5 17l1.5 1.5 3-3',
  'M2 8h20v13H2z M2 4h20v4H2z M6 4l2 4M11 4l2 4M16 4l2 4 M10 12l5 2.5-5 2.5z',
  'M2 4h20v14H2z M8 20h8M12 18v2 M10 9l6 3-6 3z',
];
// Each stage takes this long. The finished pipeline holds for two beats
// (steps 6 and 7) before it starts again.
const STEP_MS = 1700;

export default function WhatHappensNext() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // the active stage; earlier ones are done
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(2); return; }
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setStep(s => (s > STAGES.length ? 0 : s + 1)), STEP_MS);
    }, { threshold:0.3 });
    io.observe(el);
    return () => { window.clearInterval(timer); io.disconnect(); };
  }, []);
  const current = Math.min(step, STAGES.length - 1);

  return (
    <div ref={ref} className="whn" role="group" aria-label="What happens next: the six stages of a campaign, from concept pitch to delivery of assets">
      <div className="whn-head">
        <div>
          <p className="whn-eyebrow">What happens next</p>
          <p className="whn-title">Your campaign, stage by stage</p>
        </div>
        <div className="whn-current" aria-hidden="true">
          <span>Current stage</span>
          <b>{STAGES.map((s, i) => <em key={s.label} className={i === current ? 'is-on' : undefined}>{s.label}</em>)}</b>
        </div>
      </div>
      <ol className="whn-track">
        {STAGES.map((s, i) => (
          <li key={s.label} className={[s.you && 'is-you', i < step ? 'is-done' : i === step && 'is-on'].filter(Boolean).join(' ') || undefined}>
            <span className="whn-dot">
              <svg className="whn-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[i]} /></svg>
              <svg className="whn-check" width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l4 4 8-8" /></svg>
              <span className="whn-owner">{s.you ? 'You' : <Image src="/logos/tsv-logo-mark.png" alt="" width={22} height={22} />}</span>
            </span>
            <span className="whn-label">{s.label}</span>
            <span className="whn-who">{s.you ? 'You' : 'TSV'}</span>
            {i < STAGES.length - 1 && <span className="whn-line" aria-hidden="true"><i /></span>}
          </li>
        ))}
      </ol>
      <div className="whn-note" aria-live="off">
        {STAGES.map((s, i) => <p key={s.label} className={i === current ? 'is-on' : undefined}>{s.text}</p>)}
      </div>
    </div>
  );
}
