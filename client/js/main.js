document.addEventListener('DOMContentLoaded', function() {
    console.log('Main script loaded');
    
    // Add any global functionality here
    
    // Example: Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
