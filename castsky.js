const apiKey = "fcdct849484e9bbad2411do67437021d";

        document.addEventListener("DOMContentLoaded", function () {
                const popup = document.getElementById("welcome-popup");
                const closeBtn = document.getElementById("close-popup");

                // Show the popup when the page loads
                popup.style.visibility = "visible";
                popup.style.opacity = "1";

                // Hide the popup when the close button is clicked
                closeBtn.addEventListener("click", function () {
                    popup.style.visibility = "hidden";
                    popup.style.opacity = "0";
                });
            });



        document.querySelector("#search-form").addEventListener("submit", search);

        function search(event) {
            event.preventDefault();
            const city = document.querySelector("#search-input").value;
            const currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
            const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

            fetch(currentWeatherUrl)
                .then(response => response.json())
                .then(displayCurrentWeather);

            fetch(forecastUrl)
                .then(response => response.json())
                .then(displayForecast);
        }

        function displayCurrentWeather(data) {
            document.querySelector("#city").innerHTML = data.city;
            document.querySelector("#date-time").innerHTML = new Date().toLocaleString();
            document.querySelector("#temperature").innerHTML = `${Math.round(data.temperature.current)}°C`;
            document.querySelector("#weather-description").innerHTML = data.condition.description;
            document.querySelector("#humidity").innerHTML = data.temperature.humidity;
            document.querySelector("#wind-speed").innerHTML = Math.round(data.wind.speed);
            document.querySelector("#weather-icon").src = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.condition.icon}.png`;
            document.querySelector("#uv-index").innerHTML = data.uv_index || "--"; // Assuming UV data might be available
        }

        function displayForecast(data) {
            const forecastElement = document.querySelector("#forecast");
            forecastElement.innerHTML = "";

            data.daily.slice(0, 5).forEach(day => {
                const date = new Date(day.time * 1000);
                const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
                const iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png`;

                forecastElement.innerHTML += `
                    <div class="forecast-day">
                        <div>${dayOfWeek}</div>
                        <img src="${iconUrl}" alt="${day.condition.description}">
                        <div class="temperature">
                            ${Math.round(day.temperature.maximum)}° / ${Math.round(day.temperature.minimum)}°
                        </div>
                    </div>
                `;
            });
        }

        document.querySelector("#convert-button").addEventListener("click", () => {
            const temperatureElement = document.querySelector("#temperature");
            const tempValue = parseInt(temperatureElement.textContent);
            const isCelsius = temperatureElement.textContent.includes("°C");
            if (isCelsius) {
                temperatureElement.textContent = `${Math.round(tempValue * 9 / 5 + 32)}°F`;
            } else {
                temperatureElement.textContent = `${Math.round((tempValue - 32) * 5 / 9)}°C`;
            }
        });