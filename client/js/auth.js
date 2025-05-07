document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a login page
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real application, you would send this to a server
            // For demo purposes, we'll just redirect
            
            // Check if this is the admin login page
            const isAdmin = window.location.href.includes('admin-login');
            
            if (isAdmin) {
                // Simple validation for demo (would be server-side in real app)
                if (email === 'admin@example.com' && password === 'admin123') {
                    window.location.href = 'dashboard-admin.html';
                } else {
                    alert('Invalid admin credentials');
                }
            } else {
                // For user login, we'll just redirect for demo
                window.location.href = 'dashboard-user.html';
            }
        });
    }
});
