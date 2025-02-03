import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({ country }) => {
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_MY_KEY;

  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => {
          setCountryData(response.data);
          const { capital } = response.data;
          const fetchWeatherData = axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
            )
            .then((response) => {
              setWeatherData(response.data);
              setLoading(false);
            });
        })
        .catch((error) => console.log(error.error));
    };
    fetchCountryData();
  }, [country]);

  if (loading) {
    return <p>Loading..</p>;
  }

  const {
    name: { common },
    languages,
    area,
    capital,
    flags: { png },
  } = countryData;

  const languagesArray = Object.values(languages);

  const {
    main: { temp },
    weather,
    wind: { speed },
  } = weatherData;

  // imgIcon
  const imgIcon = weather[0].icon;

  //fetch image from API

  const temperatureInCelcius = (temp - 273.15).toFixed(0);

  return (
    <>
      <h3>{common}</h3>

      <p>Area: {area}</p>
      <p>Capital: {capital}</p>
      <p>Languages</p>
      <ul>
        {languagesArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={png} />
      {weatherData && (
        <>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {temperatureInCelcius} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${imgIcon}@2x.png`}
            alt="weather"
          />
          <p>Wind: {speed} m/s</p>
        </>
      )}
    </>
  );
};

export default CountryInfo;
