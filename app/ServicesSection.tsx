'use client';

// Homepage services section in the Hall of Fame look: white cards with pill
// tags and a 9:16 video, all five on show at once. A card opens a dark purple
// stage with the detail and three playable examples.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const WH   = '#FFFFFF';
const BG   = '#FEFDF8';
const P    = '#7C01FF';
const PD   = '#21005D';
const MAG  = '#E820A4';
const YEL  = '#FFD600';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

export type Service = {
  key: string; group: string; tag: string; icon: string; accent: string;
  thumbs: (string | null)[]; desc: string; modalDesc: string; whenBest: string; bestFor: string;
};

const posterOf = (src: string) =>
  src.replace(/\.(mp4|mov|webm)(\?.*)?$/, '.jpg').replace('f_auto,', '').replace(',f_auto', '');

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

function StageOrbs({ scale = 1 }: { scale?: number }) {
  return (
    <>
      {[
        { size: 480, color: P,   opacity: 0.30, top: '-18%', left: '-8%',  cls: 'mkt-orb-a' },
        { size: 380, color: MAG, opacity: 0.26, top: '25%',  right: '-10%', cls: 'mkt-orb-b' },
        { size: 320, color: YEL, opacity: 0.24, bottom: '-14%', left: '30%', cls: 'mkt-orb-c' },
      ].map((o, i) => (
        <div key={i} className={o.cls} style={{
          position: 'absolute', width: o.size * scale, height: o.size * scale, borderRadius: '50%',
          background: `radial-gradient(circle, ${o.color}CC 0%, ${o.color}AA 60%, ${o.color}22 85%, transparent 100%)`,
          opacity: o.opacity, filter: 'blur(3px)', pointerEvents: 'none',
          top: o.top, bottom: (o as any).bottom, left: o.left, right: (o as any).right,
        }} />
      ))}
    </>
  );
}

function GroupPill({ group, onDark }: { group: string; onDark?: boolean }) {
  const paid = group === 'Paid';
  const style: React.CSSProperties = onDark
    ? { color: paid ? PD : WH, background: paid ? YEL : 'rgba(255,255,255,0.14)' }
    : { color: paid ? MAG : P, background: paid ? 'rgba(232,32,164,0.1)' : 'rgba(124,1,255,0.1)' };
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, ...style }}>{group}</span>;
}

// Muted preview on hover, the way a feed behaves.
function PreviewVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (active) { v.muted = true; v.play().catch(() => {}); } else { v.pause(); }
  }, [active, src]);
  return <video ref={ref} src={src} poster={posterOf(src)} muted loop playsInline preload="none"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
}

// A Hall of Fame card that plays with sound when tapped.
function PlayCard({ src, width, label }: { src: string; width: number | string; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (playing) { v.pause(); setPlaying(false); } else { v.muted = false; v.play(); setPlaying(true); }
  };
  return (
    <div onClick={toggle} style={{ width, flexShrink: 0, background: WH, borderRadius: 18, padding: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.25)', cursor: 'pointer' }}>
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '9/16', background: 'rgba(33,0,93,0.06)' }}>
        <video ref={ref} src={src} poster={posterOf(src)} playsInline loop preload="none" onEnded={() => setPlaying(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: playing ? 0 : 1, transition: 'opacity 200ms', pointerEvents: 'none' }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: 15, marginLeft: 3, color: PD }}>▶</span>
          </div>
        </div>
        {label && (
          <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: WH }}>{label}</div>
        )}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────
function ServiceCard({ s, onOpen }: { s: Service; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const src = s.thumbs[0];
  return (
    <div onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flexShrink: 0, borderRadius: 18, background: WH, overflow: 'hidden', cursor: 'pointer', scrollSnapAlign: 'start', containerType: 'inline-size',
        boxShadow: hover ? '0 22px 50px rgba(33,0,93,0.28)' : '0 4px 24px rgba(33,0,93,0.18)',
        transform: hover ? 'translateY(-6px)' : 'none', transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease',
      }}>
      <div style={{ display: 'flex', gap: 6, padding: '12px 12px 0' }}>
        <GroupPill group={s.group} />
      </div>
      <div style={{ position: 'relative', margin: '10px 12px 0', borderRadius: 12, overflow: 'hidden', aspectRatio: '9/16', background: 'rgba(33,0,93,0.06)' }}>
        {src && <PreviewVideo src={src} active={hover} />}
        <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: PD, color: WH, borderRadius: 100, padding: '6px 11px', fontSize: 'clamp(9.5px, calc(5.8cqi - 2.6px), 11.5px)', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '-.01em', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
            {s.tag}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(33,0,93,0.64)', lineHeight: 1.55, margin: 0, padding: '12px 14px 16px' }}>{s.desc}</p>
    </div>
  );
}

// ─── The dark stage that opens from a card ────────────────────
function Stage({ s, onClose, onBook }: { s: Service; onClose: () => void; onBook: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const words = s.tag.split(' ');
  const last = words.pop();
  return (
    <Portal>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(10,0,30,0.62)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <style>{`
          .svc-stage-grid { display:grid; grid-template-columns: minmax(0,0.9fr) minmax(0,1.2fr); gap:40px; align-items:center; }
          .svc-stage-vids { display:flex; gap:14px; }
          @media (max-width: 860px) {
            .svc-stage-grid { grid-template-columns: minmax(0,1fr); gap:28px; }
            .svc-stage-vids { overflow-x:auto; scroll-snap-type:x mandatory; padding-bottom:6px; scrollbar-width:none; }
            .svc-stage-vids::-webkit-scrollbar { display:none; }
            .svc-stage-vids > div { width:62% !important; scroll-snap-align:start; }
          }
        `}</style>
        <div onClick={e => e.stopPropagation()} style={{
          position: 'relative', overflow: 'hidden', background: PD, borderRadius: 28, width: '100%', maxWidth: 1080, maxHeight: '90vh',
          boxShadow: '0 40px 100px rgba(0,0,0,0.45)', animation: 'mkt-hero-in 0.3s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <StageOrbs />
          <div style={{ position: 'relative', zIndex: 1, maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(28px,4vw,48px)' }}>
            <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, width: 38, height: 38, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.14)', color: WH, fontSize: 18, cursor: 'pointer' }}>×</button>
            <div className="svc-stage-grid">
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}><GroupPill group={s.group} onDark /></div>
                <h2 style={{ ...DISP, fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.05, color: WH, margin: '0 0 18px' }}>
                  {words.join(' ')} <em style={{ fontStyle: 'italic' }} className="mkt-gradient-text">{last}</em>
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,253,237,0.74)', margin: '0 0 22px' }}>{s.modalDesc}</p>
                {[['Works best when', s.whenBest], ['Best for', s.bestFor]].map(([k, v]) => (
                  <div key={k} style={{ borderLeft: `3px solid ${YEL}`, padding: '2px 0 2px 14px', marginBottom: 16 }}>
                    <div style={{ ...DISP, fontSize: 14, fontWeight: 800, color: YEL, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(255,253,237,0.7)' }}>{v}</div>
                  </div>
                ))}
                <button onClick={onBook} style={{ marginTop: 8, background: YEL, color: PD, border: 'none', borderRadius: 100, padding: '13px 24px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Book a call</button>
              </div>
              <div className="svc-stage-vids">
                {s.thumbs.filter(Boolean).map((src, i) => (
                  <div key={src!} style={{ flex: 1, transform: i === 1 ? 'translateY(-18px)' : 'none' }}>
                    <PlayCard src={src!} width="100%" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

// Every card on show at once: five across on desktop, 3 + 2 on tablets,
// a swipe row (no scrollbar) on phones.
const GRID_CSS = `
  .svc-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:16px; padding:10px 4px 22px; align-items:flex-start; }
  .svc-grid > * { width: calc((100% - 64px) / 5); }
  @media (max-width: 1139px) { .svc-grid > * { width: calc((100% - 32px) / 3); } }
  @media (max-width: 759px) {
    .svc-grid { flex-wrap:nowrap; justify-content:flex-start; overflow-x:auto; overflow-y:hidden; scroll-snap-type:x proximity; scrollbar-width:none; }
    .svc-grid::-webkit-scrollbar { display:none; }
    .svc-grid > * { width: 240px; }
  }
`;

export default function ServicesSection({ services, onBook }: { services: Service[]; onBook: () => void }) {
  const [open, setOpen] = useState<Service | null>(null);
  const book = () => { setOpen(null); onBook(); };

  return (
    <section id="services" style={{ padding: '110px 28px', background: BG, position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GRID_CSS }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div data-reveal style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-block', background: YEL, color: PD, ...DISP, fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 18px', borderRadius: 20, marginBottom: 20 }}>Services</span>
          <h2 style={{ ...DISP, fontSize: 'clamp(32px,4.2vw,62px)', fontWeight: 800, letterSpacing: '-.055em', color: PD, margin: 0 }}>
            Content formats that <em style={{ fontStyle: 'italic' }} className="mkt-gradient-text">drive results.</em>
          </h2>
        </div>
        <div className="svc-grid">
          {services.map(s => <ServiceCard key={s.key} s={s} onOpen={() => setOpen(s)} />)}
        </div>
      </div>
      {open && <Stage s={open} onClose={() => setOpen(null)} onBook={book} />}
    </section>
  );
}
