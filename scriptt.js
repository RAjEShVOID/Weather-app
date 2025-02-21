const apiKey = "a4a9e1793a2409ef1fb8593e321aab74"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherInfo = document.querySelector(".weather-info");






searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

city.addEventListener("keypress" , (e) => {
    if(e.key=== "Enter"){
        searchBtn.click();
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found! Please try again.");
            return;
        }
        

        const mainWeather = data.weather[0].main;
        
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
       
        weatherInfo.style.display = "block";

    } catch (error) {
        alert("Error fetching weather data. Please check your internet connection and try again.");
    }
}