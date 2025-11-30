// Support dialog functionality
const supportDialogBtn = document.getElementById('supportDialogBtn');
const supportDialogOverlay = document.getElementById('supportDialogOverlay');
const supportDialog = document.getElementById('supportDialog');
const supportDialogClose = document.getElementById('supportDialogClose');
const supportDialogCancel = document.getElementById('supportDialogCancel');
const supportForm = document.getElementById('supportForm');
const supportProblem = document.getElementById('supportProblem');
const problemSuggestions = document.getElementById('problemSuggestions');
const supportCategory = document.getElementById('supportCategory');

// Problem suggestions based on keywords
const problemKeywords = {
    'не работает': ['Проблема с отображением', 'Ошибка при загрузке', 'Не открывается страница'],
    'ошибка': ['Ошибка при выполнении операции', 'Системная ошибка', 'Ошибка ввода данных'],
    'не могу': ['Не могу войти', 'Не могу найти функцию', 'Не могу выполнить действие'],
    'медленно': ['Медленная загрузка', 'Долгая обработка запроса', 'Проблемы с производительностью'],
    'портфель': ['Проблема с отображением портфеля', 'Неверные данные портфеля', 'Ошибка в расчетах'],
    'график': ['График не отображается', 'Неправильные данные на графике', 'Проблема с масштабированием'],
    'настройки': ['Не сохраняются настройки', 'Проблема с изменением настроек', 'Ошибка в настройках'],
    'вход': ['Не могу войти в систему', 'Проблема с авторизацией', 'Забыл пароль'],
    'данные': ['Неверные данные', 'Данные не обновляются', 'Потеря данных']
};

// Auto-detect category based on problem description
function detectCategory(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('портфель') || lowerText.includes('инвестиц') || lowerText.includes('актив')) {
        return 'portfolio';
    } else if (lowerText.includes('вход') || lowerText.includes('авторизац') || lowerText.includes('пароль') || lowerText.includes('аккаунт')) {
        return 'account';
    } else if (lowerText.includes('ошибка') || lowerText.includes('не работает') || lowerText.includes('баг') || lowerText.includes('техническ')) {
        return 'technical';
    }
    return '';
}

// Show suggestions based on input
supportProblem.addEventListener('input', function() {
    const text = this.value.toLowerCase();
    problemSuggestions.innerHTML = '';
    
    if (text.length < 2) {
        return;
    }
    
    // Find matching keywords
    const matches = [];
    for (const [keyword, suggestions] of Object.entries(problemKeywords)) {
        if (text.includes(keyword)) {
            matches.push(...suggestions);
        }
    }
    
    // Auto-detect category
    const detectedCategory = detectCategory(this.value);
    if (detectedCategory) {
        supportCategory.value = detectedCategory;
    }
    
    // Show suggestions
    if (matches.length > 0) {
        const uniqueMatches = [...new Set(matches)].slice(0, 3);
        uniqueMatches.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'problem-suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', function() {
                supportProblem.value = suggestion;
                problemSuggestions.innerHTML = '';
                const detected = detectCategory(suggestion);
                if (detected) {
                    supportCategory.value = detected;
                }
            });
            problemSuggestions.appendChild(suggestionItem);
        });
    }
});

// Open dialog
if (supportDialogBtn) {
    supportDialogBtn.addEventListener('click', function() {
        supportDialogOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close dialog
function closeDialog() {
    supportDialogOverlay.classList.remove('active');
    document.body.style.overflow = '';
    supportForm.reset();
    problemSuggestions.innerHTML = '';
}

if (supportDialogClose) {
    supportDialogClose.addEventListener('click', closeDialog);
}

if (supportDialogCancel) {
    supportDialogCancel.addEventListener('click', closeDialog);
}

// Close on overlay click
supportDialogOverlay.addEventListener('click', function(e) {
    if (e.target === supportDialogOverlay) {
        closeDialog();
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && supportDialogOverlay.classList.contains('active')) {
        closeDialog();
    }
});

// Form submission
if (supportForm) {
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Auto-detect category if not selected
        if (!supportCategory.value) {
            const detected = detectCategory(supportProblem.value);
            if (detected) {
                supportCategory.value = detected;
            } else {
                supportCategory.value = 'other';
            }
        }
        
        // Show success message
        const message = window.t ? window.t('alert-support-thanks') : 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.';
        alert(message);
        closeDialog();
    });
}

// User menu functionality (from script.js)
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');

if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });

    const menuItems = userMenu.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            setTimeout(() => {
                userMenu.classList.remove('active');
            }, 100);
        });
    });
}

