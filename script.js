// Intersection Observer for Scroll Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const animatedElements = document.querySelectorAll('.slide-up, .slide-left, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));
};

// Form submission handler
const handleFormSubmission = () => {
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');

            btn.textContent = 'SENDING...';
            btn.style.backgroundColor = 'rgba(255,255,255,0.2)';

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your enquiry. Our team will contact you soon.');
                form.reset();
                btn.textContent = 'SUBMIT';
                btn.style.backgroundColor = 'transparent';
            }, 1000);
        });
    }
};

// Navbar shrink on scroll
const handleNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    handleFormSubmission();
    handleNavbarScroll();

    // Smooth scrolling without adding hash (#) to URL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check Business Hours Status
    const checkBusinessStatus = () => {
        const statusEl = document.getElementById('currentStatusText');
        if (!statusEl) return;

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday...
        const hours = now.getHours();

        let isOpen = false;

        // Sunday: 10 am – 1 pm
        if (day === 0) {
            if (hours >= 10 && hours < 13) {
                isOpen = true;
            }
        }
        // Mon-Sat: 9 am – 8 pm
        else {
            if (hours >= 9 && hours < 20) {
                isOpen = true;
            }
        }

        if (isOpen) {
            statusEl.textContent = 'Open';
            statusEl.style.color = '#188038'; // Google open green color
        } else {
            statusEl.textContent = 'Closed';
            statusEl.style.color = '#d93025'; // Google closed red color
        }
    };

    checkBusinessStatus();
    setInterval(checkBusinessStatus, 60000); // Check every minute

    // Hours dropdown functionality
    const hoursToggle = document.getElementById('hoursDropdownToggle');
    const hoursList = document.getElementById('hoursList');
    const toggleIcon = hoursToggle?.querySelector('.toggle-icon');

    if (hoursToggle && hoursList) {
        hoursToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing it
            const isVisible = hoursList.style.display === 'block';
            hoursList.style.display = isVisible ? 'none' : 'block';
            if (toggleIcon) {
                toggleIcon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!hoursToggle.contains(e.target) && !hoursList.contains(e.target)) {
                hoursList.style.display = 'none';
                if (toggleIcon) {
                    toggleIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Duplicate brands track for seamless marquee
    const track = document.querySelector('.brands-track');
    if (track) {
        track.innerHTML += track.innerHTML;
    }

    // Futuristic Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        };

        const resetSlider = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlider();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlider();
            });
        });

        startSlider();
    }
});
