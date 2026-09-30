'use client';
import { openCookieSettings } from '@/lib/consent';

export default function CookieSettingsLink({ label = 'open cookie settings', style }: { label?: string; style?: React.CSSProperties }) {
  return (
    <button onClick={openCookieSettings} style={{
      background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit',
      color: '#7C01FF', textDecoration: 'underline', ...style,
    }}>{label}</button>
  );
}
