// contact.js - Simple debug version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form script loaded!');
    
    const contactForm = document.getElementById('contactForm');
    const serviceSelect = document.getElementById('service');
    
   
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    if (!serviceSelect) {
        console.error('Service select element not found!');
        return;
    }
    
    // Test: Log when service changes
    serviceSelect.addEventListener('change', function() {
        console.log('Service changed to:', this.value);
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        const serviceValue = serviceSelect.value;
        console.log('Service value at submit:', serviceValue);
        
        if (!serviceValue) {
            alert('Please select a service you are interested in.');
            serviceSelect.focus();
            return;
        }
        
        console.log('Form validation passed, sending...');
        
        // Rest of your form submission code...
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        const formData = new FormData(this);
        
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Server error: ' + response.status);
            }
        })
        .then(data => {
            alert(data);
            this.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
});