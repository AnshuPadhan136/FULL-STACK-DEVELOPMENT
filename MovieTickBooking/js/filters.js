// js/filters.js

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('filteredMoviesGrid')) return;

    const movies = window.MOVIES || [];
    const grid = document.getElementById('filteredMoviesGrid');
    const noResults = document.getElementById('noResults');
    const countDisplay = document.getElementById('resultsCount');
    
    // UI Elements
    const searchInput = document.getElementById('moviesSearch');
    const genreContainer = document.getElementById('genreFilters');
    const langSelect = document.getElementById('languageFilter');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    const clearBtn = document.getElementById('clearFilters');

    // Extract all unique genres
    const allGenres = [...new Set(movies.flatMap(m => m.genres))].sort();
    
    // Populate Genre Checkboxes
    if (genreContainer) {
        genreContainer.innerHTML = allGenres.map(g => `
            <label class="custom-checkbox">
                <input type="checkbox" name="genre" value="${g}">
                <span class="checkmark"></span>
                ${g}
            </label>
        `).join('');
    }

    const genreCheckboxes = document.querySelectorAll('input[name="genre"]');

    // Parse URL params
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('search') && searchInput) searchInput.value = urlParams.get('search');
    if (urlParams.has('status')) {
        const val = urlParams.get('status');
        const radio = document.querySelector(`input[name="status"][value="${val}"]`);
        if(radio) radio.checked = true;
    }
    if (urlParams.has('genre')) {
        const val = urlParams.get('genre');
        const cb = document.querySelector(`input[name="genre"][value="${val}"]`);
        if(cb) cb.checked = true;
    }

    // Filter Logic
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedStatus = document.querySelector('input[name="status"]:checked')?.value || 'all';
        const selectedLang = langSelect ? langSelect.value : '';
        const minRating = document.querySelector('input[name="rating"]:checked')?.value || '0';
        
        const selectedGenres = Array.from(genreCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const filtered = movies.filter(m => {
            // Search text
            if (query && !m.title.toLowerCase().includes(query) && !m.genres.some(g=>g.toLowerCase().includes(query))) return false;
            
            // Status
            if (selectedStatus !== 'all' && m.status !== selectedStatus) return false;
            
            // Language
            if (selectedLang && m.language !== selectedLang) return false;
            
            // Rating
            if (parseFloat(m.rating) < parseFloat(minRating)) return false;
            
            // Genres
            if (selectedGenres.length > 0 && !selectedGenres.some(g => m.genres.includes(g))) return false;

            return true;
        });

        // Render
        if (filtered.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            noResults.style.display = 'none';
            renderMovieCards(filtered, 'filteredMoviesGrid');
        }
        
        if(countDisplay) countDisplay.textContent = filtered.length;
        
        // Sync URL subtly
        const newUrl = new URL(window.location);
        newUrl.search = '';
        if (query) newUrl.searchParams.set('search', query);
        if (selectedStatus !== 'all') newUrl.searchParams.set('status', selectedStatus);
        if (selectedGenres.length === 1) newUrl.searchParams.set('genre', selectedGenres[0]);
        window.history.replaceState({}, '', newUrl);
    }

    // Listeners
    if(searchInput) searchInput.addEventListener('input', applyFilters);
    if(langSelect) langSelect.addEventListener('change', applyFilters);
    statusRadios.forEach(r => r.addEventListener('change', applyFilters));
    ratingRadios.forEach(r => r.addEventListener('change', applyFilters));
    genreCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(searchInput) searchInput.value = '';
            statusRadios[0].checked = true; // All
            if(langSelect) langSelect.value = '';
            document.querySelector('input[name="rating"][value=""]').checked = true;
            genreCheckboxes.forEach(cb => cb.checked = false);
            applyFilters();
        });
    }

    // Initial render
    applyFilters();
});
