import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const city = 'London';
    const apiUrl = `${config.baseUrl}/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`;

    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Fetch error: ', error);
            document.getElementById('weather-container').innerHTML = '<p>Error loading weather data.</p>';
        }
    }

    function displayWeather(data) {
        // Update DOM with weather data
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }

    fetchWeather();
});
