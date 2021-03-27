// // TODO filter accordions
// // Handle accordions on page
// let filter_category = document.getElementsByClassName('filter_category');
// let subfilter_category = document.getElementsByClassName('subfilter_category');
// let i, j;

// for (i = 0; i < filter_category.length; i++) {
//   filter_category[i].addEventListener('click', toggleAccordion);
// }
// for (j = 0; j < subfilter_category.length; j++) {
//   subfilter_category[j].addEventListener('click', toggleAccordion);
// }
// function toggleAccordion() {
//   const parent = this.parentElement;
//   parent.children[1].classList.toggle('hidden');
//   const arrowBox = parent.children[0].children[1];
//   const arrow = arrowBox.textContent;
//   if (arrow == '▼') {
//     arrowBox.textContent = '▲';
//   }
//   if (arrow == '▲') {
//     arrowBox.textContent = '▼';
//   }
// }
