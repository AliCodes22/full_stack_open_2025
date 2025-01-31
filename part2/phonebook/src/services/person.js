import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addPerson = (newPerson) => {
  axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.status)
    .catch((error) => {
      console.log(error.status);
    });
};

const updateNumber = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);

  return request.then((response) => response.data);
};

export { addPerson, baseUrl, deletePerson, updateNumber };
