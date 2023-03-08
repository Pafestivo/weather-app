export default async function getData(location, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=80b5e34940d5d647c671753b685314a7`;
  const response = await fetch(url, {
    mode: 'cors'
  })
  const searchError = document.getElementById('search-error')
  const data = await response.json();
  try {
    searchError.classList.add('hidden')
    return processData(data, units)
  } catch {
    searchError.textContent = `Error: ${data.message}`
    searchError.classList.remove('hidden')
  }
}

function processData(data, units) {
  let degree
  let speed
  if(units === 'metric') {
    degree = ' °C'
    speed = '(M/S)'
  } else {
    degree = ' °F'
    speed = '(Mile/H)'
  }

  const name = data.name
  const weather = data.weather[0].description
  const temp = `${data.main.temp.toFixed(1)}${degree}`
  const humidity = `${data.main.humidity}%`
  const minTemp = `${data.main.temp_min.toFixed(1)}${degree}`
  const maxTemp = `${data.main.temp_max.toFixed(1)}${degree}`
  const windSpeed = `${data.wind.speed}${speed}`
  const clouds = `${data.clouds.all}%`
  const localTime = convertToLocalTime(data.timezone)
  const sunrise = convertToLocalTime(data.timezone, data.sys.sunrise)
  const sunset = convertToLocalTime(data.timezone, data.sys.sunset)
  const weatherIconLink = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  
  let visibility = `${data.visibility}(KM)`
  if(data.visibility === 10000) visibility = 'excellent'

  let country = '-'
  if(data.sys.country) country = data.sys.country

  let rain = '-'
  if(data.rain) rain = data.rain['1h'];

  let snow = '-'
  if(data.snow) snow = data.snow['1h'];


  let theme = 'dark'
  if(data.sys.sunrise < data.dt && data.dt < data.sys.sunset) theme = 'light'


  return {theme, name, country, localTime, sunrise, sunset, weather, temp, humidity, minTemp, maxTemp, visibility, windSpeed, clouds, rain, snow, weatherIconLink}
}

function convertToLocalTime(timezone, time) {
  let localTime
  if(time) localTime = new Date(time * 1000).getTime() // if given time convert it to local time
  else localTime = new Date().getTime() // if no time given, get the current local time

  const localOffset = new Date().getTimezoneOffset() * 60000
  const currentUtcTime = localOffset + localTime
  const cityOffset = currentUtcTime + 1000 * timezone

  const cityTime = new Date(cityOffset)
  const hours = `0${cityTime.getHours()}`
  const minutes = `0${cityTime.getMinutes()}`
  return `${hours.slice(-2)}:${minutes.slice(-2)}`
}