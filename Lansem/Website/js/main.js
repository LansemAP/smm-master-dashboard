document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Scroll Effects
    const header = document.getElementById('mainHeader');
    const logoImg = document.getElementById('logoImg');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logoImg) logoImg.src = 'assets/images/logo.png'; // Dark logo for light background
        } else {
            header.classList.remove('scrolled');
            if (logoImg) logoImg.src = 'assets/images/logo_white.png'; // White logo for transparent/dark background
        }
    });

    // 2. Mobile Navigation Menu
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // 3. Hero Background Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-slider-btn.prev');
    const nextBtn = document.querySelector('.hero-slider-btn.next');
    const dotsContainer = document.querySelector('.hero-slider-dots');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        // Create dots dynamically
        slides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.classList.add('hero-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.hero-dot');
        
        const slideTexts = [
            "White-Label Back-Office for UK Accounting Practices",
            "The Overnight Protocol: Reconciled while you sleep",
            "GDPR-Compliant Processing via Secure UK VDI Nodes"
        ];
        const heroTitle = document.querySelector('.hero-content-overlay .hero-title');

        function updateSlides() {
            slides.forEach((slide, idx) => {
                slide.classList.remove('active');
                if (dots[idx]) dots[idx].classList.remove('active');
            });
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');

            // Dynamically change and fade the hero title text to match the slide (using GSAP if loaded, fallback to instant)
            if (heroTitle && slideTexts[currentSlide] && heroTitle.innerHTML !== slideTexts[currentSlide]) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(heroTitle, {
                        opacity: 0,
                        y: -10,
                        duration: 0.3,
                        onComplete: () => {
                            heroTitle.innerHTML = slideTexts[currentSlide];
                            gsap.to(heroTitle, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    });
                } else {
                    heroTitle.innerHTML = slideTexts[currentSlide];
                }
            }
        }
        
        function goToSlide(n) {
            currentSlide = (n + slides.length) % slides.length;
            updateSlides();
            resetInterval();
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        function startInterval() {
            slideInterval = setInterval(nextSlide, 6000); // Cycle backgrounds every 6 seconds
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
    }

    // 4. FAQ Accordion Interactivity
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 5. Scroll-linked Navigation Links Highlight (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    const isHomePage = document.getElementById('home') !== null;
    
    if (isHomePage) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 100; // Offset for header height
            
            sections.forEach(section => {
                const top = section.getBoundingClientRect().top + window.scrollY;
                const height = section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < (top + height)) {
                    if (section.id) {
                        currentSectionId = '#' + section.id;
                    } else {
                        currentSectionId = '#';
                    }
                }
            });
            
            navLinksList.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === currentSectionId || (href === '#' && currentSectionId === '')) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 6. Contact Form Dropdown Dependencies / Handlers
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const formErrorMessage = document.getElementById('formErrorMessage');
    const resetFormBtn = document.getElementById('resetFormBtn');

    // Configure your Google Sheets Web App Webhook URL here:
    const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzPuhfjYfR_KJhywi-JmwVm21aKoeMsRIM9oEJxM4arpUwA__cs5DQF9JUdLaUpdENJ/exec";

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Collect Form Data
            const formData = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                firmName: document.getElementById('formFirm').value,
                country: document.getElementById('formCountry').value,
                firmType: document.getElementById('formFirmType').value,
                services: document.getElementById('formServices').value,
                message: document.getElementById('formMessage').value,
                source: document.getElementById('formSource').value
            };

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            if (formErrorMessage) formErrorMessage.classList.add('hidden');

            // Fallback simulation if webhook URL is not replaced yet
            if (GOOGLE_SHEET_WEBHOOK_URL === "https://script.google.com/macros/s/AKfycbzPuhfjYfR_KJhywi-JmwVm21aKoeMsRIM9oEJxM4arpUwA__cs5DQF9JUdLaUpdENJ/exec") {
                console.warn("Google Sheet Webhook URL is not configured. Simulating submission...");
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    
                    // Show inline success message with smooth transition
                    contactForm.classList.add('hidden');
                    if (formSuccessMessage) formSuccessMessage.classList.remove('hidden');
                }, 1500);
                return;
            }

            // Real Google Sheet Web App Submission
            // We use urlencoded payload because Google Apps Script Web Apps handle POST parameters easily
            const formBody = [];
            for (const property in formData) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(formData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            const bodyStr = formBody.join("&");

            fetch(GOOGLE_SHEET_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                mode: 'no-cors', // Standard Apps Script Web App bypass for CORS
                body: bodyStr
            })
            .then(() => {
                // Apps Script return with 'no-cors' will be opaque (status 0), but it submits successfully
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                
                // Show success, hide form
                contactForm.classList.add('hidden');
                if (formSuccessMessage) formSuccessMessage.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Submission error:', error);
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                if (formErrorMessage) formErrorMessage.classList.remove('hidden');
            });
        });

        // Reset form handler to allow submitting another inquiry
        if (resetFormBtn && formSuccessMessage) {
            resetFormBtn.addEventListener('click', () => {
                formSuccessMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }

    // 7. Pricing Toggle Handler
    const btnFte = document.getElementById('btn-pricing-fte');
    const btnLedger = document.getElementById('btn-pricing-ledger');
    const pricingFte = document.getElementById('pricing-fte');
    const pricingLedger = document.getElementById('pricing-ledger');
    
    if (btnFte && btnLedger && pricingFte && pricingLedger) {
        btnFte.addEventListener('click', () => {
            btnFte.classList.add('active');
            btnLedger.classList.remove('active');
            pricingFte.style.display = 'grid';
            pricingLedger.style.display = 'none';
        });
        
        btnLedger.addEventListener('click', () => {
            btnLedger.classList.add('active');
            btnFte.classList.remove('active');
            pricingLedger.style.display = 'grid';
            pricingFte.style.display = 'none';
        });
    }

    // 8. Floating Consultation Widget Handler
    const widget = document.getElementById('consultationWidget');
    const closeBtn = document.getElementById('closeWidgetBtn');
    
    if (widget && closeBtn) {
        // Only show if user has not dismissed it in this session
        if (sessionStorage.getItem('dismissedConsultationWidget') !== 'true') {
            setTimeout(() => {
                widget.classList.remove('hidden');
                // Trigger reflow to start opacity transition
                widget.offsetHeight;
                widget.classList.add('visible');
            }, 3000); // 3 seconds delay
        }
        
        closeBtn.addEventListener('click', () => {
            widget.classList.remove('visible');
            sessionStorage.setItem('dismissedConsultationWidget', 'true');
            // Add hidden display style after transition finishes
            setTimeout(() => {
                widget.classList.add('hidden');
            }, 500); // match transition duration
        });
    }
});
