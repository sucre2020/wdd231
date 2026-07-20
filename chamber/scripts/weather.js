const apiKey = "256f68af5619de63721bb6d7337ec6d9"

const lat = 9.8965;
const lon = 8.8583;

const currentWeatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
    try {
        // Current Weather
        const currentResponse = await fetch(currentWeatherURL);
        const currentData = await currentResponse.json();

        const currentContainer =
            document.getElementById("current-weather");

        currentContainer.innerHTML = `
            <h3>Current Weather</h3>
            <p><strong>${Math.round(currentData.main.temp)}°C</strong></p>
            <p>${currentData.weather[0].description}</p>
            <img
                src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png"
                alt="${currentData.weather[0].description}">
        `;

        // Forecast
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        const forecastContainer =
            document.getElementById("forecast");

        forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

        const forecast = forecastData.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        forecast.slice(0,3).forEach(day => {

            const date = new Date(day.dt_txt);

            forecastContainer.innerHTML += `
                <p>
                    ${date.toLocaleDateString("en-US",
                    {weekday:"short"})} :
                    <strong>${Math.round(day.main.temp)}°C</strong>
                </p>
            `;
        });

    }
    catch(error){
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", loadWeather);