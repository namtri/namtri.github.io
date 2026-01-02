// Shared site JS: theme toggle and persistence
(function(){
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const applyStored = () => {
    try{
      const stored = localStorage.getItem('site-theme');
      if(stored === 'dark') body.classList.add('dark');
      else body.classList.remove('dark');
    }catch(e){ /* ignore storage errors */ }
  };
  const setIcon = () => {
    if(!toggle) return;
    toggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  };
  applyStored();
  setIcon();
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isDark = body.classList.toggle('dark');
      try{ localStorage.setItem('site-theme', isDark ? 'dark' : 'light'); }catch(e){}
      setIcon();
    });
  }
})();

fetch('/components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading footer:', error);
  });