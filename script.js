const apiKey = "b1d8f8190b9469589596acae4409d4c5";

async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Enter a city name!");
        return;
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("current-weather").innerHTML = "City not found ❌";
            return;
        }

        document.getElementById("current-weather").innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡️ ${data.main.temp}°C</p>
            <p>💧 ${data.main.humidity}%</p>
            <p>🌥️ ${data.weather[0].description}</p>
        `;

        getForecast(city);

    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
    console.log("Fetching weather...");
    document.body.classList.remove("home");
}

async function getForecast(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    let forecastHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];
        const date = item.dt_txt.split(" ")[0];

        forecastHTML += `
            <div class="forecast-card">
                <h4>${date}</h4>
                <p>🌡️ ${item.main.temp}°C</p>
                <p>${item.weather[0].main}</p>
            </div>
        `;
    }

    document.getElementById("forecast").innerHTML = forecastHTML;
}
console.log(data);