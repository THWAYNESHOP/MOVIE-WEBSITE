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
const ayanaCards = document.querySelectorAll('.movie-card');
ayanaCards.forEach(ayanaCard => {
    const cardWrapper = ayanaCard.querySelector('.card-wrapper');
    const episodesPanel = ayanaCard.querySelector('.episodes-panel');
    const videoPlayer = ayanaCard.querySelector('.video-player');
    const episodeBtns = ayanaCard.querySelectorAll('.episode-btn');
    const backBtn = ayanaCard.querySelector('.back-btn');
    const episodesBackBtn = ayanaCard.querySelector('.episodes-back-btn');
    const video = ayanaCard.querySelector('.episode-video');

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

// Sports M3U Playlist functionality
const sportsCard = document.querySelector('.movie-card img[alt="Sports"]');
if (sportsCard) {
    sportsCard.addEventListener('click', () => {
        const sportsEpisodesPanel = document.querySelector('.channels-list');
        const sportsVideoPlayer = document.querySelector('.video-player');
        
        // M3U Playlist data
        const m3uPlaylist = `#EXTM3U url-tvg="http://epg.one/epg.xml; http://gabbarit.drm-play.com/epg_lite.xml.gz; http://epg.cdntv.online/lite.xml; http://epg.it999.ru/epg.xml.gz; http://iptv-content.rv77.pw/guide-lite.xml"
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/NEXO.png" group-title="NEXO",NEXO
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://rafail1982.uz/nexo2.mp4
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/NexoIPTV.png" group-title="NEXO",NexoIPTV
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://rafail1982.uz/NexoIPTV.mp4
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Setanta Sports 1 HD.png" group-title="Спортивные",Setanta VIDEO
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
https://setantasports.com/wp-content/uploads/2025/08/VIDEO-FOR-SITE_1.mp4
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Setanta Sports 1 HD.png" group-title="Спортивные",Setanta Sports 1 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
https://vod.splay.uz/live_splay/original/Setanta1HD/tracks-v1a1/mono.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Setanta Sports 2 HD.png" group-title="Спортивные",Setanta Sports 2 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
https://vod.splay.uz/live_splay/original/Setanta2HD/tracks-v1a1/mono.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Setanta Sports 1 HD.png" group-title="Спортивные",Setanta Sports 1 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://s8.rafail1982.uz/1263/tracks-v1a1a1/mono.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Setanta Sports 2 HD.png" group-title="Спортивные",Setanta Sports 2 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://s8.rafail1982.uz/1264/tracks-v1a1a1/mono.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/sport2.png" group-title="Спортивные",СЕТАНТА+ UA
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://141.95.55.143/CH7609/index.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Megogo Футбол 1 HD.png" group-title="Спортивные",Megogo Футбол 1 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://22fdd620.kazaktelekom.com/iptv/8KSD5KFDXA6H88/31483/index.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Megogo Футбол 2 HD.png" group-title="Спортивные",Megogo Футбол 2 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://22fdd620.kazaktelekom.com/iptv/8KSD5KFDXA6H88/31505/index.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Megogo Футбол 3 HD.png" group-title="Спортивные",Megogo Футбол 3 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://22fdd620.kazaktelekom.com/iptv/8KSD5KFDXA6H88/31504/index.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Megogo Футбол 4 HD.png" group-title="Спортивные",Megogo Футбол 4 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://22fdd620.kazaktelekom.com/iptv/8KSD5KFDXA6H88/31613/index.m3u8
#EXTINF:-1 tvg-logo="http://rafail1982.uz/logo/Megogo Футбол 5 HD.png" group-title="Спортивные",Megogo Футбол 5 HD
#EXTVLCOPT:http-user-agent=Dalvik/2.1.0
http://22fdd620.kazaktelekom.com/iptv/8KSD5KFDXA6H88/31614/index.m3u8`;

        // Parse M3U and create channel buttons
        const channels = parseM3U(m3uPlaylist);
        
        // Display channels
        sportsEpisodesPanel.innerHTML = channels.map(channel => `
            <button class="channel-btn" data-url="${channel.url}">
                <img src="${channel.logo}" alt="${channel.name}" class="channel-logo">
                <span class="channel-name">${channel.name}</span>
            </button>
        `).join('');
        
        // Add click handlers for channels
        const channelBtns = sportsEpisodesPanel.querySelectorAll('.channel-btn');
        channelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-url');
                playSportsStream(url, sportsVideoPlayer);
            });
        });
        
        // Show episodes panel
        sportsEpisodesPanel.parentElement.style.display = 'block';
        sportsEpisodesPanel.parentElement.parentElement.querySelector('.movie-card img').style.display = 'none';
    });
}

// Parse M3U playlist
function parseM3U(m3uData) {
    const lines = m3uData.split('\n');
    const channels = [];
    let currentChannel = null;
    
    for (const line of lines) {
        if (line.startsWith('#EXTINF:')) {
            const info = line.split(',');
            const nameMatch = line.match(/group-title="([^"]*)"/);
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            
            currentChannel = {
                name: nameMatch ? nameMatch[1] : 'Unknown',
                logo: logoMatch ? logoMatch[1] : '',
                url: ''
            };
        } else if (line.startsWith('http') && currentChannel) {
            currentChannel.url = line.trim();
            channels.push(currentChannel);
            currentChannel = null;
        }
    }
    
    return channels;
}

// Play sports stream
function playSportsStream(url, playerContainer) {
    playerContainer.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading sports stream...</p>
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) {
                        video.msRequestFullscreen();
                    }
                });
            }
        }
        
        // Add back button functionality
        const backBtn = playerContainer.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                playerContainer.style.display = 'none';
                playerContainer.previousElementSibling.style.display = 'block';
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }
    }, 1000);
}
