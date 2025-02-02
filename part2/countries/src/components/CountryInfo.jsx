import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({ country }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => setCountryData(response.data))
      .catch((error) => console.log(error.error));
  }, [country]);

  console.log(countryData);
  if (!countryData) {
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
    </>
  );
};

export default CountryInfo;
