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
    const partnerQuery = document.getElementById('partnerQuery');
    const partnersList = document.getElementById('partnersList');
    const partnerForm = document.getElementById('partnerForm');
    const addEventBtn = document.getElementById('addEventBtn');
    const filterEventsBtn = document.getElementById('filterEventsBtn');
    const eventsList = document.getElementById('eventsList');
    const newsActions = document.querySelectorAll('.news-action');
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
        { name: 'ООО "Логистик Плюс"', description: 'Грузоперевозки по России', category: 'логистика', rating: 4.8 },
        { name: 'ИП Иванов А.В.', description: 'Поставки канцелярии', category: 'поставки', rating: 4.5 },
        { name: 'Агентство "Маркетинг Про"', description: 'SMM и реклама', category: 'маркетинг', rating: 4.9 },
        { name: 'ООО "ТехСервис"', description: 'IT-поддержка бизнеса', category: 'технологии', rating: 4.7 },
        { name: 'ИП Петрова М.С.', description: 'Бухгалтерские услуги', category: 'бухгалтерия', rating: 4.6 }
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
    
    // Поиск партнеров
    if (partnerForm) {
        partnerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = partnerQuery.value.toLowerCase().trim();
            if (!query) {
                showToast('Введите запрос для поиска', 'error');
                return;
            }
            
            const filteredPartners = partnersData.filter(partner => 
                partner.name.toLowerCase().includes(query) ||
                partner.description.toLowerCase().includes(query) ||
                partner.category.toLowerCase().includes(query)
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
    
    // Добавление события
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            const title = prompt('Название мероприятия:');
            if (!title) return;
            
            const date = prompt('Дата (YYYY-MM-DD):');
            if (!date) return;
            
            const time = prompt('Время (HH:MM):');
            if (!time) return;
            
            const newEvent = {
                title,
                date,
                time,
                participants: 0
            };
            
            eventsData.unshift(newEvent);
            localStorage.setItem('community_events', JSON.stringify(eventsData));
            displayEvents();
            showToast('Мероприятие добавлено');
        });
    }
    
    // Фильтр мероприятий
    if (filterEventsBtn) {
        filterEventsBtn.addEventListener('click', () => {
            const filter = prompt('Фильтр по названию:');
            if (!filter) return;
            
            const filteredEvents = eventsData.filter(event => 
                event.title.toLowerCase().includes(filter.toLowerCase())
            );
            
            displayEvents(filteredEvents);
            showToast(`Найдено мероприятий: ${filteredEvents.length}`);
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
    newsActions.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                btn.textContent = 'Нравится';
                showToast('Лайк убран');
            } else {
                btn.classList.add('liked');
                btn.textContent = 'Нравится ✓';
                showToast('Лайк добавлен');
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
                showToast('Вы присоединились к обсуждению');
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

