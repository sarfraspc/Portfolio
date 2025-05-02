  // Create particles
  document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random size
        const size = Math.floor(Math.random() * 3) + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.opacity = opacity;
        
        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        // Add to container
        container.appendChild(particle);
        
        // Move particle
        let posX = x;
        let posY = y;
        let speedX = (Math.random() - 0.5) * 0.5;
        let speedY = (Math.random() - 0.5) * 0.5;
        
        function moveParticle() {
            posX += speedX;
            posY += speedY;
            
            // Boundary check
            if (posX < 0 || posX > window.innerWidth) {
                speedX *= -1;
            }
            
            if (posY < 0 || posY > window.innerHeight) {
                speedY *= -1;
            }
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            
            requestAnimationFrame(moveParticle);
        }
        
        moveParticle();
    }
});
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100;
    document.body.style.setProperty('--scroll-percent', scrollPercent + '%');
    document.body.style.setProperty('--scroll-amount', window.scrollY + 'px');
    
    // Update the progress bar
    document.body.style.setProperty('--progress-width', scrollPercent + '%');
    document.body.querySelector('body::after').style.width = scrollPercent + '%';
  });
  // Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-container');
    
    // Create data nodes function
    function createDataNodes() {
        // Clean up existing nodes
        const existingNodes = profileContainer.querySelectorAll('.data-node');
        existingNodes.forEach(node => node.remove());
        
        // Create new nodes
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.classList.add('data-node');
            
            // Random position around the circle
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 80; // Distance from center
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            node.style.left = `calc(50% + ${x}px)`;
            node.style.top = `calc(50% + ${y}px)`;
            
            // Random size
            const size = 2 + Math.random() * 4;
            node.style.width = `${size}px`;
            node.style.height = `${size}px`;
            
            // Random opacity
            node.style.opacity = 0.3 + Math.random() * 0.7;
            
            // Add to container
            profileContainer.appendChild(node);
            
            // Animate and remove after random time
            setTimeout(() => {
                node.classList.add('fade-out');
                setTimeout(() => node.remove(), 1000);
            }, 1000 + Math.random() * 5000);
        }
    }
    
    // Add CSS for data nodes
    const style = document.createElement('style');
    style.textContent = `
        .data-node {
            position: absolute;
            background-color: var(--secondary);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 1s ease;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
            z-index: 3;
        }
        
        .fade-out {
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Create nodes initially and then periodically
    createDataNodes();
    setInterval(createDataNodes, 3000);
});
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileNav();
    initTypingEffect();
    initScrollAnimations();
    initBackToTop();
    initProjectFilter();
    // Removed initSkillBars() from here
    initLazyLoading();
    initDarkMode();
    initContactForm();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Update aria-expanded attribute for accessibility
            const expanded = nav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
        });
    }
    
    // Close menu when clicking a link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-text h1');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    const highlightSpan = typingElement.querySelector('.highlight');
    const highlightText = highlightSpan ? highlightSpan.textContent : '';
    
    // Create a wrapper for the typing effect
    const typingWrapper = document.createElement('div');
    typingWrapper.className = 'typing-wrapper';
    typingElement.innerHTML = '';
    typingElement.appendChild(typingWrapper);
    
    // Get the first part of text (before the highlight)
    const firstPart = originalText.replace(highlightText, '').trim();
    
    // Add the static first part
    const staticText = document.createElement('span');
    staticText.textContent = firstPart + ' ';
    typingWrapper.appendChild(staticText);
    
    // Create element for changing text
    const typingTextElement = document.createElement('span');
    typingTextElement.className = 'highlight typing-text';
    typingWrapper.appendChild(typingTextElement);
    
    // Add cursor element
    const cursorElement = document.createElement('span');
    cursorElement.className = 'typing-cursor';
    cursorElement.textContent = '|';
    typingWrapper.appendChild(cursorElement);
    
    // Words to type
    const words = ['Scientist', 'Engineer', 'Analyst', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 200;
    
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
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 1500; // Pause before deleting
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // Pause before typing next word
        }
        
        setTimeout(type, typeDelay);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // Add CSS for typing effect
    const style = document.createElement('style');
    style.textContent = `
        .typing-wrapper {
            display: inline-flex;
            align-items: center;
        }
        .typing-text {
            display: inline-block;
        }
        .typing-cursor {
            display: inline-block;
            margin-left: 2px;
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const skills = document.querySelectorAll('.skill-category');
    const timeline = document.querySelectorAll('.timeline-item');
    const projects = document.querySelectorAll('.project-card');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, fadeInOptions);
    
    // Add the necessary CSS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in:not(.visible) {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .slide-in-left:not(.visible) {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .slide-in-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .slide-in-right:not(.visible) {
            opacity: 0;
            transform: translateX(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .slide-in-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .scale-in:not(.visible) {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scale-in.visible {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
    
    // Apply animations to sections
    sections.forEach((section, index) => {
        section.classList.remove('fade-in');
        section.classList.add('fade-in');
        appearOnScroll.observe(section);
    });
    
    // Apply animations to skills with stagger effect
    skills.forEach((skill, index) => {
        skill.classList.add('slide-in-right');
        skill.style.transitionDelay = `${index * 0.1}s`;
        appearOnScroll.observe(skill);
    });
    
    // Apply animations to timeline
    timeline.forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.transitionDelay = `${index * 0.1}s`;
        appearOnScroll.observe(item);
    });
    
    // Apply animations to projects with stagger effect
    projects.forEach((project, index) => {
        project.classList.add('scale-in');
        project.style.transitionDelay = `${index * 0.1}s`;
        appearOnScroll.observe(project);
    });
}

// Back to Top button
function initBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
        backToTop = document.createElement('a');
        backToTop.className = 'back-to-top';
        backToTop.href = '#top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Filtering
function initProjectFilter() {
    const projectSection = document.querySelector('#projects');
    if (!projectSection) return;
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filter';
    
    // Get all unique project categories (For demo, we'll hardcode some)
    const categories = ['All', 'Machine Learning', 'Data Analysis', 'NLP', 'Web'];
    
    // Create filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.filter = category.toLowerCase();
        button.textContent = category;
        if (category === 'All') button.classList.add('active');
        filterContainer.appendChild(button);
    });
    
    // Insert filter before project grid
    const projectGrid = projectSection.querySelector('.project-grid');
    projectSection.insertBefore(filterContainer, projectGrid);
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .project-filter {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: var(--spacing-lg);
        }
        .filter-btn {
            background: transparent;
            border: 1px solid var(--secondary);
            color: var(--secondary);
            padding: 8px 16px;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .filter-btn:hover, .filter-btn.active {
            background: var(--secondary);
            color: white;
        }
        .project-card {
            transition: all 0.4s ease;
        }
        .project-card.hide {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Add data categories to projects (for demo)
    const projects = projectGrid.querySelectorAll('.project-card');
    const categories2 = ['machine learning', 'data analysis', 'nlp', 'web'];
    
    projects.forEach((project, index) => {
        // Assign 1-2 random categories to each project
        const numCategories = Math.floor(Math.random() * 2) + 1;
        const projectCategories = [];
        
        for (let i = 0; i < numCategories; i++) {
            const randomCategory = categories2[Math.floor(Math.random() * categories2.length)];
            if (!projectCategories.includes(randomCategory)) {
                projectCategories.push(randomCategory);
            }
        }
        
        project.dataset.category = projectCategories.join(' ');
    });
    
    // Add filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projects.forEach(project => {
                if (filter === 'all') {
                    project.classList.remove('hide');
                } else {
                    if (project.dataset.category.includes(filter)) {
                        project.classList.remove('hide');
                    } else {
                        project.classList.add('hide');
                    }
                }
            });
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    if (src) {
                        image.setAttribute('src', src);
                        image.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(image);
                }
            });
        });
        
        // Update image src attributes for lazy loading
        images.forEach(img => {
            if (!img.hasAttribute('data-src')) {
                const currentSrc = img.getAttribute('src');
                img.setAttribute('data-src', currentSrc);
                img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'); // Tiny placeholder
                imageObserver.observe(img);
            }
        });
    }
}

// Dark Mode Toggle
function initDarkMode() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.querySelector('.header-content').appendChild(themeToggle);
    
    // Add CSS for theme toggle
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 15px;
            padding: 5px;
            transition: all 0.3s ease;
        }
        .theme-toggle:hover {
            transform: rotate(30deg);
        }
        
        /* Dark Theme Variables */
        [data-theme="dark"] {
            --primary: #1a1a2e;
            --secondary: #4db5ff;
            --accent: #4ecca3;
            --text: #e6e6e6;
            --text-light: #b3b3b3;
            --text-lighter: #999999;
            --bg: #0f0e17;
            --card: #16213e;
            --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            --box-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        /* Fix for specific text elements to ensure they're white in dark mode */
        [data-theme="dark"] #experience h2, 
        [data-theme="dark"] #experience .section-title,
        [data-theme="dark"] .section-title,
        [data-theme="dark"] .skill-category h3,
        [data-theme="dark"] .timeline-item h3,
        [data-theme="dark"] .timeline-item h4,
        [data-theme="dark"] .timeline-item .position,
        [data-theme="dark"] .timeline-item .organization,
        [data-theme="dark"] .timeline-item .degree {
            color: white !important;
        }
    `;
    document.head.appendChild(style);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}