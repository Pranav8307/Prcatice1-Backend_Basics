const express = require('express');
const app = express();

const PORT = 3000;

// Logging middleware (logs method, URL, timestamp)
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    next();
});

// Authentication middleware for Bearer token
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Missing Authorization header' });
    }
    // Example: "Bearer mysecrettoken"
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || token !== 'mysecrettoken') {
        return res.status(403).json({ error: 'Invalid or missing token' });
    }
    next();
}

// Public route - no auth needed
app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route, accessible to everyone.' });
});

// Protected route - auth required
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You accessed a protected route!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
