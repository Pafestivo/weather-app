import getData from "./scripts/API";

getData('ukraine');

const givenLocation = document.getElementById('location')
const searchLocation = document.getElementById('search')

searchLocation.addEventListener('click', () => {
  getData(givenLocation.value)
})