function getTextVariant(_combo, _keywords) {
  let [
    relevant_studies,
    social_need,
    target_pop,
    study_design,
    demographic,
    outcome_type,
    isShowingQuality,
  ] = _keywords;

  let _study =
    relevant_studies == 1 ? '1 study' : `${relevant_studies} studies`;

  let count_phrase = `You are seeing <strong class="vis_text_emphasis">${_study}</strong>`;
  let vis_0_phrase = `<strong class="vis_text_emphasis">${social_need}</strong> as one of the social needs they address`;
  let vis_1_phrase = `<strong class="vis_text_emphasis">${target_pop}</strong> as a population they tried to recruit`;
  let vis_2_phrase = `<strong class="vis_text_emphasis">${study_design}</strong> studies`;
  let vis_3_phrase = `sorted by <strong class="vis_text_emphasis">${demographic}</strong>`;
  let vis_4_phrase = `sorted by their <strong class="vis_text_emphasis">${outcome_type}</strong> outcomes. They are color coded based on <strong vis_text_emphasis>the result for that particular outcome</strong>.`;

  let duplicate_phrase = `<br/>(Some studies have multiple outcomes and multiple interventions, so it's possible for them to be in more than one category.)`;

  let _text;
  switch (_combo) {
    case '00001':
      _text = count_phrase + ' that are ' + vis_4_phrase;
      break;
    case '00010':
      _text = count_phrase + ' that are ' + vis_3_phrase + '.';
      break;
    case '00011':
      _text =
        count_phrase +
        ' are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '00100':
      _text = count_phrase + ' that are ' + vis_2_phrase + '.';
      break;
    case '00101':
      _text =
        count_phrase +
        ' are ' +
        vis_2_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '00110':
      _text =
        count_phrase +
        ' are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '00111':
      _text =
        count_phrase +
        ' are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '01000':
      _text = count_phrase + ' that have ' + vis_1_phrase + '.';
      break;
    case '01001':
      _text =
        count_phrase +
        ' that have ' +
        vis_1_phrase +
        '. They are ' +
        vis_4_phrase;
      break;
    case '01010':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '01011':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also' +
        vis_4_phrase;
      break;
    case '01100':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        ', and are ' +
        vis_2_phrase +
        '.';
      break;
    case '01101':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        ', and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_4_phrase;
      break;
    case '01110':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        ', and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '01111':
      _text =
        count_phrase +
        ' have ' +
        vis_1_phrase +
        ', and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also' +
        vis_4_phrase;
      break;
    case '10000':
      _text = count_phrase + ' that have ' + vis_0_phrase + '.';
      break;
    case '10001':
      _text =
        count_phrase +
        ' that have ' +
        vis_0_phrase +
        '. They are' +
        vis_4_phrase;
      break;
    case '10010':
      _text =
        count_phrase +
        ' that have ' +
        vis_0_phrase +
        '. They are ' +
        vis_3_phrase;
      break;
    case '10011':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '10100':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and are ' +
        vis_2_phrase +
        '.';
      break;
    case '10101':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_4_phrase;
      break;
    case '10110':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '10111':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '11000':
      _text =
        count_phrase +
        ' that have ' +
        vis_0_phrase +
        ' and ' +
        vis_1_phrase +
        '.';
      break;
    case '11001':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and ' +
        vis_1_phrase +
        '. They are ' +
        vis_4_phrase;
      break;
    case '11010':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and ' +
        vis_1_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '11011':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' and ' +
        vis_1_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    case '11100':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' , and ' +
        vis_1_phrase +
        '. They are ' +
        vis_2_phrase +
        '.';
      break;
    case '11101':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' , and ' +
        vis_1_phrase +
        '. They are ' +
        vis_2_phrase +
        '. They are ' +
        vis_4_phrase;
      break;
    case '11110':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' , and ' +
        vis_1_phrase +
        '. They are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '.';
      break;
    case '11111':
      _text =
        count_phrase +
        ' have ' +
        vis_0_phrase +
        ' , and ' +
        vis_1_phrase +
        '. They are ' +
        vis_2_phrase +
        '. They are ' +
        vis_3_phrase +
        '. They are also ' +
        vis_4_phrase;
      break;
    default:
      _text = count_phrase + '.';
  }

  return _text.trim();
}
