import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './countries.js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  infoCountry.innerHTML = '';
  listCountry.innerHTML = '';
  const query = e.target.value.trim();
  if (!query.length) return;
  // запити на сервер по введених літерах
  fetchCountries(query)
    .then(setCounries => {
      if (setCounries.length > 10) {
        return Notiflix.Notify.warning(
          `Too many matches found. Please enter a more specific name.`
        );
      } else if (setCounries.length === 1) {
        return markupCountryInfo(...setCounries);
      } else {
        createMarkupList(setCounries);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log('its errrrrror ' - err);
    });
}
// відображення вибраної країни
function markupCountryInfo(countries) {
  const { name, capital, population, flags, languages } = countries;
  const markup = `<ul>
                <li>
                <img src=${flags.svg} width=50 height=35 alt="Flag of ${
    name.official
  }">
                <h2>${name.official}</h2>
                </li>
                <li><p><span>Capital: </span>${capital[0]}</p></li>
                <li><p><span>Population: </span>${population}</p></li>
                <li><p><span>Languages: </span>${Object.values(
                  languages
                )}</p></li>
            </ul>`;
  infoCountry.innerHTML = markup;
}

// відображення списку країн
function createMarkupList(setCounries) {
  const info = setCounries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class='countries-item'>
        <img src = "${svg}" alt = "flag" width = 40>
        <p class="countries-title">${official}</p>
        </li>
        `
    )
    .join('');
  listCountry.insertAdjacentHTML('beforeend', info);
}
Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '110px',
  timeout: 2000,
});
