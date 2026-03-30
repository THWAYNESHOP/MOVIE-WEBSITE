<?php
/**
 * Patrick Cinema TV - Simple STK Push API
 * Easy PHP Implementation
 */

// Load configuration
require_once 'config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGINS);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/**
 * Get OAuth Token from M-PESA
 */
function getOAuthToken() {
    $credentials = base64_encode(MPESA_CONSUMER_KEY . ':' . MPESA_CONSUMER_SECRET);
    
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => MPESA_OAUTH_URL,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => API_TIMEOUT,
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
    $passwordString = MPESA_BUSINESS_SHORT_CODE . MPESA_PASSKEY . $timestamp;
    return base64_encode($passwordString);
}

/**
 * Process STK Push Request
 */
function processSTKPush($amount, $phoneNumber, $accountReference = null, $transactionDesc = null) {
    try {
        // Validate inputs
        if (empty($amount) || $amount < MIN_AMOUNT || $amount > MAX_AMOUNT) {
            throw new Exception('Invalid amount. Must be between ' . MIN_AMOUNT . ' and ' . MAX_AMOUNT);
        }
        
        if (empty($phoneNumber) || !preg_match('/^254[0-9]{9}$/', $phoneNumber)) {
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
            'BusinessShortCode' => MPESA_BUSINESS_SHORT_CODE,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => TRANSACTION_TYPE,
            'Amount' => $amount,
            'PartyA' => $phoneNumber,
            'PartyB' => MPESA_BUSINESS_SHORT_CODE,
            'PhoneNumber' => $phoneNumber,
            'CallBackURL' => MPESA_CALLBACK_URL,
            'AccountReference' => $accountReference ?: ACCOUNT_REFERENCE,
            'TransactionDesc' => $transactionDesc ?: TRANSACTION_DESC
        ];
        
        // Send STK Push request
        $payload = json_encode($stkPushRequest);
        
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => MPESA_STK_PUSH_URL,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => API_TIMEOUT,
            CURLOPT_POST => true,
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
        if (LOG_ERRORS) {
            error_log('STK Push Request: ' . $payload);
            error_log('STK Push Response: ' . $response);
        }
        
        return [
            'success' => true,
            'message' => 'STK Push sent successfully',
            'data' => $responseData
        ];
        
    } catch (Exception $e) {
        if (LOG_ERRORS) {
            error_log('STK Push Exception: ' . $e->getMessage());
        }
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

try {
    switch ($path) {
        case '/api/stkpush':
        case '/MOVIE_WEBSITE/api/stkpush':
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
        case '/MOVIE_WEBSITE/api/test':
            if ($requestMethod === 'GET') {
                echo json_encode([
                    'success' => true,
                    'message' => 'STK Push API is working',
                    'timestamp' => date('c'),
                    'config' => [
                        'consumerKey' => substr(MPESA_CONSUMER_KEY, 0, 10) . '...',
                        'businessShortCode' => MPESA_BUSINESS_SHORT_CODE,
                        'environment' => ENVIRONMENT,
                        'php_version' => PHP_VERSION
                    ]
                ]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/health':
        case '/MOVIE_WEBSITE/health':
            if ($requestMethod === 'GET') {
                echo json_encode([
                    'status' => 'OK',
                    'timestamp' => date('c'),
                    'php_version' => PHP_VERSION,
                    'services' => [
                        'stkpush' => !empty(MPESA_CONSUMER_KEY),
                        'curl' => function_exists('curl_version'),
                        'config' => file_exists('config.php')
                    ]
                ]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/callback':
        case '/MOVIE_WEBSITE/callback':
            if ($requestMethod === 'POST') {
                $callbackData = json_decode(file_get_contents('php://input'), true);
                
                // Log callback for debugging
                if (LOG_ERRORS) {
                    error_log('M-PESA Callback: ' . json_encode($callbackData));
                }
                
                // Process callback data here
                // You can save to database, update user status, etc.
                
                echo json_encode([
                    'ResultCode' => SUCCESS_CODE,
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
