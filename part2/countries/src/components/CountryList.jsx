const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches</p>;
  }

  return (
    countries.length > 1 &&
    countries.map((country, index) => {
      return <p key={index}>{country}</p>;
    })
  );
};

export default CountryList;
