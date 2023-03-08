import getData from "./scripts/API";
import './styles/style.css';
import './styles/main.css';
import './styles/light-theme.css';


let units = 'metric'
getData('ukraine', units);

const form = document.querySelector('form')
const givenLocation = document.getElementById('location')
const searchLocation = document.getElementById('search')
const changeUnits = document.getElementById('changeUnits')
const cityName = document.getElementById('name')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  getData(givenLocation.value, units)
})

searchLocation.addEventListener('click', () => {
  getData(givenLocation.value, units)
})

changeUnits.addEventListener('click', () => {
  if(units === 'metric') units = 'imperial' 
  else units = 'metric'
  const lastSearch = cityName.textContent.split(' (')[0].replace('City Name: ', '')
  getData(lastSearch, units)
})
