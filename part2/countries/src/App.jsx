import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);
      });
  }, []);

  const searchedCountries = search
    ? countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <>
      <Search search={search} onChange={(e) => setSearch(e.target.value)} />

      {search.length > 0 && <CountryList countries={searchedCountries} />}

      {searchedCountries.length === 1 && (
        <CountryInfo country={searchedCountries[0]} />
      )}
    </>
  );
}

export default App;
