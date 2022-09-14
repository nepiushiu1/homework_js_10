import './css/styles.css';

const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
const refs = {
  // введеное значение
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(enteredValue, DEBOUNCE_DELAY));

function enteredValue(event) {
  entered = event.target.value;
  console.log(entered);
}

const request = fetch(`https://restcountries.com/v2/name/usa`)
  .then(respons => {
    return respons.json();
  })
  .then(information => {
    console.log(information);
  })
  .catch(error => {
    console.log(error);
  });
