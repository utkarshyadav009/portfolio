import { Flower, Mushroom } from "./Doodles.jsx";

export default function Intro({ site }) {
  return (
    <section id="top" className="intro wrap">
      <div className="intro-text">
        <p className="hand eyebrow">hello, I'm</p>
        <h1>{site.name}</h1>
        <p className="role">{site.role}</p>
        <p className="lede">{site.lede}</p>
        {site.intro.map((p, i) => (
          <p key={i} className="muted">
            {p}
          </p>
        ))}
        <p className="links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
      </div>
      <figure className="intro-photo">
        <Flower size={70} className="photo-flower" />
        <img src={site.photo} alt={`${site.name} in a green knitted jumper, holding two cookies up like glasses`} width="900" height="1016" />
        <Mushroom size={58} className="photo-mushroom" />
        {site.photoCaption && <figcaption className="hand">↖ {site.photoCaption}</figcaption>}
      </figure>
    </section>
  );
}
