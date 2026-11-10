import { useEffect, useRef, useState } from "react";

// One entry per chapter, in page order, plus contact.
const NAV = [
  ["work", "Work"],
  ["bmo", "BMO"],
  ["experience", "Road so far"],
  ["hunts", "Side quest"],
  ["shelf", "Shelf"],
  ["skills", "Toolbox"],
  ["contact", "Say hello"],
];
const IDS = NAV.map(([id]) => id);

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Which chapter is being read: the last one whose top has passed a line just
// under the sticky header. After a nav tap, the tapped chapter stays "pinned"
// until the reader scrolls by hand, because the last chapters can never reach
// the top of the screen on a short page.
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const pinned = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (pinned.current) return setActive(pinned.current);
      const header = document.querySelector(".site-header");
      const line = (header ? header.getBoundingClientRect().bottom : 60) + 80;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };
    const unpin = () => {
      pinned.current = null;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    for (const ev of ["wheel", "touchstart", "keydown"]) window.addEventListener(ev, unpin, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const ev of ["wheel", "touchstart", "keydown"]) window.removeEventListener(ev, unpin);
    };
  }, [ids]);

  const pin = (id) => {
    pinned.current = id;
    setActive(id);
  };
  return [active, pin];
}

export default function Header({ name }) {
  const [theme, setTheme] = useState(currentTheme);
  const [active, pin] = useActiveSection(IDS);
  const navRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // On narrow screens the nav is a horizontal strip: keep the active chip in view.
  useEffect(() => {
    const nav = navRef.current;
    const chip = nav?.querySelector('[aria-current="true"]');
    if (!nav || !chip || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  function go(e, id) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    pin(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

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
        <nav aria-label="Chapters" ref={navRef}>
          <ul>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => go(e, id)} aria-current={active === id ? "true" : undefined}>
                  {label}
                </a>
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
