const apiKey = '116dc3a430b1e040801aa9f4065b8021';
async function fetchWeatherData(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); 
      const description = data.weather[0].description;
      const weatherDataElement = document.querySelector('.weather-data');
      weatherDataElement.innerHTML = `
        <p>City: ${cityName}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      `;
    } else {
      console.error('Error fetching weather data:', data.message);
      const weatherDataElement = document.querySelector('.weather-data');
      weatherDataElement.innerHTML = 'Unable to fetch weather data.';
    }
  } catch (error) {
    console.error('Error:', error);
    const weatherDataElement = document.querySelector('.weather-data');
    weatherDataElement.innerHTML = 'An error occurred while fetching weather data.';
  }
}
function handleFormSubmit(event) {
  event.preventDefault();
  const cityInput = document.querySelector('#city-input');
  const city = cityInput.value;
  fetchWeatherData(city);
  cityInput.value = ''; 
}

window.addEventListener('load', () => {
  const weatherForm = document.querySelector('#weather-form');
  weatherForm.addEventListener('submit', handleFormSubmit);
});


