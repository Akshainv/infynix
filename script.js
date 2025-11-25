/* ===================================
   INFYNIX SOLUTIONS - JAVASCRIPT
   Professional interactions and animations
   =================================== */

// === SMOOTH SCROLLING FOR ALL NAVIGATION LINKS ===
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for all anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === HEADER SCROLL EFFECT ===
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        } else {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
            header.style.padding = '20px 0';
        }

        lastScroll = currentScroll;
    });

    // === ACTIVE NAVIGATION HIGHLIGHT ===
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // === GET STARTED BUTTON - SCROLL TO CONTACT ===
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the form
                setTimeout(() => {
                    const contactForm = document.querySelector('.contact-form');
                    if (contactForm) {
                        contactForm.style.animation = 'formPulse 0.6s ease-in-out';
                        setTimeout(() => {
                            contactForm.style.animation = '';
                        }, 600);
                    }
                }, 800);
            }
        });
    }

    // === HERO BUTTONS ===
    const exploreServicesBtn = document.querySelector('.hero-buttons .btn-primary');
    const scheduleConsultationBtn = document.querySelector('.hero-buttons .btn-secondary');

    if (exploreServicesBtn) {
        exploreServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#services').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scheduleConsultationBtn) {
        scheduleConsultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // === CONTACT FORM HANDLING ===
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                showNotification('Thank you! We will get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Log form data (replace with actual submission)
                console.log('Form submitted:', formData);
                
                // You can add your actual form submission here:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });
                
            }, 1500);
        });
    }

    // === NOTIFICATION SYSTEM ===
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .industry-card, .stat-item, .feature-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // === COUNTER ANIMATION FOR STATS ===
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let counted = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = stat.textContent;
                    const isPercentage = target.includes('%');
                    const isPlusSign = target.includes('+');
                    const numericValue = parseInt(target.replace(/\D/g, ''));
                    
                    animateCounter(stat, 0, numericValue, 2000, isPercentage, isPlusSign);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, start, end, duration, isPercentage, isPlusSign) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            let displayValue = current;
            
            if (isPlusSign) {
                displayValue += '+';
            }
            if (isPercentage) {
                displayValue += '%';
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // === SCROLL INDICATOR ===
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // === PARALLAX EFFECT FOR FLOATING SHAPES ===
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // === PRODUCT "LEARN MORE" BUTTON ===
    const productLearnMoreBtn = document.querySelector('.product .btn-primary');
    
    if (productLearnMoreBtn) {
        productLearnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // You can link to a dedicated product page or show a modal
            showNotification('Product details page coming soon!', 'success');
            // Or navigate to a product page:
            // window.location.href = '/products/bioenable';
        });
    }

    // === SERVICE LINKS ===
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Service details page coming soon!', 'success');
            // Or navigate to service pages:
            // window.location.href = this.getAttribute('href');
        });
    });

    // === LOADING ANIMATION ON PAGE LOAD ===
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // === SOCIAL MEDIA LINKS (Add your actual URLs) ===
    const socialLinks = document.querySelectorAll('.hero-social a, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Social media link coming soon!', 'success');
            }
        });
    });

    // === MOBILE MENU TOGGLE (if you want to add mobile menu later) ===
    // You can add a hamburger menu for mobile devices here

    console.log('Infynix Solutions - Website Loaded Successfully! 🚀');
});


document.head.appendChild(style);