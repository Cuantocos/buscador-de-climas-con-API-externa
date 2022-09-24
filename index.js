const btnSearch = document.getElementById("btn-search-climate");
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  const region = txtSearch.value;
  getWeatherDataByRegion(region);
});

const txtSearch = document.getElementById("txt-search");

const API_KEY = "3d3b9b32aebc72e5e766753be6d6e4d5";

const getWeatherData = (position) => {
  let { latitude, longitude } = position.coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      showWeatherInfo([data]);
    })
  );
};
const getWeatherDataByRegion = (region) => {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${region}&appid=${API_KEY}&units=metric`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      showWeatherInfo(data.list);
    })
  );
};
const showWeatherInfo = (data) => {
  console.log(data);
  let result = ``;
  for (item of data) {
    result += ` 
    <div class="climate-result">
      <div>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
      </div>
      <ul>
          <li>Region: ${item.name}</li>
          <li>Temperatura: ${item.main.temp}</li>
          <li>Sensacion termica: ${item.main.feels_like}</li>
          <li>Humedad: ${item.main.humidity}</li>
          <li>Presion: ${item.main.pressure}</li>
          <li>Velocidad del viento: ${item.wind.speed}</li>
          <li>Pais: ${item.sys.country}</li>
     </ul>
    </div>
  `;
  }

  document.getElementById("result").innerHTML = result;
};

const handleGetPositionError = () => {};
navigator.geolocation.getCurrentPosition(
  getWeatherData,
  handleGetPositionError
);
