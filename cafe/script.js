/**
 * ═══════════════════════════════════════════════════════════════════════
 * Ember & Bloom — Cafe Website Interactive Script
 * Vanilla ES6+ • No dependencies • Production-quality
 * ═══════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ──────────────────────────────────────────────
    //  REDUCED MOTION SUPPORT
    // ──────────────────────────────────────────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    // ──────────────────────────────────────────────
    //  1. NAVBAR SCROLL EFFECT & BACK TO TOP
    // ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    let scrollTicking = false;

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar: transparent → solid on scroll
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 60);
        }

        // Back to top button visibility
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', scrollY > 500);
        }
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                onScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Back to top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }


    // ──────────────────────────────────────────────
    //  2. HAMBURGER MENU
    // ──────────────────────────────────────────────
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMenu() {
        if (!hamburgerBtn || !mobileMenu) return;
        const isOpening = !hamburgerBtn.classList.contains('active');
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isOpening ? 'hidden' : '';
    }

    function closeMenu() {
        if (hamburgerBtn && hamburgerBtn.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close when clicking a mobile nav link
    document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });


    // ──────────────────────────────────────────────
    //  3. SMOOTH SCROLLING
    // ──────────────────────────────────────────────
    const NAV_HEIGHT = 80;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            closeMenu();

            const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });


    // ──────────────────────────────────────────────
    //  4. SCROLL ANIMATIONS (Intersection Observer)
    // ──────────────────────────────────────────────
    const animatedEls = document.querySelectorAll('.animate-on-scroll');

    if (animatedEls.length > 0) {
        if (prefersReducedMotion) {
            animatedEls.forEach(el => el.classList.add('visible'));
        } else {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Stagger siblings with .stagger class
                        if (entry.target.classList.contains('stagger')) {
                            const parent = entry.target.parentElement;
                            const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll.stagger'));
                            const index = siblings.indexOf(entry.target);
                            entry.target.style.transitionDelay = `${index * 0.1}s`;
                        }
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            animatedEls.forEach(el => observer.observe(el));
        }
    }


    // ──────────────────────────────────────────────
    //  5. GALLERY LIGHTBOX
    // ──────────────────────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentLightboxIndex = 0;

    // Collect all gallery image sources
    const galleryImages = [];
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) galleryImages.push(img.src);
    });

    function openLightbox(index) {
        if (!lightbox || !galleryImages[index]) return;
        currentLightboxIndex = index;
        lightboxImage.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentLightboxIndex += direction;
        if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
        if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;
        lightboxImage.src = galleryImages[currentLightboxIndex];
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });


    // ──────────────────────────────────────────────
    //  6. PARALLAX EFFECT (Hero Background)
    // ──────────────────────────────────────────────
    const heroBg = document.querySelector('.hero-bg');
    let parallaxTicking = false;

    if (heroBg && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                heroBg.style.transform = '';
                return;
            }
            if (!parallaxTicking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
                    }
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, { passive: true });
    }


    // ──────────────────────────────────────────────
    //  7. COUNTER ANIMATION (About Stats)
    // ──────────────────────────────────────────────
    const counters = document.querySelectorAll('.stat-number[data-target]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10);
                    const duration = 2000;
                    const startTime = performance.now();

                    function easeOutQuart(t) {
                        return 1 - Math.pow(1 - t, 4);
                    }

                    function updateCounter(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeOutQuart(progress);
                        const current = Math.round(easedProgress * target);

                        el.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }


    // ──────────────────────────────────────────────
    //  8. TESTIMONIAL CAROUSEL (Mobile)
    // ──────────────────────────────────────────────
    const testimonialTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentTestimonial = 0;
    let autoAdvanceTimer = null;

    function updateTestimonialDots() {
        if (!dotsContainer) return;
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }

    function scrollToTestimonial(index) {
        if (!testimonialTrack || window.innerWidth >= 1024) return;
        currentTestimonial = index;
        const card = testimonialCards[index];
        if (!card) return;

        const trackRect = testimonialTrack.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft = testimonialTrack.scrollLeft + (cardRect.left - trackRect.left) -
            (trackRect.width - cardRect.width) / 2;

        testimonialTrack.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        updateTestimonialDots();
    }

    function startAutoAdvance() {
        stopAutoAdvance();
        autoAdvanceTimer = setInterval(() => {
            if (window.innerWidth < 1024 && testimonialCards.length > 0) {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                scrollToTestimonial(currentTestimonial);
            }
        }, 5000);
    }

    function stopAutoAdvance() {
        if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
    }

    if (testimonialCards.length > 0 && dotsContainer) {
        // Create dots
        testimonialCards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `dot${i === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => {
                scrollToTestimonial(i);
                stopAutoAdvance();
                startAutoAdvance();
            });
            dotsContainer.appendChild(dot);
        });

        startAutoAdvance();

        // Pause on interaction
        if (testimonialTrack) {
            testimonialTrack.addEventListener('touchstart', stopAutoAdvance, { passive: true });
            testimonialTrack.addEventListener('touchend', () => {
                setTimeout(startAutoAdvance, 2000);
            }, { passive: true });
            testimonialTrack.addEventListener('mouseenter', stopAutoAdvance);
            testimonialTrack.addEventListener('mouseleave', startAutoAdvance);
        }
    }


    // ──────────────────────────────────────────────
    //  9. ACTIVE NAV HIGHLIGHTING (Scroll Spy)
    // ──────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -75% 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    }


    // ──────────────────────────────────────────────
    //  10. NEWSLETTER FORM & TOAST
    // ──────────────────────────────────────────────
    const newsletterForm = document.getElementById('newsletterForm');
    const toast = document.getElementById('toast');
    const toastClose = toast ? toast.querySelector('.toast-close') : null;
    let toastTimer = null;

    function showToast() {
        if (!toast) return;
        toast.classList.add('visible');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
        }, 4000);
    }

    function hideToast() {
        if (!toast) return;
        toast.classList.remove('visible');
        if (toastTimer) clearTimeout(toastTimer);
    }

    if (toastClose) toastClose.addEventListener('click', hideToast);

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(email)) {
                showToast();
                newsletterForm.reset();
            } else {
                // Quick shake animation on the input
                if (emailInput) {
                    emailInput.style.animation = 'none';
                    emailInput.offsetHeight; // force reflow
                    emailInput.style.outline = '2px solid #e74c3c';
                    setTimeout(() => { emailInput.style.outline = ''; }, 2000);
                }
            }
        });
    }


    // ──────────────────────────────────────────────
    //  11. HOURS — HIGHLIGHT CURRENT DAY
    // ──────────────────────────────────────────────
    const hoursTable = document.getElementById('hoursTable');
    if (hoursTable) {
        const today = new Date().getDay(); // 0=Sun, 1=Mon, …, 6=Sat
        const rows = hoursTable.querySelectorAll('tr[data-day]');
        rows.forEach(row => {
            if (parseInt(row.dataset.day, 10) === today) {
                row.classList.add('today');
            }
        });
    }


    // ──────────────────────────────────────────────
    //  INITIAL STATE
    // ──────────────────────────────────────────────
    // Trigger scroll handler on load for initial state
    onScroll();
});
