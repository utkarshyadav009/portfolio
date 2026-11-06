import { useEffect, useState } from "react";

const NAV = [
  ["#work", "Work"],
  ["#bmo", "BMO"],
  ["#experience", "Road so far"],
  ["#shelf", "Shelf"],
  ["#contact", "Say hello"],
];

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Header({ name }) {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage blocked: the toggle still works for this visit */
    }
  }

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <a href="#top" className="wordmark">
          {name}
        </a>
        <nav aria-label="Sections">
          <ul>
            {NAV.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="theme-toggle hand" onClick={toggle} aria-label="Switch colour theme">
          {theme === "dark" ? "☀ day" : "☾ night"}
        </button>
      </div>
    </header>
  );
}
