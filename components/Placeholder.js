const PALETTES = {
  parc: ['#1b4a3c', '#3f7d4e', '#7fb069'],
  nature: ['#1d4b5c', '#2f7a8c', '#7fc0c9'],
  histoire: ['#5a3a1c', '#9a6428', '#e0a64a'],
  culture: ['#4a2f3a', '#7d4b5a', '#d49a8a'],
};

// Visuel provisoire tant qu'aucune photo libre de droits n'est disponible.
export default function Placeholder({ category = 'parc', label }) {
  const [a, b, c] = PALETTES[category] || PALETTES.parc;
  return (
    <div className="ph" style={{ background: a }}>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="250" fill={a} />
        <circle cx="310" cy="70" r="38" fill={c} opacity="0.55" />
        <path d="M0 170 L60 110 L110 150 L180 80 L260 160 L320 120 L400 170 V250 H0 Z" fill={b} />
        <path d="M0 210 Q100 180 200 205 T400 200 V250 H0 Z" fill={a} opacity="0.85" />
        {[30, 70, 120, 175, 240, 300, 355].map((x, i) => (
          <path key={i} d={`M${x} 232 l12 -34 l12 34 Z`} fill={c} opacity="0.35" />
        ))}
      </svg>
      {label ? <span className="ph-label">{label}</span> : null}
    </div>
  );
}
