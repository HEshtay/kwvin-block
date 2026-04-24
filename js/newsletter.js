document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button[type="submit"]');
    // Placeholder — wire up to your preferred email service
    btn.textContent = 'Eingetragen';
    btn.disabled    = true;
    input.value     = '';
  });
});
