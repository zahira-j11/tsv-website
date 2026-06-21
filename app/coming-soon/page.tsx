export default function ComingSoonPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '40px 24px',
      background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 46%, #f4f0ff 100%)',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Logo */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: '#7C01FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32,
        boxShadow: '0 12px 40px rgba(124,1,255,0.3)',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/>
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
        </svg>
      </div>

      <div style={{
        display: 'inline-block', background: 'rgba(124,1,255,0.09)', color: '#7C01FF',
        fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase',
        padding: '5px 18px', borderRadius: 20, marginBottom: 20,
      }}>Coming soon</div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px,6vw,72px)', fontWeight: 800,
        letterSpacing: '-.055em', color: '#21005D', lineHeight: 1.05, marginBottom: 20,
      }}>
        We&apos;re building<br />something great.
      </h1>

      <p style={{
        fontSize: 17, color: 'rgba(33,0,93,0.52)', lineHeight: 1.75,
        maxWidth: 440, marginBottom: 40,
      }}>
        This feature is on its way. In the meantime, book a call with our team and we&apos;ll get you set up directly.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#7C01FF', color: '#fff', fontSize: 15, fontWeight: 700,
            padding: '15px 28px', borderRadius: 14, textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(124,1,255,0.3)',
          }}
        >
          Book a call →
        </a>
        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#fff', color: '#21005D', fontSize: 15, fontWeight: 700,
            padding: '15px 28px', borderRadius: 14, textDecoration: 'none',
            border: '2px solid #E4DCFF',
          }}
        >
          ← Back to site
        </a>
      </div>
    </div>
  );
}
