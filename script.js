import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('city-search');
    const searchBtn = document.getElementById('search-btn');

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
                `<p>Error: ${error.message}. Please try again.</p>`;
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
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Allow search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    // Initial weather display for default city
    fetchWeather('London');
});
