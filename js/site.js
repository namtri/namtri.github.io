// Shared site JS: theme toggle and persistence
(function(){
  const body = document.body;

  const applyStored = () => {
    try{
      const stored = localStorage.getItem('site-theme');
      if(stored === 'dark') body.classList.add('dark');
      else body.classList.remove('dark');
    }catch(e){ /* ignore storage errors */ }
  };

  const setIcon = () => {
    const toggle = document.getElementById('theme-toggle');
    if(!toggle) return;
    toggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  };

  applyStored();
  setIcon();

  // If the header fragment (with the theme-toggle) is inserted after this script runs,
  // observe the DOM and update the icon when the element appears.
  if(!document.getElementById('theme-toggle')){
    const obs = new MutationObserver((mutations, observer) => {
      if(document.getElementById('theme-toggle')){
        setIcon();
        observer.disconnect();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
})();

// Load footer fragment
fetch('/components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading footer:', error);
  });

// add event listener for theme-toggle
document.addEventListener('click', e => {
  if (e.target && e.target.id === 'theme-toggle') {
    const isDark = document.body.classList.toggle('dark');
    try{ localStorage.setItem('site-theme', isDark ? 'dark' : 'light'); }catch(e){}
    e.target.textContent = isDark ? '☀️' : '🌙';
  }
});