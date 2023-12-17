const apiKey = 'e5e359243d1fc4f88d9ef7dd8c376102';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.querySelector('.location h2');
const temperatureElement = document.querySelector('.weather p:first-of-type');
const descriptionElement = document.querySelector('.weather p:last-of-type');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Введите название города.');
    }
});

function getWeather(city) {
    const lang = 'en'; // Устанавливаем язык 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}`)
        .then(response => response.json())
        .then(data => {
            updateWeather(data);
            cityInput.value = ''; // Очищаем поле ввода после запроса
        })
        .catch(error => console.error('Ошибка:', error));
}

function updateWeather(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    temperatureElement.textContent = `Температура: ${temperatureCelsius}°C`;
    descriptionElement.textContent = `Описание: ${data.weather[0].description}`;
}

// Вызываем функцию getWeather() при загрузке страницы для начального прогноза (например, для Москвы)
getWeather('Москва');

