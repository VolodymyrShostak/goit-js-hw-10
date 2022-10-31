import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './news-service/countries';

const DEBOUNCE_DELAY = 300;
