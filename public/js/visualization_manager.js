let vis_inputs = [];
async function visualizationManager() {
  let dataset = await d3.csv('./public/data/pcori_1111.csv');

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

  // Quality
  const risk_of_bias = d => d.risk_of_bias;
  const study_design = d => d.study_design;

  // PARTS OF PAGE
  const reset_button = d3.selectAll('.reset_button');
  const menu_options = d3.selectAll('.a_menu_option');
  const vis_intro = d3.selectAll('.vis_intro');
  const vis_active = d3.selectAll('.vis_active');

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
    console.log(vis_inputs);

    // update data based on vis_inputs
    const filtered_data = filterData(vis_inputs, dataset);
    // update vis_active text
    updateVisualizationText(vis_inputs, filtered_data);
    // TODO update visualization
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
        console.log(value, input_text_label);
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
    });

    let display_text_intro = `You are seeing <span id="filters_the" class="hidden">the</span>
      <span class="total_study_highlight"
        ><span class="select_study_count">${_data.length}</span> studies</span
      >`;
    let display_info = '';
    const input_string = _inputs.toString().trim();
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
      input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      !input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      input_string.includes('a') &&
      input_string.includes('b') &&
      !input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address.`;
    } else if (
      input_string.includes('a') &&
      !input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      input_string.includes('a') &&
      !input_string.includes('b') &&
      input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      input_string.includes('a') &&
      !input_string.includes('b') &&
      !input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      input_string.includes('a') &&
      !input_string.includes('b') &&
      !input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions.`;
    } else if (
      !input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      !input_string.includes('a') &&
      input_string.includes('b') &&
      input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[0]}</strong> as one of their target interventions and have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      !input_string.includes('a') &&
      input_string.includes('b') &&
      !input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address. They are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      !input_string.includes('a') &&
      input_string.includes('b') &&
      !input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that have <strong class="criteria_category">${label_text[1]}</strong> as one of the needs they address.`;
    } else if (
      !input_string.includes('a') &&
      !input_string.includes('b') &&
      input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[2]}</strong>. They are also sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else if (
      !input_string.includes('a') &&
      !input_string.includes('b') &&
      input_string.includes('c') &&
      !input_string.includes('d')
    ) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[2]}</strong>.`;
    } else if (
      !input_string.includes('a') &&
      !input_string.includes('b') &&
      !input_string.includes('c') &&
      input_string.includes('d')
    ) {
      display_info = `that are sorted by <strong class="criteria_category">${label_text[3]}</strong> outcomes.`;
    } else {
      alert('test me');
    }
    const display_text = `${display_text_intro.trim()} ${display_info.trim()}`.trim();
    d3.selectAll('.vis_active').html(`${display_text}`);
  }
}

visualizationManager();
