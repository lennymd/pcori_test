const tab_vis = document.getElementById('tab_vis');
const tab_db = document.getElementById('tab_db');
const content_vis = document.getElementById('vis');
const content_db = document.getElementById('db');

tab_vis.addEventListener('click', switchView);
tab_db.addEventListener('click', switchView);

function switchView() {
  tab_db.classList.toggle('tab_active');
  tab_vis.classList.toggle('tab_active');
  content_vis.classList.toggle('hidden');
  content_db.classList.toggle('hidden');
}
