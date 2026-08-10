// js/slider.js

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('sliderContainer');
    if (!sliderContainer) return;
    
    // Featured movies based on prompt ids: 1, 2, 4, 9, 11
    const featuredIds = [1, 2, 4, 9, 11];
    const featuredMovies = (window.MOVIES || []).filter(m => featuredIds.includes(m.id));
    
    // If window.MOVIES is missing or empty, use mock data
    const slidesData = featuredMovies.length > 0 ? featuredMovies : [
        { id: 1, title: 'Stellar Odyssey', genres: ['Sci-Fi'], duration: '2h 15m', rating: '9.2' },
        { id: 2, title: 'The Last Horizon', genres: ['Action'], duration: '2h 30m', rating: '8.5' }
    ];

    let currentSlide = 0;
    let slideInterval;

    // Build Slides HTML
    sliderContainer.innerHTML = slidesData.map((movie, index) => {
        const bgUrl = `images/poster-${movie.id}.jpg`;
        return `
            <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${bgUrl}');">
                <div class="slide-overlay"></div>
                <div class="slide-content container">
                    <span class="badge badge-primary mb-3">Now Showing</span>
                    <h1 class="slide-title">${movie.title}</h1>
                    <div class="slide-meta mb-3">
                        <span><i class="fas fa-star text-warning"></i> ${movie.rating}</span>
                        <span><i class="far fa-clock"></i> ${movie.duration}</span>
                        <span>${movie.genres.join(', ')}</span>
                    </div>
                    <p class="slide-desc">${movie.synopsis || 'Experience the cinematic event of the year. Book your tickets now for the best seats in the house.'}</p>
                    <div class="slide-actions mt-4">
                        <a href="movie-details.html?id=${movie.id}" class="btn btn-primary btn-lg mr-3">Book Now</a>
                        <button class="btn btn-outline btn-lg" onclick="openTrailer('${movie.trailer || 'dQw4w9WgXcQ'}')"><i class="fas fa-play"></i> Watch Trailer</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    
    // Build dots
    if (dotsContainer) {
        dotsContainer.innerHTML = slidesData.map((_, index) => 
            `<button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>`
        ).join('');
    }
    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        if(dots.length) dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if(dots.length) dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    const nextBtn = document.getElementById('sliderNext');
    const prevBtn = document.getElementById('sliderPrev');
    
    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                goToSlide(parseInt(e.target.dataset.index));
                resetInterval();
            });
        });
    }

    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();

    // Pause on hover
    const heroSlider = document.getElementById('heroSlider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', startInterval);
});
