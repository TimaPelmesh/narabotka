// Tooltips functionality
(function() {
    'use strict';
    
    function initTooltips() {
        const tooltipButtons = document.querySelectorAll('.info-tooltip-btn');
        
        tooltipButtons.forEach(btn => {
            const tooltipText = btn.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'info-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            let isVisible = false;
            
            function showTooltip(e) {
                if (isVisible) return;
                isVisible = true;
                
                const rect = btn.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                
                // Adjust if tooltip goes off screen
                setTimeout(() => {
                    const tooltipRect = tooltip.getBoundingClientRect();
                    if (tooltipRect.left < 10) {
                        tooltip.style.left = '10px';
                    }
                    if (tooltipRect.right > window.innerWidth - 10) {
                        tooltip.style.left = (window.innerWidth - tooltip.offsetWidth - 10) + 'px';
                    }
                    if (tooltipRect.top < 10) {
                        tooltip.style.top = rect.bottom + 8 + 'px';
                    }
                }, 0);
                
                tooltip.classList.add('show');
            }
            
            function hideTooltip() {
                if (!isVisible) return;
                isVisible = false;
                tooltip.classList.remove('show');
            }
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isVisible) {
                    hideTooltip();
                } else {
                    showTooltip(e);
                }
            });
            
            // Hide on outside click
            document.addEventListener('click', function(e) {
                if (!btn.contains(e.target) && !tooltip.contains(e.target)) {
                    hideTooltip();
                }
            });
            
            // Hide on escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isVisible) {
                    hideTooltip();
                }
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
})();

