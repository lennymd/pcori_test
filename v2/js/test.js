     // big5 quicksheet
      
      let modal_titles = 
      

      modal_titles.forEach((category, i) => {
        if (i == 5 || i == 6 ) {
          
        }
        let accessor = modal_accessors[i];
        let value = accessor(intervention);
        let value_split = value
          .replace(/ *\([^)]*\) */g, ' ')
          .trim()
          .split(',');
        let trimmed_values = [];
        value_split.forEach(item => trimmed_values.push(item.trim()));
        const value_clean = trimmed_values.join(', ');
        
        let template;
          // CASE lay things out if value is not empty
          if (value.length > 0) {
            if (i == 5 || i == 6) {
              // CASE dealing with proportion immigrant or proportion male

              
            } else if (i > 6) {
              // CASE dealing with outcomes
              const outcome_values = [
                display_dictionary
                  .filter(behavioral_outcomes)
                  .map(behavioral_outcomes),
                display_dictionary.filter(health_outcomes).map(health_outcomes),
                display_dictionary
                  .filter(healthcareuse_outcomes)
                  .map(healthcareuse_outcomes),
              ];
              const outcomes = value_clean.split(',');
              let outcome_text = [];
              outcomes.forEach(outcome => {
                const category = outcome_values[i - 7];
                const result_accessor_list = result_accessors[i - 7];
                let o = outcome.trim();
                let index1 = category.indexOf(o);
                if (o == 'Preventive care utilization') {
                  o = 'Preventive care utilization (well child visits)';
                  index1 = 13;
                } else if (o == 'Child development outcomes') {
                  o = 'Child emotional, cognitive, or physical growth outcomes';
                  index1 = 2;
                } else if (o == 'Changes in functional outcomes') {
                  index1 = 0;
                } else if (o == 'Adherence to treatment') {
                  o = 'Adherence to treatment (medications/follow-up visit)';
                  index1 = 0;
                }
                const accessor = result_accessor_list[index1];
                outcome_text.push(`${o} (<em>${accessor(intervention)}</em>)`);
              });

              let template = `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${outcome_text.join(
                '<br/>'
              )}</p>`;
              intervention_box
                .append('div')
                .attr('class', 'modal_intervention_category')
                .html(template);
            } else {
              let template = `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${value_clean}</p>`;
              if (i == 6) {
                template = `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${value_clean}%</p>`;
              }
              intervention_box
                .append('div')
                .attr('class', 'modal_intervention_category')
                .html(template);
            }
          }});

  });