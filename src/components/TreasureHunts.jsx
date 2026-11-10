export default function TreasureHunts({ data, onOpen }) {
  return (
    <div className="hunts">
      <p className="section-lede">{data.intro}</p>
      <ul className="hunt-list">
        {data.entries.map((e) => (
          <li key={e.year}>
            <button type="button" className="card hunt" onClick={() => onOpen(e)}>
              {e.cover && <img src={e.cover} alt={e.coverAlt || ""} loading="lazy" className={`hunt-cover ${e.layout || ""}`} />}
              <span className="hand hunt-year">{e.year}</span>
              <strong>{e.title}</strong>
              <span className="hunt-text">{e.text}</span>
              {e.images?.length > 0 && <span className="story-more hand">see the hunt →</span>}
            </button>
          </li>
        ))}
      </ul>
      {data.mediaNote && <p className="hand muted">{data.mediaNote}</p>}
    </div>
  );
}

export function HuntBody({ hunt: h }) {
  return (
    <article className="story-body">
      <p className="hand muted">{h.year} · Anglotec Academy, Scarborough</p>
      <h3 id="dialog-title">{h.title}</h3>
      {(h.story || [h.text]).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className={`story-images ${h.layout === "phones" ? "phones" : ""}`}>
        {h.images.map((im) => (
          <figure key={im.src}>
            <img src={im.src} alt={im.alt} loading="lazy" />
            <figcaption>{im.alt}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
