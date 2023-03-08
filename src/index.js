import getData from "./scripts/API";
import display from "./scripts/domFunctions";
import './styles/style.css';
import './styles/main.css';
import './styles/light-theme.css';
import './styles/dark-theme.css';

const form = document.querySelector('form')
const givenLocation = document.getElementById('location')
const searchLocation = document.getElementById('search')
const changeUnits = document.getElementById('changeUnits')
const cityName = document.getElementById('name')
let units = 'metric'

async function getAdnDisplayData(location, units) {
  try {
    const data = await getData(location,units)
    display(data)
  } catch(error) {
    console.error(error)
  }
}

getAdnDisplayData('ukraine', units)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  getAdnDisplayData(givenLocation.value, units)
})

searchLocation.addEventListener('click', () => {
  getAdnDisplayData(givenLocation.value, units)
})

changeUnits.addEventListener('click', () => {
  units = units === 'metric' ? 'imperial' : 'metric'
  const lastSearch = cityName.textContent.split(' (')[0].replace('City Name: ', '')
  getAdnDisplayData(lastSearch, units)
  
})
