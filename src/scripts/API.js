export default async function getData(location, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=80b5e34940d5d647c671753b685314a7`;
  const response = await fetch(url, {
    mode: 'cors'
  })
  const data = await response.json();
  try {
    console.log(data)
    if(response.url.includes('metric')) display(processData(data, 'metric'))
    else display(processData(data, 'imperial'))
  } catch {
    handleError(data)
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
  let visibility = `${data.visibility}(KM)`
  let country = '-'
  let rain = '-'
  let snow = '-'

  const localTime = convertToLocalTime(data.timezone)
  const sunrise = convertToLocalTime(data.timezone, data.sys.sunrise)
  const sunset = convertToLocalTime(data.timezone, data.sys.sunset)

  if(data.visibility === 10000) {
    visibility = 'excellent'
  }

  if(data.sys.country) country = data.sys.country

  if(data.snow) snow = data.snow['1h'];
  if(data.rain) rain = data.rain['1h'];
  return {name, country, localTime, sunrise, sunset, weather, temp, humidity, minTemp, maxTemp, visibility, windSpeed, clouds, rain, snow}
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

function display(dataObject) {
  const name = document.getElementById('name')
  const localTime = document.getElementById('localTime')
  const temp = document.getElementById('temp')
  const sunrise = document.getElementById('sunrise')
  const sunset = document.getElementById('sunset')
  const weather = document.getElementById('weather')
  const humidity = document.getElementById('humidity')
  const minMaxTemp = document.getElementById('minMaxTemp')
  const visibility = document.getElementById('visibility')
  const windSpeed = document.getElementById('windSpeed')
  const clouds = document.getElementById('clouds')
  const rain = document.getElementById('rain')
  const snow = document.getElementById('snow')

  name.textContent = `${dataObject.name} (${dataObject.country})`
  localTime.textContent = `Local Time: ${dataObject.localTime}`
  temp.textContent = `Currently ${dataObject.temp}`
  sunrise.textContent = `Sunrise: ${dataObject.sunrise}`
  sunset.textContent = `Sunset: ${dataObject.sunset}`
  weather.textContent = dataObject.weather
  minMaxTemp.textContent = `( Low: ${dataObject.minTemp}, High: ${dataObject.maxTemp} )`
  humidity.textContent = `Humidity: ${dataObject.humidity}`
  visibility.textContent = `Visibility: ${dataObject.visibility}`
  windSpeed.textContent = `Wind: ${dataObject.windSpeed}`
  clouds.textContent = `Clouds: ${dataObject.clouds}`
  rain.textContent = `Rain: ${dataObject.rain}`
  snow.textContent = `Snow: ${dataObject.snow}`
}

function handleError(data) {
  console.log(`Error: ${data.message}`);
}