// Office functionality
(function() {
    'use strict';
    
    const goalEl = document.getElementById('goal');
    const docsWrap = document.getElementById('docs');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('visitTime');
    const arBtn = document.getElementById('arGuideBtn');
    const arHint = document.getElementById('arHint');
    const appointmentsList = document.getElementById('appointmentsList');
    const visitForm = document.getElementById('visitForm');
    
    const presets = {
        open_ip_credit: ['Заявление на регистрацию ИП', 'Паспорт', 'Заявка на кредит', 'Выписка по счёту'],
        open_ip: ['Заявление на регистрацию ИП', 'Паспорт'],
        credit: ['Заявка на кредит', 'Бизнес-план', 'Отчёт о прибылях и убытках'],
        consult_tax: ['История операций', 'Выписка по счёту']
    };
    
    const services = {
        ip: {
            name: 'Открытие ИП',
            duration: '30-45 мин',
            description: 'Полное сопровождение регистрации'
        },
        credit: {
            name: 'Кредитование',
            duration: '20-30 мин',
            description: 'Подбор и оформление кредита'
        },
        tax: {
            name: 'Налоговые консультации',
            duration: '15-25 мин',
            description: 'Помощь с налогообложением'
        },
        docs: {
            name: 'Документооборот',
            duration: '10-20 мин',
            description: 'Подготовка и подача документов'
        }
    };
    
    let appointments = JSON.parse(localStorage.getItem('office_appointments') || '[]');
    
    const goalServiceMap = {
        open_ip_credit: ['ip', 'credit'],
        open_ip: ['ip'],
        credit: ['credit'],
        consult_tax: ['tax']
    };
    
    // Initialize
    function init() {
        // Set minimum date to today
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        // Goal change handler
        if (goalEl) {
            goalEl.addEventListener('change', function() {
                const goal = this.value;
                if (docsWrap && presets[goal]) {
                    docsWrap.innerHTML = '';
                    presets[goal].forEach(doc => {
                        const chip = document.createElement('span');
                        chip.className = 'chip';
                        chip.textContent = doc;
                        docsWrap.appendChild(chip);
                    });
                }
            });
        }
        
        // AR button
        if (arBtn && arHint) {
            arBtn.addEventListener('click', function() {
                arHint.hidden = !arHint.hidden;
            });
        }
        
        // Form submission
        if (visitForm) {
            visitForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const goal = goalEl?.value;
                const date = dateInput?.value;
                const time = timeInput?.value;
                
                if (!goal || !date || !time) {
                    const message = window.t ? window.t('alert-fill-all-required') : 'Заполните все обязательные поля';
                    alert(message);
                    return;
                }
                
                const goalOption = goalEl.options[goalEl.selectedIndex];
                const serviceName = goalOption ? goalOption.textContent : 'Визит в офис';
                const linkedServices = goalServiceMap[goal] || [];
                const docsSummary = Array.from(docsWrap.querySelectorAll('.chip')).map(chip => chip.textContent).join(', ');
                
                const appointment = {
                    id: Date.now(),
                    serviceId: linkedServices[0] || null,
                    linkedServices,
                    serviceName,
                    date,
                    time,
                    duration: linkedServices[0] && services[linkedServices[0]] ? services[linkedServices[0]].duration : undefined,
                    notes: docsSummary,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };
                
                appointments.push(appointment);
                localStorage.setItem('office_appointments', JSON.stringify(appointments));
                renderAppointments();
                updateAllServiceButtons();
                
                const message = window.t ? window.t('alert-appointment-created') : 'Запись создана. Документы будут готовы ко времени визита.';
                alert(message);
                visitForm.reset();
                if (docsWrap) docsWrap.innerHTML = '';
            });
        }
        
        // Service buttons
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                if (serviceId && services[serviceId]) {
                    // Заполняем форму для выбранной услуги
                    if (goalEl) {
                        // Находим соответствующую цель
                        for (const [goal, serviceIds] of Object.entries(goalServiceMap)) {
                            if (serviceIds.includes(serviceId)) {
                                goalEl.value = goal;
                                goalEl.dispatchEvent(new Event('change'));
                                break;
                            }
                        }
                    }
                    // Прокручиваем к форме
                    if (visitForm) {
                        visitForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
        
        renderAppointments();
        updateAllServiceButtons();
    }
    
    function renderAppointments() {
        if (!appointmentsList) return;
        
        appointmentsList.innerHTML = '';
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p style="color: var(--alpha-dark-gray); padding: 16px;">Нет запланированных визитов</p>';
            return;
        }
        
        const sortedAppointments = [...appointments].sort((a, b) => {
            const dateA = new Date(a.date + ' ' + (a.time || '00:00'));
            const dateB = new Date(b.date + ' ' + (b.time || '00:00'));
            return dateA - dateB;
        });
        
        sortedAppointments.forEach(appointment => {
            const appointmentEl = document.createElement('div');
            appointmentEl.className = 'appointment-item';
            
            const dateObj = new Date(appointment.date);
            const dateStr = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            const statusClass = appointment.status === 'confirmed' ? 'confirmed' : 'pending';
            const statusText = appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает подтверждения';
            
            appointmentEl.innerHTML = `
                <div class="appointment-info">
                    <div class="appointment-title">${appointment.serviceName || 'Визит в офис'}</div>
                    <div class="appointment-date">${dateStr}${appointment.time ? ', ' + appointment.time : ''}</div>
                    <div class="appointment-status ${statusClass}">${statusText}</div>
                    ${appointment.notes ? `<div class="appointment-notes">${appointment.notes}</div>` : ''}
                </div>
                <div class="appointment-actions">
                    <button class="btn btn-sm appointment-cancel" data-id="${appointment.id}">Отменить</button>
                </div>
            `;
            
            appointmentsList.appendChild(appointmentEl);
        });
        
        // Add cancel handlers
        appointmentsList.querySelectorAll('.appointment-cancel').forEach(btn => {
            btn.addEventListener('click', function() {
                const appointmentId = parseInt(this.getAttribute('data-id'));
                const confirmMsg = window.t ? window.t('confirm-cancel-appointment') : 'Отменить запись?';
                if (confirm(confirmMsg)) {
                    appointments = appointments.filter(apt => apt.id !== appointmentId);
                    localStorage.setItem('office_appointments', JSON.stringify(appointments));
                    renderAppointments();
                    updateAllServiceButtons();
                }
            });
        });
    }
    
    function updateAllServiceButtons() {
        document.querySelectorAll('.service-btn').forEach(btn => {
            const serviceId = btn.getAttribute('data-service');
            if (!serviceId) return;
            
            const hasActiveAppointment = appointments.some(apt => {
                const relevantServices = apt.linkedServices && apt.linkedServices.length
                    ? apt.linkedServices
                    : (apt.serviceId ? [apt.serviceId] : []);
                if (!relevantServices.includes(serviceId)) return false;
                const appointmentDateTime = new Date(apt.date + ' ' + (apt.time || '00:00'));
                return appointmentDateTime > new Date();
            });
            
            if (hasActiveAppointment) {
                btn.disabled = true;
                btn.textContent = 'Записано';
                btn.classList.add('disabled');
            } else {
                btn.disabled = false;
                btn.textContent = 'Записаться';
                btn.classList.remove('disabled');
            }
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

