// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.skill-progress');

    // Theme Management
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );
    });

    // Active Navigation Link
    function setActiveNavLink() {
        const fromTop = window.scrollY + 100;
        
        sections.forEach(section => {
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (!link) return;

            const { offsetTop, offsetHeight } = section;
            
            if (fromTop >= offsetTop && fromTop < offsetTop + offsetHeight) {
                navLinksArray.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    // Navbar Scroll Effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        setActiveNavLink();
    }

    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('load', handleNavbarScroll);

    // Mobile Menu Toggle
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    hamburger?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            toggleMenu();
        }
    });

    // Smooth Scroll for Navigation Links
    navLinksArray.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }

                // Update active state
                navLinksArray.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Portfolio Filtering
    filterBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to the clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio Item Hover Effect
    portfolioItems?.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '0';
        });
    });

    // Initialize skill bars
    function initializeSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.style.getPropertyValue('--progress');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = progress;
            }, 200);
        });
    }

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'about') {
                    initializeSkillBars();
                }
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Contact Form Handling with Validation
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Input validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields correctly', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                inputs.forEach(input => {
                    input.classList.remove('valid');
                });
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Input validation helper
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;

        if (input.required && !value) {
            isValid = false;
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }

        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);

        return isValid;
    }

    // Notification helper
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Animation Functions
    function createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size
        const size = Math.random() * 20 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Set position
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        
        document.body.appendChild(bubble);
        
        // Remove bubble after animation
        bubble.addEventListener('animationend', () => bubble.remove());
    }

    // Create bubbles on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) { // Only create bubbles 10% of the time
            createBubble(e.clientX, e.clientY);
        }
    });

    // Star bubble effect for profile image
    function createStarBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'star-bubble';
        
        // Random movement direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        
        bubble.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        bubble.style.setProperty('--y', `${Math.sin(angle) * distance - distance}px`);
        
        // Set initial position
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        
        document.body.appendChild(bubble);
        
        // Remove after animation
        setTimeout(() => bubble.remove(), 2000);
    }

    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create multiple star bubbles
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 30;
                    const y = centerY + Math.sin(angle) * 30;
                    createStarBubble(x, y);
                }, i * 100);
            }
        });
    }

    // Rainbow text effect
    const rainbowTexts = document.querySelectorAll('.rainbow-text');
    rainbowTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
    });

    // Animated background
    function createAnimatedBackground() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const bg = document.createElement('div');
            bg.className = 'animated-bg';
            section.insertBefore(bg, section.firstChild);
        });
    }

    // Initialize animations
    createAnimatedBackground();
    
    // Add pulse effect to elements
    document.querySelectorAll('.pulse-effect').forEach(element => {
        element.classList.add('pulse');
    });
    
    // Add rainbow border to elements
    document.querySelectorAll('.rainbow-border-effect').forEach(element => {
        element.classList.add('rainbow-border');
    });
});

// Portfolio Items Data
const portfolioItems = [
    {
        title: 'E-commerce Website',
        category: 'web',
        image: 'assets/images/portfolio/ecommerce.jpg',
        description: 'A modern e-commerce platform with responsive design and smooth user experience.',
        downloadLink: '#'
    },
    {
        title: 'Brand Identity Package',
        category: 'design',
        image: 'assets/images/portfolio/branding.jpg',
        description: 'Complete brand identity design including logo, color scheme, and typography.',
        downloadLink: '#'
    },
    {
        title: 'Network Infrastructure Setup',
        category: 'network',
        image: 'assets/images/portfolio/network.jpg',
        description: 'Complete network infrastructure setup for a corporate office with advanced security features.',
        downloadLink: '#'
    },
    {
        title: 'Mobile App Design',
        category: 'design',
        image: 'assets/images/portfolio/mobile-app.jpg',
        description: 'User interface design for a mobile application with modern aesthetics.',
        downloadLink: '#'
    },
    {
        title: 'Portfolio Website',
        category: 'web',
        image: 'assets/images/portfolio/portfolio.jpg',
        description: 'Personal portfolio website with interactive features and animations.',
        downloadLink: '#'
    },
    {
        title: 'Server Configuration',
        category: 'network',
        image: 'assets/images/portfolio/server.jpg',
        description: 'Enterprise server configuration and optimization for improved performance.',
        downloadLink: '#'
    }
];