'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

/**
 * next/image that tries once more before giving up. A tab left open across a
 * deploy, or a slow first resize on Vercel, can make an image request fail.
 * The retry asks for the original file instead of the resized copy (or, if it
 * already was the original, the same file again, past any cached failure). If
 * that fails too the image is dropped, so the slot's own background shows
 * instead of a broken-image icon.
 */
export default function RetryImage({ src, unoptimized, ...props }: ImageProps) {
  const [tries, setTries] = useState(0);
  if (tries > 1) return null;
  const retrySrc = tries === 1 && unoptimized && typeof src === 'string' ? `${src}?retry=1` : src;
  return (
    // alt is passed through in props.
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image key={tries} {...props} src={retrySrc} unoptimized={unoptimized || tries === 1}
      onError={() => setTries(t => t + 1)} />
  );
}
