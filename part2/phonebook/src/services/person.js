import axios from "axios";

const baseUrl = "/api/persons";

const fetchPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
      throw error;
    });
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

export { fetchPersons, addPerson, baseUrl, deletePerson, updateNumber };
