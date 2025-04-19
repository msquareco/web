// Utility function to load an HTML component into a target element
function loadComponent(url, targetId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
    })
    .catch(error => console.error('Error loading component:', error));
}

// Load header and footer
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('components/header.html', 'header-container');
  loadComponent('components/footer.html', 'footer-container');

  // Then load and apply config
  fetch('assets/config/config.json')
    .then(response => response.json())
    .then(data => {
      // After a slight delay to ensure header/footer is loaded into DOM
      setTimeout(() => {
        // Header logo & business name
        const siteLogo = document.getElementById('site-logo');
        if (siteLogo) siteLogo.setAttribute('src', data.branding.logo);

        const businessName = document.querySelector('.brand-name');
        if (businessName) businessName.textContent = data.businessName;

        const tagline = document.querySelector('.tagline');
        if (tagline) tagline.textContent = data.tagline;

        // Footer info
        const footerBusinessName = document.querySelector('#footer-business-name');
        if (footerBusinessName) footerBusinessName.textContent = data.businessName;

        const footerTagline = document.querySelector('#footer-tagline');
        if (footerTagline) footerTagline.textContent = data.tagline;

        const footerLocation = document.querySelector('#footer-location');
        if (footerLocation) footerLocation.textContent = data.location;

        // WhatsApp
        const whatsappLink = `https://wa.me/${data.whatsapp.number}?text=${encodeURIComponent(data.whatsapp.message)}`;
        const whatsappAnchor = document.getElementById('whatsapp-link');
        if (whatsappAnchor) whatsappAnchor.setAttribute('href', whatsappLink);

        // Social links
        const insta = document.getElementById('instagram-link');
        if (insta) insta.setAttribute('href', data.social.instagram);

        const linkedin = document.getElementById('linkedin-link');
        if (linkedin) linkedin.setAttribute('href', data.social.linkedin);

        // Email
        const emailAnchor = document.getElementById('contact-email');
        if (emailAnchor) {
          emailAnchor.setAttribute('href', `mailto:${data.email}`);
          emailAnchor.textContent = data.email;
        }
      }, 100); // Delay slightly to allow DOM injection
    })
    .catch(error => console.error('Error loading config:', error));
});
// Add WhatsApp floating button href dynamically
const floatingWhatsApp = document.getElementById('floating-whatsapp');
if (floatingWhatsApp) {
  const waUrl = `https://wa.me/${data.whatsapp.number}?text=${encodeURIComponent(data.whatsapp.message)}`;
  floatingWhatsApp.setAttribute('href', waUrl);
}
