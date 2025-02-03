import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length > 10) {
    return <p>Too many matches</p>;
  }

  if (selectedCountry) {
    return (
      <>
        <div>
          <CountryInfo country={selectedCountry} />
        </div>
        <button onClick={() => setSelectedCountry(null)}>Back</button>
      </>
    );
  }

  return (
    countries.length > 1 &&
    countries.map((country, index) => {
      return (
        <div
          key={country}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p key={index}>{country}</p>
          <button onClick={() => setSelectedCountry(country)}>show</button>
        </div>
      );
    })
  );
};

export default CountryList;
