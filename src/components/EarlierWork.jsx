export function EarlierShelf({ projects, onOpen }) {
  return (
    <ul className="shelf">
      {projects.map((p, i) => (
        <li key={p.title} style={{ "--tilt": `${[-1.5, 1, -0.5, 1.5][i % 4]}deg` }}>
          <button type="button" className="polaroid" onClick={() => onOpen(p)}>
            <img src={p.images[0]} alt="" loading="lazy" />
            <span className="polaroid-title">{p.title}</span>
            <span className="polaroid-year hand">{p.year}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function EarlierBody({ project: p }) {
  return (
    <article className="story-body">
      <p className="hand muted">{p.dates}</p>
      <h3 id="dialog-title">{p.title}</h3>
      <p>{p.summary}</p>
      {p.tags.length > 0 && <p className="tags">{p.tags.join(" · ")}</p>}
      {p.url && (
        <p className="links">
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            Project link ↗
          </a>
        </p>
      )}
      <div className="story-images">
        {p.youtube && (
          <div className="video">
            <iframe src={p.youtube} title={`${p.title} video`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        )}
        {p.images.map((src, i) => (
          <img key={src} src={src} alt={`${p.title}, image ${i + 1}`} loading="lazy" />
        ))}
      </div>
    </article>
  );
}
