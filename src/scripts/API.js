export default async function getData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=80b5e34940d5d647c671753b685314a7`;
  const response = await fetch(url, {
    mode: 'cors'
  })
  const data = await response.json();
  try {
    console.log(data)
    console.log(processData(data))
    display(processData(data))
  } catch {
    handleError(data)
  }
}

function processData(data) {
  const name = data.name
  const country = data.sys.country
  const weather = data.weather[0].description
  const temp = `${data.main.temp}C`
  const humidity = `${data.main.humidity}%`
  const minTemp = `${data.main.temp_min}C`
  const maxTemp = `${data.main.temp_max}C`
  const windSpeed = `${data.wind.speed}(M/S)`
  const clouds = `${data.clouds.all}%`
  let visibility = `${data.visibility}(K/M)`
  let rain = '-'
  let snow = '-'

  if(data.visibility === 10000) {
    visibility = 'good'
  }

  if(data.snow) snow = data.snow['1h'];
  if(data.rain) rain = data.rain['1h'];
  return {name, country, weather, temp, humidity, minTemp, maxTemp, visibility, windSpeed, clouds, rain, snow}
}

function display(dataObject) {
  const name = document.getElementById('name')
  const weather = document.getElementById('weather')
  const temp = document.getElementById('temp')
  const humidity = document.getElementById('humidity')
  const minTemp = document.getElementById('minTemp')
  const maxTemp = document.getElementById('maxTemp')
  const visibility = document.getElementById('visibility')
  const windSpeed = document.getElementById('windSpeed')
  const clouds = document.getElementById('clouds')
  const rain = document.getElementById('rain')
  const snow = document.getElementById('snow')

  name.textContent = `City Name: ${dataObject.name} (${dataObject.country})`
  weather.textContent = `Weather: ${dataObject.weather}`
  temp.textContent = `Temperature: ${dataObject.temp}`
  maxTemp.textContent = `Highest: ${dataObject.maxTemp}`
  minTemp.textContent = `Lowest: ${dataObject.minTemp}`
  humidity.textContent = `Humidity: ${dataObject.humidity}`
  visibility.textContent = `Visibility: ${dataObject.visibility}`
  windSpeed.textContent = `Wind Speed: ${dataObject.windSpeed}`
  clouds.textContent = `Clouds: ${dataObject.clouds}`
  rain.textContent = `Rain: ${dataObject.rain}`
  snow.textContent = `Snow: ${dataObject.snow}`
}

function handleError(data) {
  console.log(`Error: ${data.message}`);
}