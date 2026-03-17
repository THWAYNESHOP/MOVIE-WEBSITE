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
    }

    // episode button click to play video
    episodeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-video');
            video.src = src;
            episodesPanel.style.display = 'none';
            videoPlayer.style.display = 'block';
            video.play();
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
