'use client';

import { useState } from 'react';

export default function CopyTemplate({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  const label = state === 'copied' ? 'Copied' : state === 'failed' ? 'Select the text and copy it' : 'Copy template';

  return (
    <button type="button" className="docs-copy" onClick={copy} aria-live="polite">
      {label}
    </button>
  );
}
