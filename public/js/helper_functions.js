function initialize_visualization(_data) {
  d3.selectAll('.chart').classed('hidden', true);
  d3.select('#chart_array').classed('hidden', false);
  d3.select('#chart_array')
    .selectAll('div.dot_intervention')
    .data(_data)
    .join(
      enter => enter.append('div'),
      update => update,
      exit => exit.remove()
    )
    .attr('class', d => `dot_intervention study_${ref_id(d)}`)
    .attr('data-ref_id', d => ref_id(d))
    .style('background-color', '#8bbe56');
}

async function get_values() {
  let data = await d3.csv('./public/data/column_values.csv');
  const cols = data.columns;
  let values = {};
  cols.forEach(
    col =>
      (values[col] = d3
        .map(data, d => d[col])
        .keys()
        .filter(d => d))
  );
  return values;
}
function show_companions() {
  const point = d3.select(this).data()[0];
  d3.selectAll(`.dot_intervention.study_${point.ref_id}`).style(
    'border-color',
    'cornflowerblue'
  );
}
function hide_companions() {
  const point = d3.select(this).data()[0];
  d3.selectAll(`.dot_intervention.study_${point.ref_id}`).style(
    'border-color',
    'transparent'
  );
}
