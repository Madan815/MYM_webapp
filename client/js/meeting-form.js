// client/js/meeting-form.js
document.addEventListener('DOMContentLoaded', function() {
    const meetingForm = document.getElementById('meetingForm');
    
    meetingForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(meetingForm);
      
      try {
        const response = await fetch('/api/meetings', {
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
  