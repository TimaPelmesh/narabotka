// Загрузка и применение сохраненных настроек (тема и язык)
(function() {
    'use strict';
    
    // Функция переключения логотипа
    function updateLogo(theme) {
        const logoImages = document.querySelectorAll('.logo-img');
        const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        logoImages.forEach(img => {
            if (isDark) {
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = img.src;
                }
                img.src = 'logo_dark.png';
            } else {
                if (img.dataset.originalSrc) {
                    img.src = img.dataset.originalSrc;
                } else {
                    img.src = 'logo.png';
                }
            }
        });
    }
    
    // Функция применения темы
    function applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.classList.add('theme-dark');
            html.classList.remove('theme-light');
            updateLogo('dark');
        } else if (theme === 'light') {
            html.classList.add('theme-light');
            html.classList.remove('theme-dark');
            updateLogo('light');
        } else if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                html.classList.add('theme-dark');
                html.classList.remove('theme-light');
                updateLogo('dark');
            } else {
                html.classList.add('theme-light');
                html.classList.remove('theme-dark');
                updateLogo('light');
            }
        }
    }
    
    // Загружаем сохраненные настройки
    const savedLanguage = localStorage.getItem('language') || 'ru';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Применяем тему сразу при загрузке скрипта
    applyTheme(savedTheme);
    
    // Применяем язык после загрузки DOM, чтобы функции из settings.js были доступны
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Используем функцию из settings.js, если она доступна
            if (window.applyLanguage) {
                window.applyLanguage(savedLanguage);
            } else {
                // Fallback: просто меняем атрибут lang
                document.documentElement.lang = savedLanguage;
                // Вызываем applyLanguage из settings.js после его загрузки
                setTimeout(function() {
                    if (window.applyLanguage) {
                        window.applyLanguage(savedLanguage);
                    }
                }, 100);
            }
        });
    } else {
        // DOM уже загружен
        if (window.applyLanguage) {
            window.applyLanguage(savedLanguage);
        } else {
            document.documentElement.lang = savedLanguage;
            setTimeout(function() {
                if (window.applyLanguage) {
                    window.applyLanguage(savedLanguage);
                }
            }, 100);
        }
    }
    
    // Слушаем изменения системной темы, если выбрана автоматическая
    if (savedTheme === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'auto') {
                applyTheme('auto');
            }
        });
    }
})();

// Portfolio Chart with detailed data
const portfolioCtx = document.getElementById('portfolioChart');
let portfolioChart = null;

// Detailed data for different periods
const chartData = {
    '1М': {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        portfolio: [2300000, 2315000, 2320000, 2310000, 2325000, 2335000, 2340000, 2350000, 2345000, 2360000, 2370000, 2365000, 2380000, 2390000, 2385000, 2400000, 2410000, 2405000, 2420000, 2430000, 2425000, 2435000, 2440000, 2445000, 2450000, 2448000, 2452000, 2455000, 2453000, 2450000],
        index: [100, 100.5, 100.8, 100.3, 101, 101.5, 101.8, 102.2, 101.9, 102.5, 103, 102.7, 103.3, 103.8, 103.5, 104.2, 104.7, 104.4, 105, 105.5, 105.2, 105.8, 106, 106.3, 106.5, 106.3, 106.7, 107, 106.8, 106.5]
    },
    '3М': {
        labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4', 'Неделя 5', 'Неделя 6', 'Неделя 7', 'Неделя 8', 'Неделя 9', 'Неделя 10', 'Неделя 11', 'Неделя 12'],
        portfolio: [2200000, 2220000, 2240000, 2230000, 2260000, 2280000, 2300000, 2320000, 2310000, 2350000, 2380000, 2400000, 2420000, 2440000, 2450000],
        index: [95, 96, 97, 96.5, 98, 99, 100, 101, 100.5, 102, 103.5, 104.5, 105.5, 106.3, 106.5]
    },
    '1Г': {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        portfolio: [2100000, 2150000, 2200000, 2180000, 2250000, 2300000, 2350000, 2400000, 2380000, 2420000, 2450000, 2450000],
        index: [91, 93.5, 96, 95, 98, 100, 102, 104.5, 103.5, 105.5, 106.5, 106.5]
    },
    'Все': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        portfolio: [1500000, 1800000, 1950000, 2100000, 2450000],
        index: [65, 78, 85, 91, 106.5]
    }
};

window.initPortfolioChart = function initPortfolioChart(period = '1М') {
    const data = chartData[period];
    const isDark = document.documentElement.classList.contains('theme-dark');
    
    if (portfolioChart) {
        portfolioChart.destroy();
    }
    
    portfolioChart = new Chart(portfolioCtx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Ваш портфель',
                    data: data.portfolio,
                    borderColor: '#EF3124',
                    backgroundColor: 'rgba(239, 49, 36, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#EF3124',
                    pointHoverBorderColor: '#FFFFFF',
                    pointHoverBorderWidth: 3,
                    pointBackgroundColor: '#EF3124',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2
                },
                {
                    label: 'Индекс МосБиржи',
                    data: data.index.map(val => {
                        const baseValue = data.portfolio[0];
                        return baseValue * (val / 100);
                    }),
                    borderColor: '#666666',
                    backgroundColor: 'rgba(102, 102, 102, 0.05)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#666666',
                    pointHoverBorderColor: '#FFFFFF',
                    pointHoverBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: false,
                        boxWidth: 40,
                        boxHeight: 3,
                        padding: 12,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: isDark ? '#FFFFFF' : '#000000',
                        font: {
                            size: 13,
                            weight: '500',
                            color: isDark ? '#FFFFFF' : '#000000'
                        },
                        generateLabels: function(chart) {
                            return [
                                {
                                    text: 'Ваш портфель',
                                    fillStyle: '#EF3124',
                                    strokeStyle: '#EF3124',
                                    lineWidth: 3,
                                    hidden: false,
                                    index: 0
                                },
                                {
                                    text: 'Индекс МосБиржи',
                                    fillStyle: '#666666',
                                    strokeStyle: '#666666',
                                    lineWidth: 2,
                                    lineDash: [5, 5],
                                    hidden: false,
                                    index: 1
                                }
                            ];
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#000000',
                    padding: 16,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    displayColors: true,
                    usePointStyle: true,
                    callbacks: {
                        title: function(context) {
                            return 'Дата: ' + context[0].label;
                        },
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            const change = context.datasetIndex === 0 && context.dataIndex > 0 
                                ? ((value - data.portfolio[context.dataIndex - 1]) / data.portfolio[context.dataIndex - 1] * 100).toFixed(2)
                                : null;
                            let result = label + ': ₽ ' + value.toLocaleString('ru-RU');
                            if (change !== null && context.dataIndex > 0) {
                                const sign = change >= 0 ? '+' : '';
                                result += ' (' + sign + change + '%)';
                            }
                            return result;
                        },
                        afterBody: function(context) {
                            if (context.length > 1 && context[0].dataIndex > 0) {
                                const portfolioValue = context[0].parsed.y;
                                const indexValue = context[1].parsed.y;
                                const outperformance = ((portfolioValue - indexValue) / indexValue * 100).toFixed(2);
                                return 'Превышение индекса: ' + (outperformance >= 0 ? '+' : '') + outperformance + '%';
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: isDark ? '#3A3A3A' : '#F5F5F5',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: isDark ? '#B0B0B0' : '#666666',
                        font: {
                            size: 12
                        },
                        padding: 10,
                        maxTicksLimit: 6,
                        callback: function(value, index, ticks) {
                            // Убираем повторяющиеся значения
                            if (index > 0 && ticks[index - 1].value === value) {
                                return '';
                            }
                            if (value >= 1000000) {
                                return '₽' + (value / 1000000).toFixed(1) + 'М';
                            } else if (value >= 1000) {
                                return '₽' + (value / 1000).toFixed(0) + 'К';
                            }
                            return '₽' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: isDark ? '#B0B0B0' : '#666666',
                        font: {
                            size: 12
                        },
                        maxRotation: 45,
                        minRotation: 0
                    }
                }
            }
        }
    });
}

if (portfolioCtx) {
    initPortfolioChart('1М');
    
    // Mobile chart optimization
    const isMobile = window.innerWidth <= 768;
    if (isMobile && portfolioChart) {
        portfolioChart.options.plugins.legend.display = false;
        portfolioChart.options.scales.x.ticks.maxRotation = 0;
        portfolioChart.options.scales.x.ticks.minRotation = 0;
        portfolioChart.options.scales.x.ticks.maxTicksLimit = 6;
        portfolioChart.options.scales.y.ticks.maxTicksLimit = 4;
        portfolioChart.options.scales.y.grid.lineWidth = 0.5;
        portfolioChart.options.scales.x.grid.display = false;
        portfolioChart.options.plugins.tooltip.enabled = true;
        portfolioChart.update();
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const isMobileNow = window.innerWidth <= 768;
            if (portfolioChart) {
                portfolioChart.options.plugins.legend.display = !isMobileNow;
                portfolioChart.options.scales.x.ticks.maxRotation = 0;
                portfolioChart.options.scales.x.ticks.maxTicksLimit = isMobileNow ? 6 : 10;
                portfolioChart.options.scales.y.ticks.maxTicksLimit = isMobileNow ? 4 : 6;
                portfolioChart.options.scales.y.grid.lineWidth = isMobileNow ? 0.5 : 1;
                portfolioChart.options.scales.x.grid.display = !isMobileNow;
                portfolioChart.resize();
                portfolioChart.update();
            }
        }, 250);
    });
}

// Distribution Chart
const distributionCtx = document.getElementById('distributionChart');
if (distributionCtx) {
    const distributionChart = new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Акции', 'Облигации', 'ETF'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#EF3124',
                    '#000000',
                    '#666666'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#000000',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Period buttons functionality
document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Получаем период из data-i18n или textContent
        let period = this.getAttribute('data-i18n');
        if (!period) {
            period = this.textContent.trim();
        }
        
        // Маппинг для переводов
        const periodMap = {
            'period-1m': '1М',
            'period-3m': '3М',
            'period-1y': '1Г',
            'period-all': 'Все',
            '1M': '1М',
            '3M': '3М',
            '1Y': '1Г',
            'All': 'Все'
        };
        
        if (periodMap[period]) {
            period = periodMap[period];
        }
        
        if (portfolioChart && chartData[period]) {
            initPortfolioChart(period);
        }
    });
});

// Animate stat cards on load
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .chart-card, .distribution-card, .card, .action-card').forEach(card => {
    observer.observe(card);
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Privacy toggle functionality
const privacyToggleStat = document.getElementById('privacyToggleStat');
if (privacyToggleStat) {
    privacyToggleStat.addEventListener('click', function() {
        document.body.classList.toggle('privacy-mode');
        
        // Сохраняем состояние в localStorage
        const isPrivacyMode = document.body.classList.contains('privacy-mode');
        localStorage.setItem('privacyMode', isPrivacyMode);
        
        // Обновляем иконки
        const eyeOpen = this.querySelector('.eye-open-stat');
        const eyeClosed = this.querySelector('.eye-closed-stat');
        
        if (isPrivacyMode) {
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        } else {
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        }
    });
    
    // Восстанавливаем состояние при загрузке
    const savedPrivacyMode = localStorage.getItem('privacyMode') === 'true';
    if (savedPrivacyMode) {
        document.body.classList.add('privacy-mode');
        const eyeOpen = privacyToggleStat.querySelector('.eye-open-stat');
        const eyeClosed = privacyToggleStat.querySelector('.eye-closed-stat');
        if (eyeOpen && eyeClosed) {
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        }
    }
}

// User menu functionality
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');

if (userMenuBtn && userMenu) {
    // Toggle menu on click
    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on menu items
    const menuItems = userMenu.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't close if it's a logout button - let it handle its own action
            if (this.classList.contains('menu-item-danger')) {
                // Here you would typically handle logout
                console.log('Logout clicked');
            }
            // Close menu after a short delay to allow click to register
            setTimeout(() => {
                userMenu.classList.remove('active');
            }, 100);
        });
    });
}

// Автоматическое выделение активной вкладки в мобильном меню
(function() {
    'use strict';
    
    function highlightActiveMenuItem() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        // Находим все ссылки в мобильном меню
        const menuItems = document.querySelectorAll('.user-menu-mobile .menu-item, .user-menu .menu-item[href]');
        
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (!href) return;
            
            // Убираем класс active со всех элементов
            item.classList.remove('active');
            
            // Проверяем, соответствует ли ссылка текущей странице
            const itemFile = href.split('/').pop();
            if (itemFile === currentFile || (currentFile === '' && itemFile === 'index.html')) {
                item.classList.add('active');
            }
        });
    }
    
    // Вызываем при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightActiveMenuItem);
    } else {
        highlightActiveMenuItem();
    }
})();

// Инициализация страниц
(function() {
    'use strict';
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initPage(currentPage);
        });
    } else {
        initPage(currentPage);
    }
    
    function initPage(page) {
        switch(page) {
            case 'office.html':
                if (window.initOffice) window.initOffice();
                break;
            case 'region.html':
                if (window.initRegion) window.initRegion();
                break;
            case 'meetings.html':
                if (window.initMeetings) window.initMeetings();
                break;
            case 'vault.html':
                if (window.initVault) window.initVault();
                break;
            case 'community.html':
                if (window.initCommunity) window.initCommunity();
                break;
        }
    }
})();

