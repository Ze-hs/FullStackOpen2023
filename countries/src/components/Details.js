import { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const params = {
    appid: process.env.REACT_APP_API_KEY,
    q: country.capital[0],
    units: "metric",
  };

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", { params })
      .then((response) => {
        setWeather([response.data]);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>captital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((lngCode) => {
          return <li key={lngCode}>{country.languages[lngCode]}</li>;
        })}
      </ul>
      <img src={country.flags.svg}></img>

      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weather[0].main.temp} celsius </p>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}
      />
      <p>wind {weather[0].wind.speed} m/s</p>
    </div>
  );
};

export default Details;
