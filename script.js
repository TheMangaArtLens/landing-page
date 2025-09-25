// App Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get all download buttons
    const downloadButtons = document.querySelectorAll('#downloadBtn, #heroDownloadBtn, #aboutDownloadBtn, #ctaDownloadBtn');
    const comingSoonModal = document.getElementById('comingSoonModal');
    const successModal = document.getElementById('successModal');
    const notifyForm = document.getElementById('notifyForm');
    const closeButtons = document.querySelectorAll('.close, #closeSuccessModal');

    // Open modal when download button is clicked
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            comingSoonModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add animation class
            comingSoonModal.classList.add('show');
        });
    });

    // Close modal functions
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('show');
    }

    // Close modal when clicking close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('close')) {
                closeModal(comingSoonModal);
            } else {
                closeModal(successModal);
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === comingSoonModal) {
            closeModal(comingSoonModal);
        }
        if (event.target === successModal) {
            closeModal(successModal);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(comingSoonModal);
            closeModal(successModal);
        }
    });

    // Handle form submission
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const userEmail = document.getElementById('userEmail').value.trim();
        const userPhone = document.getElementById('userPhone').value.trim();
        
        // Basic validation
        if (!userName || !userEmail) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(userEmail)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        const submitButton = notifyForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store user data (in real app, send to server)
            const userData = {
                name: userName,
                email: userEmail,
                phone: userPhone,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage for demo purposes
            const existingUsers = JSON.parse(localStorage.getItem('appWaitlist') || '[]');
            existingUsers.push(userData);
            localStorage.setItem('appWaitlist', JSON.stringify(existingUsers));
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Close coming soon modal and show success modal
            closeModal(comingSoonModal);
            successModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Update success message with user's name
            const successMessage = successModal.querySelector('.success-message');
            successMessage.innerHTML = `Thank you, <strong>${userName}</strong>! We've received your information and will notify you at <strong>${userEmail}</strong> as soon as the app is ready for download.`;
            
        }, 1500);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Close notification
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .about-text, .about-image, .section-header, .showcase-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Button click animations with ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 1000 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 1000 ? '+' : '');
            }
        }
        
        updateCounter();
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat h3');
                statNumbers.forEach((stat, index) => {
                    const targets = [50000, 4.9, 100]; // 50K+, 4.9★, 100%
                    const suffixes = ['+', '★', '%'];
                    const target = targets[index];
                    
                    // Special handling for star rating
                    if (index === 1) {
                        let current = 0;
                        const increment = 4.9 / (2000 / 16);
                        function updateStar() {
                            current += increment;
                            if (current < 4.9) {
                                stat.textContent = current.toFixed(1) + '★';
                                requestAnimationFrame(updateStar);
                            } else {
                                stat.textContent = '4.9★';
                            }
                        }
                        updateStar();
                    } else {
                        animateCounter(stat, target);
                        stat.textContent = target + suffixes[index];
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Form input animations
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add CSS for animations
    const animationCSS = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .form-group.focused input {
            border-color: #6366f1;
            background: white;
        }
        
        .modal.show {
            animation: fadeIn 0.3s ease;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = animationCSS;
    document.head.appendChild(style);

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const rate = scrolled * -0.2;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Tab navigation for modal
        if (comingSoonModal.style.display === 'block') {
            if (e.key === 'Tab') {
                const focusableElements = comingSoonModal.querySelectorAll('button, input, [tabindex]');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });

    // Console log for developers
    console.log(`
    🚀 App Landing Page Loaded Successfully!
    
    Features:
    ✅ Coming Soon Modal
    ✅ Email Collection Form
    ✅ Smooth Animations
    ✅ Responsive Design
    ✅ Form Validation
    
    To test the waitlist functionality, click any download button!
    `);
});