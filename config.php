<?php
/**
 * Patrick Cinema TV - Configuration File
 * STK Push Payment Settings
 */

// Database Configuration (if needed later)
define('DB_HOST', 'localhost');
define('DB_NAME', 'patrick_cinema');
define('DB_USER', 'root');
define('DB_PASS', '');

// M-PESA STK Push Configuration
define('MPESA_CONSUMER_KEY', 'cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW');
define('MPESA_CONSUMER_SECRET', 'your_consumer_secret_here');
define('MPESA_BUSINESS_SHORT_CODE', '174379');
define('MPESA_PASSKEY', 'bfb279c956564e3556d0518e0ad987c6563');
define('MPESA_CALLBACK_URL', 'https://your-website.com/callback');

// Environment Settings
define('ENVIRONMENT', 'development'); // 'development' or 'production'

// API Endpoints
if (ENVIRONMENT === 'production') {
    define('MPESA_OAUTH_URL', 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
    define('MPESA_STK_PUSH_URL', 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest');
} else {
    define('MPESA_OAUTH_URL', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
    define('MPESA_STK_PUSH_URL', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest');
}

// Security Settings
define('ALLOWED_ORIGINS', '*'); // In production, set to your domain
define('API_TIMEOUT', 30);

// Logging
define('LOG_ERRORS', true);
define('LOG_FILE', 'mpesa_errors.log');

// Payment Settings
define('MIN_AMOUNT', 1);
define('MAX_AMOUNT', 50000);
define('DEFAULT_AMOUNT', 100);

// Transaction Types
define('TRANSACTION_TYPE', 'CustomerPayBillOnline');
define('ACCOUNT_REFERENCE', 'PATRICKCINEMATV');
define('TRANSACTION_DESC', 'Payment for Premium Content');

// Response Codes
define('SUCCESS_CODE', 0);
define('ERROR_CODE', 1);

?>
