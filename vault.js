// Vault functionality - биометрический доступ к документам

function initVault() {
  const bioBtn = document.getElementById('bioAccess');
  const scannerFrame = document.getElementById('biometricScanner');
  const scannerOverlay = document.getElementById('scannerOverlay');
  const scannerLine = document.getElementById('scannerLine');
  const vaultContent = document.getElementById('vaultContent');
  const docsList = document.getElementById('docsList');
  const lockBtn = document.getElementById('lockVault');
  
  if (!bioBtn || !scannerFrame || !vaultContent || !docsList) {
    return; // Элементы не найдены
  }
  
  let isScanning = false;
  let isUnlocked = false;
  let documentTimeouts = []; // Массив для хранения таймеров загрузки документов
  let isLoadingDocuments = false; // Флаг для предотвращения параллельной загрузки
  
  // Функция для получения SVG иконки документа
  function getDocumentIcon(iconType) {
    const icons = {
      'document': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 2V8H20" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 13H8" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 17H8" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 9H8" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      'clipboard': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12H15" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M9 16H15" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      'building': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21H21" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M5 21V7L12 3L19 7V21" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 9V13" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M9 17V21" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 9V13" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 17V21" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M9 13H15" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      'certificate': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 2V7H20" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 11L13.5 12.5L16 10" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 15H16" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 18H14" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      'check': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 2H15C16.1046 2 17 2.89543 17 4V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20V4C7 2.89543 7.89543 2 9 2Z" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 6H15" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 10L12 12L14 10" stroke="#EF3124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 16H14" stroke="#EF3124" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    };
    return icons[iconType] || icons['document'];
  }
  
  // Документы для отображения
  const documents = [
    { 
      name: 'Устав компании.pdf', 
      updated: 'вчера',
      iconType: 'document',
      type: 'PDF',
      size: '2.3 МБ'
    },
    { 
      name: 'Выписка ЕГРИП.pdf', 
      updated: '3 дня назад',
      iconType: 'clipboard',
      type: 'PDF',
      size: '1.8 МБ'
    },
    { 
      name: 'Договор аренды.pdf', 
      updated: 'неделю назад',
      iconType: 'building',
      type: 'PDF',
      size: '3.1 МБ'
    },
    { 
      name: 'Лицензия на деятельность.pdf', 
      updated: '2 недели назад',
      iconType: 'certificate',
      type: 'PDF',
      size: '1.2 МБ'
    },
    { 
      name: 'Справка об отсутствии задолженностей.pdf', 
      updated: 'месяц назад',
      iconType: 'check',
      type: 'PDF',
      size: '0.8 МБ'
    }
  ];
  
  function startScanning() {
    if (isScanning || isUnlocked) return;
    
    isScanning = true;
    bioBtn.disabled = true;
    const btnText = bioBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = 'Сканирование...';
    }
    
    // Активируем анимацию сканирования
    if (scannerFrame) {
      scannerFrame.classList.add('scanning');
    }
    if (scannerOverlay) {
      scannerOverlay.classList.add('active');
    }
    
    // Имитируем процесс сканирования
    setTimeout(() => {
      completeScanning();
    }, 4000);
  }
  
  function completeScanning() {
    // Предотвращаем повторное выполнение
    if (isUnlocked) {
      return;
    }
    
    // Останавливаем анимацию
    if (scannerFrame) {
      scannerFrame.classList.remove('scanning');
    }
    if (scannerOverlay) {
      scannerOverlay.classList.remove('active');
    }
    
    // Скрываем кнопку и показываем контент
    bioBtn.style.display = 'none';
    vaultContent.style.display = 'block';
    
    // Устанавливаем флаги перед загрузкой
    isScanning = false;
    isUnlocked = true;
    
    // Загружаем документы только если список пуст
    if (docsList && docsList.children.length === 0) {
      loadDocuments();
    }
    
    const message = window.t ? window.t('toast-vault-unlocked') : 'Биометрическая аутентификация успешна';
    showToast(message);
  }
  
  function loadDocuments() {
    // Предотвращаем параллельную загрузку
    if (isLoadingDocuments) {
      return;
    }
    
    isLoadingDocuments = true;
    
    // Очищаем все предыдущие таймеры, чтобы избежать дублирования
    documentTimeouts.forEach(timeout => clearTimeout(timeout));
    documentTimeouts = [];
    
    // Очищаем список документов
    if (docsList) {
      docsList.innerHTML = '';
    }
    
    // Проверяем, что список пуст перед добавлением
    if (!docsList || docsList.children.length > 0) {
      isLoadingDocuments = false;
      return;
    }
    
    documents.forEach((doc, index) => {
      const timeout = setTimeout(() => {
        // Проверяем, что элемент еще не добавлен
        if (!docsList || docsList.querySelector(`li[data-doc-name="${doc.name}"]`)) {
          return;
        }
        
        const li = document.createElement('li');
        li.className = 'document-item';
        li.setAttribute('data-doc-name', doc.name);
        li.style.opacity = '0';
        li.style.transform = 'translateY(20px)';
        
        li.innerHTML = `
          <div class="document-icon">${getDocumentIcon(doc.iconType)}</div>
          <div class="document-info">
            <div class="document-name">${doc.name}</div>
            <div class="document-meta">
              ${doc.type} • ${doc.size} • обновлено ${doc.updated}
            </div>
          </div>
        `;
        
        docsList.appendChild(li);
        
        // Анимация появления
        const animTimeout = setTimeout(() => {
          li.style.transition = 'all 0.3s ease';
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 50);
        documentTimeouts.push(animTimeout);
      }, index * 150);
      
      documentTimeouts.push(timeout);
    });
    
    // Сбрасываем флаг после завершения всех таймеров
    const maxTimeout = documents.length * 150 + 300;
    setTimeout(() => {
      isLoadingDocuments = false;
    }, maxTimeout);
  }
  
  function lockVault() {
    // Очищаем все таймеры перед блокировкой
    documentTimeouts.forEach(timeout => clearTimeout(timeout));
    documentTimeouts = [];
    
    // Сбрасываем флаг загрузки
    isLoadingDocuments = false;
    
    isUnlocked = false;
    vaultContent.style.display = 'none';
    bioBtn.style.display = 'flex';
    bioBtn.disabled = false;
    const btnText = bioBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = 'Разблокировать сейф';
    }
    
    // Очищаем список документов
    if (docsList) {
      docsList.innerHTML = '';
    }
    
    const message = window.t ? window.t('toast-vault-locked') : 'Сейф заблокирован';
    showToast(message);
  }
  
  // Обработчики событий
  bioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startScanning();
  });
  
  if (lockBtn) {
    lockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      lockVault();
    });
  }
  
  // Добавляем hover эффект для сканера
  if (scannerFrame) {
    scannerFrame.addEventListener('mouseenter', () => {
      if (!isScanning && !isUnlocked) {
        scannerFrame.style.borderColor = '#d1d5db';
        scannerFrame.style.transform = 'scale(1.02)';
      }
    });
    
    scannerFrame.addEventListener('mouseleave', () => {
      if (!isScanning && !isUnlocked) {
        scannerFrame.style.borderColor = '#e5e7eb';
        scannerFrame.style.transform = 'scale(1)';
      }
    });
  }
}

// Функция для показа уведомлений
function ensureToastRoot() {
  let root = document.getElementById('toast-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'toast-root';
    root.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 12px; pointer-events: none;';
    document.body.appendChild(root);
  }
  return root;
}

function showToast(message, type = 'success') {
  const root = ensureToastRoot();
  const el = document.createElement('div');
  el.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  el.setAttribute('role', 'status');
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 250);
  }, 2200);
}

// Инициализация при загрузке страницы (только один раз)
let vaultInitialized = false;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!vaultInitialized) {
      vaultInitialized = true;
      initVault();
    }
  });
} else {
  if (!vaultInitialized) {
    vaultInitialized = true;
    initVault();
  }
}

