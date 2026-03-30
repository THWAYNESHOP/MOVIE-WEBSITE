# Patrick Cinema TV

## Professional Streaming Platform with PHP STK Push Payment

A Netflix-style streaming platform for Kenyan series and films with integrated M-PESA payment system using PHP.

### Features
- **Professional Video Player** with fullscreen, speed control
- **YouTube URL Support** for large videos
- **Modern UI** with dark theme
- **Mobile Responsive** design
- **Admin Panel** for content management
- **🔐 STK Push Payment** with M-PESA integration
- **💳 Multiple Payment Methods** (M-PESA, Airtel Money, T-Kash)
- **🐘 PHP Backend** - No Node.js required

### Live Demo
**Your Site:** [https://thwayneshop.github.io/MOVIE-WEBSITE/](https://thwayneshop.github.io/MOVIE-WEBSITE/)

**Admin Panel:** [https://thwayneshop.github.io/MOVIE-WEBSITE/admin.html](https://thwayneshop.github.io/MOVIE-WEBSITE/admin.html)

### 🚀 PHP Payment System Setup

#### Prerequisites
1. **PHP Server** (XAMPP, WAMP, MAMP, or live web host)
   - PHP 7.4 or higher
   - cURL extension enabled
   - JSON extension enabled

2. **Web Server** (Apache recommended)
   - mod_rewrite enabled
   - .htaccess support

#### Quick Setup
1. **Upload files to your web server**
2. **Update configuration** in `config.php`:
   ```php
   define('MPESA_CONSUMER_SECRET', 'your_actual_consumer_secret');
   define('MPESA_CALLBACK_URL', 'https://your-domain.com/callback');
   ```

3. **Set file permissions** (if needed):
   ```bash
   chmod 644 config.php
   chmod 644 stkpush.php
   chmod 644 .htaccess
   ```

#### Test Your Setup
1. Visit: `http://your-domain.com/test.php`
2. Click "Check System Health"
3. Test STK Push with sample data

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
- **POST** `/stkpush.php` - Process STK Push payment
- **GET** `/stkpush.php?test=1` - Test payment system
- **GET** `/stkpush.php?health=1` - Server health check
- **POST** `/stkpush.php` - M-PESA callback handling

### File Structure
```
MOVIE_WEBSITE/
├── index.html              # Main website
├── admin.html              # Admin panel
├── stkpush.php             # STK Push API
├── config.php              # Configuration file
├── test.php                # Test interface
├── .htaccess               # URL rewriting & security
├── styles.css              # Styling
├── script.js               # Frontend JavaScript
└── README.md               # This file
```

### Technical Stack
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** PHP 7.4+
- **Payment:** M-PESA STK Push API
- **Server:** Apache with mod_rewrite
- **Database:** Optional (for transaction logging)
- **Deployment:** Any PHP web host

### 🔐 Security Features
- OAuth 2.0 authentication with M-PESA
- Base64 encoded security credentials
- Phone number validation
- CORS enabled for cross-origin requests
- Error handling and logging
- .htaccess security headers

### 🌍 Environment Modes

#### Development (Sandbox)
- Uses M-PESA sandbox environment
- Test payments without real money
- Callback URL: `http://localhost/callback`

#### Production (Live)
- Uses M-PESA live environment
- Real payments with actual money
- Update `MPESA_CALLBACK_URL` to your production URL

### 📊 Monitoring

#### Health Check
```bash
curl http://your-domain.com/stkpush.php?health=1
```

#### API Test
```bash
curl http://your-domain.com/stkpush.php?test=1
```

#### STK Push Test
```bash
curl -X POST http://your-domain.com/stkpush.php \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "phoneNumber": "254712345678",
    "accountReference": "PATRICKCINEMATV",
    "transactionDesc": "Payment for Premium Content"
  }'
```

### 🚨 Important Notes

1. **Consumer Secret**: You need to get your actual consumer secret from M-PESA
2. **Callback URL**: For production, use a publicly accessible HTTPS URL
3. **PHP Extensions**: Ensure cURL and JSON extensions are enabled
4. **File Permissions**: Set appropriate permissions on config files
5. **Error Logging**: Check `php_errors.log` for debugging

### 🎯 Your Configuration

- **Consumer Key**: `cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW`
- **Business Short Code**: `174379`
- **Passkey**: `bfb279c956564e3556d0518e0ad987c6563`
- **Environment**: Development (Sandbox)

---

**🎉 Your professional streaming platform with PHP payment system is ready!**

Just upload the files to any PHP web host and your payment system will work immediately!
