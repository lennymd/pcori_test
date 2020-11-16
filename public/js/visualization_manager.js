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
  // TODO draw initial dots

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

    let display_text_intro = `You are seeing <span id="filters_the" class="hidden">the</span>
      <span class="total_study_highlight"
        ><span class="select_study_count">${_data.length}</span> studies</span
      >`;
    let display_info = '';
    const input_string = input_categories.toString().trim();
    if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a') && input_string.includes('b')) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a') && input_string.includes('c')) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('a') && input_string.includes('d')) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('a')) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions.`;
    } else if (
      input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('b') && input_string.includes('c')) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('b') && input_string.includes('d')) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('b')) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address.`;
    } else if (input_string.includes('c') && input_string.includes('d')) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (input_string.includes('c')) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (input_string.includes('d')) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else {
      alert('test me');
    }
    const display_text = `${display_text_intro.trim()} ${display_info.trim()}`.trim();
    d3.selectAll('.vis_active').html(`${display_text}`);
  }

  function updateVisualization(_inputs, _data) {
    const data = _data;
    let input_categories = [];
    _inputs.forEach(input => input_categories.push(input[0]));
    const input_string = input_categories.toString().trim();
    if (input_string.includes('c') || input_string.includes('d')) {
      if (input_string.includes('c') && input_string.includes('d')) {
        // TODO switch to chart3 -- rows x columns
        d3.select('#chart0').classed('hidden', true);
        d3.select('#chart1').classed('hidden', true);
        d3.select('#chart2').classed('hidden', true);
        d3.select('#chart3').classed('hidden', false);
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
        console.log(d, sub_category, value);

        d3.selectAll('.outcome_label').text(
          `${document.getElementById(`${d}`).textContent.trim()}`
        );
        let positive = d3.select('#positive_outcome');
        let negative = d3.select('#negative_outcome');
        let mixed = d3.select('#mixed_outcome');
        let no_effect = d3.select('#noeffect_outcome');
        outcome_areas = [positive, negative, mixed, no_effect];
        outcome_values = ['Positive', 'Negative', 'Mixed results', 'No effect'];
        if (sub_category == 'a') {
          // dealing with behavioral outcomes
          let results_behavioral = [
            result_diet,
            result_substance_use,
            result_other_behavior,
          ];
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
            result_other_healthcareuse,
          ];
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
        // TODO switch to chart1 -- columns
        d3.select('#chart0').classed('hidden', true);
        d3.select('#chart2').classed('hidden', true);
        d3.select('#chart3').classed('hidden', true);
        d3.select('#chart1').classed('hidden', false);
      }
    } else {
      // stay with chart0
      // TODO update the circles in the visualization
    }

    if (input_string.includes('e')) {
      // TODO color code things.
      d3.select('#color_legend').classed('hidden', false);
    }
  }
}

visualizationManager();
