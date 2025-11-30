// Settings functionality - сохранение и применение настроек

// Словари переводов для всех элементов интерфейса
const translations = {
    ru: {
        // Навигация
        'nav-dashboard': 'Дашборд',
        'nav-portfolio': 'Портфель',
        'nav-analytics': 'Аналитика',
        'nav-calculator': 'Калькулятор',
        'nav-settings': 'Настройки',
        // Главная страница
        'welcome-title': 'Добро пожаловать, Иван',
        'welcome-subtitle': 'Обзор вашего инвестиционного портфеля',
        'stat-total-value': 'Общая стоимость портфеля',
        'stat-yield': 'Доходность за год',
        'stat-assets': 'Активы',
        'stat-free-funds': 'Свободные средства',
        'stat-change-month': 'за месяц',
        'stat-change-year': 'за год',
        'stat-available': 'Доступно для инвестиций',
        'stat-types': 'Акции, облигации, ETF',
        'chart-dynamics': 'Динамика портфеля',
        'chart-distribution': 'Распределение активов',
        'chart-portfolio': 'Ваш портфель',
        'chart-index': 'Индекс МосБиржи',
        'top-assets': 'Топ активы',
        'action-buy': 'Купить активы',
        'action-buy-desc': 'Добавить новые позиции в портфель',
        'action-analytics': 'Аналитика',
        'action-analytics-desc': 'Детальный анализ ваших инвестиций',
        'action-strategies': 'Стратегии',
        'action-strategies-desc': 'Готовые инвестиционные стратегии',
        'action-mobile': 'Мобильное приложение',
        'action-mobile-desc': 'Управляйте на ходу',
        // Портфель
        'portfolio-title': 'Мой портфель',
        'portfolio-subtitle': 'Детальный обзор всех активов',
        'portfolio-total': 'Общая стоимость',
        'portfolio-yield': 'Доходность',
        'portfolio-assets': 'Всего активов',
        'portfolio-all': 'Все активы',
        'table-asset': 'Актив',
        'table-quantity': 'Количество',
        'table-cost': 'Стоимость',
        'table-change': 'Изменение',
        // Аналитика
        'analytics-title': 'Детальная аналитика',
        'analytics-subtitle': 'Глубокий анализ вашего инвестиционного портфеля',
        'analytics-avg-yield': 'Средняя доходность',
        'analytics-volatility': 'Волатильность',
        'analytics-sharpe': 'Коэффициент Шарпа',
        'analytics-drawdown': 'Максимальная просадка',
        'analytics-average': 'Средняя',
        'analytics-good': 'Хорошо',
        'analytics-period': 'За период',
        'analytics-year': 'За год',
        // Калькулятор
        'calculator-title': 'Калькулятор возможностей',
        'calculator-subtitle': 'Оценка кредита и симулятор налоговой нагрузки',
        'calculator-credit': 'Кредитный калькулятор',
        'calculator-tax': 'Налоговый калькулятор',
        'calculator-credit-title': 'Какая сумма кредита мне доступна?',
        'calculator-credit-desc': 'Рассчитайте максимальную сумму кредита на основе вашего оборота',
        'calculator-tax-title': 'ИП или самозанятость?',
        'calculator-tax-desc': 'Сравните налоговую нагрузку для разных форм ведения бизнеса',
        'calc-turnover': 'Средний оборот (в месяц)',
        'calc-marginality': 'Маржинальность (от оборота)',
        'calc-annual-income': 'Годовой доход (ожидаемый)',
        'calc-region': 'Регион налогообложения',
        'calc-region-std': 'Обычный регион',
        'calc-region-pref': 'Льготный регион',
        'calc-result-placeholder': 'Введите данные для расчета',
        'calc-available-credit': 'Доступная сумма кредита',
        'calc-monthly-turnover': 'Месячный оборот:',
        'calc-monthly-profit': 'Месячная прибыль:',
        'calc-annual-profit': 'Годовая прибыль:',
        'calc-result-note': '* Расчет является приблизительным и может отличаться от реальных условий кредитования',
        'calc-tax-comparison': 'Сравнение налоговой нагрузки',
        'calc-tax-ip': 'Индивидуальный предприниматель',
        'calc-tax-usn6': 'УСН 6% (доходы)',
        'calc-tax-usn15': 'УСН 15% (доходы-расходы)',
        'calc-tax-self-employed': 'Самозанятость',
        'calc-tax-region-pref': 'Льготный регион (1%)',
        'calc-tax-region-std': 'Обычный регион (4%)',
        'calc-tax-result-note': '* Расчет является приблизительным. Для точного расчета обратитесь к специалисту',
        'btn-calculate': 'Рассчитать',
        'btn-calculate-sum': 'Рассчитать сумму',
        'btn-compare': 'Сравнить налоги',
        'btn-save': 'Сохранить',
        'btn-cancel': 'Отмена',
        'btn-add': 'Добавить',
        'btn-submit': 'Отправить',
        'btn-add-meeting': 'Добавить встречу',
        // Кнопки периодов
        'period-1m': '1М',
        'period-3m': '3М',
        'period-1y': '1Г',
        'period-all': 'Все',
        // Типы активов
        'asset-stocks': 'Акции',
        'asset-bonds': 'Облигации',
        'asset-etf': 'ETF',
        // Фильтры
        'filter-all': 'Все',
        'filter-stocks': 'Акции',
        'filter-bonds': 'Облигации',
        'filter-etf': 'ETF',
        // Настройки
        'settings-title': 'Настройки',
        'settings-subtitle': 'Управление параметрами приложения',
        'settings-theme': 'Тема оформления',
        'settings-light': 'Светлая',
        'settings-dark': 'Тёмная',
        'settings-auto': 'Автоматически',
        // Меню
        'menu-welcome': 'Добро пожаловать,',
        'menu-additional': 'Дополнительно',
        'menu-community': 'Сообщество',
        'menu-vault': 'Документы',
        'menu-meetings': 'Встречи',
        'menu-office': 'Офис 2.0',
        'menu-region': 'Регион и офисы',
        'menu-about': 'О сайте',
        'menu-support': 'Техподдержка',
        'menu-logout': 'Выйти',
        // Офис 2.0
        'office-title': 'Физический офис 2.0',
        'office-subtitle': 'Запланируйте визит, система подготовит документы заранее',
        'office-goal': 'Цель визита',
        'office-select-goal': 'Выберите цель',
        'office-goal-ip-credit': 'Открыть ИП + получить кредит',
        'office-goal-ip': 'Открыть ИП',
        'office-goal-credit': 'Получить кредит',
        'office-goal-tax': 'Налоговая консультация',
        'office-date': 'Дата визита',
        'office-time': 'Время визита',
        'office-docs': 'Подготовленные документы',
        'office-book': 'Записаться',
        'office-ar': 'AR‑навигация',
        'office-ar-hint': 'Пройдите к зоне налогового консультанта. Ваш специалист — Мария, ждёт в переговорной 3.',
        'office-appointments': 'Ваши записи',
        'office-services': 'Доступные услуги',
        'office-book-service': 'Записаться',
        'service-ip': 'Открытие ИП',
        'service-ip-desc': 'Полное сопровождение регистрации',
        'service-credit': 'Кредитование',
        'service-credit-desc': 'Подбор и оформление кредита',
        'service-tax': 'Налоговые консультации',
        'service-tax-desc': 'Помощь с налогообложением',
        'service-docs': 'Документооборот',
        'service-docs-desc': 'Подготовка и подача документов',
        // Уведомления и сообщения
        'alert-fill-required': 'Заполните обязательные поля: название, дата и время',
        'alert-fill-all-required': 'Заполните все обязательные поля',
        'confirm-delete-meeting': 'Удалить встречу?',
        'confirm-cancel-appointment': 'Отменить запись?',
        'alert-office-selected': 'Выбран офис',
        'alert-appointment-created': 'Запись создана. Документы будут готовы ко времени визита.',
        'alert-support-thanks': 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.',
        'toast-meeting-saved': 'Встреча добавлена',
        'toast-meeting-updated': 'Встреча изменена',
        'toast-meeting-deleted': 'Встреча удалена',
        'toast-vault-unlocked': 'Биометрическая аутентификация успешна',
        'toast-vault-locked': 'Сейф заблокирован',
        // Общее
        'positive': 'положительное',
        'negative': 'отрицательное'
    }
};
        // Navigation
        'nav-dashboard': 'Dashboard',
        'nav-portfolio': 'Portfolio',
        'nav-analytics': 'Analytics',
        'nav-calculator': 'Calculator',
        'nav-settings': 'Settings',
        // Main page
        'welcome-title': 'Welcome, Ivan',
        'welcome-subtitle': 'Overview of your investment portfolio',
        'stat-total-value': 'Total portfolio value',
        'stat-yield': 'Annual yield',
        'stat-assets': 'Assets',
        'stat-free-funds': 'Free funds',
        'stat-change-month': 'per month',
        'stat-change-year': 'per year',
        'stat-available': 'Available for investment',
        'stat-types': 'Stocks, bonds, ETF',
        'chart-dynamics': 'Portfolio dynamics',
        'chart-distribution': 'Asset distribution',
        'chart-portfolio': 'Your portfolio',
        'chart-index': 'MOEX Index',
        'top-assets': 'Top assets',
        'action-buy': 'Buy assets',
        'action-buy-desc': 'Add new positions to portfolio',
        'action-analytics': 'Analytics',
        'action-analytics-desc': 'Detailed analysis of your investments',
        'action-strategies': 'Strategies',
        'action-strategies-desc': 'Ready investment strategies',
        'action-mobile': 'Mobile app',
        'action-mobile-desc': 'Manage on the go',
        // Portfolio
        'portfolio-title': 'My portfolio',
        'portfolio-subtitle': 'Detailed overview of all assets',
        'portfolio-total': 'Total value',
        'portfolio-yield': 'Yield',
        'portfolio-assets': 'Total assets',
        'portfolio-all': 'All assets',
        'table-asset': 'Asset',
        'table-quantity': 'Quantity',
        'table-cost': 'Cost',
        'table-change': 'Change',
        // Analytics
        'analytics-title': 'Detailed analytics',
        'analytics-subtitle': 'Deep analysis of your investment portfolio',
        'analytics-avg-yield': 'Average yield',
        'analytics-volatility': 'Volatility',
        'analytics-sharpe': 'Sharpe ratio',
        'analytics-drawdown': 'Maximum drawdown',
        'analytics-average': 'Average',
        'analytics-good': 'Good',
        'analytics-period': 'For period',
        'analytics-year': 'Per year',
        // Calculator
        'calculator-title': 'Opportunity calculator',
        'calculator-subtitle': 'Credit assessment and tax burden simulator',
        'calculator-credit': 'Credit calculator',
        'calculator-tax': 'Tax calculator',
        'calculator-credit-title': 'What credit amount is available to me?',
        'calculator-credit-desc': 'Calculate the maximum credit amount based on your turnover',
        'calculator-tax-title': 'Individual entrepreneur or self-employed?',
        'calculator-tax-desc': 'Compare tax burden for different business forms',
        'calc-turnover': 'Average turnover (per month)',
        'calc-marginality': 'Marginality (from turnover)',
        'calc-annual-income': 'Annual income (expected)',
        'calc-region': 'Tax region',
        'calc-region-std': 'Standard region',
        'calc-region-pref': 'Preferential region',
        'calc-result-placeholder': 'Enter data to calculate',
        'calc-available-credit': 'Available credit amount',
        'calc-monthly-turnover': 'Monthly turnover:',
        'calc-monthly-profit': 'Monthly profit:',
        'calc-annual-profit': 'Annual profit:',
        'calc-result-note': '* Calculation is approximate and may differ from actual lending conditions',
        'calc-tax-comparison': 'Tax burden comparison',
        'calc-tax-ip': 'Individual entrepreneur',
        'calc-tax-usn6': 'STS 6% (income)',
        'calc-tax-usn15': 'STS 15% (income-expenses)',
        'calc-tax-self-employed': 'Self-employed',
        'calc-tax-region-pref': 'Preferential region (1%)',
        'calc-tax-region-std': 'Standard region (4%)',
        'calc-tax-result-note': '* Calculation is approximate. For accurate calculation, please contact a specialist',
        'btn-calculate': 'Calculate',
        'btn-calculate-sum': 'Calculate amount',
        'btn-compare': 'Compare taxes',
        'btn-save': 'Save',
        'btn-cancel': 'Cancel',
        'btn-add': 'Add',
        'btn-submit': 'Submit',
        'btn-add-meeting': 'Add meeting',
        // Period buttons
        'period-1m': '1M',
        'period-3m': '3M',
        'period-1y': '1Y',
        'period-all': 'All',
        // Asset types
        'asset-stocks': 'Stocks',
        'asset-bonds': 'Bonds',
        'asset-etf': 'ETF',
        // Filters
        'filter-all': 'All',
        'filter-stocks': 'Stocks',
        'filter-bonds': 'Bonds',
        'filter-etf': 'ETF',
        // Settings
        'settings-title': 'Settings',
        'settings-subtitle': 'Application parameters management',
        'settings-language': 'Language',
        'settings-theme': 'Theme',
        'settings-light': 'Light',
        'settings-dark': 'Dark',
        'settings-auto': 'Auto',
        // Menu
        'menu-welcome': 'Welcome,',
        'menu-additional': 'Additional',
        'menu-community': 'Community',
        'menu-vault': 'Documents',
        'menu-meetings': 'Meetings',
        'menu-office': 'Office 2.0',
        'menu-region': 'Region and offices',
        'menu-about': 'About',
        'menu-support': 'Support',
        'menu-logout': 'Logout',
        // Office 2.0
        'office-title': 'Physical Office 2.0',
        'office-subtitle': 'Schedule a visit, the system will prepare documents in advance',
        'office-goal': 'Visit purpose',
        'office-select-goal': 'Select purpose',
        'office-goal-ip-credit': 'Open IP + get credit',
        'office-goal-ip': 'Open IP',
        'office-goal-credit': 'Get credit',
        'office-goal-tax': 'Tax consultation',
        'office-date': 'Visit date',
        'office-time': 'Visit time',
        'office-docs': 'Prepared documents',
        'office-book': 'Book',
        'office-ar': 'AR navigation',
        'office-ar-hint': 'Go to the tax consultant area. Your specialist — Maria, is waiting in meeting room 3.',
        'office-appointments': 'Your appointments',
        'office-services': 'Available services',
        'office-book-service': 'Book',
        'service-ip': 'IP Registration',
        'service-ip-desc': 'Full registration support',
        'service-credit': 'Credit',
        'service-credit-desc': 'Credit selection and processing',
        'service-tax': 'Tax consultations',
        'service-tax-desc': 'Tax assistance',
        'service-docs': 'Document management',
        'service-docs-desc': 'Document preparation and submission',
        // Уведомления и сообщения
        'alert-fill-required': 'Please fill in all required fields: title, date and time',
        'alert-fill-all-required': 'Please fill in all required fields',
        'confirm-delete-meeting': 'Delete meeting?',
        'confirm-cancel-appointment': 'Cancel appointment?',
        'alert-office-selected': 'Office selected',
        'alert-appointment-created': 'Appointment created. Documents will be ready by the visit time.',
        'alert-support-thanks': 'Thank you for your inquiry! We will contact you shortly.',
        'toast-meeting-saved': 'Meeting added',
        'toast-meeting-updated': 'Meeting updated',
        'toast-meeting-deleted': 'Meeting deleted',
        'toast-vault-unlocked': 'Biometric authentication successful',
        'toast-vault-locked': 'Vault locked',
        // General
        'positive': 'positive',
        'negative': 'negative'
    }
};

// Функция переключения логотипа в зависимости от темы
function updateLogo(theme) {
    const logoImages = document.querySelectorAll('.logo-img');
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    logoImages.forEach(img => {
        if (isDark) {
            // Сохраняем оригинальный src, если еще не сохранен
            if (!img.dataset.originalSrc) {
                img.dataset.originalSrc = img.src;
            }
            img.src = 'logo_dark.png';
        } else {
            // Восстанавливаем оригинальный src
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
        // Автоматическая тема на основе системных настроек
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
    
    // Обновляем графики при смене темы
    updateChartsTheme();
}

// Функция обновления цветов графиков при смене темы
function updateChartsTheme() {
    const isDark = document.documentElement.classList.contains('theme-dark');
    
    // Обновляем график портфеля, если он существует (глобальная переменная из script.js)
    if (typeof window.portfolioChart !== 'undefined' && window.portfolioChart) {
        const legendColor = isDark ? '#FFFFFF' : '#000000';
        const gridColor = isDark ? '#3A3A3A' : '#F5F5F5';
        const ticksColor = isDark ? '#B0B0B0' : '#666666';
        
        if (window.portfolioChart.options.plugins.legend && window.portfolioChart.options.plugins.legend.labels) {
            window.portfolioChart.options.plugins.legend.labels.color = legendColor;
            // Обновляем generateLabels чтобы пересоздать легенду с правильным цветом
            if (window.portfolioChart.options.plugins.legend.labels.generateLabels) {
                // Пересоздаем график с правильными цветами
                const activeBtn = document.querySelector('.period-btn.active');
                if (activeBtn && typeof window.initPortfolioChart === 'function') {
                    let period = activeBtn.getAttribute('data-i18n') || activeBtn.textContent.trim();
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
                    window.initPortfolioChart(period);
                }
            } else {
                window.portfolioChart.options.plugins.legend.labels.color = legendColor;
            }
        }
        if (window.portfolioChart.options.scales && window.portfolioChart.options.scales.y) {
            window.portfolioChart.options.scales.y.grid.color = gridColor;
            window.portfolioChart.options.scales.y.ticks.color = ticksColor;
        }
        if (window.portfolioChart.options.scales && window.portfolioChart.options.scales.x && window.portfolioChart.options.scales.x.ticks) {
            window.portfolioChart.options.scales.x.ticks.color = ticksColor;
        }
        window.portfolioChart.update('none');
    }
    
    // Пересоздаем график с правильными цветами, если он существует
    setTimeout(() => {
        if (typeof window.initPortfolioChart === 'function') {
            // Получаем текущий период из активной кнопки
            const activeBtn = document.querySelector('.period-btn.active');
            if (activeBtn) {
                let period = activeBtn.getAttribute('data-i18n') || activeBtn.textContent.trim();
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
                // Пересоздаем график с правильными цветами для темной темы
                window.initPortfolioChart(period);
            } else {
                // Если нет активной кнопки, используем дефолтный период
                window.initPortfolioChart('1М');
            }
        }
    }, 150);
    
    // Обновляем графики аналитики, если они существуют (глобальные переменные из analytics.js)
    if (typeof window.analyticsChart !== 'undefined' && window.analyticsChart) {
        const gridColor = isDark ? '#3A3A3A' : '#F5F5F5';
        const ticksColor = isDark ? '#B0B0B0' : '#666666';
        
        if (window.analyticsChart.options.scales && window.analyticsChart.options.scales.y) {
            window.analyticsChart.options.scales.y.grid.color = gridColor;
            window.analyticsChart.options.scales.y.ticks.color = ticksColor;
        }
        if (window.analyticsChart.options.scales && window.analyticsChart.options.scales.x && window.analyticsChart.options.scales.x.ticks) {
            window.analyticsChart.options.scales.x.ticks.color = ticksColor;
        }
        window.analyticsChart.update('none');
    }
    
    // Вызываем обновление графиков с небольшой задержкой, чтобы убедиться, что они инициализированы
    setTimeout(() => {
        if (typeof window.portfolioChart !== 'undefined' && window.portfolioChart) {
            const legendColor = isDark ? '#FFFFFF' : '#000000';
            const gridColor = isDark ? '#3A3A3A' : '#F5F5F5';
            const ticksColor = isDark ? '#B0B0B0' : '#666666';
            
            if (window.portfolioChart.options.plugins.legend && window.portfolioChart.options.plugins.legend.labels) {
                window.portfolioChart.options.plugins.legend.labels.color = legendColor;
            }
            if (window.portfolioChart.options.scales && window.portfolioChart.options.scales.y) {
                window.portfolioChart.options.scales.y.grid.color = gridColor;
                window.portfolioChart.options.scales.y.ticks.color = ticksColor;
            }
            if (window.portfolioChart.options.scales && window.portfolioChart.options.scales.x && window.portfolioChart.options.scales.x.ticks) {
                window.portfolioChart.options.scales.x.ticks.color = ticksColor;
            }
            window.portfolioChart.update('none');
        }
        
        if (typeof window.analyticsChart !== 'undefined' && window.analyticsChart) {
            const gridColor = isDark ? '#3A3A3A' : '#F5F5F5';
            const ticksColor = isDark ? '#B0B0B0' : '#666666';
            
            if (window.analyticsChart.options.scales && window.analyticsChart.options.scales.y) {
                window.analyticsChart.options.scales.y.grid.color = gridColor;
                window.analyticsChart.options.scales.y.ticks.color = ticksColor;
            }
            if (window.analyticsChart.options.scales && window.analyticsChart.options.scales.x && window.analyticsChart.options.scales.x.ticks) {
                window.analyticsChart.options.scales.x.ticks.color = ticksColor;
            }
            window.analyticsChart.update('none');
        }
    }, 100);
}

// Функция применения языка (всегда русский)
function applyLanguage(lang) {
    document.documentElement.lang = 'ru';
    
    // Всегда используем русский язык
    const texts = translations.ru;
    
    // Обновляем элементы с data-i18n атрибутами (вызываем дважды для надежности)
    function updateI18nElements() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (texts[key]) {
                // Для элементов с data-value, которые содержат проценты, сохраняем числовую часть
                if (element.hasAttribute('data-value')) {
                    const dataValue = element.getAttribute('data-value');
                    // Проверяем, содержит ли значение процент (например, "+12.5% за месяц")
                    const percentMatch = dataValue.match(/^([+\-]?\d+\.?\d*%)\s*(.+)$/);
                    if (percentMatch) {
                        // Сохраняем числовую часть и добавляем переведенный текст
                        element.textContent = percentMatch[1] + ' ' + texts[key];
                    } else {
                        // Если нет процента, просто заменяем текст
                        element.textContent = texts[key];
                    }
                } else if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                    element.value = texts[key];
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = texts[key];
                } else {
                    element.textContent = texts[key];
                }
            }
        });
    }
    
    // Вызываем сразу
    updateI18nElements();
    
    // Вызываем еще раз через небольшую задержку для динамически загруженных элементов
    setTimeout(updateI18nElements, 50);
    

    // Обновляем секции меню
    const menuSectionTitle = document.querySelector('.menu-section-title');
    if (menuSectionTitle) {
        menuSectionTitle.textContent = texts['menu-additional'] || 'Дополнительно';
    }
    
    const menuGreeting = document.querySelector('.user-menu-greeting');
    if (menuGreeting) {
        menuGreeting.textContent = texts['menu-welcome'] || 'Добро пожаловать,';
    }
}

// Загрузка сохраненных настроек
function loadSettings() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Применяем настройки
    applyLanguage('ru');
    applyTheme(savedTheme);
    
    // Обновляем графики после применения темы
    setTimeout(() => {
        updateChartsTheme();
    }, 200);
    
    // Если мы на странице настроек, устанавливаем значения в радиокнопки
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    
    if (themeRadios.length > 0) {
        const themeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }
    }
    
    return { savedTheme };
}

// Применяем настройки при загрузке страницы
function runSettings() {
    loadSettings();
    initSettingsHandlers();
    // Дополнительно применяем язык после небольшой задержки, чтобы все элементы были готовы
    setTimeout(function() {
        if (window.applyLanguage) {
            window.applyLanguage('ru');
        } else {
            applyLanguage('ru');
        }
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSettings);
} else {
    // DOM уже загружен
    runSettings();
}

// Флаг для предотвращения множественных обработчиков
let settingsHandlersInitialized = false;

// Инициализация обработчиков настроек
function initSettingsHandlers() {
    // Предотвращаем множественную инициализацию
    if (settingsHandlersInitialized) {
        return;
    }
    settingsHandlersInitialized = true;
    
    // Используем делегирование событий для надежности
    document.addEventListener('change', function(e) {
        // Обработчик изменения темы
        if (e.target.name === 'theme' && e.target.type === 'radio') {
            const theme = e.target.value;
            localStorage.setItem('theme', theme);
            applyTheme(theme);
            console.log('Тема изменена на:', theme);
            
            const themeNames = {
                light: 'Светлая',
                dark: 'Тёмная',
                auto: 'Автоматически'
            };
            const themeName = themeNames[theme] || theme;
            showNotification(`Тема изменена на: ${themeName}`);
        }
    });
}

// Функция показа уведомления
function showNotification(message) {
    // Удаляем предыдущее уведомление, если есть
    const existingNotification = document.querySelector('.settings-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'settings-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Слушаем изменения системной темы, если выбрана автоматическая
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Применяем логотип при загрузке
    updateLogo(savedTheme);
    
if (savedTheme === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        applyTheme('auto');
    });
    }
});

// Экспортируем функции для использования в других скриптах
if (typeof window !== 'undefined') {
    window.applyTheme = applyTheme;
    window.applyLanguage = applyLanguage;
    window.loadSettings = loadSettings;
    window.updateLogo = updateLogo;
    window.translations = translations;
    
    // Функция для получения переведенного текста (всегда русский)
    window.t = function(key) {
        return translations.ru[key] || key;
    };
    
    // Применяем язык сразу после экспорта, если DOM готов
    if (document.readyState !== 'loading') {
        applyLanguage('ru');
        const savedTheme = localStorage.getItem('theme') || 'light';
        updateLogo(savedTheme);
    }
}

