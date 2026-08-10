document.addEventListener('DOMContentLoaded', () => {
    const movieId = getUrlParam('movieId');
    const theaterId = getUrlParam('theaterId');
    const date = getUrlParam('date');
    const time = decodeURIComponent(getUrlParam('time'));
    
    if(!movieId || !theaterId || !date || !time) {
        window.location.href = 'index.html';
        return;
    }

    // Set Summary Details
    const movie = window.MOVIES.find(m => m.id == movieId);
    const theater = window.THEATERS.find(t => t.id == theaterId);
    
    if(movie) document.getElementById('sumMovieTitle').textContent = movie.title;
    if(theater) document.getElementById('sumTheaterName').textContent = theater.name;
    document.getElementById('sumDate').textContent = date;
    document.getElementById('sumTime').textContent = time;
    if(theater) document.getElementById('bcTheaterName').textContent = theater.name;

    const showtimeKey = `${movieId}_${theaterId}_${date}_${time}`;
    const bookedSeats = window.Storage ? window.Storage.getBookedSeats(showtimeKey) : [];

    let selectedSeats = [];

    function renderSeatMap() {
        const container = document.getElementById('seatMap');
        let html = '';
        
        window.SEAT_MAP.rows.forEach(rowGroup => {
            const labels = rowGroup.label.split('/');
            labels.forEach(label => {
                html += `<div class="seat-row"><div class="row-label">${label}</div>`;
                
                let seatsInRow = rowGroup.seats;
                // Distribute gaps based on seat count
                let gapIndices = [];
                if(seatsInRow === 12) gapIndices = [4, 8];
                else if(seatsInRow === 14) gapIndices = [4, 10];
                else if(seatsInRow === 16) gapIndices = [4, 12];
                
                for(let i = 1; i <= seatsInRow; i++) {
                    const seatId = `${label}${i}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const seatClass = isBooked ? 'seat--booked' : `seat--${rowGroup.type}`;
                    
                    html += `<button class="seat ${seatClass}" data-id="${seatId}" data-type="${rowGroup.type}" ${isBooked ? 'disabled' : ''}>${i}</button>`;
                    
                    if(gapIndices.includes(i)) {
                        html += `<div class="gap"></div>`;
                    }
                }
                html += `</div>`;
            });
        });
        
        container.innerHTML = html;
        
        // Add listeners
        document.querySelectorAll('.seat:not(.seat--booked)').forEach(btn => {
            btn.addEventListener('click', () => toggleSeat(btn));
        });
    }

    function toggleSeat(btn) {
        const seatId = btn.getAttribute('data-id');
        const seatType = btn.getAttribute('data-type');
        
        if (selectedSeats.some(s => s.id === seatId)) {
            selectedSeats = selectedSeats.filter(s => s.id !== seatId);
            btn.classList.remove('seat--selected');
        } else {
            if (selectedSeats.length >= 8) {
                if(window.showToast) window.showToast('Maximum 8 seats allowed', 'warning');
                else alert('Maximum 8 seats allowed');
                return;
            }
            selectedSeats.push({id: seatId, type: seatType});
            btn.classList.add('seat--selected');
        }
        
        updateSummary();
    }

    function updateSummary() {
        const list = document.getElementById('selectedSeatsList');
        const countText = document.getElementById('seatCountText');
        const breakdown = document.getElementById('priceBreakdown');
        const grandTotal = document.getElementById('grandTotal');
        const btnProceed = document.getElementById('btnProceed');
        
        countText.textContent = `${selectedSeats.length}/8`;
        
        if (selectedSeats.length === 0) {
            list.innerHTML = '<span class="text-muted" style="font-size:0.9rem;">No seats selected</span>';
            breakdown.innerHTML = '';
            grandTotal.textContent = '₹0';
            btnProceed.disabled = true;
            return;
        }
        
        list.innerHTML = selectedSeats.map(s => `<span class="seat-badge">${s.id}</span>`).join('');
        
        // Calculate prices
        let counts = { vip: 0, premium: 0, regular: 0 };
        selectedSeats.forEach(s => counts[s.type]++);
        
        let bdHtml = '';
        let total = 0;
        
        ['vip', 'premium', 'regular'].forEach(type => {
            if(counts[type] > 0) {
                const amt = counts[type] * window.SEAT_PRICES[type];
                total += amt;
                bdHtml += `<div class="price-row"><span>${type.charAt(0).toUpperCase() + type.slice(1)} (₹${window.SEAT_PRICES[type]} × ${counts[type]})</span><span>₹${amt}</span></div>`;
            }
        });
        
        bdHtml += `<div class="price-row"><span>Convenience Fee</span><span>₹${window.CONVENIENCE_FEE}</span></div>`;
        total += window.CONVENIENCE_FEE;
        
        breakdown.innerHTML = bdHtml;
        grandTotal.textContent = `₹${total}`;
        
        btnProceed.disabled = false;
    }

    document.getElementById('btnReset').addEventListener('click', () => {
        selectedSeats = [];
        document.querySelectorAll('.seat--selected').forEach(btn => btn.classList.remove('seat--selected'));
        updateSummary();
    });
    
    document.getElementById('btnProceed').addEventListener('click', () => {
        if(selectedSeats.length > 0) {
            const seatsParam = selectedSeats.map(s => s.id).join(',');
            const url = `checkout.html?movieId=${movieId}&theaterId=${theaterId}&date=${date}&time=${encodeURIComponent(time)}&seats=${seatsParam}`;
            window.location.href = url;
        }
    });

    renderSeatMap();
});
