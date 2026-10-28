// Reproduction vectorielle du logo du flyer : médaillon (arbre, drone, collines, rivière, ville)
// + mot-symbole « ΞAST / SMART FOREST & TOURISM ».
export function LogoMark({ className = 'brand-mark', title }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id="esft-clip"><circle cx="32" cy="32" r="28" /></clipPath>
        <linearGradient id="esft-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf3e3" />
          <stop offset="1" stopColor="#cfe3c4" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#1e3d2b" />
      <g clipPath="url(#esft-clip)">
        <rect x="0" y="0" width="64" height="64" fill="url(#esft-sky)" />
        {/* ville / croissance à droite */}
        <rect x="42" y="27" width="4" height="15" fill="#2f6b3a" />
        <rect x="47" y="22" width="4" height="20" fill="#3f7d4e" />
        <rect x="52" y="17" width="4" height="25" fill="#2f6b3a" />
        {/* collines */}
        <path d="M0 44 Q14 30 30 40 T64 36 V64 H0 Z" fill="#5f9b47" />
        <path d="M0 50 Q18 40 36 48 T64 45 V64 H0 Z" fill="#2f6b3a" />
        {/* rivière */}
        <path d="M18 64 C24 56 38 56 34 50 C31 46 40 44 46 45" stroke="#4aa3d1" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        {/* arbre parasol */}
        <path d="M17 44 L18 30 M18 33 L14 29 M18 32 L22 28" stroke="#3b2a1a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <ellipse cx="18" cy="26" rx="12" ry="5" fill="#1e3d2b" />
        <ellipse cx="13" cy="24" rx="5" ry="2.6" fill="#2f6b3a" />
        <ellipse cx="22" cy="23.5" rx="6" ry="2.6" fill="#2f6b3a" />
        {/* drone */}
        <g fill="#1e3d2b">
          <rect x="33" y="12" width="8" height="2.4" rx="1.2" />
          <rect x="30" y="10" width="5" height="1.2" rx=".6" />
          <rect x="39" y="10" width="5" height="1.2" rx=".6" />
          <rect x="32" y="10.6" width="1" height="2" />
          <rect x="41" y="10.6" width="1" height="2" />
        </g>
      </g>
      <circle cx="32" cy="32" r="28.5" fill="none" stroke="#e0a64a" strokeWidth="1.5" />
    </svg>
  );
}

export function Wordmark({ dark = false, size = 1 }) {
  const c = dark ? '#1e3d2b' : '#ffffff';
  return (
    <svg viewBox="0 0 150 40" width={150 * size} height={40 * size} aria-label="EAST Smart Forest & Tourism" role="img">
      {/* Ξ */}
      <rect x="2" y="2" width="22" height="4.5" rx="1" fill={c} />
      <rect x="5" y="11.5" width="16" height="4.5" rx="1" fill={c} />
      <rect x="2" y="21" width="22" height="4.5" rx="1" fill={c} />
      {/* A sans barre */}
      <path d="M30 25.5 L39.5 2 L49 25.5 H43.6 L39.5 14.5 L35.4 25.5 Z" fill={c} />
      <text x="54" y="25.5" style={{ fontFamily: "var(--font-display), Georgia, serif" }} fontWeight="600" fontSize="31" letterSpacing="2" fill={c}>ST</text>
      <text x="2" y="37.5" style={{ fontFamily: "var(--font-body), Arial, sans-serif" }} fontWeight="700" fontSize="7.4" letterSpacing="1.9" fill={dark ? '#3f7d4e' : '#e0a64a'}>SMART FOREST &amp; TOURISM</text>
    </svg>
  );
}

export default function Logo({ className = 'brand-mark' }) {
  return <LogoMark className={className} />;
}
