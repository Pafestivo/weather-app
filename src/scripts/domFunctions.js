export default function display(dataObject) {
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
  const body = document.querySelector('body')

  body.id = dataObject.theme
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

