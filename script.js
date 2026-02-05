// Sticky navigation functionality
const stickyNavElement = document.getElementById('stickyNav');
const headerElement = document.querySelector('header');
let currentPage = 1;
let totalPages = 2;
let speakersPerPage = 3; // Change from 5 to 3

// All speakers data - will be loaded from external file
let allSpeakers = [];
let upcomingSpeakers = [];
let pastSpeakers = [];

// Function to parse date string and return Date object
function parseSpeakerDate(dateString) {
    // Assuming format: "Tuesday, July 1, 2025"
    // Extract the date part (remove day of week)
    const dateOnly = dateString.split(', ').slice(1).join(', ');
    return new Date(dateOnly);
}

// Function to categorize and sort speakers
function categorizeSpeakers() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    upcomingSpeakers = [];
    pastSpeakers = [];
    
    allSpeakers.forEach(speaker => {
        const speakerDate = parseSpeakerDate(speaker.date);
        
        if (speakerDate >= today) {
            upcomingSpeakers.push(speaker);
        } else {
            pastSpeakers.push(speaker);
        }
    });
    
    // Sort upcoming speakers by date (earliest first)
    upcomingSpeakers.sort((a, b) => {
        return parseSpeakerDate(a.date) - parseSpeakerDate(b.date);
    });
    
    // Sort past speakers by date (most recent first)
    pastSpeakers.sort((a, b) => {
        return parseSpeakerDate(b.date) - parseSpeakerDate(a.date);
    });
}

// Function to load speakers data from external JavaScript file
function loadSpeakersData() {
    // If using the JavaScript file approach, the data is already available
    if (typeof SPEAKERS_DATA !== 'undefined') {
        allSpeakers = SPEAKERS_DATA;
        categorizeSpeakers(); // Add this line
        renderSpeakers();
        return;
    }
    
    // Otherwise, try to fetch from JSON file
    fetchSpeakersFromFile();
}

// Function to fetch speakers data from JSON file
async function fetchSpeakersFromFile() {
    try {
        const response = await fetch('speakers-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        allSpeakers = JSON.parse(data);
        
        // Categorize speakers after loading
        categorizeSpeakers();
        
        // Initialize the page after data is loaded
        renderSpeakers();
        
    } catch (error) {
        console.error('Error loading speakers data:', error);
        console.error('Make sure speakers-data.json is in the same directory as your HTML file');
        console.error('If running locally, you may need to serve the files through a local server');
        
        // Fallback to default data if file loading fails
        allSpeakers = [
            {
                name: "Noam Itzhak Levi",
                affiliation: "EPFL",
                date: "Tuesday, July 1, 2025",
                title: "The Physics of Learnable Data",
                publications: [
                    {
                        title: "The Underlying Scaling Laws and Universal Statistical Structure of Complex Datasets",
                        authors: "Noam Levi, Yaron Oz",
                        year: "2023",
                        url: "https://arxiv.org/pdf/2306.14975"
                    }
                ],
                recording: "https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5/download?path=%2F&files=SPOT_Seminar_2025_07_01_Noam_Levi.mp4",
                slides: "https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5/download?path=%2F&files=SPOT_Seminar_1_7_25_Noam_Levi.pdf"
            }
            // Add more fallback data as needed
        ];
        
        categorizeSpeakers(); // Add this line
        renderSpeakers();
    }
}

function handleScroll() {
    const headerBottom = headerElement.offsetTop + headerElement.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide sticky navigation
    if (scrollTop > headerBottom) {
        stickyNavElement.classList.add('visible');
    } else {
        stickyNavElement.classList.remove('visible');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Call once to set initial state
handleScroll();

// Function to render speakers for current pagination settings
function renderUpcomingSpeakers() {
    const speakerGrid = document.querySelector('.speaker-grid.upcoming');
    if (!speakerGrid) return;
    
    const paginationContainer = speakerGrid.querySelector('.pagination-container');
    
    // Remove all existing speaker pages but keep pagination
    const existingPages = speakerGrid.querySelectorAll('.speakers-page');
    existingPages.forEach(page => page.remove());
    
    if (upcomingSpeakers.length === 0) {
        const noSpeakersMessage = document.createElement('div');
        noSpeakersMessage.className = 'speakers-page active';
        noSpeakersMessage.innerHTML = '<p style="text-align: center; padding: 2rem;">No upcoming talks scheduled at the moment.</p>';
        speakerGrid.insertBefore(noSpeakersMessage, paginationContainer);
        if (paginationContainer) paginationContainer.style.display = 'none';
        return;
    }
    
    // For upcoming speakers, show all without pagination
    const allSpeakersPage = document.createElement('div');
    allSpeakersPage.className = 'speakers-page active';
    allSpeakersPage.id = 'upcoming-page-1';
    allSpeakersPage.innerHTML = upcomingSpeakers.map(speaker => generateSpeakerHTML(speaker, true)).join('');
    
    speakerGrid.insertBefore(allSpeakersPage, paginationContainer);
    if (paginationContainer) paginationContainer.style.display = 'none';
}

function renderPastSpeakers() {
    const speakerGrid = document.querySelector('.speaker-grid.chronological');
    if (!speakerGrid) return;
    
    const paginationContainer = speakerGrid.querySelector('.pagination-container');
    
    // Remove all existing speaker pages but keep pagination
    const existingPages = speakerGrid.querySelectorAll('.speakers-page');
    existingPages.forEach(page => page.remove());
    
    if (pastSpeakers.length === 0) {
        const noSpeakersMessage = document.createElement('div');
        noSpeakersMessage.className = 'speakers-page active';
        noSpeakersMessage.innerHTML = '<p style="text-align: center; padding: 2rem;">No past talks available.</p>';
        speakerGrid.insertBefore(noSpeakersMessage, paginationContainer);
        document.getElementById('paginationControls').style.display = 'none';
        document.getElementById('paginationInfo').style.display = 'none';
        return;
    }
    
    if (speakersPerPage >= pastSpeakers.length) {
        // Show all speakers on one page
        totalPages = 1;
        const allSpeakersPage = document.createElement('div');
        allSpeakersPage.className = 'speakers-page active';
        allSpeakersPage.id = 'page-1';
        allSpeakersPage.innerHTML = pastSpeakers.map(speaker => generateSpeakerHTML(speaker, false)).join('');
        
        speakerGrid.insertBefore(allSpeakersPage, paginationContainer);
        
        document.getElementById('paginationControls').style.display = 'none';
        document.getElementById('paginationInfo').style.display = 'none';
    } else {
        // Calculate total pages
        totalPages = Math.ceil(pastSpeakers.length / speakersPerPage);
        
        // Generate pages
        for (let page = 1; page <= totalPages; page++) {
            const startIndex = (page - 1) * speakersPerPage;
            const endIndex = startIndex + speakersPerPage;
            const pageSpeakers = pastSpeakers.slice(startIndex, endIndex);
            
            const pageElement = document.createElement('div');
            pageElement.className = `speakers-page ${page === 1 ? 'active' : ''}`;
            pageElement.id = `page-${page}`;
            pageElement.innerHTML = pageSpeakers.map(speaker => generateSpeakerHTML(speaker, false)).join('');
            
            speakerGrid.insertBefore(pageElement, paginationContainer);
        }
        
        document.getElementById('paginationControls').style.display = 'flex';
        document.getElementById('paginationInfo').style.display = 'block';
        
        // Generate page buttons
        generatePageButtons();
    }
    
    // Reset to first page
    currentPage = 1;
    updatePaginationControls();
}

function renderSpeakers() {
    renderUpcomingSpeakers();
    renderPastSpeakers();
}

// Function to generate speaker HTML
function generateSpeakerHTML(speaker, isUpcoming = false) {
    // Generate publications list
    const publicationsList = speaker.publications.map(pub => 
        `<li>
            <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="publication-title">${pub.title}</a>
            <div class="publication-details">
                <span class="publication-authors">${pub.authors}</span> • 
                <span class="publication-year">${pub.year}</span>
            </div>
        </li>`
    ).join('');

    // Check if recording exists (only for past talks)
    const recordingLink = !isUpcoming && speaker.recording ? 
        `<a href="#" onclick="openVideoPlayer('${speaker.recording}', '${speaker.name}', '${speaker.title}')" class="speaker-link">Watch Recording</a>` : '';
    
    // Slides link
    const slidesLink = speaker.slides ? 
        `<a href="${speaker.slides}" class="speaker-link">Download Slides</a>` : '';
    
    const cardClass = isUpcoming ? 'upcoming' : 'past';
    
    return `
        <div class="speaker-card ${cardClass} speaker-card-collapsed">
            <div class="speaker-header" onclick="toggleSpeakerCard(this)">
                <div class="speaker-name">${speaker.name}</div>
                <div class="speaker-affiliation">${speaker.affiliation}</div>
                <div class="speaker-title-visible"><strong>Title:</strong> ${speaker.title}</div>
                <div class="speaker-date">${speaker.date}</div>
                <button class="speaker-expand-toggle">▼ Show details</button>
            </div>
            <div class="speaker-details">
                <div class="dropdown-inner">
                    <h4>Publications</h4>
                    <ul class="publications-list">
                        ${publicationsList}
                    </ul>
                    ${recordingLink}
                    ${slidesLink}
                </div>
            </div>
        </div>
    `;
}

// Function to generate page buttons dynamically with ellipsis for many pages
function generatePageButtons() {
    const pageButtonsContainer = document.getElementById('pageButtons');
    pageButtonsContainer.innerHTML = '';
    
    const maxVisibleButtons = 7; // Maximum number of page buttons to show
    
    if (totalPages <= maxVisibleButtons) {
        // Show all buttons if total pages is small
        for (let i = 1; i <= totalPages; i++) {
            createPageButton(i, pageButtonsContainer);
        }
    } else {
        // Always show first page
        createPageButton(1, pageButtonsContainer);
        
        // Determine range of pages to show around current page
        let startPage, endPage;
        
        if (currentPage <= 3) {
            // Near the beginning: show 1 2 3 4 ... last
            startPage = 2;
            endPage = 4;
        } else if (currentPage >= totalPages - 2) {
            // Near the end: show 1 ... last-3 last-2 last-1 last
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        } else {
            // In the middle: show 1 ... current-1 current current+1 ... last
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
        
        // Add left ellipsis if needed
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'page-ellipsis';
            pageButtonsContainer.appendChild(ellipsis);
        }
        
        // Show middle pages
        for (let i = startPage; i <= endPage; i++) {
            createPageButton(i, pageButtonsContainer);
        }
        
        // Add right ellipsis if needed
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'page-ellipsis';
            pageButtonsContainer.appendChild(ellipsis);
        }
        
        // Always show last page
        createPageButton(totalPages, pageButtonsContainer);
    }
}

// Helper function to create a page button
function createPageButton(pageNum, container) {
    const button = document.createElement('button');
    button.textContent = pageNum;
    button.className = pageNum === currentPage ? 'active' : '';
    button.onclick = () => goToPage(pageNum);
    container.appendChild(button);
}

// Function to change items per page (only affects past speakers)
function changePerPage() {
    const selectElement = document.getElementById('perPageSelect');
    const selectedValue = selectElement.value;
    
    if (selectedValue === 'all') {
        speakersPerPage = pastSpeakers.length; // Show all
    } else {
        speakersPerPage = parseInt(selectedValue);
    }
    
    renderPastSpeakers();
}

// Pagination functionality
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(pageNumber) {
    if (totalPages === 1) return;
    
    // Hide current page
    const currentPageElement = document.getElementById(`page-${currentPage}`);
    if (currentPageElement) currentPageElement.classList.remove('active');
    
    // Show new page
    currentPage = pageNumber;
    const newPageElement = document.getElementById(`page-${currentPage}`);
    if (newPageElement) newPageElement.classList.add('active');
    
    // Regenerate page buttons to update ellipsis position
    generatePageButtons();
    
    // Update pagination controls
    updatePaginationControls();
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageInfo = document.getElementById('currentPageInfo');
    const totalPagesInfo = document.getElementById('totalPagesInfo');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    if (currentPageInfo) currentPageInfo.textContent = currentPage;
    if (totalPagesInfo) totalPagesInfo.textContent = totalPages;
}

// Speaker card toggle functionality
function toggleSpeakerCard(header) {
    const speakerCard = header.closest('.speaker-card');
    const expandToggle = header.querySelector('.speaker-expand-toggle');
    
    if (speakerCard.classList.contains('speaker-card-collapsed')) {
        // Expand the card
        speakerCard.classList.remove('speaker-card-collapsed');
        speakerCard.classList.add('speaker-card-expanded');
        expandToggle.innerHTML = '▲ Hide details';
    } else {
        // Collapse the card
        speakerCard.classList.remove('speaker-card-expanded');
        speakerCard.classList.add('speaker-card-collapsed');
        expandToggle.innerHTML = '▼ Show details';
    }
}

// Initialize pagination
document.addEventListener('DOMContentLoaded', function() {
    loadSpeakersData(); // This will properly set up pagination based on the default speakersPerPage value
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles and observe sections
document.querySelectorAll('.section, .info-section, .cta-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Video player functionality
function openVideoPlayer(videoUrl, speakerName, talkTitle) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${speakerName}</h3>
                <p>${talkTitle}</p>
                <button class="video-modal-close" onclick="closeVideoPlayer()">&times;</button>
            </div>
            <div class="video-container">
                <video controls width="100%" height="400">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener to close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoPlayer();
        }
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeVideoPlayer() {
    const modal = document.querySelector('.video-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideoPlayer();
    }
});
