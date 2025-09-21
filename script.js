document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('showMoreBtn');
    let showingAll = false;
    
    function initializeProjectDisplay() {
        // Show first 6 projects (2 major + 4 mini), hide the rest
        let visibleCount = 0;
        projectCards.forEach(card => {
            if (visibleCount < 6) {
                card.style.display = 'flex';
                card.classList.remove('hidden', 'show');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
        showingAll = false;
        updateShowMoreButton();
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Reset show more state
            showingAll = false;
            updateShowMoreButton();
            
            // Filter projects
            let visibleCount = 0;
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    if (visibleCount < 6) {
                        card.style.display = 'flex';
                        card.classList.remove('hidden', 'show');
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                        card.classList.remove('show');
                    }
                } else if (filter === category) {
                    if (filter === 'major') {
                        // Show all major projects
                        card.style.display = 'flex';
                        card.classList.remove('hidden', 'show');
                    } else if (filter === 'mini') {
                        // Show first 6 mini projects initially
                        if (visibleCount < 6) {
                            card.style.display = 'flex';
                            card.classList.remove('hidden', 'show');
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                            card.classList.remove('show');
                        }
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize display on page load
    initializeProjectDisplay();
    
    // Show More/Less functionality
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            
            if (!showingAll) {
                // Show all remaining projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (card.classList.contains('hidden')) {
                        if (activeFilter === 'all' || activeFilter === category) {
                            card.style.display = 'flex';
                            card.classList.add('show');
                            card.classList.remove('hidden');
                        }
                    }
                });
                showingAll = true;
                updateShowMoreButton();
            } else {
                // Hide projects beyond first 6
                let visibleCount = 0;
                projectCards.forEach(card => {
                    if (activeFilter === 'all') {
                        if (visibleCount < 6) {
                            card.style.display = 'flex';
                            card.classList.remove('hidden', 'show');
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                            card.classList.remove('show');
                        }
                    } else if (activeFilter === 'major') {
                        // For major projects, show all (only 2)
                        card.style.display = 'flex';
                        card.classList.remove('hidden', 'show');
                    } else if (activeFilter === 'mini') {
                        // For mini projects, show first 6
                        if (visibleCount < 6) {
                            card.style.display = 'flex';
                            card.classList.remove('hidden', 'show');
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                            card.classList.remove('show');
                        }
                    }
                });
                showingAll = false;
                updateShowMoreButton();
            }
        });
    }
    
    function updateShowMoreButton() {
        if (showMoreBtn) {
            showMoreBtn.textContent = showingAll ? 'Show Less Projects' : 'Show More Projects';
        }
    }
    
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Typing Effect
    const typingElement = document.querySelector('.hero-text h1');
    if (typingElement) {
        const originalText = typingElement.textContent;
        const highlightSpan = typingElement.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'typing-wrapper';
        typingElement.innerHTML = '';
        typingElement.appendChild(typingWrapper);
        
        const firstPart = originalText.replace(highlightText, '').trim();
        
        const staticText = document.createElement('span');
        staticText.textContent = firstPart + ' ';
        typingWrapper.appendChild(staticText);
        
        const typingTextElement = document.createElement('span');
        typingTextElement.className = 'highlight typing-text';
        typingWrapper.appendChild(typingTextElement);
        
        const cursorElement = document.createElement('span');
        cursorElement.className = 'typing-cursor';
        cursorElement.textContent = '|';
        typingWrapper.appendChild(cursorElement);
        
        const words = ['ML Engineer','Math grad', 'Data Scientist'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeDelay = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeDelay = 100;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeDelay = 200;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeDelay = 1500;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeDelay = 500;
            }
            
            setTimeout(type, typeDelay);
        }
        
        setTimeout(type, 1000);
        
        const style = document.createElement('style');
        style.textContent = `
            .typing-wrapper {
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
                line-height: 1.2;
                white-space: nowrap;
                overflow: hidden;
            }
            .typing-text {
                display: inline-block;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .typing-cursor {
                display: inline-block;
                margin-left: 2px;
                animation: blink 1s infinite;
                min-width: 1ch;
                flex-shrink: 0;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});