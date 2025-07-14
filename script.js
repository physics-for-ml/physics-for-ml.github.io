// Sticky navigation functionality
const stickyNavElement = document.getElementById('stickyNav');
const headerElement = document.querySelector('header');
let currentPage = 1;
let totalPages = 2;
let speakersPerPage = 5;

// All speakers data
const allSpeakers = [
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
            },
            {
                title: "The Universal Statistical Structure and Scaling Laws of Chaos and Turbulence",
                authors: "Noam Levi, Yaron Oz",
                year: "2023",
                url: "https://arxiv.org/pdf/2311.01358"
            },
            {
                title: "Probing the Latent Hierarchical Structure of Data via Diffusion Models",
                authors: "Antonio Sclocchi, Alessandro Favero, Noam Itzhak Levi, Matthieu Wyart",
                year: "2024",
                url: "https://arxiv.org/pdf/2410.13770"
            }
        ],
        recording: "https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5#/files_mediaviewer/SPOT_Seminar_2025_07_01_Noam_Levi.mp4",
        slides: "https://fz-juelich.sciebo.de/s/c3z3A4696lgIlz5#pdfviewer"
    },
    {
        name: "Oren Neumann",
        affiliation: "Goethe Universität Frankfurt",
        date: "Tuesday, June 17, 2025",
        title: "Reinforcement Learning and Scaling Laws: a Case Study of AlphaZero",
        publications: [
            {
                title: "Scaling Laws for a Multi-Agent Reinforcement Learning Model",
                authors: "Oren Neumann, Claudius Gros",
                year: "2022",
                url: "https://arxiv.org/abs/2210.00849"
            },
            {
                title: "AlphaZero Neural Scaling and Zipf's Law: a Tale of Board Games and Power Laws",
                authors: "Oren Neumann, Claudius Gros",
                year: "2024",
                url: "https://arxiv.org/abs/2412.11979"
            }
        ]
    },
    {
        name: "Marcel Kühn",
        affiliation: "Universität Leipzig",
        date: "Tuesday, June 3, 2025",
        title: "Anti-Correlated Noise in Epoch-Based Stochastic Gradient Descent and its Implications",
        publications: [
            {
                title: "Correlated Noise in Epoch-Based Stochastic Gradient Descent: Implications for Weight Variances",
                authors: "Marcel Kühn, Bernd Rosenow",
                year: "2023",
                url: "https://arxiv.org/abs/2306.05300"
            }
        ]
    },
    {
        name: "Noa Rubin<sup>1</sup>, Kirsten Fischer<sup>2,3</sup>, Javed Lindner<sup>2,3</sup>",
        affiliation: "<sup>1</sup>Hebrew University of Jerusalem, <sup>2</sup>Forschungszentrum Jülich, <sup>3</sup>RWTH Aachen",
        date: "Tuesday, May 20, 2025",
        title: "From Kernels to Features: A Multi-Scale Adaptive Theory of Feature Learning",
        publications: [
            {
                title: "From Kernels to Features: A Multi-Scale Adaptive Theory of Feature Learning",
                authors: "Noa Rubin, Kirsten Fischer, Javed Lindner",
                year: "2025",
                url: "https://arxiv.org/html/2502.03210v1"
            }
        ]
    }
];

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

// Function to generate speaker HTML
function generateSpeakerHTML(speaker) {
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
    
    return `
        <div class="speaker-card past speaker-card-collapsed">
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
                    <a href=${speaker.recording} class="speaker-link">Watch Recording</a>
                    <a href=${speaker.slides} class="speaker-link">Download Slides</a>
                </div>
            </div>
        </div>
    `;
}

// Function to render speakers for current pagination settings
function renderSpeakers() {
    const speakerGrid = document.querySelector('.speaker-grid.chronological');
    const paginationContainer = speakerGrid.querySelector('.pagination-container');
    
    // Remove all existing speaker pages but keep pagination
    const existingPages = speakerGrid.querySelectorAll('.speakers-page');
    existingPages.forEach(page => page.remove());
    
    if (speakersPerPage >= allSpeakers.length) {
        // Show all speakers on one page
        totalPages = 1;
        const allSpeakersPage = document.createElement('div');
        allSpeakersPage.className = 'speakers-page active';
        allSpeakersPage.id = 'page-1';
        allSpeakersPage.innerHTML = allSpeakers.map(speaker => generateSpeakerHTML(speaker)).join('');
        
        speakerGrid.insertBefore(allSpeakersPage, paginationContainer);
        
        document.getElementById('paginationControls').style.display = 'none';
        document.getElementById('paginationInfo').style.display = 'none';
    } else {
        // Calculate total pages
        totalPages = Math.ceil(allSpeakers.length / speakersPerPage);
        
        // Generate pages
        for (let page = 1; page <= totalPages; page++) {
            const startIndex = (page - 1) * speakersPerPage;
            const endIndex = startIndex + speakersPerPage;
            const pageSpeakers = allSpeakers.slice(startIndex, endIndex);
            
            const pageElement = document.createElement('div');
            pageElement.className = `speakers-page ${page === 1 ? 'active' : ''}`;
            pageElement.id = `page-${page}`;
            pageElement.innerHTML = pageSpeakers.map(speaker => generateSpeakerHTML(speaker)).join('');
            
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

// Function to generate page buttons dynamically
function generatePageButtons() {
    const pageButtonsContainer = document.getElementById('pageButtons');
    let buttonsHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button class="pagination-button ${i === 1 ? 'active' : ''}" onclick="goToPage(${i})" id="page${i}Btn">${i}</button>`;
    }
    
    pageButtonsContainer.innerHTML = buttonsHTML;
}

// Function to change items per page
function changePerPage() {
    const selectElement = document.getElementById('perPageSelect');
    const selectedValue = parseInt(selectElement.value);
    
    if (selectedValue === 6) {
        speakersPerPage = allSpeakers.length; // Show all
    } else {
        speakersPerPage = selectedValue;
    }
    
    renderSpeakers();
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
    const currentPageBtn = document.getElementById(`page${currentPage}Btn`);
    if (currentPageElement) currentPageElement.classList.remove('active');
    if (currentPageBtn) currentPageBtn.classList.remove('active');
    
    // Show new page
    currentPage = pageNumber;
    const newPageElement = document.getElementById(`page-${currentPage}`);
    const newPageBtn = document.getElementById(`page${currentPage}Btn`);
    if (newPageElement) newPageElement.classList.add('active');
    if (newPageBtn) newPageBtn.classList.add('active');
    
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
    renderSpeakers(); // This will properly set up pagination based on the default speakersPerPage value
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
