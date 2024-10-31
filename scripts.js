// scripts.js

// Animate hero buttons on hover
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Placeholder for adding interactivity for future features (e.g., testimonials slider)
