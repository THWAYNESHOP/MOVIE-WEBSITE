# Patrick Cinema TV (Prototype)

A Netflix‑style streaming front end built for Kenyan series and films. This is a **static** template intended for demonstration and further development.

## Features implemented

- Dark theme with red accents
- Header with logo, navigation, search bar, pay/upgrade buttons
- Sidebar with minimal icon menu
- Hero carousel with featured banners and play buttons
- Multiple horizontal scrolling content rows (Continue Watching, Soaps, TV Shows, Live, Trending Now, Skoolflix, Drama, Suggested For You)
- Movie cards with HD badge, age rating, progress bar, hover zoom, quick‑play, add‑to‑list
- Responsive layout (desktop/mobile)
- Footer with brand description and useful links
- Video player page (`video.html`)
- Authentication placeholders (`login.html`, `signup.html`)

## Getting started

1. Place your poster images in the workspace (e.g. `hero1.jpg`, `hero2.jpg`, `placeholder.jpg`).
2. Open `index.html` in a browser. It works locally without a server.
3. Clicking any card navigates to `video.html`, where you can replace `sample.mp4` with a real video.
4. Add backend/server code to handle login, uploads, payments, etc. (not included).

## To Do / Optional enhancements

- Implement a backend (Node, PHP, Python, etc.) for user accounts and file storage
- Integrate payment APIs for `Pay`/`Upgrade` buttons
- Add search functionality, watchlist logic
- Replace placeholder images and videos with real content
- Add live streaming support
- Improve accessibility and performance

## Backend proxy for chatbot

To enable the Help chatbot to "understand everything" you'll need a small server that
forwards messages to OpenAI (this also keeps your API key secret).

### Quick setup (Node.js)

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create `.env`** in the workspace root containing your key:
   ```
   OPENAI_API_KEY=sk-...your-key...
   ```
3. **Start the server**
   ```bash
   npm run dev   # uses nodemon for live reload
   # or
   npm start
   ```
4. In `script.js`, the chatbot now POSTs to `/api/chat`.
   For the browser to allow the request, the page must be loaded from the same
   origin (e.g. `http://localhost:3000`).  The easiest way is to start the
   proxy server and then browse to `http://localhost:3000/index.html`.
   Opening the file directly (`file://`) will trigger CORS/network errors and
   the AI request will fail.

> **Caution:** never publish your key in client JavaScript for production. Instead
> keep it in `.env` or another secure store and always proxy via a server.

## Notes

`patoh.html` is currently empty and can be deleted.

Enjoy building out Patrick Cinema TV! 🎥
