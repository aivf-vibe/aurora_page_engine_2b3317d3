

// Smooth scrolling for navigation links
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

// Active sidebar link highlighting
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.content-section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Initial call

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// FAQ accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.maxHeight = null;
            item.style.padding = '0 1.5rem';
        });
        
        // Toggle current FAQ
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '1.5rem';
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Code window typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add typing effect to code window on page load
window.addEventListener('load', () => {
    const codeLines = document.querySelectorAll('.code-line .command');
    if (codeLines.length > 0) {
        setTimeout(() => {
            typeWriter(codeLines[0], 'aurora init my-app', 100);
            setTimeout(() => {
                typeWriter(codeLines[1], 'aurora deploy --prod', 100);
            }, 1500);
        }, 1000);
    }
});

// Search functionality (basic implementation)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.className = 'search-input';
    
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (sidebarHeader) {
        sidebarHeader.appendChild(searchInput);
    }
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const content = document.querySelector('.content');
        const textNodes = content.querySelectorAll('h1, h2, h3, p, li');
        
        textNodes.forEach(node => {
            const text = node.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                node.style.backgroundColor = searchTerm ? 'rgba(37, 99, 235, 0.1)' : '';
            } else {
                node.style.backgroundColor = '';
            }
        });
    });
}

// Add search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Copy code functionality
document.querySelectorAll('.code-block, .code-window').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: background 0.3s ease;
    `;
    
    block.style.position = 'relative';
    block.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code') || block;
        navigator.clipboard.writeText(code.textContent);
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
});

// Responsive sidebar for mobile
function handleResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    if (window.innerWidth <= 768) {
        sidebar.style.display = 'none';
        // Add mobile menu toggle
        const mobileToggle = document.createElement('button');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.className = 'mobile-sidebar-toggle';
        mobileToggle.style.cssText = `
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 50%;
            box-shadow: var(--shadow-lg);
            cursor: pointer;
        `;
        
        document.body.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', () => {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
            sidebar.style.position = 'fixed';
            sidebar.style.top = '4rem';
            sidebar.style.left = '0';
            sidebar.style.right = '0';
            sidebar.style.bottom = '0';
            sidebar.style.background = 'white';
            sidebar.style.zIndex = '999';
            sidebar.style.padding = '1rem';
            sidebar.style.overflowY = 'auto';
        });
    }
}

// Initialize responsive features
window.addEventListener('resize', handleResponsiveSidebar);
handleResponsiveSidebar();

