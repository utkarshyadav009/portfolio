import { Cookie } from "./Doodles.jsx";

export default function Footer({ site }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="wrap footer-inner">
        <Cookie size={72} />
        <div>
          <h2>Say hello</h2>
          <p>{site.now}</p>
          <p className="links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </p>
          <p className="hand muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
        {site.sticker && (
          <figure className="sticker">
            <p className="sticker-says hand">{site.sticker.says}</p>
            <img src={site.sticker.src} alt={site.sticker.alt} width="120" height="120" loading="lazy" />
          </figure>
        )}
      </div>
    </footer>
  );
}
