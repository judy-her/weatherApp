console.log('I am connected');
let cityName = document.getElementById('cityName');
let country = document.getElementById('country');
let dateMain = document.getElementById('dateMain');
let icon = document.getElementById('icon');
let temp = document.getElementById('temp');
let feelsLike = document.getElementById('feelsLike');
let humid = document.getElementById('h');
let w = document.getElementById('w');
let desc = document.getElementById('description');

let mainIcon = document.getElementById('mainIcon');

const API_KEY = 'f4d2ec0aceb6adaf6e9866e242642310';
//test
let query = 'El Monte';

const weatherBASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=imperial`;

const cnt = 5; //for 5 days

const getWeatherData = () => {
  return fetch(weatherBASE_URL).then((res) => res.json());
};

const getForecastData = (lat, lon) => {
  //forecast url
  const forecastBASE_URL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${API_KEY}&cnt=${cnt}&lat=${lat}&lon=${lon}`;
  return fetch(forecastBASE_URL)
    .then((res) => res.json())
    .then(console.log('Forecast API', forecastBASE_URL));
};

getWeatherData().then((weatherData) => {
  const { coord } = weatherData;
  const { lat, lon } = coord;

  console.log('Weather Data:', weatherData);
  console.log('lat:', lat);
  console.log('lon:', lon);

  getForecastData(lat, lon).then((forecastData) => {
    console.log('Forecast Data', forecastData);
    const { city, list } = forecastData;

    list.forEach((item) => {
      const { main, weather, wind } = item;
      const { description, icon } = weather[0];

      console.log('Main from Forecast:', main);
      console.log('Weather from Forecast:', weather);
      console.log('City', city.name);
      console.log('Country', city.country);
      console.log('description:', description);
      console.log('Weather icon', icon);
      console.log('Feels like', main.feels_like);
      console.log('Humidity', main.humidity);
      console.log('Wind', wind.speed);
      cityName.textContent = city.name;
      country.textContent = city.country;
      temp.textContent = Math.floor(main.temp);
      desc.textContent = description;
      feelsLike.textContent = Math.floor(main.feels_like);
      humid.textContent = main.humidity;
      w.textContent = Math.floor(wind.speed);
      console.log('Temp Rounded', Math.floor(main.temp));
      //   wind.textContent;
      let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      mainIcon.src = iconUrl;
    });
  });
});

const formatToLocalTime = (
  secs,
  zone,
  format = "dddd, DD MMMM YYYY' | Local Time: 'hh:mm a"
) => {
  return dayjs
    .unix(secs)
    .utcOffset(zone / 60)
    .format(format);
};

//use this lat and lon for api forecast
//   let cnt = 5;
//   let lat = coord.lat;
//   let lon = coord.lon;
//   const forecastBASE_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}&cnt=${cnt}&lat=${lat}&lon=${lon}`;

//   console.log('Forecast API URL:', forecastBASE_URL);
// });
