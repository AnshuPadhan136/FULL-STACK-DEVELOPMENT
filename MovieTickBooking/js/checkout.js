document.addEventListener('DOMContentLoaded', () => {
    const movieId = getUrlParam('movieId');
    const theaterId = getUrlParam('theaterId');
    const date = getUrlParam('date');
    const time = decodeURIComponent(getUrlParam('time'));
    const seatsParam = getUrlParam('seats');
    
    if(!movieId || !theaterId || !date || !time || !seatsParam) {
        window.location.href = 'index.html';
        return;
    }
    
    const seats = seatsParam.split(',');
    const movie = window.MOVIES.find(m => m.id == movieId);
    const theater = window.THEATERS.find(t => t.id == theaterId);
    
    if(!movie || !theater) return;

    // Populate Details
    document.getElementById('bcMovieTitle').textContent = movie.title;
    document.getElementById('chkPoster').src = movie.poster;
    document.getElementById('chkMovieTitle').textContent = movie.title;
    document.getElementById('chkGenre').textContent = `${movie.rating} • ${movie.genres.join(', ')}`;
    document.getElementById('chkTheater').textContent = theater.name;
    document.getElementById('chkDate').textContent = date;
    document.getElementById('chkTime').textContent = time;
    document.getElementById('chkSeats').textContent = seats.join(', ');

    // Pricing logic
    let subtotal = 0;
    let counts = { vip: 0, premium: 0, regular: 0 };
    
    seats.forEach(seat => {
        let row = seat.replace(/[0-9]/g, '');
        let type = 'regular';
        if(['A','B'].includes(row)) type = 'vip';
        else if(['C','D','E'].includes(row)) type = 'premium';
        
        counts[type]++;
        subtotal += window.SEAT_PRICES[type];
    });

    let discount = 0;
    let total = subtotal + window.CONVENIENCE_FEE;

    function renderPricing() {
        const breakdown = document.getElementById('paymentBreakdown');
        let html = '';
        
        ['vip', 'premium', 'regular'].forEach(type => {
            if(counts[type] > 0) {
                html += `<div class="price-row"><span>${type.charAt(0).toUpperCase() + type.slice(1)} (₹${window.SEAT_PRICES[type]} × ${counts[type]})</span><span>₹${window.SEAT_PRICES[type] * counts[type]}</span></div>`;
            }
        });
        
        html += `<div class="price-row"><span>Convenience Fee</span><span>₹${window.CONVENIENCE_FEE}</span></div>`;
        
        if (discount > 0) {
            html += `<div class="price-row discount-row"><span>Discount Applied</span><span>-₹${discount}</span></div>`;
        }
        
        html += `<div class="price-total"><span>Grand Total</span><span>₹${total}</span></div>`;
        breakdown.innerHTML = html;
    }
    
    renderPricing();

    // Timer
    let timeLeft = 300; // 5 minutes
    const timerDisplay = document.getElementById('countdownTimer');
    const timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${m}:${s}`;
        
        if(timeLeft <= 60) timerDisplay.classList.add('danger');
        
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            if(window.showToast) window.showToast('Session expired. Please reselect your seats.', 'error');
            setTimeout(() => {
                window.location.href = `seats.html?movieId=${movieId}&theaterId=${theaterId}&date=${date}&time=${encodeURIComponent(time)}`;
            }, 2000);
        }
    }, 1000);

    // Coupon
    document.getElementById('btnApplyCoupon').addEventListener('click', () => {
        const code = document.getElementById('couponCode').value.trim().toUpperCase();
        if(code === 'FIRST50') {
            discount = Math.min(200, subtotal * 0.5);
            total = subtotal + window.CONVENIENCE_FEE - discount;
            renderPricing();
            if(window.showToast) window.showToast('Coupon applied successfully!', 'success');
        } else if (code === 'WKND3' && seats.length >= 3) {
            // Find cheapest seat to make free (approx)
            discount = window.SEAT_PRICES['regular']; // simplified
            total = subtotal + window.CONVENIENCE_FEE - discount;
            renderPricing();
            if(window.showToast) window.showToast('Buy 2 get 1 free applied!', 'success');
        } else if (code === 'STUDENT30') {
            discount = subtotal * 0.3;
            total = subtotal + window.CONVENIENCE_FEE - discount;
            renderPricing();
            if(window.showToast) window.showToast('Student discount applied!', 'success');
        } else {
            if(window.showToast) window.showToast('Invalid or inapplicable promo code', 'error');
        }
    });

    // Confirm Booking
    document.getElementById('btnConfirm').addEventListener('click', () => {
        const terms = document.getElementById('termsCheck').checked;
        if(!terms) {
            if(window.showToast) window.showToast('Please agree to the Terms & Conditions.', 'warning');
            return;
        }
        
        const btn = document.getElementById('btnConfirm');
        btn.textContent = 'Processing...';
        btn.disabled = true;
        clearInterval(timerInterval);
        
        setTimeout(() => {
            const bookingId = 'CB-' + Math.random().toString(36).substr(2, 8).toUpperCase();
            const showtimeKey = `${movieId}_${theaterId}_${date}_${time}`;
            
            const booking = {
                bookingId,
                movieId,
                theaterId,
                theaterName: theater.name,
                movieTitle: movie.title,
                date,
                time,
                seats,
                seatCount: seats.length,
                subtotal,
                discount,
                convenienceFee: window.CONVENIENCE_FEE,
                total,
                timestamp: new Date().toISOString()
            };
            
            if(window.Storage) {
                window.Storage.addBooking(booking);
                window.Storage.bookSeats(showtimeKey, seats);
            }
            
            window.location.href = `confirmation.html?bookingId=${bookingId}`;
        }, 1500);
    });
});
