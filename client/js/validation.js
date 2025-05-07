document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            // Add visual feedback on input focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Basic validation
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.classList.add('error');
                    this.parentElement.classList.add('has-error');
                } else {
                    this.classList.remove('error');
                    this.parentElement.classList.remove('has-error');
                }
                
                // Email validation
                if (this.type === 'email' && this.value.trim() !== '') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.classList.add('error');
                        this.parentElement.classList.add('has-error');
                    }
                }
            });
        });
    });
});
