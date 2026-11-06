// Hand-drawn-style doodles. Outlines use --line, fills use the palette tokens,
// and the #wobble filter (see WobbleDefs) roughens the strokes slightly.

// Colours come from CSS classes (.ln outline, .f-* fill): var() does not work in SVG attributes.
const S = { className: "ln" };

function Svg({ children, size = 64, className = "", title }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`doodle ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <g filter="url(#wobble)">{children}</g>
    </svg>
  );
}

export function WobbleDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
        <filter id="wobble-border" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="3.5" />
        </filter>
      </defs>
    </svg>
  );
}

export function Mushroom(props) {
  return (
    <Svg {...props}>
      <path d="M22 36c-1 8-2 14 1 19h18c3-5 2-11 1-19" className="ln f-card" />
      <path d="M7 36C7 20 19 10 32 10s25 10 25 26z" className="ln f-toad" />
      <circle cx="22" cy="24" r="3.5" className="ln f-card" strokeWidth="2" />
      <circle cx="38" cy="19" r="2.5" className="ln f-card" strokeWidth="2" />
      <circle cx="44" cy="29" r="3" className="ln f-card" strokeWidth="2" />
      <path d="M28 46v3M36 46v3" {...S} strokeWidth="2" />
    </Svg>
  );
}

export function Mushrooms(props) {
  // A little colony on a log: many callers, one host.
  return (
    <Svg {...props}>
      <path d="M6 52c0-3 3-5 6-5h40c3 0 6 2 6 5s-3 5-6 5H12c-3 0-6-2-6-5z" className="ln f-cookie" />
      <circle cx="13" cy="52" r="2" {...S} strokeWidth="2" />
      <path d="M13 36v11h6V36" className="ln f-card" />
      <path d="M6 37c0-8 4-12 10-12s10 4 10 12z" className="ln f-toad" />
      <path d="M29 30v17h6V30" className="ln f-card" />
      <path d="M20 31c0-10 5-16 12-16s12 6 12 16z" className="ln f-toad" />
      <circle cx="28" cy="23" r="2" className="ln f-card" strokeWidth="1.8" />
      <circle cx="37" cy="25" r="1.6" className="ln f-card" strokeWidth="1.8" />
      <path d="M46 40v7h5v-7" className="ln f-card" />
      <path d="M41 41c0-6 3-9 7.5-9s7.5 3 7.5 9z" className="ln f-toad" />
    </Svg>
  );
}

export function Mask(props) {
  return (
    <Svg {...props}>
      <path d="M12 14c12-5 28-5 40 0 1 17-5 33-20 38C17 47 11 31 12 14z" className="ln f-cookie" />
      <path d="M20 24c3-3 7-3 10 0M34 24c3-3 7-3 10 0" {...S} />
      <path d="M22 35c5 6 15 6 20 0" {...S} />
      <path d="M52 16c4 2 6 6 5 10M12 16c-4 2-6 6-5 10" {...S} strokeWidth="2" />
      <path d="M50 44l3-4 2 5M48 50l5 0" {...S} strokeWidth="2" />
    </Svg>
  );
}

export function Sprout(props) {
  // A speech bubble growing a plant: words turning into pictures.
  return (
    <Svg {...props}>
      <path d="M8 26c0-9 9-15 20-15s20 6 20 15-9 15-20 15c-3 0-5 0-8-1l-8 6 2-8c-4-3-6-7-6-12z" className="ln f-card" />
      <path d="M28 26c0-6 4-10 10-11-1 6-4 10-10 11zM28 26c-1-5-5-8-10-8 1 5 5 8 10 8z" className="ln f-moss" strokeWidth="2" />
      <path d="M28 26v9" {...S} strokeWidth="2" />
      <path d="M50 44l4 4M54 40h4M50 52l2 4" {...S} strokeWidth="2" />
    </Svg>
  );
}

export function World(props) {
  return (
    <Svg {...props}>
      <ellipse cx="32" cy="34" rx="27" ry="9" transform="rotate(-18 32 34)" {...S} strokeWidth="2" />
      <circle cx="32" cy="32" r="15" className="ln f-sky" />
      <path d="M22 26c4 2 6 6 4 10s2 7 6 6M36 19c-1 4 2 6 6 6M40 38c2 2 4 2 6 1" {...S} strokeWidth="2" />
      <path d="M53 10v6M50 13h6M10 48v5M7.5 50.5h5" {...S} strokeWidth="2" />
    </Svg>
  );
}

export function Robot(props) {
  // A generic little box robot, not any particular character.
  return (
    <Svg {...props}>
      <path d="M32 6v6" {...S} />
      <circle cx="32" cy="5" r="2.5" className="ln f-toad" strokeWidth="2" />
      <rect x="12" y="12" width="40" height="44" rx="6" className="ln f-moss" />
      <rect x="18" y="18" width="28" height="18" rx="3" className="ln f-card" />
      <circle cx="26" cy="26" r="1.6" className="f-line" />
      <circle cx="38" cy="26" r="1.6" className="f-line" />
      <path d="M27 30c3 2 7 2 10 0" {...S} strokeWidth="2" />
      <path d="M20 46h8M24 42v8" {...S} />
      <circle cx="40" cy="44" r="2.5" className="ln f-toad" strokeWidth="2" />
      <circle cx="45" cy="49" r="2" className="ln f-cookie" strokeWidth="2" />
    </Svg>
  );
}

export function Flower(props) {
  // The eight-petal flower from the jumper.
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <Svg {...props}>
      {petals.map((a) => (
        <path key={a} d="M32 30c-4-6-4-14 0-22 4 8 4 16 0 22z" transform={`rotate(${a} 32 32)`} className="ln f-card" strokeWidth="2" />
      ))}
      <circle cx="32" cy="32" r="5" className="ln f-moss" strokeWidth="2" />
    </Svg>
  );
}

export function Cookie(props) {
  return (
    <Svg {...props}>
      <path d="M32 8c13 0 24 11 24 24S45 56 32 56 8 45 8 32c0-6 2-11 5-15 2 3 6 3 8 0 2-3 1-6-1-8 4-1 8-1 12-1z" className="ln f-cookie" />
      {[
        [24, 24],
        [38, 20],
        [42, 36],
        [26, 42],
        [33, 31],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x} ${y}l3 1-1 3-3-1z`} className="ln f-choc" strokeWidth="1.5" />
      ))}
    </Svg>
  );
}

export function Sprig({ className = "", width = 140 }) {
  return (
    <svg viewBox="0 0 140 24" width={width} height={(width * 24) / 140} className={`doodle ${className}`} aria-hidden="true">
      <g filter="url(#wobble)">
        <path d="M4 14c30-6 60 6 132-4" {...S} strokeWidth="2" />
        {[20, 46, 72, 98, 122].map((x, i) => (
          <path
            key={x}
            d={i % 2 ? `M${x} 13c4-8 10-10 14-9-2 6-7 9-14 9z` : `M${x} 13c4 7 10 9 14 8-2-6-7-9-14-8z`}
            className="ln f-moss"
          />
        ))}
      </g>
    </svg>
  );
}

export const ICONS = { mask: Mask, mushrooms: Mushrooms, sprout: Sprout, world: World, robot: Robot };
