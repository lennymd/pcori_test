function sdb_manager(_dataset, _data_dictionary, _display_dictionary) {
  const dataset = _dataset;
  const data_dictionary = _data_dictionary;
  const display_dictionary = _display_dictionary;
  // const nest_data = _nested_data;

  // scroll accordions to filter when opened
  // open/close an accordion
  d3.selectAll('.accordion_title').on('click', toggleAccordion);
  function toggleAccordion() {
    const parent = this.parentElement;
    const parent_id = parent.id;
    const accordion_content = parent.children[1];
    const content = d3.select(accordion_content);
    const arrow = this.children[1].children[1];

    let isOpen = false;
    if (content.classed('hidden')) {
      content.classed('hidden', false);
      isOpen = true;
      arrow.innerHTML = '&#x25b2;';
    } else {
      content.classed('hidden', true);
      isOpen = false;
      arrow.innerHTML = '&#x25bc;';
    }
    // move the page to that point
    if (isOpen) {
      document
        .getElementById(parent_id)
        .scrollIntoView({behavior: 'smooth', block: 'start'});
    } else {
      document
        .getElementById(parent_id)
        .scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  let sdb_accessors = [
    target_social_need,
    target_population,
    age_group,
    race_ethnicity_majority,
    proportion_male,
    proportion_immigrant,
    intervention_target,
    intervention_setting,
    specific_intervention_components,
    recruitment_setting,
    study_design,
    quality_rating,
    individual_systems_intervention,
    study_type,
    service_provider,
    comparator,
    behavioral_outcomes,
    health_outcomes,
    healthcareuse_outcomes,
  ];
  // Populate accordion options for everything except outcomes
  let sdb_values = [
    data_dictionary.filter(target_social_need).map(target_social_need),
    data_dictionary.filter(target_population).map(target_population),
    data_dictionary.filter(age_group).map(age_group),
    data_dictionary
      .filter(race_ethnicity_majority)
      .map(race_ethnicity_majority),
    [
      '0 &ndash; 24%',
      '25 &ndash; 49%',
      '50 &ndash; 74%',
      '75 &ndash; 100%',
      'Not reported',
    ],
    ['Includes immigrants', 'Does not include immigrants'],
    data_dictionary.filter(intervention_target).map(intervention_target),
    data_dictionary.filter(intervention_setting).map(intervention_setting),
    data_dictionary
      .filter(specific_intervention_components)
      .map(specific_intervention_components),
    data_dictionary.filter(recruitment_setting).map(recruitment_setting),
    data_dictionary.filter(study_design).map(study_design),
    data_dictionary.filter(quality_rating).map(quality_rating),
    data_dictionary
      .filter(individual_systems_intervention)
      .map(individual_systems_intervention),
    data_dictionary.filter(study_type).map(study_type),
    data_dictionary.filter(service_provider).map(service_provider),
    data_dictionary.filter(comparator).map(comparator),
  ];

  let sdb_options = [
    display_dictionary.filter(target_social_need).map(target_social_need),
    display_dictionary.filter(target_population).map(target_population),
    display_dictionary.filter(age_group).map(age_group),
    display_dictionary
      .filter(race_ethnicity_majority)
      .map(race_ethnicity_majority),
    [
      '0 &ndash; 24%',
      '25 &ndash; 49%',
      '50 &ndash; 74%',
      '75 &ndash; 100%',
      'Not reported',
    ],
    ['Includes immigrants', 'Does not include immigrants'],
    display_dictionary.filter(intervention_target).map(intervention_target),
    display_dictionary.filter(intervention_setting).map(intervention_setting),
    display_dictionary
      .filter(specific_intervention_components)
      .map(specific_intervention_components),
    display_dictionary.filter(recruitment_setting).map(recruitment_setting),
    display_dictionary.filter(study_design).map(study_design),
    display_dictionary.filter(quality_rating).map(quality_rating),
    display_dictionary
      .filter(individual_systems_intervention)
      .map(individual_systems_intervention),
    display_dictionary.filter(study_type).map(study_type),
    display_dictionary.filter(service_provider).map(service_provider),
    display_dictionary.filter(comparator).map(comparator),
  ];

  for (let index = 0; index < sdb_options.length; index++) {
    const list = d3.select(`ul#sdb_options_${index}`);
    sdb_options[index].forEach((element, i) => {
      list.append('li').attr('class', 'filter_option_item')
        .html(`<label class="accordion_option" id="sdb_${index}_${i}">
                          <input type="checkbox"/>
                          <div class="checkbox_interface"></div>
                          <span class="checkbox_text">${element}</span>
                        </label>`);
    });
  }

  // populate accordion options for outcomes
  const outcome_labels = [
    display_dictionary.filter(behavioral_outcomes).map(behavioral_outcomes),
    display_dictionary.filter(health_outcomes).map(health_outcomes),
    display_dictionary
      .filter(healthcareuse_outcomes)
      .map(healthcareuse_outcomes),
  ];
  const outcome_values = [
    data_dictionary.filter(behavioral_outcomes).map(behavioral_outcomes),
    data_dictionary.filter(health_outcomes).map(health_outcomes),
    data_dictionary.filter(healthcareuse_outcomes).map(healthcareuse_outcomes),
  ];

  const result_valence = [
    'Positive',
    'Negative',
    'Mixed results',
    'No significant difference',
  ];
  const outcome_direction = ['Increase', 'Decrease'];

  for (let j = 0; j < 3; j++) {
    const outcome_list = d3.select(`#sdb_outcomes_${j}`);
    outcome_labels[j].forEach((outcome, i) => {
      outcome_list.append('li').attr('class', 'filter_option_item')
        .html(`<label class="accordion_option" id="sdb_${j + 16}_o_${i}">
                          <input type="checkbox"/>
                          <div class="checkbox_interface"></div>
                          <span class="checkbox_text">${outcome}</span>
                        </label>`);
    });
    const result_list = d3.select(`#sdb_results_${j}`);
    result_valence.forEach((result, i) => {
      result_list.append('li').attr('class', 'filter_option_item')
        .html(`<label class="accordion_option" id="sdb_${j + 16}_v_${i}">
                          <input type="checkbox"/>
                          <div class="checkbox_interface"></div>
                          <span class="checkbox_text">${result}</span>
                        </label>`);
    });
    if (j == 2) {
      const direction_list = d3.select(`#sdb_direction_${j}`);
      outcome_direction.forEach((dir, i) => {
        direction_list.append('li').attr('class', 'filter_option_item')
          .html(`<label class="accordion_option" id="sdb_${j + 16}_d_${i}">
                          <input type="checkbox"/>
                          <div class="checkbox_interface"></div>
                          <span class="checkbox_text">${dir}</span>
                        </label>`);
      });
    }
  }

  // populate table with all studies
  // populate table with a more d3-centric way so I can use enter/exits later
  createRowsDB(dataset);

  // make table sortable
  d3.selectAll('.sort_header').on('click', sortTable);
  function sortTable() {
    const id = this.id;
    const arrow_icon = document.getElementById(id).children[0];
    const n = id.split('_')[2];
    let table = document.getElementsByClassName('sdb_studies')[0].children[0];
    let rows = table.rows;
    let switching = true;
    let switchCount = 0;
    let shouldSwitch;
    let dir = 'asc';
    let i;
    while (switching) {
      switching = false;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        const x = rows[i].getElementsByTagName('td')[n];
        const y = rows[i + 1].getElementsByTagName('td')[n];

        const a = x.innerHTML.toLowerCase();
        const b = y.innerHTML.toLowerCase();
        if (dir == 'asc') {
          if (a > b) {
            shouldSwitch = true;
            break;
          }
        } else if ((dir = 'desc')) {
          if (a < b) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
        let arrows = document.getElementsByClassName('sdb_study_sort_icon');

        Array.from(arrows).forEach(elt => {
          elt.innerHTML = '&#x2195;';
        });
        if (dir == 'asc') {
          arrow_icon.innerHTML = '&#x2191;';
        } else if (dir == 'desc') {
          arrow_icon.innerHTML = '&#x2193;';
        }
      } else {
        if (switchCount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  // filter rows on table based on inputs
  let filter_chain = [];
  d3.selectAll('.filter_option_item').on('input', filterDatabase);
  function filterDatabase() {
    // check if option was toggled on or off and update processing chain
    let filtered_data = dataset;
    const label = this.children[0];
    const id = label.id;
    const input = label.children[0];
    const box = label.children[1];
    if (input.checked) {
      // CASE: input activated. Change checkbox color and add ID to filter_chain
      d3.select(box).style('background-color', '#80b655');
      filter_chain.push(id);
    } else {
      // CASE: input deactivated. Remove checkbox color and remove ID from filter_chain
      d3.select(box).style('background-color', 'transparent');
      const index_to_remove = filter_chain.indexOf(id);
      filter_chain.splice(index_to_remove, 1);
    }

    filter_chain = filter_chain.sort();
    let outcome_related = [];
    filter_chain.forEach(element => {
      if (element.includes('_o_')) {
        outcome_related.push(element);
      }
    });

    let categories = [];
    filter_chain.forEach(opt => {
      const opt_split = opt.split('_');
      const category = opt_split[1];
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });

    // update all active lights based on filter chain
    d3.selectAll('.items_selected').style('visibility', 'hidden');
    categories.forEach(cat => {
      const pilot_light = document
        .getElementById(`sdb_options_${cat}`)
        .parentElement.parentElement.getElementsByClassName(
          'items_selected'
        )[0];
      d3.select(pilot_light).style('visibility', 'visible');
    });

    // filter data using data dictionary and dataset
    if (filter_chain.length > 0) {
      filter_chain.forEach(item => {
        // Check that there's enough data to work with
        const item_split = item.split('_');
        const cat = item_split[1];
        const main_opt = item_split[2];
        const filter_function = sdb_accessors[cat];
        if (cat < 16) {
          // CASE: dealing with any other category. Check if we're dealing with immigrants or male pop.
          if (cat == 4 || cat == 5) {
            // CASE: dealing with immigrant % or male %. Handle with math
            if (cat == 5) {
              // CASE: working with proportion_immigrant
              if (main_opt == 0) {
                filtered_data = filtered_data.filter(
                  d => filter_function(d) != 'NR'
                );
              } else {
                filtered_data = filtered_data.filter(
                  d => filter_function(d) == 'NR'
                );
              }
            } else if (cat == 4) {
              // CASE: working with proportion_male
              if (main_opt == 0) {
                filtered_data = filtered_data.filter(
                  d => filter_function(d) < 25
                );
              } else if (main_opt == 1) {
                filtered_data = filtered_data
                  .filter(d => filter_function(d) > 24)
                  .filter(d => filter_function(d) < 50);
              } else if (main_opt == 2) {
                filtered_data = filtered_data
                  .filter(d => filter_function(d) > 49)
                  .filter(d => filter_function(d) < 75);
              } else if (main_opt == 3) {
                filtered_data = filtered_data.filter(
                  d => filter_function(d) > 74
                );
              } else if (main_opt == 4) {
                filtered_data = filtered_data.filter(
                  d => filter_function(d) == 'NR'
                );
              }
            }
          } else {
            // CASE: dealing with any of the other filters.
            const filter_value = sdb_values[cat][main_opt];
            filtered_data = filtered_data.filter(d =>
              filter_function(d).includes(filter_value)
            );
          }
        } else {
          // CASE: dealing with an outcome-related item. Do extra processing
          const opt_val = item_split[3];
          if (main_opt == 'o') {
            // process outcome based on category and value
            const filter_value = outcome_values[cat - 16][opt_val];
            filtered_data = filtered_data.filter(d =>
              filter_function(d).includes(filter_value)
            );
          } else {
            // v or d so either a result or direction has been selected:
            if (main_opt == 'v') {
              let temp_result_filters = [];
              const relevant_results = result_accessors[cat - 16];
              if (outcome_related.length == 0) {
                // Only a result value has been selected, or all outcomes have been selected. Filter by all the results
                relevant_results.forEach(rel_filter => {
                  temp_result_filters.push(
                    filtered_data.filter(
                      d => rel_filter(d) == result_valence[opt_val]
                    )
                  );
                });
              } else if (outcome_related.length > 0) {
                // At least one outcome is selected so filter only by those outcomes's results
                let picked_result_index = [];
                outcome_related.forEach(outcome => {
                  const out = outcome.split('_');
                  picked_result_index.push(+out[3]);
                });
                let select_results = [];
                relevant_results.forEach((element, i) => {
                  if (picked_result_index.includes(i)) {
                    select_results.push(element);
                  }
                });

                select_results.forEach(rel_filter => {
                  temp_result_filters.push(
                    filtered_data.filter(
                      d => rel_filter(d) == result_valence[opt_val]
                    )
                  );
                });
              }

              // combine all these arrays and pass that to filtered_data
              let _temp = [];

              temp_result_filters.forEach(sub_filter => {
                _temp = _temp.concat(sub_filter);
              });

              filtered_data = _temp;
            } else if (main_opt == 'd') {
              let temp_direction_filters = [];
              const relevant_results = result_accessors[cat - 16];
              if (outcome_related == 0) {
                // CASE: we select only a direction, or all the outcomes AND a direction. this case seems dumb to me, but let's make it work
                direction_accessors.forEach(factor => {
                  temp_direction_filters.push(
                    filtered_data.filter(
                      d => factor(d) == outcome_direction[opt_val]
                    )
                  );
                });
              } else if (
                outcome_related.length > 0 &&
                outcome_related.length < relevant_results.length
              ) {
                // At least one outcome is selected so filter only by those outcomes's results
                let picked_direction_index = [];
                outcome_related.forEach(outcome => {
                  const out = outcome.split('_');
                  picked_direction_index.push(+out[3]);
                });
                let select_factors = [];
                direction_accessors.forEach((element, i) => {
                  if (picked_direction_index.includes(i)) {
                    select_factors.push(element);
                  }
                });

                select_factors.forEach(factor => {
                  temp_direction_filters.push(
                    filtered_data.filter(
                      d => factor(d) == outcome_direction[opt_val]
                    )
                  );
                });
              }

              // combine all interventions and pass it to filtered_data
              let _temp = [];
              temp_direction_filters.forEach(sub_filter => {
                _temp = _temp.concat(sub_filter);
              });
              filtered_data = _temp;
            }
          }
        }
      });
    } else {
      filtered_data = dataset;
    }

    updateRowsDB(filtered_data);
  }

  d3.selectAll('.sdb_reset').on('click', resetSDB);
  function resetSDB() {
    filter_chain = [];
    d3.selectAll('.items_selected').style('visibility', 'hidden');
    d3.selectAll('.checkbox_interface').style(
      'background-color',
      'transparent'
    );
    updateRowsDB(dataset);
  }
  function createRowsDB(_data) {
    // create a nested version of filtered_data
    let _nest_data = d3.nest().key(ref_id).entries(_data);
    // use nest_data to update the rows.
    const tbody = d3.select('tbody#sdb_study_rows');
    tbody.html('');

    const study_rows = tbody.selectAll('tr.study_row').data(_nest_data);
    const new_rows = study_rows
      .enter()
      .append('tr')
      .attr('class', 'study_row')
      .attr('id', d => `study_${d.key}`);

    new_rows
      .append('td')
      .attr('class', 'study_author')
      .text(d => {
        const line = d.values[0];
        const authors_str = authors(line);
        const author_list = authors_str.split(',');
        let author_txt;
        if (author_list.length > 6) {
          const first_author = author_list[0];
          author_txt = `${first_author} et al.`;
        } else {
          author_txt = authors(line);
        }
        return author_txt;
      });

    new_rows
      .append('td')
      .attr('class', 'study_year')
      .text(d => year(d.values[0]));

    new_rows
      .append('td')
      .attr('class', 'study_title')
      .text(d => title(d.values[0]));

    new_rows
      .append('td')
      .attr('class', 'study_publication')
      .text(d => journal(d.values[0]));

    study_rows.exit().remove();
  }

  function updateRowsDB(_data) {
    // create a nested version of filtered_data
    let _nest = d3.nest().key(ref_id).entries(_data);
    console.log(_nest.length);

    // use nest_data to update the rows.
    const tbody = d3.select('tbody#sdb_study_rows');
    const study_rows = tbody.selectAll('tr.study_row');

    study_rows.classed('hidden', true);
    _nest.forEach(study => {
      tbody.select(`tr.study_row#study_${study.key}`).classed('hidden', false);
    });
  }
}
