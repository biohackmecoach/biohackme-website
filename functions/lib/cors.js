"use strict";
exports.__esModule = true;
exports.cors = void 0;
var cors = function (req, res, next) {
    // Set CORS headers for all requests
    var allowedOrigins = [
        'https://biohackme.com.au',
        'https://www.biohackme.com.au',
        'https://biohackme-app-379de.web.app',
        'http://localhost:5173',
        'http://localhost:3000'
    ];
    var origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
};
exports.cors = cors;
