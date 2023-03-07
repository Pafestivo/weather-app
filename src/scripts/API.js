export default async function getData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=80b5e34940d5d647c671753b685314a7`;
  const response = await fetch(url, {
    mode: 'cors'
  })
  const data = await response.json();
  try {
    display(processInfo(data))
  } catch {
    handleError(data)
  }
}

function processInfo(data) {
  const name = data.name
  const temp = data.main.temp
  const humidity = data.main.humidity
  const minTemp = data.main.temp_min
  const maxTemp = data.main.temp_max
  const visibility = data.visibility
  const windSpeed = data.wind.speed
  const clouds = data.clouds.all
  const rain = data.rain
  const snow = data.snow
  return {name, temp, humidity, minTemp, maxTemp, visibility, windSpeed, clouds, rain, snow}
}

function display(obj) {

}

function handleError(data) {
  console.log(`Error: ${data.message}`);
}