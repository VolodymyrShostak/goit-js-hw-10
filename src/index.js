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
  // запити на сервер по введених літерах
  fetchCountries(e.target.value.trim()).then(setCounries => {
    if (setCounries.length > 10) {
      Notiflix.Notify.warning(
        `Too many matches found. Please enter a more specific name.`
      );
      return setCounries;
    }
    createMarkupList(setCounries);
  });
}
// відображення списку країн
function createMarkupList(setCounries) {
  const info = setCounries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `
        <li class='countries-item'>
        <img src = "${svg}" alt = "flag" width = 40>
        <p class='countries-title'>${official}</p>
        </li>
        `
    )
    .join('');
  listCountry.insertAdjacentHTML('beforeend', info);
}
