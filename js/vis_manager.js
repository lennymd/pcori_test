function vis_manager(_dataset, _data_dictionary, _display_dictionary) {
  const dataset = _dataset;
  const data_dictionary = _data_dictionary;
  const display_dictionary = _display_dictionary;
  const nest_data = d3.nest().key(ref_id).entries(dataset);

  // Populate Vis Menu
  let vis_menu_options = [
    display_dictionary.filter(target_social_need).map(target_social_need),
    display_dictionary.filter(target_population).map(target_population),
    display_dictionary.filter(study_design).map(study_design),
    [
      'Age group',
      'Majority ethnic/racial group',
      'Percentage of immigrants',
      'Sex (percentage male)',
    ],
    ['Behavioral', 'Health', 'Use of healthcare services'],
  ];

  for (let i = 0; i < 5; i++) {
    const options = vis_menu_options[i];
    const option_list = d3.select(`#vis_options_${i}`);
    options.forEach((element, index) => {
      option_list
        .append('li')
        .attr('class', 'vis_option')
        .attr('id', `vis_${i}_${index}`)
        .text(element);
    });
  }

  // TODO add code here for visualization side
  let vis_data_options = [
    data_dictionary.filter(target_social_need).map(target_social_need),
    data_dictionary.filter(target_population).map(target_population),
    data_dictionary.filter(study_design).map(study_design),
    [
      'Age group',
      'Majority ethnic/racial group',
      'Percentage of immigrants',
      'Sex (percentage male)',
    ],
    ['Behavioral', 'Health', 'Use of healthcare services'],
  ];
  let vis_input_chain = [
    'vis_0_-1',
    'vis_1_-1',
    'vis_2_-1',
    'vis_3_-1',
    'vis_4_-1',
    'vis_quality_-1',
  ];

  d3.selectAll('.vis_option').on('click', updateVisualization);
  function updateVisualization() {
    const display_text = this.textContent;
    const selected_id = this.id;
    const id_components = selected_id.split('_');
    const cat = id_components[1];
    const opt = id_components[2];
    const data_value = vis_data_options[cat][opt];

    // unhide selected box and update it's text
    d3.select(`#vis_selected_${cat}`).style('visibility', 'visible');
    d3.select(`#vis_selected_${cat}_text`).text(display_text);
    let studies_count = v.setMenu(data_value);

    // prep unset icon for cleaning
    const vis_unset = d3.select(`#vis_unset_${cat}`);
    vis_unset.attr('title', data_value);
    vis_unset.classed(`${selected_id}`, true);
    updateVisualizationRHS(selected_id, 'add', studies_count);
  }
  d3.selectAll('.vis_unset_icon').on('click', cleanVisualization);
  function cleanVisualization() {
    const classList = Array.from(this.classList).sort();
    const leaving_id = classList[0];
    const self_id = this.id.split('_');
    const cat = self_id[2];
    const data_value = this.title;

    let studies_count = v.unsetMenu(data_value);
    d3.select(`#vis_selected_${cat}`).style('visibility', 'hidden');

    updateVisualizationRHS(leaving_id, 'sub', studies_count);
  }

  let is_quality_on = false;
  d3.selectAll('.vis_quality_state').on('click', toggleQuality);
  function toggleQuality() {
    const selected_id = this.id;
    const id = this.id.split('_');
    const switch_word = id[2];

    if (switch_word == 'on' && !is_quality_on) {
      let studies_count = v.setMenu('Study quality');
      is_quality_on = true;
      d3.select('#vis_quality_on').classed('vis_quality_active', true);
      d3.select('#vis_quality_off').classed('vis_quality_active', false);

      updateVisualizationRHS(selected_id, 'add', studies_count);
    } else if (switch_word == 'off' && is_quality_on) {
      let studies_count = v.unsetMenu('Study quality');
      is_quality_on = false;
      d3.select('#vis_quality_on').classed('vis_quality_active', false);
      d3.select('#vis_quality_off').classed('vis_quality_active', true);
      updateVisualizationRHS(selected_id, 'sub', studies_count);
    }
  }

  function updateVisualizationRHS(_id, _direction, _count) {
    const id = _id;
    const direction = _direction;
    const category = id.split('_')[1];
    let _cat = category === 'quality' ? 5 : category;
    // Update vis_input_chain. If direction is add, try to add or replace the existing category. If direction is sub, remove the specific category.
    if (direction == 'add') {
      // Try to replace whatever's in the category
      vis_input_chain[_cat] = id;
    } else if (direction == 'sub') {
      // clear the specific category
      vis_input_chain[_cat] = `vis_${_cat}_-1`;
    }

    let chain = [];
    let categories = [];
    vis_input_chain.forEach(elt => {
      const i = elt.split('_');
      if (i[2] !== '-1' && i[2] !== 'off') {
        chain.push(elt);
        categories.push(i[1]);
      }
    });

    chain.sort();

    if (chain.length == 0) {
      // CASE: chain is empty, so hide legends + text and show intro
      d3.selectAll('.vis_intro_description').classed('hidden', false);
      d3.selectAll('.vis_text_content').classed('hidden', true);
      d3.selectAll('.legends').classed('hidden', true);
    } else {
      d3.selectAll('.vis_intro_description').classed('hidden', true);
      d3.selectAll('.vis_text_content').classed('hidden', false);
    }

    let show_outcomes = categories.includes('4');
    let show_quality = categories.includes('quality');

    if (show_outcomes || show_quality) {
      // We're seeing either outcomes or quality so let's figure out which case it is.
      let display_quality = 'none';
      let display_outcomes = 'none';
      let display_spacer = 'none';

      if (show_quality && show_outcomes) {
        // if it's both, show both things and the spacer in between
        display_quality = 'grid';
        display_outcomes = 'grid';
        display_spacer = 'block';
      } else {
        // it's not both, let's figure out which one:

        if (show_quality && !show_outcomes) {
          display_quality = 'grid';
        }

        if (show_outcomes && !show_quality) {
          display_outcomes = 'grid';
        }
      }

      d3.selectAll('.legends').classed('hidden', false);
      d3.select('#quality_legend').style('display', display_quality);
      d3.select('#outcomes_legend').style('display', display_outcomes);
      d3.selectAll('.legend_spacer').style('display', display_spacer);
    }

    // Calculate how many studies we have. start from all the study dots and then filter to make sure you count each Refid only once. Otherwise I would have used d3 to get all the study dots like I do in the initial loading.

    let text_variant = [0, 0, 0, 0, 0];
    categories.forEach((elt, i) => {
      if (elt !== 'quality') {
        text_variant[elt] = 1;
      }
    });
    let text_combo = text_variant.join('');

    // We'll use text_combo to pick the right text template for the piece. And use keywords to fill things out.

    // Keywords we need:
    // 1. number of studies: 0, 1, 200
    // 2. target_social_need value
    // 3. target_population value
    // 4. study_design value
    // 5. demographic value
    // 6. outcome type
    // 7. is quality on?

    // initialize things with some default values. They won't get changed if they're not being used
    let keywords = [_count, '', '', '', '', '', false];

    chain.forEach(elt => {
      const opt = elt.split('_');
      const cat = opt[1];
      const val = opt[2];
      if (cat != 'quality') {
        keywords[+cat + 1] = vis_menu_options[+cat][+val];
      } else if (cat == 'quality') {
        keywords[6] = val === 'on';
      }
    });

    const txt = getTextVariant(text_combo, keywords);
    d3.selectAll('.vis_info_text').html(txt);
  }
}
