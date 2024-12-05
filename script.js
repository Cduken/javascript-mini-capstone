let updateInterval;

// Fetch weather data from the API
function fetchWeatherData(city) {
    const apiKey = '90cd13c6c777169fe48456c291385bd5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            updateWeatherUI(data);
            updateTime(data.timezone);
            document.querySelector('.weather-info').classList.remove('hidden');
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please try again.');
        });
}


function updateWeatherUI(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
}


function updateTime(timezoneOffset) {
    if (updateInterval) clearInterval(updateInterval);

    updateInterval = setInterval(() => {
        const currentDateTime = new Date();
        const utcTime = currentDateTime.getTime() + currentDateTime.getTimezoneOffset() * 60000;
        const localDateTime = new Date(utcTime + timezoneOffset * 1000);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        document.getElementById('currentDateTime').textContent = localDateTime.toLocaleDateString('en-US', options);
    }, 1000);
}


function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.querySelector('.search input');
    const cityName = cityInput.value.trim();

    if (cityName) {
        fetchWeatherData(cityName);
        cityInput.value = '';
    } else {
        alert('Please enter a valid city name.');
    }
}

function toggleDarkMode() {
    const body = document.body;
    const darkButtonIcon = document.querySelector('.dark-button i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        darkButtonIcon.classList.remove('fa-moon');
        darkButtonIcon.classList.add('fa-sun');
        darkButtonIcon.style.color = '#FFD700';
    } else {
        darkButtonIcon.classList.remove('fa-sun');
        darkButtonIcon.classList.add('fa-moon');
        darkButtonIcon.style.color = 'black';
    }
}

const logOut = () => {
    window.location.href = "login.html";
}


document.querySelector('.search button').addEventListener('click', handleFormSubmit);
document.querySelector('.dark-button').addEventListener('click', toggleDarkMode);
