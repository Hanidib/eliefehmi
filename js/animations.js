// Animations JavaScript - Page animations and effects

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.initializeHeroAnimations();
        this.initializeScrollAnimations();
        this.initializeHoverEffects();
    }

    initializeHeroAnimations() {
        // Hero section animations are handled by CSS
        // Additional JavaScript animations can be added here if needed
        console.log('Hero animations initialized');
    }

    initializeScrollAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    if (entry.target.classList.contains('services-cards') || 
                        entry.target.classList.contains('testimonials-container')) {
                        this.staggerAnimation(entry.target.children);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for scroll animations
        document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }

    staggerAnimation(elements) {
        Array.from(elements).forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200);
        });
    }

    initializeHoverEffects() {
        // Additional hover effects beyond CSS
        this.initializeCardHoverEffects();
        this.initializeImageHoverEffects();
    }

    initializeCardHoverEffects() {
        // Enhanced card hover effects
        document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.enhanceCardHover(e.currentTarget);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.resetCardHover(e.currentTarget);
            });
        });
    }

    enhanceCardHover(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.transition = 'all 0.3s ease';
    }

    resetCardHover(card) {
        card.style.transform = 'translateY(0) scale(1)';
    }

    initializeImageHoverEffects() {
        // Enhanced image hover effects
        document.querySelectorAll('.gallery-item, .contact-image').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'transform 0.5s ease';
                }
            });
            
            item.addEventListener('mouseleave', (e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Utility function for fade-in animations
    fadeIn(element, duration = 500) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Utility function for slide-in animations
    slideIn(element, direction = 'left', duration = 500) {
        const transformMap = {
            'left': 'translateX(-100px)',
            'right': 'translateX(100px)',
            'up': 'translateY(100px)',
            'down': 'translateY(-100px)'
        };

        element.style.transform = transformMap[direction] || transformMap['left'];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease`;

        setTimeout(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        }, 100);
    }
}

// Initialize animations
const animations = new Animations();