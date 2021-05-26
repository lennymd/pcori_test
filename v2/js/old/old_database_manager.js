let db_inputs = [];
let search_categories = [
  'target_social_need',
  'target_population',
  'age_group',
  'race_ethnicity_majority',
  'intervention_target',
  'intervention_setting',
  'specific_intervention_components',
  'recruitment_setting',
  'study_design',
  'risk_of_bias',
  'individual_systems_intervention',
  'study_type',
  'service_provider',
  'comparator',
];

let search_accessors = [
  target_social_need,
  target_population,
  age_group,
  race_ethnicity_majority,
  intervention_target,
  intervention_setting,
  specific_intervention_components,
  recruitment_setting,
  study_design,
  risk_of_bias,
  individual_systems_intervention,
  study_type,
  service_provider,
  comparator,
  [[], results_behavioral],
  [[], results_health],
  [directions_healthcareuse, results_healthcareuse],
];

let slider_accessors = [proportion_immigrant, proportion_male, sample_size];

// TODO put database manager and visualization manager in a huge async main function
async function databaseManager() {
  let dataset = await d3.csv('./public/data/pcori_20210114.csv');
  let data_dictionary = await getValues(
    './public/data/data_dictionary_1124.csv'
  );
  // populate_filters() in helper_functions.js
  populateFilters(data_dictionary, search_categories);

  // INTERACTION -- Toggle both kinds of accordions
  // toggleAccordion() in helper_functions.js
  d3.selectAll('.filter_category').on('click', toggleAccordion);
  d3.selectAll('.subfilter_category').on('click', toggleAccordion);

  // INTERACTION -- when you click an input, check the database
  d3.selectAll('.filter_item').on('click', searchDatabase);

  // INTERACTION -- when you click reset button, wipe db_inputs clear all inputs,
  d3.select('#search_reset').on('click', resetDatabase);

  function resetDatabase() {
    db_inputs = [];
    d3.select('#results_intro').classed('hidden', false);
    d3.select('.search_results').classed('hidden', true);
    d3.selectAll('.filter_item').property('checked', false);
  }

  function searchDatabase() {
    if (d3.select(this).classed('slider')) {
      // process slider
      alert('This is not available at the moment');
    } else {
      // update db_inputs
      if (db_inputs.includes(this.name)) {
        db_inputs.splice(db_inputs.indexOf(this.name), 1);
      } else {
        db_inputs.push(this.name);
      }

      if (db_inputs.length > 0) {
        // TODO turn on the reset button
        d3.select('#search_reset').style('visibility', 'visible');
        // generateCombinations() in helper_functions.js
        const combos = generateCombinations(db_inputs);
        d3.selectAll('.combination_study_list').remove();
        var relevant_studies = [];
        // display studies
        d3.select('#results_intro').classed('hidden', true);
        d3.select('.search_results').classed('hidden', false);
        d3.select('#download_search').style('visibility', 'visible');
        combos.forEach(_combo => {
          console.log(`combo`, _combo);
          let filtered_data = filterData_db(
            _combo,
            dataset,
            search_accessors,
            data_dictionary,
            search_categories
          );
          // Identify unique studies from interventions
          let unique_studies = d3.map(filtered_data, ref_id).keys();
          relevant_studies.push(...unique_studies);

          const combination_container = d3.select('.combination_results');
          if (filtered_data.length > 0) {
            let combination_text = generateCombinationText(
              _combo,
              search_categories,
              data_dictionary
            );
            console.log(combination_text);
            const combo_section = combination_container
              .append('div')
              .attr('class', 'combination_study_list');

            const section = combo_section
              .append('h3')
              .attr('class', 'combination_info')
              .html(
                `Studies related to: <strong>${combination_text.toString()}</strong>`
              );
            const study_list = section.append('ul').attr('class', 'study_list');
            unique_studies.forEach(element => {
              const s = dataset.filter(d => ref_id(d) == element)[0];
              const template = `<span class="study_author">${
                author(s).split(',')[0]
              }, et al. </span>
            <span class="study_year">(${year(s)}), </span>
            <strong class="study_title">"${title(s)} "</strong>
            <span class="study_journal">${journal(s)}</span>`;
              study_list
                .append('li')
                .attr('class', 'relevant_study')
                .attr('data-ref_id', ref_id(s))
                .html(template);
            });
          }
        });
        // update relevant_study_count
        d3.select('#relevant_study_count').text(
          Array.from(new Set(relevant_studies)).length
        );
        d3.selectAll('.relevant_study').on('click', show_study_page);
      } else {
        d3.select('#search_reset').style('visibility', 'hidden');
        d3.select('#results_intro').classed('hidden', false);
        d3.select('.search_results').classed('hidden', true);
      }
    }
  }

  function filterData_db(
    _combo,
    _data,
    _accessors,
    data_dictionary,
    search_categories
  ) {
    // TODO somehow add sliders to this later -- use a shorter input for slider's name
    // loop through chain and filter by each accessor
    let temp = _data;
    _combo.forEach(_input => {
      const input = _input.split('_');
      if (input.length < 4) {
        let filter_accessor = _accessors[input[1]];
        let filter_name = search_categories[input[1]];
        let filter_value = data_dictionary[filter_name][input[2]];
        if (filter_name == 'age_group') {
          temp = temp.filter(d =>
            filter_accessor(d).split(',').includes(filter_value)
          );
        } else {
          temp = temp.filter(d => filter_accessor(d).includes(filter_value));
        }
      } else {
        let valence = [
          ['Increase', 'Decrease'],
          ['Positive', 'Negative', 'Mixed results', 'No effect'],
        ];
        let filter_accessor = _accessors[input[1]][input[3]][input[2]];
        const v = valence[input[3]][input[4]];
        temp = temp.filter(d => filter_accessor(d) == v);
      }
    });

    // return filtered data
    return temp;
  }
  function test() {
    a = ['db_15_7_1_0'];
    b = search_categories;
    c = data_dictionary;
    let out = generateCombinationText(a, b, c);
    console.log(out);
  }
  test();
  function generateCombinationText(_combo, search_categories, data_dictionary) {
    // go through each input and grab the associated text. If working with outcomes, add some more text to make it make sense.
    let criteria = [];
    _combo.forEach((_input, index) => {
      console.log(_input, index);
      const input = _input.split('_');
      if (input.length < 4) {
        // dealing with a non-outcome input
        let value = data_dictionary[search_categories[input[1]]][input[2]];
        criteria[index] = value;
      } else {
        // TODO work with outcome
        let valence = [
          ['Increase', 'Decrease'],
          ['Positive', 'Negative', 'Mixed results', 'No effect'],
        ];
        let outcomes = [
          'behavioral_outcomes',
          'health_outcomes',
          'healthcareuse_outcomes',
        ];
        const i = input[1] - search_categories.length;
        const outcome_name = data_dictionary[outcomes[i]][input[2]];
        console.log(outcome_name);
        let value = '';
        if (input[3] == 0) {
          value = `Expected ${valence[0][
            input[4]
          ].toLowerCase()} for <em>${outcome_name}</em> outcome`;
        } else {
          if (input[4] < 3) {
            value = `${
              valence[1][input[4]]
            } results for <em>${outcome_name}</em> outcome`;
          } else {
            value = `${
              valence[1][input[4]]
            } for <em>${outcome_name}</em> outcome`;
          }
        }
        criteria[index] = value;
      }
    });
    return criteria;
  }

  function show_study_page() {
    // console.log(this.dataset.ref_id);
    d3.selectAll('.modal').style('display', 'block');
    d3.selectAll('.modal_header_text').text(
      'Study that addresses the intervention you selected:'
    );
    d3.select('.modal_list').classed('hidden', true);
    d3.select('.modal_single').classed('hidden', false);

    const ref = this.dataset.ref_id;
    const study = dataset.filter(d => ref_id(d) == ref);
    const s = study[0];
    const study_info = d3.select('.single_study_info');
    study_info.html('');
    study_info.append('div').text(author(s));
    study_info.append('div').text(`(${year(s)})`);
    study_info.append('div').html(`<strong>${title(s)}</strong>`);
    if (journal(s).length > 1) {
      study_info.append('span').text(`${journal(s)} `);
      if (volume(s).length >= 1) {
        study_info.append('span').text(`Volume ${volume(s)}`);
      }
    }
  }
}
databaseManager();
