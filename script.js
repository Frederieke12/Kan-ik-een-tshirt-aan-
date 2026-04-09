async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "7abc0f9c48e2be78f386c124dcaf0bdd"; // Zet hier je OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},NL&units=metric&appid=${apiKey}`;
  

    const resultDiv = document.getElementById("result");
    const img = document.getElementById("weather-img");
    const text = document.getElementById("weather-text");
    const tempElem = document.getElementById("weather-temp");
    const cityElem = document.getElementById("weather-city");

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Stad niet gevonden");
        const data = await response.json();

        const temp = data.main.temp;
        const weatherMain = data.weather[0].main;

        tempElem.innerText = `Temperatuur: ${temp}°C`;
        cityElem.innerText = `Plaats: ${data.name}`;

        if (temp >= 20 && weatherMain === "Clear") {
            img.src = "images/zon.png";
            text.innerText = "Joepie je kan een T-shirt aan!";
            document.body.style.backgroundColor = "#00A8FF";
        } else {
            img.src = "images/regen.png";
            text.innerText = "Helaas je kan geen T-shirt aan";
            document.body.style.backgroundColor = "#657071";
        }
    } catch (error) {
        text.innerText = "Fout: stad niet gevonden";
        img.src = "";
        tempElem.innerText = "";
        cityElem.innerText = "";
        document.body.style.backgroundColor = "#657071";
    }
}