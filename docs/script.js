async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultBox = document.getElementById("weatherResult");

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "1d32b224c363df47ce3cf4673548c1fb"; // Replace this
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            resultBox.innerHTML = `<p>City not found. Try again.</p>`;
            resultBox.style.display = "block";
            return;
        }

        resultBox.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
        resultBox.style.display = "block";
    } catch (err) {
        resultBox.innerHTML = `<p>Something went wrong. Please try again.</p>`;
        resultBox.style.display = "block";
    }
}
