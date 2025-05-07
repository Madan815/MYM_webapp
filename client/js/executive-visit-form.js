// client/js/executive-visit-form.js
document.addEventListener('DOMContentLoaded', function() {
    const executiveForm = document.getElementById('executiveForm');
    
    executiveForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(executiveForm);
      
      try {
        const response = await fetch('/api/executives', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          window.location.href = 'dashboard-user.html';
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
      }
    });
  });
  