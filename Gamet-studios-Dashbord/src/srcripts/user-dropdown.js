document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('user-button');
  const menu = document.getElementById('user-menu');

  if (!button || !menu) return;

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    menu.classList.add('hidden');
  });

  window.handleLogout = function() {
    if (confirm('Wirklich abmelden?')) {
      console.log('User abgemeldet');
      window.location.href = '/login';
    }
  };
});