// ========== TYPEWRITER EFFECT ==========
const typewriterWords = [
    'Dreamer',
    'Visionary', 
    'Developer',
    'Builder',
    'Student',
    'Video Editor',
    'Photographer',
    'Yearner'
];

const typewriterElement = document.getElementById('typewriter-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 120;

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentWord = typewriterWords[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 60;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        typeSpeed = 400; // Pause before typing next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter after initial load
if (typewriterElement) {
    setTimeout(typeWriter, 800);
}

// ========== DROPDOWN MENU ==========
const menuToggle = document.getElementById('menuToggle');
const dropdownNav = document.getElementById('dropdownNav');

if (menuToggle && dropdownNav) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownNav.classList.toggle('active');
    });

    // Close dropdown when clicking a link
    dropdownNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownNav.classList.remove('active');
        });
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (dropdownNav && dropdownNav.classList.contains('active')) {
        if (!dropdownNav.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
            dropdownNav.classList.remove('active');
        }
    }
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    }
    localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ========== SMOOTH SCROLL ==========
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

// ========== SECTION ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== HEADER SHADOW ON SCROLL ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    header.style.boxShadow = window.scrollY > 0 ? '0 25px 60px rgba(0, 0, 0, 0.08)' : 'none';
});


// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Build mailto link with form data
        const subject = encodeURIComponent('Message from ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
        const mailtoLink = 'mailto:cuison.kobeluisg10@gmail.com?subject=' + subject + '&body=' + body;

        // Show feedback
        if (formFeedback) {
            formFeedback.classList.add('show');
        }

        // Open mailto after a short delay
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 600);

        // Reset form
        contactForm.reset();

        // Hide feedback after 5 seconds
        setTimeout(() => {
            if (formFeedback) {
                formFeedback.classList.remove('show');
            }
        }, 5000);
    });
}