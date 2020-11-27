function initializeVisualization(_data) {
  console.log('initializing');
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

async function getValues(_url) {
  let url = _url.toString();
  let data = await d3.csv(url);
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
function showCompanions() {
  const point = d3.select(this).data()[0];
  d3.selectAll(`.dot_intervention.study_${point.ref_id}`).style(
    'filter',
    'brightness(0)'
  );
}
function hideCompanions() {
  const point = d3.select(this).data()[0];
  d3.selectAll(`.dot_intervention.study_${point.ref_id}`).style(
    'filter',
    'brightness(1)'
  );
}

function populateFilters(_dictionary, categories) {
  // populate input filters
  let filter_categories = categories;
  filter_categories.forEach((filter, index) => {
    const options = _dictionary[filter];
    const filter_box = d3.select(`#${filter}`).classed(`db_${index}`, true);
    filter_box.html('');
    const option_list = filter_box.append('ul');
    if (options.length < 4) {
      option_list.classed('short_list', true);
    }
    options.forEach((option, i) => {
      if (option == 'NR') {
        option = 'Not Reported';
      }
      const template = `<input class="filter_item" type="checkbox" name="db_${index}_${i}" /><label for="db_${index}_${i}">${option}</label>`;
      option_list.append('li').attr('class', 'filter_option').html(template);
    });
  });

  // populate_sliders
  const sliders = ['male', 'immigrant', 'sample'];
  sliders.forEach(name => {
    const el = document.getElementById(`slider_${name}`);
    noUiSlider.create(el, {
      start: [10, 60],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });
  });

  // populate health & behavioral outcomes
  outcomes = ['behavioral', 'health', 'healthcareuse'];
  outcomes.forEach((filter, sub_index) => {
    const index = filter_categories.length + sub_index;
    const options = _dictionary[`${filter}_outcomes`];
    const filter_box = d3
      .select(`#${filter}_outcomes`)
      .classed(`db_${index}`, true);
    const container = filter_box
      .append('div')
      .attr('class', 'subfilter_container');

    options.forEach((option, i) => {
      const accordion = container
        .append('div')
        .attr('class', 'subfilter_accordion');

      accordion
        .append('div')
        .attr('class', 'subfilter_category')
        .attr('id', `accordion_${index}_${i}`)
        .html(`<div class="subfilter_title">${option}</div>
      <div class="subfilter_toggle">▼</div>`);

      const options = accordion
        .append('div')
        .attr('class', 'subfilter_panel hidden')
        .attr('id', `panel_${index}_${i}`);
      let results;
      if (sub_index != 2) {
        results = options
          .append('div')
          .attr('class', `results results_${index}_${i}`);
      } else {
        // sub_index == 2 which is healthcare outcomes
        const division = options.append('div').attr('class', 'division');

        const direction = division.append('div').attr('class', 'direction');
        direction.append('h3').text('Expected direction');
        const directions = direction.append('ul');

        ['Increase', 'Decrease'].forEach((valence, val_i) => {
          const template = `<input class="filter_item" type="checkbox" name="db_${index}_${i}_0_${val_i}" /><label for="db_${index}_${i}_0_${val_i}">${valence}</label>`;
          directions.append('li').attr('class', 'filter_option').html(template);
        });

        results = division
          .append('div')
          .attr('class', `results results_${index}_${i}`);
      }
      results.append('h3').text('Results');
      const valences = results.append('ul');
      const result_valence = [
        'Positive',
        'Negative',
        'Mixed results',
        `No effect`,
      ];
      result_valence.forEach((valence, val_i) => {
        const template = `<input class="filter_item" type="checkbox" name="db_${index}_${i}_1_${val_i}" /><label for="db_${index}_${i}_1_${val_i}">${valence}</label>`;
        valences.append('li').attr('class', 'filter_option').html(template);
      });
    });
  });
}

function toggleAccordion() {
  const panel = d3.select(this.nextElementSibling);
  const arrow = d3.select(this.lastElementChild);
  if (panel.classed('hidden')) {
    panel.classed('hidden', false);
    arrow.text('▲');
  } else {
    panel.classed('hidden', true);
    arrow.text('▼');
  }
}

function generateCombinations(items) {
  let results = [];
  for (let slots = items.length; slots > 0; slots--) {
    for (let loop = 0; loop < items.length - slots + 1; loop++) {
      let key = results.length;
      results[key] = [];
      for (let i = loop; i < loop + slots; i++) {
        results[key].push(items[i]);
      }
    }
  }
  return results;
}
