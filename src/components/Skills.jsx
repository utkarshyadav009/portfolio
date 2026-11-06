export default function Skills({ groups }) {
  return (
    <dl className="skills">
      {groups.map((g) => (
        <div key={g.group}>
          <dt className="hand">{g.group}</dt>
          <dd>{g.items.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
