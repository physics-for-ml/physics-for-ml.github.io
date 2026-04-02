// DPG Spring Conference 2026 session rendering

function toggleDPGCard(header) {
    const card = header.closest('.dpg-talk-card');
    const toggle = header.querySelector('.dpg-expand-toggle');
    if (card.classList.contains('dpg-card-collapsed')) {
        card.classList.remove('dpg-card-collapsed');
        card.classList.add('dpg-card-expanded');
        toggle.innerHTML = '&#9650; Hide details';
    } else {
        card.classList.remove('dpg-card-expanded');
        card.classList.add('dpg-card-collapsed');
        toggle.innerHTML = '&#9660; Show details';
    }
}

function renderDPGSessions(sessions) {
    const container = document.getElementById('dpg-sessions-container');
    if (!container) return;

    let html = '';

    for (const [sessionId, session] of Object.entries(sessions)) {
        const activeTalks = session.contributions.filter(c => c.title !== null);
        if (activeTalks.length === 0) continue;

        const firstTalk = activeTalks[0];

        html += `
            <div class="dpg-session-group">
                <h3 class="dpg-session-title">${sessionId}: ${session.name}</h3>
                <div class="dpg-session-meta">${firstTalk.day_date} &middot; Room ${firstTalk.room}</div>
                <div class="dpg-talks">
        `;

        for (const talk of activeTalks) {
            const presenter = talk.authors.find(a => a.presenter);
            const presenterName = presenter ? presenter.name : '';

            let presenterAffil = '';
            if (presenter && presenter.affil_ids.length > 0) {
                const ids = presenter.affil_ids[0].split(',');
                presenterAffil = ids.map(id => talk.affiliations[id.trim()]).filter(Boolean).join('; ');
            }

            const isInvited = talk.session_heading.includes('Hauptvortrag');

            const allAuthors = talk.authors.map(a => {
                let name = a.name;
                if (a.presenter) name = '<strong>' + name + '</strong>';
                return name;
            }).join(', ');

            const slidesLink = talk.pdf_link
                ? '<a href="' + talk.pdf_link + '" target="_blank" rel="noopener noreferrer" class="dpg-link dpg-link-slides">Download Slides</a>'
                : '<span class="dpg-slides-pending">Slides coming soon</span>';

            html += `
                <div class="dpg-talk-card dpg-card-collapsed${isInvited ? ' dpg-invited' : ''}">
                    <div class="dpg-card-header" onclick="toggleDPGCard(this)">
                        <div class="dpg-card-top-row">
                            <span class="dpg-talk-time">${talk.time}</span>
                            ${isInvited ? '<span class="dpg-invited-badge">Invited Talk</span>' : ''}
                        </div>
                        <div class="dpg-card-speaker">${presenterName}</div>
                        ${presenterAffil ? '<div class="dpg-card-affiliation">' + presenterAffil + '</div>' : ''}
                        <div class="dpg-card-title">${talk.title}</div>
                        <button class="dpg-expand-toggle">&#9660; Show details</button>
                    </div>
                    <div class="dpg-card-details">
                        <div class="dpg-card-details-inner">
                            <p class="dpg-authors"><strong>Authors:</strong> ${allAuthors}</p>
                            ${talk.abstract ? '<div class="dpg-abstract"><strong>Abstract:</strong> ' + talk.abstract + '</div>' : ''}
                            <div class="dpg-talk-links">
                                <a href="${talk.url}" target="_blank" rel="noopener noreferrer" class="dpg-link">DPG Program Entry</a>
                                ${slidesLink}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof DPG_SESSIONS_DATA !== 'undefined') {
        renderDPGSessions(DPG_SESSIONS_DATA);
    }
});
