document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherDisplay = document.getElementById('weather-display');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');

    async function getWeather(city) {
        try {
            showLoading();
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.error || 'Failed to fetch weather');
            
            displayWeather(data);
        } catch (err) {
            showError(err.message);
        }
    }

    function displayWeather(data) {
        const date = new Date();
        document.getElementById('city').textContent = data.name;
        document.getElementById('date').textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = 
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        hideLoading();
        weatherDisplay.classList.remove('hidden');
    }

    function showLoading() {
        weatherDisplay.classList.add('hidden');
        error.classList.add('hidden');
        loading.classList.remove('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    function showError(message) {
        hideLoading();
        weatherDisplay.classList.add('hidden');
        error.textContent = message;
        error.classList.remove('hidden');
    }

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) getWeather(city);
        }
    });
});
