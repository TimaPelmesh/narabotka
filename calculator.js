// Calculator tabs
const calculatorTabs = document.querySelectorAll('.calculator-tab');
const calculatorPanels = document.querySelectorAll('.calculator-panel');

calculatorTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        calculatorTabs.forEach(t => t.classList.remove('active'));
        calculatorPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        document.getElementById(targetTab + 'Panel').classList.add('active');
    });
});

// Credit Calculator
const creditForm = document.getElementById('creditForm');
const creditResult = document.getElementById('creditResult');

if (creditForm) {
    creditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const turnover = parseFloat(document.getElementById('avgTurnover').value);
        const marginality = parseFloat(document.getElementById('marginality').value);
        
        if (!turnover || !marginality) {
            return;
        }
        
        // Simple calculation: available credit = turnover * 6 * (marginality / 100) * 0.3
        const monthlyProfit = turnover * (marginality / 100);
        const annualProfit = monthlyProfit * 12;
        const availableCredit = annualProfit * 0.3; // 30% of annual profit
        
        // Получаем текущий язык
        const currentLang = document.documentElement.lang || 'ru';
        const translations = {
            ru: {
                'calc-available-credit': 'Доступная сумма кредита',
                'calc-monthly-turnover': 'Месячный оборот:',
                'calc-monthly-profit': 'Месячная прибыль:',
                'calc-annual-profit': 'Годовая прибыль:',
                'calc-result-note': '* Расчет является приблизительным и может отличаться от реальных условий кредитования'
            },
            en: {
                'calc-available-credit': 'Available credit amount',
                'calc-monthly-turnover': 'Monthly turnover:',
                'calc-monthly-profit': 'Monthly profit:',
                'calc-annual-profit': 'Annual profit:',
                'calc-result-note': '* Calculation is approximate and may differ from actual lending conditions'
            }
        };
        const t = translations[currentLang] || translations.ru;
        
        const resultHTML = `
            <div class="result-content">
                <div class="result-header">
                    <h3 data-i18n="calc-available-credit">${t['calc-available-credit']}</h3>
                </div>
                <div class="result-value">₽ ${Math.round(availableCredit).toLocaleString('ru-RU')}</div>
                <div class="result-details">
                    <div class="result-detail">
                        <span class="detail-label" data-i18n="calc-monthly-turnover">${t['calc-monthly-turnover']}</span>
                        <span class="detail-value">₽ ${turnover.toLocaleString('ru-RU')}</span>
                    </div>
                    <div class="result-detail">
                        <span class="detail-label" data-i18n="calc-monthly-profit">${t['calc-monthly-profit']}</span>
                        <span class="detail-value">₽ ${Math.round(monthlyProfit).toLocaleString('ru-RU')}</span>
                    </div>
                    <div class="result-detail">
                        <span class="detail-label" data-i18n="calc-annual-profit">${t['calc-annual-profit']}</span>
                        <span class="detail-value">₽ ${Math.round(annualProfit).toLocaleString('ru-RU')}</span>
                    </div>
                </div>
                <div class="result-note">
                    <p data-i18n="calc-result-note">${t['calc-result-note']}</p>
                </div>
            </div>
        `;
        
        creditResult.innerHTML = resultHTML;
        
        // Применяем переводы к новым элементам
        if (window.applyLanguage) {
            setTimeout(() => {
                window.applyLanguage(currentLang);
            }, 50);
        }
    });
}

// Tax Calculator
const taxForm = document.getElementById('taxForm');
const taxResult = document.getElementById('taxResult');

if (taxForm) {
    taxForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const annualIncome = parseFloat(document.getElementById('annualIncome').value);
        const region = document.getElementById('region').value;
        
        if (!annualIncome) {
            return;
        }
        
        // Tax calculations
        // IP: 6% (USN) or 15% (USN доходы-расходы)
        // Self-employed: 4% (services) or 6% (goods) for regular region, 1% or 2% for preferential
        
        const ipTaxUsn6 = annualIncome * 0.06;
        const ipTaxUsn15 = annualIncome * 0.15;
        
        let selfEmployedTax;
        if (region === 'preferential') {
            selfEmployedTax = annualIncome * 0.01; // 1% for services in preferential region
        } else {
            selfEmployedTax = annualIncome * 0.04; // 4% for services in regular region
        }
        
        // Получаем текущий язык
        const currentLang = document.documentElement.lang || 'ru';
        // Используем глобальный объект translations из settings.js
        const t = window.translations && window.translations[currentLang] ? window.translations[currentLang] : (window.translations && window.translations.ru ? window.translations.ru : {});
        
        const resultHTML = `
            <div class="result-content">
                <div class="result-header">
                    <h3 data-i18n="calc-tax-comparison">${t['calc-tax-comparison']}</h3>
                </div>
                <div class="tax-comparison">
                    <div class="tax-option">
                        <h4 data-i18n="calc-tax-ip">${t['calc-tax-ip']}</h4>
                        <div class="tax-options-list">
                            <div class="tax-option-item">
                                <span class="tax-option-name" data-i18n="calc-tax-usn6">${t['calc-tax-usn6']}</span>
                                <span class="tax-option-value">₽ ${Math.round(ipTaxUsn6).toLocaleString('ru-RU')}</span>
                            </div>
                            <div class="tax-option-item">
                                <span class="tax-option-name" data-i18n="calc-tax-usn15">${t['calc-tax-usn15']}</span>
                                <span class="tax-option-value">₽ ${Math.round(ipTaxUsn15).toLocaleString('ru-RU')}</span>
                            </div>
                        </div>
                    </div>
                    <div class="tax-option">
                        <h4 data-i18n="calc-tax-self-employed">${t['calc-tax-self-employed']}</h4>
                        <div class="tax-options-list">
                            <div class="tax-option-item">
                                <span class="tax-option-name" data-i18n="${region === 'preferential' ? 'calc-tax-region-pref' : 'calc-tax-region-std'}">${region === 'preferential' ? t['calc-tax-region-pref'] : t['calc-tax-region-std']}</span>
                                <span class="tax-option-value tax-option-best">₽ ${Math.round(selfEmployedTax).toLocaleString('ru-RU')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-note">
                    <p data-i18n="calc-tax-result-note">${t['calc-tax-result-note'] || '* Расчет является приблизительным. Для точного расчета обратитесь к специалисту'}</p>
                </div>
            </div>
        `;
        
        taxResult.innerHTML = resultHTML;
        
        // Применяем переводы к новым элементам
        if (window.applyLanguage) {
            setTimeout(() => {
                window.applyLanguage(currentLang);
            }, 50);
        }
    });
}

