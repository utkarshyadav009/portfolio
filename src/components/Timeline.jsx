export default function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((it) => (
        <li key={it.role + it.dates}>
          <span className="hand timeline-dates">{it.dates}</span>
          <span className="timeline-role">{it.role}</span>
          <span className="timeline-org">{it.org}</span>
        </li>
      ))}
    </ol>
  );
}
