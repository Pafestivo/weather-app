import getData from "./scripts/API";



let units = 'metric'
getData('ukraine', units);

const givenLocation = document.getElementById('location')
const searchLocation = document.getElementById('search')
const changeUnits = document.getElementById('changeUnits')
const cityName = document.getElementById('name')

searchLocation.addEventListener('click', () => {
  getData(givenLocation.value, units)
})

changeUnits.addEventListener('click', () => {
  if(units === 'metric') units = 'imperial' 
  else units = 'metric'
  const lastSearch = cityName.textContent.split(' (')[0].replace('City Name: ', '')
  getData(lastSearch, units)
})
