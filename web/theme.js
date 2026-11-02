(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { const saved = localStorage.getItem('ledger-theme'); if (saved === 'dark' || saved === 'light') preference = saved; } catch {}
  function apply() {
    const dark = (preference || (media.matches ? 'dark' : 'light')) === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101915' : '#f5f5ef');
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      button.innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span><span class="theme-label">${dark ? 'Light mode' : 'Dark mode'}</span>`;
    }
  }
  apply();
  media.addEventListener('change', () => { if (!preference) apply(); });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('ledger-theme', preference); } catch {}
      apply();
    });
  });
})();
