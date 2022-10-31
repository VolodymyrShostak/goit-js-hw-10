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

  fetchCountries(e.target.value).then(setCounries => {
    return setCounries;
  });
}
function addCountryOnList(setCounries) {
  return setCounries
    .map(({ name, flags: { svg } }) => {
      `<li class='country'>
      <img src="${svg}" alt="" width="100">
      <p class="name-countries">${name}</p>
    </li>
    `;
    })
    .join('');
}
