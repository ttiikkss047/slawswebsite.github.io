// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initFormValidation();
    initSmoothScrolling();
    initPhoneFormatting();
    initAudioControls();
    updateCurrentYear();
    initRealTimeFeedback();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.setAttribute('aria-label', 'Փակել մենյուն');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.setAttribute('aria-label', 'Բացել մենյուն');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileMenuBtn.setAttribute('aria-label', 'Բացել մենյուն');
                }
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navList.contains(event.target)) {
                navList.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-label', 'Բացել մենյուն');
            }
        });
    }
}

// Smooth Scrolling Functionality
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Phone Number Formatting
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format for Armenian phone numbers
            if (value.length > 0) {
                if (!value.startsWith('374')) {
                    value = '374' + value;
                }
                
                // Format: +374 XX XXXXXXX
                let formatted = '+374 ';
                if (value.length > 3) {
                    formatted += value.substring(3, 5) + ' ';
                }
                if (value.length > 5) {
                    formatted += value.substring(5, 12);
                }
                
                e.target.value = formatted;
            }
        });
        
        // Validate phone number on blur
        phoneInput.addEventListener('blur', function() {
            const phoneRegex = /^\+374\s\d{2}\s\d{6,7}$/;
            const errorElement = document.getElementById('phoneError');
            
            if (!phoneRegex.test(this.value.trim())) {
                if (errorElement) {
                    errorElement.textContent = 'Խնդրում ենք մուտքագրել վավեր հեռախոսահամար (+374 XX XXXXXXX)';
                }
                this.style.borderColor = 'var(--danger)';
            } else {
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.style.borderColor = '#ddd';
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBookingForm()) {
                // Simulate form submission
                const feedbackElement = document.getElementById('formFeedback');
                feedbackElement.textContent = 'Ձեր ամրագրումը հաջողությամբ ուղարկված է! Մենք կկապնվենք ձեզ հետ մոտակա ժամանակում։';
                feedbackElement.className = 'form-feedback success';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    bookingForm.reset();
                    feedbackElement.textContent = '';
                    feedbackElement.className = 'form-feedback';
                }, 3000);
            }
        });
        
        // Real-time validation for each field
        const formFields = bookingForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                validateField(this);
            });
            
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                name.style.borderColor = 'var(--danger)';
                isValid = false;
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                email.style.borderColor = 'var(--danger)';
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.style.borderColor = 'var(--danger)';
                isValid = false;
            }
            
            if (isValid) {
                alert('Շնորհակալություն ձեր հաղորդագրության համար։ Մենք կպատասխանենք հնարավորինս արագ։');
                this.reset();
                
                // Reset border colors
                name.style.borderColor = '#ddd';
                email.style.borderColor = '#ddd';
                message.style.borderColor = '#ddd';
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value && validateEmail(emailInput.value)) {
                alert('Շնորհակալություն բաժանորդագրվելու համար։');
                emailInput.value = '';
            } else {
                emailInput.style.borderColor = 'var(--danger)';
                setTimeout(() => {
                    emailInput.style.borderColor = '#ddd';
                }, 2000);
            }
        });
    }
}

// Validate individual form field
function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error') || 
                        field.parentNode.querySelector('.error-message');
    
    if (!errorElement) return;
    
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Այս դաշտը պարտադիր է';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        if (!validateEmail(field.value)) {
            isValid = false;
            errorMessage = 'Խնդրում ենք մուտքագրել վավեր էլեկտրոնային փոստի հասցե';
        }
    }
    
    // Date validation (future date)
    if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Խնդրում ենք ընտրել ապագայի ամսաթիվ';
        }
    }
    
    // Update UI based on validation
    if (isValid) {
        errorElement.textContent = '';
        field.style.borderColor = '#ddd';
    } else {
        errorElement.textContent = errorMessage;
        field.style.borderColor = 'var(--danger)';
    }
    
    return isValid;
}

// Validate entire booking form
function validateBookingForm() {
    const form = document.getElementById('bookingForm');
    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Audio Controls
function initAudioControls() {
    const audioPlayer = document.querySelector('.relax-music');
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const volumeBtn = document.querySelector('.volume-btn');
    
    if (audioPlayer && playBtn && pauseBtn) {
        playBtn.addEventListener('click', function() {
            audioPlayer.play();
            this.setAttribute('aria-label', 'Նվագարկում է');
        });
        
        pauseBtn.addEventListener('click', function() {
            audioPlayer.pause();
            this.setAttribute('aria-label', 'Կանգնեցված է');
        });
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', function() {
                if (audioPlayer.muted) {
                    audioPlayer.muted = false;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                    this.setAttribute('aria-label', 'Ձայնը միացված է');
                } else {
                    audioPlayer.muted = true;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    this.setAttribute('aria-label', 'Ձայնը անջատված է');
                }
            });
        }
    }
}

// Update Current Year in Footer
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Real-time Feedback for Form
function initRealTimeFeedback() {
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea) {
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.style.fontSize = '0.8rem';
        charCount.style.color = 'var(--gray)';
        charCount.style.marginTop = '0.3rem';
        messageTextarea.parentNode.appendChild(charCount);
        
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length} նիշ`;
            
            if (length > 500) {
                charCount.style.color = 'var(--warning)';
            } else if (length > 1000) {
                charCount.style.color = 'var(--danger)';
            } else {
                charCount.style.color = 'var(--gray)';
            }
        });
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Բացել մենյուն');
        }
    }
    
    // Navigate through form fields with Tab
    if (e.key === 'Tab') {
        // Ensure focus is visible
        const focusedElement = document.activeElement;
        if (focusedElement) {
            focusedElement.style.outline = '2px solid var(--accent)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    const navList = document.querySelector('.nav-list');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Reset mobile menu on larger screens
    if (window.innerWidth > 768 && navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Բացել մենյուն');
        }
    }
});

// Add loading state for form submission
function simulateFormSubmission(form, callback) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ուղարկվում է...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (callback) callback();
    }, 2000);
}

// Initialize tooltips for better UX
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--dark)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Initialize tooltips when DOM is ready
setTimeout(initTooltips, 500);