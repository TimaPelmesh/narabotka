// Region functionality - copied from наработки
async function initRegion() {
  const mapBox = document.getElementById('mapBox');
  const officesList = document.getElementById('officesList');
  if (!mapBox || !officesList) return;

  const offices = [
    { 
      id: 'O1', 
      name: 'Центральный офис', 
      address: 'ул. Тверская, 12, стр. 1, Москва', 
      lead: 'Анна Петрова', 
      phone: '+7 (495) 123-45-67', 
      x: 18, 
      y: 20,
      services: ['Кредиты', 'ИП', 'Консультации'],
      workingHours: '9:00 - 21:00'
    },
    { 
      id: 'O2', 
      name: 'Филиал "Арбат"', 
      address: 'ул. Арбат, 25, Москва', 
      lead: 'Михаил Сидоров', 
      phone: '+7 (495) 234-56-78', 
      x: 75, 
      y: 35,
      services: ['ИП', 'Налоги'],
      workingHours: '10:00 - 20:00'
    },
    { 
      id: 'O3', 
      name: 'Филиал "Красная Площадь"', 
      address: 'Красная площадь, 1, Москва', 
      lead: 'Елена Козлова', 
      phone: '+7 (495) 345-67-89', 
      x: 85, 
      y: 75,
      services: ['VIP-обслуживание', 'Кредиты'],
      workingHours: '8:00 - 22:00'
    }
  ];

  function paintMap() {
    mapBox.innerHTML = '';
    
    // Добавляем фоновые элементы (дома и дороги)
    addMapBackground();
    
    // Добавляем маркеры офисов
    offices.forEach((office, index) => {
      const pin = document.createElement('div');
      pin.className = 'map-pin';
      pin.style.left = office.x + '%';
      pin.style.top = office.y + '%';
      pin.setAttribute('data-office', office.id);
      pin.setAttribute('title', `${office.name}\n${office.address}`);
      pin.setAttribute('role', 'button');
      pin.setAttribute('tabindex', '0');
      
      // Добавляем номер офиса на маркер
      const pinNumber = document.createElement('div');
      pinNumber.className = 'pin-number';
      pinNumber.textContent = index + 1;
      pin.appendChild(pinNumber);
      
      mapBox.appendChild(pin);
    });
  }

  function addMapBackground() {
    // Создаем дороги
    const roads = [
      { type: 'horizontal', top: '20%', left: '0%', width: '100%', height: '2px' },
      { type: 'horizontal', top: '40%', left: '0%', width: '100%', height: '2px' },
      { type: 'horizontal', top: '60%', left: '0%', width: '100%', height: '2px' },
      { type: 'horizontal', top: '80%', left: '0%', width: '100%', height: '2px' },
      { type: 'vertical', top: '0%', left: '20%', width: '2px', height: '100%' },
      { type: 'vertical', top: '0%', left: '40%', width: '2px', height: '100%' },
      { type: 'vertical', top: '0%', left: '60%', width: '2px', height: '100%' },
      { type: 'vertical', top: '0%', left: '80%', width: '2px', height: '100%' }
    ];

    roads.forEach(road => {
      const roadEl = document.createElement('div');
      roadEl.className = 'map-road';
      roadEl.style.position = 'absolute';
      roadEl.style.top = road.top;
      roadEl.style.left = road.left;
      roadEl.style.width = road.width;
      roadEl.style.height = road.height;
      roadEl.style.backgroundColor = '#e0e0e0';
      roadEl.style.zIndex = '1';
      mapBox.appendChild(roadEl);
    });

    // Создаем здания
    const buildings = [
      { top: '10%', left: '10%', width: '15%', height: '20%', color: '#d4d4d4' },
      { top: '30%', left: '70%', width: '20%', height: '25%', color: '#c8c8c8' },
      { top: '50%', left: '30%', width: '18%', height: '30%', color: '#d0d0d0' },
      { top: '70%', left: '60%', width: '25%', height: '15%', color: '#d8d8d8' },
      { top: '15%', left: '50%', width: '12%', height: '35%', color: '#cccccc' },
      { top: '60%', left: '10%', width: '16%', height: '25%', color: '#d6d6d6' }
    ];

    buildings.forEach(building => {
      const buildingEl = document.createElement('div');
      buildingEl.className = 'map-building';
      buildingEl.style.position = 'absolute';
      buildingEl.style.top = building.top;
      buildingEl.style.left = building.left;
      buildingEl.style.width = building.width;
      buildingEl.style.height = building.height;
      buildingEl.style.backgroundColor = building.color;
      buildingEl.style.borderRadius = '2px';
      buildingEl.style.zIndex = '1';
      mapBox.appendChild(buildingEl);
    });
  }

  function paintOffices() {
    officesList.innerHTML = '';
    offices.forEach((office, index) => {
      const card = document.createElement('div');
      card.className = 'office-card';
      card.innerHTML = `
        <div class="office-header">
          <div class="office-number">${index + 1}</div>
          <div class="office-name">${office.name}</div>
        </div>
        <div class="office-address">${office.address}</div>
        <div class="office-services">
          ${office.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
        </div>
        <div class="office-contact">
          <div class="office-lead">${office.lead}</div>
          <a href="tel:${office.phone}" class="office-phone">${office.phone}</a>
        </div>
        <div class="office-hours">${office.workingHours}</div>
      `;
      officesList.appendChild(card);
    });
  }

  let currentModal = null;

  paintMap();
  paintOffices();

  // Map pin interactions
  mapBox.addEventListener('click', (e) => {
    const pin = e.target.closest('.map-pin');
    if (!pin) return;
    
    const officeId = pin.getAttribute('data-office');
    const office = offices.find(o => o.id === officeId);
    if (!office) return;

    // Удаляем существующие модальные окна
    if (currentModal) {
      currentModal.remove();
      currentModal = null;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'office-modal-overlay';
    modal.innerHTML = `
      <div class="office-modal">
        <div class="office-modal-header">
          <h3>${office.name}</h3>
          <button class="office-modal-close" aria-label="Закрыть">&times;</button>
        </div>
        <div class="office-modal-content">
          <div class="office-info-section">
            <h4>Адрес</h4>
            <p>${office.address}</p>
          </div>
          <div class="office-info-section">
            <h4>Заведующий отделением</h4>
            <p>${office.lead}</p>
          </div>
          <div class="office-info-section">
            <h4>Номер телефона</h4>
            <p><a href="tel:${office.phone}" class="office-phone-link">${office.phone}</a></p>
          </div>
          <div class="office-info-section">
            <h4>Оказываемые услуги</h4>
            <div class="office-services-list">
              ${office.services.map(service => `<span class="office-service-tag">${service}</span>`).join('')}
            </div>
          </div>
          <div class="office-info-section">
            <h4>Часы работы</h4>
            <p>${office.workingHours}</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    currentModal = modal;
    
    const closeBtn = modal.querySelector('.office-modal-close');
    const overlay = modal;
    
    closeBtn.addEventListener('click', () => {
      modal.remove();
      currentModal = null;
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        modal.remove();
        currentModal = null;
      }
    });
  });

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal) {
      currentModal.remove();
      currentModal = null;
    }
  });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initRegion();
  });
} else {
  initRegion();
}

// Экспортируем для использования в других скриптах
if (typeof window !== 'undefined') {
  window.initRegion = initRegion;
}
