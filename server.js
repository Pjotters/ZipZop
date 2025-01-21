const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors({
    origin: 'https://jouw-website.com',
    credentials: true
}));

// TikTok API configuratie
const TIKTOK_API = 'https://api.tiktok.com';
const TIKTOK_CLIENT_KEY = 'JOUW_TIKTOK_CLIENT_KEY';

app.get('/auth/tiktok', async (req, res) => {
    const authUrl = `${TIKTOK_API}/oauth/authorize?client_key=${TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent('https://jouw-website.com/callback')}`;
    res.redirect(authUrl);
});

app.get('/feed', async (req, res) => {
    try {
        const response = await axios.get(`${TIKTOK_API}/feed`, {
            headers: {
                'Authorization': `Bearer ${req.session.tiktokToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
}); 