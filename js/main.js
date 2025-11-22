document.addEventListener('DOMContentLoaded', () => {
    
    // ⚠️ IMPORTANT: The business email address is set here.
    const businessEmail = 'kyazemike18@gmail.com'; 

    // ------------------------------------------------------------------
    // 1. Smooth Scrolling for Navigation Links
    // ------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is NOT the mailto CTA button
            if (this.classList.contains('cta-button') && this.getAttribute('href').startsWith('mailto:')) {
                return; // Let the mailto link perform its default action
            }

            // Prevent default anchor click behavior
            e.preventDefault(); 

            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------
    // 2. Email Booking Form Handling using mailto:
    // This script runs on both index.html and pricing.html
    // ------------------------------------------------------------------
    const form = document.getElementById('bookingForm');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the default form submission

            // Gather data from the form fields
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const serviceElement = document.getElementById('service');
            const service = serviceElement.options[serviceElement.selectedIndex].text; // Get the visible text
            const message = document.getElementById('message').value;

            // --- Construct the email Subject and Body ---
            const emailSubject = `Appointment Inquiry: ${service} (${name})`;
            
            let emailBody = `Booking Details:\n`;
            emailBody += `\nName: ${name}`;
            emailBody += `\nPhone/WhatsApp: ${phone}`;
            emailBody += `\nService Requested: ${service}`;
            emailBody += `\n\nPreferred Date/Time/Details: ${message || 'No specific details provided.'}`;
            emailBody += `\n\nPlease confirm availability and price.`;
            
            // --- Encode the Subject and Body for the mailto: URL ---
            const encodedSubject = encodeURIComponent(emailSubject);
            const encodedBody = encodeURIComponent(emailBody);
            
            // --- Create the final mailto: URL ---
            const mailtoUrl = `mailto:${businessEmail}?subject=${encodedSubject}&body=${encodedBody}`;

            // --- Provide user feedback and redirect ---
            
            // 1. Show confirmation message on the site
            formMessage.innerHTML = "Opening your email app! Please click **Send** when the email draft loads.";
            formMessage.style.color = 'blue';
            formMessage.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
            formMessage.style.padding = '10px';
            formMessage.style.borderRadius = '5px';
            
            // 2. Open the user's email client after a slight delay
            setTimeout(() => {
                window.location.href = mailtoUrl; 
            }, 500); // 0.5 second delay

            // 3. Clear the form 
            form.reset();
        });
    }
});