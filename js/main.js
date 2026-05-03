// Main JavaScript File - Initialization and Core Functionality

class WebsiteApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeNavigation();
            this.initializeAnimations();
            // this.initializeForms(); // REMOVE THIS LINE - forms are handled in contact.js
            this.initializeScrollEffects();
        });
    }

    initializeNavigation() {
        // Navigation is handled in navigation.js
        console.log('Navigation initialized');
    }

    initializeAnimations() {
        // Animations are handled in animations.js
        console.log('Animations initialized');
    }

    // REMOVE THIS ENTIRE METHOD or comment it out
    /*
    initializeForms() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit);
        }
    }
    */

    initializeScrollEffects() {
        // Add scroll-triggered animations
        this.initializeScrollAnimations();
    }

    // REMOVE THIS ENTIRE METHOD or comment it out
    /*
    handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        event.target.reset();
    }
    */

    initializeScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe all sections for scroll animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize the website application
const websiteApp = new WebsiteApp();