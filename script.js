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
