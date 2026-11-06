import { Robot } from "./Doodles.jsx";

export default function Featured({ project: p, onOpen }) {
  const [lead, second] = p.images;
  return (
    <div className="featured">
      <div className="featured-photos">
        <img src={lead.src} alt={lead.alt} loading="lazy" className="card-photo tilt-l" />
        {second && <img src={second.src} alt={second.alt} loading="lazy" className="card-photo tilt-r" />}
      </div>
      <div className="featured-text">
        <Robot size={64} />
        <h3>{p.title}</h3>
        <p className="story-hook">{p.hook}</p>
        <ul className="numbers">
          {p.results.slice(0, 3).map((r) => (
            <li key={r.label}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </li>
          ))}
        </ul>
        <button type="button" className="button" onClick={() => onOpen(p)}>
          Read the BMO story
        </button>
      </div>
    </div>
  );
}
