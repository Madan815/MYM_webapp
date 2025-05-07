// client/js/activity-form.js
document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activityForm');
    
    activityForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(activityForm);
      
      try {
        const response = await fetch('/api/activities', {
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
  