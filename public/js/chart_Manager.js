
let input_chain = [];
async function chartManager() {
  let dataset = await d3.csv('./public/data/pcori_20200930c.csv');
  let data = dataset;

  // accessor functions -- help us access the columns we care about
  let tAccessor = d => d['Target_Domain'];
  let nAccessor = d => d['Target_Population'];
  // TODO figure out cAccessor and oAccessors
  let racialGroupAccessor = d=> d[];
  let qStudyDesignAccessor = d => d['Study_Design'];
  let qBiasAccessor = d => d[risk_of_bias];

  // color scale
  // TODO Get a fifth color to match the 5 study designs
  const colorStudyGroup = [
    '#001D0D',
    '#8BBE56',
    '#ed2224',
    '#FFCD03',
    '#B3B5B8',
  ];
  const colorBiasGroup = ['#001D0D', '#8BBE56', '#FFCD03', '#B3B5B8'];
  const colorScale = d3.scaleOrdinal();

  // create initial dots
  createDots();

  // Resetter
  d3.select('#reset').on('click', resetVisualization);

  // Input manager
  d3.selectAll('.a_menu_option').on('click', updateChart);

  function updateChart() {
    // process new input into input_chain
    updateInputChain(this.id);

    // LOGIC SECTION
    if (input_chain.length == 1) {
      dataset = data;
      const option = input_chain[0];
      if (option[0] == 't') {
        filterT(option, 'chart0');
      } else if (option[0] == 'n') {
        filterN(option, 'chart0');
      } else if (option[0] == 'c') {
        console.log('switch to column view of all data');
        sortColumns(option);
        // TODO create column view
      } else if (option[0] == 'o') {
        console.log('switch to row view of all data');
        // TODO create row view
      } else if (option[0] == 'q') {
        quality(option, 'chart0');
      } else {
        alert('you picked a bad option');
      }
    } else if (input_chain.length == 2) {
      // Handle logic in pairs -- pick right box, filter , change layout, add color.
      // if TN, NT => filter x2
      // if TQ, QT, NQ, QN => filter + color
      // if TC, CT, NC, CT => filter + column
      // if TO, OT, NO, ON => filter + row
      // if CO, OC => row + column
      // if CQ, QC => column + color
      // if OQ, QO => row + color
    } else {
      input_chain.length > 2;
    }
  }

  // Helper functions
  function createDots() {
    const wrapper = d3.select('#chart0');
    const dots = wrapper.selectAll('div.a_study').data(data);
    dots
      .enter()
      .append('div')
      .merge(dots)
      .attr('class', 'a_study')
      .text(d => d.Refid);
  }

  function resetVisualization() {
    // reset inputChain
    input_chain = [];

    // hide chart1,chart2,chart3
    d3.selectAll('.secondary_vis').attr('class', 'chart_hidden');
    // show chart0
    const chart0 = document.getElementById('chart0_container');
    chart0.classList.remove('chart_hidden');
    chart0.classList.add('chart_visible');
    const chart1 = document.getElementById('chart0_container');
    chart0.classList.remove('chart_hidden');
    chart0.classList.add('chart_visible');
    // reset chart0
    d3.select('#chart0').html('');
    createDots();
  }

  function updateInputChain(option) {
    if (input_chain.length == 0) {
      // fresh input, so we add it
      input_chain.push(option);
    } else {
      // there is a new input: check that categories aren't duplicated.
      const new_input = option;
      const category = new_input[0];
      const input_chain_string = input_chain.toString();
      start_index = input_chain_string.indexOf(category);
      if (start_index > -1) {
        // new input will replace an older input from the same category
        leaving_input = input_chain_string
          .substr(start_index, start_index + 4)
          .split(',')[0];
        leaving_index = input_chain.indexOf(leaving_input);
        input_chain.splice(leaving_index, 1);
      }
      // add new input to chain
      input_chain.push(new_input);
    }
  }
  // Helper Action Functions

  function filterT(_option, _chart) {
    // filter dataset by whatever type of social need the reader clicked on
    filter_text = document.getElementById(_option).textContent;
    filtered_data = dataset.filter(d => tAccessor(d).includes(filter_text));
    if (filtered_data.length > 0) {
      // update visualization
      d3.select(`#${_chart}`)
        .selectAll('div.a_study')
        .data(filtered_data)
        .join(
          enter => enter.append('div'),
          update => update,
          exit => exit.remove()
        )
        .attr('class', 'a_study')
        .text(d => d.Refid);
    } else {
      // dead end
      d3.select(`#${_chart}`)
        .html('')
        .append(p)
        .attr('class', 'dead_end')
        .text(`You've reached a dead end.`);
    }
  }
  function filterN(_option, _chart) {
    // filter dataset by whatever need of population the reader clicked on
    filter_text = document.getElementById(_option).textContent;
    filtered_data = dataset.filter(d => nAccessor(d).includes(filter_text));
    if (filtered_data.length > 0) {
      // update visualization
      d3.select(`#${_chart}`)
        .selectAll('div.a_study')
        .data(filtered_data)
        .join(
          enter => enter.append('div'),
          update => update,
          exit => exit.remove()
        )
        .attr('class', 'a_study')
        .text(d => d.Refid);
    } else {
      // dead end
      d3.select(`#${_chart}`)
        .html('')
        .append('p')
        .attr('class', 'dead_end')
        .text(
          `You've reached a dead end. Click the reset button to try a new combination`
        );
    }
  }

  function quality(_option, _chart) {
    let quality;
    if (_option == 'q0') {
      // study design
      colorScale
        .domain([
          'Case-control',
          'Cohort study',
          'Pre-post',
          'RCT',
          'Other observational',
        ])
        .range(colorStudyGroup);
      quality = qStudyDesignAccessor;
    } else {
      // risk of bias
      colorScale
        .domain(['High', 'Medium', 'Low', 'NA'])
        .range(colorBiasGroup);
      quality = qBiasAccessor;
    }
    d3.select(`#${_chart}`)
      .selectAll('div.a_study')
      .style('background-color', d => colorScale(quality(d)));
  }

  function sortColumns(_option) {
    // switch to chart1
    const chart0 = document.getElementById('chart0_container');
    chart0.classList.remove('chart_visible');
    chart0.classList.add('chart_hidden');
    const chart1 = document.getElementById('chart0_container');
    chart0.classList.remove('chart_visible');
    chart0.classList.add('chart_hidden');
    // create the sections we'll be adding to
    // add circles
  }
}
chartManager();

