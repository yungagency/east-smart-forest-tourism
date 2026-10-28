// Icônes au trait (24×24), couleur héritée de currentColor.
const P = {
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  forest: <><path d="M7 3 2 13h4l-3 5h8l-3-5h4Z" /><path d="M7 18v3" /><path d="m16 6-4 7h3l-3 5h8l-3-5h3Z" /><path d="M16 18v3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /><path d="m15 9 5-5M17 4h3v3" /></>,
  tree: <><path d="M12 22v-7" /><path d="M8 15h8a4 4 0 0 0 1-7.9A5 5 0 0 0 7.2 6 4.5 4.5 0 0 0 8 15Z" /></>,
  elephant: <><path d="M4 18v-6a7 7 0 0 1 7-7h3a6 6 0 0 1 6 6v2c0 2-1 3-2 3v3h-3v-3h-4v3H8v-3" /><path d="M20 11c1 1 1 4-1 5" /><path d="M10 9c-2 0-3 2-2 4" /><circle cx="16" cy="9" r=".6" fill="currentColor" /></>,
  cap: <><path d="m2 9 10-5 10 5-10 5Z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /><path d="M22 9v6" /></>,
  megaphone: <><path d="M3 10v4h3l7 4V6L6 10Z" /><path d="M17 9a4 4 0 0 1 0 6" /><path d="M7 14l1 5h3l-1-4" /></>,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>,
  leaf: <><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" /><path d="M5 19 13 11" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 16v-4M12 16V8M17 16v-6" /><path d="m6 9 5-4 3 2 5-4" /></>,
  people: <><circle cx="12" cy="8" r="3" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /><path d="M7 20a5 5 0 0 1 10 0M1.5 19a3.5 3.5 0 0 1 5-3M22.5 19a3.5 3.5 0 0 0-5-3" /></>,
  handshake: <><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4 4 0 0 1 5 0L18 8l3-1v8l-2 1" /><path d="M3 7l3 1 1 1M3 15l2 1 4 4a1.4 1.4 0 0 0 2-2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  check: <path d="m5 12 5 5 9-10" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  map: <><path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2Z" /><path d="M9 4v14M15 6v14" /></>,
  drone: <><rect x="9" y="10" width="6" height="4" rx="1" /><path d="M9 11 5 8M15 11l4-3M9 13l-4 3M15 13l4 3" /><path d="M2 8h6M16 8h6M2 16h6M16 16h6" /></>,
};

export default function Icon({ name, size = 24, stroke = 1.8, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>
      {P[name] || null}
    </svg>
  );
}
