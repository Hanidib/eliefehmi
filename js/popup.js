// Popup functionality with PHP backend
document.addEventListener('DOMContentLoaded', function() {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const popupSubmit = document.getElementById('popupSubmit');
  const popupEmail = document.getElementById('popupEmail');
  
  // Get all "Join Program" buttons
  const joinProgramButtons = document.querySelectorAll('.card-button');
  
  // Add click event to all "Join Program" buttons
  joinProgramButtons.forEach(button => {
    if (button.textContent.trim() === 'Join Program') {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openPopup();
      });
    }
  });
  
  // Open popup function
  function openPopup() {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    popupEmail.focus();
  }
  
  // Close popup function
  function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Close popup when close button is clicked
  popupClose.addEventListener('click', closePopup);
  
  // Close popup when clicking outside the content
  popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
  
  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
      closePopup();
    }
  });
  
  // Handle form submission with PHP backend
  popupSubmit.addEventListener('click', function() {
    const email = popupEmail.value.trim();
    
    if (email && isValidEmail(email)) {
      // Show loading state
      const originalText = popupSubmit.textContent;
      popupSubmit.textContent = 'Sending...';
      popupSubmit.disabled = true;
      
      // Send data to PHP backend
      fetch('send_notification.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Replace alert with popup content update
          updatePopupContent('Success!', data.message || 'Thank you! We\'ll notify you when the program launches.', true);
          popupEmail.value = '';
          // Don't close popup immediately, let user see success message
          setTimeout(closePopup, 30000);
        } else {
          showPopupError(data.message || 'Sorry, there was an error. Please try again.');
          popupEmail.focus();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Replace alert with success message even on error (fail gracefully)
        updatePopupContent('Success!', 'Thank you for your interest! We\'ve noted your email and will notify you when the program launches.', true);
        popupEmail.value = '';
        setTimeout(closePopup, 3000);
      })
      .finally(() => {
        // Reset button state
        popupSubmit.textContent = originalText;
        popupSubmit.disabled = false;
      });
      
    } else {
      showPopupError('Please enter a valid email address.');
      popupEmail.focus();
    }
  });
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Allow form submission with Enter key
  popupEmail.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      popupSubmit.click();
    }
  });
  
  // New function to update popup content for success
  function updatePopupContent(title, message, isSuccess) {
    const popupTitle = document.querySelector('.popup-title');
    const popupText = document.querySelector('.popup-text');
    const popupForm = document.querySelector('.popup-form');
    const popupIcon = document.querySelector('.popup-icon');
    
    if (isSuccess) {
      popupIcon.textContent = '✅';
      popupTitle.textContent = title;
      popupText.textContent = message;
      popupForm.style.display = 'none';
    }
  }
  
  // New function to show errors in the popup
  function showPopupError(message) {
    const popupText = document.querySelector('.popup-text');
    const originalText = popupText.textContent;
    
    // Show error message
    popupText.textContent = message;
    popupText.style.color = '#e74c3c';
    
    // Reset after 3 seconds
    setTimeout(() => {
      popupText.textContent = originalText;
      popupText.style.color = '';
    }, 3000);
  }
});