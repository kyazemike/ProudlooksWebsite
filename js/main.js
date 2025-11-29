/**
 * main.js
 * Handles smooth scrolling and WhatsApp form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const whatsappNumber = '256779767646'; // Your WhatsApp number without '+'

    // ------------------------------------------------------------------
    // 1. Smooth Scrolling for Navigation Links
    // ------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Check if the link is NOT an external link or the WhatsApp CTA
            if (this.classList.contains('cta-button') || this.getAttribute('href').startsWith('https://wa.me/')) {
                return; 
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
    // 2. WhatsApp Booking Form Handling (Form submits to wa.me)
    // This script targets the form used on index.html and pricing.html
    // ------------------------------------------------------------------
    const whatsappForm = document.getElementById('whatsappForm');
    const formMessage = document.getElementById('form-message');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the default form submission

            // Gather data from the form fields
            const name = document.getElementById('name').value.trim();
            const serviceElement = document.getElementById('service');
            const service = serviceElement.options[serviceElement.selectedIndex].text; // Get the visible text
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (!name || service === 'Select Service or Inquiry Type') {
                formMessage.textContent = 'Please enter your Name and select a Service/Inquiry type.';
                formMessage.style.color = 'red';
                formMessage.style.padding = '10px';
                formMessage.style.borderRadius = '5px';
                return;
            }

            // --- Construct the WhatsApp Message ---
            let whatsappText = `Hello Proudlooks Ug! I'm ${name} and I would like to book or inquire about a service.\n\n`;
            whatsappText += `**Service/Inquiry:** ${service}\n`;
            
            if (message) {
                whatsappText += `**Preferred Details/Time:** ${message}\n`;
            }
            whatsappText += `\n*Awaiting your confirmation.*`;
            
            // --- Encode the Text for the URL ---
            const encodedText = encodeURIComponent(whatsappText);
            
            // --- Create the final WhatsApp URL ---
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            // --- Provide user feedback and redirect ---
            formMessage.innerHTML = "Opening WhatsApp! Please check your chat window to send the pre-filled message.";
            formMessage.style.color = 'blue';
            formMessage.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
            formMessage.style.padding = '10px';
            formMessage.style.borderRadius = '5px';
            
            // Open the WhatsApp chat after a slight delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 500); 

            // Clear the form
            whatsappForm.reset();
        });
    }
});
