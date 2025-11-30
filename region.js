// Region functionality
(function() {
    'use strict';
    
    const officesList = document.getElementById('officesList');
    const mapBox = document.getElementById('mapBox');
    
    const offices = [
        {
            id: 1,
            name: 'Центральный офис',
            address: 'Москва, ул. Тверская, д. 12',
            phone: '+7 (495) 123-45-67',
            hours: 'Пн-Пт: 9:00 - 20:00',
            services: ['Кредитование', 'Инвестиции', 'Консультации'],
            coordinates: { lat: 55.7558, lng: 37.6173 }
        },
        {
            id: 2,
            name: 'Офис на Арбате',
            address: 'Москва, ул. Арбат, д. 25',
            phone: '+7 (495) 234-56-78',
            hours: 'Пн-Пт: 10:00 - 19:00',
            services: ['Кредитование', 'Консультации'],
            coordinates: { lat: 55.7520, lng: 37.5920 }
        },
        {
            id: 3,
            name: 'Офис в БЦ "Москва-Сити"',
            address: 'Москва, Пресненская наб., д. 8',
            phone: '+7 (495) 345-67-89',
            hours: 'Пн-Пт: 9:00 - 18:00',
            services: ['Инвестиции', 'Премиум-обслуживание'],
            coordinates: { lat: 55.7489, lng: 37.5369 }
        },
        {
            id: 4,
            name: 'Офис на Ленинском',
            address: 'Москва, Ленинский пр-т, д. 100',
            phone: '+7 (495) 456-78-90',
            hours: 'Пн-Пт: 9:00 - 20:00, Сб: 10:00 - 16:00',
            services: ['Кредитование', 'Инвестиции', 'Консультации'],
            coordinates: { lat: 55.6892, lng: 37.5528 }
        },
        {
            id: 5,
            name: 'Офис в Сколково',
            address: 'Москва, Сколково, ул. Нобеля, д. 5',
            phone: '+7 (495) 567-89-01',
            hours: 'Пн-Пт: 9:00 - 18:00',
            services: ['Инвестиции', 'Консультации'],
            coordinates: { lat: 55.7000, lng: 37.4000 }
        }
    ];
    
    function init() {
        renderOffices();
        initMap();
    }
    
    function renderOffices() {
        if (!officesList) return;
        
        officesList.innerHTML = '';
        
        offices.forEach(office => {
            const officeEl = document.createElement('div');
            officeEl.className = 'office-item';
            officeEl.dataset.officeId = office.id;
            
            officeEl.innerHTML = `
                <div class="office-header">
                    <h3 class="office-name">${office.name}</h3>
                    <button class="office-toggle" aria-label="Показать детали">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="office-details" style="display: none;">
                    <div class="office-info">
                        <div class="office-info-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span>${office.address}</span>
                        </div>
                        <div class="office-info-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9841 21.5573 21.2126 21.352 21.3992C21.1467 21.5858 20.9041 21.7262 20.6397 21.8116C20.3752 21.897 20.0952 21.9254 19.82 21.895C16.7428 21.6046 13.787 20.4271 11.19 18.465C8.77382 16.6631 6.72533 14.4045 5.17 11.82C3.24738 8.50662 2.00394 4.77159 1.52 0.895004C1.48958 0.619508 1.51826 0.33978 1.60395 0.0755382C1.68965 -0.188703 1.8303 -0.431039 2.017 -0.636004C2.2037 -0.840969 2.43233 -1.00405 2.68733 -1.115C2.94233 -1.22595 3.21809 -1.28219 3.49659 -1.28001C3.77509 -1.27782 4.04991 -1.21735 4.30299 -1.10201L7.15299 2.14201C7.52046 2.342 7.81699 2.64248 8.00874 3.00473C8.20049 3.36698 8.28028 3.77454 8.23999 4.17801L7.75999 7.87801C7.71099 8.27226 7.76318 8.67107 7.91099 9.03801C8.05881 9.40495 8.29728 9.72739 8.60299 9.97201L11.143 12.142C11.4487 12.3866 11.7871 12.6251 12.153 12.773C12.5199 12.9208 12.9187 12.973 13.313 12.924L17.013 12.444C17.4164 12.4037 17.824 12.4835 18.1862 12.6752C18.5485 12.867 18.849 13.1635 19.049 13.531L22.089 16.381C22.4643 16.619 22.7806 16.9401 22.9999 17.3128C23.2192 17.6855 23.3361 18.0994 23.34 18.52L22.34 18.52Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${office.phone}</span>
                        </div>
                        <div class="office-info-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>${office.hours}</span>
                        </div>
                    </div>
                    <div class="office-services">
                        <div class="office-services-label">Услуги:</div>
                        <div class="office-services-list">
                            ${office.services.map(service => `<span class="office-service-tag">${service}</span>`).join('')}
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm office-select-btn" data-office-id="${office.id}">Выбрать офис</button>
                </div>
            `;
            
            officesList.appendChild(officeEl);
        });
        
        // Add toggle handlers
        officesList.querySelectorAll('.office-toggle').forEach(btn => {
            btn.addEventListener('click', function() {
                const officeItem = this.closest('.office-item');
                const details = officeItem.querySelector('.office-details');
                const isOpen = details.style.display !== 'none';
                
                details.style.display = isOpen ? 'none' : 'block';
                this.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });
        
        // Add select handlers
        officesList.querySelectorAll('.office-select-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const officeId = parseInt(this.getAttribute('data-office-id'));
                const office = offices.find(o => o.id === officeId);
                if (office) {
                    const officeSelected = window.t ? window.t('alert-office-selected') : 'Выбран офис';
                    alert(`${officeSelected}: ${office.name}\n${office.address}`);
                }
            });
        });
    }
    
    function initMap() {
        if (!mapBox) return;
        
        // Простая интерактивная карта с маркерами
        const mapContent = document.createElement('div');
        mapContent.className = 'map-content';
        mapContent.innerHTML = `
            <div class="map-markers">
                ${offices.map((office, index) => `
                    <div class="map-marker" style="left: ${20 + index * 15}%; top: ${30 + index * 10}%;" data-office-id="${office.id}">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">${office.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        mapBox.innerHTML = '';
        mapBox.appendChild(mapContent);
        
        // Add marker click handlers
        mapContent.querySelectorAll('.map-marker').forEach(marker => {
            marker.addEventListener('click', function() {
                const officeId = parseInt(this.getAttribute('data-office-id'));
                const office = offices.find(o => o.id === officeId);
                if (office) {
                    // Scroll to office in list
                    const officeItem = document.querySelector(`.office-item[data-office-id="${officeId}"]`);
                    if (officeItem) {
                        officeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Open details
                        const details = officeItem.querySelector('.office-details');
                        const toggle = officeItem.querySelector('.office-toggle');
                        if (details && toggle) {
                            details.style.display = 'block';
                            toggle.style.transform = 'rotate(180deg)';
                        }
                    }
                }
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

