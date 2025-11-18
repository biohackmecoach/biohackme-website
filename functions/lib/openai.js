"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOpenAI = exports.generateContent = void 0;
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
// OpenAI API endpoint - secure server-side implementation
exports.generateContent = (0, https_1.onRequest)({
    cors: true,
    region: 'us-central1'
}, async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try {
        const { prompt, options = {} } = req.body;
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }
        // Get OpenAI API key from environment (server-side only)
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            firebase_functions_1.logger.error('OpenAI API key not configured');
            res.status(500).json({ error: 'OpenAI API not configured' });
            return;
        }
        // Make request to OpenAI
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: options.model || 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an AI assistant helping with business and lead generation tasks. Provide accurate, helpful responses in the requested format.'
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 1500
            })
        });
        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            firebase_functions_1.logger.error('OpenAI API error:', errorText);
            res.status(openaiResponse.status).json({ error: 'OpenAI API error' });
            return;
        }
        const data = await openaiResponse.json();
        const content = data.choices[0].message.content.trim();
        res.json({
            success: true,
            content,
            usage: data.usage
        });
    }
    catch (error) {
        firebase_functions_1.logger.error('Error generating content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Test OpenAI connection endpoint
exports.testOpenAI = (0, https_1.onRequest)({
    cors: true,
    region: 'us-central1'
}, async (req, res) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            res.json({
                success: false,
                error: 'OpenAI API key not configured'
            });
            return;
        }
        // Test with a simple request
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: 'Say "Connection successful"' }
                ],
                max_tokens: 10
            })
        });
        if (openaiResponse.ok) {
            const data = await openaiResponse.json();
            res.json({
                success: true,
                message: data.choices[0].message.content,
                model: data.model,
                usage: data.usage
            });
        }
        else {
            const errorText = await openaiResponse.text();
            firebase_functions_1.logger.error('OpenAI test failed:', errorText);
            res.json({
                success: false,
                error: `OpenAI API error: ${openaiResponse.status}`
            });
        }
    }
    catch (error) {
        firebase_functions_1.logger.error('Test error:', error);
        res.json({
            success: false,
            error: 'Connection test failed'
        });
    }
});
//# sourceMappingURL=openai.js.map