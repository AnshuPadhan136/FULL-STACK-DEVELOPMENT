function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingId = getUrlParam('bookingId');
    if(!bookingId) {
        window.location.href = 'index.html';
        return;
    }
    
    let booking = null;
    if(window.Storage) {
        const bookings = window.Storage.getBookings();
        booking = bookings.find(b => b.bookingId === bookingId);
    }
    
    // Mock if direct visit
    if(!booking) {
        booking = {
            bookingId: bookingId,
            movieId: 1,
            theaterName: 'Cineplex IMAX',
            movieTitle: 'Oppenheimer',
            date: '2026-08-10',
            time: '7:45 PM',
            seats: ['A1', 'A2'],
            seatCount: 2,
            total: 749
        };
        const movie = window.MOVIES ? window.MOVIES.find(m => m.id == 1) : null;
        if(movie) booking.poster = movie.poster;
    } else {
        const movie = window.MOVIES ? window.MOVIES.find(m => m.id == booking.movieId) : null;
        if(movie) booking.poster = movie.poster;
    }

    document.getElementById('tktId').textContent = booking.bookingId;
    document.getElementById('tktMovieTitle').textContent = booking.movieTitle;
    document.getElementById('tktTheater').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${booking.theaterName}`;
    document.getElementById('tktDate').textContent = booking.date;
    document.getElementById('tktTime').textContent = booking.time;
    document.getElementById('tktSeats').textContent = booking.seats.join(', ');
    document.getElementById('tktCount').textContent = booking.seatCount;
    document.getElementById('tktAmount').textContent = `₹${booking.total}`;
    
    if(booking.poster) {
        document.getElementById('tktPoster').src = booking.poster;
    }

    // Generate QR
    if(window.generateQR) {
        const qrData = `ID:${booking.bookingId}|M:${booking.movieTitle}|D:${booking.date}|T:${booking.time}|S:${booking.seats.join(',')}`;
        window.generateQR('qrcode', qrData);
    }

    // Confetti
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    for(let i=0; i<50; i++) {
        let conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 3 + 2) + 's';
        conf.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(conf);
    }

    // Print
    document.getElementById('btnPrint').addEventListener('click', () => {
        window.print();
    });

    // Download
    document.getElementById('btnDownload').addEventListener('click', () => {
        if(window.html2canvas) {
            const btn = document.getElementById('btnDownload');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            btn.disabled = true;
            
            // To ensure QR is rendered, add slight delay
            setTimeout(() => {
                const card = document.getElementById('ticketCard');
                // Temporary remove border radius and shadow for clean capture if needed, but modern html2canvas handles it okay
                html2canvas(card, {
                    scale: 2,
                    backgroundColor: '#1a1a2e',
                    logging: false
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `Ticket_${booking.bookingId}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }).catch(err => {
                    console.error('Error generating ticket image', err);
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert('Failed to download ticket. You can try printing instead.');
                });
            }, 500);
        } else {
            alert('Download feature not available. Please use the Print option.');
        }
    });
});
