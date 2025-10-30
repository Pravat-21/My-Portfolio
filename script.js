// ========================================
// TECH BACKGROUND ANIMATION
// ========================================

const canvas = document.getElementById('techBackground');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
});

// Node class for connected network effect
class Node {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
        ctx.fill();
    }
}

// Binary rain class (Matrix effect)
class BinaryRain {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.speed = Math.random() * 3 + 2;
        this.text = Math.random() > 0.5 ? '1' : '0';
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = -20;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.font = '14px monospace';
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Floating code snippets
class CodeSnippet {
    constructor() {
        const snippets = [
            'def ml_model():', 'import numpy', 'pandas.DataFrame', 
            'sklearn.fit()', 'torch.nn', 'tensorflow.keras',
            'data.head()', 'plt.plot()', 'model.predict()',
            'np.array()', 'df.groupby()', 'accuracy_score()'
        ];
        this.text = snippets[Math.floor(Math.random() * snippets.length)];
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.life = Math.random() * 500 + 200;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = `rgba(78, 205, 196, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Grid lines
class GridLine {
    constructor(isVertical) {
        this.isVertical = isVertical;
        if (isVertical) {
            this.pos = Math.random() * width;
            this.offset = 0;
        } else {
            this.pos = Math.random() * height;
            this.offset = 0;
        }
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = 0; // Set to 0 to hide grid lines
    }

    update() {
        this.offset += this.speed;
        if (this.offset > 50) this.offset = 0;
    }

    draw() {
        // Grid lines disabled
        return;
    }
}

// Pulsing circles
class PulsingCircle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.maxRadius = Math.random() * 100 + 50;
        this.radius = 0;
        this.speed = Math.random() * 0.5 + 0.3;
        this.opacity = 0.2;
    }

    update() {
        this.radius += this.speed;
        this.opacity = (1 - this.radius / this.maxRadius) * 0.2;
        
        if (this.radius > this.maxRadius) {
            this.radius = 0;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Initialize arrays
let nodes = [];
let binaryRain = [];
let codeSnippets = [];
let gridLines = [];
let pulsingCircles = [];

function initNodes() {
    nodes = [];
    binaryRain = [];
    codeSnippets = [];
    gridLines = [];
    pulsingCircles = [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
        nodes.push(new Node());
    }

    // Create binary rain
    for (let i = 0; i < 30; i++) {
        binaryRain.push(new BinaryRain());
    }

    // Create code snippets
    //for (let i = 0; i < 15; i++) {
        //codeSnippets.push(new CodeSnippet());
    //}

    // Create grid lines
    for (let i = 0; i < 10; i++) {
        gridLines.push(new GridLine(true));
        gridLines.push(new GridLine(false));
    }

    // Create pulsing circles
    for (let i = 0; i < 5; i++) {
        pulsingCircles.push(new PulsingCircle());
    }
}

// Draw connections between nodes
function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Draw and update grid lines (disabled)
    // gridLines.forEach(line => {
    //     line.update();
    //     line.draw();
    // });

    // Draw and update pulsing circles
    pulsingCircles.forEach(circle => {
        circle.update();
        circle.draw();
    });

    // Draw connections first
    drawConnections();

    // Draw and update nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Draw and update binary rain
    //binaryRain.forEach(drop => {
        //drop.update();
        //drop.draw();
    //});

    // Draw and update code snippets
    //codeSnippets.forEach((snippet, index) => {
        //snippet.update();
        //snippet.draw();
        
        //if (snippet.life <= 0) {
            //codeSnippets[index] = new CodeSnippet();
        //}
    //});

    requestAnimationFrame(animate);
}

// Initialize and start animation
initNodes();
animate();

// ========================================
// ORIGINAL PORTFOLIO FUNCTIONALITY
// ========================================

// Navbar functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animated role rotation with typing effect
const roleText = document.getElementById('role-text');
if (roleText) {
    const roles = [
        'Scientist',
        'Analyst',
        
    ];
    
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isPaused) {
            setTimeout(typeRole, 2000); // Pause for 2 seconds
            isPaused = false;
            isDeleting = true;
            return;
        }
        
        if (isDeleting) {
            // Delete characters
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
                return;
            }
        } else {
            // Type characters
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isPaused = true;
                setTimeout(typeRole, 2000);
                return;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing animation
    roleText.textContent = '';
    setTimeout(typeRole, 1000);
}

// Contact form handling with animations
const contactFormSubmit = document.getElementById('contact-form');

if (contactFormSubmit) {
    contactFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:pravatpatra1997@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        // Get button and show loading state
        const button = contactFormSubmit.querySelector('.btn-submit');
        const originalText = button.innerHTML;
        
        // Add loading animation
        button.classList.add('loading');
        button.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
        
        // Simulate sending delay
        setTimeout(() => {
            // Show success message
            button.classList.remove('loading');
            button.classList.add('success');
            button.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Reset form and button after 3 seconds
            setTimeout(() => {
                contactFormSubmit.reset();
                button.classList.remove('success');
                button.innerHTML = originalText;
                
                // Trigger re-animation of form groups
                const formGroups = contactFormSubmit.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, 100);
                });
            }, 3000);
        }, 1000);
    });
}

// Smooth scroll for all anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.project-card, .blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Profile image fallback
const profileImage = document.getElementById('profile-image');
profileImage.onerror = function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Ccircle cx="100" cy="100" r="100" fill="%231a1a2e"/%3E%3Ctext x="100" y="115" text-anchor="middle" font-size="80" font-family="Arial" fill="%2300d9ff"%3EPP%3C/text%3E%3C/svg%3E';
};

// Add hover effect to social icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText && footerText.textContent.includes('2025')) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Console message
console.log('%c👋 Hello, Developer!', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #4ecdc4; font-size: 14px;');

// Trigger contact form animation check on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const sectionTop = contactSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If contact section is visible on load, animate it
            if (sectionTop < windowHeight) {
                const event = new Event('scroll');
                window.dispatchEvent(event);
            }
        }
    }, 500);
});

// ========================================
// REVEAL ELEMENTS ON SCROLL (for contact section etc.)
// ========================================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Run once on load

// ========================================
// CONTACT FORM ANIMATIONS ON SCROLL
// ========================================
function initContactFormAnimations() {
    const contactSection = document.getElementById('contact');
    const contactFormElement = document.getElementById('contact-form');
    
    if (!contactSection || !contactFormElement) return;
    
    let formAnimated = false;
    
    function animateContactForm() {
        if (formAnimated) return;
        
        const sectionTop = contactSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // More generous trigger point
        if (sectionTop < windowHeight - 100) {
            formAnimated = true;
            
            console.log('Animating contact form...'); // Debug log
            
            // Animate form groups
            const formGroups = contactFormElement.querySelectorAll('.form-group');
            const submitContainer = contactFormElement.querySelector('.form-submit-container');
            
            console.log('Found form groups:', formGroups.length); // Debug log
            
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                    console.log(`Animated group ${index + 1}`); // Debug log
                }, 150 * (index + 1));
            });
            
            if (submitContainer) {
                setTimeout(() => {
                    submitContainer.style.opacity = '1';
                    submitContainer.style.transform = 'translateY(0)';
                    console.log('Animated submit button'); // Debug log
                }, 150 * (formGroups.length + 1));
            }
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateContactForm);
    
    // Check when clicking contact link
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(animateContactForm, 800);
        });
    });
    
    // Initial checks
    setTimeout(animateContactForm, 300);
    setTimeout(animateContactForm, 1000);
    setTimeout(animateContactForm, 2000);
}

// Initialize form animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactFormAnimations);
} else {
    initContactFormAnimations();
}
