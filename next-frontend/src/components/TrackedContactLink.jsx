'use client';

import React from 'react';
import { trackContactTap } from '@/lib/tracking';

export default function TrackedContactLink({
  type = 'whatsapp',
  location = 'Website',
  href,
  children,
  className = '',
  target,
  rel,
  ariaLabel,
  ...rest
}) {
  const handleClick = () => {
    trackContactTap(type, { location });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </a>
  );
}
