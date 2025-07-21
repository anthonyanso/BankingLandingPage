
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    // Mobile menu toggle
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Services page category switching
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Remove active class from all buttons and categories
                serviceButtons.forEach(btn => btn.classList.remove('active'));
                serviceCategories.forEach(cat => cat.classList.remove('active'));

                // Add active class to clicked button and corresponding category
                this.classList.add('active');
                const targetCategory = document.getElementById(category);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    const faqIcon = faqItem.querySelector('.faq-question i');
                    if (faqAnswer) faqAnswer.style.maxHeight = null;
                    if (faqIcon) {
                        faqIcon.classList.remove('fa-minus');
                        faqIcon.classList.add('fa-plus');
                    }
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }
            });
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message (in real app, send to server)
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#loginEmail').value;
            const password = this.querySelector('#loginPassword').value;

            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Simple demo login (in real app, authenticate with server)
            alert('Login functionality would be implemented here.');
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = this.querySelector('#firstName').value;
            const lastName = this.querySelector('#lastName').value;
            const email = this.querySelector('#signupEmail').value;
            const password = this.querySelector('#signupPassword').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            // Simple demo signup (in real app, send to server)
            alert('Account created successfully! You can now log in.');
        });
    }

    // Testimonials slider (if exists)
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 1) {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        }

        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.type === 'submit') {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.disabled = true;

                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
    });
});

// Utility functions
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Add some entrance animations
function addEntranceAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    document.querySelectorAll('.feature-card, .service-card, .testimonial-card').forEach((el) => {
        observer.observe(el);
    });
}

// Initialize entrance animations
document.addEventListener('DOMContentLoaded', addEntranceAnimations);
