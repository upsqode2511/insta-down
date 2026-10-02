import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({ size, className = '', showText = true, ...props }: LogoProps) {
  const height = size || 40;
  // Aspect ratio for full logo (icon + text): 510x110
  const width = size ? (showText ? size * (510 / 110) : size) : undefined;

  return (
    <svg
      viewBox={showText ? "0 0 510 110" : "0 0 110 110"}
      height={height}
      width={width || 'auto'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`header-logo ${className}`.trim()}
      aria-label="InstaDown"
      style={{
        overflow: 'visible',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: size ? `${size}px` : undefined,
      }}
      {...props}
    >
      <defs>
        {/* Squircle Gradient */}
        <linearGradient id="logoInstaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="20%" stopColor="#9333EA" />
          <stop offset="45%" stopColor="#DB2777" />
          <stop offset="80%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>

        {/* Center lens deep purple gradient */}
        <radialGradient id="logoLensRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="70%" stopColor="#310D60" />
          <stop offset="100%" stopColor="#1E0038" />
        </radialGradient>
      </defs>

      {/* ==================== ICON GROUP ==================== */}
      <g id="logo-icon">
        {/* Outer Squircle */}
        <rect
          x="5"
          y="5"
          width="100"
          height="100"
          rx="27"
          ry="27"
          fill="url(#logoInstaBg)"
        />

        {/* Camera Outer Rounded Square White Frame */}
        <rect
          x="18"
          y="18"
          width="74"
          height="74"
          rx="20"
          ry="20"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6.5"
        />

        {/* Camera Top-Right White Dot */}
        <circle cx="74" cy="34" r="4.2" fill="#FFFFFF" />

        {/* Camera Center White Outer Ring */}
        <circle
          cx="55"
          cy="55"
          r="21.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
        />

        {/* Center Dark Purple Lens Circle */}
        <circle
          cx="55"
          cy="55"
          r="16.5"
          fill="url(#logoLensRadial)"
        />

        {/* Solid White Download Arrow */}
        <path
          d="M48.5 39 H61.5 V52 H71 L55 67 L39 52 H48.5 V39 Z"
          fill="#FFFFFF"
        />

        {/* Tray Outer Purple Accent / Glow */}
        <path
          d="M34.5 61 V72.5 C34.5 80 39.5 84.5 47 84.5 H63 C70.5 84.5 75.5 80 75.5 72.5 V61"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tray Solid White Core */}
        <path
          d="M35 61 V72 C35 78.5 39.5 82.5 47 82.5 H63 C70.5 82.5 75 78.5 75 72 V61"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ==================== EXACT WORDMARK ==================== */}
      {showText && (
        <text
          x="126"
          y="77"
          fontFamily="'Outfit', 'Plus Jakarta Sans', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="800"
          fontSize="66"
          letterSpacing="-0.5px"
          dominantBaseline="auto"
        >
          <tspan fill="#0B0F19">Insta</tspan>
          <tspan fill="#7900F5">D</tspan>
          <tspan fill="#FF007F">o</tspan>
          <tspan fill="#FF0066">w</tspan>
          <tspan fill="#FF7A00">n</tspan>
        </text>
      )}
    </svg>
  );
}
