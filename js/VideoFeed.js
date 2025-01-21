import CONFIG from './config.js';

class VideoFeed {
    constructor() {
        this.videos = [];
        this.page = 1;
        this.isLoading = false;
        this.feedContainer = document.querySelector('.video-feed');
        this.init();
    }

    async init() {
        await this.loadMockVideos(); // Later vervangen door echte API
        this.setupInfiniteScroll();
        this.setupVideoInteractions();
    }

    async loadMockVideos() {
        // Deze mock data wordt later vervangen door echte TikTok API calls
        const mockVideos = [
            {
                id: 1,
                videoUrl: 'https://example.com/video1.mp4',
                author: '@gebruiker1',
                description: 'Eerste ZipZop video! #viraal',
                likes: 1500,
                comments: 300,
                shares: 100,
                music: 'Origineel geluid - gebruiker1'
            },
            {
                id: 2,
                videoUrl: 'https://example.com/video2.mp4',
                author: '@gebruiker2',
                description: 'Dance challenge #zipzopdance',
                likes: 2500,
                comments: 450,
                shares: 200,
                music: 'Populair nummer - Artiest'
            }
        ];

        this.videos = [...this.videos, ...mockVideos];
        this.renderVideos();
    }

    createVideoElement(videoData) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-item';
        
        videoContainer.innerHTML = `
            <div class="video-player">
                <video src="${videoData.videoUrl}" loop muted>
                </video>
                <div class="video-controls">
                    <button class="play-pause">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="volume-control">
                        <i class="fas fa-volume-up"></i>
                    </div>
                </div>
            </div>
            <div class="video-sidebar">
                <button class="profile-button">
                    <img src="default-avatar.png" alt="${videoData.author}">
                </button>
                <button class="action-button like-button">
                    <i class="fas fa-heart"></i>
                    <span>${videoData.likes}</span>
                </button>
                <button class="action-button comment-button">
                    <i class="fas fa-comment"></i>
                    <span>${videoData.comments}</span>
                </button>
                <button class="action-button share-button">
                    <i class="fas fa-share"></i>
                    <span>${videoData.shares}</span>
                </button>
            </div>
            <div class="video-info">
                <h4>${videoData.author}</h4>
                <p>${videoData.description}</p>
                <div class="music-info">
                    <i class="fas fa-music"></i>
                    <span>${videoData.music}</span>
                </div>
            </div>
        `;

        return videoContainer;
    }
}

export default VideoFeed; 