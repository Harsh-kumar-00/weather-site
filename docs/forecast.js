async function getForecast() {
    const city = document.getElementById("forecastCity").value;
    const apiKey = "1d32b224c363df47ce3cf4673548c1fb"; // Replace if revoked
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "Loading...";
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
  
      const data = await response.json();
      const dailyData = {};
  
      // Group forecast by date
      data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dailyData[date]) dailyData[date] = [];
        dailyData[date].push(entry);
      });
  
      // Show first 5 days
      const forecastHTML = Object.keys(dailyData).slice(0, 5).map(date => {
        const day = dailyData[date][0];
        return `
          <div class="forecast-card">
            <h3>${new Date(date).toDateString()}</h3>
            <p>🌡️ Temp: ${day.main.temp} °C</p>
            <p>☁️ Weather: ${day.weather[0].description}</p>
            <p>💧 Humidity: ${day.main.humidity}%</p>
            <p>🌬️ Wind: ${day.wind.speed} m/s</p>
          </div>
        `;
      }).join("");
  
      forecastContainer.innerHTML = forecastHTML;
    } catch (error) {
      forecastContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }
  