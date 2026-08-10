// js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('input[type="text"][id$="Search"]');
    const dropdown = document.getElementById('searchDropdown');
    
    if (!searchInputs.length) return;

    let debounceTimer;

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.trim().toLowerCase();
                if (query.length > 1) {
                    performSearch(query, input);
                } else if (dropdown && input.id === 'mainSearch') {
                    dropdown.style.display = 'none';
                }
            }, 300);
        });

        // Enter key to go to movies page
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    window.location.href = `movies.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    });

    function performSearch(query, inputElement) {
        const movies = window.MOVIES || [];
        const results = movies.filter(m => 
            m.title.toLowerCase().includes(query) ||
            m.genres.some(g => g.toLowerCase().includes(query)) ||
            m.language.toLowerCase().includes(query)
        ).slice(0, 5);

        // If it's the main page search with dropdown
        if (inputElement.id === 'mainSearch' && dropdown) {
            if (results.length > 0) {
                dropdown.innerHTML = results.map(m => `
                    <a href="movie-details.html?id=${m.id}" class="search-result-item">
                        <img src="${m.poster}" alt="${m.title}">
                        <div class="search-result-info">
                            <h4>${m.title}</h4>
                            <span>${m.genres.join(', ')} • ${m.language}</span>
                        </div>
                    </a>
                `).join('');
                dropdown.style.display = 'block';
            } else {
                dropdown.innerHTML = '<div class="search-result-item"><div class="search-result-info"><h4>No results found</h4></div></div>';
                dropdown.style.display = 'block';
            }
        }
    }

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (dropdown && !e.target.closest('.search-container')) {
            dropdown.style.display = 'none';
        }
    });
});
