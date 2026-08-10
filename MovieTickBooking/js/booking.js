function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function renderMovieInfoBar(movieId) {
    const movie = window.MOVIES.find(m => m.id == movieId);
    const container = document.getElementById('movieInfoContainer');
    if (!movie || !container) return;
    
    document.getElementById('bcMovieTitle').textContent = movie.title;
    
    container.innerHTML = `
        <div class="movie-info-bar data-animate">
            <img src="${movie.poster}" alt="${movie.title}">
            <div>
                <h2>${movie.title}</h2>
                <p>${movie.rating} • ${movie.duration} • ${movie.genres.join(', ')} • ${movie.language}</p>
            </div>
        </div>
    `;
}

function renderTheaters(movieId) {
    const grid = document.getElementById('theaterGrid');
    if (!grid) return;
    
    let html = '';
    window.THEATERS.forEach(theater => {
        let amenitiesHtml = theater.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
        html += `
            <div class="theater-card data-animate">
                <i class="${theater.image} theater-icon"></i>
                <h3>${theater.name}</h3>
                <div class="theater-location"><i class="fas fa-map-marker-alt"></i> ${theater.location}</div>
                <div class="theater-amenities">${amenitiesHtml}</div>
                <div style="color:var(--text-muted); font-size:0.8rem; margin-top:0.5rem;">${theater.screens} Screens</div>
                <button class="btn-select" onclick="window.location.href='showtimes.html?movieId=${movieId}&theaterId=${theater.id}'">Select Theater</button>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function generateDateChips() {
    const container = document.getElementById('dateSelection');
    if (!container) return;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let html = '';
    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() + i);
        let dayName = i === 0 ? 'Today' : days[d.getDay()];
        let dateNum = d.getDate();
        let monthName = months[d.getMonth()];
        let fullDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        
        html += `
            <div class="date-chip" data-date="${fullDate}" onclick="selectDate(this)">
                <div class="day">${dayName}</div>
                <div class="date">${dateNum}</div>
                <div class="month">${monthName}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

let selectedDate = null;
let selectedTime = null;

function selectDate(element) {
    document.querySelectorAll('.date-chip').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedDate = element.getAttribute('data-date');
    checkContinueState();
    
    // Enable times (in real app, filter based on past times for today)
    const timeBtns = document.querySelectorAll('.time-btn');
    const isToday = element.querySelector('.day').textContent === 'Today';
    const now = new Date();
    
    timeBtns.forEach(btn => {
        if(isToday) {
            // Mock logic: randomly disable some past times
            const timeStr = btn.textContent;
            // Parse timeStr roughly... for mock, just don't disable unless explicitly testing
            btn.disabled = false; 
        } else {
            btn.disabled = false;
        }
    });
}

function selectTime(element) {
    if(element.disabled) return;
    document.querySelectorAll('.time-btn').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedTime = element.textContent;
    checkContinueState();
}

function checkContinueState() {
    const btn = document.getElementById('continueBtn');
    if (!btn) return;
    if (selectedDate && selectedTime) {
        btn.disabled = false;
        const movieId = getUrlParam('movieId');
        const theaterId = getUrlParam('theaterId');
        btn.onclick = () => {
            window.location.href = `seats.html?movieId=${movieId}&theaterId=${theaterId}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`;
        };
    } else {
        btn.disabled = true;
    }
}

function renderShowtimes(movieId, theaterId) {
    const container = document.getElementById('timeSelection');
    if (!container) return;
    
    const theater = window.THEATERS.find(t => t.id == theaterId);
    if(theater) {
        const bcTheater = document.getElementById('bcTheaterName');
        if(bcTheater) bcTheater.textContent = theater.name;
        
        const infoCard = document.getElementById('theaterInfoCard');
        if(infoCard) {
            infoCard.innerHTML = `<h3>${theater.name}</h3><p><i class="fas fa-map-marker-alt"></i> ${theater.location}</p>`;
        }
    }
    
    generateDateChips();
    
    let html = '';
    window.SHOWTIMES.forEach(time => {
        html += `<button class="time-btn" onclick="selectTime(this)">${time}</button>`;
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const movieId = getUrlParam('movieId');
    if (movieId) {
        renderMovieInfoBar(movieId);
        
        if (window.location.pathname.includes('theaters.html')) {
            renderTheaters(movieId);
        } else if (window.location.pathname.includes('showtimes.html')) {
            const theaterId = getUrlParam('theaterId');
            if (theaterId) {
                renderShowtimes(movieId, theaterId);
            }
        }
    }
});
