import { Request, Response } from 'express';

export const cors = (req: Request, res: Response, next: () => void) => {
  // Set CORS headers for all requests
  const allowedOrigins = [
    'https://biohackme.com.au',
    'https://www.biohackme.com.au',
    'https://biohackme-app-379de.web.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin as string)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
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