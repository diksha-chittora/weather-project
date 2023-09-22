const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

const API_KEY = '1bec06dd83f54c4e9d262412232108'; 
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        fetchWeather(cityName);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
        const data = await response.json();

        if (data.error) {
            displayError(data.error.message);
        } else {
            displayWeather(data);
        }
    } catch (error) {
        displayError('An error occurred while fetching weather data.');
    }
}

function displayWeather(weatherData) {
    const city = weatherData.location.name;
    const temperatureC = weatherData.current.temp_c;
    const temperatureF = weatherData.current.temp_f;
    const description = weatherData.current.condition.text;
    const icon = weatherData.current.condition.icon;

    const weatherHTML = `
        <h2>${city}</h2>
        <p>${description}</p>
        <img src="${icon}" alt="${description}">
        
        <p>Temperature: ${temperatureC}°C / ${temperatureF}°F</p> 
    `;
    // $.getJSON(API_KEY, function(data) {
    //     $(".temp-slider").on("click", function() {
    //       var tempC = data.main.temp;
    //       var tempF = tempC * 9 / 5 + 32;
      
    //       if (toggleF) {
    //         $("#weather-degrees").html(Math.round(tempF) + "&deg;F");
    //         $("#temp-slider-text").html("Fahrenheit");
    //         toggleF = false;
    //       } else if (toggleF == false) {
    //         $("#weather-degrees").html(Math.round(tempC) + "&deg;C");
    //         $("#temp-slider-text").html("Celsius");
    //         toggleF = true;
    //       }
    //     });
    //   });
    weatherInfo.innerHTML = weatherHTML;
}

function displayError(message) {
    weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}

function renderWeatherInfo(weatherinfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryicon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloud]");
   
    console.log(weatherInfo);

    
    cityName.innerText = weatherInfo?.location?.name;
    countryIcon.innerText = weatherInfo?.location?.country;
    desc.innerText = weatherInfo?.current?.condition.text;
    weatherIcon.src = weatherInfo?.current?.condition.icon;
    temp.innerText = settemp ? `${weatherInfo?.current?.feelslike_c}°C` : `${weatherInfo?.current?.feelslike_f}°F`;
    windspeed.innerText = `${weatherInfo?.current?.wind_mph} m/h`;
    humidity.innerText = `${weatherInfo?.current?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.current?.cloud}%`;
}



