async function loadFragment({
  url,
  targetId,
  tokens = {}
}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);

  let html = await res.text();

  // Token replacement: %TOKEN%
  for (const [key, value] of Object.entries(tokens)) {
    const regex = new RegExp(`%${key}%`, 'g');
    html = html.replace(regex, value);
  }

  const target = document.getElementById(targetId);
  target.innerHTML = html;

  // Hide current page link
  const currentPath = window.location.pathname.replace(/\/$/, '');

  target.querySelectorAll('a[href]').forEach(link => {
    const linkPath = link.getAttribute('href').replace(/\/$/, '');

    if (linkPath === currentPath) {
      link.style.display = 'none';
      // OR, if you prefer:
      // link.classList.add('active');
    }
  });
}
