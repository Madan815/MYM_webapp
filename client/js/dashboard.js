// // Entry Options
// const entryOptions = document.querySelectorAll('.entry-option');

// entryOptions.forEach(option => {
//     option.addEventListener('click', function() {
//         // Navigate to the specific entry form based on ID
//         const pageId = this.id;
//         switch(pageId) {
//             case 'activityDetails':
//                 window.location.href = 'activity-details.html';
//                 break;
//             case 'meetingDetails':
//                 window.location.href = 'meeting-details.html';
//                 break;
//             case 'executiveVisit':
//                 window.location.href = 'executive-visit.html';
//                 break;
//             case 'projectDetails':
//                 window.location.href = 'project-details.html';
//                 break;
//             default:
//                 alert('Page not found');
//         }
//         entryOptionsContainer.classList.remove('active');
//     });
// });


// -------------------------------------------------------------

// client/js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Handle entry options navigation
    const entryOptions = document.querySelectorAll('.entry-option');
    const entryOptionsContainer = document.getElementById('entryOptionsContainer');
  
    if (entryOptions.length > 0) {
      entryOptions.forEach(option => {
        option.addEventListener('click', function() {
          // Navigate to the specific entry form based on ID
          const pageId = this.id;
          switch(pageId) {
            case 'activityDetails':
              window.location.href = 'activity-details.html';
              break;
            case 'meetingDetails':
              window.location.href = 'meeting-details.html';
              break;
            case 'executiveVisit':
              window.location.href = 'executive-visit.html';
              break;
            case 'projectDetails':
              window.location.href = 'project-details.html';
              break;
            default:
              alert('Page not found');
          }
          if (entryOptionsContainer) {
            entryOptionsContainer.classList.remove('active');
          }
        });
      });
    }
  
    // Load data for different sections if they exist in the page
    const activityContainer = document.getElementById('activity-list');
    const meetingContainer = document.getElementById('meeting-list');
    const executiveContainer = document.getElementById('executive-list');
    const projectContainer = document.getElementById('project-list');
    
    // Load activities if container exists
    if (activityContainer) {
      loadActivities();
    }
    
    // Load meetings if container exists
    if (meetingContainer) {
      loadMeetings();
    }
    
    // Load executive visits if container exists
    if (executiveContainer) {
      loadExecutiveVisits();
    }
    
    // Load projects if container exists
    if (projectContainer) {
      loadProjects();
    }
    
    async function loadActivities() {
      try {
        const response = await fetch('/api/activities');
        if (response.ok) {
          const activities = await response.json();
          renderActivities(activities);
        } else {
          console.error('Failed to load activities');
        }
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    }
    
    async function loadMeetings() {
      try {
        const response = await fetch('/api/meetings');
        if (response.ok) {
          const meetings = await response.json();
          renderMeetings(meetings);
        } else {
          console.error('Failed to load meetings');
        }
      } catch (error) {
        console.error('Error loading meetings:', error);
      }
    }
    
    async function loadExecutiveVisits() {
      try {
        const response = await fetch('/api/executives');
        if (response.ok) {
          const visits = await response.json();
          renderExecutiveVisits(visits);
        } else {
          console.error('Failed to load executive visits');
        }
      } catch (error) {
        console.error('Error loading executive visits:', error);
      }
    }
    
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const projects = await response.json();
          renderProjects(projects);
        } else {
          console.error('Failed to load projects');
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
    
    // Render functions for each data type
    function renderActivities(activities) {
      if (activities.length === 0) {
        activityContainer.innerHTML = '<p>No activities found.</p>';
        return;
      }
      
      let html = '';
      activities.forEach(activity => {
        html += `
          <div class="activity-item">
            <h3>${activity.activityName}</h3>
            <p>Date: ${new Date(activity.activityDate).toLocaleDateString()}</p>
            <p>${activity.activityDetails}</p>
            ${renderImages(activity.imagePaths)}
          </div>
        `;
      });
      
      activityContainer.innerHTML = html;
    }
    
    function renderMeetings(meetings) {
      if (meetings.length === 0) {
        meetingContainer.innerHTML = '<p>No meetings found.</p>';
        return;
      }
      
      let html = '';
      meetings.forEach(meeting => {
        html += `
          <div class="meeting-item">
            <h3>${meeting.meetingType} Meeting</h3>
            <p>Date: ${new Date(meeting.meetingDate).toLocaleDateString()}</p>
            ${renderImages(meeting.imagePaths)}
          </div>
        `;
      });
      
      meetingContainer.innerHTML = html;
    }
    
    function renderExecutiveVisits(visits) {
      if (visits.length === 0) {
        executiveContainer.innerHTML = '<p>No executive visits found.</p>';
        return;
      }
      
      let html = '';
      visits.forEach(visit => {
        html += `
          <div class="visit-item">
            <h3>${visit.executiveName}</h3>
            <p>Type: ${visit.visitType}</p>
            <p>Date: ${new Date(visit.visitDate).toLocaleDateString()}</p>
            ${renderImages(visit.imagePaths)}
          </div>
        `;
      });
      
      executiveContainer.innerHTML = html;
    }
    
    function renderProjects(projects) {
      if (projects.length === 0) {
        projectContainer.innerHTML = '<p>No projects found.</p>';
        return;
      }
      
      let html = '';
      projects.forEach(project => {
        html += `
          <div class="project-item">
            <h3>${project.projectName}</h3>
            <p>Date: ${new Date(project.projectDate).toLocaleDateString()}</p>
            ${renderImages(project.imagePaths)}
          </div>
        `;
      });
      
      projectContainer.innerHTML = html;
    }
    
    // Helper function to render images
    function renderImages(imagePaths) {
      if (!imagePaths || imagePaths.length === 0) {
        return '<p>No images available</p>';
      }
      
      let imagesHtml = '<div class="image-gallery">';
      imagePaths.forEach(path => {
        imagesHtml += `<img src="/${path}" alt="Uploaded image" class="thumbnail">`;
      });
      imagesHtml += '</div>';
      
      return imagesHtml;
    }
  });
  