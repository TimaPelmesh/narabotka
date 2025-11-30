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
  
  // Документы для отображения
  const documents = [
    { 
      name: 'Устав компании.pdf', 
      updated: 'вчера',
      icon: '📄',
      type: 'PDF',
      size: '2.3 МБ'
    },
    { 
      name: 'Выписка ЕГРИП.pdf', 
      updated: '3 дня назад',
      icon: '📋',
      type: 'PDF',
      size: '1.8 МБ'
    },
    { 
      name: 'Договор аренды.pdf', 
      updated: 'неделю назад',
      icon: '🏢',
      type: 'PDF',
      size: '3.1 МБ'
    },
    { 
      name: 'Лицензия на деятельность.pdf', 
      updated: '2 недели назад',
      icon: '📜',
      type: 'PDF',
      size: '1.2 МБ'
    },
    { 
      name: 'Справка об отсутствии задолженностей.pdf', 
      updated: 'месяц назад',
      icon: '✅',
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
    
    // Загружаем документы
    loadDocuments();
    
    isScanning = false;
    isUnlocked = true;
    
    const message = window.t ? window.t('toast-vault-unlocked') : 'Биометрическая аутентификация успешна';
    showToast(message);
  }
  
  function loadDocuments() {
    docsList.innerHTML = '';
    
    documents.forEach((doc, index) => {
      setTimeout(() => {
        const li = document.createElement('li');
        li.className = 'document-item';
        li.style.opacity = '0';
        li.style.transform = 'translateY(20px)';
        
        li.innerHTML = `
          <div class="document-icon">${doc.icon}</div>
          <div class="document-info">
            <div class="document-name">${doc.name}</div>
            <div class="document-meta">
              ${doc.type} • ${doc.size} • обновлено ${doc.updated}
            </div>
          </div>
        `;
        
        docsList.appendChild(li);
        
        // Анимация появления
        setTimeout(() => {
          li.style.transition = 'all 0.3s ease';
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 50);
      }, index * 150);
    });
  }
  
  function lockVault() {
    isUnlocked = false;
    vaultContent.style.display = 'none';
    bioBtn.style.display = 'flex';
    bioBtn.disabled = false;
    const btnText = bioBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = 'Разблокировать сейф';
    }
    
    // Очищаем список документов
    docsList.innerHTML = '';
    
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

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVault);
} else {
  initVault();
}

