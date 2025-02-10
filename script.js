// Hamburger menu functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileNav.style.display = mobileNav.classList.contains('active') ? 'block' : 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNav.style.display = 'none';
    });
});

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scroll-to-top');
const realizacjeSection = document.getElementById('realizacje');

const toggleScrollButton = () => {
    if (realizacjeSection.getBoundingClientRect().top <= 0) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
};

window.addEventListener('scroll', toggleScrollButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll to top functionality for the logo
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll');
        observer.observe(title);
    });

    // Observe contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('animate-on-scroll');
        observer.observe(contactForm);
    }

    // Add smooth scroll for navigation links
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

    // Portfolio functionality
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioContainer = document.querySelector('.portfolio-items-container');
    const portfolioMobileInfo = document.querySelector('.portfolio-mobile-info');
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    
    // Check if device has touch capability
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 ||
                         navigator.msMaxTouchPoints > 0;
    
    if (portfolioContainer) {
        const portfolioItems = Array.from(portfolioContainer.querySelectorAll('.portfolio-item'));
        
        if (portfolioItems.length === 0) return;

        // Portfolio navigation functions
        const scrollToNextItem = () => {
            const itemWidth = portfolioItems[0].offsetWidth;
            const currentScroll = portfolioContainer.scrollLeft;
            const gap = 32; // Gap between items
            
            portfolioContainer.scrollTo({
                left: currentScroll + itemWidth + gap,
                behavior: 'smooth'
            });
        };

        const scrollToPrevItem = () => {
            const itemWidth = portfolioItems[0].offsetWidth;
            const currentScroll = portfolioContainer.scrollLeft;
            const gap = 32; // Gap between items
            
            portfolioContainer.scrollTo({
                left: currentScroll - (itemWidth + gap),
                behavior: 'smooth'
            });
        };

        // Add click event listeners to navigation arrows
        if (prevButton && nextButton) {
            nextButton.addEventListener('click', scrollToNextItem);
            prevButton.addEventListener('click', scrollToPrevItem);
        }

        // Update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            if (!prevButton || !nextButton) return;
            
            const isAtStart = portfolioContainer.scrollLeft === 0;
            const isAtEnd = portfolioContainer.scrollLeft + portfolioContainer.offsetWidth >= portfolioContainer.scrollWidth;

            prevButton.style.opacity = isAtStart ? '0.5' : '1';
            nextButton.style.opacity = isAtEnd ? '0.5' : '1';
            
            prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
            nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };

        // Update mobile info based on scroll position
        const updateMobileInfo = () => {
            if (!portfolioMobileInfo) return;
            
            const containerWidth = portfolioContainer.offsetWidth;
            const scrollPosition = portfolioContainer.scrollLeft;
            const itemWidth = portfolioItems[0].offsetWidth + 32; // Adding gap
            
            // Calculate progress through current item (0 to 1)
            const progress = (scrollPosition % itemWidth) / itemWidth;
            // Calculate current index based on scroll position
            const baseIndex = Math.floor(scrollPosition / itemWidth);
            // Start transition much earlier - at 15% through the scroll
            const currentIndex = progress > 0.15 ? baseIndex + 1 : baseIndex;
            
            if (currentIndex >= 0 && currentIndex < portfolioItems.length) {
                const currentItem = portfolioItems[currentIndex];
                const titleElement = currentItem.querySelector('h3');
                const linkElement = currentItem.querySelector('.view-site');
                
                if (titleElement && linkElement) {
                    const title = titleElement.textContent;
                    const url = linkElement.getAttribute('href');
                    const currentTitle = portfolioMobileInfo.querySelector('h3');
                    
                    if (currentTitle && currentTitle.textContent !== title) {
                        currentTitle.classList.add('fade-out');
                        
                        setTimeout(() => {
                            portfolioMobileInfo.innerHTML = `
                                <div class="portfolio-nav">
                                    <button class="nav-arrow prev">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M15 18l-6-6 6-6"/>
                                        </svg>
                                    </button>
                                    <button class="nav-arrow next">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M9 18l6-6-6-6"/>
                                        </svg>
                                    </button>
                                </div>
                                <h3 class="fade-in">${title}</h3>
                                <a href="${url}" target="_blank" class="view-site">Zobacz stronę</a>
                            `;

                            // Re-attach event listeners to new buttons
                            const newPrevButton = portfolioMobileInfo.querySelector('.nav-arrow.prev');
                            const newNextButton = portfolioMobileInfo.querySelector('.nav-arrow.next');
                            
                            if (newPrevButton && newNextButton) {
                                newPrevButton.addEventListener('click', scrollToPrevItem);
                                newNextButton.addEventListener('click', scrollToNextItem);
                            }
                        }, 75);
                    }
                }
            }
        };

        // Listen for scroll events
        portfolioContainer.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                updateMobileInfo();
                updateArrowVisibility();
            });
        });

        // Update on resize
        window.addEventListener('resize', () => {
            updateMobileInfo();
            updateArrowVisibility();
        });

        // Initial updates
        updateMobileInfo();
        updateArrowVisibility();

        // Initialize lazy loading
        if (isTouchDevice) {
            lazyLoadImages();
        }
    }

    // Handle email copy
    const emailLink = document.querySelector('.email-copy');
    const toast = document.getElementById('toast');

    if (emailLink && toast) {
        emailLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = emailLink.textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    }
});

// Użyj Intersection Observer do lazy loadingu obrazów
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.backgroundImage = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.image-container').forEach(img => {
        const src = img.style.backgroundImage;
        img.dataset.src = src;
        img.style.backgroundImage = 'none';
        imageObserver.observe(img);
    });
}; 