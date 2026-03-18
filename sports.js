// Sports M3U Playlist functionality
const sportsCard = document.querySelector('.movie-card img[alt="Sports"]');
if (sportsCard) {
    sportsCard.addEventListener('click', () => {
        const sportsEpisodesPanel = document.querySelector('.channels-list');
        const sportsVideoPlayer = document.querySelector('.video-player');
        
        // M3U Playlist data
        const m3uPlaylist = `#EXTM3U
#EXTINF:-1 ,Setanta Qazaqstan
https://bkm.beetv.kz/btv/live/hls/000002649.m3u8
#EXTINF:-1 ,Setanta Qazaqstan HD KZ
https://bkm.beetv.kz/btv/live/hls/000004619.m3u8`;

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
            // Extract channel name from simplified format
            const parts = line.split(',');
            const channelName = parts[parts.length - 1].trim();
            
            currentChannel = {
                name: channelName || 'Unknown',
                logo: 'sports.jpg', // Default logo
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
        </div>
        <button class="back-btn">← Back</button>
    `;
    
    setTimeout(() => {
        // Check if it's an HLS stream
        const isHLS = url.includes('.m3u8') || url.includes('index.m3u8');
        
        playerContainer.innerHTML = `
            <div class="video-wrapper">
                <video class="sports-video" controls preload="auto" style="width: 100%; height: 500px;" crossorigin="anonymous">
                    ${isHLS ? 
                        `<source src="${url}" type="application/vnd.apple.mpegurl">` :
                        `<source src="${url}" type="video/mp4">`
                    }
                    Your browser does not support video tag.
                </video>
            </div>
            <button class="back-btn">← Back</button>
            <div class="video-controls">
                <button class="fullscreen-btn">⛶ Fullscreen</button>
                <button class="quality-btn">⚙ Quality</button>
                <div class="stream-info">
                    <small>Stream: ${url.substring(0, 50)}...</small>
                </div>
            </div>
        `;
        
        const video = playerContainer.querySelector('.sports-video');
        if (video) {
            // Add HLS.js support for HLS streams
            if (isHLS && typeof Hls !== 'undefined') {
                const hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90
                });
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    video.play();
                });
                hls.on(Hls.Events.ERROR, function(event, data) {
                    console.error('HLS Error:', data);
                    playerContainer.innerHTML = `
                        <div class="error-message">
                            <h3>Stream Error</h3>
                            <p>Unable to load stream: ${data.details}</p>
                            <p>Stream URL: ${url}</p>
                            <button class="retry-btn" onclick="playSportsStream('${url}', this.parentElement.parentElement)">Retry</button>
                        </div>
                        <button class="back-btn">← Back</button>
                    `;
                });
            } else {
                // Fallback to native HLS support
                video.addEventListener('loadstart', () => {
                    console.log('Loading stream:', url);
                });
                
                video.addEventListener('error', (e) => {
                    console.error('Video error:', e);
                    playerContainer.innerHTML = `
                        <div class="error-message">
                            <h3>Stream Error</h3>
                            <p>Unable to load stream. This might be due to:</p>
                            <ul>
                                <li>CORS restrictions</li>
                                <li>Stream not available</li>
                                <li>Network issues</li>
                                <li>Browser not supporting HLS</li>
                            </ul>
                            <p>Stream URL: ${url}</p>
                            <button class="retry-btn" onclick="playSportsStream('${url}', this.parentElement.parentElement)">Retry</button>
                        </div>
                        <button class="back-btn">← Back</button>
                    `;
                });
                
                video.play().catch(error => {
                    console.error('Play error:', error);
                });
            }
            
            // Add fullscreen functionality
            const fullscreenBtn = playerContainer.querySelector('.fullscreen-btn');
            if (fullscreenBtn) {
                fullscreenBtn.addEventListener('click', () => {
                    if (video.requestFullscreen) {
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
