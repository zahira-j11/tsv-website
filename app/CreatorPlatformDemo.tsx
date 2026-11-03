'use client';

// How it works: a looping mock-up of the client view of the TSV portal
// (tsvportal.co.uk), drawn from the portal's own layout, copy and colours. A
// casting list narrows the grid, a creator's profile opens and plays their
// intro, they're approved, and the review counts tick over.
//
// The portal is drawn at a fixed design size and scaled to fit the slot (--k,
// set in script), so it reads like a screenshot at any width; below 1100px it
// switches to the portal's phone layout. Styles are the "cpd-" block in
// globals.css. Cards sit on a doubled track that one transform scrolls, so the
// scroll never visibly wraps; each card's slot comes in as custom properties
// for both layouts, so moving a card is a transform transition. Everything
// that moves is a transform or opacity, so nothing shifts the page layout. The
// loop only runs while the frame is on screen; reduced motion gets a still.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Stock headshots supplied by Zahira (Nov 2026), cropped to the portal's 4:5
// card. Names, cities, skills and lists are placeholders, never real creators.
const CREATORS: { name:string; city:string; skills:string[]; list:number }[] = [
  { name:'Callum R.', city:'London',     skills:['Acting', 'Presenting', 'Voiceover'],          list:1 },
  { name:'Leo M.',    city:'Brighton',   skills:['Day-in-the-life', 'UGC Creation', 'Hosting'],  list:0 },
  { name:'Hannah K.', city:'Manchester', skills:['Commercial Acting', 'Script Reading'],         list:1 },
  { name:'Mia T.',    city:'London',     skills:['Presenting', 'Hosting', 'Voiceover'],          list:2 },
  { name:'Sophie L.', city:'Leeds',      skills:['Acting', 'Voiceover', 'Script Reading'],       list:1 },
  { name:'Ella P.',   city:'Bristol',    skills:['Tutorials/how-to Content', 'Day-in-the-life'], list:0 },
  { name:'Grace O.',  city:'London',     skills:['Presenting', 'Hosting', 'Voiceover'],          list:2 },
  { name:'Tom H.',    city:'London',     skills:['Commercial Acting', 'Presenting'],             list:1 },
  { name:'Amy C.',    city:'Glasgow',    skills:['Hosting', 'Presenting'],                       list:2 },
  { name:'Jess W.',   city:'Birmingham', skills:['UGC Creation', 'Day-in-the-life'],             list:0 },
  { name:'Lucy B.',   city:'London',     skills:['Acting', 'Script Reading', 'Voiceover'],       list:1 },
  { name:'Katie D.',  city:'Manchester', skills:['UGC Creation', 'Tutorials/how-to Content'],    list:0 },
  { name:'Josh A.',   city:'London',     skills:['Presenting', 'Hosting'],                       list:2 },
  { name:'Maya S.',   city:'Leeds',      skills:['UGC Creation', 'Voiceover'],                   list:0 },
  { name:'Dan G.',    city:'London',     skills:['Commercial Acting', 'Voiceover'],              list:1 },
  { name:'Sam E.',    city:'Bristol',    skills:['Hosting', 'Presenting', 'Voiceover'],          list:2 },
  { name:'Ryan N.',   city:'Birmingham', skills:['Presenting', 'Script Reading'],                list:2 },
  { name:'Zara J.',   city:'London',     skills:['Day-in-the-life', 'UGC Creation'],             list:0 },
];
// The track holds the list twice and only tiles seamlessly when both column
// counts divide it, so keep the list a multiple of 6.
const N = CREATORS.length;
const photo = (i: number) => `/creators/creator-${String(i + 1).padStart(2, '0')}.webp`;

// The client's casting lists, as in the portal sidebar. Counts are
// placeholders and include creators beyond the 18 drawn here.
const LISTS = [
  { name:'UGC Casting Options',                short:'UGC Casting',      count:24 },
  { name:'Hi-Fi Studio Shoot Casting Options', short:'Hi-Fi Studio',     count:14 },
  { name:'Street Interview Casting',           short:'Street Interview', count:8 },
];
const ALL = 46;
const COUNTS = { review:18, approved:16, maybe:4, rejected:8 };

// Each round opens one casting list. `matches` are its creators (indexes into
// CREATORS) in slot order; `pick` gets approved and sits in slots 0–3, which
// are on screen in both layouts.
const ROUNDS = [
  { list:0, matches:[1, 5, 9, 11, 13, 17], pick:5 },
  { list:1, matches:[0, 2, 4, 7, 10, 14],  pick:7 },
  { list:2, matches:[3, 6, 8, 12, 15, 16], pick:8 },
];
// Zooms into the open creator's photo that stand in for their video thumbnails.
const WORK = [
  { origin:'50% 28%', zoom:1.25 },
  { origin:'32% 40%', zoom:1.75 },
  { origin:'50% 80%', zoom:1.1 },
  { origin:'58% 40%', zoom:1.6 },
];
const SPEED = 60; // design px per second while browsing
// Below this the portal switches to its phone layout, and the loop to taps.
const COMPACT = '(max-width: 1099px)';

type Pt = { x:number; y:number };
type View = {
  list: number | null;     // casting list open in the sidebar; null is all creators
  placed: number[] | null; // track position of each match while a list is open
  back: number[] | null;   // matches sliding home after the list closes
  rest: number;            // scroll offset when the list opened
  hover: number | null;    // track position of the card under the cursor
  open: boolean;           // profile showing
  who: number;             // creator in the profile (kept while it slides away)
  slot: number;            // their place in the list, for "2 of 6"
  playing: boolean;
  decided: boolean;
  approved: number[];      // creators approved so far this loop
  review: number;
  yes: number;             // the Approved tab's count
  cursor: Pt & { on:boolean; glide:boolean; press:number };
  tap: (Pt & { id:number }) | null;
};
const START: View = {
  list:null, placed:null, back:null, rest:0, hover:null, open:false, who:0, slot:0,
  playing:false, decided:false, approved:[], review:COUNTS.review, yes:COUNTS.approved,
  cursor:{ x:0, y:0, on:false, glide:false, press:0 }, tap:null,
};

export default function CreatorPlatformDemo() {
  const frameRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(START);
  const [near, setNear] = useState(false);
  // The server sends one copy of the track; the second, which only matters
  // once the scroll wraps, is added after hydration to keep the HTML small.
  const [doubled, setDoubled] = useState(false);

  useEffect(() => {
    const frame = frameRef.current, canvas = canvasRef.current, grid = gridRef.current, track = trackRef.current;
    if (!frame || !canvas || !grid || !track) return;

    // Fit the design-size portal to the frame.
    const fit = () => frame.style.setProperty('--k', String(frame.clientWidth / canvas.offsetWidth));
    fit();

    // Fetch the photos shortly before the frame arrives. Native lazy loading
    // alone would leave cards blank until they scroll into the clipped grid.
    const nearObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); nearObs.disconnect(); }
    }, { rootMargin:'600px 0px' });
    nearObs.observe(frame);

    const compact = window.matchMedia(COMPACT).matches;
    const set = (patch: Partial<View> | ((v: View) => Partial<View>)) =>
      setView(v => ({ ...v, ...(typeof patch === 'function' ? patch(v) : patch) }));
    // Cursor and taps live outside the scaled canvas, in frame pixels.
    const at = (sel: string, fx = 0.5, fy = 0.5): Pt => {
      const f = frame.getBoundingClientRect(), b = frame.querySelector(sel)!.getBoundingClientRect();
      return { x:b.left - f.left + b.width * fx, y:b.top - f.top + b.height * fy };
    };
    const point = (p: Pt, on = true, glide = true) => set(v => ({ cursor:{ ...v.cursor, ...p, on, glide } }));
    const tap = (p: Pt) => set(v => ({ tap:{ ...p, id:(v.tap?.id ?? 0) + 1 }, cursor:{ ...v.cursor, press:v.cursor.press + 1 } }));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // One still: a creator approved, the counts moved on, another card under the cursor.
      set({ hover:4, approved:[ROUNDS[0].pick], review:COUNTS.review - 1, yes:COUNTS.approved + 1 });
      if (!compact) requestAnimationFrame(() => requestAnimationFrame(() =>
        point(at('[data-pos="4"] .cpd-photo', 0.6, 0.55), true, false)));
      const sizeObs = new ResizeObserver(fit);
      sizeObs.observe(frame);
      return () => { nearObs.disconnect(); sizeObs.disconnect(); };
    }

    setDoubled(true);
    let s = 0, v = 0, vTo = SPEED, t = 0, last = 0, raf = 0, next = 0, round = 0;
    let m = { cols:3, pitch:340, H:N / 3 * 340, viewH:600 };
    let placed: number[] = [];

    const measure = () => {
      fit();
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
    // The sidebar holds the lists on desktop; the phone layout has a row of pills.
    const listAt = (list: number | 'all') => at(compact ? `[data-pill="${list}"]` : `[data-list="${list}"]`, compact ? 0.5 : 0.35, 0.55);
    const cardAt = () => at(`[data-pos="${target()}"] .cpd-photo`, 0.6, 0.55);
    const approveAt = () => at('.cpd-dec.dec-yes', 0.5, 0.6);
    const backAt = () => at('.cpd-back', 0.5, 0.6);
    const restAt = (): Pt => ({ x:frame.clientWidth * 0.8, y:frame.clientHeight * 0.9 });

    const openList = () => set({ list:R().list });
    const filter = () => {
      v = 0; vTo = 0;
      placed = copies(R().matches);
      set({ placed, rest:s });
    };
    const openProfile = () => set({ hover:target(), open:true, who:R().pick, slot:R().matches.indexOf(R().pick), playing:false, decided:false });
    const approve = () => set(cur => ({ decided:true, approved:[...cur.approved, R().pick] }));
    const countOver = () => set(cur => ({ review:cur.review - 1, yes:cur.yes + 1 }));
    const closeProfile = () => set({ open:false, hover:null, playing:false });
    // The matches slide home first; the rest fade back in behind them.
    const showAll = () => set(cur => ({ list:null, placed:null, back:cur.placed }));
    const resume = () => { vTo = SPEED; set({ back:null }); };

    // [seconds into the round, what happens]
    const steps: [number, () => void][] = compact ? [
      [1.6,  () => { vTo = 0; }],
      [1.9,  () => { tap(listAt(R().list)); openList(); }],
      [2.0,  filter],
      [3.1,  () => { tap(cardAt()); openProfile(); }],
      [3.5,  () => set({ playing:true })],
      [4.2,  () => { tap(approveAt()); approve(); }],
      [4.5,  countOver],
      [5.5,  () => { tap(backAt()); closeProfile(); }],
      [6.2,  () => { tap(listAt('all')); showAll(); }],
      [6.7,  resume],
    ] : [
      [2.2,  () => point(restAt(), false, false)],
      [2.25, () => point(listAt(R().list))],
      [2.9,  () => { vTo = 0; }],
      [3.3,  () => { tap(listAt(R().list)); openList(); }],
      [3.4,  filter],
      [4.4,  () => point(cardAt())],
      [4.9,  () => set({ hover:target() })],
      [5.3,  () => { tap(cardAt()); openProfile(); }],
      [5.9,  () => set({ playing:true })],
      [7.3,  () => point(approveAt())],
      [7.7,  () => { tap(approveAt()); approve(); }],
      [8.0,  countOver],
      [8.9,  () => point(backAt())],
      [9.3,  () => { tap(backAt()); closeProfile(); }],
      [9.9,  () => point(listAt('all'))],
      [10.3, () => { tap(listAt('all')); showAll(); }],
      [10.8, () => { resume(); point(restAt(), false); }],
    ];
    const cycle = compact ? 8.4 : 12;

    const tick = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      t += dt;
      while (next < steps.length && t >= steps[next][0]) steps[next++][1]();
      if (t >= cycle) {
        t -= cycle; next = 0;
        round = (round + 1) % ROUNDS.length;
        // Back to the starting counts once every round has played.
        if (round === 0) set({ approved:[], review:COUNTS.review, yes:COUNTS.approved });
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

  const { cursor, tap } = view;
  const who = CREATORS[view.who];
  const img = (i: number) => (
    <Image src={photo(i)} alt="" width={336} height={420} unoptimized draggable={false} loading={near ? 'eager' : 'lazy'} />
  );
  return (
    <div ref={frameRef} className="cpd" role="img"
      aria-label="Mock-up of the TSV client portal: browsing the creators The Social Vision has put forward, opening a casting list, viewing a creator’s profile and approving them.">
      <div ref={canvasRef} className="cpd-canvas" aria-hidden="true">
        <aside className="cpd-side">
          <div className="cpd-brand"><span className="cpd-logo">YB</span>Your Brand</div>
          <nav className="cpd-nav">
            <p className="cpd-nav-head">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 14s1-1 1-4a4 4 0 10-8 0c0 3 1 4 1 4h6zM6 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              Creator Network
            </p>
            <span data-list="all" className={`cpd-nav-item${view.list === null ? ' is-on' : ''}`}><span>All creators</span><b>{ALL}</b></span>
            {LISTS.map((l, i) => (
              <span key={l.name} data-list={i} className={`cpd-nav-item${view.list === i ? ' is-on' : ''}`}><span>{l.name}</span><b>{l.count}</b></span>
            ))}
            <p className="cpd-nav-head">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 12l8-4.5 M12 12v9 M12 12L4 7.5" /></svg>
              Shipping<i className="cpd-badge">3</i>
            </p>
            <p className="cpd-nav-head">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2h12v10H2zM5 12v2M11 12v2M3.5 14h9" /></svg>
              Resources
            </p>
          </nav>
          <span className="cpd-help">? Help</span>
          <p className="cpd-powered">Powered by The Social Vision</p>
        </aside>

        <div className="cpd-topbar">
          <span className="cpd-logo">YB</span>Your Brand
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M3 5h14v2H3zM3 9h14v2H3zM3 13h14v2H3z" /></svg>
        </div>

        <div className="cpd-main">
          <div className="cpd-head">
            <div>
              <p className="cpd-eyebrow">Creator network</p>
              <p className="cpd-title">Creators for you</p>
              <p className="cpd-desc">Creators The Social Vision has put forward for you. Open a profile to see their work, then approve, maybe or reject.</p>
            </div>
            <div className="cpd-queue">
              <p><span className="cpd-num">{view.review}</span> of {ALL} left to review</p>
              <span className="cpd-bar"><i style={{ transform:`scaleX(${(ALL - view.review) / ALL})` }} /></span>
              <span className="cpd-link">Continue reviewing →</span>
            </div>
          </div>

          <div className="cpd-tabs">
            <span className="cpd-tab is-on">To Review <b>{view.review}</b></span>
            <span className="cpd-tab">Approved <b>{view.yes}</b></span>
            <span className="cpd-tab">Maybe <b>{COUNTS.maybe}</b></span>
            <span className="cpd-tab">Rejected <b>{COUNTS.rejected}</b></span>
            <span className="cpd-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              Search by name
            </span>
          </div>

          <div className="cpd-lists">
            <span data-pill="all" className={`cpd-pill${view.list === null ? ' is-on' : ''}`}>All creators <b>{ALL}</b></span>
            {LISTS.map((l, i) => (
              <span key={l.name} data-pill={i} className={`cpd-pill${view.list === i ? ' is-on' : ''}`}>{l.short} <b>{l.count}</b></span>
            ))}
          </div>

          <div ref={gridRef} className="cpd-grid">
            <div ref={trackRef} className={`cpd-track${view.back ? ' is-returning' : ''}`}>
              {Array.from({ length:doubled ? N * 2 : N }, (_, pos) => {
                const i = pos % N, c = CREATORS[i];
                const k = view.placed ? view.placed.indexOf(pos) : -1; // slot among the matches
                const slot = k >= 0 ? k : pos;
                const cls = ['cpd-card',
                  view.placed && k < 0 && 'is-out',
                  view.back?.includes(pos) && 'is-back',
                  view.hover === pos && 'is-hover',
                  view.approved.includes(i) && 'is-yes',
                ].filter(Boolean).join(' ');
                const style = {
                  '--c3':slot % 3, '--r3':Math.floor(slot / 3),
                  '--c2':slot % 2, '--r2':Math.floor(slot / 2),
                  '--dy':`${k >= 0 ? view.rest : 0}px`,
                  '--delay':`${k >= 0 ? k * 45 : 0}ms`,
                } as React.CSSProperties;
                return (
                  <div key={pos} data-pos={pos} className={cls} style={style}>
                    <div className="cpd-photo">
                      {img(i)}
                      <span className="cpd-status"><em>To Review</em><em>Approved</em></span>
                    </div>
                    <div className="cpd-body">
                      <p className="cpd-name">{c.name}</p>
                      <p className="cpd-loc">{c.city}, United Kingdom</p>
                      <p className="cpd-skills">{c.skills.join(' · ')}</p>
                      <span className="cpd-chip">{LISTS[c.list].name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`cpd-profile${view.open ? ' is-open' : ''}${view.playing ? ' is-playing' : ''}${view.decided ? ' is-yes' : ''}`}>
            <div className="cpd-strip">
              <span className="cpd-back">← All creators</span>
              <span className="cpd-pos"><b>{view.slot + 1} of 6</b> in To Review</span>
              <span className="cpd-step"><i>‹ Previous</i><i>Next ›</i></span>
            </div>
            <div className="cpd-strip cpd-decide">
              <span className="cpd-pname">{who.name}</span>
              <span className="cpd-status"><em>To Review</em><em>Approved</em></span>
              <span className="cpd-decisions">
                <span className="cpd-dec dec-yes"><em>✓</em>Approve</span>
                <span className="cpd-dec dec-maybe">Maybe</span>
                <span className="cpd-dec dec-no">Reject</span>
              </span>
            </div>
            <p className="cpd-moved"><span>{who.name.split(' ')[0]} moved to Approved</span><u>Undo</u></p>
            <div className="cpd-pbody">
              <div className="cpd-pphoto">
                {img(view.who)}
                <span className="cpd-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M7 4.5v15l13-7.5z" /></svg></span>
                <span className="cpd-progress"><i /></span>
              </div>
              <div className="cpd-pinfo">
                <p className="cpd-loc">{who.city}, United Kingdom</p>
                <p className="cpd-skills">{who.skills.join(' · ')}</p>
                <span className="cpd-chip">{LISTS[who.list].name}</span>
                <span className="cpd-lines"><i /><i /><i /><i /></span>
              </div>
            </div>
            {/* Their work: the portal shows a creator's videos under the profile. */}
            <div className="cpd-work">
              {WORK.map(w => (
                <span key={w.origin} className="cpd-reel" style={{ '--origin':w.origin, '--zoom':w.zoom } as React.CSSProperties}>
                  {img(view.who)}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M7 4.5v15l13-7.5z" /></svg>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tap && <span key={tap.id} className="cpd-tap" style={{ left:tap.x, top:tap.y }} aria-hidden="true" />}
      <span className={`cpd-cursor${cursor.on ? ' is-on' : ''}${cursor.glide ? ' is-glide' : ''}`}
        style={{ transform:`translate(${cursor.x}px,${cursor.y}px)` }} aria-hidden="true">
        <svg key={cursor.press} width="20" height="24" viewBox="0 0 20 24"><path d="M2 1.5v17.6l4.7-4.3 3.1 6.9 3.1-1.4-3-6.8h6.3z" fill="#fff" stroke="#21005D" strokeWidth="1.4" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}
