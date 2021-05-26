const tab_vis = d3.select('#tab_viz');
const tab_db = d3.select('#tab_sdb');
const content_vis = d3.select('#viz');
const content_db = d3.select('#sdb');

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
