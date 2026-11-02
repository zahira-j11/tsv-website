'use client';

// How it works: a looping mock-up of finding a creator on our platform. The
// grid scrolls, a filter chip narrows it, one card plays a preview and gets
// shortlisted, then the filter clears and the scroll carries on.
//
// Plain React and CSS transitions; the styles are the "cpd-" block in
// globals.css. Cards sit on a doubled track that one transform scrolls, so the
// scroll never visibly wraps. Each card gets its grid slot for both the 3- and
// 2-column layouts as custom properties and a container query picks one, so
// moving a card is just a transform transition. Everything that moves is a
// transform, opacity or clip-path, so nothing shifts the page layout. The loop
// only runs while the frame is on screen; reduced-motion visitors get a still.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Faces are cut from public/creators-collage.png, the collage this replaced,
// so every photo is one the site already shows. Names and tags are
// placeholders, not the creators' real details.
const CREATORS: { name:string; tags:[string, string] }[] = [
  { name:'Mia',    tags:['Students', 'Food'] },
  { name:'Sophie', tags:['Parents', 'Home'] },
  { name:'Freya',  tags:['Beauty', 'Fashion'] },
  { name:'Josh',   tags:['Fintech', 'Tech'] },
  { name:'Lucy',   tags:['Fintech', 'Food'] },
  { name:'Tom',    tags:['Parents', 'DIY'] },
  { name:'Ellie',  tags:['Beauty', 'Health'] },
  { name:'Jess',   tags:['Comedy', 'Food'] },
  { name:'Sam',    tags:['Fintech', 'Gaming'] },
  { name:'Hannah', tags:['Beauty', 'Travel'] },
  { name:'Amy',    tags:['Fitness', 'Food'] },
  { name:'Dan',    tags:['Fintech', 'Sport'] },
  { name:'Chloe',  tags:['Beauty', 'Pets'] },
  { name:'James',  tags:['Fintech', 'Home'] },
  { name:'Kai',    tags:['Students', 'Music'] },
  { name:'Megan',  tags:['Fintech', 'Travel'] },
  { name:'Grace',  tags:['Beauty', 'Style'] },
  { name:'Zara',   tags:['Beauty', 'Music'] },
];
// The track holds the list twice and only tiles seamlessly when both column
// counts divide it, so keep the list a multiple of 6.
const N = CREATORS.length;
const faceSrc = (i: number) => `/creators/creator-${String(i + 1).padStart(2, '0')}.webp`;
const TINTS = ['#F1E9FF', '#FFE6F5', '#FFF4C2', '#DDFBEB'];

const CHIPS = ['UK · Female · 25–34', 'Fintech', 'Beauty', 'Parents', 'Students'];

// Each round taps one chip. `matches` are the creators it leaves (indexes into
// CREATORS) in slot order; `pick` gets shortlisted and sits in slots 0–3,
// which are on screen in both layouts.
const ROUNDS = [
  { chip:0, matches:[1, 6, 2, 7, 9, 12],   pick:6  },
  { chip:1, matches:[3, 4, 8, 11, 13, 15], pick:11 },
  { chip:2, matches:[2, 6, 16, 9, 12, 17], pick:16 },
];
// On the shortlist before the loop starts, so the counter opens at 2.
const SHORTLISTED = [3, 15];

const SPEED = 60; // px per second while browsing

type Pt = { x:number; y:number };
type View = {
  chip: number | null;
  placed: number[] | null; // track position of each match while filtered
  back: number[] | null;   // matches sliding home after the filter clears
  rest: number;            // scroll offset when the filter went on
  hover: number | null;    // track position of the card being previewed
  playing: boolean;
  open: boolean;           // "Shortlisted" pill showing on the hovered card
  picked: number[];
  count: number;
  cursor: Pt & { on:boolean; glide:boolean; press:number };
  tap: (Pt & { id:number }) | null;
  fly: { id:number; src:string; size:number; from:Pt; to:Pt } | null;
};
const START: View = {
  chip:null, placed:null, back:null, rest:0, hover:null, playing:false, open:false,
  picked:SHORTLISTED, count:SHORTLISTED.length,
  cursor:{ x:0, y:0, on:false, glide:false, press:0 }, tap:null, fly:null,
};

export default function CreatorPlatformDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(START);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const frame = frameRef.current, grid = gridRef.current, track = trackRef.current;
    if (!frame || !grid || !track) return;

    // Fetch the faces shortly before the frame arrives. Native lazy loading
    // alone would leave cards blank until they scroll into the clipped grid.
    const nearObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); nearObs.disconnect(); }
    }, { rootMargin:'600px 0px' });
    nearObs.observe(frame);

    const compact = window.matchMedia('(max-width: 768px)').matches; // phones get the short version
    const set = (patch: Partial<View> | ((v: View) => Partial<View>)) =>
      setView(v => ({ ...v, ...(typeof patch === 'function' ? patch(v) : patch) }));
    const box = (sel: string) => {
      const f = frame.getBoundingClientRect(), b = frame.querySelector(sel)!.getBoundingClientRect();
      return { x:b.left - f.left, y:b.top - f.top, w:b.width, h:b.height };
    };
    const at = (sel: string, fx = 0.5, fy = 0.5): Pt => {
      const b = box(sel);
      return { x:b.x + b.w * fx, y:b.y + b.h * fy };
    };
    const point = (p: Pt, on = true, glide = true) => set(v => ({ cursor:{ ...v.cursor, ...p, on, glide } }));
    const tap = (p: Pt) => set(v => ({ tap:{ ...p, id:(v.tap?.id ?? 0) + 1 }, cursor:{ ...v.cursor, press:v.cursor.press + 1 } }));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // One still that tells the whole story: filter on, a creator shortlisted.
      const r = ROUNDS[0];
      set({ chip:r.chip, placed:r.matches, hover:r.pick, open:true, picked:[...SHORTLISTED, r.pick], count:SHORTLISTED.length + 1 });
      if (!compact) requestAnimationFrame(() => requestAnimationFrame(() =>
        point(at(`[data-pos="${r.pick}"] .cpd-add-icon`, 0.45, 0.55), true, false)));
      return () => nearObs.disconnect();
    }

    let s = 0, v = 0, vTo = SPEED, t = 0, last = 0, raf = 0, next = 0, round = 0;
    let m = { cols:3, pitch:168, H:N / 3 * 168, viewH:500 };
    let placed: number[] = [];

    const measure = () => {
      const cs = getComputedStyle(track);
      const cols = parseInt(cs.getPropertyValue('--cols'), 10) || 3;
      const pitch = (track.firstElementChild as HTMLElement).offsetHeight + (parseFloat(cs.getPropertyValue('--gap')) || 0);
      m = { cols, pitch, H:N / cols * pitch, viewH:grid.clientHeight };
      s %= m.H;
    };
    // Each match slides in from whichever of its two copies is nearer the
    // middle of the window, so it moves from where the viewer last saw it.
    const copies = (matches: number[]) => matches.map(i => {
      const mid = s + m.viewH / 2, y = Math.floor(i / m.cols) * m.pitch + m.pitch / 2;
      return Math.abs(y - mid) <= Math.abs(y + m.H - mid) ? i : i + N;
    });

    const R = () => ROUNDS[round];
    const target = () => placed[R().matches.indexOf(R().pick)];
    const chipAt = () => at(`[data-chip="${R().chip}"]`, 0.55, 0.65);
    const cardAt = () => at(`[data-pos="${target()}"] .cpd-media`, 0.62, 0.62);
    const addAt  = () => at(`[data-pos="${target()}"] .cpd-add-icon`, 0.45, 0.55);
    const restAt = (): Pt => ({ x:frame.clientWidth * 0.8, y:frame.clientHeight * 0.9 });

    const filter = () => {
      v = 0; vTo = 0;
      placed = copies(R().matches);
      set({ placed, rest:s });
    };
    const pick = () => {
      const from = box(`[data-pos="${target()}"] .cpd-face`), to = box('.cpd-count b'), id = R().pick;
      set(cur => ({
        open:true, picked:[...cur.picked, id],
        fly:{ id:(cur.fly?.id ?? 0) + 1, src:faceSrc(id), size:from.w, from:{ x:from.x, y:from.y },
              to:{ x:to.x + (to.w - from.w) / 2, y:to.y + (to.h - from.w) / 2 } },
      }));
    };
    const countUp  = () => set(c => ({ count:c.count + 1 }));
    const unhover  = () => set({ hover:null, playing:false, open:false });
    // The matches slide home first; the rest fade back in behind them.
    const unfilter = () => set(cur => ({ chip:null, placed:null, back:cur.placed }));
    const resume   = () => { vTo = SPEED; set({ back:null }); };

    // [seconds into the round, what happens]
    const steps: [number, () => void][] = compact ? [
      [1.7,  () => { vTo = 0; }],
      [2.0,  () => { tap(chipAt()); set({ chip:R().chip }); }],
      [2.1,  filter],
      [3.2,  () => { tap(addAt()); set({ hover:target() }); pick(); }],
      [3.65, countUp],
      [4.6,  unhover],
      [5.0,  () => { tap(chipAt()); unfilter(); }],
      [5.45, resume],
    ] : [
      [2.3,  () => point(restAt(), false, false)],
      [2.35, () => point(chipAt())],
      [3.0,  () => { vTo = 0; }],
      [3.4,  () => { tap(chipAt()); set({ chip:R().chip }); }],
      [3.5,  filter],
      [4.5,  () => point(cardAt())],
      [5.2,  () => set({ hover:target() })],
      [5.5,  () => set({ playing:true })],
      [7.25, () => point(addAt())],
      [7.65, () => { tap(addAt()); pick(); }],
      [8.15, countUp],
      [8.8,  () => { unhover(); point(chipAt()); }],
      [9.45, () => { tap(chipAt()); unfilter(); }],
      [9.95, () => { resume(); point(restAt(), false); }],
    ];
    const cycle = compact ? 7.6 : 11;

    const tick = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      t += dt;
      while (next < steps.length && t >= steps[next][0]) steps[next++][1]();
      if (t >= cycle) {
        t -= cycle; next = 0;
        round = (round + 1) % ROUNDS.length;
        // Back to the starting shortlist once every round has played.
        if (round === 0) set({ picked:SHORTLISTED, count:SHORTLISTED.length });
      }
      v += (vTo - v) * Math.min(1, dt * 5);
      s = (s + v * dt) % m.H;
      track.style.transform = `translate3d(0,${-s.toFixed(2)}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    const runObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) { last = 0; raf = requestAnimationFrame(tick); }
      else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold:0.25 });
    runObs.observe(frame);
    const sizeObs = new ResizeObserver(measure);
    sizeObs.observe(frame);
    measure();

    return () => { cancelAnimationFrame(raf); runObs.disconnect(); nearObs.disconnect(); sizeObs.disconnect(); };
  }, []);

  const { cursor, tap, fly } = view;
  return (
    <div ref={frameRef} className="cpd" role="img"
      aria-label="Mock-up of the TSV creator platform: scrolling through creator cards, filtering by audience and shortlisting a creator.">
      <div className="cpd-bar" aria-hidden="true">
        <span className="cpd-dots"><i /><i /><i /></span>
        <span className="cpd-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <span>Search <span className="cpd-long">300+ vetted </span>creators</span>
        </span>
        <span key={view.count} className="cpd-count"><b>{view.count}</b>shortlisted</span>
      </div>

      <div className="cpd-chips" aria-hidden="true">
        {CHIPS.map((c, i) => (
          <span key={c} data-chip={i} className={`cpd-chip${view.chip === i ? ' is-on' : ''}`}>{c}</span>
        ))}
      </div>

      <div ref={gridRef} className="cpd-grid" aria-hidden="true">
        <div ref={trackRef} className={`cpd-track${view.back ? ' is-returning' : ''}`}>
          {Array.from({ length:N * 2 }, (_, pos) => {
            const i = pos % N, c = CREATORS[i];
            const k = view.placed ? view.placed.indexOf(pos) : -1; // slot among the matches
            const slot = k >= 0 ? k : pos;
            const hover = view.hover === pos;
            const cls = ['cpd-card',
              view.placed && k < 0 && 'is-out',
              view.back?.includes(pos) && 'is-back',
              hover && 'is-hover',
              hover && view.playing && 'is-playing',
              hover && view.open && 'is-open',
              view.picked.includes(i) && 'is-picked',
            ].filter(Boolean).join(' ');
            const style = {
              '--c3':slot % 3, '--r3':Math.floor(slot / 3),
              '--c2':slot % 2, '--r2':Math.floor(slot / 2),
              '--dy':`${k >= 0 ? view.rest : 0}px`,
              '--delay':`${k >= 0 ? k * 45 : 0}ms`,
            } as React.CSSProperties;
            return (
              <div key={pos} data-pos={pos} className={cls} style={style}>
                <div className="cpd-media" style={{ background:TINTS[i % TINTS.length] }}>
                  <span className="cpd-face">
                    <Image src={faceSrc(i)} alt="" width={64} height={64} unoptimized draggable={false} loading={near ? 'eager' : 'lazy'} />
                  </span>
                  <span className="cpd-play">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M7 4.5v15l13-7.5z" /></svg>
                  </span>
                  <span className="cpd-cam">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5" /><path d="M15.5 10.5l5-3v9l-5-3z" /></svg>
                    <span className="cpd-eq"><i /><i /><i /></span>
                  </span>
                  <span className="cpd-progress"><i /></span>
                </div>
                <div className="cpd-name">{c.name}</div>
                <div className="cpd-foot">
                  <span className="cpd-tags"><span>{c.tags[0]}</span><span>{c.tags[1]}</span></span>
                  <span className="cpd-add">
                    <em>Shortlisted</em>
                    <span className="cpd-add-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {fly && (
        <Image key={fly.id} className="cpd-fly" src={fly.src} alt="" width={64} height={64} unoptimized aria-hidden="true"
          style={{ width:fly.size, height:fly.size, '--fx':`${fly.from.x}px`, '--fy':`${fly.from.y}px`, '--tx':`${fly.to.x}px`, '--ty':`${fly.to.y}px` } as React.CSSProperties} />
      )}
      {tap && <span key={tap.id} className="cpd-tap" style={{ left:tap.x, top:tap.y }} aria-hidden="true" />}
      <span className={`cpd-cursor${cursor.on ? ' is-on' : ''}${cursor.glide ? ' is-glide' : ''}`}
        style={{ transform:`translate(${cursor.x}px,${cursor.y}px)` }} aria-hidden="true">
        <svg key={cursor.press} width="20" height="24" viewBox="0 0 20 24"><path d="M2 1.5v17.6l4.7-4.3 3.1 6.9 3.1-1.4-3-6.8h6.3z" fill="#fff" stroke="#21005D" strokeWidth="1.4" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}
