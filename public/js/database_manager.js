let db_inputs = [];
async function databaseManager() {
  let dataset = await d3.csv('/public/data/pcori_1111.csv');
  d3.selectAll('.total_study_count').html(`${dataset.length}`);

  // ACCESSOR FUNCTIONS
  const target_social_need = d => d.target_social_need;
  const title = d => d.title;
  const author = d => d.author;
  const year = d => d.year;
  const target_population = d => d.target_population;
  const age_group = d => d.age_group;
  const race_ethnicity_majority = d => d.race_ethnicity_majority;
  const intervention_target = d => d.intervention_target;
  const intervention_setting = d => d.intervention_setting;
  const specific_intervention_components = d =>
    d.specific_intervention_components;
  const recruitment_setting = d => d.recruitment_setting;
  const study_type = d => d.study_type;
  const service_provider = d => d.service_provider;
  const comparator = d => d.comparator;
  const study_design = d => d.study_design;
  const risk_of_bias = d => d.risk_of_bias;
  const individual_systems_intervention = d =>
    d.individual_systems_intervention;
  const addresses_health_outcomes = d => d.addresses_health_outcomes;
  const health_outcomes = d => d.health_outcomes;
  const addresses_behavioral_outcomes = d => d.addresses_behavioral_outcomes;
  const behavioral_outcomes = d => d.behavioral_outcomes;
  const addresses_healthcareuse_outcomes = d =>
    d.addresses_healthcareuse_outcomes;
  const healthcareuse_outcomes = d => d.healthcareuse_outcomes;
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
  const direction_hospital_readmission = d => d.direction_hospital_readmission;
  const result_frequency_healthcare_use = d =>
    d.result_frequency_healthcare_use;
  const direction_frequency_healthcare_use = d =>
    direction_frequency_healthcare_use;
  const result_adherence = d => d.result_adherence;
  const direction_adherence = d => d.direction_adherence;
  const result_missed_appointments = d => d.result_missed_appointments;
  const direction_missed_appointments = d => d.direction_missed_appointments;
  const result_preventive = d => d.result_preventive;
  const direction_preventive = d => d.direction_preventive;
  const result_outpatient_visits = d => d.result_outpatient_visits;
  const direction_outpatient_visits = d => d.direction_outpatient_visits;
  const result_emergency_visits = d => d.result_emergency_visits;
  const direction_emergency_visits = d => d.direction_emergency_visits;
  const result_clinic_attendance = d => d.result_clinic_attendance;
  const direction_clinic_attendance = d => d.direction_clinic_attendance;
  const result_post_primarycare_visits = d => d.result_post_primarycare_visits;
  const direction_post_primarycare_visits = d =>
    d.direction_post_primarycare_visits;
  const result_prenatal = d => d.result_prenatal;
  const direction_prenatal = d => d.direction_prenatal;
  const result_inpatient_admission = d => d.result_inpatient_admission;
  const direction_inpatient_admission = d => d.direction_inpatient_admission;
  const result_hospital_days = d => d.result_hospital_days;
  const direction_hospital_days = d => d.direction_hospital_days;
  const result_sober_center = d => d.result_sober_center;
  const direction_sober_center = d => d.direction_sober_center;
  const result_medical_home = d => d.result_medical_home;
  const direction_medical_home = d => d.direction_medical_home;
  const result_immunications = d => d.result_immunications;
  const direction_immunizations = d => d.direction_immunizations;
  const result_other_healthcareuse = d => d.result_other_healthcareuse;
  const direction_other_healthcareuse = d => d.direction_other_healthcareuse;
  const result_emergency_transport = d => d.result_emergency_transport;
  const direction_emergency_transport = d => d.direction_emergency_transport;

  const reset_button = d3.selectAll('.reset_button');
  const input_checkboxes = d3.selectAll('.filter_option > input');
  const relevant_study_items = d3.selectAll('.relevant_study');
  // ACTIONS
  input_checkboxes.on('click', searchDatabase);
  reset_button.on('click', resetSearch);
  relevant_study_items.on('click', studyInfo);
  d3.select('#download_studies_button').on('click', disabledItem);
  d3.select('#disabled_search').on('click', disabledItem);
  // FUNCTIONS
  function searchDatabase() {
    // Check whether button was turned on or off.
    const input = d3.select(this);
    if (input.property('checked')) {
      // if on, add to input chain
      db_inputs.push(this.name);
    } else {
      // if off, remove from input chain
      db_inputs.splice(db_inputs.indexOf(this.name), 1);
    }
    if (db_inputs.length > 0) {
      // show reset button & results box
      d3.selectAll('.reset_button').classed('hidden', false);
      d3.select('#results_intro').classed('hidden', true);
      d3.select('#results_box').classed('hidden', false);

      // clean results_output to draw again
      d3.selectAll('#search_output').remove();
      const results_output = d3.select('#results_box');
      const output_region = results_output
        .append('div')
        .attr('id', 'search_output');

      // create all combinations
      const combo = allCombinations(db_inputs);
      // const combo = allCombinations(['a6', 'a7']);

      // run each combination
      let total_studies = [];
      combo.forEach(input_chain => {
        // filter data based on that combination
        let data = dataset;
        const filtered_data = processInputs(input_chain, data);
        // console.log(input_chain, filtered_data);

        // add filtered data to a list for later cleaning
        total_studies.push(...filtered_data);

        // add a div to #results_output
        const relevant_studies_box = output_region
          .append('section')
          .attr('class', 'relevant_studies');

        // inside div add a smaller title with studies count & criteria specifics
        // TODO get labels from input_chain for criteria text
        relevant_studies_box
          .append('h3')
          .attr('class', 'relevant_study_title')
          .html(
            `There are <span class="relevant_study_count">${filtered_data.length} studies</span> that <span class="relevant_criteria">@@${input_chain}@@</span>`
          );
        // add a list for the studies
        const study_list = relevant_studies_box
          .append('ul')
          .attr('class', 'relevant_study_list');

        // for each item in filtered data, add a list item reference.
        const relevant_study = study_list
          .selectAll('li.relevant_study')
          .data(filtered_data)
          .enter()
          .append('li')
          .attr('class', 'relevant_study');

        relevant_study
          .append('span')
          .attr('class', 'study_author')
          .text(d => `${author(d)} `);
        relevant_study
          .append('span')
          .attr('class', 'study_year')
          .text(d => `(${year(d)}), `);
        relevant_study
          .append('span')
          .attr('class', 'study_title')
          .text(d => `"${title(d)}"`);
        // TODO add other study info
      });

      // update total study count
      // if we turn our total list of studies into a set, we remove duplicate entries and end up with the unique number of studies which we can use to change N in the template.
      const unique_study_count = new Set(total_studies);
      d3.select('#select_study_count').html(`${unique_study_count.size}`);
    } else {
      // hide results box and show results_intro
      d3.selectAll('.reset_button').classed('hidden', true);
      d3.select('#results_intro').classed('hidden', false);
      d3.select('#results_box').classed('hidden', true);
      d3.selectAll('.subfilter_panel').classed('hidden', true);
    }
  }

  function resetSearch() {
    d3.selectAll('.reset_button').classed('hidden', true);
    d3.select('#results_intro').classed('hidden', false);
    d3.select('#results_box').classed('hidden', true);
    d3.selectAll('.filter_panel').classed('hidden', true);
    d3.selectAll('.subfilter_panel').classed('hidden', true);
    input_checkboxes.property('checked', false);
    db_inputs = [];
  }

  function processInputs(_inputs, _dataset) {
    let temp_data = _dataset;
    _inputs.forEach(element => {
      if (temp_data.length > 0) {
        // process this input
        const cat = element[0];
        const label_text = d3.select(`[for=${element}]`).text().toString();
        // console.log(element, label_text);
        if (['l', 'm', 'n'].indexOf(cat) < 0) {
          // deal with the simple checkboxes
          const val = Number(element.slice(1, element.length));
          if (cat == 'a') {
            // target_social_need
            temp_data = temp_data.filter(d =>
              target_social_need(d).includes(label_text)
            );
          } else if (cat == 'b') {
            // target_population
            temp_data = temp_data.filter(d =>
              target_population(d).includes(label_text)
            );
          } else if (cat == 'c') {
            if (val < 4) {
              // deal with age_group
              // correct for difference between Adults and Adults
              if (label_text == 'Adults') {
                temp_data = temp_data.filter(d =>
                  age_group(d).split(',').includes('Adult')
                );
              } else {
                temp_data = temp_data.filter(d =>
                  age_group(d).includes(label_text)
                );
              }
            } else if (val > 4 && val < 10) {
              // deal with race_ethnicity_majority
              temp_data = temp_data.filter(d =>
                race_ethnicity_majority(d).includes(label_text)
              );
            } else {
              // TODO process sliders
            }
          } else if (cat == 'd') {
            temp_data = temp_data.filter(d =>
              intervention_target(d).includes(label_text)
            );
          } else if (cat == 'e') {
            temp_data = temp_data.filter(d =>
              intervention_setting(d).includes(label_text)
            );
          } else if (cat == 'f') {
            temp_data = temp_data.filter(d =>
              specific_intervention_components(d).includes(label_text)
            );
          } else if (cat == 'g') {
            temp_data = temp_data.filter(d =>
              recruitment_setting(d).includes(label_text)
            );
          } else if (cat == 'h') {
            if (val < 5) {
              // study design
              temp_data = temp_data.filter(d => study_design(d) == label_text);
            } else if (val > 4 && val < 9) {
              // risk of bias
              temp_data = temp_data
                .filter(d => risk_of_bias(d) != 'NR')
                .filter(d => risk_of_bias(d) == label_text);
            } else if (val > 8) {
              // individual vs systems
              temp_data = temp_data.filter(
                d =>
                  individual_systems_intervention(d) ==
                  `${label_text} Intervention`
              );
            }
          } else if (cat == 'i') {
            temp_data = temp_data.filter(d =>
              study_type(d).includes(label_text)
            );
          } else if (cat == 'j') {
            temp_data = temp_data.filter(d =>
              service_provider(d).includes(label_text)
            );
          } else if (cat == 'k') {
            temp_data = temp_data.filter(d =>
              comparator(d).includes(label_text)
            );
          }
        } else {
          // deal with outcomes which are funky as hell
          const type = element[1];
          const val = Number(element.slice(2, element.length));
          const outcome_text = d3.select(`[name=${element}]`)._groups[0][0]
            .parentElement.parentElement.parentElement.parentElement
            .parentElement.children[0].children[0].textContent;

          if (cat == 'l') {
            temp_data = temp_data.filter(
              d => addresses_health_outcomes(d) == 'Yes'
            );

            if (temp_data.length > 0) {
              // there are lines with this outcome, so let's figure out the type so we can count
              if (type == 'a') {
                // changes in self-reported health
                temp_data = temp_data.filter(
                  d => result_self_health(d) == label_text
                );
              } else if (type == 'b') {
                // child development outcomes
                temp_data = temp_data.filter(
                  d => result_child_development(d) == label_text
                );
              } else if (type == 'c') {
                // low birth weight
                temp_data = temp_data.filter(
                  d => result_low_birth_weight(d) == label_text
                );
              } else if (type == 'd') {
                // mental health status
                temp_data = temp_data.filter(
                  d => result_mental_health_status(d) == label_text
                );
              } else if (type == 'e') {
                // morbidity
                temp_data = temp_data.filter(
                  d => result_morbidity(d) == label_text
                );
              } else if (type == 'f') {
                // mortality
                temp_data = temp_data.filter(
                  d => result_mortality(d) == label_text
                );
              } else if (type == 'g') {
                // quality-adjusted life years
                temp_data = temp_data.filter(d => result_QALY(d) == label_text);
              } else if (type == 'h') {
                // quality of life
                temp_data = temp_data.filter(
                  d => result_quality_of_life(d) == label_text
                );
              } else if (type == 'i') {
                // changes in functional outcomes
                temp_data = temp_data.filter(
                  d => result_functional(d) == label_text
                );
              } else if (type == 'j') {
                // changes in functional outcomes
                temp_data = temp_data.filter(
                  d => result_other_health(d) == label_text
                );
              }
            } else {
              // there are no lines with this outcome, so return blank array
              temp_data = [];
            }
          } else if (cat == 'm') {
            temp_data = temp_data.filter(
              d => addresses_behavioral_outcomes(d) == 'Yes'
            );
            if (temp_data.length > 0) {
              // there are lines with this outcome, so let's figure out the type so we can count
              if (type == 'a') {
                // changes in dietary intake
                temp_data = temp_data.filter(d => result_diet(d) == label_text);
              } else if (type == 'b') {
                // changes in substance use
                temp_data = temp_data.filter(
                  d => result_substance_use(d) == label_text
                );
              } else if (type == 'c') {
                // other
                temp_data = temp_data.filter(
                  d => result_other_behavior(d) == label_text
                );
              }
            } else {
              // there are no lines with this outcome, so return blank array
              temp_data = [];
            }
          } else if (cat == 'n') {
            temp_data = temp_data.filter(
              d => addresses_healthcareuse_outcomes(d) == 'Yes'
            );
            console.log(cat, val, label_text);
            if (temp_data.length > 0) {
              // there are lines with this outcome, so let's figure out the type so we can count
              if (type == 'a') {
                // adherence to treatment
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_adherence(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_adherence(d) == label_text
                  );
                }
              } else if (type == 'b') {
                // clinic attendance rate
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_clinic_attendance(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_clinic_attendance(d) == label_text
                  );
                }
              } else if (type == 'c') {
                // emergency department visits
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_emergency_visits(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_emergency_visits(d) == label_text
                  );
                }
              } else if (type == 'd') {
                // frequency of healthcare use
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_frequency_healthcare_use(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_frequency_healthcare_use(d) == label_text
                  );
                }
              } else if (type == 'e') {
                // hospital readmissions
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_hospital_readmission(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_hospital_readmission(d) == label_text
                  );
                }
              } else if (type == 'f') {
                // hospital days
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_hospital_days(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_hospital_days(d) == label_text
                  );
                }
              } else if (type == 'g') {
                // immunizations
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_immunications(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_immunizations(d) == label_text
                  );
                }
              } else if (type == 'h') {
                // inpatient admissions
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_inpatient_admission(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_inpatient_admission(d) == label_text
                  );
                }
              } else if (type == 'i') {
                // medical home
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_medical_home(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_medical_home(d) == label_text
                  );
                }
              } else if (type == 'j') {
                // missed appointments
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_missed_appointments(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_missed_appointments(d) == label_text
                  );
                }
              } else if (type == 'k') {
                // outpatient visits
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_outpatient_visits(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_outpatient_visits(d) == label_text
                  );
                }
              } else if (type == 'l') {
                // post hospital primary care visit
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_post_primarycare_visits(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_post_primarycare_visits(d) == label_text
                  );
                }
              } else if (type == 'm') {
                // prenatal care
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_prenatal(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_prenatal(d) == label_text
                  );
                }
              } else if (type == 'n') {
                // preventive care utilization
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_preventive(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_preventive(d) == label_text
                  );
                }
              } else if (type == 'o') {
                // sobering center
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_sober_center(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_sober_center(d) == label_text
                  );
                }
              } else if (type == 'p') {
                // Use of emergency transportation
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_emergency_transport(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_emergency_transport(d) == label_text
                  );
                }
              } else if (type == 'q') {
                // other
                if (val < 4) {
                  // deal with results
                  temp_data = temp_data.filter(
                    d => result_other_healthcareuse(d) == label_text
                  );
                } else {
                  // deal with direction
                  temp_data = temp_data.filter(
                    d => direction_other_healthcareuse(d) == label_text
                  );
                }
              }
            } else {
              // there are no lines with this outcome, so return blank array
              temp_data = [];
            }
          }
        }
      } else {
        // break because there is nothing to filter
        temp_data = [];
      }
    });
    return temp_data;
  }
  function allCombinations(items) {
    // allCombinations () : return a list of all possible combinations
    // PARAM items : array of items

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
  function disabledItem() {
    alert('This is not available right now');
  }
  function studyInfo() {
    alert('you have clicked on a study');
  }
}
databaseManager();
