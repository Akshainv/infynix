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

   // === CONTACT FORM HANDLING WITH EMAILJS - FIXED VERSION ===
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fromName = document.getElementById('from_name').value;
        const replyTo = document.getElementById('reply_to').value;
        const phone = document.getElementById('phone').value;
        const company = document.getElementById('company').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Validate required fields
        if (!fromName || !replyTo || !message || !service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(replyTo)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

     // Create template parameters object
        const templateParams = {
            name: fromName,
            from_name: fromName,
            user_name: fromName,
            to_name: fromName,
            from_email: replyTo,
            user_email: replyTo,
            reply_to: replyTo,
            email: replyTo,
            phone: phone || 'Not provided',
            company: company || 'Not provided',
            service: service,
            message: message
        };
        // Send email using EmailJS with explicit parameters
        emailjs.send('service_sntefqo', 'template_mfp5jjs', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Success message
                showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
            }, function(error) {
                console.error('FAILED...', error);
                
                // Error message
                showNotification('Oops! Something went wrong. Please try again or contact us directly at akshaiachu012@gmail.com', 'error');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
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
            // Navigate to BioEnable product details page
            window.location.href = 'index2.html';
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