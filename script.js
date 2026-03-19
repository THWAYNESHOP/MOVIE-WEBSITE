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
        requireSubscription(() => {
            window.location.href = 'video.html';
        });
    });
});

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
            requireSubscription(() => {
                window.location.href = 'video.html';
            });
        });
        row.appendChild(card);
    }
});

// toggle for all ayana cards: img <-> episodes <-> video player (Netflix style)
console.log('Initializing Ayana/Lulu cards...');
const ayanaCards = document.querySelectorAll('.movie-card');
console.log('Found movie cards:', ayanaCards.length);
ayanaCards.forEach(ayanaCard => {
    const cardWrapper = ayanaCard.querySelector('.card-wrapper');
    const episodesPanel = ayanaCard.querySelector('.episodes-panel');
    const videoPlayer = ayanaCard.querySelector('.video-player');
    const episodeBtns = ayanaCard.querySelectorAll('.episode-btn');
    const backBtn = ayanaCard.querySelector('.back-btn');
    const episodesBackBtn = ayanaCard.querySelector('.episodes-back-btn');
    const video = ayanaCard.querySelector('.episode-video');

    console.log('Card found - episodesPanel:', !!episodesPanel, 'episodeBtns:', episodeBtns.length);

    if (!episodesPanel) return; // skip if not a card with episodes

    // click on card image to open episodes
    if (cardWrapper) {
        cardWrapper.addEventListener('click', (e) => {
            if (cardWrapper.style.display !== 'none') {
                cardWrapper.style.display = 'none';
                episodesPanel.style.display = 'block';
            }
        });
        
        // Add direct click on poster image to play video
        const posterImg = cardWrapper.querySelector('img');
        if (posterImg) {
            posterImg.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Find the first YouTube video button and click it
                const firstYouTubeBtn = Array.from(episodeBtns).find(btn => 
                    btn.getAttribute('data-video').includes('youtu.be')
                );
                
                if (firstYouTubeBtn) {
                    firstYouTubeBtn.click();
                }
            });
        }
    }

    // episode button click to play video
    episodeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-video');
            const video = ayanaCard.querySelector('.episode-video');
            
            // Show loading state
            const playerContainer = ayanaCard.querySelector('.video-player');
            playerContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading video...</p>
                </div>
                <button class="back-btn">← Back</button>
            `;
            
            // Check if it's a YouTube URL
            if (src.includes('youtube.com/watch?v=') || src.includes('youtu.be/')) {
                // Convert YouTube URL to embed URL
                let videoId = '';
                if (src.includes('youtube.com/watch?v=')) {
                    videoId = src.split('v=')[1].split('&')[0];
                } else if (src.includes('youtu.be/')) {
                    videoId = src.split('youtu.be/')[1].split('?')[0];
                }
                
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                
                // Show loading state
                const playerContainer = ayanaCard.querySelector('.video-player');
                playerContainer.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Loading video...</p>
                    </div>
                    <button class="back-btn">← Back</button>
                `;
                
                // Create iframe for YouTube video
                setTimeout(() => {
                    playerContainer.innerHTML = `
                        <div class="video-wrapper">
                            <iframe class="video-iframe" 
                                    src="${embedUrl}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                        <button class="back-btn">← Back</button>
                        <div class="video-controls">
                            <button class="fullscreen-btn">⛶ Fullscreen</button>
                        </div>
                    `;
                    
                    // Add fullscreen functionality
                    const fullscreenBtn = playerContainer.querySelector('.fullscreen-btn');
                    if (fullscreenBtn) {
                        fullscreenBtn.addEventListener('click', () => {
                            const iframe = playerContainer.querySelector('.video-iframe');
                            if (iframe.requestFullscreen) {
                                iframe.requestFullscreen();
                            } else if (iframe.webkitRequestFullscreen) {
                                iframe.webkitRequestFullscreen();
                            } else if (iframe.msRequestFullscreen) {
                                iframe.msRequestFullscreen();
                            }
                        });
                    }
                    
                    // Re-attach back button event
                    const backBtn = playerContainer.querySelector('.back-btn');
                    if (backBtn) {
                        backBtn.addEventListener('click', () => {
                            videoPlayer.style.display = 'none';
                            episodesPanel.style.display = 'block';
                            if (newVideo) {
                                newVideo.pause();
                                newVideo.currentTime = 0;
                            }
                        });
                    }
                }, 1000);
            } else {
                // Handle local video files
                const newVideo = document.createElement('video');
                newVideo.className = 'episode-video';
                newVideo.poster = ayanaCard.querySelector('.card-wrapper img').src;
                newVideo.controls = true;
                newVideo.preload = 'auto';
                newVideo.src = src;
                
                // Show loading state
                const playerContainer = ayanaCard.querySelector('.video-player');
                playerContainer.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Loading video...</p>
                    </div>
                    <button class="back-btn">← Back</button>
                `;
                
                setTimeout(() => {
                    playerContainer.innerHTML = '';
                    playerContainer.appendChild(newVideo);
                    playerContainer.innerHTML += `
                        <button class="back-btn">← Back</button>
                        <div class="video-controls">
                            <button class="speed-btn">⚡ 1x</button>
                            <button class="fullscreen-btn">⛶ Fullscreen</button>
                        </div>
                    `;
                    
                    newVideo.play();
                    
                    // Add speed control
                    const speedBtn = playerContainer.querySelector('.speed-btn');
                    if (speedBtn) {
                        const speeds = [1, 1.25, 1.5, 2];
                        let currentSpeed = 1;
                        
                        speedBtn.addEventListener('click', () => {
                            const currentIndex = speeds.indexOf(currentSpeed);
                            const nextIndex = (currentIndex + 1) % speeds.length;
                            newVideo.playbackRate = speeds[nextIndex];
                            speedBtn.textContent = `⚡ ${speeds[nextIndex]}x`;
                        });
                    }
                    
                    // Add fullscreen functionality
                    const fullscreenBtn = playerContainer.querySelector('.fullscreen-btn');
                    if (fullscreenBtn) {
                        fullscreenBtn.addEventListener('click', () => {
                            if (newVideo.requestFullscreen) {
                                newVideo.requestFullscreen();
                            } else if (newVideo.webkitRequestFullscreen) {
                                newVideo.webkitRequestFullscreen();
                            } else if (newVideo.msRequestFullscreen) {
                                newVideo.msRequestFullscreen();
                            }
                        });
                    }
                    
                    // Re-attach back button event
                    const backBtn = playerContainer.querySelector('.back-btn');
                    if (backBtn) {
                        backBtn.addEventListener('click', () => {
                            videoPlayer.style.display = 'none';
                            episodesPanel.style.display = 'block';
                            if (newVideo) {
                                newVideo.pause();
                                newVideo.currentTime = 0;
                            }
                        });
                    }
                }, 1000);
            }
            
            episodesPanel.style.display = 'none';
            videoPlayer.style.display = 'block';
        });
    });

    // back button from video player to episodes
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            videoPlayer.style.display = 'none';
            episodesPanel.style.display = 'block';
            video.pause();
            video.currentTime = 0;
        });
    }

    // back button from episodes to card image
    if (episodesBackBtn) {
        episodesBackBtn.addEventListener('click', () => {
            episodesPanel.style.display = 'none';
            cardWrapper.style.display = 'block';
            video.pause();
            video.currentTime = 0;
        });
    }

    // optional: click outer video area to go back
    if (videoPlayer) {
        videoPlayer.addEventListener('click', (e) => {
            if (e.target === videoPlayer) {
                videoPlayer.style.display = 'none';
                episodesPanel.style.display = 'block';
                video.pause();
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

// Lulu 18th March 24-hour auto-hide functionality
const lulu18thMarch = {
    videoId: 'A_r5r6ru6MY',
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
