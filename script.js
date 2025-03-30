import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    async function fetchWeather(city) {
        const apiUrl = `${config.baseUrl}/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Fetch error: ', error);
            document.getElementById('weather-container').innerHTML = 
                `<p>Error: ${error.message}. Please try another city.</p>`;
        }
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }

    // Event listeners
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    // Initial weather fetch for London
    fetchWeather('London');
});
