let vis_inputs = [];
async function visualization_manager(_data) {
  let dataset = await d3.csv('./public/data/pcori_1124.csv');

  // COLUMN VALUES & GROUPINGS for filtering and update later
  let data_dictionary = await get_values(
    './public/data/data_dictionary_1124.csv'
  );

  let all_menu_options = [
    data_dictionary['target_social_need'],
    data_dictionary['target_population'],
    [
      'Age group',
      'Majority ethnic/racial group',
      'Percentage of immigrants',
      'Sex (percentage male',
    ],
    ['Behavioral', 'Health', 'Healthcare utilization'],
    ['Risk of bias', 'Study design'],
  ];
  // Groups for column names for demographics & matrix
  let age_groups = data_dictionary['age_group'];
  let race_ethnicity_groups = data_dictionary['race_ethnicity_majority'].filter(
    d => d
  );
  let proportion_groups = [
    '0&ndash;24%',
    '25%&ndash;49%',
    '50%&ndash;74%',
    '75%&ndash;100%',
    'Not Reported',
  ];

  let column_category_names = [
    age_groups,
    race_ethnicity_groups,
    proportion_groups,
    proportion_groups,
  ];

  // Groups for working with outcomes
  let outcome_types = [
    data_dictionary['behavioral_outcomes'],
    data_dictionary['health_outcomes'],
    data_dictionary['healthcareuse_outcomes'],
  ];
  let result_types = [
    results_behavioral,
    results_health,
    results_healthcareuse,
  ];
  let outcome_accessors = [
    behavioral_outcomes,
    health_outcomes,
    healthcareuse_outcomes,
  ];

  // Groups for working with color-coding
  let color_filters = [risk_of_bias, study_design];
  let outcome_valence = data_dictionary['result_other_health'];

  let risks = [];
  data_dictionary['risk_of_bias'].forEach(element => risks.push(element));
  risks.push('');

  let color_domains = [risks, data_dictionary['study_design']];
  let vis_filters = [
    target_social_need,
    target_population,
    vis_demographics,
    addresses_outcomes,
    color_filters,
  ];
  color_ranges = [
    ['#00a9ea', '#b3a589', '#c86f61', '#888888'],
    ['#d7191c', '#f07a49', '#d3d300', '#71a8bb', '#2c7bb6'],
    // ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
  ];

  // INITIAL setup -- add column_options
  for (let i = 0; i < 5; i++) {
    const options = all_menu_options[i];
    const option_list = d3.select(`#vis_${i}_options`);
    options.forEach((element, index) => {
      option_list
        .append('li')
        .attr('class', 'a_menu_option')
        .attr('id', `vis_${i}_${index}`)
        .text(element.split('(')[0]);
    });
  }
  // INITIAL setup -- make visual
  initialize_visualization(dataset);

  // PARTS OF PAGE for interaction
  const menu_options = d3.selectAll('.a_menu_option');
  const vis_intro = d3.selectAll('.vis_intro');
  const vis_active = d3.selectAll('.vis_active');
  const clear_filter_buttons = d3.selectAll('.dropdown_selection');

  // INTERACTIONS -- PART 1
  menu_options.on('click', modify_visualization);
  // when you click on the selections you remove it from the data and re-run the visualization (maybe use data-something)
  clear_filter_buttons.on('click', clear_filter);

  // when you hover over a dot, highlight (maybe a border) around other dots with same ref_id
  d3.selectAll('.chart .dot_intervention').on('mouseenter', show_companions);
  d3.selectAll('.chart .dot_intervention').on('mouseleave', hide_companions);

  // when clicking export buttons show correct study list
  d3.selectAll('.export_button_area').on('click', show_study_list);
  d3.selectAll('.export_button_area_small').on('click', show_study_list);

  // TODO when clicking on an intervention, show study page
  d3.selectAll('.dot_intervention').on('click', show_study_page);

  function modify_visualization() {
    vis_intro.classed('hidden', true);
    vis_active.classed('hidden', false);

    // Process new input by comparing to what's already in the chain. If there is something from the same category, remove the older instance
    refresh_input_chain(this.id);
    // Filter data based on vis_inputs
    let filtered_data = filter_data(vis_inputs, dataset);
    update(vis_inputs, filtered_data);
  }

  function clear_filter() {
    d3.select('#color_legend').classed('hidden', true);
    const _input = this.id;
    const input = _input.split('_');
    const i = input[1];

    let temp_input = vis_inputs;
    vis_inputs.forEach((input, index) => {
      const split_input = input.split('_');
      const category = split_input[1];
      const match_index = category == i ? index : -1;
      if (match_index > -1) {
        temp_input.splice(match_index, 1);
      }
    });
    vis_inputs = temp_input;
    d3.select(`#${_input}`)
      .style('visibility', 'hidden')
      .style('height', '0px');

    let refiltered_data = filter_data(vis_inputs, dataset);
    update(vis_inputs, refiltered_data);
  }

  function update(_inputs, _data) {
    _inputs = _inputs.sort();
    if (vis_inputs.length > 0) {
      // Update graphic layout and dots based on based on vis_inputs
      d3.selectAll('.export_button_main').classed('hidden', true);
      update_visualization(_inputs, _data);
    } else {
      initialize_visualization(dataset);
    }
    update_text(_inputs, _data);
  }

  function refresh_input_chain(_input) {
    // check if the new input matched category of one already in chain
    const input = _input.split('_');
    const input_category = `vis_${input[1]}`;
    const input_label = document.getElementById(`${_input}`).innerText;

    let temp_inputs = vis_inputs;
    vis_inputs.forEach((input, index) => {
      const split_input = input.split('_');
      const category = `vis_${split_input[1]}`;
      const match_index = category === input_category ? index : -1;

      if (match_index > -1) {
        temp_inputs.splice(match_index, 1);
      }
    });
    // Add new input and sort data
    vis_inputs = temp_inputs;
    vis_inputs.push(_input);
    vis_inputs.sort();

    // show column selection area
    d3.select(`#vis_${input[1]}_selection`)
      .style('visibility', 'visible')
      .style('height', 'auto');
    // add name to selection area
    d3.select(`#vis_${input[1]}_option`).text(input_label);
  }

  function filter_data(_inputs, _data) {
    _inputs.sort();
    let temp = _data;
    if (_inputs.length == 0) {
      return temp;
    } else {
      _inputs.forEach(_input => {
        const split_input = _input.split('_');
        const i = split_input[1];
        const j = split_input[2];
        option_text = document.getElementById(`${_input}`).textContent.trim();
        if (i < 2) {
          // 0 is target social need; 1 is target population
          temp = temp.filter(d => vis_filters[i](d).includes(option_text));
        } else {
          temp == temp;
        }
      });
      return temp;
    }
  }

  function update_visualization(_inputs, _data) {
    if (_data.length > 0) {
      d3.selectAll('.visualization_area').classed('hidden', false);
      d3.select('#color_legend').classed('hidden', true);

      let categories = [];
      _inputs.forEach(input => {
        const split_input = input.split('_');
        categories.push(Number(split_input[1]));
      });

      // indices
      const i = categories.indexOf(2);
      const j = categories.indexOf(3);
      const q = categories.indexOf(4);

      if (categories.includes(2) && categories.includes(3)) {
        // switch to matrix chart
        const chart = d3.select('#chart_matrix');
        d3.selectAll('.chart').classed('hidden', true);
        chart.classed('hidden', false);

        // figure out what all the columns and rows are going to be
        const col_definer = _inputs[i];
        const col_category = col_definer.split('_')[2];
        const cols = column_category_names[col_category];

        const row_definer = _inputs[j];
        const row_category = row_definer.split('_')[2];
        const rows = outcome_types[row_category];

        const row_type = d3.select(`#${row_definer}`).text();

        // generate grid with proper rows and cols
        d3.selectAll('.matrix_container').remove();
        const matrix_container = chart
          .append('div')
          .attr('class', 'matrix_container')
          .style('display', 'grid')
          .style('grid-template-columns', `repeat(${cols.length + 1}, 1fr)`)
          .style('grid-template-rows', `repeat(${rows.length + 1}, 1fr)`);

        // create color scale
        const result_accessors = result_types[row_category];
        const outcome_colors = d3
          .scaleOrdinal()
          .domain(outcome_valence)
          .range(['#21480b', '#8bbe56', '#ffcd03', '#b3b5b8']);

        // turn on legend
        const legend = d3.select('#color_legend');
        legend.classed('hidden', false);
        legend.select('#legend_category').text('Outcome results');

        const color_box = legend.select('#legend_colors');
        color_box.html('');
        // add div to color box for each result
        outcome_valence.forEach(element => {
          const pair = color_box
            .append('div')
            .attr('class', 'color_guide_sample');

          pair
            .append('div')
            .attr('class', 'color_box_sample')
            .style('background-color', outcome_colors(element));

          pair.append('span').text(element);
        });

        // create boxes
        for (let n1 = 0; n1 < rows.length + 1; n1++) {
          for (let m1 = 0; m1 < cols.length + 1; m1++) {
            matrix_container.append('div').attr('id', `group_${m1}_${n1}`);
          }
        }

        // start filling out grid boxes
        for (let n = 0; n < rows.length + 1; n++) {
          for (let m = 0; m < cols.length + 1; m++) {
            const group = matrix_container.select(`div#group_${m}_${n}`);
            const box = group
              .append('div')
              .attr('class', 'matrix_grid_box border_right');

            if (n == 0 && m == 0) {
              box.style('margin-top', '1em');
              box
                .append('h4')
                .attr('class', 'row_outcome_type')
                .html(
                  `Interventions sorted by ${row_type.toLowerCase()} outcomes<br /><span class="row_arrow">↓</span>`
                );
            } else if (n == 0 && m > 0) {
              // if n == 0, and m > 0 set all the column names
              if (m == cols.length) {
                box.classed('border_right', false);
              }
              box
                .append('h3')
                .attr('class', 'matrix_section_head')
                .html(cols[m - 1]);
            } else if (m == 0 && n > 0) {
              //  if m == 0, and n > 0 set all the row names
              box.classed('border_top', true);
              box
                .append('div')
                .attr('id', `outcome_name_${n - 1}`)
                .html(rows[n - 1]);
            } else if (m > 0 && n > 0) {
              box
                .classed('border_top', true)
                .classed('matrix_grid_box', false)
                .style('height', '100%');

              if (m == cols.length) {
                box.classed('border_right', false);
              }

              const sub_grid = box.append('div').attr('class', 'row_grid_1x2');

              const study_list = sub_grid
                .append('div')
                .attr('id', `study_list_box_${m}_${n}`)
                .attr('class', 'row_grid_box border_right study_list_button');

              // add export button
              const export_button = study_list
                .append('div')
                .attr('class', 'export_button_area_small')
                .attr(
                  'id',
                  `filter_matrix_${col_category}_${m - 1}_${row_category}_${
                    n - 1
                  }`
                );
              export_button
                .append('img')
                .attr('src', './public/img/export.svg');

              // Add interventions
              const intervention_list = sub_grid
                .append('div')
                .attr('id', `intervention_box_${m}_${n}`)
                .attr('class', 'row_grid_box');

              const intervention_box = intervention_list
                .append('div')
                .attr('class', `interventions_${row_category}`)
                .attr('id', `interventions_${row_category}_${n - 1}`)
                .style('display', 'flex')
                .style('flex-flow', 'row wrap')
                .style('justify-content', 'start');

              let group_data;

              // filter col
              if (col_category == 0) {
                group_data = _data.filter(d =>
                  vis_demographics[col_category](d)
                    .split(',')
                    .includes(cols[m - 1])
                );
              } else if (col_category == 1) {
                group_data = _data.filter(
                  d => vis_demographics[col_category](d) == cols[m - 1]
                );
              } else {
                // dealing with proportions, group filters by order
                const filters = [
                  _data.filter(d => vis_demographics[col_category](d) < 25),
                  _data
                    .filter(d => vis_demographics[col_category](d) > 24)
                    .filter(d => vis_demographics[col_category](d) < 50),
                  _data
                    .filter(d => vis_demographics[col_category](d) > 49)
                    .filter(d => vis_demographics[col_category](d) < 75),
                  _data.filter(d => vis_demographics[col_category](d) > 74),
                  _data.filter(d => vis_demographics[col_category](d) == 'NR'),
                ];
                group_data = filters[m - 1];
              }
              // filter row
              group_data = group_data.filter(d =>
                outcome_accessors[row_category](d).includes(rows[n - 1])
              );

              if (group_data.length < 2) {
                // hide export button if 1 or 0 studies
                export_button.style('visibility', 'hidden');
              }

              if (group_data.length == 0) {
                intervention_box
                  .append('div')
                  .append('p')
                  .attr('class', 'evidence_gap')
                  .html('No interventions.')
                  .style('margin-top', 0);
              }

              intervention_box
                .selectAll('div.dot_intervention')
                .data(group_data)
                .join(
                  enter => enter.append('div'),
                  update => update,
                  exit => exit.remove()
                )
                .attr('class', d => `dot_intervention study_${ref_id(d)}`)
                .attr('data-ref_id', d => ref_id(d))
                .style('background-color', d =>
                  outcome_colors(result_accessors[n - 1](d))
                );
            }
          }
        }
      } else if (categories.includes(2) || categories.includes(3)) {
        if (categories.includes(2)) {
          // switch to col chart
          // TODO recreate with grid and groups and not col_names
          const chart = d3.select('#chart_col');
          d3.selectAll('.chart').classed('hidden', true);
          chart.classed('hidden', false);

          // figure out what the columns are going to be
          const col_definer = _inputs[i];
          const col_category = col_definer.split('_')[2];
          const col_names = column_category_names[col_category];
          d3.select('.col_container').remove();
          // create grids
          const col_container = chart
            .append('div')
            .attr('class', 'col_container')
            .style('display', 'grid')
            .style('grid-template-columns', `repeat(${col_names.length},1fr)`);

          col_names.forEach((col_name, index) => {
            const col_title = col_name == 'Adult' ? 'Adults' : col_name;
            const col_section = col_container
              .append('div')
              .attr('class', 'col_section border_right');

            const col_head = col_section
              .append('h3')
              .attr('class', 'col_section_head')
              .html(col_title);

            const col_studies = col_section
              .append('div')
              .attr('class', 'col_section_studies')
              .style('width', '95%')
              .style('margin', '0 auto');

            const intervention_box = col_studies
              .append('div')
              .attr('id', `group_${index}`)
              .style('display', 'flex')
              .style('flex-flow', 'row wrap')
              .style('justify-content', 'center');

            let group_data;
            if (col_category == 0) {
              group_data = _data.filter(d =>
                vis_demographics[col_category](d).split(',').includes(col_name)
              );
            } else if (col_category == 1) {
              group_data = _data.filter(
                d => vis_demographics[col_category](d) == col_name
              );
            } else {
              // dealing with proportions, group filters by order
              const filters = [
                _data.filter(d => vis_demographics[col_category](d) < 25),
                _data
                  .filter(d => vis_demographics[col_category](d) > 24)
                  .filter(d => vis_demographics[col_category](d) < 50),
                _data
                  .filter(d => vis_demographics[col_category](d) > 49)
                  .filter(d => vis_demographics[col_category](d) < 75),
                _data.filter(d => vis_demographics[col_category](d) > 74),
                _data.filter(d => vis_demographics[col_category](d) == 'NR'),
              ];
              group_data = filters[index];
            }

            const export_button = col_section
              .append('div')
              .attr('class', 'export_button_area')
              .attr('id', `filter_col_${col_category}_${index}`)
              .style('margin-top', '45px');

            export_button.append('img').attr('src', './public/img/export.svg');

            if (group_data.length < 2) {
              // hide export button if 1 or 0 studies
              export_button.style('visibility', 'hidden');
            }

            if (group_data.length == 0) {
              intervention_box
                .append('div')
                .append('p')
                .attr('class', 'evidence_gap')
                .html('No interventions.')
                .style('margin-top', 0);
            }

            intervention_box
              .selectAll('div.dot_intervention')
              .data(group_data)
              .join(
                enter => enter.append('div'),
                update => update,
                exit => exit.remove()
              )
              .attr('class', d => `dot_intervention study_${ref_id(d)}`)
              .attr('data-ref_id', d => ref_id(d))
              .style('background-color', '#8bbe56');
          });
          // make all boxes have same height
          const boxes = d3.selectAll('.col_section_studies');
          const box_array = boxes._groups[0];
          let box_heights = [];
          box_array.forEach(box => box_heights.push(box.clientHeight));
          boxes.style('height', `${Math.max(...box_heights)}px`);
        } else if (categories.includes(3)) {
          // switch to row chart
          const chart = d3.select('#chart_row');
          d3.selectAll('.chart').classed('hidden', true);
          chart.classed('hidden', false);

          const outcome_type_name = d3.select(`#${_inputs[j]}`).text();
          const input = _inputs[j];
          const row_category = input.split('_')[2];
          const outcomes = outcome_types[row_category];
          // generate grid with n rows based on based on outcome type and 3 columns that could be (2fr auto 8fr)
          d3.select('.row_container').remove();

          // create grid
          const row_container = chart
            .append('div')
            .attr('class', 'row_container')
            .style('display', 'grid')
            .style('grid-template-columns', `2fr 8fr`)
            .style('grid-template-rows', `repeat(${outcomes.length + 1}, 1fr)`);

          for (let n = 0; n < outcomes.length + 1; n++) {
            for (let m = 0; m < 2; m++) {
              row_container.append('div').attr('id', `group_${m}_${n}`);
            }
          }

          const sort_box = row_container
            .select('#group_0_0')
            .html('')
            .append('div');
          sort_box
            .append('h4')
            .attr('class', 'row_outcome_type')
            .html(
              `Interventions sorted by ${outcome_type_name.toLowerCase()} outcomes<br /><span class="row_arrow">↓</span>`
            );

          // create color scale
          const result_accessors = result_types[row_category];
          const outcome_colors = d3
            .scaleOrdinal()
            .domain(outcome_valence)
            .range(['#21480b', '#8bbe56', '#ffcd03', '#b3b5b8']);

          // turn on legend
          const legend = d3.select('#color_legend');
          legend.classed('hidden', false);
          legend.select('#legend_category').text('Outcome results');

          const color_box = legend.select('#legend_colors');
          color_box.html('');
          // add div to color box for each result
          outcome_valence.forEach(element => {
            const pair = color_box
              .append('div')
              .attr('class', 'color_guide_sample');

            pair
              .append('div')
              .attr('class', 'color_box_sample')
              .style('background-color', outcome_colors(element));

            pair.append('span').text(element);
          });

          // for each row, add title in first cell, export button in second, dots in third
          for (let n = 0; n < outcomes.length + 1; n++) {
            for (let m = 0; m < 3; m++) {
              if (n == 0 && m > 0) {
                row_container.select(`group_${m}_${n}`).html('');
              } else if (n > 0) {
                const box = d3
                  .select(`div#group_${m}_${n}`)
                  .html('')
                  .attr('class', 'border_top');

                if (m == 0) {
                  box
                    .classed('border_right', true)
                    .append('div')
                    .attr('id', `outcome_name_${n - 1}`)
                    .attr('class', 'row_grid_box')
                    .html(outcomes[n - 1]);
                } else if (m == 1) {
                  // add the 1 row 2 col grid
                  const sub_grid = box
                    .append('div')
                    .attr('class', 'row_grid_1x2');

                  const study_list = sub_grid
                    .append('div')
                    .attr('id', `study_list_box_${m}_${n}`)
                    .attr(
                      'class',
                      'row_grid_box border_right study_list_button'
                    );

                  // add export button
                  const export_button = study_list
                    .append('div')
                    .attr('class', 'export_button_area_small')
                    .attr('id', `filter_row_${row_category}_${n - 1}`);
                  export_button
                    .append('img')
                    .attr('src', './public/img/export.svg');

                  // Add interventions
                  const intervention_list = sub_grid
                    .append('div')
                    .attr('id', `intervention_box_${m}_${n}`)
                    .attr('class', 'row_grid_box');

                  const intervention_box = intervention_list
                    .append('div')
                    .attr('class', `interventions_${row_category}`)
                    .attr('id', `interventions_${row_category}_${n - 1}`)
                    .style('display', 'flex')
                    .style('flex-flow', 'row wrap')
                    .style('justify-content', 'start');

                  let group_data = _data.filter(d =>
                    outcome_accessors[row_category](d).includes(outcomes[n - 1])
                  );
                  if (group_data.length < 2) {
                    export_button.style('visibility', 'hidden');
                  }

                  if (group_data.length == 0) {
                    // display no studies text
                    intervention_box
                      .append('div')
                      .append('p')
                      .attr('class', 'evidence_gap')
                      .html('No interventions.')
                      .style('margin-top', 0);
                  } else {
                    intervention_box
                      .selectAll('div.dot_intervention')
                      .data(group_data)
                      .join(
                        enter => enter.append('div'),
                        update => update,
                        exit => exit.remove()
                      )
                      .attr('class', d => `dot_intervention study_${ref_id(d)}`)
                      .attr('data-ref_id', d => ref_id(d))
                      .style('background-color', d =>
                        outcome_colors(result_accessors[n - 1](d))
                      );
                  }
                }
              }
            }
          }
        }
      } else {
        // update dot in array

        const chart = d3.select('#chart_array');
        d3.selectAll('.chart').classed('hidden', true);
        chart.classed('hidden', false);
        // add export button for array right below the chart_array
        d3.select('#array_export_area').remove();

        const export_area = d3
          .select('.visualization_area')
          .append('div')
          .attr('id', 'array_export_area');

        const export_button = export_area
          .append('div')
          .attr('class', 'export_button_area')
          .attr('id', 'filter_array');
        export_button.append('img').attr('src', './public/img/export.svg');
        let group_data = _data;

        if (group_data.length < 2) {
          export_button.style('visibility', 'hidden');
        }
        chart
          .selectAll('div.dot_intervention')
          .data(group_data)
          .join(
            enter => enter.append('div'),
            update => update,
            exit => exit.remove()
          )
          .attr('class', d => `dot_intervention study_${ref_id(d)}`)
          .attr('data-ref_id', d => ref_id(d))
          .style('background-color', '#8bbe56');
      }

      if (categories.includes(4)) {
        // color code charts based on whatever is in quality and outcomes

        const color_definer = _inputs[q];
        const color_category = color_definer.split('_')[2];
        const color_categories = color_domains[color_category];
        const color_accessor = color_filters[color_category];
        const color_scale = d3
          .scaleOrdinal()
          .domain(color_categories)
          .range(color_ranges[color_category]);

        // update color_legend
        const legend = d3.select('#color_legend');
        legend.classed('hidden', false);
        legend
          .select('#legend_category')
          .text(d3.select(`#${color_definer}`).text());

        const color_box = legend.select('#legend_colors');
        color_box.html('');
        // add div to color box for each result
        color_categories.forEach(element => {
          const pair = color_box
            .append('div')
            .attr('class', 'color_guide_sample');

          pair
            .append('div')
            .attr('class', 'color_box_sample')
            .style('background-color', color_scale(element));

          if (element == '') {
            pair.append('span').text('Not Available');
          } else {
            pair.append('span').text(element);
          }
        });

        d3.selectAll('div.dot_intervention')
          .style('background-color', d => color_scale(color_accessor(d)))
          .attr('class', d => `dot_intervention ${color_accessor(d)}`);
      }
      // INTERACTIONS -- PART 2
      d3.selectAll('.chart .dot_intervention').on(
        'mouseenter',
        show_companions
      );
      d3.selectAll('.chart .dot_intervention').on(
        'mouseleave',
        hide_companions
      );
      // when clicking export buttons show correct study list
      d3.selectAll('.export_button_area').on('click', show_study_list);
      d3.selectAll('.export_button_area_small').on('click', show_study_list);

      // TODO when clicking on an intervention, show study page
      d3.selectAll('.dot_intervention').on('click', show_study_page);
    } else {
      // there is not data to visualize
      d3.selectAll('.visualization_area').classed('hidden', true);
      d3.selectAll('.chart').classed('hidden', true);
    }
  }

  async function update_text(_inputs, _data) {
    // TODO rework this using arrays.
    // load json
    const text = await d3.json('./public/data/text_variations.json');

    let labels = ['', '', '', '', ''];

    // get all the category names from the inputs
    _inputs.forEach(input => {
      const input_category = input.split('_')[1];
      const label = d3.select(`#${input}`).text();
      labels[input_category] = label;
    });

    // create a combo based on the inputs
    let _combo = 'm';
    labels.forEach(label => {
      let val;
      if (label === '') {
        val = '0';
      } else {
        val = '1';
      }
      _combo = _combo + val;
    });

    let combo;
    if (_data.length == 0) {
      // no interventions match
      combo = '_gap';
    } else if (_inputs.length == 0 && _data.length > 0) {
      // all inputs have been manually cleared
      combo = '_all';
    } else if (_data.length == 1) {
      // there is only 1 intervention, so we have to update the tenses
      _combo[0] = 's';
      combo = _combo;
    } else {
      // we have more than 1 intervention
      combo = _combo;
    }
    console.log(combo);

    let statement = text[combo];

    // update text object with the text from the json.
    d3.select('#vis_criteria_text').html(statement);
    d3.select('#relevant_interventions').text(_data.length);
    const text_labels = [
      '#text_social_need',
      '#text_target_population',
      '#text_demographic',
      '#text_outcome',
      '#text_color_code',
    ];
    text_labels.forEach((id, index) => d3.select(id).text(labels[index]));
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
  function show_study_list() {
    const id = this.id;
    const id_split = id.split('_');
    const chart_type = id_split[1];

    // show modal screen
    d3.select('.modal').style('display', 'block');
    d3.selectAll('.modal_header.text').text(
      'List of studies fulfilling the filters you have selected:'
    );
    d3.select('.modal_list').classed('hidden', false);
    d3.select('.modal_single').classed('hidden', true);

    // TODO filter studies
    let filtered_data = filter_data(vis_inputs, dataset);

    let sub_filter = id_split;
    sub_filter.splice(0, 2);
    // process sub_filters so they're easier to work with:
    let sf_options = [];
    let sf_sub_options = [];
    sub_filter.forEach((element, index) => {
      if (index % 2 == 0) {
        sf_options.push(element);
      } else {
        sf_sub_options.push(element);
      }
    });

    let group_data = filtered_data;
    // work with sf_options to filter data for a group
    sf_options.forEach((element, i) => {
      const sub_option = sf_sub_options[i];
      if (chart_type == 'matrix') {
        // process for matrix
        if (i % 2 == 0) {
          group_data = filter_cols(element, sub_option, filtered_data);
        } else {
          group_data = filter_rows(element, sub_option, group_data);
        }
        console.log(sub_option);
      } else if (chart_type == 'col') {
        // process for col chart
        group_data = filter_cols(element, sub_option, filtered_data);
      } else if (chart_type == 'row') {
        // process for row chart
        group_data = filter_rows(element, sub_option, filtered_data);
      } else {
        // array
        group_data = filtered_data;
      }
      function filter_rows(_option, _sub, _data) {
        let temp;
        const rows = outcome_types[_option];
        const row = rows[_sub];
        const row_function = outcome_accessors[_option];
        temp = _data.filter(d => row_function(d).includes(row));
        return temp;
      }
      function filter_cols(_option, _sub, _data) {
        let temp;
        const cols = column_category_names[_option];
        const col = cols[_sub];
        const col_function = vis_demographics[_option];
        if (_option == 0) {
          temp = _data.filter(d => col_function(d).split(',').includes(col));
        } else if (_option == 1) {
          temp = _data.filter(d => col_function(d) == col);
        } else {
          const numeric_filters = [
            _data.filter(d => col_function(d) < 25),
            _data
              .filter(d => col_function(d) > 24)
              .filter(d => col_function(d) < 50),
            _data
              .filter(d => col_function(d) > 49)
              .filter(d => col_function(d) < 75),
            _data.filter(d => col_function(d) > 74),
            _data.filter(d => col_function(d) == 'NR'),
          ];
          temp = numeric_filters[sub_option];
        }
        return temp;
      }
    });

    d3.selectAll('.modal_filter_group').remove();
    const filter_list = d3.select('.modal_filters');
    vis_inputs.forEach(input => {
      const split = input.split('_');
      const category = split[1];
      const option = split[2];
      const filter_group = filter_list
        .append('div')
        .attr('class', 'modal_filter_group');

      filter_group
        .append('span')
        .attr('class', 'modal_filter_category')
        .text(d3.select(`#vis_${category}_category`).text());

      filter_group
        .append('strong')
        .attr('class', 'modal_filter_value')
        .attr('id', `modal_${category}_${option}`)
        .text(d3.select(`#vis_${category}_${option}`).text());
    });

    // add subfilters to demographics and outcome options
    let col_picked = false;
    let row_picked = false;
    sf_options.forEach((element, i) => {
      const sub_option = sf_sub_options[i];

      if (chart_type == 'matrix') {
        // process for matrix
        if (i % 2 == 0) {
          sub_col(element, sub_option);
        } else {
          sub_row(element, sub_option);
        }
      } else if (chart_type == 'col') {
        // process for col chart
        sub_col(element, sub_option);
      } else if (chart_type == 'row') {
        // process for row chart
        sub_row(element, sub_option);
      }
      function sub_row(_option, _sub) {
        const sub_row = outcome_types[_option][_sub];
        d3.select(`#modal_3_${_option}`)
          .append('span')
          .html(`:<br><em>${sub_row}</em>`);
      }
      function sub_col(_option, _sub) {
        let sub_col = column_category_names[_option][_sub];
        sub_col = sub_col == 'Adult' ? 'Adults' : sub_col;
        d3.select(`#modal_2_${_option}`)
          .append('span')
          .html(`:<br><em>${sub_col}</em>`);
      }
    });

    // get unique ref_id from filtered_data
    const a_study_list = d3.map(group_data, ref_id).keys();
    const unique_studies = new Set(a_study_list);
    let studies = Array.from(unique_studies);

    // append a group div for each unique ref_id
    const study_list = d3.select('.modal_studies');

    studies.forEach(study => {
      const data = dataset.filter(d => ref_id(d) == study);
      const s = data[0];
      const study_group = study_list.append('div').attr('class', `modal_study`);

      const study_dot = study_group
        .append('div')
        .attr('class', d => `dot_intervention_small study_${study}`);

      const study_info = study_group
        .append('div')
        .attr('class', 'modal_study_info');

      study_info
        .append('span')
        .attr('class', 'modal_study_authors')
        .text(`${author(s)} `);
      study_info
        .append('span')
        .attr('class', 'modal_study_year')
        .text(`(${year(s)}), `);
      study_info
        .append('span')
        .attr('class', 'modal_study_title')
        .text(`"${title(s)}"`);
      if (journal(s).length > 1) {
        study_info
          .append('span')
          .attr('class', 'modal_study_journal')
          .text(` ${journal(s)} `);
      }
      if (volume(s).length >= 1) {
        study_info
          .append('span')
          .attr('class', 'modal_study_volume')
          .text(`, Volume ${volume(s)}`);
      }
    });

    // TODO update dot colors if it makes sense
  }

  // INTERACTIONS -- PART 3
  d3.selectAll('.modal_header_img').on('click', close_modal);
  // d3.selectAll('.modal').on('click', close_modal);
  function close_modal() {
    d3.select('.modal').style('display', 'none');
  }
}
visualization_manager();
