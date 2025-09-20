// You need to get a free API key from https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE'; // <-- Replace this with your actual API key!

document.getElementById('weatherForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.textContent = 'Loading...';

  try {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    if (!resp.ok) throw new Error('City not found');
    const data = await resp.json();
    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    resultDiv.textContent = 'Error: Could not get weather for that city.';
  }
});
