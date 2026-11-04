import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  priority?: boolean;
  useTransparent?: boolean;
}

export default function Logo({
  size = 38,
  className = '',
  showText = true,
  priority = true,
  useTransparent = true,
}: LogoProps) {
  const height = size;
  // Aspect ratio of the cropped logo: 893x243 (~3.675)
  const width = Math.round(size * (893 / 243));

  if (!showText) {
    return (
      <Image
        src="/icon.svg"
        alt="InstaDown Icon"
        width={height}
        height={height}
        priority={priority}
        className={`header-logo-icon ${className}`.trim()}
        style={{
          height: `${height}px`,
          width: `${height}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      />
    );
  }

  const logoSrc = useTransparent ? '/logo-transparent.png' : '/logo.png';

  return (
    <Image
      src={logoSrc}
      alt="InstaDown"
      width={width}
      height={height}
      priority={priority}
      className={`header-logo ${className}`.trim()}
      style={{
        height: `${height}px`,
        width: 'auto',
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}
