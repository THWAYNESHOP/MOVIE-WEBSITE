<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP STK Push Test - Patrick Cinema TV</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
        }
        .test-container {
            background: #2a2a2a;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .test-button {
            background: #e50914;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
        }
        .test-button:hover {
            background: #b20710;
        }
        .result {
            background: #333;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            white-space: pre-wrap;
            font-family: monospace;
        }
        .success { border-left: 4px solid #4caf50; }
        .error { border-left: 4px solid #f44336; }
        .info { border-left: 4px solid #2196f3; }
    </style>
</head>
<body>
    <h1>🧪 PHP STK Push Payment Test</h1>
    <p>Test your Patrick Cinema TV payment system</p>

    <div class="test-container">
        <h2>🔧 System Check</h2>
        <button class="test-button" onclick="testHealth()">Check System Health</button>
        <div id="health-result" class="result"></div>
    </div>

    <div class="test-container">
        <h2>📱 STK Push Test</h2>
        <input type="number" id="test-amount" placeholder="Amount (KES)" value="100" style="padding: 10px; margin: 5px; border-radius: 5px; border: 1px solid #555; background: #333; color: #fff;">
        <input type="tel" id="test-phone" placeholder="254XXXXXXXXX" value="254712345678" style="padding: 10px; margin: 5px; border-radius: 5px; border: 1px solid #555; background: #333; color: #fff;">
        <br>
        <button class="test-button" onclick="testSTKPush()">Test STK Push</button>
        <div id="stkpush-result" class="result"></div>
    </div>

    <div class="test-container">
        <h2>🔗 API Test</h2>
        <button class="test-button" onclick="testAPI()">Test API Endpoint</button>
        <div id="api-result" class="result"></div>
    </div>

    <script>
        async function testHealth() {
            const resultDiv = document.getElementById('health-result');
            resultDiv.innerHTML = 'Testing...';
            resultDiv.className = 'result info';

            try {
                const response = await fetch('stkpush.php?health=1', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                const data = await response.json();
                resultDiv.innerHTML = '✅ Health Check Result:\n\n' + JSON.stringify(data, null, 2);
                resultDiv.className = 'result success';
            } catch (error) {
                resultDiv.innerHTML = '❌ Health Check Failed:\n\n' + error.message;
                resultDiv.className = 'result error';
            }
        }

        async function testAPI() {
            const resultDiv = document.getElementById('api-result');
            resultDiv.innerHTML = 'Testing...';
            resultDiv.className = 'result info';

            try {
                const response = await fetch('stkpush.php?test=1', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                const data = await response.json();
                resultDiv.innerHTML = '✅ API Test Result:\n\n' + JSON.stringify(data, null, 2);
                resultDiv.className = 'result success';
            } catch (error) {
                resultDiv.innerHTML = '❌ API Test Failed:\n\n' + error.message;
                resultDiv.className = 'result error';
            }
        }

        async function testSTKPush() {
            const resultDiv = document.getElementById('stkpush-result');
            const amount = document.getElementById('test-amount').value;
            const phoneNumber = document.getElementById('test-phone').value;

            if (!amount || !phoneNumber) {
                resultDiv.innerHTML = '❌ Please enter both amount and phone number';
                resultDiv.className = 'result error';
                return;
            }

            resultDiv.innerHTML = 'Processing STK Push...';
            resultDiv.className = 'result info';

            try {
                const response = await fetch('stkpush.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: amount,
                        phoneNumber: phoneNumber,
                        accountReference: 'TEST_PAYMENT',
                        transactionDesc: 'Test Payment for Patrick Cinema TV'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '✅ STK Push Test Result:\n\n' + JSON.stringify(data, null, 2);
                    resultDiv.className = 'result success';
                } else {
                    resultDiv.innerHTML = '❌ STK Push Failed:\n\n' + JSON.stringify(data, null, 2);
                    resultDiv.className = 'result error';
                }
            } catch (error) {
                resultDiv.innerHTML = '❌ STK Push Error:\n\n' + error.message;
                resultDiv.className = 'result error';
            }
        }

        // Auto-run health check on page load
        window.onload = function() {
            testHealth();
        };
    </script>
</body>
</html>
