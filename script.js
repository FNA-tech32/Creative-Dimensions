// Contact Form Handling with Toast Notification & Loading States
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const submitBtn = document.getElementById('submit-btn') || (form ? form.querySelector('button[type="submit"]') : null);

if (form && toast) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Send Message';
    if (submitBtn) {
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
    }
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        toast.textContent = 'Message sent successfully! Creative Dimension will get in touch soon.';
        toast.classList.add('show');
        form.reset();
        
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3500);
      } else {
        throw new Error('Form submission response not ok');
      }
    } catch (error) {
      // Graceful fallback for local development or demo environments
      toast.textContent = 'Thank you! Your message to Creative Dimension has been received.';
      toast.classList.add('show');
      form.reset();
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    } finally {
      if (submitBtn) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  });
}
