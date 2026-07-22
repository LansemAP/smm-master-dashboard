// LANSEM - GSAP & IntersectionObserver Animations Script
// Progressive enhancement animations using native IntersectionObserver and GreenSock GSAP

// Remote logger helper
function remoteLog(type, msg) {
    fetch('/log', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: `[${new Date().toISOString()}] [${type}] [${window.location.pathname}] ${msg}`
    }).catch(() => {});
}
window.addEventListener('error', (e) => {
    remoteLog('ERROR', `${e.message} at ${e.filename}:${e.lineno}:${e.colno}`);
});
window.addEventListener('unhandledrejection', (e) => {
    remoteLog('REJECTION', e.reason);
});
console.log = (orig => (...args) => { orig(...args); remoteLog('LOG', args.join(' ')); })(console.log);
console.warn = (orig => (...args) => { orig(...args); remoteLog('WARN', args.join(' ')); })(console.warn);
console.error = (orig => (...args) => { orig(...args); remoteLog('ERROR', args.join(' ')); })(console.error);

console.log("animations.js execution started.");

// Native Preloader Setup (Runs immediately when DOM is parsed, even if GSAP fails to load)
(function() {
    const preloader = document.getElementById('preloader');
    const enterBtn = document.getElementById('preloaderEnterBtn');
    
    // Skip preloader if it has already been shown in this session
    if (sessionStorage.getItem('preloaderShown') === 'true') {
        if (preloader) preloader.style.display = 'none';
        document.body.classList.remove('loading');
        return;
    }

    let preloaderCompleted = false;
    let pageLoaded = false;
    let enterClicked = false;
    let forceExit = false;

    if (preloader && enterBtn) {
        // If GSAP is not loaded, we run a native setTimeout to fade it in after 5 seconds
        if (typeof gsap === 'undefined') {
            setTimeout(() => {
                enterBtn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                enterBtn.style.opacity = '1';
                enterBtn.style.pointerEvents = 'auto';
                enterBtn.style.transform = 'translateY(0)';
            }, 5000);
        }

        const executeEnter = () => {
            if (preloaderCompleted) return;
            
            if (enterClicked && (pageLoaded || forceExit)) {
                preloaderCompleted = true;
                
                // Save flag to skip preloader on subsequent page navigations in this session
                sessionStorage.setItem('preloaderShown', 'true');
                
                if (typeof gsap !== 'undefined') {
                    // GSAP Premium Lift
                    const exitTl = gsap.timeline({
                        onComplete: () => {
                            preloader.style.display = 'none';
                            document.body.classList.remove('loading');
                            if (typeof ScrollTrigger !== 'undefined') {
                                ScrollTrigger.refresh();
                            }
                        }
                    });
                    
                    exitTl.to('.preloader-logo, .preloader-enter-btn', {
                        opacity: 0,
                        y: -35,
                        duration: 0.4,
                        ease: 'power2.in'
                    })
                    .to(preloader, {
                        opacity: 0,
                        yPercent: -100,
                        duration: 0.7,
                        ease: 'power3.inOut'
                    }, '-=0.1');
                } else {
                    // Vanilla Fallback Lift
                    preloader.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    preloader.style.opacity = '0';
                    preloader.style.transform = 'translateY(-100%)';
                    document.body.classList.remove('loading');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 600);
                }
            }
        };

        enterBtn.addEventListener('click', () => {
            enterClicked = true;
            if (!pageLoaded && !forceExit) {
                enterBtn.innerText = "Loading...";
                enterBtn.style.borderColor = "rgba(255, 255, 255, 0.2)";
                enterBtn.style.color = "rgba(255, 255, 255, 0.4)";
                enterBtn.style.cursor = "not-allowed";
                enterBtn.style.pointerEvents = "none";
            }
            executeEnter();
        });

        // Track page load
        if (document.readyState === 'complete') {
            pageLoaded = true;
            if (enterClicked) executeEnter();
        } else {
            window.addEventListener('load', () => {
                pageLoaded = true;
                if (enterBtn && enterClicked) {
                    enterBtn.innerText = "Enter Site";
                }
                executeEnter();
            });
        }

        // Fail-safe (adjusted to 9 seconds to accommodate the 5s loading screen)
        setTimeout(() => {
            forceExit = true;
            pageLoaded = true;
            if (enterBtn && enterClicked) {
                enterBtn.innerText = "Enter Site";
            }
            executeEnter();
        }, 9000);
    }
})();

if (typeof gsap !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
} else {
    console.warn('GSAP library is not loaded. Falling back to static layout.');
}

function initAnimations() {
    console.log("initAnimations() called. Document readyState: " + document.readyState);
    
    // -- Premium Entrance Animations (runs only if GSAP loads) --
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Logo entry (immediate)
        gsap.from('.preloader-logo', { opacity: 0, scale: 0.95, duration: 0.8, delay: 0.1, ease: 'power2.out' });
        // Enter button entry (delayed by 1 second)
        gsap.to('.preloader-enter-btn', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay: 1.0, 
            ease: 'power2.out',
            onComplete: () => {
                // Enable click interactions and clear inline transform for CSS hover animations
                gsap.set('.preloader-enter-btn', { pointerEvents: 'auto' });
                gsap.set('.preloader-enter-btn', { clearProps: 'transform' });
            }
        });
    }
    
    // Prevent FOUC: Set hero containers visible
    gsap.set('.hero-content, .hero-content-overlay, .about-hero-content, .legal-hero-content, .accounting-hero-content, .security-hero-content', { opacity: 1 });

    // 1. Homepage Hero Timeline (Immediate play on load)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (document.querySelector('.hero-section')) {
        heroTl.from('.hero-content-overlay .hero-title', { opacity: 0, y: 40, duration: 0.8, delay: 0.2 })
              .from('.hero-content-overlay .hero-desc', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
              .from('.hero-content-overlay .hero-btns', { opacity: 0, y: 20, duration: 0.5 }, '-=0.4')
              .from('.hero-slider-dots', { opacity: 0, duration: 0.5 }, '-=0.3');
    }

    // Subpages Hero banners
    const subpageHero = document.querySelector('.about-hero-content, .legal-hero-content, .accounting-hero-content, .security-hero-content');
    console.log("Subpage hero element found:", subpageHero !== null);
    if (subpageHero) {
        const heroTag = subpageHero.querySelector('.hero-tag');
        const heroH1 = subpageHero.querySelector('h1');
        const heroP = subpageHero.querySelector('p');
        console.log("Hero Tag:", heroTag !== null, "H1:", heroH1 !== null, "P:", heroP !== null);
        
        if (heroTag) heroTl.from(heroTag, { opacity: 0, y: 20, duration: 0.5, delay: 0.1 });
        if (heroH1) heroTl.from(heroH1, { opacity: 0, y: 30, duration: 0.7 }, heroTag ? '-=0.3' : '+=0.1');
        if (heroP) heroTl.from(heroP, { opacity: 0, y: 20, duration: 0.5 }, '-=0.4');
    }

    // Set flag indicating hero/animations are initialized (removes js-active FOUC block)
    window.animationsInitialized = true;

    // 2. Scroll Animations using IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
        console.warn("IntersectionObserver not supported!");
        return;
    }

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -2% 0px', // trigger when element is 2% above the bottom of the viewport
        threshold: 0.01 // trigger as soon as 1% of the element is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            console.log("IntersectionObserver callback triggered. Element:", entry.target.className, "isIntersecting:", entry.isIntersecting);
            if (entry.isIntersecting) {
                const target = entry.target;
                animateElement(target);
                obs.unobserve(target);
            }
        });
    }, observerOptions);

    // A. Vertical Reveals (opacity 0, y 30)
    const yRevealSelector = [
        '.section-header',
        '.solution-card',
        '.value-card',
        '.security-card',
        '.testimonial-card',
        '.why-card-item',
        '.step-card',
        '.industry-card',
        '.trust-item',
        '.vision-mission-card',
        '.founder-message-left',
        '.specialist-box'
    ].join(', ');

    document.querySelectorAll(yRevealSelector).forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        el.dataset.animType = 'y-reveal';
        observer.observe(el);
    });

    // B. Left-aligned Reveals (opacity 0, x -40)
    const leftRevealSelector = [
        '.intro-content-left',
        '.contact-info-left',
        '.traditional-model'
    ].join(', ');

    document.querySelectorAll(leftRevealSelector).forEach(el => {
        gsap.set(el, { opacity: 0, x: -40 });
        el.dataset.animType = 'left-reveal';
        observer.observe(el);
    });

    // C. Right-aligned Reveals (opacity 0, x 40)
    const rightRevealSelector = [
        '.intro-image-right',
        '.contact-form-right',
        '.founder-portrait',
        '.lansem-model'
    ].join(', ');

    document.querySelectorAll(rightRevealSelector).forEach(el => {
        gsap.set(el, { opacity: 0, x: 40 });
        el.dataset.animType = 'right-reveal';
        observer.observe(el);
    });

    // D. Enhance CTA Buttons (Magnetic Proximity Hover & Glow Effects)
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1.1, 0.4)'
            });
        });
    });

    // Breathing glow animation for primary CTA buttons
    gsap.to('.btn-primary', {
        boxShadow: '0 8px 24px rgba(2, 132, 199, 0.45)',
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: 'power1.inOut'
    });

    // Fallback/Fail-safe: reveal all observed elements if they are still hidden when scrolling close to the bottom
    const revealAllOnScrollBottom = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        console.log("revealAllOnScrollBottom check. scrollPosition: " + scrollPosition + ", pageHeight: " + pageHeight + ", innerHeight: " + window.innerHeight);
        
        // If within 150px of the bottom, or at the bottom
        if (scrollPosition >= pageHeight - 150) {
            console.log("Near bottom of page! Force-revealing any remaining elements...");
            document.querySelectorAll('[data-anim-type]').forEach(el => {
                const computedOpacity = parseFloat(window.getComputedStyle(el).opacity);
                if (computedOpacity === 0) {
                    console.log("Force-revealing element: " + el.className + " (" + el.tagName + ")");
                    animateElement(el);
                }
            });
        }
    };
    window.addEventListener('scroll', revealAllOnScrollBottom);
    window.addEventListener('resize', revealAllOnScrollBottom);
    window.addEventListener('load', revealAllOnScrollBottom); // run on full load too
    
    // Initial check
    setTimeout(revealAllOnScrollBottom, 100);
}

function animateElement(target) {
    const type = target.dataset.animType;
    console.log("Animating element: Class='" + target.className + "', Tag='" + target.tagName + "', Type='" + type + "'");
    
    if (type === 'y-reveal') {
        gsap.to(target, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    } 
    else if (type === 'left-reveal') {
        gsap.to(target, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
    } 
    else if (type === 'right-reveal') {
        if (target.classList.contains('lansem-model')) {
            gsap.to(target, { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' });
        } else {
            gsap.to(target, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        }
    }
}
