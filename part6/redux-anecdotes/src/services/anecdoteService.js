import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const vote = async (id, object) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, object);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewAnecdote = async (content) => {
  try {
    const response = await axios.post(baseUrl, {
      content,
      votes: 0,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
