// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const tableRows = document.querySelectorAll('.table-row');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter rows
        tableRows.forEach(row => {
            if (filter === 'all' || row.getAttribute('data-type') === filter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

