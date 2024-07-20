document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');
    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');

    async function checkWeather(city) {
        const api_key = "2d464d2d59cdb77e3de26e85c7a0e7af";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        let weather_data;
        try {
            weather_data = await fetch(url).then(response => response.json());
            console.log(weather_data);
        }catch(e) {
            console.log("catch")
            weather_data.cod = "404";
        }
        
      
        if (weather_data.cod === `404`) {
            // if (location_not_found) {
            //     location_not_found.style.display = "flex";

            // }
            // if (weather_body) {
            //     weather_body.style.display = "none";
            // }
            console.log("error");
            weather_img.src = "Imgs/404.png";
            return;
        }

        console.log("run");
        if (location_not_found) {
            location_not_found.style.display = "none";
        }
        if (weather_body) {
            weather_body.style.display = "flex";
        }
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/Hr`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "Imgs/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "Imgs/clear.png";
                break;
            case 'Rain':
                weather_img.src = "Imgs/rain.png";
                break;
            case 'Mist':
                weather_img.src = "Imgs/mist.png";
                break;
            case 'Snow':
                weather_img.src = "Imgs/snow.png";
                break;
        }

        console.log(weather_data);
    }

    searchBtn.addEventListener('click', () => {
        checkWeather(inputBox.value);
    });
});
