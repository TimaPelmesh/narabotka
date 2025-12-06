// Community functionality
(function() {
    'use strict';
    
    // Функция для показа уведомлений
    function showToast(message, type = 'success') {
        if (window.showToast) {
            window.showToast(message, type);
            return;
        }
        
        // Создаем простой toast, если глобальной функции нет
        const toast = document.createElement('div');
        toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: ' + (type === 'error' ? '#ef3124' : '#22c55e') + '; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-size: 14px;';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    const findPartnersBtn = document.getElementById('findPartnersBtn');
    const partnersList = document.getElementById('partnersList');
    const partnerForm = document.getElementById('partnerForm');
    const eventsList = document.getElementById('eventsList');
    const newsLikes = document.querySelectorAll('.news-like');
    const newsDislikes = document.querySelectorAll('.news-dislike');
    const discussionJoins = document.querySelectorAll('.discussion-join');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatPopup = document.getElementById('chatPopup');
    const chatPopupClose = document.getElementById('chatPopupClose');
    const chatPopupForm = document.getElementById('chatPopupForm');
    const chatPopupInput = document.getElementById('chatPopupInput');
    const chatPopupMessages = document.getElementById('chatPopupMessages');
    const chatBadge = document.getElementById('chatBadge');
    
    // Данные для партнеров
    const partnersData = [
        // Логистика
        { name: 'ООО "Логистик Плюс"', description: 'Грузоперевозки по России', category: 'логистика', rating: 4.8 },
        { name: 'ООО "ТрансЭкспресс"', description: 'Экспресс-доставка и складские услуги', category: 'логистика', rating: 4.6 },
        // Поставки
        { name: 'ИП Иванов А.В.', description: 'Поставки канцелярии', category: 'поставки', rating: 4.5 },
        { name: 'ООО "Снабжение+"', description: 'Оптовые поставки офисной техники', category: 'поставки', rating: 4.7 },
        // Маркетинг
        { name: 'Агентство "Маркетинг Про"', description: 'SMM и реклама', category: 'маркетинг', rating: 4.9 },
        { name: 'ООО "Digital Solutions"', description: 'Контекстная реклама и SEO', category: 'маркетинг', rating: 4.8 },
        // Технологии
        { name: 'ООО "ТехСервис"', description: 'IT-поддержка бизнеса', category: 'технологии', rating: 4.7 },
        { name: 'ООО "ВебСтудия"', description: 'Разработка сайтов и мобильных приложений', category: 'технологии', rating: 4.9 },
        // Бухгалтерия
        { name: 'ИП Петрова М.С.', description: 'Бухгалтерские услуги', category: 'бухгалтерия', rating: 4.6 },
        { name: 'ООО "БухУчет Про"', description: 'Ведение учета и налоговое планирование', category: 'бухгалтерия', rating: 4.8 },
        // Юридические услуги
        { name: 'ООО "ЮрКонсалт"', description: 'Корпоративное право и регистрация', category: 'юридические услуги', rating: 4.9 },
        { name: 'ИП Сидоров В.П.', description: 'Трудовое право и договоры', category: 'юридические услуги', rating: 4.7 },
        // Консалтинг
        { name: 'ООО "БизнесКонсалт"', description: 'Стратегическое планирование и аудит', category: 'консалтинг', rating: 4.8 },
        { name: 'ООО "ЭкспертГрупп"', description: 'Финансовый консалтинг и оптимизация', category: 'консалтинг', rating: 4.9 }
    ];
    
    // Данные для мероприятий
    let eventsData = JSON.parse(localStorage.getItem('community_events') || '[]');
    if (eventsData.length === 0) {
        eventsData = [
            { title: 'Нетворкинг для предпринимателей', date: '2025-01-15', time: '18:00', participants: 24 },
            { title: 'Семинар по налогообложению', date: '2025-01-20', time: '14:00', participants: 18 },
            { title: 'Встреча инвесторов', date: '2025-01-25', time: '19:00', participants: 12 }
        ];
        localStorage.setItem('community_events', JSON.stringify(eventsData));
    }
    
    const partnerCategory = document.getElementById('partnerCategory');
    
    // Поиск партнеров
    if (partnerForm) {
        partnerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const category = partnerCategory ? partnerCategory.value.toLowerCase().trim() : '';
            
            if (!category) {
                showToast('Выберите категорию для поиска', 'error');
                return;
            }
            
            // Фильтр по категории
            const filteredPartners = partnersData.filter(partner => 
                partner.category.toLowerCase() === category
            );
            
            displayPartners(filteredPartners);
            showToast(`Найдено партнеров: ${filteredPartners.length}`);
        });
    }
    
    // Отображение партнеров
    function displayPartners(partners) {
        if (!partnersList) return;
        partnersList.innerHTML = '';
        
        if (partners.length === 0) {
            partnersList.innerHTML = '<li class="muted">Партнеры не найдены</li>';
            return;
        }
        
        partners.forEach(partner => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="partner-item">
                    <div class="partner-info">
                        <strong>${partner.name}</strong>
                        <p>${partner.description}</p>
                        <span class="partner-rating">Рейтинг: ${partner.rating}/5</span>
                    </div>
                    <button class="btn btn-sm partner-contact">Связаться</button>
                </div>
            `;
            partnersList.appendChild(li);
        });
        
        // Добавляем обработчики для кнопок связи
        partnersList.querySelectorAll('.partner-contact').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Функция связи будет доступна в следующих версиях');
            });
        });
    }
    
    // Отображение мероприятий
    function displayEvents(events = eventsData) {
        if (!eventsList) return;
        eventsList.innerHTML = '';
        
        if (events.length === 0) {
            eventsList.innerHTML = '<li class="muted">Мероприятия не найдены</li>';
            return;
        }
        
        events.forEach(event => {
            const li = document.createElement('li');
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long'
            });
            
            li.innerHTML = `
                <div class="event-item">
                    <div class="event-info">
                        <strong>${event.title}</strong>
                        <p>${formattedDate} в ${event.time}</p>
                        <span class="event-participants">Участников: ${event.participants}</span>
                    </div>
                    <button class="btn btn-sm event-join">Записаться</button>
                </div>
            `;
            eventsList.appendChild(li);
        });
        
        // Добавляем обработчики для кнопок записи
        eventsList.querySelectorAll('.event-join').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Запись на мероприятие будет доступна в следующих версиях');
            });
        });
    }
    
    // Лайки новостей
    newsLikes.forEach(btn => {
        btn.addEventListener('click', () => {
            const newsItem = btn.closest('.news-item');
            const dislikeBtn = newsItem.querySelector('.news-dislike');
            
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                showToast('Лайк убран');
            } else {
                btn.classList.add('active');
                if (dislikeBtn && dislikeBtn.classList.contains('active')) {
                    dislikeBtn.classList.remove('active');
                }
                showToast('Лайк добавлен');
            }
        });
    });
    
    // Дизлайки новостей
    newsDislikes.forEach(btn => {
        btn.addEventListener('click', () => {
            const newsItem = btn.closest('.news-item');
            const likeBtn = newsItem.querySelector('.news-like');
            
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                showToast('Дизлайк убран');
            } else {
                btn.classList.add('active');
                if (likeBtn && likeBtn.classList.contains('active')) {
                    likeBtn.classList.remove('active');
                }
                showToast('Дизлайк добавлен');
            }
        });
    });
    
    // Присоединение к обсуждениям
    discussionJoins.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('joined')) {
                btn.classList.remove('joined');
                btn.textContent = 'Присоединиться';
                showToast('Вы покинули обсуждение');
            } else {
                btn.classList.add('joined');
                btn.textContent = 'Присоединились ✓';
                showToast('Вы скоро будете присоединены к обсуждению');
            }
        });
    });
    
    // Чат виджет
    if (chatToggleBtn && chatPopup) {
        chatToggleBtn.addEventListener('click', () => {
            const isOpen = chatPopup.style.display !== 'none';
            chatPopup.style.display = isOpen ? 'none' : 'block';
            if (chatBadge) chatBadge.style.display = 'none';
        });
    }
    
    if (chatPopupClose) {
        chatPopupClose.addEventListener('click', () => {
            if (chatPopup) chatPopup.style.display = 'none';
        });
    }
    
    if (chatPopupForm) {
        chatPopupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatPopupInput.value.trim();
            if (!message) return;
            
            // Добавляем сообщение пользователя
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">только что</span>
                </div>
            `;
            chatPopupMessages.appendChild(userMessage);
            chatPopupInput.value = '';
            
            // Автоответ AI
            setTimeout(() => {
                const aiMessage = document.createElement('div');
                aiMessage.className = 'message ai-message';
                aiMessage.innerHTML = `
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>Спасибо за ваш вопрос! Я обработаю его и отвечу в ближайшее время.</p>
                        <span class="message-time">только что</span>
                    </div>
                `;
                chatPopupMessages.appendChild(aiMessage);
                chatPopupMessages.scrollTop = chatPopupMessages.scrollHeight;
            }, 1000);
            
            chatPopupMessages.scrollTop = chatPopupMessages.scrollHeight;
        });
    }
    
    // Инициализация - показываем все мероприятия
    displayEvents();
    
    // Экспортируем функцию для использования в других скриптах
    if (typeof window !== 'undefined') {
        window.initCommunity = function() {
            displayEvents();
        };
    }
    
    // Вызываем инициализацию при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            displayEvents();
        });
    } else {
        displayEvents();
    }
})();

