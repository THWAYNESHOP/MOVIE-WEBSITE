// ================================================
// MOVIE DATABASE - Shared with details page
// ================================================
const movieDatabase = {
    lulu: {
        id: 'lulu',
        title: 'Lulu Tuesday 2nd March',
        poster: 'lulu.jpg',
        banner: 'lulu.jpg',
        year: '2024',
        rating: '8.5/10',
        source: 'Maisha Magic Plus',
        description: 'Lulu is a captivating drama series featuring intense storylines and compelling characters. Each episode brings new twists and exciting developments.',
        trailerUrl: 'https://www.youtube.com/embed/V_h0cwK0rro?autoplay=1',
        episodes: [
            { id: 1, title: 'Lulu 18th March', video: 'https://www.youtube.com/embed/A_r5r6ru6MY?autoplay=1', type: 'youtube' },
            { id: 2, title: 'Full Episode: Lulu Tuesday 2nd March', video: 'https://www.youtube.com/embed/V_h0cwK0rro?autoplay=1', type: 'youtube' },
            { id: 3, title: 'Lulu Vimeo (1179822781)', video: 'https://vimeo.com/1179822781?autoplay=1', type: 'vimeo' },
            { id: 4, title: 'Lulu Tuesday 31st March', video: 'https://vimeo.com/1179843142?autoplay=1', type: 'vimeo' },
            { id: 5, title: 'Lulu Wednesday 1st April', video: 'https://vimeo.com/1179847512?autoplay=1', type: 'vimeo' },
            { id: 6, title: 'Lulu 2nd April Thursday', video: 'https://www.youtube.com/embed/3JX06dEkfA0?autoplay=1', type: 'youtube' },
            { id: 7, title: 'Episode 1: Lulu Thursday', video: 'LULU THUR.mp4', type: 'local' },
            { id: 8, title: 'Telegram Updates: AYANA CITIZEN TV', video: 'https://t.me/AYANACITIZENTVDAILYUPDATES/321?embed=1&mode=tve', type: 'telegram' }
        ]
    },
    ayana: {
        id: 'ayana',
        title: 'Ayana',
        poster: 'ayana.jpg',
        banner: 'ayana.jpg',
        year: '2024',
        rating: '8.2/10',
        source: 'Citizen TV',
        description: 'Ayana is an exciting drama series with compelling narratives and unforgettable characters. Follow the journey as events unfold with unexpected twists.',
        trailerUrl: 'https://www.youtube.com/embed/UhtUujOfCl8?autoplay=1',
        episodes: [
            { id: 1, title: 'Ayana - Permanent Video', video: 'https://www.youtube.com/embed/UhtUujOfCl8?autoplay=1', type: 'youtube' },
            { id: 2, title: 'Full Movie: Ayana', video: 'https://www.youtube.com/embed/V89rkxV6Y-4?autoplay=1', type: 'youtube' },
            { id: 3, title: 'Episode 1: Ayana Friday 6th Part 1', video: 'ayana_friday_6th_part_1.mp4', type: 'local' },
            { id: 4, title: 'Episode 2: Ayana Friday 6th Part 2', video: 'ayana_friday_6th_part_2.mp4', type: 'local' }
        ]
    },
    qutu: {
        id: 'qutu',
        title: 'Qutu',
        poster: 'qutu.jpg',
        banner: 'qutu.jpg',
        year: '2024',
        rating: '7.8/10',
        source: 'Maisha Magic',
        description: 'Qutu is an engaging drama providing viewers with thrilling moments and captivating plot developments.',
        trailerUrl: 'https://www.youtube.com/embed/UhtUujOfCl8?autoplay=1',
        episodes: [
            { id: 1, title: 'Qutu Tuesday', video: 'https://www.youtube.com/embed/Mg3KGotVius', type: 'youtube' }
        ]
    },
    lazizi: {
        id: 'lazizi',
        title: 'Lazizi',
        poster: 'lazizi.jpg',
        banner: 'lazizi.jpg',
        year: '2024',
        rating: '7.5/10',
        source: 'Citizen TV',
        description: 'Lazizi brings entertaining storytelling with characters that audiences love to follow. A must-watch drama series.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Lazizi 3rd April Friday', video: 'https://www.youtube.com/embed/7yiAH831HQQ', type: 'youtube' }
        ]
    },
    'blood-and-water': {
        id: 'blood-and-water',
        title: 'Blood and Water',
        poster: 'blood and water.jpg',
        banner: 'blood and water.jpg',
        year: '2023',
        rating: '8.0/10',
        source: 'Netflix',
        description: 'A thrilling drama series with mystery, suspense, and unforgettable moments.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    'double-kara': {
        id: 'double-kara',
        title: 'Double Kara',
        poster: 'double kara.jpg',
        banner: 'double kara.jpg',
        year: '2023',
        rating: '7.9/10',
        source: 'Maisha Magic',
        description: 'An engaging romance and drama series with beautiful cinematography and compelling storylines.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    'once-again': {
        id: 'once-again',
        title: 'Once Again',
        poster: 'once again.jpg',
        banner: 'once again.jpg',
        year: '2023',
        rating: '8.1/10',
        source: 'Citizen TV',
        description: 'A heartwarming and emotionally powerful drama about second chances and life lessons.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    kbc: {
        id: 'kbc',
        title: 'KBC',
        poster: 'kbc.jpg',
        banner: 'kbc.jpg',
        year: '2024',
        rating: '8.3/10',
        source: 'Sony TV',
        description: 'The exciting quiz show everyone loves. Test your knowledge and compete for amazing prizes.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    citizen: {
        id: 'citizen',
        title: 'Citizen',
        poster: 'citizen.jpg',
        banner: 'citizen.jpg',
        year: '2024',
        rating: '8.4/10',
        source: 'Citizen TV',
        description: 'Breaking news and current events coverage from Citizen TV. Stay informed with the latest updates.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    ktn: {
        id: 'ktn',
        title: 'KTN',
        poster: 'ktn.jpg',
        banner: 'ktn.jpg',
        year: '2024',
        rating: '8.0/10',
        source: 'KTN',
        description: 'News and entertainment from KTN, bringing you the best content daily.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    },
    maisha: {
        id: 'maisha',
        title: 'Maisha',
        poster: 'maisha.jpg',
        banner: 'maisha.jpg',
        year: '2024',
        rating: '7.7/10',
        source: 'Maisha Magic',
        description: 'A drama series about life, love, and relationships. Experience compelling stories that resonate.',
        trailerUrl: 'https://www.youtube.com/embed/placeholder?autoplay=1',
        episodes: [
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
        ]
    }
};

// Helper function to get movie ID from various properties
function getMovieIdFromElement(element) {
    const card = element.closest('.movie-card') || element.closest('.card');
    if (!card) return null;
    
    const img = card.querySelector('img');
    if (!img) return null;
    
    const alt = img.alt.toLowerCase().trim();
    const title = card.querySelector('.title');
    const cardText = title ? title.textContent.toLowerCase().trim() : '';
    
    // Map various names to database IDs
    const nameMap = {
        'lulu': 'lulu',
        'ayana': 'ayana',
        'qutu': 'qutu',
        'lazizi': 'lazizi',
        'blood and water': 'blood-and-water',
        'double kara': 'double-kara',
        'once again': 'once-again',
        'kbc': 'kbc',
        'citizen': 'citizen',
        'ktn': 'ktn',
        'maisha': 'maisha'
    };
    
    // Check alt attribute and title
    for (const [name, id] of Object.entries(nameMap)) {
        if (alt.includes(name) || cardText.includes(name)) {
            return id;
        }
    }
    
    return null;
}

// Function to navigate to details page
function navigateToDetails(movieId) {
    if (movieId && movieDatabase[movieId]) {
        const subscriptionRequired = false; // Set to true if you want to require subscription
        if (subscriptionRequired && !isSubscribed()) {
            alert('You need to subscribe to view details.');
            promptSubscription();
            return;
        }
        window.location.href = `movie-details.html?movie=${movieId}`;
    }
}

// carousel controls
const slides = document.querySelectorAll('.hero-carousel .slide');
let currentSlide = 0;

// pay/upgrade button handler (simulate subscription)
const payBtn = document.querySelector('button.pay');
function promptSubscription() {
    const choice = prompt(
        'Choose a package:\n1) 1 week - 20 Bob\n2) 1 month - 50 Bob\n3) 1 year - 500 Bob',
        '1'
    );
    if (!choice) return;
    let days;
    switch(choice.trim()) {
        case '1': days = 7; break;
        case '2': days = 30; break;
        case '3': days = 365; break;
        default: alert('Invalid option'); return;
    }
    const now = new Date();
    const expiry = new Date(now.getTime() + days*24*60*60*1000);
    localStorage.setItem('subscriptionExpiry', expiry.toISOString());
    alert('Subscription active until ' + expiry.toLocaleString());
}
if (payBtn) {
    payBtn.addEventListener('click', () => {
        promptSubscription();
    });
}

// helper to check if user is subscribed
function isSubscribed() {
    const exp = localStorage.getItem('subscriptionExpiry');
    if (!exp) return false;
    const expiry = new Date(exp);
    return new Date() < expiry;
}

function updateSubscriptionUI() {
    const payBtn = document.querySelector('button.pay');
    if (isSubscribed()) {
        const expiry = new Date(localStorage.getItem('subscriptionExpiry'));
        if (payBtn) payBtn.textContent = 'Subscribed until ' + expiry.toLocaleDateString();
    }
}

// run once on load
updateSubscriptionUI();

// change play button behaviour to require subscription
function requireSubscription(action) {
    if (isSubscribed()) {
        action();
    } else {
        alert('You need to pay before watching.');
        promptSubscription();
    }
}

// chatbot logic
const helpBtn = document.querySelector('.help-btn');
const chatbot = document.getElementById('chatbot');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInputField = document.getElementById('chat-input-field');
const chatSend = document.getElementById('chat-send');

if (helpBtn) {
    helpBtn.addEventListener('click', () => {
        chatbot.style.display = 'flex';
        chatInputField.focus();
    });
}
if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatbot.style.display = 'none';
    });
}
function addMessage(text, sender='bot') {
    const el = document.createElement('div');
    el.textContent = text;
    el.className = sender;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
chatSend.addEventListener('click', () => {
    const msg = chatInputField.value.trim();
    if (!msg) return;
    addMessage(msg, 'user');
    chatInputField.value = '';

    // If you want the chatbot to "understand everything" you can
    // call a real language model such as OpenAI's ChatGPT. We
    // forward the message to our own server at `/api/chat` so the
    // API key never appears in browser code.
    addMessage('Thinking...', 'bot');
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(t => { throw new Error(res.status+': '+t); });
        }
        return res.json();
    })
    .then(data => {
        const text = data.choices && data.choices[0]?.message?.content;
        if (text) addMessage(text.trim(), 'bot');
        else addMessage('Oops, no response from AI service.', 'bot');
    })
    .catch(err => {
        console.error('AI request failed', err);
        addMessage('AI request failed. Make sure the proxy server is running and you opened the page via http://localhost:3000.', 'bot');
    });
});


// modify carousel play buttons
const playBtns = document.querySelectorAll('.hero-carousel .play-btn');
playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const slide = btn.closest('.slide');
        const videoSrc = slide ? slide.getAttribute('data-video') : null;
        
        requireSubscription(() => {
            if (videoSrc && videoSrc.includes('vimeo.com')) {
                // Extract Vimeo ID and show player
                const match = videoSrc.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                const vimeoId = match ? match[1] : null;
                if (vimeoId) {
                    showVimeoModal(vimeoId);
                    return;
                }
            }
            // Default: redirect to video.html
            window.location.href = 'video.html';
        });
    });
});

// Create and show Vimeo modal player for hero carousel
function showVimeoModal(vimeoId) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('vimeo-player-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'vimeo-player-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        document.body.appendChild(modal);
    }
    
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
    modal.innerHTML = `
        <div style="width: 90%; height: 90%; position: relative;">
            <button style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255,255,255,0.8);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 10001;
            " onclick="document.getElementById('vimeo-player-modal').style.display='none'">×</button>
            <iframe 
                src="${embedUrl}" 
                style="width: 100%; height: 100%; border: none; border-radius: 8px;"
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    modal.style.display = 'flex';
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

document.querySelector('.carousel-next').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});
document.querySelector('.carousel-prev').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// auto-advance every 5s
setInterval(() => goToSlide(currentSlide + 1), 5000);

// populate rows with placeholder cards
const sections = [
    'soaps','tv-shows','live','trending-now','skoolflix','drama','suggested'
];

sections.forEach(id => {
    const row = document.querySelector(`#${id} .row`);
    if (!row) return;
    for (let i = 1; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="placeholder.jpg" alt="Title ${i}">
            <div class="badge">HD</div>
            <div class="age">PG</div>
            <div class="progress" style="width:${Math.floor(Math.random()*100)}%"></div>
            <div class="quick-play">▶</div>
            <div class="add-list">+My List</div>
        `;
        card.addEventListener('click', () => {
            const movieId = getMovieIdFromElement(card);
            if (movieId) {
                navigateToDetails(movieId);
            } else {
                requireSubscription(() => {
                    window.location.href = 'video.html';
                });
            }
        });
        row.appendChild(card);
    }
});

// Toggle for all movie cards: navigate to details page
console.log('Initializing movie cards with details page navigation...');
const ayanaCards = document.querySelectorAll('.movie-card');
console.log('Found movie cards:', ayanaCards.length);
ayanaCards.forEach(ayanaCard => {
    const cardWrapper = ayanaCard.querySelector('.card-wrapper');
    const episodesPanel = ayanaCard.querySelector('.episodes-panel');
    const img = ayanaCard.querySelector('img');

    console.log('Card found - has episodes:', !!episodesPanel);

    // Click on card image navigates to details page
    if (img) {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = getMovieIdFromElement(ayanaCard);
            if (movieId) {
                navigateToDetails(movieId);
            }
        });
    }

    // If card wrapper exists and card has episodes panel, replace click behavior
    if (cardWrapper && episodesPanel) {
        cardWrapper.addEventListener('click', (e) => {
            const movieId = getMovieIdFromElement(ayanaCard);
            if (movieId) {
                e.preventDefault();
                e.stopPropagation();
                navigateToDetails(movieId);
            }
        });
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const allMovieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    allMovieCards.forEach(card => {
        const title = card.querySelector('.title');
        const img = card.querySelector('img');
        
        if (title && img) {
            const movieTitle = title.textContent.toLowerCase();
            const movieAlt = img.alt.toLowerCase();
            
            // Only hide cards if there's an actual search term
            if (searchTerm === '') {
                card.style.display = 'block';
            } else if (movieTitle.includes(searchTerm) || movieAlt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
});

// Add enter key support for search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const firstVisibleCard = document.querySelector('.movie-card:not([style*="display: none"])');
        if (firstVisibleCard) {
            firstVisibleCard.click();
        }
    }
});

// TMDB Trending Integration (NEW)
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // <--- Replace with your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function fetchTrendingMovies() {
    const grid = document.getElementById('tmdb-trending-grid');
    if (!grid) return;

    grid.innerHTML = '<p>Loading trending movies from TMDB...</p>';

    if (!TMDB_API_KEY || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
        grid.innerHTML = '<p style="color: #f7b500;">TMDB API key not set. Add it in <code>script.js</code>.</p>';
        return;
    }

    try {
        const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
        if (!response.ok) throw new Error('TMDB request failed: ' + response.status);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            grid.innerHTML = '<p>No trending movies found.</p>';
            return;
        }

        grid.innerHTML = '';

        data.results.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'tmdb-card';
            const posterPath = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : 'placeholder.jpg';
            card.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}" loading="lazy">
                <div class="tmdb-card-info">
                    <h4>${movie.title}</h4>
                    <span>⭐ ${movie.vote_average.toFixed(1)}</span>
                </div>
            `;

            card.addEventListener('click', () => {
                openTmdbModal(movie);
            });

            grid.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        grid.innerHTML = `<p style="color: #ff6666;">Failed to load TMDB trending content. ${error.message}</p>`;
    }
}

async function fetchMovieTrailer(movieId) {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return null;

    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`);
        if (!response.ok) return null;
        const data = await response.json();
        const trailer = data.results.find(v => v.site === 'YouTube' && v.type.toLowerCase().includes('trailer'));
        return trailer ? trailer.key : null;
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
}

async function openTmdbModal(movie) {
    const modal = document.getElementById('tmdbModal');
    const poster = document.getElementById('tmdbModalPoster');
    const title = document.getElementById('tmdbModalTitle');
    const overview = document.getElementById('tmdbModalOverview');
    const rating = document.getElementById('tmdbModalRating');
    const trailerContainer = document.getElementById('tmdbTrailerContainer');

    if (!modal || !poster || !title || !overview || !rating || !trailerContainer) return;

    poster.src = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : 'placeholder.jpg';
    poster.alt = movie.title;
    title.textContent = movie.title;
    overview.textContent = movie.overview || 'No overview available.';
    rating.textContent = `${movie.vote_average.toFixed(1)} / 10`;
    trailerContainer.innerHTML = '<p>Loading trailer...</p>';

    const trailerKey = await fetchMovieTrailer(movie.id);
    if (trailerKey) {
        trailerContainer.innerHTML = `
            <div class="tmdb-trailer-embed">
                <iframe src="https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    } else {
        trailerContainer.innerHTML = '<p>No official trailer found. Try another movie.</p>';
    }

    modal.classList.remove('hidden');
}

function closeTmdbModal() {
    const modal = document.getElementById('tmdbModal');
    if (!modal) return;
    const trailerIframe = modal.querySelector('iframe');
    if (trailerIframe) trailerIframe.src = '';
    modal.classList.add('hidden');
}

const closeBtn = document.getElementById('tmdbModalClose');
if (closeBtn) closeBtn.addEventListener('click', closeTmdbModal);

const tmdbRefresh = document.getElementById('tmdb-refresh');
if (tmdbRefresh) {
    tmdbRefresh.addEventListener('click', (event) => {
        event.preventDefault();
        fetchTrendingMovies();
    });
}

const tmdbModal = document.getElementById('tmdbModal');
if (tmdbModal) {
    tmdbModal.addEventListener('click', (event) => {
        if (event.target === tmdbModal) {
            closeTmdbModal();
        }
    });
}

fetchTrendingMovies();

// Lulu 18th March 24-hour auto-hide functionality
const lulu18thMarch = {    videoId: 'A_r5r6ru6MY',
    title: 'Lulu 18th March',
    addedTime: new Date().getTime(),
    duration: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

// Check if Lulu 18th March should be hidden
function checkLulu18thMarch() {
    const currentTime = new Date().getTime();
    if (currentTime - lulu18thMarch.addedTime > lulu18thMarch.duration) {
        // Hide the Lulu 18th March button
        const lulu18thMarchBtn = document.querySelector('[data-video*="A_r5r6ru6MY"]');
        if (lulu18thMarchBtn) {
            lulu18thMarchBtn.style.display = 'none';
        }
    }
}

// Run check every minute
setInterval(checkLulu18thMarch, 60000); // Check every 60 seconds

// STK Push Payment functionality
const stkPayBtn = document.getElementById('stkPayBtn');
const paymentModal = document.getElementById('paymentModal');
const paymentClose = document.getElementById('paymentClose');
const submitPayment = document.getElementById('submitPayment');
const paymentStatus = document.getElementById('paymentStatus');

// Your STK Push consumer key
const CONSUMER_KEY = 'cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW';

// Open payment modal
if (stkPayBtn) {
    stkPayBtn.addEventListener('click', () => {
        paymentModal.style.display = 'flex';
    });
}

// Close payment modal
if (paymentClose) {
    paymentClose.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        resetPaymentForm();
    });
}

// Close modal when clicking outside
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
        resetPaymentForm();
    }
});

// Submit payment
if (submitPayment) {
    submitPayment.addEventListener('click', processSTKPayment);
}

function processSTKPayment() {
    const amount = document.getElementById('paymentAmount').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validation
    if (!amount || amount < 1) {
        showPaymentStatus('Please enter a valid amount (minimum KES 1)', 'error');
        return;
    }
    
    if (!phoneNumber || !phoneNumber.match(/^254[0-9]{9}$/)) {
        showPaymentStatus('Please enter a valid phone number (254XXXXXXXXX)', 'error');
        return;
    }
    
    // Show processing status
    showPaymentStatus('Processing payment...', 'processing');
    submitPayment.disabled = true;
    
    // Prepare STK Push request
    const stkRequest = {
        BusinessShortCode: '174379',
        Password: 'bfb279c956564e3556d0518e0ad987c6563',
        Timestamp: getCurrentTimestamp(),
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://your-callback-url.com/callback',
        AccountReference: 'PATRICKCINEMATV',
        TransactionDesc: 'Payment for Premium Content'
    };
    
    // Generate security credential
    const securityCredential = generateSecurityCredential(stkRequest, CONSUMER_KEY);
    
    // Prepare the final request
    const requestData = {
        ...stkRequest,
        SecurityCredential: securityCredential
    };
    
    // Simulate STK Push API call (replace with actual API endpoint)
    simulateSTKPush(requestData);
}

function simulateSTKPush(requestData) {
    console.log('STK Push Request:', requestData);
    
    // Send real STK Push request to PHP backend
    fetch('stkpush.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: requestData.Amount,
            phoneNumber: requestData.PhoneNumber,
            accountReference: requestData.AccountReference,
            transactionDesc: requestData.TransactionDesc
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('STK Push Response:', data);
        
        if (data.success) {
            showPaymentStatus('✅ STK Push sent successfully! Please check your phone and enter your PIN.', 'success');
            
            // Auto-close modal after 5 seconds
            setTimeout(() => {
                paymentModal.style.display = 'none';
                resetPaymentForm();
            }, 5000);
        } else {
            showPaymentStatus('❌ Payment failed: ' + (data.message || 'Unknown error'), 'error');
            submitPayment.disabled = false;
        }
    })
    .catch(error => {
        console.error('STK Push Error:', error);
        showPaymentStatus('❌ Network error: Please check your connection and try again.', 'error');
        submitPayment.disabled = false;
    });
}

function generateSecurityCredential(request, consumerKey) {
    // This is a simplified version - in production, use proper encryption
    const concatenatedString = request.BusinessShortCode + request.Password + request.Timestamp + request.TransactionType + 
                          request.Amount + request.PartyA + request.PhoneNumber + request.CallBackURL + 
                          request.AccountReference + request.TransactionDesc;
    
    // In production, this should be properly encrypted using the consumer key
    return btoa(concatenatedString + consumerKey);
}

function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    return year + month + day + hour + minute + second;
}

function showPaymentStatus(message, type) {
    paymentStatus.textContent = message;
    paymentStatus.className = `payment-status ${type}`;
    paymentStatus.style.display = 'block';
}

function resetPaymentForm() {
    document.getElementById('paymentAmount').value = '100';
    document.getElementById('phoneNumber').value = '';
    document.querySelector('input[name="paymentMethod"][value="mpesa"]').checked = true;
    paymentStatus.style.display = 'none';
    submitPayment.disabled = false;
}
