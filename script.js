/* ============================================================
   Physics for ML — main script
   ============================================================ */

// ── State ──────────────────────────────────────────────────
let allSpeakers = [];
let upcomingSpeakers = [];
let pastSpeakers = [];

let archiveCurrentPage = 1;
let archiveTotalPages = 1;
let archiveSpeakersPerPage = 5;
let archiveFilteredSpeakers = [];

const MOTIFS = ['phase', 'field', 'lattice', 'wave', 'symmetry', 'replica',
                'criticality', 'graph', 'spectrum', 'bp', 'diffusion', 'flow'];

// ── Theme ──────────────────────────────────────────────────
function initTheme() {
  const stored = localStorage.getItem('phys4ml-theme');
  setTheme(stored || 'light', false);
}

function setTheme(theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) localStorage.setItem('phys4ml-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  } else {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

// ── Hash routing ───────────────────────────────────────────
function getPage() {
  const h = window.location.hash.replace(/^#\/?/, '');
  return ['archive', 'about', 'contact'].includes(h) ? h : 'home';
}

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');

  document.querySelectorAll('#sectionNav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  window.scrollTo(0, 0);
}

// ── Date helpers ───────────────────────────────────────────
function parseSpeakerDate(dateString) {
  const parts = dateString.split(', ');
  const dateOnly = parts.length > 2 ? parts.slice(1).join(', ') : dateString;
  return new Date(dateOnly);
}

function formatDateNumeric(d) {
  if (!(d instanceof Date) || isNaN(d)) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

// ── SVG thumbnail generator ────────────────────────────────
function rand(seed, n) {
  let x = Math.sin(seed * 9301 + n * 49297) * 233280;
  return x - Math.floor(x);
}

function generateThumbContent(motif, seed) {
  switch (motif) {
    case 'phase': {
      let s = '';
      for (let i = 0; i < 7; i++) {
        s += `<ellipse cx="100" cy="60" rx="${10 + i * 12}" ry="${6 + i * 5}" style="fill:none;stroke:var(--ink);stroke-width:0.6" transform="rotate(${-18 + i * 3} 100 60)"/>`;
      }
      s += `<circle cx="100" cy="60" r="2" style="fill:var(--accent)"/>`;
      return s;
    }
    case 'field': {
      let s = '';
      for (let i = 0; i < 12; i++) {
        const y = 10 + i * 8;
        s += `<path d="M 0 ${y} C 40 ${y - 6} 80 ${y + 10} 120 ${y - 4} S 200 ${y + 8} 240 ${y}" style="fill:none;stroke:var(--ink);stroke-width:0.5;opacity:0.7"/>`;
      }
      s += `<circle cx="120" cy="60" r="3" style="fill:var(--accent)"/>`;
      return s;
    }
    case 'lattice': {
      let s = '';
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 18; c++) {
          const up = (r + c) % 2 === 0;
          const x = 12 + c * 12, y = 12 + r * 11;
          const col = up ? 'var(--ink)' : 'var(--accent)';
          s += `<line x1="${x}" y1="${y - 3}" x2="${x}" y2="${y + 3}" style="stroke:${col};stroke-width:0.8"/>`;
        }
      }
      return s;
    }
    case 'wave': {
      let s = '';
      for (let i = 0; i < 40; i++) {
        const x = i * 5;
        const h = 30 + Math.sin(i * 0.5) * 20 + Math.sin(i * 0.17) * 8;
        s += `<line x1="${x}" y1="${(60 - h / 2).toFixed(1)}" x2="${x}" y2="${(60 + h / 2).toFixed(1)}" style="stroke:var(--ink);stroke-width:1"/>`;
      }
      return s;
    }
    case 'symmetry': {
      let inner = '';
      for (let i = 0; i < 8; i++) {
        inner += `<g transform="rotate(${i * 45})"><path d="M0 0 L 40 -6 L 44 0 L 40 6 Z" style="fill:none;stroke:var(--ink);stroke-width:0.6"/></g>`;
      }
      inner += `<circle r="3" style="fill:var(--accent)"/>`;
      return `<g transform="translate(100,60)">${inner}</g>`;
    }
    case 'replica': {
      let inner = '';
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5;
        const cx = (Math.cos(a) * 18).toFixed(1);
        const cy = (Math.sin(a) * 18).toFixed(1);
        inner += `<circle cx="${cx}" cy="${cy}" r="22" style="fill:none;stroke:var(--ink);stroke-width:0.6"/>`;
      }
      return `<g transform="translate(100,60)">${inner}</g>`;
    }
    case 'criticality': {
      let s = '';
      for (let i = 0; i < 120; i++) {
        const x = (10 + rand(seed, i) * 180).toFixed(1);
        const y = (10 + Math.pow(rand(seed, i + 99), 2) * 100).toFixed(1);
        const r = (0.8 + rand(seed, i + 200) * 1.8).toFixed(1);
        const op = (0.5 + rand(seed, i) * 0.5).toFixed(2);
        s += `<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--ink);opacity:${op}"/>`;
      }
      return s;
    }
    case 'graph': {
      const nodes = [];
      for (let i = 0; i < 14; i++) {
        nodes.push({ x: 15 + rand(seed, i) * 170, y: 10 + rand(seed, i + 50) * 100 });
      }
      let s = '';
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 50) {
            s += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" style="stroke:var(--ink);stroke-width:0.4"/>`;
          }
        }
      }
      nodes.forEach((n, i) => {
        const col = i % 5 === 0 ? 'var(--accent)' : 'var(--ink)';
        s += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="2.5" style="fill:${col}"/>`;
      });
      return s;
    }
    case 'spectrum': {
      let inner = `<circle r="40" style="fill:none;stroke:var(--ink);stroke-width:0.4;stroke-dasharray:2 2"/>`;
      for (let i = 0; i < 90; i++) {
        const a = rand(seed, i) * Math.PI * 2;
        const rr = 40 * Math.sqrt(rand(seed, i + 77));
        inner += `<circle cx="${(Math.cos(a) * rr).toFixed(1)}" cy="${(Math.sin(a) * rr * 0.6).toFixed(1)}" r="1" style="fill:var(--ink)"/>`;
      }
      return `<g transform="translate(100,60)">${inner}</g>`;
    }
    case 'bp': {
      let s = '';
      for (let i = 0; i < 5; i++) {
        const x = 30 + i * 35;
        s += `<rect x="${x - 4}" y="30" width="8" height="8" style="fill:none;stroke:var(--ink);stroke-width:0.8"/>`;
      }
      for (let i = 0; i < 6; i++) {
        s += `<circle cx="${20 + i * 32}" cy="85" r="4" style="fill:none;stroke:var(--ink);stroke-width:0.8"/>`;
      }
      for (let i = 0; i < 5; i++) {
        const sx = 30 + i * 35;
        s += `<line x1="${sx}" y1="38" x2="${20 + i * 32}" y2="81" style="stroke:var(--ink);stroke-width:0.4"/>`;
        s += `<line x1="${sx}" y1="38" x2="${20 + (i + 1) * 32}" y2="81" style="stroke:var(--ink);stroke-width:0.4"/>`;
      }
      return s;
    }
    case 'diffusion': {
      let s = '';
      for (let col = 0; col < 6; col++) {
        const n = 80 - col * 10;
        for (let i = 0; i < n; i++) {
          const x = (15 + col * 30 + rand(seed, col * 100 + i) * 22).toFixed(1);
          const y = (10 + rand(seed, col * 200 + i) * 100).toFixed(1);
          const op = (1 - col * 0.13).toFixed(2);
          s += `<circle cx="${x}" cy="${y}" r="1.2" style="fill:var(--ink);opacity:${op}"/>`;
        }
      }
      return s;
    }
    case 'flow': {
      let s = '';
      for (let i = 0; i < 8; i++) {
        s += `<path d="M ${20 + i * 3} ${100 - i * 6} Q 100 ${60 - i * 3} ${180 - i * 3} ${100 - i * 6}" style="fill:none;stroke:var(--ink);stroke-width:0.5;opacity:0.7"/>`;
      }
      s += `<circle cx="100" cy="60" r="2" style="fill:var(--accent)"/>`;
      return s;
    }
    default:
      return '';
  }
}

function thumbSVG(motif, seed) {
  return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%;background:var(--card)">${generateThumbContent(motif, seed)}</svg>`;
}

// ── Talk card HTML ─────────────────────────────────────────
function talkCardHTML(speaker, globalIndex) {
  const motif = MOTIFS[globalIndex % MOTIFS.length];
  const seed = globalIndex + 3;
  const date = parseSpeakerDate(speaker.date);
  const dateStr = formatDateNumeric(date);
  const hasSlides = !!speaker.slides;
  const hasVideo = !!speaker.recording;

  const slidesEl = hasSlides
    ? `<span class="asset-on" data-action="open-slides" data-url="${escAttr(speaker.slides)}">◆ slides</span>`
    : `<span>◇ —</span>`;

  const videoEl = hasVideo
    ? `<span class="asset-on" data-action="open-video" data-url="${escAttr(speaker.recording)}" data-name="${escAttr(speaker.name)}" data-title="${escAttr(speaker.title || '')}">▶ video</span>`
    : `<span>▷ —</span>`;

  const pubsHTML = speaker.publications && speaker.publications.length
    ? `<h4>Publications</h4><ul class="pub-list">${speaker.publications.map(p =>
        `<li><a href="${escAttr(p.url)}" target="_blank" rel="noopener">${escHtml(p.title)}</a><span class="pub-authors">${escHtml(p.authors)} · ${escHtml(p.year)}</span></li>`
      ).join('')}</ul>`
    : '';

  const linksHTML = (hasSlides || hasVideo)
    ? `<div class="talk-links">${hasSlides ? `<a class="btn ghost" href="${escAttr(speaker.slides)}" target="_blank" rel="noopener">↓ Slides</a>` : ''}${hasVideo ? `<button class="btn ghost" data-action="open-video" data-url="${escAttr(speaker.recording)}" data-name="${escAttr(speaker.name)}" data-title="${escAttr(speaker.title || '')}">▶ Watch recording</button>` : ''}</div>`
    : '';

  const hasDetails = pubsHTML || linksHTML;
  const expandBtn = hasDetails
    ? `<button class="talk-expand-toggle" data-action="toggle-expand">▼ details</button>`
    : '';

  const titleEl = speaker.title
    ? escHtml(speaker.title)
    : '<span style="font-style:italic;color:var(--ink-3)">Title TBA</span>';

  const speakerEl = speaker.affiliation
    ? `${escHtml(speaker.name)} <span>· ${escHtml(speaker.affiliation)}</span>`
    : escHtml(speaker.name);

  return `<div class="talk" data-index="${globalIndex}">
  <div class="talk-thumb">
    ${thumbSVG(motif, seed)}
    <div class="talk-id">SPOT · ${String(globalIndex + 1).padStart(3, '0')}</div>
  </div>
  <div class="talk-body">
    <div class="talk-meta">
      <span class="date">${dateStr}</span>
      <span>${motif}</span>
    </div>
    <h3>${titleEl}</h3>
    <div class="speaker">${speakerEl}</div>
    <div class="assets">${slidesEl}${videoEl}</div>
    ${expandBtn}
  </div>
  <div class="talk-details">
    <div class="talk-details-inner">
      ${pubsHTML}
      ${linksHTML}
    </div>
  </div>
</div>`;
}

// ── Upcoming / next seminar card ───────────────────────────
function renderNextSeminar(container) {
  if (!upcomingSpeakers.length) {
    container.innerHTML = `<div class="next-card empty">
  <h3>No upcoming seminar scheduled.</h3>
  <p>The summer-semester programme is being assembled. The first talk of SS26 will be announced in the coming weeks — expect the notice in <code>phys4ml_seminar</code>.</p>
  <div class="btns">
    <a class="btn" href="https://lists.fz-juelich.de/postorius/lists/phys4ml_seminar.lists.fz-juelich.de/" target="_blank" rel="noopener">Subscribe to notices</a>
    <a class="btn ghost" href="#/archive">Browse archive</a>
  </div>
</div>`;
    return;
  }

  const next = upcomingSpeakers[0];
  const titleLine = next.title
    ? `<h3>${escHtml(next.title)}</h3>`
    : `<h3 style="font-style:italic;color:var(--ink-3)">Title to be announced</h3>`;

  const speakerLine = next.affiliation
    ? `${escHtml(next.name)} <span>· ${escHtml(next.affiliation)}</span>`
    : escHtml(next.name);

  let moreHTML = '';
  if (upcomingSpeakers.length > 1) {
    moreHTML = `<div class="upcoming-more"><div style="margin-bottom:8px;letter-spacing:0.06em">Also upcoming:</div>` +
      upcomingSpeakers.slice(1).map(s => {
        const d = formatDateNumeric(parseSpeakerDate(s.date));
        return `<div class="upcoming-more-row"><span class="date">${d}</span><span>${escHtml(s.name)}${s.affiliation ? ` · ${escHtml(s.affiliation)}` : ''}</span></div>`;
      }).join('') + `</div>`;
  }

  container.innerHTML = `<div class="next-card has-speaker">
  <div>
    <div class="next-date">${escHtml(next.date)}</div>
    ${titleLine}
    <div class="next-speaker-line">${speakerLine}</div>
    ${moreHTML}
  </div>
  <div class="btns" style="flex-direction:column;align-items:flex-start">
    <a class="btn" href="https://lists.fz-juelich.de/postorius/lists/phys4ml_seminar.lists.fz-juelich.de/" target="_blank" rel="noopener">Subscribe to notices</a>
    <a class="btn ghost" href="#/archive">Browse archive</a>
  </div>
</div>`;
}

// ── Home: recent 6 talks ───────────────────────────────────
function renderHomeRecent() {
  const container = document.getElementById('home-recent-talks');
  if (!container) return;
  const recent = pastSpeakers.slice(0, 6);
  container.innerHTML = recent.map((s, i) => talkCardHTML(s, i)).join('');

  const viewAll = document.getElementById('viewAllBtn');
  if (viewAll) viewAll.textContent = `View all ${pastSpeakers.length} talks →`;

  const statEl = document.getElementById('statTalks');
  if (statEl) statEl.textContent = pastSpeakers.length;
}

// ── Archive: filtered + paginated ─────────────────────────
function getArchiveFiltered() {
  const q = (document.getElementById('archiveSearch')?.value || '').toLowerCase();
  const sort = document.getElementById('archiveSort')?.value || 'new';

  let result = pastSpeakers.filter(s => {
    if (!q) return true;
    return (s.name + s.title + s.affiliation).toLowerCase().includes(q);
  });

  if (sort === 'speaker') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }
  // 'new' order is already most-recent-first from categorizeSpeakers

  return result;
}

function renderArchive() {
  archiveFilteredSpeakers = getArchiveFiltered();

  const countEl = document.getElementById('archiveCount');
  if (countEl) {
    countEl.innerHTML = `showing <b>${archiveFilteredSpeakers.length}</b> / ${pastSpeakers.length} talks`;
  }

  if (archiveSpeakersPerPage === 'all' || archiveSpeakersPerPage >= archiveFilteredSpeakers.length) {
    archiveTotalPages = 1;
  } else {
    archiveTotalPages = Math.max(1, Math.ceil(archiveFilteredSpeakers.length / archiveSpeakersPerPage));
  }

  if (archiveCurrentPage > archiveTotalPages) archiveCurrentPage = archiveTotalPages;

  const start = archiveSpeakersPerPage === 'all' ? 0 : (archiveCurrentPage - 1) * archiveSpeakersPerPage;
  const end = archiveSpeakersPerPage === 'all' ? archiveFilteredSpeakers.length : start + archiveSpeakersPerPage;
  const page = archiveFilteredSpeakers.slice(start, end);

  const talksEl = document.getElementById('archive-talks');
  if (talksEl) {
    // use global index so each card gets a stable motif
    talksEl.innerHTML = page.map((s, i) => {
      const globalIdx = pastSpeakers.indexOf(s);
      return talkCardHTML(s, globalIdx >= 0 ? globalIdx : i);
    }).join('');
  }

  renderArchivePagination();
}

function renderArchivePagination() {
  const pg = document.getElementById('archivePagination');
  const meta = document.getElementById('archivePaginationMeta');
  if (!pg) return;

  if (archiveTotalPages <= 1) {
    pg.innerHTML = '';
    if (meta) meta.innerHTML = '';
    return;
  }

  const prev = `<button data-action="pg-prev" ${archiveCurrentPage === 1 ? 'disabled' : ''}>‹ prev</button>`;
  const next = `<button data-action="pg-next" ${archiveCurrentPage === archiveTotalPages ? 'disabled' : ''}>next ›</button>`;

  let pageButtons = '';
  const total = archiveTotalPages;
  const cur = archiveCurrentPage;

  function pageBtn(n) {
    return `<button data-action="pg-go" data-pg="${n}" class="${n === cur ? 'pg-active' : ''}">${n}</button>`;
  }

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pageButtons += pageBtn(i);
  } else {
    pageButtons += pageBtn(1);
    if (cur <= 3) {
      for (let i = 2; i <= 4; i++) pageButtons += pageBtn(i);
      pageButtons += `<span class="page-ellipsis">…</span>`;
    } else if (cur >= total - 2) {
      pageButtons += `<span class="page-ellipsis">…</span>`;
      for (let i = total - 3; i <= total - 1; i++) pageButtons += pageBtn(i);
    } else {
      pageButtons += `<span class="page-ellipsis">…</span>`;
      for (let i = cur - 1; i <= cur + 1; i++) pageButtons += pageBtn(i);
      pageButtons += `<span class="page-ellipsis">…</span>`;
    }
    pageButtons += pageBtn(total);
  }

  pg.innerHTML = prev + pageButtons + next;

  if (meta) {
    meta.innerHTML = `<span>Page ${cur} of ${total}</span>
      <span>Talks per page:
        <select data-action="pg-per-page">
          <option value="5" ${archiveSpeakersPerPage === 5 ? 'selected' : ''}>5</option>
          <option value="10" ${archiveSpeakersPerPage === 10 ? 'selected' : ''}>10</option>
          <option value="20" ${archiveSpeakersPerPage === 20 ? 'selected' : ''}>20</option>
          <option value="all" ${archiveSpeakersPerPage === 'all' ? 'selected' : ''}>All</option>
        </select>
      </span>`;
  }
}

// ── Speaker categorization ─────────────────────────────────
function categorizeSpeakers() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  upcomingSpeakers = [];
  pastSpeakers = [];

  allSpeakers.forEach(s => {
    const d = parseSpeakerDate(s.date);
    if (d >= today) {
      upcomingSpeakers.push(s);
    } else {
      pastSpeakers.push(s);
    }
  });

  upcomingSpeakers.sort((a, b) => parseSpeakerDate(a.date) - parseSpeakerDate(b.date));
  pastSpeakers.sort((a, b) => parseSpeakerDate(b.date) - parseSpeakerDate(a.date));
}

// ── Load speakers data ─────────────────────────────────────
function loadSpeakersData() {
  if (typeof SPEAKERS_DATA !== 'undefined') {
    allSpeakers = SPEAKERS_DATA;
    categorizeSpeakers();
    renderAll();
    return;
  }
  fetch('speakers-data.json')
    .then(r => r.json())
    .then(data => {
      allSpeakers = data;
      categorizeSpeakers();
      renderAll();
    })
    .catch(() => {
      allSpeakers = [];
      categorizeSpeakers();
      renderAll();
    });
}

function renderAll() {
  renderNextSeminar(document.getElementById('home-next-seminar'));
  renderHomeRecent();
  renderArchive();
}

// ── Toggle card expand ────────────────────────────────────
function toggleCardExpand(card) {
  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  const btn = card.querySelector('.talk-expand-toggle');
  if (btn) btn.textContent = isExpanded ? '▼ details' : '▲ details';
}

// ── Video player ───────────────────────────────────────────
function openVideoPlayer(url, name, title) {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `<div class="video-modal-content">
  <div class="video-modal-header">
    <div><h3>${escHtml(name)}</h3><p>${escHtml(title)}</p></div>
    <button class="video-modal-close" data-action="close-video">×</button>
  </div>
  <div class="video-container">
    <video controls width="100%">
      <source src="${escAttr(url)}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  modal.addEventListener('click', e => { if (e.target === modal) closeVideoPlayer(); });
}

function closeVideoPlayer() {
  document.querySelector('.video-modal')?.remove();
  document.body.style.overflow = '';
}

// ── Escape helpers ─────────────────────────────────────────
function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── Event delegation ───────────────────────────────────────
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (action === 'toggle-expand') {
    e.stopPropagation();
    toggleCardExpand(el.closest('.talk'));
    return;
  }

  if (action === 'open-video') {
    e.preventDefault();
    openVideoPlayer(el.dataset.url, el.dataset.name, el.dataset.title);
    return;
  }

  if (action === 'open-slides') {
    e.stopPropagation();
    window.open(el.dataset.url, '_blank', 'noopener');
    return;
  }

  if (action === 'close-video') {
    closeVideoPlayer();
    return;
  }

  if (action === 'pg-prev') {
    if (archiveCurrentPage > 1) { archiveCurrentPage--; renderArchive(); }
    return;
  }

  if (action === 'pg-next') {
    if (archiveCurrentPage < archiveTotalPages) { archiveCurrentPage++; renderArchive(); }
    return;
  }

  if (action === 'pg-go') {
    archiveCurrentPage = parseInt(el.dataset.pg, 10);
    renderArchive();
    return;
  }
});

document.addEventListener('change', e => {
  const action = e.target.dataset.action;

  if (action === 'pg-per-page') {
    const v = e.target.value;
    archiveSpeakersPerPage = v === 'all' ? 'all' : parseInt(v, 10);
    archiveCurrentPage = 1;
    renderArchive();
    return;
  }

  if (e.target.id === 'archiveSort') {
    archiveCurrentPage = 1;
    renderArchive();
    return;
  }
});

document.addEventListener('input', e => {
  if (e.target.id === 'archiveSearch') {
    archiveCurrentPage = 1;
    renderArchive();
  }
  if (e.target.id === 'topbarSearch') {
    const q = e.target.value.trim();
    if (q) {
      const archiveInput = document.getElementById('archiveSearch');
      if (archiveInput) {
        archiveInput.value = q;
        archiveCurrentPage = 1;
        window.location.hash = '#/archive';
        renderArchive();
      }
    }
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoPlayer();
});

// ── Sidebar nav: intercept hash clicks ────────────────────
document.getElementById('sectionNav')?.addEventListener('click', e => {
  const link = e.target.closest('a[data-page]');
  if (link) {
    e.preventDefault();
    const page = link.dataset.page;
    window.location.hash = `#/${page}`;
    showPage(page);
  }
});

// ── "Browse archive" link on home ─────────────────────────
document.getElementById('page-home')?.addEventListener('click', e => {
  const link = e.target.closest('a[href="#/archive"]');
  if (link) {
    e.preventDefault();
    window.location.hash = '#/archive';
    showPage('archive');
  }
});

// ── Hash routing ───────────────────────────────────────────
window.addEventListener('hashchange', () => showPage(getPage()));

// ── Last updated ───────────────────────────────────────────
function setLastUpdated() {
  const el = document.getElementById('lastUpdated');
  if (!el) return;
  const now = new Date();
  const iso = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');
  el.textContent = iso;
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  showPage(getPage());
  setLastUpdated();
  loadSpeakersData();
});

// Smooth scrolling for in-page anchor links
document.querySelectorAll('a[href^="#"]:not([data-page])').forEach(a => {
  if (a.getAttribute('href').startsWith('#/')) return;
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
