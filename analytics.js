// Analytics Chart Data
const analyticsChartData = {
    '1М': {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        portfolio: [2300000, 2315000, 2320000, 2310000, 2325000, 2335000, 2340000, 2350000, 2345000, 2360000, 2370000, 2365000, 2380000, 2390000, 2385000, 2400000, 2410000, 2405000, 2420000, 2430000, 2425000, 2435000, 2440000, 2445000, 2450000, 2448000, 2452000, 2455000, 2453000, 2450000]
    },
    '3М': {
        labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4', 'Неделя 5', 'Неделя 6', 'Неделя 7', 'Неделя 8', 'Неделя 9', 'Неделя 10', 'Неделя 11', 'Неделя 12'],
        portfolio: [2200000, 2220000, 2240000, 2230000, 2260000, 2280000, 2300000, 2320000, 2310000, 2350000, 2380000, 2400000, 2420000, 2440000, 2450000]
    },
    '1Г': {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        portfolio: [2100000, 2150000, 2200000, 2180000, 2250000, 2300000, 2350000, 2400000, 2380000, 2420000, 2450000, 2450000]
    },
    'Все': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        portfolio: [1500000, 1800000, 1950000, 2100000, 2450000]
    }
};

// Analytics Chart
const analyticsCtx = document.getElementById('analyticsChart');
let analyticsChart = null;

function initAnalyticsChart(period = '1Г') {
    const data = analyticsChartData[period];
    const isDark = document.documentElement.classList.contains('theme-dark');
    
    if (!data || !analyticsCtx) return;
    
    if (analyticsChart) {
        analyticsChart.destroy();
    }
    
    analyticsChart = new Chart(analyticsCtx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Ваш портфель',
                data: data.portfolio,
                borderColor: '#EF3124',
                backgroundColor: 'rgba(239, 49, 36, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 8
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
                    backgroundColor: isDark ? '#1A1A1A' : '#000000',
                    titleColor: isDark ? '#FFFFFF' : '#FFFFFF',
                    bodyColor: isDark ? '#FFFFFF' : '#FFFFFF',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return '₽ ' + context.parsed.y.toLocaleString('ru-RU');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: isDark ? '#3A3A3A' : '#F5F5F5'
                    },
                    ticks: {
                        color: isDark ? '#B0B0B0' : '#666666',
                        maxTicksLimit: window.innerWidth <= 768 ? 5 : 10,
                        callback: function(value) {
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
                        display: false
                    },
                    ticks: {
                        color: isDark ? '#B0B0B0' : '#666666',
                        maxRotation: window.innerWidth <= 768 ? 45 : 0,
                        minRotation: window.innerWidth <= 768 ? 45 : 0,
                        maxTicksLimit: window.innerWidth <= 768 ? 8 : 12
                    }
                }
            }
        }
    });
}

// Initialize chart
if (analyticsCtx) {
    initAnalyticsChart('1Г');
    window.initAnalyticsChart = initAnalyticsChart;
}

// Distribution Chart
const analyticsDistributionCtx = document.getElementById('analyticsDistributionChart');
if (analyticsDistributionCtx) {
    const analyticsDistributionChart = new Chart(analyticsDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Акции', 'Облигации', 'ETF'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#EF3124', '#000000', '#666666'],
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
                }
            }
        }
    });
}

// Period buttons
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
        
        if (analyticsChart && analyticsChartData[period]) {
            initAnalyticsChart(period);
        }
    });
});

// Mobile chart optimization
function optimizeChartForMobile() {
    if (!analyticsChart) return;
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        analyticsChart.options.plugins.legend.display = false;
        if (analyticsChart.options.scales.x && analyticsChart.options.scales.x.ticks) {
            analyticsChart.options.scales.x.ticks.maxRotation = 45;
            analyticsChart.options.scales.x.ticks.minRotation = 45;
            analyticsChart.options.scales.x.ticks.maxTicksLimit = 8;
        }
        if (analyticsChart.options.scales.y && analyticsChart.options.scales.y.ticks) {
            analyticsChart.options.scales.y.ticks.maxTicksLimit = 5;
        }
        analyticsChart.resize();
        analyticsChart.update();
    } else {
        if (analyticsChart.options.scales.x && analyticsChart.options.scales.x.ticks) {
            analyticsChart.options.scales.x.ticks.maxRotation = 0;
            analyticsChart.options.scales.x.ticks.minRotation = 0;
            analyticsChart.options.scales.x.ticks.maxTicksLimit = 12;
        }
        if (analyticsChart.options.scales.y && analyticsChart.options.scales.y.ticks) {
            analyticsChart.options.scales.y.ticks.maxTicksLimit = 10;
        }
        analyticsChart.resize();
        analyticsChart.update();
    }
}

if (analyticsChart) {
    optimizeChartForMobile();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            optimizeChartForMobile();
        }, 250);
    });
}

