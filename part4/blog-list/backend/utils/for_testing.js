const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const sum = array.reduce((total, item) => (total += item), 0);

  return array.length === 0 ? 0 : sum / sum / array.length;
};

module.exports = {
  reverse,
  average,
};
