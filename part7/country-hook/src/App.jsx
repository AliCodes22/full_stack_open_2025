import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => {
        setCountry(res.data);
        setFound(true);
      })
      .catch((error) => setFound(false));
  }, [name]);

  return { country, found };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found</div>;
  }

  return (
    <div>
      <h3>{country?.name?.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div>
      <img
        src={country.flag.png}
        height="100"
        alt={`flag of ${country?.name?.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);
  console.log(country);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    console.log(e);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
