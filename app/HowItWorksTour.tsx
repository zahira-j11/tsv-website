'use client';

// How it works: the three steps beside a mock-up of the TSV portal that plays
// one scene per step (concepts, the creator network, content review) and moves
// on by itself. The active step is lit with a progress line that the scene
// fills; clicking a step jumps to its scene. The step copy is the homepage's
// own, passed in unchanged.

import { useEffect, useRef, useState } from 'react';
import PortalTour from './PortalTour';

const WH = '#FFFFFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

export default function HowItWorksTour({ steps }: { steps: { n:string; title:string; body:string }[] }) {
  const [scene, setScene] = useState(0);
  const [run, setRun] = useState(0);
  // Reduced motion: no autoplay or progress lines; steps still switch scenes.
  const [still, setStill] = useState(false);
  const barRef = useRef<HTMLElement | null>(null);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const go = (i: number) => { setScene(i); setRun(r => r + 1); };

  return (
    <div className="mkt-process-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>
      {/* Steps */}
      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {steps.map((s, i) => (
          <div key={s.n} data-reveal data-reveal-delay={String(i * 0.14)} style={{ position:'relative', padding:'32px 0', borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
            <div className={`hiw-step${scene === i ? ' is-on' : ''}`} onClick={() => go(i)}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontWeight:700, letterSpacing:'.1em', marginBottom:10 }}>{s.n}</div>
              <h3 style={{ ...DISP, fontSize:22, fontWeight:800, letterSpacing:'-.045em', color:WH, marginBottom:12 }}>
                <button type="button" className="hiw-step-btn" aria-pressed={scene === i}>{s.title}</button>
              </h3>
              <p style={{ fontSize:15, color:'rgba(255,253,237,0.55)', lineHeight:1.85, fontWeight:400 }}>{s.body}</p>
            </div>
            {!still && scene === i && <span className="hiw-bar" aria-hidden="true"><i ref={barRef} /></span>}
          </div>
        ))}
      </div>
      {/* The portal, playing this step's scene */}
      <div className="cpd-slot" data-reveal data-reveal-delay="0.2">
        <PortalTour scene={scene} run={run} still={still} barRef={barRef} onDone={() => go((scene + 1) % steps.length)} />
      </div>
    </div>
  );
}
