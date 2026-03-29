// Patrick Cinema TV Server with OpenAI Chat and STK Push Payment
// run with: node server.js
// make sure to set OPENAI_API_KEY and STK Push credentials in your environment

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import cors from 'cors';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// serve all static files (HTML, CSS, JS, media) from the workspace root
app.use(express.static(path.join(process.cwd())));

// STK Push Payment Configuration
const CONSUMER_KEY = process.env.CONSUMER_KEY || 'cwAwAnuu8MCAiaIsGi7qC4zxK98LZdd2nKZScMVvq0L0PaqW';
const CONSUMER_SECRET = process.env.CONSUMER_SECRET || 'your_consumer_secret_here';
const BUSINESS_SHORT_CODE = process.env.BUSINESS_SHORT_CODE || '174379';
const PASSKEY = process.env.PASSKEY || 'bfb279c956564e3556d0518e0ad987c6563';
const CALLBACK_URL = process.env.CALLBACK_URL || 'https://your-callback-url.com/callback';

// OpenAI Chat endpoint (existing functionality)
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'missing message' });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).send(text);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('proxy error', err);
        res.status(500).json({ error: 'server error' });
    }
});

// Generate OAuth Token for STK Push
async function getOAuthToken() {
    try {
        const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
        
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting OAuth token:', error.response?.data || error.message);
        throw error;
    }
}

// Generate timestamp for STK Push
function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hour}${minute}${second}`;
}

// Generate password for STK Push
function getPassword() {
    const timestamp = getTimestamp();
    const passwordString = `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`;
    return Buffer.from(passwordString).toString('base64');
}

// STK Push API endpoint
app.post('/api/stkpush', async (req, res) => {
    try {
        const { amount, phoneNumber, accountReference, transactionDesc } = req.body;
        
        // Validation
        if (!amount || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Amount and phone number are required'
            });
        }
        
        if (!phoneNumber.match(/^254[0-9]{9}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format. Use 254XXXXXXXXX'
            });
        }
        
        // Get OAuth token
        const accessToken = await getOAuthToken();
        
        // Prepare STK Push request
        const timestamp = getTimestamp();
        const password = getPassword();
        
        const stkPushRequest = {
            BusinessShortCode: BUSINESS_SHORT_CODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: BUSINESS_SHORT_CODE,
            PhoneNumber: phoneNumber,
            CallBackURL: CALLBACK_URL,
            AccountReference: accountReference || 'PATRICKCINEMATV',
            TransactionDesc: transactionDesc || 'Payment for Premium Content'
        };
        
        // Send STK Push request
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkPushRequest,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Success response
        res.json({
            success: true,
            message: 'STK Push sent successfully',
            data: response.data
        });
        
    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to process STK Push',
            error: error.response?.data || error.message
        });
    }
});

// Callback endpoint for M-PESA
app.post('/callback', (req, res) => {
    try {
        const callbackData = req.body;
        
        console.log('M-PESA Callback:', callbackData);
        
        // Process callback data here
        // You can save to database, update user status, etc.
        
        res.status(200).json({
            ResultCode: 0,
            ResultDesc: 'Callback received successfully'
        });
        
    } catch (error) {
        console.error('Callback Error:', error);
        res.status(500).json({
            ResultCode: 1,
            ResultDesc: 'Callback processing failed'
        });
    }
});

// Test endpoint for STK Push
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'STK Push API is working',
        timestamp: new Date().toISOString(),
        config: {
            consumerKey: CONSUMER_KEY.substring(0, 10) + '...',
            businessShortCode: BUSINESS_SHORT_CODE,
            environment: process.env.NODE_ENV || 'development'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
            openai: !!process.env.OPENAI_API_KEY,
            stkpush: !!CONSUMER_KEY
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Patrick Cinema TV Server listening on ${port}`);
    console.log(`📱 STK Push Test: http://localhost:${port}/api/test`);
    console.log(`💳 STK Push Endpoint: http://localhost:${port}/api/stkpush`);
    console.log(`🔗 Callback URL: http://localhost:${port}/callback`);
    console.log(`🤖 OpenAI Chat: http://localhost:${port}/api/chat`);
});