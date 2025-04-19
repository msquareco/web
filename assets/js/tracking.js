// --- Include header and footer dynamically ---
function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error(`Could not fetch ${file}`);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(error => {
          el.innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
          console.error(error);
        });
    }
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);
