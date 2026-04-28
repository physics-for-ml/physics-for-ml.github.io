// Shared seminar data used by all three design directions.
// Past talks are plausibly-dated, distinct topics sitting at the theoretical-physics-of-ML edge.

window.SEMINAR = {
  name: "Physics for Machine Learning",
  shortName: "Physics for ML",
  tagline: "Seminar Series",
  description:
    "A bi-weekly seminar on the theoretical physics of machine learning, hosted by the SPOT consortium.",
  cadence: "Bi-weekly · Thursdays · 10:00 CET",
  format: "90-minute presentation + discussion · Zoom",
  contact: {
    email: "m.helias@fz-juelich.de",
    organizer: "Prof. Moritz Helias",
    institute: "Institute for Advanced Simulation 6",
    org: "Forschungszentrum Jülich",
  },
  groups: [
    { name: "Caterina De Bacco", affil: "TU Delft" },
    { name: "Claudius Gros", affil: "University of Frankfurt" },
    { name: "Moritz Helias", affil: "RWTH Aachen / FZ Jülich" },
    { name: "Michael Krämer", affil: "RWTH Aachen" },
    { name: "Zohar Ringel", affil: "Hebrew University" },
    { name: "Bernd Rosenow", affil: "University of Leipzig" },
    { name: "Peter Sollich", affil: "University of Göttingen" },
    { name: "Alexander van Meegen", affil: "RWTH Aachen" },
    { name: "Lenka Zdeborová", affil: "EPFL" },
  ],
  events: [
    {
      date: "9–14 March 2026",
      title: "DPG Spring Meeting",
      where: "Dresden",
      note: "Focus Sessions: Physics of AI",
    },
  ],
  // No confirmed upcoming; deliberately empty per user.
  upcoming: [],
  past: [
    {
      id: "zdeborova-phase",
      date: "2026-03-12",
      speaker: "Lenka Zdeborová",
      affil: "EPFL",
      title: "Phase transitions in learning: a statistical-physics view of generalization",
      tags: ["statistical physics", "generalization"],
      motif: "phase",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "ringel-kernel",
      date: "2026-02-26",
      speaker: "Zohar Ringel",
      affil: "Hebrew University",
      title: "Field-theoretic corrections to the neural tangent kernel at finite width",
      tags: ["field theory", "NTK", "finite width"],
      motif: "field",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "helias-dmft",
      date: "2026-02-12",
      speaker: "Moritz Helias",
      affil: "RWTH Aachen / FZ Jülich",
      title: "Dynamical mean-field theory for deep networks with structured input",
      tags: ["DMFT", "deep networks"],
      motif: "lattice",
      hasSlides: true,
      hasVideo: false,
    },
    {
      id: "sollich-gp",
      date: "2026-01-29",
      speaker: "Peter Sollich",
      affil: "University of Göttingen",
      title: "Gaussian process limits beyond the lazy regime",
      tags: ["Gaussian processes", "feature learning"],
      motif: "wave",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "kraemer-lhc",
      date: "2026-01-15",
      speaker: "Michael Krämer",
      affil: "RWTH Aachen",
      title: "Symmetry-aware architectures for LHC event data",
      tags: ["equivariance", "physics data"],
      motif: "symmetry",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "rosenow-replica",
      date: "2025-12-18",
      speaker: "Bernd Rosenow",
      affil: "University of Leipzig",
      title: "Replica calculations for attention layers",
      tags: ["replica method", "attention"],
      motif: "replica",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "gros-dynamics",
      date: "2025-12-04",
      speaker: "Claudius Gros",
      affil: "University of Frankfurt",
      title: "Self-organized criticality in recurrent learning rules",
      tags: ["criticality", "recurrent nets"],
      motif: "criticality",
      hasSlides: true,
      hasVideo: false,
    },
    {
      id: "debacco-graph",
      date: "2025-11-20",
      speaker: "Caterina De Bacco",
      affil: "TU Delft",
      title: "Message passing and the Bethe approximation in modern GNNs",
      tags: ["graphs", "message passing"],
      motif: "graph",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "vanmeegen-spectra",
      date: "2025-11-06",
      speaker: "Alexander van Meegen",
      affil: "RWTH Aachen",
      title: "Spectral theory of non-Hermitian random networks",
      tags: ["RMT", "non-Hermitian"],
      motif: "spectrum",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "mezard-bp",
      date: "2025-10-23",
      speaker: "Marc Mézard",
      affil: "Bocconi University",
      title: "Belief propagation, free energies, and language models",
      tags: ["belief propagation", "language models"],
      motif: "bp",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "krzakala-denoising",
      date: "2025-10-09",
      speaker: "Florent Krzakala",
      affil: "EPFL",
      title: "Optimal denoising and the physics of diffusion models",
      tags: ["diffusion", "denoising"],
      motif: "diffusion",
      hasSlides: true,
      hasVideo: true,
    },
    {
      id: "loureiro-highdim",
      date: "2025-09-25",
      speaker: "Bruno Loureiro",
      affil: "ENS Paris",
      title: "High-dimensional asymptotics of gradient-based learning",
      tags: ["high dimensions", "optimization"],
      motif: "flow",
      hasSlides: true,
      hasVideo: false,
    },
  ],
};

// Abstract physics thumbnail generator — deterministic SVGs keyed by motif.
// All placeholders; never claim to be a headshot. Monospace label optional.
window.PhysicsThumb = function PhysicsThumb({
  motif = "phase",
  palette = ["#0a0a0a", "#f5f2ea", "#b5442d"],
  label,
  seed = 1,
  style = {},
}) {
  const [fg, bg, accent] = palette;
  const rand = (n) => {
    // cheap deterministic pseudo-random
    let x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };

  const render = () => {
    switch (motif) {
      case "phase": {
        // nested ellipses in a warped grid
        return (
          <g>
            {Array.from({ length: 7 }).map((_, i) => (
              <ellipse
                key={i}
                cx="100" cy="60"
                rx={10 + i * 12} ry={6 + i * 5}
                fill="none" stroke={fg} strokeWidth="0.6"
                transform={`rotate(${-18 + i * 3} 100 60)`}
              />
            ))}
            <circle cx="100" cy="60" r="2" fill={accent} />
          </g>
        );
      }
      case "field": {
        // streamlines
        return (
          <g>
            {Array.from({ length: 12 }).map((_, i) => {
              const y = 10 + i * 8;
              const d = `M 0 ${y} C 40 ${y - 6} 80 ${y + 10} 120 ${y - 4} S 200 ${y + 8} 240 ${y}`;
              return <path key={i} d={d} fill="none" stroke={fg} strokeWidth="0.5" opacity="0.7" />;
            })}
            <circle cx="120" cy="60" r="3" fill={accent} />
          </g>
        );
      }
      case "lattice": {
        return (
          <g>
            {Array.from({ length: 10 }).map((_, r) =>
              Array.from({ length: 18 }).map((_, c) => {
                const up = (r + c) % 2 === 0;
                const x = 12 + c * 12;
                const y = 12 + r * 11;
                return up ? (
                  <line key={`${r}-${c}`} x1={x} y1={y - 3} x2={x} y2={y + 3} stroke={fg} strokeWidth="0.8" />
                ) : (
                  <line key={`${r}-${c}`} x1={x} y1={y - 3} x2={x} y2={y + 3} stroke={accent} strokeWidth="0.8" />
                );
              })
            )}
          </g>
        );
      }
      case "wave": {
        return (
          <g>
            {Array.from({ length: 40 }).map((_, i) => {
              const x = i * 5;
              const h = 30 + Math.sin(i * 0.5) * 20 + Math.sin(i * 0.17) * 8;
              return <line key={i} x1={x} y1={60 - h / 2} x2={x} y2={60 + h / 2} stroke={fg} strokeWidth="1" />;
            })}
          </g>
        );
      }
      case "symmetry": {
        // rotational 8-fold
        return (
          <g transform="translate(100,60)">
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <path d="M0 0 L 40 -6 L 44 0 L 40 6 Z" fill="none" stroke={fg} strokeWidth="0.6" />
              </g>
            ))}
            <circle r="3" fill={accent} />
          </g>
        );
      }
      case "replica": {
        // 5 overlapping circles
        return (
          <g transform="translate(100,60)">
            {Array.from({ length: 5 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.cos((i * 2 * Math.PI) / 5) * 18}
                cy={Math.sin((i * 2 * Math.PI) / 5) * 18}
                r="22"
                fill="none" stroke={fg} strokeWidth="0.6"
              />
            ))}
          </g>
        );
      }
      case "criticality": {
        // power-law scatter
        return (
          <g>
            {Array.from({ length: 120 }).map((_, i) => {
              const r = rand(i);
              const x = 10 + r * 180;
              const y = 10 + Math.pow(rand(i + 99), 2) * 100;
              return <circle key={i} cx={x} cy={y} r={0.8 + rand(i + 200) * 1.8} fill={fg} opacity={0.5 + rand(i) * 0.5} />;
            })}
          </g>
        );
      }
      case "graph": {
        const nodes = Array.from({ length: 14 }).map((_, i) => ({
          x: 15 + rand(i) * 170,
          y: 10 + rand(i + 50) * 100,
        }));
        const edges = [];
        nodes.forEach((n, i) => {
          nodes.forEach((m, j) => {
            if (j <= i) return;
            const d = Math.hypot(n.x - m.x, n.y - m.y);
            if (d < 50) edges.push([i, j]);
          });
        });
        return (
          <g>
            {edges.map(([a, b], i) => (
              <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={fg} strokeWidth="0.4" />
            ))}
            {nodes.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r="2.5" fill={i % 5 === 0 ? accent : fg} />
            ))}
          </g>
        );
      }
      case "spectrum": {
        // eigenvalue scatter around unit disk
        return (
          <g transform="translate(100,60)">
            <circle r="40" fill="none" stroke={fg} strokeWidth="0.4" strokeDasharray="2 2" />
            {Array.from({ length: 90 }).map((_, i) => {
              const a = rand(i) * Math.PI * 2;
              const rr = 40 * Math.sqrt(rand(i + 77));
              return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr * 0.6} r="1" fill={fg} />;
            })}
          </g>
        );
      }
      case "bp": {
        // factor graph — squares + circles
        return (
          <g>
            {Array.from({ length: 5 }).map((_, i) => {
              const x = 30 + i * 35;
              return <rect key={"s" + i} x={x - 4} y="30" width="8" height="8" fill="none" stroke={fg} strokeWidth="0.8" />;
            })}
            {Array.from({ length: 6 }).map((_, i) => {
              const x = 20 + i * 32;
              return <circle key={"c" + i} cx={x} cy="85" r="4" fill="none" stroke={fg} strokeWidth="0.8" />;
            })}
            {Array.from({ length: 5 }).map((_, i) => {
              const sx = 30 + i * 35;
              return (
                <g key={"e" + i}>
                  <line x1={sx} y1={38} x2={20 + i * 32} y2={81} stroke={fg} strokeWidth="0.4" />
                  <line x1={sx} y1={38} x2={20 + (i + 1) * 32} y2={81} stroke={fg} strokeWidth="0.4" />
                </g>
              );
            })}
          </g>
        );
      }
      case "diffusion": {
        return (
          <g>
            {Array.from({ length: 6 }).map((_, col) =>
              Array.from({ length: 80 - col * 10 }).map((_, i) => {
                const x = 15 + col * 30 + rand(col * 100 + i) * 22;
                const y = 10 + rand(col * 200 + i) * 100;
                return <circle key={`${col}-${i}`} cx={x} cy={y} r={1.2} fill={fg} opacity={1 - col * 0.13} />;
              })
            )}
          </g>
        );
      }
      case "flow": {
        // loss landscape contours
        return (
          <g>
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d={`M ${20 + i * 3} ${100 - i * 6} Q ${100} ${60 - i * 3} ${180 - i * 3} ${100 - i * 6}`}
                fill="none" stroke={fg} strokeWidth="0.5" opacity="0.7"
              />
            ))}
            <circle cx="100" cy="60" r="2" fill={accent} />
          </g>
        );
      }
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ display: "block", width: "100%", height: "100%", background: bg, ...style }}>
      {render()}
      {label && (
        <text x="8" y="112" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="6" fill={fg} opacity="0.5">
          {label}
        </text>
      )}
    </svg>
  );
};

window.formatDate = function (iso, opts = {}) {
  const d = new Date(iso);
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (opts.style === "numeric") {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  }
  if (opts.style === "long") {
    return `${d.getDate()} ${["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};
