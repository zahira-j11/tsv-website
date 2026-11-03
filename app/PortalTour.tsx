'use client';

// How it works: a mock-up of the TSV client portal (tsvportal.co.uk) beside
// the three steps, drawn from the portal's own layout, copy and colours. It
// plays one scene per step, chosen by HowItWorksTour: concepts get approved,
// a casting list narrows the creator network and a creator is approved, then
// a video is reviewed (changes requested, a new cut, approved).
//
// The portal is drawn at a fixed design size and scaled to fit the slot (--k,
// set in script), so it reads like a screenshot at any width; below 1100px it
// switches to the portal's phone layout. Styles are the "cpd-" block in
// globals.css. In the creator scene, cards sit on a doubled track that one
// transform scrolls, so the scroll never visibly wraps; each card's slot comes
// in as custom properties for both layouts, so moving a card is a transform
// transition. Everything that moves is a transform or opacity, so nothing
// shifts the page layout. A scene only plays while the frame is on screen;
// reduced motion gets each scene's finished state and no autoplay.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ── Creator network ──────────────────────────────────────── */

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
  { name:'UGC',              count:20 },
  { name:'High Production',  count:14 },
  { name:'Street Interview', count:12 },
];
const ALL = 46;
const COUNTS = { review:18, approved:16, maybe:4, rejected:8 };

// Each visit to the creator scene opens the next casting list. `matches` are
// its creators (indexes into CREATORS) in slot order; `pick` gets approved
// and sits in slot 1, the top row in both layouts, so it is always in view.
const ROUNDS = [
  { list:0, matches:[1, 5, 9, 11, 13, 17], pick:5 },
  { list:1, matches:[0, 7, 2, 4, 10, 14],  pick:7 },
  { list:2, matches:[3, 6, 8, 12, 15, 16], pick:6 },
];
const SPEED = 60; // design px per second while browsing

/* ── Concepts and content review ──────────────────────────── */

// Frames from the site's own videos (the homepage already shows them) stand
// in for concept references and the cuts under review. Titles, hooks and
// comments are placeholders. The second row of concepts and the next video
// only peek in under the panel's fade, so each page reads as carrying on.
const CLD = 'https://res.cloudinary.com/dbjelnbfj/video/upload';
const videoFrame = (video: string, at: number, w: number, h: number) =>
  `${CLD}/so_${at},w_${w},h_${h},c_fill,g_auto,q_auto,f_auto/${video}.jpg`;
const CONCEPTS = [
  { format:'Street Interview Content',   name:'Guess the logo',    hook:'“Which one is the real logo?”',                 img:videoFrame('v1782047854/tsv-website/aiapply-street', 1, 336, 597) },
  { format:'Organic Social Productions', name:'The hot seat',      hook:'“Settle this once and for all…”',               img:videoFrame('v1782048316/tsv-website/prepkitchen-podcast', 1, 336, 597) },
  { format:'Creator-Led Organic',        name:'Save or spend?',    hook:'“She said she was going to save her money…”',   img:videoFrame('v1782048297/tsv-website/plum-scripted', 1, 336, 597) },
  { format:'Remote Creator UGC',         name:'Is this you?',      hook:'“Feeling hungry again an hour after eating?”',  img:videoFrame('v1782048447/tsv-website/ugc-2', 1, 336, 597) },
  { format:'Paid Social Productions',    name:'Agree or disagree', hook:'“You need a lot of money to start investing.”', img:videoFrame('v1782048247/tsv-website/hifi-ad-3', 1, 336, 597) },
  { format:'Street Interview Content',   name:'Would you rather?', hook:'“Which UK city would you rather live in?”',     img:videoFrame('v1782048070/tsv-website/habito-street', 1, 336, 597) },
];
const CUT = {
  label:'Batch 2 · Video 4', title:'Guess the degree',
  first:videoFrame('v1782048505/tsv-website/unicompare-street', 6, 360, 640),
  second:videoFrame('v1782048505/tsv-website/unicompare-street', 1, 360, 640),
  note:'Can the hook land in the first second?', reply:'New cut is up. Hook moved to 0:00.',
};
const NEXT = { label:'Batch 2 · Video 5', title:'Which uni would you date?', img:videoFrame('v1782047906/tsv-website/blackbullion-street', 1, 360, 640) };
const QUEUE = { waiting:3, approved:9 }; // content review counts before this cut is approved
// The portal's six campaign stages, shown across the top of the campaign scenes.
const PIPELINE = ['Concept pitch', 'Script approval', 'Casting shortlist', 'Casting approval', 'Production', 'Delivery of assets'];

// Below this the portal switches to its phone layout, and the scenes to taps.
const COMPACT = '(max-width: 1099px)';
const SCENE_TITLES = ['Concepts', 'Creator Network', 'Content review'];

type Pt = { x:number; y:number };
type View = {
  // Creator network
  list: number | null;     // casting list open in the sidebar; null is everyone
  placed: number[] | null; // track position of each match while a list is open
  back: number[] | null;   // matches sliding home after the list closes
  rest: number;            // scroll offset when the list opened
  hover: number | null;    // track position of the card under the cursor
  approved: number[];      // creators approved on this visit
  review: number;
  yes: number;             // the Approved tab's count
  // Concepts
  conceptHover: number | null;
  conceptPlaying: boolean;
  conceptsApproved: number[];
  // Content review: 0 first cut playing, 1 changes requested, 2 reply in, 3 new cut playing, 4 approved
  cut: number;
  cursor: Pt & { on:boolean; glide:boolean; press:number };
  tap: (Pt & { id:number }) | null;
};
const CREATOR_START = { list:null, placed:null, back:null, hover:null, approved:[] as number[], review:COUNTS.review, yes:COUNTS.approved };
const CONCEPT_START = { conceptHover:null, conceptPlaying:false, conceptsApproved:[] as number[] };
const START: View = {
  ...CREATOR_START, rest:0, ...CONCEPT_START, cut:0,
  cursor:{ x:0, y:0, on:false, glide:false, press:0 }, tap:null,
};

// The campaign pipeline strip: stages before `at` are done, `at` is current.
function Pipeline({ at }: { at: number }) {
  return (
    <div className="cpd-pipe">
      {PIPELINE.map((label, i) => (
        <span key={label} className={i < at ? 'is-done' : i === at ? 'is-on' : undefined}>
          <i>
            <b>{i + 1}</b>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
          </i>
          <em>{label}</em>
        </span>
      ))}
    </div>
  );
}

export default function PortalTour({ scene, run, still: reduced, barRef, onDone }: {
  scene: number;      // 0 concepts, 1 creator network, 2 content review
  run: number;        // bumped on every start, so picking the same step replays it
  still: boolean;     // reduced motion: finished states, no autoplay
  barRef: React.MutableRefObject<HTMLElement | null>; // the active step's progress bar
  onDone: () => void; // the scene has finished
}) {
  const frameRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(START);
  const [near, setNear] = useState(false);
  // The server sends one copy of the creator track; the second, which only
  // matters once the scroll wraps, is added after hydration.
  const [doubled, setDoubled] = useState(false);
  // Kept between scenes: the creator grid's scroll, its metrics, how many
  // times the creator scene has played, and the latest onDone.
  const scrollRef = useRef(0);
  const metricsRef = useRef({ cols:3, pitch:340, H:N / 3 * 340, viewH:500 });
  const lapRef = useRef(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // Sizing and lazy loading, for the life of the component.
  useEffect(() => {
    const frame = frameRef.current, canvas = canvasRef.current, grid = gridRef.current, track = trackRef.current;
    if (!frame || !canvas || !grid || !track) return;
    // Fit the design-size portal to the frame, and re-measure the creator grid.
    const measure = () => {
      frame.style.setProperty('--k', String(frame.clientWidth / canvas.offsetWidth));
      const cs = getComputedStyle(track);
      const cols = parseInt(cs.getPropertyValue('--cols'), 10) || 3;
      const pitch = (track.firstElementChild as HTMLElement).offsetHeight + (parseFloat(cs.getPropertyValue('--gap')) || 0);
      metricsRef.current = { cols, pitch, H:N / cols * pitch, viewH:grid.clientHeight };
      scrollRef.current %= metricsRef.current.H;
    };
    measure();
    const sizeObs = new ResizeObserver(measure);
    sizeObs.observe(frame);
    // Fetch the photos shortly before the frame arrives. Native lazy loading
    // alone would leave cards blank until they scroll into the clipped grid.
    const nearObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); nearObs.disconnect(); }
    }, { rootMargin:'600px 0px' });
    nearObs.observe(frame);
    if (!reduced) setDoubled(true);
    return () => { sizeObs.disconnect(); nearObs.disconnect(); };
  }, [reduced]);

  // One scene's timeline. It restarts whenever a scene starts.
  useEffect(() => {
    const frame = frameRef.current, grid = gridRef.current, track = trackRef.current;
    if (!frame || !grid || !track) return;
    const compact = window.matchMedia(COMPACT).matches;
    const set = (patch: Partial<View> | ((v: View) => Partial<View>)) =>
      setView(v => ({ ...v, ...(typeof patch === 'function' ? patch(v) : patch) }));
    // Cursor and taps live outside the scaled canvas, in frame pixels. `at`
    // looks inside this scene; `atFrame` anywhere, such as the sidebar.
    const atFrame = (sel: string, fx = 0.5, fy = 0.5): Pt => {
      const f = frame.getBoundingClientRect(), b = frame.querySelector(sel)!.getBoundingClientRect();
      return { x:b.left - f.left + b.width * fx, y:b.top - f.top + b.height * fy };
    };
    const at = (sel: string, fx = 0.5, fy = 0.5) => atFrame(`[data-scene="${scene}"] ${sel}`, fx, fy);
    const point = (p: Pt, on = true, glide = true) => set(v => ({ cursor:{ ...v.cursor, ...p, on, glide } }));
    const tap = (p: Pt) => set(v => ({ tap:{ ...p, id:(v.tap?.id ?? 0) + 1 }, cursor:{ ...v.cursor, press:v.cursor.press + 1 } }));
    const restAt = (): Pt => ({ x:frame.clientWidth * 0.8, y:frame.clientHeight * 0.9 });
    const hideCursor = () => set(v => ({ cursor:{ ...v.cursor, on:false, glide:false } }));

    // Every scene starts from its own beginning.
    if (scene === 0) set({ ...CONCEPT_START });
    if (scene === 1) set({ ...CREATOR_START });
    if (scene === 2) set({ cut:0 });
    hideCursor();

    if (reduced) {
      // Each scene's finished state, with the cursor resting where it ended.
      const ends: [Partial<View>, string][] = [
        [{ conceptsApproved:[0, 2] }, '[data-concept="2"] .cpd-cbtn'],
        [{ hover:1, approved:[1], review:COUNTS.review - 1, yes:COUNTS.approved + 1 }, '[data-pos="1"] .dec-yes'],
        [{ cut:4 }, '.rb-yes'],
      ];
      set(ends[scene][0]);
      if (!compact) requestAnimationFrame(() => requestAnimationFrame(() => point(at(ends[scene][1], 0.55, 0.6), true, false)));
      return;
    }

    let t = 0, last = 0, raf = 0, next = 0, v = 0, vTo = 0;
    let steps: [number, () => void][] = [];
    let cycle = 8;

    if (scene === 0) {
      const media = (i: number) => at(`[data-concept="${i}"] .cpd-cmedia`, 0.55, 0.5);
      const button = (i: number) => at(`[data-concept="${i}"] .cpd-cbtn`, 0.5, 0.55);
      const approve = (i: number) => set(c => ({ conceptsApproved:[...c.conceptsApproved, i], conceptPlaying:false }));
      steps = compact ? [
        [1.2, () => { tap(media(0)); set({ conceptHover:0, conceptPlaying:true }); }],
        [2.8, () => { tap(button(0)); approve(0); }],
        [3.5, () => set({ conceptHover:null })],
        [4.0, () => { tap(button(1)); approve(1); }],
      ] : [
        [1.0,  () => point(restAt(), false, false)],
        [1.05, () => point(media(0))],
        [1.8,  () => set({ conceptHover:0 })],
        [2.1,  () => set({ conceptPlaying:true })],
        [3.7,  () => point(button(0))],
        [4.1,  () => { tap(button(0)); approve(0); }],
        [4.7,  () => { set({ conceptHover:null }); point(button(2)); }],
        [5.5,  () => { tap(button(2)); approve(2); }],
        [6.3,  () => point(restAt(), false)],
      ];
      cycle = compact ? 5.8 : 7.4;
    }

    let placed: number[] = [];
    if (scene === 1) {
      const R = ROUNDS[lapRef.current++ % ROUNDS.length];
      const m = () => metricsRef.current;
      // Each match slides in from whichever of its two copies is nearer the
      // middle of the window, so it moves from where the viewer last saw it.
      const copies = (matches: number[]) => matches.map(i => {
        const mid = scrollRef.current + m().viewH / 2, y = Math.floor(i / m().cols) * m().pitch + m().pitch / 2;
        return Math.abs(y - mid) <= Math.abs(y + m().H - mid) ? i : i + N;
      });
      const target = () => placed[R.matches.indexOf(R.pick)];
      // The sidebar holds the lists on desktop, with Creator Network as the way
      // back to everyone; on phones a row of pills, and the open one is tapped again.
      const listAt = (list: number | 'all') => compact
        ? at(`[data-pill="${list === 'all' ? R.list : list}"]`, 0.5, 0.55)
        : atFrame(`[data-list="${list}"]`, 0.35, 0.55);
      const cardAt = () => at(`[data-pos="${target()}"] .cpd-photo`, 0.6, 0.4);
      const approveAt = () => at(`[data-pos="${target()}"] .dec-yes`, 0.55, 0.6);
      const openList = () => set({ list:R.list });
      const filter = () => {
        v = 0; vTo = 0;
        placed = copies(R.matches);
        set({ placed, rest:scrollRef.current });
      };
      const approve = () => set(cur => ({ approved:[...cur.approved, R.pick] }));
      const countOver = () => set(cur => ({ review:cur.review - 1, yes:cur.yes + 1 }));
      // The matches slide home first; the rest fade back in behind them.
      const showAll = () => set(cur => ({ list:null, placed:null, back:cur.placed }));
      const resume = () => { vTo = SPEED; set({ back:null }); };
      vTo = SPEED;
      steps = compact ? [
        [1.6, () => { vTo = 0; }],
        [1.9, () => { tap(listAt(R.list)); openList(); }],
        [2.0, filter],
        [3.0, () => { tap(cardAt()); set({ hover:target() }); }],
        [3.8, () => { tap(approveAt()); approve(); }],
        [4.1, countOver],
        [5.0, () => set({ hover:null })],
        [5.4, () => { tap(listAt('all')); showAll(); }],
        [5.9, resume],
      ] : [
        [2.0,  () => point(restAt(), false, false)],
        [2.05, () => point(listAt(R.list))],
        [2.7,  () => { vTo = 0; }],
        [3.1,  () => { tap(listAt(R.list)); openList(); }],
        [3.2,  filter],
        [4.2,  () => point(cardAt())],
        [4.7,  () => set({ hover:target() })],
        [5.5,  () => point(approveAt())],
        [5.9,  () => { tap(approveAt()); approve(); }],
        [6.2,  countOver],
        [7.0,  () => { set({ hover:null }); point(listAt('all')); }],
        [7.6,  () => { tap(listAt('all')); showAll(); }],
        [8.1,  () => { resume(); point(restAt(), false); }],
      ];
      cycle = compact ? 7.2 : 9.4;
    }

    if (scene === 2) {
      const changes = () => at('.rb-changes', 0.5, 0.55);
      const approve = () => at('.rb-yes', 0.5, 0.55);
      steps = compact ? [
        [1.5, () => { tap(changes()); set({ cut:1 }); }],
        [2.6, () => set({ cut:2 })],
        [3.2, () => set({ cut:3 })],
        [4.6, () => { tap(approve()); set({ cut:4 }); }],
      ] : [
        [1.5,  () => point(restAt(), false, false)],
        [1.55, () => point(changes())],
        [2.3,  () => { tap(changes()); set({ cut:1 }); }],
        [3.4,  () => set({ cut:2 })],
        [4.1,  () => set({ cut:3 })],
        [5.6,  () => point(approve())],
        [6.0,  () => { tap(approve()); set({ cut:4 }); }],
        [7.0,  () => point(restAt(), false)],
      ];
      cycle = compact ? 6.4 : 8.6;
    }

    const tick = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      t += dt;
      while (next < steps.length && t >= steps[next][0]) steps[next++][1]();
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(t / cycle, 1).toFixed(4)})`;
      if (scene === 1) {
        const H = metricsRef.current.H;
        v += (vTo - v) * Math.min(1, dt * 5);
        scrollRef.current = (scrollRef.current + v * dt) % H;
        track.style.transform = `translate3d(0,${-scrollRef.current.toFixed(2)}px,0)`;
      }
      if (t >= cycle) { raf = 0; doneRef.current(); return; }
      raf = requestAnimationFrame(tick);
    };
    const runObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf && t < cycle) { last = 0; raf = requestAnimationFrame(tick); }
      else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold:0.25 });
    runObs.observe(frame);
    return () => { cancelAnimationFrame(raf); runObs.disconnect(); };
  }, [scene, run, reduced, barRef]);

  const { cursor, tap } = view;
  const status = view.cut === 4 ? 2 : view.cut === 1 || view.cut === 2 ? 1 : 0;
  const img = (src: string, w: number, h: number, className?: string) => (
    <Image src={src} alt="" width={w} height={h} unoptimized draggable={false} loading={near ? 'eager' : 'lazy'} className={className} />
  );
  const check = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.2 4.2L19 7" /></svg>;
  const play = <svg width="14" height="14" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg>;
  return (
    <div ref={frameRef} className="cpd" role="img"
      aria-label="Mock-up of the TSV client portal: approving concepts, picking creators from the network The Social Vision puts forward, and reviewing a video before approving it.">
      <div ref={canvasRef} className="cpd-canvas" aria-hidden="true">
        <aside className="cpd-side">
          <nav className="cpd-nav">
            <span data-list="all" className={`cpd-nav-head${scene === 1 && view.list === null ? ' is-on' : ''}`}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 14s1-1 1-4a4 4 0 10-8 0c0 3 1 4 1 4h6zM6 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              Creator Network
            </span>
            {LISTS.map((l, i) => (
              <span key={l.name} data-list={i} className={`cpd-nav-item${scene === 1 && view.list === i ? ' is-on' : ''}`}><span>{l.name}</span><b>{l.count}</b></span>
            ))}
            <span className={`cpd-nav-head${scene === 0 ? ' is-on' : ''}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 1 4.24 10.24C15.13 14.36 14.5 15.5 14.5 17h-5c0-1.5-.63-2.64-1.74-3.76A6 6 0 0 1 12 3z" /><path d="M9.5 17h5M10.5 20h3" /></svg>
              Concepts
            </span>
            <span className={`cpd-nav-head${scene === 2 ? ' is-on' : ''}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="3" /><path d="M8 20h8M12 18v2" /><path d="M10 9l6 3-6 3z" /></svg>
              Content review
            </span>
          </nav>
          <p className="cpd-powered">Powered by The Social Vision</p>
        </aside>

        <div className="cpd-topbar">
          <span className="cpd-topbar-title">{SCENE_TITLES.map((s, i) => <em key={s} className={scene === i ? 'is-on' : undefined}>{s}</em>)}</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M3 5h14v2H3zM3 9h14v2H3zM3 13h14v2H3z" /></svg>
        </div>

        <div className="cpd-main">
          {/* 01 · Concepts */}
          <div data-scene="0" className={`cpd-scene${scene === 0 ? ' is-on' : ''}`}>
            <div className="cpd-head">
              <div>
                <p className="cpd-eyebrow">Campaign</p>
                <p className="cpd-title">Concepts</p>
                <p className="cpd-desc">You review and sign off on scripts and creative direction.</p>
              </div>
              <div className="cpd-queue">
                <p><span className="cpd-num">{view.conceptsApproved.length}</span> of {CONCEPTS.length} concepts approved</p>
                <span className="cpd-bar"><i style={{ transform:`scaleX(${view.conceptsApproved.length / CONCEPTS.length})` }} /></span>
              </div>
            </div>
            <Pipeline at={1} />
            <div className="cpd-concepts">
              {CONCEPTS.map((c, i) => (
                <div key={c.name} data-concept={i} className={['cpd-concept',
                  view.conceptHover === i && 'is-hover',
                  view.conceptHover === i && view.conceptPlaying && 'is-playing',
                  view.conceptsApproved.includes(i) && 'is-yes',
                ].filter(Boolean).join(' ')}>
                  <div className="cpd-cmedia">
                    {img(c.img, 336, 597)}
                    <span className="cpd-ref">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M19.6 6.7a4.8 4.8 0 01-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 11-2.1-2.8V9a6.3 6.3 0 105.5 6.3V8.8a8.2 8.2 0 004.8 1.5V6.9a4.9 4.9 0 01-1-.2z" /></svg>
                      Reference
                    </span>
                    <span className="cpd-cplay">{play}</span>
                    <span className="cpd-progress"><i /></span>
                  </div>
                  <div className="cpd-cbody">
                    <p className="cpd-cformat">{c.format}</p>
                    <p className="cpd-cname">{c.name}</p>
                    <p className="cpd-chook">Hook: {c.hook}</p>
                    <span className="cpd-cbtn"><em>Approve</em><em>{check}Approved</em></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 02 · Creator network */}
          <div data-scene="1" className={`cpd-scene${scene === 1 ? ' is-on' : ''}`}>
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
              {LISTS.map((l, i) => (
                <span key={l.name} data-pill={i} className={`cpd-pill${view.list === i ? ' is-on' : ''}`}>{l.name} <b>{l.count}</b></span>
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
                    '--delay':`${k >= 0 ? k * 40 : 0}ms`,
                  } as React.CSSProperties;
                  return (
                    <div key={pos} data-pos={pos} className={cls} style={style}>
                      <div className="cpd-photo">
                        {img(photo(i), 336, 420)}
                        <span className="cpd-status"><em>To Review</em><em>Approved</em></span>
                        <span className="cpd-actions">
                          <span className="cpd-dec dec-yes"><em>✓</em>Approve</span>
                          <span className="cpd-dec dec-maybe">Maybe</span>
                          <span className="cpd-dec dec-no">Reject</span>
                        </span>
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
          </div>

          {/* 03 · Content review */}
          <div data-scene="2" className={`cpd-scene${scene === 2 ? ' is-on' : ''}`}>
            <div className="cpd-head">
              <div>
                <p className="cpd-eyebrow">Campaign</p>
                <p className="cpd-title">Content review</p>
                <p className="cpd-desc">Approve deliverables shared by your team.</p>
              </div>
              <div className="cpd-counts">
                <span className="is-waiting"><b className="cpd-num">{view.cut === 4 ? QUEUE.waiting - 1 : QUEUE.waiting}</b>Awaiting review</span>
                <span className="is-done"><b className="cpd-num">{view.cut === 4 ? QUEUE.approved + 1 : QUEUE.approved}</b>Approved</span>
              </div>
            </div>
            <Pipeline at={view.cut === 4 ? 5 : 4} />
            <div className={`cpd-review is-cut${view.cut}`}>
              <div className="cpd-player">
                {img(CUT.first, 360, 640)}
                {img(CUT.second, 360, 640, 'cpd-cut2')}
                <span className="cpd-ver"><em>v1</em><em>v2</em></span>
                <span className="cpd-ready">{check}Ready to post</span>
                <span className="cpd-scrub"><i key={view.cut >= 3 ? 'second' : 'first'} /></span>
              </div>
              <div className="cpd-rv">
                <p className="cpd-rlabel">{CUT.label}</p>
                <p className="cpd-rtitle">{CUT.title}</p>
                <span className={`cpd-rstatus is-s${status}`}><em>Awaiting review</em><em>Changes requested</em><em>Approved</em></span>
                <p className="cpd-rhead">Comments</p>
                <div className={`cpd-comment${view.cut >= 1 ? ' is-in' : ''}`}>
                  <span className="cpd-avatar is-you">You</span>
                  <div><b>You <i>· 0:01</i></b><p>{CUT.note}</p></div>
                </div>
                <div className={`cpd-comment${view.cut >= 2 ? ' is-in' : ''}`}>
                  <span className="cpd-avatar"><Image src="/logos/tsv-logo-mark.png" alt="" width={26} height={26} unoptimized /></span>
                  <div><b>TSV <i>· just now</i></b><p>{CUT.reply}</p></div>
                </div>
              </div>
              <div className="cpd-rbtns">
                <span className="cpd-rbtn rb-yes"><em>{check}Approve</em><em>{check}Approved</em></span>
                <span className="cpd-rbtn rb-changes">Request changes</span>
              </div>
            </div>
            <div className="cpd-review is-next">
              <div className="cpd-player">{img(NEXT.img, 360, 640)}</div>
              <div className="cpd-rv">
                <p className="cpd-rlabel">{NEXT.label}</p>
                <p className="cpd-rtitle">{NEXT.title}</p>
                <span className="cpd-rstatus is-s0"><em>Awaiting review</em></span>
              </div>
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
