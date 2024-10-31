// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Close Mobile Menu on Link Click (for better UX)
const navLinks = document.querySelectorAll('.nav-links li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling to contact form
    const contactCtaBtn = document.querySelector('.contact-cta-btn');
    contactCtaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.info-box a[href^="mailto:"]');
    const phoneLink = document.querySelector('.info-box a[href^="tel:"]');

    // Copy email to clipboard
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email);
        alert('Email copied to clipboard!');
    });

    // Copy phone number to clipboard
    phoneLink.addEventListener('click', function(e) {
        e.preventDefault();
        const phone = phoneLink.getAttribute('href').replace('tel:', '');
        navigator.clipboard.writeText(phone);
        alert('Phone number copied to clipboard!');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-links a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover animation to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.classList.add('bounce');
        });

        icon.addEventListener('animationend', () => {
            icon.classList.remove('bounce');
        });
    });
});
