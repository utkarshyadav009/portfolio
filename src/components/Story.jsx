import { ICONS } from "./Doodles.jsx";

// The short version: what a skimming reader sees.
export function StoryCard({ project: p, onOpen, tilt = 0 }) {
  const Icon = ICONS[p.icon];
  return (
    <button type="button" className="card story-card" style={{ "--tilt": `${tilt}deg` }} onClick={() => onOpen(p)}>
      {Icon && <Icon size={56} />}
      <span className="story-title">{p.title}</span>
      <span className="story-hook">{p.hook}</span>
      {p.headline && (
        <span className="story-number">
          <strong>{p.headline.value}</strong> {p.headline.label}
        </span>
      )}
      <span className="story-more hand">read the story →</span>
    </button>
  );
}

// The long version: everything, for the reader who asks for it.
export function StoryBody({ project: p }) {
  return (
    <article className="story-body">
      <p className="hand muted">
        {p.year} · {p.context}
      </p>
      <h3 id="dialog-title">{p.title}</h3>
      <p className="story-tagline">{p.tagline}</p>
      <p>{p.summary}</p>
      {p.results?.length > 0 && (
        <dl className="results">
          {p.results.map((r) => (
            <div key={r.label} className="result">
              <dt>{r.value}</dt>
              <dd>{r.label}</dd>
            </div>
          ))}
        </dl>
      )}
      {p.notes && <p className="muted small">{p.notes}</p>}
      {p.images?.length > 0 && (
        <div className="story-images">
          {p.images.map((im) => (
            <img key={im.src} src={im.src} alt={im.alt} loading="lazy" />
          ))}
        </div>
      )}
      <p className="tags">{p.stack.join(" · ")}</p>
      <p className="links">
        {p.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
            {l.label} ↗
          </a>
        ))}
        {p.linkNote && <span className="muted">{p.linkNote}</span>}
      </p>
    </article>
  );
}
