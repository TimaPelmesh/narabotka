// Tooltips functionality
(function() {
    'use strict';
    
    // Store all tooltip instances
    const tooltipInstances = [];
    
    // Global function to hide all visible tooltips
    function hideAllTooltips() {
        tooltipInstances.forEach(instance => {
            if (instance.isVisible) {
                instance.hideTooltip();
            }
        });
    }
    
    function initTooltips() {
        const tooltipButtons = document.querySelectorAll('.info-tooltip-btn');
        
        tooltipButtons.forEach(btn => {
            const tooltipText = btn.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            // Find the stat-card parent for reference
            const statCard = btn.closest('.stat-card');
            
            // Create tooltip element and add to body for proper z-index stacking
            const tooltip = document.createElement('div');
            tooltip.className = 'info-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            let isVisible = false;
            
            function showTooltip(e) {
                if (isVisible) return;
                isVisible = true;
                
                const btnRect = btn.getBoundingClientRect();
                
                // Position relative to viewport (since tooltip is in body)
                const left = btnRect.left + (btnRect.width / 2);
                const top = btnRect.top - 8;
                
                // Set initial position (will be animated by CSS)
                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
                
                // Show tooltip (CSS will handle animation)
                tooltip.classList.add('show');
                
                // Adjust if tooltip goes off screen after it's visible
                requestAnimationFrame(() => {
                    const tooltipRect = tooltip.getBoundingClientRect();
                    
                    // Adjust horizontal position
                    if (tooltipRect.left < 10) {
                        tooltip.style.left = '10px';
                        tooltip.style.transform = 'translateY(-100%)';
                    } else if (tooltipRect.right > window.innerWidth - 10) {
                        tooltip.style.left = (window.innerWidth - 10) + 'px';
                        tooltip.style.transform = 'translateX(-100%) translateY(-100%)';
                    }
                    
                    // Adjust vertical position
                    if (tooltipRect.top < 10) {
                        tooltip.style.top = btnRect.bottom + 8 + 'px';
                        tooltip.style.transform = 'translateX(-50%)';
                    }
                    
                    // If tooltip would go outside stat-card bounds, adjust
                    if (statCard) {
                        const cardRect = statCard.getBoundingClientRect();
                        if (tooltipRect.left < cardRect.left + 10) {
                            tooltip.style.left = (cardRect.left + 10) + 'px';
                            tooltip.style.transform = 'translateY(-100%)';
                        }
                        if (tooltipRect.right > cardRect.right - 10) {
                            tooltip.style.left = (cardRect.right - 10) + 'px';
                            tooltip.style.transform = 'translateX(-100%) translateY(-100%)';
                        }
                    }
                });
            }
            
            function hideTooltip() {
                if (!isVisible) return;
                isVisible = false;
                tooltip.classList.remove('show');
            }
            
            // Store instance for global access
            const instance = {
                get isVisible() { return isVisible; },
                hideTooltip: hideTooltip,
                btn: btn,
                tooltip: tooltip
            };
            
            tooltipInstances.push(instance);
            
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
        });
        
        // Global handlers (only add once)
        if (tooltipInstances.length > 0 && !window._tooltipGlobalHandlersAdded) {
            window._tooltipGlobalHandlersAdded = true;
            
            // Hide on escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    hideAllTooltips();
                }
            });
            
            // Hide on scroll
            window.addEventListener('scroll', function() {
                hideAllTooltips();
            }, true); // Use capture phase to catch all scroll events
            
            // Hide on touch start/move (mobile scrolling)
            let touchStartY = 0;
            let touchStartTime = 0;
            
            document.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
                touchStartTime = Date.now();
            }, { passive: true });
            
            document.addEventListener('touchmove', function(e) {
                const touchY = e.touches[0].clientY;
                const deltaY = Math.abs(touchY - touchStartY);
                // If user is scrolling (moving finger more than 5px)
                if (deltaY > 5) {
                    hideAllTooltips();
                }
            }, { passive: true });
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
})();

