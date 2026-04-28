// Direction B — arXiv Monograph (with theme + tweaks)

const { useState, useEffect, useMemo } = React;
const S = window.SEMINAR;
const Thumb = window.PhysicsThumb;

const ARXIV_PALETTE_LIGHT = ["#0b0d0e", "#f7f6f3", "#7a3fd3"];
const ARXIV_PALETTE_DARK  = ["#f4f3ee", "#0b0d0e", "#a378e6"];

function useHash() {
  const [h, setH] = useState(() => window.location.hash.replace(/^#\/?/, "") || "home");
  useEffect(() => {
    const on = () => setH(window.location.hash.replace(/^#\/?/, "") || "home");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return [h];
}

function ThemeSwitch({ theme, onChange }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      className="theme-switch"
      onClick={() => onChange(next)}
      title={`Switch to ${next} mode`}
      aria-label={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      )}
    </button>
  );
}

function Side({ page, theme, onTheme }) {
  const items = [
    ["home", "Home", "§1"],
    ["archive", "Archive", "§2"],
    ["about", "About", "§3"],
    ["contact", "Contact", "§4"],
  ];
  return (
    <aside className="side">
      <div className="brand-row">
        <img className="brand-logo" src="shared/logo.svg" alt="Physics for ML" />
        <div className="brand">
          <div className="dim">SPOT CONSORTIUM</div>
          <h1>Physics <em>for</em> ML</h1>
          <div className="dim v">vol. IV · bi-weekly · est. 2023</div>
        </div>
        <ThemeSwitch theme={theme} onChange={onTheme} />
      </div>

      <div>
        <div className="side-nav-section">Sections</div>
        <nav className="side-nav">
          {items.map(([k, label, n]) => (
            <a key={k} href={`#/${k}`} className={page === k ? "active" : ""}>
              <span className="hash">{n}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>
      <div>
        <div className="side-nav-section">Elsewhere</div>
        <nav className="side-nav">
          <a href="https://lists.fz-juelich.de/postorius/lists/phys4ml_seminar.lists.fz-juelich.de/" target="_blank" rel="noopener">
            <span className="hash">↗</span><span>Seminar list</span>
          </a>
          <a href="https://lists.fz-juelich.de/postorius/lists/phys4ml.lists.fz-juelich.de/" target="_blank" rel="noopener">
            <span className="hash">↗</span><span>Journal list</span>
          </a>
          <a href="https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5#/" target="_blank" rel="noopener">
            <span className="hash">↗</span><span>Materials (Sciebo)</span>
          </a>
        </nav>
      </div>
      <div className="side-foot">
        Last updated<br />
        <code style={{ fontFamily: "inherit", color: "var(--ink)" }}>2026-04-28T08:17Z</code>
      </div>
    </aside>
  );
}

function TopBar({ crumbs = ["home"] }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        /&nbsp;<span>physics-for-ml</span>&nbsp;/&nbsp;{crumbs.join(" / ")}
      </div>
      <div className="search">
        <span>⌕</span>
        <input placeholder="search titles, speakers, tags…" onClick={(e) => e.stopPropagation()} />
        <span style={{ color: "var(--ink-3)", fontSize: 10 }}>⌘K</span>
      </div>
    </div>
  );
}

function TalkCard({ t, i, palette }) {
  return (
    <div className="talk">
      <div className="talk-thumb">
        <Thumb motif={t.motif} palette={palette} seed={i + 3} />
        <div className="talk-id">{t.id.split("-")[0].toUpperCase()} · {String(i + 1).padStart(3, "0")}</div>
      </div>
      <div className="talk-body">
        <div className="talk-meta">
          <span className="date">{window.formatDate(t.date, { style: "numeric" })}</span>
          <span>{t.motif}</span>
        </div>
        <h3>{t.title}</h3>
        <div className="speaker">{t.speaker} <span>· {t.affil}</span></div>
        <div className="tags">
          {t.tags.map((tag, j) => (
            <span key={tag} className={`tagpill${j === 0 ? " accent" : ""}`}>{tag}</span>
          ))}
        </div>
        <div className="assets">
          <span className={t.hasSlides ? "on" : ""}>{t.hasSlides ? "◆ slides" : "◇ —"}</span>
          <span className={t.hasVideo ? "on" : ""}>{t.hasVideo ? "▶ video" : "▷ —"}</span>
        </div>
      </div>
    </div>
  );
}

function Home({ palette }) {
  const recent = S.past.slice(0, 6);
  return (
    <main>
      <TopBar crumbs={["home"]} />

      <div className="hero-head">
        <span className="tag">SEMINAR SERIES</span>
        <span><span className="dot" /> accepting proposals · SS26</span>
        <span>·</span>
        <span>{S.cadence}</span>
      </div>
      <h1 className="title">Statistical <em>physics</em>, field theory, and the learning problem.</h1>
      <p className="hero-abstract">
        A bi-weekly seminar across nine theoretical-physics groups in the SPOT consortium. We read, present, and dissect work where the language of many-body physics &mdash; disorder averages, saddle-points, renormalisation &mdash; genuinely clarifies neural networks.
      </p>
      <div className="authors">
        <span>Hosted by <b>SPOT Consortium</b></span>
        <span>·</span>
        <span>Organised by <b>Moritz Helias</b></span>
        <span>·</span>
        <span>Forschungszentrum Jülich · IAS-6</span>
      </div>

      <div className="stats">
        <div className="stat"><div className="k">Talks</div><div className="v"><em>{S.past.length + 60}</em></div><div className="u">since 09/2023</div></div>
        <div className="stat"><div className="k">Participating groups</div><div className="v">{S.groups.length}</div><div className="u">across 8 institutions</div></div>
        <div className="stat"><div className="k">Subscribers</div><div className="v">420</div><div className="u">on mailing list</div></div>
        <div className="stat"><div className="k">Next semester</div><div className="v">SS26</div><div className="u">programme TBA</div></div>
      </div>

      <h2 className="sec"><span className="num">§1.1</span> Next seminar</h2>
      <div className="next-card empty">
        <h3>No upcoming seminar scheduled.</h3>
        <p>
          The summer-semester programme is being assembled. The first talk of SS26 will be announced in the coming weeks — expect the notice in <code>phys4ml_seminar</code>.
        </p>
        <div className="btns">
          <a className="btn" href="https://lists.fz-juelich.de/postorius/lists/phys4ml_seminar.lists.fz-juelich.de/" target="_blank" rel="noopener">Subscribe to notices</a>
          <a className="btn ghost" href="#/archive">Browse archive</a>
        </div>
      </div>

      <h2 className="sec"><span className="num">§1.2</span> Recent seminars</h2>
      <div className="talks">
        {recent.map((t, i) => <TalkCard key={t.id} t={t} i={i} palette={palette} />)}
      </div>
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <a className="btn ghost" href="#/archive" style={{ fontSize: 11 }}>View all {S.past.length} talks →</a>
      </div>

      <h2 className="sec" style={{ marginTop: "calc(56px * var(--density))" }}><span className="num">§1.3</span> Events</h2>
      {S.events.map((e, i) => (
        <div className="event-row" key={i}>
          <span>{e.date}</span>
          <div>
            <h4>{e.title}</h4>
            <div className="note">{e.note}</div>
          </div>
          <span>{e.where}</span>
        </div>
      ))}

      <Foot />
    </main>
  );
}

function Archive({ palette }) {
  const allTags = useMemo(() => {
    const s = new Set();
    S.past.forEach((t) => t.tags.forEach((x) => s.add(x)));
    return ["all", ...Array.from(s).sort()];
  }, []);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("new");
  const rows = S.past
    .filter((t) => tag === "all" || t.tags.includes(tag))
    .filter((t) => !q || (t.title + t.speaker + t.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "new" ? b.date.localeCompare(a.date) : a.speaker.localeCompare(b.speaker));
  return (
    <main>
      <TopBar crumbs={["archive"]} />
      <h1 className="title">The <em>archive</em>.</h1>
      <p className="hero-abstract">Every seminar delivered since the series began. Filter by tag, search by keyword, and follow links to slides and recordings.</p>

      <div className="archive-controls">
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="search: 'DMFT', 'Zdeborová', 'diffusion'…" />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          {allTags.map((t) => <option key={t} value={t}>{t === "all" ? "all tags" : `tag: ${t}`}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">newest first</option>
          <option value="speaker">by speaker</option>
        </select>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em", marginBottom: 16 }}>
        showing <b style={{ color: "var(--ink)" }}>{rows.length}</b> / {S.past.length} talks
      </div>
      <div className="talks">
        {rows.map((t, i) => <TalkCard key={t.id} t={t} i={i} palette={palette} />)}
      </div>
      <Foot />
    </main>
  );
}

function About() {
  return (
    <main>
      <TopBar crumbs={["about"]} />
      <h1 className="title">About the <em>series</em>.</h1>
      <div className="prose" style={{ marginTop: 32 }}>
        <h2>§3.1 &nbsp; Scope</h2>
        <p>
          Physics for Machine Learning is a bi-weekly seminar hosted by the SPOT consortium. The focus is narrow by design: we look at machine learning through the lens of theoretical physics &mdash; mean-field theory, replica calculations, random-matrix spectra, field-theoretic perturbation &mdash; and at physics through the lens of modern learning systems.
        </p>
        <div className="callout">
          The aim is not to apply ML to physics. It is to make ML itself a proper object of physical study.
        </div>
        <h2>§3.2 &nbsp; Format</h2>
        <p>
          Ninety minutes on Zoom. The first sixty are presentation; the remaining thirty are open discussion, and we protect that latter half. Talks are recorded when speakers allow; slides are archived on the shared Sciebo drive.
        </p>
        <h2>§3.3 &nbsp; Consortium</h2>
        <p>Participating groups, by institution:</p>
      </div>

      <div className="consortium" style={{ marginTop: 20 }}>
        {S.groups.map((g, i) => (
          <div key={g.name}>
            <div className="who">
              <b>{g.name}</b>
              <span>{g.affil}</span>
            </div>
            <div className="n">{String(i + 1).padStart(2, "0")}</div>
          </div>
        ))}
      </div>
      <Foot />
    </main>
  );
}

function Contact() {
  return (
    <main>
      <TopBar crumbs={["contact"]} />
      <h1 className="title"><em>Correspondence.</em></h1>
      <p className="hero-abstract">Proposals, questions, and mailing-list requests are welcome. We reply within a week or two during term.</p>

      <div className="contact-grid" style={{ marginTop: 32 }}>
        <div>
          <div className="label">Organiser</div>
          <div className="big">{S.contact.organizer}</div>
          <p>{S.contact.institute}<br />{S.contact.org}</p>
        </div>
        <div>
          <div className="label">Correspondence</div>
          <div className="big"><a href={`mailto:${S.contact.email}`}>{S.contact.email}</a></div>
          <p>Subject line <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>[phys4ml]</code> helps us route quickly.</p>
        </div>
        <div>
          <div className="label">Slides &amp; recordings</div>
          <div className="big"><a href="https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5#/" target="_blank" rel="noopener">Sciebo drive →</a></div>
          <p>Requires the password circulated on the mailing list.</p>
        </div>
        <div>
          <div className="label">Propose a talk</div>
          <div className="big">Send a title &amp; short abstract.</div>
          <p>Include <i>availability Thu 10:00&nbsp;CET</i> and relevant arXiv IDs.</p>
        </div>
      </div>

      <h2 className="sec" style={{ marginTop: "calc(64px * var(--density))" }}><span className="num">§4.1</span> Mailing lists</h2>
      <p style={{ fontFamily: "var(--serif)", fontSize: 18, maxWidth: "56ch", color: "var(--ink-2)" }}>
        Two distinct lists. The seminar list carries only seminar notices; the journal list carries weekly paper announcements from the consortium.
      </p>
      <form className="mail-form" onSubmit={(e) => { e.preventDefault(); window.open("https://lists.fz-juelich.de/postorius/lists/phys4ml_seminar.lists.fz-juelich.de/", "_blank"); }}>
        <input placeholder="you@institution.edu" type="email" />
        <button type="submit" className="btn">Subscribe to phys4ml_seminar</button>
      </form>
      <Foot />
    </main>
  );
}

function Foot() {
  return (
    <div className="sheet-foot">
      <span>Physics for ML · SPOT · IAS-6 · FZ Jülich</span>
      <span>Set in IBM Plex &amp; Newsreader</span>
      <span>arXiv-style layout</span>
    </div>
  );
}

const SERIF_OPTIONS = [
  { value: "Newsreader", label: "Newsreader" },
  { value: "EB Garamond", label: "Garamond" },
  { value: "Source Serif 4", label: "Source Serif" },
  { value: "Georgia", label: "Georgia" },
];

function App() {
  const [page] = useHash();

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "accent": "#7a3fd3",
    "baseSize": 14,
    "density": 1.0,
    "contentWidth": 1280,
    "radius": 0,
    "serif": "Newsreader"
  }/*EDITMODE-END*/;

  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply CSS variables + theme attribute
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme);
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--base-size", t.baseSize + "px");
    r.style.setProperty("--density", String(t.density));
    r.style.setProperty("--content-w", t.contentWidth + "px");
    r.style.setProperty("--radius", t.radius + "px");
    r.style.setProperty("--serif", `"${t.serif}", Georgia, serif`);
  }, [t]);

  const palette = t.theme === "dark" ? ARXIV_PALETTE_DARK : ARXIV_PALETTE_LIGHT;
  // Inject accent into palette so thumbnails track it
  const livePalette = [palette[0], palette[1], t.accent];

  let P;
  if (page === "archive") P = <Archive palette={livePalette} />;
  else if (page === "about") P = <About />;
  else if (page === "contact") P = <Contact />;
  else P = <Home palette={livePalette} />;

  return (
    <>
      <div className="frame" data-screen-label={`arxiv / ${page}`}>
        <Side page={page} theme={t.theme} onTheme={(v) => setTweak("theme", v)} />
        {P}
      </div>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme">
          <window.TweakRadio label="Mode" value={t.theme}
            options={["light", "dark"]}
            onChange={(v) => setTweak("theme", v)} />
          <window.TweakColor label="Accent" value={t.accent}
            onChange={(v) => setTweak("accent", v)} />
        </window.TweakSection>

        <window.TweakSection label="Typography">
          <window.TweakSelect label="Serif" value={t.serif}
            options={SERIF_OPTIONS}
            onChange={(v) => setTweak("serif", v)} />
          <window.TweakSlider label="Base size" value={t.baseSize}
            min={12} max={20} step={1} unit="px"
            onChange={(v) => setTweak("baseSize", v)} />
        </window.TweakSection>

        <window.TweakSection label="Layout">
          <window.TweakSlider label="Density" value={t.density}
            min={0.7} max={1.5} step={0.05}
            onChange={(v) => setTweak("density", v)} />
          <window.TweakSlider label="Content width" value={t.contentWidth}
            min={1024} max={1600} step={20} unit="px"
            onChange={(v) => setTweak("contentWidth", v)} />
          <window.TweakSlider label="Corner radius" value={t.radius}
            min={0} max={16} step={1} unit="px"
            onChange={(v) => setTweak("radius", v)} />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
