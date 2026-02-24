// StoreTransfer - Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                currentPlatform: formData.get('current-platform'),
                targetPlatform: formData.get('target-platform'),
                products: formData.get('products'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            
            // Validate
            if (!data.name || !data.email || !data.currentPlatform || !data.targetPlatform) {
                alert('Vul alle verplichte velden in.');
                return;
            }
            
            // Store in localStorage (for now)
            let submissions = JSON.parse(localStorage.getItem('storetransfer_submissions') || '[]');
            submissions.push(data);
            localStorage.setItem('storetransfer_submissions', JSON.stringify(submissions));
            
            // Show success message
            form.innerHTML = `
                <div class="success-message">
                    <h3>✓ Bedankt voor je aanvraag!</h3>
                    <p>We hebben je gegevens ontvangen. Je hoort binnen 24 uur van ons.</p>
                </div>
            `;
            
            // Log for debugging (remove in production)
            console.log('Form submission:', data);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
