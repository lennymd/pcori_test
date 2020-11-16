d3.selectAll('.reset_button').on('click', resetTool);
// TODO when you switch tab
function resetTool() {
  db_inputs = [];
  vis_inputs = [];

  d3.selectAll('.vis_intro').classed('hidden', false);
  d3.selectAll('.vis_active').classed('hidden', true);
  d3.select('#chart0').classed('hidden', false);
  d3.select('#chart1').classed('hidden', true);
  d3.select('#chart2').classed('hidden', true);
  d3.select('#chart3').classed('hidden', true);

  d3.select('#results_intro').classed('hidden', false);
  d3.select('#results_box').classed('hidden', true);
  d3.selectAll('.filter_panel').classed('hidden', true);
  d3.selectAll('.subfilter_panel').classed('hidden', true);
  d3.selectAll('.filter_option > input').property('checked', false);

  d3.selectAll('.reset_button').classed('hidden', true);

  console.log(vis_inputs, db_inputs);
}
