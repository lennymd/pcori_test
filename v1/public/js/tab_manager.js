const tab_vis = d3.select('#tab_vis');
const tab_db = d3.select('#tab_db');
const content_vis = d3.select('#vis');
const content_db = d3.select('#db');

tab_db.on('click', switchToDatabase);
tab_vis.on('click', switchToVisualization);

function switchToDatabase() {
  tab_vis.classed('tab_active', false);
  content_vis.classed('hidden', true);
  tab_db.classed('tab_active', true);
  content_db.classed('hidden', false);
}
function switchToVisualization() {
  tab_vis.classed('tab_active', true);
  content_vis.classed('hidden', false);
  tab_db.classed('tab_active', false);
  content_db.classed('hidden', true);
}
