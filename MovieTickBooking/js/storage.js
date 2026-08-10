// js/storage.js

window.Storage = {
  _get(key) { 
    try { 
      return JSON.parse(localStorage.getItem('cinebook_' + key)); 
    } catch { 
      return null; 
    } 
  },
  
  _set(key, val) { 
    localStorage.setItem('cinebook_' + key, JSON.stringify(val)); 
  },
  
  getUser() { 
    return this._get('user'); 
  },
  
  setUser(user) { 
    this._set('user', user); 
  },
  
  logout() { 
    localStorage.removeItem('cinebook_user'); 
  },
  
  isLoggedIn() { 
    return !!this._get('user'); 
  },
  
  getBookings() { 
    return this._get('bookings') || []; 
  },
  
  addBooking(booking) { 
    const bookings = this.getBookings(); 
    bookings.unshift(booking); 
    this._set('bookings', bookings); 
  },
  
  getBookingById(id) { 
    return this.getBookings().find(b => b.bookingId === id); 
  },
  
  getBookedSeats(key) { 
    const all = this._get('booked_seats') || {}; 
    return all[key] || []; 
  },
  
  bookSeats(key, seats) { 
    const all = this._get('booked_seats') || {}; 
    all[key] = [...(all[key]||[]), ...seats]; 
    this._set('booked_seats', all); 
  },
  
  getFavorites() { 
    return this._get('favorites') || []; 
  },
  
  toggleFavorite(movieId) { 
    let favs = this.getFavorites(); 
    if (favs.includes(movieId)) { 
      favs = favs.filter(id => id !== movieId); 
    } else { 
      favs.push(movieId); 
    } 
    this._set('favorites', favs); 
    return favs.includes(movieId); 
  },
  
  isFavorite(movieId) { 
    return this.getFavorites().includes(movieId); 
  },
  
  getRecentlyViewed() { 
    return this._get('recently_viewed') || []; 
  },
  
  addRecentlyViewed(movieId) { 
    let recent = this.getRecentlyViewed().filter(id => id !== movieId); 
    recent.unshift(movieId); 
    if (recent.length > 10) recent = recent.slice(0, 10); 
    this._set('recently_viewed', recent); 
  },
  
  getTheme() { 
    return this._get('theme') || 'dark'; 
  },
  
  setTheme(theme) { 
    this._set('theme', theme); 
  }
};
