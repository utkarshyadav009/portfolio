export default function TreasureHunts({ data }) {
  return (
    <div className="hunts">
      <p className="section-lede">{data.intro}</p>
      <ul className="hunt-list">
        {data.entries.map((e) => (
          <li key={e.year} className="card hunt">
            <span className="hand hunt-year">{e.year}</span>
            <strong>{e.title}</strong>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
      {data.mediaNote && <p className="hand muted">{data.mediaNote}</p>}
    </div>
  );
}
