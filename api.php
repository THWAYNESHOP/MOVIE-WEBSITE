<?php
/**
 * Patrick Cinema TV - STK Push Payment API
 * PHP Backend for M-PESA Integration
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration
define('CONSUMER_KEY', 'cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW');
define('CONSUMER_SECRET', 'your_consumer_secret_here');
define('BUSINESS_SHORT_CODE', '174379');
define('PASSKEY', 'bfb279c956564e3556d0518e0ad987c6563');
define('CALLBACK_URL', 'https://your-callback-url.com/callback');

/**
 * Get OAuth Token from M-PESA
 */
function getOAuthToken() {
    $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    $credentials = base64_encode(CONSUMER_KEY . ':' . CONSUMER_SECRET);
    
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => [
            'Authorization: Basic ' . $credentials,
            'Content-Type: application/json'
        ],
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    
    if ($err) {
        throw new Exception('OAuth Token Error: ' . $err);
    }
    
    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

/**
 * Generate timestamp for STK Push
 */
function getTimestamp() {
    return date('YmdHis');
}

/**
 * Generate password for STK Push
 */
function getPassword() {
    $timestamp = getTimestamp();
    $passwordString = BUSINESS_SHORT_CODE . PASSKEY . $timestamp;
    return base64_encode($passwordString);
}

/**
 * Process STK Push Request
 */
function processSTKPush($amount, $phoneNumber, $accountReference = null, $transactionDesc = null) {
    try {
        // Validate inputs
        if (empty($amount) || empty($phoneNumber)) {
            throw new Exception('Amount and phone number are required');
        }
        
        if (!preg_match('/^254[0-9]{9}$/', $phoneNumber)) {
            throw new Exception('Invalid phone number format. Use 254XXXXXXXXX');
        }
        
        // Get OAuth token
        $accessToken = getOAuthToken();
        if (!$accessToken) {
            throw new Exception('Failed to get OAuth token');
        }
        
        // Prepare STK Push request
        $timestamp = getTimestamp();
        $password = getPassword();
        
        $stkPushRequest = [
            'BusinessShortCode' => BUSINESS_SHORT_CODE,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => 'CustomerPayBillOnline',
            'Amount' => $amount,
            'PartyA' => $phoneNumber,
            'PartyB' => BUSINESS_SHORT_CODE,
            'PhoneNumber' => $phoneNumber,
            'CallBackURL' => CALLBACK_URL,
            'AccountReference' => $accountReference ?: 'PATRICKCINEMATV',
            'TransactionDesc' => $transactionDesc ?: 'Payment for Premium Content'
        ];
        
        // Send STK Push request
        $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        $payload = json_encode($stkPushRequest);
        
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $accessToken,
                'Content-Type: application/json',
                'Content-Length: ' . strlen($payload)
            ],
        ]);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        
        if ($err) {
            throw new Exception('STK Push Error: ' . $err);
        }
        
        $responseData = json_decode($response, true);
        
        // Log the request and response for debugging
        error_log('STK Push Request: ' . $payload);
        error_log('STK Push Response: ' . $response);
        
        return [
            'success' => true,
            'message' => 'STK Push sent successfully',
            'data' => $responseData
        ];
        
    } catch (Exception $e) {
        error_log('STK Push Exception: ' . $e->getMessage());
        return [
            'success' => false,
            'message' => $e->getMessage(),
            'error' => $e->getMessage()
        ];
    }
}

/**
 * Handle API Requests
 */
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Parse URL path
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/MOVIE_WEBSITE', '', $path); // Remove directory if present

try {
    switch ($path) {
        case '/api/stkpush':
            if ($requestMethod === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                
                $amount = $input['amount'] ?? null;
                $phoneNumber = $input['phoneNumber'] ?? null;
                $accountReference = $input['accountReference'] ?? null;
                $transactionDesc = $input['transactionDesc'] ?? null;
                
                $result = processSTKPush($amount, $phoneNumber, $accountReference, $transactionDesc);
                echo json_encode($result);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/api/test':
            if ($requestMethod === 'GET') {
                echo json_encode([
                    'success' => true,
                    'message' => 'STK Push API is working',
                    'timestamp' => date('c'),
                    'config' => [
                        'consumerKey' => substr(CONSUMER_KEY, 0, 10) . '...',
                        'businessShortCode' => BUSINESS_SHORT_CODE,
                        'environment' => 'development'
                    ]
                ]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/health':
            if ($requestMethod === 'GET') {
                echo json_encode([
                    'status' => 'OK',
                    'timestamp' => date('c'),
                    'php_version' => PHP_VERSION,
                    'services' => [
                        'stkpush' => !empty(CONSUMER_KEY),
                        'curl' => function_exists('curl_version')
                    ]
                ]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/callback':
            if ($requestMethod === 'POST') {
                $callbackData = json_decode(file_get_contents('php://input'), true);
                
                // Log callback for debugging
                error_log('M-PESA Callback: ' . json_encode($callbackData));
                
                // Process callback data here
                // You can save to database, update user status, etc.
                
                echo json_encode([
                    'ResultCode' => 0,
                    'ResultDesc' => 'Callback received successfully'
                ]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error',
        'error' => $e->getMessage()
    ]);
}
?>
