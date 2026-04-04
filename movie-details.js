// Movie Database with metadata
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
            { id: 4, title: 'Episode 2: Ayana Friday 6th Part 2', video: 'ayana_friday_6th_part_2.mp4', type: 'local' },
            { id: 5, title: 'Ayana Monday 13th Part 1', video: 'https://www.youtube.com/embed/N4xlQNO_mCc?autoplay=1', type: 'youtube' }
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
            { id: 1, title: 'Qutu - Full Episode', video: 'https://www.youtube.com/embed/UhtUujOfCl8?autoplay=1', type: 'youtube' }
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
            { id: 1, title: 'Episode 1', video: 'https://www.youtube.com/embed/placeholder?autoplay=1', type: 'youtube' }
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
    // Add more movies as needed
};

// Helper function to check subscription
function isSubscribed() {
    const exp = localStorage.getItem('subscriptionExpiry');
    if (!exp) return false;
    const expiry = new Date(exp);
    return new Date() < expiry;
}

function requireSubscription(action) {
    if (isSubscribed()) {
        action();
    } else {
        alert('You need to pay before watching.');
        window.location.href = 'index.html';
    }
}

// Load movie details from URL parameter
function loadMovieDetails() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movie');

    if (!movieId || !movieDatabase[movieId]) {
        document.querySelector('.details-page').innerHTML = '<p style="color: #f00; padding: 2rem;">Movie not found.</p>';
        return;
    }

    const movie = movieDatabase[movieId];
    displayMovieDetails(movie);
}

function displayMovieDetails(movie) {
    // Set hero background
    const heroBg = document.getElementById('heroBg');
    heroBg.style.backgroundImage = `url('${movie.banner}')`;

    // Set basic info
    document.getElementById('poster').src = movie.poster;
    document.getElementById('poster').alt = movie.title;
    document.getElementById('title').textContent = movie.title;
    document.getElementById('year').textContent = movie.year;
    document.getElementById('rating').textContent = `⭐ ${movie.rating}`;
    document.getElementById('source').textContent = `📺 ${movie.source}`;
    document.getElementById('description').textContent = movie.description;

    // Set trailer button
    document.getElementById('watchTrailerBtn').addEventListener('click', () => {
        openTrailerModal(movie);
    });

    // Render episodes grid
    renderEpisodesGrid(movie);
}

function openTrailerModal(movie) {
    const modal = document.getElementById('trailerModal');
    const container = document.getElementById('trailerContainer');
    
    if (movie.trailerUrl.includes('vimeo.com')) {
        const match = movie.trailerUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        const vimeoId = match ? match[1] : null;
        if (vimeoId) {
            const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
            container.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
    } else {
        container.innerHTML = `<iframe src="${movie.trailerUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    
    modal.style.display = 'flex';
}

function closeTrailerModal() {
    const modal = document.getElementById('trailerModal');
    const container = document.getElementById('trailerContainer');
    container.innerHTML = '';
    modal.style.display = 'none';
}

function renderEpisodesGrid(movie) {
    const grid = document.getElementById('episodesGrid');
    grid.innerHTML = '';

    movie.episodes.forEach(episode => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.innerHTML = `
            <div class="episode-thumbnail">
                <img src="${movie.poster}" alt="${episode.title}">
                <div class="play-overlay">▶</div>
            </div>
            <div class="episode-info">
                <h4>${episode.title}</h4>
            </div>
        `;

        card.addEventListener('click', () => {
            playEpisode(episode);
        });

        grid.appendChild(card);
    });
}

function playEpisode(episode) {
    const modal = document.getElementById('trailerModal');
    const container = document.getElementById('trailerContainer');
    
    if (episode.type === 'youtube') {
        let videoId = '';
        if (episode.video.includes('youtube.com/embed/')) {
            videoId = episode.video.split('youtube.com/embed/')[1].split('?')[0];
        } else if (episode.video.includes('youtu.be/')) {
            videoId = episode.video.split('youtu.be/')[1].split('?')[0];
        } else if (episode.video.includes('youtube.com/watch?v=')) {
            videoId = episode.video.split('v=')[1].split('&')[0];
        }
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        container.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (episode.type === 'vimeo') {
        const match = episode.video.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        const vimeoId = match ? match[1] : null;
        if (vimeoId) {
            const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
            container.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
    } else if (episode.type === 'telegram') {
        container.innerHTML = `
            <iframe 
                src="${episode.video}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                style="width: 100%; height: 500px;">
            </iframe>
        `;
    } else if (episode.type === 'local') {
        container.innerHTML = `
            <video controls style="width: 100%; height: 100%; border-radius: 8px;">
                <source src="${episode.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
    
    modal.style.display = 'flex';
}

// Close trailer modal
document.getElementById('trailerClose').addEventListener('click', closeTrailerModal);
document.getElementById('trailerModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('trailerModal')) {
        closeTrailerModal();
    }
});

// Sidebar navigation
document.querySelectorAll('.sidebar li').forEach((li, index) => {
    li.addEventListener('click', () => {
        if (index === 0) window.location.href = 'index.html';
        else if (index === 1) window.location.href = 'index.html#soaps';
        else if (index === 2) document.querySelector('.search input').focus();
    });
});

// Chatbot functionality (same as homepage)
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
        addMessage('AI request failed. Make sure the proxy server is running.', 'bot');
    });
});

// Load details when page loads
window.addEventListener('load', loadMovieDetails);
