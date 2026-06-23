// Portfolio JavaScript File
// This file contains all interactive functionality for the portfolio website

// Console log to confirm script has loaded successfully
console.log('Portfolio loaded');

// ============================================
// Dark/Light Mode Theme Toggle
// ============================================

// Get the theme toggle button
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme preference from localStorage on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeIcon(savedTheme);
}

// Update the theme icon based on current theme
function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Handle theme toggle button click
themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply the theme to the page
    document.body.classList.toggle('light-mode', newTheme === 'light');
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update the icon
    updateThemeIcon(newTheme);
});

// Initialize theme when page loads
initializeTheme();

// ============================================
// Scroll Animation - Intersection Observer API
// ============================================

// Create Intersection Observer to detect when elements come into view
const observerOptions = {
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px'  // Trigger slightly before element fully enters view
};

// Callback function when elements intersect with viewport
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class to trigger animation
            entry.target.classList.add('visible');
            
            // For project cards, add delay to each one
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    if (card.classList.contains('visible')) {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    }
                });
            }
            
            // Stop observing after animation triggers (optional - remove to re-animate on scroll)
            observer.unobserve(entry.target);
        }
    });
};

// Create the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all sections and project cards
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');

sections.forEach(section => observer.observe(section));
projectCards.forEach(card => observer.observe(card));

// ============================================
// Contact Form Validation
// ============================================

const contactForm = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const successMessage = document.getElementById('success-message');

// Validate email format (contains @ and .)
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Clear error message for a field
function clearError(field) {
    field.classList.remove('error');
    const errorSpan = document.getElementById(`${field.id}-error`);
    errorSpan.textContent = '';
}

// Show error message for a field
function showError(field, message) {
    field.classList.add('error');
    const errorSpan = document.getElementById(`${field.id}-error`);
    errorSpan.textContent = message;
}

// Validate form on submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Clear previous errors
    clearError(nameField);
    clearError(emailField);
    clearError(messageField);
    
    let isValid = true;
    
    // Validate name
    if (nameField.value.trim() === '') {
        showError(nameField, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (emailField.value.trim() === '') {
        showError(emailField, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Email must contain @ and .');
        isValid = false;
    }
    
    // Validate message
    if (messageField.value.trim() === '') {
        showError(messageField, 'Message is required');
        isValid = false;
    }
    
    // If all valid, show success message
    if (isValid) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
    }
});
