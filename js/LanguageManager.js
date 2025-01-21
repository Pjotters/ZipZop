class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        // Laad vertalingen
        const translationsModule = await import('./translations.js');
        this.translations = translationsModule.default;
        
        // Setup language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }

        this.updatePageContent();
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Redirect naar de juiste taalversie
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        if (lang === 'en') {
            // Verwijder .nl.html indien aanwezig en voeg .en.html toe
            const newPage = currentPage.replace('.nl.html', '.html').replace('.html', '.en.html');
            window.location.href = currentPath.replace(currentPage, newPage);
        } else {
            // Verwijder .en.html indien aanwezig
            const newPage = currentPage.replace('.en.html', '.html');
            window.location.href = currentPath.replace(currentPage, newPage);
        }
    }

    updatePageContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    }
}

export default LanguageManager; 