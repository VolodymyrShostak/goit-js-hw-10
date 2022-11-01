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
        console.log(setCounries);
        return markupCountryInfo(setCounries);
      } else {
        createMarkupList(setCounries);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log('its errrrrror ' - err);
    });
}
function markupCountryInfo(countries) {
  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<ul>
                <li>
                <img src="${flags.svg}” width=“30" height=“20” alt=“Flag of ${
        name.official
      }">
                <h1>${name.official}</h1>
                </li>
                <li><p><span>Capital: </span>${capital[0]}</p></li>
                <li><p><span>Population: </span>${population}</p></li>
                <li><p><span>Languages: </span>${Object.values(
                  languages
                )}</p></li>
            </ul>`;
    })
    .join('');
  infoCountry.innerHTML = markup;
}
// відображення списку країн
function createMarkupList(setCounries) {
  const info = setCounries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `
        <li class='countries-item'>
        <img src = “${svg}” alt = “flag” width = 40>
        <p class=‘countries-title’>${official}</p>
        </li>
        `
    )
    .join('');
  listCountry.insertAdjacentHTML('beforeend', info);
}
