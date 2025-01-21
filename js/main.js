import LanguageManager from './LanguageManager.js';

document.addEventListener('DOMContentLoaded', function() {
    const languageManager = new LanguageManager();
    // Like button functionaliteit
    const likeButtons = document.querySelectorAll('.video-actions button:first-child');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            if(this.classList.contains('liked')) {
                this.style.color = '#FE2C55';
            } else {
                this.style.color = '#000';
            }
        });
    });

    // Smooth scroll voor navigatie links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

class VideoFeed {
    constructor() {
        this.videos = [];
        this.currentVideoIndex = 0;
        this.feedContainer = document.querySelector('.video-feed');
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        await this.loadVideos();
        this.setupInfiniteScroll();
        this.setupVideoInteractions();
    }

    async loadVideos() {
        // Simuleer video data (in een echte app zou dit van een API komen)
        const mockVideos = [
            {
                id: 1,
                url: 'video1.mp4',
                username: '@gebruiker1',
                description: 'Eerste ZipZop video! #viraal',
                likes: 1500,
                comments: 300,
                shares: 100
            },
            // Meer video's hier
        ];

        this.videos = [...this.videos, ...mockVideos];
        this.renderVideos();
    }

    renderVideos() {
        this.videos.forEach(video => {
            const videoElement = this.createVideoElement(video);
            this.feedContainer.appendChild(videoElement);
        });
    }

    createVideoElement(videoData) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-item';
        
        videoContainer.innerHTML = `
            <video src="${videoData.url}" loop>
            </video>
            <div class="video-actions">
                <button class="action-button like-button">
                    <i class="fas fa-heart"></i>
                    <span>${videoData.likes}</span>
                </button>
                <button class="action-button">
                    <i class="fas fa-comment"></i>
                    <span>${videoData.comments}</span>
                </button>
                <button class="action-button">
                    <i class="fas fa-share"></i>
                    <span>${videoData.shares}</span>
                </button>
            </div>
            <div class="video-info">
                <h4>${videoData.username}</h4>
                <p>${videoData.description}</p>
            </div>
        `;

        return videoContainer;
    }

    setupInfiniteScroll() {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isLoading) {
                        this.loadVideos();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(document.querySelector('.video-feed'));
    }

    setupVideoInteractions() {
        document.addEventListener('scroll', () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                const rect = video.getBoundingClientRect();
                const visible = (
                    rect.top >= 0 &&
                    rect.bottom <= window.innerHeight
                );

                if (visible) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        });
    }
}

// Start de applicatie
document.addEventListener('DOMContentLoaded', () => {
    new VideoFeed();
}); 