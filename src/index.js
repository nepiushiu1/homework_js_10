import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  info: document.querySelector('.country-info'),
  list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(newEnteredValue, DEBOUNCE_DELAY));

function newEnteredValue() {
  const enteredValue = refs.input.value;
  if (enteredValue.trim()) {
    fetchCountries(enteredValue)
      .then(countries => {
        if (countries.length > 10) {
          clearCountryContainer();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          multipleCountryMarkup(countries);
        } else countryMarkup(countries);
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearCountryContainer();
        console.log(error);
      });
  } else clearCountryContainer();
}
function clearCountryContainer() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
function multipleCountryMarkup(countries = []) {
  clearCountryContainer();
  const markupCounries = countries
    .map(country => {
      return `
        <li class="countrie">
  <div class="countrie-flag"><img width=50px height=50px
  src='${country.flags.svg}' alt='${country.name.official}' /></div>
  <h1 class="countrie-name">${country.name.official}</h1>
  </li>
       `;
    })
    .join('');
  refs.list.innerHTML = markupCounries;
}
function countryMarkup(countries = []) {
  clearCountryContainer();
  const markupCounries = countries
    .map(country => {
      return `
       
      <div class="country">
       <img class="country-flag" width=50px height=50px src='${
         country.flags.svg
       }' alt='${country.name.official}' />
      <h1 class="country-name">${country.name.official}</h1></div>
      <div class="country-description
      ">
        <p class="country-description_name
        ">Capital:<span class="country-description_result
        ">${country.capital}</span></p>
        <p class="country-description_name
        ">Population:<span class="country-description_result
        ">${country.population}</span></p>
        <p class="country-description_name
        ">Languages:<span class="country-description_result
        ">${Object.values(country.languages)}</span></p>
      </div>
    
      </div>
    </div>
       `;
    })
    .join('');
  refs.list.innerHTML = markupCounries;
}
// ======================================================================

// function makeMarkupCountires(countries = []) {
//   clearCountryContainer();
//   const markupCounries = countries
//     .map(country => {
//       return `
//         <li class="country-list__item">
//           <img class="country-list__icon" width="40px" height="30px"
//            src="${country.flags.svg}" alt="${country.name.official}">
//           <span class="country-list__countryName">
//             ${country.name.official}
//           </span>
//         </li>
//       `;
//     })
//     .join('');
//   refs.countryListUl.innerHTML = markupCounries;
// }

// function makeMarkupCountry(countries = []) {
//   clearCountryContainer();
//   const markupCounries = countries
//     .map(country => {
//       return `
//         <div class="country-info__item">
//           <img class="country-list__icon" src="${country.flags.svg}" alt="${
//         country.name.official
//       }" width="40px" height="30px" />
//           <h2 class="country-info__title">${country.name.official}</h2>
//         </div>
//         <div class="article-wrapper">
//           <p class="country-info__article">
//             Capital:
//           </p><span class="country-info__span">${country.capital}</span>
//         </div>
//         <div class="article-wrapper">
//           <p class="country-info__article">
//             Population:
//           </p><span class="country-info__span">${country.population}</span>
//         </div>
//         <div class="article-wrapper">
//           <p class="country-info__article">
//             Languahes:
//           </p><span class="country-info__span">${Object.values(
//             country.languages
//           ).join(',')}</span>
//         </div>
//       `;
//     })
//     .join('');
//   refs.countryInfoDiv.innerHTML = markupCounries;
// }
