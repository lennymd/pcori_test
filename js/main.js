async function project_main() {
  // TODO remove this when we finish
  console.log('WIP');

  // load data
  const dataset = await d3.csv('./csv/pcori_20210316.csv');
  // load data dictionary
  const data_dictionary = await d3.csv('./csv/data_dictionary_20210316.csv');

  // load display dictionary -- use to create the labels people see
  const display_dictionary = await d3.csv(
    './csv/display_dictionary_20210316.csv'
  );
  // calculate study count
  d3.select('#total_study_number').text(
    d3.nest().key(ref_id).entries(dataset).length
  );

  // Switch between one tab or the other.
  d3.selectAll('.tab_item').on('click', switchTabs);
  function switchTabs() {
    const active_now = document.getElementsByClassName('tab_active')[0];
    if (this.id != active_now.id) {
      // switch the active class to this.id
      d3.select(active_now).classed('tab_active', false);
      d3.select(this).classed('tab_active', true);

      // switch the viewed content
      switch (this.id) {
        case 'tab_sdb':
          d3.select('#sdb').classed('hidden', false);
          d3.select('#vis').classed('hidden', true);
          break;
        case 'tab_vis':
          d3.select('#sdb').classed('hidden', true);
          d3.select('#vis').classed('hidden', false);
          break;
      }
    }
  }

  // Handle tooltips for both vis and sdb
  const tooltip_content = await d3.json('./csv/tooltip_content.json');
  for (x in tooltip_content) {
    const elt = document.getElementById(x);
    elt.title = tooltip_content[x];
  }
  $(document).ready(function () {
    $('.tooltip_icon_container').tooltipster();
  });

  // console.log(document.getElementsByClassName('study_dots'));

  // visualization manager
  vis_manager(dataset, data_dictionary, display_dictionary);

  // database manager
  sdb_manager(dataset, data_dictionary, display_dictionary);
  d3.selectAll('.study_row').on('click', showStudyInfo);
  function showStudyInfo() {
    const container = d3.select('#modal_content');
    container.html('');
    buildStudyCard(this.id.split('_')[1]);
  }
  function buildStudyCard(_id) {
    const modal = document.getElementById('modal_section');
    modal.style.display = 'block';
    d3.select('.modal_header_text').text("STUDY YOU'VE SELECTED");

    const container = d3.select('#modal_content');
    container.html('');

    const study_id = _id;
    const _data = dataset.filter(d => ref_id(d) == study_id);
    const first_instance = _data[0];

    // Part 1 - grid table with authors, year, title, publication
    const info_accessors = [authors, year, title, journal];
    const general_info_grid = container
      .append('div')
      .attr('class', 'modal_info_grid');
    ['Authors', 'Year', 'Title', 'Publication'].forEach((title, i) => {
      const box = general_info_grid
        .append('div')
        .attr('class', 'modal_info_section');

      const hed = box.append('h3').attr('class', 'study_info_hed').text(title);
      const txt = box
        .append('p')
        .attr('class', 'study_info_txt')
        .text(info_accessors[i](first_instance));

      if (title == 'Title') {
        txt.classed('modal_study_title', true);
      }
    });

    const modal_grid = container.append('div').attr('class', 'modal_grid');
    const abstract_side = modal_grid
      .append('div')
      .attr('class', 'modal_abstract');

    const intervention_side = modal_grid
      .append('div')
      .attr('class', 'modal_interventions');

    // Part 2 -- study abstract

    abstract_side
      .append('h2')
      .attr('class', 'modal_section_hed')
      .text('Abstract');
    abstract_side
      .append('p')
      .attr('class', 'modal_abstract_text')
      .text(abstract(first_instance));

    // Part 4 -- Link to Study
    const doi_list = [];
    const url_list = [];
    _data.forEach(observation => {
      doi_list.push(doi(observation));
      url_list.push(study_url(observation));
    });

    const study_link_box = abstract_side
      .append('div')
      .attr('class', 'study_link_box');

    study_link_box.append('span').attr('class', 'study_link_box_spacer');

    const study_link = study_link_box
      .append('a')
      .attr('class', 'sdb_reset sdb_reset_text sdb_link_text')
      .attr('target', '_blank')
      .text('Link to Study');
    if (doi_list.length > 0 || url_list.length >= 0) {
      // CASE: we have DOI or URL. Work with DOI
      const first_link = doi_list[0];

      if (first_link[0] == 'h') {
        // CASE: DOI is full link. use as is
        study_link.attr('href', first_link);
      } else {
        // CASE: we only have the doi name. We need to finish the url
        study_link.attr('href', `https://dx.doi.org/${first_link}`);
      }
    } else if (doi_list.length == 0 && url_list.length > 0) {
      // CASE: we only have URL. Work with URL
      study_link.attr('href', url_list[0]);
    } else if (doi_list.length == 0 && url_list.length > 0) {
      // CASE: we have 0 doi and 0 url. DO NOT SHOW A LINK
      link_to_study.remove();
      console.log(`there is no link for ${this.id}`);
    }

    // Part 3 -- study interventions

    intervention_side
      .append('h2')
      .attr('class', 'modal_section_hed')
      .text(() => {
        if (_data.length == 1) {
          return 'Intervention';
        } else {
          return 'Interventions';
        }
      });

    _data.forEach((intervention, ind) => {
      const intervention_box = intervention_side
        .append('div')
        .attr('class', 'modal_intervention');
      // opening arm and description
      intervention_box
        .append('p')
        .html(
          `<h4 class="modal_intervention_arm">${intervention_arm(
            intervention
          )}.</h4>&nbsp;${intervention_description(intervention)}`
        );

      // big5 quicksheet
      let modal_accessors = [
        target_social_need,
        target_population,
        study_design,
        age_group,
        race_ethnicity_majority,
        proportion_immigrant,
        proportion_male,
        behavioral_outcomes,
        health_outcomes,
        healthcareuse_outcomes,
      ];
      [
        'Social need addressed',
        'Study population recruited',
        'Study design',
        'Age group',
        'Majority ethnic/racial group',
        'Percentage of immigrants',
        'Sex (proportion male)',
        'Behavioral outcomes',
        'Health outcomes',
        'Use of healthcare services outcomes',
      ].forEach((category, i) => {
        const value = modal_accessors[i](intervention);
        let value_split = value.split(',');
        let trimmed_values = [];
        value_split.forEach(item => trimmed_values.push(item.trim()));
        const value_clean = trimmed_values.join(', ');
        if (i != 5) {
          // CASE lay things out if value is not empty
          if (value.length > 0) {
            let template = `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${value_clean}</p>`;
            if (i == 6) {
              template = `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${value_clean}%</p>`;
            }
            intervention_box
              .append('div')
              .attr('class', 'modal_intervention_category')
              .html(template);
          } else {
            // Dealing with proportion of immigrant. if
            if (+value > 0) {
              intervention_box
                .append('div')
                .attr('class', 'modal_intervention_category')
                .html(
                  `<h4 class="modal_intervention_arm modal_intervention_category_hed">${category}</h4><br/><p>${value_clean}%</p>`
                );
            }
          }
        }
      });
    });
  }

  d3.selectAll('.modal_close').on('click', hideModal);
  function hideModal() {
    const container = d3.select('#modal_content');
    container.html('');
    const modal = document.getElementById('modal_section');
    modal.style.display = 'none';
  }

  window.onclick = function (event) {
    const modal = document.getElementById('modal_section');
    if (event.target == modal) {
      const container = d3.select('#modal_content');
      container.html('');
      modal.style.display = 'none';
    }
  };

  function buildStudyList(_ids, _row, _col) {
    const modal = document.getElementById('modal_section');
    modal.style.display = 'block';

    d3.select('.modal_header_text').text(
      'STUDIES IN THE CATEGORY YOU SELECTED'
    );
    const container = d3.select('#modal_content');
    container.html('');

    // We'll put category info on the left. And download button on right.
    const modal_info_grid = container
      .append('div')
      .attr('class', 'modal_list_grid');

    const categories_list = modal_info_grid
      .append('div')
      .attr('class', 'modal_list_categories');
    const list_download = modal_info_grid
      .append('div')
      .attr('class', 'modal_list_download');

    const category_table = categories_list
      .append('table')
      .attr('class', 'modal_list_category_info');
    if (_col != null) {
      const column_category = d3.select('#vis_selected_3_text').text();
      const column_value = _col;
      const table_row = category_table.append('tr');

      table_row
        .append('th')
        .attr('class', 'modal_list_th')
        .text(column_category);

      table_row.append('td').attr('class', 'modal_list_td').text(column_value);
    }

    if (_row != null) {
      const row_category = d3.select('#vis_selected_4_text').text();
      const row_value = _row;
      const table_row = category_table.append('tr');

      table_row.append('th').attr('class', 'modal_list_th').text(row_category);

      table_row.append('td').attr('class', 'modal_list_td').text(row_value);
    }

    const study_table_container = container
      .append('div')
      .attr('class', 'modal_study_list_container');
    const study_table = study_table_container.append('table');
    const thead = study_table.append('thead');
    const header_row = thead.append('tr');
    let th_classes = [
      'study_author',
      'study_year',
      'study_title',
      'study_publication',
    ];
    ['Authors', 'Year', 'Title', 'Publication'].forEach((header, i) => {
      header_row
        .append('th')
        .attr('class', `sort_header ${th_classes[i]}`)
        .attr('id', `modal_sort_${i}`)
        .html(
          `${header}&nbsp;<span class="sdb_study_sort_icon">&#x2195;</span>`
        );
    });
    const tbody = study_table.append('tbody').attr('id', 'modal_list_rows');
    _ids.forEach(id => {
      const _data = dataset.filter(d => ref_id(d) == id)[0];

      const study_row = tbody
        .append('tr')
        .attr('class', 'study_row')
        .attr('id', `study_${id}`);

      study_row
        .append('td')
        .attr('class', 'study_author')
        .text(() => {
          const authors_str = authors(_data);
          const author_list = authors_str.split(',');
          let author_txt;
          if (author_list.length > 6) {
            const first_author = author_list[0];
            author_txt = `${first_author} et al.`;
          } else {
            author_txt = authors_str;
          }
          return author_txt;
        });

      study_row.append('td').attr('class', 'study_year').text(year(_data));

      study_row.append('td').attr('class', 'study_title').text(title(_data));

      study_row
        .append('td')
        .attr('class', 'study_publication')
        .text(journal(_data));
    });

    d3.selectAll('.modal_study_list_container .study_row').on(
      'click',
      showStudyInfo2
    );

    function showStudyInfo2() {
      const container = d3.select('#modal_content');
      container.html('');
      buildStudyCard(this.id.split('_')[1]);
    }

    d3.selectAll('.modal_study_list_container .sort_header').on(
      'click',
      sortTable
    );
    function sortTable() {
      const id = this.id;
      const arrow_icon = document.getElementById(id).children[0];
      const n = id.split('_')[2];
      let table = document.getElementsByClassName(
        'modal_study_list_container'
      )[0].children[0];
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
  }

  $('body').bind('lista:mostrar', function (ev, ids, fila, columna) {
    buildStudyList(ids, fila, columna);
  });

  $('body').bind('articulo:mostrar', function (ev, id) {
    buildStudyCard(id);
  });

  d3.selectAll('.sdb_download').on('click', disabledButton);
  function disabledButton() {
    alert('This feature is currently unavailable.');
  }

  // let current_study_dots = d3.selectAll('.study_dots')._groups[0];
  // current_study_dots.forEach(elt => {
  //   console.log(elt);
  //   const title = elt.children[0].innerText;
  //   const classList = elt.classList;
  //   if (!elt.classList.contains('tooltipstered')) {
  //     console.log('this runs');
  //     $(elt).tooltipster({}).tooltipster('content', title);
  //   }
  // });
}
project_main();
