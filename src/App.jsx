import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import { StoryCard, StoryBody } from "./components/Story.jsx";
import Featured from "./components/Featured.jsx";
import { EarlierShelf, EarlierBody } from "./components/EarlierWork.jsx";
import TreasureHunts from "./components/TreasureHunts.jsx";
import Timeline from "./components/Timeline.jsx";
import Skills from "./components/Skills.jsx";
import Footer from "./components/Footer.jsx";
import Dialog from "./components/Dialog.jsx";
import { Sprig, WobbleDefs } from "./components/Doodles.jsx";

const TILTS = [-1.2, 0.8, 1.1, -0.7];

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);
  // { kind: "story" | "earlier", project }
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch("data/site.json")
      .then((r) => {
        if (!r.ok) throw new Error(`site.json: ${r.status}`);
        return r.json();
      })
      .then(setSite)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="load-state">Could not load the page content ({error}).</p>;
  if (!site) return <p className="load-state" aria-busy="true">Loading…</p>;

  const costar = site.selected.filter((p) => p.chapter === "costar");
  const bmo = site.selected.find((p) => p.chapter === "bmo");
  const openStory = (project) => setOpen({ kind: "story", project });
  const openEarlier = (project) => setOpen({ kind: "earlier", project });

  return (
    <>
      <WobbleDefs />
      <Header name={site.name} />
      <main>
        <Intro site={site} />

        <Chapter id="work" n="one" title="The CoSTAR lab" aside={site.costar.dates}>
          <p className="section-lede">{site.costar.blurb}</p>
          <div className="story-grid">
            {costar.map((p, i) => (
              <StoryCard key={p.id} project={p} onOpen={openStory} tilt={TILTS[i % TILTS.length]} />
            ))}
          </div>
        </Chapter>

        {bmo && (
          <Chapter id="bmo" n="two" title="BMO, my MSc robot" aside={bmo.year}>
            <Featured project={bmo} onOpen={openStory} />
          </Chapter>
        )}

        <Chapter id="experience" n="three" title="The road so far">
          <Timeline items={site.experience} />
        </Chapter>

        <Chapter id="hunts" n="four" title="Side quest: treasure hunts in Scarborough">
          <TreasureHunts data={site.treasureHunts} />
        </Chapter>

        <Chapter id="shelf" n="five" title="The old shelf" aside="2019 – 2025">
          <p className="section-lede">Games, graphics and early machine learning from my BSc and teaching.</p>
          <EarlierShelf projects={site.earlier} onOpen={openEarlier} />
        </Chapter>

        <Chapter id="skills" n="six" title="In the toolbox">
          <Skills groups={site.skills} />
        </Chapter>
      </main>
      <Footer site={site} />

      <Dialog open={!!open} onClose={() => setOpen(null)} labelledBy="dialog-title">
        {open?.kind === "story" && <StoryBody project={open.project} />}
        {open?.kind === "earlier" && <EarlierBody project={open.project} />}
      </Dialog>
    </>
  );
}

function Chapter({ id, n, title, aside, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <header className="chapter-head">
        <p className="hand chapter-n">chapter {n}</p>
        <h2 id={`${id}-h`}>{title}</h2>
        {aside && <p className="hand chapter-aside">{aside}</p>}
        <Sprig className="chapter-sprig" />
      </header>
      {children}
    </section>
  );
}
