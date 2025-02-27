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

export const createNewAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);

  return response.data;
};

export const addNewVote = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object);

  return response.data;
};
