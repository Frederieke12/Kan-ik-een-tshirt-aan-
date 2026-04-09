async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "7abc0f9c48e2be78f386c124dcaf0bdd"; // vervang door je eigen API key
    const resultDiv = document.getElementById("result");
    const img = document.getElementById("weather-img");
    const text = document.getElementById("weather-text");
    const tempElem = document.getElementById("weather-temp");
    const cityElem = document.getElementById("weather-city");

    if (!city) {
        text.innerText = "Voer een stad in!";
        img.src = "";
        tempElem.innerText = "";
        cityElem.innerText = "";
        document.body.style.backgroundColor = "#657071";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404" || data.cod === 404) {
            throw new Error("Stad niet gevonden");
        }

        const temp = data.main.temp;
        const weatherMain = data.weather[0].main;

        // Plaats en temperatuur tonen
        cityElem.innerText = data.name;
        tempElem.innerText = `Temperatuur: ${temp.toFixed(1)}°C`;

        // T-shirt advies logica
        if (temp >= 20 && weatherMain !== "Rain" && weatherMain !== "Snow") {
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
        console.error(error);
    }
}