// Единый скрипт инициализации темы для всех страниц
(function() {
    'use strict';
    
    // Убеждаемся, что по умолчанию установлена светлая тема
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme || (savedTheme !== 'light' && savedTheme !== 'dark' && savedTheme !== 'auto')) {
        savedTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
    
    const savedLanguage = localStorage.getItem('language') || 'ru';
    document.documentElement.lang = savedLanguage;
    
    // ВАЖНО: Сначала убираем все классы тем, чтобы избежать конфликтов
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    
    // Определяем, темная ли тема
    const isDark = savedTheme === 'dark' || (savedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Применяем тему сразу - ВСЕГДА начинаем со светлой, если не указано иное
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
    } else if (savedTheme === 'light') {
        // ЯВНО устанавливаем светлую тему
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
    } else if (savedTheme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.classList.add('theme-dark');
            document.documentElement.classList.remove('theme-light');
        } else {
            document.documentElement.classList.add('theme-light');
            document.documentElement.classList.remove('theme-dark');
        }
    } else {
        // Fallback: всегда светлая тема по умолчанию
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
    }
    
    // Переключаем логотип сразу, если тема темная
    if (isDark) {
        document.addEventListener('DOMContentLoaded', function() {
            const logoImages = document.querySelectorAll('.logo-img');
            logoImages.forEach(img => {
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = img.src;
                }
                img.src = 'logo_dark.png';
            });
        });
    } else {
        // Убеждаемся, что логотип светлый
        document.addEventListener('DOMContentLoaded', function() {
            const logoImages = document.querySelectorAll('.logo-img');
            logoImages.forEach(img => {
                if (img.dataset.originalSrc) {
                    img.src = img.dataset.originalSrc;
                } else {
                    img.src = 'logo.png';
                }
            });
        });
    }
})();

