// Updated JavaScript for the mobile menu functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.body = document.body;
        this.init();
    }

    init() {
        this.initializeSmoothScrolling();
        this.initializeNavbarScroll();
        this.initializeMobileMenu();
        this.updateActiveNavLink();
    }

    initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    this.closeMobileMenu();
                    return;
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = this.navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    this.closeMobileMenu();
                }
            });
        });
    }

    initializeNavbarScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            this.updateActiveNavLink();
        });
    }

    initializeMobileMenu() {
        if (!this.mobileMenuToggle) return;

        // Toggle mobile menu
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        const allNavLinks = this.navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinks.classList.contains('active') && 
                !this.navLinks.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        this.body.classList.toggle('menu-open');
        
        // Update button text accessibility
        const isOpen = this.navLinks.classList.contains('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    }

    closeMobileMenu() {
        this.mobileMenuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = this.navbar.offsetHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 50)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === 'home' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const navigation = new Navigation();
});