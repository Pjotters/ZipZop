class TikTokProxy {
    constructor() {
        this.proxyServer = 'https://jouw-proxy-server.com';
        this.tiktokAPI = 'https://api.tiktok.com';
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('tiktokLogin').addEventListener('click', () => {
            this.authenticateWithTikTok();
        });
    }

    async authenticateWithTikTok() {
        try {
            const response = await fetch(`${this.proxyServer}/auth/tiktok`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                window.location.href = response.url;
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }

    async getFeed() {
        try {
            const response = await fetch(`${this.proxyServer}/feed`, {
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch feed:', error);
        }
    }
} 