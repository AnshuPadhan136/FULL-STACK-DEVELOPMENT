// js/movies.js
// Assumes window.MOVIES exists from data.js

function createMovieCard(movie) {
    const isNowShowing = movie.status === 'now_showing';
    const tagClass = isNowShowing ? 'tag-primary' : 'tag-secondary';
    
    return `
        <div class="movie-card glass-card" data-id="${movie.id}">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating"><i class="fas fa-star"></i> ${movie.rating}</div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-tags">
                    ${movie.genres.slice(0,2).map(g => `<span class="tag ${tagClass}">${g}</span>`).join('')}
                </div>
                <div class="movie-meta">
                    <span><i class="far fa-clock"></i> ${movie.duration}</span>
                    <span>${movie.language}</span>
                </div>
                <a href="movie-details.html?id=${movie.id}" class="btn btn-primary w-100 mt-3">Book Now</a>
            </div>
        </div>
    `;
}

function renderMovieCards(moviesArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (moviesArray.length === 0) {
        container.innerHTML = '<p class="no-results-msg">No movies found.</p>';
        return;
    }
    
    container.innerHTML = moviesArray.map(m => createMovieCard(m)).join('');
}

function getMovieById(id) {
    return (window.MOVIES || []).find(m => m.id == id);
}

// Trailer Modal Functions
const trailerModal = document.getElementById('trailerModal');
const trailerIframe = document.getElementById('trailerIframe');
const closeTrailerBtn = document.getElementById('closeTrailer');

function openTrailer(youtubeId) {
    if (trailerModal && trailerIframe) {
        trailerIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        trailerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTrailer() {
    if (trailerModal && trailerIframe) {
        trailerIframe.src = '';
        trailerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (closeTrailerBtn) {
    closeTrailerBtn.addEventListener('click', closeTrailer);
}
if (trailerModal) {
    trailerModal.addEventListener('click', (e) => {
        if (e.target === trailerModal) closeTrailer();
    });
}

// Global initialization based on page
document.addEventListener('DOMContentLoaded', () => {
    // 1. If on Index page
    if (document.getElementById('nowShowingGrid')) {
        const nowShowing = (window.MOVIES || []).filter(m => m.status === 'now_showing');
        renderMovieCards(nowShowing.slice(0, 4), 'nowShowingGrid');
    }
    if (document.getElementById('comingSoonGrid')) {
        const comingSoon = (window.MOVIES || []).filter(m => m.status === 'coming_soon');
        renderMovieCards(comingSoon.slice(0, 4), 'comingSoonGrid');
    }
    
    // 2. If on Movie Details page
    const detailContainer = document.getElementById('movieDetailContent');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id') || 1;
        const movie = getMovieById(movieId);
        
        if (movie) {
            renderMovieDetail(movie, detailContainer);
            
            // Similar Movies
            const similar = (window.MOVIES || []).filter(m => 
                m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))
            ).slice(0, 4);
            renderMovieCards(similar.length > 0 ? similar : (window.MOVIES || []).slice(0,4), 'similarMoviesGrid');
        } else {
            detailContainer.innerHTML = '<div class="container py-5"><h2>Movie not found</h2><a href="movies.html" class="btn btn-primary mt-3">Back to Movies</a></div>';
        }
    }
});

function renderMovieDetail(movie, container) {
    // Backdrop can just be the poster itself with a blur and overlay
    const backdropUrl = movie.poster;
    const posterUrl = movie.poster;
    
    // Default mock cast
    const cast = movie.cast || ['Actor A', 'Actor B', 'Actor C', 'Actor D'];
    
    container.innerHTML = `
        <div class="movie-banner" style="background-image: url('${backdropUrl}');"></div>
        <div class="movie-content-area container">
            <div class="movie-detail-grid">
                <div>
                    <img src="${posterUrl}" alt="${movie.title}" class="movie-poster-large">
                </div>
                <div class="movie-info">
                    <h1>${movie.title}</h1>
                    <div class="movie-meta-bar">
                        <span class="rating-stars"><i class="fas fa-star"></i> ${movie.rating}/10</span>
                        <span class="badge badge-primary">${movie.certification || 'PG-13'}</span>
                        <span><i class="far fa-clock"></i> ${movie.duration}</span>
                        <span><i class="far fa-calendar-alt"></i> ${movie.releaseDate || '2026-08-15'}</span>
                        <span><i class="fas fa-language"></i> ${movie.language}</span>
                    </div>
                    <div class="mb-3">
                        ${movie.genres.map(g => `<span class="tag tag-primary me-2">${g}</span>`).join('')}
                    </div>
                    <p class="movie-synopsis">${movie.synopsis || 'A thrilling journey that challenges the boundaries of reality and imagination. Experience the ultimate cinematic adventure.'}</p>
                    
                    <div class="cast-crew">
                        <h3>Cast</h3>
                        <div class="cast-list">
                            ${cast.map(c => `
                                <div class="cast-item">
                                    <div class="cast-avatar"><i class="fas fa-user"></i></div>
                                    <small>${c}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <a href="theaters.html?movieId=${movie.id}" class="btn btn-primary btn-lg"><i class="fas fa-ticket-alt"></i> Book Tickets</a>
                        <button class="btn btn-outline btn-lg" onclick="openTrailer('${movie.trailer || 'dQw4w9WgXcQ'}')"><i class="fas fa-play"></i> Watch Trailer</button>
                        <button class="favorite-btn" onclick="this.classList.toggle('active')"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
            </div>
            
            <div class="reviews-section">
                <h3>User Reviews</h3>
                <div class="review-card glass-card mt-3">
                    <div class="d-flex align-items-center mb-2">
                        <div class="avatar" style="width: 40px; height: 40px; line-height: 40px; margin-right: 15px;">MS</div>
                        <div>
                            <strong>Mike Smith</strong>
                            <div class="rating-stars" style="font-size: 0.8rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                        </div>
                    </div>
                    <p>Absolutely stunning visuals and a gripping storyline. A must-watch on the big screen!</p>
                </div>
                <div class="review-card glass-card">
                    <div class="d-flex align-items-center mb-2">
                        <div class="avatar" style="background: var(--accent); width: 40px; height: 40px; line-height: 40px; margin-right: 15px;">JL</div>
                        <div>
                            <strong>Jane Lee</strong>
                            <div class="rating-stars" style="font-size: 0.8rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        </div>
                    </div>
                    <p>One of the best movies of the year. The acting was superb and the soundtrack was phenomenal.</p>
                </div>
            </div>
        </div>
    `;
}
