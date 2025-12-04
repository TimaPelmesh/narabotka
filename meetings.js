// Meetings functionality - полная интерактивность из наработок
(function() {
    'use strict';
    
    const calendar = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const addMeetingBtn = document.getElementById('addMeetingBtn');
    const meetingModal = document.getElementById('meetingModal');
    const closeMeetingModal = document.getElementById('closeMeetingModal');
    const cancelMeetingBtn = document.getElementById('cancelMeetingBtn');
    const meetingForm = document.getElementById('meetingForm');
    const meetingsList = document.getElementById('meetingsList');
    const modalTitle = document.getElementById('modalTitle');
    const totalMeetings = document.getElementById('totalMeetings');
    const weekMeetings = document.getElementById('weekMeetings');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    let editingId = null;
    
    // Month names
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    // Room names mapping
    const roomNames = {
        'R1': 'Переговорная 1',
        'R2': 'Переговорная 2',
        'R3': 'Переговорная 3'
    };
    
    const equipmentNames = {
        'E1': 'Проектор',
        'E2': 'Доска/флипчарт',
        'E3': 'Видеоконференция'
    };
    
    // Initialize
    function init() {
        if (!calendar) return;
        
        // Populate month and year selects
        populateMonthSelect();
        populateYearSelect();
        
        // Build calendar
        buildCalendar();
        renderEvents();
        
        // Render meetings
        renderMeetings();
        updateStats();
        
        // Event listeners
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateSelects();
            buildCalendar();
            renderEvents();
        });
        
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateSelects();
            buildCalendar();
            renderEvents();
        });
        
        if (monthSelect) monthSelect.addEventListener('change', (e) => {
            currentMonth = parseInt(e.target.value);
            buildCalendar();
            renderEvents();
        });
        
        if (yearSelect) yearSelect.addEventListener('change', (e) => {
            currentYear = parseInt(e.target.value);
            buildCalendar();
            renderEvents();
        });
        
        if (addMeetingBtn) addMeetingBtn.addEventListener('click', () => openModal());
        if (closeMeetingModal) closeMeetingModal.addEventListener('click', closeModal);
        if (cancelMeetingBtn) cancelMeetingBtn.addEventListener('click', closeModal);
        
        if (meetingForm) {
            meetingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                saveMeeting();
            });
        }
        
        // Close modal on overlay click
        if (meetingModal) {
            meetingModal.addEventListener('click', (e) => {
                if (e.target === meetingModal) closeModal();
            });
        }
        
        // Close modal on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && meetingModal && meetingModal.style.display !== 'none') {
                closeModal();
            }
        });
        
        // Toggle switches
        document.addEventListener('click', (e) => {
            const s = e.target.closest('.switch');
            if (!s) return;
            s.classList.toggle('on');
        });
    }
    
    function populateMonthSelect() {
        if (!monthSelect) return;
        monthSelect.innerHTML = '';
        monthNames.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            if (index === currentMonth) option.selected = true;
            monthSelect.appendChild(option);
        });
    }
    
    function populateYearSelect() {
        if (!yearSelect) return;
        yearSelect.innerHTML = '';
        const currentYearNum = new Date().getFullYear();
        for (let i = currentYearNum - 2; i <= currentYearNum + 2; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }
    }
    
    function updateSelects() {
        if (monthSelect) monthSelect.value = currentMonth;
        if (yearSelect) yearSelect.value = currentYear;
    }
    
    function buildCalendar() {
        if (!calendar) return;
        
        calendar.innerHTML = '';
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        
        // Day names
        const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-name';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });
        
        // Empty cells for days before month start
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendar.appendChild(emptyCell);
        }
        
        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayCell.dataset.date = dateStr;
            
            const hasMeeting = meetings.some(m => m.date === dateStr);
            
            if (hasMeeting) dayCell.classList.add('has-meeting');
            
            if (currentYear === today.getFullYear() && 
                currentMonth === today.getMonth() && 
                day === today.getDate()) {
                dayCell.classList.add('today');
            }
            
            dayCell.textContent = day;
            calendar.appendChild(dayCell);
        }
    }
    
    function renderEvents() {
        if (!calendar) return;
        
        // Удаляем все элементы с текстом встреч (если они были добавлены ранее)
        // Цветовая индикация уже добавлена в buildCalendar через класс has-meeting
        // Текст названия встречи не добавляем - только визуальная пометка (цвет и точка)
        calendar.querySelectorAll('.event').forEach(e => e.remove());
    }
    
    function renderMeetings() {
        if (!meetingsList) return;
        
        meetingsList.innerHTML = '';
        
        if (meetings.length === 0) {
            meetingsList.innerHTML = '<li class="meeting-item"><div class="meeting-info">Нет запланированных встреч</div></li>';
            return;
        }
        
        // Sort meetings by date and time
        const sortedMeetings = [...meetings].sort((a, b) => {
            const dateA = new Date(a.date + ' ' + (a.time || '00:00'));
            const dateB = new Date(b.date + ' ' + (b.time || '00:00'));
            return dateA - dateB;
        });
        
        sortedMeetings.forEach(meeting => {
            const li = document.createElement('li');
            li.className = 'meeting-item';
            
            const dateObj = new Date(meeting.date);
            const dateStr = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            
            const roomsText = meeting.rooms && meeting.rooms.length 
                ? meeting.rooms.map(r => roomNames[r] || r).join(', ')
                : '';
            const equipmentText = meeting.equipment && meeting.equipment.length
                ? meeting.equipment.map(e => equipmentNames[e] || e).join(', ')
                : '';
            
            li.innerHTML = `
                <div class="meeting-info">
                    <div class="meeting-title">${meeting.title || 'Встреча'}</div>
                    <div class="meeting-details">
                        ${dateStr} в ${meeting.time || ''}
                        ${roomsText ? ` • ${roomsText}` : ''}
                        ${equipmentText ? ` • ${equipmentText}` : ''}
                    </div>
                    ${meeting.notes ? `<div class="meeting-details">${meeting.notes}</div>` : ''}
                </div>
                <div class="meeting-actions">
                    <button class="btn btn-sm" onclick="editMeeting(${meeting.id})">Изменить</button>
                    <button class="btn btn-sm" onclick="deleteMeeting(${meeting.id})" style="color: #dc2626;">Удалить</button>
                </div>
            `;
            
            meetingsList.appendChild(li);
        });
        
        updateStats();
    }
    
    function updateStats() {
        if (totalMeetings) totalMeetings.textContent = meetings.length;
        
        if (weekMeetings) {
            const now = new Date();
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay() + 1);
            weekStart.setHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            
            const weekCount = meetings.filter(m => {
                const meetingDate = new Date(m.date);
                return meetingDate >= weekStart && meetingDate <= weekEnd;
            }).length;
            
            weekMeetings.textContent = weekCount;
        }
    }
    
    function openModal(meeting = null) {
        if (!meetingModal) return;
        
        editingId = meeting ? meeting.id : null;
        
        if (modalTitle) {
            modalTitle.textContent = meeting ? 'Изменить встречу' : 'Добавить встречу';
        }
        
        if (meeting) {
            const titleEl = document.getElementById('meetTitle');
            const dateEl = document.getElementById('meetDate');
            const timeEl = document.getElementById('meetTime');
            const notesEl = document.getElementById('meetNotes');
            
            if (titleEl) titleEl.value = meeting.title || '';
            if (dateEl) dateEl.value = meeting.date || '';
            if (timeEl) timeEl.value = meeting.time || '';
            if (notesEl) notesEl.value = meeting.notes || '';
            
            // Reset switches
            document.querySelectorAll('.switch').forEach(s => s.classList.remove('on'));
            
            // Set selected rooms
            if (meeting.rooms) {
                meeting.rooms.forEach(roomId => {
                    const switchEl = document.querySelector(`.switch[data-id="${roomId}"]`);
                    if (switchEl) switchEl.classList.add('on');
                });
            }
            
            // Set selected equipment
            if (meeting.equipment) {
                meeting.equipment.forEach(eqId => {
                    const switchEl = document.querySelector(`.switch[data-id="${eqId}"]`);
                    if (switchEl) switchEl.classList.add('on');
                });
            }
        } else {
            if (meetingForm) meetingForm.reset();
            document.querySelectorAll('.switch').forEach(s => s.classList.remove('on'));
        }
        
        meetingModal.hidden = false;
        meetingModal.style.display = 'flex';
        document.body.classList.add('scroll-lock');
    }
    
    function closeModal() {
        if (!meetingModal) return;
        
        meetingModal.hidden = true;
        meetingModal.style.display = 'none';
        document.body.classList.remove('scroll-lock');
        
        if (meetingForm) meetingForm.reset();
        document.querySelectorAll('.switch').forEach(s => s.classList.remove('on'));
        editingId = null;
    }
    
    function saveMeeting() {
        const titleEl = document.getElementById('meetTitle');
        const dateEl = document.getElementById('meetDate');
        const timeEl = document.getElementById('meetTime');
        const notesEl = document.getElementById('meetNotes');
        
        const title = titleEl?.value?.trim();
        const date = dateEl?.value;
        const time = timeEl?.value;
        const notes = notesEl?.value?.trim();
        
        if (!title || !date || !time) {
            const message = window.t ? window.t('alert-fill-required') : 'Заполните обязательные поля: название, дата и время';
            if (window.showToast) {
                showToast(message, 'error');
            } else {
                alert(message);
            }
            return;
        }
        
        const selectedRooms = Array.from(document.querySelectorAll('.room-selection .switch.on')).map(r => r.dataset.id);
        const selectedEquipment = Array.from(document.querySelectorAll('.equipment-selection .switch.on')).map(e => e.dataset.id);
        
        const meetingData = {
            title,
            date,
            time,
            notes,
            rooms: selectedRooms,
            equipment: selectedEquipment
        };
        
        if (editingId) {
            const index = meetings.findIndex(m => m.id === editingId);
            if (index !== -1) {
                meetings[index] = { ...meetingData, id: editingId };
                if (window.showToast) showToast(window.t ? window.t('toast-meeting-updated') : 'Встреча изменена');
            }
        } else {
            meetings.push({ ...meetingData, id: Date.now() });
                if (window.showToast) showToast(window.t ? window.t('toast-meeting-saved') : 'Встреча добавлена');
        }
        
        localStorage.setItem('meetings', JSON.stringify(meetings));
        renderMeetings();
        buildCalendar();
        renderEvents();
        closeModal();
    }
    
    // Global functions for inline handlers
    window.editMeeting = function(id) {
        const meeting = meetings.find(m => m.id === id);
        if (meeting) openModal(meeting);
    };
    
    window.deleteMeeting = function(id) {
        const confirmMsg = window.t ? window.t('confirm-delete-meeting') : 'Удалить встречу?';
        if (confirm(confirmMsg)) {
            meetings = meetings.filter(m => m.id !== id);
            localStorage.setItem('meetings', JSON.stringify(meetings));
            renderMeetings();
            buildCalendar();
            renderEvents();
            if (window.showToast) showToast(window.t ? window.t('toast-meeting-deleted') : 'Встреча удалена');
        }
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
