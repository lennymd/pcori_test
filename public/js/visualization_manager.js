let vis_inputs = [];
async function visualizationManager() {
  let dataset = await d3.csv('./public/data/pcori_1111--fudged.csv');

  // TODO put accessor functions and list at a higher level so it can be used by multiple functions
  // ACCESSOR FUNCTIONS
  // Target of social need
  const target_social_need = d => d.target_social_need;

  // Needs of the population
  const target_population = d => d.target_population;

  // Population characteristics
  const age_group = d => d.age_group;
  const race_ethnicity_majority = d => d.race_ethnicity_majority;
  const proportion_male = d => d.proportion_male;
  const proportion_immigrant = d => d.proportion_immigrant;

  // Outcomes
  const addresses_health_outcomes = d => d.addresses_health_outcomes;
  const health_outcomes = d => d.health_outcomes;
  const addresses_behavioral_outcomes = d => d.addresses_behavioral_outcomes;
  const behavioral_outcomes = d => d.behavioral_outcomes;
  const addresses_healthcareuse_outcomes = d =>
    d.addresses_healthcareuse_outcomes;
  const healthcareuse_outcomes = d => d.healthcareuse_outcomes;

  // Outcomes => results
  const result_QALY = d => d.result_QALY;
  const result_mortality = d => d.result_mortality;
  const result_mental_health_status = d => d.result_mental_health_status;
  const result_functional = d => d.result_functional;
  const result_morbidity = d => d.result_morbidity;
  const result_quality_of_life = d => d.result_quality_of_life;
  const result_self_health = d => d.result_self_health;
  const result_low_birth_weight = d => d.result_low_birth_weight;
  const result_child_development = d => d.result_child_development;
  const result_other_health = d => d.result_other_health;
  const result_substance_use = d => d.result_substance_use;
  const result_diet = d => d.result_diet;
  const result_other_behavior = d => d.result_other_behavior;
  const result_hospital_readmission = d => d.result_hospital_readmission;
  const result_frequency_healthcare_use = d =>
    d.result_frequency_healthcare_use;
  const result_adherence = d => d.result_adherence;
  const result_missed_appointments = d => d.result_missed_appointments;
  const result_preventive = d => d.result_preventive;
  const result_outpatient_visits = d => d.result_outpatient_visits;
  const result_emergency_visits = d => d.result_emergency_visits;
  const result_clinic_attendance = d => d.result_clinic_attendance;
  const result_post_primarycare_visits = d => d.result_post_primarycare_visits;
  const result_prenatal = d => d.result_prenatal;
  const result_inpatient_admission = d => d.result_inpatient_admission;
  const result_hospital_days = d => d.result_hospital_days;
  const result_sober_center = d => d.result_sober_center;
  const result_medical_home = d => d.result_medical_home;
  const result_immunizations = d => d.result_immunizations;
  const result_other_healthcareuse = d => d.result_other_healthcareuse;
  const result_emergency_transport = d => d.result_emergency_transport;

  // Quality
  const risk_of_bias = d => d.risk_of_bias;
  const study_design = d => d.study_design;

  // PARTS OF PAGE
  const reset_button = d3.selectAll('.reset_button');
  const menu_options = d3.selectAll('.a_menu_option');
  const vis_intro = d3.selectAll('.vis_intro');
  const vis_active = d3.selectAll('.vis_active');

  // INITIAL setup
  initializeVisualization(dataset);

  // INTERACTIONS
  menu_options.on('click', visualizeStudies);

  function visualizeStudies() {
    reset_button.classed('hidden', false);
    vis_intro.classed('hidden', true);
    vis_active.classed('hidden', false);

    // add option to vis_inputs
    const input = this.id;
    // check for matching category
    const input_category = input[0];
    let match_index = -1;
    vis_inputs.forEach((element, index) => {
      const category = element[0];
      if (category == input_category) {
        match_index = index;
      }
    });

    if (match_index > -1) {
      // we have a match, remove that input
      vis_inputs.splice(match_index, 1);
    }
    // add new input to chain
    vis_inputs.push(input);
    vis_inputs.sort();

    // update data based on vis_inputs
    const filtered_data = filterData(vis_inputs, dataset);
    // update vis_active text
    updateVisualizationText(vis_inputs, filtered_data);
    updateVisualization(vis_inputs, filtered_data);
  }
  function filterData(_inputs, _dataset) {
    let temp_data = _dataset;
    _inputs.forEach(input => {
      const category = input[0];
      input_text_label = document.getElementById(`${input}`).textContent.trim();
      if (category == 'a' || category == 'b') {
        if (category == 'a') {
          temp_data = temp_data.filter(d =>
            target_social_need(d).includes(input_text_label)
          );
        } else {
          // category == "b"
          temp_data = temp_data.filter(d =>
            target_population(d).includes(input_text_label)
          );
        }
      } else if (category == 'c') {
        const value = Number(input.slice(1, input.length));
        if (value == 0) {
          // age_group
          temp_data = temp_data.filter(d => age_group(d));
        } else if (value == 1) {
          // majority ethnic/racial group
          temp_data = temp_data.filter(d => race_ethnicity_majority(d));
        } else if (value == 2) {
          // proportion immigrant
          temp_data = temp_data.filter(d => proportion_immigrant(d));
        } else if (value == 3) {
          // proportion male
          temp_data = temp_data.filter(d => proportion_male(d));
        } else {
          alert(`something is wrong with the value for ${input_text_label}`);
        }
      } else if (category == 'd') {
        const sub_category = input[1];
        const value = Number(input.slice(2, input.length));

        if (sub_category == 'a') {
          // dealing with behavioral outcomes
          temp_data = temp_data
            .filter(d => addresses_behavioral_outcomes(d) == 'Yes')
            .filter(d => behavioral_outcomes(d).includes(input_text_label));
        } else if (sub_category == 'b') {
          // dealing with health outcomes
          temp_data = temp_data
            .filter(d => addresses_health_outcomes(d) == 'Yes')
            .filter(d => health_outcomes(d).includes(input_text_label));
        } else if (sub_category == 'c') {
          // dealing with healthcare use outcomes
          temp_data = temp_data
            .filter(d => addresses_healthcareuse_outcomes(d) == 'Yes')
            .filter(d => healthcareuse_outcomes(d).includes(input_text_label));
        } else {
          alert(
            `something is wrong with the outcome subcategory for: ${input_text_label}`
          );
        }
      } else if (category == 'e') {
        temp_data = temp_data;
      } else {
        alert('Something is wrong. Check your input categories');
      }
    });
    return temp_data;
  }

  function updateVisualizationText(_inputs, _data) {
    // update study number
    label_text = ['NA', 'NA', 'NA', 'NA', 'NA'];
    input_categories = [];
    _inputs.forEach(input => {
      const text = document.getElementById(`${input}`).textContent.trim();
      if (input[0] == 'a') {
        label_text[0] = text;
      } else if (input[0] == 'b') {
        label_text[1] = text;
      } else if (input[0] == 'c') {
        label_text[2] = text;
      } else if (input[0] == 'd') {
        label_text[3] = text;
      } else if (input[0] == 'e') {
        label_text[4] = text;
      }
      input_categories.push(input[0]);
    });

    const study_word = _data.length > 1 ? 'studies' : 'study';
    let display_text_intro = `You are seeing <span 
      <span class="total_study_highlight"
        ><span class="select_study_count">${_data.length}</span> ${study_word}</span
      >`;
    let display_info = '';
    const input_string = input_categories.toString().trim();

    let multi_study = ['have', 'their', 'they address', 'They', 'are'];
    let single_study = ['has', 'its', 'it addresses', 'It', 'is'];
    const tense = _data.length > 1 ? single_study : multi_study;
    if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions and ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>. ${tense[3]} are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c')
    ) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions and ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('d')
    ) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions and ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a') && input_string.includes('b')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>. ${tense[3]} are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a') && input_string.includes('c')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('a') && input_string.includes('d')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions.`;
    } else if (
      input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>. ${tense[3]} are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('b') && input_string.includes('c')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[0]}</strong> as one of ${tense[1]} target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('b') && input_string.includes('d')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}. ${tense[3]} are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('b')) {
      display_info = `that ${tense[0]} <strong class="criteria_category">${label_text[1]}</strong> as one of the needs ${tense[2]}.`;
    } else if (input_string.includes('c') && input_string.includes('d')) {
      display_info = `that ${tense[4]} sorted by <strong class="criteria_category">${label_text[2]}</strong>. ${tense[3]} are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('c')) {
      display_info = `that ${tense[4]} sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('d')) {
      display_info = `that ${tense[4]} sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    }
    // TODO what should happen on text when we sort by quality?
    let display_text;
    if (
      input_string.includes('e') &&
      !input_string.includes('a') &&
      !input_string.includes('b') &&
      !input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_text = `${display_text_intro.trim()}.`;
    } else {
      display_text = `${display_text_intro.trim()} ${display_info.trim()}`.trim();
    }
    d3.selectAll('.vis_active').html(display_text);
  }

  function updateVisualization(_inputs, _data) {
    const data = _data;
    let input_categories = [];

    let results_health = [
      result_functional,
      result_self_health,
      result_child_development,
      result_low_birth_weight,
      result_mental_health_status,
      result_morbidity,
      result_mortality,
      result_QALY,
      result_quality_of_life,
      result_other_health,
    ];
    let results_healthcare_use = [
      result_adherence,
      result_clinic_attendance,
      result_emergency_visits,
      result_frequency_healthcare_use,
      result_hospital_days,
      result_hospital_readmission,
      result_immunizations,
      result_inpatient_admission,
      result_medical_home,
      result_missed_appointments,
      result_outpatient_visits,
      result_post_primarycare_visits,
      result_prenatal,
      result_preventive,
      result_sober_center,
      result_emergency_transport,
      result_other_healthcareuse,
    ];
    let results_behavioral = [
      result_diet,
      result_substance_use,
      result_other_behavior,
    ];
    let characteristics = [
      age_group,
      race_ethnicity_majority,
      proportion_immigrant,
      proportion_male,
    ];
    let column_categories = [
      ['Adolescents/ Young Adults', 'Adults', 'Older Adults', 'Pediatric'],
      [
        'Asian',
        'Hispanic',
        'Non-Hispanic Black',
        'Non-Hispanic White',
        'Other',
      ],
      ['0–24%', '25%–49%', '50%–74%', '75%–100%', 'Not Reported'],
      ['0–24%', '25%–49%', '50%–74%', '75%–100%', 'Not Reported'],
    ];
    let outcome_values = ['Positive', 'Negative', 'Mixed results', 'No effect'];
    _inputs.forEach(input => input_categories.push(input[0]));
    const input_string = input_categories.toString().trim();
    if (input_string.includes('c') || input_string.includes('d')) {
      if (input_string.includes('c') && input_string.includes('d')) {
        // TODO switch to chart3 -- rows x columns
        d3.select('#chart0').classed('hidden', true);
        d3.select('#chart1').classed('hidden', true);
        d3.select('#chart2').classed('hidden', true);
        d3.select('#chart3').classed('hidden', false);
        const c_index = input_categories.indexOf('c');
        const c = _inputs[c_index];
        const d_index = input_categories.indexOf('d');
        const d = _inputs[d_index];
        const d_category = d[1];
        const c_value = Number(c.slice(1, c.length));
        const d_value = Number(d.slice(2, d.length));
        const column_names = column_categories[c_value];
        const column_number = column_names.length;

        const grid = d3.select('#grid_rows_columns');
        grid.html('');
        grid.style(
          'grid-template-columns',
          `repeat(${column_number + 1}, 1fr)`
        );

        for (i = 0; i < 5; i++) {
          for (j = 0; j < column_number + 1; j++) {
            grid
              .append('div')
              .attr('id', `grid_${i}_${j}`)
              .attr('class', `grid_box row_${i} col_${j}`);
          }
        }

        // fill outcome box grid_0_0
        const outcome_box = d3
          .select('#grid_0_0')
          .text('')
          .attr('class', 'border_right grid_box');

        outcome_box.append('span').attr('class', 'small_title').text('Outcome');
        outcome_box.append('br');
        outcome_box
          .append('span')
          .attr('class', 'outcome_label')
          .text(document.getElementById(d).textContent.trim());

        // add column names
        column_names.forEach((name, index) => {
          const box = d3
            .select(`#grid_0_${index + 1}`)
            .text('')
            .attr('class', 'border_right');
          box.append('h3').attr('class', 'column_category').text(name);
        });

        outcome_values.forEach((name, index) => {
          d3.select(`#grid_${index + 1}_0`)
            .text('')
            .attr('class', 'border_right border_top')
            .append('span')
            .attr('class', 'grid_outcome_label')
            .html(`${name}`);
        });

        // add data for each group:
        outcome_values.forEach((row, i) => {
          column_names.forEach((col, j) => {
            console.log(row, col, i, j);
            const box = d3
              .select(`#grid_${i + 1}_${j + 1}`)
              .style('display', 'flex')
              .style('flex-wrap', 'wrap')
              .style('flex-direction', 'row')
              .attr('class', 'border_right border_top');

            let data_slice = data;
            let column_filter = characteristics[c_value];
            // filter column first
            if (col == 'Adults') {
              data_slice = data_slice.filter(d =>
                column_filter(d).includes('Adult')
              );
            } else if (col == '0–24%') {
              data_slice = data_slice.filter(
                d => Number(column_filter(d)) < 25
              );
            } else if (col == '25%–49%') {
              data_slice = data_slice
                .filter(d => Number(column_filter(d)) > 24)
                .filter(d => Number(column_filter(d)) < 50);
            } else if (col == '50%–74%') {
              data_slice = data_slice
                .filter(d => Number(column_filter(d)) > 49)
                .filter(d => Number(column_filter(d)) < 75);
            } else if (col == '75%–100%') {
              data_slice = data_slice.filter(
                d => Number(column_filter(d)) > 74
              );
            } else if (col == 'Not Reported') {
              data_slice = data_slice.filter(
                d => Number(column_filter(d)) == 'NR'
              );
            } else {
              data_slice = data_slice.filter(d =>
                column_filter(d).includes(col)
              );
            }

            // filter by row value
            let row_filter;
            if (d_category == 'a') {
              row_filter = results_behavioral[d_value];
            } else if (d_category == 'b') {
              row_filter = results_health[d_value];
            } else if (d_category == 'c') {
              row_filter = results_healthcare_use[d_value];
            }
            data_slice = data_slice.filter(d => row_filter(d) == row);
            box
              .selectAll('div.dot_study')
              .data(data_slice)
              .join(
                enter => enter.append('div'),
                update => update,
                exit => exit.remove()
              )
              .attr('class', 'dot_study');
          });
        });

        // end of chart 3 code
      } else if (input_string.includes('d')) {
        // switch to chart2 -- rows
        d3.select('#chart0').classed('hidden', true);
        d3.select('#chart1').classed('hidden', true);
        d3.select('#chart3').classed('hidden', true);
        d3.select('#chart2').classed('hidden', false);
        const d_index = input_categories.indexOf('d');
        const d = _inputs[d_index];
        const sub_category = d[1];
        const value = Number(d.slice(2, d.length));

        d3.selectAll('.outcome_label').text(
          document.getElementById(d).textContent.trim()
        );
        let positive = d3.select('#positive_outcome');
        let negative = d3.select('#negative_outcome');
        let mixed = d3.select('#mixed_outcome');
        let no_effect = d3.select('#noeffect_outcome');
        const outcome_areas = [positive, negative, mixed, no_effect];

        if (sub_category == 'a') {
          // dealing with behavioral outcomes

          outcome_values.forEach((outcome, index) => {
            outcome_areas[index]
              .selectAll('div.dot_study')
              .data(data.filter(d => results_behavioral[value](d) == outcome))
              .join(
                enter => enter.append('div'),
                update => update,
                exit => exit.remove()
              )
              .attr('class', 'dot_study');
          });
        } else if (sub_category == 'b') {
          // dealing with health outcomes

          outcome_values.forEach((outcome, index) => {
            outcome_areas[index]
              .selectAll('div.dot_study')
              .data(data.filter(d => results_health[value](d) == outcome))
              .join(
                enter => enter.append('div'),
                update => update,
                exit => exit.remove()
              )
              .attr('class', 'dot_study');
          });
        } else if (sub_category == 'c') {
          // dealing with healthcare use outcomes

          outcome_values.forEach((outcome, index) => {
            outcome_areas[index]
              .selectAll('div.dot_study')
              .data(
                data.filter(d => results_healthcare_use[value](d) == outcome)
              )
              .join(
                enter => enter.append('div'),
                update => update,
                exit => exit.remove()
              )
              .attr('class', 'dot_study');
          });
        }
      } else if (input_string.includes('c')) {
        // switch to chart1 -- columns
        d3.select('#chart0').classed('hidden', true);
        d3.select('#chart2').classed('hidden', true);
        d3.select('#chart3').classed('hidden', true);
        d3.select('#chart1').classed('hidden', false);

        // create the sections and append the column titles
        const c_index = input_categories.indexOf('c');
        const c = _inputs[c_index];
        const value = c[1];
        const current_categories = column_categories[value];
        d3.selectAll('.grid_columns').remove();
        const col_grid = d3.select('#grid_columns');
        col_grid.style(
          'grid-template-columns',
          `repeat(${current_categories.length},1fr)`
        );
        const category_container = col_grid
          .selectAll('columns')
          .data(current_categories)
          .join(
            enter => enter.append('div'),
            update => update,
            exit => exit.remove()
          )
          .attr('class', 'grid_columns border_right');

        category_container
          .append('div')
          .append('h3')
          .text((d, i) => `${current_categories[i]}`)
          .attr('class', 'column_category ');

        category_container
          .append('div')
          .attr('id', (d, i) => `group_${i}`)
          .style('display', 'flex')
          .style('flex-direction', 'row')
          .style('flex-wrap', 'wrap')
          .style('flex', 1)
          .style('width', '100%')
          .style('margin', '0 auto');
        // Add circles to each group

        current_categories.forEach((category, index) => {
          let group, group_data;
          if (value == 0) {
            // age_group
            if (category == 'Adults') {
              group = 'Adult';
            } else {
              group = category;
            }
            group_data = data.filter(d =>
              characteristics[value](d).includes(group)
            );
          } else if (value == 1) {
            // race/ethnicity
            group_data = data.filter(d =>
              characteristics[value](d).includes(category)
            );
          } else if (value == 2 || value == 3) {
            // proportion immigrant
            if (index == 0) {
              // 0 - 24
              group_data = data.filter(
                d => Number(characteristics[value](d)) < 25
              );
            } else if (index == 1) {
              // 25-49
              group_data = data
                .filter(d => Number(characteristics[value](d)) > 24)
                .filter(d => Number(characteristics[value](d)) < 50);
            } else if (index == 2) {
              // 50 - 75
              group_data = data
                .filter(d => Number(characteristics[value](d)) > 49)
                .filter(d => Number(characteristics[value](d)) < 75);
            } else if (index == 3) {
              // 75 - 100
              group_data = data.filter(
                d => Number(characteristics[value](d)) > 75
              );
            } else {
              group_data = data.filter(d => characteristics[value](d) === 'NR');
            }
          }
          d3.select(`#group_${index}`)
            .selectAll('div.dot_study')
            .data(group_data)
            .join(
              enter => enter.append('div'),
              update => update,
              exit => exit.remove()
            )
            .attr('class', 'dot_study');
        });
      }
    } else {
      // stay with chart0
      d3.select('#initial')
        .selectAll('div.dot_study')
        .data(data)
        .join(
          enter => enter.append('div'),
          update => update,
          exit => exit.remove()
        )
        .attr('class', 'dot_study');
    }

    if (input_string.includes('e')) {
      console.log('color');
      // color code things.
      const quality = [risk_of_bias, study_design];
      const e_index = input_categories.indexOf('e');
      const e = _inputs[e_index];

      // setup color scale
      const color_range = [
        '#00429d',
        '#96ffea',
        'yellow',
        '#b30051',
        '#93003a',
      ];
      const color_domain =
        e[1] == 0
          ? ['High', 'Medium', 'Low', 'NA']
          : [
              'Case-control',
              'Cohort study',
              'Pre-post',
              'RCT',
              'Other observational',
            ];
      const color_scale = d3
        .scaleOrdinal()
        .range(color_range)
        .domain(color_domain);

      const color_legend_box = d3
        .select('#color_legend')
        .classed('hidden', false);

      color_legend_box.selectAll('div').remove();

      const legend_box = color_legend_box
        .append('div')
        .attr('class', 'legend_box');

      color_domain.forEach((element, i) => {
        box = legend_box.append('div').attr('class', 'legend_item');
        box
          .append('div')
          .attr('class', 'legend_dot')
          .style('background-color', color_scale(element));
        box.append('div').html(element);
      });

      // color circles
      d3.selectAll('div.dot_study')
        .data(data)
        .join(
          enter => enter.append('div'),
          update => update,
          exit => exit.remove()
        )
        .style('background-color', d => color_scale(quality[e[1]](d)));
    }
  }
}
function initializeVisualization(_data) {
  d3.select('#chart0').classed('hidden', false);
  d3.select('#chart1').classed('hidden', true);
  d3.select('#chart2').classed('hidden', true);
  d3.select('#chart3').classed('hidden', true);

  d3.select('#initial')
    .selectAll('div.dot_study')
    .data(_data)
    .join(
      enter => enter.append('div'),
      update => update,
      exit => exit.remove()
    )
    .attr('class', 'dot_study');
}
visualizationManager();
