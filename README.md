# Patrick Cinema TV

## Professional Streaming Platform with STK Push Payment

A Netflix-style streaming platform for Kenyan series and films with integrated M-PESA payment system.

### Features
- **Professional Video Player** with fullscreen, speed control
- **YouTube URL Support** for large videos
- **Modern UI** with dark theme
- **Mobile Responsive** design
- **Admin Panel** for content management
- **🔐 STK Push Payment** with M-PESA integration
- **💳 Multiple Payment Methods** (M-PESA, Airtel Money, T-Kash)

### Live Demo
**Your Site:** [https://thwayneshop.github.io/MOVIE-WEBSITE/](https://thwayneshop.github.io/MOVIE-WEBSITE/)

**Admin Panel:** [https://thwayneshop.github.io/MOVIE-WEBSITE/admin.html](https://thwayneshop.github.io/MOVIE-WEBSITE/admin.html)

### 🚀 Payment System Setup

#### Prerequisites
1. **Install Node.js** (v16 or higher)
   ```bash
   # Verify installation
   node --version
   npm --version
   ```

2. **Install Dependencies**
   ```bash
   npm init -y
   npm install express axios dotenv cors body-parser node-fetch
   ```

#### Configuration
1. Copy `env.txt` to `.env`:
   ```bash
   # Windows
   copy env.txt .env
   # Mac/Linux
   cp env.txt .env
   ```

2. Update `.env` with your actual consumer secret

3. Start the server:
   ```bash
   npm start
   ```

#### Payment Features
- **Consumer Key**: `cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW`
- **Business Short Code**: `174379`
- **Real STK Push** integration
- **Phone validation** (254XXXXXXXXX format)
- **Multiple payment methods** support

### How to Use
1. **Visit Admin Panel** → Upload movies with YouTube URLs
2. **Browse Main Site** → Watch content with professional player
3. **Click Pay Button** → Enter amount and phone number
4. **Receive STK Push** → Enter PIN to complete payment
5. **Mobile Friendly** → Works on all devices

### API Endpoints
- **POST** `/api/stkpush` - Process STK Push payment
- **GET** `/api/test` - Test payment system
- **GET** `/health` - Server health check
- **POST** `/callback` - M-PESA callback handling

### Technical Stack
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **Payment:** M-PESA STK Push API
- **Storage:** Browser localStorage
- **Deployment:** GitHub Pages
- **Video:** HTML5 Video API + YouTube Embeds

### 🔐 Security Features
- OAuth 2.0 authentication with M-PESA
- Base64 encoded security credentials
- Phone number validation
- CORS enabled for cross-origin requests
- Error handling and logging

---

**🎉 Your professional streaming platform with payment system is ready!**
